/**
 * @module shared/components/ui/Input
 *
 * Текстовое поле ввода с поддержкой label, ошибок, подсказок, иконок.
 * Используется плавная анимация бордера при фокусе. Полная ARIA-поддержка.
 */

import { type InputHTMLAttributes, forwardRef } from "react";

import { cn } from "@shared/lib/utils";

/* ── Types ──────────────────────────────────────────────────────────── */

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

/* ── Component ──────────────────────────────────────────────────────── */

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, leftIcon, rightIcon, className, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-body-sm font-medium text-neutral-700 dark:text-neutral-300"
          >
            {label}
          </label>
        )}

        <div className="group relative">
          {leftIcon && (
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-neutral-400 transition-colors group-focus-within:text-primary-500">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            className={cn(
              "h-11 w-full rounded-xl border bg-white px-4 text-body-sm",
              "text-neutral-900 placeholder:text-neutral-400",
              "transition-all duration-250 ease-smooth",
              "focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500",
              // Dark mode
              "dark:bg-surface-dark-secondary dark:text-neutral-100 dark:placeholder:text-neutral-500",
              // Error state
              error
                ? "border-danger focus:ring-danger/20 focus:border-danger"
                : "border-neutral-200 hover:border-neutral-300 dark:border-neutral-700 dark:hover:border-neutral-600",
              // Icon padding
              leftIcon && "pl-10",
              rightIcon && "pr-10",
              className,
            )}
            aria-invalid={error ? "true" : undefined}
            aria-describedby={
              error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
            }
            {...props}
          />

          {rightIcon && (
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-neutral-400">
              {rightIcon}
            </div>
          )}
        </div>

        {error && (
          <p
            id={`${inputId}-error`}
            className="flex items-center gap-1 text-caption text-danger"
            role="alert"
          >
            <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={`${inputId}-hint`} className="text-caption text-neutral-400">
            {hint}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
