import { useEffect } from 'react';

interface KeyboardShortcutsProps {
  onSave: () => void;
  onAddCard: () => void;
  onCloseModal: () => void;
  onUndo: () => void;
  onRedo: () => void;
  onImport: () => void;
}

export const useKeyboardShortcuts = ({
  onSave,
  onAddCard,
  onCloseModal,
  onUndo,
  onRedo,
  onImport,
}: KeyboardShortcutsProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + S: Lưu
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        onSave();
      }

      // Ctrl/Cmd + Enter: Thêm thẻ mới
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        onAddCard();
      }

      // Ctrl/Cmd + Z: Undo
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        onUndo();
      }

      // Ctrl/Cmd + Shift + Z: Redo
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && e.shiftKey) {
        e.preventDefault();
        onRedo();
      }

      // Ctrl/Cmd + I: Import
      if ((e.ctrlKey || e.metaKey) && e.key === 'i') {
        e.preventDefault();
        onImport();
      }

      // Esc: Đóng modal
      if (e.key === 'Escape') {
        onCloseModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onSave, onAddCard, onCloseModal, onUndo, onRedo, onImport]);
};