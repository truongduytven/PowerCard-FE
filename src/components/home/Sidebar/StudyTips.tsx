"use client";

import { Lightbulb } from "lucide-react";

/* ===== TYPES ===== */
export interface StudyTipsProps {
  title?: string;
  tips: string[];
}

/* ===== COMPONENT ===== */
export function StudyTips({
  title = "Study Tips",
  tips,
}: StudyTipsProps) {
  return (
    <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-6 hover:shadow-xl transition-all duration-300 overflow-hidden group">
      {/* Hover gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Header */}
      <h3 className="relative font-bold text-gray-900 dark:text-white mb-5 flex items-center gap-2">
        <Lightbulb className="h-5 w-5 text-amber-500 animate-pulse" />
        {title}
      </h3>

      {/* Tips list */}
      <div className="relative space-y-3">
        {tips.map((tip, index) => (
          <div
            key={index}
            className="flex items-start gap-3 group/item hover:translate-x-1 transition-transform duration-300"
          >
            <div className="p-1 rounded-full bg-gradient-to-r from-fuchsia-500 to-violet-500 mt-0.5">
              <div className="h-2 w-2 bg-white dark:bg-gray-800 rounded-full" />
            </div>

            <p className="text-sm text-gray-700 dark:text-gray-300">
              {tip}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
