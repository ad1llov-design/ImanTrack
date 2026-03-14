/**
 * @module features/stories/components/StoryCard
 * 
 * Premium story card component for displaying "Stories from the Prophet's ﷺ Life".
 * Uses the project's premium aesthetic with responsive design and multi-language support.
 */

"use client";

import React from "react";
import { cn } from "@shared/lib/utils";
import { useLanguage } from "@shared/i18n/LanguageContext";
import { Story } from "../types/stories.types";
import { 
  Heart, 
  Share2, 
  Copy, 
  ChevronRight, 
  Quote, 
  BookOpen,
  Check,
  Lightbulb
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface StoryCardProps {
  story: Story;
  isFavorite: boolean;
  isCopied?: boolean;
  isShared?: boolean;
  onToggleFavorite: () => void;
  onCopy: () => void;
  onShare: () => void;
  onNext?: () => void;
  className?: string;
}

export function StoryCard({
  story,
  isFavorite,
  isCopied = false,
  isShared = false,
  onToggleFavorite,
  onCopy,
  onShare,
  onNext,
  className,
}: StoryCardProps) {
  const { language } = useLanguage();

  return (
    <div className={cn(
      "group relative flex flex-col overflow-hidden rounded-[2.5rem] border border-border bg-surface shadow-card transition-all duration-500 hover:shadow-xl",
      className
    )}>
      {/* ── Decorative Gradient Top ─────────────── */}
      <div className="h-2 w-full bg-gradient-to-r from-primary-400 via-gold-400 to-primary-600" />

      {/* ── Floating Ornament ─────────────────── */}
      <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary-100/5 blur-3xl transition-all" />

      <div className="flex flex-1 flex-col p-6 sm:p-10">
        
        {/* ── Header: Icon & Source ────────────── */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-100 text-primary-600 shadow-sm dark:bg-primary-900/30 dark:text-primary-400">
              <BookOpen className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[0.65rem] font-bold uppercase tracking-widest text-primary-500/80 dark:text-primary-400/60">
                {story.sourceKey.toUpperCase()}
              </p>
              <h4 className="text-xs font-medium text-neutral-400 dark:text-neutral-500">
                {story.source}
              </h4>
            </div>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite();
              }}
              className={cn(
                "flex h-12 w-12 items-center justify-center rounded-2xl transition-all active:scale-90",
                isFavorite 
                  ? "bg-red-50 text-red-500 shadow-md dark:bg-red-950/40" 
                  : "bg-surface border border-border text-neutral-400 hover:bg-neutral-50 hover:text-red-400 dark:hover:bg-neutral-800"
              )}
            >
              <Heart className={cn("h-6 w-6 transition-transform", isFavorite && "fill-current scale-110")} />
            </button>
          </div>
        </div>

        {/* ── Title Section ────────────────────── */}
        <div className="mb-8 text-center">
          <h2 className="mb-2 font-arabic text-3xl font-medium text-neutral-900 dark:text-neutral-50 sm:text-4xl">
            {story.titleAr}
          </h2>
          <h3 className="text-xl font-bold tracking-tight text-neutral-800 dark:text-neutral-200 sm:text-2xl">
            {story.titleTranslations[language] || story.titleTranslations["en"]}
          </h3>
          <div className="mt-4 flex justify-center">
            <div className="h-1 w-12 rounded-full bg-gold-400/40" />
          </div>
        </div>

        {/* ── Story Content ────────────────────── */}
        <div className="flex-1 space-y-8">
          {/* Arabic Text & Transliteration */}
          <div className="relative">
            <Quote className="absolute -left-4 -top-4 h-8 w-8 text-primary-100/50 dark:text-primary-900/20" />
            <div className="relative z-10 text-right">
              <p className="font-arabic text-2xl leading-[2.2] text-neutral-900 dark:text-neutral-50 sm:text-3xl sm:leading-[2.4]">
                {story.arabic}
              </p>
              
              {/* Transliteration - now right after Arabic */}
              {story.transliterations[language] && (
                <div className="mt-4 text-center">
                  <p className="text-sm italic leading-relaxed text-primary-600/70 dark:text-primary-400/70">
                    {story.transliterations[language].replace(/\.\.\.$/, '')}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Translation */}
          <div className="relative pt-2">
            <div className="absolute left-0 top-0 h-full w-[2px] rounded-full bg-gradient-to-b from-primary-200 to-transparent dark:from-primary-800" />
            <p className="pl-6 text-base leading-loose text-neutral-600 dark:text-neutral-300 sm:text-lg">
              {story.translations[language] || story.translations["en"]}
            </p>
          </div>

          {/* Moral / Lesson */}
          <div className="overflow-hidden rounded-3xl bg-gold-50/50 p-6 ring-1 ring-gold-200/50 dark:bg-gold-950/10 dark:ring-gold-900/20">
            <div className="mb-3 flex items-center gap-2 text-gold-600 dark:text-gold-400">
              <Lightbulb className="h-5 w-5" />
              <span className="text-sm font-bold uppercase tracking-wider">
                {language === 'ru' ? 'Урок' : language === 'uz' ? 'Saboq' : language === 'ky' ? 'Сабак' : 'Moral'}
              </span>
            </div>
            <p className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300 sm:text-base">
              {story.moralTranslations[language] || story.moralTranslations["en"]}
            </p>
          </div>
        </div>

        {/* ── Action Buttons ───────────────────── */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-8">
          <div className="flex gap-2">
            <button
              onClick={onCopy}
              className="flex items-center gap-2 rounded-xl bg-neutral-100 px-4 py-2.5 text-xs font-bold text-neutral-600 transition-all hover:bg-neutral-200 active:scale-95 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700"
            >
              {isCopied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
              {language === 'ru' ? 'Копировать' : language === 'uz' ? 'Nusxa olish' : language === 'ky' ? 'Көчүрүү' : 'Copy'}
            </button>
            <button
              onClick={onShare}
              className="flex items-center gap-2 rounded-xl bg-neutral-100 px-4 py-2.5 text-xs font-bold text-neutral-600 transition-all hover:bg-neutral-200 active:scale-95 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700"
            >
              <Share2 className="h-4 w-4" />
              {language === 'ru' ? 'Поделиться' : language === 'uz' ? 'Ulashish' : language === 'ky' ? 'Бөлүшүү' : 'Share'}
            </button>
          </div>

          <button
            onClick={onNext}
            className="flex items-center gap-2 rounded-2xl bg-primary-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-primary-200 transition-all hover:bg-primary-700 hover:shadow-primary-300 active:scale-95 dark:shadow-none"
          >
            {language === 'ru' ? 'Следующая история' : language === 'uz' ? 'Keyingi qissa' : language === 'ky' ? 'Кийинки окуя' : 'Next Story'}
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
