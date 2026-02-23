"use client";

import { usePrayerTimes } from "../hooks/usePrayerTimes";
import { useCountdown } from "../hooks/useCountdown";
import { CircularProgress } from "@shared/components/ui/CircularProgress";
import { cn } from "@shared/lib/utils";

/**
 * Prayer Widget — shows prayer times + countdown to next prayer.
 * No auth, no database, no progress tracking.
 */
export function PrayerWidget({ className }: { className?: string }) {
  const { prayers, currentPrayer, nextPrayer, isLoading } = usePrayerTimes();
  const { formatted } = useCountdown(nextPrayer?.dateTime ?? null);

  const fardhPrayers = prayers.filter((p) => p.info.isFard);

  if (isLoading) {
    return (
      <div className={cn("relative overflow-hidden rounded-3xl border border-border bg-surface shadow-card p-6", className)}>
        <div className="flex flex-col items-center justify-center gap-6">
          <div className="flex w-full items-center justify-between">
            <h2 className="text-sm font-semibold tracking-wider text-muted uppercase">Время Намазов</h2>
            <div className="h-6 w-16 bg-border rounded-full animate-pulse" />
          </div>
          <div className="h-36 w-36 rounded-full bg-border animate-pulse" />
          <div className="flex w-full items-center justify-between gap-2 overflow-x-auto border-t border-border pt-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5 p-2 flex-shrink-0">
                <div className="h-12 w-12 rounded-2xl bg-border animate-pulse" />
                <div className="h-2 w-8 bg-border rounded-full animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden rounded-3xl border border-border bg-surface shadow-card p-6", className)}>
      <div className="flex flex-col items-center justify-center gap-6">
        {/* Header */}
        <div className="flex w-full items-center justify-between">
          <h2 className="text-sm font-semibold tracking-wider text-muted uppercase">Время Намазов</h2>
        </div>

        {/* Countdown Circle */}
        <CircularProgress
          value={0}
          size={140}
          strokeWidth={10}
          colorClass="text-primary-500 drop-shadow-md"
          trackColorClass="text-border"
        >
          <div className="flex flex-col items-center justify-center">
            {nextPrayer ? (
              <>
                <span className="text-2xl font-bold tabular-nums text-main">{formatted}</span>
                <span className="text-[0.65rem] uppercase tracking-wider text-muted">до {nextPrayer.info.nameRu}</span>
              </>
            ) : (
              <span className="text-xl font-bold text-main">Молодец</span>
            )}
          </div>
        </CircularProgress>

        {/* Prayer Times List */}
        <div className="flex w-full items-center justify-between gap-2 overflow-x-auto border-t border-border pt-4">
          {fardhPrayers.map((prayer) => {
            const isActive = currentPrayer?.name === prayer.name;
            const timeStr = prayer.dateTime
              ? prayer.dateTime.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" })
              : "--:--";

            return (
              <div
                key={prayer.name}
                className={cn(
                  "relative flex flex-col items-center justify-center gap-1.5 p-2 transition-all flex-shrink-0",
                  isActive ? "text-primary-600 dark:text-primary-400" : "text-muted",
                )}
              >
                <div
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-2xl border bg-surface transition-colors shadow-sm",
                    isActive && "border-primary-400 text-primary-500 ring-2 ring-primary-100 dark:ring-primary-900",
                    !isActive && "border-border",
                  )}
                >
                  <span className="text-xl mb-0.5">{prayer.info.icon}</span>
                </div>
                <span className="text-[0.6rem] font-bold uppercase">{prayer.info.nameRu}</span>
                <span className="text-[0.55rem] font-mono text-muted tabular-nums">{timeStr}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
