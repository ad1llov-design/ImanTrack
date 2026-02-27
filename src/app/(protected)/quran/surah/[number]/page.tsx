import { QuranTabs } from "@/components/quran/QuranTabs";
import { QuranReader } from "@/components/quran/QuranReader";

export const dynamicParams = true;

export async function generateStaticParams() {
  return Array.from({ length: 114 }, (_, i) => ({
    number: String(i + 1),
  }));
}

export default async function SurahPage({ params }: { params: { number: string } }) {
  const chapterNumber = parseInt(params.number, 10);
  
  if (isNaN(chapterNumber) || chapterNumber < 1 || chapterNumber > 114) {
    return (
      <main className="mx-auto flex max-w-lg min-h-[60vh] flex-col items-center justify-center p-4 text-center">
        <QuranTabs />
        <h1 className="text-2xl font-bold text-main mt-8">Сура не найдена</h1>
        <a href="/quran/surahs" className="mt-6 rounded-xl bg-primary-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-700">
          К списку сур
        </a>
      </main>
    );
  }

  const response = await fetch(`https://api.quran.com/api/v4/quran/verses/uthmani?chapter_number=${chapterNumber}`, {
    next: { revalidate: 86400 }
  });

  if (!response.ok) {
    return (
      <main className="mx-auto flex max-w-lg min-h-[60vh] flex-col items-center justify-center p-4 text-center">
        <QuranTabs />
        <h1 className="text-xl font-bold text-main mt-8">Ошибка загрузки данных</h1>
        <p className="mt-2 text-muted">Пожалуйста, проверьте подключение и обновите страницу.</p>
      </main>
    );
  }

  const data = await response.json();
  const verses = data.verses || [];

  return (
    <div className="mx-auto max-w-4xl w-full">
      <div className="px-4 pt-4 md:px-0">
        <QuranTabs />
      </div>
      <QuranReader initialVerses={verses} sourceId={chapterNumber} sourceType="chapter" />
    </div>
  );
}
