"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
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
  
  const [isNafilModalOpen, setIsNafilModalOpen] = useState(false);
  const [nafilType, setNafilType] = useState("Раватиб (Сунна)");
  const [nafilAmount, setNafilAmount] = useState(2);

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

  const submitNafil = async () => {
    const currentCount = progress.nafil_count || 0;
    const newCount = currentCount + nafilAmount;
    setProgress(prev => ({ ...prev, nafil_count: newCount }));
    await upsertDailyProgress(todayStr, { nafil_count: newCount });
    setIsNafilModalOpen(false);
    toast.success(`+${nafilAmount} ракаатов (${nafilType}). МашаАллах!`);
    setNafilAmount(2); // reset
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
            onClick={() => setIsNafilModalOpen(true)}
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
        <div className="flex items-center gap-1 font-mono text-sm font-medium text-muted">
          Выполнено: 
          <motion.span 
            key={completedCount}
            initial={{ scale: 1.5, opacity: 0, color: "var(--primary-500)" }}
            animate={{ scale: 1, opacity: 1, color: "var(--text-main)" }}
            className="text-main inline-block font-bold ml-1"
          >
            {completedCount}
          </motion.span>
          <span className="text-muted">из {totalFard}</span>
        </div>

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

      {/* Nafil Modal */}
      <AnimatePresence>
        {isNafilModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-sm bg-surface border border-border rounded-3xl p-6 shadow-card flex flex-col gap-6"
            >
              <div className="text-center">
                <h3 className="text-2xl font-display font-bold text-main mb-2">Нафиль Намаз</h3>
                <p className="text-sm text-muted">Дополнительные молитвы ради довольства Аллаха.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold uppercase text-muted mb-2 block">Вид намаза</label>
                  <select 
                    value={nafilType} 
                    onChange={(e) => setNafilType(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background p-3 text-sm text-main focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                  >
                    <option value="Раватиб (Сунна)">Раватиб (Сунна)</option>
                    <option value="Тахаджуд">Тахаджуд</option>
                    <option value="Духа">Духа</option>
                    <option value="Витр">Витр</option>
                    <option value="Приветствие мечети">Приветствие мечети</option>
                    <option value="Другой нафиль">Другой нафиль</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase text-muted mb-2 block">Количество ракаатов</label>
                  <div className="flex items-center gap-4">
                    <button onClick={() => setNafilAmount(Math.max(2, nafilAmount - 2))} className="h-10 w-10 flex items-center justify-center rounded-xl border border-border bg-background hover:bg-surface text-main font-bold transition-colors">-</button>
                    <span className="flex-1 text-center font-mono text-xl font-bold text-main">{nafilAmount}</span>
                    <button onClick={() => setNafilAmount(nafilAmount + 2)} className="h-10 w-10 flex items-center justify-center rounded-xl border border-border bg-background hover:bg-surface text-main font-bold transition-colors">+</button>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 mt-4">
                <button
                  onClick={submitNafil}
                  className="w-full rounded-xl bg-primary-500 py-3.5 text-sm font-bold text-white shadow-md hover:bg-primary-600 transition-all active:scale-[0.98]"
                >
                  Добавить
                </button>
                <button
                  onClick={() => setIsNafilModalOpen(false)}
                  className="w-full py-2 text-sm font-bold text-muted hover:text-main transition-colors"
                >
                  Отмена
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
