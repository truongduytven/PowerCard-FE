"use client";

import { BookPlus, FolderPlus, Plus } from "lucide-react";
import { useState } from "react";

type ContentType = "deck" | "folder";

interface CreateButtonProps {
  onCreate: (type: ContentType) => void;
}

export default function CreateButton({ onCreate }: CreateButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleCreate = (type: ContentType) => {
    setIsOpen(false);
    onCreate(type);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-fuchsia-600 to-violet-600 hover:from-fuchsia-700 hover:to-violet-700 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-fuchsia-500/30 hover:shadow-xl hover:shadow-fuchsia-500/40 hover:scale-105"
      >
        <Plus className="h-5 w-5 group-hover:rotate-90 transition-transform duration-300" />
        Create New
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-64 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-xl shadow-2xl shadow-fuchsia-500/20 z-50 overflow-hidden">
            <div className="p-3 border-b border-gray-200/50 dark:border-gray-700/50">
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                Create New
              </p>
            </div>
            <div className="p-2">
              <button
                onClick={() => handleCreate("deck")}
                className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-gray-100/80 dark:hover:bg-gray-700/80 transition-colors duration-200 group"
              >
                <div className="p-2 bg-gradient-to-br from-fuchsia-500/10 to-violet-500/10 rounded-lg group-hover:scale-110 transition-transform duration-300">
                  <BookPlus className="h-5 w-5 text-fuchsia-600 dark:text-fuchsia-400" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-900 dark:text-white">
                    New Deck
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Create a flashcard deck
                  </p>
                </div>
              </button>

              <button
                onClick={() => handleCreate("folder")}
                className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-gray-100/80 dark:hover:bg-gray-700/80 transition-colors duration-200 group"
              >
                <div className="p-2 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-lg group-hover:scale-110 transition-transform duration-300">
                  <FolderPlus className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-900 dark:text-white">
                    New Folder
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Organize your decks
                  </p>
                </div>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
