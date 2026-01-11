"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  folders,
  gradientOptions,
  iconOptions,
  topics,
} from "@/lib/mock/create-decks";
import {
  AlertCircle,
  AlertTriangle,
  Book,
  BookOpen,
  Check,
  CheckCircle,
  ChevronDown,
  Clock,
  Columns,
  Copy,
  Download,
  ExternalLink,
  FileSpreadsheet,
  FileText,
  FolderOpen,
  Globe,
  Grid3x3,
  GripVertical,
  Image as ImageIcon,
  Import,
  Keyboard,
  LayoutGrid,
  Loader2,
  Lock,
  Palette,
  Plus,
  Redo,
  Sparkles,
  Tag,
  Trash2,
  Undo,
  Upload,
  UploadCloud,
} from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

// Types
interface Flashcard {
  id: string;
  term: string;
  definition: string;
  mediaId: File | null;
  mediaPreview: string | null;
  position: number;
}

interface FormData {
  title: string;
  description: string;
  icon: string;
  iconColor: string;
  topicId: string;
  folderSetId: string;
  isPublic: boolean;
  flashcards: Flashcard[];
}

// Mock data

// 1. Auto-save Hook — debounce saves when `formData` changes
const useAutoSave = (formData: FormData, delay: number = 800) => {
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveCount, setSaveCount] = useState(0);

  const prevSavedSerializedRef = useRef<string | null>(null);
  const scheduledSerializedRef = useRef<string | null>(null);
  const scheduledDataRef = useRef<FormData | null>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const hasContent =
      formData.title ||
      formData.flashcards.some((card) => card.term || card.definition);

    if (!hasContent) return;

    const serialized = JSON.stringify(formData);

    // If already saved same content, do nothing
    if (prevSavedSerializedRef.current === serialized) return;

    // Schedule debounce save for latest formData
    scheduledSerializedRef.current = serialized;
    scheduledDataRef.current = formData;

    // Indicate pending save while debounce timer runs
    setIsSaving(true);

    if (timerRef.current) {
      clearTimeout(timerRef.current as unknown as number);
      timerRef.current = null;
    }

    timerRef.current = window.setTimeout(() => {
      try {
        const dataToSave = scheduledDataRef.current;
        if (!dataToSave) return;

        const draft = {
          data: dataToSave,
          timestamp: new Date().toISOString(),
          saveCount: saveCount + 1,
        };

        localStorage.setItem("flashcardDraft", JSON.stringify(draft));

        prevSavedSerializedRef.current = scheduledSerializedRef.current;

        setLastSaved(new Date());
        setSaveCount((prev) => {
          const next = prev + 1;
          // if (next % 3 === 0) {
          //   toast("Đang tự động lưu nháp...", { duration: 2000 });
          // }
          return next;
        });
      } catch (error) {
        console.error("Auto-save error:", error);
      } finally {
        setIsSaving(false);
        timerRef.current = null;
      }
    }, delay);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current as unknown as number);
        timerRef.current = null;
      }
    };
  }, [formData, delay, saveCount]);

  const recoverDraft = useCallback(() => {
    const draft = localStorage.getItem("flashcardDraft");
    if (draft) {
      try {
        const parsed = JSON.parse(draft);
        const timeDiff =
          new Date().getTime() - new Date(parsed.timestamp).getTime();
        const hoursDiff = timeDiff / (1000 * 60 * 60);

        if (hoursDiff < 24) {
          // Only recover drafts less than 24 hours old
          return parsed.data;
        } else {
          localStorage.removeItem("flashcardDraft");
        }
      } catch (error) {
        console.error("Error recovering draft:", error);
      }
    }
    return null;
  }, []);

  const clearDraft = useCallback(() => {
    localStorage.removeItem("flashcardDraft");
    setLastSaved(null);
    setSaveCount(0);
    toast.success("Đã xóa bản nháp");
  }, []);

  return { lastSaved, isSaving, recoverDraft, clearDraft, saveCount };
};

// 2. History Hook (Undo/Redo)
const useHistory = (initialState: FormData) => {
  const [history, setHistory] = useState<FormData[]>([initialState]);
  const historyRef = useRef<FormData[]>([initialState]);
  const indexRef = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const maxHistory = 50;

  const push = useCallback((state: FormData) => {
    setHistory((prev) => {
      const truncated = prev.slice(0, indexRef.current + 1);
      const newHistory = [...truncated, state];

      if (newHistory.length > maxHistory) {
        const sliced = newHistory.slice(-maxHistory);
        historyRef.current = sliced;
        indexRef.current = sliced.length - 1;
        setCurrentIndex(indexRef.current);
        return sliced;
      }

      historyRef.current = newHistory;
      indexRef.current = Math.min(indexRef.current + 1, maxHistory - 1);
      setCurrentIndex(indexRef.current);
      return newHistory;
    });
  }, []);

  const undo = useCallback(() => {
    if (indexRef.current > 0) {
      indexRef.current -= 1;
      setCurrentIndex(indexRef.current);
      return historyRef.current[indexRef.current];
    }
    return null;
  }, []);

  const redo = useCallback(() => {
    if (indexRef.current < historyRef.current.length - 1) {
      indexRef.current += 1;
      setCurrentIndex(indexRef.current);
      return historyRef.current[indexRef.current];
    }
    return null;
  }, []);

  const clearHistory = useCallback(() => {
    const initial = [initialState];
    historyRef.current = initial;
    indexRef.current = 0;
    setHistory(initial);
    setCurrentIndex(0);
  }, [initialState]);

  return {
    currentState: history[currentIndex],
    push,
    undo,
    redo,
    clearHistory,
    canUndo: currentIndex > 0,
    canRedo: currentIndex < history.length - 1,
    historySize: history.length,
    currentPosition: currentIndex + 1,
  };
};

// 3. Keyboard Shortcuts Hook
const useKeyboardShortcuts = ({
  onSave,
  onAddCard,
  onCloseModal,
  onUndo,
  onRedo,
  onImport,
}: {
  onSave: () => void;
  onAddCard: () => void;
  onCloseModal: () => void;
  onUndo: () => void;
  onRedo: () => void;
  onImport: () => void;
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + S: Lưu
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        onSave();
      }

      // Ctrl/Cmd + Enter: Thêm thẻ mới
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        onAddCard();
      }

      // Ctrl/Cmd + Z: Undo
      if ((e.ctrlKey || e.metaKey) && e.key === "z" && !e.shiftKey) {
        e.preventDefault();
        onUndo();
      }

      // Ctrl/Cmd + Shift + Z: Redo
      if ((e.ctrlKey || e.metaKey) && e.key === "z" && e.shiftKey) {
        e.preventDefault();
        onRedo();
      }

      // Ctrl/Cmd + I: Import
      if ((e.ctrlKey || e.metaKey) && e.key === "i") {
        e.preventDefault();
        onImport();
      }

      // Esc: Đóng modal
      if (e.key === "Escape") {
        onCloseModal();
      }

      // Alt + Arrow: Navigate between cards
      if (e.altKey && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
        e.preventDefault();
        // Navigation logic can be added here
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onSave, onAddCard, onCloseModal, onUndo, onRedo, onImport]);
};

// 4. Smart Validation Component

// Info icon component
const Info = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4" />
    <path d="M12 8h.01" />
  </svg>
);

// 5. Bulk Actions Component
const BulkActions: React.FC<{
  onImportCSV: (cards: Omit<Flashcard, "id" | "position">[]) => void;
  onDuplicateCards: (indices: number[]) => void;
  onDeleteCards: (indices: number[]) => void;
  onSelectAll: () => void;
  onClearSelection: () => void;
  selectedCards: number[];
  totalCards: number;
}> = ({
  onImportCSV,
  onDuplicateCards,
  onDeleteCards,
  onSelectAll,
  onClearSelection,
  selectedCards,
  totalCards,
}) => {
  const [showBulkMenu, setShowBulkMenu] = useState(false);
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [importMode, setImportMode] = useState<"csv" | "text" | "excel">("csv");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleCSVImport = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const csvData = e.target?.result as string;
      const rows = csvData.split("\n").filter((row) => row.trim());
      const importedCards = rows
        .slice(1)
        .map((row, index) => {
          const [term, definition] = row.split(",").map((cell) => cell.trim());
          return {
            term: term || "",
            definition: definition || "",
            mediaId: null,
            mediaPreview: null,
          };
        })
        .filter((card) => card.term || card.definition);

      if (importedCards.length > 0) {
        onImportCSV(importedCards);
        toast.success(`Đã import ${importedCards.length} thẻ từ CSV`);
        setShowImportDialog(false);
      } else {
        toast.error("Không tìm thấy dữ liệu hợp lệ trong file");
      }
    };
    reader.readAsText(file);
  };

  const handleTextImport = () => {
    const text = textAreaRef.current?.value;
    if (!text) {
      toast.error("Vui lòng nhập dữ liệu");
      return;
    }

    const lines = text.split("\n").filter((line) => line.trim());
    const importedCards = lines.map((line, index) => {
      const [term, definition] = line.split(":").map((part) => part.trim());
      return {
        term: term || `Thuật ngữ ${index + 1}`,
        definition: definition || `Định nghĩa ${index + 1}`,
        mediaId: null,
        mediaPreview: null,
      };
    });

    if (importedCards.length > 0) {
      onImportCSV(importedCards);
      toast.success(`Đã import ${importedCards.length} thẻ từ văn bản`);
      setShowImportDialog(false);
    }
  };

  const handleExampleLoad = () => {
    if (textAreaRef.current) {
      textAreaRef.current.value = `Hello: Xin chào\nGoodbye: Tạm biệt\nThank you: Cảm ơn\nPlease: Làm ơn\nSorry: Xin lỗi`;
      toast("Đã tải ví dụ mẫu");
    }
  };

  return (
    <>
      <div className="relative">
        <Button
          variant="outline"
          onClick={() => setShowBulkMenu(!showBulkMenu)}
          className="gap-2 relative"
          disabled={totalCards === 0}
        >
          <Grid3x3 className="w-4 h-4" />
          Hành động hàng loạt
          {selectedCards.length > 0 && (
            <Badge className="absolute -top-2 -right-2 bg-blue-600 text-white">
              {selectedCards.length}
            </Badge>
          )}
          <ChevronDown
            className={`w-4 h-4 transition-transform ${
              showBulkMenu ? "rotate-180" : ""
            }`}
          />
        </Button>

        {showBulkMenu && (
          <div className="absolute top-full mt-2 w-72 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 animate-in fade-in slide-in-from-top-2">
            <div className="p-2 space-y-1">
              {/* Selection Controls */}
              <div className="px-3 py-2 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    Đã chọn: {selectedCards.length}/{totalCards}
                  </span>
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={onSelectAll}
                      className="h-7 px-2 text-xs"
                    >
                      Chọn tất cả
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={onClearSelection}
                      className="h-7 px-2 text-xs"
                    >
                      Bỏ chọn
                    </Button>
                  </div>
                </div>
              </div>

              {/* Import Options */}
              <button
                className="w-full flex items-center gap-3 p-3 hover:bg-blue-50 rounded-lg transition-colors group"
                onClick={() => {
                  setShowImportDialog(true);
                  setShowBulkMenu(false);
                }}
              >
                <UploadCloud className="w-4 h-4 text-blue-600 group-hover:scale-110 transition-transform" />
                <div className="text-left flex-1">
                  <p className="font-medium text-gray-900">Import nhiều thẻ</p>
                  <p className="text-xs text-gray-500">
                    CSV, Excel, hoặc văn bản
                  </p>
                </div>
                <Badge variant="outline" className="text-xs">
                  Mới
                </Badge>
              </button>

              {/* Duplicate */}
              <button
                className="w-full flex items-center gap-3 p-3 hover:bg-green-50 rounded-lg transition-colors group disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => {
                  onDuplicateCards(selectedCards);
                  setShowBulkMenu(false);
                }}
                disabled={selectedCards.length === 0}
              >
                <Copy className="w-4 h-4 text-green-600 group-hover:scale-110 transition-transform" />
                <div className="text-left flex-1">
                  <p className="font-medium text-gray-900">
                    Sao chép thẻ đã chọn
                  </p>
                  <p className="text-xs text-gray-500">
                    Tạo bản sao của {selectedCards.length} thẻ
                  </p>
                </div>
              </button>

              {/* Export */}
              <button
                className="w-full flex items-center gap-3 p-3 hover:bg-purple-50 rounded-lg transition-colors"
                onClick={() => {
                  // Export logic here
                  toast("Tính năng export đang được phát triển");
                  setShowBulkMenu(false);
                }}
              >
                <Download className="w-4 h-4 text-purple-600" />
                <div className="text-left flex-1">
                  <p className="font-medium text-gray-900">
                    Export thẻ đã chọn
                  </p>
                  <p className="text-xs text-gray-500">Xuất ra CSV hoặc PDF</p>
                </div>
              </button>

              {/* Delete */}
              <button
                className="w-full flex items-center gap-3 p-3 hover:bg-red-50 rounded-lg transition-colors text-red-600 group disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => {
                  if (selectedCards.length > 0) {
                    onDeleteCards(selectedCards);
                    setShowBulkMenu(false);
                  }
                }}
                disabled={selectedCards.length === 0}
              >
                <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <div className="text-left flex-1">
                  <p className="font-medium">Xóa thẻ đã chọn</p>
                  <p className="text-xs opacity-80">
                    {selectedCards.length} thẻ sẽ bị xóa
                  </p>
                </div>
              </button>
            </div>

            <div className="p-2 border-t border-gray-100">
              <div className="text-xs text-gray-500 px-2">
                <p>Tip: Giữ Ctrl/Cmd để chọn nhiều thẻ</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Import Dialog */}
      <Dialog open={showImportDialog} onOpenChange={setShowImportDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <UploadCloud className="w-5 h-5 text-blue-600" />
              Import nhiều thẻ
            </DialogTitle>
            <DialogDescription>
              Import hàng loạt thẻ flashcard từ file hoặc văn bản
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Import Mode Selection */}
            <div className="grid grid-cols-3 gap-2">
              {[
                {
                  id: "csv",
                  label: "CSV File",
                  icon: FileSpreadsheet,
                  desc: "File .csv với cột term,definition",
                },
                {
                  id: "text",
                  label: "Văn bản",
                  icon: FileText,
                  desc: "Mỗi dòng: term: definition",
                },
                {
                  id: "excel",
                  label: "Excel",
                  icon: Columns,
                  desc: "File .xlsx hoặc .xls",
                },
              ].map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => setImportMode(mode.id as any)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    importMode === mode.id
                      ? "border-blue-500 bg-blue-50 scale-105"
                      : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <mode.icon
                      className={`w-6 h-6 ${
                        importMode === mode.id
                          ? "text-blue-600"
                          : "text-gray-600"
                      }`}
                    />
                    <span className="font-medium text-sm">{mode.label}</span>
                    <span className="text-xs text-gray-500 text-center">
                      {mode.desc}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Import Content */}
            {importMode === "csv" && (
              <div className="space-y-4">
                <div
                  className="border-3 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <UploadCloud className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="font-medium text-gray-900 mb-2">
                    Kéo thả file CSV vào đây
                  </p>
                  <p className="text-sm text-gray-600 mb-4">
                    hoặc click để chọn file
                  </p>
                  <Button variant="outline">Chọn file CSV</Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".csv,.txt"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleCSVImport(file);
                    }}
                  />
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm font-medium text-gray-900 mb-2">
                    Định dạng CSV:
                  </p>
                  <pre className="text-xs bg-white p-3 rounded border border-gray-200 overflow-x-auto">
                    term,definition{"\n"}Hello,Xin chào{"\n"}Goodbye,Tạm biệt
                  </pre>
                </div>
              </div>
            )}

            {importMode === "text" && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Nhập hoặc dán dữ liệu:</Label>
                  <Textarea
                    ref={textAreaRef}
                    placeholder="Hello: Xin chào
Goodbye: Tạm biệt
Thank you: Cảm ơn"
                    className="min-h-[200px] font-mono text-sm"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleExampleLoad}
                  >
                    Tải ví dụ mẫu
                  </Button>
                  <Button onClick={handleTextImport}>Import dữ liệu</Button>
                </div>
              </div>
            )}

            {importMode === "excel" && (
              <div className="text-center py-8">
                <FileSpreadsheet className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">
                  Tính năng import Excel đang được phát triển
                </p>
                <p className="text-sm text-gray-500">
                  Vui lòng sử dụng định dạng CSV tạm thời
                </p>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowImportDialog(false)}
            >
              Đóng
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

// 6. Import Modal Component
const ImportQuizletModal: React.FC<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImport: (flashcards: Omit<Flashcard, "id" | "position">[]) => void;
}> = ({ open, onOpenChange, onImport }) => {
  const [importUrl, setImportUrl] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isImporting, setIsImporting] = useState(false);

  const validateQuizletUrl = useCallback((url: string) => {
    return (
      url.includes("quizlet.com") && (url.includes("/") || url.includes("?"))
    );
  }, []);

  const handleImport = async () => {
    if (!importUrl.trim()) {
      toast.error("Vui lòng nhập đường link Quizlet");
      return;
    }

    if (!validateQuizletUrl(importUrl)) {
      toast.error("Link Quizlet không hợp lệ. Vui lòng kiểm tra lại.");
      return;
    }

    if (!acceptTerms) {
      toast.error("Vui lòng chấp nhận điều khoản sử dụng");
      return;
    }

    setIsImporting(true);

    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock data
      const mockFlashcards = [
        { term: "Hello", definition: "Xin chào" },
        { term: "Goodbye", definition: "Tạm biệt" },
        { term: "Thank you", definition: "Cảm ơn" },
        { term: "Please", definition: "Làm ơn" },
        { term: "Sorry", definition: "Xin lỗi" },
      ];

      const importedFlashcards = mockFlashcards.map((item, index) => ({
        term: item.term || "",
        definition: item.definition || "",
        mediaId: null,
        mediaPreview: null,
      }));

      onImport(importedFlashcards);
      toast.success(`Đã import thành công ${importedFlashcards.length} thẻ`);

      // Reset form
      setImportUrl("");
      setAcceptTerms(false);
      onOpenChange(false);
    } catch (error) {
      console.error("Import error:", error);
      toast.error("Import thất bại. Vui lòng thử lại.");
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
              <Import className="w-5 h-5 text-white" />
            </div>
            <div>
              <DialogTitle className="text-xl">Import từ Quizlet</DialogTitle>
              <DialogDescription>
                Import bộ flashcard từ Quizlet bằng đường link
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* URL Input */}
          <div className="space-y-3">
            <Label htmlFor="quizlet-url" className="text-sm font-medium">
              Đường link Quizlet
              <span className="text-red-500 ml-1">*</span>
            </Label>
            <div className="relative">
              <ExternalLink className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                id="quizlet-url"
                placeholder="https://quizlet.com/..."
                value={importUrl}
                onChange={(e) => setImportUrl(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
            {importUrl && !validateQuizletUrl(importUrl) && (
              <p className="text-xs text-amber-600 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" />
                Link Quizlet không hợp lệ. Vui lòng kiểm tra lại.
              </p>
            )}
            <p className="text-xs text-gray-500">
              Ví dụ: https://quizlet.com/12345678/title
            </p>
          </div>

          {/* Terms and Conditions */}
          <div className="space-y-3 border border-gray-200 rounded-lg p-4 bg-gray-50">
            <div className="flex items-start gap-3">
              <Checkbox
                id="terms"
                checked={acceptTerms}
                onCheckedChange={(checked) =>
                  setAcceptTerms(checked as boolean)
                }
                className="mt-0.5"
              />
              <div className="space-y-2">
                <Label
                  htmlFor="terms"
                  className="text-sm font-medium cursor-pointer"
                >
                  Tôi đồng ý với các điều khoản sau:
                </Label>
                <ul className="space-y-2 text-xs text-gray-600">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-1" />
                    <span>
                      Việc import chỉ phục vụ mục đích học tập cá nhân
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-1" />
                    <span>
                      Không sử dụng cho mục đích thương mại hoặc phân phối lại
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-1" />
                    <span>
                      Người dùng tự chịu trách nhiệm về bản quyền và tuân thủ
                      các quy định của Quizlet
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-1" />
                    <span>
                      Chúng tôi không chịu trách nhiệm pháp lí về nội dung được
                      import
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Preview (optional) */}
          {validateQuizletUrl(importUrl) && acceptTerms && (
            <div className="border border-green-200 rounded-lg p-4 bg-green-50">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-800">
                  Đã sẵn sàng import
                </span>
              </div>
              <p className="text-xs text-green-700">
                Link hợp lệ. Bấm Import để thêm flashcard vào bộ học của bạn.
              </p>
            </div>
          )}
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={() => {
              onOpenChange(false);
              setImportUrl("");
              setAcceptTerms(false);
            }}
            className="w-full sm:w-auto"
          >
            Hủy
          </Button>
          <Button
            onClick={handleImport}
            disabled={
              !validateQuizletUrl(importUrl) || !acceptTerms || isImporting
            }
            className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            {isImporting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Đang import...
              </>
            ) : (
              <>
                <Import className="w-4 h-4 mr-2" />
                Import
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// 7. Main Component với tất cả tính năng
export default function CreateFlashcardPage() {
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

  const [formData, setFormData] = useState<FormData>({
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
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});
  const titleRef = useRef<HTMLInputElement | null>(null);
  const flashcardFieldRefs = useRef<{
    [cardId: string]: {
      term?: HTMLTextAreaElement | null;
      definition?: HTMLTextAreaElement | null;
    };
  }>({});

  const [showDraftDialog, setShowDraftDialog] = useState(false);
  const draftCandidateRef = useRef<FormData | null>(null);
  const [deletedCardCache, setDeletedCardCache] = useState<{
    card: Flashcard;
    index: number;
    timestamp: number;
  } | null>(null);

  // Initialize hooks
  const { lastSaved, isSaving, recoverDraft, clearDraft, saveCount } =
    useAutoSave(formData, 1000);
  const history = useHistory(formData);

  // Recover draft on mount — show AlertDialog to choose
  useEffect(() => {
    const draft = recoverDraft();
    if (draft) {
      // keep candidate in ref and open dialog
      draftCandidateRef.current = draft;
      setShowDraftDialog(true);
    }
  }, [recoverDraft]);
  // Update form data with history tracking
  const updateFormData = useCallback(
    (newData: FormData) => {
      setFormData(newData);
      history.push(newData);
    },
    [history]
  );

  const handleInputChange = (field: keyof FormData, value: any) => {
    // Enforce max lengths for title and description to guard against
    // inputs that bypass native `maxLength` (IMEs, programmatic updates, etc.)
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

  // Undo/Redo handlers
  const handleUndo = () => {
    const previousState = history.undo();
    if (previousState) {
      setFormData(previousState);
      showUndoToast("Đã hoàn tác", () => handleRedo());
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

  // Bulk actions handlers
  const handleSelectAll = () => {
    setSelectedCards(
      Array.from({ length: formData.flashcards.length }, (_, i) => i)
    );
  };

  const handleClearSelection = () => {
    setSelectedCards([]);
  };

  const handleBulkImport = (
    importedCards: Omit<Flashcard, "id" | "position">[]
  ) => {
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

  // Existing functions (updated)
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
    toast.success("Đã thêm thẻ mới");
  };

  const handleDeleteCard = (index: number) => {
    const card = formData.flashcards[index];

    // Cache thẻ bị xóa (phục vụ undo)
    setDeletedCardCache({
      card,
      index,
      timestamp: Date.now(),
    });

    // Cập nhật danh sách thẻ
    const updatedCards = formData.flashcards.filter((_, i) => i !== index);

    // Cập nhật vị trí
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
    toast(
      <div className="flex items-center justify-between">
        <span>Đã xóa thẻ #{index + 1}</span>
        <button
          onClick={() => handleUndoDelete()}
          className="ml-4 text-blue-600 hover:text-blue-800 font-medium text-sm"
        >
          Hoàn tác
        </button>
      </div>,
      {
        duration: 5000,
      }
    );
  };

  const handleUndoDelete = () => {
    if (!deletedCardCache) return;

    const { card, index } = deletedCardCache;

    // Khôi phục thẻ
    const updatedCards = [...formData.flashcards];
    updatedCards.splice(index, 0, card);

    // Cập nhật vị trí tất cả thẻ
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

    // Hiển thị thông báo
    toast.success(`Đã khôi phục thẻ #${index + 1}`);
  };
  const handleImportFromQuizlet = (
    importedFlashcards: Omit<Flashcard, "id" | "position">[]
  ) => {
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

  const removeFlashcard = (index: number) => {
    if (formData.flashcards.length <= 2) {
      toast.error("Bộ flashcard cần ít nhất 2 thẻ");
      return;
    }
    const cardId = formData.flashcards[index].id;

    showUndoToast("Đã xóa thẻ", () => {
      const restoredCards = [...formData.flashcards];
      restoredCards.splice(index, 0, {
        ...formData.flashcards[index],
        id: cardId,
      });
      restoredCards.forEach((card, i) => (card.position = i));
      updateFormData({ ...formData, flashcards: restoredCards });
      setExpandedCards((prev) => new Set([...prev, cardId]));
    });

    const updatedCards = formData.flashcards.filter((_, i) => i !== index);
    updatedCards.forEach((card, i) => (card.position = i));
    updateFormData({ ...formData, flashcards: updatedCards });
    setExpandedCards((prev) => {
      const newSet = new Set(prev);
      newSet.delete(cardId);
      return newSet;
    });
    setSelectedCards(
      selectedCards
        .filter((i) => i !== index)
        .map((i) => (i > index ? i - 1 : i))
    );
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
      saveCount: saveCount + 1,
    };

    localStorage.setItem("flashcardDraft", JSON.stringify(draft));
    toast.success("Đã lưu nháp thành công");
  };

  // Handle dialog actions for draft
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
      // focus title and scroll
      titleRef.current?.focus();
      titleRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      toast.error("Vui lòng nhập tiêu đề cho bộ flashcard");
      return;
    }

    if (emptyCards.length > 0) {
      // find first incomplete card and focus the missing field
      const idx = formData.flashcards.findIndex(
        (c) => !c.term.trim() || !c.definition.trim()
      );
      if (idx !== -1) {
        const card = formData.flashcards[idx];
        // ensure expanded
        setExpandedCards((prev) => new Set([...prev, card.id]));
        // focus appropriate field after DOM updates
        requestAnimationFrame(() => {
          const refs = flashcardFieldRefs.current[card.id];
          if (!card.term.trim()) {
            refs?.term?.focus();
            refs?.term?.scrollIntoView({ behavior: "smooth", block: "center" });
          } else if (!card.definition.trim()) {
            refs?.definition?.focus();
            refs?.definition?.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          }
        });
      }

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

  // Helper functions
  const showUndoToast = (message: string, undoAction: () => void) => {
    toast.custom(
      (t) => (
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-xl animate-in slide-in-from-right">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
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

  const selectedTopic = topics.find((t) => t.id === formData.topicId);
  const selectedFolder = folders.find((f) => f.id === formData.folderSetId);

  const SelectedIcon =
    iconOptions.find((opt) => opt.value === formData.icon)?.icon || Book;

  // Get unique categories from icon options
  const iconCategories = Array.from(
    new Set(iconOptions.map((icon) => icon.category))
  );

  // Filter icons by selected category
  const filteredIcons = iconOptions.filter(
    (icon) => icon.category === selectedIconCategory
  );

  // Handle card selection
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/80">
      {/* Header Section - Tối ưu padding và shadow */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-end">
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-4">
                {/* Auto-save status */}
                <div className="flex items-center gap-2 text-sm">
                  {isSaving ? (
                    <div className="flex items-center gap-2 text-amber-600">
                      <Loader2 className="w-3 h-3 animate-spin" />
                      <span className="font-medium">Đang lưu...</span>
                    </div>
                  ) : lastSaved ? (
                    <div className="flex items-center gap-2 text-green-600">
                      <Check className="w-3 h-3" />
                      <span className="font-medium">Đã lưu</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span>Chưa lưu</span>
                    </div>
                  )}
                </div>

                {/* Undo/Redo controls */}
                <div className="flex items-center gap-1 border border-gray-200 rounded-lg p-1 bg-white/80 backdrop-blur-sm">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleUndo}
                    disabled={!history.canUndo}
                    className="h-8 w-8 p-0 hover:bg-gray-100/80"
                    title="Hoàn tác (Ctrl+Z)"
                  >
                    <Undo className="w-4 h-4" />
                  </Button>
                  <div className="w-px h-4 bg-gray-200/60" />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleRedo}
                    disabled={!history.canRedo}
                    className="h-8 w-8 p-0 hover:bg-gray-100/80"
                    title="Làm lại (Ctrl+Shift+Z)"
                  >
                    <Redo className="w-4 h-4" />
                  </Button>
                </div>

                {/* Progress indicator */}
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {completedCards}/{totalCards} thẻ
                    </p>
                    <div className="w-32 h-1.5 bg-gray-200/80 rounded-full overflow-hidden mt-1">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500 rounded-full"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                  <Badge
                    variant="secondary"
                    className="font-medium bg-gradient-to-r from-blue-50/80 to-indigo-50/80 text-blue-700 border border-blue-200/60 backdrop-blur-sm"
                  >
                    <BookOpen className="w-3 h-3 mr-1" />
                    Bản nháp
                  </Badge>
                </div>
              </div>
            </div>
            <Button variant="outline" onClick={handleSubmit}>
              Tạo bộ flashcard
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Success Message - Tối ưu shadow và animation */}
        {showSuccess && (
          <div className="mb-5 animate-in fade-in slide-in-from-top duration-300">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50/80 border border-green-200 rounded-xl p-4 shadow-lg backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center shadow">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-green-900">
                    Tạo thành công!
                  </h3>
                  <p className="text-sm text-green-700/90 mt-0.5">
                    Bộ flashcard "
                    <span className="font-medium">{formData.title}</span>" đã
                    được tạo.
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-green-300/80 text-green-700 hover:bg-green-50/80 h-8"
                  onClick={() => setShowSuccess(false)}
                >
                  Đóng
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Import Modal */}
        <ImportQuizletModal
          open={showImportModal}
          onOpenChange={setShowImportModal}
          onImport={handleImportFromQuizlet}
        />

        <div className="space-y-5">
          {/* Basic Info Card với spacing tối ưu */}
          <Card className="border border-gray-200/80 shadow-lg bg-white/95 backdrop-blur-sm rounded-2xl overflow-hidden">
            <CardHeader className="pb-4 border-b border-gray-100/80 bg-gradient-to-r from-gray-50/50 to-white/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-bold text-gray-900">
                      Thông tin cơ bản
                    </CardTitle>
                    <CardDescription className="text-gray-600/90 text-sm">
                      Thiết lập thông tin và giao diện cho bộ flashcard
                    </CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-5 space-y-6">
              {/* Icon and Color Selection - Tối ưu spacing */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                      <Palette className="w-4 h-4 text-blue-600" />
                      Biểu tượng và màu sắc
                    </Label>
                    <p className="text-sm text-gray-600/90 mt-1">
                      Tùy chỉnh icon và màu sắc
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowIconPicker(!showIconPicker)}
                    className="text-blue-600 hover:text-blue-700 hover:bg-blue-50/50 h-8"
                  >
                    {showIconPicker ? (
                      <>
                        <ChevronDown className="w-4 h-4 mr-1.5 rotate-180" />
                        Thu gọn
                      </>
                    ) : (
                      <>
                        <LayoutGrid className="w-4 h-4 mr-1.5" />
                        Chọn biểu tượng
                      </>
                    )}
                  </Button>
                </div>

                {/* Current Selection Preview */}
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50/40 to-indigo-50/40 rounded-xl border border-blue-100/60">
                  <div className="flex items-center gap-4">
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center shadow"
                      style={{ background: formData.iconColor }}
                    >
                      <SelectedIcon className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">
                        Biểu tượng đã chọn
                      </p>
                      <p className="text-sm text-gray-600/90 mt-0.5">
                        Icon sẽ xuất hiện trên thẻ
                      </p>
                    </div>
                  </div>
                  <Badge className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-2.5 py-1 text-xs">
                    {
                      iconOptions.find((opt) => opt.value === formData.icon)
                        ?.label
                    }
                  </Badge>
                </div>

                {/* Icon Picker */}
                {showIconPicker && (
                  <div className="space-y-4 animate-in fade-in duration-300">
                    {/* Icon Categories */}
                    <div className="space-y-3">
                      <Label className="text-sm font-medium text-gray-700">
                        Danh mục biểu tượng
                      </Label>
                      <div className="flex flex-wrap gap-2">
                        {iconCategories.map((category) => (
                          <button
                            key={category}
                            type="button"
                            onClick={() => setSelectedIconCategory(category)}
                            className={`px-3 py-1.5 rounded-lg transition-all duration-200 text-sm font-medium ${
                              selectedIconCategory === category
                                ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow"
                                : "bg-gray-100/80 text-gray-700 hover:bg-gray-200/80 shadow-sm"
                            }`}
                          >
                            {category}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Icon Grid - Tối ưu grid spacing */}
                    <div className="space-y-3">
                      <Label className="text-sm font-medium text-gray-700">
                        Chọn biểu tượng
                      </Label>
                      <div className="grid grid-cols-5 sm:grid-cols-6 gap-2 p-3 bg-gray-50/50 rounded-xl">
                        {filteredIcons.map((option) => {
                          const Icon = option.icon;
                          const isSelected = formData.icon === option.value;
                          return (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() =>
                                handleInputChange("icon", option.value)
                              }
                              className={`relative p-2 rounded-lg border transition-all duration-200 group ${
                                isSelected
                                  ? "border-blue-500 bg-gradient-to-br from-blue-50/80 to-blue-100/80 shadow scale-105"
                                  : "border-gray-200/80 bg-white/80 hover:border-blue-300/80 hover:shadow-sm"
                              }`}
                              title={option.label}
                            >
                              <div
                                className="w-9 h-9 rounded-lg flex items-center justify-center mx-auto mb-1.5 transition-all group-hover:scale-105"
                                style={{ background: formData.iconColor }}
                              >
                                <Icon className="w-4 h-4 text-white" />
                              </div>
                              <span className="text-xs text-gray-600 truncate block text-center leading-tight">
                                {option.label}
                              </span>
                              {isSelected && (
                                <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow">
                                  <Check className="w-2.5 h-2.5 text-white" />
                                </div>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Gradient Color Selection */}
                    <div className="space-y-3">
                      <Label className="text-sm font-medium text-gray-700">
                        Màu gradient cho icon
                      </Label>
                      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2">
                        {gradientOptions.map((gradient) => {
                          const isSelected =
                            formData.iconColor === gradient.value;
                          return (
                            <button
                              key={gradient.value}
                              type="button"
                              onClick={() =>
                                handleInputChange("iconColor", gradient.value)
                              }
                              className={`relative aspect-square rounded-lg border-2 transition-all duration-200 hover:scale-105 group ${
                                isSelected
                                  ? "border-gray-900 shadow-lg scale-105"
                                  : "border-white/80 hover:border-gray-300/80 shadow-sm hover:shadow"
                              }`}
                              style={{ background: gradient.value }}
                              title={gradient.label}
                            >
                              {isSelected && (
                                <div className="absolute inset-0 bg-black/10 rounded-lg" />
                              )}
                              {isSelected && (
                                <Check className="absolute inset-0 m-auto w-4 h-4 text-white drop-shadow" />
                              )}
                              <div
                                className={`absolute bottom-0 left-0 right-0 text-[10px] py-1 px-1 rounded-b-lg truncate transition-all ${
                                  isSelected
                                    ? "bg-black/80 text-white"
                                    : "bg-white/90 backdrop-blur-sm text-gray-800 opacity-0 group-hover:opacity-100"
                                }`}
                              >
                                {gradient.label}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Title and Description */}
              <div className="space-y-5">
                {/* Title */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-blue-600" />
                      Tiêu đề bộ flashcard
                      <span className="text-red-500">*</span>
                    </Label>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        formData.title.length > 90
                          ? "bg-amber-100/80 text-amber-800"
                          : "bg-gray-100/80 text-gray-600"
                      }`}
                    >
                      {formData.title.length}/100
                    </span>
                  </div>
                  <Input
                    placeholder="Ví dụ: Từ vựng TOEIC cơ bản, Hóa học lớp 12, ..."
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    ref={titleRef}
                    maxLength={100}
                    className="h-11 border-gray-300/80 focus:border-blue-500 focus:ring-blue-500/20 text-base placeholder:text-gray-400/90 rounded-xl"
                  />
                  {formData.title.length > 90 && (
                    <p className="text-xs text-amber-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      Tiêu đề sắp đạt giới hạn
                    </p>
                  )}
                </div>

                {/* Description */}
                <div className="space-y-2.5">
                  <Label className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-blue-600" />
                    Mô tả (Tùy chọn)
                  </Label>
                  <Textarea
                    placeholder="Mô tả nội dung, mục tiêu học tập hoặc lưu ý đặc biệt..."
                    value={formData.description}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                    maxLength={500}
                    className="min-h-[100px] resize-none border-gray-300/80 focus:border-blue-500 focus:ring-blue-500/20 placeholder:text-gray-400/90 rounded-xl text-sm"
                  />
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-500/90">
                      Mô tả chi tiết giúp người học hiểu rõ hơn về nội dung
                    </p>
                    <p
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        formData.description.length > 450
                          ? "bg-amber-100/80 text-amber-800"
                          : "bg-gray-100/80 text-gray-600"
                      }`}
                    >
                      {formData.description.length}/100
                    </p>
                  </div>
                </div>
              </div>

              {/* Topic and Folder Selection */}
              <div className="grid md:grid-cols-2 gap-5">
                <div className="space-y-2.5">
                  <Label className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                    <Tag className="w-4 h-4 text-blue-600" />
                    Chủ đề
                  </Label>

                  <Select
                    value={formData.topicId}
                    onValueChange={(value) =>
                      handleInputChange("topicId", value)
                    }
                  >
                    <SelectTrigger className="h-11 px-4 border border-gray-300/80 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 bg-white/80 text-gray-900 hover:border-gray-400/80 transition-colors text-sm">
                      <SelectValue placeholder="Chọn chủ đề phù hợp" />
                    </SelectTrigger>

                    <SelectContent>
                      {topics.map((topic) => (
                        <SelectItem key={topic.id} value={topic.id}>
                          {topic.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {!formData.topicId && (
                    <p className="text-sm text-gray-500 italic">
                      Chưa chọn chủ đề
                    </p>
                  )}
                </div>

                <div className="space-y-2.5">
                  <Label className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                    <FolderOpen className="w-4 h-4 text-blue-600" />
                    Thư mục
                  </Label>

                  <Select
                    value={formData.folderSetId || "none"}
                    onValueChange={(value) =>
                      handleInputChange(
                        "folderSetId",
                        value === "none" ? "" : value
                      )
                    }
                  >
                    <SelectTrigger className="h-11 px-4 border border-gray-300/80 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 bg-white/80 text-gray-900 hover:border-gray-400/80 transition-colors text-sm">
                      <SelectValue placeholder="Chọn thư mục lưu trữ">
                        {formData.folderSetId
                          ? (() => {
                              const folder = folders.find(
                                (f) => f.id === formData.folderSetId
                              );
                              return folder
                                ? `${folder.name} (${folder.count} sets)`
                                : "Chọn thư mục lưu trữ";
                            })()
                          : "Chọn thư mục lưu trữ"}
                      </SelectValue>
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="none">Chọn thư mục lưu trữ</SelectItem>
                      {folders.map((folder) => (
                        <SelectItem key={folder.id} value={folder.id}>
                          <div className="flex items-center justify-between w-full">
                            <span>{folder.name}</span>
                            <span className="text-xs text-gray-500 ml-2">
                              ({folder.count} sets)
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Privacy Settings */}
              <div className="pt-5 border-t border-gray-100/80">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50/50 to-gray-100/30 rounded-xl border border-gray-200/60">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-100/80 to-blue-50/80 flex items-center justify-center">
                        {formData.isPublic ? (
                          <Globe className="w-4 h-4 text-blue-600" />
                        ) : (
                          <Lock className="w-4 h-4 text-gray-600" />
                        )}
                      </div>
                      <div>
                        <Label className="text-sm font-semibold text-gray-900">
                          Quyền riêng tư
                        </Label>
                        <div className="flex items-center gap-2 mt-0.5">
                          {formData.isPublic ? (
                            <Badge className="bg-gradient-to-r from-blue-100/80 to-blue-50/80 text-blue-700 border border-blue-200/60 text-xs">
                              <Globe className="w-3 h-3 mr-1" />
                              Công khai
                            </Badge>
                          ) : (
                            <Badge className="bg-gradient-to-r from-gray-100/80 to-gray-50/80 text-gray-700 border border-gray-300/60 text-xs">
                              <Lock className="w-3 h-3 mr-1" />
                              Riêng tư
                            </Badge>
                          )}
                          <span className="text-xs text-gray-500/90">
                            {formData.isPublic
                              ? "Ai cũng có thể xem và học"
                              : "Chỉ bạn mới có thể xem"}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600/90 max-w-lg">
                      {formData.isPublic
                        ? "Mọi người có thể tìm thấy, xem và học bộ flashcard này. Các hình ảnh trong thẻ cũng sẽ hiển thị và sử dụng công khai."
                        : "Chỉ bạn mới có thể xem và học bộ flashcard này."}
                    </p>
                  </div>
                  <Switch
                    checked={formData.isPublic}
                    onCheckedChange={(checked) =>
                      handleInputChange("isPublic", checked)
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Flashcards Section */}
          <div className="space-y-4">
            {/* Section Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  Flashcards{" "}
                  <span className="text-gray-500 font-normal">
                    ({totalCards})
                  </span>
                </h2>
                <p className="text-gray-500 text-xs mt-0.5">
                  Kéo thả để sắp xếp • Click để chọn • Double click để mở rộng
                </p>
              </div>

              <div className="flex items-center gap-2">
                <BulkActions
                  onImportCSV={handleBulkImport}
                  onDuplicateCards={handleBulkDuplicate}
                  onDeleteCards={handleBulkDelete}
                  onSelectAll={handleSelectAll}
                  onClearSelection={handleClearSelection}
                  selectedCards={selectedCards}
                  totalCards={totalCards}
                />
                <Button
                  onClick={() => setShowImportModal(true)}
                  variant="outline"
                  size="sm"
                  className="border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-700 h-9"
                >
                  <Import className="w-3.5 h-3.5 mr-1.5" />
                  Import
                </Button>
                <Button
                  onClick={addFlashcard}
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 text-white h-9"
                >
                  <Plus className="w-3.5 h-3.5 mr-1.5" />
                  Thêm thẻ
                </Button>
              </div>
            </div>

            {/* Flashcards List */}
            <div className="space-y-2">
              {formData.flashcards.map((card, index) => (
                <div
                  key={card.id}
                  draggable
                  onDragStart={() => handleDragStart(index)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDrop={(e) => handleDrop(e, index)}
                  onDragEnd={handleDragEnd}
                  className={`transition-all duration-150 ${
                    draggedIndex === index ? "opacity-30 scale-[0.99]" : ""
                  } ${
                    dragOverIndex === index
                      ? "scale-[1.005] ring-2 ring-blue-400"
                      : ""
                  }`}
                >
                  <Card
                    className={`border overflow-hidden transition-all duration-150 cursor-pointer hover:shadow-sm ${
                      dragOverIndex === index
                        ? "border-blue-400 shadow-md"
                        : card.term && card.definition
                        ? "border-green-200 bg-green-50/30"
                        : "border-gray-200 hover:border-gray-300"
                    } ${
                      selectedCards.includes(index)
                        ? "ring-2 ring-blue-400 bg-blue-50/30"
                        : ""
                    }`}
                  >
                    {/* Card Header - Click để chọn, Double Click để expand */}
                    <div
                      className="px-4 py-3 transition-colors border-b border-gray-100 group"
                      onClick={(e) => handleCardSelect(index, e as any)}
                      onDoubleClick={() => toggleCardExpand(card.id)}
                    >
                      <div className="flex items-center justify-between gap-3">
                        {/* Left Section */}
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          {/* Drag Handle */}
                          <GripVertical
                            className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-move flex-shrink-0"
                            onClick={(e) => e.stopPropagation()}
                            onDoubleClick={(e) => e.stopPropagation()}
                          />

                          {/* Card Number */}
                          <span className="text-sm font-bold text-gray-600 flex-shrink-0 w-8">
                            #{index + 1}
                          </span>

                          {/* Card Content Preview */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              {card.term ? (
                                <span className="text-sm font-medium text-gray-800 truncate">
                                  {card.term}
                                </span>
                              ) : (
                                <span className="text-sm text-gray-400 italic">
                                  Chưa có thuật ngữ
                                </span>
                              )}
                              {/* Selection Indicator */}
                              {selectedCards.includes(index) && (
                                <span className="flex-shrink-0">
                                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Right Section - Status & Controls */}
                        <div className="flex items-center gap-2 flex-shrink-0">
                          {/* Delete Button - Hiển thị khi hover */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteCard(index);
                            }}
                            className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1.5 hover:bg-red-50 hover:text-red-600 rounded-md text-gray-400"
                            title="Xóa thẻ này"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>

                          {/* Status Badges */}
                          <div className="flex items-center gap-1.5">
                            {card.mediaPreview && (
                              <Badge
                                variant="outline"
                                className="bg-blue-50 text-blue-700 border-blue-200 text-xs px-2 h-6"
                              >
                                <ImageIcon className="w-3 h-3 mr-1" />
                                Ảnh
                              </Badge>
                            )}

                            {card.term && card.definition ? (
                              <Badge className="bg-green-100 text-green-700 border-green-200 text-xs px-2 h-6">
                                <Check className="w-3 h-3 mr-1" />
                                Hoàn thành
                              </Badge>
                            ) : (
                              <Badge
                                variant="outline"
                                className="bg-amber-50 text-amber-700 border-amber-200 text-xs px-2 h-6"
                              >
                                <AlertCircle className="w-3 h-3 mr-1" />
                                Thiếu thông tin
                              </Badge>
                            )}
                          </div>

                          {/* Expand Toggle */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleCardExpand(card.id);
                            }}
                            className="p-1.5 hover:bg-gray-200/60 rounded-md transition-colors flex items-center gap-1.5"
                            title={
                              expandedCards.has(card.id) ? "Thu gọn" : "Mở rộng"
                            }
                          >
                            <span className="text-xs text-gray-500">
                              {expandedCards.has(card.id)
                                ? "Thu gọn"
                                : "Mở rộng"}
                            </span>
                            <ChevronDown
                              className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                                expandedCards.has(card.id) ? "rotate-180" : ""
                              }`}
                            />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Expandable Content */}
                    {expandedCards.has(card.id) && (
                      <CardContent className="p-4 bg-gray-50/30 border-t border-gray-100">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                          {/* Term Section */}
                          <div className="lg:col-span-5 space-y-2">
                            <div className="flex items-center justify-between">
                              <Label className="text-sm font-semibold text-gray-700">
                                Thuật ngữ
                              </Label>
                              <div className="flex items-center gap-2">
                                {!card.term.trim() && (
                                  <span className="text-xs text-red-600 flex items-center gap-1">
                                    <AlertCircle className="w-3 h-3" />
                                    Bắt buộc
                                  </span>
                                )}
                              </div>
                            </div>
                            <Textarea
                              placeholder="Nhập thuật ngữ, từ khóa hoặc câu hỏi..."
                              value={card.term}
                              onChange={(e) =>
                                handleFlashcardChange(
                                  index,
                                  "term",
                                  e.target.value
                                )
                              }
                              ref={(el) => {
                                flashcardFieldRefs.current[card.id] = {
                                  ...(flashcardFieldRefs.current[card.id] ||
                                    {}),
                                  term: el,
                                };
                              }}
                              className={`min-h-[120px] resize-none text-sm rounded-lg ${
                                !card.term.trim()
                                  ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
                                  : "border-gray-300 focus:border-blue-500 focus:ring-blue-500/20"
                              }`}
                              autoFocus={expandedCards.has(card.id)}
                            />
                          </div>

                          {/* Definition Section */}
                          <div className="lg:col-span-5 space-y-2">
                            <div className="flex items-center justify-between">
                              <Label className="text-sm font-semibold text-gray-700">
                                Định nghĩa
                              </Label>
                              {!card.definition.trim() && (
                                <span className="text-xs text-red-600 flex items-center gap-1">
                                  <AlertCircle className="w-3 h-3" />
                                  Bắt buộc
                                </span>
                              )}
                            </div>
                            <Textarea
                              placeholder="Nhập định nghĩa, giải thích hoặc câu trả lời..."
                              value={card.definition}
                              onChange={(e) =>
                                handleFlashcardChange(
                                  index,
                                  "definition",
                                  e.target.value
                                )
                              }
                              ref={(el) => {
                                flashcardFieldRefs.current[card.id] = {
                                  ...(flashcardFieldRefs.current[card.id] ||
                                    {}),
                                  definition: el,
                                };
                              }}
                              className={`min-h-[120px] resize-none text-sm rounded-lg ${
                                !card.definition.trim()
                                  ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
                                  : "border-gray-300 focus:border-blue-500 focus:ring-blue-500/20"
                              }`}
                            />
                          </div>

                          {/* Media Section */}
                          <div className="lg:col-span-2 space-y-2">
                            <div className="flex items-center justify-between">
                              <Label className="text-sm font-semibold text-gray-700 flex items-center gap-1.5">
                                <ImageIcon className="w-4 h-4 text-purple-600" />
                                Hình ảnh
                              </Label>
                            </div>

                            {card.mediaPreview ? (
                              <div className="relative">
                                <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
                                  <img
                                    src={card.mediaPreview}
                                    alt="Preview"
                                    className="w-full h-32 object-cover"
                                  />
                                </div>
                                <div className="flex gap-2 mt-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex-1 text-xs"
                                    onClick={() =>
                                      fileInputRefs.current[card.id]?.click()
                                    }
                                  >
                                    <ImageIcon className="w-3 h-3 mr-1" />
                                    Thay đổi
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                                    onClick={() => {
                                      handleFlashcardChange(
                                        index,
                                        "mediaId",
                                        null
                                      );
                                      handleFlashcardChange(
                                        index,
                                        "mediaPreview",
                                        null
                                      );
                                    }}
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </Button>
                                </div>
                              </div>
                            ) : (
                              <div className="space-y-2">
                                <div
                                  className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-blue-400 hover:bg-blue-50/30 transition-all cursor-pointer flex flex-col items-center justify-center gap-2 h-32"
                                  onClick={() =>
                                    fileInputRefs.current[card.id]?.click()
                                  }
                                >
                                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                    <Upload className="w-5 h-5 text-blue-600" />
                                  </div>
                                  <p className="text-sm font-medium text-gray-600 text-center">
                                    Tải ảnh lên
                                  </p>
                                  <p className="text-xs text-gray-500 text-center">
                                    PNG, JPG, JPEG, WEBP, SVG • Tối đa 5MB
                                  </p>
                                </div>
                              </div>
                            )}

                            <input
                              ref={(el) => {
                                fileInputRefs.current[card.id] = el;
                              }}
                              type="file"
                              accept="image/png, image/jpeg, image/jpg, image/webp, image/svg+xml"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleImageUpload(index, file);
                                // Reset input để có thể chọn lại cùng file nếu cần
                                e.target.value = "";
                              }}
                            />
                          </div>
                        </div>
                      </CardContent>
                    )}
                  </Card>
                </div>
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
                <div className="text-left">
                  <p className="text-sm font-semibold">Thêm thẻ mới</p>
                  <p className="text-xs text-gray-500">
                    Hoặc nhấn Ctrl + Enter
                  </p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Keyboard Shortcuts Helper */}
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          variant="outline"
          size="sm"
          className="bg-white/90 backdrop-blur-sm shadow border-gray-300/80 hover:bg-white h-9"
          onClick={() => {
            toast(
              "Phím tắt: Ctrl+S (Lưu), Ctrl+Enter (Thêm thẻ), Ctrl+Z (Hoàn tác)",
              {
                duration: 5000,
                position: "bottom-right",
              }
            );
          }}
          title="Xem phím tắt"
        >
          <Keyboard className="w-3.5 h-3.5 mr-1.5" />
          Phím tắt
        </Button>
      </div>
      {/* Draft AlertDialog */}
      <AlertDialog open={showDraftDialog} onOpenChange={setShowDraftDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Tìm thấy bản nháp chưa lưu</AlertDialogTitle>
            <AlertDialogDescription>
              Chúng tôi tìm thấy một bản nháp trước đó. Bạn muốn tiếp tục với
              bản nháp này hay tạo mới?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCreateNewFromDialog}>
              Tạo mới
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleRestoreDraft}>
              Tiếp tục với bản nháp
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
