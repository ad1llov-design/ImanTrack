"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@shared/lib/utils";
import { ChevronLeft, ChevronRight, Maximize2, Minimize2, BookmarkPlus } from "lucide-react";
import { toast } from "sonner";

const QURAN_PAGE_CDN = "https://cdn.islamic.network/quran/images/";

interface MushafReaderProps {
  className?: string;
}

export function MushafReader({ className }: MushafReaderProps) {
  const [currentPage, setCurrentPage] = useState(() => {
    if (typeof window !== "undefined") {
      return parseInt(localStorage.getItem("mushaf_last_page") || "1", 10);
    }
    return 1;
  });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const TOTAL_PAGES = 604;

  // Auto-save last page
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("mushaf_last_page", String(currentPage));
    }
  }, [currentPage]);

  const goNext = useCallback(() => {
    setCurrentPage((p) => Math.min(p + 1, TOTAL_PAGES));
    setIsLoading(true);
  }, []);

  const goPrev = useCallback(() => {
    setCurrentPage((p) => Math.max(p - 1, 1));
    setIsLoading(true);
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

  const handleBookmark = () => {
    toast.success(`Страница ${currentPage} сохранена`);
  };

  const pageImageUrl = `${QURAN_PAGE_CDN}${currentPage}.png`;

  const content = (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      {/* Controls */}
      <div className="flex items-center justify-between w-full max-w-lg px-2">
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
          <button onClick={handleBookmark} className="text-muted hover:text-primary-500 transition-colors">
            <BookmarkPlus className="h-4 w-4" />
          </button>
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

      {/* Page Image */}
      <div className="relative w-full max-w-lg rounded-2xl border border-border bg-white overflow-hidden shadow-card min-h-[500px] flex items-center justify-center">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-500 border-t-transparent" />
          </div>
        )}
        <img
          src={pageImageUrl}
          alt={`Страница ${currentPage}`}
          className="w-full h-auto"
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            toast.error("Не удалось загрузить страницу");
          }}
          draggable={false}
        />
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
              setIsLoading(true);
            }
          }}
          className="w-20 rounded-xl border border-border bg-surface px-3 py-2 text-center text-sm font-bold text-main focus:border-primary-500 focus:outline-none"
        />
        <span className="text-xs text-muted">из {TOTAL_PAGES}</span>
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
