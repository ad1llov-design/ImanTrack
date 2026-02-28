import { Metadata } from "next";
import { surahStartPage } from "./surahStartPage";
import { QuranHubClient } from "@/features/quran/components/QuranHubClient";

export const metadata: Metadata = {
  title: "Коран — SIRAT",
  description: "Чтение Священного Корана.",
};

export const revalidate = 86400;

export default async function QuranHubPage() {
  const response = await fetch("https://api.quran.com/api/v4/chapters", {
    next: { revalidate: 86400 }
  });

  if (!response.ok) {
    return (
      <main className="mx-auto max-w-lg px-4 pt-4 pb-24 sm:max-w-xl sm:px-6 md:max-w-4xl lg:px-8 xl:max-w-5xl">
        <div className="flex flex-col items-center justify-center p-8 text-center mt-12 bg-surface rounded-3xl border border-border">
          <h1 className="text-xl font-bold text-main">Ошибка загрузки сур</h1>
          <p className="mt-2 text-muted">Пожалуйста, проверьте подключение к интернету.</p>
        </div>
      </main>
    );
  }

  const data = await response.json();
  const chapters = data.chapters || [];

  return <QuranHubClient chapters={chapters} />;
}
