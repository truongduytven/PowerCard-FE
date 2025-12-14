"use client";

import { BookOpen } from "lucide-react";
import { ContentItem, ViewMode } from "@/types/decks";
import SectionHeader from "./SectionHeader";
import EmptyState from "./EmptyState";
import DeckCardSimple from "./DeckCardSimple";

interface DecksSectionProps {
  title: string;
  decks: ContentItem[];
  viewMode: ViewMode;
  isExpanded: boolean;
  searchQuery?: string;
  onToggle: () => void;
  onCreateDeck: () => void;
  onStudyDeck?: (deckId: number) => void;
  onEditDeck?: (deckId: number) => void;
}

export default function DecksSection({
  title,
  decks,
  viewMode,
  isExpanded,
  searchQuery,
  onToggle,
  onCreateDeck,
  onStudyDeck,
  onEditDeck,
}: DecksSectionProps) {
  const handleStudy = (deckId: number) => {
    if (onStudyDeck) onStudyDeck(deckId);
  };

  const handleEdit = (deckId: number) => {
    if (onEditDeck) onEditDeck(deckId);
  };

  return (
    <div className="mt-6">
      <SectionHeader
        title={title}
        subtitle={`${decks.length} deck${decks.length !== 1 ? "s" : ""}`}
        icon={
          <BookOpen className="h-6 w-6 text-fuchsia-600 dark:text-fuchsia-400" />
        }
        isExpanded={isExpanded}
        onToggle={onToggle}
      />

      {isExpanded && (
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
              : "space-y-3"
          }
        >
          {decks.length > 0 ? (
            decks.map((deck) => (
              <DeckCardSimple
                key={deck.id}
                deck={deck}
                viewMode={viewMode}
                onStudy={() => handleStudy(deck.id)}
                onEdit={() => handleEdit(deck.id)}
              />
            ))
          ) : (
            <EmptyState
              type="deck"
              searchQuery={searchQuery}
              onCreate={onCreateDeck}
            />
          )}
        </div>
      )}
    </div>
  );
}
