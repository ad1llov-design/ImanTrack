-- Модуль Трекинга Корана

CREATE TABLE public.quran_logs (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    date date NOT NULL,
    juz integer CHECK (juz >= 1 AND juz <= 30),
    surah integer CHECK (surah >= 1 AND surah <= 114),
    ayah integer,
    pages_read integer DEFAULT 0,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    UNIQUE(user_id, date)
);

CREATE TABLE public.quran_bookmarks (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    surah integer NOT NULL,
    ayah integer NOT NULL,
    note text,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);

-- RLS policies
ALTER TABLE public.quran_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their own quran logs" ON public.quran_logs
    FOR ALL USING (auth.uid() = user_id);

ALTER TABLE public.quran_bookmarks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their own quran bookmarks" ON public.quran_bookmarks
    FOR ALL USING (auth.uid() = user_id);
