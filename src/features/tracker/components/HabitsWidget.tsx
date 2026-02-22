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
      if (activity.length > 0) {
        setTodayData(activity[0]);
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
    <div className={cn("grid grid-cols-3 gap-4", className)}>
      {items.map((item) => {
        const progress = Math.min((item.value / item.target) * 100, 100);
        return (
          <div key={item.label} className="relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] p-4 p-5">
             <div className="relative z-10 flex flex-col gap-1">
                <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">{item.label}</span>
                <span className="text-xl font-bold text-neutral-100">{item.value} <span className="text-xs text-neutral-500 font-normal">{item.unit}</span></span>
             </div>
             {/* Progress bar background */}
             <div className="absolute bottom-0 left-0 h-1 bg-primary/20 w-full">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className="h-full bg-primary"
                />
             </div>
          </div>
        );
      })}
    </div>
  );
}
