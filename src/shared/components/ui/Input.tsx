/**
 * @module shared/components/ui/Input
 */

import { type InputHTMLAttributes, forwardRef } from "react";

import { cn } from "@shared/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftElement?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, leftElement, className, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {leftElement && (
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-400">
              {leftElement}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              "w-full rounded-xl border bg-white px-4 py-3 text-sm",
              "text-neutral-900 placeholder-neutral-400",
              "transition-colors duration-200",
              "focus:border-primary-400 focus:outline-none focus:ring-0",
              "dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100",
              error
                ? "border-red-400 focus:border-red-400"
                : "border-neutral-200",
              leftElement && "pl-10",
              className,
            )}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
            {...props}
          />
        </div>
        {error && (
          <p id={`${inputId}-error`} className="text-xs text-red-500" role="alert">
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={`${inputId}-hint`} className="text-xs text-neutral-400">
            {hint}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
