import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Trophy, 
  Sparkles, 
  Flame, 
  CheckCircle2, 
  Award, 
  Target, 
  BookOpen, 
  AlertCircle,
  Calendar,
  ArrowRight
} from 'lucide-react';
import { UserProgress } from '../types';
import { ACHIEVEMENTS } from '../data/achievements';
import { LESSONS } from '../data/lessons';

interface ProgressPageProps {
  progress: UserProgress;
}

export const ProgressPage: React.FC<ProgressPageProps> = ({ progress }) => {
  const completedCount = progress.completedLessonIds.length;
  const progressPct = Math.round((completedCount / 10) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn pb-24">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-purple-100 dark:border-purple-900/40 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-buddy-purple-100 dark:bg-purple-950/60 border border-buddy-purple-200 dark:border-purple-800 text-buddy-purple-700 dark:text-purple-300 text-xs font-bold uppercase tracking-wider mb-2">
            <Trophy className="w-3.5 h-3.5" />
            <span>Learning Passport</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 dark:text-purple-100">
            My Learning Progress & Badges
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
            Track your milestones, quiz performance, daily streaks, and unlocked badges!
          </p>
        </div>

        <Link
          to="/learn"
          className="flex items-center gap-1.5 px-5 py-2.5 rounded-2xl bg-buddy-purple-600 hover:bg-buddy-purple-500 text-white font-bold text-sm shadow-bubble-purple transition-all self-start sm:self-center"
        >
          <span>Continue Curriculum</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 bg-white dark:bg-[#1a1728] rounded-3xl border border-purple-100 dark:border-purple-900/40 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-buddy-purple-100 dark:bg-purple-950/60 flex items-center justify-center text-3xl">
            ⭐
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Experience</p>
            <p className="text-2xl sm:text-3xl font-extrabold text-buddy-purple-700 dark:text-purple-300">
              {progress.totalXp} XP
            </p>
            <p className="text-xs text-gray-500">Every lesson & quiz adds XP</p>
          </div>
        </div>

        <div className="p-6 bg-white dark:bg-[#1a1728] rounded-3xl border border-purple-100 dark:border-purple-900/40 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-100 dark:bg-amber-950/60 flex items-center justify-center text-3xl">
            🔥
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Current Streak</p>
            <p className="text-2xl sm:text-3xl font-extrabold text-amber-500">
              {progress.currentStreak} Days
            </p>
            <p className="text-xs text-gray-500">
              {progress.lastActiveDate ? `Last active: ${progress.lastActiveDate}` : 'Start coding today!'}
            </p>
          </div>
        </div>

        <div className="p-6 bg-white dark:bg-[#1a1728] rounded-3xl border border-purple-100 dark:border-purple-900/40 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center text-3xl">
            🎓
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Curriculum Mastery</p>
            <p className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
              {progressPct}%
            </p>
            <p className="text-xs text-gray-500">{completedCount} of 10 levels completed</p>
          </div>
        </div>
      </div>

      {/* Curriculum Level Completion Progress Ring/Bar */}
      <div className="p-6 bg-white dark:bg-[#1a1728] rounded-3xl border border-purple-100 dark:border-purple-900/40 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900 dark:text-purple-100 flex items-center gap-2">
            <span>Level Milestones</span>
          </h2>
          <span className="text-xs font-bold text-buddy-purple-700 dark:text-purple-300">
            {completedCount} / 10 Completed
          </span>
        </div>

        <div className="w-full h-3 bg-purple-100 dark:bg-purple-950/60 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-buddy-purple-500 via-indigo-500 to-emerald-400 rounded-full transition-all duration-700"
            style={{ width: `${progressPct}%` }}
          ></div>
        </div>

        {/* 10 Level Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2">
          {LESSONS.map(l => {
            const isDone = progress.completedLessonIds.includes(l.id);
            const score = progress.lessonScores[l.id];
            return (
              <div
                key={l.id}
                className={`p-3 rounded-2xl border text-xs flex flex-col justify-between ${
                  isDone
                    ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800'
                    : 'bg-gray-50 dark:bg-purple-950/10 border-gray-200 dark:border-purple-900/20 text-gray-400'
                }`}
              >
                <div className="flex items-center justify-between font-bold">
                  <span>Level {l.level}</span>
                  <span>{isDone ? '✓' : l.badgeIcon}</span>
                </div>
                <p className="font-semibold text-gray-800 dark:text-gray-200 mt-1 truncate">
                  {l.title}
                </p>
                {score !== undefined && (
                  <span className="text-[10px] text-emerald-600 font-bold mt-1">
                    Quiz: {score}%
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Achievement Badges Showcase */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900 dark:text-purple-100 flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            <span>Achievement Badges Catalog</span>
          </h2>
          <span className="text-xs text-gray-500">
            {progress.earnedAchievementCodes.length} of {ACHIEVEMENTS.length} Unlocked
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ACHIEVEMENTS.map(badge => {
            const isUnlocked = progress.earnedAchievementCodes.includes(badge.code);
            return (
              <div
                key={badge.code}
                className={`p-5 rounded-3xl border flex items-start gap-4 transition-all ${
                  isUnlocked
                    ? 'bg-white dark:bg-[#1a1728] border-amber-300 dark:border-amber-800/60 shadow-md ring-1 ring-amber-300/30'
                    : 'bg-gray-50/60 dark:bg-purple-950/10 border-gray-200 dark:border-purple-900/20 opacity-60'
                }`}
              >
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shrink-0 shadow-inner ${
                    isUnlocked
                      ? 'bg-amber-100 dark:bg-amber-950/60 border border-amber-300'
                      : 'bg-gray-200 dark:bg-gray-800 border border-gray-300 grayscale'
                  }`}
                >
                  {badge.icon}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-sm text-gray-900 dark:text-purple-100">
                      {badge.name}
                    </h3>
                    <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400">
                      +{badge.xpReward} XP
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                    {badge.description}
                  </p>
                  <div className="mt-2">
                    {isUnlocked ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                        <CheckCircle2 className="w-3 h-3" /> Unlocked
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-gray-400">
                        🔒 In Progress
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
