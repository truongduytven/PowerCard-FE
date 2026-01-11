import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  FileText,
  Tag,
  FolderOpen,
  Globe,
  Lock,
  Palette,
  LayoutGrid,
  ChevronDown,
  AlertCircle,
  Book,
  ChevronUp,
} from "lucide-react";
import { Folder, GradientOption, IconOption, Topic } from "@/types/create-deck";

interface BasicInfoCardProps {
  formData: {
    title: string;
    description: string;
    icon: string;
    iconColor: string;
    topicId: string;
    folderSetId: string;
    isPublic: boolean;
  };
  onChange: (field: string, value: any) => void;
  topics: Topic[];
  folders: Folder[];
  showIconPicker: boolean;
  setShowIconPicker: (show: boolean) => void;
  iconCategories: string[];
  selectedIconCategory: string;
  setSelectedIconCategory: (category: string) => void;
  gradientOptions: GradientOption[];
  iconOptions: IconOption[];
  IconPickerComponent: React.ReactNode;
}

export const BasicInfoCard: React.FC<BasicInfoCardProps> = ({
  formData,
  onChange,
  topics,
  folders,
  showIconPicker,
  setShowIconPicker,
  iconCategories,
  selectedIconCategory,
  setSelectedIconCategory,
  gradientOptions,
  iconOptions,
  IconPickerComponent,
}) => {
  const SelectedIcon =
    iconOptions.find((opt) => opt.value === formData.icon)?.icon || Book;

  return (
    <Card className="border-gray-200/80 dark:border-gray-800/80 shadow-sm hover:shadow-md transition-all duration-300 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-2xl overflow-hidden">
      <CardHeader className="pb-4 sm:pb-6 px-4 sm:px-6 pt-5 sm:pt-6">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-blue-100/80 to-blue-50/80 dark:from-blue-900/40 dark:to-blue-800/30 flex items-center justify-center flex-shrink-0 shadow-sm">
            <FileText className="w-5 h-5 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">
              Thông tin cơ bản
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm text-gray-600/90 dark:text-gray-400/90 leading-relaxed">
              Thiết lập thông tin và giao diện cho bộ flashcard
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-5 sm:space-y-6 px-4 sm:px-6 pb-5 sm:pb-6">
        {/* Icon and Color Selection - Improved Mobile */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-semibold text-gray-900 dark:text-gray-200 flex items-center gap-2">
              <Palette className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
              <span>Biểu tượng và màu sắc</span>
            </Label>
          </div>

          <p className="text-xs sm:text-sm text-gray-500/90 dark:text-gray-400/90">
            Tùy chỉnh icon và màu sắc
          </p>

          {/* Mobile-friendly toggle button */}
          <Button
            type="button"
            variant="outline"
            onClick={() => setShowIconPicker(!showIconPicker)}
            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-50/50 dark:hover:bg-blue-900/30 h-10 sm:h-11 w-full flex items-center justify-between px-4 border-2 border-dashed border-blue-200 dark:border-blue-800 rounded-xl transition-all duration-200"
          >
            <span className="flex items-center gap-2 text-sm sm:text-base">
              <LayoutGrid className="w-4 h-4 sm:w-5 sm:h-5" />
              {showIconPicker ? "Đóng bộ chọn" : "Chọn biểu tượng"}
            </span>
            {showIconPicker ? (
              <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5" />
            ) : (
              <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
            )}
          </Button>

          {/* Current Selection Preview - Enhanced for mobile */}

          {/* Icon Picker - Mobile optimized */}
          {showIconPicker && (
            <div className="rounded-xl border-2 border-blue-100 dark:border-blue-900 bg-white dark:bg-gray-800 p-3 sm:p-4 animate-in slide-in-from-top-2 duration-200">
              {IconPickerComponent}
            </div>
          )}
        </div>

        {/* Title and Description - Mobile optimized spacing */}
        <div className="space-y-4 sm:space-y-5">
          {/* Title */}
          <div className="space-y-2.5">
            <div className="flex items-start justify-between gap-2 flex-wrap">
              <Label className="text-sm font-semibold text-gray-900 dark:text-gray-200 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                <span>Tiêu đề bộ flashcard</span>
                <span className="text-red-500">*</span>
              </Label>
              <span
                className={`text-xs px-2.5 py-1 rounded-full font-medium flex-shrink-0 ${
                  formData.title.length > 90
                    ? "bg-amber-100/80 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300"
                    : "bg-gray-100/80 dark:bg-gray-800/60 text-gray-600 dark:text-gray-400"
                }`}
              >
                {formData.title.length}/100
              </span>
            </div>
            <Input
              id="deck-title"
              placeholder="Ví dụ: Từ vựng tiếng Anh cơ bản"
              value={formData.title}
              onChange={(e) => onChange("title", e.target.value)}
              maxLength={100}
              className="h-11 sm:h-12 border-gray-300/80 dark:border-gray-700/80 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 text-base placeholder:text-gray-400/90 dark:placeholder:text-gray-500 rounded-xl w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-4"
            />
            {formData.title.length > 90 && (
              <div className="flex items-start gap-2 p-2.5 sm:p-3 bg-amber-50/80 dark:bg-amber-900/20 rounded-lg border border-amber-200/60 dark:border-amber-800/40">
                <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-amber-800 dark:text-amber-300">
                  Tiêu đề sắp đạt giới hạn
                </p>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2.5">
            <div className="flex items-start justify-between gap-2 flex-wrap">
              <Label className="text-sm font-semibold text-gray-900 dark:text-gray-200 flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                <span>Mô tả</span>
                <span className="text-xs text-gray-500 dark:text-gray-400 font-normal">
                  (Tùy chọn)
                </span>
              </Label>
              <p
                className={`text-xs px-2.5 py-1 rounded-full font-medium flex-shrink-0 ${
                  formData.description.length > 450
                    ? "bg-amber-100/80 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300"
                    : "bg-gray-100/80 dark:bg-gray-800/60 text-gray-600 dark:text-gray-400"
                }`}
              >
                {formData.description.length}/500
              </p>
            </div>
            <Textarea
              id="deck-description"
              placeholder="Mô tả nội dung, mục đích và đối tượng học tập..."
              value={formData.description}
              onChange={(e) => onChange("description", e.target.value)}
              maxLength={500}
              className="min-h-[120px] sm:min-h-[100px] resize-none border-gray-300/80 dark:border-gray-700/80 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 placeholder:text-gray-400/90 dark:placeholder:text-gray-500 rounded-xl text-sm w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-3.5 sm:p-3"
            />
            <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-2">
              <p className="text-xs text-gray-500/90 dark:text-gray-400/90 flex-1">
                Mô tả chi tiết giúp người học hiểu rõ hơn về nội dung
              </p>
            </div>
          </div>
        </div>

        {/* Topic and Folder Selection - Mobile stacked */}
        <div className="grid grid-cols-1 gap-4 sm:gap-5">
          <div className="space-y-2.5">
            <Label className="text-sm font-semibold text-gray-900 dark:text-gray-200 flex items-center gap-2">
              <Tag className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
              <span>Chủ đề</span>
            </Label>
            <Select
              value={formData.topicId}
              onValueChange={(value) => onChange("topicId", value)}
            >
              <SelectTrigger id="deck-topic" className="h-11 sm:h-12 px-4 border border-gray-300/80 dark:border-gray-700/80 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-gray-100 hover:border-gray-400/80 dark:hover:border-gray-600/80 transition-colors text-sm w-full">
                <SelectValue placeholder="Chọn chủ đề phù hợp" />
              </SelectTrigger>
              <SelectContent className="max-h-[200px] sm:max-h-[300px] bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                {topics.map((topic) => (
                  <SelectItem
                    key={topic.id}
                    value={topic.id}
                    className="focus:bg-gray-100 dark:focus:bg-gray-700 py-3"
                  >
                    <span className="truncate text-sm">{topic.name}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {!formData.topicId && (
              <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                Chưa chọn chủ đề
              </p>
            )}
          </div>

          <div className="space-y-2.5">
            <Label className="text-sm font-semibold text-gray-900 dark:text-gray-200 flex items-center gap-2">
              <FolderOpen className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
              <span>Thư mục</span>
            </Label>
            <Select
              value={formData.folderSetId || "none"}
              onValueChange={(value) =>
                onChange("folderSetId", value === "none" ? "" : value)
              }
            >
              <SelectTrigger id="deck-folder" className="h-11 sm:h-12 px-4 border border-gray-300/80 dark:border-gray-700/80 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-gray-100 hover:border-gray-400/80 dark:hover:border-gray-600/80 transition-colors text-sm w-full">
                <SelectValue placeholder="Chọn thư mục lưu trữ">
                  {formData.folderSetId
                    ? (() => {
                        const folder = folders.find(
                          (f) => f.id === formData.folderSetId
                        );
                        return folder ? (
                          <div className="flex items-center justify-between w-full pr-2">
                            <span className="truncate mr-2 text-sm">
                              {folder.name}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0">
                              ({folder.count})
                            </span>
                          </div>
                        ) : (
                          "Chọn thư mục lưu trữ"
                        );
                      })()
                    : "Chọn thư mục lưu trữ"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="max-h-[200px] sm:max-h-[300px] bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <SelectItem
                  value="none"
                  className="focus:bg-gray-100 dark:focus:bg-gray-700 py-3"
                >
                  Chọn thư mục lưu trữ
                </SelectItem>
                {folders.map((folder) => (
                  <SelectItem
                    key={folder.id}
                    value={folder.id}
                    className="focus:bg-gray-100 dark:focus:bg-gray-700 py-3"
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="truncate mr-2 text-sm">
                        {folder.name}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0">
                        ({folder.count} sets)
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Privacy Settings - Mobile optimized */}
        <div className="pt-4 sm:pt-5 border-t border-gray-100/80 dark:border-gray-800/80">
          <div className="flex flex-col gap-4 p-4 sm:p-5 bg-gradient-to-br from-gray-50/50 to-gray-100/30 dark:from-gray-800/40 dark:to-gray-900/30 rounded-xl border border-gray-200/60 dark:border-gray-700/40">
            {/* Header with toggle */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-blue-100/80 to-blue-50/80 dark:from-blue-900/40 dark:to-blue-800/30 flex items-center justify-center flex-shrink-0 shadow-sm">
                  {formData.isPublic ? (
                    <Globe className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  ) : (
                    <Lock className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <Label className="text-sm font-semibold text-gray-900 dark:text-gray-200 block mb-2">
                    Quyền riêng tư
                  </Label>
                  <div className="flex flex-wrap items-center gap-2">
                    {formData.isPublic ? (
                      <Badge className="bg-gradient-to-r from-blue-100/80 to-blue-50/80 dark:from-blue-900/30 dark:to-blue-800/20 text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-700/40 text-xs font-medium">
                        <Globe className="w-3 h-3 mr-1.5" />
                        Công khai
                      </Badge>
                    ) : (
                      <Badge className="bg-gradient-to-r from-gray-100/80 to-gray-50/80 dark:from-gray-800/40 dark:to-gray-700/30 text-gray-700 dark:text-gray-300 border border-gray-300/60 dark:border-gray-600/40 text-xs font-medium">
                        <Lock className="w-3 h-3 mr-1.5" />
                        Riêng tư
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              <Switch
                checked={formData.isPublic}
                onCheckedChange={(checked) => onChange("isPublic", checked)}
                className="data-[state=checked]:bg-blue-600 dark:data-[state=checked]:bg-blue-500 flex-shrink-0 mt-1"
              />
            </div>

            {/* Description */}
            <p className="text-sm leading-relaxed text-gray-600/90 dark:text-gray-400/90 pl-0 sm:pl-14">
              {formData.isPublic
                ? "Mọi người có thể tìm thấy, xem và học bộ flashcard này. Các hình ảnh trong thẻ cũng sẽ hiển thị và sử dụng công khai."
                : "Chỉ bạn mới có thể xem và học bộ flashcard này."}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
