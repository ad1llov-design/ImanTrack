/**
 * @module features/hadith/store/hadithStore
 *
 * Zustand store для хадисов.
 */

"use client";

import { create } from "zustand";
import { devtools } from "zustand/middleware";

import type { Hadith, HadithState } from "../types/hadith.types";

/* ── Actions ────────────────────────────────────────────────────────── */

interface HadithActions {
  setCurrentHadith: (hadith: Hadith | null) => void;
  setFavorites: (favorites: string[]) => void;
  toggleFavorite: (hadithId: string) => void;
  setLoading: (loading: boolean) => void;
  setCopied: (copied: boolean) => void;
  setShared: (shared: boolean) => void;
  setError: (error: string | null) => void;
}

/* ── Initial state ──────────────────────────────────────────────────── */

const initialState: HadithState = {
  currentHadith: null,
  favorites: [],
  isLoading: true,
  isCopied: false,
  isShared: false,
  error: null,
};

/* ── Store ──────────────────────────────────────────────────────────── */

export const useHadithStore = create<HadithState & HadithActions>()(
  devtools(
    (set, get) => ({
      ...initialState,

      setCurrentHadith: (currentHadith) =>
        set({ currentHadith }, false, "hadith/setCurrent"),

      setFavorites: (favorites) =>
        set({ favorites }, false, "hadith/setFavorites"),

      toggleFavorite: (hadithId) => {
        const { favorites } = get();
        const index = favorites.indexOf(hadithId);
        const next =
          index >= 0
            ? favorites.filter((id) => id !== hadithId)
            : [...favorites, hadithId];
        set({ favorites: next }, false, "hadith/toggleFavorite");
      },

      setLoading: (isLoading) =>
        set({ isLoading }, false, "hadith/setLoading"),

      setCopied: (isCopied) =>
        set({ isCopied }, false, "hadith/setCopied"),

      setShared: (isShared) =>
        set({ isShared }, false, "hadith/setShared"),

      setError: (error) =>
        set({ error, isLoading: false }, false, "hadith/setError"),
    }),
    { name: "HadithStore" },
  ),
);
