/**
 * @layout Protected Layout
 *
 * Р›РµР№Р°СѓС‚ РґР»СЏ Р·Р°С‰РёС‰С‘РЅРЅС‹С… СЃС‚СЂР°РЅРёС† (dashboard, habits Рё С‚.Рґ.).
 * РџСЂРѕРІРµСЂСЏРµС‚ СЃРµСЃСЃРёСЋ РЅР° СЃРµСЂРІРµСЂРµ вЂ” РµСЃР»Рё РЅРµС‚, СЂРµРґРёСЂРµРєС‚РёС‚ РЅР° /auth/login.
 * РџРµСЂРµРґР°С‘С‚ РґР°РЅРЅС‹Рµ РїРѕР»СЊР·РѕРІР°С‚РµР»СЏ РІ children С‡РµСЂРµР· props.
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
    <div className="min-h-screen bg-background text-main">
      {children}
    </div>
  );
}
