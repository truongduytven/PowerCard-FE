import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { iconOptions } from "@/lib/mock/create-folder";
import { FormData as FormDataType } from "@/types/create-folder";
import { motion } from "framer-motion";
import { Book, CheckCircle, Clock, Info, Zap } from "lucide-react";

interface ProgressHeaderProps {
  formData: FormDataType;
  autoSave: boolean;
  setAutoSave: (value: boolean) => void;
}

export default function ProgressHeader({
  formData,
  autoSave,
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
                <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-900 to-purple-700 bg-clip-text text-transparent">
                  Tạo Folder Mới
                </h1>
                <p className="text-gray-600 text-sm md:text-base max-w-2xl mt-1">
                  Tổ chức các bộ học tập của bạn một cách khoa học và hiệu quả
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-xl border border-gray-200 text-sm  shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <div className="relative">
                    <Switch
                      checked={autoSave}
                      onCheckedChange={setAutoSave}
                      className="scale-90 cursor-pointer data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-purple-500 data-[state=checked]:to-pink-500"
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
                      autoSave ? "text-purple-700" : "text-gray-600"
                    }`}
                  >
                    {autoSave ? "Đang tự động lưu" : "Auto-save"}
                  </span>
                  <Info className="w-3.5 h-3.5 text-gray-400" />
                </motion.div>
              </TooltipTrigger>
              <TooltipContent
                side="bottom"
                className="max-w-xs border-purple-100 bg-white shadow-lg"
              >
                <div className="flex items-center gap-2 mb-1">
                  <Zap className="w-4 h-4 text-purple-500" />
                  <p className="font-semibold text-gray-900">
                    Chế độ tự động lưu
                  </p>
                </div>
                <p className="text-sm text-gray-600">
                  {autoSave
                    ? "✓ Đang tự động lưu mọi thay đổi của bạn"
                    : "Tắt: Mọi thay đổi sẽ không được lưu tự động."}
                </p>
              </TooltipContent>
            </Tooltip>
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
        <div className="flex-1">
          <div className="backdrop-blur-sm rounded-2xl p-6">
            <div className="space-y-4">
              {/* Header với icon */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-purple-500" />
                  <span className="text-sm font-semibold text-gray-700">
                    Tiến độ tạo folder
                  </span>
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

              {/* Enhanced progress bar với animation */}
              <div className="space-y-2">
                <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden shadow-inner">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{
                      duration: 1.2,
                      ease: "easeOut",
                      delay: 0.2,
                    }}
                    className="h-full relative rounded-full"
                  >
                    {/* Main gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-purple-600 to-pink-600 rounded-full"></div>

                    {/* Shimmer effect */}
                    <motion.div
                      animate={{
                        x: ["0%", "100%"],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    />

                    {/* Glow effect */}
                    <div className="absolute inset-0 shadow-[0_0_20px_rgba(168,85,247,0.3)] rounded-full"></div>
                  </motion.div>
                </div>

                {/* Milestones với animation */}
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
                      label: "Study Sets",
                      completed: studySetsCount > 0,
                      icon: "S",
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
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                          item.completed
                            ? "bg-gradient-to-br from-green-100 to-emerald-100 text-green-700 shadow-sm"
                            : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        {item.completed ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <span>{item.icon}</span>
                        )}
                      </div>
                      <div>
                        <div
                          className={`text-sm font-medium ${
                            item.completed ? "text-gray-900" : "text-gray-500"
                          }`}
                        >
                          {item.label}
                        </div>
                        <div className="text-xs text-gray-400">
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

        {/* Icon preview với enhanced effects */}
        <motion.div
          className="flex items-center justify-center md:justify-end"
          whileHover={{ scale: 1.05 }}
          initial={{ rotate: -5, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="relative">
            {/* Outer glow */}
            <div
              className="absolute inset-0 blur-xl rounded-3xl opacity-60"
              style={{
                background: formData.iconGradient,
                filter: "blur(24px)",
              }}
            />

            {/* Main icon container */}
            <div
              className="relative w-20 h-20 md:w-24 md:h-24 rounded-2xl flex items-center justify-center shadow-lg"
              style={{ background: formData.iconGradient }}
            >
              <SelectedIcon className="w-10 h-10 md:w-12 md:h-12 text-white drop-shadow-md" />

              {/* Floating particles effect với màu từ gradient */}
              {isComplete && (
                <>
                  <motion.div
                    animate={{
                      y: [0, -15, 0],
                      x: [0, 8, 0],
                      rotate: [0, 180, 360],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: 0.2,
                    }}
                    className="absolute -top-2 -right-2 w-4 h-4 rounded-full"
                    style={{
                      background:
                        "radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.3) 70%)",
                      boxShadow: "0 0 10px rgba(255,255,255,0.5)",
                    }}
                  />
                  <motion.div
                    animate={{
                      y: [0, -12, 0],
                      x: [0, -6, 0],
                      rotate: [0, -180, 0],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      delay: 0.4,
                    }}
                    className="absolute -bottom-2 -left-2 w-3 h-3 rounded-full"
                    style={{
                      background:
                        "radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.2) 70%)",
                      boxShadow: "0 0 8px rgba(255,255,255,0.4)",
                    }}
                  />
                </>
              )}
            </div>

            {/* Badge khi hoàn thành - phối màu với icon */}
            {isComplete && (
              <motion.div
                initial={{ scale: 0, rotate: -180, y: 20 }}
                animate={{
                  scale: 1,
                  rotate: 0,
                  y: 0,
                  transition: {
                    type: "spring",
                    stiffness: 250,
                    damping: 15,
                  },
                }}
                whileHover={{ scale: 1.1, rotate: [0, 5, -5, 0] }}
                className="absolute -top-2 -right-2 z-10"
              >
                <div className="relative group">
                  {/* Main badge lấy màu từ gradient của icon */}
                  <div
                    className="backdrop-blur-md border border-white/30 text-white text-[9px] font-bold px-2 py-1.5 rounded-full shadow-xl"
                    style={{ background: formData.iconGradient }}
                  >
                    <div className="flex items-center gap-1.5">
                      <motion.div
                        animate={{
                          scale: [1, 1.2, 1],
                          rotate: [0, 360],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <CheckCircle className="w-3 h-3" />
                      </motion.div>
                      <span className="tracking-tight">DONE</span>
                    </div>
                  </div>

                  {/* Hiệu ứng ánh sáng xoay quanh badge */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute inset-0 rounded-full border border-white/20 -z-10"
                  />

                  {/* Tooltip tinh tế */}

                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900/90 backdrop-blur-sm text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap pointer-events-none">
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900/90 rotate-45"></div>
                    Folder đã sẵn sàng
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
