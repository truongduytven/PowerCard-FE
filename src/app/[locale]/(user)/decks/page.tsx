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
import { categories, decks, folders } from "@/lib/mock/home";
import { ViewMode } from "@/types/decks";
import { History, Folder } from "lucide-react";
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

  // Filter logic
  const filteredFolders = folders.filter(
    (folder) =>
      folder.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      folder.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredDecks = decks.filter((deck) => {
    const matchesSearch =
      deck.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deck.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || deck.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
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
        {/* Reecent Section */}
        <div>
          <SectionHeader
            title="Recent"
            subtitle={`${filteredDecks.length} deck${
              filteredDecks.length !== 1 ? "s" : ""
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
              {filteredDecks.length > 0 ? (
                filteredDecks.map((deck) => (
                  <DeckCard key={deck.id} deck={deck} viewMode={viewMode} />
                ))
              ) : (
                <EmptyState
                  type="deck"
                  searchQuery={searchQuery}
                  onCreate={() => handleCreate("deck")}
                />
              )}
            </div>
          )}
        </div>

        <DecksSection
          title="All Decks"
          decks={filteredDecks}
          viewMode={viewMode}
          isExpanded={decksExpanded}
          searchQuery={searchQuery}
          onToggle={() => setDecksExpanded(!decksExpanded)}
          onCreateDeck={() => handleCreate("deck")}
          onStudyDeck={handleStudyDeck}
          onEditDeck={handleEditDeck}
        />

        {/* Folders Section */}
        <div className="mb-12">
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
