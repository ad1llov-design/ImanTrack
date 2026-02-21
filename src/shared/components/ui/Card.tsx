/**
 * @module shared/components/ui/Card
 */

import { cn } from "@shared/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  padding?: "none" | "sm" | "md" | "lg";
}

const paddingClasses = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
} as const;

export function Card({
  children,
  className,
  as: Tag = "div",
  padding = "md",
}: CardProps) {
  return (
    <Tag
      className={cn(
        "rounded-3xl bg-white dark:bg-neutral-900",
        "shadow-[0_1px_3px_rgba(0,0,0,0.06),_0_4px_16px_rgba(54,153,112,0.04)]",
        "dark:shadow-[0_1px_3px_rgba(0,0,0,0.3),_0_4px_16px_rgba(54,153,112,0.08)]",
        paddingClasses[padding],
        className,
      )}
    >
      {children}
    </Tag>
  );
}

export function CardHeader({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mb-4 border-b border-neutral-100 pb-4 dark:border-neutral-800", className)}>
      {children}
    </div>
  );
}

export function CardTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h3 className={cn("text-lg font-semibold text-neutral-900 dark:text-neutral-100", className)}>
      {children}
    </h3>
  );
}
