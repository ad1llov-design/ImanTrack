"use client";

import { useMemo } from "react";
import { format, subDays, eachDayOfInterval } from "date-fns";
import { GlassCard } from "@shared/components/ui/GlassCard";
import { cn } from "@shared/lib/utils";

// Mock Data Generator for Iman Levels
function getMockImanLevel(dateStr: string) {
  // Random level 1-5 based on date hash just for mock visualization
  const hash = dateStr.split("").reduce((a, b) => { a = ((a << 5) - a) + b.charCodeAt(0); return a & a }, 0);
  return (Math.abs(hash) % 5) + 1; 
}

export function ImanCalendar({ className }: { className?: string }) {
  // Generate last 28 days for a 4-week calendar overview
  const today = useMemo(() => new Date(), []);
  const days = useMemo(() => {
    return eachDayOfInterval({ start: subDays(today, 27), end: today });
  }, [today]);

  const getColorClass = (level: number) => {
    switch (level) {
      case 1: return "bg-red-500/80 shadow-[0_0_10px_rgba(239,68,68,0.5)]";       // Very Low
      case 2: return "bg-orange-400/80 shadow-[0_0_10px_rgba(249,115,22,0.4)]";   // Low
      case 3: return "bg-yellow-400/80 shadow-[0_0_10px_rgba(250,204,21,0.4)]";   // Average
      case 4: return "bg-primary-500/80 shadow-[0_0_10px_rgba(54,153,112,0.5)]";  // High
      case 5: return "bg-primary-700 shadow-[0_0_15px_rgba(31,98,72,0.6)]";       // Very High
      default: return "bg-white/10";
    }
  };

  return (
    <GlassCard className={cn("flex flex-col gap-4", className)}>
      <h2 className="text-sm font-semibold tracking-wider text-neutral-300">КАРТА ИМАНА (28 ДНЕЙ)</h2>
      
      <div className="grid grid-cols-7 gap-3">
        {/* Days of week header */}
        {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"].map(d => (
          <div key={d} className="text-center text-[0.65rem] font-medium text-neutral-500">{d}</div>
        ))}
        
        {/* Map blocks */}
        {days.map((date) => {
          const dateStr = format(date, "yyyy-MM-dd");
          const level = getMockImanLevel(dateStr);
          const isToday = format(date, "MM-dd") === format(today, "MM-dd");
          
          return (
            <div
              key={dateStr}
              title={`${dateStr} | Уровень: ${level}`}
              className="group relative flex aspect-square items-center justify-center"
            >
              <div 
                className={cn(
                  "h-6 w-6 rounded-full transition-all duration-300 group-hover:scale-125 cursor-help",
                  getColorClass(level),
                  isToday && "ring-2 ring-white ring-offset-2 ring-offset-transparent"
                )} 
              />
            </div>
          );
        })}
      </div>
      
      {/* Legend */}
      <div className="mt-2 flex items-center justify-between text-[0.65rem] text-neutral-400">
        <span>Слабо</span>
        <div className="flex gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
          <div className="h-2.5 w-2.5 rounded-full bg-orange-400/80" />
          <div className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
          <div className="h-2.5 w-2.5 rounded-full bg-primary-500/80" />
          <div className="h-2.5 w-2.5 rounded-full bg-primary-700" />
        </div>
        <span>Крепко</span>
      </div>
    </GlassCard>
  );
}
