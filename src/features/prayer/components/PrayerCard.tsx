/**
 * @module features/prayer/components/PrayerCard
 *
 * Карточка одного намаза.
 * 3 состояния:
 * - passed (серая, приглушённая)
 * - current (зелёная подсветка, пульсирующий индикатор, тень glow)
 * - upcoming (нейтральная, готова к исполнению)
 */

"use client";

import { cn } from "@shared/lib/utils";
import type { PrayerTime } from "../types/prayer.types";
import type { PrayerStatus as DBPrayerStatus } from "@shared/types/supabase";

interface PrayerCardProps {
  prayer: PrayerTime;
  /** Показывать ли анимацию */
  animated?: boolean;
  onClick?: () => void;
  logStatus?: DBPrayerStatus;
}

export function PrayerCard({ prayer, animated = true, onClick, logStatus }: PrayerCardProps) {
  const { status, info, time } = prayer;
  const isCurrent = status === "current";
  const isPassed = status === "passed";
  const isDone = logStatus === "completed" || logStatus === "skipped" || logStatus === "qada";

  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative flex w-full items-center justify-between rounded-2xl border p-4 transition-all duration-300 text-left cursor-pointer",
        // Current prayer highlight
        isCurrent && !isDone && [
          "border-primary-300 bg-gradient-to-r from-primary-50 to-primary-100/50",
          "shadow-glow",
          "dark:border-primary-700 dark:from-primary-950/40 dark:to-primary-900/30",
          animated && "animate-pulse-soft",
        ],
        // Logged Completed prayer overrides passed state
        isDone && [
          "border-primary-500/30 bg-primary-500/10 shadow-[0_0_15px_rgba(54,153,112,0.1)]",
        ],
        logStatus === "missed" && [
          "border-red-500/30 bg-red-500/10",
        ],
        // Passed but untreated
        isPassed && !logStatus && [
          "border-neutral-100 bg-neutral-50/50",
          "dark:border-neutral-800 dark:bg-neutral-900/30",
        ],
        // Upcoming prayer
        !isCurrent && !isPassed && !logStatus && [
          "border-neutral-200 bg-white hover:border-primary-200 hover:shadow-card",
          "dark:border-neutral-800 dark:bg-surface-dark-secondary dark:hover:border-primary-800",
        ],
      )}
    >
      {/* ── Left: Icon + Name ─────────────────── */}
      <div className="flex items-center gap-3">
        {/* Icon with status ring */}
        <div
          className={cn(
            "relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-lg transition-all",
            isDone && "bg-primary-500 text-white shadow-glow",
            logStatus === "missed" && "bg-red-500/20 text-red-500",
            (isCurrent && !isDone) && "bg-primary-100 dark:bg-primary-900/40",
            (isPassed && !isDone && logStatus !== "missed") && "bg-neutral-100 dark:bg-neutral-800",
            (!isCurrent && !isPassed && !logStatus) && "bg-neutral-50 group-hover:bg-primary-50 dark:bg-neutral-800 dark:group-hover:bg-primary-950/30",
          )}
        >
          <span className={cn(isPassed && !isDone && "opacity-40")}>{info.icon}</span>

          {/* Пульсирующий индикатор для текущего намаза */}
          {isCurrent && !isDone && animated && (
            <span className="absolute -right-0.5 -top-0.5 flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-400 opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-primary-500" />
            </span>
          )}
        </div>

        {/* Name */}
        <div>
          <p
            className={cn(
              "text-sm font-semibold transition-colors",
              isCurrent && "text-primary-700 dark:text-primary-300",
              isPassed && "text-neutral-400 dark:text-neutral-600",
              !isCurrent && !isPassed && "text-neutral-800 dark:text-neutral-200",
            )}
          >
            {info.nameRu}
          </p>
          <p
            className={cn(
              "font-arabic text-xs transition-colors",
              isCurrent && "text-primary-500 dark:text-primary-400",
              isPassed && "text-neutral-300 dark:text-neutral-700",
              !isCurrent && !isPassed && "text-neutral-400 dark:text-neutral-500",
            )}
          >
            {info.nameAr}
          </p>
        </div>
      </div>

      {/* ── Right: Time + Status ──────────────── */}
      <div className="flex items-center gap-3">
        {/* Status badge */}
        {isCurrent && (
          <span className="hidden rounded-full bg-primary-100 px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider text-primary-700 dark:bg-primary-900/40 dark:text-primary-300 sm:inline-flex">
            Сейчас
          </span>
        )}
        {isPassed && !info.isFard ? null : isPassed && (
          <span className="hidden rounded-full bg-neutral-100 px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider text-neutral-400 dark:bg-neutral-800 dark:text-neutral-600 sm:inline-flex">
            Прошёл
          </span>
        )}

        {/* Time */}
        <p
          className={cn(
            "min-w-[3.5rem] text-right font-mono text-base font-bold tabular-nums transition-colors",
            isDone && "text-primary-500",
            logStatus === "missed" && "text-red-500/80 line-through",
            !isDone && isCurrent && "text-primary-700 dark:text-primary-300",
            !isDone && isPassed && logStatus !== "missed" && "text-neutral-300 line-through dark:text-neutral-700",
            !isCurrent && !isPassed && !logStatus && "text-neutral-900 dark:text-neutral-100",
          )}
        >
          {time}
        </p>
      </div>

      {/* ── Current prayer left border accent ──── */}
      {isCurrent && !isDone && (
        <div className="absolute inset-y-2 left-0 w-1 rounded-full bg-primary-500" />
      )}
    </button>
  );
}
