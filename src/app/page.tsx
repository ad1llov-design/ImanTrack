"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useLanguage } from "@shared/i18n/LanguageContext";

const PrayerWidget = dynamic(
  () => import("@features/prayer/components/PrayerWidget").then((m) => m.PrayerWidget),
  { ssr: false, loading: () => <div className="h-48 animate-pulse rounded-2xl bg-neutral-100 dark:bg-neutral-800" /> }
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
    <main className="mx-auto max-w-lg px-4 pt-6 pb-28">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-main">
            SIRAT
          </h1>
          <p className="text-xs text-muted mt-0.5">بسم الله الرحمن الرحيم</p>
        </div>
      </div>

      {/* Prayer Times */}
      <section className="mb-8">
        <PrayerWidget />
      </section>

      {/* Prayer Hadiths */}
      <section className="mb-8">
        <h2 className="text-lg font-bold text-main mb-4">{t("prayer.title")}</h2>
        <div className="space-y-4">
          {PRAYER_HADITHS.map((h, i) => (
            <div key={i} className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
              <p className="font-arabic text-lg leading-loose text-main text-right mb-3" dir="rtl">
                {h.arabic}
              </p>
              <p className="text-sm text-muted leading-relaxed mb-2">
                {t(h.translationKey as any)}
              </p>
              <p className="text-[10px] font-bold text-primary-500 bg-primary-500/10 px-2 py-0.5 rounded-md inline-block uppercase tracking-wider">
                {t(h.referenceKey as any)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Links */}
      <section>
        <h2 className="text-lg font-bold text-main mb-4">{t("dashboard.sections")}</h2>
        <div className="grid grid-cols-2 gap-3">
          {[
            { href: "/quran", label: t("nav.quran"), desc: t("dashboard.quran_desc") },
            { href: "/hadith", label: t("nav.hadith"), desc: t("dashboard.hadith_desc") },
            { href: "/dhikr", label: t("nav.dhikr"), desc: t("dashboard.dhikr_desc") },
            { href: "/sunnah", label: t("nav.sunnah"), desc: t("dashboard.sunnah_desc") },
            { href: "/adhkar", label: t("nav.adhkar"), desc: t("dashboard.adhkar_desc") },
            { href: "/prayer", label: t("nav.prayer"), desc: t("dashboard.prayer_desc") },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group rounded-2xl border border-border bg-surface p-4 transition-all hover:border-primary-300 hover:shadow-card dark:hover:border-primary-700"
            >
              <p className="text-sm font-bold text-main group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                {item.label}
              </p>
              <p className="text-xs text-muted mt-0.5">{item.desc}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
