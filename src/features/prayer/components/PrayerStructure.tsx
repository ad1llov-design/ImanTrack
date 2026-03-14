"use client";

import { useLanguage } from "@shared/i18n/LanguageContext";

interface RakatItem {
  type: string;
  count: number;
  position: string;
  highlight?: boolean;
}

interface PrayerData {
  nameKey: string;
  rakats: RakatItem[];
}

const PRAYERS: PrayerData[] = [
  {
    nameKey: "namaz.fajr_structure",
    rakats: [
      { type: "namaz.sunnah_muakkadah", count: 2, position: "namaz.before" },
      { type: "namaz.fard", count: 2, position: "", highlight: true },
    ],
  },
  {
    nameKey: "namaz.dhuhr_structure",
    rakats: [
      { type: "namaz.sunnah_muakkadah", count: 4, position: "namaz.before" },
      { type: "namaz.fard", count: 4, position: "", highlight: true },
      { type: "namaz.sunnah_muakkadah", count: 2, position: "namaz.after" },
      { type: "namaz.nafl", count: 2, position: "namaz.after" },
    ],
  },
  {
    nameKey: "namaz.asr_structure",
    rakats: [
      { type: "namaz.sunnah_ghair", count: 4, position: "namaz.before" },
      { type: "namaz.fard", count: 4, position: "", highlight: true },
    ],
  },
  {
    nameKey: "namaz.maghrib_structure",
    rakats: [
      { type: "namaz.fard", count: 3, position: "", highlight: true },
      { type: "namaz.sunnah_muakkadah", count: 2, position: "namaz.after" },
      { type: "namaz.nafl", count: 2, position: "namaz.after" },
    ],
  },
  {
    nameKey: "namaz.isha_structure",
    rakats: [
      { type: "namaz.sunnah_ghair", count: 4, position: "namaz.before" },
      { type: "namaz.fard", count: 4, position: "", highlight: true },
      { type: "namaz.sunnah_muakkadah", count: 2, position: "namaz.after" },
      { type: "namaz.nafl", count: 2, position: "namaz.after" },
      { type: "namaz.witr", count: 3, position: "namaz.after", highlight: true },
    ],
  },
];

export default function PrayerStructure() {
  const { t } = useLanguage();

  return (
    <section className="mt-10">
      <h2 className="text-xl font-bold text-primary-500 mb-2">
        {t("namaz.prayer_structure")}
      </h2>
      <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-6">
        {t("namaz.hanafi_note")}
      </p>

      <div className="space-y-4">
        {PRAYERS.map((prayer) => (
          <div
            key={prayer.nameKey}
            className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4"
          >
            <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-50 mb-3">
              {t(prayer.nameKey)}
            </h3>
            <div className="space-y-2">
              {prayer.rakats.map((rakat, idx) => (
                <div
                  key={idx}
                  className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm ${
                    rakat.highlight
                      ? "bg-primary-50 dark:bg-primary-950/30 border border-primary-200 dark:border-primary-800"
                      : "bg-neutral-50 dark:bg-neutral-800/50"
                  }`}
                >
                  <span
                    className={`font-medium ${
                      rakat.highlight
                        ? "text-primary-700 dark:text-primary-300"
                        : "text-neutral-700 dark:text-neutral-300"
                    }`}
                  >
                    {t(rakat.type)}
                    {rakat.position ? (
                      <span className="text-neutral-400 dark:text-neutral-500 font-normal ml-1">
                        ({t(rakat.position)})
                      </span>
                    ) : null}
                  </span>
                  <span
                    className={`font-bold text-base tabular-nums ${
                      rakat.highlight
                        ? "text-primary-600 dark:text-primary-400"
                        : "text-neutral-600 dark:text-neutral-400"
                    }`}
                  >
                    {rakat.count} {t("namaz.rakat")}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
