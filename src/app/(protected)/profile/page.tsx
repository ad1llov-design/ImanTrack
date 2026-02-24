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
            <p className="text-muted text-sm leading-relaxed">
              {t("profile.contact_prompt")}
            </p>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
