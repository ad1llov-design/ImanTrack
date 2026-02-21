/**
 * @module features/tracker/store/trackerStore
 *
 * Zustand store for tracking progress, streaks, and achievements.
 */

"use client";

import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { TrackerState, StreakInfo, DailyActivity, TrackerStats, Achievement } from "../types/tracker.types";
import { ACHIEVEMENTS } from "../data/achievements.data";

interface TrackerActions {
  setStreak: (streak: StreakInfo) => void;
  setDailyActivity: (activity: DailyActivity[]) => void;
  setStats: (stats: TrackerStats) => void;
  setAchievements: (achievements: Achievement[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  refreshTracker: () => Promise<void>;
}

const initialState: TrackerState = {
  achievements: ACHIEVEMENTS,
  dailyActivity: [],
  streak: { currentStreak: 0, bestStreak: 0, lastActivityDate: null },
  stats: { totalPrayers: 0, totalAdhkars: 0, totalHadithsRead: 0, completionRate: 0 },
  isLoading: true,
  error: null,
};

export const useTrackerStore = create<TrackerState & TrackerActions>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,

        setStreak: (streak) => set({ streak }, false, "tracker/setStreak"),
        setDailyActivity: (dailyActivity) => set({ dailyActivity }, false, "tracker/setDailyActivity"),
        setStats: (stats) => set({ stats }, false, "tracker/setStats"),
        setAchievements: (achievements) => set({ achievements }, false, "tracker/setAchievements"),
        setLoading: (isLoading) => set({ isLoading }, false, "tracker/setLoading"),
        setError: (error) => set({ error, isLoading: false }, false, "tracker/setError"),

        refreshTracker: async () => {
          const { setLoading, setError, setStreak, setDailyActivity, setStats, setAchievements, achievements } = get();
          setLoading(true);
          try {
            const { 
              calculateStreaks, 
              getRecentActivity, 
              getTrackerStats,
              checkAndUnlockAchievements
            } = await import("../services/tracker.service");
            
            const [streak, activity, stats] = await Promise.all([
              calculateStreaks(),
              getRecentActivity(7),
              getTrackerStats()
            ]);

            setStreak(streak);
            setDailyActivity(activity);
            setStats(stats);

            // Check achievements
            const updatedAchievements = await checkAndUnlockAchievements(stats, streak, achievements);
            setAchievements(updatedAchievements);

            setError(null);
          } catch (err) {
            setError("Ошибка при обновлении статистики");
          } finally {
            setLoading(false);
          }
        },
      }),
      { name: "imantrack-tracker-storage" }
    ),
    { name: "TrackerStore" }
  )
);
