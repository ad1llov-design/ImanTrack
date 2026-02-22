"use client";

import { GlassCard } from "@shared/components/ui/GlassCard";
import { cn } from "@shared/lib/utils";

const mockStats = [
  { label: "Больше всего пропусков", value: "ФАДЖР", subtext: "На этой неделе", color: "text-red-400", bg: "bg-red-500/10" },
  { label: "Защита от грехов", value: "85%", subtext: "Сильный Иман", color: "text-primary-400", bg: "bg-primary-500/10" },
  { label: "Постоянная сунна", value: "СИВАК", subtext: "21 день подряд", color: "text-yellow-400", bg: "bg-yellow-500/10" },
  { label: "Текущий стрик", value: "14 дн", subtext: "Ни одного пропуска", color: "text-blue-400", bg: "bg-blue-500/10" }
];

export function AnalyticsStatsGrid({ className }: { className?: string }) {
  return (
    <div className={cn("grid grid-cols-2 gap-4", className)}>
      {mockStats.map((stat, i) => (
        <GlassCard 
          key={i}
          className="flex flex-col items-start justify-center p-5 relative overflow-hidden group"
          delay={i * 0.1}
        >
          {/* Subtle glow background */}
          <div className={cn("absolute -top-10 -right-10 h-24 w-24 rounded-full blur-2xl opacity-50 group-hover:opacity-100 transition-opacity", stat.bg)} />
          
          <h3 className="text-[0.65rem] font-medium tracking-wide text-neutral-400 uppercase leading-tight mb-2 z-10">
            {stat.label}
          </h3>
          <p className={cn("text-xl font-bold tracking-tight z-10", stat.color)}>
            {stat.value}
          </p>
          <p className="text-[0.6rem] text-neutral-500 mt-1 z-10">
            {stat.subtext}
          </p>
        </GlassCard>
      ))}
    </div>
  );
}
