-- 1. Создаем таблицу для трекера Корана
CREATE TABLE IF NOT EXISTS public.quran_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    juz INTEGER,
    surah INTEGER,
    ayah INTEGER,
    pages_read INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, date)
);

-- 2. Создаем таблицу для закладок Корана
CREATE TABLE IF NOT EXISTS public.quran_bookmarks (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    surah INTEGER NOT NULL,
    ayah INTEGER NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, surah, ayah)
);

-- 3. Создаем таблицу для действий Сунны
CREATE TABLE IF NOT EXISTS public.sunnah_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    action_id TEXT NOT NULL,
    is_completed BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, date, action_id)
);

-- 4. Включаем RLS (Безопасность)
ALTER TABLE public.quran_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quran_bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sunnah_logs ENABLE ROW LEVEL SECURITY;

-- 5. Пишем политики доступа (чтобы чужие данные не смешивались)
CREATE POLICY "Users can manage their own quran logs" ON public.quran_logs FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage their own quran bookmarks" ON public.quran_bookmarks FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage their own sunnah logs" ON public.sunnah_logs FOR ALL USING (auth.uid() = user_id);
