import { createClient } from "@lib/supabase/server";
import { LogoutButton } from "@features/auth/components/LogoutButton";
import { GlassCard } from "@shared/components/ui/GlassCard";

export default async function ProfilePage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-display text-4xl font-bold text-neutral-100">Профиль</h1>
        <LogoutButton className="rounded-xl border border-white/10 px-4 py-2 text-sm text-neutral-400 transition-all hover:bg-white/5" />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <GlassCard className="space-y-6">
          <h2 className="text-xl font-bold text-white">Персональные данные</h2>
          <div className="space-y-4">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Email</span>
              <span className="text-lg text-neutral-100">{user?.email}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Имя</span>
              <span className="text-lg text-neutral-100">{(user?.user_metadata?.full_name as string) ?? "Не указано"}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Дата регистрации</span>
              <span className="text-lg text-neutral-100">
                {user?.created_at ? new Date(user.created_at).toLocaleDateString("ru-RU") : "—"}
              </span>
            </div>
          </div>
        </GlassCard>

        <div className="space-y-6">
          <GlassCard>
            <h2 className="text-xl font-bold text-white mb-4">Настройки</h2>
            <p className="text-neutral-400 text-sm">Настройки уведомлений и приватности (скоро).</p>
          </GlassCard>
          
          <GlassCard>
            <h2 className="text-xl font-bold text-white mb-4">Цели</h2>
            <p className="text-neutral-400 text-sm">Ваши духовные цели на месяц (скоро).</p>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
