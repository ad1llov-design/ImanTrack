"use client";

import { useEffect, useState } from "react";
import { getSurahVerses, Verse } from "../services/quran_api.service";
import { cn } from "@shared/lib/utils";
import { motion } from "framer-motion";
import { toast } from "sonner";

interface QuranReaderProps {
  surahId: number;
  onBack: () => void;
}

/**
 * Quran Reader — fetches and displays surah text from API.
 * No auth, no bookmarks, no progress saving.
 */
export function QuranReader({ surahId, onBack }: QuranReaderProps) {
  const [verses, setVerses] = useState<Verse[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentVerseIndex, setCurrentVerseIndex] = useState(0);

  useEffect(() => {
    async function fetchVerses() {
      setLoading(true);
      try {
        const data = await getSurahVerses(surahId);
        setVerses(data);
      } catch (error) {
        console.error("Failed to load surah:", error);
        toast.error("Не удалось загрузить суру");
      } finally {
        setLoading(false);
      }
    }
    fetchVerses();
  }, [surahId]);

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
        <div className="w-16" /> {/* spacer for alignment */}
      </div>

      <div
        className="flex-1 overflow-y-auto space-y-12 px-2 py-4 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-border"
      >
        {verses.map((verse, idx) => {
          const verseNum = idx + 1;
          const isCurrent = idx === currentVerseIndex;

          return (
            <motion.div
              key={verse.id}
              onClick={() => setCurrentVerseIndex(idx)}
              className={cn(
                "group relative flex flex-col items-end gap-4 cursor-pointer transition-all duration-500 rounded-2xl p-4",
                isCurrent ? "opacity-100 scale-100 bg-surface shadow-sm border border-border" : "opacity-60 hover:opacity-100 scale-[0.98] border border-transparent",
              )}
            >
              {/* Verse Number */}
              <div className="absolute -left-3 -top-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border bg-surface border-border text-[10px] font-bold shadow-sm text-muted">
                  {verseNum}
                </div>
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
