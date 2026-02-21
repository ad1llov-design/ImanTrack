/**
 * @module shared/types/supabase
 * Авто-генерируемые типы из Supabase схемы
 * Запустите: npm run db:generate
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          timezone: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          timezone?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          timezone?: string;
          updated_at?: string;
        };
      };
      prayer_logs: {
        Row: {
          id: string;
          user_id: string;
          prayer_name: PrayerName;
          date: string;
          status: PrayerStatus;
          on_time: boolean;
          notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          prayer_name: PrayerName;
          date: string;
          status: PrayerStatus;
          on_time?: boolean;
          notes?: string | null;
        };
        Update: {
          status?: PrayerStatus;
          on_time?: boolean;
          notes?: string | null;
        };
      };
      habits: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          description: string | null;
          category: HabitCategory;
          target_count: number;
          frequency: HabitFrequency;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          description?: string | null;
          category: HabitCategory;
          target_count?: number;
          frequency?: HabitFrequency;
          is_active?: boolean;
        };
        Update: {
          title?: string;
          description?: string | null;
          category?: HabitCategory;
          target_count?: number;
          is_active?: boolean;
        };
      };
      adhkar_progress: {
        Row: {
          id: string;
          user_id: string;
          dhikr_id: string;
          current_count: number;
          target_count: number;
          is_completed: boolean;
          completed_at: string | null;
          date: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          dhikr_id: string;
          current_count: number;
          target_count: number;
          is_completed: boolean;
          completed_at?: string | null;
          date: string;
        };
        Update: {
          current_count?: number;
          is_completed?: boolean;
          completed_at?: string | null;
        };
      };
      achievements: {
        Row: {
          id: string;
          user_id: string;
          achievement_id: string;
          unlocked_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          achievement_id: string;
          unlocked_at?: string;
        };
        Update: {
          achievement_id?: string;
        };
      };
      hadith_favorites: {
        Row: {
          id: string;
          user_id: string;
          hadith_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          hadith_id: string;
        };
        Update: {
          hadith_id?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      prayer_name: PrayerName;
      prayer_status: PrayerStatus;
      habit_category: HabitCategory;
      habit_frequency: HabitFrequency;
    };
  };
}

// ── Domain Enums ──────────────────────────────────────────────────────────────

export type PrayerName = "fajr" | "dhuhr" | "asr" | "maghrib" | "isha";
export type PrayerStatus = "completed" | "missed" | "qada" | "skipped";
export type HabitCategory = "ibadah" | "quran" | "dhikr" | "charity" | "health" | "knowledge";
export type HabitFrequency = "daily" | "weekly" | "monthly";
