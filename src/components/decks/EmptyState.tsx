"use client";

import { BookOpen, Folder, FolderPlus, BookPlus } from "lucide-react";

interface EmptyStateProps {
  type: "folder" | "deck";
  searchQuery?: string;
  onCreate: () => void;
}

export default function EmptyState({
  type,
  searchQuery,
  onCreate,
}: EmptyStateProps) {
  const config = {
    folder: {
      icon: Folder,
      title: searchQuery
        ? `No folders match "${searchQuery}"`
        : "Create your first folder to organize your decks",
      buttonText: "New Folder",
      gradientFrom: "from-blue-100 to-cyan-100",
      gradientTo: "from-blue-900/20 to-cyan-900/20",
      iconColor: "text-blue-600 dark:text-blue-400",
    },
    deck: {
      icon: BookOpen,
      title: searchQuery
        ? `No decks match "${searchQuery}"`
        : "Create your first deck to start learning",
      buttonText: "New Deck",
      gradientFrom: "from-fuchsia-100 to-violet-100",
      gradientTo: "from-fuchsia-900/20 to-violet-900/20",
      iconColor: "text-fuchsia-600 dark:text-fuchsia-400",
    },
  }[type];

  const Icon = config.icon;
  const ButtonIcon = type === "folder" ? FolderPlus : BookPlus;

  return (
    <div className="col-span-full py-12 text-center">
      <div
        className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br ${config.gradientFrom} dark:${config.gradientTo} mb-4`}
      >
        <Icon className="h-10 w-10 dark:text-white" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        No {type}s found
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-4">{config.title}</p>
      <button
        onClick={onCreate}
        className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-lg font-medium transition-all duration-300 shadow-lg shadow-blue-500/30"
      >
        <ButtonIcon className="h-4 w-4" />
        {config.buttonText}
      </button>
    </div>
  );
}
