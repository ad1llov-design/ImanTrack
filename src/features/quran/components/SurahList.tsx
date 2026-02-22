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
                ? "border-primary-500 bg-primary/10" 
                : "border-white/5 bg-white/5 hover:border-white/20 hover:bg-white/[0.08]"
            )}
          >
            <div className="flex items-center gap-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-900 text-xs font-bold text-neutral-400">
                {surah.id}
              </span>
              <div className="text-left">
                <h4 className="text-sm font-bold text-neutral-100">{surah.name_simple}</h4>
                <p className="text-[10px] uppercase tracking-wider text-neutral-500">
                   {surah.translated_name.name} • {surah.verses_count} аятов
                </p>
              </div>
            </div>
            <span className="font-arabic text-xl text-primary-400">
              {surah.name_arabic}
            </span>
          </button>
        );
      })}
    </div>
  );
}
