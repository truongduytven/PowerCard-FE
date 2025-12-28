"use client";

import { Grid3x3, List } from "lucide-react";

type ViewMode = "grid" | "list";

interface ViewModeToggleProps {
  value: ViewMode;
  onChange: (mode: ViewMode) => void;
}

export default function ViewModeToggle({
  value,
  onChange,
}: ViewModeToggleProps) {
  return (
    <div className="relative h-10 w-[84px] rounded-xl border border-gray-300 dark:border-gray-600 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-1">
      {/* Sliding indicator */}
      <div
        className={`
          absolute top-1 left-1 h-8 w-[calc(50%-4px)]
          rounded-lg bg-gradient-to-r from-fuchsia-600 to-violet-600
          shadow-md
          transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
          ${value === "list" ? "translate-x-full" : "translate-x-0"}
        `}
      />

      {/* Buttons */}
      <div className="relative z-10 grid grid-cols-2 h-full">
        <button
          onClick={() => onChange("grid")}
          className={`flex items-center justify-center transition-colors duration-200 ${
            value === "grid" ? "text-white" : "text-gray-600 dark:text-gray-400"
          }`}
        >
          <Grid3x3 className="h-5 w-5" />
        </button>

        <button
          onClick={() => onChange("list")}
          className={`flex items-center justify-center transition-colors duration-200 ${
            value === "list" ? "text-white" : "text-gray-600 dark:text-gray-400"
          }`}
        >
          <List className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
