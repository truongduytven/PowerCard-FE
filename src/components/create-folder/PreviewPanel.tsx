import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, FolderOpen, Clock, ChevronRight, Edit2 } from "lucide-react";
import { iconOptions } from "@/lib/mock/create-folder";
import { Book } from "lucide-react";
import { FormData, StudySet } from "@/types/create-folder";

interface PreviewPanelProps {
  formData: FormData;
  selectedStudySets: StudySet[];
}

export default function PreviewPanel({
  formData,
  selectedStudySets,
}: PreviewPanelProps) {
  const SelectedIcon =
    iconOptions.find((opt) => opt.value === formData.icon)?.icon || Book;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Eye className="w-5 h-5" />
          Xem Trước
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="group relative cursor-not-allowed bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-5 hover:shadow-2xl hover:shadow-blue-500/10 dark:hover:shadow-blue-500/20 hover:-translate-y-1 transition-all duration-300 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div
                  className="text-2xl p-3 rounded-xl bg-opacity-10 group-hover:scale-110 transition-transform duration-300"
                  style={{ background: formData.iconGradient }}
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

            <div className="flex items-center gap-2 ">
              <button className="flex-1 px-3 py-2 cursor-not-allowed text-sm font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group-hover:scale-105 shadow-lg shadow-blue-500/30">
                <ChevronRight className="h-3.5 w-3.5" />
                Open Folder
              </button>
              <button className="p-2 border cursor-not-allowed border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-500 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 rounded-lg transition-all duration-300">
                <Edit2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
