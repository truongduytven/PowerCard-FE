import React, { useState, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Loader2,
  Import,
  ExternalLink,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import { toast } from "sonner";
import { ImportedFlashcard } from "@/types/create-deck";

interface ImportQuizletModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImport: (flashcards: ImportedFlashcard[]) => void;
}

export const ImportQuizletModal: React.FC<ImportQuizletModalProps> = ({
  open,
  onOpenChange,
  onImport,
}) => {
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

      const importedFlashcards = mockFlashcards.map((item) => ({
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
