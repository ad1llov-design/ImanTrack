import { createBrowserClient } from "@supabase/ssr";

import type { Database } from "@shared/types/supabase";

/**
 * Supabase клиент для браузера (Client Components)
 * Использует Anon Key — безопасно для публичного доступа
 */
export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://dummy-project.supabase.co";
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "dummy-key";

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.warn(
      "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables. Using dummy values to prevent build errors.",
    );
  }

  return createBrowserClient<Database>(supabaseUrl, supabaseKey);
}
