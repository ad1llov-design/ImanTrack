-- =============================================================================
-- ImanTrack — Initial Schema Migration
-- =============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ── Enums ─────────────────────────────────────────────────────────────────────

CREATE TYPE prayer_name AS ENUM ('fajr', 'dhuhr', 'asr', 'maghrib', 'isha');
CREATE TYPE prayer_status AS ENUM ('completed', 'missed', 'qada', 'skipped');
CREATE TYPE habit_category AS ENUM ('ibadah', 'quran', 'dhikr', 'charity', 'health', 'knowledge');
CREATE TYPE habit_frequency AS ENUM ('daily', 'weekly', 'monthly');

-- ── Profiles ──────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS profiles (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email       TEXT NOT NULL UNIQUE,
  full_name   TEXT,
  avatar_url  TEXT,
  timezone    TEXT NOT NULL DEFAULT 'UTC',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ── Prayer Logs ───────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS prayer_logs (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id      UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  prayer_name  prayer_name NOT NULL,
  date         DATE NOT NULL,
  status       prayer_status NOT NULL DEFAULT 'missed',
  on_time      BOOLEAN NOT NULL DEFAULT FALSE,
  notes        TEXT,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, prayer_name, date)
);

CREATE INDEX idx_prayer_logs_user_date ON prayer_logs(user_id, date DESC);

-- ── Habits ────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS habits (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id       UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title         TEXT NOT NULL,
  description   TEXT,
  category      habit_category NOT NULL DEFAULT 'ibadah',
  target_count  INTEGER NOT NULL DEFAULT 1 CHECK (target_count > 0),
  frequency     habit_frequency NOT NULL DEFAULT 'daily',
  is_active     BOOLEAN NOT NULL DEFAULT TRUE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_habits_user_active ON habits(user_id, is_active);

CREATE TRIGGER habits_updated_at
  BEFORE UPDATE ON habits
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ── Habit Logs ────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS habit_logs (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  habit_id    UUID NOT NULL REFERENCES habits(id) ON DELETE CASCADE,
  user_id     UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  date        DATE NOT NULL,
  count       INTEGER NOT NULL DEFAULT 1 CHECK (count >= 0),
  notes       TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(habit_id, date)
);

CREATE INDEX idx_habit_logs_user_date ON habit_logs(user_id, date DESC);

-- ── Row Level Security ────────────────────────────────────────────────────────

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE prayer_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE habits ENABLE ROW LEVEL SECURITY;
ALTER TABLE habit_logs ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE USING (auth.uid() = id);

-- Prayer logs policies
CREATE POLICY "Users can view own prayer logs"
  ON prayer_logs FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own prayer logs"
  ON prayer_logs FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own prayer logs"
  ON prayer_logs FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own prayer logs"
  ON prayer_logs FOR DELETE USING (auth.uid() = user_id);

-- Habits policies
CREATE POLICY "Users can view own habits"
  ON habits FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own habits"
  ON habits FOR ALL USING (auth.uid() = user_id);

-- Habit logs policies
CREATE POLICY "Users can view own habit logs"
  ON habit_logs FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own habit logs"
  ON habit_logs FOR ALL USING (auth.uid() = user_id);
