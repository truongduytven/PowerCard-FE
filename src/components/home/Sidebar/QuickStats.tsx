"use client";

import { Flame, Users } from "lucide-react";

/* ===== TYPES ===== */
export interface QuickStatItem {
  id: string;
  label: string;
  value: string | number;
  icon: React.ReactNode;
  bgGradient: string;
}

interface QuickStatsProps {
  title?: string;
  stats: QuickStatItem[];
}

/* ===== COMPONENT ===== */
export function QuickStats({
  title = "Quick Stats",
  stats,
}: QuickStatsProps) {
  return (
    <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-6 hover:shadow-xl transition-all duration-300 overflow-hidden group">
      {/* Hover gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <h3 className="relative font-bold text-gray-900 dark:text-white mb-5">
        {title}
      </h3>

      <div className="relative space-y-4">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="flex items-center justify-between group/stat hover:scale-105 transition-transform duration-300"
          >
            <div className="flex items-center gap-3">
              <div
                className={`p-2.5 rounded-xl bg-gradient-to-br ${stat.bgGradient}`}
              >
                {stat.icon}
              </div>

              <div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
                <div className="text-lg font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
