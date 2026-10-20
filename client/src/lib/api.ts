const API_BASE_URL = import.meta.env.VITE_API_URL ?? (
  typeof window !== 'undefined' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1'
    ? ''
    : 'http://localhost:3001'
);

export interface ExecutionResponse {
  status: 'Accepted' | 'Compilation Error' | 'Runtime Error' | 'Time Limit Exceeded' | 'Memory Limit Exceeded' | 'Unconfigured' | 'Rejected' | 'Error';
  stdout: string;
  stderr: string;
  compileOutput: string;
  time: string | null;
  memory: number | null;
  provider: string;
  beginnerExplanation?: string;
}

export interface ExecutionStatusResponse {
  provider: string;
  status: 'ready' | 'unconfigured' | 'offline';
  configured: boolean;
  languageId: number;
  maxBytes: number;
  rateLimitPerMin: number;
}

export interface TutorResponse {
  message: string;
  analogy?: string;
  kindergartenTip?: string;
  source: 'built-in' | 'gemini';
}

/**
 * Checks server health and execution service configuration
 */
export async function fetchExecutionStatus(): Promise<ExecutionStatusResponse> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/execute/status`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
    });
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }
    return await res.json();
  } catch (err: any) {
    return {
      provider: 'Server Offline',
      status: 'offline',
      configured: false,
      languageId: 62,
      maxBytes: 65536,
      rateLimitPerMin: 15,
    };
  }
}

/**
 * Submits Java code to the backend execution runner
 */
export async function executeJavaCode(sourceCode: string, stdin: string = ''): Promise<ExecutionResponse> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/execute`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sourceCode, stdin }),
    });

    if (res.status === 429) {
      const data = await res.json();
      return {
        status: 'Error',
        stdout: '',
        stderr: data.message || 'Rate limit exceeded. Please wait a moment!',
        compileOutput: '',
        time: null,
        memory: null,
        provider: 'Rate Limiter',
        beginnerExplanation: 'You ran code too many times in a minute! Take a sip of water and try again soon! 💧',
      };
    }

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      if (res.status === 405 || res.status === 404) {
        return {
          status: 'Unconfigured',
          stdout: '',
          stderr: 'Java Execution Service is currently operating in offline mode on this cloud deployment.\n\nTo enable live execution, set RAPIDAPI_KEY and JAVA_EXECUTION_PROVIDER=judge0_rapidapi in your Vercel Environment Variables, or run the local backend server with npm.cmd run dev:server.',
          compileOutput: '',
          time: null,
          memory: null,
          provider: 'Cloud Sandbox (Offline)',
          beginnerExplanation: 'The cloud code runner is resting! The Monaco editor, lesson examples, and kindergarten tutor are ready for you.',
        };
      }
      return {
        status: 'Error',
        stdout: '',
        stderr: errorData.message || `Server responded with HTTP ${res.status}`,
        compileOutput: '',
        time: null,
        memory: null,
        provider: 'Backend API Error',
        beginnerExplanation: 'The JavaBuddy server had a hiccup. Check if the backend is running!',
      };
    }

    return await res.json();
  } catch (err: any) {
    return {
      status: 'Error',
      stdout: '',
      stderr: `Cannot connect to JavaBuddy backend at ${API_BASE_URL}.\nMake sure the backend is running with 'npm run dev:server'.`,
      compileOutput: '',
      time: null,
      memory: null,
      provider: 'Connection Error',
      beginnerExplanation: 'Could not connect to the backend server. Start the server using npm run dev:server!',
    };
  }
}

/**
 * Sends a query to the AI Kindergarten Tutor
 */
export async function queryAiTutor(params: {
  queryType: 'eli3' | 'explain_lines' | 'example' | 'hint' | 'why_wrong' | 'easier_exercise' | 'try_again' | 'custom';
  userCode?: string;
  lessonId?: string;
  lessonTitle?: string;
  executionOutput?: {
    status: string;
    stdout?: string;
    stderr?: string;
    compileOutput?: string;
  };
  customMessage?: string;
}): Promise<TutorResponse> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/tutor`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });

    if (!res.ok) {
      throw new Error(`Tutor error ${res.status}`);
    }

    return await res.json();
  } catch (err: any) {
    // If backend is unreachable, provide high-quality fallback kindergarten response
    return {
      message: "I am right here with you! Remember: Java is just a set of friendly toy box labels and instructions. Check your semicolons and quotes!",
      analogy: "🧸 You've got this!",
      kindergartenTip: "Small steps make great programmers!",
      source: 'built-in',
    };
  }
}
