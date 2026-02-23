/**
 * @module features/auth/hooks/useAuth
 *
 * Хук для управления авторизацией в Client Components.
 * Слушает изменения сессии Supabase в реальном времени
 * и синхронизирует состояние с Zustand store.
 */

"use client";

import { useEffect } from "react";

import { createClient } from "@lib/supabase/client";
import { mapProfileToUser } from "@entities/user/model/user";
import { useAuthStore } from "@features/auth/store/authStore";

export function useAuth() {
  const { user, isLoading, isAuthenticated, setUser, setLoading, logout } =
    useAuthStore();

  useEffect(() => {
    const supabase = createClient();

    // Получаем текущую сессию при инициализации
    const initSession = async () => {
      setLoading(true);
      try {
        const {
          data: { user: authUser },
        } = await supabase.auth.getUser();

        if (authUser) {
          // Загружаем профиль из таблицы profiles
          const { data: profile } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", authUser.id)
            .single();

          if (profile) {
            setUser(mapProfileToUser(profile));
          } else {
            // Профиль ещё не создан (trigger ещё не сработал)
            setUser({
              id: authUser.id,
              email: authUser.email ?? "",
              fullName: authUser.user_metadata?.full_name as string ?? null,
              avatarUrl: null,
              timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
              createdAt: new Date(authUser.created_at),
              updatedAt: new Date(),
            });
          }
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Auth session initialization error:", error);
        // If the token is invalid (e.g. user deleted), we must clear the dead session
        await supabase.auth.signOut();
        setUser(null);
        logout(); // Force Zustand state wipe
      }
    };

    void initSession();

    // Слушаем изменения авторизации
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session?.user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();

        if (profile) {
          setUser(mapProfileToUser(profile));
        }
      }

      if (event === "SIGNED_OUT") {
        logout();
      }

      if (event === "TOKEN_REFRESHED") {
        // Сессия обновлена — ничего не делаем
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [setUser, setLoading, logout]);

  return {
    user,
    isLoading,
    isAuthenticated,
  };
}
