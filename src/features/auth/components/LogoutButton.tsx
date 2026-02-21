/**
 * @module features/auth/components/LogoutButton
 *
 * Кнопка выхода — вызывает logoutAction (Server Action).
 */

"use client";

import { useTransition } from "react";

import { logoutAction } from "@features/auth/actions/auth.actions";

interface LogoutButtonProps {
  className?: string;
  children?: React.ReactNode;
}

export function LogoutButton({ className, children }: LogoutButtonProps) {
  const [isPending, startTransition] = useTransition();

  function handleLogout() {
    startTransition(async () => {
      await logoutAction();
    });
  }

  return (
    <button
      onClick={handleLogout}
      disabled={isPending}
      className={className ?? "text-sm text-neutral-600 transition-colors hover:text-red-600 disabled:opacity-50 dark:text-neutral-400"}
    >
      {isPending ? "Выход..." : children ?? "Выйти"}
    </button>
  );
}
