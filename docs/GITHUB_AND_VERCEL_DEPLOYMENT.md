# Step-by-Step Guide: Deploying JavaBuddy to GitHub and Vercel

This guide walks you through pushing the JavaBuddy project to **GitHub** and deploying the web application to **Vercel**.

---

## Part 1: Push Code to GitHub

### Step 1: Ensure Git is Installed
Open PowerShell and check if Git is installed:
```powershell
git --version
```

If Git is not installed, install it in one command using Windows `winget`:
```powershell
winget install --id Git.Git -e --source winget
```
*(After installing, close and re-open PowerShell so `git` is recognized in your PATH).*

---

### Step 2: Initialize Git in the Project Root
Navigate to the project root (`c:\Users\USER\OneDrive\Desktop\Java`):
```powershell
cd c:\Users\USER\OneDrive\Desktop\Java
git init
```

---

### Step 3: Stage and Commit the Code
Verify `.gitignore` is in place (which ignores `node_modules/`, `dist/`, and `.env`), then run:
```powershell
git add .
git commit -m "Initial commit of JavaBuddy web application"
```

---

### Step 4: Create a New GitHub Repository
1. Log into your account on [github.com](https://github.com).
2. Click the **+** (plus icon) in the top right corner and choose **New repository**.
3. Name your repository (e.g., `javabuddy`).
4. Set it to **Public** (or **Private**).
5. **Do NOT** check "Add a README file" or ".gitignore" (these already exist in your project).
6. Click **Create repository**.

---

### Step 5: Link and Push to GitHub
Copy the commands shown on GitHub under "...or push an existing repository from the command line":
```powershell
git branch -M main
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/javabuddy.git
git push -u origin main
```
Your code is now on GitHub!

---

## Part 2: Deploy Frontend to Vercel

Vercel provides automatic CI/CD deployment directly from your GitHub repository.

### Step 1: Sign in to Vercel
1. Go to [vercel.com](https://vercel.com).
2. Sign in using your **GitHub account**.

---

### Step 2: Import Your Repository
1. In the Vercel dashboard, click **Add New...** -> **Project**.
2. Find your `javabuddy` repository and click **Import**.

---

### Step 3: Configure Project Settings
JavaBuddy is configured for an **All-in-One Vercel Deployment** ([vercel.json](file:///c:/Users/USER/OneDrive/Desktop/Java/vercel.json)):
- Both the React frontend (`client`) and the backend API ([api/index.ts](file:///c:/Users/USER/OneDrive/Desktop/Java/api/index.ts)) deploy automatically under the exact same Vercel URL!
- **Root Directory**: Leave as `./` (Project Root)
- **Build Command**: `npm --prefix client run build`
- **Output Directory**: `client/dist`
- **Framework Preset**: `Vite` (or `Other`)

---

### Step 4: Add Environment Variables (Optional)
In the **Environment Variables** section on Vercel:
- **Java Execution Provider**:
  - `JAVA_EXECUTION_PROVIDER` = `judge0_rapidapi` (or `unconfigured`)
  - `RAPIDAPI_KEY` = `your_rapidapi_key` *(optional, for live cloud Java execution)*
  - `RAPIDAPI_HOST` = `judge0-ce.p.rapidapi.com`
- **AI Kindergarten Tutor**:
  - `AI_PROVIDER` = `gemini` *(optional; built-in kindergarten tutor works offline without this)*
  - `GEMINI_API_KEY` = `your_gemini_api_key`
- **Supabase Cloud Sync** *(optional; guest mode works without this)*:
  - `VITE_SUPABASE_URL` = `https://your-project.supabase.co`
  - `VITE_SUPABASE_ANON_KEY` = `your_anon_key`

*(If you don't add any environment variables, JavaBuddy operates automatically in **Guest Mode** via LocalStorage, with the built-in offline kindergarten tutor and interactive lessons ready to use immediately).*

---

### Step 5: Deploy
Click **Deploy**.
Vercel will build your project and provide you with a live URL (e.g., `https://javabuddy.vercel.app`).

> **How All-in-One Vercel Routing Works**:
> - `/api/*` requests (like `/api/execute`, `/api/tutor`, `/api/health`) route directly to the Vercel Serverless Function ([api/index.ts](file:///c:/Users/USER/OneDrive/Desktop/Java/api/index.ts)).
> - All other routes route to `index.html` via React Router SPA rewrites.
> - Because both frontend and backend share the same domain and SSL certificate, there are zero CORS issues and zero Mixed Content errors!

---

### Alternative: Standalone Backend on Render or Railway
If you prefer running the Express backend as a dedicated long-running service rather than serverless functions:
1. Connect your GitHub repository to [Render.com](https://render.com).
2. Set **Root Directory** to `server`.
3. Add `VITE_API_URL = https://your-backend.onrender.com` in your Vercel project environment variables.
