import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Check, Clock, BookOpen, Undo, Redo } from "lucide-react";

interface HeaderProps {
  isSaving: boolean;
  lastSaved: Date | null;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  completedCards: number;
  totalCards: number;
  progress: number;
  onSubmit: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  isSaving,
  lastSaved,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  completedCards,
  totalCards,
  progress,
  onSubmit,
}) => {
  return (
    <>
      {/* ================= DESKTOP HEADER (UNCHANGED) ================= */}
      <div
        className="
          hidden lg:block
          sticky top-0 z-50
          bg-white/95 dark:bg-gray-900/90
          backdrop-blur-md
          border-b border-gray-200 dark:border-gray-800
          shadow-sm
        "
      >
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center justify-end">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-4">
                {/* Auto-save status */}
                <div className="flex items-center gap-2 text-sm">
                  {isSaving ? (
                    <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
                      <Loader2 className="w-3 h-3 animate-spin" />
                      <span className="font-medium">Đang lưu...</span>
                    </div>
                  ) : lastSaved ? (
                    <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                      <Check className="w-3 h-3" />
                      <span className="font-medium">Đã lưu</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                      <Clock className="w-3 h-3" />
                      <span>Chưa lưu</span>
                    </div>
                  )}
                </div>

                {/* Undo / Redo */}
                <div className="flex items-center gap-1 border border-gray-200 dark:border-gray-700 rounded-lg p-1 bg-white/80 dark:bg-gray-800/80">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onUndo}
                    disabled={!canUndo}
                    className="cursor-pointer h-8 w-8 p-0"
                    title="Hoàn tác (Ctrl+Z)"
                  >
                    <Undo className="w-4 h-4" />
                  </Button>
                  <div className="w-px h-4 bg-gray-200 dark:bg-gray-700" />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onRedo}
                    disabled={!canRedo}
                    className="cursor-pointerh-8 w-8 p-0"
                    title="Làm lại (Ctrl+Shift+Z)"
                  >
                    <Redo className="w-4 h-4" />
                  </Button>
                </div>

                {/* Progress */}
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {completedCards}/{totalCards} thẻ
                    </p>
                    <div className="w-32 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mt-1">
                      <div
                        className="
                          h-full rounded-full
                          bg-gradient-to-r from-blue-500 to-blue-600
                          dark:from-blue-400 dark:to-indigo-400
                          transition-all duration-500
                        "
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  <Badge
                    variant="secondary"
                    className="
                      bg-blue-50/80 dark:bg-blue-950/40
                      text-blue-700 dark:text-blue-300
                      border border-blue-200/60 dark:border-blue-900/40
                    "
                  >
                    <BookOpen className="w-3 h-3 mr-1" />
                    Bản nháp
                  </Badge>
                </div>
              </div>
            </div>

            <Button onClick={onSubmit} className="cursor-pointer ml-4">
              Tạo bộ flashcard
            </Button>
          </div>
        </div>
      </div>

      {/* ================= MOBILE / TABLET HEADER ================= */}
      <div
        className="
          lg:hidden
          sticky top-0 z-50
          bg-white/90 dark:bg-gray-900/90
          backdrop-blur-md
          border-b border-gray-200 dark:border-gray-800
        "
      >
        <div className="px-4 py-3 space-y-2">
          {/* Top row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <div className="flex items-center gap-2 text-sm">
                {isSaving ? (
                  <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
                    <Loader2 className="w-3 h-3 animate-spin" />
                    <span className="font-medium">Đang lưu...</span>
                  </div>
                ) : lastSaved ? (
                  <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                    <Check className="w-3 h-3" />
                    <span className="font-medium">Đã lưu</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                    <Clock className="w-3 h-3" />
                    <span>Chưa lưu</span>
                  </div>
                )}
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onUndo}
                disabled={!canUndo}
              >
                <Undo className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={onRedo}
                disabled={!canRedo}
              >
                <Redo className="w-4 h-4" />
              </Button>
            </div>

            <Button
              onClick={onSubmit}
              size="sm"
              className="
                bg-gradient-to-r from-fuchsia-500 to-pink-500
                hover:from-fuchsia-600 hover:to-pink-600
                text-white
              "
            >
              Tạo bộ thẻ
            </Button>
          </div>

          {/* Progress */}
          <div>
            <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
              <span>
                {completedCards}/{totalCards} thẻ
              </span>
              <span>{progress}%</span>
            </div>
            <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
