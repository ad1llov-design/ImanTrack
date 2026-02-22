"use client";

import { useEffect, useState, useRef } from "react";
import { getSurahVerses, Verse } from "../services/quran_api.service";
import { upsertQuranLog } from "../services/quran.persistence";
import { format } from "date-fns";
import { cn } from "@shared/lib/utils";
import { motion } from "framer-motion";

interface QuranReaderProps {
  surahId: number;
  onBack: () => void;
}

export function QuranReader({ surahId, onBack }: QuranReaderProps) {
  const [verses, setVerses] = useState<Verse[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentVerseIndex, setCurrentVerseIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetch() {
      setLoading(true);
      const data = await getSurahVerses(surahId);
      setVerses(data);
      setLoading(false);
    }
    fetch();
  }, [surahId]);

  const handleMarkAsRead = async () => {
    // Each surah read counts as a "page" or just progress for the day
    await upsertQuranLog({
      date: format(new Date(), "yyyy-MM-dd"),
      surah: surahId,
      pages_read: 1, // Logic: 1 surah = 1 point/page for now
    });
    onBack();
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 space-y-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        <p className="text-sm text-neutral-500 animate-pulse">Загрузка откровений...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[75vh]">
      <div className="mb-6 flex items-center justify-between border-b border-white/5 pb-4">
        <button onClick={onBack} className="text-sm text-neutral-400 hover:text-white transition-colors flex items-center gap-2">
          ← К списку
        </button>
        <span className="text-xs uppercase tracking-[0.2em] text-primary-400">Чтение</span>
        <button 
          onClick={handleMarkAsRead}
          className="px-4 py-1.5 rounded-lg bg-primary/20 border border-primary/30 text-primary-400 text-xs font-bold hover:bg-primary/30 transition-all"
        >
          Завершить
        </button>
      </div>

      <div 
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto space-y-12 px-2 py-4 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-white/10"
      >
        {verses.map((verse, idx) => {
          const isCurrent = idx === currentVerseIndex;
          return (
            <motion.div 
              key={verse.id}
              onClick={() => setCurrentVerseIndex(idx)}
              className={cn(
                "group relative flex flex-col items-end gap-6 cursor-pointer transition-all duration-500",
                isCurrent ? "opacity-100 scale-100" : "opacity-40 hover:opacity-70 scale-[0.98]"
              )}
            >
               {/* Verse Number Indicator */}
               <div className="absolute -left-2 top-0 flex h-6 w-6 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[10px] text-neutral-500">
                  {idx + 1}
               </div>

               {/* Arabic Text */}
               <p className="text-display-arabic text-right text-3xl md:text-4xl text-neutral-100 leading-[2.5] tracking-wide dir-rtl">
                 {verse.text_uthmani}
               </p>
               
               {isCurrent && (
                 <motion.div 
                   layoutId="active-verse-indicator"
                   className="absolute -right-4 top-0 h-full w-1 rounded-full bg-primary"
                 />
               )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
