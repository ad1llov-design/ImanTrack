/**
 * @module features/stories/components/StoriesPageContent
 * 
 * Main container for the Stories page.
 */

"use client";

import React, { useState, useMemo } from "react";
import { useLanguage } from "@shared/i18n/LanguageContext";
import { getStoryOfTheDay, getRandomStory, getAllStories } from "../services/stories.service";
import { Story } from "../types/stories.types";
import { StoryCard } from "./StoryCard";
import { StoriesGrid } from "./StoriesGrid";
import { Sparkles, Library, History, X, Heart } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@shared/lib/utils";

export function StoriesPageContent() {
  const { t, language } = useLanguage();
  const storyOfTheDay = useMemo(() => getStoryOfTheDay(), []);
  const allStories = useMemo(() => getAllStories(), []);
  
  const [currentStory, setCurrentStory] = useState<Story>(storyOfTheDay);
  const [isCopied, setIsCopied] = useState(false);
  const [isShared, setIsShared] = useState(false);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  
  const [favorites, setFavorites] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("iman_stories_favorites");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  React.useEffect(() => {
    localStorage.setItem("iman_stories_favorites", JSON.stringify(favorites));
  }, [favorites]);

  const handleNext = () => {
    const next = getRandomStory();
    setCurrentStory(next);
  };

  const handleSelect = (story: Story) => {
    setSelectedStory(story);
  };

  const toggleFavorite = (storyId: string) => {
    const isFav = favorites.includes(storyId);
    if (isFav) {
      setFavorites(favorites.filter((id) => id !== storyId));
      toast.success(language === "ru" ? "Удалено из избранного" : "Removed from favorites");
    } else {
      setFavorites([...favorites, storyId]);
      toast.success(language === "ru" ? "Добавлено в избранное" : "Added to favorites");
    }
  };

  const favoriteStories = useMemo(() => {
    return allStories.filter(s => favorites.includes(s.id));
  }, [allStories, favorites]);

  const handleCopy = async () => {
    const text = `${currentStory.titleTranslations[language]}\n\n${currentStory.translations[language]}\n\n${t('stories.moral')}: ${currentStory.moralTranslations[language]}\n\n— SIRAT App`;
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      toast.success(t("hadith.copied") || "Copied!");
      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      toast.error("Error copying");
    }
  };

  const handleShare = async () => {
    const text = `${currentStory.titleTranslations[language]}\n\n${currentStory.translations[language]}`;
    if (navigator.share) {
      try {
        await navigator.share({ text, title: currentStory.titleTranslations[language] });
        setIsShared(true);
        setTimeout(() => setIsShared(false), 2000);
      } catch { /* cancelled */ }
    } else {
      handleCopy();
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 md:py-16">
      
      {/* ── Today's Highlight ────────────────── */}
      <div className="mb-16">
        <div className="mb-8 flex items-center justify-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-100 text-gold-600 dark:bg-gold-950/30">
            <Sparkles className="h-5 w-5" />
          </div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50 sm:text-3xl">
            {language === 'ru' ? 'История дня' : language === 'uz' ? 'Kun qissasi' : language === 'ky' ? 'Күндүн окуясы' : 'Story of the Day'}
          </h1>
        </div>

        <StoryCard 
          story={currentStory}
          isFavorite={favorites.includes(currentStory.id)}
          isCopied={isCopied}
          isShared={isShared}
          onToggleFavorite={() => toggleFavorite(currentStory.id)}
          onCopy={handleCopy}
          onShare={handleShare}
          onNext={handleNext}
        />
      </div>

      {/* ── Favorite Stories ─────────────────── */}
      <AnimatePresence>
        {favoriteStories.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-16"
          >
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 text-red-600 dark:bg-red-950/30">
                <Heart className="h-5 w-5 fill-current" />
              </div>
              <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-50">
                {language === 'ru' ? 'Любимые истории' : language === 'uz' ? 'Sevimli qissalar' : language === 'ky' ? 'Сүйүктүү окуялар' : 'Favorite Stories'}
              </h2>
            </div>
            
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {favoriteStories.map(story => (
                <div 
                  key={story.id}
                  onClick={() => handleSelect(story)}
                  className="group relative cursor-pointer overflow-hidden rounded-2xl border border-border bg-surface p-4 transition-all hover:border-primary-400 dark:bg-surface/50"
                >
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-primary-500">
                    {story.sourceKey}
                  </p>
                  <h3 className="line-clamp-1 font-bold text-neutral-900 dark:text-neutral-50">
                    {story.titleTranslations[language]}
                  </h3>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(story.id);
                    }}
                    className="absolute right-4 top-4 text-red-500 opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    <Heart className="h-4 w-4 fill-current" />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Full Collection ─────────────────── */}
      <div className="mt-24">
        <div className="mb-10 flex flex-col items-center justify-between gap-4 border-b border-border pb-8 sm:flex-row">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-100 text-primary-600 dark:bg-primary-900/30">
              <Library className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-50">
                {t('nav.stories')}
              </h2>
              <p className="text-sm text-neutral-500">
                {allStories.length} {language === 'ru' ? 'удивительных историй' : 'amazing stories'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 rounded-full bg-neutral-100 px-3 py-1 dark:bg-neutral-800">
              <History className="h-3 w-3 text-neutral-400" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                {language === 'ru' ? 'Сортировка: По умолчанию' : 'Sort: Default'}
              </span>
            </div>
          </div>
        </div>

        <StoriesGrid stories={allStories} onSelect={handleSelect} />
      </div>

      {/* ── Story Modal ─────────────────────── */}
      <AnimatePresence>
        {selectedStory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedStory(null)}
              className="absolute inset-0 bg-neutral-950/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[2rem] bg-surface dark:bg-neutral-900 shadow-2xl"
            >
              <button 
                onClick={() => setSelectedStory(null)}
                className="absolute right-6 top-6 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 text-neutral-500 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
              
              <div className="p-2 sm:p-4">
                <StoryCard 
                  story={selectedStory}
                  isFavorite={favorites.includes(selectedStory.id)}
                  onToggleFavorite={() => toggleFavorite(selectedStory.id)}
                  onCopy={() => {
                    const text = `${selectedStory.titleTranslations[language]}\n\n${selectedStory.translations[language]}\n\n— SIRAT App`;
                    navigator.clipboard.writeText(text);
                    toast.success(t("hadith.copied"));
                  }}
                  onShare={() => {
                    if (navigator.share) {
                      navigator.share({ text: selectedStory.translations[language], title: selectedStory.titleTranslations[language] });
                    }
                  }}
                  // No onNext in modal
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── Quote / Insight Footer ──────────── */}
      <div className="mt-24 rounded-[2.5rem] bg-neutral-900 px-8 py-12 text-center text-white dark:bg-neutral-800/50">
        <h3 className="mb-6 font-arabic text-3xl leading-relaxed text-gold-400">
          لَّقَدْ كَانَ لَكُمْ فِي رَسُولِ اللَّهِ أُسْوَةٌ حَسَنَةٌ
        </h3>
        <p className="mx-auto max-w-2xl text-lg font-medium text-neutral-300">
          {language === 'ru' 
            ? "«В Посланнике Аллаха был для вас прекрасный пример...»" 
            : language === 'uz'
            ? "«Allohning Rasulida sizlar uchun go'zal o'rnak bor edi...»"
            : language === 'ky'
            ? "«Аллахтын Элчисинде силер үчүн сонун үлгү бар эле...»"
            : "\"Certainly you have in the Messenger of Allah an excellent exemplar...\""}
        </p>
        <p className="mt-4 text-sm text-neutral-500">
          {language === 'ru' ? "Сура аль-Ахзаб, 21" : "Surah Al-Ahzab, 21"}
        </p>
      </div>
    </div>
  );
}
