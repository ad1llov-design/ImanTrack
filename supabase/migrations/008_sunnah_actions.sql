-- Sunnah Actions Grid Module

CREATE TABLE IF NOT EXISTS public.sunnah_logs (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    date date NOT NULL,
    action_id text NOT NULL, -- e.g. 'dua', 'sadaqah', 'smile'
    is_completed boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    UNIQUE(user_id, date, action_id)
);

-- RLS policies
ALTER TABLE public.sunnah_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own sunnah logs" ON public.sunnah_logs
    FOR ALL USING (auth.uid() = user_id);
    
-- Index for quick lookup
CREATE INDEX idx_sunnah_logs_user_date ON public.sunnah_logs(user_id, date);
