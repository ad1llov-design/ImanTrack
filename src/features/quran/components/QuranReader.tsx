"use client";

import { useEffect, useState } from "react";
import { getSurahVerses, Verse, QuranScriptType, Translator, getTranslators } from "../services/quran_api.service";
import { cn } from "@shared/lib/utils";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Type } from "lucide-react";
import { useLanguage } from "@shared/i18n/LanguageContext";

interface QuranReaderProps {
  surahId: number;
  onBack: () => void;
}

const SCRIPT_OPTIONS: { id: QuranScriptType; label: string }[] = [
  { id: "quran-uthmani", label: "Усмани (Медина)" },
  { id: "quran-indopak", label: "Индо-Пак" },
  { id: "quran-simple", label: "Простой шрифт" },
];

/**
 * Quran Reader — fetches and displays surah text from API.
 * No auth, no bookmarks, no progress saving.
 */
export function QuranReader({ surahId, onBack }: QuranReaderProps) {
  const { t, language } = useLanguage();
  const [verses, setVerses] = useState<Verse[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentVerseIndex, setCurrentVerseIndex] = useState(0);
  const [scriptType, setScriptType] = useState<QuranScriptType>("quran-uthmani");
  const [showSettings, setShowSettings] = useState(false);
  
  const [translators, setTranslators] = useState<Translator[]>([]);
  const [selectedTranslatorId, setSelectedTranslatorId] = useState<number | null>(null);

  useEffect(() => {
    // Load translators dynamically when language changes
    getTranslators(language).then(data => {
      setTranslators(data);
    });

    // Check localStorage for saved translator
    const savedId = localStorage.getItem(`quran_translator_${language}`);
    if (savedId) {
      setSelectedTranslatorId(Number(savedId));
    } else {
      setSelectedTranslatorId(null);
    }
  }, [language]);

  const handleTranslatorSelect = (id: number) => {
    setSelectedTranslatorId(id);
    localStorage.setItem(`quran_translator_${language}`, String(id));
  };

  useEffect(() => {
    async function fetchVerses() {
      setLoading(true);
      try {
        const data = await getSurahVerses(surahId, scriptType, language, selectedTranslatorId);
        setVerses(data);
        setCurrentVerseIndex(0);
      } catch (error) {
        console.error("Failed to load surah:", error);
        toast.error(t("common.error"));
      } finally {
        setLoading(false);
      }
    }
    fetchVerses();
  }, [surahId, scriptType, language, t, selectedTranslatorId]);

  useEffect(() => {
    if (verses.length > 0 && currentVerseIndex >= 0) {
      const el = document.getElementById(`verse-${currentVerseIndex}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [currentVerseIndex, verses.length]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 space-y-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary-500 border-t-transparent" />
        <p className="text-sm text-muted animate-pulse">{t("common.loading")}</p>
      </div>
    );
  }

  if (verses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 space-y-4">
        <p className="text-lg font-semibold text-main">{t("common.error")}</p>
        <div className="flex gap-3">
          <button onClick={onBack} className="px-4 py-2 rounded-xl border border-border text-sm font-bold text-muted hover:text-main transition-colors">
            ← {t("common.back")}
          </button>
          <button onClick={() => window.location.reload()} className="px-4 py-2 rounded-xl bg-primary-500 text-sm font-bold text-white hover:bg-primary-600 transition-colors">
            Повторить
          </button>
        </div>
      </div>
    );
  }

  const fontFamily = scriptType === "quran-indopak" 
    ? "var(--font-indopak), 'Scheherazade New', serif" 
    : "var(--font-amiri), Amiri, serif";

  return (
    <div className="flex flex-col" style={{ height: "calc(100vh - 200px)" }}>
      <div className="mb-6 flex items-center justify-between border-b border-border pb-4">
        <button onClick={onBack} className="text-sm text-muted hover:text-main transition-colors flex items-center gap-2">
          ← {t("quran.surahs")}
        </button>
        <span className="text-xs uppercase tracking-[0.2em] text-primary-500">{t("nav.quran")}</span>
        
        <div className="relative">
          <button 
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 rounded-lg hover:bg-surface text-muted hover:text-main transition-colors"
          >
            <Type className="w-5 h-5" />
          </button>
          
          {showSettings && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-surface border border-border rounded-xl shadow-card z-50 overflow-hidden">
              <div className="p-2 border-b border-border bg-neutral-50 dark:bg-neutral-900/50">
                <span className="text-xs font-bold text-muted uppercase tracking-wider px-2 block">Шрифт арабского</span>
              </div>
              <div className="p-1">
                {SCRIPT_OPTIONS.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => {
                      setScriptType(option.id);
                    }}
                    className={cn(
                      "w-full text-left px-3 py-2 text-sm rounded-lg transition-colors",
                      scriptType === option.id 
                        ? "bg-primary-50 text-primary-600 dark:bg-primary-950/30 dark:text-primary-400 font-medium" 
                        : "text-main hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    )}
                  >
                    {t(`quran.${option.id.replace('-', '_')}` as any)}
                  </button>
                ))}
              </div>

              {translators.length > 0 && (
                <>
                  <div className="p-2 border-y border-border bg-neutral-50 dark:bg-neutral-900/50 mt-1">
                    <span className="text-xs font-bold text-muted uppercase tracking-wider px-2 block">
                      {t("quran.choose_translator" as any) || "Выберите переводчика"}
                    </span>
                  </div>
                  <div className="p-1 max-h-48 overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-border">
                    <button
                      onClick={() => handleTranslatorSelect(0)}
                      className={cn(
                        "w-full text-left px-3 py-2 text-sm rounded-lg transition-colors",
                        selectedTranslatorId === null || selectedTranslatorId === 0
                          ? "bg-primary-50 text-primary-600 dark:bg-primary-950/30 dark:text-primary-400 font-medium" 
                          : "text-main hover:bg-neutral-100 dark:hover:bg-neutral-800"
                      )}
                    >
                      По умолчанию (Стандарт)
                    </button>
                    {translators.map((tItem) => (
                      <button
                        key={tItem.id}
                        onClick={() => handleTranslatorSelect(tItem.id)}
                        className={cn(
                          "w-full text-left px-3 py-2 text-sm rounded-lg transition-colors",
                          selectedTranslatorId === tItem.id 
                            ? "bg-primary-50 text-primary-600 dark:bg-primary-950/30 dark:text-primary-400 font-medium" 
                            : "text-main hover:bg-neutral-100 dark:hover:bg-neutral-800"
                        )}
                      >
                        {tItem.name}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      <div
        className="flex-1 overflow-y-auto space-y-12 px-2 py-4 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-border pb-32"
      >
        {verses.map((verse, idx) => {
          const verseNum = idx + 1;
          const isCurrent = idx === currentVerseIndex;

          return (
            <motion.div
              key={verse.id}
              id={`verse-${idx}`}
              onClick={() => setCurrentVerseIndex(idx)}
              className={cn(
                "group relative flex flex-col items-end gap-4 cursor-pointer transition-all duration-500 rounded-2xl p-4",
                isCurrent ? "opacity-100 scale-100 bg-surface shadow-sm border border-primary-500 dark:border-primary-500" : "opacity-60 hover:opacity-100 scale-[0.98] border border-transparent",
              )}
            >
              <div className="absolute -left-3 -top-3">
                <div className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full border text-[10px] font-bold shadow-sm transition-colors",
                  isCurrent ? "bg-primary-500 text-white border-primary-500" : "bg-surface border-border text-muted"
                )}>
                  {verseNum}
                </div>
              </div>

              <p 
                className={cn(
                  "text-right text-main leading-[2.5] tracking-wide w-full transition-colors",
                  scriptType === "quran-indopak" ? "text-4xl md:text-5xl" : "text-3xl md:text-4xl",
                  isCurrent ? "text-primary-600 dark:text-primary-400 font-bold" : ""
                )} 
                style={{ direction: "rtl", fontFamily }}
              >
                {verse.text_arabic}
              </p>

              {verse.translation && (
                <p className={cn(
                  "text-sm md:text-base leading-relaxed text-right md:text-left w-full border-t border-border pt-4 transition-colors",
                  isCurrent ? "text-main font-semibold" : "text-muted"
                )}>
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

      {/* Audio Player Footer for Ayah-by-Ayah Sync */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md border-t border-border p-4 shadow-lg safe-area-bottom">
        <div className="mx-auto max-w-lg sm:max-w-xl md:max-w-4xl lg:max-w-5xl flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <span className="text-xs font-bold text-muted uppercase tracking-wider">{t("quran.ayahs")} {currentVerseIndex + 1} / {verses.length}</span>
            <span className="text-sm font-semibold text-main">Аудио синхронизация</span>
          </div>
          
          <audio 
            key={`${surahId}-${currentVerseIndex}`}
            controls 
            autoPlay={currentVerseIndex > 0} // Auto-play next verse if it advanced
            onEnded={() => {
              if (currentVerseIndex < verses.length - 1) {
                setCurrentVerseIndex(currentVerseIndex + 1);
              }
            }}
            className="h-10 hover:scale-[1.02] transition-transform outline-none"
            src={`https://everyayah.com/data/Alafasy_128kbps/${String(surahId).padStart(3, '0')}${String(currentVerseIndex + 1).padStart(3, '0')}.mp3`}
          >
            Your browser does not support the audio element.
          </audio>
        </div>
      </div>
    </div>
  );
}
