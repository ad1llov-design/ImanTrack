/**
 * @module features/hadith/components/HadithPageContent
 *
 * Client component для страницы /hadith.
 * Использует useHadith() хук для всех данных и действий.
 */

"use client";

import { useHadith } from "../hooks/useHadith";
import { getFavoriteHadiths } from "../services/hadith.service";
import { HadithCard } from "./HadithCard";

export function HadithPageContent() {
  const {
    currentHadith,
    favorites,
    isFavorite,
    isLoading,
    isCopied,
    isShared,
    showNext,
    showToday,
    toggleFavorite,
    copy,
    share,
  } = useHadith();

  // Skeleton
  if (isLoading || !currentHadith) {
    return (
      <div className="mx-auto max-w-xl px-4 py-8">
        <div className="h-8 w-40 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700" />
        <div className="mt-8 h-96 w-full animate-pulse rounded-3xl bg-neutral-100 dark:bg-neutral-800" />
      </div>
    );
  }

  const favHadiths = getFavoriteHadiths(favorites);

  return (
    <div className="mx-auto max-w-xl px-4 py-8 sm:py-12">

      {/* ── Header ───────────────────────────── */}
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50">
          📖 Хадис дня
        </h1>
        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
          Мудрость Пророка ﷺ на каждый день
        </p>
      </div>

      {/* ── Main hadith card ─────────────────── */}
      <HadithCard
        hadith={currentHadith}
        isFavorite={isFavorite}
        isCopied={isCopied}
        isShared={isShared}
        onToggleFavorite={() => toggleFavorite(currentHadith.id)}
        onCopy={copy}
        onShare={share}
        onNext={showNext}
        onShowToday={showToday}
      />

      {/* ── Favorites section ────────────────── */}
      {favHadiths.length > 0 && (
        <div className="mt-12">
          <h2 className="mb-4 text-lg font-semibold text-neutral-800 dark:text-neutral-200">
            ❤️ Избранные хадисы
            <span className="ml-2 text-sm font-normal text-neutral-400">
              ({favHadiths.length})
            </span>
          </h2>

          <div className="space-y-4">
            {favHadiths.map((hadith) => (
              <div
                key={hadith.id}
                className="rounded-2xl border border-neutral-100 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900"
              >
                {/* Arabic */}
                <p className="line-clamp-2 font-arabic text-sm leading-loose text-neutral-800 dark:text-neutral-200">
                  {hadith.arabic}
                </p>

                {/* Translation */}
                <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
                  {hadith.translation}
                </p>

                {/* Source + actions */}
                <div className="mt-3 flex items-center justify-between">
                  <p className="text-[0.6rem] text-neutral-400 dark:text-neutral-600">
                    — {hadith.narrator}
                  </p>
                  <button
                    onClick={() => toggleFavorite(hadith.id)}
                    className="text-xs text-red-400 transition-colors hover:text-red-600"
                    aria-label="Убрать из избранного"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Quran footer ─────────────────────── */}
      <div className="mt-12 rounded-2xl border border-primary-200 bg-gradient-to-br from-primary-50 to-white p-6 text-center dark:border-primary-800 dark:from-primary-950/20 dark:to-surface-dark">
        <p className="font-arabic text-lg leading-loose text-primary-700 dark:text-primary-300">
          وَمَا يَنطِقُ عَنِ الْهَوَىٰ ۝ إِنْ هُوَ إِلَّا وَحْيٌ يُوحَىٰ
        </p>
        <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">
          «И он не говорит от себя. Это — лишь откровение, которое ниспосылается» (53:3-4)
        </p>
      </div>
    </div>
  );
}
