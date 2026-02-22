import { createClient } from "@lib/supabase/client";
import type { Database } from "@shared/types/supabase";

export type SunnahLog = Database["public"]["Tables"]["sunnah_logs"]["Row"];

export const SUNNAH_CATEGORIES = [
  { id: "obligatory", title: "Обязательные (Фард)" },
  { id: "recommended", title: "Желательные (Сунна)" },
  { id: "personal", title: "Личные цели" },
];

export const SUNNAH_ACTIONS = [
  { id: "salah", category: "obligatory", label: "Намазы", icon: "🕌", description: "Своевременное выполнение всех 5 фард-намазов.", source: "«Намаз — опора религии» (Аль-Байхаки)" },
  { id: "fasting", category: "obligatory", label: "Пост", icon: "🌙", description: "Держать пост (в Рамадан или восполняемый)." , source: "«Пост — это щит» (Муслим)"},
  { id: "quran_daily", category: "obligatory", label: "Коран", icon: "📖", description: "Ежедневное чтение хотя бы одной страницы Корана.", source: "«Читайте Коран...» (Муслим)" },

  { id: "dua", category: "recommended", label: "Дуа", icon: "🤲", description: "Искреннее дуа за себя, свою семью и Умму.", source: "«Дуа — это поклонение» (Ат-Тирмизи)" },
  { id: "sadaqah", category: "recommended", label: "Садака", icon: "💰", description: "Пожертвование на благое дело или физическая помощь.", source: "«Садака тушит грех» (Ат-Тирмизи)" },
  { id: "istighfar", category: "recommended", label: "Истигфар", icon: "📿", description: "Практика Истигфара (просьбы о прощении у Аллаха).", source: "«Я прошу прощения 100 раз в день» (Муслим)" },
  
  { id: "smile", category: "personal", label: "Улыбка", icon: "😊", description: "Подарить улыбку брату по вере — это тоже садака.", source: "«Улыбка брату — садака» (Ат-Тирмизи)" },
  { id: "family", category: "personal", label: "Родные", icon: "🏠", description: "Поддержать родственные узы, навестить близких.", source: "«Пусть поддержит родственные узы» (Аль-Бухари)" },
  { id: "shukr", category: "personal", label: "Шукр", icon: "🙏", description: "Запись 3 вещей, за которые вы благодарны сегодня.", source: "«Если вы будете благодарны, Я дарую вам больше» (Коран, 14:7)" },
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
