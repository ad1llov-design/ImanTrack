"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight, Play, Pause, Settings2, ArrowLeft } from "lucide-react";
import { useLanguage } from "@shared/i18n/LanguageContext";

interface AudioFile {
  verse_key: string;
  url: string;
}

const RECITERS = [
  { id: 7, name: "Mishary Rashid Alafasy" },
  { id: 3, name: "Abdul Rahman Al-Sudais" },
  { id: 4, name: "Saad Al-Ghamdi" },
];

export function QuranPageReader() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useLanguage();
  
  const [page, setPage] = useState<number>(() => {
    const q = searchParams.get("page");
    if (q) return parseInt(q, 10);
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("quran_mushaf_last_page");
      return saved ? parseInt(saved, 10) : 1;
    }
    return 1;
  });

  const [reciterId, setReciterId] = useState<number>(7);
  const [audioFiles, setAudioFiles] = useState<AudioFile[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playQueueRef = useRef<AudioFile[]>([]);

  // Update URL purely visually and save state
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("quran_mushaf_last_page", String(page));
      window.history.replaceState(null, "", `?page=${page}`);
    }
    
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
    }
  }, [page]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("quran_reciter", String(reciterId));
    }
  }, [reciterId]);

  useEffect(() => {
    const fetchAudio = async () => {
      try {
        const res = await fetch(`https://api.quran.com/api/v4/recitations/${reciterId}/by_page/${page}`);
        const data = await res.json();
        if (data.audio_files) {
          setAudioFiles(data.audio_files);
        }
      } catch (error) {
        console.error("Failed to fetch audio", error);
      }
    };
    fetchAudio();
  }, [reciterId, page]);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }
    const audio = audioRef.current;

    const handleEnded = () => {
      if (playQueueRef.current.length > 0) {
        const next = playQueueRef.current.shift();
        if (next) {
          const audioUrl = next.url.startsWith("http") ? next.url : `https://verses.quran.com/${next.url}`;
          audio.src = audioUrl;
          audio.play().catch(() => setIsPlaying(false));
        }
      } else {
        setIsPlaying(false);
      }
    };

    audio.addEventListener("ended", handleEnded);
    return () => {
      audio.removeEventListener("ended", handleEnded);
      audio.pause();
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      if (audioFiles.length > 0) {
        if (!audioRef.current.src || audioRef.current.ended) {
          const queue = [...audioFiles];
          const first = queue.shift();
          if (first) {
            playQueueRef.current = queue;
            const audioUrl = first.url.startsWith("http") ? first.url : `https://verses.quran.com/${first.url}`;
            audioRef.current.src = audioUrl;
          }
        }
        audioRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
      }
    }
  };

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < 604) setPage(page + 1);
  };

  return (
    <div className="mx-auto w-full max-w-4xl px-4 pt-4 pb-[calc(5rem+env(safe-area-inset-bottom))] md:pb-12 md:pt-4">
      {/* Header Controls */}
      <div className="mb-4 flex items-center justify-between rounded-3xl border border-border bg-surface p-4 shadow-sm md:p-5">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/quran")}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-100 text-main hover:bg-neutral-200 transition-colors dark:bg-neutral-800 dark:hover:bg-neutral-700"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          
          <button
            onClick={togglePlay}
            disabled={audioFiles.length === 0}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-100 text-primary-600 transition-all hover:bg-primary-200 hover:scale-105 active:scale-95 disabled:pointer-events-none disabled:opacity-50 dark:bg-primary-900/40 dark:text-primary-400"
          >
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
          </button>
        </div>

        <div className="text-center font-bold text-main">
          {t("quran.page_number").replace("{number}", String(page))}
        </div>
        
        <div className="relative">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-border text-muted transition-all hover:border-primary-300 hover:bg-neutral-50 active:scale-95 dark:hover:border-primary-700 dark:hover:bg-neutral-800"
          >
            <Settings2 className="h-5 w-5" />
          </button>
          
          {showSettings && (
            <div className="absolute right-0 top-12 z-20 w-56 animate-fade-in-up rounded-2xl border border-border bg-surface p-2 shadow-card">
              <div className="mb-2 px-3 pt-2 text-xs font-bold uppercase tracking-wider text-muted">{t("quran.select_reciter")}</div>
              <div className="flex flex-col gap-1">
                {RECITERS.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => {
                      setReciterId(r.id);
                      setShowSettings(false);
                      setIsPlaying(false);
                      if (audioRef.current) audioRef.current.pause();
                    }}
                    className={`w-full rounded-xl px-4 py-2.5 text-left text-sm font-medium transition-all ${
                      reciterId === r.id
                        ? "bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400"
                        : "text-main hover:bg-neutral-50 dark:hover:bg-neutral-800"
                    }`}
                  >
                    {r.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Image Container */}
      <div className="rounded-3xl border border-border bg-white dark:bg-stone-100 p-2 md:p-6 shadow-card w-full mb-6">
        <div className="relative w-full aspect-[2/3] max-h-[80vh] mx-auto overflow-hidden rounded-xl">
          <Image
            src={`https://cdn.quran.com/images/pages/page_${page}.png`}
            alt={`Quran Page ${page}`}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 800px"
            priority
          />
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={handleNext}
          disabled={page >= 604}
          className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-border bg-surface px-4 py-4 text-sm font-semibold text-main transition-all hover:border-primary-300 hover:shadow-sm active:scale-[0.98] disabled:pointer-events-none disabled:opacity-40"
        >
          <ChevronLeft className="h-5 w-5" />
          <span className="hidden sm:inline">{t("quran.next_page")}</span>
        </button>
        
        <div className="flex flex-col items-center justify-center px-4">
           <span className="text-sm font-bold text-main">{page}</span>
           <span className="text-[10px] font-medium tracking-wider text-muted uppercase">{t("quran.page_short")}</span>
        </div>

        <button
          onClick={handlePrev}
          disabled={page <= 1}
          className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-border bg-surface px-4 py-4 text-sm font-semibold text-main transition-all hover:border-primary-300 hover:shadow-sm active:scale-[0.98] disabled:pointer-events-none disabled:opacity-40"
        >
          <span className="hidden sm:inline">{t("quran.prev_page")}</span>
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
