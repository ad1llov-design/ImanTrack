"use client";

import { useEffect, useState, useCallback } from "react";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@shared/lib/utils";
import { SUNNAH_ACTIONS, SUNNAH_CATEGORIES, getSunnahLogs, toggleSunnahAction } from "../services/sunnah.persistence";
import { toast } from "sonner";

interface SunnahAction {
  id: string;
  category: string;
  label: string;
  icon: string;
  description: string;
  source?: string;
  narrator?: string;
  collection?: string;
}

export function SunnahGrid({ className }: { className?: string }) {
  const [completedActions, setCompletedActions] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAction, setSelectedAction] = useState<SunnahAction | null>(null);
  const [isToggling, setIsToggling] = useState(false);
  const todayStr = format(new Date(), "yyyy-MM-dd");

  const fetchLogs = useCallback(async () => {
    setIsLoading(true);
    try {
      const logs = await getSunnahLogs(todayStr);
      const completedIds = new Set(
        logs.filter((l) => l.is_completed).map((l) => l.action_id)
      );
      setCompletedActions(completedIds);
    } catch (error) {
      console.error("Failed to fetch sunnah logs:", error);
    } finally {
      setIsLoading(false);
    }
  }, [todayStr]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  const handleToggle = async (id: string) => {
    if (isToggling) return;

    const isDone = completedActions.has(id);
    setIsToggling(true);

    try {
      await toggleSunnahAction(todayStr, id, !isDone);

      // Update UI only after successful DB operation
      setCompletedActions((prev) => {
        const next = new Set(prev);
        if (isDone) {
          next.delete(id);
        } else {
          next.add(id);
        }
        return next;
      });

      setSelectedAction(null);

      if (!isDone) {
        toast.success("Сунна выполнена! Пусть Аллах примет.");
      } else {
        toast("Отметка убрана");
      }
    } catch (error) {
      console.error("Failed to toggle sunnah action:", error);
      toast.error("Не удалось сохранить. Попробуйте ещё раз.");
    } finally {
      setIsToggling(false);
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
      <div className={cn("flex flex-col gap-8", className)}>
        {SUNNAH_CATEGORIES.map((cat) => {
          const categoryActions = SUNNAH_ACTIONS.filter((a) => a.category === cat.id);
          if (categoryActions.length === 0) return null;

          return (
            <div key={cat.id} className="space-y-4">
              <h2 className="text-sm font-bold tracking-wider text-muted uppercase px-1">{cat.title}</h2>
              <div className="grid grid-cols-3 gap-4 md:gap-6">
                {categoryActions.map((action) => {
                  const isDone = completedActions.has(action.id);
                  return (
                    <motion.button
                      key={action.id}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedAction(action)}
                      className={cn(
                        "group relative flex aspect-square flex-col items-center justify-center gap-2 rounded-2xl border transition-all duration-300",
                        isDone
                          ? "border-primary-500 bg-primary-50 shadow-sm dark:bg-primary-950/30"
                          : "border-border bg-surface hover:border-primary-300 shadow-sm",
                      )}
                    >
                      <span
                        className={cn(
                          "text-3xl transition-transform duration-300",
                          isDone ? "scale-110 drop-shadow-glow" : "group-hover:scale-110",
                        )}
                      >
                        {action.icon}
                      </span>
                      <span
                        className={cn(
                          "text-[0.65rem] font-bold uppercase tracking-wider text-center px-1 leading-tight",
                          isDone ? "text-primary-600 dark:text-primary-400" : "text-muted group-hover:text-main",
                        )}
                      >
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
            </div>
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
                <h3 className="text-2xl font-bold text-main mb-2">
                  {selectedAction.label}
                </h3>
                <p className="text-sm text-muted leading-relaxed mb-4">
                  {selectedAction.description}
                </p>
                {selectedAction.source && (
                  <div className="bg-primary-50/50 dark:bg-primary-950/30 py-3 px-4 rounded-xl border border-primary-100/50 dark:border-primary-900/50 space-y-1.5">
                    <p className="text-xs text-primary-700 dark:text-primary-300 font-medium italic leading-relaxed">
                      {selectedAction.source}
                    </p>
                    {selectedAction.narrator && (
                      <p className="text-[10px] text-muted">
                        📜 {selectedAction.narrator} — <span className="font-bold">{selectedAction.collection}</span>
                      </p>
                    )}
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-3">
                <button
                  onClick={() => handleToggle(selectedAction.id)}
                  disabled={isToggling}
                  className={cn(
                    "w-full rounded-xl py-3.5 text-sm font-bold transition-all active:scale-[0.98] disabled:opacity-50",
                    completedActions.has(selectedAction.id)
                      ? "bg-red-50 text-red-600 border border-red-200 dark:bg-red-950/30 dark:text-red-400 dark:border-red-800"
                      : "bg-primary-500 text-white shadow-md hover:bg-primary-600 border border-transparent",
                  )}
                >
                  {isToggling
                    ? "Сохранение..."
                    : completedActions.has(selectedAction.id)
                      ? "Убрать отметку"
                      : "Выполнил сегодня"}
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
