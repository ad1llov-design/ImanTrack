"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { cn } from "@shared/lib/utils";
import { ChevronLeft, ChevronRight, Maximize2, Minimize2, BookmarkPlus } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@shared/i18n/LanguageContext";

interface QuranWord {
  id: number;
  position: number;
  text_uthmani: string;
  char_type_name: string;
  line_number: number;
  translation?: {
    text: string;
  };
}

interface QuranVerse {
  id: number;
  verse_number: number;
  verse_key: string;
  text_uthmani: string;
  words: QuranWord[];
}

interface MushafReaderProps {
  className?: string;
}

export function MushafReader({ className }: MushafReaderProps) {
  const { t } = useLanguage();
  const [currentPage, setCurrentPage] = useState(() => {
    if (typeof window !== "undefined") {
      return parseInt(localStorage.getItem("mushaf_last_page") || "1", 10);
    }
    return 1;
  });
  const [verses, setVerses] = useState<QuranVerse[]>([]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const TOTAL_PAGES = 604;

  // Загрузка аятов для текущей страницы
  const fetchPage = useCallback(async (page: number) => {
    setIsLoading(true);
    setHasError(false);
    try {
      const res = await fetch(
        `https://api.quran.com/api/v4/verses/by_page/${page}?language=ru&words=true&word_fields=text_uthmani&fields=text_uthmani&translation_fields=text&translations=45`
      );
      if (!res.ok) throw new Error("API error");
      const data = await res.json();
      setVerses(data.verses || []);
    } catch (error) {
      console.error("Failed to fetch mushaf page:", error);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPage(currentPage);
  }, [currentPage, fetchPage]);

  // Auto-save last page
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("mushaf_last_page", String(currentPage));
    }
  }, [currentPage]);

  const goNext = useCallback(() => {
    setCurrentPage((p) => Math.min(p + 1, TOTAL_PAGES));
  }, []);

  const goPrev = useCallback(() => {
    setCurrentPage((p) => Math.max(p - 1, 1));
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") goNext();
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") goPrev();
      if (e.key === "Escape") setIsFullscreen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [goNext, goPrev]);

  const toggleFullscreen = () => setIsFullscreen((f) => !f);

  const content = (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      {/* Controls */}
      <div className="flex items-center justify-between w-full max-w-2xl px-2">
        <button
          onClick={goPrev}
          disabled={currentPage <= 1}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface text-muted hover:text-main disabled:opacity-30 transition-colors"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-3">
          <span className="text-sm font-bold text-main tabular-nums">
            {currentPage} / {TOTAL_PAGES}
          </span>
          <button onClick={toggleFullscreen} className="text-muted hover:text-main transition-colors">
            {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </button>
        </div>

        <button
          onClick={goNext}
          disabled={currentPage >= TOTAL_PAGES}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface text-muted hover:text-main disabled:opacity-30 transition-colors"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Page Content */}
      <div className="relative w-full max-w-2xl rounded-2xl border border-border bg-white dark:bg-neutral-900 overflow-hidden shadow-card min-h-[500px] p-6 md:p-10">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-neutral-900/80 z-10">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-500 border-t-transparent" />
          </div>
        )}

        {hasError ? (
          <div className="flex flex-col items-center justify-center gap-4 p-8 text-center min-h-[400px]">
            <div className="text-6xl">📖</div>
            <p className="text-sm text-muted">{t("common.error")}</p>
            <button
              onClick={() => fetchPage(currentPage)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary-500 text-white text-sm font-bold hover:bg-primary-600 transition-all"
            >
              {t("common.back")}
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center" dir="rtl">
            {/* Bismillah Header for page */}
            {currentPage > 1 && verses.length > 0 && verses[0]?.verse_key?.endsWith(":1") && (
              <div className="text-center mb-6 pb-4 border-b border-neutral-200 dark:border-neutral-700 w-full">
                <p className="text-2xl md:text-3xl text-neutral-800 dark:text-neutral-200 leading-loose" style={{ fontFamily: "var(--font-amiri, 'Amiri'), 'Traditional Arabic', serif" }}>
                  بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
                </p>
              </div>
            )}

            {/* Verses */}
            <div className="text-center leading-[3] md:leading-[3.5] space-y-1">
              {verses.map((verse) => (
                <span key={verse.id} className="inline">
                  <span
                    className="text-2xl md:text-3xl lg:text-4xl text-neutral-900 dark:text-neutral-100 tracking-wide"
                    style={{
                      fontFamily: "var(--font-amiri, 'Amiri'), 'Traditional Arabic', serif",
                      wordSpacing: "0.15em",
                    }}
                  >
                    {verse.text_uthmani}
                  </span>
                  {/* Verse number marker ۝ */}
                  <span className="inline-flex items-center justify-center mx-1.5 text-primary-600 dark:text-primary-400 text-sm font-bold select-none">
                    ﴿{verse.verse_number}﴾
                  </span>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Quick page jump */}
      <div className="flex items-center gap-2">
        <input
          type="number"
          min={1}
          max={TOTAL_PAGES}
          value={currentPage}
          onChange={(e) => {
            const v = parseInt(e.target.value, 10);
            if (v >= 1 && v <= TOTAL_PAGES) {
              setCurrentPage(v);
            }
          }}
          className="w-20 rounded-xl border border-border bg-surface px-3 py-2 text-center text-sm font-bold text-main focus:border-primary-500 focus:outline-none"
        />
        <span className="text-xs text-muted">/ {TOTAL_PAGES}</span>
      </div>
    </div>
  );

  if (isFullscreen) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] bg-white dark:bg-neutral-900 overflow-y-auto flex items-center justify-center p-4"
      >
        {content}
      </motion.div>
    );
  }

  return content;
}
