/**
 * @module features/hadith/components/HadithCard
 *
 * Премиальная карточка хадиса.
 * Минималистичный дизайн с исламской эстетикой:
 * - Арабский текст (крупный, с межстрочным интервалом)
 * - Русский перевод
 * - Передатчик + источник
 * - Кнопки: ❤️ Избранное | 📋 Копировать | 📤 Поделиться | ↻ Следующий
 */

"use client";

import { cn } from "@shared/lib/utils";
import { getCollectionInfo } from "../data/hadith.collection";
import type { Hadith } from "../types/hadith.types";

interface HadithCardProps {
  hadith: Hadith;
  isFavorite: boolean;
  isCopied: boolean;
  isShared: boolean;
  onToggleFavorite: () => void;
  onCopy: () => void;
  onShare: () => void;
  onNext: () => void;
  onShowToday?: () => void;
  className?: string;
}

export function HadithCard({
  hadith,
  isFavorite,
  isCopied,
  isShared,
  onToggleFavorite,
  onCopy,
  onShare,
  onNext,
  onShowToday,
  className,
}: HadithCardProps) {
  const collection = getCollectionInfo(hadith.collection);

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-3xl border border-border bg-surface shadow-card transition-all",
        className,
      )}
    >
      {/* ── Decorative top border ─────────────── */}
      <div className="h-1 w-full bg-gradient-to-r from-primary-400 via-gold-400 to-primary-400" />

      {/* ── Content ──────────────────────────── */}
      <div className="p-6 sm:p-8">

        {/* Topic badge */}
        {hadith.topic && (
          <div className="mb-5 flex items-center justify-center">
            <span className="rounded-full border border-primary-200 bg-primary-50 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-primary-700 dark:border-primary-800 dark:bg-primary-950/30 dark:text-primary-300">
              {hadith.topic}
            </span>
          </div>
        )}

        {/* ── Bismillah ornament ──────────────── */}
        <div className="mb-6 flex justify-center">
          <svg className="h-6 w-24 text-gold-400/60 dark:text-gold-600/40" viewBox="0 0 120 24" fill="none">
            <path d="M0 12h48M72 12h48" stroke="currentColor" strokeWidth="0.5" />
            <circle cx="60" cy="12" r="4" stroke="currentColor" strokeWidth="0.5" fill="none" />
            <circle cx="60" cy="12" r="1.5" fill="currentColor" />
          </svg>
        </div>

        {/* ── Arabic text ────────────────────── */}
        <blockquote className="text-center">
          <p className="font-arabic text-xl leading-[2.4] text-neutral-900 dark:text-neutral-50 sm:text-2xl">
            {hadith.arabic}
          </p>
        </blockquote>

        {/* ── Divider ────────────────────────── */}
        <div className="my-6 flex justify-center">
          <svg className="h-4 w-16 text-neutral-200 dark:text-neutral-700" viewBox="0 0 80 16" fill="none">
            <path d="M0 8h32M48 8h32" stroke="currentColor" strokeWidth="0.5" />
            <path d="M36 8l4-4 4 4-4 4z" fill="currentColor" opacity="0.4" />
          </svg>
        </div>

        {/* ── Translation ────────────────────── */}
        <p className="text-center text-sm leading-relaxed text-neutral-600 dark:text-neutral-300 sm:text-base">
          {hadith.translation}
        </p>

        {/* ── Narrator & Source ───────────────── */}
        <div className="mt-6 flex flex-col items-center gap-1.5 text-center">
          {/* Narrator */}
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            <span className="mr-1 text-neutral-300 dark:text-neutral-600">—</span>
            {hadith.narrator}
            {hadith.narratorAr && (
              <span className="ml-1.5 font-arabic text-neutral-400 dark:text-neutral-500">
                ({hadith.narratorAr})
              </span>
            )}
          </p>

          {/* Source */}
          <div className="flex items-center gap-1.5 text-[0.65rem] text-neutral-400 dark:text-neutral-500">
            <span>📖</span>
            <span>
              {collection?.nameRu ?? hadith.collection}
              {hadith.number && ` #${hadith.number}`}
            </span>
            {hadith.grade && (
              <>
                <span className="text-neutral-200 dark:text-neutral-700">•</span>
                <span
                  className={cn(
                    "rounded-full px-1.5 py-0.5 text-[0.6rem] font-medium",
                    hadith.grade === "Сахих"
                      ? "bg-primary-50 text-primary-600 dark:bg-primary-950/30 dark:text-primary-400"
                      : "bg-gold-50 text-gold-600 dark:bg-gold-950/30 dark:text-gold-400",
                  )}
                >
                  {hadith.grade}
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ── Action buttons ────────────────────── */}
      <div className="border-t border-border px-4 py-3">
        <div className="flex items-center justify-center gap-1">

          {/* Favorite */}
          <button
            onClick={onToggleFavorite}
            className={cn(
              "flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs transition-all",
              isFavorite
                ? "bg-red-50 text-red-500 dark:bg-red-950/20 dark:text-red-400"
                : "text-neutral-400 hover:bg-neutral-50 hover:text-red-500 dark:hover:bg-neutral-800 dark:hover:text-red-400",
            )}
            aria-label={isFavorite ? "Убрать из избранного" : "Добавить в избранное"}
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill={isFavorite ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span className="hidden sm:inline">
              {isFavorite ? "В избранном" : "В избранное"}
            </span>
          </button>

          {/* Copy */}
          <button
            onClick={onCopy}
            className={cn(
              "flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs transition-all",
              isCopied
                ? "bg-primary-50 text-primary-600 dark:bg-primary-950/20 dark:text-primary-400"
                : "text-neutral-400 hover:bg-neutral-50 hover:text-neutral-700 dark:hover:bg-neutral-800 dark:hover:text-neutral-200",
            )}
            aria-label="Скопировать"
          >
            {isCopied ? (
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            )}
            <span className="hidden sm:inline">
              {isCopied ? "Скопировано!" : "Копировать"}
            </span>
          </button>

          {/* Share */}
          <button
            onClick={onShare}
            className={cn(
              "flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs transition-all",
              isShared
                ? "bg-primary-50 text-primary-600 dark:bg-primary-950/20 dark:text-primary-400"
                : "text-neutral-400 hover:bg-neutral-50 hover:text-neutral-700 dark:hover:bg-neutral-800 dark:hover:text-neutral-200",
            )}
            aria-label="Поделиться"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            <span className="hidden sm:inline">
              {isShared ? "Отправлено!" : "Поделиться"}
            </span>
          </button>

          {/* Next hadith */}
          <button
            onClick={onNext}
            className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs text-neutral-400 transition-all hover:bg-neutral-50 hover:text-neutral-700 dark:hover:bg-neutral-800 dark:hover:text-neutral-200"
            aria-label="Следующий хадис"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span className="hidden sm:inline">Другой</span>
          </button>
        </div>

        {/* Back to today */}
        {onShowToday && (
          <div className="mt-1 flex justify-center">
            <button
              onClick={onShowToday}
              className="text-[0.6rem] text-neutral-300 transition-colors hover:text-primary-500 dark:text-neutral-700 dark:hover:text-primary-400"
            >
              Вернуть хадис дня
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
