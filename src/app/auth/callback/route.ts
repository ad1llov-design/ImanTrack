/**
 * @module app/auth/callback
 *
 * OAuth callback route. Supabase направляет сюда после:
 * - Подтверждения email
 * - OAuth авторизации (Google, GitHub и т.д.)
 * - Сброса пароля
 *
 * Обменивает code на сессию и редиректит на нужную страницу.
 */

import { NextResponse, type NextRequest } from "next/server";

import { createClient } from "@lib/supabase/server";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";

  if (code) {
    const supabase = createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Если ошибка — редирект на страницу ошибки
  return NextResponse.redirect(
    `${origin}/auth/login?error=Не+удалось+подтвердить+аккаунт`,
  );
}
