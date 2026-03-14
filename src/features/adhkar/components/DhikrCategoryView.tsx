/**
 * @module features/adhkar/components/DhikrCategoryView
 *
 * Полный вид категории: counter + индикатор позиции + прогресс.
 * Это клиентский компонент для страницы /adhkar/[category].
 */

"use client";

import Link from "next/link";

import { cn } from "@shared/lib/utils";
import { getCategoryInfo } from "../data/adhkar.data";
import { useAdhkar } from "../hooks/useAdhkar";
import type { AdhkarCategory } from "../types/adhkar.types";
import { DhikrCounter } from "./DhikrCounter";
import { useLanguage } from "@shared/i18n/LanguageContext";
import { 
  Sunrise, 
  Moon, 
  Heart, 
  Sun, 
  MoonStar,
  Sparkles,
  LucideIcon
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  "sunrise": Sunrise,
  "moon": Moon,
  "sparkles": Sparkles,
  "heart": Heart,
  "moon-star": MoonStar,
  "sun": Sun,
};

interface DhikrCategoryViewProps {
  categoryId: AdhkarCategory;
}

export function DhikrCategoryView({ categoryId }: DhikrCategoryViewProps) {
  const {
    dhikrs,
    currentDhikr,
    currentProgress,
    activeDhikrIndex,
    categoryProgress,
    allProgress,
    isLoading,
    increment,
    resetCurrent,
    goNext,
    goPrev,
    setDhikrIndex,
  } = useAdhkar(categoryId);
  const { t, language } = useLanguage();

  const category = getCategoryInfo(categoryId);

  if (!category) {
    return (
      <div className="py-20 text-center">
        <p className="text-neutral-500">{t("common.error")}</p>
      </div>
    );
  }

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="mx-auto max-w-lg px-4 py-8">
        <div className="h-6 w-48 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700" />
        <div className="mt-8 h-64 animate-pulse rounded-2xl bg-neutral-100 dark:bg-neutral-800" />
        <div className="mx-auto mt-8 h-60 w-60 animate-pulse rounded-full bg-neutral-100 dark:bg-neutral-800" />
      </div>
    );
  }

  if (!currentDhikr) {
    return (
      <div className="py-20 text-center">
        <p className="text-neutral-500">{t("common.error")}</p>
      </div>
    );
  }

  const allComplete = categoryProgress?.percentage === 100;

  return (
    <div className="mx-auto max-w-lg px-4 pt-6 pb-[calc(4rem+env(safe-area-inset-bottom)+2rem)] md:py-10">

      {/* ── Header ───────────────────────────── */}
      <div className="mb-6 flex items-center justify-between">
        <Link
          href="/adhkar"
          className="flex items-center gap-1.5 text-sm text-neutral-500 transition-colors hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          {t("common.back")}
        </Link>

        {/* Category info */}
        <div className="flex items-center gap-2">
          {(() => {
            const IconComp = iconMap[category.icon];
            return IconComp ? (
              <IconComp className="h-5 w-5 text-neutral-400 dark:text-neutral-500" strokeWidth={2} />
            ) : null;
          })()}
          <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
            {category.translations?.[language as keyof typeof category.translations] || category.nameRu}
          </span>
        </div>
      </div>

      {/* ── Category progress ────────────────── */}
      {categoryProgress && (
        <div className="mb-8 rounded-2xl border border-neutral-100 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
          <div className="flex items-center justify-between text-xs">
            <span className="text-neutral-500 dark:text-neutral-400">
              {categoryProgress.completedDhikrs} / {categoryProgress.totalDhikrs}
            </span>
            <span className={cn(
              "font-semibold",
              allComplete ? "text-gold-600 dark:text-gold-400" : "text-primary-600 dark:text-primary-400",
            )}>
              {categoryProgress.percentage}%
            </span>
          </div>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-800">
            <div
              className={cn(
                "h-full rounded-full transition-all duration-700 ease-out",
                allComplete ? "bg-gold-500" : "bg-primary-500",
              )}
              style={{ width: `${categoryProgress.percentage}%` }}
            />
          </div>

          {/* Dhikr dots navigation */}
          <div className="mt-3 flex items-center justify-center gap-1.5">
            {dhikrs.map((d, i) => {
              const isActive = i === activeDhikrIndex;
              const isDone = !!allProgress[d.id]?.isCompleted;

              return (
                <button
                  key={d.id}
                  onClick={() => setDhikrIndex(i)}
                  className={cn(
                    "h-2 rounded-full transition-all duration-200",
                    isActive ? "w-6 bg-primary-500" : "w-2",
                    !isActive && isDone && "bg-gold-400",
                    !isActive && !isDone && "bg-neutral-200 dark:bg-neutral-700",
                  )}
                  aria-label={`Перейти к зикру ${i + 1}`}
                />
              );
            })}
          </div>
        </div>
      )}

      {/* ── Counter ──────────────────────────── */}
      <DhikrCounter
        dhikr={currentDhikr}
        progress={currentProgress || null}
        onIncrement={increment}
        onReset={resetCurrent}
        onNext={goNext}
        onPrev={goPrev}
        currentIndex={activeDhikrIndex}
        totalCount={dhikrs.length}
      />

      {/* ── All complete celebration ─────────── */}
      {allComplete && (
        <div className="mt-8 animate-fade-in rounded-2xl border border-gold-200 bg-gradient-to-br from-gold-50 to-white p-6 text-center dark:border-gold-800 dark:from-gold-950/20 dark:to-surface-dark">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold-100/50 dark:bg-gold-900/30">
            <Sparkles className="h-8 w-8 text-gold-600 dark:text-gold-400" />
          </div>
          <p className="mt-4 font-arabic text-xl text-gold-600 dark:text-gold-400">
            ماشاء الله तبارك الله
          </p>
          <Link
            href="/adhkar"
            className="mt-4 inline-block rounded-xl bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-700 dark:bg-primary-500"
          >
            {t("common.back")}
          </Link>
        </div>
      )}
    </div>
  );
}
