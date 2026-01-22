"use client";
import CategoryFilter from "@/components/decks/CategoryFilter";
import CreateButton from "@/components/decks/CreateButton";
import DeckCard from "@/components/decks/DeckCard";
import EmptyState from "@/components/decks/EmptyState";
import FolderCard from "@/components/decks/FolderCard";
import SearchBar from "@/components/decks/SearchBar";
import ViewModeToggle from "@/components/decks/ViewModeToggle";
import {
  categories,
  folders,
  personalDecks,
  recentDecks,
} from "@/lib/mock/home";
import { ViewMode } from "@/types/decks";
import { BookOpen, Compass, Folder, History } from "lucide-react";
import { useState } from "react";

export default function MyDecksPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [foldersExpanded, setFoldersExpanded] = useState(true);
  const [recentExpanded, setRecentExpanded] = useState(true);
  const [decksExpanded, setDecksExpanded] = useState(true);
  const [showAllRecent, setShowAllRecent] = useState(false);
  const [loadingMoreRecent, setLoadingMoreRecent] = useState(false);
  const [showAllMyDecks, setShowAllMyDecks] = useState(false);
  const [loadingMoreMyDecks, setLoadingMoreMyDecks] = useState(false);
  const [showAllFolders, setShowAllFolders] = useState(false);
  const [loadingMoreFolders, setLoadingMoreFolders] = useState(false);

  const handleCreate = (type: "deck" | "folder") => {
    console.log(`Create new ${type}`);
    // Add your create logic here
  };

  // Filter logic cho recent decks (đã học)
  const filteredRecentDecks = recentDecks.filter((deck) => {
    const matchesSearch =
      deck.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deck.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || deck.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Filter logic cho personal decks (của người dùng)
  const filteredPersonalDecks = personalDecks.filter((deck) => {
    const matchesSearch =
      deck.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deck.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || deck.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Filter folders
  const filteredFolders = folders.filter(
    (folder) =>
      folder.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      folder.description?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleStudyDeck = (deckId: number) => {
    console.log("Study deck:", deckId);
    // Add study logic
  };

  const handleEditDeck = (deckId: number) => {
    console.log("Edit deck:", deckId);
    // Add edit logic
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-50 to-fuchsia-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-fuchsia-950/20">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-fuchsia-300/20 dark:bg-fuchsia-500/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute top-1/2 -left-40 w-96 h-96 bg-violet-300/20 dark:bg-violet-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h1 className="text-4xl leading-[1.25] font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-fuchsia-900 to-gray-900 dark:from-white dark:via-fuchsia-200 dark:to-white">
                My Content
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Organize and study your flashcard collections
              </p>
            </div>
            <CreateButton onCreate={handleCreate} />
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
            <CategoryFilter
              value={selectedCategory}
              onChange={setSelectedCategory}
              categories={categories}
            />
            <ViewModeToggle value={viewMode} onChange={setViewMode} />
          </div>
        </div>

        {/* Recent Section - Decks đã học (cả của mình và người khác) */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-fuchsia-500/10 to-violet-500/10 rounded-full">
                <History className="h-6 w-6 text-fuchsia-600 dark:text-fuchsia-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  Recent
                </h3>
                <p className="text-xs mt-0.5 text-gray-500 dark:text-gray-400">
                  {filteredRecentDecks.length} active deck
                  {filteredRecentDecks.length !== 1 ? "s" : ""}
                </p>
              </div>
            </div>
          </div>

          {recentExpanded && (
            <>
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                    : "space-y-3"
                }
              >
                {filteredRecentDecks.length > 0 ? (
                  filteredRecentDecks.map((deck) => {
                    const isOwner =
                      deck.deckType === "personal" || !deck.author;

                    return (
                      <DeckCard
                        key={deck.id}
                        deck={deck}
                        viewMode={viewMode}
                        isOwner={isOwner}
                        onStudy={() => handleStudyDeck(deck.id)}
                        onTest={() => console.log("Test deck:", deck.id)}
                        onEdit={() =>
                          isOwner && console.log("Edit deck:", deck.id)
                        }
                        onDelete={() =>
                          isOwner && console.log("Delete deck:", deck.id)
                        }
                      />
                    );
                  })
                ) : (
                  <div className="col-span-full py-12 text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-fuchsia-100 to-violet-100 dark:from-fuchsia-900/20 dark:to-violet-900/20 mb-4">
                      <Compass className="h-10 w-10 text-fuchsia-600 dark:text-fuchsia-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      No recent activity
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Start studying a deck to see it here
                    </p>
                    <button className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-fuchsia-600 to-violet-600 hover:from-fuchsia-700 hover:to-violet-700 text-white rounded-lg font-medium transition-all duration-300 shadow-lg shadow-fuchsia-500/30">
                      <Compass className="h-4 w-4" />
                      Explore Decks
                    </button>
                  </div>
                )}
              </div>

              {/* Demo: skeleton placeholders when user clicks 'Xem tất cả' */}
              {loadingMoreRecent && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-lg bg-white dark:bg-gray-800 shadow animate-pulse h-40"
                    />
                  ))}
                </div>
              )}

              {showAllRecent && !loadingMoreRecent && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-lg bg-white dark:bg-gray-800 shadow animate-pulse h-40"
                    />
                  ))}
                </div>
              )}
            </>
          )}

          {/* Updated Recent Section - "Xem tất cả" button */}
          <div className="flex items-center justify-center gap-2 mt-6">
            <button
              onClick={() => {
                if (showAllRecent) return;
                setLoadingMoreRecent(true);
                setTimeout(() => {
                  setLoadingMoreRecent(false);
                  setShowAllRecent(true);
                }, 1200);
              }}
              disabled={loadingMoreRecent || showAllRecent}
              className={`
                group relative flex items-center justify-center gap-2 
                px-5 py-2.5 text-sm font-medium rounded-xl 
                transition-all duration-300 transform hover:-translate-y-0.5
                disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0
                ${
                  showAllRecent
                    ? "bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 text-gray-700 dark:text-gray-300"
                    : "bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 text-gray-800 dark:text-gray-200 hover:shadow-lg border border-gray-200 dark:border-gray-700 hover:border-fuchsia-300 dark:hover:border-fuchsia-700"
                }
              `}
            >
              {loadingMoreRecent ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-fuchsia-500 dark:border-t-fuchsia-400" />
                  <span>Đang tải...</span>
                </>
              ) : showAllRecent ? (
                <>
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Đã xem tất cả</span>
                </>
              ) : (
                <>
                  <span>Xem tất cả</span>
                  <svg
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </>
              )}
              {/* Hover effect line */}
              {!showAllRecent && !loadingMoreRecent && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-fuchsia-500 to-violet-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              )}
            </button>
          </div>
        </div>

        {/* My Decks Section - Chỉ decks của người dùng */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-fuchsia-500/10 to-violet-500/10 rounded-full">
                <BookOpen className="h-6 w-6 text-fuchsia-600 dark:text-fuchsia-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  My Decks
                </h3>
                <p className="text-xs mt-0.5 text-gray-500 dark:text-gray-400">
                  {filteredPersonalDecks.length} deck
                  {filteredPersonalDecks.length !== 1 ? "s" : ""}
                </p>
              </div>
            </div>
          </div>

          {decksExpanded && (
            <>
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                    : "space-y-3"
                }
              >
                {filteredPersonalDecks.length > 0 ? (
                  filteredPersonalDecks.map((deck) => (
                    <DeckCard
                      key={deck.id}
                      deck={deck}
                      viewMode={viewMode}
                      isOwner={deck.deckType === "personal" || !deck.author}
                      onStudy={() => handleStudyDeck(deck.id)}
                      onTest={() => console.log("Test deck:", deck.id)}
                      onEdit={() => handleEditDeck(deck.id)}
                      onDelete={() => console.log("Delete deck:", deck.id)}
                    />
                  ))
                ) : (
                  <EmptyState
                    type="deck"
                    searchQuery={searchQuery}
                    onCreate={() => handleCreate("deck")}
                  />
                )}
              </div>

              {loadingMoreMyDecks && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-lg bg-white dark:bg-gray-800 shadow animate-pulse h-40"
                    />
                  ))}
                </div>
              )}

              {showAllMyDecks && !loadingMoreMyDecks && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-lg bg-white dark:bg-gray-800 shadow animate-pulse h-40"
                    />
                  ))}
                </div>
              )}
            </>
          )}

          {/* Updated My Decks Section - "Xem tất cả" button */}
          <div className="flex items-center justify-center gap-2 mt-6">
            <button
              onClick={() => {
                if (showAllMyDecks) return;
                setLoadingMoreMyDecks(true);
                setTimeout(() => {
                  setLoadingMoreMyDecks(false);
                  setShowAllMyDecks(true);
                }, 1200);
              }}
              disabled={loadingMoreMyDecks || showAllMyDecks}
              className={`
                group relative flex items-center justify-center gap-2 
                px-5 py-2.5 text-sm font-medium rounded-xl 
                transition-all duration-300 transform hover:-translate-y-0.5
                disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0
                ${
                  showAllMyDecks
                    ? "bg-gradient-to-r from-fuchsia-50 to-violet-50 dark:from-fuchsia-900/20 dark:to-violet-900/20 text-fuchsia-700 dark:text-fuchsia-300"
                    : "bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 text-gray-800 dark:text-gray-200 hover:shadow-lg shadow-fuchsia-500/20 dark:shadow-fuchsia-500/10 border border-gray-200 dark:border-gray-700 hover:border-fuchsia-300 dark:hover:border-fuchsia-700"
                }
              `}
            >
              {loadingMoreMyDecks ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-fuchsia-500 dark:border-t-fuchsia-400" />
                  <span>Đang tải...</span>
                </>
              ) : showAllMyDecks ? (
                <>
                  <svg
                    className="h-4 w-4 text-fuchsia-500 dark:text-fuchsia-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Đã xem tất cả</span>
                </>
              ) : (
                <>
                  <span>Xem tất cả</span>
                  <svg
                    className="h-4 w-4 text-fuchsia-500 dark:text-fuchsia-400 transition-transform duration-300 group-hover:translate-x-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </>
              )}
              {/* Glow effect on hover */}
              {!showAllMyDecks && !loadingMoreMyDecks && (
                <>
                  <div className="absolute -inset-1 bg-gradient-to-r from-fuchsia-500/10 to-violet-500/10 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-fuchsia-500 to-violet-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Folders Section */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-fuchsia-500/10 to-violet-500/10 rounded-full">
                <Folder className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  Folders
                </h3>
                <p className="text-xs mt-0.5 text-gray-500 dark:text-gray-400">
                  {filteredFolders.length} folder
                  {filteredFolders.length !== 1 ? "s" : ""}
                </p>
              </div>
            </div>
          </div>

          {foldersExpanded && (
            <>
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                    : "space-y-3"
                }
              >
                {filteredFolders.length > 0 ? (
                  filteredFolders.map((folder) => (
                    <FolderCard
                      key={folder.id}
                      folder={folder}
                      viewMode={viewMode}
                    />
                  ))
                ) : (
                  <EmptyState
                    type="folder"
                    searchQuery={searchQuery}
                    onCreate={() => handleCreate("folder")}
                  />
                )}
              </div>

              {loadingMoreFolders && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-lg bg-white dark:bg-gray-800 shadow animate-pulse h-40"
                    />
                  ))}
                </div>
              )}

              {showAllFolders && !loadingMoreFolders && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-lg bg-white dark:bg-gray-800 shadow animate-pulse h-40"
                    />
                  ))}
                </div>
              )}
            </>
          )}

          {/* Updated Folders Section - "Xem tất cả" button */}
          <div className="flex items-center justify-center gap-2 mt-6">
            <button
              onClick={() => {
                if (showAllFolders) return;
                setLoadingMoreFolders(true);
                setTimeout(() => {
                  setLoadingMoreFolders(false);
                  setShowAllFolders(true);
                }, 1200);
              }}
              disabled={loadingMoreFolders || showAllFolders}
              className={`
                group relative flex items-center justify-center gap-2 
                px-5 py-2.5 text-sm font-medium rounded-xl 
                transition-all duration-300 transform hover:-translate-y-0.5
                disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0
                ${
                  showAllFolders
                    ? "bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 text-blue-700 dark:text-blue-300"
                    : "bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 text-gray-800 dark:text-gray-200 hover:shadow-lg shadow-blue-500/20 dark:shadow-blue-500/10 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700"
                }
              `}
            >
              {loadingMoreFolders ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-blue-500 dark:border-t-blue-400" />
                  <span>Đang tải...</span>
                </>
              ) : showAllFolders ? (
                <>
                  <svg
                    className="h-4 w-4 text-blue-500 dark:text-blue-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Đã xem tất cả</span>
                </>
              ) : (
                <>
                  <span>Xem tất cả</span>
                  <svg
                    className="h-4 w-4 text-blue-500 dark:text-blue-400 transition-transform duration-300 group-hover:translate-x-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </>
              )}
              {/* Hover effect line */}
              {!showAllFolders && !loadingMoreFolders && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              )}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
