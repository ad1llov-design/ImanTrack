/**
 * @module services/supabase/prayerRepository
 * Репозиторий для работы с таблицей prayer_logs в Supabase
 */

import { createClient } from "@lib/supabase/server";
import type { Prayer } from "@entities/prayer/model/prayer";
import type { PrayerName, PrayerStatus } from "@shared/types/supabase";

export interface CreatePrayerLogInput {
  userId: string;
  prayerName: PrayerName;
  date: string;
  status: PrayerStatus;
  onTime?: boolean;
  notes?: string;
}

export interface GetPrayerLogsParams {
  userId: string;
  dateFrom?: string;
  dateTo?: string;
  limit?: number;
}

/** Получить логи намазов пользователя */
export async function getPrayerLogs({
  userId,
  dateFrom,
  dateTo,
  limit = 50,
}: GetPrayerLogsParams): Promise<Prayer[]> {
  const supabase = createClient();

  let query = supabase
    .from("prayer_logs")
    .select("*")
    .eq("user_id", userId)
    .order("date", { ascending: false })
    .limit(limit);

  if (dateFrom) query = query.gte("date", dateFrom);
  if (dateTo) query = query.lte("date", dateTo);

  const { data, error } = await query;

  if (error) throw new Error(`Failed to get prayer logs: ${error.message}`);

  return (data ?? []).map((row) => ({
    id: row.id,
    userId: row.user_id,
    prayerName: row.prayer_name,
    date: row.date,
    status: row.status,
    onTime: row.on_time,
    notes: row.notes,
    createdAt: new Date(row.created_at),
  }));
}

/** Создать или обновить лог намаза */
export async function upsertPrayerLog(
  input: CreatePrayerLogInput,
): Promise<Prayer> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("prayer_logs")
    .upsert(
      {
        user_id: input.userId,
        prayer_name: input.prayerName,
        date: input.date,
        status: input.status,
        on_time: input.onTime ?? false,
        notes: input.notes ?? null,
      },
      { onConflict: "user_id,prayer_name,date" },
    )
    .select()
    .single();

  if (error) throw new Error(`Failed to upsert prayer log: ${error.message}`);

  return {
    id: data.id,
    userId: data.user_id,
    prayerName: data.prayer_name,
    date: data.date,
    status: data.status,
    onTime: data.on_time,
    notes: data.notes,
    createdAt: new Date(data.created_at),
  };
}

/** Получить статистику намазов за месяц */
export async function getPrayerStats(
  userId: string,
  year: number,
  month: number,
): Promise<{ completed: number; total: number; percentage: number }> {
  const supabase = createClient();

  const startDate = `${year}-${String(month).padStart(2, "0")}-01`;
  const endDate = new Date(year, month, 0).toISOString().split("T")[0]!;

  const { data, error } = await supabase
    .from("prayer_logs")
    .select("status")
    .eq("user_id", userId)
    .gte("date", startDate)
    .lte("date", endDate);

  if (error) throw new Error(`Failed to get prayer stats: ${error.message}`);

  const total = data?.length ?? 0;
  const completed =
    data?.filter((p) => p.status === "completed").length ?? 0;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return { completed, total, percentage };
}
