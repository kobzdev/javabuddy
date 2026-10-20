# JavaBuddy — Local Development Setup Guide

Welcome to **JavaBuddy: Learn Java Like You're 3 Years Old**! This guide walks you through setting up and running the application locally.

---

## 1. Prerequisites

Ensure your development machine has:
- **Node.js**: Version 18.0.0 or later (`node -v`)
- **npm**: Version 9.0.0 or later (`npm -v`)
- **Git**: (Optional, for version control)
- **Docker**: (Optional, if you wish to run a self-hosted Judge0 CE runner locally)

---

## 2. Repository Structure

```
javabuddy/
├── client/              # React + Vite + TypeScript frontend
├── server/              # Express + TypeScript backend API
├── supabase/
│   └── migrations/      # PostgreSQL migrations & RLS policies
├── docs/                # Setup, Execution, and Deployment documentation
├── .env.example         # Template environment variables
├── package.json         # Monorepo task orchestration scripts
└── README.md
```

---

## 3. Quickstart Installation

From the project root directory, install dependencies for both the frontend and backend:

```bash
# On Windows PowerShell:
npm.cmd install --prefix client
npm.cmd install --prefix server

# On macOS / Linux:
npm install --prefix client
npm install --prefix server
```

---

## 4. Environment Variables Configuration

Copy `.env.example` to `.env` in the root (or `server/.env`):

```bash
cp .env.example .env
```

Default variables:
```env
PORT=3001
CLIENT_URL=http://localhost:5173
NODE_ENV=development

# Java Execution Engine ('unconfigured', 'judge0_ce', or 'judge0_rapidapi')
JAVA_EXECUTION_PROVIDER=unconfigured

# Optional RapidAPI Judge0 Credentials
# RAPIDAPI_KEY=your_key_here
# RAPIDAPI_HOST=judge0-ce.p.rapidapi.com
JUDGE0_JAVA_LANG_ID=62

# Optional Supabase Credentials (for cloud sync; guest mode works without these)
# VITE_SUPABASE_URL=https://your-project.supabase.co
# VITE_SUPABASE_ANON_KEY=your_key_here
```

> **Note:** The entire core learning curriculum, interactive Monaco editor, quizzes, practice mini-games, and AI tutor operate immediately in **Guest Mode** using browser LocalStorage. No Supabase account is required to start learning!

---

## 5. Running the Application

### Option A: Run Backend and Frontend Concurrently

In **Terminal 1 (Backend API)**:
```bash
npm.cmd --prefix server run dev
# Backend starts at: http://localhost:3001
```

In **Terminal 2 (Frontend Client)**:
```bash
npm.cmd --prefix client run dev
# Frontend starts at: http://localhost:5173
```

Visit **`http://localhost:5173`** in your browser.

---

## 6. Verifying Important Workflows

1. **Home Dashboard**: View your current Level, XP count, Streak flame, and daily goal progress.
2. **Learning Path**: Open Level 1 ("My First Java Program") and complete the storybook lesson.
3. **Monaco Code Editor**: Edit code and click **Run Code**. Notice the console output and beginner-friendly error decoder.
4. **Interactive Quiz**: Complete the 3 questions at the bottom of a lesson and watch the celebration confetti upon 100%!
5. **Practice Games**: Try "Guess the Output", "Fix the Code", and "Mini Projects".
6. **AI Kindergarten Teacher**: Click the purple **Teacher** button to ask "Explain Like I'm 3" or get line-by-line breakdowns.

---

## 7. Troubleshooting

- **PowerShell Execution Policy**: If running `npm` produces a script security error on Windows, always invoke `npm.cmd` instead.
- **Port Conflicts**: If port 3001 or 5173 is already occupied, customize `PORT` in `.env` and `VITE_API_URL` in `client/.env.local`.
- **CORS Errors**: Ensure `CLIENT_URL=http://localhost:5173` matches the exact port Vite is serving.
