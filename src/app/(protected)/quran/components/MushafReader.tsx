"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@shared/i18n/LanguageContext";

const TOTAL_PAGES = 604;

export default function MushafReader({ initialPage }: { initialPage: number }) {
  const [page, setPage] = useState(initialPage);
  const { t } = useLanguage();

  const nextPage = () => {
    if (page < TOTAL_PAGES) setPage(page + 1);
  };

  const prevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  return (
    <div className="flex flex-col items-center w-full">
      {/* Page Number */}
      <div className="text-primary-600 dark:text-primary-400 mb-4 text-sm font-semibold">
        {t("quran.page_number").replace("{number}", String(page))} / {TOTAL_PAGES}
      </div>

      {/* Mushaf Image */}
      <div className="w-full max-w-3xl bg-neutral-100 dark:bg-black rounded-xl overflow-hidden shadow-card border border-border p-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`https://raw.githubusercontent.com/arman088/quranPNG/main/png/${page}.png`}
          alt={`Quran Page ${page}`}
          className="w-full h-auto object-contain bg-white"
        />
      </div>

      {/* Navigation */}
      <div className="flex gap-4 mt-6 w-full max-w-3xl">
        <button
          onClick={prevPage}
          className="flex-1 flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white p-4 rounded-xl font-medium transition-colors active:scale-95 disabled:opacity-50"
          disabled={page <= 1}
        >
          <ChevronLeft className="w-5 h-5 rtl:mr-1 rtl:-ml-1" />
          {t("quran.prev_page")}
        </button>

        <button
          onClick={nextPage}
          className="flex-1 flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white p-4 rounded-xl font-medium transition-colors active:scale-95 disabled:opacity-50"
          disabled={page >= TOTAL_PAGES}
        >
           {t("quran.next_page")}
          <ChevronRight className="w-5 h-5 rtl:ml-1 rtl:-mr-1" />
        </button>
      </div>
    </div>
  );
}
