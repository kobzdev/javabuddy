import type { IncomingMessage, ServerResponse } from 'http';

interface ExecutionResult {
  status: 'Accepted' | 'Compilation Error' | 'Runtime Error' | 'Time Limit Exceeded' | 'Memory Limit Exceeded' | 'Unconfigured' | 'Rejected' | 'Error';
  stdout: string;
  stderr: string;
  compileOutput: string;
  time: string | null;
  memory: number | null;
  provider: string;
  beginnerExplanation?: string;
}

function decodeBase64(str: string | null | undefined): string {
  if (!str) return '';
  try {
    return Buffer.from(str, 'base64').toString('utf-8');
  } catch {
    return str;
  }
}

function generateBeginnerExplanation(
  status: ExecutionResult['status'],
  compileOutput: string,
  stderr: string
): string | undefined {
  const combined = `${compileOutput}\n${stderr}`;

  if (status === 'Accepted') {
    return 'Yay! Your Java program ran like a charm and finished happily! 🌟';
  }
  if (combined.includes("';' expected")) {
    return 'Oops! Java is looking for a semicolon `;` at the end of a line. In Java, semicolons are like tiny periods at the end of a sentence!';
  }
  if (combined.includes('cannot find symbol')) {
    return "Hmm, Java doesn't recognize a word you typed! Did you spell a variable name or method name slightly differently? Remember, Java is super picky about capital letters!";
  }
  if (combined.includes('unclosed string literal')) {
    return 'You opened a quotation mark `"` to write some words, but forgot to close it with another `"`! Quotation marks always come in pairs, like a pair of shoes!';
  }
  if (combined.includes('class Main is public, should be declared in a file named Main.java') || combined.includes('class, interface, enum, or record expected')) {
    return 'Java needs to find a main class called `public class Main` and a starting point called `public static void main(String[] args)`. Make sure your code is inside those curly brackets `{ }`!';
  }
  if (combined.includes('reached end of file while parsing') || combined.includes("expected '}'")) {
    return 'A curly bracket `{` was opened, but its matching closing bracket `}` is missing! Every left hug `{` needs a right hug `}`!';
  }
  if (combined.includes('NullPointerException')) {
    return "You tried to open an empty toy box! The box doesn't have anything inside it yet (it is `null`).";
  }
  if (combined.includes('ArrayIndexOutOfBoundsException') || combined.includes('IndexOutOfBoundsException')) {
    return "You asked for an item at a slot number that doesn't exist! Remember that Java lists start counting from index 0, and don't go past the basket size!";
  }
  if (combined.includes('ArithmeticException: / by zero')) {
    return "Uh oh, you tried to divide by zero! Even the smartest math robots can't divide a pizza among zero friends! 🍕";
  }
  if (status === 'Time Limit Exceeded') {
    return "Your loop ran forever and didn't stop to take a rest! Check your loop condition to ensure it eventually becomes false.";
  }
  if (status === 'Compilation Error') {
    return 'Java found a small spelling or punctuation mistake before it could run your code. Look at the red underline or line number!';
  }
  return undefined;
}

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept, X-Requested-With');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    return res.status(200).json({
      provider: process.env.JAVA_EXECUTION_PROVIDER || 'unconfigured',
      status: process.env.JAVA_EXECUTION_PROVIDER && process.env.JAVA_EXECUTION_PROVIDER !== 'unconfigured' ? 'ready' : 'unconfigured',
      configured: Boolean(process.env.JAVA_EXECUTION_PROVIDER && process.env.JAVA_EXECUTION_PROVIDER !== 'unconfigured'),
      languageId: parseInt(process.env.JUDGE0_JAVA_LANG_ID || '62', 10),
      maxBytes: 65536,
      rateLimitPerMin: 20,
    });
  }

  if (req.method === 'POST') {
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch {
        body = {};
      }
    }

    const sourceCode = body?.sourceCode || '';
    const stdin = body?.stdin || '';

    if (!sourceCode.trim()) {
      return res.status(400).json({
        status: 'Error',
        stdout: '',
        stderr: 'Please write some Java code before clicking Run!',
        compileOutput: '',
        time: null,
        memory: null,
        provider: 'Validator',
        beginnerExplanation: 'Your code editor is completely empty! Type some code or choose a lesson example.',
      });
    }

    const provider = process.env.JAVA_EXECUTION_PROVIDER || 'unconfigured';
    const rapidApiKey = process.env.RAPIDAPI_KEY || '';
    const rapidApiHost = process.env.RAPIDAPI_HOST || 'judge0-ce.p.rapidapi.com';
    const judge0CeUrl = process.env.JUDGE0_CE_URL || '';
    const judge0AuthToken = process.env.JUDGE0_AUTH_TOKEN || '';
    const langId = parseInt(process.env.JUDGE0_JAVA_LANG_ID || '62', 10);

    // 1. RapidAPI Judge0 Provider
    if (provider === 'judge0_rapidapi' && rapidApiKey) {
      try {
        const submitRes = await fetch(`https://${rapidApiHost}/submissions?base64_encoded=true&wait=false`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-RapidAPI-Key': rapidApiKey,
            'X-RapidAPI-Host': rapidApiHost,
          },
          body: JSON.stringify({
            source_code: Buffer.from(sourceCode).toString('base64'),
            language_id: langId,
            stdin: Buffer.from(stdin).toString('base64'),
          }),
        });

        const submitData = await submitRes.json();
        const token = submitData?.token;
        if (!token) throw new Error('No submission token received from Judge0');

        const startTime = Date.now();
        while (Date.now() - startTime < 14000) {
          await new Promise((r) => setTimeout(r, 1000));
          const checkRes = await fetch(`https://${rapidApiHost}/submissions/${token}?base64_encoded=true`, {
            headers: {
              'X-RapidAPI-Key': rapidApiKey,
              'X-RapidAPI-Host': rapidApiHost,
            },
          });
          const checkData = await checkRes.json();
          if (checkData?.status?.id > 2) {
            const statusDesc = checkData.status?.description || 'Unknown';
            let normalizedStatus: ExecutionResult['status'] = 'Accepted';
            if (statusDesc.includes('Compilation Error')) normalizedStatus = 'Compilation Error';
            else if (statusDesc.includes('Runtime Error')) normalizedStatus = 'Runtime Error';
            else if (statusDesc.includes('Time Limit Exceeded')) normalizedStatus = 'Time Limit Exceeded';
            else if (statusDesc !== 'Accepted') normalizedStatus = 'Error';

            const stdout = decodeBase64(checkData.stdout);
            const stderr = decodeBase64(checkData.stderr);
            const compileOutput = decodeBase64(checkData.compile_output);

            return res.status(200).json({
              status: normalizedStatus,
              stdout,
              stderr,
              compileOutput,
              time: checkData.time ? `${checkData.time}s` : null,
              memory: checkData.memory ? Math.round(checkData.memory) : null,
              provider: 'Judge0 Cloud Runner',
              beginnerExplanation: generateBeginnerExplanation(normalizedStatus, compileOutput, stderr),
            });
          }
        }

        return res.status(200).json({
          status: 'Time Limit Exceeded',
          stdout: '',
          stderr: 'Execution timed out after 14 seconds.',
          compileOutput: '',
          time: null,
          memory: null,
          provider: 'Judge0 Cloud Runner',
          beginnerExplanation: 'Your code took longer than 14 seconds! Check for infinite loops.',
        });
      } catch (err: any) {
        return res.status(200).json({
          status: 'Error',
          stdout: '',
          stderr: err.message || 'Failed to communicate with Judge0 cloud runner.',
          compileOutput: '',
          time: null,
          memory: null,
          provider: 'Judge0 Cloud Runner',
          beginnerExplanation: 'Had trouble contacting the code runner cloud. Verify your RAPIDAPI_KEY.',
        });
      }
    }

    // 2. Self-Hosted Judge0 CE
    if (provider === 'judge0_ce' && judge0CeUrl) {
      try {
        const cleanUrl = judge0CeUrl.replace(/\/+$/, '');
        const headers: Record<string, string> = { 'Content-Type': 'application/json' };
        if (judge0AuthToken) headers['X-Auth-Token'] = judge0AuthToken;

        const ceRes = await fetch(`${cleanUrl}/submissions?base64_encoded=true&wait=true`, {
          method: 'POST',
          headers,
          body: JSON.stringify({
            source_code: Buffer.from(sourceCode).toString('base64'),
            language_id: langId,
            stdin: Buffer.from(stdin).toString('base64'),
          }),
        });

        const checkData = await ceRes.json();
        const statusDesc = checkData.status?.description || 'Unknown';
        let normalizedStatus: ExecutionResult['status'] = 'Accepted';
        if (statusDesc.includes('Compilation Error')) normalizedStatus = 'Compilation Error';
        else if (statusDesc.includes('Runtime Error')) normalizedStatus = 'Runtime Error';
        else if (statusDesc !== 'Accepted') normalizedStatus = 'Error';

        const stdout = decodeBase64(checkData.stdout);
        const stderr = decodeBase64(checkData.stderr);
        const compileOutput = decodeBase64(checkData.compile_output);

        return res.status(200).json({
          status: normalizedStatus,
          stdout,
          stderr,
          compileOutput,
          time: checkData.time ? `${checkData.time}s` : null,
          memory: checkData.memory ? Math.round(checkData.memory) : null,
          provider: 'Judge0 CE Runner',
          beginnerExplanation: generateBeginnerExplanation(normalizedStatus, compileOutput, stderr),
        });
      } catch (err: any) {
        return res.status(200).json({
          status: 'Error',
          stdout: '',
          stderr: err.message || 'Failed to connect to local Judge0 CE.',
          compileOutput: '',
          time: null,
          memory: null,
          provider: 'Judge0 CE',
          beginnerExplanation: 'The code runner is taking a nap or unreachable! Check your Judge0 container.',
        });
      }
    }

    // 3. Fallback Unconfigured Mode
    return res.status(200).json({
      status: 'Unconfigured',
      stdout: '',
      stderr: 'Java Execution Service is currently unconfigured.\n\nTo enable live cloud Java execution:\n1. Set RAPIDAPI_KEY and JAVA_EXECUTION_PROVIDER=judge0_rapidapi in Vercel Environment Variables, OR\n2. Run the local backend with npm.cmd run dev:server.\n\nSee docs/JAVA_EXECUTION.md for full instructions.',
      compileOutput: '',
      time: null,
      memory: null,
      provider: 'Unconfigured (Cloud Setup Required)',
      beginnerExplanation: 'The cloud code runner is currently resting and waiting for setup! Your editor and lessons work, and the kindergarten tutor is ready to guide you.',
    });
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
}
