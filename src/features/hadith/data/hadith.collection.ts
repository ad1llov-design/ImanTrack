/**
 * @module features/hadith/data/hadith.collection
 *
 * Курируемая коллекция хадисов для ежедневной ротации.
 * Включает 40 хадисов ан-Навави + хадисы из Бухари и Муслима.
 *
 * Каждый хадис с арабским текстом, русским переводом, передатчиком и источником.
 */

import type { CollectionInfo, Hadith, HadithCollection } from "../types/hadith.types";

/* ── Collections info ───────────────────────────────────────────────── */

export const HADITH_COLLECTIONS: CollectionInfo[] = [
  { id: "nawawi",    nameRu: "40 хадисов ан-Навави", nameAr: "الأربعون النووية", shortName: "Навави" },
  { id: "bukhari",   nameRu: "Сахих аль-Бухари",    nameAr: "صحيح البخاري",      shortName: "Бухари" },
  { id: "muslim",    nameRu: "Сахих Муслим",         nameAr: "صحيح مسلم",         shortName: "Муслим" },
  { id: "tirmidhi",  nameRu: "Сунан ат-Тирмизи",    nameAr: "سنن الترمذي",       shortName: "Тирмизи" },
  { id: "abu_dawud", nameRu: "Сунан Абу Дауда",     nameAr: "سنن أبي داود",      shortName: "Абу Дауд" },
  { id: "nasai",     nameRu: "Сунан ан-Насаи",       nameAr: "سنن النسائي",       shortName: "Насаи" },
  { id: "ibn_majah", nameRu: "Сунан Ибн Маджа",     nameAr: "سنن ابن ماجه",      shortName: "Ибн Маджа" },
];

/* ── Curated collection ─────────────────────────────────────────────── */

export const HADITH_LIST: Hadith[] = [
  // ── 40 хадисов ан-Навави (выборка) ──────────

  {
    id: "nawawi-01",
    arabic: "إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى، فَمَنْ كَانَتْ هِجْرَتُهُ إِلَى اللَّهِ وَرَسُولِهِ فَهِجْرَتُهُ إِلَى اللَّهِ وَرَسُولِهِ، وَمَنْ كَانَتْ هِجْرَتُهُ لِدُنْيَا يُصِيبُهَا أَوْ امْرَأَةٍ يَنْكِحُهَا فَهِجْرَتُهُ إِلَى مَا هَاجَرَ إِلَيْهِ",
    translations: {
      ru: { text: "Поистине, дела оцениваются только по намерениям, и каждому человеку достанется лишь то, что он намеревался обрести. Тот, чья хиджра была к Аллаху и Его Посланнику, совершил хиджру к Аллаху и Его Посланнику, а тот, чья хиджра была ради мирского блага или женитьбы, совершил хиджру лишь к тому, ради чего он переселился.", narrator: "Умар ибн аль-Хаттаб", grade: "Сахих" },
      en: { text: "Truly, deeds are judged only by intentions, and each person will receive only what he intended to receive. The one whose hijrah was to Allah and His Messenger, made the hijrah to Allah and His Messenger, and the one whose hijrah was for worldly benefit or marriage, made the hijrah only to that for which he migrated.", narrator: "Umar ibn al-Khattab", grade: "Sahih" },
      uz: { text: "Darhaqiqat, amallar faqat niyatga qarab baholanadi va har bir kishi faqat niyat qilgan narsasini oladi. Kimning hijrati Allohga va Rasuliga bo‘lsa, Alloh va Rasuliga hijrat qilgan bo‘lsa, kimning hijrati dunyoviy manfaat yoki nikoh uchun bo‘lsa, hijratni faqat o‘zi hijrat qilgan narsasiga qilgan.", narrator: "Umar ibn al-Xattob", grade: "Sahih" },
      ky: { text: "Чындыгында, амалдар ниет менен гана бааланат жана ар бир адам ниет кылганын гана алат. Кимдин хижраты Аллахка жана Анын Элчисине болсо, Аллахка жана Анын Элчисине хижрат кылган, ал эми кимдин хижраты дүнүйөлүк пайда же нике үчүн болсо, хижрат кылганы үчүн гана хижрат кылган.", narrator: "Умар ибн аль-Хаттаб", grade: "Сахих" }
    },
    translation: "Поистине, дела оцениваются только по намерениям, и каждому человеку достанется лишь то, что он намеревался обрести. Тот, чья хиджра была к Аллаху и Его Посланнику, совершил хиджру к Аллаху и Его Посланнику, а тот, чья хиджра была ради мирского блага или женитьбы, совершил хиджру лишь к тому, ради чего он переселился.",
    narrator: "Умар ибн аль-Хаттаб",
    narratorAr: "عمر بن الخطاب",
    collection: "nawawi",
    number: "1",
    grade: "Сахих",
    topic: "Намерение",
  },
  {
    id: "nawawi-02",
    arabic: "بُنِيَ الإِسْلامُ عَلَى خَمْسٍ: شَهَادَةِ أَنْ لا إِلَهَ إِلا اللَّهُ وَأَنَّ مُحَمَّدًا رَسُولُ اللَّهِ، وَإِقَامِ الصَّلاةِ، وَإِيتَاءِ الزَّكَاةِ، وَحَجِّ الْبَيْتِ، وَصَوْمِ رَمَضَانَ",
    translations: {
      ru: { text: "Ислам основан на пяти столпах: свидетельство, что нет божества, кроме Аллаха, и что Мухаммад — Посланник Аллаха, совершение молитвы, выплата закята, паломничество к Дому и пост в месяц Рамадан.", narrator: "Абдуллах ибн Умар", grade: "Сахих" },
      en: { text: "Islam is based on five pillars: witnessing that there is no god but Allah and that Muhammad is the Messenger of Allah, performing prayer, paying zakat, pilgrimage to the House and fasting in the month of Ramadan.", narrator: "Abdullah ibn Umar", grade: "Sahih" },
      uz: { text: "Islom dini besh ruknga asoslanadi: Allohdan o‘zga iloh yo‘qligiga va Muhammad Allohning rasuli ekanligiga guvohlik berish, namoz o‘qish, zakot berish, Baytullohni haj qilish va Ramazon oyida ro‘za tutish.", narrator: "Abdulloh ibn Umar", grade: "Sahih" },
      ky: { text: "Ислам беш түркүккө негизделген: Аллахтан башка кудай жок жана Мухаммад Алланын элчиси экендигине күбөлүк берүү, намаз окуу, зекет берүү, үйдү зыярат кылуу жана Рамазан айында орозо кармоо.", narrator: "Абдуллах ибн Умар", grade: "Сахих" }
    },
    translation: "Ислам основан на пяти столпах: свидетельство, что нет божества, кроме Аллаха, и что Мухаммад — Посланник Аллаха, совершение молитвы, выплата закята, паломничество к Дому и пост в месяц Рамадан.",
    narrator: "Абдуллах ибн Умар",
    narratorAr: "عبد الله بن عمر",
    collection: "nawawi",
    number: "3",
    grade: "Сахих",
    topic: "Столпы Ислама",
  },
  {
    id: "nawawi-03",
    arabic: "لَا يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لِأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ",
    translations: {
      ru: { text: "Не уверует никто из вас до тех пор, пока не станет желать своему брату того же, чего желает самому себе.", narrator: "Анас ибн Малик", grade: "Сахих" },
      en: { text: "None of you will believe until he wishes for his brother what he wishes for himself.", narrator: "Anas ibn Malik", grade: "Sahih" },
      uz: { text: "Sizlardan hech biringiz o'zi uchun xohlagan narsani birodariga ham xohlamagunicha iymon keltirmaysiz.", narrator: "Anas ibn Molik", grade: "Sahih" },
      ky: { text: "Силерден эч ким өзүнө каалаганды бир тууганына да кааламайынча ыйман келтире албайт.", narrator: "Анас ибн Малик", grade: "Сахих" }
    },
    translation: "Не уверует никто из вас до тех пор, пока не станет желать своему брату того же, чего желает самому себе.",
    narrator: "Анас ибн Малик",
    narratorAr: "أنس بن مالك",
    collection: "nawawi",
    number: "13",
    grade: "Сахих",
    topic: "Братство",
  },
  {
    id: "nawawi-04",
    arabic: "مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ، وَمَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الآخِرِ فَلْيُكْرِمْ جَارَهُ، وَمَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الآخِرِ فَلْيُكْرِمْ ضَيْفَهُ",
    translations: {
      ru: { text: "Кто верует в Аллаха и в Последний день, пусть говорит благое или молчит. Кто верует в Аллаха и в Последний день, пусть почитает своего соседа. Кто верует в Аллаха и в Последний день, пусть оказывает почёт своему гостю.", narrator: "Абу Хурайра", grade: "Сахих" },
      en: { text: "Whoever believes in Allah and the Last Day, let him speak good or remain silent. Whoever believes in Allah and the Last Day, let him honor his neighbor. Whoever believes in Allah and the Last Day, let him honor his guest.", narrator: "Abu Hurayrah", grade: "Sahih" },
      uz: { text: "Kim Allohga va oxirat kuniga iymon keltirgan bo'lsa, yaxshi gapirsin yoki jim tursin. Kim Allohga va oxirat kuniga iymon keltirgan bo'lsa, qo'shnisini hurmat qilsin. Kim Allohga va oxirat kuniga iymon keltirsa, mehmonini hurmat qilsin.", narrator: "Abu Hurayra", grade: "Sahih" },
      ky: { text: "Ким Аллахка жана акырет күнүнө ишенсе, жакшы сүйлөсүн же унчукпасын. Ким Аллахка жана акырет күнүнө ыйман келтирсе, кошунасын сыйласын. Ким Аллага жана акырет күнүнө ыйман келтирсе, коногун сыйласын.", narrator: "Абу Хурайра", grade: "Сахих" }
    },
    translation: "Кто верует в Аллаха и в Последний день, пусть говорит благое или молчит. Кто верует в Аллаха и в Последний день, пусть почитает своего соседа. Кто верует в Аллаха и в Последний день, пусть оказывает почёт своему гостю.",
    narrator: "Абу Хурайра",
    narratorAr: "أبو هريرة",
    collection: "nawawi",
    number: "15",
    grade: "Сахих",
    topic: "Благой нрав",
  },
  {
    id: "nawawi-05",
    arabic: "لَا تَغْضَبْ",
    translations: {
      ru: { text: "Не гневайся!", narrator: "Абу Хурайра", grade: "Сахих" },
      en: { text: "Don't be angry!", narrator: "Abu Hurayrah", grade: "Sahih" },
      uz: { text: "G'azablanmang!", narrator: "Abu Hurayra", grade: "Sahih" },
      ky: { text: "Ачууланба!", narrator: "Абу Хурайра", grade: "Сахих" }
    },
    translation: "Не гневайся!",
    narrator: "Абу Хурайра",
    narratorAr: "أبو هريرة",
    collection: "nawawi",
    number: "16",
    grade: "Сахих",
    topic: "Самообладание",
  },
  {
    id: "nawawi-06",
    arabic: "إِنَّ اللَّهَ كَتَبَ الإِحْسَانَ عَلَى كُلِّ شَيْءٍ",
    translations: {
      ru: { text: "Поистине, Аллах предписал доброе отношение ко всему.", narrator: "Шаддад ибн Аус", grade: "Сахих" },
      en: { text: "Indeed, Allah has prescribed good behavior towards everything.", narrator: "Shaddad ibn Aus", grade: "Sahih" },
      uz: { text: "Albatta, Alloh har bir narsaga yaxshi xulqni farz qilgan.", narrator: "Shaddod ibn Aus", grade: "Sahih" },
      ky: { text: "Чындыгында, Аллах бардык нерсеге жакшылыкты буйруган.", narrator: "Шаддад ибн Аус", grade: "Сахих" }
    },
    translation: "Поистине, Аллах предписал доброе отношение ко всему.",
    narrator: "Шаддад ибн Аус",
    narratorAr: "شداد بن أوس",
    collection: "nawawi",
    number: "17",
    grade: "Сахих",
    topic: "Ихсан",
  },
  {
    id: "nawawi-07",
    arabic: "اتَّقِ اللَّهَ حَيْثُمَا كُنْتَ، وَأَتْبِعْ السَّيِّئَةَ الْحَسَنَةَ تَمْحُهَا، وَخَالِقِ النَّاسَ بِخُلُقٍ حَسَنٍ",
    translations: {
      ru: { text: "Бойся Аллаха, где бы ты ни был, вслед за дурным делом соверши доброе, и оно сотрёт его, и относись к людям с хорошим нравом.", narrator: "Абу Зарр и Муаз ибн Джабаль", grade: "Хасан" },
      en: { text: "Fear Allah wherever you are, follow a bad deed with a good deed and it will erase it, and treat people with good morals.", narrator: "Abu Dharr and Muadh ibn Jabal", grade: "Hasan" },
      uz: { text: "Qayerda bo'lsangiz ham Allohdan qo'rqing, bir yomon ishni yaxshilik bilan o'chiring, unga ergashing va odamlarga go'zal xulq bilan muomala qiling.", narrator: "Abu Zarr va Muoz ibn Jabal", grade: "Hasan" },
      ky: { text: "Кайда болсоң да Аллахтан корккула, жамандыкты жакшылык менен ээрчи, ал аны өчүрөт жана адамдарга жакшы адеп-ахлак менен мамиле кыл.", narrator: "Абу Зарр жана Муаз ибн Жабал", grade: "Хасан" }
    },
    translation: "Бойся Аллаха, где бы ты ни был, вслед за дурным делом соверши доброе, и оно сотрёт его, и относись к людям с хорошим нравом.",
    narrator: "Абу Зарр и Муаз ибн Джабаль",
    narratorAr: "أبو ذر ومعاذ بن جبل",
    collection: "nawawi",
    number: "18",
    grade: "Хасан",
    topic: "Богобоязненность",
  },
  {
    id: "nawawi-08",
    arabic: "مِنْ حُسْنِ إسْلَامِ الْمَرْءِ تَرْكُهُ مَا لَا يَعْنِيهِ",
    translations: {
      ru: { text: "Из совершенства ислама человека — оставление того, что его не касается.", narrator: "Абу Хурайра", grade: "Хасан" },
      en: { text: "The perfection of Islam for a person is the abandonment of what does not concern him.", narrator: "Abu Hurayrah", grade: "Hasan" },
      uz: { text: "Inson uchun Islomning komilligi, o‘ziga tegishli bo‘lmagan narsani tark etishdir.", narrator: "Abu Hurayra", grade: "Hasan" },
      ky: { text: "Исламдын адам үчүн кемчиликсиздиги – ага тиешеси жок нерселерди таштоо.", narrator: "Абу Хурайра", grade: "Хасан" }
    },
    translation: "Из совершенства ислама человека — оставление того, что его не касается.",
    narrator: "Абу Хурайра",
    narratorAr: "أبو هريرة",
    collection: "nawawi",
    number: "12",
    grade: "Хасан",
    topic: "Благоразумие",
  },
  {
    id: "nawawi-09",
    arabic: "ازْهَدْ فِي الدُّنْيَا يُحِبَّكَ اللَّهُ، وَازْهَدْ فِيمَا عِنْدَ النَّاسِ يُحِبَّكَ النَّاسُ",
    translations: {
      ru: { text: "Откажись от мирского — и Аллах полюбит тебя. Откажись от того, что есть у людей — и люди полюбят тебя.", narrator: "Сахль ибн Саад", grade: "Хасан" },
      en: { text: "Give up the worldly things and Allah will love you. Give up what people have and people will love you.", narrator: "Sahl ibn Saad", grade: "Hasan" },
      uz: { text: "Dunyoviy narsalarni tark eting va Alloh sizni yaxshi ko'radi. Odamlarda bor narsadan voz keching va odamlar sizni yaxshi ko'rishadi.", narrator: "Sahl ibn Sa'd", grade: "Hasan" },
      ky: { text: "Дуйнолук нерселерди ташта, ошондо Аллах сени жакшы көрөт. Элде бар нерседен баш тарт, ошондо эл сени сүйөт.", narrator: "Сахл ибн Саад", grade: "Хасан" }
    },
    translation: "Откажись от мирского — и Аллах полюбит тебя. Откажись от того, что есть у людей — и люди полюбят тебя.",
    narrator: "Сахль ибн Саад",
    narratorAr: "سهل بن سعد",
    collection: "nawawi",
    number: "31",
    grade: "Хасан",
    topic: "Аскетизм",
  },
  {
    id: "nawawi-10",
    arabic: "لَا ضَرَرَ وَلَا ضِرَارَ",
    translations: {
      ru: { text: "Нельзя причинять вред ни себе, ни другим.", narrator: "Абу Саид аль-Худри", grade: "Хасан" },
      en: { text: "You must not harm yourself or others.", narrator: "Abu Said al-Khudri", grade: "Hasan" },
      uz: { text: "Siz o'zingizga va boshqalarga zarar etkazmasligingiz kerak.", narrator: "Abu Said al-Xudriy", grade: "Hasan" },
      ky: { text: "Өзүңө да, башкаларга да зыян келтирбеш керек.", narrator: "Абу Саид аль-Худри", grade: "Хасан" }
    },
    translation: "Нельзя причинять вред ни себе, ни другим.",
    narrator: "Абу Саид аль-Худри",
    narratorAr: "أبو سعيد الخدري",
    collection: "nawawi",
    number: "32",
    grade: "Хасан",
    topic: "Недопустимость вреда",
  },

  // ── Бухари / Муслим ──────────────

  {
    id: "bukhari-01",
    arabic: "خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ",
    translations: {
      ru: { text: "Лучший из вас тот, кто изучил Коран и обучил ему других.", narrator: "Усман ибн Аффан", grade: "Сахих" },
      en: { text: "The best of you is the one who studied the Quran and taught it to others.", narrator: "Uthman ibn Affan", grade: "Sahih" },
      uz: { text: "Sizlarning eng yaxshilaringiz Qur'onni o'rgangan va uni boshqalarga o'rgatganingizdir.", narrator: "Usmon ibn Affon", grade: "Sahih" },
      ky: { text: "Силердин эң жакшыңар – Куранды үйрөнүп, аны башкаларга үйрөткөнүңөр.", narrator: "Усман ибн Аффан", grade: "Сахих" }
    },
    translation: "Лучший из вас тот, кто изучил Коран и обучил ему других.",
    narrator: "Усман ибн Аффан",
    narratorAr: "عثمان بن عفان",
    collection: "bukhari",
    number: "5027",
    grade: "Сахих",
    topic: "Коран",
  },
  {
    id: "bukhari-02",
    arabic: "الْمُسْلِمُ مَنْ سَلِمَ الْمُسْلِمُونَ مِنْ لِسَانِهِ وَيَدِهِ",
    translations: {
      ru: { text: "Мусульманин — тот, от языка и рук которого другие мусульмане в безопасности.", narrator: "Абдуллах ибн Амр", grade: "Сахих" },
      en: { text: "A Muslim is one from whose tongue and hands other Muslims are safe.", narrator: "Abdullah ibn Amr", grade: "Sahih" },
      uz: { text: "Musulmon - boshqa musulmonlar tilidan va qo'lidan omon bo'lgan kishidir.", narrator: "Abdulloh ibn Amr", grade: "Sahih" },
      ky: { text: "Мусулман – тилинен жана колунан башка мусулмандар аман болгон адам.", narrator: "Абдуллах ибн Амр", grade: "Сахих" }
    },
    translation: "Мусульманин — тот, от языка и рук которого другие мусульмане в безопасности.",
    narrator: "Абдуллах ибн Амр",
    narratorAr: "عبد الله بن عمرو",
    collection: "bukhari",
    number: "10",
    grade: "Сахих",
    topic: "Определение мусульманина",
  },
  {
    id: "bukhari-03",
    arabic: "مَنْ صَلَّى الْبَرْدَيْنِ دَخَلَ الْجَنَّةَ",
    translations: {
      ru: { text: "Кто совершает две прохладные молитвы (Фаджр и Аср), тот войдёт в Рай.", narrator: "Абу Муса аль-Ашари", grade: "Сахих" },
      en: { text: "Whoever performs two cold prayers (Fajr and Asr) will enter Paradise.", narrator: "Abu Musa al-Ashari", grade: "Sahih" },
      uz: { text: "Kim ikki sovuq namozni (bomdod va asr) o'qisa, jannatga kiradi.", narrator: "Abu Muso al-Ashariy", grade: "Sahih" },
      ky: { text: "Ким эки муздак намаз окуса (Багымдат жана аср) Бейишке кирет.", narrator: "Абу Муса аль-Ашари", grade: "Сахих" }
    },
    translation: "Кто совершает две прохладные молитвы (Фаджр и Аср), тот войдёт в Рай.",
    narrator: "Абу Муса аль-Ашари",
    narratorAr: "أبو موسى الأشعري",
    collection: "bukhari",
    number: "574",
    grade: "Сахих",
    topic: "Намаз",
  },
  {
    id: "bukhari-04",
    arabic: "الدُّعَاءُ هُوَ الْعِبَادَةُ",
    translations: {
      ru: { text: "Дуа (мольба) — это и есть поклонение.", narrator: "Нуман ибн Башир", grade: "Сахих" },
      en: { text: "Dua (supplication) is worship.", narrator: "Numan ibn Bashir", grade: "Sahih" },
      uz: { text: "Duo (duo) ibodatdir.", narrator: "Nu'mon ibn Bashir", grade: "Sahih" },
      ky: { text: "Дуа (дуба) бул ибадат.", narrator: "Нуман ибн Башир", grade: "Сахих" }
    },
    translation: "Дуа (мольба) — это и есть поклонение.",
    narrator: "Нуман ибн Башир",
    narratorAr: "النعمان بن بشير",
    collection: "tirmidhi",
    number: "3372",
    grade: "Сахих",
    topic: "Дуа",
  },
  {
    id: "muslim-01",
    arabic: "إِنَّ اللَّهَ لَا يَنْظُرُ إِلَى صُوَرِكُمْ وَأَمْوَالِكُمْ وَلَكِنْ يَنْظُرُ إِلَى قُلُوبِكُمْ وَأَعْمَالِكُمْ",
    translations: {
      ru: { text: "Поистине, Аллах не смотрит на ваши тела и имущество, но смотрит на ваши сердца и деяния.", narrator: "Абу Хурайра", grade: "Сахих" },
      en: { text: "Verily, Allah does not look at your bodies and property, but looks at your hearts and deeds.", narrator: "Abu Hurayrah", grade: "Sahih" },
      uz: { text: "Albatta, Alloh tana va mollaringizga qaramaydi, balki qalblaringiz va amallaringizga qaraydi.", narrator: "Abu Hurayra", grade: "Sahih" },
      ky: { text: "Чындыгында, Аллах силердин денеңер менен мал-мүлкүңөргө карабайт, бирок жүрөгүңөргө жана амалыңа карайт.", narrator: "Абу Хурайра", grade: "Сахих" }
    },
    translation: "Поистине, Аллах не смотрит на ваши тела и имущество, но смотрит на ваши сердца и деяния.",
    narrator: "Абу Хурайра",
    narratorAr: "أبو هريرة",
    collection: "muslim",
    number: "2564",
    grade: "Сахих",
    topic: "Искренность",
  },
  {
    id: "muslim-02",
    arabic: "الطُّهُورُ شَطْرُ الإِيمَانِ",
    translations: {
      ru: { text: "Чистота — половина веры.", narrator: "Абу Малик аль-Ашари", grade: "Сахих" },
      en: { text: "Purity is half of faith.", narrator: "Abu Malik al-Ashari", grade: "Sahih" },
      uz: { text: "Poklik iymonning yarmidir.", narrator: "Abu Malik al-Ashariy", grade: "Sahih" },
      ky: { text: "Тазалык ыймандын жарымы.", narrator: "Абу Малик аль-Ашари", grade: "Сахих" }
    },
    translation: "Чистота — половина веры.",
    narrator: "Абу Малик аль-Ашари",
    narratorAr: "أبو مالك الأشعري",
    collection: "muslim",
    number: "223",
    grade: "Сахих",
    topic: "Чистота",
  },
  {
    id: "muslim-03",
    arabic: "مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا، سَهَّلَ اللَّهُ لَهُ بِهِ طَرِيقًا إِلَى الْجَنَّةِ",
    translations: {
      ru: { text: "Кто встал на путь в поисках знания, тому Аллах облегчит путь в Рай.", narrator: "Абу Хурайра", grade: "Сахих" },
      en: { text: "Whoever takes the path in search of knowledge, Allah will make the path to Paradise easier for him.", narrator: "Abu Hurayrah", grade: "Sahih" },
      uz: { text: "Kim ilm izlab yo'lga tushsa, Alloh unga jannat yo'lini oson qiladi.", narrator: "Abu Hurayra", grade: "Sahih" },
      ky: { text: "Ким илим издеп жолго түшсө, Аллах анын бейиш жолун жеңилдетет.", narrator: "Абу Хурайра", grade: "Сахих" }
    },
    translation: "Кто встал на путь в поисках знания, тому Аллах облегчит путь в Рай.",
    narrator: "Абу Хурайра",
    narratorAr: "أبو هريرة",
    collection: "muslim",
    number: "2699",
    grade: "Сахих",
    topic: "Знание",
  },
  {
    id: "muslim-04",
    arabic: "لا تَحْقِرَنَّ مِنَ الْمَعْرُوفِ شَيْئًا وَلَوْ أَنْ تَلْقَى أَخَاكَ بِوَجْهٍ طَلِقٍ",
    translations: {
      ru: { text: "Не пренебрегай ничем из добра, даже если это встреча с братом с приветливым лицом.", narrator: "Абу Зарр", grade: "Сахих" },
      en: { text: "Do not neglect any good thing, even if it is meeting a brother with a friendly face.", narrator: "Abu Dharr", grade: "Sahih" },
      uz: { text: "Do'stona yuzli birodarni uchratgan bo'lsa ham, biron bir yaxshi narsani e'tiborsiz qoldirmang.", narrator: "Abu Zarr", grade: "Sahih" },
      ky: { text: "Жакшылыкка кайдыгер караба, мейли ал бир тууганды жолуктурса да.", narrator: "Абу Зар", grade: "Сахих" }
    },
    translation: "Не пренебрегай ничем из добра, даже если это встреча с братом с приветливым лицом.",
    narrator: "Абу Зарр",
    narratorAr: "أبو ذر",
    collection: "muslim",
    number: "2626",
    grade: "Сахих",
    topic: "Добро",
  },
  {
    id: "bukhari-05",
    arabic: "تَبَسُّمُكَ فِي وَجْهِ أَخِيكَ لَكَ صَدَقَةٌ",
    translations: {
      ru: { text: "Твоя улыбка брату — это милостыня (садака).", narrator: "Абу Зарр", grade: "Хасан" },
      en: { text: "Your smile to your brother is alms (sadaqah).", narrator: "Abu Dharr", grade: "Hasan" },
      uz: { text: "Birodaringga tabassuming sadaqadir.", narrator: "Abu Zarr", grade: "Hasan" },
      ky: { text: "Бир тууганыңа болгон жылмаюуң садака.", narrator: "Абу Зар", grade: "Хасан" }
    },
    translation: "Твоя улыбка брату — это милостыня (садака).",
    narrator: "Абу Зарр",
    narratorAr: "أبو ذر",
    collection: "tirmidhi",
    number: "1956",
    grade: "Хасан",
    topic: "Милостыня",
  },
  {
    id: "bukhari-06",
    arabic: "خَيْرُ النَّاسِ أَنْفَعُهُمْ لِلنَّاسِ",
    translations: {
      ru: { text: "Лучший из людей — тот, кто наиболее полезен для людей.", narrator: "Джабир", grade: "Хасан" },
      en: { text: "The best of people is the one who is most useful to people.", narrator: "Jabir", grade: "Hasan" },
      uz: { text: "Odamlarning eng yaxshisi odamlarga foydali bo'lganidir.", narrator: "Jobir", grade: "Hasan" },
      ky: { text: "Адамдардын эң жакшысы – адамдарга эң пайдалуусу.", narrator: "Жабир", grade: "Хасан" }
    },
    translation: "Лучший из людей — тот, кто наиболее полезен для людей.",
    narrator: "Джабир",
    narratorAr: "جابر",
    collection: "tirmidhi",
    grade: "Хасан",
    topic: "Служение людям",
  },
  {
    id: "bukhari-07",
    arabic: "مَا مِنْ مُسْلِمٍ يَغْرِسُ غَرْسًا أَوْ يَزْرَعُ زَرْعًا فَيَأْكُلُ مِنْهُ طَيْرٌ أَوْ إِنْسَانٌ أَوْ بَهِيمَةٌ إِلَّا كَانَ لَهُ بِهِ صَدَقَةٌ",
    translations: {
      ru: { text: "Если мусульманин посадит дерево или посеет что-либо, а затем птица, человек или животное поест с этого, то это будет для него милостыней.", narrator: "Анас ибн Малик", grade: "Сахих" },
      en: { text: "If a Muslim plants a tree or sows something and then a bird, person or animal eats from it, it will be charity for him.", narrator: "Anas ibn Malik", grade: "Sahih" },
      uz: { text: "Musulmon kishi daraxt eksa yoki biror narsa eksa, undan qush, odam yoki hayvon yesa, bu unga sadaqa bo‘ladi.", narrator: "Anas ibn Molik", grade: "Sahih" },
      ky: { text: "Мусулман бир дарак отургузса же бир нерсе сепсе, анан андан канаттуу, адам же жаныбар жесе, ал үчүн садака болот.", narrator: "Анас ибн Малик", grade: "Сахих" }
    },
    translation: "Если мусульманин посадит дерево или посеет что-либо, а затем птица, человек или животное поест с этого, то это будет для него милостыней.",
    narrator: "Анас ибн Малик",
    narratorAr: "أنس بن مالك",
    collection: "bukhari",
    number: "2320",
    grade: "Сахих",
    topic: "Добрые дела",
  },
  {
    id: "muslim-05",
    arabic: "إِذَا مَاتَ الْإِنْسَانُ انْقَطَعَ عَنْهُ عَمَلُهُ إِلَّا مِنْ ثَلَاثَةٍ: إِلَّا مِنْ صَدَقَةٍ جَارِيَةٍ، أَوْ عِلْمٍ يُنْتَفَعُ بِهِ، أَوْ وَلَدٍ صَالِحٍ يَدْعُو لَهُ",
    translations: {
      ru: { text: "Когда человек умирает, его дела прекращаются, кроме трёх: непрерывная милостыня (садака джария), знание, приносящее пользу, и праведный ребёнок, молящийся за него.", narrator: "Абу Хурайра", grade: "Сахих" },
      en: { text: "When a person dies, his deeds cease, except for three: continuous charity (sadaqa jariya), knowledge that brings benefit, and a righteous child praying for him.", narrator: "Abu Hurayrah", grade: "Sahih" },
      uz: { text: "Biror kishi vafot etsa, amallari to'xtaydi, faqat uchtasi: doimiy sadaqa (sadaqa jariya), foyda keltiruvchi ilm va unga duo qilish solih farzand.", narrator: "Abu Hurayra", grade: "Sahih" },
      ky: { text: "Адам өлгөндө үч нерседен башка амалдары токтойт: үзгүлтүксүз садака (садака жария), пайда берүүчү илим жана ал үчүн дуба кылуучу салих бала.", narrator: "Абу Хурайра", grade: "Сахих" }
    },
    translation: "Когда человек умирает, его дела прекращаются, кроме трёх: непрерывная милостыня (садака джария), знание, приносящее пользу, и праведный ребёнок, молящийся за него.",
    narrator: "Абу Хурайра",
    narratorAr: "أبو هريرة",
    collection: "muslim",
    number: "1631",
    grade: "Сахих",
    topic: "Непрерывные дела",
  },
  {
    id: "bukhari-08",
    arabic: "أَحَبُّ الأَعْمَالِ إِلَى اللَّهِ أَدْوَمُهَا وَإِنْ قَلَّ",
    translations: {
      ru: { text: "Самые любимые дела Аллахом — постоянные, даже если они малы.", narrator: "Аиша", grade: "Сахих" },
      en: { text: "Allah's most beloved deeds are permanent ones, even if they are small.", narrator: "Aisha", grade: "Sahih" },
      uz: { text: "Alloh taoloning eng sevimli amallari kichik bo'lsa ham doimiydir.", narrator: "Oysha", grade: "Sahih" },
      ky: { text: "Аллахтын эң сүйүктүү амалдары, кичине болсо да, түбөлүктүү.", narrator: "Айша", grade: "Сахих" }
    },
    translation: "Самые любимые дела Аллахом — постоянные, даже если они малы.",
    narrator: "Аиша",
    narratorAr: "عائشة",
    collection: "bukhari",
    number: "6464",
    grade: "Сахих",
    topic: "Постоянство",
  },
  {
    id: "bukhari-09",
    arabic: "مَنْ لَا يَرْحَمُ لَا يُرْحَمُ",
    translations: {
      ru: { text: "Кто не проявляет милосердие — к тому не будет проявлено милосердие.", narrator: "Джарир ибн Абдуллах", grade: "Сахих" },
      en: { text: "He who does not show mercy will not be shown mercy.", narrator: "Jarir ibn Abdullah", grade: "Sahih" },
      uz: { text: "Rahm qilmaganga rahm qilinmaydi.", narrator: "Jarir ibn Abdulloh", grade: "Sahih" },
      ky: { text: "Ырайым кылбаганга ырайым болбойт.", narrator: "Жарир ибн Абдулла", grade: "Сахих" }
    },
    translation: "Кто не проявляет милосердие — к тому не будет проявлено милосердие.",
    narrator: "Джарир ибн Абдуллах",
    narratorAr: "جرير بن عبد الله",
    collection: "bukhari",
    number: "7376",
    grade: "Сахих",
    topic: "Милосердие",
  },
  {
    id: "muslim-06",
    arabic: "الدُّنْيَا سِجْنُ الْمُؤْمِنِ وَجَنَّةُ الْكَافِرِ",
    translations: {
      ru: { text: "Этот мир — тюрьма для верующего и рай для неверующего.", narrator: "Абу Хурайра", grade: "Сахих" },
      en: { text: "This world is a prison for the believer and a paradise for the unbeliever.", narrator: "Abu Hurayrah", grade: "Sahih" },
      uz: { text: "Bu dunyo mo‘min uchun zindon, kofir uchun jannatdir.", narrator: "Abu Hurayra", grade: "Sahih" },
      ky: { text: "Бул дүйнө момун үчүн түрмө, каапыр үчүн бейиш.", narrator: "Абу Хурайра", grade: "Сахих" }
    },
    translation: "Этот мир — тюрьма для верующего и рай для неверующего.",
    narrator: "Абу Хурайра",
    narratorAr: "أبو هريرة",
    collection: "muslim",
    number: "2956",
    grade: "Сахих",
    topic: "Мирская жизнь",
  },
  {
    id: "bukhari-10",
    arabic: "مَا أَكَلَ أَحَدٌ طَعَامًا قَطُّ خَيْرًا مِنْ أَنْ يَأْكُلَ مِنْ عَمَلِ يَدِهِ",
    translations: {
      ru: { text: "Никто не ел ничего лучше, чем то, что заработал своими руками.", narrator: "Аль-Микдам", grade: "Сахих" },
      en: { text: "No one ate anything better than what they earned with their own hands.", narrator: "Al-Miqdam", grade: "Sahih" },
      uz: { text: "Hech kim o'z qo'llari bilan topganidan yaxshiroq narsani yemagan.", narrator: "Al-Miqdam", grade: "Sahih" },
      ky: { text: "Эч ким өз колу менен тапканынан артык эч нерсе жеген эмес.", narrator: "Аль-Микдам", grade: "Сахих" }
    },
    translation: "Никто не ел ничего лучше, чем то, что заработал своими руками.",
    narrator: "Аль-Микдам",
    narratorAr: "المقدام",
    collection: "bukhari",
    number: "2072",
    grade: "Сахих",
    topic: "Труд",
  },
  {
    id: "muslim-07",
    arabic: "الْكَلِمَةُ الطَّيِّبَةُ صَدَقَةٌ",
    translations: {
      ru: { text: "Доброе слово — это садака (милостыня).", narrator: "Абу Хурайра", grade: "Сахих" },
      en: { text: "A kind word is sadaqah (charity).", narrator: "Abu Hurayrah", grade: "Sahih" },
      uz: { text: "Yaxshi so'z sadaqadir.", narrator: "Abu Hurayra", grade: "Sahih" },
      ky: { text: "Жакшы сөз – садака (садака).", narrator: "Абу Хурайра", grade: "Сахих" }
    },
    translation: "Доброе слово — это садака (милостыня).",
    narrator: "Абу Хурайра",
    narratorAr: "أبو هريرة",
    collection: "muslim",
    number: "1009",
    grade: "Сахих",
    topic: "Доброе слово",
  },
  {
    id: "bukhari-11",
    arabic: "إِنَّ اللَّهَ جَمِيلٌ يُحِبُّ الْجَمَالَ",
    translations: {
      ru: { text: "Поистине, Аллах красив и любит красоту.", narrator: "Абдуллах ибн Масъуд", grade: "Сахих" },
      en: { text: "Verily, Allah is beautiful and loves beauty.", narrator: "Abdullah ibn Mas'ud", grade: "Sahih" },
      uz: { text: "Albatta, Alloh go'zaldir va go'zallikni sevadi.", narrator: "Abdulloh ibn Mas'ud", grade: "Sahih" },
      ky: { text: "Чындыгында, Аллах сулуу жана сулуулукту сүйөт.", narrator: "Абдуллах ибн Масъуд", grade: "Сахих" }
    },
    translation: "Поистине, Аллах красив и любит красоту.",
    narrator: "Абдуллах ибн Масъуд",
    narratorAr: "عبد الله بن مسعود",
    collection: "muslim",
    number: "91",
    grade: "Сахих",
    topic: "Красота",
  },
  {
    id: "bukhari-12",
    arabic: "إِنَّمَا بُعِثْتُ لِأُتَمِّمَ مَكَارِمَ الْأَخْلَاقِ",
    translations: {
      ru: { text: "Поистине, я был послан лишь для того, чтобы усовершенствовать благой нрав.", narrator: "Абу Хурайра", grade: "Сахих" },
      en: { text: "Truly, I was sent only to perfect good character.", narrator: "Abu Hurayrah", grade: "Sahih" },
      uz: { text: "Darhaqiqat, men faqat yaxshi xulq-atvorni komil qilish uchun yuborilganman.", narrator: "Abu Hurayra", grade: "Sahih" },
      ky: { text: "Чындыгында, мен жакшы кулк-мүнөздү толуктоо үчүн гана жиберилдим.", narrator: "Абу Хурайра", grade: "Сахих" }
    },
    translation: "Поистине, я был послан лишь для того, чтобы усовершенствовать благой нрав.",
    narrator: "Абу Хурайра",
    narratorAr: "أبو هريرة",
    collection: "bukhari",
    grade: "Сахих",
    topic: "Нравственность",
  },
  {
    id: "muslim-08",
    arabic: "اتَّقُوا النَّارَ وَلَوْ بِشِقِّ تَمْرَةٍ",
    translations: {
      ru: { text: "Остерегайтесь Огня, хотя бы раздав половинку финика.", narrator: "Ади ибн Хатим", grade: "Сахих" },
      en: { text: "Beware of Fire, even if you give away half a date.", narrator: "Adi ibn Hatim", grade: "Sahih" },
      uz: { text: "Yarim xurmo bersangiz ham olovdan saqlaning.", narrator: "Adi ibn Xotim", grade: "Sahih" },
      ky: { text: "Жарым курма берсең да оттон сактан.", narrator: "Ади ибн Хатим", grade: "Сахих" }
    },
    translations: {
      ru: { text: "Остерегайтесь Огня, хотя бы раздав половинку финика.", narrator: "Ади ибн Хатим" },
      en: { text: "Beware of Fire, even if you give away half a date.", narrator: "Adi ibn Hatim" },
      uz: { text: "Yarim xurmo bersangiz ham olovdan saqlaning.", narrator: "Adi ibn Xotim" },
      ky: { text: "Жарым курма берсең да оттон сактан.", narrator: "Ади ибн Хатим" }
    },
    translation: "Остерегайтесь Огня, хотя бы раздав половинку финика.",
    narrator: "Ади ибн Хатим",
    narratorAr: "عدي بن حاتم",
    collection: "bukhari",
    number: "1417",
    grade: "Сахих",
    topic: "Садака",
  },
];

/* ── Helpers ────────────────────────────────────────────────────────── */

export function getCollectionInfo(id: HadithCollection): CollectionInfo | undefined {
  return HADITH_COLLECTIONS.find((c) => c.id === id);
}

export function getHadithById(id: string): Hadith | undefined {
  return HADITH_LIST.find((h) => h.id === id);
}
