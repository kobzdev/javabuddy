import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, XCircle, RotateCcw, Award, ArrowRight } from 'lucide-react';
import { QuizQuestion } from '../../types';

interface QuizCardProps {
  questions: QuizQuestion[];
  onQuizComplete: (scorePct: number) => void;
  nextLessonTitle?: string;
  onNextLesson?: () => void;
}

export const QuizCard: React.FC<QuizCardProps> = ({
  questions,
  onQuizComplete,
  nextLessonTitle,
  onNextLesson,
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSelectOption = (questionIndex: number, optionIndex: number) => {
    if (submitted) return; // locked once checked
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: optionIndex,
    }));
  };

  const calculateScore = () => {
    let correctCount = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        correctCount++;
      }
    });
    return Math.round((correctCount / questions.length) * 100);
  };

  const handleSubmit = () => {
    setSubmitted(true);
    const scorePct = calculateScore();
    onQuizComplete(scorePct);

    if (scorePct === 100) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  const handleRetry = () => {
    setSelectedAnswers({});
    setSubmitted(false);
  };

  const allAnswered = Object.keys(selectedAnswers).length === questions.length;
  const scorePct = submitted ? calculateScore() : 0;

  return (
    <div className="p-6 bg-white dark:bg-[#1a1728] rounded-3xl border border-purple-200 dark:border-purple-900/50 shadow-md space-y-6">
      <div className="flex items-center justify-between border-b border-purple-100 dark:border-purple-900/30 pb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🧠</span>
          <div>
            <h3 className="font-bold text-lg text-gray-900 dark:text-purple-100">
              Kindergarten Check-In Quiz
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Answer 3 fun questions to check your understanding!
            </p>
          </div>
        </div>

        {submitted && (
          <div className="flex items-center gap-2 px-3 py-1 bg-purple-100 dark:bg-purple-950/60 rounded-full border border-purple-200 dark:border-purple-800 text-buddy-purple-700 dark:text-purple-300 font-bold text-sm">
            <Award className="w-4 h-4 text-amber-500" />
            <span>Score: {scorePct}%</span>
          </div>
        )}
      </div>

      {/* Questions List */}
      <div className="space-y-6">
        {questions.map((q, qIndex) => {
          const selectedOption = selectedAnswers[qIndex];
          const isCorrect = submitted && selectedOption === q.correctIndex;
          const isWrong = submitted && selectedOption !== undefined && selectedOption !== q.correctIndex;

          return (
            <div
              key={q.id}
              className={`p-4 rounded-2xl border transition-all ${
                submitted
                  ? isCorrect
                    ? 'border-emerald-300 bg-emerald-50/50 dark:bg-emerald-950/20'
                    : 'border-rose-300 bg-rose-50/50 dark:bg-rose-950/20'
                  : 'border-purple-100 dark:border-purple-900/30 bg-purple-50/30 dark:bg-purple-950/10'
              }`}
            >
              <p className="font-bold text-sm sm:text-base text-gray-900 dark:text-purple-100 mb-3">
                <span className="text-buddy-purple-600 dark:text-purple-400 font-extrabold mr-1.5">
                  Q{qIndex + 1}.
                </span>
                {q.question}
              </p>

              {/* Options */}
              <div className="grid grid-cols-1 gap-2">
                {q.options.map((opt, optIndex) => {
                  const isSelected = selectedOption === optIndex;
                  const isThisCorrect = submitted && optIndex === q.correctIndex;
                  const isThisWrongSelected = submitted && isSelected && !isThisCorrect;

                  let buttonStyle = 'bg-white dark:bg-[#252038] border-gray-200 dark:border-purple-900/40 text-gray-700 dark:text-purple-200 hover:border-purple-400';

                  if (isSelected && !submitted) {
                    buttonStyle = 'bg-buddy-purple-100 dark:bg-purple-900/50 border-buddy-purple-500 text-buddy-purple-900 dark:text-white font-semibold ring-2 ring-buddy-purple-400/30';
                  }

                  if (submitted) {
                    if (isThisCorrect) {
                      buttonStyle = 'bg-emerald-100 dark:bg-emerald-950 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-bold';
                    } else if (isThisWrongSelected) {
                      buttonStyle = 'bg-rose-100 dark:bg-rose-950 border-rose-500 text-rose-900 dark:text-rose-200 font-bold line-through';
                    } else {
                      buttonStyle = 'opacity-50 border-gray-200 dark:border-purple-900/20 text-gray-400';
                    }
                  }

                  return (
                    <button
                      key={optIndex}
                      type="button"
                      onClick={() => handleSelectOption(qIndex, optIndex)}
                      disabled={submitted}
                      className={`text-left px-4 py-2.5 rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between ${buttonStyle}`}
                    >
                      <span>{opt}</span>
                      {submitted && isThisCorrect && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      )}
                      {submitted && isThisWrongSelected && (
                        <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanations shown once submitted */}
              {submitted && (
                <div className="mt-3 p-3 rounded-xl bg-white/80 dark:bg-[#1a1728]/80 border border-purple-200/50 dark:border-purple-900/30 text-xs">
                  {isCorrect ? (
                    <div className="text-emerald-700 dark:text-emerald-300 font-medium flex items-start gap-1.5">
                      <span className="select-none">🌟</span>
                      <div>
                        <strong>Spot on!</strong> {q.explanation}
                      </div>
                    </div>
                  ) : (
                    <div className="text-rose-700 dark:text-rose-300 font-medium flex items-start gap-1.5">
                      <span className="select-none">💡</span>
                      <div>
                        <strong>Not quite:</strong> {q.wrongExplanation || q.explanation}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Action Footer */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-purple-100 dark:border-purple-900/30">
        {!submitted ? (
          <button
            onClick={handleSubmit}
            disabled={!allAnswered}
            className={`w-full sm:w-auto px-6 py-2.5 rounded-2xl font-bold text-sm text-white transition-all shadow-bubble-purple ${
              allAnswered
                ? 'bg-buddy-purple-600 hover:bg-buddy-purple-500 active:translate-y-0.5'
                : 'bg-gray-400 cursor-not-allowed opacity-60'
            }`}
          >
            Check My Answers! ✨
          </button>
        ) : (
          <div className="flex flex-wrap items-center justify-between w-full gap-3">
            <button
              onClick={handleRetry}
              className="flex items-center gap-1.5 px-4 py-2 bg-gray-100 dark:bg-purple-950/40 hover:bg-gray-200 text-gray-700 dark:text-purple-200 font-bold text-xs rounded-xl transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retry Quiz</span>
            </button>

            {onNextLesson && (
              <button
                onClick={onNextLesson}
                className="flex items-center gap-1.5 px-6 py-2.5 bg-buddy-purple-600 hover:bg-buddy-purple-500 text-white font-bold text-sm rounded-2xl transition-all shadow-bubble-purple"
              >
                <span>Continue to {nextLessonTitle || 'Next Lesson'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
