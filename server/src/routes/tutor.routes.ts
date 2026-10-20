import { Router, Request, Response, NextFunction } from 'express';
import { tutorQuerySchema } from '../validators/execution.validator';
import { aiTutorService } from '../services/aiTutor.service';

const router = Router();

// POST /api/tutor - Ask the AI Kindergarten Teacher
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedBody = tutorQuerySchema.parse(req.body);
    const response = await aiTutorService.answer(validatedBody);
    res.json(response);
  } catch (err) {
    next(err);
  }
});

export default router;
