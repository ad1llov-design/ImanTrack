/**
 * @layout Protected Layout
 *
 * Лейаут для защищённых страниц (dashboard, habits и т.д.).
 * Проверяет сессию на сервере — если нет, редиректит на /auth/login.
 * Передаёт данные пользователя в children через props.
 */

import { redirect } from "next/navigation";

import { createClient } from "@lib/supabase/server";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  return (
    <div className="min-h-screen overflow-y-auto bg-background text-main pb-20">
      {children}
    </div>
  );
}
