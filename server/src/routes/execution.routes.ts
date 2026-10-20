import { Router, Request, Response, NextFunction } from 'express';
import { executeRequestSchema } from '../validators/execution.validator';
import { rateLimiter } from '../middleware/rateLimiter';
import { javaExecutionService } from '../services/javaExecution.service';
import { config } from '../config';

const router = Router();

// GET /api/execute/status - Return execution engine readiness and configuration
router.get('/status', (_req: Request, res: Response) => {
  res.json({
    provider: config.executionProvider,
    status: config.executionProvider === 'unconfigured' ? 'unconfigured' : 'ready',
    configured: config.executionProvider !== 'unconfigured',
    languageId: config.judge0JavaLangId,
    maxBytes: config.maxSourceCodeBytes,
    rateLimitPerMin: config.executionRateLimitPerMin,
  });
});

// POST /api/execute - Execute Java source code
router.post('/', rateLimiter, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedBody = executeRequestSchema.parse(req.body);
    const result = await javaExecutionService.execute(
      validatedBody.sourceCode,
      validatedBody.stdin
    );

    res.json(result);
  } catch (err) {
    next(err);
  }
});

export default router;
