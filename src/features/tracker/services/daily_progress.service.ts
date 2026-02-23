import { createClient } from "@lib/supabase/client";
import { format } from "date-fns";
import type { Database } from "@shared/types/supabase";

export type DailyProgress = Database["public"]["Tables"]["daily_progress"]["Row"];

export async function getDailyProgress(dateStr: string): Promise<DailyProgress | null> {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from("daily_progress")
    .select("*")
    .eq("user_id", user.id)
    .eq("date", dateStr)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error("Error fetching daily progress:", error);
    return null;
  }

  return data || null;
}

export async function upsertDailyProgress(
  dateStr: string,
  updates: Partial<Omit<DailyProgress, "id" | "user_id" | "date" | "created_at" | "updated_at">>
) {
  const supabase = createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  
  if (authError) {
    console.error("Auth error in upsertDailyProgress:", authError);
    throw new Error("Auth failed: " + authError.message);
  }
  if (!user) throw new Error("Unauthorized");

  // First fetch to merge jsonb correctly
  const current = await getDailyProgress(dateStr);

  const payload = {
    user_id: user.id,
    date: dateStr,
    prayers: updates.prayers ?? current?.prayers ?? { fajr: false, dhuhr: false, asr: false, maghrib: false, isha: false },
    sunnah_actions: updates.sunnah_actions ?? current?.sunnah_actions ?? [],
    nafil_count: updates.nafil_count ?? current?.nafil_count ?? 0,
    updated_at: new Date().toISOString()
  };

  console.log("daily_progress upsert payload:", JSON.stringify(payload));

  const { error } = await supabase
    .from("daily_progress")
    .upsert(payload as any, { onConflict: "user_id,date" });

  if (error) {
    console.error("daily_progress upsert FAILED:", {
      code: error.code,
      message: error.message,
      details: error.details,
      hint: error.hint,
    });
    throw error;
  }
  
  console.log("daily_progress upsert SUCCESS for", dateStr);
}
