import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { MobileNav } from './components/layout/MobileNav';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { LearnPage } from './pages/LearnPage';
import { LessonPage } from './pages/LessonPage';
import { PlaygroundPage } from './pages/PlaygroundPage';
import { PracticePage } from './pages/PracticePage';
import { ProgressPage } from './pages/ProgressPage';
import { SettingsPage } from './pages/SettingsPage';
import { AiTutorModal } from './components/tutor/AiTutorModal';
import { loadProgress, saveProgress } from './lib/storage';
import { UserProgress } from './types';

export const App: React.FC = () => {
  // Theme state
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem('javabuddy_theme');
    if (saved) return saved === 'dark';
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // User progress state
  const [progress, setProgress] = useState<UserProgress>(loadProgress);

  // Global AI Tutor Modal state
  const [tutorOpen, setTutorOpen] = useState<boolean>(false);
  const [tutorContext, setTutorContext] = useState<{ title?: string; code?: string; output?: any }>({});

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('javabuddy_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('javabuddy_theme', 'light');
    }
  }, [isDark]);

  const toggleDark = () => {
    setIsDark(prev => !prev);
  };

  const handleUpdateProgress = (newProgress: UserProgress) => {
    setProgress(newProgress);
    saveProgress(newProgress);
  };

  const handleOpenTutor = (title?: string, code?: string, output?: any) => {
    setTutorContext({ title, code, output });
    setTutorOpen(true);
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-[#fcfbfe] dark:bg-[#0f0d19] text-[#2d264b] dark:text-[#f3f0fc] transition-colors duration-200">
        <Navbar
          progress={progress}
          isDark={isDark}
          toggleDark={toggleDark}
        />

        <main className="flex-1">
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  progress={progress}
                  onOpenTutor={() => handleOpenTutor()}
                />
              }
            />
            <Route
              path="/learn"
              element={<LearnPage progress={progress} />}
            />
            <Route
              path="/lesson/:lessonId"
              element={
                <LessonPage
                  progress={progress}
                  onUpdateProgress={handleUpdateProgress}
                  onOpenTutor={handleOpenTutor}
                />
              }
            />
            <Route
              path="/playground"
              element={<PlaygroundPage onOpenTutor={handleOpenTutor} />}
            />
            <Route
              path="/practice"
              element={
                <PracticePage
                  progress={progress}
                  onUpdateProgress={handleUpdateProgress}
                  onOpenTutor={handleOpenTutor}
                />
              }
            />
            <Route
              path="/progress"
              element={<ProgressPage progress={progress} />}
            />
            <Route
              path="/settings"
              element={
                <SettingsPage
                  progress={progress}
                  onUpdateProgress={handleUpdateProgress}
                  isDark={isDark}
                  toggleDark={toggleDark}
                />
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer />
        <MobileNav />

        {/* Global AI Tutor Slide-Over */}
        <AiTutorModal
          isOpen={tutorOpen}
          onClose={() => setTutorOpen(false)}
          lessonTitle={tutorContext.title}
          userCode={tutorContext.code}
          executionOutput={tutorContext.output}
        />
      </div>
    </BrowserRouter>
  );
};

export default App;
