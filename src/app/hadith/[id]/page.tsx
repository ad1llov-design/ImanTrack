"use client";

import { notFound } from "next/navigation";
import { HADITH_COLLECTIONS } from "@features/hadith/data/collections";
import { HADITHS_DATA } from "@features/hadith/data/hadiths";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@shared/i18n/LanguageContext";

interface PageProps {
  params: {
    id: string;
  };
}

export default function HadithCollectionPage({ params }: PageProps) {
  const { t, language } = useLanguage();
  const collectionId = params.id;
  const collectionRaw = HADITH_COLLECTIONS.find((c) => c.id === collectionId);
  const hadiths = HADITHS_DATA[collectionId] || [];

  if (!collectionRaw) return notFound();

  const collection = {
    name: collectionRaw.translations?.[language]?.name || collectionRaw.translations?.ru?.name,
    author: collectionRaw.translations?.[language]?.author || collectionRaw.translations?.ru?.author,
    description: collectionRaw.translations?.[language]?.description || collectionRaw.translations?.ru?.description,
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 pb-32">
      <Link href="/hadith" className="inline-flex items-center text-sm font-medium text-muted hover:text-main mb-6 transition-colors">
        <ArrowLeft className="mr-2 h-4 w-4" />
        {t("common.back")}
      </Link>

      <div className="mb-8">
        <h1 className="text-display text-3xl font-bold text-main">{collection.name}</h1>
        <p className="mt-2 text-muted">{collection.description}</p>
        <div className="mt-4 flex items-center gap-4">
          <span className="text-xs uppercase tracking-widest font-bold text-primary-500 bg-primary-500/10 px-3 py-1 rounded-full">
            {collection.author}
          </span>
          <span className="text-xs text-muted">
             {hadiths.length} {t("hadith.count_label")}
          </span>
        </div>
      </div>

      <div className="space-y-6">
        {hadiths.map((hadith) => (
          <div key={hadith.id} className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
               <span className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800 text-xs font-bold text-muted">
                 {hadith.id}
               </span>
               <span className="text-[10px] font-bold text-primary-500 bg-primary-500/10 px-2 py-0.5 rounded-md uppercase tracking-wider">
                 {hadith.reference}
               </span>
            </div>
            <p className="font-arabic text-xl leading-loose text-main text-right mb-6" dir="rtl">
              {hadith.arabic}
            </p>
            <p className="text-sm leading-relaxed text-muted">
              {hadith.translations?.[language] || hadith.translation}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
