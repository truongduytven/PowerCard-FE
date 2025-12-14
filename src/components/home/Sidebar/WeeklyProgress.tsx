"use client";

import { BarChart3, TrendingUp } from "lucide-react";

/* ===== TYPES ===== */
export interface WeeklyProgressItem {
  label: string;
  percent: number; // 0 → 100
  meta: string;
  color: "fuchsia" | "violet" | "emerald";
  showTrend?: boolean;
}

interface WeeklyProgressProps {
  title?: string;
  items: WeeklyProgressItem[];
}

/* ===== COLOR MAP ===== */
const barColorMap: Record<WeeklyProgressItem["color"], string> = {
  fuchsia: "bg-fuchsia-600 dark:bg-fuchsia-500",
  violet: "bg-violet-600 dark:bg-violet-500",
  emerald: "bg-emerald-600 dark:bg-emerald-500",
};

/* ===== COMPONENT ===== */
export function WeeklyProgress({
  title = "Weekly Progress",
  items,
}: WeeklyProgressProps) {
  return (
    <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-6 hover:shadow-xl transition-all duration-300 overflow-hidden group">
      {/* Hover Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/5 via-transparent to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Header */}
      <h3 className="relative font-bold text-gray-900 dark:text-white mb-5 flex items-center gap-2">
        <BarChart3 className="h-5 w-5 text-fuchsia-600 dark:text-fuchsia-500" />
        {title}
      </h3>

      {/* Content */}
      <div className="relative space-y-6">
        {items.map((item, index) => (
          <div key={index}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                {item.label}
              </span>

              <span className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1">
                {item.showTrend && (
                  <TrendingUp className="h-3 w-3 text-emerald-500" />
                )}
                {item.meta}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${barColorMap[item.color]}`}
                style={{ width: `${item.percent}%` }}
              />
            </div>

            <div className="text-right text-xs font-bold text-gray-900 dark:text-white mt-1">
              {item.percent}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
