"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@shared/components/ui/GlassCard";
import { cn } from "@shared/lib/utils";
import { SUNNAH_ACTIONS } from "../services/sunnah.persistence";
import { getDailyProgress, upsertDailyProgress } from "../../tracker/services/daily_progress.service";
import { toast } from "sonner";

export function SunnahGrid({ className }: { className?: string }) {
  const [completedActions, setCompletedActions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAction, setSelectedAction] = useState<typeof SUNNAH_ACTIONS[0] | null>(null);
  const todayStr = format(new Date(), "yyyy-MM-dd");

  useEffect(() => {
    async function fetchLogs() {
      setIsLoading(true);
      const data = await getDailyProgress(todayStr);
      if (data) {
        setCompletedActions(data.sunnah_actions || []);
      }
      setIsLoading(false);
    }
    fetchLogs();
  }, [todayStr]);

  const handleToggle = async (id: string) => {
    const isDone = completedActions.includes(id);
    let newActions = [...completedActions];
    
    if (isDone) {
      newActions = newActions.filter(a => a !== id);
    } else {
      newActions.push(id);
    }
    
    setCompletedActions(newActions);
    setSelectedAction(null); // close modal if open

    try {
      await upsertDailyProgress(todayStr, { sunnah_actions: newActions });
      if (!isDone) {
        toast.success("Сунна выполнена! Пусть Аллах примет.");
      } else {
        toast("Отметка убрана");
      }
    } catch (e) {
      console.error("Failed to update daily progress:", e);
      // Revert optimism if failed
      setCompletedActions(completedActions);
    }
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-3 gap-4">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="aspect-square animate-pulse rounded-2xl bg-surface border border-border" />
        ))}
      </div>
    );
  }

  return (
    <>
      <div className={cn("grid grid-cols-3 gap-4 md:gap-6", className)}>
        {SUNNAH_ACTIONS.map((action) => {
          const isDone = completedActions.includes(action.id);
          return (
            <motion.button
              key={action.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedAction(action)}
              className={cn(
                "group relative flex aspect-square flex-col items-center justify-center gap-2 rounded-2xl border transition-all duration-300",
                isDone 
                  ? "border-primary-500 bg-primary-50 shadow-sm" 
                  : "border-border bg-surface hover:border-primary-300 shadow-sm"
              )}
            >
              <span className={cn(
                "text-3xl transition-transform duration-300",
                isDone ? "scale-110 drop-shadow-glow" : "group-hover:scale-110"
              )}>
                {action.icon}
              </span>
              <span className={cn(
                "text-[0.65rem] font-bold uppercase tracking-wider text-center px-1",
                isDone ? "text-primary-600" : "text-muted group-hover:text-main"
              )}>
                {action.label}
              </span>
              {isDone && (
                <div className="absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary-500 text-[10px] text-white shadow-sm">
                  ✓
                </div>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Action Detail Modal */}
      <AnimatePresence>
        {selectedAction && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-sm bg-surface border border-border rounded-3xl p-6 shadow-card"
            >
              <div className="text-center mb-6">
                <span className="text-6xl drop-shadow-md mb-4 block">
                  {selectedAction.icon}
                </span>
                <h3 className="text-2xl font-display font-bold text-main mb-2">
                  {selectedAction.label}
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  {selectedAction.description}
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <button
                  onClick={() => handleToggle(selectedAction.id)}
                  className={cn(
                    "w-full rounded-xl py-3.5 text-sm font-bold transition-all active:scale-[0.98]",
                    completedActions.includes(selectedAction.id)
                      ? "bg-red-50 text-red-600 border border-red-200"
                      : "bg-primary-500 text-white shadow-md hover:bg-primary-600 border border-transparent"
                  )}
                >
                  {completedActions.includes(selectedAction.id) ? "Убрать отметку" : "Выполнил сегодня"}
                </button>
                <button
                  onClick={() => setSelectedAction(null)}
                  className="w-full py-2 text-sm font-bold text-muted hover:text-main transition-colors"
                >
                  Закрыть
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
