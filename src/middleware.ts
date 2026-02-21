import { type NextRequest, NextResponse } from "next/server";

import { updateSession } from "@lib/supabase/middleware";

// Защищённые маршруты — требуют авторизации
const PROTECTED_ROUTES = ["/dashboard", "/habits", "/quran", "/settings", "/profile"];

// Публичные маршруты — редирект если авторизован
const AUTH_ROUTES = ["/auth/login", "/auth/register", "/auth/forgot-password"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Обновляем Supabase сессию
  const response = await updateSession(request);

  // Проверяем авторизацию для защищённых маршрутов
  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route),
  );

  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));

  if (isProtectedRoute) {
    // Если нет сессии — редирект на логин
    const url = request.nextUrl.clone();
    url.pathname = "/auth/login";
    url.searchParams.set("callbackUrl", pathname);

    const sessionCookie = request.cookies.get("sb-access-token");
    if (!sessionCookie) {
      return NextResponse.redirect(url);
    }
  }

  if (isAuthRoute) {
    // Если есть сессия — редирект на дашборд
    const sessionCookie = request.cookies.get("sb-access-token");
    if (sessionCookie) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|manifest.json|icons|patterns|api/health).*)",
  ],
};
