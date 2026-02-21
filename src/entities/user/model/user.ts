/**
 * @module entities/user/model/user
 *
 * Типы пользователя и маппинг из Supabase profile.
 */

/* ── User model ─────────────────────────────────────────────────────── */

export interface User {
  id: string;
  email: string;
  fullName: string | null;
  avatarUrl: string | null;
  timezone: string;
  createdAt: Date;
  updatedAt: Date;
}

/* ── Supabase profile row ───────────────────────────────────────────── */

export interface ProfileRow {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  timezone: string | null;
  created_at: string;
  updated_at: string;
}

/* ── Mapper ──────────────────────────────────────────────────────────── */

export function mapProfileToUser(profile: ProfileRow): User {
  return {
    id: profile.id,
    email: profile.email,
    fullName: profile.full_name,
    avatarUrl: profile.avatar_url,
    timezone: profile.timezone ?? Intl.DateTimeFormat().resolvedOptions().timeZone,
    createdAt: new Date(profile.created_at),
    updatedAt: new Date(profile.updated_at),
  };
}

/* ── Initials helper ─────────────────────────────────────────────────── */

export function getUserInitials(user: User): string {
  if (user.fullName) {
    return user.fullName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  }
  return user.email.slice(0, 2).toUpperCase();
}
