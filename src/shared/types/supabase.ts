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
          concentration_level: number | null;
          location: "mosque" | "home" | "travel" | null;
          emotional_state: string | null;
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
          concentration_level?: number | null;
          location?: "mosque" | "home" | "travel" | null;
          emotional_state?: string | null;
        };
        Update: {
          status?: PrayerStatus;
          on_time?: boolean;
          notes?: string | null;
          concentration_level?: number | null;
          location?: "mosque" | "home" | "travel" | null;
          emotional_state?: string | null;
        };
      };
      quran_logs: {
        Row: {
          id: string;
          user_id: string;
          date: string;
          juz: number | null;
          surah: number | null;
          ayah: number | null;
          pages_read: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          date: string;
          juz?: number | null;
          surah?: number | null;
          ayah?: number | null;
          pages_read?: number;
        };
        Update: {
          juz?: number | null;
          surah?: number | null;
          ayah?: number | null;
          pages_read?: number;
        };
      };
      quran_bookmarks: {
        Row: {
          id: string;
          user_id: string;
          surah: number;
          ayah: number;
          note: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          surah: number;
          ayah: number;
          note?: string | null;
        };
        Update: {
          surah?: number;
          ayah?: number;
          note?: string | null;
        };
      };
      reflections: {
        Row: {
          id: string;
          user_id: string;
          date: string;
          content: string;
          mood: string | null;
          focus_duration_minutes: number | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          date: string;
          content: string;
          mood?: string | null;
          focus_duration_minutes?: number | null;
        };
        Update: {
          content?: string;
          mood?: string | null;
          focus_duration_minutes?: number | null;
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
      sunnah_logs: {
        Row: {
          id: string;
          user_id: string;
          date: string;
          action_id: string;
          is_completed: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          date: string;
          action_id: string;
          is_completed?: boolean;
        };
        Update: {
          is_completed?: boolean;
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
