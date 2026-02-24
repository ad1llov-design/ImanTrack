/**
 * @module features/hadith/types
 *
 * Типы для модуля «Хадис дня».
 */

/* ── Source ──────────────────────────────────────────────────────────── */

export type HadithCollection =
  | "bukhari"
  | "muslim"
  | "tirmidhi"
  | "abu_dawud"
  | "nasai"
  | "ibn_majah"
  | "nawawi";

export interface CollectionInfo {
  id: HadithCollection;
  nameRu: string;
  nameAr: string;
  shortName: string;
}

/* ── Hadith ─────────────────────────────────────────────────────────── */

export interface Hadith {
  id: string;
  arabic: string;
  translation: string;       // Русский перевод
  translations?: {
    ru: string;
    en: string;
    uz: string;
    ky: string;
  };
  narrator: string;           // Передатчик (напр. «Абу Хурайра»)
  narratorAr?: string;       // Арабское имя передатчика
  collection: HadithCollection;
  number?: string;            // Номер хадиса в сборнике
  chapter?: string;           // Глава / раздел
  grade?: string;             // Степень достоверности
  topic?: string;             // Тема
}

/* ── Favorite ───────────────────────────────────────────────────────── */

export interface FavoriteHadith {
  hadithId: string;
  savedAt: Date;
}

/* ── DB Row ──────────────────────────────────────────────────────────── */

export interface HadithFavoriteRow {
  id: string;
  user_id: string;
  hadith_id: string;
  created_at: string;
}

/* ── State ──────────────────────────────────────────────────────────── */

export interface HadithState {
  currentHadith: Hadith | null;
  favorites: string[];         // hadithId[]
  isLoading: boolean;
  isCopied: boolean;
  isShared: boolean;
  error: string | null;
}
