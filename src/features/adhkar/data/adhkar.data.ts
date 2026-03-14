/**
 * @module features/adhkar/data
 *
 * Статические данные: категории, зикры и мотивационные сообщения.
 * Все тексты на арабском с транслитерацией и переводом на русский.
 */

import type {
  AdhkarCategory,
  CategoryInfo,
  Dhikr,
  MotivationMessage,
} from "../types/adhkar.types";

/* ── Categories ─────────────────────────────────────────────────────── */

export const ADHKAR_CATEGORIES: CategoryInfo[] = [
  {
    id: "morning",
    nameRu: "Утренние азкары", translations: { ru: "Утренние азкары", en: "Morning Azkars", uz: "Tong Azkars", ky: "Таң маанай" },
    nameAr: "أذكار الصباح",
    icon: "sunrise",
    color: "gold",
    description: "Читаются после утреннего намаза до восхода солнца",
    descriptionTranslations: { ru: "Читаются после утреннего намаза до восхода солнца", en: "Recited after the morning prayer until sunrise", uz: "Quyosh chiqqunga qadar bomdod namozidan keyin o'qiladi", ky: "Багымдат намазынан кийин күн чыкканга чейин окулат" },
  },
  {
    id: "evening",
    nameRu: "Вечерние азкары", translations: { ru: "Вечерние азкары", en: "Evening Azkars", uz: "Kechqurun Azkarlar", ky: "Кечки Азкарлар" },
    nameAr: "أذكار المساء",
    icon: "moon",
    color: "primary",
    description: "Читаются после намаза Аср до заката",
    descriptionTranslations: { ru: "Читаются после намаза Аср до заката", en: "Recited after Asr prayer until sunset", uz: "Asr namozidan keyin quyosh botguncha o'qiladi", ky: "Аср намазынан кийин күн батканга чейин окулат" },
  },
  {
    id: "after_salah",
    nameRu: "После намаза", translations: { ru: "После намаза", en: "After prayer", uz: "Namozdan keyin", ky: "Намаздан кийин" },
    nameAr: "أذكار بعد الصلاة",
    icon: "sparkles",
    color: "primary",
    description: "Зикры после каждого обязательного намаза",
    descriptionTranslations: { ru: "Зикры после каждого обязательного намаза", en: "Dhikrs after every obligatory prayer", uz: "Har bir farz namozidan keyin zikrlar", ky: "Ар бир парз намаздан кийинки зикирлер" },
  },
  {
    id: "general",
    nameRu: "Общие дуа", translations: { ru: "Общие дуа", en: "General duas", uz: "Umumiy duolar", ky: "Жалпы дуалар" },
    nameAr: "أدعية عامة",
    icon: "heart",
    color: "secondary",
    description: "Дуа на разные случаи жизни",
    descriptionTranslations: { ru: "Дуа на разные случаи жизни", en: "Duas for various life situations", uz: "Turli hayotiy vaziyatlar uchun duolar", ky: "Ар кандай турмуштук кырдаалдарга дуалар" },
  },
  {
    id: "sleep",
    nameRu: "Перед сном", translations: { ru: "Перед сном", en: "Before bed", uz: "Yotishdan oldin", ky: "Жатар алдында" },
    nameAr: "أذكار النوم",
    icon: "moon-star",
    color: "neutral",
    description: "Зикры и дуа перед сном",
    descriptionTranslations: { ru: "Зикры и дуа перед сном", en: "Dhikrs and duas before bed", uz: "Yotishdan oldin zikr va duolar", ky: "Жатар алдында зикирлер жана дуалар" },
  },
  {
    id: "wake_up",
    nameRu: "При пробуждении", translations: { ru: "При пробуждении", en: "Upon awakening", uz: "Uyg'onganida", ky: "Ойгонгондо" },
    nameAr: "أذكار الاستيقاظ",
    icon: "sun",
    color: "gold",
    description: "Дуа при пробуждении ото сна",
    descriptionTranslations: { ru: "Дуа при пробуждении ото сна", en: "Dua upon waking from sleep", uz: "Uyqudan uyg'onganda o'qiladigan duo", ky: "Уйкудан ойгонгондо окула турган дуба" },
  },
];

/* ── Dhikrs ─────────────────────────────────────────────────────────── */

export const ADHKAR_LIST: Dhikr[] = [
  // ── Morning ──────────────
  {
    id: "morning-01",
    categoryId: "morning",
    arabic: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
    transliteration: "Асбахна ва асбахаль-мульку лиЛлях, валь-хамду лиЛлях, ля иляха илляЛлаху вахдаху ля шарика лях, лахуль-мульку ва лахуль-хамду ва хува 'аля кулли шайин кадир",
    translation: "Мы встретили утро, и вся власть принадлежит Аллаху. Хвала Аллаху. Нет божества, кроме Аллаха Единого, у Которого нет сотоварища. Ему принадлежит власть и хвала, и Он над всем властен.",
    translations: { ru: "Мы встретили утро, и вся власть принадлежит Аллаху. Хвала Аллаху. Нет божества, кроме Аллаха Единого, у Которого нет сотоварища. Ему принадлежит власть и хвала, и Он над всем властен.", en: "We have greeted the morning, and all power belongs to Allah. Praise be to Allah. There is no deity except Allah alone, Who has no partner. To Him belongs the power and the praise, and He is sovereign over everything.", uz: "Tongni qarshi oldik, barcha kuch Allohnikidir. Allohga hamdlar bo'lsin. Hech bir sherigi bo'lmagan yolg'iz Allohdan o'zga iloh yo'q. Qudrat va hamd Unikidir va U har bir narsaga hukmrondir.", ky: "Таңга салам бердик, бардык күч Аллага таандык. Аллахка мактоолор болсун. Жалгыз Аллахтан башка кудай жок, шериги жок. Күч жана мактоо Ага таандык жана Ал бардык нерсеге өкүмдар." },
    reference: "Абу Дауд 4/317",
    targetCount: 1,
    virtue: "Защита в этот день",
    virtueTranslations: { ru: "Защита в этот день", en: "Protection on this day", uz: "Ushbu kunda himoya", ky: "Бул күнү коргоо" },
  },
  {
    id: "morning-02",
    categoryId: "morning",
    arabic: "اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ وَإِلَيْكَ النُّشُورُ",
    transliteration: "Аллахумма бика асбахна, ва бика амсайна, ва бика нахья, ва бика намуту ва иляйкан-нушур",
    translation: "О Аллах, с Тобой мы встретили утро, и с Тобой встретим вечер, и с Тобой живём, и с Тобой умрём, и к Тебе воскрешение.",
    translations: { ru: "О Аллах, с Тобой мы встретили утро, и с Тобой встретим вечер, и с Тобой живём, и с Тобой умрём, и к Тебе воскрешение.", en: "O Allah, with You we have met the morning, and with You we will meet the evening, and with You we live, and with You we will die, and to You the resurrection.", uz: "Allohim, tongni Sen bilan uchratdik, shomni Sen bilan uchratamiz, Sen bilan yashaymiz, Sen bilan o'lamiz va qayta tirilish Sengadir.", ky: "Оо Аллахым, таңды Сени менен жолуктурдук, кечти Сен менен жолугабыз, Сен менен жашайбыз, Сен менен өлөбүз жана кайра тирилүү Сага." },
    reference: "Ат-Тирмизи 5/466",
    targetCount: 1,
  },
  {
    id: "morning-03",
    categoryId: "morning",
    arabic: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ",
    transliteration: "СубханАллахи ва бихамдих",
    translation: "Преславен Аллах и хвала Ему",
    translations: { ru: "Преславен Аллах и хвала Ему", en: "Glory be to Allah and praise be to Him", uz: "Alloh taologa hamdu sanolar bo'lsin", ky: "Аллах Таалага мактоолор жана мактоолор болсун" },
    reference: "Муслим 4/2071",
    targetCount: 100,
    virtue: "Будут прощены грехи, даже если их столько, сколько морской пены",
    virtueTranslations: { ru: "Будут прощены грехи, даже если их столько, сколько морской пены", en: "Sins will be forgiven, even if there are as many of them as sea foam", uz: "Gunohlar dengiz ko'pigidek ko'p bo'lsa ham kechiriladi", ky: "Күнөөлөр деңиз көбүгүндөй көп болсо да кечирилет" },
  },
  {
    id: "morning-04",
    categoryId: "morning",
    arabic: "لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
    transliteration: "Ля иляха илляЛлаху вахдаху ля шарика лях, лахуль-мульку ва лахуль-хамду ва хува 'аля кулли шайин кадир",
    translation: "Нет божества, кроме Аллаха Единого, у Которого нет сотоварища. Ему принадлежит власть и хвала, и Он над всем властен.",
    reference: "Аль-Бухари 4/95, Муслим 4/2071",
    targetCount: 10,
    virtue: "Как будто освободил 4 раба из потомков Исмаила, и будут записаны 10 хороших дел, стёрты 10 плохих",
  },
  {
    id: "morning-05",
    categoryId: "morning",
    arabic: "أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ",
    transliteration: "АстагфируЛлаха ва атубу илейхи",
    translation: "Прошу прощения у Аллаха и каюсь перед Ним",
    reference: "Аль-Бухари, Фатх аль-Бари 11/101",
    targetCount: 100,
    virtue: "Пророк ﷺ делал истигфар 100 раз в день",
  },

  // ── Evening ──────────────
  {
    id: "evening-01",
    categoryId: "evening",
    arabic: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
    transliteration: "Амсайна ва амсаль-мульку лиЛлях, валь-хамду лиЛлях, ля иляха илляЛлаху вахдаху ля шарика лях, лахуль-мульку ва лахуль-хамду ва хува 'аля кулли шайин кадир",
    translation: "Мы встретили вечер, и вся власть принадлежит Аллаху. Хвала Аллаху. Нет божества, кроме Аллаха Единого, у Которого нет сотоварища.",
    translations: { ru: "Мы встретили вечер, и вся власть принадлежит Аллаху. Хвала Аллаху. Нет божества, кроме Аллаха Единого, у Которого нет сотоварища.", en: "We have met the evening, and all power belongs to Allah. Praise be to Allah. There is no deity except Allah alone, Who has no partner.", uz: "Biz oqshomni uchratdik, barcha kuch Allohnikidir. Allohga hamdlar bo'lsin. Hech bir sherigi bo'lmagan yolg'iz Allohdan o'zga iloh yo'q.", ky: "Кечке жолуктук, бардык күч Аллага таандык. Аллахка мактоолор болсун. Жалгыз Аллахтан башка кудай жок, шериги жок." },
    reference: "Абу Дауд 4/317",
    targetCount: 1,
  },
  {
    id: "evening-02",
    categoryId: "evening",
    arabic: "اللَّهُمَّ بِكَ أَمْسَيْنَا، وَبِكَ أَصْبَحْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ وَإِلَيْكَ الْمَصِيرُ",
    transliteration: "Аллахумма бика амсайна, ва бика асбахна, ва бика нахья, ва бика намуту ва иляйкаль-масыр",
    translation: "О Аллах, с Тобой мы встретили вечер, и с Тобой встретим утро, и с Тобой живём, и с Тобой умрём, и к Тебе возвращение.",
    translations: { ru: "О Аллах, с Тобой мы встретили вечер, и с Тобой встретим утро, и с Тобой живём, и с Тобой умрём, и к Тебе возвращение.", en: "O Allah, with You we have met the evening, and with You we will meet the morning, and with You we live, and with You we will die, and to You we will return.", uz: "Allohim, sen bilan shomni uchratdik, tongni Sen bilan uchratamiz, Sen bilan yashaymiz, Sen bilan o'lamiz va Senga qaytguvchimiz.", ky: "Оо Аллахым, кечти Сен менен жолуктурдук, таңды Сен менен жолуктурдук, Сен менен жашайбыз, Сен менен өлөбүз жана Сага кайтабыз." },
    reference: "Ат-Тирмизи 5/466",
    targetCount: 1,
  },
  {
    id: "evening-03",
    categoryId: "evening",
    arabic: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ",
    transliteration: "СубханАллахи ва бихамдих",
    translation: "Преславен Аллах и хвала Ему",
    translations: { ru: "Преславен Аллах и хвала Ему", en: "Glory be to Allah and praise be to Him", uz: "Alloh taologa hamdu sanolar bo'lsin", ky: "Аллах Таалага мактоолор жана мактоолор болсун" },
    reference: "Муслим 4/2071",
    targetCount: 100,
    virtue: "Будут прощены грехи, даже если их столько, сколько морской пены",
    virtueTranslations: { ru: "Будут прощены грехи, даже если их столько, сколько морской пены", en: "Sins will be forgiven, even if there are as many of them as sea foam", uz: "Gunohlar dengiz ko'pigidek ko'p bo'lsa ham kechiriladi", ky: "Күнөөлөр деңиз көбүгүндөй көп болсо да кечирилет" },
  },

  // ── After Salah ──────────
  {
    id: "salah-01",
    categoryId: "after_salah",
    arabic: "أَسْتَغْفِرُ اللَّه",
    transliteration: "АстагфируЛлах",
    translation: "Прошу у Аллаха прощения",
    translations: { ru: "Прошу у Аллаха прощения", en: "I ask Allah for forgiveness", uz: "Allohdan kechirim so'rayman", ky: "Алладан кечирим сурайм" },
    reference: "Муслим 1/414",
    targetCount: 3,
  },
  {
    id: "salah-02",
    categoryId: "after_salah",
    arabic: "سُبْحَانَ اللَّهِ",
    transliteration: "СубханАллах",
    translation: "Преславен Аллах",
    reference: "Муслим 1/418, аль-Бухари",
    targetCount: 33,
    virtue: "Тасбих — часть поминания после намаза",
  },
  {
    id: "salah-03",
    categoryId: "after_salah",
    arabic: "الْحَمْدُ لِلَّهِ",
    transliteration: "Аль-хамду лиЛлях",
    translation: "Хвала Аллаху",
    reference: "Муслим 1/418, аль-Бухари",
    targetCount: 33,
  },
  {
    id: "salah-04",
    categoryId: "after_salah",
    arabic: "اللَّهُ أَكْبَرُ",
    transliteration: "Аллаху Акбар",
    translation: "Аллах Велик",
    reference: "Муслим 1/418, аль-Бухари",
    targetCount: 33,
  },
  {
    id: "salah-05",
    categoryId: "after_salah",
    arabic: "لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
    transliteration: "Ля иляха илляЛлаху вахдаху ля шарика лях, лахуль-мульку ва лахуль-хамду ва хува 'аля кулли шайин кадир",
    translation: "Нет божества, кроме Аллаха Единого, без сотоварища. Ему власть и хвала, и Он над всём властен.",
    translations: { ru: "Нет божества, кроме Аллаха Единого, без сотоварища. Ему власть и хвала, и Он над всём властен.", en: "There is no deity but Allah alone, without a partner. To Him is power and praise, and He has power over everything.", uz: "Allohdan o'zga iloh yo'q yolg'iz, sherigi yo'q. Unga kuch va hamd bor va U har bir narsaga qodirdir.", ky: "Жалгыз Аллахтан башка илах жок, шериги жок. Күч жана мактоо Ага гана таандык жана Ал бардык нерсеге кудуреттүү." },
    reference: "Муслим 1/418",
    targetCount: 1,
    virtue: "Завершение 100 после тасбих, тахмид и такбир",
    virtueTranslations: { ru: "Завершение 100 после тасбих, тахмид и такбир", en: "Completing 100 after tasbih, tahmid and takbir", uz: "Tasbih, tahmid va takbirdan keyin 100 ta tamomlash", ky: "Тасбих, тахмид жана такбирден кийин 100 толуктоо" },
  },

  // ── General ──────────────
  {
    id: "general-01",
    categoryId: "general",
    arabic: "سُبْحَانَ اللَّهِ",
    transliteration: "СубханАллах",
    translation: "Преславен Аллах",
    translations: { ru: "Преславен Аллах", en: "Glory be to Allah", uz: "Allohga hamdlar bo'lsin", ky: "Аллах ыраазы болсун" },
    reference: "Муслим",
    targetCount: 33,
  },
  {
    id: "general-02",
    categoryId: "general",
    arabic: "الْحَمْدُ لِلَّهِ",
    transliteration: "Аль-хамду лиЛлях",
    translation: "Хвала Аллаху",
    translations: { ru: "Хвала Аллаху", en: "Praise be to Allah", uz: "Allohga hamdlar bo'lsin", ky: "Аллахка мактоолор болсун" },
    reference: "Муслим",
    targetCount: 33,
  },
  {
    id: "general-03",
    categoryId: "general",
    arabic: "اللَّهُ أَكْبَرُ",
    transliteration: "Аллаху Акбар",
    translation: "Аллах Велик",
    translations: { ru: "Аллах Велик", en: "Allah is Great", uz: "Alloh buyukdir", ky: "Аллах Улуу" },
    reference: "Муслим",
    targetCount: 34,
  },
  {
    id: "general-04",
    categoryId: "general",
    arabic: "لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ",
    transliteration: "Ля хауля ва ля куввата илля биЛлях",
    translation: "Нет мощи и силы ни у кого, кроме Аллаха",
    reference: "Аль-Бухари 11/213, Муслим 4/2076",
    targetCount: 100,
    virtue: "Сокровище из сокровищ Рая",
  },

  // ── Sleep ────────────────
  {
    id: "sleep-01",
    categoryId: "sleep",
    arabic: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا",
    transliteration: "БисмикаЛлахумма амуту ва ахья",
    translation: "С именем Твоим, о Аллах, я умираю и оживаю",
    translations: { ru: "С именем Твоим, о Аллах, я умираю и оживаю", en: "In Your name, O Allah, I die and come to life", uz: "Sening noming bilan, ey Alloh, men o'lib tirilaman", ky: "Сенин ысымың менен, Оо, Аллахым, мен өлөм жана тирилем" },
    reference: "Аль-Бухари 11/113",
    targetCount: 1,
  },
  {
    id: "sleep-02",
    categoryId: "sleep",
    arabic: "سُبْحَانَ اللَّهِ",
    transliteration: "СубханАллах",
    translation: "Преславен Аллах",
    reference: "Аль-Бухари, Муслим",
    targetCount: 33,
    virtue: "Из напутствия Пророка ﷺ Фатиме и Али رضي الله عنهما",
  },
  {
    id: "sleep-03",
    categoryId: "sleep",
    arabic: "الْحَمْدُ لِلَّهِ",
    transliteration: "Аль-хамду лиЛлях",
    translation: "Хвала Аллаху",
    reference: "Аль-Бухари, Муслим",
    targetCount: 33,
  },
  {
    id: "sleep-04",
    categoryId: "sleep",
    arabic: "اللَّهُ أَكْبَرُ",
    transliteration: "Аллаху Акбар",
    translation: "Аллах Велик",
    reference: "Аль-Бухари, Муслим",
    targetCount: 34,
  },

  // ── Wake Up ──────────────
  {
    id: "wakeup-01",
    categoryId: "wake_up",
    arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ",
    transliteration: "Аль-хамду лиЛляхи аллязи ахьяна ба'да ма аматана ва иляйхин-нушур",
    translation: "Хвала Аллаху, Который оживил нас после того, как умертвил, и к Нему воскрешение.",
    reference: "Аль-Бухари, Фатх аль-Бари 11/113",
    targetCount: 1,
  },
  {
    id: "wakeup-02",
    categoryId: "wake_up",
    arabic: "لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، سُبْحَانَ اللَّهِ، وَالْحَمْدُ لِلَّهِ، وَلَا إِلَهَ إِلَّا اللَّهُ، وَاللَّهُ أَكْبَرُ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ الْعَلِيِّ الْعَظِيمِ",
    transliteration: "Ля иляха илляЛлаху вахдаху ля шарика лях, лахуль-мульку ва лахуль-хамду ва хува 'аля кулли шайин кадир. СубханАллах, валь-хамду лиЛлях, ва ля иляха илляЛлах, ваЛлаху акбар, ва ля хауля ва ля куввата илля биЛляхиль-'алиййиль-'азым",
    translation: "Нет божества, кроме Аллаха Единого, без сотоварища. Ему власть и хвала, и Он над всём властен. Преславен Аллах, хвала Аллаху, нет божества кроме Аллаха, Аллах Велик, нет мощи и силы ни у кого, кроме Аллаха Всевышнего, Великого.",
    reference: "Аль-Бухари, Фатх аль-Бари 3/39",
    targetCount: 1,
    virtue: "Кто скажет это при пробуждении ночью и попросит дуа — его дуа будет принято",
  },
];

/* ── Helpers ────────────────────────────────────────────────────────── */

export function getDhikrsByCategory(categoryId: AdhkarCategory): Dhikr[] {
  return ADHKAR_LIST.filter((d) => d.categoryId === categoryId);
}

export function getCategoryInfo(categoryId: AdhkarCategory): CategoryInfo | undefined {
  return ADHKAR_CATEGORIES.find((c) => c.id === categoryId);
}

export function getTotalCountForCategory(categoryId: AdhkarCategory): number {
  return getDhikrsByCategory(categoryId).reduce((sum, d) => sum + d.targetCount, 0);
}

/* ── Motivation ─────────────────────────────────────────────────────── */

export const MOTIVATION_MESSAGES: MotivationMessage[] = [
  {
    arabic: "اذْكُرُونِي أَذْكُرْكُمْ",
    translation: "Поминайте Меня, и Я буду помнить вас (2:152)",
    threshold: 0,
  },
  {
    arabic: "ما شاء الله",
    translation: "Отличное начало! Продолжайте в том же духе",
    threshold: 10,
  },
  {
    arabic: "بارك الله فيك",
    translation: "Да благословит вас Аллах! Половина пройдена!",
    threshold: 50,
  },
  {
    arabic: "تبارك الله",
    translation: "Почти готово! Ещё немного, и награда ваша",
    threshold: 80,
  },
  {
    arabic: "الحمد لله",
    translation: "Хвала Аллаху! Вы завершили этот зикр! 🌟",
    threshold: 100,
  },
];

export function getMotivationMessage(percentage: number): MotivationMessage {
  // Находим последнее сообщение, чей threshold <= percentage
  const sorted = [...MOTIVATION_MESSAGES].sort((a, b) => b.threshold - a.threshold);
  const found = sorted.find((m) => m.threshold <= percentage);
  return (found || MOTIVATION_MESSAGES[0]) as MotivationMessage;
}
