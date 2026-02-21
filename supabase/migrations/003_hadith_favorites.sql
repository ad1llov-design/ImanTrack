-- ═══════════════════════════════════════════════════════════════════════════
-- ImanTrack — Database Schema: Hadith Favorites
-- ═══════════════════════════════════════════════════════════════════════════
-- Запустите этот SQL в Supabase SQL Editor
-- ПОСЛЕ 001_profiles.sql
-- ═══════════════════════════════════════════════════════════════════════════

-- ── 1. Create hadith_favorites table ─────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.hadith_favorites (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  hadith_id TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,

  -- Уникальный: один хадис в избранном одного пользователя
  CONSTRAINT hadith_favorites_unique UNIQUE(user_id, hadith_id)
);

-- ── 2. Index ─────────────────────────────────────────────────────────────

CREATE INDEX IF NOT EXISTS idx_hadith_favorites_user
  ON public.hadith_favorites(user_id);

-- ── 3. Enable RLS ────────────────────────────────────────────────────────

ALTER TABLE public.hadith_favorites ENABLE ROW LEVEL SECURITY;

-- ── 4. RLS Policies ──────────────────────────────────────────────────────

CREATE POLICY "Users can view own hadith favorites"
  ON public.hadith_favorites
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own hadith favorites"
  ON public.hadith_favorites
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own hadith favorites"
  ON public.hadith_favorites
  FOR DELETE
  USING (auth.uid() = user_id);

-- ═══════════════════════════════════════════════════════════════════════════
-- ГОТОВО!
-- ✅ hadith_favorites: user_id + hadith_id (unique)
-- ✅ RLS: select/insert/delete только свои избранные
-- ✅ Index: user_id для быстрых запросов
-- ═══════════════════════════════════════════════════════════════════════════
