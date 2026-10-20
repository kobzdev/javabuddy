# ☕ JavaBuddy: Learn Java Like You're 3 Years Old

> **The warm, joyful, patient way to learn Java from complete zero to job-ready fundamentals.**

![JavaBuddy Kindergarten Learning](https://img.shields.io/badge/JavaBuddy-Age%203%2B%20Mode-8b5cf6?style=for-the-badge&logo=coffeescript&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-19-61dafb?style=for-the-badge&logo=react&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Monaco Editor](https://img.shields.io/badge/Monaco_Editor-Java_17-purple?style=for-the-badge)

JavaBuddy teaches programming like a kind kindergarten teacher. Every complex concept is broken down into everyday things: **toy boxes with sticky labels** (variables), **cookie cutters** (classes), **weather raincoats** (if-else decisions), **merry-go-rounds** (loops), and **spill-proof sippy cups** (try-catch error handling).

---

## ✨ Features at a Glance

- 🧸 **10 Progressive Levels**:
  1. *My First Java Program* (System.out.println, Class Main, semicolons)
  2. *Variables and Data Types* (String, int, double, boolean)
  3. *Decisions* (if, else, else if, comparison & logical operators)
  4. *Loops* (for, while, counters, break & continue)
  5. *Collections* (Arrays, ArrayLists, 0-based indexing)
  6. *Methods* (Parameters, return values, method overloading)
  7. *Object-Oriented Programming* (Classes, Objects, Constructors, Fields)
  8. *Debugging & Exceptions* (Syntax vs runtime errors, stack traces, try-catch)
  9. *Intermediate Java* (Packages, static, final, Generics, Lambdas)
  10. *Building Real Applications* (JSON, REST APIs, HTTP status codes, Spring Boot intro)

- 📜 **12 Mandatory Lesson Parts**: Every lesson includes Objective, Story/Analogy, Simple Explanation, Code Snippet, Line-by-Line Breakdown, Visual Diagram, Interactive Playground, Guided Exercise with hints, Independent Challenge, 3-Question Quiz with feedback, and Completion Indicator.

- 💻 **Monaco Java Code Playground**:
  - Live Java syntax highlighting and line numbers
  - Preloaded beginner examples
  - Standard output, standard error, compilation logs, execution time, and memory usage
  - Clear badge distinguishing live execution from sample outputs
  - Stdin input support

- 🔍 **Beginner-Friendly Error Decoder**:
  - Automatically translates scary compiler errors (`';' expected`, `cannot find symbol`, `ArrayIndexOutOfBoundsException`) into comforting kindergarten explanations.

- 🤖 **AI Kindergarten Teacher**:
  - Quick action chips: *"Explain Like I'm 3"*, *"Explain Every Line"*, *"Give Me an Example"*, *"Give Me a Hint"*, *"Why Is My Code Wrong?"*, *"Easier Exercise"*, *"Cheer Me Up!"*
  - Works 100% offline with rich built-in explanations, or connects optionally to Gemini AI.

- 🎮 **Practice Games & Mini Projects**:
  - *Guess the Output*, *Fix the Code*, *Fill in the Blank*, *Find the Bug*, *Build a Program*
  - Unlockable Mini Projects: Greeting Bot, Simple Calculator, Secret Number Guesser, Virtual Pet Simulator, Cave of Wonders Text Adventure.

- 🏆 **Gamification & Progress**:
  - Experience Points (XP) & leveling system
  - 10 Collectible Achievement Badges
  - Real calendar-date streak calculation
  - Weak topics detection for targeted review
  - Instant guest mode via LocalStorage + optional Supabase cloud sync

---

## 🚀 Quick Start Guide

### 1. Install Dependencies
```bash
# On Windows:
npm.cmd install --prefix client
npm.cmd install --prefix server

# On macOS / Linux:
npm install --prefix client
npm install --prefix server
```

### 2. Configure Environment
```bash
cp .env.example .env
```
*(By default, the app is preconfigured for instant guest learning without requiring any paid API keys).*

### 3. Run Development Servers
In Terminal 1:
```bash
npm.cmd --prefix server run dev
```
In Terminal 2:
```bash
npm.cmd --prefix client run dev
```

Open **`http://localhost:5173`** in your browser.

---

## ☕ Java Code Execution

JavaBuddy uses a dedicated backend runner architecture to safely isolate submitted code:
- **Judge0 CE**: Self-hosted Docker container with `isolate` sandbox.
- **Judge0 RapidAPI**: Managed cloud runner.
- **Honest Unconfigured Fallback**: When no external runner credentials are provided, JavaBuddy clearly explains how to configure Judge0 and keeps the code editor interactive without fabricating simulated output.

See [`docs/JAVA_EXECUTION.md`](docs/JAVA_EXECUTION.md) for full setup instructions.

---

## 📚 Documentation Links

- [Local Development Setup](docs/SETUP.md)
- [Java Execution Configuration](docs/JAVA_EXECUTION.md)
- [Production Deployment Guide](docs/DEPLOYMENT.md)
- [Supabase Initial Schema & RLS Policies](supabase/migrations/001_initial_schema.sql)

---

## 💜 License & Kindergarten Spirit
Built with love, patience, and lots of hot cocoa for beginning programmers of all ages. Licensed under the MIT License.
