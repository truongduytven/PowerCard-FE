"use client";

import { Filter } from "lucide-react";

interface CategoryFilterProps {
  value: string;
  onChange: (value: string) => void;
  categories: string[];
}

export default function CategoryFilter({
  value,
  onChange,
  categories,
}: CategoryFilterProps) {
  return (
    <div className="relative min-w-[200px]">
      <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none z-10" />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-9 pr-8 py-2.5 h-12 border border-gray-300 dark:border-gray-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-fuchsia-500/50 dark:focus:ring-fuchsia-600/50 focus:border-transparent appearance-none bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-gray-900 dark:text-white transition-all duration-300"
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat === "all" ? "All Categories" : cat}
          </option>
        ))}
      </select>
    </div>
  );
}
