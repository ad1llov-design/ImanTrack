"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { motion } from "framer-motion";

import { cn } from "@shared/lib/utils";
import { useCountdown } from "../hooks/useCountdown";
import { usePrayerStore } from "../store/prayerStore";
import { getPrayerLogs, upsertPrayerLog, PrayerLog } from "../services/prayer.persistence";
import { CircularProgress } from "@shared/components/ui/CircularProgress";
import { GlassCard } from "@shared/components/ui/GlassCard";
import type { PrayerStatus as DBPrayerStatus, PrayerName as DBPrayerName } from "@shared/types/supabase";

export function PrayerWidget({ className }: { className?: string }) {
  const { prayers, currentPrayer, nextPrayer, isLoading } = usePrayerStore();
  const { formatted } = useCountdown(nextPrayer?.dateTime ?? null);
  
  // Local state for interactive logs
  const [logs, setLogs] = useState<Record<string, PrayerLog>>({});
  const todayStr = format(new Date(), "yyyy-MM-dd");

  const fardhPrayers = prayers.filter((p) => p.info.isFard);

  // Fetch today's logs on mount
  useEffect(() => {
    async function fetchLogs() {
      try {
        const todayLogs = await getPrayerLogs(todayStr);
        const logsMap = todayLogs.reduce((acc, log) => {
          acc[log.prayerName] = log;
          return acc;
        }, {} as Record<string, PrayerLog>);
        setLogs(logsMap);
      } catch (e) {
        console.error("Failed to load today's prayer logs:", e);
      }
    }
    fetchLogs();
  }, [todayStr]);

  // Toggle prayer status
  const togglePrayer = async (name: string, isPassed: boolean) => {
    const pName = name as DBPrayerName;
    const currentLog = logs[pName];
    
    let newStatus: DBPrayerStatus = "completed";
    if (currentLog?.status === "completed") newStatus = "missed";
    else if (currentLog?.status === "missed") newStatus = "skipped";
    
    // Optimistic UI update
    const newLog: PrayerLog = {
      userId: "", // Handled by server/persistence layer
      prayerName: pName,
      date: todayStr,
      status: newStatus,
      onTime: true,
    };
    
    setLogs(prev => ({ ...prev, [pName]: newLog }));

    // Persist to DB
    await upsertPrayerLog(newLog);
  };

  if (isLoading) {
    return (
      <GlassCard className={cn("flex min-h-[16rem] items-center justify-center", className)}>
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-500 border-t-transparent" />
      </GlassCard>
    );
  }

  // Calculate progress
  const completedCount = Object.values(logs).filter(l => l.status === "completed").length;
  const totalFard = fardhPrayers.length || 5;
  const progressPercent = (completedCount / totalFard) * 100;

  return (
    <GlassCard className={cn("relative overflow-hidden", className)}>
      <div className="flex flex-col items-center justify-center gap-6">
        
        {/* Header Title */}
        <div className="flex w-full items-center justify-between">
          <h2 className="text-sm font-semibold tracking-wider text-neutral-300">ПРОГРЕСС НАМАЗОВ</h2>
        </div>

        {/* Central Circular Progress */}
        <CircularProgress value={progressPercent} size={140} strokeWidth={10}>
          <div className="flex flex-col items-center justify-center">
            {nextPrayer ? (
              <>
                <span className="text-2xl font-bold tabular-nums text-white">{formatted}</span>
                <span className="text-[0.65rem] uppercase tracking-wider text-primary-400">до {nextPrayer.info.nameRu}</span>
              </>
            ) : (
              <span className="text-xl font-bold text-white">Альхамдулиллах</span>
            )}
          </div>
        </CircularProgress>

        {/* Status Text under circle */}
        <p className="font-mono text-sm font-medium text-neutral-300">
          Выполнено: <span className="text-white">{completedCount}</span> / {totalFard}
        </p>

        {/* Interactive 5 icons row */}
        <div className="flex w-full items-center justify-between gap-1 border-t border-white/10 pt-4">
          {fardhPrayers.map((prayer) => {
            const pName = prayer.name;
            const log = logs[pName];
            const isCompleted = log?.status === "completed";
            const isMissed = log?.status === "missed";
            const isActive = currentPrayer?.name === pName;
            
            return (
              <motion.button
                key={pName}
                whileTap={{ scale: 0.9 }}
                onClick={() => togglePrayer(pName, prayer.status === "passed")}
                className={cn(
                  "relative flex flex-col items-center justify-center gap-1.5 p-2 transition-all",
                  isCompleted ? "text-primary-400 drop-shadow-glow" : (isMissed ? "text-red-400/80" : "text-neutral-500 hover:text-neutral-300"),
                  isActive && !isCompleted && !isMissed && "text-white animate-pulse"
                )}
              >
                <div className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-2xl border border-white/5 bg-white/5 backdrop-blur-md",
                  isCompleted && "bg-primary-500/20 border-primary-500/30",
                  isMissed && "bg-red-500/10 border-red-500/20"
                )}>
                  <span className="text-xl mb-0.5">{prayer.info.icon}</span>
                </div>
                <span className="text-[0.6rem] font-medium tracking-wide uppercase">{prayer.info.nameRu}</span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </GlassCard>
  );
}
