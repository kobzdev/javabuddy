import { app } from './app';
import { config } from './config';

const PORT = config.port;

app.listen(PORT, () => {
  console.log(`[JavaBuddy API] ☕ Server running smoothly on http://localhost:${PORT}`);
  console.log(`[JavaBuddy API] 🚀 Execution Provider configured as: "${config.executionProvider}"`);
  console.log(`[JavaBuddy API] 🤖 AI Tutor Provider configured as: "${config.aiProvider}"`);
});
