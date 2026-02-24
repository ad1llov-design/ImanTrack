"use client";

import { useLanguage, LanguageCode } from "../LanguageContext";
import { cn } from "@shared/lib/utils";
import { useState, useRef, useEffect } from "react";
import { Globe } from "lucide-react";

const languages: { code: LanguageCode; label: string }[] = [
  { code: "ru", label: "Русский" },
  { code: "en", label: "English" },
  { code: "uz", label: "O'zbekcha" },
  { code: "ky", label: "Кыргызча" },
];

export function LanguageSwitcher({ className }: { className?: string }) {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={cn("relative", className)} ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors shadow-sm"
        aria-label="Change language"
      >
        <Globe className="h-5 w-5 text-muted hover:text-primary-500 transition-colors" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-32 origin-top-right rounded-xl border border-border bg-surface p-1 shadow-card z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code);
                setIsOpen(false);
              }}
              className={cn(
                "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors",
                language === lang.code
                  ? "bg-primary-50 text-primary-600 font-bold dark:bg-primary-950/30 dark:text-primary-400"
                  : "text-muted hover:bg-neutral-100 hover:text-main dark:hover:bg-neutral-800"
              )}
            >
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
