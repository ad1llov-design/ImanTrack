import { QuranReader } from "../../../components/quran/QuranReader";

export const dynamicParams = true;

export async function generateStaticParams() {
  return Array.from({ length: 604 }, (_, i) => ({
    page: String(i + 1),
  }));
}

export default async function QuranPage({ params }: { params: { page: string } }) {
  const pageNumber = parseInt(params.page, 10);
  
  if (isNaN(pageNumber) || pageNumber < 1 || pageNumber > 604) {
    return (
      <div className="mx-auto flex max-w-lg min-h-[60vh] flex-col items-center justify-center p-4 text-center">
        <h1 className="text-2xl font-bold text-main">Страница не найдена</h1>
        <a href="/quran/1" className="mt-6 rounded-xl bg-primary-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-700">
          Вернуться к началу
        </a>
      </div>
    );
  }

  const response = await fetch(`https://api.quran.com/api/v4/quran/verses/uthmani?page_number=${pageNumber}`, {
    next: { revalidate: 86400 } // Cache per 24 hours
  });

  if (!response.ok) {
    return (
      <div className="mx-auto flex max-w-lg min-h-[60vh] flex-col items-center justify-center p-4 text-center">
        <h1 className="text-xl font-bold text-main">Ошибка загрузки данных</h1>
        <p className="mt-2 text-muted">Пожалуйста, проверьте подключение и обновите страницу.</p>
        <a href={`/quran/${pageNumber}`} className="mt-6 rounded-xl bg-primary-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-700">
          Повторить попытку
        </a>
      </div>
    );
  }

  const data = await response.json();
  const verses = data.verses || [];

  return <QuranReader initialVerses={verses} pageNumber={pageNumber} />;
}
