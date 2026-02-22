-- Обогащение таблицы prayer_logs для глубокого трекинга намаза

ALTER TABLE public.prayer_logs
ADD COLUMN concentration_level smallint CHECK (concentration_level >= 1 AND concentration_level <= 5),
ADD COLUMN location text CHECK (location IN ('mosque', 'home', 'travel')),
ADD COLUMN emotional_state text;
