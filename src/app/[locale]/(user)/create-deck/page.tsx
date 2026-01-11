"use client";

import { Button } from "@/components/ui/button";
import {
  gradientOptions,
  iconOptions,
  folders as mockFolders,
  topics as mockTopics,
} from "@/lib/mock/create-decks";
import { Import, Plus } from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

// Components
import { BasicInfoCard } from "@/components/create-deck/BasicInfoCard";
import { BulkActions } from "@/components/create-deck/BulkActions";
import { DraftAlertDialog } from "@/components/create-deck/DraftAlertDialog";
import { FlashcardCard } from "@/components/create-deck/FlashcardCard";
import { Header } from "@/components/create-deck/Header";
import { IconPicker } from "@/components/create-deck/IconPicker";
import { ImportQuizletModal } from "@/components/create-deck/ImportQuizletModal";
import { KeyboardShortcutsHelper } from "@/components/create-deck/KeyboardShortcutsHelper";
import { SuccessMessage } from "@/components/create-deck/SuccessMessage";

// Types
import { useAutoSave } from "@/hooks/create-deck/useAutoSave";
import { useHistory } from "@/hooks/create-deck/useHistory";
import { useKeyboardShortcuts } from "@/hooks/create-deck/useKeyboardShortcuts";
import type {
  Flashcard,
  FormData,
  ImportedFlashcard,
} from "@/types/create-deck";

export default function CreateFlashcardPage() {
  // Initialization
  const getInitialFormData = (): FormData => ({
    title: "",
    description: "",
    icon: "book",
    iconColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    topicId: "",
    folderSetId: "",
    isPublic: false,
    flashcards: [
      {
        id: "1",
        term: "",
        definition: "",
        mediaId: null,
        mediaPreview: null,
        position: 0,
      },
      {
        id: "2",
        term: "",
        definition: "",
        mediaId: null,
        mediaPreview: null,
        position: 1,
      },
    ],
  });
  // State
  const [formData, setFormData] = useState<FormData>(getInitialFormData());
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [expandedCards, setExpandedCards] = useState<Set<string>>(
    new Set(["1", "2"])
  );
  const [showImportModal, setShowImportModal] = useState(false);
  const [selectedIconCategory, setSelectedIconCategory] =
    useState<string>("Giáo dục");
  const [showIconPicker, setShowIconPicker] = useState(false);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [showDraftDialog, setShowDraftDialog] = useState(false);

  // Refs
  const draftCandidateRef = useRef<FormData | null>(null);
  const flashcardFieldRefs = useRef<{
    [cardId: string]: {
      term?: HTMLTextAreaElement | null;
      definition?: HTMLTextAreaElement | null;
    };
  }>({});
  const [deletedCardCache, setDeletedCardCache] = useState<{
    card: Flashcard;
    index: number;
    timestamp: number;
  } | null>(null);

  // Hooks
  const { lastSaved, isSaving, recoverDraft, clearDraft } = useAutoSave(
    formData,
    1000
  );
  const history = useHistory(formData);

  // Recovery draft on mount
  useEffect(() => {
    const draft = recoverDraft();
    if (draft) {
      draftCandidateRef.current = draft;
      setShowDraftDialog(true);
    }
  }, [recoverDraft]);

  // Update form data with history tracking
  const updateFormData = useCallback(
    (newData: FormData) => {
      // push to history first (keep history refs/state in sync), then update UI state
      history.push(newData);
      setFormData(newData);
    },
    [history]
  );

  // Handlers
  const handleInputChange = (field: keyof FormData, value: any) => {
    if (field === "title") {
      value = String(value).slice(0, 100);
    }
    if (field === "description") {
      value = String(value).slice(0, 500);
    }

    const newData = { ...formData, [field]: value };
    updateFormData(newData);
  };

  const handleFlashcardChange = (
    index: number,
    field: keyof Flashcard,
    value: any
  ) => {
    const updatedCards = [...formData.flashcards];
    updatedCards[index] = { ...updatedCards[index], [field]: value };
    const newData = { ...formData, flashcards: updatedCards };
    updateFormData(newData);
  };

  const handleUndo = () => {
    const previousState = history.undo();

    // If history provided a previous state and it's different, apply it.
    if (
      previousState &&
      JSON.stringify(previousState) !== JSON.stringify(formData)
    ) {
      setFormData(previousState);
      // Clear any cached deleted card because history restored state
      setDeletedCardCache(null);
      showUndoToast("Đã hoàn tác", () => handleRedo());
      return;
    }

    // Fallback: if history couldn't undo (or produced no-op), try restoring last deleted card
    if (deletedCardCache) {
      handleUndoDelete();
      showUndoToast("Đã hoàn tác (khôi phục thẻ)", () => handleRedo());
    }
  };

  const handleRedo = () => {
    const nextState = history.redo();
    if (nextState) {
      setFormData(nextState);
      toast("Đã làm lại", {
        duration: 3000,
        position: "bottom-right",
      });
    }
  };

  const handleSelectAll = () => {
    setSelectedCards(
      Array.from({ length: formData.flashcards.length }, (_, i) => i)
    );
  };

  const handleClearSelection = () => {
    setSelectedCards([]);
  };

  const handleBulkImport = (importedCards: ImportedFlashcard[]) => {
    const newFlashcards = importedCards.map((item, index) => ({
      id: `imported-${Date.now()}-${index}`,
      ...item,
      position: formData.flashcards.length + index,
    }));

    const updatedCards = [...formData.flashcards, ...newFlashcards];
    updateFormData({ ...formData, flashcards: updatedCards });

    // Expand all imported cards
    const newCardIds = newFlashcards.map((card) => card.id);
    setExpandedCards((prev) => new Set([...prev, ...newCardIds]));

    // Select imported cards
    setSelectedCards(
      Array.from(
        { length: newFlashcards.length },
        (_, i) => formData.flashcards.length + i
      )
    );
  };

  const handleBulkDuplicate = (indices: number[]) => {
    const cardsToDuplicate = indices.map((i) => formData.flashcards[i]);
    const duplicatedCards = cardsToDuplicate.map((card, idx) => ({
      ...card,
      id: `duplicate-${Date.now()}-${idx}`,
      term: `${card.term} (Bản sao)`,
      position: formData.flashcards.length + idx,
    }));

    const updatedCards = [...formData.flashcards, ...duplicatedCards];
    updateFormData({ ...formData, flashcards: updatedCards });

    toast.success(`Đã sao chép ${indices.length} thẻ`);
  };

  const handleBulkDelete = (indices: number[]) => {
    if (formData.flashcards.length - indices.length < 2) {
      toast.error("Bộ flashcard cần ít nhất 2 thẻ");
      return;
    }

    showUndoToast(`Đã xóa ${indices.length} thẻ`, () => {
      // Undo delete logic would go here
    });

    const updatedCards = formData.flashcards.filter(
      (_, i) => !indices.includes(i)
    );
    updatedCards.forEach((card, i) => (card.position = i));
    updateFormData({ ...formData, flashcards: updatedCards });
    setSelectedCards([]);
  };

  const handleImageUpload = (index: number, file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Vui lòng chọn file hình ảnh");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File không được vượt quá 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      handleFlashcardChange(index, "mediaId", file);
      handleFlashcardChange(index, "mediaPreview", reader.result as string);
      toast.success("Đã tải ảnh lên thành công");
    };
    reader.readAsDataURL(file);
  };

  const addFlashcard = () => {
    const newId = `card-${Date.now()}-${formData.flashcards.length}`;
    const newCard: Flashcard = {
      id: newId,
      term: "",
      definition: "",
      mediaId: null,
      mediaPreview: null,
      position: formData.flashcards.length,
    };
    const updatedCards = [...formData.flashcards, newCard];
    updateFormData({ ...formData, flashcards: updatedCards });
    setExpandedCards((prev) => new Set([...prev, newId]));
    setSelectedCards([...selectedCards, formData.flashcards.length]);
    // toast.success("Đã thêm thẻ mới");
  };

  const handleDeleteCard = (index: number) => {
    const card = formData.flashcards[index];

    // Cache thẻ bị xóa
    setDeletedCardCache({
      card,
      index,
      timestamp: Date.now(),
    });

    // Cập nhật danh sách thẻ
    const updatedCards = formData.flashcards.filter((_, i) => i !== index);
    const reorderedCards = updatedCards.map((card, i) => ({
      ...card,
      position: i,
    }));

    updateFormData({
      ...formData,
      flashcards: reorderedCards,
    });

    // Cập nhật trạng thái
    setExpandedCards((prev) => {
      const newSet = new Set(prev);
      newSet.delete(card.id);
      return newSet;
    });

    setSelectedCards((prev) => {
      const filtered = prev.filter((i) => i !== index);
      return filtered.map((i) => (i > index ? i - 1 : i));
    });

    // Hiển thị toast với undo action
    toast.success(
      <div className="flex items-center justify-between">
        <span>Đã xóa thẻ #{index + 1}</span>
      </div>,

      {
        duration: 1000,
      }
    );
  };

  const handleUndoDelete = () => {
    if (!deletedCardCache) return;

    const { card, index } = deletedCardCache;

    // Khôi phục thẻ
    const updatedCards = [...formData.flashcards];
    updatedCards.splice(index, 0, card);
    const reorderedCards = updatedCards.map((card, i) => ({
      ...card,
      position: i,
    }));

    updateFormData({
      ...formData,
      flashcards: reorderedCards,
    });

    // Reset cache
    setDeletedCardCache(null);
    toast.success(`Đã khôi phục thẻ #${index + 1}`);
  };

  const handleImportFromQuizlet = (importedFlashcards: ImportedFlashcard[]) => {
    const newFlashcards = importedFlashcards.map((item, index) => ({
      id: `quizlet-${Date.now()}-${index}`,
      ...item,
      position: formData.flashcards.length + index,
    }));

    const updatedCards = [...formData.flashcards, ...newFlashcards];
    updateFormData({ ...formData, flashcards: updatedCards });

    // Expand all imported cards
    const newCardIds = newFlashcards.map((card) => card.id);
    setExpandedCards((prev) => new Set([...prev, ...newCardIds]));
  };

  const toggleCardExpand = (cardId: string) => {
    setExpandedCards((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(cardId)) {
        newSet.delete(cardId);
      } else {
        newSet.add(cardId);
      }
      return newSet;
    });
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null) return;

    const updatedCards = [...formData.flashcards];
    const draggedCard = updatedCards[draggedIndex];
    updatedCards.splice(draggedIndex, 1);
    updatedCards.splice(dropIndex, 0, draggedCard);
    updatedCards.forEach((card, i) => (card.position = i));

    updateFormData({ ...formData, flashcards: updatedCards });
    setDraggedIndex(null);
    setDragOverIndex(null);

    // Update selected cards indices
    setSelectedCards(
      selectedCards.map((oldIndex) => {
        if (oldIndex === draggedIndex) return dropIndex;
        if (draggedIndex < dropIndex) {
          if (oldIndex > draggedIndex && oldIndex <= dropIndex)
            return oldIndex - 1;
        } else {
          if (oldIndex >= dropIndex && oldIndex < draggedIndex)
            return oldIndex + 1;
        }
        return oldIndex;
      })
    );

    toast.success("Đã sắp xếp lại thứ tự thẻ");
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleSaveDraft = () => {
    const draft = {
      data: formData,
      timestamp: new Date().toISOString(),
      saveCount: 0,
    };

    localStorage.setItem("flashcardDraft", JSON.stringify(draft));
    toast.success("Đã lưu nháp thành công");
  };

  const handleRestoreDraft = () => {
    const draft = draftCandidateRef.current;
    if (draft) {
      setFormData(draft);
      toast.success("Đã khôi phục bản nháp");
    }
    draftCandidateRef.current = null;
    setShowDraftDialog(false);
  };

  const handleCreateNewFromDialog = () => {
    clearDraft();
    setFormData(getInitialFormData());
    draftCandidateRef.current = null;
    setShowDraftDialog(false);
    toast("Tạo mới bộ flashcard");
  };

  const handleSubmit = () => {
    const emptyCards = formData.flashcards.filter(
      (card) => !card.term.trim() || !card.definition.trim()
    );

    if (!formData.title.trim()) {
      toast.error("Vui lòng nhập tiêu đề cho bộ flashcard");
      return;
    }

    if (emptyCards.length > 0) {
      toast.error(
        `Còn ${emptyCards.length} thẻ chưa hoàn thành. Vui lòng kiểm tra lại.`
      );
      return;
    }

    const submitData = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      icon: formData.icon,
      iconColor: formData.iconColor,
      topicId: formData.topicId,
      folderSetId: formData.folderSetId,
      isPublic: formData.isPublic,
      flashcards: formData.flashcards.map((card) => ({
        mediaId: card.mediaId,
        position: card.position,
        term: card.term.trim(),
        definition: card.definition.trim(),
      })),
    };

    console.log("Submit Data:", submitData);

    // Clear draft on successful submit
    clearDraft();
    history.clearHistory();

    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const showUndoToast = (message: string, undoAction: () => void) => {
    toast.custom(
      (t) => (
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-xl animate-in slide-in-from-right">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 text-green-600">✓</div>
              <div>
                <p className="font-medium text-gray-900">{message}</p>
                <p className="text-xs text-gray-500">
                  Hành động có thể hoàn tác
                </p>
              </div>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                undoAction();
                toast.dismiss(t);
              }}
            >
              Hoàn tác
            </Button>
          </div>
        </div>
      ),
      {
        duration: 8000,
        position: "bottom-right",
      }
    );
  };

  const handleCardSelect = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (e.ctrlKey || e.metaKey) {
      // Ctrl/Cmd click: toggle selection
      setSelectedCards((prev) =>
        prev.includes(index)
          ? prev.filter((i) => i !== index)
          : [...prev, index]
      );
    } else if (e.shiftKey) {
      // Shift click: select range
      if (selectedCards.length > 0) {
        const lastSelected = Math.max(...selectedCards);
        const start = Math.min(lastSelected, index);
        const end = Math.max(lastSelected, index);
        const range = Array.from(
          { length: end - start + 1 },
          (_, i) => start + i
        );
        setSelectedCards(Array.from(new Set([...selectedCards, ...range])));
      } else {
        setSelectedCards([index]);
      }
    } else {
      // Regular click: select single
      setSelectedCards([index]);
    }
  };

  // Keyboard shortcuts
  useKeyboardShortcuts({
    onSave: handleSaveDraft,
    onAddCard: addFlashcard,
    onCloseModal: () => {
      setShowImportModal(false);
      setShowIconPicker(false);
    },
    onUndo: handleUndo,
    onRedo: handleRedo,
    onImport: () => setShowImportModal(true),
  });

  // Calculate stats
  const completedCards = formData.flashcards.filter(
    (c) => c.term.trim() && c.definition.trim()
  ).length;
  const totalCards = formData.flashcards.length;
  const incompleteCards = totalCards - completedCards;
  const progress = totalCards > 0 ? (completedCards / totalCards) * 100 : 0;

  // Get unique categories from icon options
  const iconCategories = Array.from(
    new Set(iconOptions.map((icon) => icon.category))
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-50 to-fuchsia-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-gray-900">
      {/* Header */}
      <Header
        isSaving={isSaving}
        lastSaved={lastSaved}
        canUndo={history.canUndo}
        canRedo={history.canRedo}
        onUndo={handleUndo}
        onRedo={handleRedo}
        completedCards={completedCards}
        totalCards={totalCards}
        progress={progress}
        onSubmit={handleSubmit}
      />

      {/* Success Message */}
      <SuccessMessage
        show={showSuccess}
        title={formData.title}
        onClose={() => setShowSuccess(false)}
      />

      {/* Modals */}
      <ImportQuizletModal
        open={showImportModal}
        onOpenChange={setShowImportModal}
        onImport={handleImportFromQuizlet}
      />

      <DraftAlertDialog
        open={showDraftDialog}
        onOpenChange={setShowDraftDialog}
        onRestore={handleRestoreDraft}
        onCreateNew={handleCreateNewFromDialog}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="space-y-5">
          {/* Basic Info Card */}
          <BasicInfoCard
            formData={formData}
            onChange={(field: string, value: any) =>
              handleInputChange(field as keyof FormData, value)
            }
            topics={mockTopics}
            folders={mockFolders}
            showIconPicker={showIconPicker}
            setShowIconPicker={setShowIconPicker}
            iconCategories={iconCategories}
            selectedIconCategory={selectedIconCategory}
            setSelectedIconCategory={setSelectedIconCategory}
            gradientOptions={gradientOptions}
            iconOptions={iconOptions}
            IconPickerComponent={
              <IconPicker
                selectedIcon={formData.icon}
                iconColor={formData.iconColor}
                iconCategories={iconCategories}
                selectedIconCategory={selectedIconCategory}
                gradientOptions={gradientOptions}
                iconOptions={iconOptions}
                onIconChange={(icon) => handleInputChange("icon", icon)}
                onColorChange={(color) => handleInputChange("iconColor", color)}
                onCategoryChange={setSelectedIconCategory}
              />
            }
          />

          {/* Flashcards Section */}
          <div className="space-y-4">
            {/* Section Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                  Flashcards{" "}
                  <span className="font-normal text-gray-500 dark:text-gray-400">
                    ({totalCards})
                  </span>
                </h2>

                <p className="text-xs mt-0.5 text-gray-500 dark:text-gray-400">
                  Kéo thả để sắp xếp • Click để chọn • Double click để mở rộng
                </p>
              </div>

              <div className="flex flex-row gap-2">
                {/* Bulk Actions (ẩn trên mobile, hiện trên desktop) */}
                <BulkActions
                  onImportCSV={handleBulkImport}
                  onDuplicateCards={handleBulkDuplicate}
                  onDeleteCards={handleBulkDelete}
                  onSelectAll={handleSelectAll}
                  onClearSelection={handleClearSelection}
                  selectedCards={selectedCards}
                  totalCards={totalCards}
                />

                {/* Add Card Button - Primary action */}
                <Button
                  onClick={() => setShowImportModal(true)}
                  variant="outline"
                  size="sm"
                  className="border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-700 h-9"
                >
                  <Import className="w-3.5 h-3.5 mr-1.5" />
                  <span className="hidden sm:inline">Import from Quizlet</span>
                </Button>
                <Button
                  onClick={addFlashcard}
                  size="sm"
                  className="h-9 flex-1 min-w-[90px] sm:flex-none bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Plus className="w-4 h-4 sm:mr-1.5" />
                  <span className="hidden xs:inline sm:inline">Thêm thẻ</span>
                  <span className="xs:hidden sm:hidden">Thêm</span>
                </Button>
              </div>
            </div>

            {/* Flashcards List */}
            <div className="space-y-2">
              {formData.flashcards.map((card, index) => (
                <FlashcardCard
                  key={card.id}
                  card={card}
                  index={index}
                  isExpanded={expandedCards.has(card.id)}
                  isSelected={selectedCards.includes(index)}
                  isDragging={draggedIndex === index}
                  isDragOver={dragOverIndex === index}
                  onSelect={handleCardSelect}
                  onToggleExpand={toggleCardExpand}
                  onDelete={handleDeleteCard}
                  onChange={handleFlashcardChange}
                  onImageUpload={handleImageUpload}
                  onDragStart={handleDragStart}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onDragEnd={handleDragEnd}
                  registerFieldRef={(cardId, field, ref) => {
                    flashcardFieldRefs.current[cardId] = {
                      ...(flashcardFieldRefs.current[cardId] || {}),
                      [field]: ref,
                    };
                  }}
                />
              ))}
            </div>

            {/* Add Card Button */}
            <div className="pt-2">
              <button
                onClick={addFlashcard}
                className="w-full py-3.5 border-2 border-dashed border-gray-300 hover:border-blue-400 hover:bg-blue-50/30 text-gray-600 hover:text-blue-700 transition-all rounded-lg group flex items-center justify-center gap-2.5"
              >
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <Plus className="w-4 h-4 text-blue-600 group-hover:text-blue-700" />
                </div>
                <div className="text-left dark:text-gray-200">
                  <p className="text-sm font-semibold">Thêm thẻ mới</p>
                  <p className="text-xs text-gray-500 hidden sm:block">
                    Hoặc nhấn Ctrl + Enter
                  </p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Keyboard Shortcuts Helper */}
      <div className="hidden lg:block">
        <KeyboardShortcutsHelper />
      </div>
    </div>
  );
}
