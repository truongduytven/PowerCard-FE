import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  UploadCloud,
  Copy,
  Download,
  Trash2,
  FileSpreadsheet,
  FileText,
  Columns,
  ChevronDown,
  Grid3x3,
  X,
  Check,
  Info,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { ImportedFlashcard } from "@/types/create-deck";

interface BulkActionsProps {
  onImportCSV: (cards: ImportedFlashcard[]) => void;
  onDuplicateCards: (indices: number[]) => void;
  onDeleteCards: (indices: number[]) => void;
  onSelectAll: () => void;
  onClearSelection: () => void;
  selectedCards: number[];
  totalCards: number;
}

export const BulkActions: React.FC<BulkActionsProps> = ({
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
        .map((row) => {
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
          className="gap-2 relative h-9 sm:h-10 px-3 sm:px-4 border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
          disabled={totalCards === 0}
        >
          <Grid3x3 className="w-4 h-4" />
          <span className="hidden sm:inline text-sm">Hành động hàng loạt</span>
          <span className="sm:hidden text-sm">Bulk</span>
          {selectedCards.length > 0 && (
            <Badge className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-1.5 min-w-[20px] h-5 flex items-center justify-center text-xs font-bold shadow-lg">
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
          <>
            <div
              className="fixed inset-0 bg-black/30 z-40 sm:hidden"
              onClick={() => setShowBulkMenu(false)}
            />

            <div className="fixed bottom-0 left-0 right-0 sm:absolute sm:top-full sm:left-auto sm:right-0 mt-0 sm:mt-2 w-full sm:w-80 bg-white dark:bg-gray-900 rounded-t-3xl sm:rounded-2xl shadow-2xl border-t sm:border border-gray-200 dark:border-gray-800 z-50">
              <div className="sm:hidden flex justify-center pt-3 pb-2">
                <div className="w-12 h-1.5 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
              </div>

              <div className="p-4 sm:p-2 space-y-1 max-h-[85vh] sm:max-h-none overflow-y-auto">
                <div className="sm:hidden px-2 py-2 mb-2">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                      <Grid3x3 className="w-5 h-5 text-blue-600" />
                      Hành động hàng loạt
                    </h3>
                    <button
                      onClick={() => setShowBulkMenu(false)}
                      className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="px-3 py-3 mb-2 bg-blue-50/50 dark:bg-blue-900/20 rounded-xl">
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-sm font-semibold flex items-center gap-2">
                      <Check className="w-4 h-4 text-blue-600" />
                      Đã chọn: {selectedCards.length}/{totalCards}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={onSelectAll}
                      className="h-9 flex-1 text-xs"
                    >
                      Chọn tất cả
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={onClearSelection}
                      className="h-9 flex-1 text-xs"
                    >
                      Bỏ chọn
                    </Button>
                  </div>
                </div>

                <div className="space-y-2 px-2 sm:px-0">
                  <button
                    className="w-full flex items-center gap-3 p-3.5 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-xl group"
                    onClick={() => {
                      setShowImportDialog(true);
                      setShowBulkMenu(false);
                    }}
                  >
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/40 dark:to-blue-800/30 flex items-center justify-center">
                      <UploadCloud className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="text-left flex-1">
                      <p className="font-semibold text-base">
                        Import nhiều thẻ
                      </p>
                      <p className="text-xs text-gray-500">
                        CSV, Excel, văn bản
                      </p>
                    </div>
                    <Badge className="bg-green-100 text-green-700 text-xs">
                      Mới
                    </Badge>
                  </button>

                  <button
                    className="w-full flex items-center gap-3 p-3.5 hover:bg-green-50 dark:hover:bg-green-900/30 rounded-xl group disabled:opacity-50"
                    onClick={() => {
                      onDuplicateCards(selectedCards);
                      setShowBulkMenu(false);
                    }}
                    disabled={selectedCards.length === 0}
                  >
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-green-100 to-emerald-50 dark:from-green-900/40 dark:to-emerald-800/30 flex items-center justify-center">
                      <Copy className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="text-left flex-1">
                      <p className="font-semibold text-base">Sao chép thẻ</p>
                      <p className="text-xs text-gray-500">
                        {selectedCards.length > 0
                          ? `${selectedCards.length} thẻ`
                          : "Chọn thẻ"}
                      </p>
                    </div>
                  </button>

                  <button
                    className="w-full flex items-center gap-3 p-3.5 hover:bg-purple-50 dark:hover:bg-purple-900/30 rounded-xl"
                    onClick={() => setShowBulkMenu(false)}
                  >
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-purple-100 to-violet-50 dark:from-purple-900/40 dark:to-violet-800/30 flex items-center justify-center">
                      <Download className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="text-left flex-1">
                      <p className="font-semibold text-base">Export thẻ</p>
                      <p className="text-xs text-gray-500">CSV hoặc PDF</p>
                    </div>
                  </button>

                  <button
                    className="w-full flex items-center gap-3 p-3.5 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-xl disabled:opacity-50"
                    onClick={() => {
                      if (selectedCards.length > 0) {
                        onDeleteCards(selectedCards);
                        setShowBulkMenu(false);
                      }
                    }}
                    disabled={selectedCards.length === 0}
                  >
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-red-100 to-rose-50 dark:from-red-900/40 dark:to-rose-800/30 flex items-center justify-center">
                      <Trash2 className="w-5 h-5 text-red-600" />
                    </div>
                    <div className="text-left flex-1">
                      <p className="font-semibold text-red-600 text-base">
                        Xóa thẻ
                      </p>
                      <p className="text-xs text-red-500">
                        {selectedCards.length > 0
                          ? `${selectedCards.length} thẻ`
                          : "Chọn thẻ"}
                      </p>
                    </div>
                  </button>
                </div>
              </div>

              <div className="p-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50 rounded-b-3xl sm:rounded-b-2xl">
                <div className="flex items-start gap-2.5">
                  <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    <span className="font-semibold">Mẹo:</span> Giữ Ctrl/Cmd để
                    chọn nhiều thẻ
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <Dialog open={showImportDialog} onOpenChange={setShowImportDialog}>
        <DialogContent className="sm:max-w-2xl max-h-[95vh] overflow-y-auto p-0">
          <DialogHeader className="p-5 sm:p-6 pb-4 border-b">
            <DialogTitle className="flex items-center gap-3 text-lg">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center">
                <UploadCloud className="w-6 h-6 text-blue-600" />
              </div>
              Import nhiều thẻ
            </DialogTitle>
            <DialogDescription className="text-sm mt-2">
              Import hàng loạt thẻ flashcard từ file hoặc văn bản
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 p-5 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                {
                  id: "csv",
                  label: "CSV File",
                  icon: FileSpreadsheet,
                  desc: "File .csv 2 cột",
                },
                {
                  id: "text",
                  label: "Văn bản",
                  icon: FileText,
                  desc: "term: definition",
                },
                {
                  id: "excel",
                  label: "Excel",
                  icon: Columns,
                  desc: ".xlsx hoặc .xls",
                },
              ].map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => setImportMode(mode.id as any)}
                  className={`p-4 rounded-2xl border-2 ${
                    importMode === mode.id
                      ? "border-blue-500 bg-blue-50 scale-105"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center">
                      <mode.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <span className="font-semibold text-sm block mb-1">
                        {mode.label}
                      </span>
                      <span className="text-xs text-gray-500">{mode.desc}</span>
                    </div>
                    {importMode === mode.id && (
                      <Check className="w-5 h-5 text-blue-600" />
                    )}
                  </div>
                </button>
              ))}
            </div>

            {importMode === "csv" && (
              <div className="space-y-4">
                <div
                  className="border-2 border-dashed rounded-2xl p-8 text-center hover:border-blue-400 cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-blue-50 flex items-center justify-center">
                    <UploadCloud className="w-8 h-8 text-blue-600" />
                  </div>
                  <p className="font-semibold mb-2">Kéo thả file CSV</p>
                  <p className="text-sm text-gray-600 mb-4">
                    hoặc click chọn file
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
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-sm font-semibold mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-blue-600" />
                    Định dạng CSV:
                  </p>
                  <pre className="text-xs bg-white p-4 rounded-lg overflow-x-auto">
                    term,definition{"\n"}Hello,Xin chào{"\n"}Goodbye,Tạm biệt
                  </pre>
                </div>
              </div>
            )}

            {importMode === "text" && (
              <div className="space-y-4">
                <div className="space-y-2.5">
                  <Label className="text-sm font-semibold">
                    Nhập hoặc dán dữ liệu:
                  </Label>
                  <Textarea
                    ref={textAreaRef}
                    placeholder="Hello: Xin chào
Goodbye: Tạm biệt"
                    className="min-h-[220px] font-mono text-sm rounded-xl p-4"
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleExampleLoad}
                    className="w-full sm:w-auto h-10"
                  >
                    Tải ví dụ mẫu
                  </Button>
                  <Button
                    onClick={handleTextImport}
                    className="w-full sm:w-auto h-10"
                  >
                    Import dữ liệu
                  </Button>
                </div>
              </div>
            )}

            {importMode === "excel" && (
              <div className="text-center py-12">
                <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-purple-50 flex items-center justify-center">
                  <FileSpreadsheet className="w-10 h-10 text-purple-600" />
                </div>
                <p className="font-semibold mb-2">Tính năng đang phát triển</p>
                <p className="text-sm text-gray-600">
                  Vui lòng sử dụng CSV tạm thời
                </p>
              </div>
            )}
          </div>

          <DialogFooter className="p-5 sm:p-6">
            <Button
              variant="outline"
              onClick={() => setShowImportDialog(false)}
              className="w-full sm:w-auto"
            >
              Đóng
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
