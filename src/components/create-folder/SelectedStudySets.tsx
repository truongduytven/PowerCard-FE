import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import { X, GripVertical, BookOpen } from "lucide-react";
import { FormData, StudySet } from "@/types/create-folder";

interface SelectedStudySetsProps {
  formData: FormData;
  handleInputChange: (field: keyof FormData, value: string) => void;
  selectedStudySets: StudySet[];
  removeStudySet: (setId: string) => void;
  draggedIndex: number | null;
  dragOverIndex: number | null;
  handleDragStart: (index: number) => void;
  handleDragOver: (e: React.DragEvent, index: number) => void;
  handleDrop: (e: React.DragEvent, dropIndex: number) => void;
  handleDragEnd: () => void;
}

export default function SelectedStudySets({
  formData,
  handleInputChange,
  selectedStudySets,
  removeStudySet,
  draggedIndex,
  dragOverIndex,
  handleDragStart,
  handleDragOver,
  handleDrop,
  handleDragEnd,
}: SelectedStudySetsProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="border  bg-white/70 dark:bg-gray-900/60 border-gray-200/60 dark:border-gray-800/60 shadow-lg dark:shadow-gray-900/30">
        <CardHeader className="pb-3">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <GripVertical className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl text-gray-900 dark:text-white">
                  Study Sets Đã Chọn
                </CardTitle>
                <CardDescription className="text-pink-700 dark:text-pink-300">
                  Kéo thả để sắp xếp thứ tự hiển thị
                </CardDescription>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <Select
                value={formData.sortOrder}
                onValueChange={(value) => handleInputChange("sortOrder", value)}
              >
                <SelectTrigger className="w-full sm:w-[180px] bg-white dark:bg-gray-800 cursor-pointer border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-purple-500 dark:focus:ring-purple-400">
                  <SelectValue placeholder="Sắp xếp" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                  <SelectItem
                    value="manual"
                    className="text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:bg-gray-100 dark:focus:bg-gray-700"
                  >
                    Thủ công
                  </SelectItem>
                  <SelectItem
                    value="alphabetical"
                    className="text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:bg-gray-100 dark:focus:bg-gray-700"
                  >
                    A → Z
                  </SelectItem>
                  <SelectItem
                    value="date"
                    className="text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:bg-gray-100 dark:focus:bg-gray-700"
                  >
                    Ngày cập nhật
                  </SelectItem>
                </SelectContent>
              </Select>

              <Badge className="bg-gradient-to-br from-purple-500 to-pink-600 text-white hover:from-purple-600 hover:to-pink-700 dark:from-purple-600 dark:to-pink-700 dark:hover:from-purple-700 dark:hover:to-pink-800">
                {selectedStudySets.length} sets
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {selectedStudySets.length > 0 ? (
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
                  className={`group flex items-center gap-4 p-4 rounded-xl border cursor-move transition-all duration-200 shadow-sm hover:shadow-md ${
                    draggedIndex === index
                      ? "opacity-40 scale-95 shadow-lg dark:shadow-gray-900/50"
                      : ""
                  } ${
                    dragOverIndex === index
                      ? "border-pink-500 dark:border-pink-600 shadow-lg dark:shadow-pink-900/30 scale-[1.02] bg-pink-50 dark:bg-pink-950/30"
                      : "border-pink-100 dark:border-pink-900/30 hover:border-pink-300 dark:hover:border-pink-700"
                  } bg-white dark:bg-gray-800`}
                >
                  <div className="flex items-center gap-2">
                    <GripVertical className="w-5 h-5 text-gray-400 dark:text-gray-600 group-hover:text-pink-500 dark:group-hover:text-pink-400 transition-colors" />
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400 w-6">
                      {index + 1}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md"
                        style={{ background: formData.iconGradient }}
                      >
                        <BookOpen className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 dark:text-white truncate">
                          {set.title}
                        </p>
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-gray-500 dark:text-gray-400 mt-1">
                          <Badge
                            variant="outline"
                            className="text-xs border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
                          >
                            {set.category}
                          </Badge>
                          <span className="text-gray-300 dark:text-gray-600 hidden sm:inline">
                            •
                          </span>
                          <span>{set.cardCount} thẻ</span>
                          <span className="text-gray-300 dark:text-gray-600 hidden sm:inline">
                            •
                          </span>
                          <span className="truncate">
                            Cập nhật: {set.lastModified}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Tags display for mobile */}
                    {set.tags && set.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2 sm:hidden">
                        {set.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-md"
                          >
                            {tag}
                          </span>
                        ))}
                        {set.tags.length > 2 && (
                          <span className="px-2 py-0.5 text-xs text-gray-500 dark:text-gray-500">
                            +{set.tags.length - 2}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeStudySet(set.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 dark:hover:bg-red-950/30 hover:text-red-600 dark:hover:text-red-400 flex-shrink-0"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-purple-500 dark:text-purple-400" />
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-lg font-medium mb-2">
                Chưa có study sets nào được chọn
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-sm max-w-md mx-auto">
                Hãy chọn các study sets từ danh sách bên trên để thêm vào folder
                của bạn
              </p>
            </div>
          )}

          {/* Drag and Drop Instructions */}
          {selectedStudySets.length > 0 && (
            <div className="mt-4 pt-4 border-t border-pink-100 dark:border-pink-900/30">
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <GripVertical className="w-4 h-4 text-pink-500 dark:text-pink-400" />
                <p className="flex-1">
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    Mẹo:
                  </span>{" "}
                  Kéo và thả các study sets để sắp xếp thứ tự hiển thị trong
                  folder
                </p>
                <Badge
                  variant="outline"
                  className="text-xs border-pink-200 dark:border-pink-800 text-pink-700 dark:text-pink-300"
                >
                  Kéo thả
                </Badge>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
