"use client";

import { useEffect, useState } from "react";
import { getSurahList, Surah } from "../services/quran_api.service";
import { cn } from "@shared/lib/utils";

interface SurahListProps {
  onSelect: (surahId: number) => void;
  selectedSurahId?: number;
}

export function SurahList({ onSelect, selectedSurahId }: SurahListProps) {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      setLoading(true);
      const list = await getSurahList();
      setSurahs(list);
      setLoading(false);
    }
    fetch();
  }, []);

  if (loading) {
    return (
      <div className="space-y-2">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="h-14 w-full animate-pulse rounded-xl bg-white/5" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-2 overflow-y-auto max-h-[60vh] pr-2 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full">
      {surahs.map((surah) => {
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
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface border border-border text-xs font-bold text-muted shadow-inner">
                {surah.id}
              </span>
              <div className="text-left">
                <h4 className="text-sm font-bold text-main">{surah.name_simple}</h4>
                <p className="text-[10px] uppercase tracking-wider text-muted">
                   {surah.translated_name.name} • {surah.verses_count} аятов
                </p>
              </div>
            </div>
            <span className="font-arabic text-2xl text-primary-600">
              {surah.name_arabic}
            </span>
          </button>
        );
      })}
    </div>
  );
}
