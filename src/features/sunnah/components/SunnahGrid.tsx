"use client";

import { cn } from "@shared/lib/utils";
import { useLanguage } from "@shared/i18n/LanguageContext";
import { SUNNAH_ACTIONS } from "../services/sunnah.persistence";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

// SUNNAH_DETAILS_DB removed in favor of i18n translations

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

  const [expandedId, setExpandedId] = useState<string | null>(null);

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
                
                const isExpanded = expandedId === sunnah.id;

                const whatKey = `sunnah_details.${sunnah.id}.what`;
                const historyKey = `sunnah_details.${sunnah.id}.history`;
                const whyKey = `sunnah_details.${sunnah.id}.why`;
                const spiritualKey = `sunnah_details.${sunnah.id}.spiritual`;
                const healthKey = `sunnah_details.${sunnah.id}.health`;
                const hadithKey = `sunnah_details.${sunnah.id}.hadith`;

                const dWhat = t(whatKey) !== whatKey ? t(whatKey) : null;
                const dHistory = t(historyKey) !== historyKey ? t(historyKey) : null;
                const dWhy = t(whyKey) !== whyKey ? t(whyKey) : null;
                const dSpiritual = t(spiritualKey) !== spiritualKey ? t(spiritualKey) : null;
                const dHealth = t(healthKey) !== healthKey ? t(healthKey) : null;
                const dHadith = t(hadithKey) !== hadithKey ? t(hadithKey) : null;

                const hasDetails = dWhat || dHistory || dWhy || dSpiritual || dHealth || dHadith;

                return (
                  <div
                    key={sunnah.id}
                    className="rounded-2xl border border-border bg-surface p-5 shadow-sm overflow-hidden transition-all duration-300"
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
                    
                    <div className="flex items-center justify-between mb-2">
                      <button 
                        onClick={() => setExpandedId(isExpanded ? null : sunnah.id)}
                        className="flex items-center gap-1.5 text-xs font-semibold text-primary-600 hover:text-primary-700 transition-colors uppercase tracking-wider"
                      >
                        {isExpanded ? (t("sunnah_details.btn_collapse") !== "sunnah_details.btn_collapse" ? t("sunnah_details.btn_collapse") : "Свернуть") : (t("sunnah_details.btn_expand") !== "sunnah_details.btn_expand" ? t("sunnah_details.btn_expand") : "Подробности")}
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>

                      <p className="text-[10px] font-bold text-primary-500 bg-primary-500/10 px-2 py-1 rounded-md uppercase tracking-wider">
                        {sunnah.source}
                      </p>
                    </div>

                    {isExpanded && hasDetails && (
                      <div className="mt-4 pt-4 border-t border-border space-y-4 animate-fade-in text-sm text-muted">
                        {dWhat && (
                          <div>
                            <span className="font-bold text-main block mb-0.5">{t("sunnah_details.label_what") !== "sunnah_details.label_what" ? t("sunnah_details.label_what") : "Суть сунны:"}</span>
                            <p>{dWhat}</p>
                          </div>
                        )}
                        {dHistory && (
                          <div>
                            <span className="font-bold text-main block mb-0.5">{t("sunnah_details.label_history") !== "sunnah_details.label_history" ? t("sunnah_details.label_history") : "Исторический контекст:"}</span>
                            <p>{dHistory}</p>
                          </div>
                        )}
                        {dWhy && (
                          <div>
                            <span className="font-bold text-main block mb-0.5">{t("sunnah_details.label_why") !== "sunnah_details.label_why" ? t("sunnah_details.label_why") : "Почему это сунна:"}</span>
                            <p>{dWhy}</p>
                          </div>
                        )}
                        {dSpiritual && (
                          <div>
                            <span className="font-bold text-main block mb-0.5">{t("sunnah_details.label_spiritual") !== "sunnah_details.label_spiritual" ? t("sunnah_details.label_spiritual") : "Духовная польза:"}</span>
                            <p>{dSpiritual}</p>
                          </div>
                        )}
                        {dHealth && (
                          <div>
                            <span className="font-bold text-main block mb-0.5">{t("sunnah_details.label_health") !== "sunnah_details.label_health" ? t("sunnah_details.label_health") : "Влияние на здоровье:"}</span>
                            <p>{dHealth}</p>
                          </div>
                        )}
                        {dHadith && (
                          <div className="bg-neutral-50 dark:bg-neutral-900/40 p-3 rounded-xl border border-border italic">
                            <span className="font-bold text-main not-italic block mb-1">{t("sunnah_details.label_hadith") !== "sunnah_details.label_hadith" ? t("sunnah_details.label_hadith") : "Краткий хадис:"}</span>
                            {dHadith}
                          </div>
                        )}
                      </div>
                    )}
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
