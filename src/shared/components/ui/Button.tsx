/**
 * @module shared/components/ui/Button
 *
 * Многофункциональная кнопка с 5 вариантами, 5 размерами,
 * состоянием загрузки и иконками. Все кнопки имеют плавные
 * hover/active/focus анимации и доступность (ARIA).
 */

import { type ButtonHTMLAttributes, forwardRef } from "react";

import { cn } from "@shared/lib/utils";

/* ── Types ──────────────────────────────────────────────────────────── */

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger" | "gold";
type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Визуальный вариант */
  variant?: ButtonVariant;
  /** Размер */
  size?: ButtonSize;
  /** Состояние загрузки — блокирует кнопку и показывает спиннер */
  isLoading?: boolean;
  /** Иконка слева */
  leftIcon?: React.ReactNode;
  /** Иконка справа */
  rightIcon?: React.ReactNode;
  /** Кнопка на всю ширину */
  fullWidth?: boolean;
}

/* ── Variant styles ─────────────────────────────────────────────────── */

const variants: Record<ButtonVariant, string> = {
  primary: [
    "bg-primary-600 text-white",
    "hover:bg-primary-700 hover:shadow-glow",
    "active:bg-primary-800",
    "dark:bg-primary-500 dark:hover:bg-primary-600",
  ].join(" "),

  secondary: [
    "border-2 border-neutral-200 text-neutral-800 bg-white",
    "hover:border-primary-400 hover:text-primary-700 hover:bg-primary-50",
    "active:bg-primary-100",
    "dark:border-neutral-700 dark:text-neutral-200 dark:bg-transparent",
    "dark:hover:border-primary-500 dark:hover:text-primary-300 dark:hover:bg-primary-950/30",
  ].join(" "),

  ghost: [
    "text-neutral-600 bg-transparent",
    "hover:bg-neutral-100 hover:text-neutral-900",
    "active:bg-neutral-200",
    "dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-100",
  ].join(" "),

  danger: [
    "bg-danger text-white",
    "hover:bg-red-600 hover:shadow-[0_0_20px_rgba(220,53,69,0.15)]",
    "active:bg-red-700",
  ].join(" "),

  gold: [
    "bg-gradient-gold text-white",
    "hover:shadow-gold hover:brightness-110",
    "active:brightness-95",
  ].join(" "),
};

/* ── Size styles ────────────────────────────────────────────────────── */

const sizes: Record<ButtonSize, string> = {
  xs: "h-7 px-2.5 text-xs rounded-lg gap-1",
  sm: "h-9 px-3.5 text-body-sm rounded-xl gap-1.5",
  md: "h-11 px-5 text-body-sm rounded-xl gap-2",
  lg: "h-12 px-7 text-body rounded-2xl gap-2.5",
  xl: "h-14 px-9 text-body rounded-2xl gap-3",
};

/* ── Spinner ────────────────────────────────────────────────────────── */

function Spinner({ className }: { className?: string }) {
  return (
    <svg
      className={cn("animate-spin", className)}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.25" />
      <path
        d="M12 2a10 10 0 0 1 10 10"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ── Component ──────────────────────────────────────────────────────── */

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      className,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        aria-busy={isLoading}
        className={cn(
          // Base
          "relative inline-flex items-center justify-center font-semibold",
          "transition-all duration-250 ease-smooth",
          "active:scale-[0.97]",
          "disabled:pointer-events-none disabled:opacity-50",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/50 focus-visible:ring-offset-2",
          // Variant + size
          variants[variant],
          sizes[size],
          fullWidth && "w-full",
          className,
        )}
        {...props}
      >
        {isLoading && (
          <Spinner className={cn(
            size === "xs" ? "h-3 w-3" : size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4",
          )} />
        )}
        {!isLoading && leftIcon && (
          <span className="flex shrink-0 items-center">{leftIcon}</span>
        )}
        <span className={cn(isLoading && "opacity-0")}>{children}</span>
        {!isLoading && rightIcon && (
          <span className="flex shrink-0 items-center">{rightIcon}</span>
        )}
      </button>
    );
  },
);

Button.displayName = "Button";
