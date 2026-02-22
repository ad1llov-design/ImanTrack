/**
 * @page /auth/login
 * РЎС‚СЂР°РЅРёС†Р° РІС…РѕРґР°
 */

import type { Metadata } from "next";

import { LoginForm } from "@features/auth/components/LoginForm";

export const metadata: Metadata = {
  title: "Р’С…РѕРґ вЂ” ImanTrack",
  description: "Р’РѕР№РґРёС‚Рµ РІ ImanTrack Рё РїСЂРѕРґРѕР»Р¶РёС‚Рµ СЃРІРѕР№ РґСѓС…РѕРІРЅС‹Р№ РїСѓС‚СЊ",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background text-main">
      <div className="w-full max-w-md rounded-3xl bg-white p-10 shadow-sm dark:bg-neutral-900">
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50">
          Р’С…РѕРґ РІ ImanTrack
        </h1>
        <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
          Р’РѕР№РґРёС‚Рµ, С‡С‚РѕР±С‹ РїСЂРѕРґРѕР»Р¶РёС‚СЊ РІР°С€ РґСѓС…РѕРІРЅС‹Р№ РїСѓС‚СЊ
        </p>

        <div className="mt-8">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
