"use client";

import { cn } from "@shared/lib/utils";
import { useLanguage } from "@shared/i18n/LanguageContext";
import { SUNNAH_ACTIONS } from "../services/sunnah.persistence";

/**
 * Sunnah Grid — clean card layout like hadith cards.
 * Localized implementation fetching translations based on user's active language.
 */
export function SunnahGrid({ className }: { className?: string }) {
  const { language, t } = useLanguage();
  const categories = [...new Set(SUNNAH_ACTIONS.map((s) => s.category))];

  const categoryTitles: Record<string, string> = {
    morning: t("sunnah.cat_morning" as any) || "Утренние Сунны",
    prayer: t("sunnah.cat_prayer" as any) || "Сунны Намаза",
    night: t("sunnah.cat_night" as any) || "Сунны Перед Сном",
    character: t("sunnah.cat_character" as any) || "Сунны Характера"
  };

  return (
    <div className={cn("flex flex-col gap-8", className)}>
      {categories.map((cat) => {
        const items = SUNNAH_ACTIONS.filter((s) => s.category === cat);
        return (
          <div key={cat} className="space-y-4">
            <h2 className="text-sm font-bold tracking-wider text-muted uppercase px-1">
              {categoryTitles[cat] || cat}
            </h2>
            <div className="space-y-4">
              {items.map((sunnah) => {
                const translation = sunnah.translations[language] || sunnah.translations["ru"];
                
                return (
                  <div
                    key={sunnah.id}
                    className="rounded-2xl border border-border bg-surface p-5 shadow-sm"
                  >
                    <div className="mb-4 text-right">
                      <p className="font-arabic text-2xl leading-[2.2] text-main">{sunnah.arabic}</p>
                    </div>
                    <h3 className="text-base font-bold text-main mb-2">
                      {translation.label}
                    </h3>
                    <p className="text-sm text-muted leading-relaxed mb-4">
                      {translation.description}
                    </p>
                    <div className="bg-primary-50/50 dark:bg-primary-950/30 py-3 px-4 rounded-xl border border-primary-100/50 dark:border-primary-900/50 flex align-middle justify-between">
                      <p className="text-[10px] font-bold text-primary-500 bg-primary-500/10 px-2 py-1 rounded-md inline-block uppercase tracking-wider self-center">
                        {sunnah.source}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
