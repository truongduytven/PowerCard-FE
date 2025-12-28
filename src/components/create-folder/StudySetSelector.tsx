import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion } from "framer-motion";
import {
  Search,
  X,
  Grid,
  List,
  Plus,
  LayoutGrid,
  FileText,
  BookOpen,
  Check,
  RotateCcw,
} from "lucide-react";
import { StudySet } from "@/types/create-folder";

interface StudySetSelectorProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  filteredStudySets: StudySet[];
  toggleStudySet: (setId: string) => void;
  formDataStudySets: string[];
  quickAddStudySet: (count: number) => void;
  selectedStudySets: StudySet[];
}

export default function StudySetSelector({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  viewMode,
  setViewMode,
  filteredStudySets,
  toggleStudySet,
  formDataStudySets,
  quickAddStudySet,
  selectedStudySets,
}: StudySetSelectorProps) {
  const categories = [
    "all",
    ...Array.from(new Set(filteredStudySets.map((set) => set.category))),
  ];

  return (
    <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <LayoutGrid className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <CardTitle className="text-lg sm:text-xl">
                Chọn Study Sets
              </CardTitle>
              <CardDescription className="text-sm truncate">
                Tìm và chọn các bộ flashcard để thêm vào folder
              </CardDescription>
            </div>
          </div>

          {/* Quick Add Buttons - Cải tiến layout */}
          <div className="flex items-center gap-2 flex-wrap justify-end">
            <div className="flex items-center gap-1 sm:gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => quickAddStudySet(1)}
                    className="h-9 px-2 sm:px-3 min-w-[60px] sm:min-w-0"
                  >
                    <Plus className="w-3.5 h-3.5 mr-1" />
                    <span>+1</span>
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
                    className="h-9 px-2 sm:px-3 min-w-[60px] sm:min-w-0"
                  >
                    <Plus className="w-3.5 h-3.5 mr-1" />
                    <span>+3</span>
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
                      setViewMode(viewMode === "grid" ? "list" : "grid")
                    }
                    className="h-9 w-9 p-0 flex-shrink-0"
                  >
                    {viewMode === "grid" ? (
                      <List className="w-4 h-4" />
                    ) : (
                      <Grid className="w-4 h-4" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  {viewMode === "grid" ? "Xem danh sách" : "Xem lưới"}
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
            {/* Search Bar - Cải tiến để responsive tốt hơn */}
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 group-focus-within:text-primary" />
              <Input
                placeholder="Tìm kiếm theo tên, thể loại hoặc tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-9 h-11 text-sm sm:text-base"
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

            {/* Filter Controls - Xếp hàng ngang trên desktop */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger className="h-11 w-full">
                    <SelectValue placeholder="Tất cả thể loại" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat} className="text-sm">
                        {cat === "all" ? "Tất cả thể loại" : cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Stats and Reset Button */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 text-sm">
                  <Badge variant="outline" className="font-normal">
                    {filteredStudySets.length} đang hiển thị
                  </Badge>
                  {selectedStudySets.length > 0 && (
                    <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                      {selectedStudySets.length} đã chọn
                    </Badge>
                  )}
                </div>

                {(searchQuery || selectedCategory !== "all") && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSearchQuery("");
                          setSelectedCategory("all");
                        }}
                        className="h-9 w-9 p-0"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Đặt lại bộ lọc</TooltipContent>
                  </Tooltip>
                )}
              </div>
            </div>

            {/* Search Results Summary */}
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

          {/* Study Sets Grid/List */}
          <div>
            {/* Section Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <h3 className="font-medium text-gray-900 text-base sm:text-lg">
                  Study Sets có sẵn
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {filteredStudySets.length} sets
                </p>
              </div>
            </div>

            {/* Study Sets Display */}
            <div
              className={`${
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4"
                  : "space-y-3 sm:space-y-4"
              } max-h-[600px] overflow-y-auto pr-2 pt-2 custom-scrollbar`}
            >
              {filteredStudySets.length > 0 ? (
                filteredStudySets.map((set) => {
                  const isSelected = formDataStudySets.includes(set.id);
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
                            viewMode === "list" ? "w-10 h-10" : "w-12 h-12 mb-3"
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
                                isSelected ? "text-blue-900" : "text-gray-900"
                              }`}
                            >
                              {set.title}
                            </p>
                          </div>

                          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <FileText className="w-3.5 h-3.5" />
                              {set.cardCount} thẻ
                            </span>
                            <span className="text-gray-300">•</span>
                            <span className="text-gray-500">
                              {set.category}
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

                        {viewMode === "list" &&
                          set.tags &&
                          set.tags.length > 0 && (
                            <div className="hidden sm:flex flex-wrap gap-1.5">
                              {set.tags.slice(0, 2).map((tag) => (
                                <span
                                  key={tag}
                                  className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded-md"
                                >
                                  {tag}
                                </span>
                              ))}
                              {set.tags.length > 2 && (
                                <span className="px-2 py-0.5 text-xs text-gray-500">
                                  +{set.tags.length - 2}
                                </span>
                              )}
                            </div>
                          )}
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
                    Thử thay đổi từ khóa tìm kiếm hoặc chọn thể loại khác
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
  );
}
