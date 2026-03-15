/**
 * @module features/hadith/services/hadith.service
 *
 * Сервис управления хадисами:
 * - Ежедневная ротация (детерминированная по дате)
 * - Избранное (localStorage + Supabase)
 * - Копирование и шаринг
 */

import { HADITH_LIST, getHadithById } from "../data/hadith.collection";
import type { Hadith } from "../types/hadith.types";

/* ── Daily Rotation ─────────────────────────────────────────────────── */

/**
 * Возвращает хадис дня.
 * Использует детерминированный алгоритм на основе даты,
 * чтобы все пользователи видели один и тот же хадис в один день.
 *
 * Алгоритм: день_года * 7 + месяц * 13 + год → mod(totalHadiths)
 */
export function getHadithOfTheDay(date?: Date): Hadith {
  const d = date ?? new Date();
  const dayOfYear = getDayOfYear(d);
  const month = d.getMonth() + 1;
  const year = d.getFullYear();

  // Детерминированный хеш из даты
  const hash = (dayOfYear * 7 + month * 13 + year * 3) % HADITH_LIST.length;
  const hadith = HADITH_LIST[Math.abs(hash)];
  return hadith as Hadith;
}

/**
 * Возвращает хадис по ID или случайный из коллекции
 */
export function getRandomHadith(excludeId?: string): Hadith {
  const filtered = excludeId
    ? HADITH_LIST.filter((h) => h.id !== excludeId)
    : HADITH_LIST;

  const index = Math.floor(Math.random() * filtered.length);
  const hadith = filtered[index];
  return hadith as Hadith;
}

/**
 * Возвращает номер дня в году (1-366)
 */
function getDayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

/* ── Favorites (localStorage) ───────────────────────────────────────── */

const FAVORITES_KEY = "sirat-hadith-favorites";

export function loadFavorites(): string[] {
  try {
    const stored = localStorage.getItem(FAVORITES_KEY);
    return stored ? (JSON.parse(stored) as string[]) : [];
  } catch {
    return [];
  }
}

export function saveFavorites(favorites: string[]): void {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  } catch {
    // Storage unavailable
  }
}

export function toggleFavoriteLocal(hadithId: string): string[] {
  const favorites = loadFavorites();
  const index = favorites.indexOf(hadithId);

  if (index >= 0) {
    favorites.splice(index, 1);
  } else {
    favorites.push(hadithId);
  }

  saveFavorites(favorites);
  return favorites;
}

/* ── Favorites (Supabase sync) ──────────────────────────────────────── */

export async function syncFavoritesToServer(favorites: string[]): Promise<void> {
  try {
    const { createClient } = await import("@lib/supabase/client");
    const supabase = createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    // Удаляем все текущие
    await supabase.from("hadith_favorites").delete().eq("user_id", user.id);

    // Вставляем новые
    if (favorites.length > 0) {
      const rows = favorites.map((hadithId) => ({
        user_id: user.id,
        hadith_id: hadithId,
      }));
      await (supabase.from("hadith_favorites") as any).insert(rows);
    }
  } catch {
    // Silently fail
  }
}

export async function loadFavoritesFromServer(): Promise<string[]> {
  try {
    const { createClient } = await import("@lib/supabase/client");
    const supabase = createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    const { data, error } = await supabase
      .from("hadith_favorites")
      .select("hadith_id")
      .eq("user_id", user.id);

    if (error || !data) return [];

    return (data as any[]).map((row) => row.hadith_id);
  } catch {
    return [];
  }
}

/* ── Copy & Share ───────────────────────────────────────────────────── */

/**
 * Форматирует хадис для копирования/шаринга
 */
export function formatHadithText(hadith: Hadith): string {
  const lines = [
    hadith.arabic,
    "",
    hadith.translation,
    "",
    `— ${hadith.narrator}`,
    `📖 ${hadith.collection === "nawawi" ? "40 хадисов ан-Навави" : ""} ${hadith.number ? `#${hadith.number}` : ""}`.trim(),
    hadith.grade ? `Степень: ${hadith.grade}` : "",
    "",
    "🌙 SIRAT",
  ].filter(Boolean);

  return lines.join("\n");
}

/**
 * Копирует текст в буфер обмена
 */
export async function copyHadithText(hadith: Hadith): Promise<boolean> {
  const text = formatHadithText(hadith);

  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback для старых браузеров
    try {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      return true;
    } catch {
      return false;
    }
  }
}

/**
 * Открывает нативный диалог «Поделиться» (Web Share API)
 * Fallback: копирует текст
 */
export async function shareHadith(hadith: Hadith): Promise<boolean> {
  const text = formatHadithText(hadith);

  if (typeof navigator !== "undefined" && navigator.share) {
    try {
      await navigator.share({
        title: "Хадис дня — SIRAT",
        text,
      });
      return true;
    } catch {
      // User cancelled or error
      return false;
    }
  }

  // Fallback — copy
  return copyHadithText(hadith);
}

/**
 * Возвращает избранные хадисы как объекты
 */
export function getFavoriteHadiths(favoriteIds: string[]): Hadith[] {
  return favoriteIds
    .map((id) => getHadithById(id))
    .filter((h): h is Hadith => h !== undefined);
}
