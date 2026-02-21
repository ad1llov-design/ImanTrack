/**
 * @module entities/user
 * Доменная модель пользователя
 */

export interface User {
  id: string;
  email: string;
  fullName: string | null;
  avatarUrl: string | null;
  timezone: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfile extends User {
  // Расширенные данные профиля
  stats?: UserStats;
}

export interface UserStats {
  totalPrayersCompleted: number;
  currentStreak: number;
  longestStreak: number;
  habitsCompleted: number;
}

/** Маппер из Supabase Row в доменную модель */
export function mapProfileToUser(
  row: {
    id: string;
    email: string;
    full_name: string | null;
    avatar_url: string | null;
    timezone: string;
    created_at: string;
    updated_at: string;
  }
): User {
  return {
    id: row.id,
    email: row.email,
    fullName: row.full_name,
    avatarUrl: row.avatar_url,
    timezone: row.timezone,
    createdAt: new Date(row.created_at),
    updatedAt: new Date(row.updated_at),
  };
}
