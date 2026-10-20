import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Play, 
  Sparkles, 
  Flame, 
  Award, 
  BookOpen, 
  Target, 
  ArrowRight, 
  CheckCircle,
  AlertCircle,
  HelpCircle,
  Coffee,
  Heart
} from 'lucide-react';
import { UserProgress } from '../types';
import { LESSONS } from '../data/lessons';
import { ACHIEVEMENTS } from '../data/achievements';

interface HomePageProps {
  progress: UserProgress;
  onOpenTutor: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ progress, onOpenTutor }) => {
  const navigate = useNavigate();

  // Find next uncompleted lesson
  const nextLesson = LESSONS.find(l => !progress.completedLessonIds.includes(l.id)) || LESSONS[0];
  const completedCount = progress.completedLessonIds.length;
  const currentLevelNumber = Math.min(10, completedCount + 1);

  // Daily goal progress percent
  const dailyGoalPct = Math.min(100, Math.round((progress.todayXp / (progress.dailyGoal || 50)) * 100));

  // Recent achievements earned
  const earnedBadges = ACHIEVEMENTS.filter(a => progress.earnedAchievementCodes.includes(a.code));

  // Weak lessons needing practice
  const weakLessons = LESSONS.filter(l => progress.weakTopics.includes(l.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-buddy-purple-600 via-buddy-purple-700 to-indigo-800 text-white p-6 sm:p-10 shadow-xl border border-purple-400/20">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider mb-4 border border-white/20">
            <span>🧸 Kindergarten Learning Method</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Hello, Little Coder!
          </h1>
          <p className="mt-3 text-sm sm:text-lg text-purple-100 font-medium leading-relaxed">
            Welcome to <span className="font-bold text-amber-300">JavaBuddy</span>. We explain Java programming using toys, cookies, merry-go-rounds, and puppies. No confusing jargon, zero stress!
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={() => navigate(`/lesson/${nextLesson.id}`)}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-gray-900 font-extrabold text-sm sm:text-base shadow-bubble-yellow active:translate-y-0.5 transition-all"
            >
              <Play className="w-5 h-5 fill-current" />
              <span>{completedCount === 0 ? 'Start First Lesson' : 'Continue Learning'}</span>
            </button>

            <button
              onClick={onOpenTutor}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-bold text-sm sm:text-base border border-white/20 transition-all"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Ask JavaBuddy Teacher</span>
            </button>
          </div>
        </div>

        {/* Mascot Illustration Decoration */}
        <div className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 flex-col items-center select-none pointer-events-none">
          <div className="w-32 h-32 rounded-3xl bg-white/10 backdrop-blur-lg flex items-center justify-center text-7xl shadow-2xl border border-white/20 animate-float">
            ☕
          </div>
          <span className="mt-2 text-xs font-extrabold tracking-widest uppercase text-purple-200">
            JavaBuddy Mascot
          </span>
        </div>
      </div>

      {/* Gamification Dashboard Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Current Level */}
        <div className="p-5 bg-white dark:bg-[#1a1728] rounded-2xl border border-purple-100 dark:border-purple-900/40 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            <span>Learning Level</span>
            <span className="text-xl">🎯</span>
          </div>
          <div className="mt-3">
            <p className="text-2xl sm:text-3xl font-extrabold text-buddy-purple-700 dark:text-purple-300">
              Level {currentLevelNumber}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 truncate">
              {nextLesson.title}
            </p>
          </div>
        </div>

        {/* Completed Lessons */}
        <div className="p-5 bg-white dark:bg-[#1a1728] rounded-2xl border border-purple-100 dark:border-purple-900/40 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            <span>Completed</span>
            <span className="text-xl">📚</span>
          </div>
          <div className="mt-3">
            <p className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
              {completedCount} / 10
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              {Math.round((completedCount / 10) * 100)}% of Curriculum
            </p>
          </div>
        </div>

        {/* Total XP */}
        <div className="p-5 bg-white dark:bg-[#1a1728] rounded-2xl border border-purple-100 dark:border-purple-900/40 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            <span>Experience</span>
            <span className="text-xl">⭐</span>
          </div>
          <div className="mt-3">
            <p className="text-2xl sm:text-3xl font-extrabold text-amber-500">
              {progress.totalXp} XP
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Earned from Quizzes & Tasks
            </p>
          </div>
        </div>

        {/* Streak */}
        <div className="p-5 bg-white dark:bg-[#1a1728] rounded-2xl border border-purple-100 dark:border-purple-900/40 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            <span>Daily Streak</span>
            <span className="text-xl">🔥</span>
          </div>
          <div className="mt-3">
            <p className="text-2xl sm:text-3xl font-extrabold text-amber-600 dark:text-amber-400">
              {progress.currentStreak} {progress.currentStreak === 1 ? 'Day' : 'Days'}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              {progress.currentStreak > 0 ? 'Streak is active!' : 'No active streak yet'}
            </p>
          </div>
        </div>
      </div>

      {/* Daily Learning Goal Bar */}
      <div className="p-6 bg-white dark:bg-[#1a1728] rounded-3xl border border-purple-100 dark:border-purple-900/40 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-buddy-purple-600 dark:text-purple-400" />
            <h3 className="font-bold text-sm sm:text-base text-gray-900 dark:text-purple-100">
              Today's Learning Goal
            </h3>
          </div>
          <span className="text-xs font-bold text-buddy-purple-700 dark:text-purple-300">
            {progress.todayXp} / {progress.dailyGoal} XP ({dailyGoalPct}%)
          </span>
        </div>

        <div className="w-full h-3 bg-purple-100 dark:bg-purple-950/60 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-buddy-purple-500 to-amber-400 rounded-full transition-all duration-500"
            style={{ width: `${dailyGoalPct}%` }}
          ></div>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          {dailyGoalPct >= 100
            ? '🎉 Daily goal achieved! You are a superstar coder!'
            : `Earn ${Math.max(0, progress.dailyGoal - progress.todayXp)} more XP today to hit your goal!`}
        </p>
      </div>

      {/* Main Content 2-Column Split: Recommended Next Lesson + Achievements & Weak Topics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recommended Next Lesson Card (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-purple-100 flex items-center gap-2">
            <span>Recommended Next Lesson</span>
          </h2>

          <div className="p-6 bg-gradient-to-br from-white to-purple-50/50 dark:from-[#1a1728] dark:to-[#171424] rounded-3xl border border-purple-200 dark:border-purple-900/50 shadow-md">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-4xl">{nextLesson.badgeIcon}</span>
                <div>
                  <span className="text-xs font-bold text-buddy-purple-600 dark:text-purple-400 uppercase tracking-wide">
                    Level {nextLesson.level} • {nextLesson.xpReward} XP Reward
                  </span>
                  <h3 className="text-xl font-extrabold text-gray-900 dark:text-purple-100 mt-0.5">
                    {nextLesson.title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {nextLesson.subtitle}
                  </p>
                </div>
              </div>

              <span className="px-3 py-1 bg-purple-100 dark:bg-purple-950 text-buddy-purple-700 dark:text-purple-300 font-bold text-xs rounded-full">
                {progress.completedLessonIds.includes(nextLesson.id) ? 'Review' : 'Up Next'}
              </span>
            </div>

            <p className="mt-4 text-sm text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
              {nextLesson.objective}
            </p>

            <div className="mt-4 p-3 bg-purple-100/50 dark:bg-purple-950/40 rounded-2xl flex items-center gap-2 text-xs text-buddy-purple-900 dark:text-purple-200">
              <span className="text-lg">🧸</span>
              <span><strong>Story Analogy:</strong> {nextLesson.storyAnalogy.title}</span>
            </div>

            <div className="mt-6 flex items-center justify-between pt-4 border-t border-purple-100 dark:border-purple-900/30">
              <Link
                to="/learn"
                className="text-xs font-bold text-gray-500 dark:text-gray-400 hover:text-buddy-purple-600 transition-colors"
              >
                View full curriculum path →
              </Link>

              <button
                onClick={() => navigate(`/lesson/${nextLesson.id}`)}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-2xl bg-buddy-purple-600 hover:bg-buddy-purple-500 text-white font-bold text-sm shadow-bubble-purple transition-all"
              >
                <span>Open Lesson</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar: Weak Topics & Recent Badges */}
        <div className="space-y-6">
          {/* Weak Topics Section */}
          <div className="p-6 bg-white dark:bg-[#1a1728] rounded-3xl border border-purple-100 dark:border-purple-900/40 shadow-sm">
            <h3 className="font-bold text-base text-gray-900 dark:text-purple-100 flex items-center gap-2 mb-3">
              <AlertCircle className="w-4 h-4 text-amber-500" />
              <span>Practice Recommendations</span>
            </h3>

            {weakLessons.length === 0 ? (
              <div className="py-6 text-center text-xs text-gray-500 dark:text-gray-400">
                <span className="text-3xl block mb-2">🎉</span>
                <p className="font-bold text-gray-700 dark:text-gray-300">No weak topics identified!</p>
                <p className="mt-1">All your completed quizzes are scoring high. Great job!</p>
              </div>
            ) : (
              <div className="space-y-2.5">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                  These topics had tricky quiz questions. Try a quick refresher:
                </p>
                {weakLessons.map(lesson => (
                  <button
                    key={lesson.id}
                    onClick={() => navigate(`/lesson/${lesson.id}`)}
                    className="w-full text-left p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 hover:border-amber-400 transition-colors flex items-center justify-between"
                  >
                    <div>
                      <p className="text-xs font-bold text-gray-800 dark:text-gray-200">
                        {lesson.title}
                      </p>
                      <p className="text-[10px] text-amber-700 dark:text-amber-300">
                        Score: {progress.lessonScores[lesson.id] || 0}% • Needs Review
                      </p>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-amber-600" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Recent Achievements */}
          <div className="p-6 bg-white dark:bg-[#1a1728] rounded-3xl border border-purple-100 dark:border-purple-900/40 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-base text-gray-900 dark:text-purple-100 flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-500" />
                <span>Recent Badges</span>
              </h3>
              <Link to="/progress" className="text-xs font-bold text-buddy-purple-600 hover:underline">
                All ({earnedBadges.length})
              </Link>
            </div>

            {earnedBadges.length === 0 ? (
              <div className="py-6 text-center text-xs text-gray-500 dark:text-gray-400">
                <span className="text-3xl block mb-2">🎖️</span>
                <p className="font-bold text-gray-700 dark:text-gray-300">No badges yet!</p>
                <p className="mt-1">Complete your first lesson to unlock the "First Words" badge!</p>
              </div>
            ) : (
              <div className="space-y-2">
                {earnedBadges.slice(0, 3).map(badge => (
                  <div
                    key={badge.code}
                    className="flex items-center gap-3 p-2.5 rounded-xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-100 dark:border-purple-900/30"
                  >
                    <span className="text-2xl">{badge.icon}</span>
                    <div>
                      <p className="text-xs font-bold text-gray-800 dark:text-gray-200">
                        {badge.name}
                      </p>
                      <p className="text-[10px] text-gray-500 dark:text-gray-400">
                        {badge.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
