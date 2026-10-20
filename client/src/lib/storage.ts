import { UserProgress } from '../types';

const STORAGE_KEY = 'javabuddy_user_progress_v1';

export const DEFAULT_PROGRESS: UserProgress = {
  completedLessonIds: [],
  inProgressLessonId: 'level-1-first-program',
  currentStreak: 0,
  lastActiveDate: '',
  totalXp: 0,
  earnedAchievementCodes: [],
  lessonScores: {},
  dailyGoal: 50,
  todayXp: 0,
  weakTopics: [],
};

/**
 * Returns today's date formatted as YYYY-MM-DD in user's local timezone
 */
export function getLocalTodayDate(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Loads user progress from localStorage, or returns clean initial state
 */
export function loadProgress(): UserProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { ...DEFAULT_PROGRESS };
    }
    const data: UserProgress = JSON.parse(raw);
    const today = getLocalTodayDate();

    // Check if daily streak or today's XP needs calendar rollover
    if (data.lastActiveDate !== today) {
      // Check if last active was yesterday (streak continues) or earlier (streak breaks)
      if (data.lastActiveDate) {
        const lastDate = new Date(data.lastActiveDate);
        const todayDate = new Date(today);
        const diffDays = Math.round((todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
        if (diffDays > 1) {
          // Missed at least one whole day
          data.currentStreak = 0;
        }
      }
      data.todayXp = 0; // Reset daily counter for the new day
    }

    return { ...DEFAULT_PROGRESS, ...data };
  } catch (err) {
    console.error('Error loading JavaBuddy progress:', err);
    return { ...DEFAULT_PROGRESS };
  }
}

/**
 * Persists user progress to localStorage
 */
export function saveProgress(progress: UserProgress): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (err) {
    console.error('Error saving JavaBuddy progress:', err);
  }
}

/**
 * Records an activity for today, updating XP, streak, and daily goal
 */
export function recordActivity(progress: UserProgress, xpToAdd: number): UserProgress {
  const today = getLocalTodayDate();
  const updated = { ...progress };

  // Calculate streak based on local calendar dates
  if (updated.lastActiveDate !== today) {
    if (!updated.lastActiveDate) {
      updated.currentStreak = 1;
    } else {
      const lastDate = new Date(updated.lastActiveDate);
      const todayDate = new Date(today);
      const diffDays = Math.round((todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
      if (diffDays === 1) {
        updated.currentStreak += 1;
      } else if (diffDays > 1) {
        updated.currentStreak = 1;
      }
    }
    updated.todayXp = xpToAdd;
    updated.lastActiveDate = today;
  } else {
    updated.todayXp += xpToAdd;
  }

  updated.totalXp += xpToAdd;

  // Streak achievement check
  if (updated.currentStreak >= 3 && !updated.earnedAchievementCodes.includes('STREAK_3_DAYS')) {
    updated.earnedAchievementCodes.push('STREAK_3_DAYS');
    updated.totalXp += 150;
  }

  saveProgress(updated);
  return updated;
}

/**
 * Marks a lesson completed with its quiz score and awards XP
 */
export function completeLesson(progress: UserProgress, lessonId: string, quizScorePct: number, xpReward: number): {
  progress: UserProgress;
  newAchievements: string[];
} {
  const updated = { ...progress };
  const newAchievements: string[] = [];

  const wasAlreadyCompleted = updated.completedLessonIds.includes(lessonId);

  // Update best score
  const previousBest = updated.lessonScores[lessonId] || 0;
  if (quizScorePct > previousBest) {
    updated.lessonScores[lessonId] = quizScorePct;
  }

  // Weak topics detection: if score < 70%, add to weak topics, else remove
  if (quizScorePct < 70) {
    if (!updated.weakTopics.includes(lessonId)) {
      updated.weakTopics.push(lessonId);
    }
  } else {
    updated.weakTopics = updated.weakTopics.filter(id => id !== lessonId);
  }

  if (!wasAlreadyCompleted) {
    updated.completedLessonIds.push(lessonId);
    recordActivity(updated, xpReward);

    // First program achievement
    if (lessonId === 'level-1-first-program' && !updated.earnedAchievementCodes.includes('FIRST_HELLO')) {
      updated.earnedAchievementCodes.push('FIRST_HELLO');
      newAchievements.push('FIRST_HELLO');
    }

    // Specific level achievements
    if (lessonId === 'level-2-variables' && !updated.earnedAchievementCodes.includes('VARIABLE_MASTER')) {
      updated.earnedAchievementCodes.push('VARIABLE_MASTER');
      newAchievements.push('VARIABLE_MASTER');
    }
    if (lessonId === 'level-3-decisions' && !updated.earnedAchievementCodes.includes('DECISION_MAKER')) {
      updated.earnedAchievementCodes.push('DECISION_MAKER');
      newAchievements.push('DECISION_MAKER');
    }
    if (lessonId === 'level-4-loops' && !updated.earnedAchievementCodes.includes('LOOP_CHAMP')) {
      updated.earnedAchievementCodes.push('LOOP_CHAMP');
      newAchievements.push('LOOP_CHAMP');
    }
    if (lessonId === 'level-5-collections' && !updated.earnedAchievementCodes.includes('ARRAY_CHEF')) {
      updated.earnedAchievementCodes.push('ARRAY_CHEF');
      newAchievements.push('ARRAY_CHEF');
    }
    if (lessonId === 'level-6-methods' && !updated.earnedAchievementCodes.includes('METHOD_MAGICIAN')) {
      updated.earnedAchievementCodes.push('METHOD_MAGICIAN');
      newAchievements.push('METHOD_MAGICIAN');
    }
    if (lessonId === 'level-7-oop' && !updated.earnedAchievementCodes.includes('OOP_ARCHITECT')) {
      updated.earnedAchievementCodes.push('OOP_ARCHITECT');
      newAchievements.push('OOP_ARCHITECT');
    }
    if (lessonId === 'level-8-debugging' && !updated.earnedAchievementCodes.includes('BUG_HUNTER')) {
      updated.earnedAchievementCodes.push('BUG_HUNTER');
      newAchievements.push('BUG_HUNTER');
    }
  }

  // Quiz Whiz achievement for 100% score
  if (quizScorePct === 100 && !updated.earnedAchievementCodes.includes('QUIZ_WHIZ')) {
    updated.earnedAchievementCodes.push('QUIZ_WHIZ');
    newAchievements.push('QUIZ_WHIZ');
    updated.totalXp += 100;
  }

  // Full curriculum completion
  if (updated.completedLessonIds.length >= 10 && !updated.earnedAchievementCodes.includes('JAVA_GRADUATE')) {
    updated.earnedAchievementCodes.push('JAVA_GRADUATE');
    newAchievements.push('JAVA_GRADUATE');
    updated.totalXp += 300;
  }

  saveProgress(updated);
  return { progress: updated, newAchievements };
}

/**
 * Resets all learning progress (clean restart for testing)
 */
export function resetAllProgress(): UserProgress {
  localStorage.removeItem(STORAGE_KEY);
  return { ...DEFAULT_PROGRESS };
}
