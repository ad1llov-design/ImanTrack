-- =============================================
-- ПОЛНАЯ МИГРАЦИЯ: Все недостающие таблицы
-- =============================================

-- 1. prayer_logs — логи намазов (КРИТИЧНО для дашборда!)
CREATE TABLE IF NOT EXISTS public.prayer_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    prayer_name TEXT NOT NULL,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    status TEXT NOT NULL DEFAULT 'completed',
    on_time BOOLEAN DEFAULT true,
    notes TEXT,
    concentration_level INTEGER,
    location TEXT,
    emotional_state TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, prayer_name, date)
);

-- 2. hadith_favorites — избранные хадисы
CREATE TABLE IF NOT EXISTS public.hadith_favorites (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    hadith_id TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, hadith_id)
);

-- 3. adhkar_progress — прогресс зикров
CREATE TABLE IF NOT EXISTS public.adhkar_progress (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    dhikr_id TEXT NOT NULL,
    current_count INTEGER DEFAULT 0,
    target_count INTEGER DEFAULT 0,
    is_completed BOOLEAN DEFAULT false,
    completed_at TIMESTAMPTZ,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, dhikr_id, date)
);

-- 4. achievements — достижения
CREATE TABLE IF NOT EXISTS public.achievements (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    achievement_id TEXT NOT NULL,
    unlocked_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, achievement_id)
);

-- 5. reflections — дневник размышлений
CREATE TABLE IF NOT EXISTS public.reflections (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    content TEXT NOT NULL,
    mood TEXT,
    focus_duration_minutes INTEGER,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, date)
);

-- 6. habits — пользовательские привычки
CREATE TABLE IF NOT EXISTS public.habits (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL DEFAULT 'ibadah',
    target_count INTEGER DEFAULT 1,
    frequency TEXT NOT NULL DEFAULT 'daily',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- Включаем RLS на всех таблицах
-- =============================================
ALTER TABLE public.prayer_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hadith_favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.adhkar_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reflections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.habits ENABLE ROW LEVEL SECURITY;

-- =============================================
-- Политики безопасности (каждый видит только своё)
-- =============================================
DO $$
BEGIN
    -- prayer_logs
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users manage own prayer_logs' AND tablename = 'prayer_logs') THEN
        CREATE POLICY "Users manage own prayer_logs" ON public.prayer_logs FOR ALL USING (auth.uid() = user_id);
    END IF;

    -- hadith_favorites
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users manage own hadith_favorites' AND tablename = 'hadith_favorites') THEN
        CREATE POLICY "Users manage own hadith_favorites" ON public.hadith_favorites FOR ALL USING (auth.uid() = user_id);
    END IF;

    -- adhkar_progress
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users manage own adhkar_progress' AND tablename = 'adhkar_progress') THEN
        CREATE POLICY "Users manage own adhkar_progress" ON public.adhkar_progress FOR ALL USING (auth.uid() = user_id);
    END IF;

    -- achievements
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users manage own achievements' AND tablename = 'achievements') THEN
        CREATE POLICY "Users manage own achievements" ON public.achievements FOR ALL USING (auth.uid() = user_id);
    END IF;

    -- reflections
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users manage own reflections' AND tablename = 'reflections') THEN
        CREATE POLICY "Users manage own reflections" ON public.reflections FOR ALL USING (auth.uid() = user_id);
    END IF;

    -- habits
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users manage own habits' AND tablename = 'habits') THEN
        CREATE POLICY "Users manage own habits" ON public.habits FOR ALL USING (auth.uid() = user_id);
    END IF;
END $$;
