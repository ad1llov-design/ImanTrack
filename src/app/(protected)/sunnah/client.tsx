"use client";

import { SunnahGrid } from "@features/sunnah/components/SunnahGrid";
import { useLanguage } from "@shared/i18n/LanguageContext";

export function SunnahPageClient() {
  const { t } = useLanguage();

  return (
    <div className="mx-auto max-w-lg px-4 py-8 md:py-16">
      <div className="mb-12 text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-muted mb-2">
          {t("sunnah.revival")}
        </p>
        <h1 className="text-display text-4xl font-bold text-main">
          {t("sunnah.good_deeds")}
        </h1>
        <p className="mt-4 text-sm text-muted leading-relaxed">
          {t("sunnah.description")}
        </p>
      </div>

      <SunnahGrid />
    </div>
  );
}
