"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@shared/components/ui/Navbar";
import { LogoutButton } from "@features/auth/components/LogoutButton";

export function GlobalNavigation() {
  const pathname = usePathname();

  // Не показываем навигацию на страницах аутентификации и лендинге
  if (pathname.startsWith("/auth") || pathname === "/") {
    return null;
  }

  const navItems = [
    { label: "Прогресс", href: "/tracker" },
    { label: "Намазы", href: "/prayer" },
    { label: "Азкары", href: "/adhkar" },
    { label: "Хадисы", href: "/hadith" },
    { label: "Профиль", href: "/dashboard" },
  ];

  return (
    <>
      <Navbar 
        items={navItems} 
        rightSlot={
          <div className="flex items-center gap-2">
            <LogoutButton className="rounded-xl border border-neutral-200 px-3 py-1.5 text-xs text-neutral-600 transition-all hover:border-red-300 hover:bg-red-50 hover:text-red-600 dark:border-neutral-700 dark:text-neutral-400 dark:hover:border-red-800 dark:hover:bg-red-950/30 dark:hover:text-red-400" />
          </div>
        }
      />
      {/* Spacer to push content down since Navbar is fixed */}
      <div className="h-16" />
    </>
  );
}
