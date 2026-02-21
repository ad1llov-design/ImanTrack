-- ═══════════════════════════════════════════════════════════════════════════
-- ImanTrack — Database Schema: Adhkar Progress
-- ═══════════════════════════════════════════════════════════════════════════
-- Запустите этот SQL в Supabase SQL Editor (Dashboard → SQL Editor)
-- ПОСЛЕ 001_profiles.sql
-- ═══════════════════════════════════════════════════════════════════════════

-- ── 1. Create adhkar_progress table ──────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.adhkar_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  dhikr_id TEXT NOT NULL,
  current_count INTEGER DEFAULT 0 NOT NULL,
  target_count INTEGER DEFAULT 0 NOT NULL,
  is_completed BOOLEAN DEFAULT false NOT NULL,
  completed_at TIMESTAMPTZ,
  date DATE DEFAULT CURRENT_DATE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,

  -- Уникальный constraint: один прогресс на зикр на дату на пользователя
  CONSTRAINT adhkar_progress_unique UNIQUE(user_id, dhikr_id, date)
);

-- ── 2. Indexes ───────────────────────────────────────────────────────────

CREATE INDEX IF NOT EXISTS idx_adhkar_user_date
  ON public.adhkar_progress(user_id, date);

CREATE INDEX IF NOT EXISTS idx_adhkar_user_dhikr
  ON public.adhkar_progress(user_id, dhikr_id);

-- ── 3. Enable RLS ────────────────────────────────────────────────────────

ALTER TABLE public.adhkar_progress ENABLE ROW LEVEL SECURITY;

-- ── 4. RLS Policies ──────────────────────────────────────────────────────

-- Пользователь видит только свой прогресс
CREATE POLICY "Users can view own adhkar progress"
  ON public.adhkar_progress
  FOR SELECT
  USING (auth.uid() = user_id);

-- Пользователь может вставлять свой прогресс
CREATE POLICY "Users can insert own adhkar progress"
  ON public.adhkar_progress
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Пользователь может обновлять свой прогресс
CREATE POLICY "Users can update own adhkar progress"
  ON public.adhkar_progress
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Пользователь может удалять свой прогресс (reset)
CREATE POLICY "Users can delete own adhkar progress"
  ON public.adhkar_progress
  FOR DELETE
  USING (auth.uid() = user_id);

-- ── 5. Auto-update updated_at ────────────────────────────────────────────

-- Используем уже существующую функцию update_updated_at() из 001_profiles.sql
DROP TRIGGER IF EXISTS set_updated_at_adhkar ON public.adhkar_progress;
CREATE TRIGGER set_updated_at_adhkar
  BEFORE UPDATE ON public.adhkar_progress
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();

-- ═══════════════════════════════════════════════════════════════════════════
-- ГОТОВО!
-- ✅ adhkar_progress: user_id, dhikr_id, date (unique per day)
-- ✅ RLS: CRUD только для своего прогресса
-- ✅ Indexes: user+date, user+dhikr для быстрых запросов
-- ✅ Auto-update: updated_at обновляется автоматически
-- ═══════════════════════════════════════════════════════════════════════════
