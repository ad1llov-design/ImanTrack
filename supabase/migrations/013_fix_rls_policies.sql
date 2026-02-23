-- =============================================
-- FIX RLS: Заменяем все политики на FOR ALL + WITH CHECK
-- чтобы upsert(), insert(), update(), delete() работали
-- =============================================

-- 1. daily_progress
DROP POLICY IF EXISTS "Users can insert their own daily progress" ON public.daily_progress;
DROP POLICY IF EXISTS "Users can update their own daily progress" ON public.daily_progress;
DROP POLICY IF EXISTS "Users can read their own daily progress" ON public.daily_progress;
DROP POLICY IF EXISTS "Users manage own daily_progress" ON public.daily_progress;

CREATE POLICY "Users manage own daily_progress" ON public.daily_progress
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- 2. dhikr_logs
DROP POLICY IF EXISTS "Users can insert their own dhikr logs" ON public.dhikr_logs;
DROP POLICY IF EXISTS "Users can update their own dhikr logs" ON public.dhikr_logs;
DROP POLICY IF EXISTS "Users can read their own dhikr logs" ON public.dhikr_logs;
DROP POLICY IF EXISTS "Users can delete their own dhikr logs" ON public.dhikr_logs;
DROP POLICY IF EXISTS "Users manage own dhikr_logs" ON public.dhikr_logs;

CREATE POLICY "Users manage own dhikr_logs" ON public.dhikr_logs
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- 3. sunnah_logs
DROP POLICY IF EXISTS "Users can manage their own sunnah logs" ON public.sunnah_logs;
DROP POLICY IF EXISTS "Users manage own sunnah_logs" ON public.sunnah_logs;

CREATE POLICY "Users manage own sunnah_logs" ON public.sunnah_logs
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- 4. quran_logs
DROP POLICY IF EXISTS "Users can manage their own quran logs" ON public.quran_logs;
DROP POLICY IF EXISTS "Users manage own quran_logs" ON public.quran_logs;

CREATE POLICY "Users manage own quran_logs" ON public.quran_logs
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- 5. quran_bookmarks
DROP POLICY IF EXISTS "Users can manage their own quran bookmarks" ON public.quran_bookmarks;
DROP POLICY IF EXISTS "Users manage own quran_bookmarks" ON public.quran_bookmarks;

CREATE POLICY "Users manage own quran_bookmarks" ON public.quran_bookmarks
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- 6. prayer_logs
DROP POLICY IF EXISTS "Users manage own prayer_logs" ON public.prayer_logs;

CREATE POLICY "Users manage own prayer_logs" ON public.prayer_logs
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- 7. hadith_favorites
DROP POLICY IF EXISTS "Users manage own hadith_favorites" ON public.hadith_favorites;

CREATE POLICY "Users manage own hadith_favorites" ON public.hadith_favorites
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- 8. adhkar_progress
DROP POLICY IF EXISTS "Users manage own adhkar_progress" ON public.adhkar_progress;

CREATE POLICY "Users manage own adhkar_progress" ON public.adhkar_progress
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- 9. achievements
DROP POLICY IF EXISTS "Users manage own achievements" ON public.achievements;

CREATE POLICY "Users manage own achievements" ON public.achievements
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- 10. reflections
DROP POLICY IF EXISTS "Users manage own reflections" ON public.reflections;

CREATE POLICY "Users manage own reflections" ON public.reflections
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- 11. habits
DROP POLICY IF EXISTS "Users manage own habits" ON public.habits;

CREATE POLICY "Users manage own habits" ON public.habits
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
