/**
 * @module features/tracker/components/TrackerPageContent
 *
 * Главный контент страницы прогресса.
 */

"use client";

import { useEffect } from "react";
import { useTrackerStore } from "../store/trackerStore";
import { StreakCard } from "./StreakCard";
import { ActivityChart } from "./ActivityChart";
import { AchievementGrid } from "./AchievementGrid";
import { motion } from "framer-motion";

export function TrackerPageContent() {
  const { 
    streak, 
    dailyActivity, 
    achievements, 
    stats, 
    isLoading, 
    refreshTracker 
  } = useTrackerStore();

  useEffect(() => {
    void refreshTracker();
  }, [refreshTracker]);

  if (isLoading && dailyActivity.length === 0) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="h-40 w-full animate-pulse rounded-3xl bg-neutral-100 dark:bg-neutral-800" />
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="h-64 animate-pulse rounded-3xl bg-neutral-100 dark:bg-neutral-800 md:col-span-2" />
          <div className="h-64 animate-pulse rounded-3xl bg-neutral-100 dark:bg-neutral-800" />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:py-12">
      {/* ── Header ───────────────────────────── */}
      <header className="mb-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-100 text-3xl dark:bg-primary-950/30"
        >
          📈
        </motion.div>
        <h1 className="text-3xl font-extrabold text-neutral-900 dark:text-white sm:text-4xl">
          Твой Прогресс
        </h1>
        <p className="mt-2 text-neutral-500 dark:text-neutral-400">
          Следи за своим ростом и собирай награды за благие дела
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Streak & Key Stats */}
        <div className="space-y-6 md:col-span-3">
          <StreakCard streak={streak} />
        </div>

        {/* Global Statistics */}
        <div className="grid grid-cols-2 gap-4 md:col-span-3 lg:grid-cols-4">
          <StatMiniCard 
            label="Всего намазов" 
            value={stats.totalPrayers} 
            icon="🕌" 
            color="text-blue-500" 
          />
          <StatMiniCard 
            label="Всего азкаров" 
            value={stats.totalAdhkars} 
            icon="📿" 
            color="text-emerald-500" 
          />
          <StatMiniCard 
            label="Хадисов прочитано" 
            value={stats.totalHadithsRead} 
            icon="📚" 
            color="text-amber-500" 
          />
          <StatMiniCard 
            label="Лучший стрик" 
            value={streak.bestStreak} 
            icon="🏆" 
            color="text-rose-500" 
          />
        </div>

        {/* Charts Section */}
        <div className="md:col-span-2">
          <ActivityChart data={dailyActivity} />
        </div>

        {/* Level/Ranks mini widget (placeholder) */}
        <div className="rounded-3xl border border-neutral-100 bg-white p-6 dark:border-neutral-800 dark:bg-surface-dark-secondary">
          <h3 className="mb-4 font-semibold text-neutral-800 dark:text-neutral-200">Твой Ранг</h3>
          <div className="flex flex-col items-center">
            <div className="relative mb-4 flex h-24 w-24 items-center justify-center rounded-full border-4 border-primary-500 bg-primary-50 dark:bg-primary-900/20">
               <span className="text-4xl">🌱</span>
            </div>
            <p className="text-lg font-bold text-neutral-900 dark:text-white">Новичок</p>
            <p className="text-[0.65rem] uppercase tracking-widest text-neutral-400">Начало пути</p>
            
            <div className="mt-6 w-full space-y-2">
              <div className="flex justify-between text-xs">
                 <span className="text-neutral-500">До след. ранга</span>
                 <span className="font-bold text-primary-600">45%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-neutral-100 dark:bg-neutral-800">
                 <div className="h-full w-[45%] rounded-full bg-primary-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Achievements Section */}
        <div className="mt-4 md:col-span-3">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
              Достижения
            </h2>
            <button className="text-sm font-medium text-primary-600 dark:text-primary-400">
              Все награды →
            </button>
          </div>
          <AchievementGrid achievements={achievements} />
        </div>
      </div>
    </div>
  );
}

function StatMiniCard({ label, value, icon, color }: { label: string; value: number; icon: string; color: string }) {
  return (
    <div className="rounded-3xl border border-neutral-100 bg-white p-5 dark:border-neutral-800 dark:bg-surface-dark-secondary">
      <div className="mb-2 text-xl">{icon}</div>
      <p className="text-2xl font-black text-neutral-900 dark:text-white tabular-nums">
        {value}
      </p>
      <p className="text-[0.65rem] font-medium uppercase tracking-wider text-neutral-400">
        {label}
      </p>
    </div>
  );
}
