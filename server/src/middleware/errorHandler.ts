import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

export const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  // Handle Zod validation errors
  if (err instanceof ZodError) {
    res.status(400).json({
      error: 'Validation Error',
      message: err.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', '),
      status: 'Rejected',
    });
    return;
  }

  // Handle malformed JSON body
  if (err.type === 'entity.parse.failed') {
    res.status(400).json({
      error: 'Malformed Request',
      message: 'Invalid JSON format in request body.',
      status: 'Rejected',
    });
    return;
  }

  // General server error
  console.error('[JavaBuddy Server Error]:', err?.message || err);
  res.status(err.status || 500).json({
    error: 'Internal Server Error',
    message: err.message || 'Something went wrong on the JavaBuddy server. Please try again.',
    status: 'Error',
  });
};
