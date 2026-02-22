"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { cn } from "@shared/lib/utils";
import { getRecentActivity } from "../services/tracker.service";
import { DailyActivity } from "../types/tracker.types";

export function HabitsWidget({ className }: { className?: string }) {
  const [todayData, setTodayData] = useState<DailyActivity | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      setLoading(true);
      const activity = await getRecentActivity(1);
      if (activity && activity.length > 0) {
        setTodayData(activity[0] || null);
      }
      setLoading(false);
    }
    fetch();
  }, []);

  if (loading) {
     return <div className="h-24 w-full animate-pulse rounded-2xl bg-white/5" />;
  }

  const items = [
    { label: "Молитвы", value: todayData?.prayersCount || 0, target: 5, unit: "из 5", icon: "🕌" },
    { label: "Азкар", value: todayData?.adhkarCount || 0, target: 1, unit: "заверш", icon: "📿" },
    { label: "Коран", value: todayData?.score && todayData.score > 20 ? 1 : 0, target: 1, unit: "чтение", icon: "📖" },
  ];

  return (
    <div className={cn("grid grid-cols-3 gap-3 md:gap-4 h-full", className)}>
      {items.map((item) => {
        const progress = Math.min((item.value / item.target) * 100, 100);
        return (
          <div key={item.label} className="relative overflow-hidden rounded-[24px] border border-border bg-surface p-5 flex flex-col justify-start min-h-[220px]">
             <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-muted font-bold block mb-6">{item.label}</span>
             <div className="flex items-baseline gap-2 mt-auto mb-4">
                <span className="text-4xl md:text-5xl font-bold text-main leading-none tabular-nums">{item.value}</span>
             </div>
             <span className="text-[11px] text-muted font-medium">{item.unit}</span>
             
             {/* Progress line at bottom */}
             <div className="absolute bottom-0 left-0 h-1 bg-border w-full">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className="h-full bg-primary-500"
                />
             </div>
          </div>
        );
      })}
    </div>
  );
}
