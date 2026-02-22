/**
 * @module features/prayer/components/PrayerTimesList
 *
 * Полный список намазов на день с countdown hero, hijri датой,
 * геолокацией и skeleton-загрузкой.
 */

"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { cn } from "@shared/lib/utils";
import { CircularProgress } from "@shared/components/ui/CircularProgress";
import { usePrayerTimes } from "../hooks/usePrayerTimes";
import { CountdownDisplay } from "./CountdownDisplay";
import { PrayerCard } from "./PrayerCard";
import { PrayerLogModal } from "./PrayerLogModal";
import { getPrayerLogs, upsertPrayerLog, type PrayerLog } from "../services/prayer.persistence";

interface PrayerTimesListProps {
  className?: string;
}

/* ── Skeleton ───────────────────────────────────────────────────────── */

function PrayerSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center justify-between rounded-2xl border border-neutral-100 p-4 dark:border-neutral-800"
        >
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 animate-pulse rounded-xl bg-neutral-200 dark:bg-neutral-700" />
            <div className="space-y-1.5">
              <div className="h-4 w-16 animate-pulse rounded-md bg-neutral-200 dark:bg-neutral-700" />
              <div className="h-3 w-10 animate-pulse rounded-md bg-neutral-100 dark:bg-neutral-800" />
            </div>
          </div>
          <div className="h-5 w-14 animate-pulse rounded-md bg-neutral-200 dark:bg-neutral-700" />
        </div>
      ))}
    </div>
  );
}

/* ── Error ──────────────────────────────────────────────────────────── */

function PrayerError({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
  return (
    <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center dark:border-red-800 dark:bg-red-950/30">
      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
        <span className="text-xl">⚠️</span>
      </div>
      <p className="text-sm font-medium text-red-700 dark:text-red-300">
        {message}
      </p>
      <button
        onClick={onRetry}
        className="mt-4 rounded-xl bg-red-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
      >
        Попробовать снова
      </button>
    </div>
  );
}

/* ── Component ──────────────────────────────────────────────────────── */

export function PrayerTimesList({ className }: PrayerTimesListProps) {
  const {
    prayers,
    currentPrayer,
    nextPrayer,
    hijriDate,
    gregorianDate,
    location,
    isLoading,
    error,
    refresh,
    refreshLocation,
  } = usePrayerTimes();

  // Local state for interactive logs
  const [logs, setLogs] = useState<Record<string, PrayerLog>>({});
  const [selectedPrayer, setSelectedPrayer] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const todayStr = format(new Date(), "yyyy-MM-dd");

  useEffect(() => {
    async function fetchLogs() {
      try {
        const todayLogs = await getPrayerLogs(todayStr);
        const logsMap = todayLogs.reduce((acc, log) => {
          acc[log.prayerName] = log;
          return acc;
        }, {} as Record<string, PrayerLog>);
        setLogs(logsMap);
      } catch (e) {
        console.error("Failed to load today's prayer logs:", e);
      }
    }
    fetchLogs();
  }, [todayStr]);

  const handleSaveLog = async (logData: Partial<PrayerLog>) => {
    if (!selectedPrayer) return;
    const pName = selectedPrayer.name;
    const newLog: PrayerLog = {
      userId: "", // Handled by server/persistence layer
      prayerName: pName,
      date: todayStr,
      status: logData.status as any,
      onTime: logData.onTime || false,
      concentrationLevel: logData.concentrationLevel,
      location: logData.location,
      emotionalState: logData.emotionalState,
    };
    
    setLogs(prev => ({ ...prev, [pName]: newLog }));
    await upsertPrayerLog(newLog);
  };

  return (
    <div className={cn("w-full", className)}>

      {/* ── Header: Date + Location ──────────── */}
      <div className="mb-6 flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
        {/* Dates */}
        <div>
          {isLoading ? (
            <div className="space-y-1">
              <div className="h-5 w-48 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700" />
              <div className="h-4 w-32 animate-pulse rounded bg-neutral-100 dark:bg-neutral-800" />
            </div>
          ) : (
            <>
              {hijriDate && (
                <p className="font-arabic text-base text-gold-600 dark:text-gold-400">
                  {hijriDate}
                </p>
              )}
              {gregorianDate && (
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  {gregorianDate}
                </p>
              )}
            </>
          )}
        </div>

        {/* Location */}
        {location && (
          <button
            onClick={refreshLocation}
            className="group flex items-center gap-1.5 rounded-xl border border-neutral-200 px-3 py-1.5 text-xs text-neutral-500 transition-all hover:border-primary-300 hover:text-primary-600 dark:border-neutral-700 dark:hover:border-primary-700 dark:hover:text-primary-400"
            title="Нажмите чтобы обновить геолокацию"
          >
            <svg className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {location.city ?? "Местоположение"}
            {location.country ? `, ${location.country}` : ""}
          </button>
        )}
      </div>

      {/* ── Countdown Hero & Daily Stats ──────── */}
      {!isLoading && !error && (
        <div className="mb-8 rounded-3xl border border-neutral-200 bg-gradient-to-br from-white to-neutral-50 p-6 shadow-card dark:border-neutral-800 dark:from-surface-dark-secondary dark:to-surface-dark sm:p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1 w-full relative">
              <CountdownDisplay nextPrayer={nextPrayer} />
              
              {/* Current prayer indicator */}
              {currentPrayer && (
                <div className="mt-6 flex items-center justify-center gap-2 border-t border-neutral-100 pt-4 dark:border-neutral-800">
                  <span className="flex h-2 w-2">
                    <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-primary-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-primary-500" />
                  </span>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    Сейчас время <span className="font-semibold text-primary-600 dark:text-primary-400">{currentPrayer.info.nameRu}</span>
                  </p>
                </div>
              )}
            </div>

            {/* Daily Progress & Streak */}
            <div className="flex md:flex-col shrink-0 gap-6 mt-6 md:mt-0 w-full md:w-auto items-center justify-center md:border-l md:border-neutral-200 md:pl-8 dark:border-neutral-800 border-t pt-6 md:pt-0">
              <div className="flex flex-col items-center">
                <CircularProgress 
                  value={(Object.values(logs).filter(l => l.status === "completed" || l.status === "qada").length / 5) * 100} 
                  size={90} 
                  strokeWidth={6}
                >
                  <div className="flex flex-col items-center">
                    <span className="text-lg font-bold text-primary-600 dark:text-primary-400">
                      {Object.values(logs).filter(l => l.status === "completed" || l.status === "qada").length}/5
                    </span>
                  </div>
                </CircularProgress>
                <span className="text-[0.6rem] text-neutral-400 mt-2 uppercase tracking-wide">Завершено</span>
              </div>
              
              <div className="flex flex-col items-center justify-center min-w-[90px] bg-gold-50 dark:bg-gold-500/10 rounded-2xl p-3 border border-gold-200/50 dark:border-gold-500/20 shadow-glow">
                <span className="text-xl">🔥</span>
                <span className="text-sm font-bold text-gold-700 dark:text-gold-400 mt-1">12 Дней</span>
                <span className="text-[0.55rem] font-bold text-gold-600/60 dark:text-gold-400/60 uppercase tracking-wider mt-0.5">Серия (Демо)</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Prayer Cards ─────────────────────── */}
      {isLoading && <PrayerSkeleton />}

      {error && <PrayerError message={error} onRetry={refresh} />}

      {!isLoading && !error && (
        <div className="space-y-2.5">
          {prayers
            .filter((p) => p.info.isFard) // Только 5 обязательных (без Sunrise)
            .map((prayer, index) => (
              <div
                key={prayer.name}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 80}ms`, animationFillMode: "both" }}
              >
                <PrayerCard 
                  prayer={prayer} 
                  logStatus={logs[prayer.name]?.status}
                  onClick={() => {
                    setSelectedPrayer(prayer);
                    setIsModalOpen(true);
                  }}
                />
              </div>
            ))}

          {/* Sunrise — отдельно, мелко */}
          {prayers
            .filter((p) => !p.info.isFard)
            .map((prayer) => (
              <div key={prayer.name} className="mt-1">
                <div className="flex items-center justify-between rounded-xl bg-neutral-50 px-4 py-2 dark:bg-neutral-900/40">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{prayer.info.icon}</span>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400">
                      {prayer.info.nameRu}
                    </span>
                  </div>
                  <span className="font-mono text-xs text-neutral-400 dark:text-neutral-500">
                    {prayer.time}
                  </span>
                </div>
              </div>
            ))}
        </div>
      )}

      {/* ── Refresh button ───────────────────── */}
      {!isLoading && !error && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={refresh}
            className="flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-600 dark:hover:bg-neutral-800 dark:hover:text-neutral-300"
          >
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Обновить
          </button>
        </div>
      )}
    </div>
  );
}
