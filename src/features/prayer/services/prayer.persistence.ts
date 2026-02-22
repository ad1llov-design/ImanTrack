/**
 * @module features/prayer/services/prayer.persistence
 *
 * Сервис для записи и получения логов намаза из Supabase.
 */

import { createClient } from "@lib/supabase/client";
import type { Database, PrayerName as DBPrayerName, PrayerStatus as DBPrayerStatus } from "@shared/types/supabase";

export interface PrayerLog {
  id?: string;
  userId: string;
  prayerName: DBPrayerName;
  date: string; // YYYY-MM-DD
  status: DBPrayerStatus;
  onTime: boolean;
  notes?: string | null;
  concentrationLevel?: number | null;
  location?: "mosque" | "home" | "travel" | null;
  emotionalState?: string | null;
  createdAt?: string;
}

/**
 * Сохраняет или обновляет статус намаза в БД
 */
export async function upsertPrayerLog(log: PrayerLog): Promise<boolean> {
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;

  const { error } = await supabase
    .from("prayer_logs")
    .upsert(
      {
        user_id: user.id,
        prayer_name: log.prayerName,
        date: log.date,
        status: log.status,
        on_time: log.onTime,
        notes: log.notes || null,
        concentration_level: log.concentrationLevel || null,
        location: log.location || null,
        emotional_state: log.emotionalState || null,
      } as any, // Cast to any to bypass strict Database table inference issues
      { onConflict: "user_id,prayer_name,date" }
    );

  if (error) {
    console.error("Failed to upsert prayer log:", error);
    return false;
  }

  return true;
}

/**
 * Получает логи намазов за конкретную дату
 */
export async function getPrayerLogs(date: string): Promise<PrayerLog[]> {
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from("prayer_logs")
    .select("*")
    .eq("user_id", user.id)
    .eq("date", date);

  if (error) {
    console.error("Failed to fetch prayer logs:", error);
    return [];
  }

  return (data as any[] || []).map((row) => ({
    id: row.id,
    userId: row.user_id,
    prayerName: row.prayer_name,
    date: row.date,
    status: row.status,
    onTime: row.on_time,
    notes: row.notes,
    concentrationLevel: row.concentration_level,
    location: row.location,
    emotionalState: row.emotional_state,
    createdAt: row.created_at,
  }));
}
