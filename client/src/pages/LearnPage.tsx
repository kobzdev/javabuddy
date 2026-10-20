import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  CheckCircle2, 
  Lock, 
  Sparkles, 
  ArrowRight, 
  Award,
  Play,
  RotateCcw
} from 'lucide-react';
import { LESSONS } from '../data/lessons';
import { UserProgress } from '../types';

interface LearnPageProps {
  progress: UserProgress;
}

export const LearnPage: React.FC<LearnPageProps> = ({ progress }) => {
  const navigate = useNavigate();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-buddy-purple-100 dark:bg-purple-950/60 border border-buddy-purple-200 dark:border-purple-800 text-buddy-purple-700 dark:text-purple-300 text-xs font-bold uppercase tracking-wider">
          <span>👶 Step-by-Step Kindergarten Path</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-purple-100">
          Your Java Learning Path
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Follow the numbered stepping stones from zero experience to real Java applications.
          Each step unlocks the next fun adventure!
        </p>
      </div>

      {/* Curriculum Path Steps */}
      <div className="space-y-4">
        {LESSONS.map((lesson, idx) => {
          const isCompleted = progress.completedLessonIds.includes(lesson.id);
          const isPrereqMet = !lesson.prerequisiteId || progress.completedLessonIds.includes(lesson.prerequisiteId);
          const isCurrent = isPrereqMet && !isCompleted;
          const isLocked = !isPrereqMet;

          const quizScore = progress.lessonScores[lesson.id];

          return (
            <div
              key={lesson.id}
              className={`relative overflow-hidden p-5 sm:p-6 rounded-3xl border transition-all duration-200 ${
                isCompleted
                  ? 'bg-white dark:bg-[#1a1728] border-emerald-300 dark:border-emerald-800/50 shadow-sm'
                  : isCurrent
                  ? 'bg-gradient-to-r from-purple-50 via-white to-amber-50/40 dark:from-[#211d33] dark:via-[#1a1728] dark:to-[#221c2c] border-buddy-purple-400 dark:border-buddy-purple-600 shadow-md ring-2 ring-buddy-purple-400/20'
                  : 'bg-gray-50/70 dark:bg-[#14121f]/50 border-gray-200 dark:border-purple-950/40 opacity-70'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                {/* Left: Level Icon & Info */}
                <div className="flex items-start sm:items-center gap-4">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shrink-0 shadow-inner ${
                      isCompleted
                        ? 'bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300'
                        : isCurrent
                        ? 'bg-buddy-purple-100 dark:bg-purple-900/40 border border-buddy-purple-300 animate-pulse-gentle'
                        : 'bg-gray-200 dark:bg-gray-800 border border-gray-300 dark:border-gray-700'
                    }`}
                  >
                    {isLocked ? <Lock className="w-6 h-6 text-gray-400" /> : lesson.badgeIcon}
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-extrabold uppercase tracking-wider text-buddy-purple-700 dark:text-purple-300">
                        Level {lesson.level}
                      </span>
                      <span>•</span>
                      <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        {lesson.xpReward} XP
                      </span>
                      {quizScore !== undefined && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 dark:bg-purple-950 text-buddy-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                          Quiz: {quizScore}%
                        </span>
                      )}
                    </div>

                    <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-purple-100 mt-0.5">
                      {lesson.title}
                    </h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {lesson.subtitle}
                    </p>
                  </div>
                </div>

                {/* Right: Action Button */}
                <div className="flex items-center gap-3 self-end sm:self-center">
                  {isCompleted ? (
                    <div className="flex items-center gap-2">
                      <span className="hidden md:inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 className="w-4 h-4" />
                        Completed
                      </span>
                      <button
                        onClick={() => navigate(`/lesson/${lesson.id}`)}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gray-100 dark:bg-purple-950 hover:bg-gray-200 text-gray-700 dark:text-purple-200 font-bold text-xs transition-colors"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Review</span>
                      </button>
                    </div>
                  ) : isCurrent ? (
                    <button
                      onClick={() => navigate(`/lesson/${lesson.id}`)}
                      className="flex items-center gap-1.5 px-6 py-2.5 rounded-2xl bg-buddy-purple-600 hover:bg-buddy-purple-500 text-white font-extrabold text-sm shadow-bubble-purple active:translate-y-0.5 transition-all"
                    >
                      <span>Start Lesson</span>
                      <Play className="w-4 h-4 fill-current" />
                    </button>
                  ) : (
                    <div className="flex items-center gap-1 text-xs font-bold text-gray-400 dark:text-gray-500">
                      <Lock className="w-3.5 h-3.5" />
                      <span>Complete Level {lesson.level - 1} First</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
