/**
 * @module features/hadith/hooks/useHadith
 *
 * Главный хук модуля: загрузка хадиса дня, управление избранными,
 * копирование и шаринг.
 */

"use client";

import { useCallback, useEffect } from "react";

import {
  copyHadithText,
  getHadithOfTheDay,
  getRandomHadith,
  loadFavorites,
  loadFavoritesFromServer,
  saveFavorites,
  shareHadith,
  syncFavoritesToServer,
} from "../services/hadith.service";
import { useHadithStore } from "../store/hadithStore";

/* ── Hook ───────────────────────────────────────────────────────────── */

export function useHadith() {
  const store = useHadithStore();

  /**
   * Загружает хадис дня + избранные
   */
  const init = useCallback(async () => {
    store.setLoading(true);

    try {
      // 1. Хадис дня (детерминированный)
      const hadith = getHadithOfTheDay();
      store.setCurrentHadith(hadith);

      // 2. Избранные (local → merge с сервером)
      const localFavs = loadFavorites();
      store.setFavorites(localFavs);

      // Async merge с сервером
      const serverFavs = await loadFavoritesFromServer();
      if (serverFavs.length > 0) {
        const merged = Array.from(new Set([...localFavs, ...serverFavs]));
        store.setFavorites(merged);
        saveFavorites(merged);
      }
    } catch {
      store.setError("Не удалось загрузить хадис");
    } finally {
      store.setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Показать следующий (случайный) хадис
   */
  const showNext = useCallback(() => {
    const current = useHadithStore.getState().currentHadith;
    const next = getRandomHadith(current?.id);
    store.setCurrentHadith(next);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Вернуть хадис дня
   */
  const showToday = useCallback(() => {
    const hadith = getHadithOfTheDay();
    store.setCurrentHadith(hadith);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Toggle избранного с sync
   */
  const toggleFav = useCallback((hadithId: string) => {
    store.toggleFavorite(hadithId);

    // Persist
    const { favorites } = useHadithStore.getState();
    saveFavorites(favorites);
    void syncFavoritesToServer(favorites);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Копировать текст хадиса
   */
  const copy = useCallback(async () => {
    const { currentHadith } = useHadithStore.getState();
    if (!currentHadith) return;

    const success = await copyHadithText(currentHadith);
    if (success) {
      store.setCopied(true);
      setTimeout(() => store.setCopied(false), 2000);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Поделиться хадисом
   */
  const share = useCallback(async () => {
    const { currentHadith } = useHadithStore.getState();
    if (!currentHadith) return;

    const success = await shareHadith(currentHadith);
    if (success) {
      store.setShared(true);
      setTimeout(() => store.setShared(false), 2000);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Init on mount ─────────────────────────────────────────────────

  useEffect(() => {
    void init();
  }, [init]);

  // ── Derived state ─────────────────────────────────────────────────

  const isFavorite = store.currentHadith
    ? store.favorites.includes(store.currentHadith.id)
    : false;

  return {
    currentHadith: store.currentHadith,
    favorites: store.favorites,
    isFavorite,
    isLoading: store.isLoading,
    isCopied: store.isCopied,
    isShared: store.isShared,
    error: store.error,

    showNext,
    showToday,
    toggleFavorite: toggleFav,
    copy,
    share,
  };
}
