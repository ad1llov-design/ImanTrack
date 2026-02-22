import { notFound } from "next/navigation";
import { HADITH_COLLECTIONS } from "@features/hadith/data/collections";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface PageProps {
  params: {
    id: string;
  };
}

// Mock Hadiths for demonstration
const MOCK_HADITHS = [
  {
    id: 1,
    arabic: "إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى",
    translation: "Поистине, дела (оцениваются) только по намерениям, и, поистине, каждому человеку (достанется) лишь то, что он намеревался (обрести).",
    narrator: "Передал Умар ибн аль-Хаттаб (да будет доволен им Аллах)",
  },
  {
    id: 2,
    arabic: "المُسْلِمُ مَنْ سَلِمَ المُسْلِمُونَ مِنْ لِسَانِهِ وَيَدِهِ",
    translation: "Мусульманин — это тот, от языка и рук которого находятся в безопасности другие мусульмане.",
    narrator: "Передал Абдуллах ибн Амр (да будет доволен им Аллах)",
  }
];

export default function HadithCollectionPage({ params }: PageProps) {
  const collectionId = params.id;
  const collection = HADITH_COLLECTIONS.find((c) => c.id === collectionId);

  if (!collection) return notFound();

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 pb-32">
      <Link href="/hadith" className="inline-flex items-center text-sm font-medium text-muted hover:text-main mb-6 transition-colors">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Назад к сборникам
      </Link>

      <div className="mb-8">
        <h1 className="text-display text-3xl font-bold text-main">{collection.name}</h1>
        <p className="mt-2 text-muted">{collection.description}</p>
        <div className="mt-4 flex items-center gap-4">
          <span className="text-xs uppercase tracking-widest font-bold text-primary-500 bg-primary-500/10 px-3 py-1 rounded-full">
            {collection.author}
          </span>
          <span className="text-xs text-muted">
            {collection.count} хадисов
          </span>
        </div>
      </div>

      <div className="space-y-6">
        {MOCK_HADITHS.map((hadith, index) => (
          <div key={hadith.id} className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
               <span className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800 text-xs font-bold text-muted">
                 {index + 1}
               </span>
            </div>
            <p className="font-arabic text-xl leading-loose text-main text-right mb-6" dir="rtl">
              {hadith.arabic}
            </p>
            <p className="text-sm leading-relaxed text-muted mb-4">
              {hadith.translation}
            </p>
            <div className="border-t border-border pt-4">
              <p className="text-xs text-neutral-500 font-medium">
                {hadith.narrator} — {collection.name}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-xs text-muted">Остальные хадисы будут доступны в полной версии.</p>
      </div>
    </div>
  );
}
