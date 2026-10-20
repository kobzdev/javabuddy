import axios from 'axios';
import { config } from '../config';

export interface ExecutionResult {
  status: 'Accepted' | 'Compilation Error' | 'Runtime Error' | 'Time Limit Exceeded' | 'Memory Limit Exceeded' | 'Unconfigured' | 'Rejected' | 'Error';
  stdout: string;
  stderr: string;
  compileOutput: string;
  time: string | null;
  memory: number | null;
  provider: string;
  beginnerExplanation?: string;
}

export class JavaExecutionService {
  /**
   * Main entry point to execute Java source code
   */
  public async execute(sourceCode: string, stdin: string = ''): Promise<ExecutionResult> {
    const provider = config.executionProvider;

    switch (provider) {
      case 'judge0_ce':
        return await this.executeJudge0Ce(sourceCode, stdin);

      case 'judge0_rapidapi':
        return await this.executeJudge0RapidApi(sourceCode, stdin);

      case 'unconfigured':
      default:
        return this.getUnconfiguredResponse();
    }
  }

  /**
   * Helper to decode Base64 strings returned by Judge0
   */
  private decodeBase64(str: string | null | undefined): string {
    if (!str) return '';
    try {
      return Buffer.from(str, 'base64').toString('utf-8');
    } catch {
      return str;
    }
  }

  /**
   * Executes code using a self-hosted Judge0 CE instance
   */
  private async executeJudge0Ce(sourceCode: string, stdin: string): Promise<ExecutionResult> {
    const baseUrl = config.judge0Url.replace(/\/+$/, '');
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (config.judge0AuthToken) {
      headers['X-Auth-Token'] = config.judge0AuthToken;
    }

    try {
      // 1. Submit the code (wait=true for synchronous attempt up to configured timeout)
      const submitResponse = await axios.post(
        `${baseUrl}/submissions?base64_encoded=true&wait=true`,
        {
          source_code: Buffer.from(sourceCode).toString('base64'),
          language_id: config.judge0JavaLangId,
          stdin: Buffer.from(stdin).toString('base64'),
        },
        {
          headers,
          timeout: config.executionTimeoutMs,
        }
      );

      const submission = submitResponse.data;
      return this.formatJudge0Response(submission, 'Judge0 CE');
    } catch (err: any) {
      console.error('[Judge0 CE Execution Error]:', err.message);
      return {
        status: 'Error',
        stdout: '',
        stderr: err.response?.data?.message || err.message || 'Failed to connect to Judge0 CE service.',
        compileOutput: '',
        time: null,
        memory: null,
        provider: 'Judge0 CE (Offline / Error)',
        beginnerExplanation: 'The code runner computer is taking a nap or unreachable! Check that your Judge0 CE instance is running.',
      };
    }
  }

  /**
   * Executes code using RapidAPI Judge0
   */
  private async executeJudge0RapidApi(sourceCode: string, stdin: string): Promise<ExecutionResult> {
    if (!config.rapidApiKey) {
      return {
        status: 'Unconfigured',
        stdout: '',
        stderr: 'RAPIDAPI_KEY is not configured in server environment.',
        compileOutput: '',
        time: null,
        memory: null,
        provider: 'Judge0 RapidAPI (Missing Key)',
        beginnerExplanation: 'The Java execution service needs a RapidAPI key to run. Configure RAPIDAPI_KEY in .env.',
      };
    }

    const host = config.rapidApiHost;
    const headers = {
      'Content-Type': 'application/json',
      'X-RapidAPI-Key': config.rapidApiKey,
      'X-RapidAPI-Host': host,
    };

    try {
      // Submit asynchronously or with wait=false, then poll token
      const submitResponse = await axios.post(
        `https://${host}/submissions?base64_encoded=true&wait=false`,
        {
          source_code: Buffer.from(sourceCode).toString('base64'),
          language_id: config.judge0JavaLangId,
          stdin: Buffer.from(stdin).toString('base64'),
        },
        { headers, timeout: 10000 }
      );

      const token = submitResponse.data?.token;
      if (!token) {
        throw new Error('No submission token received from Judge0 RapidAPI');
      }

      // Poll up to executionTimeoutMs
      const pollStartTime = Date.now();
      while (Date.now() - pollStartTime < config.executionTimeoutMs) {
        await new Promise((r) => setTimeout(r, 1000));
        const checkResponse = await axios.get(
          `https://${host}/submissions/${token}?base64_encoded=true`,
          { headers, timeout: 5000 }
        );

        const statusId = checkResponse.data?.status?.id;
        // Status 1 = In Queue, 2 = Processing
        if (statusId > 2) {
          return this.formatJudge0Response(checkResponse.data, 'Judge0 RapidAPI');
        }
      }

      return {
        status: 'Time Limit Exceeded',
        stdout: '',
        stderr: 'The code took too long to finish executing.',
        compileOutput: '',
        time: null,
        memory: null,
        provider: 'Judge0 RapidAPI',
        beginnerExplanation: 'The computer was waiting for your code, but it took longer than 15 seconds. Did your loop forget to stop?',
      };
    } catch (err: any) {
      console.error('[Judge0 RapidAPI Error]:', err.message);
      return {
        status: 'Error',
        stdout: '',
        stderr: err.response?.data?.message || err.message,
        compileOutput: '',
        time: null,
        memory: null,
        provider: 'Judge0 RapidAPI',
        beginnerExplanation: 'We had trouble reaching the cloud code runner. Please verify your internet or RapidAPI quota!',
      };
    }
  }

  /**
   * Normalizes a Judge0 submission object into our clean ExecutionResult
   */
  private formatJudge0Response(sub: any, providerName: string): ExecutionResult {
    const statusDesc = sub.status?.description || 'Unknown';
    const stdout = this.decodeBase64(sub.stdout);
    const stderr = this.decodeBase64(sub.stderr);
    const compileOutput = this.decodeBase64(sub.compile_output);

    let normalizedStatus: ExecutionResult['status'] = 'Accepted';
    if (statusDesc === 'Accepted') {
      normalizedStatus = 'Accepted';
    } else if (statusDesc.includes('Compilation Error')) {
      normalizedStatus = 'Compilation Error';
    } else if (statusDesc.includes('Runtime Error')) {
      normalizedStatus = 'Runtime Error';
    } else if (statusDesc.includes('Time Limit Exceeded')) {
      normalizedStatus = 'Time Limit Exceeded';
    } else if (statusDesc.includes('Memory Limit Exceeded')) {
      normalizedStatus = 'Memory Limit Exceeded';
    } else {
      normalizedStatus = 'Error';
    }

    const beginnerExplanation = this.generateBeginnerExplanation(
      normalizedStatus,
      compileOutput,
      stderr
    );

    return {
      status: normalizedStatus,
      stdout,
      stderr,
      compileOutput,
      time: sub.time ? `${sub.time}s` : null,
      memory: sub.memory ? Math.round(sub.memory) : null,
      provider: providerName,
      beginnerExplanation,
    };
  }

  /**
   * Generates comforting, kindergarten-level explanations for common Java errors
   */
  public generateBeginnerExplanation(
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
      return "You opened a quotation mark `\"` to write some words, but forgot to close it with another `\"`! Quotation marks always come in pairs, like a pair of shoes!";
    }
    if (combined.includes("class Main is public, should be declared in a file named Main.java") || combined.includes("class, interface, enum, or record expected")) {
      return "Java needs to find a main class called `public class Main` and a starting point called `public static void main(String[] args)`. Make sure your code is inside those curly brackets `{ }`!";
    }
    if (combined.includes('reached end of file while parsing') || combined.includes("expected '}'")) {
      return "A curly bracket `{` was opened, but its matching closing bracket `}` is missing! Every left hug `{` needs a right hug `}`!";
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
      return "Java found a small spelling or punctuation mistake before it could run your code. Look at the red underline or line number!";
    }

    return undefined;
  }

  /**
   * Fallback response when no execution runner is configured
   */
  private getUnconfiguredResponse(): ExecutionResult {
    return {
      status: 'Unconfigured',
      stdout: '',
      stderr: 'Java Execution Service is currently unconfigured.\n\nTo enable live cloud Java execution:\n1. Run a local Judge0 CE docker container, OR\n2. Sign up for Judge0 on RapidAPI and set RAPIDAPI_KEY in .env, OR\n3. Set JAVA_EXECUTION_PROVIDER=judge0_ce or judge0_rapidapi.\n\nSee docs/JAVA_EXECUTION.md for full instructions.',
      compileOutput: '',
      time: null,
      memory: null,
      provider: 'Unconfigured (Local Setup Required)',
      beginnerExplanation: 'The code runner is currently waiting for setup! Your instructor or setup guide (docs/JAVA_EXECUTION.md) shows how to connect the Java execution engine.',
    };
  }
}

export const javaExecutionService = new JavaExecutionService();
