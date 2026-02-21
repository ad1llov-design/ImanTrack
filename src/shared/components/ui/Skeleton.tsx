/**
 * @module shared/components/ui/Skeleton
 *
 * Skeleton-заглушки для состояния загрузки. Имитируют реальные компоненты.
 * Используют shimmer-анимацию для эффекта «загрузки».
 */

import { cn } from "@shared/lib/utils";

/* ── Base Skeleton ──────────────────────────────────────────────────── */

interface SkeletonProps {
  className?: string;
  /** Форма */
  variant?: "rectangular" | "circular" | "text";
  /** Ширина (CSS-значение) */
  width?: string | number;
  /** Высота (CSS-значение) */
  height?: string | number;
}

export function Skeleton({
  className,
  variant = "rectangular",
  width,
  height,
}: SkeletonProps) {
  return (
    <div
      className={cn(
        "skeleton",
        variant === "circular" && "rounded-full",
        variant === "text" && "rounded-md",
        variant === "rectangular" && "rounded-xl",
        className,
      )}
      style={{ width, height }}
      aria-hidden="true"
    />
  );
}

/* ── Preset: Card Skeleton ──────────────────────────────────────────── */

export function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-neutral-100 bg-white p-6 dark:border-neutral-800 dark:bg-surface-dark-secondary">
      <div className="flex items-center gap-3">
        <Skeleton variant="circular" width={40} height={40} />
        <div className="flex-1 space-y-2">
          <Skeleton variant="text" width="60%" height={16} />
          <Skeleton variant="text" width="40%" height={12} />
        </div>
      </div>
      <div className="mt-5 space-y-3">
        <Skeleton height={12} width="100%" />
        <Skeleton height={12} width="85%" />
        <Skeleton height={12} width="70%" />
      </div>
      <div className="mt-5 flex gap-3">
        <Skeleton height={36} width={100} className="rounded-xl" />
        <Skeleton height={36} width={80} className="rounded-xl" />
      </div>
    </div>
  );
}

/* ── Preset: Text Skeleton ──────────────────────────────────────────── */

export function SkeletonText({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2.5" aria-hidden="true">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          variant="text"
          height={14}
          width={i === lines - 1 ? "60%" : "100%"}
        />
      ))}
    </div>
  );
}

/* ── Preset: Avatar Skeleton ────────────────────────────────────────── */

export function SkeletonAvatar({ size = 40 }: { size?: number }) {
  return <Skeleton variant="circular" width={size} height={size} />;
}

/* ── Preset: Prayer Row Skeleton ────────────────────────────────────── */

export function SkeletonPrayerRow() {
  return (
    <div className="flex items-center justify-between rounded-xl border border-neutral-100 p-4 dark:border-neutral-800">
      <div className="flex items-center gap-3">
        <Skeleton variant="circular" width={32} height={32} />
        <div className="space-y-1.5">
          <Skeleton variant="text" width={80} height={14} />
          <Skeleton variant="text" width={50} height={10} />
        </div>
      </div>
      <Skeleton width={70} height={32} className="rounded-lg" />
    </div>
  );
}
