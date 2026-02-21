/**
 * @module features/prayer/components/CountdownDisplay
 *
 * Обратный отсчёт до следующего намаза.
 * Крупный таймер в стиле цифровых часов с исламским обрамлением.
 */

"use client";

import { cn } from "@shared/lib/utils";
import { useCountdown } from "../hooks/useCountdown";
import type { PrayerTime } from "../types/prayer.types";

interface CountdownDisplayProps {
  nextPrayer: PrayerTime | null;
  className?: string;
}

export function CountdownDisplay({ nextPrayer, className }: CountdownDisplayProps) {
  const { countdown, formatted } = useCountdown(nextPrayer?.dateTime ?? null);

  if (!nextPrayer) {
    return (
      <div className={cn("text-center", className)}>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          Все намазы на сегодня выполнены
        </p>
        <p className="mt-1 font-arabic text-lg text-gold-500">
          الحمد لله
        </p>
      </div>
    );
  }

  const isUrgent = countdown.totalSeconds < 1800; // < 30 минут

  return (
    <div className={cn("text-center", className)}>
      {/* Label */}
      <p className="text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
        До {nextPrayer.info.nameRu}
      </p>

      {/* Timer */}
      <div className="mt-3 flex items-center justify-center gap-1">
        {formatted.split(":").map((segment, i) => (
          <div key={i} className="flex items-center">
            {i > 0 && (
              <span
                className={cn(
                  "mx-1 text-2xl font-light",
                  isUrgent
                    ? "animate-pulse text-gold-500"
                    : "text-neutral-300 dark:text-neutral-600",
                )}
              >
                :
              </span>
            )}
            <span
              className={cn(
                "inline-flex h-16 w-16 items-center justify-center rounded-2xl font-mono text-3xl font-bold tabular-nums sm:h-20 sm:w-20 sm:text-4xl",
                isUrgent
                  ? "bg-gold-50 text-gold-700 shadow-gold dark:bg-gold-950/30 dark:text-gold-300"
                  : "bg-primary-50 text-primary-700 dark:bg-primary-950/30 dark:text-primary-300",
              )}
            >
              {segment}
            </span>
          </div>
        ))}
      </div>

      {/* Prayer name + icon */}
      <div className="mt-4 flex items-center justify-center gap-2">
        <span className="text-xl">{nextPrayer.info.icon}</span>
        <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
          {nextPrayer.info.nameRu}
        </span>
        <span className="font-arabic text-sm text-neutral-400 dark:text-neutral-500">
          {nextPrayer.info.nameAr}
        </span>
      </div>

      {/* Exact time */}
      <p className="mt-1 text-xs text-neutral-400 dark:text-neutral-600">
        в {nextPrayer.time}
      </p>
    </div>
  );
}
