"use client";

import { BookOpen, CheckCircle, Clock, Play, ChevronRight } from "lucide-react";

export interface RecentDeck {
  id: number;
  title: string;
  cards: number;
  mastered: number;
  lastStudied: string;
  progress: number;
  category: string;
}

interface RecentDecksProps {
  recentDecks: RecentDeck[];
}

export function RecentDecks({ recentDecks }: RecentDecksProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Your Recent Decks
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Continue where you left off
          </p>
        </div>

        <button className="text-sm font-medium text-fuchsia-600 dark:text-fuchsia-400 hover:text-fuchsia-700 dark:hover:text-fuchsia-300 flex items-center gap-1 group">
          View all
          <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {recentDecks.map((deck) => (
          <div
            key={deck.id}
            className="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-5 hover:shadow-2xl hover:shadow-fuchsia-500/10 dark:hover:shadow-fuchsia-500/20 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
          >
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/5 via-transparent to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

            <div className="relative">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-fuchsia-50 to-fuchsia-100 dark:from-fuchsia-900/20 dark:to-fuchsia-800/20 group-hover:scale-110 transition-transform duration-300">
                    <BookOpen className="h-5 w-5 text-fuchsia-600 dark:text-fuchsia-400" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
                      {deck.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                      <span>{deck.cards} cards</span>
                      <span>•</span>
                      <span>{deck.mastered} mastered</span>
                    </div>
                  </div>
                </div>

                <div className="px-2.5 py-1 rounded-full bg-gray-100/80 dark:bg-gray-700/80 backdrop-blur-sm text-gray-700 dark:text-gray-300 text-xs font-medium">
                  {deck.category}
                </div>
              </div>

              {/* Progress Circle */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-12">
                    <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        className="text-gray-200 dark:text-gray-700"
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeDasharray={`${deck.progress}, 100`}
                        className="text-fuchsia-600 dark:text-fuchsia-500 transition-all duration-500"
                      />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-gray-900 dark:text-white">
                      {deck.progress}%
                    </span>
                  </div>

                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
                      {deck.progress}% complete
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <Clock className="h-3.5 w-3.5" />
                  {deck.lastStudied}
                </div>

                <button className="px-4 py-2 text-xs font-semibold bg-gradient-to-r from-fuchsia-600 to-violet-600 hover:from-fuchsia-700 hover:to-violet-700 text-white rounded-lg transition-all duration-300 flex items-center gap-1.5 group-hover:scale-105 shadow-lg shadow-fuchsia-500/30">
                  <Play className="h-3.5 w-3.5" />
                  Study
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
