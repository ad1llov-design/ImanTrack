/**
 * @module shared/components/ui/Counter
 *
 * Анимированный счётчик с плавным подсчётом числа от 0 до целевого значения.
 * Используется для дашборда: количество намазов, дней стрика и т.д.
 * Запускает анимацию при появлении в viewport (IntersectionObserver).
 */

"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@shared/lib/utils";

/* ── Types ──────────────────────────────────────────────────────────── */

interface CounterProps {
  /** Целевое число */
  value: number;
  /** Длительность анимации в мс */
  duration?: number;
  /** Суффикс после числа (например: "%", " дней") */
  suffix?: string;
  /** Префикс перед числом (например: "+") */
  prefix?: string;
  /** Текст-подпись под числом */
  label?: string;
  /** Текст-подпись арабский */
  arabicLabel?: string;
  /** Цвет значения */
  color?: "primary" | "gold" | "neutral";
  /** Размер */
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

/* ── Styles ─────────────────────────────────────────────────────────── */

const colorStyles = {
  primary: "text-primary-600 dark:text-primary-400",
  gold:    "text-gold-600 dark:text-gold-400",
  neutral: "text-neutral-900 dark:text-neutral-100",
};

const sizeStyles = {
  sm: "text-h2",
  md: "text-h1",
  lg: "text-display-sm",
  xl: "text-display",
};

/* ── easeOutExpo ────────────────────────────────────────────────────── */

function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

/* ── Component ──────────────────────────────────────────────────────── */

export function Counter({
  value,
  duration = 1200,
  suffix = "",
  prefix = "",
  label,
  arabicLabel,
  color = "primary",
  size = "md",
  className,
}: CounterProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;

    let frameId: number;
    const startTime = performance.now();

    function animate(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutExpo(progress);

      setDisplayValue(Math.round(easedProgress * value));

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    }

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [hasAnimated, value, duration]);

  return (
    <div ref={ref} className={cn("text-center", className)}>
      {/* Arabic label */}
      {arabicLabel && (
        <p className="mb-1 font-arabic text-body-sm text-gold-500">
          {arabicLabel}
        </p>
      )}

      {/* Counter value */}
      <p
        className={cn(
          "font-bold tabular-nums tracking-tight",
          "animate-counter",
          colorStyles[color],
          sizeStyles[size],
        )}
      >
        {prefix}
        {displayValue.toLocaleString("ru-RU")}
        {suffix}
      </p>

      {/* Label */}
      {label && (
        <p className="mt-1 text-body-sm text-neutral-500 dark:text-neutral-400">
          {label}
        </p>
      )}
    </div>
  );
}
