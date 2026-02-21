-- ═══════════════════════════════════════════════════════════════════════════
-- ImanTrack — Database Schema: Profiles
-- ═══════════════════════════════════════════════════════════════════════════
-- Запустите этот SQL в Supabase SQL Editor (Dashboard → SQL Editor → New Query)
-- ═══════════════════════════════════════════════════════════════════════════

-- ── 1. Enable RLS ──────────────────────────────────────────────────────────

-- ── 2. Create profiles table ───────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  timezone TEXT DEFAULT 'Asia/Bishkek',
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Индексы
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);

-- ── 3. Enable Row Level Security ──────────────────────────────────────────

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- ── 4. RLS Policies ───────────────────────────────────────────────────────

-- Пользователь видит ТОЛЬКО свой профиль
CREATE POLICY "Users can view own profile"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

-- Пользователь может обновлять ТОЛЬКО свой профиль
CREATE POLICY "Users can update own profile"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Пользователь может вставить ТОЛЬКО свой профиль (для trigger fallback)
CREATE POLICY "Users can insert own profile"
  ON public.profiles
  FOR INSERT
  WITH CHECK (auth.uid() = id);

-- ── 5. Trigger: автоматическое создание профиля при регистрации ────────────

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data ->> 'full_name',
    NEW.raw_user_meta_data ->> 'avatar_url'
  );
  RETURN NEW;
END;
$$;

-- Trigger on auth.users insert
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- ── 6. Trigger: auto-update updated_at ─────────────────────────────────────

CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS set_updated_at ON public.profiles;
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();

-- ═══════════════════════════════════════════════════════════════════════════
-- ГОТОВО! Таблица profiles создана с:
-- ✅ Связь с auth.users (CASCADE delete)
-- ✅ RLS: пользователь видит/обновляет ТОЛЬКО свой профиль
-- ✅ Auto-create: trigger создаёт профиль при регистрации
-- ✅ Auto-update: updated_at обновляется автоматически
-- ═══════════════════════════════════════════════════════════════════════════
