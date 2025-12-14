"use client";

import { ContentItem } from "@/types/decks";
import {
  BookOpen,
  Clock,
  Edit2,
  Lock,
  Play,
  Target,
  Users,
  MoreVertical,
  Trash2,
  FileText,
} from "lucide-react";
import { useState } from "react";

interface DeckCardProps {
  deck: ContentItem;
  viewMode: "grid" | "list";
  isOwner?: boolean;
  onStudy?: () => void;
  onTest?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function DeckCard({
  deck,
  viewMode,
  isOwner = false,
  onStudy,
  onTest,
  onEdit,
  onDelete,
}: DeckCardProps) {
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  const handleStudy = () => {
    if (onStudy) onStudy();
    else console.log("Study deck:", deck.id);
  };

  const handleTest = () => {
    if (onTest) onTest();
    else console.log("Test deck:", deck.id);
  };

  const handleEdit = () => {
    setShowMoreMenu(false);
    if (onEdit) onEdit();
    else console.log("Edit deck:", deck.id);
  };

  const handleDelete = () => {
    setShowMoreMenu(false);
    if (onDelete) onDelete();
    else console.log("Delete deck:", deck.id);
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

            {/* More Menu for owner */}
            {isOwner && (
              <div className="relative">
                <button
                  onClick={() => setShowMoreMenu(!showMoreMenu)}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <MoreVertical className="h-4 w-4 text-gray-500" />
                </button>

                {showMoreMenu && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setShowMoreMenu(false)}
                    />
                    <div className="absolute right-0 mt-1 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 py-1">
                      <button
                        onClick={handleEdit}
                        className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <Edit2 className="h-4 w-4" />
                        Edit Deck
                      </button>
                      <button
                        onClick={handleDelete}
                        className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete Deck
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="flex items-center gap-3 mb-3 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <BookOpen className="h-3.5 w-3.5" />
              {deck.cards} cards
            </div>
            <div className="flex items-center gap-1">
              <Target className="h-3.5 w-3.5 text-emerald-500" />
              {deck.mastered} mastered
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-gray-600 dark:text-gray-400">Progress</span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {deck.progress}%
              </span>
            </div>
            <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${deck.color} transition-all duration-500 rounded-full`}
                style={{ width: `${deck.progress}%` }}
              />
            </div>
          </div>

          {/* Meta Info */}
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {deck.lastModified}
            </div>
            {deck.isPublic && (
              <div className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                <span>{deck.likes}</span>
              </div>
            )}
          </div>

          {/* Actions - Always Show Study and Test */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleStudy}
              className="flex-1 px-3 py-2 text-sm font-semibold bg-gradient-to-r from-fuchsia-600 to-violet-600 hover:from-fuchsia-700 hover:to-violet-700 text-white rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group-hover:scale-105 shadow-lg shadow-fuchsia-500/30"
            >
              <Play className="h-3.5 w-3.5" />
              Study
            </button>
            <button
              onClick={handleTest}
              className="flex-1 px-3 py-2 text-sm font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group-hover:scale-105 shadow-lg shadow-blue-500/30"
            >
              <FileText className="h-3.5 w-3.5" />
              Test
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
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-gray-900 dark:text-white text-base">
                {deck.title}
              </h3>
              {!deck.isPublic && (
                <span className="px-2 py-0.5 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full">
                  Private
                </span>
              )}
            </div>

            {/* More Menu for owner in list view */}
            {isOwner && (
              <div className="relative">
                <button
                  onClick={() => setShowMoreMenu(!showMoreMenu)}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <MoreVertical className="h-4 w-4 text-gray-500" />
                </button>

                {showMoreMenu && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setShowMoreMenu(false)}
                    />
                    <div className="absolute right-0 mt-1 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 py-1">
                      <button
                        onClick={handleEdit}
                        className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <Edit2 className="h-4 w-4" />
                        Edit Deck
                      </button>
                      <button
                        onClick={handleDelete}
                        className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete Deck
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1 mb-2">
            {deck.description}
          </p>

          {/* Info Row */}
          <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {deck.lastModified}
            </div>
            <div className="flex items-center gap-1">
              <BookOpen className="h-3 w-3" />
              {deck.cards} cards
            </div>
            <div className="flex items-center gap-1">
              <Target className="h-3 w-3" />
              {deck.progress}% complete
            </div>
            {deck.isPublic && (
              <div className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                {deck.likes} likes
              </div>
            )}
          </div>
        </div>

        {/* Actions - Always Show Study and Test */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleStudy}
            className="px-4 py-2 text-sm font-semibold bg-gradient-to-r from-fuchsia-600 to-violet-600 hover:from-fuchsia-700 hover:to-violet-700 text-white rounded-lg transition-all duration-300 flex items-center gap-2 shadow-lg shadow-fuchsia-500/30"
          >
            <Play className="h-3.5 w-3.5" />
            Study
          </button>
          <button
            onClick={handleTest}
            className="px-4 py-2 text-sm font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-lg transition-all duration-300 flex items-center gap-2 shadow-lg shadow-blue-500/30"
          >
            <FileText className="h-3.5 w-3.5" />
            Test
          </button>
        </div>
      </div>
    </div>
  );
}
