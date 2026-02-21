/**
 * @module features/auth
 * Zustand store для управления состоянием авторизации
 */
"use client";

import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import type { User } from "@entities/user/model/user";

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        isLoading: true,
        isAuthenticated: false,

        setUser: (user) =>
          set(
            { user, isAuthenticated: user !== null, isLoading: false },
            false,
            "auth/setUser",
          ),

        setLoading: (isLoading) =>
          set({ isLoading }, false, "auth/setLoading"),

        logout: () =>
          set(
            { user: null, isAuthenticated: false, isLoading: false },
            false,
            "auth/logout",
          ),
      }),
      {
        name: "imantrack-auth",
        // Не сохраняем isLoading в localStorage
        partialize: (state) => ({
          user: state.user,
          isAuthenticated: state.isAuthenticated,
        }),
      },
    ),
    { name: "AuthStore" },
  ),
);
