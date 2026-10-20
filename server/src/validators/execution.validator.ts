import { z } from 'zod';
import { config } from '../config';

export const executeRequestSchema = z.object({
  sourceCode: z.string({
    required_error: 'Source code is required',
  })
  .min(1, 'Source code cannot be empty')
  .max(config.maxSourceCodeBytes, `Source code exceeds maximum size limit of ${config.maxSourceCodeBytes} bytes`),
  
  stdin: z.string().max(config.maxStdinBytes, `Stdin input exceeds limit of ${config.maxStdinBytes} bytes`).optional().default(''),
});

export type ExecuteRequestBody = z.infer<typeof executeRequestSchema>;

export const tutorQuerySchema = z.object({
  queryType: z.enum([
    'eli3',
    'explain_lines',
    'example',
    'hint',
    'why_wrong',
    'easier_exercise',
    'try_again',
    'custom'
  ]),
  userCode: z.string().max(65536).optional().default(''),
  lessonId: z.string().max(100).optional(),
  lessonTitle: z.string().max(200).optional(),
  executionOutput: z.object({
    status: z.string(),
    stdout: z.string().optional(),
    stderr: z.string().optional(),
    compileOutput: z.string().optional(),
  }).optional(),
  customMessage: z.string().max(1000).optional(),
});

export type TutorQueryBody = z.infer<typeof tutorQuerySchema>;
