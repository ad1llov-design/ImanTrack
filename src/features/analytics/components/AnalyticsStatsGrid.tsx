"use client";

import { GlassCard } from "@shared/components/ui/GlassCard";
import { cn } from "@shared/lib/utils";
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { CircularProgress } from "@shared/components/ui/CircularProgress";
import { motion } from "framer-motion";

const weeklyData = [
  { day: "Пн", score: 80 },
  { day: "Вт", score: 65 },
  { day: "Ср", score: 90 },
  { day: "Чт", score: 75 },
  { day: "Пт", score: 100 },
  { day: "Сб", score: 85 },
  { day: "Вс", score: 95 },
];

export function AnalyticsStatsGrid({ className }: { className?: string }) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-4", className)}>
      <GlassCard className="p-6 flex flex-col gap-4">
        <h3 className="text-display text-sm font-bold text-main">Прогресс за неделю</h3>
        <div className="h-40 w-full mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData}>
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#888" }} dy={10} />
              <Tooltip 
                cursor={{ fill: "transparent" }} 
                contentStyle={{ borderRadius: '12px', border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text-main)', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} 
                itemStyle={{ color: 'var(--primary-500)', fontWeight: 'bold' }}
              />
              <Bar dataKey="score" fill="var(--primary-500)" radius={[4, 4, 4, 4]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

      <GlassCard className="p-6 flex flex-col items-center justify-center gap-4">
        <h3 className="text-display text-sm font-bold text-main w-full text-left">Чтение Корана</h3>
        <CircularProgress value={65} size={140} strokeWidth={10} colorClass="text-primary-500 drop-shadow-md" trackColorClass="text-border">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center pt-2"
          >
            <span className="text-3xl font-bold text-main tabular-nums">65%</span>
            <span className="text-[10px] text-muted uppercase tracking-wider font-bold">От цели</span>
          </motion.div>
        </CircularProgress>
        <p className="text-xs text-muted text-center mt-2 font-mono">
          Прочитано: <span className="text-main font-bold">13</span> / 20 стр
        </p>
      </GlassCard>
    </div>
  );
}
