"use client";

import { useEffect, useState } from "react";
import { getSurahList, Surah } from "../services/quran_api.service";
import { cn } from "@shared/lib/utils";
import { Search } from "lucide-react";
import { useLanguage } from "@shared/i18n/LanguageContext";

interface SurahListProps {
  onSelect: (surahId: number) => void;
  selectedSurahId?: number;
}

export function SurahList({ onSelect, selectedSurahId }: SurahListProps) {
  const { t } = useLanguage();
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetch() {
      setLoading(true);
      const list = await getSurahList();
      setSurahs(list);
      setLoading(false);
    }
    fetch();
  }, []);

  const filteredSurahs = surahs.filter((s) => {
    const q = searchQuery.toLowerCase();
    return (
      s.name_simple.toLowerCase().includes(q) ||
      s.translated_name.name.toLowerCase().includes(q) ||
      s.name_arabic.includes(q)
    );
  });

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-12 w-full animate-pulse rounded-xl bg-surface border border-border" />
        <div className="space-y-2">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="h-14 w-full animate-pulse rounded-xl bg-surface border border-border" />
          ))}
        </div>
      </div>
    );
  }

  const surahJuzMap: Record<number, number> = {
    1: 1, 2: 1, 3: 3, 4: 4, 5: 6, 6: 7, 7: 8, 8: 9, 9: 10, 10: 11,
    11: 11, 12: 12, 13: 13, 14: 13, 15: 14, 16: 14, 17: 15, 18: 15,
    19: 16, 20: 16, 21: 17, 22: 17, 23: 18, 24: 18, 25: 18, 26: 19,
    27: 19, 28: 20, 29: 20, 30: 21, 31: 21, 32: 21, 33: 21, 34: 22,
    35: 22, 36: 22, 37: 23, 38: 23, 39: 23, 40: 24, 41: 24, 42: 25,
    43: 25, 44: 25, 45: 25, 46: 26, 47: 26, 48: 26, 49: 26, 50: 26,
    51: 26, 52: 27, 53: 27, 54: 27, 55: 27, 56: 27, 57: 27, 58: 28,
    59: 28, 60: 28, 61: 28, 62: 28, 63: 28, 64: 28, 65: 28, 66: 28,
    67: 29, 68: 29, 69: 29, 70: 29, 71: 29, 72: 29, 73: 29, 74: 29,
    75: 29, 76: 29, 77: 29, 78: 30, 79: 30, 80: 30, 81: 30, 82: 30,
    83: 30, 84: 30, 85: 30, 86: 30, 87: 30, 88: 30, 89: 30, 90: 30,
    91: 30, 92: 30, 93: 30, 94: 30, 95: 30, 96: 30, 97: 30, 98: 30,
    99: 30, 100: 30, 101: 30, 102: 30, 103: 30, 104: 30, 105: 30,
    106: 30, 107: 30, 108: 30, 109: 30, 110: 30, 111: 30, 112: 30,
    113: 30, 114: 30
  };

  const juzKeys = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted pointer-events-none" />
        <input 
          type="text" 
          placeholder={t("quran.search")}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-xl border border-border bg-surface pl-12 pr-4 py-3 text-sm text-main placeholder-muted focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 transition-colors shadow-sm"
        />
      </div>

      <div className="space-y-6 overflow-y-auto max-h-[60vh] pr-2 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-border [&::-webkit-scrollbar-thumb]:rounded-full">
        {juzKeys.map((juz) => {
          const surahsInJuz = filteredSurahs.filter((s) => surahJuzMap[s.id] === juz);

          if (surahsInJuz.length === 0) return null;

          return (
            <div key={juz} className="w-full space-y-2">
              <h2 className="text-sm font-bold text-neutral-500 uppercase tracking-widest px-1">
                Джуз {juz}
              </h2>
              {surahsInJuz.map((surah) => {
                const isActive = surah.id === selectedSurahId;
                return (
                  <button
                    key={surah.id}
                    onClick={() => onSelect(surah.id)}
                    className={cn(
                      "flex w-full items-center justify-between rounded-xl p-4 transition",
                      isActive 
                        ? "bg-neutral-800 border border-neutral-700 text-neutral-100 shadow-lg" 
                        : "bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <span className="flex h-10 w-10 min-w-10 items-center justify-center rounded-full bg-green-600 text-white text-xs font-bold shadow-sm">
                        {surah.id}
                      </span>
                      <div className="text-left">
                        <h4 className="text-sm font-bold">{surah.name_simple}</h4>
                        <p className="text-[10px] uppercase tracking-wider text-neutral-400 line-clamp-1">
                           {surah.translated_name.name} • {surah.verses_count} {t("quran.ayahs")}
                        </p>
                      </div>
                    </div>
                    <span className="font-arabic text-2xl text-green-500">
                      {surah.name_arabic}
                    </span>
                  </button>
                );
              })}
            </div>
          );
        })}
        {filteredSurahs.length === 0 && (
          <div className="text-center py-8 text-neutral-500 text-sm">
            {t("quran.not_found")}
          </div>
        )}
      </div>
    </div>
  );
}
