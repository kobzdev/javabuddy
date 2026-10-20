-- ==============================================================================
-- JavaBuddy: Initial Database Schema and Row Level Security (RLS) Policies
-- Migration: 001_initial_schema.sql
-- ==============================================================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES TABLE
-- Stores user profile data connected to Supabase Auth
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    display_name TEXT NOT NULL DEFAULT 'Young Programmer',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. ACHIEVEMENTS CATALOG TABLE
-- Standard master list of earnable badges and rewards
CREATE TABLE IF NOT EXISTS public.achievements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    xp_reward INTEGER NOT NULL DEFAULT 50,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. LESSON PROGRESS TABLE
-- Tracks progress for each lesson per user
CREATE TABLE IF NOT EXISTS public.lesson_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    lesson_id TEXT NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('not_started', 'in_progress', 'completed')),
    best_quiz_score INTEGER NOT NULL DEFAULT 0,
    completed_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT unique_user_lesson UNIQUE(user_id, lesson_id)
);

-- 4. QUIZ ATTEMPTS TABLE
-- Detailed log of quiz completions
CREATE TABLE IF NOT EXISTS public.quiz_attempts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    lesson_id TEXT NOT NULL,
    score INTEGER NOT NULL,
    total_questions INTEGER NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. USER ACHIEVEMENTS TABLE
-- Junction table tracking badges awarded to users
CREATE TABLE IF NOT EXISTS public.user_achievements (
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    achievement_id UUID NOT NULL REFERENCES public.achievements(id) ON DELETE CASCADE,
    earned_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (user_id, achievement_id)
);

-- 6. DAILY ACTIVITY TABLE
-- Daily streaks, XP, and lesson completion log
CREATE TABLE IF NOT EXISTS public.daily_activity (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    activity_date DATE NOT NULL,
    xp_earned INTEGER NOT NULL DEFAULT 0,
    lessons_completed INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT unique_user_daily_activity UNIQUE(user_id, activity_date)
);

-- ------------------------------------------------------------------------------
-- Indexes for performance
-- ------------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_lesson_progress_user ON public.lesson_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_lesson_progress_lesson ON public.lesson_progress(lesson_id);
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_user ON public.quiz_attempts(user_id);
CREATE INDEX IF NOT EXISTS idx_user_achievements_user ON public.user_achievements(user_id);
CREATE INDEX IF NOT EXISTS idx_daily_activity_user_date ON public.daily_activity(user_id, activity_date);

-- ------------------------------------------------------------------------------
-- Row Level Security (RLS) Configuration
-- ------------------------------------------------------------------------------
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_activity ENABLE ROW LEVEL SECURITY;

-- Achievements are readable by any authenticated or anonymous user
CREATE POLICY "Achievements catalog is viewable by everyone" 
ON public.achievements FOR SELECT USING (true);

-- Profiles policies
CREATE POLICY "Users can view their own profile" 
ON public.profiles FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Lesson progress policies
CREATE POLICY "Users can view their own lesson progress" 
ON public.lesson_progress FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own lesson progress" 
ON public.lesson_progress FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own lesson progress" 
ON public.lesson_progress FOR UPDATE USING (auth.uid() = user_id);

-- Quiz attempts policies
CREATE POLICY "Users can view their own quiz attempts" 
ON public.quiz_attempts FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own quiz attempts" 
ON public.quiz_attempts FOR INSERT WITH CHECK (auth.uid() = user_id);

-- User achievements policies
CREATE POLICY "Users can view their own user achievements" 
ON public.user_achievements FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own user achievements" 
ON public.user_achievements FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Daily activity policies
CREATE POLICY "Users can view their own daily activity" 
ON public.daily_activity FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own daily activity" 
ON public.daily_activity FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own daily activity" 
ON public.daily_activity FOR UPDATE USING (auth.uid() = user_id);

-- ------------------------------------------------------------------------------
-- Seed Default Achievements
-- ------------------------------------------------------------------------------
INSERT INTO public.achievements (code, name, description, xp_reward)
VALUES 
    ('FIRST_HELLO', 'First Words', 'Ran your very first Java program!', 50),
    ('VARIABLE_MASTER', 'Toy Box Organizer', 'Mastered Java variables and toy box labels', 75),
    ('DECISION_MAKER', 'Smart Robot', 'Completed the decisions and if-else level', 100),
    ('LOOP_CHAMP', 'Carousel Rider', 'Learned how to repeat actions with loops', 100),
    ('ARRAY_CHEF', 'Fruit Basket Hero', 'Organized items inside collections and arrays', 100),
    ('METHOD_MAGICIAN', 'Recipe Builder', 'Created your first custom Java method', 125),
    ('OOP_ARCHITECT', 'Toy Factory Owner', 'Built your first Java class and object', 150),
    ('BUG_HUNTER', 'Detective Java', 'Fixed your first tricky compiler error', 100),
    ('QUIZ_WHIZ', 'Brainiac', 'Scored 100% on a lesson quiz', 100),
    ('STREAK_3_DAYS', 'Daily Habit', 'Kept a 3-day coding streak alive', 150)
ON CONFLICT (code) DO NOTHING;
