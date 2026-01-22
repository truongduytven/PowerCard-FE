import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { iconOptions } from "@/lib/mock/create-folder";
import { FormData as FormDataType } from "@/types/create-folder";
import { motion } from "framer-motion";
import {
  Book,
  CheckCircle,
  Clock,
  Info,
  Loader2,
  Save,
  Zap,
} from "lucide-react";

interface ProgressHeaderProps {
  formData: FormDataType;
  autoSave: boolean;
  isSavingDraft: boolean;
  setAutoSave: (value: boolean) => void;
}

export default function ProgressHeader({
  formData,
  autoSave,
  isSavingDraft,
  setAutoSave,
}: ProgressHeaderProps) {
  const calculateProgress = () => {
    let progress = 0;
    const totalSteps = 3;

    if (formData.title.trim().length > 0) progress += 1;
    if (formData.description.trim().length > 0) progress += 1;
    if (formData.studySets.length > 0) progress += 1;

    return Math.round((progress / totalSteps) * 100);
  };

  const progress = calculateProgress();
  const isComplete = progress === 100;
  const studySetsCount = formData.studySets.length;
  const title = formData.title;
  const description = formData.description;

  const SelectedIcon =
    iconOptions.find((opt) => opt.value === formData.icon)?.icon || Book;

  return (
    <div className="mb-8">
      {/* Header với gradient và shadow */}
      <div className="mb-8 rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r  from-gray-900 via-purple-700 to-fuchsia-700  dark:from-gray-100 dark:via-purple-400 dark:to-fuchsia-400 bg-clip-text text-transparent">
                  Tạo Folder Mới
                </h1>

                <p className="text-sm md:text-base max-w-2xl mt-1 text-gray-600 dark:text-gray-400">
                  Tổ chức các bộ học tập của bạn một cách khoa học và hiệu quả
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isSavingDraft ? (
              /* ================== ĐANG LƯU ================== */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm shadow-sm
                bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/40 dark:to-blue-950/30
                border-purple-200 dark:border-purple-800"
              >
                <Loader2 className="w-4 h-4 animate-spin text-purple-600 dark:text-purple-400" />

                <span className="font-medium text-purple-700 dark:text-purple-300 whitespace-nowrap">
                  Đang lưu...
                </span>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="w-3.5 h-3.5 text-purple-400 dark:text-purple-500 cursor-help" />
                  </TooltipTrigger>

                  <TooltipContent
                    side="bottom"
                    className="
                      max-w-xs shadow-lg
                      bg-white dark:bg-gray-900
                      border border-purple-100 dark:border-purple-800
                    "
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Save className="w-4 h-4 text-purple-500" />
                      <p className="font-semibold text-gray-900 dark:text-gray-100">
                        Đang lưu bản nháp
                      </p>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Mọi thay đổi của bạn đang được lưu tự động. Vui lòng đợi
                      một chút.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </motion.div>
            ) : (
              /* ================== AUTO SAVE TOGGLE ================== */
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`
                        flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm shadow-sm
                        transition-all duration-200
                        ${
                          autoSave
                            ? `
                              bg-gradient-to-r from-purple-50 to-pink-50
                              dark:from-purple-950/40 dark:to-pink-950/30
                              border-purple-200 dark:border-purple-800
                            `
                            : `
                              bg-white dark:bg-gray-900
                              border-gray-200 dark:border-gray-800
                            `
                        }
                      `}
                  >
                    <div className="relative">
                      <Switch
                        checked={autoSave}
                        onCheckedChange={setAutoSave}
                        disabled={isSavingDraft}
                        className="
                            scale-90 cursor-pointer
                            data-[state=checked]:bg-gradient-to-r
                            data-[state=checked]:from-purple-500
                            data-[state=checked]:to-pink-500
                          "
                      />

                      {autoSave && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-1 -right-1"
                        >
                          <Zap className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                        </motion.div>
                      )}
                    </div>

                    <span
                      className={`font-medium whitespace-nowrap ${
                        autoSave
                          ? "text-purple-700 dark:text-purple-300"
                          : "text-gray-600 dark:text-gray-400"
                      }`}
                    >
                      Auto-save
                    </span>

                    <Info className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500" />
                  </motion.div>
                </TooltipTrigger>

                <TooltipContent
                  side="bottom"
                  className="
                    max-w-xs shadow-lg
                    bg-white dark:bg-gray-900
                    border border-purple-100 dark:border-purple-800
                  "
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Zap className="w-4 h-4 text-purple-500" />
                    <p className="font-semibold text-gray-900 dark:text-gray-100">
                      Chế độ tự động lưu
                    </p>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {autoSave
                      ? "✓ Đang tự động lưu mọi thay đổi của bạn"
                      : "Tắt: Mọi thay đổi sẽ không được lưu tự động."}
                  </p>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
        </div>
      </div>

      {/* Progress section với glassmorphism effect */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col md:flex-row md:items-center gap-6 md:gap-8"
      >
        {/* ================= LEFT ================= */}
        <div className="flex-1">
          <div
            className="backdrop-blur-sm rounded-2xl p-6
              bg-white/70 dark:bg-gray-900/60
              border border-gray-200/60 dark:border-gray-800/60
            "
          >
            <div className="space-y-4">
              {/* ===== HEADER ===== */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-purple-500 dark:text-purple-400" />
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Tiến độ tạo folder
                    </span>
                  </div>

                  {isSavingDraft && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="
                        flex items-center gap-1.5 px-2.5 py-1 rounded-full border
                        bg-gradient-to-r from-purple-100 to-blue-100
                        dark:from-purple-950/50 dark:to-blue-950/40
                        border-purple-200 dark:border-purple-800
                      "
                    >
                      <Loader2 className="w-3 h-3 animate-spin text-purple-600 dark:text-purple-400" />
                      <span className="text-xs font-medium text-purple-700 dark:text-purple-300">
                        Đang lưu...
                      </span>
                    </motion.div>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <motion.span
                    key={progress}
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
                  >
                    {progress}%
                  </motion.span>

                  {isComplete && (
                    <motion.div
                      initial={{ rotate: -180, scale: 0 }}
                      animate={{ rotate: 0, scale: 1 }}
                    >
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </motion.div>
                  )}
                </div>
              </div>

              {/* ===== PROGRESS BAR ===== */}
              <div className="space-y-2">
                <div className="relative h-3 rounded-full overflow-hidden shadow-inner bg-gray-100 dark:bg-gray-800">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
                    className="h-full relative rounded-full"
                  >
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-purple-600 to-pink-600 " />

                    {isSavingDraft && (
                      <motion.div
                        animate={{ x: ["0%", "100%"] }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent "
                      />
                    )}

                    <div
                      className={`absolute inset-0 rounded-full ${
                        isSavingDraft
                          ? "shadow-[0_0_25px_rgba(168,85,247,0.45)]"
                          : "shadow-[0_0_18px_rgba(168,85,247,0.25)]"
                      }`}
                    />
                  </motion.div>
                </div>

                {/* ===== MILESTONES ===== */}
                <div className="grid grid-cols-3 gap-4 pt-4">
                  {[
                    {
                      label: "Tiêu đề",
                      completed: title.trim().length > 0,
                      icon: "T",
                    },
                    {
                      label: "Mô tả",
                      completed: description.trim().length > 0,
                      icon: "D",
                    },
                    {
                      label: "Decks",
                      completed: studySetsCount > 0,
                      icon: "S",
                      count: studySetsCount,
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div
                        className={`relative w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold
                    ${
                      item.completed
                        ? "bg-gradient-to-br from-green-100 to-emerald-100 text-green-700 dark:from-green-900/40 dark:to-emerald-900/40 dark:text-green-300"
                        : "bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500"
                    }
                  `}
                      >
                        {item.completed ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <span>{item.icon}</span>
                        )}

                        {item.label === "Decks" && studySetsCount > 0 && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="
                              absolute -top-1 -right-1
                              w-5 h-5 rounded-full
                              flex items-center justify-center
                              bg-purple-600 text-white
                              text-[10px] font-bold leading-none
                              border-2 border-white dark:border-gray-900
                            "
                          >
                            {studySetsCount}
                          </motion.div>
                        )}
                      </div>

                      <div>
                        <div
                          className={`text-sm font-medium ${
                            item.completed
                              ? "text-gray-900 dark:text-gray-100"
                              : "text-gray-500 dark:text-gray-400"
                          }`}
                        >
                          {item.label}
                        </div>
                        <div className="text-xs text-gray-400 dark:text-gray-500">
                          {item.completed ? "Đã hoàn thành" : "Chưa hoàn thành"}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= RIGHT ICON ================= */}
        <motion.div
          className="flex items-center justify-center md:justify-end"
          whileHover={{ scale: 1.05 }}
          initial={{ rotate: -5, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="relative">
            <div
              className="absolute inset-0 blur-2xl rounded-3xl opacity-60"
              style={{ background: formData.iconGradient }}
            />

            <motion.div
              className="relative w-20 h-20 md:w-24 md:h-24 rounded-2xl flex items-center justify-center shadow-lg"
              style={{ background: formData.iconGradient }}
            >
              <SelectedIcon className="w-10 h-10 md:w-12 md:h-12 text-white drop-shadow-md" />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
