/**
 * @module features/stories/components/StoriesGrid
 * 
 * Grid component for displaying the collection of stories.
 */

"use client";

import React from "react";
import Link from "next/link";
import { Story } from "../types/stories.types";
import { useLanguage } from "@shared/i18n/LanguageContext";
import { BookOpen } from "lucide-react";

interface StoriesGridProps {
  stories: Story[];
}

export function StoriesGrid({ stories }: StoriesGridProps) {
  const { language, t } = useLanguage();

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {stories.map((story) => (
        <div 
          key={story.id}
          className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-border bg-surface p-6 shadow-sm transition-all hover:border-primary-400 hover:shadow-md dark:bg-surface/50"
        >
          <div>
            <div className="mb-4 flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary-500">
                {story.sourceKey}
              </span>
              <BookOpen className="h-4 w-4 text-neutral-300 transition-colors group-hover:text-primary-300" />
            </div>
            
            <h3 className="mb-2 font-arabic text-xl text-neutral-900 dark:text-neutral-50">
              {story.titleAr}
            </h3>
            <h4 className="mb-3 text-lg font-bold text-neutral-800 dark:text-neutral-200">
              {story.titleTranslations[language] || story.titleTranslations["en"]}
            </h4>
            
            <p className="line-clamp-3 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
              {story.translations[language] || story.translations["en"]}
            </p>
          </div>
          
          <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
            <span className="text-[10px] text-neutral-400">
              {story.id.toUpperCase()}
            </span>
            <button 
              className="text-xs font-bold text-primary-500 transition-colors group-hover:text-primary-600"
              onClick={() => {
                // In a real app we might navigate to a detail page, 
                // but here we toggle the main daily story to this one
                window.scrollTo({ top: 0, behavior: 'smooth' });
                // We'll handle the selection in the parent component
              }}
            >
              {language === 'ru' ? 'Читать полностью' : language === 'uz' ? 'To\'liq o\'qish' : language === 'ky' ? 'Толук окуу' : 'Read more'} →
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
