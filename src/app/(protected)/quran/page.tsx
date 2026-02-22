import { Metadata } from "next";
import { QuranTracker } from "@features/quran/components/QuranTracker";

export const metadata: Metadata = {
  title: "Коран — Трекер Чтения",
  description: "Отслеживайте свой прогресс чтения Священного Корана по джузам и страницам.",
};

export default function QuranPage() {
  return (
    <main className="mx-auto max-w-lg px-4 pt-4 pb-24 sm:max-w-xl sm:px-6 md:max-w-4xl lg:px-8 xl:max-w-5xl">
      <div className="mb-6 mt-2 space-y-1">
        <h1 className="font-arabic text-h4 text-neutral-800 dark:text-neutral-100 md:text-h3">
          القرآن الكريم
        </h1>
        <p className="text-body-sm text-neutral-500 dark:text-neutral-400">
          Священный Коран. Трекер вашего чтения и прогресса.
        </p>
      </div>

      <QuranTracker />
    </main>
  );
}
