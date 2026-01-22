export const validateFlashcard = (card: { term: string; definition: string }) => {
  return card.term.trim() && card.definition.trim();
};

export const calculateProgress = (flashcards: Array<{ term: string; definition: string }>) => {
  const completed = flashcards.filter(validateFlashcard).length;
  const total = flashcards.length;
  return {
    completed,
    total,
    progress: total > 0 ? (completed / total) * 100 : 0,
  };
};

export const generateId = () => `card-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

export const showUndoToast = (message: string, undoAction: () => void) => {
  // This would be implemented with toast from sonner
  console.log(message, undoAction);
};