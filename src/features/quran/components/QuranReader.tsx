"use client";

import { useEffect, useState, useRef } from "react";
import { getSurahVerses, Verse } from "../services/quran_api.service";
import { upsertQuranLog, getQuranBookmarks, toggleQuranBookmark } from "../services/quran.persistence";
import { format } from "date-fns";
import { cn } from "@shared/lib/utils";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Bookmark } from "lucide-react";

interface QuranReaderProps {
  surahId: number;
  onBack: () => void;
}

export function QuranReader({ surahId, onBack }: QuranReaderProps) {
  const [verses, setVerses] = useState<Verse[]>([]);
  const [bookmarkedAyahs, setBookmarkedAyahs] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [currentVerseIndex, setCurrentVerseIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetch() {
      setLoading(true);
      try {
        // Load verses first — this is the critical path
        const data = await getSurahVerses(surahId);
        setVerses(data);
        
        // Load bookmarks separately — non-critical, don't break if it fails
        try {
          const bookmarks = await getQuranBookmarks(surahId);
          setBookmarkedAyahs(bookmarks);
        } catch (bookmarkError) {
          console.warn("Failed to load bookmarks (non-critical):", bookmarkError);
          setBookmarkedAyahs([]);
        }
      } catch (error) {
        console.error("Failed to load surah:", error);
        toast.error("Не удалось загрузить суру");
      } finally {
        setLoading(false);
      }
    }
    fetch();
  }, [surahId]);

  const handleToggleBookmark = async (verseNum: number) => {
    try {
      const isAdded = await toggleQuranBookmark(surahId, verseNum);
      if (isAdded) {
        setBookmarkedAyahs((prev) => [...prev, verseNum]);
        toast.success(`Аят ${verseNum} сохранен в закладки`);
      } else {
        setBookmarkedAyahs((prev) => prev.filter((v) => v !== verseNum));
        toast("Закладка удалена");
      }
    } catch {
      toast.error("Не удалось обновить закладку");
    }
  };

  const handleMarkAsRead = async () => {
    if (isSaving) return;
    setIsSaving(true);

    try {
      await upsertQuranLog({
        date: format(new Date(), "yyyy-MM-dd"),
        surah: surahId,
        pages_read: 1,
      });
      toast.success("Чтение засчитано! Пусть Аллах примет.");
      onBack();
    } catch (error) {
      console.error("Failed to save quran log:", error);
      toast.error("Не удалось сохранить прогресс. Попробуйте ещё раз.");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 space-y-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary-500 border-t-transparent" />
        <p className="text-sm text-muted animate-pulse">Загрузка откровений...</p>
      </div>
    );
  }

  if (verses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 space-y-4">
        <p className="text-lg font-semibold text-main">Не удалось загрузить суру</p>
        <p className="text-sm text-muted">Проверьте интернет-соединение</p>
        <div className="flex gap-3">
          <button onClick={onBack} className="px-4 py-2 rounded-xl border border-border text-sm font-bold text-muted hover:text-main transition-colors">
            ← Назад
          </button>
          <button onClick={() => window.location.reload()} className="px-4 py-2 rounded-xl bg-primary-500 text-sm font-bold text-white hover:bg-primary-600 transition-colors">
            Повторить
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col" style={{ height: "calc(100vh - 200px)" }}>
      <div className="mb-6 flex items-center justify-between border-b border-border pb-4">
        <button onClick={onBack} className="text-sm text-muted hover:text-main transition-colors flex items-center gap-2">
          ← К списку
        </button>
        <span className="text-xs uppercase tracking-[0.2em] text-primary-500">Чтение</span>
        <button
          onClick={handleMarkAsRead}
          disabled={isSaving}
          className="px-4 py-1.5 rounded-lg bg-primary-500/20 border border-primary-500/30 text-primary-500 text-xs font-bold hover:bg-primary-500/30 transition-all disabled:opacity-50"
        >
          {isSaving ? "Сохранение..." : "Завершить"}
        </button>
      </div>

      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto space-y-12 px-2 py-4 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-border"
      >
        {verses.map((verse, idx) => {
          const verseNum = idx + 1;
          const isCurrent = idx === currentVerseIndex;
          const isBookmarked = bookmarkedAyahs.includes(verseNum);

          return (
            <motion.div
              key={verse.id}
              onClick={() => setCurrentVerseIndex(idx)}
              className={cn(
                "group relative flex flex-col items-end gap-4 cursor-pointer transition-all duration-500 rounded-2xl p-4",
                isCurrent ? "opacity-100 scale-100 bg-surface shadow-sm border border-border" : "opacity-60 hover:opacity-100 scale-[0.98] border border-transparent",
                isBookmarked && !isCurrent && "border-primary-500/30 bg-primary-50/5",
              )}
            >
              {/* Actions & Number Indicator */}
              <div className="absolute -left-3 -top-3 flex items-center gap-1">
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full border text-[10px] font-bold shadow-sm transition-colors",
                    isBookmarked ? "bg-primary-500 border-primary-500 text-white" : "bg-surface border-border text-muted",
                  )}
                >
                  {verseNum}
                </div>
                {isCurrent && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleBookmark(verseNum);
                    }}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-surface border border-border text-muted hover:text-primary-500 transition-colors shadow-sm"
                  >
                    <Bookmark className={cn("h-4 w-4", isBookmarked && "fill-primary-500 text-primary-500")} />
                  </button>
                )}
              </div>

              {/* Arabic Text */}
              <p className="text-right text-3xl md:text-4xl text-main leading-[2.5] tracking-wide w-full" style={{ direction: "rtl", fontFamily: "var(--font-amiri), Amiri, serif" }}>
                {verse.text_uthmani}
              </p>

              {/* Translation */}
              {verse.translation && (
                <p className="text-sm md:text-base text-muted leading-relaxed text-right md:text-left w-full border-t border-border pt-4">
                  {verse.translation}
                </p>
              )}

              {isCurrent && (
                <motion.div
                  layoutId="active-verse-indicator"
                  className="absolute -right-1 top-1/2 -translate-y-1/2 h-1/2 w-1 rounded-full bg-primary-500"
                />
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
