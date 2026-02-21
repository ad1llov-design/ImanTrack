/**
 * @module shared/components/ui/Container
 *
 * Адаптивный контейнер с 3 вариантами ширины.
 * Используется как обёртка для контента на страницах.
 */

import { cn } from "@shared/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Максимальная ширина контейнера */
  size?: "narrow" | "default" | "wide";
  /** Отступы по оси Y */
  paddingY?: "none" | "sm" | "md" | "lg" | "xl";
  /** HTML-тег */
  as?: "div" | "section" | "main" | "article";
  children: React.ReactNode;
}

const sizeStyles = {
  narrow:  "max-w-3xl",
  default: "max-w-7xl",
  wide:    "max-w-8xl",
};

const paddingYStyles = {
  none: "",
  sm:   "py-6",
  md:   "py-10",
  lg:   "py-16",
  xl:   "py-24",
};

export function Container({
  size = "default",
  paddingY = "none",
  as: Tag = "div",
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        sizeStyles[size],
        paddingYStyles[paddingY],
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
