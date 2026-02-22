-- Модуль Reflection Zone (Зона Тафаккура)

CREATE TABLE public.reflections (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    date date NOT NULL,
    content text NOT NULL,
    mood text,
    focus_duration_minutes integer DEFAULT 0,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);

-- RLS policies
ALTER TABLE public.reflections ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their own reflections" ON public.reflections
    FOR ALL USING (auth.uid() = user_id);
