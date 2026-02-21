/**
 * @module shared/components/ui/Input
 * 
 * Поле ввода с поддержкой иконок, подсказок и ошибок.
 */

import { type InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@shared/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, leftIcon, rightIcon, className, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="w-full space-y-2">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300"
          >
            {label}
          </label>
        )}
        <div className="relative group">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-neutral-400 group-focus-within:text-primary-500 transition-colors">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              "w-full rounded-2xl border bg-white px-4 py-3.5 text-sm transition-all duration-300",
              "placeholder:text-neutral-400 dark:bg-neutral-900/50 dark:text-white",
              "focus:outline-none focus:ring-2 focus:ring-primary-500/20",
              leftIcon && "pl-11",
              rightIcon && "pr-11",
              error 
                ? "border-red-500 ring-red-500/10 focus:ring-red-500/20 dark:border-red-500/50" 
                : "border-neutral-200 focus:border-primary-500 dark:border-neutral-800",
              className
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-4 text-neutral-400">
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <p className="text-xs font-medium text-red-500 animate-in fade-in slide-in-from-top-1">
            {error}
          </p>
        )}
        {hint && !error && (
          <p className="text-xs text-neutral-400 font-medium">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
