-- Create daily_progress table to unify prayer, sunnah, and nafil tracking
CREATE TABLE IF NOT EXISTS public.daily_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  prayers JSONB DEFAULT '{"fajr": false, "dhuhr": false, "asr": false, "maghrib": false, "isha": false}'::jsonb,
  sunnah_actions TEXT[] DEFAULT '{}',
  nafil_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, date)
);

-- Enable RLS for daily_progress
ALTER TABLE public.daily_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert their own daily progress"
  ON public.daily_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own daily progress"
  ON public.daily_progress FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read their own daily progress"
  ON public.daily_progress FOR SELECT
  USING (auth.uid() = user_id);


-- Create dhikr_logs table
CREATE TABLE IF NOT EXISTS public.dhikr_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  dhikr_id TEXT NOT NULL,
  count INTEGER DEFAULT 0,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  date DATE DEFAULT CURRENT_DATE
);

-- Enable RLS for dhikr_logs
ALTER TABLE public.dhikr_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert their own dhikr logs"
  ON public.dhikr_logs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own dhikr logs"
  ON public.dhikr_logs FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read their own dhikr logs"
  ON public.dhikr_logs FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own dhikr logs"
  ON public.dhikr_logs FOR DELETE
  USING (auth.uid() = user_id);
