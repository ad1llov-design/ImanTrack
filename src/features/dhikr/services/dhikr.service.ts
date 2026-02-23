import { createClient } from "@lib/supabase/client";

interface DhikrLog {
  id: string;
  user_id: string;
  dhikr_id: string;
  count: number;
  timestamp: string;
  date: string;
}

/**
 * Получить все логи зикра за сегодня
 */
export async function getDhikrLogsForDate(date?: string): Promise<DhikrLog[]> {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const dateStr = date || new Date().toISOString().split("T")[0]!;

  const { data, error } = await supabase
    .from("dhikr_logs")
    .select("*")
    .eq("user_id", user.id)
    .eq("date", dateStr);

  if (error) {
    console.error("Failed to fetch dhikr logs:", error);
    return [];
  }

  return (data || []) as unknown as DhikrLog[];
}

/**
 * Записать сессию зикра в БД
 */
export async function logDhikrSession(dhikrId: string, count: number): Promise<void> {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  const dateStr = new Date().toISOString().split("T")[0]!;

  const payload = {
    user_id: user.id,
    dhikr_id: dhikrId,
    count: count,
    date: dateStr,
  };

  const { error } = await (supabase.from("dhikr_logs") as ReturnType<typeof supabase.from>).insert(payload as never);

  if (error) {
    console.error("Failed to log dhikr session:", error);
    throw error;
  }
}
