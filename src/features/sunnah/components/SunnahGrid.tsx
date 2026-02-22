"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { GlassCard } from "@shared/components/ui/GlassCard";
import { cn } from "@shared/lib/utils";
import { SUNNAH_ACTIONS, getSunnahLogs, toggleSunnahAction, SunnahLog } from "../services/sunnah.persistence";

export function SunnahGrid({ className }: { className?: string }) {
  const [logs, setLogs] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(true);
  const todayStr = format(new Date(), "yyyy-MM-dd");

  useEffect(() => {
    async function fetchLogs() {
      setIsLoading(true);
      const data = await getSunnahLogs(todayStr);
      const map: Record<string, boolean> = {};
      data.forEach(log => {
        map[log.action_id] = log.is_completed;
      });
      setLogs(map);
      setIsLoading(false);
    }
    fetchLogs();
  }, [todayStr]);

  const handleToggle = async (id: string) => {
    const newState = !logs[id];
    setLogs(prev => ({ ...prev, [id]: newState }));
    try {
      await toggleSunnahAction(todayStr, id, newState);
    } catch (e) {
      // Revert on error
      setLogs(prev => ({ ...prev, [id]: !newState }));
    }
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-3 gap-4">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="aspect-square animate-pulse rounded-2xl bg-white/5 border border-white/5" />
        ))}
      </div>
    );
  }

  return (
    <div className={cn("grid grid-cols-3 gap-4 md:gap-6", className)}>
      {SUNNAH_ACTIONS.map((action) => {
        const isDone = logs[action.id];
        return (
          <motion.button
            key={action.id}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleToggle(action.id)}
            className={cn(
              "group relative flex aspect-square flex-col items-center justify-center gap-2 rounded-2xl border transition-all duration-300",
              isDone 
                ? "border-primary-500/50 bg-primary-500/10 shadow-glow" 
                : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/[0.08]"
            )}
          >
            <span className={cn(
              "text-3xl transition-transform duration-300",
              isDone ? "scale-110 drop-shadow-glow" : "group-hover:scale-110"
            )}>
              {action.icon}
            </span>
            <span className={cn(
              "text-[0.65rem] font-medium uppercase tracking-wider text-center px-1",
              isDone ? "text-primary-300" : "text-neutral-500 group-hover:text-neutral-300"
            )}>
              {action.label}
            </span>
            {isDone && (
              <div className="absolute top-2 right-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary-500 text-[8px] text-white">
                ✓
              </div>
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
