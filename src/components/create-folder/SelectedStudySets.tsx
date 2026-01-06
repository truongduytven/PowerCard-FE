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
      <Card className="border border-pink-200 bg-gradient-to-br from-pink-50 to-indigo-50 shadow-lg">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                <GripVertical className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl">Study Sets Đã Chọn</CardTitle>
                <CardDescription className="text-pink-700">
                  Kéo thả để sắp xếp thứ tự hiển thị
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Select
                value={formData.sortOrder}
                onValueChange={(value) => handleInputChange("sortOrder", value)}
              >
                <SelectTrigger className="w-[180px] bg-white cursor-pointer">
                  <SelectValue placeholder="Sắp xếp" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="manual">Thủ công</SelectItem>
                  <SelectItem value="alphabetical">A → Z</SelectItem>
                  <SelectItem value="date">Ngày cập nhật</SelectItem>
                </SelectContent>
              </Select>

              <Badge className="bg-gradient-to-br from-purple-500 to-pink-600 text-white hover:from-purple-600 hover:to-pink-700">
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
                className={`group flex items-center gap-4 p-4 bg-white rounded-xl border border-pink-100 cursor-move transition-all duration-200 shadow-sm hover:shadow-md ${
                  draggedIndex === index ? "opacity-40 scale-95 shadow-lg" : ""
                } ${
                  dragOverIndex === index
                    ? "border-pink-500 shadow-lg scale-[1.02] bg-pink-50"
                    : "hover:border-pink-300"
                }`}
              >
                <div className="flex items-center gap-2">
                  <GripVertical className="w-5 h-5 text-gray-400 group-hover:text-pink-500 transition-colors" />
                  <span className="text-sm font-medium text-gray-500 w-6">
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
                    <div>
                      <p className="font-semibold text-gray-900 truncate">
                        {set.title}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <Badge variant="outline" className="text-xs">
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
  );
}
