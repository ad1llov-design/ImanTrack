"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, Play, Pause, Settings2 } from "lucide-react";

interface Verse {
  id: number;
  verse_key: string;
  text_uthmani: string;
}

interface AudioFile {
  verse_key: string;
  url: string;
}

interface QuranReaderProps {
  initialVerses: Verse[];
  pageNumber: number;
}

const RECITERS = [
  { id: 7, name: "Mishary Rashid Alafasy" },
  { id: 3, name: "Abdul Rahman Al-Sudais" },
  { id: 4, name: "Saad Al-Ghamdi" },
];

export function QuranReader({ initialVerses, pageNumber }: QuranReaderProps) {
  const router = useRouter();
  
  const [reciterId, setReciterId] = useState<number>(7);
  const [audioFiles, setAudioFiles] = useState<AudioFile[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeVerseKey, setActiveVerseKey] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playQueueRef = useRef<AudioFile[]>([]);
  const touchStartRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("quran_last_page", String(pageNumber));
      const savedReciter = localStorage.getItem("quran_reciter");
      if (savedReciter) setReciterId(Number(savedReciter));
    }
  }, [pageNumber]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("quran_reciter", String(reciterId));
    }
  }, [reciterId]);

  useEffect(() => {
    const fetchAudio = async () => {
      try {
        const res = await fetch(`https://api.quran.com/api/v4/recitations/${reciterId}/by_page/${pageNumber}`);
        const data = await res.json();
        if (data.audio_files) {
          setAudioFiles(data.audio_files);
        }
      } catch (error) {
        console.error("Failed to fetch audio", error);
      }
    };
    fetchAudio();
  }, [reciterId, pageNumber]);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }

    const audio = audioRef.current;

    const handleEnded = () => {
      if (playQueueRef.current.length > 0) {
        const next = playQueueRef.current.shift();
        if (next) {
          setActiveVerseKey(next.verse_key);
          const audioUrl = next.url.startsWith("http") ? next.url : `https://verses.quran.com/${next.url}`;
          audio.src = audioUrl;
          audio.play().catch(() => {
            setIsPlaying(false);
            setActiveVerseKey(null);
          });
        }
      } else {
        setIsPlaying(false);
        setActiveVerseKey(null);
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
      if (!activeVerseKey && audioFiles.length > 0) {
        const queue = [...audioFiles];
        const first = queue.shift();
        if (first) {
          playQueueRef.current = queue;
          setActiveVerseKey(first.verse_key);
          const audioUrl = first.url.startsWith("http") ? first.url : `https://verses.quran.com/${first.url}`;
          audioRef.current.src = audioUrl;
          
          audioRef.current.play().then(() => {
            setIsPlaying(true);
          }).catch(() => {
            setIsPlaying(false);
            setActiveVerseKey(null);
          });
        }
      } else if (activeVerseKey) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {
          setIsPlaying(false);
        });
      }
    }
  };

  const handlePrev = () => {
    if (pageNumber > 1) router.push(`/quran/${pageNumber - 1}`);
  };

  const handleNext = () => {
    if (pageNumber < 604) router.push(`/quran/${pageNumber + 1}`);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartRef.current === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStartRef.current - touchEnd;
    
    // Swipe left (next page in Arabic RTL naturally, or just advancing)
    if (diff > 50 && pageNumber < 604) handleNext();
    // Swipe right (previous page)
    if (diff < -50 && pageNumber > 1) handlePrev();
    
    touchStartRef.current = null;
  };

  return (
    <div className="mx-auto max-w-4xl px-4 pt-4 pb-[calc(5rem+env(safe-area-inset-bottom))] md:pb-12 md:pt-8 overflow-x-hidden w-full">
      <div className="mb-6 flex items-center justify-between rounded-3xl border border-border bg-surface p-4 shadow-sm md:p-5">
        <div className="flex items-center gap-4">
          <button
            onClick={togglePlay}
            disabled={audioFiles.length === 0}
            className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-100 text-primary-600 transition-all hover:bg-primary-200 hover:scale-105 active:scale-95 disabled:pointer-events-none disabled:opacity-50 dark:bg-primary-900/40 dark:text-primary-400"
          >
            {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-1" />}
          </button>
          <div>
            <div className="text-base font-bold text-main">
              Страница {pageNumber}
            </div>
            <div className="text-xs text-muted">
              {audioFiles.length === 0 ? "Загрузка аудио..." : "Коран"}
            </div>
          </div>
        </div>
        
        <div className="relative">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border text-muted transition-all hover:border-primary-300 hover:bg-neutral-50 active:scale-95 dark:hover:border-primary-700 dark:hover:bg-neutral-800"
          >
            <Settings2 className="h-6 w-6" />
          </button>
          
          {showSettings && (
            <div className="absolute right-0 top-14 z-20 w-64 animate-fade-in-up rounded-2xl border border-border bg-surface p-2 shadow-card">
              <div className="mb-2 px-3 pt-2 text-xs font-bold uppercase tracking-wider text-muted">Выбор чтеца</div>
              <div className="flex flex-col gap-1">
                {RECITERS.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => {
                      setReciterId(r.id);
                      setShowSettings(false);
                      setIsPlaying(false);
                      setActiveVerseKey(null);
                      if (audioRef.current) audioRef.current.pause();
                    }}
                    className={`w-full rounded-xl px-4 py-3 text-left text-sm font-medium transition-all ${
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

      <div 
        className="min-h-[65vh] rounded-[2rem] border border-border bg-surface p-5 shadow-card md:p-12 w-full touch-pan-y select-none"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div 
          className="text-center sm:text-justify max-w-full break-words leading-[3] md:leading-[3.5]" 
          dir="rtl" 
          style={{ fontFamily: "var(--font-amiri), 'Amiri', serif" }}
        >
          {initialVerses.map((verse) => {
            const isActive = activeVerseKey === verse.verse_key;
            return (
              <span 
                key={verse.id}
                className={`inline transition-all duration-300 ${
                  isActive 
                    ? "bg-primary-100 text-primary-800 dark:bg-primary-900/50 dark:text-primary-200 py-1 rounded" 
                    : "text-main"
                } text-[1.65rem] sm:text-3xl md:text-4xl lg:text-[2.5rem]`}
              >
                {verse.text_uthmani}
                <span className="mx-1 sm:mx-2 inline-flex h-8 w-8 sm:h-9 sm:w-9 md:h-11 md:w-11 items-center justify-center rounded-full border border-border bg-neutral-50/50 text-[10px] sm:text-xs md:text-sm text-muted dark:bg-neutral-900/50 align-middle">
                  {verse.verse_key.split(":")[1]}
                </span>
              </span>
            );
          })}
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between gap-4">
        <button
          onClick={handlePrev}
          disabled={pageNumber <= 1}
          className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-border bg-surface px-4 py-4 text-sm font-semibold text-main transition-all hover:border-primary-300 hover:shadow-sm active:scale-[0.98] disabled:pointer-events-none disabled:opacity-40 dark:hover:border-primary-700"
        >
          <ChevronLeft className="h-5 w-5" />
          <span className="hidden sm:inline">Предыдущая</span>
        </button>
        <div className="flex flex-col items-center justify-center px-4">
          <span className="text-sm font-bold text-main">{pageNumber}</span>
          <span className="text-[10px] font-medium tracking-wider text-muted uppercase">Стр</span>
        </div>
        <button
          onClick={handleNext}
          disabled={pageNumber >= 604}
          className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-border bg-surface px-4 py-4 text-sm font-semibold text-main transition-all hover:border-primary-300 hover:shadow-sm active:scale-[0.98] disabled:pointer-events-none disabled:opacity-40 dark:hover:border-primary-700"
        >
          <span className="hidden sm:inline">Следующая</span>
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
