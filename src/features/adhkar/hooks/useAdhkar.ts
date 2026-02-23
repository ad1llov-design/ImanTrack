/**
 * @module features/adhkar/hooks/useAdhkar
 *
 * Главный хук: загрузка прогресса, инкремент с auto-save, sync.
 */

"use client";

import { useCallback, useEffect } from "react";

import { getDhikrsByCategory } from "../data/adhkar.data";
import {
  loadProgressLocal,
  saveProgressLocal,
} from "../services/adhkar.persistence";
import { useAdhkarStore } from "../store/adhkarStore";
import type { AdhkarCategory } from "../types/adhkar.types";

/* ── Hook ───────────────────────────────────────────────────────────── */

export function useAdhkar(categoryId?: AdhkarCategory) {
  const store = useAdhkarStore();

  const dhikrs = categoryId ? getDhikrsByCategory(categoryId) : [];
  const currentDhikr = dhikrs[store.activeDhikrIndex] ?? null;
  const currentProgress = currentDhikr
    ? store.progress[currentDhikr.id]
    : null;

  /**
   * Загружает прогресс при монтировании: localStorage → merge с сервером
   */
  const loadProgress = useCallback(async () => {
    store.setLoading(true);
    try {
      const local = loadProgressLocal();
      store.setProgress(local);
    } catch {
      // fallback — empty progress
    } finally {
      store.setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Автосохранение: debounce 2 сек → localStorage + сервер
   */
  const saveLocally = useCallback(() => {
    const { progress } = useAdhkarStore.getState();
    saveProgressLocal(progress);
  }, []);

  /**
   * Инкремент счётчика с haptic feedback + auto-save
   */
  const increment = useCallback(() => {
    if (!currentDhikr) return;

    const progress = useAdhkarStore.getState().progress[currentDhikr.id];
    const count = progress?.currentCount ?? 0;

    // Не инкрементим если уже завершён
    if (count >= currentDhikr.targetCount) return;

    store.incrementCount(currentDhikr.id, currentDhikr.targetCount);
    saveLocally();

    // Haptic vibration (mobile)
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      const newCount = count + 1;
      if (newCount >= currentDhikr.targetCount) {
        navigator.vibrate([100, 50, 100, 50, 200]);
      } else {
        navigator.vibrate(30);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDhikr, saveLocally]);

  /**
   * Сброс текущего зикра
   */
  const resetCurrent = useCallback(() => {
    if (!currentDhikr) return;
    store.resetDhikr(currentDhikr.id, currentDhikr.targetCount);
    saveLocally();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDhikr, saveLocally]);

  /**
   * Переход к следующему зикру
   */
  const goNext = useCallback(() => {
    store.nextDhikr(dhikrs.length);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dhikrs.length]);

  /**
   * Переход к предыдущему зикру
   */
  const goPrev = useCallback(() => {
    store.prevDhikr();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Effects ────────────────────────────────────────────────────────

  // Загружаем прогресс при монтировании
  useEffect(() => {
    void loadProgress();
  }, [loadProgress]);

  // Устанавливаем категорию
  useEffect(() => {
    if (categoryId) {
      store.setActiveCategory(categoryId);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId]);



  // ── Category progress calculation ─────────────────────────────────

  const categoryProgress = categoryId
    ? (() => {
        const catDhikrs = getDhikrsByCategory(categoryId);
        const completed = catDhikrs.filter(
          (d) => store.progress[d.id]?.isCompleted,
        ).length;
        return {
          totalDhikrs: catDhikrs.length,
          completedDhikrs: completed,
          percentage: catDhikrs.length > 0
            ? Math.round((completed / catDhikrs.length) * 100)
            : 0,
        };
      })()
    : null;

  return {
    // Data
    dhikrs,
    currentDhikr,
    currentProgress,
    activeDhikrIndex: store.activeDhikrIndex,
    categoryProgress,
    allProgress: store.progress,
    isLoading: store.isLoading,

    // Actions
    increment,
    resetCurrent,
    goNext,
    goPrev,
    setDhikrIndex: store.setActiveDhikrIndex,
  };
}
