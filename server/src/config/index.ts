import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file (either server/.env or root .env)
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });
dotenv.config(); // fallback to current dir

export const config = {
  port: parseInt(process.env.PORT || '3001', 10),
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  nodeEnv: process.env.NODE_ENV || 'development',

  // Java Execution
  executionProvider: process.env.JAVA_EXECUTION_PROVIDER || 'unconfigured', // 'judge0_ce' | 'judge0_rapidapi' | 'local' | 'unconfigured'
  judge0Url: process.env.JUDGE0_CE_URL || 'http://localhost:2358',
  judge0AuthToken: process.env.JUDGE0_AUTH_TOKEN || '',
  rapidApiKey: process.env.RAPIDAPI_KEY || '',
  rapidApiHost: process.env.RAPIDAPI_HOST || 'judge0-ce.p.rapidapi.com',
  judge0JavaLangId: parseInt(process.env.JUDGE0_JAVA_LANG_ID || '62', 10), // 62 is OpenJDK in standard Judge0
  
  // Execution constraints
  maxSourceCodeBytes: parseInt(process.env.MAX_SOURCE_CODE_BYTES || '65536', 10), // 64KB
  maxStdinBytes: parseInt(process.env.MAX_STDIN_BYTES || '4096', 10), // 4KB
  executionTimeoutMs: parseInt(process.env.EXECUTION_TIMEOUT_MS || '15000', 10),
  executionRateLimitPerMin: parseInt(process.env.EXECUTION_RATE_LIMIT_PER_MINUTE || '20', 10),

  // AI Tutor (Optional external provider)
  aiProvider: process.env.AI_PROVIDER || 'disabled', // 'gemini' | 'disabled'
  geminiApiKey: process.env.GEMINI_API_KEY || '',
  aiModelName: process.env.AI_MODEL_NAME || 'gemini-2.0-flash',

  // Supabase (Optional server-side validation / sync)
  supabaseUrl: process.env.SUPABASE_URL || '',
  supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
};
