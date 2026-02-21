/**
 * @module features/adhkar/components/CategoryCard
 *
 * Карточка категории зикров в списке.
 * Показывает название, иконку, прогресс и количество зикров.
 */

"use client";

import Link from "next/link";

import { cn } from "@shared/lib/utils";
import { getDhikrsByCategory } from "../data/adhkar.data";
import { useAdhkarStore } from "../store/adhkarStore";
import type { CategoryInfo } from "../types/adhkar.types";

interface CategoryCardProps {
  category: CategoryInfo;
  index: number;
}

export function CategoryCard({ category, index }: CategoryCardProps) {
  const { progress } = useAdhkarStore();

  const dhikrs = getDhikrsByCategory(category.id);
  const completedCount = dhikrs.filter(
    (d) => progress[d.id]?.isCompleted,
  ).length;
  const percentage =
    dhikrs.length > 0 ? Math.round((completedCount / dhikrs.length) * 100) : 0;
  const isAllDone = percentage === 100;

  const colorMap: Record<string, { bg: string; border: string; text: string; bar: string }> = {
    gold: {
      bg: "from-gold-50 to-white dark:from-gold-950/20 dark:to-surface-dark",
      border: "border-gold-200 dark:border-gold-800",
      text: "text-gold-700 dark:text-gold-300",
      bar: "bg-gold-500",
    },
    primary: {
      bg: "from-primary-50 to-white dark:from-primary-950/20 dark:to-surface-dark",
      border: "border-primary-200 dark:border-primary-800",
      text: "text-primary-700 dark:text-primary-300",
      bar: "bg-primary-500",
    },
    secondary: {
      bg: "from-secondary-50 to-white dark:from-secondary-950/20 dark:to-surface-dark",
      border: "border-secondary-200 dark:border-secondary-800",
      text: "text-secondary-700 dark:text-secondary-300",
      bar: "bg-secondary-500",
    },
    neutral: {
      bg: "from-neutral-50 to-white dark:from-neutral-900/30 dark:to-surface-dark",
      border: "border-neutral-200 dark:border-neutral-800",
      text: "text-neutral-700 dark:text-neutral-300",
      bar: "bg-neutral-500",
    },
  };

  const colors = colorMap[category.color] ?? colorMap.primary;

  return (
    <Link
      href={`/adhkar/${category.id}`}
      className={cn(
        "group relative block overflow-hidden rounded-2xl border bg-gradient-to-br p-5 transition-all duration-300 hover:shadow-card active:scale-[0.98]",
        "animate-fade-in-up",
        colors.bg,
        colors.border,
        isAllDone && "ring-2 ring-primary-400/30",
      )}
      style={{
        animationDelay: `${index * 80}ms`,
        animationFillMode: "both",
      }}
    >
      {/* ── Top: Icon + Info ──────────────────── */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/60 text-2xl shadow-sm backdrop-blur-sm dark:bg-neutral-800/60">
            {category.icon}
          </span>
          <div>
            <h3 className={cn("font-semibold", colors.text)}>
              {category.nameRu}
            </h3>
            <p className="font-arabic text-xs text-neutral-400 dark:text-neutral-500">
              {category.nameAr}
            </p>
          </div>
        </div>

        {/* Completion badge */}
        {isAllDone && (
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-100 text-sm dark:bg-primary-900/40">
            ✓
          </span>
        )}
      </div>

      {/* ── Description ──────────────────────── */}
      <p className="mt-3 text-xs text-neutral-500 dark:text-neutral-400">
        {category.description}
      </p>

      {/* ── Progress ─────────────────────────── */}
      <div className="mt-4">
        <div className="flex items-center justify-between text-[0.65rem]">
          <span className="text-neutral-400">
            {completedCount} из {dhikrs.length} зикров
          </span>
          <span className={cn("font-semibold", colors.text)}>
            {percentage}%
          </span>
        </div>
        <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-800">
          <div
            className={cn(
              "h-full rounded-full transition-all duration-700 ease-out",
              colors.bar,
            )}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Arrow */}
      <svg
        className="absolute bottom-5 right-5 h-4 w-4 text-neutral-300 transition-transform group-hover:translate-x-0.5 dark:text-neutral-600"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </Link>
  );
}
