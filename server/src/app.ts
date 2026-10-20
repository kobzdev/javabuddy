import express from 'express';
import cors from 'cors';
import executionRoutes from './routes/execution.routes';
import tutorRoutes from './routes/tutor.routes';
import { errorHandler } from './middleware/errorHandler';
import { config } from './config';

export const app = express();

// Middlewares
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin or from any local or Vercel preview/production domain
    if (!origin || origin.includes('localhost') || origin.includes('127.0.0.1') || origin.endsWith('.vercel.app') || (config.clientUrl && origin === config.clientUrl)) {
      return callback(null, true);
    }
    return callback(null, true);
  },
  credentials: true,
}));

app.use(express.json({ limit: '100kb' }));

const healthResponse = (_req: express.Request, res: express.Response) => {
  res.json({
    status: 'ok',
    app: 'JavaBuddy API Server',
    time: new Date().toISOString(),
    provider: config.executionProvider,
  });
};

// Health Check & Root Handlers
app.get('/api/health', healthResponse);
app.get('/health', healthResponse);
app.get('/api', healthResponse);
app.get('/', healthResponse);

// Main API Routes (mounted with /api and direct path so Vercel rewrites work seamlessly)
app.use('/api/execute', executionRoutes);
app.use('/execute', executionRoutes);
app.use('/api/tutor', tutorRoutes);
app.use('/tutor', tutorRoutes);

// Error Handling Middleware (must be registered after routes)
app.use(errorHandler);
