/**
 * @module features/prayer/hooks/usePrayerTimes
 *
 * Главный хук модуля. Оркестрирует весь flow:
 * 1. Загружает/запрашивает геолокацию
 * 2. Запрашивает API Aladhan
 * 3. Парсит и рассчитывает статусы
 * 4. Обновляет статусы каждую минуту (setInterval)
 * 5. Синхронизирует всё в Zustand store
 */

"use client";

import { useCallback, useEffect, useRef } from "react";

import {
  calculatePrayerStatuses,
  fetchPrayerTimes,
  getCurrentPrayer,
  getNextPrayer,
  parsePrayerTimes,
} from "../services/prayer.api";
import {
  getLocation,
  loadSavedLocation,
  saveLocation,
} from "../services/geolocation";
import { usePrayerStore } from "../store/prayerStore";

/* ── Hook ───────────────────────────────────────────────────────────── */

export function usePrayerTimes() {
  const store = usePrayerStore();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /**
   * Загружает времена намазов: гео → API → парсинг → store
   */
  const loadPrayerTimes = useCallback(async () => {
    store.setLoading(true);
    store.setError(null);

    try {
      // 1. Получаем геолокацию (cached → browser → IP → fallback)
      console.log("[usePrayerTimes] Loading location...");
      let location = loadSavedLocation();
      if (!location) {
        console.log("[usePrayerTimes] No saved location, requesting fresh...");
        location = await getLocation();
        saveLocation(location);
      }
      store.setLocation(location);

      // 2. Запрашиваем API
      console.log("[usePrayerTimes] Fetching times for", location.coords);
      const apiResponse = await fetchPrayerTimes(location.coords);

      // 3. Парсим времена
      const prayers = parsePrayerTimes(apiResponse);
      if (prayers.length === 0) throw new Error("API вернул пустой список времен");

      // 4. Обновляем store
      store.setPrayers(prayers);
      store.setCurrentPrayer(getCurrentPrayer(prayers));
      store.setNextPrayer(getNextPrayer(prayers));

      // 5. Hijri дата
      const hijri = apiResponse.data.date.hijri;
      store.setHijriDate(
        `${hijri.day} ${hijri.month.ar} ${hijri.year}`,
      );
      store.setGregorianDate(apiResponse.data.date.readable);

    } catch (err) {
      console.error("[usePrayerTimes] Error loading prayer times:", err);
      const message =
        err instanceof Error ? err.message : "Не удалось загрузить намазы";
      store.setError(message);
    } finally {
      store.setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Обновляет статусы (current/next) без повторного запроса к API
   */
  const refreshStatuses = useCallback(() => {
    const { prayers } = usePrayerStore.getState();
    if (prayers.length === 0) return;

    const now = new Date();
    const updated = calculatePrayerStatuses(prayers, now);

    store.setPrayers(updated);
    store.setCurrentPrayer(getCurrentPrayer(updated));
    store.setNextPrayer(getNextPrayer(updated));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Принудительно обновить с новой геолокацией
   */
  const refreshLocation = useCallback(async () => {
    // Сбрасываем кэш
    try { localStorage.removeItem("imantrack-location"); } catch {}
    await loadPrayerTimes();
  }, [loadPrayerTimes]);

  // ── Effects ────────────────────────────────────────────────────────

  // Инициализация при монтировании
  useEffect(() => {
    void loadPrayerTimes();
  }, [loadPrayerTimes]);

  // Обновление статусов каждые 30 секунд
  useEffect(() => {
    intervalRef.current = setInterval(refreshStatuses, 30_000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [refreshStatuses]);

  return {
    prayers: store.prayers,
    currentPrayer: store.currentPrayer,
    nextPrayer: store.nextPrayer,
    hijriDate: store.hijriDate,
    gregorianDate: store.gregorianDate,
    location: store.location,
    isLoading: store.isLoading,
    error: store.error,
    refresh: loadPrayerTimes,
    refreshLocation,
  };
}
