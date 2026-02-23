/**
 * @module features/auth/components/AuthProvider
 *
 * Client-side provider. Auth is optional — the app works without login.
 * Just passes children through.
 */

"use client";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Auth is optional in MVP — no blocking, no loading states
  return <>{children}</>;
}
