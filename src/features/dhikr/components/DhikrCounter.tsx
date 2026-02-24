"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw } from "lucide-react";
import { cn } from "@shared/lib/utils";

interface DhikrCounterProps {
  dhikrId: string;
  className?: string;
  goal?: number;
}

export function DhikrCounter({ dhikrId, className, goal = 33 }: DhikrCounterProps) {
  const [count, setCount] = useState(0);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(`sirat_dhikr_${dhikrId}`);
    if (saved) {
      setCount(parseInt(saved, 10));
    }
  }, [dhikrId]);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem(`sirat_dhikr_${dhikrId}`, count.toString());
  }, [count, dhikrId]);

  const handleTap = () => {
    // Vibrate if supported
    if (typeof window !== "undefined" && window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(50);
    }
    setCount((c) => c + 1);
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCount(0);
  };

  const isComplete = count >= goal;

  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      <motion.button
        whileTap={{ scale: 0.92 }}
        onClick={handleTap}
        className={cn(
          "relative flex h-32 w-32 items-center justify-center rounded-full border-4 shadow-xl transition-colors select-none",
          isComplete
            ? "border-primary-500 bg-primary-50 dark:bg-primary-950/30"
            : "border-border bg-surface hover:bg-neutral-50 dark:hover:bg-neutral-800"
        )}
      >
        <AnimatePresence mode="popLayout">
          <motion.span
            key={count}
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.2, y: -10 }}
            className={cn(
              "text-4xl font-black tabular-nums tracking-tighter",
              isComplete ? "text-primary-600 dark:text-primary-400" : "text-main"
            )}
          >
            {count}
          </motion.span>
        </AnimatePresence>

        {/* Goal Indicator Ring */}
        <svg className="absolute inset-0 h-full w-full -rotate-90 pointer-events-none">
          <circle
            cx="50%"
            cy="50%"
            r="48%"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            className="text-primary-500/20"
          />
          <motion.circle
            cx="50%"
            cy="50%"
            r="48%"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            className="text-primary-500"
            strokeDasharray="100 100"
            animate={{
              strokeDasharray: `${Math.min((count / goal) * 100, 100)} 100`,
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </svg>
      </motion.button>

      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-muted">Цель: {goal}</span>
        {count > 0 && (
          <button
            onClick={handleReset}
            className="flex items-center gap-1 rounded-full bg-neutral-100 px-3 py-1.5 text-xs font-semibold text-muted hover:bg-neutral-200 hover:text-main dark:bg-neutral-800 dark:hover:bg-neutral-700 transition-colors"
          >
            <RotateCcw className="h-3 w-3" />
            Сбросить
          </button>
        )}
      </div>
    </div>
  );
}
