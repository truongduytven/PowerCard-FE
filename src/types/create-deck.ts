export interface Flashcard {
  id: string;
  term: string;
  definition: string;
  mediaId: File | null;
  mediaPreview: string | null;
  position: number;
}

export interface FormData {
  title: string;
  description: string;
  icon: string;
  iconColor: string;
  topicId: string;
  folderSetId: string;
  isPublic: boolean;
  flashcards: Flashcard[];
}

export interface Topic {
  id: string;
  name: string;
}

export interface Folder {
  id: string;
  name: string;
  count: number;
}

export interface IconOption {
  value: string;
  label: string;
  icon: any;
  category: string;
}

export interface GradientOption {
  label: string;
  value: string;
}

export interface ImportedFlashcard {
  term: string;
  definition: string;
  mediaId: null;
  mediaPreview: null;
}