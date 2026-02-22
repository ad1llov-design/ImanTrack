/**
 * @page /dashboard (protected)
 *
 * Дашборд — защищённая страница. Показывает данные пользователя.
 * Демо: server-side получение user + logout button.
 */

import { createClient } from "@lib/supabase/server";
import { LogoutButton } from "@features/auth/components/LogoutButton";
import { PrayerWidget } from "@features/prayer/components/PrayerWidget";
import { HabitsWidget } from "@features/tracker/components/HabitsWidget";

export default async function DashboardPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            السلام عليكم
          </p>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50">
            Добро пожаловать{user?.user_metadata?.full_name ? `, ${user.user_metadata.full_name}` : ""} 👋
          </h1>
        </div>

        <LogoutButton className="rounded-xl border border-neutral-200 px-4 py-2 text-sm text-neutral-600 transition-all hover:border-red-300 hover:bg-red-50 hover:text-red-600 dark:border-neutral-700 dark:text-neutral-400 dark:hover:border-red-800 dark:hover:bg-red-950/30 dark:hover:text-red-400" />
      </div>

      {/* User info card */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-card dark:border-neutral-800 dark:bg-neutral-900">
        <h2 className="mb-4 text-lg font-semibold text-neutral-900 dark:text-neutral-50">
          Данные профиля
        </h2>
        <div className="space-y-3">
          <div className="flex items-center gap-3 rounded-xl bg-neutral-50 px-4 py-3 dark:bg-neutral-800">
            <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400 w-20">ID:</span>
            <span className="text-sm font-mono text-neutral-900 dark:text-neutral-100">{user?.id}</span>
          </div>
          <div className="flex items-center gap-3 rounded-xl bg-neutral-50 px-4 py-3 dark:bg-neutral-800">
            <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400 w-20">Email:</span>
            <span className="text-sm text-neutral-900 dark:text-neutral-100">{user?.email}</span>
          </div>
          <div className="flex items-center gap-3 rounded-xl bg-neutral-50 px-4 py-3 dark:bg-neutral-800">
            <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400 w-20">Имя:</span>
            <span className="text-sm text-neutral-900 dark:text-neutral-100">
              {(user?.user_metadata?.full_name as string) ?? "Не указано"}
            </span>
          </div>
          <div className="flex items-center gap-3 rounded-xl bg-neutral-50 px-4 py-3 dark:bg-neutral-800">
            <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400 w-20">Создан:</span>
            <span className="text-sm text-neutral-900 dark:text-neutral-100">
              {user?.created_at ? new Date(user.created_at).toLocaleDateString("ru-RU") : "—"}
            </span>
          </div>
        </div>
      </div>

      {/* Core Tracker Widgets */}
      <div className="mt-8 flex flex-col gap-6">
        <PrayerWidget />
        <HabitsWidget />
      </div>
    </div>
  );
}
