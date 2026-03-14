"use client";

import dynamic from "next/dynamic";
import { useLanguage } from "@shared/i18n/LanguageContext";

const PrayerWidget = dynamic(
  () => import("@features/prayer/components/PrayerWidget").then((m) => m.PrayerWidget),
  { ssr: false, loading: () => <div className="h-48 animate-pulse rounded-2xl bg-neutral-100 dark:bg-neutral-800" /> }
);

const PrayerStructure = dynamic(
  () => import("@features/prayer/components/PrayerStructure"),
  { ssr: false }
);

const SalahSteps = dynamic(
  () => import("@features/prayer/components/SalahSteps"),
  { ssr: false }
);

const VideoTutorial = dynamic(
  () => import("@features/prayer/components/VideoTutorial"),
  { ssr: false }
);

const NamazBurgerMenu = dynamic(
  () => import("@features/prayer/components/NamazBurgerMenu").then(m => m.NamazBurgerMenu),
  { ssr: false }
);

const PRAYER_HADITHS = [
  {
    arabic: "مَنْ صَلَّى الْبَرْدَيْنِ دَخَلَ الْجَنَّةَ",
    translationKey: "home.hadith_0_translation",
    referenceKey: "home.hadith_0_reference",
  },
  {
    arabic: "الصَّلَوَاتُ الْخَمْسُ كَفَّارَاتٌ لِمَا بَيْنَهُنَّ",
    translationKey: "home.hadith_1_translation",
    referenceKey: "home.hadith_1_reference",
  },
  {
    arabic: "أَقْرَبُ مَا يَكُونُ الْعَبْدُ مِنْ رَبِّهِ وَهُوَ سَاجِدٌ",
    translationKey: "home.hadith_2_translation",
    referenceKey: "home.hadith_2_reference",
  },
];

export default function SiratPage() {
  const { t } = useLanguage();

  return (
    <main className="mx-auto w-full max-w-lg px-4 pt-6 pb-32 md:px-0 flex flex-col space-y-10">
      {/* Header */}
      <div className="flex items-center justify-between -mb-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50">
            SIRAT
          </h1>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">بسم الله الرحمن الرحيم</p>
        </div>
        <div className="relative z-50">
          {/* <NamazBurgerMenu /> */}
        </div>
      </div>

      {/* 1. Namaz Hero */}
      <section className="text-center flex flex-col items-center justify-center">
        <div className="relative inline-block mb-3">
          <h1 className="text-4xl font-extrabold text-neutral-900 dark:text-neutral-50 tracking-tight">
            {t("nav.prayer")}
          </h1>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-primary-500 rounded-full"></div>
        </div>
        <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mt-4 max-w-xs mx-auto">
          {t("namaz.hanafi_note")}
        </p>
      </section>

      {/* 2. Prayer Times */}
      <section>
        <PrayerWidget />
      </section>

      {/* Prayer Hadiths */}
      <section>
        <h2 className="text-lg font-bold text-neutral-900 dark:text-neutral-50 mb-4">{t("prayer.title")}</h2>
        <div className="space-y-4">
          {PRAYER_HADITHS.map((h, i) => (
            <div key={i} className="rounded-2xl border border-border bg-surface-light dark:bg-neutral-900 p-5 shadow-sm border-neutral-200 dark:border-neutral-800">
              <p className="font-arabic text-lg leading-loose text-neutral-900 dark:text-neutral-50 text-right mb-3" dir="rtl">
                {h.arabic}
              </p>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed mb-2">
                {t(h.translationKey as any)}
              </p>
              <p className="text-[10px] font-bold text-primary-500 bg-primary-50 dark:bg-primary-950/30 px-2 py-0.5 rounded-md inline-block uppercase tracking-wider">
                {t(h.referenceKey as any)}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
