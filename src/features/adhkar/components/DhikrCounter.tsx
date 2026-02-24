/**
 * @module features/adhkar/components/DhikrCounter
 *
 * Главный компонент — тактильный счётчик зикра.
 *
 * Особенности:
 * - Огромная кнопка-тап для мобильных
 * - Круговой прогресс (SVG)
 * - Анимация при касании (scale bounce)
 * - Мотивационные сообщения при прогрессе
 * - Haptic vibration на мобильных
 * - Навигация между зикрами (prev/next + swipe)
 */

"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@shared/lib/utils";
import { getMotivationMessage } from "../data/adhkar.data";
import type { Dhikr, DhikrProgress } from "../types/adhkar.types";
import { useLanguage } from "@shared/i18n/LanguageContext";

interface DhikrCounterProps {
  dhikr: Dhikr;
  progress: DhikrProgress | null;
  onIncrement: () => void;
  onReset: () => void;
  onNext: () => void;
  onPrev: () => void;
  currentIndex: number;
  totalCount: number;
}

/* ── Circular Progress SVG ──────────────────────────────────────────── */

function CircularProgress({
  current,
  target,
  size = 240,
  strokeWidth = 8,
}: {
  current: number;
  target: number;
  size?: number;
  strokeWidth?: number;
}) {
  const s = size ?? 240;
  const sw = strokeWidth ?? 8;
  const radius = (s - sw) / 2;
  const circumference = 2 * Math.PI * radius;
  const percentage = Math.min(current / (target || 1), 1);
  const strokeDashoffset = circumference * (1 - percentage);
  const isComplete = current >= target;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="rotate-[-90deg]"
    >
      {/* Background circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        className="text-neutral-100 dark:text-neutral-800"
      />
      {/* Progress circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        className={cn(
          "transition-all duration-300 ease-out",
          isComplete
            ? "text-gold-500"
            : "text-primary-500",
        )}
      />
    </svg>
  );
}

/* ── Main Component ─────────────────────────────────────────────────── */

export function DhikrCounter({
  dhikr,
  progress,
  onIncrement,
  onReset,
  onNext,
  onPrev,
  currentIndex,
  totalCount,
}: DhikrCounterProps) {
  const { t, language } = useLanguage();
  const currentCount = progress?.currentCount ?? 0;
  const isComplete = currentCount >= dhikr.targetCount;
  const percentage = Math.round(
    (currentCount / dhikr.targetCount) * 100,
  );

  const [isTapped, setIsTapped] = useState(false);
  const [showMotivation, setShowMotivation] = useState(false);
  const lastPercentageRef = useRef(0);
  const tapTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const motivation = getMotivationMessage(percentage);

  // ── Tap animation ───────────────────────────────────────────────────

  const handleTap = useCallback(() => {
    if (isComplete) return;

    onIncrement();

    // Bounce animation
    setIsTapped(true);
    if (tapTimeoutRef.current) clearTimeout(tapTimeoutRef.current);
    tapTimeoutRef.current = setTimeout(() => setIsTapped(false), 150);
  }, [isComplete, onIncrement]);

  // ── Motivation message trigger ──────────────────────────────────────

  useEffect(() => {
    // Показываем мотивацию при переходе через порог
    const thresholds = [10, 25, 50, 75, 100];
    const crossed = thresholds.some(
      (t) => percentage >= t && lastPercentageRef.current < t,
    );

    if (crossed && percentage > 0) {
      setShowMotivation(true);
      const timer = setTimeout(() => setShowMotivation(false), 3000);
      lastPercentageRef.current = percentage;
      return () => clearTimeout(timer);
    }

    lastPercentageRef.current = percentage;
    return undefined;
  }, [percentage]);

  // ── Keyboard support ────────────────────────────────────────────────

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        handleTap();
      }
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleTap, onNext, onPrev]);

  return (
    <div className="flex flex-col items-center">

      {/* ── Arabic text ──────────────────────── */}
      <div className="mb-8 w-full rounded-2xl border border-neutral-100 bg-white p-6 text-center shadow-card dark:border-neutral-800 dark:bg-neutral-900">
        <p className="font-arabic text-xl leading-[2.2] text-neutral-900 dark:text-neutral-50 sm:text-2xl">
          {dhikr.arabic}
        </p>

        {/* Transliteration */}
        <p className="mt-4 text-sm italic text-neutral-500 dark:text-neutral-400">
          {dhikr.transliteration}
        </p>

        {/* Translation */}
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
          {dhikr.translations?.[language as keyof typeof dhikr.translations] || dhikr.translation}
        </p>

        {/* Reference */}
        <p className="mt-3 text-xs text-neutral-400 dark:text-neutral-600">
          📖 {dhikr.reference}
        </p>

        {/* Virtue */}
        {dhikr.virtue && (
          <div className="mt-4 rounded-xl bg-gold-50 px-4 py-2 dark:bg-gold-950/20">
            <p className="text-xs text-gold-700 dark:text-gold-300">
              ✨ {dhikr.virtueTranslations?.[language as keyof typeof dhikr.virtueTranslations] || dhikr.virtue}
            </p>
          </div>
        )}
      </div>

      {/* ── Counter ring + tap button ────────── */}
      <div className="relative mb-6">
        {/* Circular progress */}
        <CircularProgress
          current={currentCount}
          target={dhikr.targetCount}
        />

        {/* Tap button (centered inside ring) */}
        <button
          onClick={handleTap}
          disabled={isComplete}
          aria-label={`Тап для подсчёта. ${currentCount} из ${dhikr.targetCount}`}
          className={cn(
            "absolute inset-0 m-auto flex h-44 w-44 flex-col items-center justify-center rounded-full transition-all duration-150 sm:h-52 sm:w-52",
            // Tap animation
            isTapped && "scale-95",
            // States
            isComplete
              ? "bg-gold-50 dark:bg-gold-950/20"
              : "bg-primary-50 active:bg-primary-100 dark:bg-primary-950/20 dark:active:bg-primary-900/30",
            // Disabled
            isComplete && "cursor-default",
          )}
        >
          {isComplete ? (
            <>
              <span className="text-4xl">✓</span>
              <span className="mt-1 text-sm font-semibold text-gold-600 dark:text-gold-400">
                {t("common.save")}
              </span>
            </>
          ) : (
            <>
              <span className="font-mono text-5xl font-bold tabular-nums text-primary-700 dark:text-primary-300 sm:text-6xl">
                {currentCount}
              </span>
              <span className="mt-1 text-xs text-neutral-400">
                / {dhikr.targetCount}
              </span>
            </>
          )}
        </button>
      </div>

      {/* ── Motivation message ────────────────── */}
      <div
        className={cn(
          "mb-4 min-h-[3rem] text-center transition-all duration-500",
          showMotivation
            ? "translate-y-0 opacity-100"
            : "translate-y-2 opacity-0",
        )}
      >
        <p className="font-arabic text-lg text-gold-600 dark:text-gold-400">
          {motivation.arabic}
        </p>
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          {motivation.translation}
        </p>
      </div>

      {/* ── Action buttons ────────────────────── */}
      <div className="flex items-center gap-4">
        {/* Reset */}
        <button
          onClick={onReset}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-200 text-neutral-400 transition-all hover:border-red-300 hover:bg-red-50 hover:text-red-500 dark:border-neutral-700 dark:hover:border-red-800 dark:hover:bg-red-950/20 dark:hover:text-red-400"
          aria-label="Сбросить"
          title="Сбросить счётчик"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>

        {/* Navigation info */}
        <span className="text-xs text-neutral-400 dark:text-neutral-500">
          {currentIndex + 1} / {totalCount}
        </span>
      </div>

      {/* ── Navigation (prev/next) ────────────── */}
      <div className="mt-6 flex w-full max-w-xs items-center justify-between">
        <button
          onClick={onPrev}
          disabled={currentIndex === 0}
          className="flex h-12 w-12 items-center justify-center rounded-xl border border-neutral-200 transition-all hover:bg-neutral-50 disabled:opacity-30 dark:border-neutral-700 dark:hover:bg-neutral-800"
          aria-label="Предыдущий зикр"
        >
          <svg className="h-5 w-5 text-neutral-600 dark:text-neutral-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Auto-next on complete */}
        {isComplete && currentIndex < totalCount - 1 && (
          <button
            onClick={onNext}
            className="rounded-xl bg-primary-600 px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-primary-700 active:scale-[0.97] dark:bg-primary-500"
          >
             {t("hadith.next")} →
          </button>
        )}

        <button
          onClick={onNext}
          disabled={currentIndex >= totalCount - 1}
          className="flex h-12 w-12 items-center justify-center rounded-xl border border-neutral-200 transition-all hover:bg-neutral-50 disabled:opacity-30 dark:border-neutral-700 dark:hover:bg-neutral-800"
          aria-label="Следующий зикр"
        >
          <svg className="h-5 w-5 text-neutral-600 dark:text-neutral-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* ── Tap hint ─────────────────────────── */}
      {!isComplete && currentCount === 0 && (
        <p className="mt-6 animate-pulse text-xs text-neutral-400 dark:text-neutral-600">
          Space / Enter
        </p>
      )}
    </div>
  );
}
