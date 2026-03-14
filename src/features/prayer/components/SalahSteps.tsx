"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@shared/i18n/LanguageContext";

interface Step {
  id: string;
  titleKey: string;
  arabicKey: string;
  translitKey: string;
  descKey: string;
  typeKey: string;
}

const STEPS: Step[] = [
  { id: "niyyah", titleKey: "namaz.step_niyyah", arabicKey: "namaz.step_niyyah_ar", translitKey: "namaz.step_niyyah_translit", descKey: "namaz.step_niyyah_desc", typeKey: "namaz.step_niyyah_type" },
  { id: "takbir", titleKey: "namaz.step_takbir", arabicKey: "namaz.step_takbir_ar", translitKey: "namaz.step_takbir_translit", descKey: "namaz.step_takbir_desc", typeKey: "namaz.step_takbir_type" },
  { id: "qiyam", titleKey: "namaz.step_qiyam", arabicKey: "namaz.step_qiyam_ar", translitKey: "namaz.step_qiyam_translit", descKey: "namaz.step_qiyam_desc", typeKey: "namaz.step_qiyam_type" },
  { id: "qiraat", titleKey: "namaz.step_qiraat", arabicKey: "namaz.step_qiraat_ar", translitKey: "namaz.step_qiraat_translit", descKey: "namaz.step_qiraat_desc", typeKey: "namaz.step_qiraat_type" },
  { id: "ruku", titleKey: "namaz.step_ruku", arabicKey: "namaz.step_ruku_ar", translitKey: "namaz.step_ruku_translit", descKey: "namaz.step_ruku_desc", typeKey: "namaz.step_ruku_type" },
  { id: "qawmah", titleKey: "namaz.step_qawmah", arabicKey: "namaz.step_qawmah_ar", translitKey: "namaz.step_qawmah_translit", descKey: "namaz.step_qawmah_desc", typeKey: "namaz.step_qawmah_type" },
  { id: "sujood", titleKey: "namaz.step_sujood", arabicKey: "namaz.step_sujood_ar", translitKey: "namaz.step_sujood_translit", descKey: "namaz.step_sujood_desc", typeKey: "namaz.step_sujood_type" },
  { id: "jalsa", titleKey: "namaz.step_jalsa", arabicKey: "namaz.step_jalsa_ar", translitKey: "namaz.step_jalsa_translit", descKey: "namaz.step_jalsa_desc", typeKey: "namaz.step_jalsa_type" },
  { id: "sujood2", titleKey: "namaz.step_sujood2", arabicKey: "namaz.step_sujood2_ar", translitKey: "namaz.step_sujood2_translit", descKey: "namaz.step_sujood2_desc", typeKey: "namaz.step_sujood2_type" },
  { id: "tashahhud", titleKey: "namaz.step_tashahhud", arabicKey: "namaz.step_tashahhud_ar", translitKey: "namaz.step_tashahhud_translit", descKey: "namaz.step_tashahhud_desc", typeKey: "namaz.step_tashahhud_type" },
  { id: "durood", titleKey: "namaz.step_durood", arabicKey: "namaz.step_durood_ar", translitKey: "namaz.step_durood_translit", descKey: "namaz.step_durood_desc", typeKey: "namaz.step_durood_type" },
  { id: "salam", titleKey: "namaz.step_salam", arabicKey: "namaz.step_salam_ar", translitKey: "namaz.step_salam_translit", descKey: "namaz.step_salam_desc", typeKey: "namaz.step_salam_type" },
];

function getBadgeColor(type: string): string {
  const lower = type.toLowerCase();
  if (lower.includes("fard") || lower.includes("фард") || lower.includes("farz") || lower.includes("парз"))
    return "bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300";
  if (lower.includes("wajib") || lower.includes("ваджиб") || lower.includes("vojib") || lower.includes("важиб"))
    return "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300";
  return "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300";
}

export default function SalahSteps() {
  const { t } = useLanguage();
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="mt-10">
      <h2 className="text-xl font-bold text-primary-500 mb-2">
        {t("namaz.step_by_step")}
      </h2>
      <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-6">
        {t("namaz.hanafi_note")}
      </p>

      <div className="space-y-2">
        {STEPS.map((step, idx) => {
          const isOpen = openId === step.id;
          const typeText = t(step.typeKey);

          return (
            <div
              key={step.id}
              className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden"
            >
              <button
                onClick={() => toggle(step.id)}
                className="w-full flex items-center gap-3 p-4 text-left active:bg-neutral-50 dark:active:bg-neutral-800 transition-colors min-h-[56px]"
              >
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400 text-xs font-bold flex items-center justify-center">
                  {idx + 1}
                </span>
                <span className="flex-1 font-medium text-sm text-neutral-900 dark:text-neutral-50">
                  {t(step.titleKey)}
                </span>
                <span className={`flex-shrink-0 text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full ${getBadgeColor(typeText)}`}>
                  {typeText}
                </span>
                <ChevronDown
                  className={`w-4 h-4 flex-shrink-0 text-neutral-400 transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`transition-all duration-200 ease-in-out overflow-hidden ${
                  isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-4 pb-4 space-y-3 border-t border-border pt-3">
                  <p
                    className="font-arabic text-xl leading-loose text-neutral-800 dark:text-neutral-100 text-right"
                    dir="rtl"
                  >
                    {t(step.arabicKey)}
                  </p>

                  <p className="text-sm text-primary-600 dark:text-primary-400 italic">
                    {t(step.translitKey)}
                  </p>

                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {t(step.descKey)}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
