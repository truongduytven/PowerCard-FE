export interface FormData {
  title: string;
  description: string;
  icon: string;
  iconGradient: string;
  studySets: string[];
  tags: string[];
  visibility: "private" | "public" | "shared";
  colorTheme: string;
  sortOrder: "manual" | "alphabetical" | "date" | "progress";
}

export interface StudySet {
  id: string;
  title: string;
  cardCount: number;
  category: string;
  lastModified: string;
  tags: string[];
}