"use client";

import CategoryFilter from "@/components/decks/CategoryFilter";
import CreateButton from "@/components/decks/CreateButton";
import DeckCard from "@/components/decks/DeckCard";
import DecksSection from "@/components/decks/DecksSection";
import EmptyState from "@/components/decks/EmptyState";
import FolderCard from "@/components/decks/FolderCard";
import SearchBar from "@/components/decks/SearchBar";
import SectionHeader from "@/components/decks/SectionHeader";
import ViewModeToggle from "@/components/decks/ViewModeToggle";
import {
  categories,
  folders,
  personalDecks,
  recentDecks,
} from "@/lib/mock/home";
import { ViewMode } from "@/types/decks";
import { Compass, Folder, History } from "lucide-react";
import { useState } from "react";

export default function MyDecksPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [foldersExpanded, setFoldersExpanded] = useState(true);
  const [recentExpanded, setRecentExpanded] = useState(true);
  const [decksExpanded, setDecksExpanded] = useState(true);

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
      folder.description?.toLowerCase().includes(searchQuery.toLowerCase())
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
              <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-fuchsia-900 to-gray-900 dark:from-white dark:via-fuchsia-200 dark:to-white">
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
          <SectionHeader
            title="Recent"
            subtitle={`${filteredRecentDecks.length} active deck${
              filteredRecentDecks.length !== 1 ? "s" : ""
            }`}
            icon={
              <History className="h-6 w-6 text-fuchsia-600 dark:text-fuchsia-400" />
            }
            isExpanded={recentExpanded}
            onToggle={() => setRecentExpanded(!recentExpanded)}
          />

          {recentExpanded && (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                  : "space-y-3"
              }
            >
              {filteredRecentDecks.length > 0 ? (
                filteredRecentDecks.map((deck) => {
                  // Kiểm tra xem deck có phải của người dùng không
                  // Dựa vào deckType hoặc author để xác định
                  const isOwner = deck.deckType === "personal" || !deck.author;

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
          )}
        </div>

        {/* My Decks Section - Chỉ decks của người dùng */}
        <DecksSection
          title="My Decks"
          decks={filteredPersonalDecks}
          viewMode={viewMode}
          isExpanded={decksExpanded}
          searchQuery={searchQuery}
          onToggle={() => setDecksExpanded(!decksExpanded)}
          onCreateDeck={() => handleCreate("deck")}
          onStudyDeck={handleStudyDeck}
          onEditDeck={handleEditDeck}
        />

        {/* Folders Section */}
        <div className="mb-8">
          <SectionHeader
            title="Folders"
            subtitle={`${filteredFolders.length} folder${
              filteredFolders.length !== 1 ? "s" : ""
            }`}
            icon={
              <Folder className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            }
            isExpanded={foldersExpanded}
            onToggle={() => setFoldersExpanded(!foldersExpanded)}
          />

          {foldersExpanded && (
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
          )}
        </div>
      </main>
    </div>
  );
}
