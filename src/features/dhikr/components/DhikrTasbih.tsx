"use client";

import { cn } from "@shared/lib/utils";
import { DhikrCounter } from "./DhikrCounter";
import { useLanguage } from "@shared/i18n/LanguageContext";

const DHIKR_LIST = [
  {
    id: "subhanallah",
    arabic: "سُبْحَانَ ٱللَّٰهِ",
    translations: {
      ru: { title: "Субханаллах — Пречист Аллах", description: "Произносится для прославления Аллаха и очищения Его от всего, что Ему не подобает. Рекомендуется произносить 33 раза после каждого намаза." },
      en: { title: "Subhanallah — Glory be to Allah", description: "Said to glorify Allah and declare Him free of any imperfection. Recommended to say 33 times after every prayer." },
      uz: { title: "Subhanalloh — Alloh pokdir", description: "Allohni ulug'lash uchun aytiladi. Har namozdan keyin 33 marta aytish tavsiya qilinadi." },
      ky: { title: "Субханаллах — Аллах аруу", description: "Аллахты улуктоо үчүн айтылат. Ар бир намаздан кийин 33 жолу айтуу сунушталат." }
    },
    reference: "Муслим, 597",
  },
  {
    id: "alhamdulillah",
    arabic: "ٱلْحَمْدُ لِلَّٰهِ",
    translations: {
      ru: { title: "Альхамдулиллах — Хвала Аллаху", description: "Выражение благодарности Аллаху за все блага. Произносится 33 раза после каждого намаза." },
      en: { title: "Alhamdulillah — All praise is due to Allah", description: "Expression of gratitude to Allah for all blessings. Said 33 times after every prayer." },
      uz: { title: "Alhamdulilloh — Allohga hamd bo'lsin", description: "Barcha ne'matlar uchun Allohga shukr qilish. Har namozdan keyin 33 marta aytiladi." },
      ky: { title: "Альхамдулиллах — Аллахка мактоолор болсун", description: "Бардык нематтар үчүн Аллахка шүгүр кылуу. Ар бир намаздан кийин 33 жолу айтылат." }
    },
    reference: "Муслим, 223",
  },
  {
    id: "allahuakbar",
    arabic: "ٱللَّٰهُ أَكْبَرُ",
    translations: {
      ru: { title: "Аллаху Акбар — Аллах Велик", description: "Возвеличивание Аллаха. Произносится 34 раза после каждого намаза." },
      en: { title: "Allahu Akbar — Allah is the Greatest", description: "Magnification of Allah. Said 34 times after every prayer." },
      uz: { title: "Allohu Akbar — Alloh Buyukdir", description: "Allohni ulug'lash. Har namozdan keyin 34 marta aytiladi." },
      ky: { title: "Аллаху Акбар — Аллах Улук", description: "Аллахты улуктоо. Ар бир намаздан кийин 34 жолу айтылат." }
    },
    reference: "Муслим, 597",
  },
  {
    id: "istighfar",
    arabic: "أَسْتَغْفِرُ ٱللَّٰهَ",
    translations: {
      ru: { title: "Астагфируллах — Прошу прощения у Аллаха", description: "Мольба о прощении грехов. Рекомендуется произносить после каждого намаза." },
      en: { title: "Astaghfirullah — I seek forgiveness from Allah", description: "Supplication for the forgiveness of sins. Recommended after every prayer." },
      uz: { title: "Astag'firulloh — Allohdan mag'firat so'rayman", description: "Gunohlarni kechirishni so'rash. Har namozdan keyin aytish tavsiya etiladi." },
      ky: { title: "Астагфируллах — Аллахтан кечирим сурайм", description: "Күнөөлөрдү кечирүүнү суроо. Ар бир намаздан кийин айтуу сунушталат." }
    },
    reference: "Бухари, 6307",
  },
  {
    id: "lailaha",
    arabic: "لَا إِلَٰهَ إِلَّا ٱللَّٰهُ",
    translations: {
      ru: { title: "Ля иляха илля Ллах — Нет божества, кроме Аллаха", description: "Слово единобожия (тавхид). Лучший зикр по хадису Пророка ﷺ." },
      en: { title: "La ilaha illa Allah — There is no deity but Allah", description: "The word of monotheism (Tawhid). The best dhikr according to the Prophet ﷺ." },
      uz: { title: "La ilaha illalloh — Allohdan boshqa iloh yo'q", description: "Tavhid kalimasi. Payg'ambarimiz ﷺ hadisiga ko'ra eng afzal zikr." },
      ky: { title: "Ла илаха иллаллах — Аллахтан башка кудай жок", description: "Таухид сөзү. Пайгамбарыбыз ﷺ хадисине ылайык эң жакшы зикир." }
    },
    reference: "Тирмизи, 3383",
  },
  {
    id: "hawqala",
    arabic: "لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِٱللَّٰهِ",
    translations: {
      ru: { title: "Ля хавля ва ля куввата илля биЛлах", description: "Нет мощи и силы ни у кого, кроме Аллаха. Сокровище из сокровищ Рая." },
      en: { title: "La hawla wa la quwwata illa billah", description: "There is no power nor strength except with Allah. A treasure from the treasures of Paradise." },
      uz: { title: "La havla va la quvvata illa billah", description: "Allohdan o'zga hech kimda kuch va qudrat yo'q. Jannat xazinalaridan bir xazina." },
      ky: { title: "Ла хавла ва ла куввата илла биллах", description: "Аллахтан башка эч кимде күч жана кубат жок. Бейиш кенчтеринин бири." }
    },
    reference: "Бухари, 4205",
  },
  {
    id: "salawat",
    arabic: "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ",
    translations: {
      ru: { title: "Саляват на Пророка ﷺ", description: "Благословение Пророка ﷺ. Кто помолится за Пророка ﷺ один раз, за того Аллах помолится десять раз." },
      en: { title: "Salawat upon the Prophet ﷺ", description: "Blessings upon the Prophet ﷺ. Whoever sends blessings upon him once, Allah will send blessings upon him tenfold." },
      uz: { title: "Payg'ambarimizga ﷺ salovat", description: "Payg'ambarimizga ﷺ salovat aytish. Kim u zotga bir marta salovat aytsa, Alloh unga o'n marta salovat aytadi." },
      ky: { title: "Пайгамбарыбызга ﷺ салават", description: "Пайгамбарыбызга ﷺ салават айтуу. Ким ага бир жолу салават айтса, Аллах ага он жолу салават айтат." }
    },
    reference: "Муслим, 384",
  },
  {
    id: "bismillah",
    arabic: "بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
    translations: {
      ru: { title: "Бисмиллахи Ррахмани Ррахим", description: "Во имя Аллаха Милостивого, Милосердного. Читается перед любым делом." },
      en: { title: "Bismillah al-Rahman al-Rahim", description: "In the name of Allah, the Entirely Merciful, the Especially Merciful. Read before any action." },
      uz: { title: "Bismillahir Rohmanir Rohim", description: "Mehribon va rahmli Alloh nomi bilan. Har qanday ishdan oldin o'qiladi." },
      ky: { title: "Бисмиллахир Рохманир Рохим", description: "Мээримдүү жана Ырайымдуу Аллахтын аты менен. Ар бир иштин алдында окулат." }
    },
    reference: "Тирмизи, 3388",
  },
];

/**
 * DhikrTasbih — reading-focused dhikr cards.
 * Native multi-language support.
 */
export function DhikrTasbih({ className }: { className?: string }) {
  const { language, t } = useLanguage();

  return (
    <div className={cn("space-y-4", className)}>
      <div className="mb-10 text-center">
        <h1 className="text-display text-3xl font-bold text-main mb-2">{t("dhikr.title")}</h1>
        <p className="text-sm tracking-wider text-muted">{t("dhikr.subtitle")}</p>
      </div>
      {DHIKR_LIST.map((dhikr) => {
        const t = dhikr.translations[language] || dhikr.translations["ru"];

        return (
          <div
            key={dhikr.id}
            className="rounded-2xl border border-border bg-surface p-5 shadow-sm"
          >
            <p className="font-arabic text-2xl leading-loose text-main text-right mb-3" dir="rtl">
              {dhikr.arabic}
            </p>
            <h3 className="text-base font-bold text-main mb-2">
              {t.title}
            </h3>
            <p className="text-sm text-muted leading-relaxed mb-3">
              {t.description}
            </p>
            <span className="text-[10px] font-bold text-primary-500 bg-primary-500/10 px-2 py-0.5 rounded-md inline-block uppercase tracking-wider">
              {dhikr.reference}
            </span>
            <div className="mt-6 pt-6 border-t border-border flex justify-center">
              <DhikrCounter dhikrId={dhikr.id} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
