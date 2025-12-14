"use client";

import {
  BookOpen,
  Filter,
  Star,
  Zap,
  Globe,
} from "lucide-react";

/* ===== TYPES ===== */
export interface ExploreDeck {
  id: number;
  title: string;
  author: string;
  cards: number;
  likes: number;
  category: string;
  rating: number;
}

interface ExploreCommunityProps {
  exploreDecks: ExploreDeck[];
  categories: string[];
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

/* ===== COMPONENT ===== */
export function ExploreCommunity({
  exploreDecks,
  categories,
  activeCategory,
  setActiveCategory,
}: ExploreCommunityProps) {
  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Explore Community
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Top decks from other learners
          </p>
        </div>

        {/* Category Filter */}
        <div className="relative group">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-hover:text-fuchsia-500 transition-colors" />
          <select
            value={activeCategory}
            onChange={(e) => setActiveCategory(e.target.value)}
            className="pl-9 pr-8 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl text-sm appearance-none bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500/50 transition-all"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === "all" ? "All Categories" : cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Deck Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {exploreDecks
          .filter(
            (deck) =>
              activeCategory === "all" ||
              deck.category === activeCategory
          )
          .map((deck) => (
            <div
              key={deck.id}
              className="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-5 hover:shadow-2xl hover:shadow-violet-500/10 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              {/* Background effects */}
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

              <div className="relative">
                {/* Top */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-gradient-to-br from-violet-50 to-violet-100 dark:from-violet-900/20 dark:to-violet-800/20 group-hover:scale-110 transition-transform duration-300">
                      <BookOpen className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
                        {deck.title}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        by {deck.author}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-900/20 px-2 py-1 rounded-lg">
                    <Star className="h-3.5 w-3.5 text-amber-500 fill-current" />
                    <span className="text-xs font-semibold text-amber-700 dark:text-amber-400">
                      {deck.rating}
                    </span>
                  </div>
                </div>

                {/* Meta */}
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
                  <span className="flex items-center gap-1">
                    <Zap className="h-3.5 w-3.5 text-fuchsia-500" />
                    {deck.cards} cards
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="text-pink-500">♥</span>
                    {deck.likes}
                  </span>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <div className="px-2.5 py-1 bg-gray-100/80 dark:bg-gray-700/80 text-xs rounded-lg font-medium">
                    {deck.category}
                  </div>

                  <button className="px-3 py-1.5 text-xs font-medium text-violet-600 dark:text-violet-400 hover:text-white hover:bg-gradient-to-r hover:from-violet-600 hover:to-purple-600 rounded-lg transition-all border border-violet-200 dark:border-violet-800">
                    Preview
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* CTA */}
      <div className="mt-6 text-center">
        <button className="group inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-fuchsia-600 dark:text-fuchsia-500 hover:text-white bg-fuchsia-50 dark:bg-fuchsia-900/20 hover:bg-gradient-to-r hover:from-fuchsia-600 hover:to-violet-600 rounded-xl transition-all border border-fuchsia-200 dark:border-fuchsia-800 hover:border-transparent shadow-lg hover:shadow-fuchsia-500/30">
          <Globe className="h-4 w-4 group-hover:rotate-12 transition-transform duration-300" />
          Explore More Decks
        </button>
      </div>
    </div>
  );
}
