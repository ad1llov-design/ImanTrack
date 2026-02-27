import { QuranTabs } from "@/components/quran/QuranTabs";
import Link from "next/link";

export const revalidate = 86400;

export default async function SurahsList() {
  const response = await fetch("https://api.quran.com/api/v4/chapters", {
    next: { revalidate: 86400 }
  });

  if (!response.ok) {
    return (
      <main className="mx-auto max-w-lg px-4 pt-4 pb-24 sm:max-w-xl sm:px-6 md:max-w-4xl lg:px-8 xl:max-w-5xl">
        <QuranTabs />
        <div className="flex flex-col items-center justify-center p-8 text-center mt-12 bg-surface rounded-3xl border border-border">
          <h1 className="text-xl font-bold text-main">Ошибка загрузки сур</h1>
          <p className="mt-2 text-muted">Пожалуйста, проверьте подключение к интернету.</p>
        </div>
      </main>
    );
  }

  const data = await response.json();
  const chapters = data.chapters || [];

  return (
    <main className="mx-auto max-w-lg px-4 pt-4 pb-24 sm:max-w-xl sm:px-6 md:max-w-4xl lg:px-8 xl:max-w-5xl">
      <QuranTabs />
      
      <div className="mb-6 mt-2 space-y-1">
        <h1 className="font-arabic text-h4 text-neutral-800 dark:text-neutral-100 md:text-h3">
          Суры Корана
        </h1>
        <p className="text-body-sm text-neutral-500 dark:text-neutral-400">
          Список всех 114 сур Священного Корана.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
        {chapters.map((chapter: any) => (
          <Link
            key={chapter.id}
            href={`/quran/surah/${chapter.id}`}
            className="group flex items-center justify-between rounded-2xl border border-border bg-surface p-4 transition-all hover:border-primary-300 hover:shadow-sm active:scale-[0.98] dark:hover:border-primary-700"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-sm font-bold text-primary-600 dark:bg-primary-900/30 dark:text-primary-400">
                {chapter.id}
              </div>
              <div>
                <h3 className="text-base font-semibold text-main group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {chapter.name_simple}
                </h3>
                <p className="text-xs text-muted">
                  {chapter.translated_name.name} • {chapter.verses_count} аятов
                </p>
              </div>
            </div>
            <div className="font-arabic text-lg text-main">
              {chapter.name_arabic}
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
