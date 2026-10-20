export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  wrongExplanation?: string;
}

export interface CodeExercise {
  instruction: string;
  starterCode: string;
  solutionCode: string;
  expectedOutput: string;
  hints: string[];
}

export interface Lesson {
  id: string;
  level: number;
  title: string;
  subtitle: string;
  badgeIcon: string;
  prerequisiteId?: string;
  xpReward: number;

  // 12 Mandatory Lesson Parts
  objective: string;
  storyAnalogy: {
    title: string;
    story: string;
    emoji: string;
  };
  simpleExplanation: string;
  codeSnippet: string;
  lineByLine: Array<{
    line: string;
    explanation: string;
  }>;
  visualDemo: {
    title: string;
    type: 'boxes' | 'decision-tree' | 'carousel' | 'fruit-basket' | 'blender' | 'blueprint' | 'magnifier';
    items: Array<{
      label: string;
      value: string;
      description?: string;
      color?: string;
    }>;
  };
  sampleOutput: string;
  guidedExercise: CodeExercise;
  independentChallenge: CodeExercise;
  quiz: QuizQuestion[];
  nextLessonId?: string;
}

export interface UserProgress {
  completedLessonIds: string[];
  inProgressLessonId?: string;
  currentStreak: number;
  lastActiveDate: string;
  totalXp: number;
  earnedAchievementCodes: string[];
  lessonScores: Record<string, number>; // lessonId -> best quiz score (0-100)
  dailyGoal: number; // e.g. 50 XP
  todayXp: number;
  weakTopics: string[];
}

export interface Achievement {
  code: string;
  name: string;
  description: string;
  icon: string;
  xpReward: number;
  category: 'starter' | 'skills' | 'streak' | 'mastery';
}

export interface PracticeChallenge {
  id: string;
  type: 'guess_output' | 'fix_code' | 'fill_blank' | 'find_bug' | 'build_program';
  title: string;
  topic: string;
  difficulty: 'Easy Peasy' | 'A Little Tricky' | 'Junior Boss';
  description: string;
  code: string;
  options?: string[]; // for guess_output or fill_blank
  correctAnswer: string | number;
  explanation: string;
  hints: string[];
  xp: number;
}

export interface MiniProject {
  id: string;
  title: string;
  description: string;
  icon: string;
  requiredLevel: number;
  starterCode: string;
  solutionCode: string;
  goals: string[];
  sampleOutput: string;
  xp: number;
}
