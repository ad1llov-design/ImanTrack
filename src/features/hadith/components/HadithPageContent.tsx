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
import { HADITH_COLLECTIONS } from "../data/collections";
import Link from "next/link";
import { BookMarked, Library } from "lucide-react";

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

  // Skeleton — but only for a max of 3 seconds
  if (isLoading) {
    return (
      <div className="mx-auto max-w-xl px-4 py-8">
        <div className="h-8 w-40 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700" />
        <div className="mt-8 h-96 w-full animate-pulse rounded-3xl bg-neutral-100 dark:bg-neutral-800" />
      </div>
    );
  }

  // If no hadith loaded for some reason, show a fallback message
  if (!currentHadith) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center">
        <p className="text-lg font-semibold text-main">Не удалось загрузить хадис</p>
        <p className="mt-2 text-sm text-muted">Попробуйте обновить страницу</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 rounded-xl bg-primary-500 px-6 py-2 text-sm font-bold text-white hover:bg-primary-600 transition-colors"
        >
          Обновить
        </button>
      </div>
    );
  }

  const favHadiths = getFavoriteHadiths(favorites);

  return (
    <div className="mx-auto max-w-xl px-4 py-8 sm:py-12">

      {/* ── Header ───────────────────────────── */}
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50 flex items-center justify-center gap-2">
          <BookMarked className="h-6 w-6 text-primary-500" /> Хадис дня
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

      {/* ── Collections section ────────────────── */}
      <div className="mt-12">
        <h2 className="mb-4 text-lg font-bold text-neutral-900 dark:text-neutral-50 flex items-center gap-2">
          <Library className="h-5 w-5 text-primary-500" /> Сборники Хадисов
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {HADITH_COLLECTIONS.map((collection) => (
            <Link 
              key={collection.id} 
              href={`/hadith/${collection.id}`}
              className="group relative overflow-hidden rounded-2xl border border-border bg-surface p-5 shadow-sm transition-all hover:border-primary-500 hover:shadow-md h-full flex flex-col justify-between"
            >
              <div>
                <h3 className="text-display font-bold text-main group-hover:text-primary-500 transition-colors">
                  {collection.name}
                </h3>
                <p className="mt-1 text-xs text-muted font-medium mb-3">
                  {collection.author}
                </p>
                <p className="text-xs text-neutral-500 leading-relaxed mb-4">
                  {collection.description}
                </p>
              </div>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-[10px] uppercase font-bold tracking-widest text-primary-500 bg-primary-500/10 px-2 py-1 rounded-md">
                  {collection.count} Хадисов
                </span>
                <span className="text-muted group-hover:text-primary-500 transition-colors">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ── Favorites section ────────────────── */}
      {favHadiths.length > 0 && (
        <div className="mt-12">
          <h2 className="mb-4 text-lg font-bold text-neutral-800 dark:text-neutral-200">
            ❤️ Избранные хадисы
            <span className="ml-2 text-sm font-normal text-neutral-400">
              ({favHadiths.length})
            </span>
          </h2>

          <div className="space-y-4">
            {favHadiths.map((hadith) => (
              <div
                key={hadith.id}
                className="rounded-2xl border border-border bg-surface p-5"
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
      <div className="mt-12 rounded-2xl border border-primary-200 bg-gradient-to-br from-primary-50 to-white p-6 text-center dark:border-primary-800 dark:from-primary-950/20 dark:to-neutral-900">
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
