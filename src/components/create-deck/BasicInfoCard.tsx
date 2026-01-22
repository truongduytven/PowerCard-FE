import React, { useState } from "react";
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
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
  Check,
  ChevronsUpDown,
  Plus,
  Search,
  X,
  ChevronRight,
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
  onCreateTopic?: (topicName: string) => Promise<string>;
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
  onCreateTopic,
}) => {
  const [openTopicCombobox, setOpenTopicCombobox] = useState(false);
  const [topicSearchValue, setTopicSearchValue] = useState("");
  const [showCreateTopicDialog, setShowCreateTopicDialog] = useState(false);
  const [newTopicName, setNewTopicName] = useState("");
  const [isCreatingTopic, setIsCreatingTopic] = useState(false);
  const [showCustomTopicInput, setShowCustomTopicInput] = useState(false);
  const [customTopicValue, setCustomTopicValue] = useState("");

  const SelectedIcon =
    iconOptions.find((opt) => opt.value === formData.icon)?.icon || Book;

  const selectedTopic = topics.find((topic) => topic.id === formData.topicId);

  const filteredTopics = topics.filter((topic) =>
    topic.name.toLowerCase().includes(topicSearchValue.toLowerCase()),
  );

  const handleCreateTopic = async () => {
    if (!newTopicName.trim() || !onCreateTopic) return;

    setIsCreatingTopic(true);
    try {
      const newTopicId = await onCreateTopic(newTopicName.trim());
      onChange("topicId", newTopicId);
      setShowCreateTopicDialog(false);
      setNewTopicName("");
      setTopicSearchValue("");
    } catch (error) {
      console.error("Error creating topic:", error);
    } finally {
      setIsCreatingTopic(false);
    }
  };

  const handleSaveCustomTopic = async () => {
    if (!customTopicValue.trim() || !onCreateTopic) return;

    setIsCreatingTopic(true);
    try {
      const newTopicId = await onCreateTopic(customTopicValue.trim());
      onChange("topicId", newTopicId);
      setShowCustomTopicInput(false);
      setCustomTopicValue("");
    } catch (error) {
      console.error("Error creating topic:", error);
    } finally {
      setIsCreatingTopic(false);
    }
  };

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
        {/* Icon and Color Selection */}
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

          <Button
            type="button"
            variant="outline"
            onClick={() => setShowIconPicker(!showIconPicker)}
            className="cursor-pointer text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-50/50 dark:hover:bg-blue-900/30 h-10 sm:h-11 w-full flex items-center justify-between px-4 border-2 border-dashed border-blue-200 dark:border-blue-800 rounded-xl transition-all duration-200"
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

          {showIconPicker && (
            <div className="rounded-xl border-2 border-blue-100 dark:border-blue-900 bg-white dark:bg-gray-800 p-3 sm:p-4 animate-in slide-in-from-top-2 duration-200">
              {IconPickerComponent}
            </div>
          )}
        </div>

        {/* Title and Description */}
        <div className="space-y-4 sm:space-y-5">
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
            <p className="text-xs text-gray-500/90 dark:text-gray-400/90">
              Mô tả chi tiết giúp người học hiểu rõ hơn về nội dung
            </p>
          </div>
        </div>

        {/* Topic and Folder Selection */}
        <div className="grid grid-cols-1 gap-4 sm:gap-5">
          {/* Topic Selection with Enhanced UI */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-semibold text-gray-900 dark:text-gray-200 flex items-center gap-2">
                <Tag className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                <span>Chủ đề</span>
                <span className="text-red-500">*</span>
              </Label>
              {formData.topicId && !showCustomTopicInput && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    onChange("topicId", "");
                    setTopicSearchValue("");
                  }}
                  className="cursor-pointer h-7 px-2 text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  <X className="w-3 h-3 mr-1" />
                  Xóa lựa chọn
                </Button>
              )}
            </div>

            {showCustomTopicInput ? (
              <div className="space-y-3 animate-in slide-in-from-top-2 duration-200">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl blur-sm opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
                  <Input
                    placeholder="Nhập tên chủ đề mới..."
                    value={customTopicValue}
                    onChange={(e) => setCustomTopicValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && customTopicValue.trim()) {
                        handleSaveCustomTopic();
                      }
                    }}
                    autoFocus
                    className="relative h-11 sm:h-12 border-gray-300/80 dark:border-gray-700/80 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 placeholder:text-gray-400/90 dark:placeholder:text-gray-500 rounded-xl w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-4 pr-12 text-sm"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleSaveCustomTopic}
                      disabled={!customTopicValue.trim() || isCreatingTopic}
                      className="cursor-pointer p-1.5 rounded-full border bg-blue-600 hover:bg-blue-700 disabled:bg-transparent disabled:cursor-not-allowed text-gray-300 transition-colors"
                      title="Lưu chủ đề"
                    >
                      {isCreatingTopic ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Check className="w-4 h-4" />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowCustomTopicInput(false);
                        setCustomTopicValue("");
                      }}
                      className="cursor-pointer p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                      title="Hủy"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <AlertCircle className="w-3 h-3 flex-shrink-0" />
                  <span>Nhấn Enter hoặc biểu tượng ✓ để lưu chủ đề mới</span>
                </div>
              </div>
            ) : (
              <Popover
                open={openTopicCombobox}
                onOpenChange={setOpenTopicCombobox}
              >
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    role="combobox"
                    aria-expanded={openTopicCombobox}
                    className={`cursor-pointer h-11 sm:h-12 px-4 border rounded-xl focus:ring-2 bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-gray-100 hover:border-gray-400/80 dark:hover:border-gray-600/80 transition-all duration-200 text-sm w-full justify-between group relative overflow-hidden ${
                      openTopicCombobox
                        ? "border-blue-500 dark:border-blue-400 ring-2 ring-blue-500/20 dark:ring-blue-400/20"
                        : "border-gray-300/80 dark:border-gray-700/80"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {selectedTopic ? (
                        <>
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-100/80 to-blue-50/80 dark:from-blue-900/30 dark:to-blue-800/20 flex items-center justify-center flex-shrink-0">
                            <Tag className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div className="flex flex-col items-start min-w-0">
                            <span className="text-sm font-medium truncate">
                              {selectedTopic.name}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              Đã chọn
                            </span>
                          </div>
                        </>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Tag className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-500 dark:text-gray-400">
                            Chọn chủ đề...
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {selectedTopic && (
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      )}
                      <ChevronsUpDown className="h-4 w-4 opacity-60 transition-transform group-hover:scale-110" />
                    </div>
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-[--radix-popover-trigger-width] p-0 border-gray-200 dark:border-gray-700 shadow-xl"
                  align="start"
                  sideOffset={4}
                >
                  <Command className="border-none">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <CommandInput
                        placeholder="Tìm kiếm chủ đề..."
                        value={topicSearchValue}
                        onValueChange={setTopicSearchValue}
                        className="h-11 border-0 border-b border-gray-100 dark:border-gray-800 rounded-t-xl focus:ring-0 pl-10"
                      />
                    </div>
                    <CommandList className="max-h-[300px]">
                      <CommandEmpty className="py-6">
                        <div className="flex flex-col items-center justify-center text-center p-4">
                          <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-3">
                            <Tag className="w-6 h-6 text-gray-400" />
                          </div>
                          <p className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">
                            {topicSearchValue
                              ? "Không tìm thấy chủ đề"
                              : "Chưa có chủ đề nào"}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                            {topicSearchValue
                              ? `Không có kết quả cho "${topicSearchValue}"`
                              : "Hãy tạo chủ đề đầu tiên của bạn"}
                          </p>
                          {onCreateTopic && (
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setShowCustomTopicInput(true);
                                setOpenTopicCombobox(false);
                              }}
                              className="gap-2"
                            >
                              <Plus className="w-4 h-4" />
                              Tạo chủ đề mới
                            </Button>
                          )}
                        </div>
                      </CommandEmpty>

                      {filteredTopics.length > 0 && (
                        <>
                          <CommandGroup className="p-2">
                            <div className="px-2 py-1.5 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Chủ đề đề xuất
                            </div>
                            {filteredTopics.slice(0, 5).map((topic) => (
                              <CommandItem
                                key={topic.id}
                                value={topic.name}
                                onSelect={() => {
                                  onChange("topicId", topic.id);
                                  setOpenTopicCombobox(false);
                                  setTopicSearchValue("");
                                }}
                                className="flex items-center justify-between p-3 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 data-[selected=true]:bg-blue-50 dark:data-[selected=true]:bg-blue-900/20"
                                data-selected={formData.topicId === topic.id}
                              >
                                <div className="flex items-center gap-3">
                                  <div
                                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                      formData.topicId === topic.id
                                        ? "bg-blue-100 dark:bg-blue-900/30"
                                        : "bg-gray-100 dark:bg-gray-800"
                                    }`}
                                  >
                                    <Tag
                                      className={`w-4 h-4 ${
                                        formData.topicId === topic.id
                                          ? "text-blue-600 dark:text-blue-400"
                                          : "text-gray-500"
                                      }`}
                                    />
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="text-sm font-medium">
                                      {topic.name}
                                    </span>
                                    {/* {topic.count && (
                                      <span className="text-xs text-gray-500 dark:text-gray-400">
                                        {topic.count} bộ flashcard
                                      </span>
                                    )} */}
                                  </div>
                                </div>
                                {formData.topicId === topic.id && (
                                  <Check className="w-4 h-4 text-blue-600 dark:text-blue-400 animate-in zoom-in-50" />
                                )}
                              </CommandItem>
                            ))}
                          </CommandGroup>

                          {filteredTopics.length > 5 && (
                            <CommandGroup className="p-2 border-t border-gray-100 dark:border-gray-800">
                              <div className="px-2 py-1.5 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                Tất cả chủ đề
                              </div>
                              {filteredTopics.slice(5).map((topic) => (
                                <CommandItem
                                  key={topic.id}
                                  value={topic.name}
                                  onSelect={() => {
                                    onChange("topicId", topic.id);
                                    setOpenTopicCombobox(false);
                                    setTopicSearchValue("");
                                  }}
                                  className="flex items-center justify-between p-3 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 data-[selected=true]:bg-blue-50 dark:data-[selected=true]:bg-blue-900/20"
                                  data-selected={formData.topicId === topic.id}
                                >
                                  <div className="flex items-center gap-3">
                                    <div
                                      className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                        formData.topicId === topic.id
                                          ? "bg-blue-100 dark:bg-blue-900/30"
                                          : "bg-gray-100 dark:bg-gray-800"
                                      }`}
                                    >
                                      <Tag
                                        className={`w-4 h-4 ${
                                          formData.topicId === topic.id
                                            ? "text-blue-600 dark:text-blue-400"
                                            : "text-gray-500"
                                        }`}
                                      />
                                    </div>
                                    <span className="text-sm">
                                      {topic.name}
                                    </span>
                                  </div>
                                  {formData.topicId === topic.id && (
                                    <Check className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                  )}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          )}
                        </>
                      )}

                      <CommandSeparator className="my-1" />

                      <CommandGroup className="p-2">
                        <CommandItem
                          onSelect={() => {
                            setShowCustomTopicInput(true);
                            setOpenTopicCombobox(false);
                            setTopicSearchValue("");
                          }}
                          className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 text-blue-600 dark:text-blue-400 font-medium group/item"
                        >
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-800/20 flex items-center justify-center">
                            <Plus className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-medium">
                              Tạo chủ đề mới
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              Thêm chủ đề tùy chỉnh
                            </span>
                          </div>
                          <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover/item:opacity-100 transition-opacity" />
                        </CommandItem>
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            )}

            {/* Selected Topic Preview */}
            {selectedTopic && !openTopicCombobox && !showCustomTopicInput && (
              <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50/50 to-blue-100/30 dark:from-blue-900/20 dark:to-blue-800/10 rounded-lg border border-blue-100 dark:border-blue-800/30 animate-in slide-in-from-top-2 duration-200">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-800/20 flex items-center justify-center flex-shrink-0">
                  <Tag className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                    {selectedTopic.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Chủ đề đã chọn
                  </p>
                </div>
                <Badge className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-none">
                  Đã chọn
                </Badge>
              </div>
            )}

            {/* Validation Message */}
            {!formData.topicId && !showCustomTopicInput && (
              <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 text-sm animate-in fade-in-50">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>Vui lòng chọn hoặc tạo chủ đề để tiếp tục</span>
              </div>
            )}
          </div>

          {/* Folder Selection */}
          <div className="space-y-2.5">
            <Label className="text-sm font-semibold text-gray-900 dark:text-gray-200 flex items-center gap-2">
              <FolderOpen className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
              <span>Thư mục</span>
              <span className="text-xs text-gray-500 dark:text-gray-400 font-normal">
                (Tùy chọn)
              </span>
            </Label>
            <Select
              value={formData.folderSetId || "none"}
              onValueChange={(value) =>
                onChange("folderSetId", value === "none" ? "" : value)
              }
            >
              <SelectTrigger
                id="deck-folder"
                className="cursor-pointer h-11 sm:h-12 px-4 border border-gray-300/80 dark:border-gray-700/80 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-gray-100 hover:border-gray-400/80 dark:hover:border-gray-600/80 transition-colors text-sm w-full"
              >
                <SelectValue placeholder="Không chọn thư mục">
                  {formData.folderSetId
                    ? (() => {
                        const folder = folders.find(
                          (f) => f.id === formData.folderSetId,
                        );
                        return folder ? (
                          <div className="flex items-center gap-3 w-full pr-2">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gray-100/80 to-gray-50/80 dark:from-gray-800/40 dark:to-gray-700/30 flex items-center justify-center flex-shrink-0">
                              <FolderOpen className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                            </div>
                            <div className="flex flex-col items-start min-w-0">
                              <span className="text-sm font-medium truncate">
                                {folder.name}
                              </span>
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {folder.count} sets
                              </span>
                            </div>
                          </div>
                        ) : (
                          "Không chọn thư mục"
                        );
                      })()
                    : "Không chọn thư mục"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="max-h-[300px] bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-lg">
                <SelectItem
                  value="none"
                  className="cursor-pointer flex items-center gap-3 focus:bg-gray-100 dark:focus:bg-gray-700 py-3"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gray-100/80 to-gray-50/80 dark:from-gray-800/40 dark:to-gray-700/30 flex items-center justify-center flex-shrink-0">
                    <FolderOpen className="w-4 h-4 text-gray-400" />
                  </div>
                  <span className="text-gray-500 dark:text-gray-400 italic">
                    Không chọn thư mục
                  </span>
                </SelectItem>
                {folders.map((folder) => (
                  <SelectItem
                    key={folder.id}
                    value={folder.id}
                    className="cursor-pointer flex items-center gap-3 focus:bg-gray-100 dark:focus:bg-gray-700 py-3"
                  >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gray-100/80 to-gray-50/80 dark:from-gray-800/40 dark:to-gray-700/30 flex items-center justify-center flex-shrink-0">
                      <FolderOpen className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-sm font-medium truncate">
                        {folder.name}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {folder.count} bộ flashcard
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-500/90 dark:text-gray-400/90">
              Bạn có thể bỏ qua phần này hoặc chọn thư mục để tổ chức flashcard
              tốt hơn
            </p>
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="pt-4 sm:pt-5 border-t border-gray-100/80 dark:border-gray-800/80">
          <div className="flex flex-col gap-4 p-4 sm:p-5 bg-gradient-to-br from-gray-50/50 to-gray-100/30 dark:from-gray-800/40 dark:to-gray-900/30 rounded-xl border border-gray-200/60 dark:border-gray-700/40">
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
                className="cursor-pointer data-[state=checked]:bg-blue-600 dark:data-[state=checked]:bg-blue-500 flex-shrink-0 mt-1"
              />
            </div>

            <p className="text-sm leading-relaxed text-gray-600/90 dark:text-gray-400/90 pl-0 sm:pl-14">
              {formData.isPublic
                ? "Mọi người có thể tìm thấy, xem và học bộ flashcard này. Các hình ảnh trong thẻ cũng sẽ hiển thị và sử dụng công khai."
                : "Chỉ bạn mới có thể xem và học bộ flashcard này."}
            </p>
          </div>
        </div>
      </CardContent>

      {/* Create Topic Dialog */}
      <Dialog
        open={showCreateTopicDialog}
        onOpenChange={setShowCreateTopicDialog}
      >
        <DialogContent className="sm:max-w-[425px] bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-800/20 flex items-center justify-center">
                <Plus className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <span>Tạo chủ đề mới</span>
            </DialogTitle>
            <DialogDescription className="text-gray-600 dark:text-gray-400">
              Nhập tên cho chủ đề mới của bạn
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label
                htmlFor="topic-name"
                className="text-gray-900 dark:text-gray-200"
              >
                Tên chủ đề
              </Label>
              <Input
                id="topic-name"
                placeholder="Ví dụ: Tiếng Anh giao tiếp"
                value={newTopicName}
                onChange={(e) => setNewTopicName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && newTopicName.trim()) {
                    handleCreateTopic();
                  }
                }}
                className="h-11 border-gray-300 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400"
                autoFocus
              />
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Tên chủ đề sẽ giúp tổ chức và tìm kiếm flashcard dễ dàng hơn
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowCreateTopicDialog(false);
                setNewTopicName("");
              }}
              disabled={isCreatingTopic}
              className="border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Hủy
            </Button>
            <Button
              onClick={handleCreateTopic}
              disabled={!newTopicName.trim() || isCreatingTopic}
              className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white shadow-sm"
            >
              {isCreatingTopic ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Đang tạo...
                </>
              ) : (
                "Tạo chủ đề"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};
