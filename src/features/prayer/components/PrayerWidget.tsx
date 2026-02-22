"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { toast } from "sonner";

import { cn } from "@shared/lib/utils";
import { useCountdown } from "../hooks/useCountdown";
import { usePrayerTimes } from "../hooks/usePrayerTimes";
import { getDailyProgress, upsertDailyProgress, DailyProgress } from "../../tracker/services/daily_progress.service";
import { CircularProgress } from "@shared/components/ui/CircularProgress";
import { GlassCard } from "@shared/components/ui/GlassCard";

export function PrayerWidget({ className }: { className?: string }) {
  const { prayers, currentPrayer, nextPrayer, isLoading } = usePrayerTimes();
  const { formatted } = useCountdown(nextPrayer?.dateTime ?? null);
  
  const [progress, setProgress] = useState<Partial<DailyProgress>>({
    prayers: { fajr: false, dhuhr: false, asr: false, maghrib: false, isha: false },
    nafil_count: 0
  });
  const todayStr = format(new Date(), "yyyy-MM-dd");

  const fardhPrayers = prayers.filter((p) => p.info.isFard);

  useEffect(() => {
    async function fetchLogs() {
      try {
        const data = await getDailyProgress(todayStr);
        if (data) {
          setProgress(data);
        }
      } catch (e) {
        console.error("Failed to load daily progress:", e);
      }
    }
    fetchLogs();
  }, [todayStr]);

  const togglePrayer = async (name: string) => {
    const currentPrayers = (progress.prayers as Record<string, boolean>) || {};
    const isCompleted = currentPrayers[name];
    
    const newPrayers = { ...currentPrayers, [name]: !isCompleted };
    setProgress(prev => ({ ...prev, prayers: newPrayers }));

    await upsertDailyProgress(todayStr, { prayers: newPrayers });
    
    if (!isCompleted) {
      toast.success("Намаз выполнен! Пусть Аллах примет.");
    }
  };

  const addNafil = async () => {
    const currentCount = progress.nafil_count || 0;
    const newCount = currentCount + 1;
    setProgress(prev => ({ ...prev, nafil_count: newCount }));
    await upsertDailyProgress(todayStr, { nafil_count: newCount });
    toast.success("+1 Нафиль. МашаАллах!");
  };

  if (isLoading) {
    return (
      <div className={cn("relative overflow-hidden rounded-3xl border border-border bg-surface shadow-card p-6", className)}>
        <div className="flex flex-col items-center justify-center gap-6">
          <div className="flex w-full items-center justify-between">
            <h2 className="text-sm font-semibold tracking-wider text-muted uppercase">Прогресс Намазов</h2>
            <div className="h-6 w-16 bg-border rounded-full animate-pulse" />
          </div>
          <div className="h-36 w-36 rounded-full bg-border animate-pulse" />
          <div className="h-4 w-24 bg-border rounded-full animate-pulse" />
          <div className="flex w-full items-center justify-between gap-2 border-t border-border pt-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5 p-2 gap-y-2">
                <div className="h-12 w-12 rounded-2xl bg-border animate-pulse" />
                <div className="h-2 w-8 bg-border rounded-full animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const record = (progress.prayers as Record<string, boolean>) || {};
  const completedCount = Object.values(record).filter(Boolean).length;
  const totalFard = fardhPrayers.length || 5;
  const progressPercent = (completedCount / totalFard) * 100;

  return (
    <div className={cn("relative overflow-hidden rounded-3xl border border-border bg-surface shadow-card p-6", className)}>
      <div className="flex flex-col items-center justify-center gap-6">
        
        {/* Header Title */}
        <div className="flex w-full items-center justify-between">
          <h2 className="text-sm font-semibold tracking-wider text-muted uppercase">Прогресс Намазов</h2>
          <button 
            onClick={addNafil}
            className="text-xs font-bold text-primary-500 bg-primary-50 rounded-full px-3 py-1 hover:bg-primary-100 transition-colors"
          >
            + Нафиль ({progress.nafil_count || 0})
          </button>
        </div>

        {/* Central Circular Progress - solid outline and shadow */}
        <CircularProgress 
          value={progressPercent} 
          size={140} 
          strokeWidth={10} 
          colorClass="text-primary-500 drop-shadow-md"
          trackColorClass="text-border"
        >
          <div className="flex flex-col items-center justify-center">
            {nextPrayer ? (
              <>
                <span className="text-2xl font-bold tabular-nums text-main">{formatted}</span>
                <span className="text-[0.65rem] uppercase tracking-wider text-muted">до {nextPrayer.info.nameRu}</span>
              </>
            ) : (
              <span className="text-xl font-bold text-main">Молодец</span>
            )}
          </div>
        </CircularProgress>

        {/* Status Text under circle */}
        <p className="font-mono text-sm font-medium text-muted">
          Выполнено: <span className="text-main">{completedCount}</span> / {totalFard}
        </p>

        {/* Interactive 5 icons row - Solid styles */}
        <div className="flex w-full items-center justify-between gap-2 border-t border-border pt-4">
          {fardhPrayers.map((prayer) => {
            const pName = prayer.name;
            const isCompleted = record[pName];
            const isActive = currentPrayer?.name === pName;
            
            return (
              <motion.button
                key={pName}
                whileTap={{ scale: 0.9 }}
                onClick={() => togglePrayer(pName)}
                className={cn(
                  "relative flex flex-col items-center justify-center gap-1.5 p-2 transition-all",
                  isCompleted ? "text-primary-600" : "text-muted hover:text-main",
                  isActive && !isCompleted && "animate-pulse"
                )}
              >
                <div className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-2xl border bg-surface transition-colors shadow-sm",
                  isCompleted ? "bg-primary-50 border-primary-500 text-primary-600 shadow-glow" : "border-border",
                  isActive && !isCompleted && "border-primary-400 text-primary-500 ring-2 ring-primary-100"
                )}>
                  <span className="text-xl mb-0.5">{prayer.info.icon}</span>
                </div>
                <span className="text-[0.6rem] font-bold uppercase">{prayer.info.nameRu}</span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
