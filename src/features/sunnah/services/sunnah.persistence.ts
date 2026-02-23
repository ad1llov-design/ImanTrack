import { createClient } from "@lib/supabase/client";

export interface SunnahLog {
  id: string;
  user_id: string;
  date: string;
  action_id: string;
  is_completed: boolean;
  created_at: string;
}

export const SUNNAH_CATEGORIES = [
  { id: "morning", title: "🌅 Утренние Сунны" },
  { id: "prayer", title: "🕌 Сунны Намаза" },
  { id: "night", title: "🌙 Сунны Перед Сном" },
  { id: "character", title: "💎 Сунны Характера" },
];

export const SUNNAH_ACTIONS = [
  // Morning Sunnah
  { id: "miswak", category: "morning", label: "Мисвак", icon: "🪥", description: "Использование мисвака при пробуждении и перед намазом.", source: "«Мисвак очищает рот и радует Господа»", narrator: "Аиша (р.а.)", collection: "Ан-Насаи" },
  { id: "morning_dua", category: "morning", label: "Утренний ду'а", icon: "🤲", description: "Чтение дуа при пробуждении: «Альхамдулиллях...»", source: "«Хвала Аллаху, Который оживил нас после того, как умертвил»", narrator: "Хузайфа (р.а.)", collection: "Аль-Бухари" },
  { id: "fajr_sunnah", category: "morning", label: "Два ракаата Фаджр", icon: "🕋", description: "Два ракаата сунны перед Фаджром — лучше мира и всего в нём.", source: "«Два ракаата перед Фаджром лучше, чем мир и всё, что в нём»", narrator: "Аиша (р.а.)", collection: "Муслим" },

  // Prayer Sunnah
  { id: "rawatib", category: "prayer", label: "Раватиб", icon: "📿", description: "12 ракаатов суннан-раватиб: 2 перед Фаджром, 4+2 Зухр, 2 Магриб, 2 Иша.", source: "«Кто выполняет 12 ракаатов в день... Аллах построит ему дом в Раю»", narrator: "Умм Хабиба (р.а.)", collection: "Муслим" },
  { id: "mosque", category: "prayer", label: "Идти в мечеть", icon: "🕌", description: "Идти в мечеть пешком для совершения джамаат-намаза.", source: "«Каждый шаг в мечеть стирает грех и поднимает степень»", narrator: "Абу Хурайра (р.а.)", collection: "Муслим" },
  { id: "post_prayer_dhikr", category: "prayer", label: "Зикр после намаза", icon: "✨", description: "СубханАллах 33, Альхамдулиллях 33, Аллаху Акбар 34 после каждого намаза.", source: "«Кто славит Аллаха после каждого намаза 33 раза...»", narrator: "Абу Хурайра (р.а.)", collection: "Муслим" },

  // Night Sunnah
  { id: "wudu_sleep", category: "night", label: "Вуду перед сном", icon: "💧", description: "Совершить омовение (вуду) перед сном.", source: "«Когда ты ложишься спать, соверши вуду»", narrator: "Аль-Бара ибн Азиб (р.а.)", collection: "Аль-Бухари" },
  { id: "ayat_kursi", category: "night", label: "Аят аль-Курси", icon: "📖", description: "Чтение Аят аль-Курси (2:255) перед сном для защиты.", source: "«Кто читает Аят аль-Курси перед сном... его охраняет ангел»", narrator: "Абу Хурайра (р.а.)", collection: "Аль-Бухари" },
  { id: "right_side", category: "night", label: "Спать на правом боку", icon: "🛏️", description: "Ложиться на правый бок, подложив руку под щеку.", source: "«Когда ложишься — ложись на правый бок»", narrator: "Аль-Бара ибн Азиб (р.а.)", collection: "Аль-Бухари" },

  // Character Sunnah
  { id: "smile", category: "character", label: "Улыбка", icon: "😊", description: "Дарить улыбку брату по вере — это тоже садака.", source: "«Улыбка в лицо брату — садака»", narrator: "Абу Зарр (р.а.)", collection: "Ат-Тирмизи" },
  { id: "patience", category: "character", label: "Сабр", icon: "🙏", description: "Проявлять терпение при трудностях и невзгодах.", source: "«Как удивительно положение верующего... всё для него — благо»", narrator: "Сухайб (р.а.)", collection: "Муслим" },
  { id: "kindness", category: "character", label: "Доброта к соседям", icon: "🏠", description: "Проявлять доброту и уважение к своим соседям.", source: "«Джибриль не переставал мне завещать хорошее отношение к соседу»", narrator: "Аиша (р.а.)", collection: "Аль-Бухари" },
];

/**
 * Получить все логи сунн за указанную дату
 */
export async function getSunnahLogs(date: string): Promise<SunnahLog[]> {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from("sunnah_logs")
    .select("*")
    .eq("user_id", user.id)
    .eq("date", date);

  if (error) {
    console.error("Error fetching sunnah logs:", error);
    return [];
  }
  return (data as SunnahLog[]) || [];
}

/**
 * Toggle сунны: если is_completed = true → upsert с is_completed=true
 * если is_completed = false → upsert с is_completed=false (или delete)
 */
export async function toggleSunnahAction(
  date: string,
  actionId: string,
  isCompleted: boolean,
): Promise<void> {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("User not authenticated");

  if (isCompleted) {
    // Insert or update to completed
    const payload = {
      user_id: user.id,
      date,
      action_id: actionId,
      is_completed: true,
    };
    const { error } = await (supabase.from("sunnah_logs") as ReturnType<typeof supabase.from>)
      .upsert(
        payload as never,
        { onConflict: "user_id,date,action_id" },
      );

    if (error) {
      console.error("Error inserting sunnah log:", error);
      throw error;
    }
  } else {
    // Delete the record
    const { error } = await supabase
      .from("sunnah_logs")
      .delete()
      .eq("user_id", user.id)
      .eq("date", date)
      .eq("action_id", actionId);

    if (error) {
      console.error("Error deleting sunnah log:", error);
      throw error;
    }
  }
}
