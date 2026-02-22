import { createClient } from "@lib/supabase/client";
import type { Database } from "@shared/types/supabase";

export type QuranLog = Database["public"]["Tables"]["quran_logs"]["Row"];
export type QuranBookmark = Database["public"]["Tables"]["quran_bookmarks"]["Row"];

export async function getQuranLog(date: string): Promise<QuranLog | null> {
  const supabase = createClient();
  const { data: user } = await supabase.auth.getUser();
  if (!user.user) throw new Error("User not authenticated");

  const { data, error } = await supabase
    .from("quran_logs")
    .select("*")
    .eq("user_id", user.user.id)
    .eq("date", date)
    .maybeSingle();

  if (error) {
    console.error("Error fetching quran log:", error);
    return null;
  }
  return data;
}

export async function upsertQuranLog(log: Partial<QuranLog> & { date: string }): Promise<void> {
  const supabase = createClient();
  const { data: user } = await supabase.auth.getUser();
  if (!user.user) throw new Error("User not authenticated");

  const { error } = await supabase
    .from("quran_logs")
    .upsert(
      {
        user_id: user.user.id,
        date: log.date,
        juz: log.juz || null,
        surah: log.surah || null,
        ayah: log.ayah || null,
        pages_read: log.pages_read || 0,
      } as any,
      { onConflict: "user_id,date" }
    );

  if (error) {
    console.error("Error upserting quran log:", error);
    throw error;
  }
}
