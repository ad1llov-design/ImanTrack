"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Navbar } from "@shared/components/ui/Navbar";
import { cn } from "@shared/lib/utils";
import {
  Home,
  BookOpen,
  Clock,
  User,
  BookText,
  CheckSquare,
} from "lucide-react";

import { motion } from "framer-motion";
import { ThemeToggle } from "@shared/components/ui/ThemeToggle";

export function GlobalNavigation() {
  const pathname = usePathname();

  // Не показываем навигацию на страницах аутентификации и лендинге
  if (pathname.startsWith("/auth") || pathname === "/") {
    return null;
  }

  const navItems = [
    { label: "Дашборд", href: "/dashboard", icon: <Home className="h-5 w-5" /> },
    { label: "Коран", href: "/quran", icon: <BookOpen className="h-5 w-5" /> },
    { label: "Зикр", href: "/adhkar", icon: <Clock className="h-5 w-5" /> },
    { label: "Хадисы", href: "/hadith", icon: <BookText className="h-5 w-5" /> },
    { label: "Сунна", href: "/sunnah", icon: <CheckSquare className="h-5 w-5" /> },
    { label: "Профиль", href: "/profile", icon: <User className="h-5 w-5" /> },
  ];

  return (
    <>
      <div className="hidden md:block">
        <Navbar
          items={navItems}
          rightSlot={
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Link
                href="/profile"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface hover:bg-background transition-colors"
              >
                <User className="h-5 w-5 text-muted" />
              </Link>
            </div>
          }
        />
        <div className="h-16" />
      </div>

      <div className="md:hidden">
        {/* Мобильная верхняя панель (Header) */}
        <header className="fixed inset-x-0 top-0 z-50 flex h-14 items-center justify-between border-b border-border bg-surface/80 px-4 backdrop-blur-xl">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-500 text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M12 21a9 9 0 1 0-9-9 9 9 0 0 0 9 9Z" />
                <path d="M12 3a9 9 0 0 0 9 9" />
                <path d="M12 21a9 9 0 0 0-9-9" />
              </svg>
            </div>
            <span className="text-lg font-bold text-main">ImanTrack</span>
          </Link>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link href="/assistant" className="text-muted hover:text-main transition-colors">🤖</Link>
            <Link href="/profile" className="text-muted hover:text-main transition-colors">
              <User className="h-5 w-5" />
            </Link>
          </div>
        </header>

        <div className="h-14" />

        {/* Мобильная нижняя навигация (Tab Bar) */}
        <nav className="fixed inset-x-0 bottom-0 z-50 flex h-16 items-center justify-around border-t border-border bg-surface/80 px-2 pb-safe backdrop-blur-xl">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href as string}
                className={cn(
                  "flex flex-col items-center justify-center transition-all",
                  isActive
                    ? "text-primary-500 scale-110"
                    : "text-muted hover:text-main",
                )}
              >
                {item.icon}
                {isActive && (
                  <motion.div
                    layoutId="nav-active"
                    className="mt-1 h-1 w-1 rounded-full bg-primary-500"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="h-16" />
      </div>
    </>
  );
}
