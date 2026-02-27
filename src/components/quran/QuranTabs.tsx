"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@shared/lib/utils";

export function QuranTabs() {
  const pathname = usePathname();

  const tabs = [
    { name: "Перевод", href: "/quran" },
    { name: "Мусхаф", href: "/quran/page/1", matchPrefix: "/quran/page/" },
    { name: "Суры", href: "/quran/surahs", matchPrefix: "/quran/surah" },
  ];

  return (
    <div className="mb-6 flex w-full flex-wrap items-center gap-1 sm:gap-2 rounded-2xl bg-surface p-1 shadow-sm border border-border">
      {tabs.map((tab) => {
        const isActive =
          pathname === tab.href ||
          (tab.matchPrefix && pathname.startsWith(tab.matchPrefix));
        return (
          <Link
            key={tab.name}
            href={tab.href as any}
            className={cn(
              "flex-1 rounded-xl px-2 sm:px-4 py-2 sm:py-2.5 text-center text-xs sm:text-sm font-semibold transition-all",
              isActive
                ? "bg-primary-500 text-white shadow-sm dark:bg-primary-600"
                : "text-muted hover:bg-neutral-100 hover:text-main dark:hover:bg-neutral-800"
            )}
          >
            {tab.name}
          </Link>
        );
      })}
    </div>
  );
}
