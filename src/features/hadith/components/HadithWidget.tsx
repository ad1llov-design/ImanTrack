/**
 * @module features/hadith/components/HadithWidget
 *
 * Компактный виджет для дашборда.
 * Показывает краткий текст хадиса дня с ссылкой на полный вид.
 */

"use client";

import Link from "next/link";

import { cn } from "@shared/lib/utils";
import { useHadithStore } from "../store/hadithStore";

interface HadithWidgetProps {
  className?: string;
}

export function HadithWidget({ className }: HadithWidgetProps) {
  const { currentHadith, isLoading } = useHadithStore();

  if (isLoading || !currentHadith) {
    return (
      <div
        className={cn(
          "rounded-2xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900",
          className,
        )}
      >
        <div className="h-4 w-20 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700" />
        <div className="mt-3 h-12 w-full animate-pulse rounded bg-neutral-100 dark:bg-neutral-800" />
        <div className="mt-2 h-10 w-full animate-pulse rounded bg-neutral-100 dark:bg-neutral-800" />
      </div>
    );
  }

  // Truncate Arabic text for widget
  const shortArabic =
    currentHadith.arabic.length > 80
      ? currentHadith.arabic.slice(0, 80) + "..."
      : currentHadith.arabic;

  const shortTranslation =
    currentHadith.translation.length > 100
      ? currentHadith.translation.slice(0, 100) + "..."
      : currentHadith.translation;

  return (
    <Link
      href="/hadith"
      className={cn(
        "group block overflow-hidden rounded-2xl border border-gold-200 bg-gradient-to-br from-gold-50 to-white p-5 transition-all hover:shadow-card dark:border-gold-800 dark:from-gold-950/20 dark:to-surface-dark-secondary",
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-wider text-gold-600 dark:text-gold-400">
          📖 Хадис дня
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

      {/* Arabic preview */}
      <p className="mt-3 line-clamp-2 font-arabic text-sm leading-loose text-neutral-800 dark:text-neutral-200">
        {shortArabic}
      </p>

      {/* Translation preview */}
      <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
        {shortTranslation}
      </p>

      {/* Source */}
      <p className="mt-3 text-[0.6rem] text-neutral-400 dark:text-neutral-600">
        — {currentHadith.narrator}
      </p>
    </Link>
  );
}
