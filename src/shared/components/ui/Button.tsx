/**
 * @module shared/components/ui/Button
 * Базовый компонент кнопки
 */

import { type ButtonHTMLAttributes, forwardRef } from "react";

import { cn } from "@shared/lib/utils";
import type { Size, Variant } from "@shared/types";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  isLoading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const variantClasses: Record<Variant, string> = {
  primary: "bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800",
  secondary:
    "border border-neutral-200 text-neutral-700 hover:border-primary-400 hover:text-primary-600 dark:border-neutral-700 dark:text-neutral-300",
  ghost:
    "text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800",
  danger: "bg-red-600 text-white hover:bg-red-700 active:bg-red-800",
  gold: "bg-gold-500 text-white hover:bg-gold-600 active:bg-gold-700 shadow-gold",
};

const sizeClasses: Record<Size, string> = {
  xs: "px-3 py-1.5 text-xs rounded-lg",
  sm: "px-4 py-2 text-sm rounded-xl",
  md: "px-6 py-3 text-sm rounded-2xl",
  lg: "px-8 py-3.5 text-base rounded-2xl",
  xl: "px-10 py-4 text-lg rounded-3xl",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      isLoading = false,
      fullWidth = false,
      leftIcon,
      rightIcon,
      className,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled ?? isLoading}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-semibold",
          "transition-all duration-200 active:scale-95",
          "disabled:pointer-events-none disabled:opacity-50",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2",
          fullWidth && "w-full",
          variantClasses[variant],
          sizeClasses[size],
          className,
        )}
        {...props}
      >
        {isLoading ? (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : (
          leftIcon
        )}
        {children}
        {!isLoading && rightIcon}
      </button>
    );
  },
);

Button.displayName = "Button";
