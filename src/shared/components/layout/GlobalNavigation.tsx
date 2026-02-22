"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Navbar } from "@shared/components/ui/Navbar";
import { LogoutButton } from "@features/auth/components/LogoutButton";
import { cn } from "@shared/lib/utils";
import { 
  Home,
  Clock,
  BookOpen,
  Library,
  User,
  BarChart2
} from "lucide-react";

export function GlobalNavigation() {
  const pathname = usePathname();

  // Не показываем навигацию на страницах аутентификации и лендинге
  if (pathname.startsWith("/auth") || pathname === "/") {
    return null;
  }

  const navItems = [
    { label: "Главная", href: "/dashboard", icon: <Home className="h-6 w-6" /> },
    { label: "Намазы", href: "/prayer", icon: <Clock className="h-6 w-6" /> },
    { label: "Анализ", href: "/analytics", icon: <BarChart2 className="h-6 w-6" /> },
    { label: "Коран", href: "/quran", icon: <BookOpen className="h-6 w-6" /> },
    { label: "Сунна", href: "/sunnah", icon: <Library className="h-6 w-6" /> },
  ];

  return (
    <>
      <div className="hidden md:block">
        <Navbar 
          items={navItems} 
          rightSlot={
            <div className="flex items-center gap-2">
              <LogoutButton className="rounded-xl border border-neutral-200 px-3 py-1.5 text-xs text-neutral-600 transition-all hover:border-red-300 hover:bg-red-50 hover:text-red-600 dark:border-neutral-700 dark:text-neutral-400 dark:hover:border-red-800 dark:hover:bg-red-950/30 dark:hover:text-red-400" />
            </div>
          }
        />
        <div className="h-16" />
      </div>

      <div className="md:hidden">
        {/* Мобильная верхняя панель (Header) */}
        <header className="fixed inset-x-0 top-0 z-50 flex h-14 items-center justify-between border-b border-neutral-200/50 bg-white/95 px-4 shadow-soft backdrop-blur-xl dark:border-neutral-800/50 dark:bg-surface-dark/95">
          <Link href="/" className="group flex items-center gap-2 transition-opacity hover:opacity-80">
            {/* Minimalist Logo Box Mobile */}
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary-50 text-primary-600 transition-colors group-hover:bg-primary-100 dark:bg-primary-950/30 dark:text-primary-400 dark:group-hover:bg-primary-900/40">
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
            <span className="text-lg font-bold text-neutral-900 dark:text-neutral-50">
              Iman<span className="text-primary-600 dark:text-primary-400">Track</span>
            </span>
          </Link>
          <LogoutButton className="rounded-lg border border-neutral-200 px-2 py-1 text-xs text-neutral-600 transition-all hover:border-red-300 hover:bg-red-50 hover:text-red-600 dark:border-neutral-700 dark:text-neutral-400 dark:hover:border-red-800 dark:hover:bg-red-950/30 dark:hover:text-red-400" />
        </header>
        
        {/* Спейсер для верхнего хедера */}
        <div className="h-14" />

        {/* Мобильная нижняя навигация (Bottom Nav) */}
        <nav className="fixed inset-x-0 bottom-0 z-50 flex h-16 items-center justify-around border-t border-neutral-200/50 bg-white/95 px-2 pb-2 pt-1 shadow-[0_-4px_24px_-8px_rgba(0,0,0,0.1)] backdrop-blur-xl dark:border-neutral-800/50 dark:bg-surface-dark/95">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href as any}
                className={cn(
                  "flex flex-1 flex-col items-center justify-center gap-1 py-1 transition-all",
                  isActive
                    ? "text-primary-600 dark:text-primary-400"
                    : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200",
                )}
              >
                <div
                  className={cn(
                    "flex h-8 w-12 items-center justify-center rounded-full transition-all",
                    isActive && "bg-primary-100 dark:bg-primary-900/40"
                  )}
                >
                  {item.icon}
                </div>
                <span className="text-[10px] font-medium leading-none">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Спейсер для нижнего TabBar (чтобы контент можно было доскроллить до конца) */}
        <div className="h-16" />
      </div>
    </>
  );
}
