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

      <div className="space-y-2 overflow-y-auto max-h-[60vh] pr-2 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-border [&::-webkit-scrollbar-thumb]:rounded-full">
        {filteredSurahs.map((surah) => {
          const isActive = surah.id === selectedSurahId;
          return (
            <button
              key={surah.id}
              onClick={() => onSelect(surah.id)}
              className={cn(
                "flex w-full items-center justify-between rounded-xl border p-4 transition-all",
                isActive 
                  ? "border-primary-500 bg-primary-50 shadow-sm" 
                  : "border-border bg-surface hover:border-primary-300 shadow-sm"
              )}
            >
              <div className="flex items-center gap-4">
                <span className="flex h-10 w-10 min-w-10 items-center justify-center rounded-xl bg-surface border border-border text-xs font-bold text-muted shadow-inner">
                  {surah.id}
                </span>
                <div className="text-left">
                  <h4 className="text-sm font-bold text-main">{surah.name_simple}</h4>
                  <p className="text-[10px] uppercase tracking-wider text-muted line-clamp-1">
                     {surah.translated_name.name} • {surah.verses_count} {t("quran.ayahs")}
                  </p>
                </div>
              </div>
              <span className="font-arabic text-2xl text-primary-600">
                {surah.name_arabic}
              </span>
            </button>
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
