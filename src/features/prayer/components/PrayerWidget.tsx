/**
 * @module features/prayer/components/PrayerWidget
 *
 * Компактный виджет для дашборда. Показывает:
 * - Текущий/следующий намаз
 * - Countdown
 * - Мини-прогресс дня
 */

"use client";

import Link from "next/link";

import { cn } from "@shared/lib/utils";
import { useCountdown } from "../hooks/useCountdown";
import { usePrayerStore } from "../store/prayerStore";

interface PrayerWidgetProps {
  className?: string;
}

export function PrayerWidget({ className }: PrayerWidgetProps) {
  const { prayers, currentPrayer, nextPrayer, isLoading } = usePrayerStore();
  const { formatted } = useCountdown(nextPrayer?.dateTime ?? null);

  const passedCount = prayers.filter(
    (p) => p.status === "passed" && p.info.isFard,
  ).length;
  const totalFard = prayers.filter((p) => p.info.isFard).length;
  const progressPercent = totalFard > 0 ? (passedCount / totalFard) * 100 : 0;

  if (isLoading) {
    return (
      <div
        className={cn(
          "rounded-2xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900",
          className,
        )}
      >
        <div className="h-4 w-24 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700" />
        <div className="mt-3 h-8 w-32 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700" />
        <div className="mt-3 h-2 w-full animate-pulse rounded-full bg-neutral-100 dark:bg-neutral-800" />
      </div>
    );
  }

  return (
    <Link
      href="/prayer"
      className={cn(
        "group block rounded-2xl border border-primary-200 bg-gradient-to-br from-primary-50 to-white p-5 transition-all hover:shadow-card dark:border-primary-800 dark:from-primary-950/30 dark:to-surface-dark-secondary",
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-wider text-primary-600 dark:text-primary-400">
          🕌 Намазы
        </p>
        <svg
          className="h-4 w-4 text-neutral-400 transition-transform group-hover:translate-x-0.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </div>

      {/* Next prayer countdown */}
      {nextPrayer ? (
        <div className="mt-3">
          <p className="text-2xl font-bold tabular-nums text-primary-700 dark:text-primary-300">
            {formatted}
          </p>
          <p className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400">
            до {nextPrayer.info.nameRu} ({nextPrayer.time})
          </p>
        </div>
      ) : (
        <div className="mt-3">
          <p className="font-arabic text-lg text-gold-600 dark:text-gold-400">
            الحمد لله
          </p>
          <p className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400">
            Все намазы выполнены
          </p>
        </div>
      )}

      {/* Day progress bar */}
      <div className="mt-4">
        <div className="flex items-center justify-between text-[0.65rem] text-neutral-400">
          <span>{passedCount} из {totalFard}</span>
          <span>{Math.round(progressPercent)}%</span>
        </div>
        <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-primary-100 dark:bg-primary-900/30">
          <div
            className="h-full rounded-full bg-primary-500 transition-all duration-700 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Current prayer indicator */}
      {currentPrayer && (
        <div className="mt-3 flex items-center gap-1.5 rounded-lg bg-white/60 px-2.5 py-1 dark:bg-neutral-800/40">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-400 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary-500" />
          </span>
          <span className="text-[0.65rem] text-neutral-500 dark:text-neutral-400">
            Сейчас: <span className="font-medium text-primary-600 dark:text-primary-400">{currentPrayer.info.nameRu}</span>
          </span>
        </div>
      )}
    </Link>
  );
}
