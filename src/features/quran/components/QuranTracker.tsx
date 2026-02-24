"use client";

import { useState } from "react";
import { SurahList } from "./SurahList";
import { QuranReader } from "./QuranReader";
import { MushafReader } from "./MushafReader";
import { cn } from "@shared/lib/utils";
import { BookOpen, BookImage } from "lucide-react";
import { useLanguage } from "@shared/i18n/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";

type QuranMode = "text" | "mushaf";

/**
 * Quran Tracker — text reader + mushaf reader toggle.
 * No auth, no progress tracking. Pure reading.
 */
export function QuranTracker({ className }: { className?: string }) {
  const { t } = useLanguage();
  const [selectedSurahId, setSelectedSurahId] = useState<number | null>(null);
  const [mode, setMode] = useState<QuranMode>("text");

  return (
    <div className={cn("w-full", className)}>
      {/* Mode Toggle */}
      <div className="flex items-center gap-2 mb-6 p-1 rounded-xl bg-surface border border-border w-fit">
        <button
          onClick={() => { setMode("text"); setSelectedSurahId(null); }}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all",
            mode === "text" 
              ? "bg-primary-500 text-white shadow-sm" 
              : "text-muted hover:text-main"
          )}
        >
          <BookOpen className="h-4 w-4" />
          {t("quran.text")}
        </button>
        <button
          onClick={() => setMode("mushaf")}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all",
            mode === "mushaf" 
              ? "bg-primary-500 text-white shadow-sm" 
              : "text-muted hover:text-main"
          )}
        >
          <BookImage className="h-4 w-4" />
          {t("quran.mushaf")}
        </button>
      </div>

      <AnimatePresence mode="wait">
        {mode === "mushaf" ? (
          <motion.div
            key="mushaf"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <MushafReader />
          </motion.div>
        ) : !selectedSurahId ? (
          <motion.div
            key="list"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-display text-2xl font-bold text-main">{t("quran.choose_surah")}</h2>
              <span className="text-[10px] uppercase tracking-widest text-muted">{t("quran.chapters_count")}</span>
            </div>
            <SurahList onSelect={(id) => setSelectedSurahId(id)} />
          </motion.div>
        ) : (
          <motion.div
            key="reader"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <QuranReader 
              surahId={selectedSurahId} 
              onBack={() => setSelectedSurahId(null)} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
