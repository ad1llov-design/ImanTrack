/**
 * @module features/tracker/components/ActivityChart
 *
 * График активности за неделю. Использует Recharts.
 */

"use client";

import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { DailyActivity } from "../types/tracker.types";
import { format, parseISO } from "date-fns";
import { ru } from "date-fns/locale";

interface ActivityChartProps {
  data: DailyActivity[];
}

export function ActivityChart({ data }: ActivityChartProps) {
  const chartData = useMemo(() => {
    return data.map((d) => ({
      name: format(parseISO(d.date), "EEE", { locale: ru }),
      score: d.score,
      prayers: d.prayersCount,
      adhkars: d.adhkarCount,
      fullDate: format(parseISO(d.date), "d MMMM", { locale: ru }),
    }));
  }, [data]);

  return (
    <div className="h-[300px] w-full rounded-3xl border border-neutral-100 bg-white p-6 dark:border-neutral-800 dark:bg-surface-dark-secondary">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="font-semibold text-neutral-800 dark:text-neutral-200">
          Активность за неделю
        </h3>
        <span className="text-xs text-neutral-400">Баллы за намазы и зикры</span>
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#e5e5e5"
            className="dark:stroke-neutral-800"
          />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "#9ca3af" }}
            className="capitalize"
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "#9ca3af" }}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const item = payload[0].payload;
                return (
                  <div className="rounded-2xl border border-neutral-100 bg-white p-3 shadow-lg dark:border-neutral-800 dark:bg-neutral-900">
                    <p className="mb-1 text-xs font-bold text-neutral-500">{item.fullDate}</p>
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-primary-600">
                        🕌 Намазы: {item.prayers}
                      </p>
                      <p className="text-sm font-semibold text-gold-600">
                        📿 Азкары: {item.adhkars}
                      </p>
                    </div>
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar
            dataKey="score"
            radius={[6, 6, 0, 0]}
            barSize={24}
          >
            {chartData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.score > 20 ? "#10b981" : "#6366f1"} 
                fillOpacity={0.8}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
