/**
 * @page /hadith
 * Страница хадиса дня
 */

import type { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "Хадис дня — ImanTrack",
  description: "Ежедневный хадис Пророка ﷺ с арабским текстом и русским переводом",
};

const HadithPageContent = dynamic(
  () => import("@features/hadith/components/HadithPageContent").then((m) => m.HadithPageContent),
  {
    ssr: false,
    loading: () => (
      <div className="mx-auto max-w-xl space-y-4 px-4 pt-12">
        <div className="h-8 w-40 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700" />
        <div className="h-96 w-full animate-pulse rounded-3xl bg-neutral-100 dark:bg-neutral-800" />
      </div>
    ),
  },
);

export default function HadithPage() {
  return (
    <div className="min-h-screen bg-background text-main">
      <HadithPageContent />
    </div>
  );
}
