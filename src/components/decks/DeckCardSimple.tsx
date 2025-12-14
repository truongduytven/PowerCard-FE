"use client";

import { BookOpen, Clock, Edit2, Lock, Play, Users } from "lucide-react";
import { ContentItem } from "@/types/decks";

interface DeckCardSimpleProps {
  deck: ContentItem;
  viewMode: "grid" | "list";
  onStudy?: () => void;
  onEdit?: () => void;
}

export default function DeckCardSimple({
  deck,
  viewMode,
  onStudy,
  onEdit,
}: DeckCardSimpleProps) {
  const handleStudy = () => {
    if (onStudy) onStudy();
    else console.log("Study deck:", deck.id);
  };

  const handleEdit = () => {
    if (onEdit) onEdit();
    else console.log("Edit deck:", deck.id);
  };

  if (viewMode === "grid") {
    return (
      <div className="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-5 hover:shadow-2xl hover:shadow-fuchsia-500/10 dark:hover:shadow-fuchsia-500/20 hover:-translate-y-1 transition-all duration-300 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/5 via-transparent to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div
                className={`text-2xl p-3 rounded-xl bg-gradient-to-br ${deck.color} bg-opacity-10 group-hover:scale-110 transition-transform duration-300`}
              >
                {deck.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-gray-900 dark:text-white text-base line-clamp-1">
                    {deck.title}
                  </h3>
                  {!deck.isPublic && <Lock className="h-3 w-3 text-gray-400" />}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                  {deck.description}
                </p>
              </div>
            </div>
          </div>

          {/* Stats - Simpler version without progress */}
          <div className="flex items-center gap-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <BookOpen className="h-3.5 w-3.5" />
              <span>{deck.cards} cards</span>
            </div>
            {deck.studySessions && (
              <div className="flex items-center gap-1">
                <Users className="h-3.5 w-3.5" />
                <span>{deck.studySessions} sessions</span>
              </div>
            )}
          </div>

          {/* Category and Last Modified */}
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
            <div className="flex items-center gap-2">
              {deck.category && (
                <span className="px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                  {deck.category}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {deck.lastModified}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleStudy}
              className="flex-1 px-3 py-2 text-sm font-semibold bg-gradient-to-r from-fuchsia-600 to-violet-600 hover:from-fuchsia-700 hover:to-violet-700 text-white rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group-hover:scale-105 shadow-lg shadow-fuchsia-500/30"
            >
              <Play className="h-3.5 w-3.5" />
              Study
            </button>
            <button
              onClick={handleEdit}
              className="p-2 border border-gray-300 dark:border-gray-600 hover:border-fuchsia-500 dark:hover:border-fuchsia-500 text-gray-600 dark:text-gray-400 hover:text-fuchsia-600 dark:hover:text-fuchsia-500 rounded-lg transition-all duration-300"
            >
              <Edit2 className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // List View
  return (
    <div className="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-4 hover:shadow-2xl hover:shadow-fuchsia-500/10 dark:hover:shadow-fuchsia-500/20 transition-all duration-300">
      <div className="flex items-center gap-4">
        {/* Icon */}
        <div
          className={`text-2xl p-3 rounded-xl bg-gradient-to-br ${deck.color} bg-opacity-10`}
        >
          {deck.icon}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-bold text-gray-900 dark:text-white text-base">
              {deck.title}
            </h3>
            {!deck.isPublic && (
              <span className="px-2 py-0.5 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full">
                Private
              </span>
            )}
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1 mb-2">
            {deck.description}
          </p>

          {/* Info Row */}
          <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
            {deck.category && (
              <span className="px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                {deck.category}
              </span>
            )}
            <div className="flex items-center gap-1">
              <BookOpen className="h-3 w-3" />
              {deck.cards} cards
            </div>
            {deck.studySessions && (
              <div className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                {deck.studySessions} sessions
              </div>
            )}
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {deck.lastModified}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleStudy}
            className="px-4 py-2 text-sm font-semibold bg-gradient-to-r from-fuchsia-600 to-violet-600 hover:from-fuchsia-700 hover:to-violet-700 text-white rounded-lg transition-all duration-300 flex items-center gap-2 shadow-lg shadow-fuchsia-500/30"
          >
            <Play className="h-3.5 w-3.5" />
            Study
          </button>
          <button
            onClick={handleEdit}
            className="p-2 border border-gray-300 dark:border-gray-600 hover:border-fuchsia-500 dark:hover:border-fuchsia-500 text-gray-600 dark:text-gray-400 hover:text-fuchsia-600 dark:hover:text-fuchsia-500 rounded-lg transition-all duration-300"
          >
            <Edit2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
