import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Gamepad2, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  Lightbulb, 
  RotateCcw, 
  Code2, 
  FolderGit2, 
  Play, 
  ArrowRight,
  HelpCircle
} from 'lucide-react';
import { PRACTICE_CHALLENGES, MINI_PROJECTS } from '../data/practice';
import { PracticeChallenge, MiniProject, UserProgress } from '../types';
import { recordActivity } from '../lib/storage';
import { JavaEditor } from '../components/editor/JavaEditor';

interface PracticePageProps {
  progress: UserProgress;
  onUpdateProgress: (newProgress: UserProgress) => void;
  onOpenTutor: (title: string, code?: string) => void;
}

export const PracticePage: React.FC<PracticePageProps> = ({
  progress,
  onUpdateProgress,
  onOpenTutor,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'guess' | 'fix' | 'fill' | 'bug' | 'projects'>('all');
  const [completedChallengeIds, setCompletedChallengeIds] = useState<string[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string | number>>({});
  const [revealedHints, setRevealedHints] = useState<Record<string, boolean>>({});
  const [activeProject, setActiveProject] = useState<MiniProject | null>(null);

  const filteredChallenges = PRACTICE_CHALLENGES.filter(c => {
    if (activeTab === 'all') return true;
    if (activeTab === 'guess') return c.type === 'guess_output';
    if (activeTab === 'fix') return c.type === 'fix_code';
    if (activeTab === 'fill') return c.type === 'fill_blank';
    if (activeTab === 'bug') return c.type === 'find_bug';
    return false;
  });

  const handleSelectAnswer = (challenge: PracticeChallenge, answer: string | number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [challenge.id]: answer,
    }));

    const isCorrect = String(answer).trim().toLowerCase() === String(challenge.correctAnswer).trim().toLowerCase();

    if (isCorrect && !completedChallengeIds.includes(challenge.id)) {
      setCompletedChallengeIds(prev => [...prev, challenge.id]);
      const updated = recordActivity(progress, challenge.xp);
      onUpdateProgress(updated);

      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn pb-24">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-purple-100 dark:border-purple-900/40 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-buddy-purple-100 dark:bg-purple-950/60 border border-buddy-purple-200 dark:border-purple-800 text-buddy-purple-700 dark:text-purple-300 text-xs font-bold uppercase tracking-wider mb-2">
            <Gamepad2 className="w-3.5 h-3.5" />
            <span>Practice Playground</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 dark:text-purple-100">
            Practice Games & Mini Projects
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
            Strengthen your Java muscles with quick bite-sized puzzles and interactive coding challenges!
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-4 py-2 bg-purple-50 dark:bg-purple-950/60 rounded-2xl border border-purple-200 dark:border-purple-800 text-xs font-bold text-buddy-purple-700 dark:text-purple-300">
            Completed: {completedChallengeIds.length} / {PRACTICE_CHALLENGES.length} Games
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-purple-100 dark:border-purple-900/30">
        {[
          { key: 'all', label: 'All Games', icon: '🎮' },
          { key: 'guess', label: 'Guess the Output', icon: '🔮' },
          { key: 'fix', label: 'Fix the Code', icon: '🩹' },
          { key: 'fill', label: 'Fill in the Blank', icon: '✍️' },
          { key: 'bug', label: 'Find the Bug', icon: '🔍' },
          { key: 'projects', label: 'Mini Projects', icon: '🚀' },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => { setActiveTab(tab.key as any); setActiveProject(null); }}
            className={`shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === tab.key
                ? 'bg-buddy-purple-600 text-white shadow-bubble-purple'
                : 'bg-white dark:bg-[#1a1728] text-gray-600 dark:text-gray-300 border border-purple-100 dark:border-purple-900/40 hover:bg-purple-50'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Mini Projects View */}
      {activeTab === 'projects' ? (
        <div className="space-y-6">
          {!activeProject ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {MINI_PROJECTS.map(proj => {
                const isUnlocked = progress.completedLessonIds.length >= proj.requiredLevel - 1;
                return (
                  <div
                    key={proj.id}
                    className={`p-6 rounded-3xl border flex flex-col justify-between transition-all ${
                      isUnlocked
                        ? 'bg-white dark:bg-[#1a1728] border-purple-200 dark:border-purple-900/50 shadow-md hover:-translate-y-1'
                        : 'bg-gray-50 dark:bg-purple-950/20 border-gray-200 dark:border-purple-900/20 opacity-70'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-3xl">{proj.icon}</span>
                        <span className="text-xs font-bold px-2.5 py-1 bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 rounded-full">
                          +{proj.xp} XP
                        </span>
                      </div>
                      <h3 className="font-bold text-lg text-gray-900 dark:text-purple-100">
                        {proj.title}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                        {proj.description}
                      </p>

                      <div className="mt-4 space-y-1.5 text-xs text-gray-600 dark:text-gray-400">
                        {proj.goals.map((g, i) => (
                          <div key={i} className="flex items-center gap-1.5">
                            <span className="text-emerald-500 text-xs">✓</span>
                            <span>{g}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-purple-100 dark:border-purple-900/30">
                      <button
                        onClick={() => setActiveProject(proj)}
                        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-2xl bg-buddy-purple-600 hover:bg-buddy-purple-500 text-white font-bold text-xs shadow-bubble-purple transition-all"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>Build Project</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setActiveProject(null)}
                  className="text-xs font-bold text-buddy-purple-600 hover:underline flex items-center gap-1"
                >
                  ← Back to Mini Projects
                </button>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{activeProject.icon}</span>
                  <h2 className="font-bold text-lg text-gray-900 dark:text-purple-100">
                    {activeProject.title}
                  </h2>
                </div>
              </div>

              <div className="p-4 bg-purple-50 dark:bg-[#1a1728] rounded-2xl border border-purple-200 dark:border-purple-900/40 text-xs text-gray-700 dark:text-gray-300">
                <p className="font-bold text-sm mb-1">Project Instructions:</p>
                <p>{activeProject.description}</p>
              </div>

              <JavaEditor
                initialCode={activeProject.starterCode}
                sampleOutput={activeProject.sampleOutput}
                height="400px"
                onOpenTutor={() => onOpenTutor(activeProject.title, activeProject.starterCode)}
              />
            </div>
          )}
        </div>
      ) : (
        /* Regular Game Cards Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredChallenges.map(challenge => {
            const userAnswer = selectedAnswers[challenge.id];
            const isCompleted = completedChallengeIds.includes(challenge.id);
            const isHintShown = revealedHints[challenge.id];

            return (
              <div
                key={challenge.id}
                className={`p-6 bg-white dark:bg-[#1a1728] rounded-3xl border transition-all ${
                  isCompleted
                    ? 'border-emerald-300 dark:border-emerald-800/60 shadow-sm'
                    : 'border-purple-100 dark:border-purple-900/40 shadow-md'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950 text-buddy-purple-700 dark:text-purple-300">
                      {challenge.topic}
                    </span>
                    <span className="text-[11px] font-semibold text-gray-400">
                      {challenge.difficulty}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-amber-500 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    +{challenge.xp} XP
                  </span>
                </div>

                <h3 className="font-bold text-base text-gray-900 dark:text-purple-100 mb-1">
                  {challenge.title}
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-4">
                  {challenge.description}
                </p>

                {/* Code Box */}
                <div className="bg-[#1e1e1e] p-3 rounded-2xl border border-gray-800 text-xs font-code overflow-x-auto mb-4">
                  <pre className="text-purple-200">{challenge.code}</pre>
                </div>

                {/* Question Options / Input */}
                {challenge.options ? (
                  <div className="space-y-2">
                    {challenge.options.map((opt, optIndex) => {
                      const isOptionSelected = userAnswer === optIndex || userAnswer === opt;
                      const isCorrectChoice = isCompleted && (optIndex === challenge.correctAnswer || opt === challenge.correctAnswer);

                      return (
                        <button
                          key={optIndex}
                          onClick={() => handleSelectAnswer(challenge, challenge.type === 'guess_output' || challenge.type === 'find_bug' ? optIndex : opt)}
                          className={`w-full text-left px-3.5 py-2.5 rounded-xl border text-xs font-medium transition-all flex items-center justify-between ${
                            isCorrectChoice
                              ? 'bg-emerald-100 dark:bg-emerald-950 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-bold'
                              : isOptionSelected && !isCorrectChoice
                              ? 'bg-rose-100 dark:bg-rose-950 border-rose-400 text-rose-900 dark:text-rose-200'
                              : 'bg-gray-50 dark:bg-[#252038] border-gray-200 dark:border-purple-900/40 text-gray-700 dark:text-purple-200 hover:border-buddy-purple-400'
                          }`}
                        >
                          <span>{opt}</span>
                          {isCorrectChoice && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  /* Text input for Fix Code / Free answer */
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Type the fix or missing text..."
                        value={userAnswer !== undefined ? String(userAnswer) : ''}
                        onChange={(e) => setSelectedAnswers(prev => ({ ...prev, [challenge.id]: e.target.value }))}
                        className="flex-1 px-3 py-2 bg-gray-50 dark:bg-[#252038] border border-gray-200 dark:border-purple-900/40 rounded-xl text-xs outline-none focus:border-buddy-purple-500 dark:text-white"
                      />
                      <button
                        onClick={() => handleSelectAnswer(challenge, userAnswer !== undefined ? String(userAnswer) : '')}
                        className="px-4 py-2 bg-buddy-purple-600 hover:bg-buddy-purple-500 text-white font-bold text-xs rounded-xl shadow-bubble-purple transition-all"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                )}

                {/* Explanation on Success */}
                {isCompleted && (
                  <div className="mt-4 p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 rounded-xl text-xs text-emerald-800 dark:text-emerald-200 space-y-1">
                    <p className="font-bold flex items-center gap-1.5">
                      <span>🎉 Correct!</span>
                    </p>
                    <p>{challenge.explanation}</p>
                  </div>
                )}

                {/* Hint Toggle */}
                {!isCompleted && (
                  <div className="mt-3">
                    <button
                      onClick={() => setRevealedHints(prev => ({ ...prev, [challenge.id]: !prev[challenge.id] }))}
                      className="text-[11px] font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
                    >
                      <Lightbulb className="w-3.5 h-3.5" />
                      <span>{isHintShown ? 'Hide Hint' : 'Show Hint'}</span>
                    </button>
                    {isHintShown && (
                      <p className="mt-1 text-xs text-amber-700 dark:text-amber-300 font-medium bg-amber-50 dark:bg-amber-950/30 p-2 rounded-lg border border-amber-200 dark:border-amber-900/30">
                        💡 {challenge.hints[0]}
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
