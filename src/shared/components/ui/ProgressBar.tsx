/**
 * @module shared/components/ui/ProgressBar
 *
 * Прогресс-бар с плавной анимацией заполнения.
 * Поддержка label, значения в процентах, цветовых вариантов.
 * Доступность через role="progressbar" и aria-атрибуты.
 */

"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@shared/lib/utils";

/* ── Types ──────────────────────────────────────────────────────────── */

type ProgressVariant = "primary" | "gold" | "danger" | "gradient";
type ProgressSize = "sm" | "md" | "lg";

interface ProgressBarProps {
  /** Значение от 0 до 100 */
  value: number;
  /** Максимальное значение (по умолчанию 100) */
  max?: number;
  /** Визуальный вариант */
  variant?: ProgressVariant;
  /** Размер высоты */
  size?: ProgressSize;
  /** Левый текст */
  label?: string;
  /** Показывать процент справа */
  showValue?: boolean;
  /** Анимировать при появлении в viewport */
  animated?: boolean;
  className?: string;
}

/* ── Styles ─────────────────────────────────────────────────────────── */

const variantStyles: Record<ProgressVariant, string> = {
  primary:  "bg-primary-500",
  gold:     "bg-gold-500",
  danger:   "bg-danger",
  gradient: "bg-gradient-primary",
};

const trackStyles: Record<ProgressVariant, string> = {
  primary:  "bg-primary-100 dark:bg-primary-950/40",
  gold:     "bg-gold-100 dark:bg-gold-950/40",
  danger:   "bg-red-100 dark:bg-red-950/40",
  gradient: "bg-primary-100 dark:bg-primary-950/40",
};

const sizeStyles: Record<ProgressSize, string> = {
  sm: "h-1.5",
  md: "h-2.5",
  lg: "h-4",
};

/* ── Component ──────────────────────────────────────────────────────── */

export function ProgressBar({
  value,
  max = 100,
  variant = "primary",
  size = "md",
  label,
  showValue = false,
  animated = true,
  className,
}: ProgressBarProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  const [visible, setVisible] = useState(!animated);
  const ref = useRef<HTMLDivElement>(null);

  // IntersectionObserver для анимации при появлении в viewport
  useEffect(() => {
    if (!animated || !ref.current) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [animated]);

  return (
    <div ref={ref} className={cn("w-full", className)}>
      {/* Label + Value */}
      {(label || showValue) && (
        <div className="mb-2 flex items-center justify-between">
          {label && (
            <span className="text-body-sm font-medium text-neutral-700 dark:text-neutral-300">
              {label}
            </span>
          )}
          {showValue && (
            <span className="text-body-sm font-semibold tabular-nums text-neutral-900 dark:text-neutral-100">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}

      {/* Track */}
      <div
        className={cn(
          "w-full overflow-hidden rounded-full",
          trackStyles[variant],
          sizeStyles[size],
        )}
        role="progressbar"
        aria-valuenow={Math.round(percentage)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label ?? "Прогресс"}
      >
        {/* Fill */}
        <div
          className={cn(
            "h-full rounded-full transition-all duration-700 ease-bounce",
            variantStyles[variant],
            size === "lg" && "relative overflow-hidden",
          )}
          style={{
            width: visible ? `${percentage}%` : "0%",
          }}
        >
          {/* Shimmer effect on large bars */}
          {size === "lg" && percentage > 0 && (
            <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent bg-[length:200%_100%]" />
          )}
        </div>
      </div>
    </div>
  );
}
