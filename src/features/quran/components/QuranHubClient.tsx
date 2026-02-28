"use client";

import Link from "next/link";
import { BookOpen } from "lucide-react";
import { surahStartPage } from "@/app/(protected)/quran/surahStartPage";
import { useLanguage } from "@shared/i18n/LanguageContext";

export function QuranHubClient({ chapters }: { chapters: any[] }) {
  const { t } = useLanguage();

  return (
    <main className="mx-auto max-w-lg px-4 pt-6 pb-24 sm:max-w-xl sm:px-6 md:max-w-4xl lg:px-8 xl:max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="space-y-1">
          <h1 className="font-arabic text-h4 text-neutral-800 dark:text-neutral-100 md:text-h3">
            القرآن الكريم
          </h1>
          <p className="text-body-sm text-neutral-500 dark:text-neutral-400">
            {t("quran.mushaf_desc")}
          </p>
        </div>
        
        <Link 
          href="/quran/translation"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary-50 px-5 py-3 text-sm font-semibold text-primary-600 transition-all hover:bg-primary-100 hover:scale-[1.02] active:scale-95 dark:bg-primary-900/30 dark:text-primary-400"
        >
          <BookOpen className="h-4 w-4" />
          {t("quran.translation_mode")}
        </Link>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
        {chapters.map((chapter: any) => {
          const startPage = surahStartPage[chapter.id as keyof typeof surahStartPage] || 1;
          
          return (
            <Link
              key={chapter.id}
              href={`/quran/read?page=${startPage}`}
              className="group flex items-center justify-between rounded-2xl border border-border bg-surface p-4 transition-all hover:border-primary-300 hover:shadow-sm active:scale-[0.98] dark:hover:border-primary-700"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-sm font-bold text-primary-600 dark:bg-primary-900/30 dark:text-primary-400">
                  {chapter.id}
                </div>
                <div>
                  <h3 className="text-base font-semibold text-main group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {chapter.name_simple}
                  </h3>
                  <p className="text-xs text-muted">
                    {chapter.translated_name.name} • {t("quran.short_page_label").replace("{number}", String(startPage))}
                  </p>
                </div>
              </div>
              <div className="font-arabic text-lg text-main">
                {chapter.name_arabic}
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
