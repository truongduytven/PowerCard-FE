import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { FormData, StudySet } from "@/types/create-folder";
import { motion } from "framer-motion";
import {
  BookOpen,
  Check,
  FileText,
  Grid,
  GripVertical,
  List,
  RotateCcw,
  Search,
  X,
} from "lucide-react";

interface MobileTabsProps {
  formData: FormData;
  handleInputChange: (field: keyof FormData, value: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  filteredStudySets: StudySet[];
  toggleStudySet: (setId: string) => void;
  formDataStudySets: string[];
  selectedStudySets: StudySet[];
  removeStudySet: (setId: string) => void;
  draggedIndex: number | null;
  dragOverIndex: number | null;
  handleDragStart: (index: number) => void;
  handleDragOver: (e: React.DragEvent, index: number) => void;
  handleDrop: (e: React.DragEvent, dropIndex: number) => void;
  handleDragEnd: () => void;
}

export default function MobileTabs({
  formData,
  handleInputChange,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  viewMode,
  setViewMode,
  filteredStudySets,
  toggleStudySet,
  formDataStudySets,
  selectedStudySets,
  removeStudySet,
  draggedIndex,
  dragOverIndex,
  handleDragStart,
  handleDragOver,
  handleDrop,
  handleDragEnd,
}: MobileTabsProps) {
  const categories = [
    "all",
    ...Array.from(new Set(filteredStudySets.map((set) => set.category))),
  ];

  return (
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
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Thông Tin Folder</CardTitle>
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
                  onChange={(e) => handleInputChange("title", e.target.value)}
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
          <Card>
            <CardContent className="p-4">
              <div className="space-y-4">
                {/* Search and Filter */}
                <div className="space-y-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Tìm study sets..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 h-10 text-sm"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                      >
                        <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex-1">
                      <Select
                        value={selectedCategory}
                        onValueChange={setSelectedCategory}
                      >
                        <SelectTrigger className="h-10 w-full">
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

                    {(searchQuery || selectedCategory !== "all") && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSearchQuery("");
                          setSelectedCategory("all");
                        }}
                        className="h-10 w-10 p-0"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </Button>
                    )}
                  </div>

                  {(searchQuery || selectedCategory !== "all") && (
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <Badge variant="outline" className="font-normal">
                        {filteredStudySets.length} kết quả
                      </Badge>
                      {selectedCategory !== "all" && (
                        <Badge variant="secondary" className="font-normal">
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

                {/* Quick Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2"></div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs font-normal">
                      {formDataStudySets.length} đã chọn
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        setViewMode(viewMode === "grid" ? "list" : "grid")
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
                </div>

                {/* Study Sets List */}
                <div className="space-y-3 max-h-[400px] overflow-y-auto">
                  {filteredStudySets.length > 0 ? (
                    filteredStudySets.map((set) => {
                      const isSelected = formDataStudySets.includes(set.id);
                      return (
                        <motion.div
                          key={set.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <button
                            onClick={() => toggleStudySet(set.id)}
                            className={`w-full p-3 rounded-lg border text-left transition-all ${
                              isSelected
                                ? "border-blue-500 bg-blue-50"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-8 h-8 rounded flex items-center justify-center ${
                                  isSelected ? "bg-blue-500" : "bg-gray-100"
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
                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                  <span className="flex items-center gap-1">
                                    <FileText className="w-3 h-3" />
                                    {set.cardCount} thẻ
                                  </span>
                                  <span>•</span>
                                  <span>{set.category}</span>
                                </div>
                                {set.tags && set.tags.length > 0 && (
                                  <div className="flex flex-wrap gap-1 mt-2">
                                    {set.tags.slice(0, 2).map((tag) => (
                                      <span
                                        key={tag}
                                        className="px-1.5 py-0.5 text-xs bg-gray-100 text-gray-600 rounded"
                                      >
                                        {tag}
                                      </span>
                                    ))}
                                    {set.tags.length > 2 && (
                                      <span className="px-1.5 py-0.5 text-xs text-gray-500">
                                        +{set.tags.length - 2}
                                      </span>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          </button>
                        </motion.div>
                      );
                    })
                  ) : (
                    <div className="py-8 text-center">
                      <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-700 text-sm font-medium mb-1">
                        Không tìm thấy study sets phù hợp
                      </p>
                      <p className="text-gray-500 text-xs">
                        Thử thay đổi từ khóa tìm kiếm hoặc chọn thể loại khác
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="selected" className="mt-4">
          {selectedStudySets.length > 0 ? (
            <Card>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Study Sets đã chọn</h3>
                      <p className="text-xs text-gray-500 mt-1">
                        Kéo thả để sắp xếp thứ tự
                      </p>
                    </div>
                    <Badge>{selectedStudySets.length}</Badge>
                  </div>

                  {/* Sort Order Select - Mobile */}
                  <div className="mb-3">
                    <Select
                      value={formData.sortOrder}
                      onValueChange={(value) =>
                        handleInputChange("sortOrder", value)
                      }
                    >
                      <SelectTrigger className="h-9 text-sm">
                        <SelectValue placeholder="Sắp xếp theo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="manual">Thủ công</SelectItem>
                        <SelectItem value="alphabetical">A → Z</SelectItem>
                        <SelectItem value="date">Ngày cập nhật</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
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
                        className={`flex items-center gap-3 p-3 bg-white rounded-lg border transition-all duration-200 ${
                          draggedIndex === index
                            ? "opacity-40 scale-95 shadow-lg border-blue-500"
                            : ""
                        } ${
                          dragOverIndex === index
                            ? "border-blue-500 bg-blue-50 shadow-lg scale-[1.02]"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        {/* Drag Handle */}
                        <div className="cursor-move">
                          <GripVertical className="w-4 h-4 text-gray-400" />
                        </div>

                        {/* Order Number */}
                        <span className="text-xs font-medium text-gray-500 w-5">
                          {index + 1}
                        </span>

                        {/* Set Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <div
                              className="w-6 h-6 rounded flex items-center justify-center flex-shrink-0"
                              style={{ background: formData.iconGradient }}
                            >
                              <BookOpen className="w-3 h-3 text-white" />
                            </div>
                            <p className="font-medium text-sm truncate">
                              {set.title}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Badge
                              variant="outline"
                              className="text-[10px] px-1.5 py-0"
                            >
                              {set.category}
                            </Badge>
                            <span>•</span>
                            <span>{set.cardCount} thẻ</span>
                          </div>
                        </div>

                        {/* Remove Button */}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeStudySet(set.id);
                          }}
                          className="h-7 w-7 p-0 flex-shrink-0 hover:bg-red-50 hover:text-red-600"
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </motion.div>
                    ))}
                  </div>

                  {/* Drag & Drop Instructions */}
                  <div className="pt-3 border-t border-gray-100">
                    <p className="text-xs text-gray-500 text-center">
                      <GripVertical className="w-3 h-3 inline mr-1" />
                      Giữ và kéo để thay đổi thứ tự
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 mb-2">
                  Chưa có study sets nào được chọn
                </p>
                <p className="text-gray-400 text-sm">
                  Chọn study sets từ tab "Study Sets"
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
