/**
 * @module features/tracker/components/StreakCard
 *
 * Визуальная карточка стрика (серии дней).
 * Показывает огонь (🔥) и количество дней.
 */

"use client";

import { motion } from "framer-motion";
import { StreakInfo } from "../types/tracker.types";
import { cn } from "@shared/lib/utils";

interface StreakCardProps {
  streak: StreakInfo;
  className?: string;
}

export function StreakCard({ streak, className }: StreakCardProps) {
  const isActive = streak.currentStreak > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "relative overflow-hidden rounded-3xl border border-primary-100 bg-white p-6 shadow-sm dark:border-primary-900/30 dark:bg-surface-dark-secondary",
        className
      )}
    >
      {/* Background decoration */}
      <div className="absolute -right-4 -top-4 text-primary-50/50 dark:text-primary-950/20">
        <svg width="100" height="100" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 21c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-18C6.48 3 2 7.48 2 13s4.48 10 10 10 10-4.48 10-10S17.52 3 12 3zm0 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/>
        </svg>
      </div>

      <div className="flex items-center gap-6">
        {/* Fire icon with animation */}
        <div className="relative">
          <div className={cn(
            "flex h-20 w-20 items-center justify-center rounded-2xl text-4xl",
            isActive ? "bg-orange-50 dark:bg-orange-950/30" : "bg-neutral-50 dark:bg-neutral-800"
          )}>
            {isActive ? (
              <motion.span
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                🔥
              </motion.span>
            ) : "💤"}
          </div>
          {isActive && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-[0.6rem] font-bold text-white shadow-lg"
            >
              +{streak.currentStreak}
            </motion.div>
          )}
        </div>

        <div>
          <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">
            {streak.currentStreak} {getDaysLabel(streak.currentStreak)}
          </h3>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Текущая серия активности
          </p>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-[0.65rem] font-semibold uppercase tracking-wider text-neutral-400">
              Лучший результат:
            </span>
            <span className="rounded-full bg-primary-50 px-2.5 py-0.5 text-xs font-bold text-primary-600 dark:bg-primary-950/30 dark:text-primary-400">
              {streak.bestStreak}
            </span>
          </div>
        </div>
      </div>

      {/* Progress bar hint (optional) */}
      <div className="mt-6 flex gap-1">
        {Array.from({ length: 7 }).map((_, i) => (
          <div 
            key={i} 
            className={cn(
              "h-1.5 flex-1 rounded-full",
              i < (streak.currentStreak % 7) ? "bg-orange-500" : "bg-neutral-100 dark:bg-neutral-800"
            )}
          />
        ))}
      </div>
    </motion.div>
  );
}

function getDaysLabel(count: number): string {
  if (count % 10 === 1 && count % 100 !== 11) return "день";
  if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) return "дня";
  return "дней";
}
