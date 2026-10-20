import express from 'express';
import cors from 'cors';
import executionRoutes from './routes/execution.routes';
import tutorRoutes from './routes/tutor.routes';
import { errorHandler } from './middleware/errorHandler';
import { config } from './config';

export const app = express();

// Middlewares
app.use(cors({
  origin: [config.clientUrl, 'http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:5173'],
  credentials: true,
}));

app.use(express.json({ limit: '100kb' }));

// Health Check
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    app: 'JavaBuddy API Server',
    time: new Date().toISOString(),
    provider: config.executionProvider,
  });
});

// Main API Routes
app.use('/api/execute', executionRoutes);
app.use('/api/tutor', tutorRoutes);

// Error Handling Middleware (must be registered after routes)
app.use(errorHandler);
