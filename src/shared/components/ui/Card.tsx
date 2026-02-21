/**
 * @module shared/components/ui/Card
 * 
 * Универсальная карточка с поддержкой Glassmorphism и различных вариантов.
 */

import { cn } from "@shared/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "outlined" | "glass" | "elevated";
  padding?: "none" | "sm" | "md" | "lg";
  interactive?: boolean;
}

const variantClasses = {
  default: "bg-white border border-neutral-100 shadow-soft dark:bg-neutral-900 dark:border-neutral-800",
  outlined: "bg-transparent border border-neutral-200 dark:border-neutral-700",
  glass: "bg-white/70 backdrop-blur-md border border-white/20 shadow-lg dark:bg-neutral-900/70",
  elevated: "bg-white border border-neutral-100 shadow-xl dark:bg-neutral-900 dark:border-neutral-800",
};

const paddingClasses = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export function Card({
  children,
  className,
  variant = "default",
  padding = "md",
  interactive = false,
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-3xl transition-all duration-300",
        variantClasses[variant],
        paddingClasses[padding],
        interactive && "hover:-translate-y-1 hover:shadow-md cursor-pointer",
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("mb-4", className)}>{children}</div>;
}

export function CardTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return <h3 className={cn("text-lg font-bold text-neutral-900 dark:text-white", className)}>{children}</h3>;
}

export function CardDescription({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("text-sm text-neutral-500 dark:text-neutral-400", className)}>{children}</p>;
}

export function CardFooter({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("mt-6 flex items-center justify-between", className)}>{children}</div>;
}
