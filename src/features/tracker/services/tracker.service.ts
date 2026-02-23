/**
 * @module features/tracker/services/tracker.service
 *
 * Service for calculating streaks, stats, and fetching activity data.
 */

import { createClient } from "@lib/supabase/client";
import { DailyActivity, StreakInfo, TrackerStats } from "../types/tracker.types";
import { format, subDays, startOfMonth, eachDayOfInterval, isSameDay } from "date-fns";

/**
 * Fetches activity data for the last 30 days.
 */
export async function getRecentActivity(days: number = 30): Promise<DailyActivity[]> {
  const supabase = createClient();
  const endDate = new Date();
  const startDate = subDays(endDate, days);

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const dateRange = {
    gte: format(startDate, "yyyy-MM-dd"),
    lte: format(endDate, "yyyy-MM-dd"),
  };

  // Each query wrapped individually — if a table is missing, we don't crash
  let typedPrayerLogs: Array<{ date: string; status: string }> = [];
  try {
    const { data: prayerLogs } = await supabase
      .from("prayer_logs")
      .select("date, status")
      .eq("user_id", user.id)
      .gte("date", dateRange.gte)
      .lte("date", dateRange.lte);
    typedPrayerLogs = (prayerLogs || []) as Array<{ date: string; status: string }>;
  } catch { /* table may not exist yet */ }

  let typedAdhkarLogs: Array<{ date: string; is_completed: boolean }> = [];
  try {
    const { data: adhkarLogs } = await supabase
      .from("adhkar_progress")
      .select("date, is_completed")
      .eq("user_id", user.id)
      .gte("date", dateRange.gte)
      .lte("date", dateRange.lte);
    typedAdhkarLogs = (adhkarLogs || []) as Array<{ date: string; is_completed: boolean }>;
  } catch { /* table may not exist yet */ }

  let typedSunnahLogs: Array<{ date: string; is_completed: boolean }> = [];
  try {
    const { data: sunnahLogs } = await supabase
      .from("sunnah_logs")
      .select("date, is_completed")
      .eq("user_id", user.id)
      .gte("date", dateRange.gte)
      .lte("date", dateRange.lte);
    typedSunnahLogs = (sunnahLogs || []) as Array<{ date: string; is_completed: boolean }>;
  } catch { /* table may not exist yet */ }

  let typedQuranLogs: Array<{ date: string; pages_read: number }> = [];
  try {
    const { data: quranLogs } = await supabase
      .from("quran_logs")
      .select("date, pages_read")
      .eq("user_id", user.id)
      .gte("date", dateRange.gte)
      .lte("date", dateRange.lte);
    typedQuranLogs = (quranLogs || []) as Array<{ date: string; pages_read: number }>;
  } catch { /* table may not exist yet */ }

  // Map to DailyActivity
  const interval = eachDayOfInterval({ start: startDate, end: endDate });
  
  return interval.map(date => {
    const dateStr = format(date, "yyyy-MM-dd");
    
    const dayPrayers = typedPrayerLogs.filter(l => l.date === dateStr);
    const dayAdhkars = typedAdhkarLogs.filter(a => a.date === dateStr);
    const daySunnah = typedSunnahLogs.filter(s => s.date === dateStr);
    const dayQuran = typedQuranLogs.filter(q => q.date === dateStr);
    
    const completedPrayers = dayPrayers.filter(p => p.status === "completed").length;
    const completedAdhkars = dayAdhkars.filter(a => a.is_completed).length;
    const completedSunnah = daySunnah.filter(s => s.is_completed).length;
    const quranPages = dayQuran.reduce((acc, q) => acc + (q.pages_read || 0), 0);
    
    // Calculate a simple score for the heatmap
    const score = (completedPrayers * 10) + (completedAdhkars * 5) + (completedSunnah * 3) + (quranPages * 2);

    return {
      date: dateStr,
      score,
      prayersCount: completedPrayers,
      adhkarCount: completedAdhkars,
      hadithRead: false, // Placeholder
    };
  });
}

/**
 * Calculates current and best streak based on prayer logs.
 * A streak day is a day where ALL 5 prayers are completed.
 */
export async function calculateStreaks(): Promise<StreakInfo> {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { currentStreak: 0, bestStreak: 0, lastActivityDate: null };

  // Fetch all dates where user had activity (completed all 5 prayers)
  // This is a bit complex in SQL, so we fetch last 90 days of logs and process in JS
  const { data: logs } = await supabase
    .from("prayer_logs")
    .select("date, status")
    .eq("user_id", user.id)
    .eq("status", "completed")
    .order("date", { ascending: false });

  if (!logs || logs.length === 0) {
    return { currentStreak: 0, bestStreak: 0, lastActivityDate: null };
  }

  // Count prayers per date
  const countsByDate: Record<string, number> = {};
  (logs as any[] || []).forEach(log => {
    if (log && log.date) {
      countsByDate[log.date] = (countsByDate[log.date] || 0) + 1;
    }
  });

  // Filter dates with all 5 prayers
  const activeDates = Object.keys(countsByDate)
    .filter(date => (countsByDate[date] || 0) >= 5)
    .sort((a, b) => b.localeCompare(a)); // Descending

  if (activeDates.length === 0) {
    return { currentStreak: 0, bestStreak: 0, lastActivityDate: null };
  }

  const typedActiveDates = activeDates as string[];

  let currentStreak = 0;
  const today = format(new Date(), "yyyy-MM-dd");
  const yesterday = format(subDays(new Date(), 1), "yyyy-MM-dd");

  // If latest active date is today or yesterday, start counting
  if (typedActiveDates[0] === today || typedActiveDates[0] === yesterday) {
    currentStreak = 1;
    for (let i = 0; i < typedActiveDates.length - 1; i++) {
      const currentStr = typedActiveDates[i];
      const nextStr = typedActiveDates[i+1];
      if (!currentStr || !nextStr) break;

      const current = new Date(currentStr);
      const next = new Date(nextStr);
      const diffDays = Math.round((current.getTime() - next.getTime()) / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        currentStreak++;
      } else {
        break;
      }
    }
  }

  // Best streak calculation (simple version)
  let bestStreak = currentStreak;
  let tempStreak = 1;
  for (let i = 0; i < typedActiveDates.length - 1; i++) {
    const currentStr = typedActiveDates[i];
    const nextStr = typedActiveDates[i+1];
    if (!currentStr || !nextStr) break;

    const current = new Date(currentStr);
    const next = new Date(nextStr);
    const diffDays = Math.round((current.getTime() - next.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
      tempStreak++;
    } else {
      bestStreak = Math.max(bestStreak, tempStreak);
      tempStreak = 1;
    }
  }
  bestStreak = Math.max(bestStreak, tempStreak);

  return {
    currentStreak,
    bestStreak,
    lastActivityDate: typedActiveDates[0] || null,
  };
}

/**
 * Calculates overall stats.
 */
export async function getTrackerStats(): Promise<TrackerStats> {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { totalPrayers: 0, totalAdhkars: 0, totalHadithsRead: 0, completionRate: 0 };

  // This is a simplified aggregate. In production, use Supabase RPCs or more efficient queries.
  const { count: prayerCount } = await supabase
    .from("prayer_logs")
    .select("*", { count: 'exact', head: true })
    .eq("user_id", user.id)
    .eq("status", "completed");

  const { count: adhkarCount } = await supabase
    .from("adhkar_progress")
    .select("*", { count: 'exact', head: true })
    .eq("user_id", user.id)
    .eq("is_completed", true);

  return {
    totalPrayers: prayerCount || 0,
    totalAdhkars: adhkarCount || 0,
    totalHadithsRead: 0, // Need to implement tracking for this
    completionRate: 0, // Placeholder
  };
}

/**
 * Checks and unlocks achievements based on current stats and streaks.
 */
export async function checkAndUnlockAchievements(
  stats: TrackerStats,
  streak: StreakInfo,
  currentAchievements: Achievement[]
): Promise<Achievement[]> {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return currentAchievements;

  // Fetch already unlocked achievements from DB
  const { data: unlockedData } = await supabase
    .from("achievements")
    .select("achievement_id, unlocked_at")
    .eq("user_id", user.id);

  const unlockedIds = new Set((unlockedData || []).map((a: any) => a.achievement_id));

  const updatedAchievements = currentAchievements.map(achievement => {
    // If already unlocked in DB, set as unlocked
    if (unlockedIds.has(achievement.id)) {
      const dbUnlock = (unlockedData as any[] || []).find((a: any) => a.achievement_id === achievement.id);
      return { 
        ...achievement, 
        status: "unlocked" as const, 
        progress: 100, 
        currentValue: achievement.target,
        unlockedAt: dbUnlock?.unlocked_at 
      };
    }

    // Logic to check if it should be unlocked now
    let currentValue = achievement.currentValue;
    
    if (achievement.id === "first_prayer") {
      currentValue = stats.totalPrayers >= 1 ? 1 : 0;
    } else if (achievement.id === "prayer_streak_3") {
      currentValue = streak.bestStreak >= 3 ? 3 : streak.currentStreak;
    } else if (achievement.id === "prayer_streak_7") {
      currentValue = streak.bestStreak >= 7 ? 7 : streak.currentStreak;
    } else if (achievement.id === "adhkar_master") {
      currentValue = stats.totalAdhkars;
    } else if (achievement.id === "on_time_warrior") {
      currentValue = stats.totalPrayers; // Simplified
    }

    const progress = Math.min(100, (currentValue / achievement.target) * 100);
    const isNowUnlocked = progress >= 100;

    if (isNowUnlocked && !unlockedIds.has(achievement.id)) {
      // Asyncly save to DB
      void supabase.from("achievements").insert({
        user_id: user.id,
        achievement_id: achievement.id
      } as any);
    }

    return {
      ...achievement,
      currentValue,
      progress,
      status: isNowUnlocked ? "unlocked" as const : "locked" as const,
      unlockedAt: isNowUnlocked ? new Date().toISOString() : undefined
    };
  });

  return updatedAchievements;
}

import { Achievement } from "../types/tracker.types";

