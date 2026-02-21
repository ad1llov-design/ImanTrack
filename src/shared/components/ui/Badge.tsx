/**
 * @module shared/components/ui/Badge
 *
 * Бейдж для статусов, тегов и категорий.
 * 6 вариантов цвета + 3 размера + опциональная иконка и точка.
 */

import { cn } from "@shared/lib/utils";

/* ── Types ──────────────────────────────────────────────────────────── */

type BadgeVariant = "default" | "success" | "warning" | "danger" | "info" | "gold";
type BadgeSize = "sm" | "md" | "lg";

interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  /** Показать точку-индикатор слева */
  dot?: boolean;
  /** Иконка слева */
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

/* ── Styles ─────────────────────────────────────────────────────────── */

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300",
  success: "bg-primary-50 text-primary-700 dark:bg-primary-950/40 dark:text-primary-300",
  warning: "bg-gold-50 text-gold-700 dark:bg-gold-950/40 dark:text-gold-300",
  danger:  "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300",
  info:    "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300",
  gold:    "bg-gradient-gold text-white",
};

const dotColors: Record<BadgeVariant, string> = {
  default: "bg-neutral-400",
  success: "bg-primary-500",
  warning: "bg-gold-500",
  danger:  "bg-red-500",
  info:    "bg-blue-500",
  gold:    "bg-white",
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: "px-2 py-0.5 text-[0.625rem]",
  md: "px-2.5 py-1 text-caption",
  lg: "px-3 py-1 text-body-sm",
};

/* ── Component ──────────────────────────────────────────────────────── */

export function Badge({
  variant = "default",
  size = "md",
  dot = false,
  icon,
  children,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-medium",
        "transition-colors duration-250",
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
    >
      {dot && (
        <span
          className={cn("h-1.5 w-1.5 rounded-full", dotColors[variant])}
          aria-hidden="true"
        />
      )}
      {icon && <span className="flex shrink-0">{icon}</span>}
      {children}
    </span>
  );
}
