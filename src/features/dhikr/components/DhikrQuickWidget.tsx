"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@shared/lib/utils";
import { toast } from "sonner";

const DHIKR_TYPES = [
  { id: "subhanallah", label: "СубханАллах", arabic: "سبحان الله", target: 33 },
  { id: "alhamdulillah", label: "Альхамдулиллях", arabic: "الحمد لله", target: 33 },
  { id: "allahuakbar", label: "Аллаху Акбар", arabic: "الله أكبر", target: 33 },
  { id: "astaghfirullah", label: "Астагфируллах", arabic: "أستغفر الله", target: 100 },
  { id: "lailaha", label: "Ла иляха илля Ллах", arabic: "لا إله إلا الله", target: 100 },
  { id: "salawat", label: "Салават", arabic: "اللهم صل على محمد", target: 100 },
];

/**
 * Dhikr Widget — local counting, no database.
 * Purely reading-focused with simple tap counter.
 */
export function DhikrQuickWidget({ className }: { className?: string }) {
  const [counts, setCounts] = useState<Record<string, number>>({});

  const handleTap = (id: string) => {
    const newCount = (counts[id] || 0) + 1;
    setCounts((prev) => ({ ...prev, [id]: newCount }));

    const dhikr = DHIKR_TYPES.find((d) => d.id === id);
    if (dhikr && newCount === dhikr.target) {
      toast.success(`${dhikr.label} — цель достигнута! МашаАллах!`);
    }
  };

  return (
    <div className={cn("space-y-4", className)}>
      <h2 className="text-xl font-semibold text-main flex items-center gap-2">
        📿 Зикр
      </h2>
      <div className="grid grid-cols-3 gap-3">
        {DHIKR_TYPES.map((dhikr) => {
          const count = counts[dhikr.id] || 0;
          const progress = Math.min((count / dhikr.target) * 100, 100);
          const isComplete = count >= dhikr.target;

          return (
            <motion.button
              key={dhikr.id}
              whileTap={{ scale: 0.92 }}
              onClick={() => handleTap(dhikr.id)}
              className={cn(
                "relative overflow-hidden rounded-2xl border bg-surface p-4 flex flex-col items-center gap-2 min-h-[100px] active:bg-primary-50/10 transition-colors",
                isComplete ? "border-primary-500" : "border-border",
              )}
            >
              <span className="font-arabic text-lg text-main leading-tight">{dhikr.arabic}</span>
              <span className="text-[9px] uppercase tracking-wider text-muted font-bold">{dhikr.label}</span>

              <motion.span
                key={count}
                initial={{ scale: 1.4, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={cn(
                  "text-lg font-bold tabular-nums",
                  isComplete ? "text-primary-600 dark:text-primary-400" : "text-primary-500",
                )}
              >
                {count}
              </motion.span>

              {/* Progress bar */}
              <div className="absolute bottom-0 left-0 h-1 w-full bg-border">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className="h-full bg-primary-500"
                />
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
