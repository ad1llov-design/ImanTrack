/**
 * @page /adhkar
 * Главная страница — список категорий азкаров
 */

import type { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "Азкары — ImanTrack",
  description: "Утренние и вечерние азкары, зикры после намаза и дуа",
};

const AdhkarCategoriesPage = dynamic(
  () => import("@features/adhkar/components/AdhkarCategoriesPage").then((m) => m.AdhkarCategoriesPage),
  {
    ssr: false,
    loading: () => (
      <div className="mx-auto max-w-2xl space-y-4 px-4 pt-12">
        <div className="h-8 w-40 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700" />
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-32 w-full animate-pulse rounded-2xl bg-neutral-100 dark:bg-neutral-800" />
        ))}
      </div>
    ),
  },
);

export default function AdhkarPage() {
  return (
    <div className="min-h-screen bg-background text-main pb-20">
      <AdhkarCategoriesPage />
    </div>
  );
}
