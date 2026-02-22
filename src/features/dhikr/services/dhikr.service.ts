import { createClient } from "@lib/supabase/client";

export async function logDhikrSession(dhikrId: string, count: number) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  const dateStr = new Date().toISOString().split('T')[0];

  const { error } = await supabase
    .from("dhikr_logs")
    .insert({
      user_id: user.id,
      dhikr_id: dhikrId,
      count: count,
      date: dateStr,
    } as any);

  if (error) {
    console.error("Failed to log dhikr session:", error);
  }
}
