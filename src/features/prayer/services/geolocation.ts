/**
 * @module features/prayer/services/geolocation
 *
 * Сервис геолокации: получение координат через Browser Geolocation API
 * с fallback на IP-based геолокацию.
 */

import type { GeoCoordinates, LocationInfo } from "../types/prayer.types";

/* ── Browser Geolocation ────────────────────────────────────────────── */

/**
 * Получает координаты через Browser Geolocation API
 * Запрашивает разрешение у пользователя.
 */
export function getBrowserLocation(): Promise<GeoCoordinates> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Геолокация не поддерживается вашим браузером"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        const messages: Record<number, string> = {
          1: "Доступ к геолокации запрещён. Разрешите в настройках браузера.",
          2: "Не удалось определить местоположение. Проверьте GPS.",
          3: "Время ожидания геолокации истекло. Попробуйте снова.",
        };
        reject(new Error(messages[error.code] ?? "Ошибка геолокации"));
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 300000, // 5 минут кэш
      },
    );
  });
}

/* ── IP-based Fallback ──────────────────────────────────────────────── */

/**
 * Fallback: определение координат по IP через бесплатный API
 */
export async function getIpLocation(): Promise<LocationInfo> {
  try {
    const response = await fetch("https://ipapi.co/json/", {
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) throw new Error("IP geolocation failed");

    const data = await response.json();

    return {
      coords: {
        latitude: data.latitude,
        longitude: data.longitude,
      },
      city: data.city,
      country: data.country_name,
      timezone: data.timezone,
    };
  } catch {
    // Fallback на Бишкек (столица КР) если всё не работает
    return {
      coords: { latitude: 42.8746, longitude: 74.5698 },
      city: "Бишкек",
      country: "Кыргызстан",
      timezone: "Asia/Bishkek",
    };
  }
}

/* ── Combined ───────────────────────────────────────────────────────── */

/**
 * Получает местоположение: сначала Browser API, затем IP-fallback.
 * Для обоих вариантов пытается получить название города.
 */
export async function getLocation(): Promise<LocationInfo> {
  try {
    // Пробуем Browser Geolocation
    const coords = await getBrowserLocation();

    // Reverse geocoding для названия города
    try {
      const response = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${coords.latitude}&longitude=${coords.longitude}&localityLanguage=ru`,
        { signal: AbortSignal.timeout(3000) },
      );
      const data = await response.json();

      return {
        coords,
        city: data.city || data.locality || undefined,
        country: data.countryName || undefined,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      };
    } catch {
      return {
        coords,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      };
    }
  } catch {
    // Fallback на IP-based
    return getIpLocation();
  }
}

/* ── Storage ────────────────────────────────────────────────────────── */

const LOCATION_KEY = "imantrack-location";

/** Сохраняет координаты в localStorage */
export function saveLocation(location: LocationInfo): void {
  try {
    localStorage.setItem(LOCATION_KEY, JSON.stringify(location));
  } catch {
    // localStorage недоступен
  }
}

/** Загружает сохранённые координаты */
export function loadSavedLocation(): LocationInfo | null {
  try {
    const stored = localStorage.getItem(LOCATION_KEY);
    return stored ? (JSON.parse(stored) as LocationInfo) : null;
  } catch {
    return null;
  }
}
