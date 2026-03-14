"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@shared/i18n/LanguageContext"
import { getSurahVerses, Verse } from "@features/quran/services/quran_api.service"

interface AudioPlayerProps {
  surah: number
  onPageChange?: (page: number) => void
}

export default function AudioPlayer({ surah, onPageChange }: AudioPlayerProps) {
  const [reciter, setReciter] = useState("Alafasy_128kbps")
  const { t, language } = useLanguage()
  const [verses, setVerses] = useState<Verse[]>([])
  const [currentVerseIndex, setCurrentVerseIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    async function fetchVerses() {
      const data = await getSurahVerses(surah, "quran-uthmani", language)
      setVerses(data)
      setCurrentVerseIndex(0)
    }
    fetchVerses()
  }, [surah, language])

  useEffect(() => {
    if (verses.length > 0 && currentVerseIndex < verses.length) {
      const page = verses[currentVerseIndex]?.page_number
      if (page && onPageChange && isPlaying) {
        onPageChange(page)
      }
    }
  }, [currentVerseIndex, verses, onPageChange, isPlaying])

  if (verses.length === 0) return null

  const currentVerse = verses[currentVerseIndex]
  if (!currentVerse) return null

  const audioUrl = `https://everyayah.com/data/${reciter}/${String(surah).padStart(3, '0')}${String(currentVerseIndex + 1).padStart(3, '0')}.mp3`

  return (
    <div className="w-full max-w-3xl mt-6 relative z-10 px-2 lg:px-0">
      {/* Subtitles (Плашка внизу) */}
      <div className="rounded-2xl bg-surface border border-border overflow-hidden shadow-lg p-4 md:p-6 transition-all">
        <div className="flex justify-between items-start gap-4 mb-4 border-b border-border pb-4">
          <div className="flex flex-col flex-1 pl-1">
            <span className="text-xs font-bold uppercase tracking-wider text-primary-500 mb-1">
              Субтитры
            </span>
            <p className="font-arabic text-2xl md:text-3xl text-main leading-relaxed text-right md:text-center w-full min-h-[50px] font-bold" style={{ direction: "rtl", fontFamily: "var(--font-amiri), serif" }}>
              {currentVerse.text_arabic}
            </p>
            {currentVerse.translation && (
              <p className="text-sm md:text-base text-muted mt-3 text-center line-clamp-3">
                {currentVerse.translation}
              </p>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
          <div className="relative shrink-0 w-full sm:w-auto min-w-[150px]">
            <select
              value={reciter}
              onChange={(e) => setReciter(e.target.value)}
              className="w-full rounded-xl border border-border bg-neutral-100 dark:bg-neutral-900 px-3 py-2.5 text-xs font-semibold text-main outline-none focus:border-primary-500 transition-all appearance-none cursor-pointer"
            >
              <option value="Alafasy_128kbps">Mishary Alafasy</option>
              <option value="Abdul_Basit_Murattal_192kbps">Abdul Basit</option>
              <option value="Minshawy_Murattal_128kbps">Minshawi (M)</option>
              <option value="Hudhaify_128kbps">Al-Hudhaify</option>
            </select>
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted text-xs">
              ▼
            </div>
          </div>
          
          <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-3 w-full">
            <span className="text-xs font-bold text-muted uppercase shrink-0 px-2 sm:px-0 text-center sm:text-left">
              Аят {currentVerseIndex + 1} / {verses.length}
            </span>
            <audio 
              key={audioUrl}
              controls 
              autoPlay={currentVerseIndex > 0 || isPlaying} 
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={() => {
                if (currentVerseIndex < verses.length - 1) {
                  setCurrentVerseIndex(currentVerseIndex + 1)
                  setIsPlaying(true)
                } else {
                  setIsPlaying(false)
                }
              }}
              className="h-10 w-full hover:scale-[1.01] transition-transform outline-none"
              src={audioUrl}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
