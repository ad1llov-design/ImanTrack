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
  { 
    id: "miswak", 
    category: "morning", 
    icon: "🪥", 
    arabic: "السِّوَاكُ مَطْهَرَةٌ لِلْفَمِ مَرْضَاةٌ لِلرَّبِّ",
    translations: {
      ru: { label: "Мисвак", description: "Использование мисвака при пробуждении и перед намазом." },
      en: { label: "Miswak", description: "Using miswak upon waking up and before prayer." },
      uz: { label: "Misvok", description: "Uyg'onganda va namozdan oldin misvok ishlatish." },
      ky: { label: "Мисвак", description: "Ойгонгондо жана намаздын алдында мисвак колдонуу." }
    },
    source: "Ан-Насаи" 
  },
  { 
    id: "morning_dua", 
    category: "morning", 
    icon: "🤲", 
    arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ",
    translations: {
      ru: { label: "Утренний ду'а", description: "Чтение дуа при пробуждении." },
      en: { label: "Morning Dua", description: "Reciting dua upon waking up." },
      uz: { label: "Tonggi duo", description: "Uyg'onganda duo qilish." },
      ky: { label: "Эртең мененки дуба", description: "Ойгонгондо дуба кылуу." }
    },
    source: "Аль-Бухари" 
  },
  { 
    id: "fajr_sunnah", 
    category: "morning", 
    icon: "🕋", 
    arabic: "رَكْعَتَا الْفَجْرِ خَيْرٌ مِنَ الدُّنْيَا وَمَا فِيهَا",
    translations: {
      ru: { label: "Два ракаата Фаджр", description: "Два ракаата сунны перед Фаджром." },
      en: { label: "Two Rakaats Fajr", description: "Two rakaats of sunnah before Fajr prayer." },
      uz: { label: "Ikki rakat Bomdod", description: "Bomdod namozidan oldin ikki rakat sunnat." },
      ky: { label: "Эки ирекет Багымдат", description: "Багымдат намазынын алдында эки ирекет сүннөт." }
    },
    source: "Муслим" 
  },

  // Prayer Sunnah
  { 
    id: "rawatib", 
    category: "prayer", 
    icon: "📿", 
    arabic: "مَنْ صَلَّى اثْنَتَيْ عَشْرَةَ رَكْعَةً فِي يَوْمٍ وَلَيْلَةٍ بُنِيَ لَهُ بِهِنَّ بَيْتٌ فِي الْجَنَّةِ",
    translations: {
      ru: { label: "Раватиб", description: "12 ракаатов суннан-раватиб в день." },
      en: { label: "Rawatib", description: "12 rakaats of sunnah rawatib per day." },
      uz: { label: "Ravotib", description: "Kunda 12 rakat sunnat ravotib." },
      ky: { label: "Раватиб", description: "Күнүнө 12 ирекет сүннөт раватиб." }
    },
    source: "Муслим" 
  },
  { 
    id: "mosque", 
    category: "prayer", 
    icon: "🕌", 
    arabic: "مَنْ تَطَهَّرَ فِي بَيْتِهِ ثُمَّ مَشَى إِلَى بَيْتٍ مِنْ بُيُوتِ اللَّهِِ",
    translations: {
      ru: { label: "Идти в мечеть", description: "Идти в мечеть пешком для совершения джамаат-намаза." },
      en: { label: "Walk to Mosque", description: "Walking to the mosque for congregational prayer." },
      uz: { label: "Masjidga borish", description: "Jamoat namozi uchun masjidga piyoda borish." },
      ky: { label: "Мечитке баруу", description: "Жамаат намазы үчүн мечитке жөө баруу." }
    },
    source: "Муслим" 
  },
  { 
    id: "post_prayer_dhikr", 
    category: "prayer", 
    icon: "✨", 
    arabic: "سُبْحَانَ اللَّهِ، وَالْحَمْدُ لِلَّهِ، وَاللَّهُ أَكْبَرُ",
    translations: {
      ru: { label: "Зикр после намаза", description: "СубханАллах 33, Альхамдулиллях 33, Аллаху Акбар 34." },
      en: { label: "Dhikr after prayer", description: "SubhanAllah 33, Alhamdulillah 33, Allahu Akbar 34." },
      uz: { label: "Namozdan keyingi zikr", description: "SubhanAlloh 33, Alhamdulilloh 33, Allohu Akbar 34." },
      ky: { label: "Намаздан кийинки зикир", description: "Субханаллах 33, Альхамдулиллах 33, Аллаху Акбар 34." }
    },
    source: "Муслим" 
  },

  // Night Sunnah
  { 
    id: "wudu_sleep", 
    category: "night", 
    icon: "💧", 
    arabic: "إِذَا أَتَيْتَ مَضْجَعَكَ فَتَوَضَّأْ وُضُوءَكَ لِلصَّلَاةِ",
    translations: {
      ru: { label: "Вуду перед сном", description: "Совершить омовение (вуду) перед сном." },
      en: { label: "Wudu before sleep", description: "Perform ablution (wudu) before sleeping." },
      uz: { label: "Uxlashdan oldin tahorat", description: "Uxlashdan oldin tahorat olish." },
      ky: { label: "Уктаар алдында даарат", description: "Уктаар алдында даарат алуу." }
    },
    source: "Аль-Бухари" 
  },
  { 
    id: "ayat_kursi", 
    category: "night", 
    icon: "📖", 
    arabic: "اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ",
    translations: {
      ru: { label: "Аят аль-Курси", description: "Чтение Аят аль-Курси (2:255) перед сном для защиты." },
      en: { label: "Ayatul Kursi", description: "Reciting Ayatul Kursi before sleep for protection." },
      uz: { label: "Oyatal Kursi", description: "Uxlashdan oldin himoya uchun Oyatal Kursi o'qish." },
      ky: { label: "Аят аль-Курси", description: "Уктаар алдында коргонуу үчүн Аят аль-Курси окуу." }
    },
    source: "Аль-Бухари" 
  },
  { 
    id: "right_side", 
    category: "night", 
    icon: "🛏️", 
    arabic: "ثُمَّ اضْطَجِعْ عَلَى شِقِّكَ الْأَيْمَنِ",
    translations: {
      ru: { label: "Спать на правом боку", description: "Ложиться на правый бок, подложив руку под щеку." },
      en: { label: "Sleep on right side", description: "Lie down on the right side." },
      uz: { label: "O'ng tomonda uxlash", description: "O'ng tomonboshlab uxlash." },
      ky: { label: "Оң жамбаштап уктоо", description: "Оң жамбаштап жатуу." }
    },
    source: "Аль-Бухари" 
  },

  // Character Sunnah
  { 
    id: "smile", 
    category: "character", 
    icon: "😊", 
    arabic: "تَبَسُّمُكَ فِي وَجْهِ أَخِيكَ لَكَ صَدَقَةٌ",
    translations: {
      ru: { label: "Улыбка", description: "Дарить улыбку брату по вере — это тоже садака." },
      en: { label: "Smile", description: "Smiling at your brother is an act of charity." },
      uz: { label: "Tabassum", description: "Birodaringizga tabassum ulashishingiz sadaqadir." },
      ky: { label: "Жылмаюу", description: "Бир тууганыңа жылмаюу — бул садака." }
    },
    source: "Ат-Тирмизи" 
  },
  { 
    id: "patience", 
    category: "character", 
    icon: "🙏", 
    arabic: "عَجَبًا لِأَمْرِ الْمُؤْمِنِ إِنَّ أَمْرَهُ كُلَّهُ خَيْرٌ",
    translations: {
      ru: { label: "Сабр", description: "Проявлять терпение при трудностях и невзгодах." },
      en: { label: "Patience", description: "Show patience during difficulties." },
      uz: { label: "Sabr", description: "Qiyinchiliklarda sabr qilish." },
      ky: { label: "Сабыр", description: "Кыйынчылыктарда сабырдуулук көрсөтүү." }
    },
    source: "Муслим" 
  },
  { 
    id: "kindness", 
    category: "character", 
    icon: "🏠", 
    arabic: "مَا زَالَ جِبْرِيلُ يُوصِينِي بِالْجَارِ حَتَّى ظَنَنْتُ أَنَّهُ سَيُوَرِّثُهُ",
    translations: {
      ru: { label: "Доброта к соседям", description: "Проявлять доброту и уважение к своим соседям." },
      en: { label: "Kindness to neighbors", description: "Show kindness and respect to neighbors." },
      uz: { label: "Qo'shnilarga yaxshilik", description: "Qo'shnilarga yaxshilik va hurmat ko'rsatish." },
      ky: { label: "Кошуналарга жакшылык", description: "Кошуналарга жакшы мамиле кылуу." }
    },
    source: "Аль-Бухари" 
  },
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
      console.error("sunnah_logs upsert FAILED:", {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint,
        payload: { user_id: user.id, date, action_id: actionId },
      });
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
