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
  { id: "morning", title: "🌅 Утренние Сунны", translations: { ru: "🌅 Утренние Сунны", en: "🌅 Утренние Сунны (EN)", uz: "🌅 Утренние Сунны (UZ)", ky: "🌅 Утренние Сунны (KY)" } },
  { id: "prayer", title: "🕌 Сунны Намаза", translations: { ru: "🕌 Сунны Намаза", en: "🕌 Сунны Намаза (EN)", uz: "🕌 Сунны Намаза (UZ)", ky: "🕌 Сунны Намаза (KY)" } },
  { id: "night", title: "🌙 Сунны Перед Сном", translations: { ru: "🌙 Сунны Перед Сном", en: "🌙 Сунны Перед Сном (EN)", uz: "🌙 Сунны Перед Сном (UZ)", ky: "🌙 Сунны Перед Сном (KY)" } },
  { id: "character", title: "💎 Сунны Характера", translations: { ru: "💎 Сунны Характера", en: "💎 Сунны Характера (EN)", uz: "💎 Сунны Характера (UZ)", ky: "💎 Сунны Характера (KY)" } },
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
    transliterations: {
      ru: "Ас-сиваку матхаратун лиль-фами мардатун лир-рабби",
      en: "As-siwaku matharatun lil-fami mardatun lir-rabbi",
      uz: "As-sivaku matharatun lil-fami mardatun lir-rabbi",
      ky: "Ас-сиваку матхаратун лиль-фами мардатун лир-рабби"
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
    transliterations: {
      ru: "Аль-хамду лиЛляхи-ллязи ахьяна ба'да ма аматана ва иляйхин-нушур",
      en: "Al-hamdu lillahil-ladhi ahyana ba'da ma amatana wa ilayhin-nushur",
      uz: "Al-hamdu lillahil-ladzi ahyana ba'da ma amatana va ilayhin-nushur",
      ky: "Аль-хамду лиЛляхи-ллязи ахьяна ба'да ма аматана ва иляйхин-нушур"
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
    transliterations: {
      ru: "Рак'ата аль-фаджри хайрун мин ад-дунья ва ма фиха",
      en: "Rak'ata al-fajri khayrun min ad-dunya wa ma fiha",
      uz: "Rak'ata al-fajri khayrun min ad-dunya va ma fiha",
      ky: "Рак'ата аль-фаджри хайрун мин ад-дунья ва ма фиха"
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
    transliterations: {
      ru: "Ман салля иснатей 'ашрата рак'атан фи яумин ва лейлятин буния ляху бихинна байтун филь-джанна",
      en: "Man salla ithnatay 'ashrata rak'atan fi yawmin wa laylatin buniya lahu bihinna baytun fil-jannah",
      uz: "Man salla ithnatay 'ashrata rak'atan fi yavmin va laylatin buniya lahu bihinna baytun fil-jannah",
      ky: "Ман салля иснатей 'ашрата рак'атан фи яумин ва лейлятин буния ляху бихинна байтун филь-джанна"
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
    transliterations: {
      ru: "Ман татаххара фи бейтихи сумма маша иля бейтин мин буютиЛляхи",
      en: "Man tatahhara fi baytihi thumma masha ila baytin min buyutil-lah",
      uz: "Man tatahhara fi baytihi thumma masha ila baytin min buyutil-loh",
      ky: "Ман татаххара фи бейтихи сумма маша иля бейтин мин буютиЛляхи"
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
    transliterations: {
      ru: "СубханаЛлах, валь-хамду лиЛлях, ва Аллаху Акбар",
      en: "SubhanAllah, wal-hamdu lillah, wa Allahu Akbar",
      uz: "SubhanAlloh, val-hamdu lilloh, va Allohu Akbar",
      ky: "СубханаЛлах, валь-хамду лиЛлях, ва Аллаху Акбар"
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
    transliterations: {
      ru: "Иза атейта мадж'ака фатавадда' вуду'ака лис-саля",
      en: "Idha atayta madj'aka fatawadda' wudu'aka lis-salah",
      uz: "Idza atayta madj'aka fatavadda' vudu'aka lis-salah",
      ky: "Иза атейта мадж'ака фатавадда' вуду'ака лис-саля"
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
    transliterations: {
      ru: "Аллаху ля иляха илля хуваль-Хайюль-Кайюм",
      en: "Allahu la ilaha illa huwal-Hayyul-Qayyum",
      uz: "Allohu la ilaha illa huval-Hayyul-Qayyum",
      ky: "Аллаху ля иляха илля хуваль-Хайюль-Кайюм"
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
    transliterations: {
      ru: "Сумма-дтаджи' 'аля шиккикаль-айман",
      en: "Thumma idtadji' 'ala shiqqikal-ayman",
      uz: "Thumma idtadji' 'ala shiqqikal-ayman",
      ky: "Сумма-дтаджи' 'аля шиккикаль-айман"
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
    transliterations: {
      ru: "Табассумука фи важхи ахика ляка садака",
      en: "Tabassumuka fi wajhi akhika laka sadaqah",
      uz: "Tabassumuka fi vajhi axika laka sadaqa",
      ky: "Табассумука фи важхи ахика ляка садака"
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
    transliterations: {
      ru: "'Аджабан ли-амриль-му'мин инна амраху кулляху хайр",
      en: "Ajaban li-amril-mu'min inna amrahu kullahu khayr",
      uz: "Ajaban li-amril-mu'min inna amrahu kullahu xayr",
      ky: "'Аджабан ли-амриль-му'мин инна амраху кулляху хайр"
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
    transliterations: {
      ru: "Ма заля Джибрилю юсини биль-джари хатта зананту аннаху саюваррисуху",
      en: "Ma zala Jibrilu yusini bil-jari hatta zanantu annahu sayuwar-rithuhu",
      uz: "Ma zala Jibrilu yusini bil-jari hatta zanantu annahu sayuvar-rithuhu",
      ky: "Ма заля Джибрилю юсини биль-джари хатта зананту аннаху саюваррисуху"
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
