/**
 * @module features/prayer/hooks/useCountdown
 *
 * Хук обратного отсчёта до следующего намаза.
 * Обновляет каждую секунду. Сбрасывается при смене target.
 */

"use client";

import { useEffect, useState } from "react";

import { calculateCountdown, formatCountdown } from "../services/prayer.api";
import type { CountdownTime } from "../types/prayer.types";

export function useCountdown(targetTime: Date | null) {
  const [countdown, setCountdown] = useState<CountdownTime>({
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalSeconds: 0,
  });
  const [formatted, setFormatted] = useState("--:--:--");

  useEffect(() => {
    if (!targetTime) {
      setFormatted("--:--:--");
      return;
    }

    function tick() {
      const cd = calculateCountdown(targetTime!);
      setCountdown(cd);
      setFormatted(formatCountdown(cd));
    }

    // Немедленный первый тик
    tick();

    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [targetTime]);

  return { countdown, formatted };
}
