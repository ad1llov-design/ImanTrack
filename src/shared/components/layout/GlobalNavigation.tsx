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
  Heart,
} from "lucide-react";

import { motion } from "framer-motion";
import { ThemeToggle } from "@shared/components/ui/ThemeToggle";
import { useLanguage } from "@shared/i18n/LanguageContext";
import { LanguageSwitcher } from "@shared/i18n/components/LanguageSwitcher";
export function GlobalNavigation() {
  const pathname = usePathname();
  const { t } = useLanguage();

  // Hide nav on auth pages
  if (pathname.startsWith("/auth")) {
    return null;
  }

  const navItems = [
    { label: t("nav.home"), href: "/", icon: <Home className="h-5 w-5" /> },
    { label: t("nav.quran"), href: "/quran", icon: <BookOpen className="h-5 w-5" /> },
    { label: t("nav.dhikr"), href: "/adhkar", icon: <Clock className="h-5 w-5" /> },
    { label: t("nav.hadith"), href: "/hadith", icon: <BookText className="h-5 w-5" /> },
    { label: t("nav.sunnah"), href: "/sunnah", icon: <Heart className="h-5 w-5" /> },
    { label: t("nav.settings"), href: "/profile", icon: <User className="h-5 w-5" /> },
  ];

  return (
    <>
      <div className="hidden md:block">
        <Navbar
          items={navItems}
          rightSlot={
            <div className="flex items-center gap-2">
              <LanguageSwitcher />
              <ThemeToggle />
              <Link
                href="/profile"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface hover:bg-background transition-colors"
                aria-label="Profile"
              >
                <User className="h-5 w-5 text-muted hover:text-primary-500 transition-colors" />
              </Link>
            </div>
          }
        />
        <div className="h-16" />
      </div>

      <div className="md:hidden">
        {/* Mobile header */}
        <header className="fixed inset-x-0 top-0 z-50 flex h-14 items-center justify-between border-b border-border bg-surface/80 px-4 backdrop-blur-xl">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-500 text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-4 w-4"
              >
                <path d="M12 2.5c1.2 0 2.4.2 3.5.6a.5.5 0 0 1 .1.9 7 7 0 0 0 0 12.8.5.5 0 0 1-.1.9A9.5 9.5 0 1 1 12 2.5Z" />
                <path d="M19.5 6l.5 1.5L21.5 8l-1.5.5L19.5 10l-.5-1.5L17.5 8l1.5-.5z" />
              </svg>
            </div>
            <span className="text-lg font-bold text-main">SIRAT</span>
          </Link>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <ThemeToggle />
            <Link href="/profile" className="text-muted hover:text-main transition-colors">
              <User className="h-5 w-5" />
            </Link>
          </div>
        </header>

        <div className="h-14" />

        {/* Mobile bottom tab bar */}
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
