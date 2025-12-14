export type ContentType = "deck" | "folder";
export type ViewMode = "grid" | "list";

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
  mastered?: number;
  progress?: number;
  category?: string;
  isPublic?: boolean;
  likes?: number;
  studySessions?: number;
}