import { createClient } from "@lib/supabase/client";
import type { Database } from "@shared/types/supabase";

export type ReflectionEntry = Database["public"]["Tables"]["reflections"]["Row"];

export async function getReflection(date: string): Promise<ReflectionEntry | null> {
  const supabase = createClient();
  const { data: user } = await supabase.auth.getUser();
  if (!user.user) throw new Error("User not authenticated");

  const { data, error } = await supabase
    .from("reflections")
    .select("*")
    .eq("user_id", user.user.id)
    .eq("date", date)
    .maybeSingle();

  if (error) {
    console.error("Error fetching reflection:", error);
    return null;
  }
  return data;
}

export async function upsertReflection(entry: Partial<ReflectionEntry> & { date: string, content: string }): Promise<void> {
  const supabase = createClient();
  const { data: user } = await supabase.auth.getUser();
  if (!user.user) throw new Error("User not authenticated");

  // Check if it already exists to grab the ID if needed for upsert without unique index on date
  // Wait, I did not put UNIQUE(user_id, date) on reflections because user might want multiple reflections?
  // Actually, the prompt says "Store reflections in DB". It's easier if it's one per day, or we just insert new rows.
  // Let's check if we want one per day. I'll just check if one exists for the date, if so update, else insert.
  
  const existing = await getReflection(entry.date);

  if (existing) {
    const { error } = await supabase
      .from("reflections")
      // @ts-ignore Supabase generic inference failure on update
      .update({
        content: entry.content,
        mood: entry.mood || existing.mood,
        focus_duration_minutes: entry.focus_duration_minutes || existing.focus_duration_minutes,
      })
      .eq("id", existing.id);
      
    if (error) throw error;
  } else {
    const { error } = await supabase
      .from("reflections")
      .insert({
        user_id: user.user.id,
        date: entry.date,
        content: entry.content,
        mood: entry.mood,
        focus_duration_minutes: entry.focus_duration_minutes || 0,
      } as any);
      
    if (error) throw error;
  }
}
