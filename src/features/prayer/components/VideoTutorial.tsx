"use client";

import { useLanguage } from "@shared/i18n/LanguageContext";

const VIDEO_URL = "https://www.youtube.com/embed/T4auGhmeBlw";

export default function VideoTutorial() {
  const { t } = useLanguage();

  return (
    <section className="mt-10">
      <h2 className="text-xl font-bold text-primary-500 mb-2">
        {t("namaz.video_tutorial")}
      </h2>
      <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-4">
        {t("namaz.hanafi_note")}
      </p>

      <div className="rounded-xl border border-border bg-surface-light dark:bg-surface-dark overflow-hidden">
        <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
          <iframe
            className="absolute inset-0 w-full h-full"
            src={VIDEO_URL}
            title={t("namaz.video_tutorial")}
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
