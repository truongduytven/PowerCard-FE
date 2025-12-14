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
    <div className="flex items-center gap-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-300 dark:border-gray-600 rounded-xl p-1 h-12">
      <button
        onClick={() => onChange("grid")}
        className={`p-2 rounded-lg transition-all duration-300 ${
          value === "grid"
            ? "bg-gradient-to-r from-fuchsia-600 to-violet-600 text-white shadow-lg"
            : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
        }`}
      >
        <Grid3x3 className="h-5 w-5" />
      </button>
      <button
        onClick={() => onChange("list")}
        className={`p-2 rounded-lg transition-all duration-300 ${
          value === "list"
            ? "bg-gradient-to-r from-fuchsia-600 to-violet-600 text-white shadow-lg"
            : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
        }`}
      >
        <List className="h-5 w-5" />
      </button>
    </div>
  );
}
