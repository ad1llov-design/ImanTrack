/**
 * @module entities/habit
 * Доменная модель привычки (ибадат)
 */

import type { HabitCategory, HabitFrequency } from "@shared/types/supabase";

export interface Habit {
  id: string;
  userId: string;
  title: string;
  description: string | null;
  category: HabitCategory;
  targetCount: number;
  frequency: HabitFrequency;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface HabitLog {
  id: string;
  habitId: string;
  date: string;
  count: number;
  notes: string | null;
}

export interface HabitWithProgress extends Habit {
  todayCount: number;
  streak: number;
  completionRate: number;
}

/** Категории привычек с метаданными */
export const HABIT_CATEGORIES: Record<
  HabitCategory,
  { label: string; arabic: string; icon: string; color: string }
> = {
  ibadah: {
    label: "Ибадат",
    arabic: "عبادة",
    icon: "🕌",
    color: "text-primary-600",
  },
  quran: {
    label: "Коран",
    arabic: "قرآن",
    icon: "📖",
    color: "text-secondary-600",
  },
  dhikr: {
    label: "Зикр",
    arabic: "ذكر",
    icon: "📿",
    color: "text-primary-500",
  },
  charity: {
    label: "Садака",
    arabic: "صدقة",
    icon: "💚",
    color: "text-green-600",
  },
  health: {
    label: "Здоровье",
    arabic: "صحة",
    icon: "💪",
    color: "text-blue-500",
  },
  knowledge: {
    label: "Знания",
    arabic: "علم",
    icon: "📚",
    color: "text-purple-500",
  },
};

export const FREQUENCY_LABELS: Record<HabitFrequency, string> = {
  daily: "Ежедневно",
  weekly: "Еженедельно",
  monthly: "Ежемесячно",
};
