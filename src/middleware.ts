/**
 * @module middleware
 *
 * Next.js Middleware — выполняется на КАЖДЫЙ запрос.
 *
 * Ответственности:
 * 1. Обновление Supabase сессии (refresh token)
 * 2. Защита маршрутов — redirect на /auth/login если нет сессии
 * 3. Перенаправление авторизованных пользователей с auth-страниц на /dashboard
 */

import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

/* ── Route lists ────────────────────────────────────────────────────── */

/** Маршруты, требующие авторизации */
const PROTECTED_ROUTES = ["/dashboard", "/habits", "/quran", "/settings", "/profile"];

/** Auth-маршруты — редирект на dashboard если авторизован */
const AUTH_ROUTES = ["/auth/login", "/auth/register", "/auth/forgot-password"];

/* ── Middleware ──────────────────────────────────────────────────────── */

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Создаём response для передачи cookies
  let response = NextResponse.next({
    request: { headers: request.headers },
  });

  // Создаём Supabase клиент с cookie-обработкой
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options });
          response = NextResponse.next({
            request: { headers: request.headers },
          });
          response.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: "", ...options });
          response = NextResponse.next({
            request: { headers: request.headers },
          });
          response.cookies.set({ name, value: "", ...options });
        },
      },
    },
  );

  // Обновляем сессию (refresh access token если истёк)
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // ── Защита маршрутов ────────────────────────────────────────
  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route),
  );

  if (isProtectedRoute && !user) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/auth/login";
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // ── Redirect авторизованных с auth-страниц ──────────────────
  const isAuthRoute = AUTH_ROUTES.some((route) =>
    pathname.startsWith(route),
  );

  if (isAuthRoute && user) {
    const callbackUrl = request.nextUrl.searchParams.get("callbackUrl");
    return NextResponse.redirect(
      new URL(callbackUrl ?? "/dashboard", request.url),
    );
  }

  return response;
}

/* ── Matcher config ─────────────────────────────────────────────────── */

export const config = {
  matcher: [
    /*
     * Все маршруты кроме:
     * - _next/static (статика)
     * - _next/image (оптимизация изображений)
     * - favicon.ico, manifest.json, icons, patterns
     * - api/health (healthcheck)
     */
    "/((?!_next/static|_next/image|favicon.ico|manifest.json|icons|patterns|api/health).*)",
  ],
};
