"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  availableStudySets,
  iconGradientOptions,
  iconOptions,
  StudySet,
} from "@/lib/mock/create-folder";
import { AnimatePresence, motion } from "framer-motion";
import {
  BarChart3,
  Book,
  BookOpen,
  Check,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Clock,
  Download,
  Edit2,
  Eye,
  FileText,
  FolderOpen,
  FolderPlus,
  Grid,
  GripVertical,
  HelpCircle,
  Info,
  LayoutGrid,
  List,
  Palette as PaletteIcon,
  Plus,
  RotateCcw,
  Search,
  Settings,
  Sparkle,
  Upload,
  X,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

// Types
interface FormData {
  title: string;
  description: string;
  icon: string;
  iconGradient: string;
  studySets: string[];
  tags: string[];
  visibility: "private" | "public" | "shared";
  colorTheme: string;
  sortOrder: "manual" | "alphabetical" | "date" | "progress";
}

export default function CreateFolderPage() {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    icon: "book",
    iconGradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    studySets: [],
    tags: [],
    visibility: "private",
    colorTheme: "blue",
    sortOrder: "manual",
  });

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [showTips, setShowTips] = useState<boolean>(true);
  const [autoSave, setAutoSave] = useState<boolean>(true);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-save effect
  useEffect(() => {
    if (autoSave && formData.title) {
      const timer = setTimeout(() => {
        localStorage.setItem("folderDraft", JSON.stringify(formData));
        toast.success("Đã tự động lưu");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [formData, autoSave]);

  // Load draft on mount
  useEffect(() => {
    const savedDraft = localStorage.getItem("folderDraft");
    if (savedDraft) {
      try {
        setFormData(JSON.parse(savedDraft));
        toast("Đã khôi phục bản nháp chưa lưu", {
          icon: "📝",
          duration: 3000,
        });
      } catch (error) {
        console.error("Error loading draft:", error);
      }
    }
  }, []);

  const handleInputChange = (
    field: keyof FormData,
    value: string | string[]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleStudySet = (setId: string) => {
    setFormData((prev) => ({
      ...prev,
      studySets: prev.studySets.includes(setId)
        ? prev.studySets.filter((id) => id !== setId)
        : [...prev.studySets, setId],
    }));
    toast.success("Đã cập nhật study set");
  };

  const removeStudySet = (setId: string) => {
    setFormData((prev) => ({
      ...prev,
      studySets: prev.studySets.filter((id) => id !== setId),
    }));
    toast.error("Đã xóa study set");
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

    const newStudySets = [...formData.studySets];
    const draggedItem = newStudySets[draggedIndex];
    newStudySets.splice(draggedIndex, 1);
    newStudySets.splice(dropIndex, 0, draggedItem);

    setFormData((prev) => ({ ...prev, studySets: newStudySets }));
    setDraggedIndex(null);
    setDragOverIndex(null);
    toast.success("Đã sắp xếp lại thứ tự");
  };

  // Hàm tính tiến trình
  const calculateProgress = () => {
    let progress = 0;
    const totalSteps = 3; // Title, Description, StudySets

    if (formData.title.trim().length > 0) progress += 1;
    if (formData.description.trim().length > 0) progress += 1;
    if (formData.studySets.length > 0) progress += 1;

    return Math.round((progress / totalSteps) * 100);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleSubmit = async () => {
    if (!formData.title) {
      toast.error("Vui lòng nhập tên folder");
      return;
    }
    if (formData.studySets.length === 0) {
      toast.error("Vui lòng chọn ít nhất 1 study set");
      return;
    }

    setIsExporting(true);
    toast.loading("Đang tạo folder...");

    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("Form Data:", formData);
    localStorage.removeItem("folderDraft");
    setIsExporting(false);
    setShowSuccess(true);
    toast.dismiss();
    toast.success("🎉 Folder đã được tạo thành công!");

    setTimeout(() => setShowSuccess(false), 5000);
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(formData, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${formData.title || "folder"}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Đã xuất cấu hình");
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const importedData = JSON.parse(content);
        setFormData(importedData);
        toast.success("Đã nhập cấu hình");
      } catch (error) {
        toast.error("Lỗi khi đọc file");
      }
    };
    reader.readAsText(file);
  };

  const quickAddStudySet = (count: number) => {
    const availableIds = availableStudySets
      .filter((set) => !formData.studySets.includes(set.id))
      .slice(0, count)
      .map((set) => set.id);

    setFormData((prev) => ({
      ...prev,
      studySets: [...prev.studySets, ...availableIds],
    }));
    toast.success(`Đã thêm ${count} study sets`);
  };

  const filteredStudySets = availableStudySets.filter((set) => {
    const matchesSearch =
      set.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      set.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      set.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesCategory =
      selectedCategory === "all" || set.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const selectedStudySets = formData.studySets
    .map((id) => availableStudySets.find((set) => set.id === id))
    .filter((set): set is StudySet => set !== undefined);

  const SelectedIcon =
    iconOptions.find((opt) => opt.value === formData.icon)?.icon || Book;

  const categories = [
    "all",
    ...Array.from(new Set(availableStudySets.map((set) => set.category))),
  ];

  // Statistics
  const totalCards = selectedStudySets.reduce(
    (acc, set) => acc + set.cardCount,
    0
  );

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 p-3 md:p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header với Control Bar */}
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                  Tạo Folder Mới
                  <motion.span
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Sparkle className="w-6 h-6 md:w-8 md:h-8 text-yellow-500" />
                  </motion.span>
                </h1>
                <p className="text-gray-600 text-sm md:text-base max-w-2xl">
                  Tổ chức các bộ học tập của bạn một cách khoa học
                </p>
              </div>

              {/* Control Bar - Compact trên mobile */}
              <div className="flex items-center gap-2 flex-wrap">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleExport}
                      disabled={isExporting}
                      className="h-9 px-3"
                    >
                      <Download className="w-4 h-4" />
                      <span className="hidden sm:inline ml-2">Xuất</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Xuất cấu hình folder</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => fileInputRef.current?.click()}
                      className="h-9 px-3"
                    >
                      <Upload className="w-4 h-4" />
                      <span className="hidden sm:inline ml-2">Nhập</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Nhập cấu hình từ file</TooltipContent>
                </Tooltip>

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImport}
                  accept=".json"
                  className="hidden"
                />

                <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg border text-sm">
                  <Switch
                    checked={autoSave}
                    onCheckedChange={setAutoSave}
                    className="scale-90"
                  />
                  <span className="text-gray-600 whitespace-nowrap">
                    Auto-save
                  </span>
                </div>
              </div>
            </div>

            {/* Progress & Preview Icon */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6"
            >
              <div className="flex-1">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Tiến độ tạo folder</span>
                    <span>{calculateProgress()}%</span>
                  </div>
                  <Progress value={calculateProgress()} className="h-2" />

                  <div className="flex justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          formData.title.trim().length > 0
                            ? "bg-green-500"
                            : "bg-gray-300"
                        }`}
                      />
                      <span>Tiêu đề</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          formData.description.trim().length > 0
                            ? "bg-green-500"
                            : "bg-gray-300"
                        }`}
                      />
                      <span>Mô tả</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          formData.studySets.length > 0
                            ? "bg-green-500"
                            : "bg-gray-300"
                        }`}
                      />
                      <span>Study Sets</span>
                    </div>
                  </div>
                </div>
              </div>

              <motion.div
                className="flex items-center justify-center md:justify-end"
                whileHover={{ scale: 1.05 }}
              >
                <div
                  className="w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center shadow-lg"
                  style={{ background: formData.iconGradient }}
                >
                  <SelectedIcon className="w-8 h-8 md:w-10 md:h-10 text-white" />
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Success Message */}
          <AnimatePresence>
            {showSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                className="mb-6"
              >
                <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200">
                  <CardContent className="p-4 md:p-6">
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Check className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
                      </div>
                      <div className="flex-1 text-center sm:text-left">
                        <h3 className="font-bold text-green-900 text-base md:text-lg">
                          🎉 Folder đã được tạo thành công!
                        </h3>
                        <p className="text-green-700 text-sm md:text-base">
                          Bạn có thể xem folder trong thư viện học tập.
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-green-300 text-green-700 whitespace-nowrap"
                      >
                        Xem ngay
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Column - Form & Study Sets (2/3 trên desktop) */}
            <div className="lg:col-span-2 space-y-6">
              {/* Tabs Navigation cho Mobile/Tablet */}
              <div className="lg:hidden mb-4">
                <Tabs defaultValue="basic" className="w-full">
                  <TabsList className="grid grid-cols-3 w-full">
                    <TabsTrigger value="basic">Thông tin</TabsTrigger>
                    <TabsTrigger value="sets">Study Sets</TabsTrigger>
                    <TabsTrigger value="selected">
                      Đã chọn ({selectedStudySets.length})
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="basic" className="space-y-6 mt-4">
                    {/* Basic Info Card - Compact */}
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">
                          Thông Tin Folder
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="title" className="text-sm">
                            Tên Folder <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="title"
                            placeholder="VD: Ôn thi TOEIC"
                            value={formData.title}
                            onChange={(e) =>
                              handleInputChange("title", e.target.value)
                            }
                            maxLength={60}
                            className="h-10"
                          />
                          <p className="text-xs text-gray-500">
                            {formData.title.length}/60 ký tự
                          </p>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="description" className="text-sm">
                            Mô Tả
                          </Label>
                          <Textarea
                            id="description"
                            placeholder="Mô tả ngắn gọn..."
                            value={formData.description}
                            onChange={(e) =>
                              handleInputChange("description", e.target.value)
                            }
                            maxLength={200}
                            className="min-h-[80px] text-sm"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="sets" className="mt-4">
                    {/* Study Sets Selection - Compact */}
                    <Card>
                      <CardContent className="p-4">
                        <div className="space-y-4">
                          {/* Search và Filter */}
                          <div className="space-y-3">
                            <div className="relative">
                              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                              <Input
                                placeholder="Tìm study sets..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-9 h-10 text-sm"
                              />
                            </div>

                            <Select
                              value={selectedCategory}
                              onValueChange={setSelectedCategory}
                            >
                              <SelectTrigger className="h-10">
                                <SelectValue placeholder="Thể loại" />
                              </SelectTrigger>
                              <SelectContent>
                                {categories.map((cat) => (
                                  <SelectItem
                                    key={cat}
                                    value={cat}
                                    className="text-sm"
                                  >
                                    {cat === "all" ? "Tất cả" : cat}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          {/* Quick Actions */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => quickAddStudySet(1)}
                                className="h-8 px-3 text-xs"
                              >
                                +1
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => quickAddStudySet(3)}
                                className="h-8 px-3 text-xs"
                              >
                                +3
                              </Button>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                setViewMode(
                                  viewMode === "grid" ? "list" : "grid"
                                )
                              }
                              className="h-8 w-8 p-0"
                            >
                              {viewMode === "grid" ? (
                                <List className="w-4 h-4" />
                              ) : (
                                <Grid className="w-4 h-4" />
                              )}
                            </Button>
                          </div>

                          {/* Study Sets List */}
                          <div className="space-y-3 max-h-[400px] overflow-y-auto">
                            {filteredStudySets.map((set) => {
                              const isSelected = formData.studySets.includes(
                                set.id
                              );
                              return (
                                <button
                                  key={set.id}
                                  onClick={() => toggleStudySet(set.id)}
                                  className={`w-full p-3 rounded-lg border text-left transition-all ${
                                    isSelected
                                      ? "border-blue-500 bg-blue-50"
                                      : "border-gray-200"
                                  }`}
                                >
                                  <div className="flex items-center gap-3">
                                    <div
                                      className={`w-8 h-8 rounded flex items-center justify-center ${
                                        isSelected
                                          ? "bg-blue-500"
                                          : "bg-gray-100"
                                      }`}
                                    >
                                      {isSelected ? (
                                        <Check className="w-4 h-4 text-white" />
                                      ) : (
                                        <BookOpen className="w-4 h-4 text-gray-600" />
                                      )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <p className="font-medium text-sm truncate">
                                        {set.title}
                                      </p>
                                      <p className="text-xs text-gray-500">
                                        {set.cardCount} thẻ • {set.category}
                                      </p>
                                    </div>
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="selected" className="mt-4">
                    {/* Selected Sets - Compact */}
                    {selectedStudySets.length > 0 ? (
                      <Card>
                        <CardContent className="p-4">
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium">
                                Study Sets đã chọn
                              </h3>
                              <Badge>{selectedStudySets.length}</Badge>
                            </div>
                            <div className="space-y-2">
                              {selectedStudySets.map((set, index) => (
                                <div
                                  key={set.id}
                                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                                >
                                  <div className="flex items-center gap-3">
                                    <span className="text-sm text-gray-500 w-6">
                                      {index + 1}.
                                    </span>
                                    <p className="text-sm font-medium">
                                      {set.title}
                                    </p>
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeStudySet(set.id)}
                                    className="h-7 w-7 p-0"
                                  >
                                    <X className="w-3 h-3" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ) : (
                      <Card>
                        <CardContent className="p-8 text-center">
                          <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                          <p className="text-gray-500">
                            Chưa có study sets nào được chọn
                          </p>
                        </CardContent>
                      </Card>
                    )}
                  </TabsContent>
                </Tabs>
              </div>

              {/* Desktop Layout (ẩn trên mobile khi dùng tabs) */}
              <div className="hidden lg:block space-y-6">
                {/* Basic Info Card */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-xl">
                        Thông Tin Folder
                      </CardTitle>

                      <TooltipProvider delayDuration={150}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button className="text-gray-400 hover:text-blue-600 transition-colors">
                              <HelpCircle className="w-4 h-4" />
                            </button>
                          </TooltipTrigger>

                          <TooltipContent side="right" className="max-w-xs">
                            <p className="text-sm">
                              Hãy đặt tên cho folder, mô tả mục tiêu học và chọn
                              các bộ flashcard cùng chủ đề để dễ ôn tập và quản
                              lý.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>

                    <CardDescription>
                      Đặt tên và mô tả cho folder của bạn
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <Label htmlFor="title" className="text-sm font-medium">
                          Tên Folder <span className="text-red-500">*</span>
                        </Label>
                        <span className="text-xs text-gray-500">
                          {formData.title.length}/60
                        </span>
                      </div>
                      <Input
                        id="title"
                        placeholder="Ví dụ: Ôn thi TOEIC 800+"
                        value={formData.title}
                        onChange={(e) =>
                          handleInputChange("title", e.target.value)
                        }
                        maxLength={60}
                        className="h-11"
                      />
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <Label
                          htmlFor="description"
                          className="text-sm font-medium"
                        >
                          Mô Tả
                        </Label>
                        <span className="text-xs text-gray-500">
                          {formData.description.length}/200
                        </span>
                      </div>
                      <Textarea
                        id="description"
                        placeholder="Mô tả nội dung, mục tiêu học tập..."
                        value={formData.description}
                        onChange={(e) =>
                          handleInputChange("description", e.target.value)
                        }
                        maxLength={200}
                        className="min-h-[100px] resize-none"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Study Sets Selection */}
                <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <CardHeader className="pb-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center flex-shrink-0">
                          <LayoutGrid className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-lg sm:text-xl">
                            Chọn Study Sets
                          </CardTitle>
                          <CardDescription className="text-sm">
                            Tìm và chọn các bộ flashcard để thêm vào folder
                          </CardDescription>
                        </div>
                      </div>

                      {/* Quick Add Buttons */}
                      <div className="flex items-center gap-2 flex-wrap justify-end">
                        <div className="flex items-center gap-2">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => quickAddStudySet(1)}
                                disabled={
                                  formData.studySets.length >=
                                  availableStudySets.length
                                }
                                className="h-9 px-3"
                              >
                                <Plus className="w-3.5 h-3.5 sm:mr-1" />
                                <span className="hidden sm:inline">+1</span>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent side="bottom">
                              Thêm 1 study set ngẫu nhiên
                            </TooltipContent>
                          </Tooltip>

                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => quickAddStudySet(3)}
                                disabled={
                                  formData.studySets.length >=
                                  availableStudySets.length
                                }
                                className="h-9 px-3"
                              >
                                <Plus className="w-3.5 h-3.5 sm:mr-1" />
                                <span className="hidden sm:inline">+3</span>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent side="bottom">
                              Thêm 3 study sets ngẫu nhiên
                            </TooltipContent>
                          </Tooltip>

                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  setViewMode(
                                    viewMode === "grid" ? "list" : "grid"
                                  )
                                }
                                className="h-9 w-9 p-0"
                              >
                                {viewMode === "grid" ? (
                                  <List className="w-4 h-4" />
                                ) : (
                                  <Grid className="w-4 h-4" />
                                )}
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent side="bottom">
                              {viewMode === "grid"
                                ? "Xem danh sách"
                                : "Xem lưới"}
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {/* Enhanced Search and Filters */}
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                          <div className="md:col-span-4 relative group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 group-focus-within:text-primary" />
                            <Input
                              placeholder="Tìm kiếm theo tên, thể loại hoặc tags..."
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              className="pl-10 pr-9 h-11"
                            />
                            {searchQuery && (
                              <button
                                onClick={() => setSearchQuery("")}
                                className="absolute right-3 top-1/2 -translate-y-1/2"
                              >
                                <X className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                              </button>
                            )}
                          </div>

                          {/* SELECT */}
                          <div className="md:col-span-1">
                            <Select
                              value={selectedCategory}
                              onValueChange={setSelectedCategory}
                            >
                              <SelectTrigger className="h-11">
                                <SelectValue placeholder="Thể loại" />
                              </SelectTrigger>
                              <SelectContent>
                                {categories.map((cat) => (
                                  <SelectItem key={cat} value={cat}>
                                    {cat === "all" ? "Tất cả thể loại" : cat}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        {(searchQuery || selectedCategory !== "all") && (
                          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
                            <p>
                              Tìm thấy{" "}
                              <span className="font-semibold text-gray-900">
                                {filteredStudySets.length}
                              </span>{" "}
                              kết quả
                            </p>
                            {selectedCategory !== "all" && (
                              <Badge
                                variant="secondary"
                                className="font-normal"
                              >
                                {selectedCategory}
                              </Badge>
                            )}
                            {searchQuery && (
                              <Badge variant="outline" className="font-normal">
                                "{searchQuery}"
                              </Badge>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Study Sets Grid/List */}
                      <div>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                          <h3 className="font-medium text-gray-900 text-base">
                            Study Sets có sẵn
                            <span className="ml-2 text-sm font-normal text-gray-500">
                              ({availableStudySets.length})
                            </span>
                          </h3>
                          <div className="flex items-center gap-2">
                            <Badge
                              variant="outline"
                              className="text-xs font-medium"
                            >
                              {filteredStudySets.length} đang hiển thị
                            </Badge>
                            {formData.studySets.length > 0 && (
                              <Badge className="text-xs bg-blue-100 text-blue-800 border-blue-200">
                                {formData.studySets.length} đã chọn
                              </Badge>
                            )}
                          </div>
                        </div>

                        <div
                          className={`${
                            viewMode === "grid"
                              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4"
                              : "space-y-3 sm:space-y-4"
                          } max-h-[600px] overflow-y-auto pr-2 pt-4 custom-scrollbar`}
                        >
                          {filteredStudySets.length > 0 ? (
                            filteredStudySets.map((set) => {
                              const isSelected = formData.studySets.includes(
                                set.id
                              );
                              return (
                                <motion.div
                                  key={set.id}
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ duration: 0.2 }}
                                  whileHover={{ y: -2 }}
                                  className="relative"
                                >
                                  <button
                                    type="button"
                                    onClick={() => toggleStudySet(set.id)}
                                    className={`w-full p-3 sm:p-4 rounded-xl border text-left transition-all duration-200 ${
                                      isSelected
                                        ? "border-blue-500 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-sm"
                                        : "border-gray-200 hover:border-blue-300 hover:shadow-sm bg-white"
                                    } ${
                                      viewMode === "list"
                                        ? "flex items-center gap-4"
                                        : "flex flex-col"
                                    }`}
                                  >
                                    <div
                                      className={`flex-shrink-0 ${
                                        viewMode === "list"
                                          ? "w-10 h-10"
                                          : "w-12 h-12 mb-3"
                                      } rounded-lg flex items-center justify-center transition-all ${
                                        isSelected
                                          ? "bg-gradient-to-br from-blue-500 to-purple-600 shadow-md"
                                          : "bg-gray-100"
                                      }`}
                                    >
                                      {isSelected ? (
                                        <Check className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                      ) : (
                                        <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
                                      )}
                                    </div>

                                    <div
                                      className={`flex-1 min-w-0 ${
                                        viewMode === "list" ? "" : "w-full"
                                      }`}
                                    >
                                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-2">
                                        <p
                                          className={`font-medium text-sm sm:text-base truncate ${
                                            isSelected
                                              ? "text-blue-900"
                                              : "text-gray-900"
                                          }`}
                                        >
                                          {set.title}
                                        </p>

                                        {viewMode === "list" &&
                                          set.tags &&
                                          set.tags.length > 0 && (
                                            <div className="flex flex-wrap gap-1.5 mt-3">
                                              {set.tags
                                                .slice(0, 3)
                                                .map((tag) => (
                                                  <span
                                                    key={tag}
                                                    className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded-md"
                                                  >
                                                    {tag}
                                                  </span>
                                                ))}
                                              {set.tags.length > 3 && (
                                                <span className="px-2 py-0.5 text-xs text-gray-500">
                                                  +{set.tags.length - 3}
                                                </span>
                                              )}
                                            </div>
                                          )}
                                      </div>

                                      <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600">
                                        <span className="flex items-center gap-1">
                                          <FileText className="w-3.5 h-3.5" />
                                          {set.cardCount} thẻ
                                        </span>
                                        <span className="text-gray-300">•</span>
                                        <span className="text-gray-500">
                                          {set.lastModified}
                                        </span>
                                      </div>
                                      {viewMode === "grid" &&
                                        set.tags &&
                                        set.tags.length > 0 && (
                                          <div className="flex flex-wrap gap-1.5 mt-3">
                                            {set.tags.slice(0, 3).map((tag) => (
                                              <span
                                                key={tag}
                                                className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded-md"
                                              >
                                                {tag}
                                              </span>
                                            ))}
                                            {set.tags.length > 3 && (
                                              <span className="px-2 py-0.5 text-xs text-gray-500">
                                                +{set.tags.length - 3}
                                              </span>
                                            )}
                                          </div>
                                        )}
                                    </div>
                                  </button>
                                </motion.div>
                              );
                            })
                          ) : (
                            <div className="col-span-full py-12 sm:py-16 text-center">
                              <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                                <BookOpen className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400" />
                              </div>
                              <p className="text-gray-700 text-base sm:text-lg mb-2 font-medium">
                                Không tìm thấy study sets phù hợp
                              </p>
                              <p className="text-gray-500 text-sm sm:text-base max-w-sm mx-auto">
                                Thử thay đổi từ khóa tìm kiếm hoặc chọn thể loại
                                khác
                              </p>
                              {(searchQuery || selectedCategory !== "all") && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    setSearchQuery("");
                                    setSelectedCategory("all");
                                  }}
                                  className="mt-4"
                                >
                                  <RotateCcw className="w-4 h-4 mr-2" />
                                  Đặt lại bộ lọc
                                </Button>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                {/* Selected Study Sets with Drag & Drop */}
                {selectedStudySets.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <Card className="border border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                              <GripVertical className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <CardTitle className="text-xl">
                                Study Sets Đã Chọn
                              </CardTitle>
                              <CardDescription className="text-blue-700">
                                Kéo thả để sắp xếp thứ tự hiển thị
                              </CardDescription>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Select
                              value={formData.sortOrder}
                              onValueChange={(value) =>
                                handleInputChange("sortOrder", value)
                              }
                            >
                              <SelectTrigger className="w-[180px] bg-white">
                                <SelectValue placeholder="Sắp xếp" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="manual">Thủ công</SelectItem>
                                <SelectItem value="alphabetical">
                                  A → Z
                                </SelectItem>
                                <SelectItem value="date">
                                  Ngày cập nhật
                                </SelectItem>
                              </SelectContent>
                            </Select>

                            <Badge className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                              {selectedStudySets.length} sets
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {selectedStudySets.map((set, index) => (
                            <motion.div
                              key={set.id}
                              layout
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.9 }}
                              draggable
                              onDragStart={() => handleDragStart(index)}
                              onDragOver={(e) => handleDragOver(e, index)}
                              onDrop={(e) => handleDrop(e, index)}
                              onDragEnd={handleDragEnd}
                              className={`group flex items-center gap-4 p-4 bg-white rounded-xl border border-blue-100 cursor-move transition-all duration-200 shadow-sm hover:shadow-md ${
                                draggedIndex === index
                                  ? "opacity-40 scale-95 shadow-lg"
                                  : ""
                              } ${
                                dragOverIndex === index
                                  ? "border-blue-500 shadow-lg scale-[1.02] bg-blue-50"
                                  : "hover:border-blue-300"
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <GripVertical className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                                <span className="text-sm font-medium text-gray-500 w-6">
                                  {index + 1}
                                </span>
                              </div>

                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-3 mb-1">
                                  <div
                                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md"
                                    style={{
                                      background: formData.iconGradient,
                                    }}
                                  >
                                    <BookOpen className="w-5 h-5 text-white" />
                                  </div>
                                  <div>
                                    <p className="font-semibold text-gray-900 truncate">
                                      {set.title}
                                    </p>
                                    <div className="flex items-center gap-3 text-xs text-gray-500">
                                      <Badge
                                        variant="outline"
                                        className="text-xs"
                                      >
                                        {set.category}
                                      </Badge>
                                      <span>•</span>
                                      <span>{set.cardCount} thẻ</span>
                                      <span>•</span>
                                      <span>Cập nhật: {set.lastModified}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeStudySet(set.id)}
                                className="opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 hover:text-red-600"
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Right Column - Preview & Actions (1/3 trên desktop) - STICKY */}
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-20 space-y-6">
                {/* Preview Card */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Eye className="w-5 h-5" />
                      Xem Trước
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-5 hover:shadow-2xl hover:shadow-blue-500/10 dark:hover:shadow-blue-500/20 hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      <div className="relative">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div
                              className="text-2xl p-3 rounded-xl bg-opacity-10 group-hover:scale-110 transition-transform duration-300"
                              style={{
                                background: formData.iconGradient,
                                backgroundSize: "200% 200%",
                                animation: "gradientShift 5s ease infinite",
                              }}
                            >
                              <SelectedIcon className="text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-bold text-gray-900 dark:text-white text-base mb-1 line-clamp-1">
                                {formData.title || "Tên folder"}
                              </h3>
                              <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                                {formData.description || "Mô tả folder"}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="mb-4">
                          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <FolderOpen className="h-4 w-4" />
                            <span>{selectedStudySets.length} decks</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            Now
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button className="flex-1 px-3 py-2 text-sm font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group-hover:scale-105 shadow-lg shadow-blue-500/30">
                            <ChevronRight className="h-3.5 w-3.5" />
                            Open Folder
                          </button>
                          <button className="p-2 border border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-500 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 rounded-lg transition-all duration-300">
                            <Edit2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Customization Section - Collapsible */}
                <Card>
                  <CardHeader className="pb-4">
                    <button
                      onClick={() => setShowAdvanced(!showAdvanced)}
                      className="flex items-center justify-between w-full"
                    >
                      <div className="flex items-center gap-2">
                        <PaletteIcon className="w-5 h-5 text-purple-600" />
                        <CardTitle className="text-lg">Tùy Chỉnh</CardTitle>
                      </div>
                      {showAdvanced ? (
                        <ChevronUp className="w-5 h-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                      )}
                    </button>
                  </CardHeader>

                  <AnimatePresence>
                    {showAdvanced && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        <CardContent className="pt-0 space-y-6">
                          {/* Icon Selection */}
                          <div className="space-y-3">
                            <Label className="text-sm font-medium">
                              Biểu Tượng
                            </Label>
                            <div className="grid grid-cols-4 gap-2">
                              {iconOptions.slice(0, 8).map((option) => {
                                const Icon = option.icon;
                                const isSelected =
                                  formData.icon === option.value;
                                return (
                                  <button
                                    key={option.value}
                                    onClick={() =>
                                      handleInputChange("icon", option.value)
                                    }
                                    className={`p-2 rounded-lg border ${
                                      isSelected
                                        ? "border-blue-500 bg-blue-50"
                                        : "border-gray-200"
                                    }`}
                                  >
                                    <div
                                      className="w-8 h-8 rounded flex items-center justify-center mx-auto"
                                      style={{
                                        background: formData.iconGradient,
                                      }}
                                    >
                                      <Icon className="w-4 h-4 text-white" />
                                    </div>
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {/* Gradient Selection */}
                          <div className="space-y-3">
                            <Label className="text-sm font-medium">
                              Màu Gradient
                            </Label>
                            <div className="grid grid-cols-5 gap-2">
                              {iconGradientOptions
                                .slice(0, 8)
                                .map((gradient) => {
                                  const isSelected =
                                    formData.iconGradient === gradient.value;
                                  return (
                                    <button
                                      key={gradient.value}
                                      onClick={() =>
                                        handleInputChange(
                                          "iconGradient",
                                          gradient.value
                                        )
                                      }
                                      className={`aspect-square rounded border-2 ${
                                        isSelected
                                          ? "border-gray-900 ring-2 ring-blue-500"
                                          : "border-white"
                                      }`}
                                      style={{ background: gradient.value }}
                                    />
                                  );
                                })}
                            </div>
                          </div>
                        </CardContent>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>

                {/* Action Buttons - Để ở cuối nhưng không sticky */}
                <div className="space-y-4 sticky bottom-0 b bg-white">
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <Button
                      onClick={handleSubmit}
                      size="lg"
                      className="w-full h-12 text-base font-semibold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                      disabled={
                        !formData.title ||
                        formData.studySets.length === 0 ||
                        isExporting
                      }
                    >
                      <FolderPlus className="w-5 h-5 mr-2" />
                      {isExporting ? "Đang tạo..." : "Tạo Folder"}
                    </Button>
                  </motion.div>

                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      variant="outline"
                      className="h-11"
                      onClick={() => {
                        if (confirm("Bạn có chắc muốn hủy?")) {
                          window.history.back();
                        }
                      }}
                    >
                      Hủy
                    </Button>
                    <Button
                      variant="outline"
                      className="h-11"
                      onClick={() => {
                        if (confirm("Bạn có chắc muốn đặt lại?")) {
                          setFormData({
                            title: "",
                            description: "",
                            icon: "book",
                            iconGradient:
                              "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                            studySets: [],
                            tags: [],
                            visibility: "private",
                            colorTheme: "blue",
                            sortOrder: "manual",
                          });
                          toast.success("Đã đặt lại");
                        }
                      }}
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Đặt lại
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes gradientShift {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
          
          .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
            height: 8px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #f8fafc;
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #cbd5e1;
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #94a3b8;
          }
        `}</style>
      </div>
    </TooltipProvider>
  );
}
