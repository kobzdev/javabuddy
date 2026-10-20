# Java Execution Architecture & Provider Setup

JavaBuddy executes student code through an isolated server-side architecture. Arbitrary user code is **never** executed inside the main Express server process.

---

## 1. Execution Flow Overview

```
[Browser / Monaco Editor]
         │
         │ POST /api/execute { sourceCode, stdin }
         ▼
[Express Backend Server]
  ├─ Zod Schema Validation (reject oversized payloads > 64KB)
  ├─ In-Memory Rate Limiter (20 requests / min / IP)
  └─ JavaExecutionService Adapter
         │
         ├── Option A: Self-Hosted Judge0 CE (Docker Sandbox)
         ├── Option B: RapidAPI Judge0 Cloud Runner
         └── Option C: Graceful Unconfigured State (Clear UI setup message)
         │
         ▼
[Normalized Response Payload]
{
  "status": "Accepted" | "Compilation Error" | "Runtime Error" | "Time Limit Exceeded" | "Unconfigured",
  "stdout": string,
  "stderr": string,
  "compileOutput": string,
  "time": string | null,
  "memory": number | null,
  "provider": string,
  "beginnerExplanation": string
}
```

---

## 2. Option A: Self-Hosted Judge0 CE (Recommended for Local Dev)

Judge0 CE provides a hardened sandboxed execution environment using `isolate`.

### Step 1: Run Judge0 CE via Docker
You can launch the official Judge0 CE docker stack:

```bash
# 1. Download official Judge0 docker-compose
wget https://github.com/judge0/judge0/releases/download/v1.13.1/judge0-v1.13.1.zip
unzip judge0-v1.13.1.zip
cd judge0-v1.13.1

# 2. Generate configuration and launch
docker-compose up -d db redis
sleep 10
docker-compose up -d
```

### Step 2: Configure JavaBuddy `.env`
Update your `.env` file:
```env
JAVA_EXECUTION_PROVIDER=judge0_ce
JUDGE0_CE_URL=http://localhost:2358
JUDGE0_AUTH_TOKEN=
JUDGE0_JAVA_LANG_ID=62
```

### Step 3: Test Local Execution
Restart the JavaBuddy backend (`npm.cmd --prefix server run dev`). Submitting code from the editor will now execute inside the local Judge0 container.

---

## 3. Option B: RapidAPI Judge0 Cloud Runner (Zero-Infrastructure Setup)

If you prefer a cloud runner without running Docker locally:

1. Create a free account at [RapidAPI](https://rapidapi.com/).
2. Subscribe to the **Judge0 CE** API on RapidAPI (includes free tier quotas).
3. Copy your `X-RapidAPI-Key`.
4. Update `.env`:
   ```env
   JAVA_EXECUTION_PROVIDER=judge0_rapidapi
   RAPIDAPI_KEY=your_actual_rapidapi_key_here
   RAPIDAPI_HOST=judge0-ce.p.rapidapi.com
   JUDGE0_JAVA_LANG_ID=62
   ```
5. Restart your backend server.

---

## 4. Option C: Unconfigured Mode (Honest Fallback)

If no execution runner credentials are configured:
- `JAVA_EXECUTION_PROVIDER=unconfigured`
- The Monaco editor remains fully interactive and responsive.
- Submissions receive a status of `Unconfigured` with clear instructions on how to configure Judge0.
- **JavaBuddy never fabricates or fakes execution results.** The UI explicitly flags when live execution is unconfigured versus live.

---

## 5. Security & Isolation Boundaries

- **Input Size Limits**: Payloads over 64KB are rejected immediately.
- **Process Isolation**: No `exec()` or `spawn()` is performed directly on the host operating system without sandbox isolation.
- **Resource Limits**: 
  - Execution timeout: 15 seconds
  - Memory limit: 256MB
  - Stack limit: 64MB
  - Max processes: 60
- **Rate Limiting**: IP-based sliding window prevents resource starvation.
- **Credential Protection**: RapidAPI keys and Judge0 auth tokens are exclusively kept server-side and never leaked in client bundles.
