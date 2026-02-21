/**
 * @module shared/types
 * Глобальные TypeScript типы для всего приложения
 */

// ── Utility Types ─────────────────────────────────────────────────────────────

/** Сделать все поля обязательными рекурсивно */
export type DeepRequired<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired<T[K]> : T[K];
};

/** Nullable type */
export type Nullable<T> = T | null;

/** Optional type */
export type Optional<T> = T | undefined;

/** Async function type */
export type AsyncFn<TArgs extends unknown[] = [], TReturn = void> = (
  ...args: TArgs
) => Promise<TReturn>;

/** Result pattern — Either success or error */
export type Result<T, E = Error> =
  | { ok: true; data: T }
  | { ok: false; error: E };

/** Pagination params */
export interface PaginationParams {
  page: number;
  perPage: number;
}

/** Pagination meta */
export interface PaginationMeta {
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}

/** Paginated response */
export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

// ── API Types ─────────────────────────────────────────────────────────────────

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

// ── UI Types ──────────────────────────────────────────────────────────────────

export type Size = "xs" | "sm" | "md" | "lg" | "xl";
export type Variant = "primary" | "secondary" | "ghost" | "danger" | "gold";
export type Status = "idle" | "loading" | "success" | "error";
export type Theme = "light" | "dark" | "system";

// ── Form Types ────────────────────────────────────────────────────────────────

export interface SelectOption<T = string> {
  label: string;
  value: T;
  disabled?: boolean;
}
