# JavaBuddy — Production Deployment Guide

This document describes how to deploy JavaBuddy to production across static frontend hosts, Node.js backend runtimes, and Supabase.

---

## 1. Architecture Matrix

| Component | Recommended Host | Alternatives |
|---|---|---|
| **Frontend Client** | Vercel | Netlify, Cloudflare Pages, AWS S3 + CloudFront |
| **Backend API** | Render / Railway | Fly.io, AWS ECS, DigitalOcean App Platform |
| **Database & Auth** | Supabase Cloud | Managed PostgreSQL |
| **Code Runner** | Managed Judge0 / Self-Hosted EC2 | RapidAPI Judge0 |

---

## 2. Supabase Database Deployment

1. Create a project at [supabase.com](https://supabase.com).
2. Go to the **SQL Editor** in the Supabase Dashboard.
3. Open `supabase/migrations/001_initial_schema.sql` from this repository.
4. Paste and execute the script.
   - This creates tables: `profiles`, `achievements`, `lesson_progress`, `quiz_attempts`, `user_achievements`, `daily_activity`.
   - Enables Row Level Security (RLS) policies.
   - Seeds initial achievement badges.
5. In **Project Settings -> API**, copy:
   - `Project URL`
   - `anon public key`
   - `service_role secret key`

---

## 3. Backend Deployment (Render / Railway / Node.js)

1. Deploy the `server/` directory as a Node.js web service.
2. Build command: `npm install && npm run build`
3. Start command: `node dist/server.js`
4. Set the following environment variables:
   ```env
   NODE_ENV=production
   PORT=10000
   CLIENT_URL=https://your-frontend-domain.vercel.app
   JAVA_EXECUTION_PROVIDER=judge0_rapidapi
   RAPIDAPI_KEY=your_production_rapidapi_key
   RAPIDAPI_HOST=judge0-ce.p.rapidapi.com
   JUDGE0_JAVA_LANG_ID=62
   EXECUTION_RATE_LIMIT_PER_MINUTE=25
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```
5. Verify health: `GET https://your-backend.onrender.com/api/health`

---

## 4. Frontend Deployment (Vercel)

1. Import your Git repository into Vercel.
2. Set the **Root Directory** to `client`.
3. Framework Preset: **Vite**
4. Build Command: `npm run build`
5. Output Directory: `dist`
6. Set Environment Variables:
   ```env
   VITE_API_URL=https://your-backend.onrender.com
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
7. Click **Deploy**.

---

## 5. Production Health Verification Checklist

- [ ] `GET /api/health` returns `{"status": "ok"}`
- [ ] `GET /api/execute/status` returns configured provider
- [ ] Monaco editor loads and highlights Java syntax
- [ ] Submitting code executes and returns standard output within 15 seconds
- [ ] Quizzes score correctly and award badges upon completion
- [ ] Guest progress persists across page reloads via LocalStorage
- [ ] Responsive UI functions on mobile, tablet, and desktop viewports
