import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  ArrowRight, 
  BookOpen, 
  Sparkles, 
  Lightbulb, 
  Target, 
  Heart, 
  CheckCircle2, 
  HelpCircle,
  Code2,
  Trophy
} from 'lucide-react';
import { LESSONS } from '../data/lessons';
import { UserProgress } from '../types';
import { JavaEditor } from '../components/editor/JavaEditor';
import { VisualDemoCard } from '../components/lessons/VisualDemoCard';
import { QuizCard } from '../components/quizzes/QuizCard';
import { completeLesson } from '../lib/storage';

interface LessonPageProps {
  progress: UserProgress;
  onUpdateProgress: (newProgress: UserProgress) => void;
  onOpenTutor: (title: string, code?: string) => void;
}

export const LessonPage: React.FC<LessonPageProps> = ({
  progress,
  onUpdateProgress,
  onOpenTutor,
}) => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();

  const lesson = LESSONS.find(l => l.id === lessonId) || LESSONS[0];
  const nextLesson = LESSONS.find(l => l.id === lesson.nextLessonId);

  const [activeExerciseTab, setActiveExerciseTab] = useState<'guided' | 'independent'>('guided');
  const [showHints, setShowHints] = useState<boolean>(false);
  const [currentCode, setCurrentCode] = useState<string>(lesson.codeSnippet);

  const isCompleted = progress.completedLessonIds.includes(lesson.id);

  const handleQuizComplete = (scorePct: number) => {
    const { progress: updated } = completeLesson(progress, lesson.id, scorePct, lesson.xpReward);
    onUpdateProgress(updated);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 animate-fadeIn pb-24">
      {/* Top Header & Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-purple-100 dark:border-purple-900/40 pb-4">
        <div className="flex items-center gap-3">
          <Link
            to="/learn"
            className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950/60 hover:bg-purple-100 dark:hover:bg-purple-900 text-buddy-purple-700 dark:text-purple-300 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-buddy-purple-600 dark:text-purple-400">
                Level {lesson.level} of 10
              </span>
              <span>•</span>
              <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                {lesson.xpReward} XP Reward
              </span>
              {isCompleted && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300">
                  ✓ Completed
                </span>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-purple-100 mt-0.5">
              {lesson.badgeIcon} {lesson.title}
            </h1>
          </div>
        </div>

        <button
          onClick={() => onOpenTutor(lesson.title, currentCode)}
          className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-gradient-to-r from-buddy-purple-500 to-indigo-600 text-white font-bold text-xs sm:text-sm shadow-bubble-purple hover:opacity-95 transition-all"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>Ask Kindergarten Teacher</span>
        </button>
      </div>

      {/* Part 1: Tiny Learning Objective */}
      <section className="p-5 bg-purple-50/70 dark:bg-[#1f1b30] rounded-3xl border border-purple-200/70 dark:border-purple-900/40 flex items-start gap-3.5">
        <div className="p-2 rounded-xl bg-purple-200 dark:bg-purple-900/60 text-buddy-purple-700 dark:text-purple-300 shrink-0 mt-0.5">
          <Target className="w-5 h-5" />
        </div>
        <div>
          <h2 className="font-extrabold text-xs uppercase tracking-wider text-buddy-purple-700 dark:text-purple-300">
            Tiny Learning Objective
          </h2>
          <p className="text-sm sm:text-base text-gray-800 dark:text-purple-100 mt-1 font-medium">
            {lesson.objective}
          </p>
        </div>
      </section>

      {/* Part 2: Real-Life Story & Analogy */}
      <section className="p-6 bg-gradient-to-br from-amber-50/80 via-white to-purple-50/50 dark:from-[#211a22] dark:via-[#1a1728] dark:to-[#1a162b] rounded-3xl border border-amber-200 dark:border-amber-900/30 shadow-sm space-y-3">
        <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-xs uppercase tracking-wide">
          <span className="text-2xl">{lesson.storyAnalogy.emoji}</span>
          <span>Storytime Analogy: {lesson.storyAnalogy.title}</span>
        </div>
        <p className="text-sm sm:text-base text-gray-800 dark:text-purple-100 leading-relaxed font-medium">
          {lesson.storyAnalogy.story}
        </p>
      </section>

      {/* Part 3: Simple Explanation */}
      <section className="space-y-3">
        <h2 className="text-lg font-bold text-gray-900 dark:text-purple-100 flex items-center gap-2">
          <span>🧸 How It Works (Simple English)</span>
        </h2>
        <div className="p-6 bg-white dark:bg-[#1a1728] rounded-3xl border border-purple-100 dark:border-purple-900/40 text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed space-y-3 font-medium">
          <p>{lesson.simpleExplanation}</p>
        </div>
      </section>

      {/* Part 5: Line-by-Line Code Breakdown */}
      <section className="space-y-3">
        <h2 className="text-lg font-bold text-gray-900 dark:text-purple-100 flex items-center gap-2">
          <span>📖 Line-by-Line Storybook Breakdown</span>
        </h2>
        <div className="bg-white dark:bg-[#1a1728] rounded-3xl border border-purple-100 dark:border-purple-900/40 overflow-hidden shadow-sm">
          <div className="divide-y divide-purple-100 dark:divide-purple-900/30">
            {lesson.lineByLine.map((item, idx) => (
              <div key={idx} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm">
                <code className="font-code text-buddy-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/60 px-3 py-1.5 rounded-xl border border-purple-200 dark:border-purple-900/50 shrink-0 font-bold">
                  {item.line}
                </code>
                <span className="text-gray-600 dark:text-gray-400 text-right sm:text-left flex-1 sm:pl-4 font-medium">
                  {item.explanation}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Part 6: Visual Demonstration Component */}
      <section className="space-y-3">
        <h2 className="text-lg font-bold text-gray-900 dark:text-purple-100 flex items-center gap-2">
          <span>🎨 Visual Diagram</span>
        </h2>
        <VisualDemoCard demo={lesson.visualDemo} />
      </section>

      {/* Part 4 & 7: Interactive Runnable Playground */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900 dark:text-purple-100 flex items-center gap-2">
            <span>⚡ Run This Lesson's Code</span>
          </h2>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Edit freely and see what happens!
          </span>
        </div>
        <JavaEditor
          initialCode={lesson.codeSnippet}
          sampleOutput={lesson.sampleOutput}
          onCodeChange={setCurrentCode}
          onOpenTutor={() => onOpenTutor(lesson.title, currentCode)}
          height="320px"
          showExamples={false}
        />
      </section>

      {/* Part 8 & 9: Exercises (Guided & Independent Challenge) */}
      <section className="p-6 bg-white dark:bg-[#1a1728] rounded-3xl border border-purple-200 dark:border-purple-900/50 shadow-md space-y-4">
        <div className="flex items-center justify-between border-b border-purple-100 dark:border-purple-900/30 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">🛠️</span>
            <h2 className="font-bold text-base sm:text-lg text-gray-900 dark:text-purple-100">
              Hands-On Coding Practice
            </h2>
          </div>

          <div className="flex items-center gap-1 bg-purple-50 dark:bg-purple-950/60 p-1 rounded-xl border border-purple-200 dark:border-purple-900">
            <button
              onClick={() => { setActiveExerciseTab('guided'); setShowHints(false); }}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                activeExerciseTab === 'guided'
                  ? 'bg-buddy-purple-600 text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-buddy-purple-600'
              }`}
            >
              Step 1: Guided Exercise
            </button>
            <button
              onClick={() => { setActiveExerciseTab('independent'); setShowHints(false); }}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                activeExerciseTab === 'independent'
                  ? 'bg-buddy-purple-600 text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-buddy-purple-600'
              }`}
            >
              Step 2: Big Challenge
            </button>
          </div>
        </div>

        {/* Active Exercise Details */}
        {activeExerciseTab === 'guided' ? (
          <div className="space-y-4">
            <div className="p-4 bg-purple-50/60 dark:bg-purple-950/30 rounded-2xl border border-purple-200 dark:border-purple-900/40">
              <p className="text-xs font-bold text-buddy-purple-700 dark:text-purple-300 uppercase tracking-wide">
                Your Task:
              </p>
              <p className="text-sm font-semibold text-gray-800 dark:text-purple-100 mt-1">
                {lesson.guidedExercise.instruction}
              </p>
            </div>

            <div className="flex items-center justify-between">
              <button
                onClick={() => setShowHints(!showHints)}
                className="flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline"
              >
                <Lightbulb className="w-4 h-4" />
                <span>{showHints ? 'Hide Hints' : 'Need a gentle hint?'}</span>
              </button>
            </div>

            {showHints && (
              <div className="p-4 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/40 rounded-2xl space-y-1.5 text-xs text-amber-900 dark:text-amber-200 animate-fadeIn">
                <p className="font-bold">💡 Friendly Clues:</p>
                <ul className="list-disc list-inside space-y-1">
                  {lesson.guidedExercise.hints.map((hint, i) => (
                    <li key={i}>{hint}</li>
                  ))}
                </ul>
              </div>
            )}

            <JavaEditor
              initialCode={lesson.guidedExercise.starterCode}
              sampleOutput={lesson.guidedExercise.expectedOutput}
              height="300px"
              showExamples={false}
              onOpenTutor={() => onOpenTutor(lesson.title, lesson.guidedExercise.starterCode)}
            />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-4 bg-purple-50/60 dark:bg-purple-950/30 rounded-2xl border border-purple-200 dark:border-purple-900/40">
              <p className="text-xs font-bold text-buddy-purple-700 dark:text-purple-300 uppercase tracking-wide">
                Independent Challenge:
              </p>
              <p className="text-sm font-semibold text-gray-800 dark:text-purple-100 mt-1">
                {lesson.independentChallenge.instruction}
              </p>
            </div>

            <div className="flex items-center justify-between">
              <button
                onClick={() => setShowHints(!showHints)}
                className="flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline"
              >
                <Lightbulb className="w-4 h-4" />
                <span>{showHints ? 'Hide Hints' : 'Need a gentle hint?'}</span>
              </button>
            </div>

            {showHints && (
              <div className="p-4 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/40 rounded-2xl space-y-1.5 text-xs text-amber-900 dark:text-amber-200 animate-fadeIn">
                <p className="font-bold">💡 Challenge Hints:</p>
                <ul className="list-disc list-inside space-y-1">
                  {lesson.independentChallenge.hints.map((hint, i) => (
                    <li key={i}>{hint}</li>
                  ))}
                </ul>
              </div>
            )}

            <JavaEditor
              initialCode={lesson.independentChallenge.starterCode}
              sampleOutput={lesson.independentChallenge.expectedOutput}
              height="300px"
              showExamples={false}
              onOpenTutor={() => onOpenTutor(lesson.title, lesson.independentChallenge.starterCode)}
            />
          </div>
        )}
      </section>

      {/* Part 10 & 11: 3-Question Quiz with explanatory feedback */}
      <section className="space-y-3">
        <QuizCard
          questions={lesson.quiz}
          onQuizComplete={handleQuizComplete}
          nextLessonTitle={nextLesson?.title}
          onNextLesson={nextLesson ? () => navigate(`/lesson/${nextLesson.id}`) : undefined}
        />
      </section>

      {/* Part 12: Bottom Progress & Next Step Bar */}
      <div className="p-6 bg-gradient-to-r from-purple-100/70 to-indigo-100/70 dark:from-[#201b33] dark:to-[#1d172e] rounded-3xl border border-purple-200 dark:border-purple-900/50 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-white dark:bg-purple-950 flex items-center justify-center text-2xl shadow-sm">
            {isCompleted ? '🌟' : '🎯'}
          </div>
          <div>
            <h3 className="font-bold text-base text-gray-900 dark:text-purple-100">
              {isCompleted ? 'Lesson Mastered!' : 'Ready for the Next Level?'}
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              {isCompleted
                ? `You earned ${lesson.xpReward} XP for mastering this lesson!`
                : 'Complete the quiz above to record your score and move forward.'}
            </p>
          </div>
        </div>

        {nextLesson ? (
          <button
            onClick={() => navigate(`/lesson/${nextLesson.id}`)}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-buddy-purple-600 hover:bg-buddy-purple-500 text-white font-bold text-sm shadow-bubble-purple active:translate-y-0.5 transition-all"
          >
            <span>Next: {nextLesson.title}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <Link
            to="/progress"
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-gray-900 font-extrabold text-sm shadow-bubble-yellow active:translate-y-0.5 transition-all"
          >
            <Trophy className="w-4 h-4" />
            <span>View Final Certificate & Badges</span>
          </Link>
        )}
      </div>
    </div>
  );
};
