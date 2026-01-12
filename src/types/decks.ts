export type ContentType = "deck" | "folder";
export type ViewMode = "grid" | "list";
export type DeckType = "personal" | "shared" | "public";

export interface ContentItem {
  id: number;
  type: ContentType;
  title: string;
  description?: string;
  color: string;
  icon: string;
  lastModified: string;
  itemsCount?: number;
  cards?: number;
  mastered?: number;        // Chỉ có trong recent decks (decks đã học)
  progress?: number;       // Chỉ có trong recent decks (decks đã học)
  category?: string;
  isPublic?: boolean;
  likes?: number;
  studySessions?: number;
  deckType?: DeckType;     // 'personal' | 'shared' | 'public'
  isStudying?: boolean;    // Đánh dấu deck đang học
  author?: string;         // Tác giả (cho deck của người khác)
  lastStudied?: string;    // Thời gian học cuối (cho recent)
  createdAt?: string;      // Ngày tạo (cho decks cá nhân)
   isOwner?: boolean;
}