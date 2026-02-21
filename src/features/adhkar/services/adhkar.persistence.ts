/**
 * @module features/adhkar/services/adhkar.persistence
 *
 * Сервис сохранения прогресса зикров.
 * Dual storage: localStorage (оффлайн) + Supabase (серверное).
 *
 * Стратегия:
 * 1. Всегда сохраняем в localStorage (мгновенный отклик)
 * 2. Если пользователь авторизован — синхронизируем с Supabase
 * 3. При следующей загрузке — merge серверного и локального прогресса
 */

import type { DhikrProgress } from "../types/adhkar.types";

/* ── Constants ──────────────────────────────────────────────────────── */

const STORAGE_KEY = "imantrack-adhkar-progress";

/** Возвращает ключ с датой: "imantrack-adhkar-progress-2026-02-21" */
function getDateKey(date?: Date): string {
  const d = date ?? new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${STORAGE_KEY}-${yyyy}-${mm}-${dd}`;
}

/* ── LocalStorage ───────────────────────────────────────────────────── */

export function saveProgressLocal(
  progress: Record<string, DhikrProgress>,
  date?: Date,
): void {
  try {
    localStorage.setItem(getDateKey(date), JSON.stringify(progress));
  } catch {
    // Storage full or unavailable
  }
}

export function loadProgressLocal(
  date?: Date,
): Record<string, DhikrProgress> {
  try {
    const stored = localStorage.getItem(getDateKey(date));
    if (!stored) return {};
    return JSON.parse(stored) as Record<string, DhikrProgress>;
  } catch {
    return {};
  }
}

export function clearProgressLocal(date?: Date): void {
  try {
    localStorage.removeItem(getDateKey(date));
  } catch {
    // Ignore
  }
}

/* ── Supabase Sync ──────────────────────────────────────────────────── */

/**
 * Синхронизирует прогресс с Supabase.
 * Вызывается асинхронно, не блокируя UI.
 */
export async function syncProgressToServer(
  progress: Record<string, DhikrProgress>,
  date?: Date,
): Promise<void> {
  try {
    // Динамический импорт чтобы не грузить Supabase если не нужен
    const { createClient } = await import("@lib/supabase/client");
    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return; // Не авторизован — только localStorage

    const d = date ?? new Date();
    const dateStr = d.toISOString().split("T")[0];

    // Upsert каждый прогресс
    const rows = Object.entries(progress).map(([dhikrId, p]) => ({
      user_id: user.id,
      dhikr_id: dhikrId,
      current_count: p.currentCount,
      target_count: p.targetCount,
      is_completed: p.isCompleted,
      completed_at: p.completedAt ? p.completedAt.toISOString() : null,
      date: dateStr,
    }));

    if (rows.length === 0) return;

    await supabase.from("adhkar_progress").upsert(rows, {
      onConflict: "user_id,dhikr_id,date",
    });
  } catch {
    // Silently fail — localStorage is the source of truth for now
  }
}

/**
 * Загружает прогресс с сервера и мёрджит с локальным.
 * Серверный прогресс имеет приоритет (берём больший count).
 */
export async function loadProgressFromServer(
  date?: Date,
): Promise<Record<string, DhikrProgress>> {
  try {
    const { createClient } = await import("@lib/supabase/client");
    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return {};

    const d = date ?? new Date();
    const dateStr = d.toISOString().split("T")[0];

    const { data, error } = await supabase
      .from("adhkar_progress")
      .select("*")
      .eq("user_id", user.id)
      .eq("date", dateStr);

    if (error || !data) return {};

    const serverProgress: Record<string, DhikrProgress> = {};
    for (const row of data) {
      serverProgress[row.dhikr_id] = {
        dhikrId: row.dhikr_id,
        currentCount: row.current_count,
        targetCount: row.target_count,
        isCompleted: row.is_completed,
        completedAt: row.completed_at ? new Date(row.completed_at) : undefined,
      };
    }

    // Merge: берём больший count
    const localProgress = loadProgressLocal(date);
    const merged: Record<string, DhikrProgress> = { ...serverProgress };

    for (const [key, local] of Object.entries(localProgress)) {
      const server = merged[key];
      if (!server || local.currentCount > server.currentCount) {
        merged[key] = local;
      }
    }

    return merged;
  } catch {
    return loadProgressLocal(date);
  }
}
