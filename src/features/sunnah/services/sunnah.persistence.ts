import { createClient } from "@lib/supabase/client";
import type { Database } from "@shared/types/supabase";

export type SunnahLog = Database["public"]["Tables"]["sunnah_logs"]["Row"];

export const SUNNAH_ACTIONS = [
  { id: "dua", label: "Дуа", icon: "🤲", description: "Сделайте искреннее дуа за себя, свою семью и Умму." },
  { id: "sadaqah", label: "Садака", icon: "💰", description: "Пожертвуйте на благое дело или помогите физическим трудом." },
  { id: "smile", label: "Улыбка", icon: "😊", description: "Подарите улыбку своему брату по вере — это тоже садака." },
  { id: "kind_word", label: "Доброе слово", icon: "💬", description: "Скажите доброе приятное слово окружающим." },
  { id: "family", label: "Родные", icon: "🏠", description: "Поддержите родственные узы, навестите или позвоните близким." },
  { id: "help", label: "Помощь", icon: "🤝", description: "Окажите помощь ближнему в нужном деле или хорошим советом." },
  { id: "niyyah", label: "Ният", icon: "✨", description: "Очистите свое намерение в делах ради довольства Всевышнего." },
  { id: "shukr", label: "Благодарность", icon: "🙏", description: "Искренне поблагодарите Создателя за все блага." },
  { id: "istighfar", label: "Истигфар", icon: "📿", description: "Искренне попросите прощения за свои ошибки и грехи." },
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
