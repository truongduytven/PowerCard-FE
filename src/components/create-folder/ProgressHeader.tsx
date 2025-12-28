import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Download, Upload, Sparkle, Book } from "lucide-react";
import { motion } from "framer-motion";
import { FormData as formdata } from "@/types/create-folder";
import { iconOptions } from "@/lib/mock/create-folder";

interface ProgressHeaderProps {
  formData: formdata;
  autoSave: boolean;
  setAutoSave: (value: boolean) => void;
  isExporting: boolean;
}

export default function ProgressHeader({
  formData,
  autoSave,
  setAutoSave,
  isExporting,
}: ProgressHeaderProps) {
  const calculateProgress = () => {
    let progress = 0;
    const totalSteps = 3;

    if (formData.title.trim().length > 0) progress += 1;
    if (formData.description.trim().length > 0) progress += 1;
    if (formData.studySets.length > 0) progress += 1;

    return Math.round((progress / totalSteps) * 100);
  };

  const SelectedIcon =
    iconOptions.find((opt) => opt.value === formData.icon)?.icon || Book;

  return (
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

        <div className="flex items-center gap-2 flex-wrap">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="sm" className="h-9 px-3">
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline ml-2">Xuất</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Xuất cấu hình folder</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="sm" className="h-9 px-3">
                <Upload className="w-4 h-4" />
                <span className="hidden sm:inline ml-2">Nhập</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Nhập cấu hình từ file</TooltipContent>
          </Tooltip>

          <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg border text-sm">
            <Switch
              checked={autoSave}
              onCheckedChange={setAutoSave}
              className="scale-90"
            />
            <span className="text-gray-600 whitespace-nowrap">Auto-save</span>
          </div>
        </div>
      </div>

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
  );
}
