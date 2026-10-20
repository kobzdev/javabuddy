import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  Sun, 
  Moon, 
  Target, 
  Server, 
  Database, 
  RotateCcw, 
  CheckCircle2, 
  AlertTriangle, 
  HelpCircle,
  ShieldCheck,
  BookOpen
} from 'lucide-react';
import { UserProgress } from '../types';
import { resetAllProgress, saveProgress } from '../lib/storage';
import { fetchExecutionStatus, ExecutionStatusResponse } from '../lib/api';
import { isSupabaseConfigured } from '../lib/supabase';

interface SettingsPageProps {
  progress: UserProgress;
  onUpdateProgress: (newProgress: UserProgress) => void;
  isDark: boolean;
  toggleDark: () => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({
  progress,
  onUpdateProgress,
  isDark,
  toggleDark,
}) => {
  const [execStatus, setExecStatus] = useState<ExecutionStatusResponse | null>(null);
  const [checkingServer, setCheckingServer] = useState<boolean>(false);
  const [confirmReset, setConfirmReset] = useState<boolean>(false);

  const checkStatus = async () => {
    setCheckingServer(true);
    const status = await fetchExecutionStatus();
    setExecStatus(status);
    setCheckingServer(false);
  };

  useEffect(() => {
    checkStatus();
  }, []);

  const handleDailyGoalChange = (newGoal: number) => {
    const updated = { ...progress, dailyGoal: newGoal };
    onUpdateProgress(updated);
    saveProgress(updated);
  };

  const handleResetProgress = () => {
    if (!confirmReset) {
      setConfirmReset(true);
      return;
    }
    const fresh = resetAllProgress();
    onUpdateProgress(fresh);
    setConfirmReset(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn pb-24">
      {/* Header */}
      <div className="border-b border-purple-100 dark:border-purple-900/40 pb-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-buddy-purple-100 dark:bg-purple-950/60 border border-buddy-purple-200 dark:border-purple-800 text-buddy-purple-700 dark:text-purple-300 text-xs font-bold uppercase tracking-wider mb-2">
          <Settings className="w-3.5 h-3.5" />
          <span>App Preferences</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 dark:text-purple-100">
          Settings & Environment Status
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
          Customize your learning preferences, inspect the Java execution runner, and manage progress.
        </p>
      </div>

      <div className="space-y-6">
        {/* Appearance Section */}
        <div className="p-6 bg-white dark:bg-[#1a1728] rounded-3xl border border-purple-100 dark:border-purple-900/40 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-gray-900 dark:text-purple-100 flex items-center gap-2">
            <span>Color Theme</span>
          </h2>
          <div className="flex items-center gap-3">
            <button
              onClick={toggleDark}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-2xl border text-sm font-bold transition-all ${
                !isDark
                  ? 'bg-buddy-purple-100 border-buddy-purple-500 text-buddy-purple-900 shadow-sm'
                  : 'bg-gray-50 dark:bg-purple-950/40 border-gray-200 dark:border-purple-900/40 text-gray-600 dark:text-gray-300'
              }`}
            >
              <Sun className="w-4 h-4 text-amber-500" />
              <span>Light Mode</span>
            </button>

            <button
              onClick={toggleDark}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-2xl border text-sm font-bold transition-all ${
                isDark
                  ? 'bg-buddy-purple-900/60 border-buddy-purple-500 text-white shadow-sm'
                  : 'bg-gray-50 dark:bg-purple-950/40 border-gray-200 dark:border-purple-900/40 text-gray-600 dark:text-gray-300'
              }`}
            >
              <Moon className="w-4 h-4 text-purple-400" />
              <span>Dark Mode</span>
            </button>
          </div>
        </div>

        {/* Daily Learning Goal Section */}
        <div className="p-6 bg-white dark:bg-[#1a1728] rounded-3xl border border-purple-100 dark:border-purple-900/40 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-gray-900 dark:text-purple-100 flex items-center gap-2">
              <Target className="w-4 h-4 text-buddy-purple-600" />
              <span>Daily XP Learning Target</span>
            </h2>
            <span className="text-xs font-bold text-buddy-purple-600">
              Current: {progress.dailyGoal} XP / day
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[30, 50, 100].map(goal => (
              <button
                key={goal}
                onClick={() => handleDailyGoalChange(goal)}
                className={`py-2.5 px-4 rounded-2xl border text-xs sm:text-sm font-bold transition-all ${
                  progress.dailyGoal === goal
                    ? 'bg-buddy-purple-600 text-white border-buddy-purple-600 shadow-bubble-purple'
                    : 'bg-gray-50 dark:bg-[#252038] border-gray-200 dark:border-purple-900/40 text-gray-700 dark:text-gray-300'
                }`}
              >
                {goal} XP {goal === 30 ? '(Casual)' : goal === 50 ? '(Regular)' : '(Ambitious)'}
              </button>
            ))}
          </div>
        </div>

        {/* Backend Execution Service Health & Status */}
        <div className="p-6 bg-white dark:bg-[#1a1728] rounded-3xl border border-purple-100 dark:border-purple-900/40 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-gray-900 dark:text-purple-100 flex items-center gap-2">
              <Server className="w-4 h-4 text-buddy-purple-600" />
              <span>Java Execution Engine Status</span>
            </h2>
            <button
              onClick={checkStatus}
              disabled={checkingServer}
              className="text-xs font-bold text-buddy-purple-600 hover:underline"
            >
              {checkingServer ? 'Checking...' : 'Refresh Status'}
            </button>
          </div>

          {execStatus ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-gray-50 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/30">
                <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                  Configured Runner
                </span>
                <span className="text-xs font-bold text-purple-700 dark:text-purple-300">
                  {execStatus.provider}
                </span>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-gray-50 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/30">
                <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                  Execution Readiness
                </span>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                    execStatus.status === 'ready'
                      ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border-emerald-300'
                      : execStatus.status === 'unconfigured'
                      ? 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border-amber-300'
                      : 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 border-rose-300'
                  }`}
                >
                  {execStatus.status.toUpperCase()}
                </span>
              </div>

              {execStatus.status === 'unconfigured' && (
                <div className="p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 rounded-xl text-xs text-amber-900 dark:text-amber-200">
                  <p className="font-bold mb-1">Notice on Live Code Execution:</p>
                  <p>
                    Java execution provider is currently unconfigured. The interactive playground and lessons remain fully functional for writing, inspecting, and studying code. To enable live compilation and execution on real OpenJDK servers, configure Judge0 CE or RapidAPI as detailed in <code className="font-bold">docs/JAVA_EXECUTION.md</code>.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-xs text-gray-500 py-3">Connecting to backend server...</div>
          )}
        </div>

        {/* Database & Cloud Sync Status */}
        <div className="p-6 bg-white dark:bg-[#1a1728] rounded-3xl border border-purple-100 dark:border-purple-900/40 shadow-sm space-y-3">
          <h2 className="text-base font-bold text-gray-900 dark:text-purple-100 flex items-center gap-2">
            <Database className="w-4 h-4 text-buddy-purple-600" />
            <span>Storage & Cloud Sync</span>
          </h2>
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-gray-50 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/30">
            <div>
              <p className="text-xs font-bold text-gray-800 dark:text-purple-200">
                Local Browser Storage (Guest Mode)
              </p>
              <p className="text-[11px] text-gray-500 dark:text-gray-400">
                Your progress is automatically saved locally in your browser.
              </p>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300">
              Active
            </span>
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-gray-50 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/30">
            <div>
              <p className="text-xs font-bold text-gray-800 dark:text-purple-200">
                Supabase Cloud Sync
              </p>
              <p className="text-[11px] text-gray-500 dark:text-gray-400">
                {isSupabaseConfigured
                  ? 'Connected to cloud PostgreSQL & Supabase Auth'
                  : 'Optional — not configured in .env'}
              </p>
            </div>
            <span
              className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                isSupabaseConfigured
                  ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border-emerald-300'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-300'
              }`}
            >
              {isSupabaseConfigured ? 'Connected' : 'Offline / Guest'}
            </span>
          </div>
        </div>

        {/* Reset Progress Danger Zone */}
        <div className="p-6 bg-rose-50/50 dark:bg-rose-950/20 rounded-3xl border border-rose-200 dark:border-rose-900/40 shadow-sm space-y-3">
          <h2 className="text-base font-bold text-rose-800 dark:text-rose-200 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-600" />
            <span>Reset Learning Progress</span>
          </h2>
          <p className="text-xs text-rose-700 dark:text-rose-300">
            Want to start completely fresh from Lesson 1? This will clear your completed lessons, streak, and XP.
          </p>

          <button
            onClick={handleResetProgress}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all shadow-sm ${
              confirmReset
                ? 'bg-rose-600 hover:bg-rose-700 text-white animate-pulse'
                : 'bg-white dark:bg-[#1a1728] border border-rose-300 dark:border-rose-800 text-rose-700 dark:text-rose-300 hover:bg-rose-100'
            }`}
          >
            {confirmReset ? 'Are you sure? Click again to confirm reset!' : 'Reset All My Progress'}
          </button>
        </div>
      </div>
    </div>
  );
};
