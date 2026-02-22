"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { GlassCard } from "@shared/components/ui/GlassCard";
import { cn } from "@shared/lib/utils";
import { getQuranLog, upsertQuranLog, type QuranLog } from "../services/quran.persistence";
import { CircularProgress } from "@shared/components/ui/CircularProgress";

export function QuranTracker({ className }: { className?: string }) {
  const [log, setLog] = useState<QuranLog | null>(null);
  const [juz, setJuz] = useState<number>(1);
  const [pagesRead, setPagesRead] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  
  const todayStr = format(new Date(), "yyyy-MM-dd");
  const DAILY_PAGE_GOAL = 5; // Example goal

  useEffect(() => {
    async function fetchLog() {
      setIsLoading(true);
      const todayLog = await getQuranLog(todayStr);
      if (todayLog) {
        setLog(todayLog);
        setJuz(todayLog.juz || 1);
        setPagesRead(todayLog.pages_read || 0);
      }
      setIsLoading(false);
    }
    fetchLog();
  }, [todayStr]);

  const handleSave = async (updates: Partial<QuranLog>) => {
    const newLog = { ...log, ...updates, date: todayStr };
    setLog(newLog as QuranLog);
    await upsertQuranLog(newLog);
  };

  const incrementPages = () => {
    const newVal = pagesRead + 1;
    setPagesRead(newVal);
    handleSave({ pages_read: newVal, juz });
  };

  if (isLoading) {
    return (
      <GlassCard className="flex min-h-[20rem] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gold-500 border-t-transparent" />
      </GlassCard>
    );
  }

  const progressPercent = Math.min((pagesRead / DAILY_PAGE_GOAL) * 100, 100);

  return (
    <div className={cn("space-y-6", className)}>
      {/* Hero Stats */}
      <GlassCard className="flex flex-col md:flex-row gap-6 justify-between items-center p-8 bg-gradient-to-br from-surface-dark-secondary to-neutral-900 border-gold-500/20">
        <div className="flex-1 space-y-2">
          <h2 className="text-sm font-semibold tracking-wider text-gold-400 uppercase">Ежедневное чтение</h2>
          <p className="text-3xl font-bold text-white">Прогресс Корана</p>
          <p className="text-sm text-neutral-400">Пусть Коран станет весной вашего сердца.</p>
        </div>

        <div className="flex items-center gap-6">
          <CircularProgress value={progressPercent} size={110} strokeWidth={8} colorClass="text-gold-500" trackColorClass="text-gold-950/20">
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-white">{pagesRead}</span>
              <span className="text-[0.6rem] text-gold-400 uppercase tracking-widest mt-1">из {DAILY_PAGE_GOAL} стр</span>
            </div>
          </CircularProgress>
        </div>
      </GlassCard>

      {/* Pages Tracker */}
      <GlassCard className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-bold text-white">Прочитано Страниц</h3>
            <p className="text-xs text-neutral-400">Отметьте, сколько страниц вы прочитали сегодня</p>
          </div>
          <motion.button 
            whileTap={{ scale: 0.95 }}
            onClick={incrementPages}
            className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-500 text-xl text-white shadow-[0_0_20px_rgba(234,179,8,0.4)] transition-all hover:bg-gold-400"
          >
            +1
          </motion.button>
        </div>

        {/* Visual blocks for pages max 20 just for visual show */}
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: Math.max(DAILY_PAGE_GOAL, pagesRead || 1) }).map((_, i) => (
            <div 
              key={i} 
              className={cn(
                "h-6 w-4 rounded-sm transition-all duration-500 border",
                i < pagesRead ? "bg-gold-400 border-gold-300 shadow-[0_0_8px_rgba(250,204,21,0.5)]" : "bg-neutral-800 border-neutral-700 opacity-50"
              )} 
            />
          ))}
        </div>
      </GlassCard>

      {/* Juz Tracker */}
      <GlassCard className="space-y-6">
        <div>
          <h3 className="text-lg font-bold text-white">Текущий Джуз (1-30)</h3>
          <p className="text-xs text-neutral-400">Какой джуз вы сейчас читаете?</p>
        </div>
        
        <div className="flex overflow-x-auto pb-4 gap-3 snap-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none]">
          {Array.from({ length: 30 }).map((_, i) => {
            const juzNum = i + 1;
            const isCurrent = juz === juzNum;
            const isPassed = juzNum < juz;
            return (
              <button
                key={juzNum}
                onClick={() => { setJuz(juzNum); handleSave({ juz: juzNum, pages_read: pagesRead }); }}
                className={cn(
                  "flex h-16 min-w-[4rem] snap-center shrink-0 flex-col items-center justify-center rounded-2xl border transition-all",
                  isCurrent ? "border-gold-400 bg-gold-500/10 text-gold-400 shadow-[0_0_15px_rgba(234,179,8,0.2)]" : 
                  isPassed ? "border-primary-500/30 bg-primary-500/10 text-primary-500" :
                  "border-white/5 bg-white/5 text-neutral-500 hover:bg-white/10 hover:text-neutral-300"
                )}
              >
                <span className="text-xl font-arabic">{juzNum}</span>
                <span className="text-[0.6rem] uppercase tracking-wider mt-0.5">Джуз</span>
              </button>
            );
          })}
        </div>
      </GlassCard>
    </div>
  );
}
