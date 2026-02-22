"use client";

import { useEffect, useState, useMemo } from "react";
import { format, subDays, eachDayOfInterval } from "date-fns";
import { GlassCard } from "@shared/components/ui/GlassCard";
import { cn } from "@shared/lib/utils";
import { getRecentActivity } from "@features/tracker/services/tracker.service";
import { DailyActivity } from "@features/tracker/types/tracker.types";

export function ImanCalendar({ className }: { className?: string }) {
  const [activity, setActivity] = useState<DailyActivity[]>([]);
  const [loading, setLoading] = useState(true);

  // Generate last 28 days for a 4-week calendar overview
  const today = useMemo(() => new Date(), []);
  const days = useMemo(() => {
    return eachDayOfInterval({ start: subDays(today, 27), end: today });
  }, [today]);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await getRecentActivity(28);
      setActivity(data);
      setLoading(false);
    }
    load();
  }, []);

  const getColorClass = (score: number) => {
    if (score === 0) return "bg-white/[0.03]"; // Dark/Empty
    if (score < 20) return "bg-primary-300/40"; // Light Green
    if (score < 50) return "bg-primary-500/60"; // Brighter
    return "bg-primary-500 shadow-glow"; // Saturated/Full
  };

  return (
    <GlassCard className={cn("flex flex-col gap-6", className)}>
      <div className="flex items-center justify-between">
        <h2 className="text-display text-lg font-bold text-neutral-100">Карта Имана</h2>
        <span className="text-[10px] uppercase tracking-widest text-neutral-500">Последние 4 недели</span>
      </div>
      
      <div className="grid grid-cols-7 gap-2">
        {/* Days of week header */}
        {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"].map(d => (
          <div key={d} className="text-center text-[10px] font-bold text-neutral-600 uppercase">{d}</div>
        ))}
        
        {/* Map blocks */}
        {days.map((date) => {
          const dateStr = format(date, "yyyy-MM-dd");
          const dayData = activity.find(a => a.date === dateStr);
          const score = dayData?.score || 0;
          const isToday = format(date, "yyyy-MM-dd") === format(today, "yyyy-MM-dd");
          
          return (
            <div
              key={dateStr}
              className="group relative flex aspect-square items-center justify-center"
            >
              <motion.div 
                initial={false}
                animate={{ scale: isToday ? 1.1 : 1 }}
                className={cn(
                  "h-8 w-8 rounded-lg transition-all duration-300 cursor-help border border-white/5",
                  getColorClass(score),
                  isToday && "border-primary-300 ring-2 ring-primary/20"
                )} 
              />
              {/* Tooltip on hover */}
              <div className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 rounded-lg bg-neutral-900 px-2 py-1 text-[10px] text-white opacity-0 transition-opacity group-hover:opacity-100 whitespace-nowrap z-50">
                {format(date, "d MMM")} • {score} очков
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Legend */}
      <div className="flex items-center justify-center gap-4 text-[10px] text-neutral-500 uppercase tracking-widest">
        <span>Меньше</span>
        <div className="flex gap-1.5">
          <div className="h-2 w-2 rounded-sm bg-white/[0.03]" />
          <div className="h-2 w-2 rounded-sm bg-primary-300/40" />
          <div className="h-2 w-2 rounded-sm bg-primary-500/60" />
          <div className="h-2 w-2 rounded-sm bg-primary-500" />
        </div>
        <span>Больше</span>
      </div>
    </GlassCard>
  );
}

import { motion } from "framer-motion";
