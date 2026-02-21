/**
 * @module services/prayer
 * Сервис для работы с временами намазов через Aladhan API
 */

import { clientEnv } from "@lib/env";

export interface PrayerTimings {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Sunset: string;
  Maghrib: string;
  Isha: string;
  Imsak: string;
  Midnight: string;
}

export interface PrayerTimesResponse {
  timings: PrayerTimings;
  date: {
    readable: string;
    timestamp: string;
    hijri: {
      date: string;
      month: { number: number; en: string; ar: string };
      year: string;
    };
    gregorian: {
      date: string;
      month: { number: number; en: string };
      year: string;
    };
  };
}

export interface GetPrayerTimesParams {
  latitude: number;
  longitude: number;
  date?: Date;
  method?: number; // 2 = ISNA, 4 = Umm Al-Qura, 8 = Gulf Region
}

/**
 * Получает времена намазов для указанных координат
 */
export async function getPrayerTimes({
  latitude,
  longitude,
  date = new Date(),
  method = 4, // Umm Al-Qura по умолчанию
}: GetPrayerTimesParams): Promise<PrayerTimesResponse> {
  const dateStr = date.toISOString().split("T")[0]!;
  const url = new URL(
    `${clientEnv.prayerApiUrl}/timings/${dateStr}`,
  );

  url.searchParams.set("latitude", latitude.toString());
  url.searchParams.set("longitude", longitude.toString());
  url.searchParams.set("method", method.toString());

  const response = await fetch(url.toString(), {
    next: { revalidate: 3600 }, // Кэш на 1 час
  });

  if (!response.ok) {
    throw new Error(`Prayer times API error: ${response.status}`);
  }

  const json = (await response.json()) as { data: PrayerTimesResponse };
  return json.data;
}

/**
 * Получает времена намазов для текущего месяца
 */
export async function getMonthlyPrayerTimes(
  params: GetPrayerTimesParams & { month?: number; year?: number },
): Promise<PrayerTimesResponse[]> {
  const now = new Date();
  const month = params.month ?? now.getMonth() + 1;
  const year = params.year ?? now.getFullYear();

  const url = new URL(
    `${clientEnv.prayerApiUrl}/calendar/${year}/${month}`,
  );

  url.searchParams.set("latitude", params.latitude.toString());
  url.searchParams.set("longitude", params.longitude.toString());
  url.searchParams.set("method", (params.method ?? 4).toString());

  const response = await fetch(url.toString(), {
    next: { revalidate: 86400 }, // Кэш на 24 часа
  });

  if (!response.ok) {
    throw new Error(`Prayer calendar API error: ${response.status}`);
  }

  const json = (await response.json()) as { data: PrayerTimesResponse[] };
  return json.data;
}
