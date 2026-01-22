import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Check, Search, X } from "lucide-react";
import { GradientOption, IconOption } from "@/types/create-deck";
import { Input } from "@/components/ui/input";

interface IconPickerProps {
  selectedIcon: string;
  iconColor: string;
  iconCategories: string[];
  selectedIconCategory: string;
  gradientOptions: GradientOption[];
  iconOptions: IconOption[];
  onIconChange: (icon: string) => void;
  onColorChange: (color: string) => void;
  onCategoryChange: (category: string) => void;
}

export const IconPicker: React.FC<IconPickerProps> = ({
  selectedIcon,
  iconColor,
  iconCategories,
  selectedIconCategory,
  gradientOptions,
  iconOptions,
  onIconChange,
  onColorChange,
  onCategoryChange,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredIcons = iconOptions.filter((icon) => {
    const matchesCategory = icon.category === selectedIconCategory;
    const matchesSearch = icon.label
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Icon Categories - Scrollable on mobile */}
      <div className="space-y-3">
        <Label className="text-sm font-semibold text-gray-900 dark:text-gray-200 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400"></span>
          Danh mục biểu tượng
        </Label>
        <div className="relative">
          {/* Mobile: Horizontal scroll, Desktop: Wrap */}
          <div className="flex sm:flex-wrap gap-2 overflow-x-auto sm:overflow-x-visible pb-2 sm:pb-0 -mx-1 px-1 scrollbar-hide">
            {iconCategories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => onCategoryChange(category)}
                className={`cursor-pointer px-4 py-2 rounded-xl transition-all duration-200 text-sm font-medium whitespace-nowrap flex-shrink-0 shadow-sm ${
                  selectedIconCategory === category
                    ? "bg-gradient-to-r from-blue-600 to-blue-500 dark:from-blue-500 dark:to-blue-400 text-white shadow-md shadow-blue-500/30 dark:shadow-blue-400/20 scale-105"
                    : "bg-gray-100/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-300 hover:bg-gray-200/90 dark:hover:bg-gray-700/90 hover:scale-105"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          {/* Fade effect for scroll indication on mobile */}
          <div className="absolute right-0 top-0 bottom-2 w-8 bg-gradient-to-l from-white dark:from-gray-800 to-transparent pointer-events-none sm:hidden"></div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="space-y-2.5">
        <Label className="text-sm font-semibold text-gray-900 dark:text-gray-200 flex items-center gap-2">
          <Search className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          Tìm kiếm biểu tượng
        </Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
          <Input
            type="text"
            placeholder="Tìm theo tên..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-10 h-11 sm:h-12 border-gray-300/80 dark:border-gray-700/80 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 rounded-xl text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Icon Grid - Responsive */}
      <div className="space-y-3">
        <div className="cursor-pointer flex items-center justify-between">
          <Label className="text-sm font-semibold text-gray-900 dark:text-gray-200 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400"></span>
            Chọn biểu tượng
          </Label>
          <span className="text-xs text-gray-500 dark:text-gray-400 font-medium px-2.5 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">
            {filteredIcons.length} biểu tượng
          </span>
        </div>

        {filteredIcons.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-4 bg-gray-50/50 dark:bg-gray-800/30 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700">
            <Search className="w-12 h-12 text-gray-300 dark:text-gray-600 mb-3" />
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
              Không tìm thấy biểu tượng
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500">
              Thử tìm kiếm với từ khóa khác
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-2 sm:gap-3 p-3 sm:p-4 bg-gradient-to-br from-gray-50/80 to-gray-100/50 dark:from-gray-800/40 dark:to-gray-900/40 rounded-xl border border-gray-200/60 dark:border-gray-700/40 max-h-[320px] sm:max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
            {filteredIcons.map((option) => {
              const Icon = option.icon;
              const isSelected = selectedIcon === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => onIconChange(option.value)}
                  className={`cursor-pointer relative p-2 sm:p-2.5 rounded-xl border-2 transition-all duration-200 group hover:z-10 ${
                    isSelected
                      ? "border-blue-500 dark:border-blue-400 bg-gradient-to-br from-blue-50/90 to-blue-100/90 dark:from-blue-900/40 dark:to-blue-800/40 shadow-lg shadow-blue-500/20 dark:shadow-blue-400/10 scale-105"
                      : "border-gray-200/80 dark:border-gray-700/60 bg-white/90 dark:bg-gray-800/60 hover:border-blue-300/80 dark:hover:border-blue-500/60 hover:shadow-md hover:scale-105"
                  }`}
                  title={option.label}
                >
                  <div
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-1.5 sm:mb-2 transition-all group-hover:scale-110 shadow-sm"
                    style={{ background: iconColor }}
                  >
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <span className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-300 truncate block text-center leading-tight font-medium">
                    {option.label}
                  </span>
                  {isSelected && (
                    <div className="absolute -top-1.5 -right-1.5 w-6 h-6 bg-gradient-to-r from-blue-600 to-blue-500 dark:from-blue-500 dark:to-blue-400 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30 dark:shadow-blue-400/20 ring-2 ring-white dark:ring-gray-900">
                      <Check
                        className="w-3.5 h-3.5 text-white"
                        strokeWidth={3}
                      />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Gradient Color Selection - Đã chỉnh sửa kích thước */}
      <div className="space-y-3">
        <Label className="text-sm font-semibold text-gray-900 dark:text-gray-200 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400"></span>
          Màu gradient cho icon
        </Label>
        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-2 sm:gap-3 p-3 sm:p-4 bg-gradient-to-br from-gray-50/80 to-gray-100/50 dark:from-gray-800/40 dark:to-gray-900/40 rounded-xl border border-gray-200/60 dark:border-gray-700/40">
          {gradientOptions.map((gradient) => {
            const isSelected = iconColor === gradient.value;
            return (
              <button
                key={gradient.value}
                type="button"
                onClick={() => onColorChange(gradient.value)}
                className={`cursor-pointer relative p-2 sm:p-2.5 rounded-xl border-2 transition-all duration-200 group hover:z-10 hover:scale-105 ${
                  isSelected
                    ? "border-blue-500 dark:border-blue-400 bg-gradient-to-br from-blue-50/90 to-blue-100/90 dark:from-blue-900/40 dark:to-blue-800/40 shadow-lg shadow-blue-500/20 dark:shadow-blue-400/10 scale-105"
                    : "border-gray-200/80 dark:border-gray-700/60 bg-white/90 dark:bg-gray-800/60 hover:border-blue-300/80 dark:hover:border-blue-500/60 hover:shadow-md"
                }`}
                title={gradient.label}
              >
                <div
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-1.5 sm:mb-2 transition-all group-hover:scale-110 shadow-sm"
                  style={{ background: gradient.value }}
                >
                  {isSelected && (
                    <Check className="w-5 h-5 sm:w-6 sm:h-6 text-white drop-shadow-lg" />
                  )}
                </div>
                <span className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-300 truncate block text-center leading-tight font-medium">
                  {gradient.label}
                </span>
                {isSelected && (
                  <div className="absolute -top-1.5 -right-1.5 w-6 h-6 bg-gradient-to-r from-blue-600 to-blue-500 dark:from-blue-500 dark:to-blue-400 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30 dark:shadow-blue-400/20 ring-2 ring-white dark:ring-gray-900">
                    <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Preview Section */}
      <div className="p-4 sm:p-5 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200/60 dark:border-blue-800/40">
        <Label className="text-sm font-semibold text-gray-900 dark:text-gray-200 mb-3 block flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400"></span>
          Xem trước
        </Label>
        <div className="flex items-center justify-center py-6 sm:py-8">
          <div className="relative group">
            <div
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
              style={{ background: iconColor }}
            >
              {(() => {
                const SelectedIconComponent = iconOptions.find(
                  (opt) => opt.value === selectedIcon,
                )?.icon;
                return SelectedIconComponent ? (
                  <SelectedIconComponent className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                ) : null;
              })()}
            </div>
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
              <span className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-3 py-1 rounded-full border border-gray-200 dark:border-gray-700 shadow-sm">
                {iconOptions.find((opt) => opt.value === selectedIcon)?.label}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
