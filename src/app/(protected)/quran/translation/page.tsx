import { Metadata } from "next";
import { QuranTracker } from "@features/quran/components/QuranTracker";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Коран с переводом — SIRAT",
  description: "Чтение Священного Корана с переводом на русский язык.",
};

export default function TranslationPage() {
  return (
    <main className="mx-auto max-w-lg px-4 pt-4 pb-24 sm:max-w-xl sm:px-6 md:max-w-4xl lg:px-8 xl:max-w-5xl">
      <div className="mb-4">
        <Link 
          href="/quran" 
          className="inline-flex items-center gap-2 rounded-xl bg-surface border border-border px-4 py-2 text-sm font-semibold text-main transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800"
        >
          <ArrowLeft className="h-4 w-4" />
          Назад к Мусхафу
        </Link>
      </div>
      
      <div className="mb-6 mt-2 space-y-1">
        <h1 className="font-arabic text-h4 text-neutral-800 dark:text-neutral-100 md:text-h3">
          القرآن الكريم
        </h1>
        <p className="text-body-sm text-neutral-500 dark:text-neutral-400">
          Священный Коран. Режим чтения перевода.
        </p>
      </div>

      <QuranTracker />
    </main>
  );
}
