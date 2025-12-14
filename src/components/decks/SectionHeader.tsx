"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { ReactNode } from "react";

interface SectionHeaderProps {
  title: string;
  subtitle: string;
  icon: ReactNode;
  isExpanded: boolean;
  onToggle: () => void;
}

export default function SectionHeader({
  title,
  subtitle,
  icon,
  isExpanded,
  onToggle,
}: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-gradient-to-br from-fuchsia-500/10 to-violet-500/10 rounded-xl">
          {icon}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {title}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">{subtitle}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={onToggle}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
        >
          {isExpanded ? (
            <ChevronUp className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          )}
        </button>
      </div>
    </div>
  );
}
