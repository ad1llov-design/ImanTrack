/**
 * @module features/hadith/components/HadithPageContent
 *
 * Hadith page — static content from local data.
 * No auth, no favorites sync, no database.
 */

"use client";

import { useState, useMemo } from "react";
import { getHadithOfTheDay, getRandomHadith } from "../services/hadith.service";
import { HADITH_COLLECTIONS } from "../data/collections";
import { HADITH_LIST } from "../data/hadith.collection";
import type { Hadith } from "../types/hadith.types";
import Link from "next/link";
import { BookMarked, Library, ArrowRight, Copy, Share2 } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@shared/i18n/LanguageContext";

export function HadithPageContent() {
  const { t, language } = useLanguage();
  const todayHadith = useMemo(() => getHadithOfTheDay(), []);
  const [currentHadith, setCurrentHadith] = useState<Hadith>(todayHadith);
  const [isCopied, setIsCopied] = useState(false);

  const showNext = () => {
    const next = getRandomHadith();
    setCurrentHadith(next);
  };

  const showToday = () => {
    setCurrentHadith(todayHadith);
  };

  const copy = async () => {
    const text = `${currentHadith.arabic}\n\n${currentHadith.translation}\n\n— ${currentHadith.narrator}`;
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      toast.success(t("hadith.copied"));
      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      toast.error(t("common.error"));
    }
  };

  const share = async () => {
    const text = `${currentHadith.arabic}\n\n${currentHadith.translation}\n\n— ${currentHadith.narrator}`;
    if (navigator.share) {
      try {
        await navigator.share({ text, title: t("hadith.share_title") });
      } catch { /* user cancelled */ }
    } else {
      await copy();
    }
  };

  return (
    <div className="mx-auto max-w-xl px-4 py-8 sm:py-12">

      {/* ── Header */}
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50 flex items-center justify-center gap-2">
          <BookMarked className="h-6 w-6 text-primary-500" /> {t("hadith.daily")}
        </h1>
        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
          {t("hadith.daily_desc")}
        </p>
      </div>

      {/* ── Main hadith card */}
      <div className="rounded-3xl border border-border bg-surface p-6 md:p-8 shadow-card space-y-6">
        {/* Arabic */}
        <p
          className="text-right text-2xl md:text-3xl text-main leading-[2.2] tracking-wide"
          style={{ direction: "rtl", fontFamily: "var(--font-amiri, 'Amiri'), serif" }}
        >
          {currentHadith.arabic}
        </p>

        {/* Translation */}
        <p className="text-sm md:text-base text-main leading-relaxed">
          {currentHadith.translations?.[language] || currentHadith.translation}
        </p>

        {/* Narrator + Source */}
        <div className="flex items-center justify-between border-t border-border pt-4">
          <div>
            <p className="text-xs text-muted">
              {currentHadith.narrator}
            </p>
            <p className="text-[10px] text-muted mt-0.5">
              {currentHadith.collection} {currentHadith.number && `• №${currentHadith.number}`}
            </p>
          </div>
          {currentHadith.grade && (
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md bg-primary-50 text-primary-600 dark:bg-primary-950/30 dark:text-primary-400">
              {currentHadith.grade}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between border-t border-border pt-4">
          <div className="flex items-center gap-2">
            <button
              onClick={copy}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-border text-muted hover:text-main hover:border-primary-300 transition-colors"
            >
              <Copy className="h-4 w-4" />
            </button>
            <button
              onClick={share}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-border text-muted hover:text-main hover:border-primary-300 transition-colors"
            >
              <Share2 className="h-4 w-4" />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={showToday}
              className="px-3 py-1.5 text-xs font-bold text-muted hover:text-main border border-border rounded-xl transition-colors"
            >
              {t("hadith.today")}
            </button>
            <button
              onClick={showNext}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-primary-500 bg-primary-50 dark:bg-primary-950/30 rounded-xl hover:bg-primary-100 dark:hover:bg-primary-950/50 transition-colors"
            >
              {t("hadith.next")} <ArrowRight className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>

      {/* ── Collections section */}
      <div className="mt-12">
        <h2 className="mb-4 text-lg font-bold text-neutral-900 dark:text-neutral-50 flex items-center gap-2">
          <Library className="h-5 w-5 text-primary-500" /> {t("nav.hadith")}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {HADITH_COLLECTIONS.map((collection) => (
            <Link
              key={collection.id}
              href={`/hadith/${collection.id}`}
              className="group relative overflow-hidden rounded-2xl border border-border bg-surface p-5 shadow-sm transition-all hover:border-primary-500 hover:shadow-md h-full flex flex-col justify-between"
            >
              <div>
                <h3 className="text-display font-bold text-main group-hover:text-primary-500 transition-colors">
                  {collection.translations?.[language]?.name || collection.translations?.ru?.name}
                </h3>
                <p className="mt-1 text-xs text-muted font-medium mb-3">
                  {collection.translations?.[language]?.author || collection.translations?.ru?.author}
                </p>
                <p className="text-xs text-neutral-500 leading-relaxed mb-4">
                  {collection.translations?.[language]?.description || collection.translations?.ru?.description}
                </p>
              </div>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-[10px] uppercase font-bold tracking-widest text-primary-500 bg-primary-500/10 px-2 py-1 rounded-md">
                  {collection.count} {t("nav.hadith")}
                </span>
                <span className="text-muted group-hover:text-primary-500 transition-colors">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ── Quran footer */}
      <div className="mt-12 rounded-2xl border border-primary-200 bg-gradient-to-br from-primary-50 to-white p-6 text-center dark:border-primary-800 dark:from-primary-950/20 dark:to-neutral-900">
        <p className="font-arabic text-lg leading-loose text-primary-700 dark:text-primary-300">
          وَمَا يَنطِقُ عَنِ الْهَوَىٰ ۝ إِنْ هُوَ إِلَّا وَحْيٌ يُوحَىٰ
        </p>
        <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">
          {t("hadith.quran_quote")}
        </p>
      </div>
    </div>
  );
}
