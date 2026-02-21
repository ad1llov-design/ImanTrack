/**
 * @module features/tracker/types
 *
 * Types for the Progress and Gamification module.
 */

export type AchievementStatus = 'locked' | 'unlocked' | 'in_progress';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  status: AchievementStatus;
  progress: number; // 0-100
  target: number;
  currentValue: number;
  category: 'prayer' | 'adhkar' | 'knowledge' | 'consistency';
  unlockedAt?: string;
}

export interface DailyActivity {
  date: string; // YYYY-MM-DD
  score: number; // For heatmap intensity
  prayersCount: number;
  adhkarCount: number;
  hadithRead: boolean;
}

export interface StreakInfo {
  currentStreak: number;
  bestStreak: number;
  lastActivityDate: string | null;
}

export interface TrackerStats {
  totalPrayers: number;
  totalAdhkars: number;
  totalHadithsRead: number;
  completionRate: number; // percentage
}

export interface TrackerState {
  achievements: Achievement[];
  dailyActivity: DailyActivity[];
  streak: StreakInfo;
  stats: TrackerStats;
  isLoading: boolean;
  error: string | null;
}
