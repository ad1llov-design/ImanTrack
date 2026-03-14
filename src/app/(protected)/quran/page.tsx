"use client"

import { useState } from "react"
import SurahList from "./components/SurahList"
import MushafReader from "./components/MushafReader"
import AudioPlayer from "./components/AudioPlayer"
import { surahStartPage } from "./data/surahStartPage"
import Link from "next/link"
import { BookOpen, ArrowLeft } from "lucide-react"
import { useLanguage } from "@shared/i18n/LanguageContext"

export default function QuranHubPage() {
  const [selectedSurah, setSelectedSurah] = useState<number | null>(null)
  const [activeAudioPage, setActiveAudioPage] = useState<number | null>(null)
  const { t } = useLanguage()

  const handleSelect = (surah: number) => {
    setSelectedSurah(surah)
    setActiveAudioPage(null)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="mx-auto w-full max-w-4xl px-4 pt-6 pb-[calc(5rem+env(safe-area-inset-bottom))] md:pb-12 flex flex-col min-h-screen">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="space-y-1">
          <h1 className="font-arabic text-h4 text-neutral-800 dark:text-neutral-100 md:text-h3">
            {t("quran.title_main")}
          </h1>
          <p className="text-body-sm text-neutral-500 dark:text-neutral-400">
            {t("quran.mushaf_desc")}
          </p>
        </div>

        <Link 
          href="/quran/translation"
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-surface px-5 py-3 text-sm font-semibold text-main transition-all hover:bg-neutral-50 dark:hover:bg-neutral-800 hover:scale-[1.02] active:scale-95 shrink-0"
        >
          <BookOpen className="h-4 w-4 text-primary-600 dark:text-primary-400" />
          {t("quran.translation_mode")}
        </Link>
      </div>

      {!selectedSurah && (
        <div className="w-full animate-fade-in">
          <SurahList onSelect={handleSelect} />
        </div>
      )}

      {selectedSurah && (
        <div className="flex flex-col items-center w-full animate-fade-in-up">
          <div className="w-full max-w-3xl flex justify-start mb-4">
            <button
              onClick={() => setSelectedSurah(null)}
              className="inline-flex items-center gap-2 text-sm text-primary-600 dark:text-primary-400 font-semibold hover:underline bg-primary-50 dark:bg-primary-900/40 px-4 py-2 rounded-xl transition-colors active:scale-95"
            >
              <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
              {t("quran.back_to_surahs")}
            </button>
          </div>

          <MushafReader 
            initialPage={surahStartPage[selectedSurah] || 1} 
            externalPage={activeAudioPage || undefined}
          />

          <AudioPlayer 
            surah={selectedSurah} 
            onPageChange={(p) => setActiveAudioPage(p)}
          />
        </div>
      )}

    </div>
  )
}
