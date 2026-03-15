/**
 * @page /adhkar/[category]
 * Страница конкретной категории с счётчиком зикров
 */

import type { Metadata } from "next";
import dynamic from "next/dynamic";

import { ADHKAR_CATEGORIES } from "@features/adhkar/data/adhkar.data";
import type { AdhkarCategory } from "@features/adhkar/types/adhkar.types";

// Валидные категории для generateStaticParams
const VALID_CATEGORIES = ADHKAR_CATEGORIES.map((c) => c.id);

// Dynamic import для клиентского компонента
const DhikrCategoryView = dynamic(
  () => import("@features/adhkar/components/DhikrCategoryView").then((m) => m.DhikrCategoryView),
  {
    ssr: false,
    loading: () => (
      <div className="mx-auto max-w-lg space-y-4 px-4 pt-10">
        <div className="h-5 w-24 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700" />
        <div className="h-48 w-full animate-pulse rounded-2xl bg-neutral-100 dark:bg-neutral-800" />
        <div className="mx-auto h-60 w-60 animate-pulse rounded-full bg-neutral-100 dark:bg-neutral-800" />
      </div>
    ),
  },
);

type PageProps = {
  params: { category: string };
};

export async function generateStaticParams() {
  return VALID_CATEGORIES.map((id) => ({ category: id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const info = ADHKAR_CATEGORIES.find((c) => c.id === params.category);
  return {
    title: info ? `${info.nameRu} — SIRAT` : "Азкары — SIRAT",
    description: info?.description ?? "Зикры и дуа",
  };
}

export default function AdhkarCategoryPage({ params }: PageProps) {
  const categoryId = params.category as AdhkarCategory;

  // Проверяем валидность категории
  if (!VALID_CATEGORIES.includes(categoryId)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-main">
        <div className="text-center">
          <p className="text-4xl">🤔</p>
          <p className="mt-4 text-neutral-500">Категория не найдена</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-main">
      <DhikrCategoryView categoryId={categoryId} />
    </div>
  );
}
