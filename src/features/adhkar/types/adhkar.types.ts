/**
 * @module features/adhkar/types
 *
 * Все типы модуля Adhkar (зикры / поминания Аллаха).
 */

/* ── Category ───────────────────────────────────────────────────────── */

export type AdhkarCategory =
  | "morning"      // Утренние азкары
  | "evening"      // Вечерние азкары
  | "after_salah"  // После намаза
  | "general"      // Общие дуа
  | "sleep"        // Перед сном
  | "wake_up";     // При пробуждении

export interface CategoryInfo {
  id: AdhkarCategory;
  nameRu: string;
  nameAr: string;
  translations?: { ru: string, en: string, uz: string, ky: string };
  icon: string;
  color: string; // Tailwind color class prefix
  description: string;
}

/* ── Dhikr item ─────────────────────────────────────────────────────── */

export interface Dhikr {
  id: string;
  categoryId: AdhkarCategory;
  arabic: string;
  transliteration: string;
  translation: string;
  translations?: { ru: string, en: string, uz: string, ky: string };
  reference: string;      // Источник (хадис)
  targetCount: number;    // Сколько раз надо прочитать
  virtue?: string;        // Достоинство (фадл) зикра
}

/* ── Progress ───────────────────────────────────────────────────────── */

export interface DhikrProgress {
  dhikrId: string;
  currentCount: number;
  targetCount: number;
  isCompleted: boolean;
  completedAt?: Date;
}

export interface CategoryProgress {
  categoryId: AdhkarCategory;
  totalDhikrs: number;
  completedDhikrs: number;
  percentage: number;
}

/* ── DB Row ──────────────────────────────────────────────────────────── */

export interface AdhkarProgressRow {
  id: string;
  user_id: string;
  dhikr_id: string;
  current_count: number;
  target_count: number;
  is_completed: boolean;
  completed_at: string | null;
  date: string; // YYYY-MM-DD
  created_at: string;
  updated_at: string;
}

/* ── Motivational messages ──────────────────────────────────────────── */

export interface MotivationMessage {
  arabic: string;
  translation: string;
  threshold: number; // Show after this % completion
}

/* ── Store state ────────────────────────────────────────────────────── */

export interface AdhkarState {
  activeCategory: AdhkarCategory | null;
  activeDhikrIndex: number;
  progress: Record<string, DhikrProgress>; // dhikrId → progress
  isLoading: boolean;
  error: string | null;
}
