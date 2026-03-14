/**
 * @module features/stories/components/StoryWidget
 * 
 * Compact widget for the home page.
 */

"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import { getStoryOfTheDay } from "../services/stories.service";
import { useLanguage } from "@shared/i18n/LanguageContext";

export function StoryWidget() {
  const { language, t } = useLanguage();
  const story = getStoryOfTheDay();

  return (
    <section className="group relative overflow-hidden rounded-[2rem] border border-border bg-gradient-to-br from-white to-surface dark:from-neutral-900 dark:to-neutral-950 p-6 shadow-sm transition-all hover:shadow-md">
      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary-100/30 blur-2xl dark:bg-primary-900/10" />
      
      <div className="relative z-10">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold-100 text-gold-600 dark:bg-gold-950/20">
              <Sparkles className="h-4 w-4" />
            </div>
            <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-50 uppercase tracking-wider">
              {language === 'ru' ? 'История дня' : language === 'uz' ? 'Kun qissasi' : language === 'ky' ? 'Күндүн окуясы' : 'Story of the Day'}
            </h3>
          </div>
          <Link 
            href="/stories"
            className="text-xs font-bold text-primary-500 hover:text-primary-600 flex items-center gap-1"
          >
            {language === 'ru' ? 'Все' : 'View all'} <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="space-y-3">
          <h4 className="font-arabic text-xl text-neutral-900 dark:text-neutral-50">
            {story.titleAr}
          </h4>
          <h5 className="text-lg font-bold text-neutral-800 dark:text-neutral-100">
            {story.titleTranslations[language] || story.titleTranslations["en"]}
          </h5>
          <p className="line-clamp-2 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
            {story.translations[language] || story.translations["en"]}
          </p>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span className="h-1 w-1 rounded-full bg-gold-400" />
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
              {story.sourceKey}
            </span>
          </div>
          <Link 
            href="/stories"
            className="rounded-xl bg-primary-50 px-4 py-2 text-[10px] font-bold text-primary-600 transition-all hover:bg-primary-100 active:scale-95 dark:bg-primary-950/30 dark:text-primary-400"
          >
            {language === 'ru' ? 'Читать' : 'Read Now'}
          </Link>
        </div>
      </div>
    </section>
  );
}
