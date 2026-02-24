"use client";

/**
 * @page /profile
 * 
 * Profile page — works with or without authentication.
 * Shows user info if logged in, otherwise shows app info.
 */

import Link from "next/link";
import { GlassCard } from "@shared/components/ui/GlassCard";
import { useLanguage } from "@shared/i18n/LanguageContext";

export default function ProfilePage() {
  const { t } = useLanguage();

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-display text-4xl font-bold text-main">{t("profile.title")}</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <GlassCard className="space-y-6">
          <h2 className="text-xl font-bold text-main">{t("profile.about_app")}</h2>
          <div className="space-y-4">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted">{t("profile.app_name")}</span>
              <span className="text-lg text-main">SIRAT</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted">{t("profile.version")}</span>
              <span className="text-lg text-main">1.0.0 MVP</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted">{t("profile.description")}</span>
              <span className="text-sm text-muted leading-relaxed">
                {t("footer.description")}
              </span>
            </div>
          </div>
        </GlassCard>

        <div className="space-y-6">
          <GlassCard>
            <h2 className="text-xl font-bold text-main mb-4">{t("profile.sections")}</h2>
            <div className="space-y-2">
              {[
                { nameKey: "nav.home", href: "/", icon: "🏠" },
                { nameKey: "nav.quran", href: "/quran", icon: "📖" },
                { nameKey: "nav.hadith", href: "/hadith", icon: "📚" },
                { nameKey: "nav.dhikr", href: "/dhikr", icon: "📿" },
                { nameKey: "nav.sunnah", href: "/sunnah", icon: "🌙" },
                { nameKey: "nav.adhkar", href: "/adhkar", icon: "🤲" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 rounded-xl p-3 text-sm font-medium text-main hover:bg-primary-50 dark:hover:bg-primary-950/20 transition-colors"
                >
                  <span className="text-lg">{item.icon}</span>
                  {t(item.nameKey as any)}
                </Link>
              ))}
            </div>
          </GlassCard>

          <GlassCard>
            <h2 className="text-xl font-bold text-main mb-4">{t("profile.contacts")}</h2>
            <p className="text-muted text-sm leading-relaxed mb-6">
              {t("profile.contact_prompt")}
            </p>
            <div className="flex items-center gap-4">
              <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-12 h-12 rounded-2xl bg-green-50 text-green-600 hover:bg-green-100 dark:bg-green-950/30 dark:hover:bg-green-900/50 transition-colors shadow-sm">
                 <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.66-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              </a>
              <a href="https://t.me/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-50 text-blue-500 hover:bg-blue-100 dark:bg-blue-950/30 dark:hover:bg-blue-900/50 transition-colors shadow-sm">
                 <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.94z"/></svg>
              </a>
              <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-12 h-12 rounded-2xl bg-pink-50 text-pink-600 hover:bg-pink-100 dark:bg-pink-950/30 dark:hover:bg-pink-900/50 transition-colors shadow-sm">
                 <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
