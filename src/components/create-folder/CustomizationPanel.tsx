import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { AnimatePresence, motion } from "framer-motion";
import { PaletteIcon, ChevronUp, ChevronDown } from "lucide-react";
import { iconOptions, iconGradientOptions } from "@/lib/mock/create-folder";
import { FormData } from "@/types/create-folder";

interface CustomizationPanelProps {
  showAdvanced: boolean;
  setShowAdvanced: (value: boolean) => void;
  formData: FormData;
  handleInputChange: (field: keyof FormData, value: string) => void;
}

export default function CustomizationPanel({
  showAdvanced,
  setShowAdvanced,
  formData,
  handleInputChange,
}: CustomizationPanelProps) {
  return (
    <Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
      <CardHeader className="pb-4">
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center justify-between w-full cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <PaletteIcon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <CardTitle className="text-lg text-gray-900 dark:text-white">
              Tùy Chỉnh
            </CardTitle>
          </div>
          {showAdvanced ? (
            <ChevronUp className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
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
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-900 dark:text-white">
                  Biểu Tượng
                </Label>
                <div className="grid grid-cols-4 gap-2">
                  {iconOptions.slice(0, 8).map((option) => {
                    const Icon = option.icon;
                    const isSelected = formData.icon === option.value;
                    return (
                      <button
                        key={option.value}
                        onClick={() => handleInputChange("icon", option.value)}
                        className={`p-2 rounded-lg border ${
                          isSelected
                            ? "border-pink-500 dark:border-pink-600 bg-pink-50 dark:bg-pink-900/30"
                            : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                        }`}
                      >
                        <div
                          className="w-10 h-10 rounded flex items-center justify-center mx-auto"
                          style={{ background: formData.iconGradient }}
                        >
                          <Icon className="w-4 h-4 text-white" />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-900 dark:text-white">
                  Màu Gradient
                </Label>
                <div className="grid grid-cols-6 gap-2">
                  {iconGradientOptions.map((gradient) => {
                    const isSelected = formData.iconGradient === gradient.value;
                    return (
                      <button
                        key={gradient.value}
                        onClick={() =>
                          handleInputChange("iconGradient", gradient.value)
                        }
                        className={`aspect-square rounded border-2 transition-all ${
                          isSelected
                            ? "ring-2 ring-pink-500 dark:ring-pink-400 ring-offset-2 dark:ring-offset-gray-900"
                            : "border-white dark:border-gray-900"
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
  );
}
