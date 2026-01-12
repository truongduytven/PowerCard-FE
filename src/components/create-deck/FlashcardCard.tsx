import React, { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  GripVertical,
  Check,
  AlertCircle,
  ImageIcon,
  Upload,
  Trash2,
  ChevronDown,
  ChevronUp,
  X,
} from "lucide-react";
import { Flashcard } from "@/types/create-deck";

interface FlashcardCardProps {
  card: Flashcard;
  index: number;
  isExpanded: boolean;
  isSelected: boolean;
  isDragging: boolean;
  isDragOver: boolean;
  onSelect: (index: number, e: React.MouseEvent) => void;
  onToggleExpand: (cardId: string) => void;
  onDelete: (index: number) => void;
  onChange: (index: number, field: keyof Flashcard, value: any) => void;
  onImageUpload: (index: number, file: File) => void;
  onDragStart: (index: number) => void;
  onDragOver: (e: React.DragEvent, index: number) => void;
  onDrop: (e: React.DragEvent, index: number) => void;
  onDragEnd: () => void;
  registerFieldRef: (
    cardId: string,
    field: "term" | "definition",
    ref: HTMLTextAreaElement | null
  ) => void;
}

export const FlashcardCard: React.FC<FlashcardCardProps> = ({
  card,
  index,
  isExpanded,
  isSelected,
  isDragging,
  isDragOver,
  onSelect,
  onToggleExpand,
  onDelete,
  onChange,
  onImageUpload,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
  registerFieldRef,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onImageUpload(index, file);
    e.target.value = "";
  };

  return (
    <div
      draggable
      onDragStart={() => onDragStart(index)}
      onDragOver={(e) => onDragOver(e, index)}
      onDrop={(e) => onDrop(e, index)}
      onDragEnd={onDragEnd}
      className={`transition-all duration-150 ${
        isDragging ? "opacity-30 scale-[0.99]" : ""
      } ${
        isDragOver
          ? "scale-[1.005] ring-2 ring-blue-400 dark:ring-blue-500"
          : ""
      }`}
    >
      <Card
        className={`border overflow-hidden transition-all duration-150 cursor-pointer hover:shadow-sm ${
          isDragOver
            ? "border-blue-400 dark:border-blue-500 shadow-md"
            : card.term && card.definition
            ? "border-green-200 dark:border-green-700 bg-green-50/30 dark:bg-green-900/20"
            : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
        } ${
          isSelected
            ? "ring-2 ring-blue-400 dark:ring-blue-500 bg-blue-50/30 dark:bg-blue-900/20"
            : ""
        } bg-white dark:bg-gray-900`}
      >
        {/* Card Header */}
        <div
          className="px-3 sm:px-4 py-3 transition-colors border-b border-gray-100 dark:border-gray-800 group"
          onClick={(e) => onSelect(index, e as any)}
          onDoubleClick={() => onToggleExpand(card.id)}
        >
          <div className="flex items-center justify-between gap-3">
            {/* Left Section */}
            <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
              {/* Drag Handle */}
              <GripVertical
                className="w-4 h-4 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 cursor-move flex-shrink-0"
                onClick={(e) => e.stopPropagation()}
                onDoubleClick={(e) => e.stopPropagation()}
              />

              {/* Card Number */}
              <span className="text-sm font-bold text-gray-600 dark:text-gray-400 flex-shrink-0 w-6 sm:w-8">
                #{index + 1}
              </span>

              {/* Card Content Preview */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  {card.term ? (
                    <span className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">
                      {card.term}
                    </span>
                  ) : (
                    <span className="text-sm text-gray-400 dark:text-gray-500 italic truncate">
                      Chưa có thuật ngữ
                    </span>
                  )}
                  {/* Selection Indicator */}
                  {isSelected && (
                    <span className="flex-shrink-0">
                      <div className="w-2 h-2 rounded-full bg-blue-500 dark:bg-blue-400 animate-pulse"></div>
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Right Section - Status & Controls */}
            <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
              {/* Delete Button - Hiển thị khi hover hoặc trên mobile */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(index);
                }}
                className="opacity-0 group-hover:opacity-100 sm:group-hover:opacity-100 sm:opacity-0 transition-opacity duration-200 p-1 sm:p-1.5 hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-600 dark:hover:text-red-400 rounded-md text-gray-400 dark:text-gray-500"
                title="Xóa thẻ này"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              {/* Status Badges - Hiển thị có điều kiện trên mobile */}
              <div className="flex items-center gap-1 sm:gap-1.5">
                {card.mediaPreview && (
                  <Badge
                    variant="outline"
                    className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700 text-xs px-1.5 sm:px-2 h-6 hidden sm:flex"
                  >
                    <ImageIcon className="w-3 h-3 mr-1" />
                    Ảnh
                  </Badge>
                )}

                {card.term && card.definition ? (
                  <Badge className="bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 border-green-200 dark:border-green-700 text-xs px-1.5 sm:px-2 h-6">
                    <Check className="w-3 h-3 mr-1 hidden sm:inline" />
                    <span className="hidden sm:inline">Hoàn thành</span>
                    <span className="sm:hidden">✓</span>
                  </Badge>
                ) : (
                  <Badge
                    variant="outline"
                    className="bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-700 text-xs px-1.5 sm:px-2 h-6"
                  >
                    <AlertCircle className="w-3 h-3 mr-1 hidden sm:inline" />
                    <span className="hidden sm:inline">Thiếu</span>
                    <span className="sm:hidden">!</span>
                  </Badge>
                )}
              </div>

              {/* Expand Toggle - Mobile optimized */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleExpand(card.id);
                }}
                className="p-1.5 hover:bg-gray-200/60 dark:hover:bg-gray-800/60 rounded-md transition-colors flex items-center gap-1 sm:gap-1.5"
                title={isExpanded ? "Thu gọn" : "Mở rộng"}
              >
                <span className="text-xs text-gray-500 dark:text-gray-400 hidden sm:inline">
                  {isExpanded ? "Thu gọn" : "Mở rộng"}
                </span>
                {isExpanded ? (
                  <ChevronUp className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Expandable Content */}
        {isExpanded && (
          <CardContent className="p-4 sm:p-5 bg-gray-50/30 dark:bg-gray-800/30 border-t border-gray-100 dark:border-gray-800">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5">
              {/* Term Section */}
              <div className="lg:col-span-5 space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Thuật ngữ
                  </Label>
                  <div className="flex items-center gap-2">
                    {!card.term.trim() && (
                      <span className="text-xs text-red-600 dark:text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span className="hidden sm:inline">Bắt buộc</span>
                        <span className="sm:hidden">*</span>
                      </span>
                    )}
                  </div>
                </div>
                <Textarea
                  placeholder="Nhập thuật ngữ, từ khóa hoặc câu hỏi..."
                  value={card.term}
                  onChange={(e) => onChange(index, "term", e.target.value)}
                  ref={(el) => registerFieldRef(card.id, "term", el)}
                  className={`min-h-[100px] sm:min-h-[120px] resize-none text-sm rounded-lg bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 ${
                    !card.term.trim()
                      ? "border-red-300 dark:border-red-500"
                      : ""
                  }`}
                />
              </div>

              {/* Definition Section */}
              <div className="lg:col-span-5 space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Định nghĩa
                  </Label>
                  {!card.definition.trim() && (
                    <span className="text-xs text-red-600 dark:text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span className="hidden sm:inline">Bắt buộc</span>
                      <span className="sm:hidden">*</span>
                    </span>
                  )}
                </div>
                <Textarea
                  placeholder="Nhập định nghĩa, giải thích hoặc câu trả lời..."
                  value={card.definition}
                  onChange={(e) =>
                    onChange(index, "definition", e.target.value)
                  }
                  ref={(el) => registerFieldRef(card.id, "definition", el)}
                  className={`min-h-[100px] sm:min-h-[120px] resize-none text-sm rounded-lg bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 ${
                    !card.definition.trim()
                      ? "border-red-300 dark:border-red-500"
                      : ""
                  }`}
                />
              </div>

              {/* Media Section */}
              <div className="lg:col-span-2 space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    <span>Hình ảnh</span>
                  </Label>
                </div>

                {card.mediaPreview ? (
                  <div className="relative">
                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-800">
                      <img
                        src={card.mediaPreview}
                        alt="Preview"
                        className="w-full h-24 sm:h-32 object-cover"
                      />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 mt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 text-xs h-8 sm:h-9"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <ImageIcon className="w-3 h-3 mr-1 hidden sm:inline" />
                        <span className="sm:hidden">Thay</span>
                        <span className="hidden sm:inline">Thay đổi</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/30 border-red-200 dark:border-red-700 h-8 sm:h-9"
                        onClick={() => {
                          onChange(index, "mediaId", null);
                          onChange(index, "mediaPreview", null);
                        }}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div
                      className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-3 sm:p-4 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50/30 dark:hover:bg-blue-900/20 transition-all cursor-pointer flex flex-col items-center justify-center gap-1 sm:gap-2 h-24 sm:h-32"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 dark:bg-blue-900/40 rounded-full flex items-center justify-center">
                        <Upload className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300 text-center">
                        Tải ảnh lên
                      </p>
                      <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 text-center hidden sm:block">
                        PNG, JPG, JPEG, WEBP, SVG • Tối đa 5MB
                      </p>
                      <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 text-center sm:hidden">
                        PNG, JPG • ≤5MB
                      </p>
                    </div>
                  </div>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png, image/jpeg, image/jpg, image/webp, image/svg+xml"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </div>
            </div>

            {/* Mobile Actions - Hiển thị dưới cùng trên mobile */}
            <div className="flex sm:hidden items-center justify-between pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 text-xs"
                onClick={() => fileInputRef.current?.click()}
              >
                <ImageIcon className="w-3 h-3 mr-1" />
                Thêm ảnh
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-red-600 dark:text-red-400"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(index);
                }}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onToggleExpand(card.id)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
};
