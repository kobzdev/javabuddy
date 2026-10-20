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
JavaBuddy already contains a pre-configured [vercel.json](file:///c:/Users/USER/OneDrive/Desktop/Java/vercel.json) that automatically handles builds and React Router SPA rewrites.

If configuring manually in the Vercel UI:
- **Framework Preset**: `Vite`
- **Root Directory**: Click `Edit` and select `client`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

---

### Step 4: Add Environment Variables (Optional)
In the **Environment Variables** section on Vercel:
- If you deploy your backend API (see Part 3 below), add:
  - `VITE_API_URL` = `https://your-backend.onrender.com`
- If you use Supabase cloud sync:
  - `VITE_SUPABASE_URL` = `https://your-project.supabase.co`
  - `VITE_SUPABASE_ANON_KEY` = `your_anon_key`

*(If you don't add any environment variables, JavaBuddy automatically runs in **Guest Mode** via LocalStorage, with the built-in AI teacher and curriculum ready to use immediately).*

---

### Step 5: Deploy
Click **Deploy**.
Vercel will build your project in ~30 seconds and provide you with a live URL (e.g., `https://javabuddy.vercel.app`).

> **Why React Router SPA Works on Vercel**:
> We created [client/vercel.json](file:///c:/Users/USER/OneDrive/Desktop/Java/client/vercel.json) with `rewrites: [{"source": "/(.*)", "destination": "/index.html"}]`. This ensures refreshing on routes like `/learn`, `/playground`, or `/lesson/level-1-first-program` will never produce a 404 error on Vercel!

---

## Part 3: Deploy the Backend API (Optional for Cloud Execution)

Vercel hosts the React frontend. To host the Node.js/Express backend (`server/`):

1. **Recommended Free Host**: [Render.com](https://render.com) or [Railway.app](https://railway.app).
2. Connect your GitHub repository.
3. Configure the Web Service:
   - **Root Directory**: `server`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `node dist/server.js`
4. Set Environment Variables:
   - `PORT`: `10000` (or host assigned)
   - `CLIENT_URL`: `https://your-javabuddy-frontend.vercel.app`
   - `JAVA_EXECUTION_PROVIDER`: `judge0_rapidapi` (or `unconfigured`)
   - `RAPIDAPI_KEY`: *(your RapidAPI key if enabling live cloud execution)*
5. Copy the live Render backend URL (e.g. `https://javabuddy-api.onrender.com`) and paste it as `VITE_API_URL` in your Vercel project settings.
