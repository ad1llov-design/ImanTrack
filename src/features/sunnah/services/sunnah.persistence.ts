import { createClient } from "@lib/supabase/client";
import type { Database } from "@shared/types/supabase";

export type SunnahLog = Database["public"]["Tables"]["sunnah_logs"]["Row"];

export const SUNNAH_ACTIONS = [
  { id: "dua", label: "Дуа", icon: "🤲" },
  { id: "sadaqah", label: "Садака", icon: "💰" },
  { id: "smile", label: "Улыбка", icon: "😊" },
  { id: "kind_word", label: "Доброе слово", icon: "💬" },
  { id: "family", label: "Родные", icon: "🏠" },
  { id: "help", label: "Помощь", icon: "🤝" },
  { id: "niyyah", label: "Ният", icon: "✨" },
  { id: "shukr", label: "Благодарность", icon: "🙏" },
  { id: "istighfar", label: "Истигфар", icon: "📿" },
];

export async function getSunnahLogs(date: string): Promise<SunnahLog[]> {
  const supabase = createClient();
  const { data: user } = await supabase.auth.getUser();
  if (!user.user) return [];

  const { data, error } = await supabase
    .from("sunnah_logs")
    .select("*")
    .eq("user_id", user.user.id)
    .eq("date", date);

  if (error) {
    console.error("Error fetching sunnah logs:", error);
    return [];
  }
  return data || [];
}

export async function toggleSunnahAction(date: string, actionId: string, isCompleted: boolean): Promise<void> {
  const supabase = createClient();
  const { data: user } = await supabase.auth.getUser();
  if (!user.user) throw new Error("User not authenticated");

  const { error } = await supabase
    .from("sunnah_logs")
    .upsert({
      user_id: user.user.id,
      date,
      action_id: actionId,
      is_completed: isCompleted,
    } as any, { onConflict: "user_id,date,action_id" });

  if (error) {
    console.error("Error toggling sunnah action:", error);
    throw error;
  }
}
