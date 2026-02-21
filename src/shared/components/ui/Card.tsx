/**
 * @module shared/components/ui/Card
 *
 * Карточка — основной контейнер для контента. Имеет плавный hover-эффект
 * с подъёмом тени. Компонуется из Card, CardHeader, CardTitle, CardDescription, CardFooter.
 */

import { cn } from "@shared/lib/utils";

/* ── Types ──────────────────────────────────────────────────────────── */

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Вариант карточки */
  variant?: "default" | "outlined" | "elevated" | "glass";
  /** Внутренний отступ */
  padding?: "none" | "sm" | "md" | "lg";
  /** Кликабельная карточка с hover-анимацией */
  interactive?: boolean;
  children: React.ReactNode;
}

/* ── Styles ─────────────────────────────────────────────────────────── */

const variantStyles = {
  default:  "bg-white border border-neutral-100 shadow-card dark:bg-surface-dark-secondary dark:border-neutral-800",
  outlined: "bg-transparent border-2 border-neutral-200 dark:border-neutral-700",
  elevated: "bg-white shadow-elevated dark:bg-surface-dark-secondary",
  glass:    "glass",
};

const paddingStyles = {
  none: "p-0",
  sm:   "p-4",
  md:   "p-6",
  lg:   "p-8",
};

/* ── Card ───────────────────────────────────────────────────────────── */

export function Card({
  variant = "default",
  padding = "md",
  interactive = false,
  className,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl transition-all duration-250 ease-smooth",
        variantStyles[variant],
        paddingStyles[padding],
        interactive && [
          "cursor-pointer",
          "hover:shadow-card-hover hover:-translate-y-0.5",
          "active:translate-y-0 active:shadow-card",
        ],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/* ── CardHeader ─────────────────────────────────────────────────────── */

export function CardHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "mb-4 flex items-center justify-between border-b border-neutral-100 pb-4 dark:border-neutral-800",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/* ── CardTitle ──────────────────────────────────────────────────────── */

export function CardTitle({
  as: Tag = "h3",
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement> & { as?: "h2" | "h3" | "h4" }) {
  return (
    <Tag
      className={cn(
        "text-h3 text-neutral-900 dark:text-neutral-50",
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}

/* ── CardDescription ────────────────────────────────────────────────── */

export function CardDescription({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        "mt-1 text-body-sm text-neutral-500 dark:text-neutral-400",
        className,
      )}
      {...props}
    >
      {children}
    </p>
  );
}

/* ── CardFooter ─────────────────────────────────────────────────────── */

export function CardFooter({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "mt-6 flex items-center gap-3 border-t border-neutral-100 pt-4 dark:border-neutral-800",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
