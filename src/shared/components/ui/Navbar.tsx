/**
 * @module shared/components/ui/Navbar
 *
 * Навигационная панель с glass-эффектом, адаптивная mobile-first.
 * На мобильных — бургер-меню с плавной анимацией slide-down.
 * На десктопе — горизонтальная навигация. Закрепляется при скролле.
 */

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { cn } from "@shared/lib/utils";

/* ── Types ──────────────────────────────────────────────────────────── */

interface NavItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

interface NavbarProps {
  /** Элементы навигации */
  items?: NavItem[];
  /** Правая часть (кнопки CTA) */
  rightSlot?: React.ReactNode;
}

/* ── Default items ─────────────────────────────────────────────────── */

const defaultItems: NavItem[] = [
  { label: "Главная", href: "/" },
  { label: "Дашборд", href: "/dashboard" },
  { label: "Намаз",    href: "/prayer" },
  { label: "Азкары",   href: "/adhkar" },
  { label: "Прогресс", href: "/tracker" },
];

/* ── Component ──────────────────────────────────────────────────────── */

export function Navbar({ items = defaultItems, rightSlot }: NavbarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Отслеживаем скролл для glass-эффекта
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Закрываем меню при смене роута
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Блокируем скролл body при открытом меню
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-350",
        scrolled
          ? "border-b border-border bg-surface/80 shadow-soft backdrop-blur-xl"
          : "bg-transparent",
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* ── Logo ─────────────────────────────── */}
        {/* ── Logo ─────────────────────────────── */}
        <Link
          href="/dashboard"
          className="group flex items-center gap-2.5 transition-opacity hover:opacity-80"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-50 text-primary-600 transition-colors group-hover:bg-primary-100 dark:bg-primary-950/30 dark:text-primary-400 dark:group-hover:bg-primary-900/40">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="h-5 w-5"
            >
              <path d="M12 21a9 9 0 1 0-9-9 9 9 0 0 0 9 9Z" />
              <path d="M12 3a9 9 0 0 0 9 9" />
              <path d="M12 21a9 9 0 0 0-9-9" />
            </svg>
          </div>
          <span className="text-[1.1rem] font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
            Iman<span className="text-primary-500">Track</span>
          </span>
        </Link>

        {/* ── Desktop Nav ──────────────────────── */}
        <div className="hidden items-center gap-2 md:flex">
          {items.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href as any}
                className={cn(
                  "relative flex items-center gap-2 rounded-xl px-4 py-2 text-[0.875rem] font-medium transition-all duration-250",
                  isActive
                    ? "bg-primary-50/50 text-primary-700 dark:bg-primary-950/20 dark:text-primary-300"
                    : "text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800/50 dark:hover:text-neutral-100",
                )}
              >
                {item.icon && (
                  <span className={cn(
                    "flex items-center justify-center *:h-4 *:w-4",
                    isActive ? "text-primary-600 dark:text-primary-400" : "text-neutral-400 dark:text-neutral-500"
                  )}>
                    {item.icon}
                  </span>
                )}
                <span>{item.label}</span>
                {/* Minimalist Active indicator */}
                {isActive && (
                  <span className="absolute bottom-1 left-1/2 h-[3px] w-6 -translate-x-1/2 rounded-full bg-primary-500" />
                )}
              </Link>
            );
          })}
        </div>

        {/* ── Right slot + Burger ───────────────── */}
        <div className="flex items-center gap-3">
          {rightSlot && <div className="hidden sm:block">{rightSlot}</div>}

          {/* Burger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative flex h-10 w-10 items-center justify-center rounded-xl text-neutral-600 transition-colors hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800 md:hidden"
            aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={isOpen}
          >
            <div className="flex w-5 flex-col items-center gap-[5px]">
              <span
                className={cn(
                  "h-[2px] w-full rounded-full bg-current transition-all duration-250",
                  isOpen && "translate-y-[7px] rotate-45",
                )}
              />
              <span
                className={cn(
                  "h-[2px] w-full rounded-full bg-current transition-all duration-250",
                  isOpen && "opacity-0",
                )}
              />
              <span
                className={cn(
                  "h-[2px] w-full rounded-full bg-current transition-all duration-250",
                  isOpen && "-translate-y-[7px] -rotate-45",
                )}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* ── Mobile menu ────────────────────────── */}
      <div
        className={cn(
          "overflow-hidden transition-all duration-350 ease-bounce md:hidden",
          isOpen ? "max-h-96 border-b border-border bg-surface/95 backdrop-blur-xl" : "max-h-0",
        )}
      >
        <div className="space-y-1 px-4 pb-6 pt-2">
          {items.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href as any}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-4 py-3 text-body font-medium transition-all duration-250",
                  isActive
                    ? "bg-primary-50 text-primary-700 dark:bg-primary-950/30 dark:text-primary-300"
                    : "text-neutral-700 hover:bg-neutral-50 dark:text-neutral-300 dark:hover:bg-neutral-800",
                )}
              >
                {item.icon && <span>{item.icon}</span>}
                {item.label}
                {isActive && (
                  <span className="ml-auto h-2 w-2 rounded-full bg-primary-500" />
                )}
              </Link>
            );
          })}

          {/* CTA in mobile */}
          {rightSlot && <div className="mt-4 border-t border-neutral-100 pt-4 dark:border-neutral-800">{rightSlot}</div>}
        </div>
      </div>
    </header>
  );
}
