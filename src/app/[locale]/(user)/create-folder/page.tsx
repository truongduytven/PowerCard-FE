"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

import { FormData } from "@/types/create-folder";
import { availableStudySets } from "@/lib/mock/create-folder";
import { FolderPlus, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import PreviewPanel from "@/components/create-folder/PreviewPanel";
import CustomizationPanel from "@/components/create-folder/CustomizationPanel";
import SuccessMessage from "@/components/create-folder/SuccessMessage";
import ProgressHeader from "@/components/create-folder/ProgressHeader";
import MobileTabs from "@/components/create-folder/MobileTabs";
import FolderForm from "@/components/create-folder/FolderForm";
import StudySetSelector from "@/components/create-folder/StudySetSelector";
import SelectedStudySets from "@/components/create-folder/SelectedStudySets";

export default function CreateFolderPage() {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    icon: "book",
    iconGradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    studySets: [],
    tags: [],
    visibility: "private",
    colorTheme: "blue",
    sortOrder: "manual",
  });

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [showTips, setShowTips] = useState<boolean>(true);
  const [autoSave, setAutoSave] = useState<boolean>(true);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);

  // Auto-save effect
  useEffect(() => {
    if (autoSave && formData.title) {
      const timer = setTimeout(() => {
        localStorage.setItem("folderDraft", JSON.stringify(formData));
        toast.success("Đã tự động lưu");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [formData, autoSave]);

  // Load draft on mount
  useEffect(() => {
    const savedDraft = localStorage.getItem("folderDraft");
    if (savedDraft) {
      try {
        setFormData(JSON.parse(savedDraft));
        toast("Đã khôi phục bản nháp chưa lưu", {
          icon: "📝",
          duration: 3000,
        });
      } catch (error) {
        console.error("Error loading draft:", error);
      }
    }
  }, []);

  const handleInputChange = (
    field: keyof FormData,
    value: string | string[]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleStudySet = (setId: string) => {
    setFormData((prev) => ({
      ...prev,
      studySets: prev.studySets.includes(setId)
        ? prev.studySets.filter((id) => id !== setId)
        : [...prev.studySets, setId],
    }));
    toast.success("Đã cập nhật study set");
  };

  const removeStudySet = (setId: string) => {
    setFormData((prev) => ({
      ...prev,
      studySets: prev.studySets.filter((id) => id !== setId),
    }));
    toast.error("Đã xóa study set");
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null) return;

    const newStudySets = [...formData.studySets];
    const draggedItem = newStudySets[draggedIndex];
    newStudySets.splice(draggedIndex, 1);
    newStudySets.splice(dropIndex, 0, draggedItem);

    setFormData((prev) => ({ ...prev, studySets: newStudySets }));
    setDraggedIndex(null);
    setDragOverIndex(null);
    toast.success("Đã sắp xếp lại thứ tự");
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleSubmit = async () => {
    if (!formData.title) {
      toast.error("Vui lòng nhập tên folder");
      return;
    }
    if (formData.studySets.length === 0) {
      toast.error("Vui lòng chọn ít nhất 1 study set");
      return;
    }

    setIsExporting(true);
    toast.loading("Đang tạo folder...");

    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("Form Data:", formData);
    localStorage.removeItem("folderDraft");
    setIsExporting(false);
    setShowSuccess(true);
    toast.dismiss();
    toast.success("🎉 Folder đã được tạo thành công!");

    setTimeout(() => setShowSuccess(false), 5000);
  };

  const quickAddStudySet = (count: number) => {
    const availableIds = availableStudySets
      .filter((set) => !formData.studySets.includes(set.id))
      .slice(0, count)
      .map((set) => set.id);

    setFormData((prev) => ({
      ...prev,
      studySets: [...prev.studySets, ...availableIds],
    }));
    toast.success(`Đã thêm ${count} study sets`);
  };

  const filteredStudySets = availableStudySets.filter((set) => {
    const matchesSearch =
      set.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      set.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      set.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesCategory =
      selectedCategory === "all" || set.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const selectedStudySets = formData.studySets
    .map((id) => availableStudySets.find((set) => set.id === id))
    .filter((set) => set !== undefined);

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 p-3 md:p-6">
        <div className="max-w-7xl mx-auto">
          <ProgressHeader
            formData={formData}
            autoSave={autoSave}
            setAutoSave={setAutoSave}
            isExporting={isExporting}
          />

          <AnimatePresence>{showSuccess && <SuccessMessage />}</AnimatePresence>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Column - Form & Study Sets */}
            <div className="lg:col-span-2 space-y-6">
              <MobileTabs
                draggedIndex={draggedIndex}
                dragOverIndex={dragOverIndex}
                handleDragStart={handleDragStart}
                handleDragOver={handleDragOver}
                handleDrop={handleDrop}
                handleDragEnd={handleDragEnd}
                formData={formData}
                handleInputChange={handleInputChange}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                viewMode={viewMode}
                setViewMode={setViewMode}
                filteredStudySets={filteredStudySets}
                toggleStudySet={toggleStudySet}
                formDataStudySets={formData.studySets}
                quickAddStudySet={quickAddStudySet}
                selectedStudySets={selectedStudySets}
                removeStudySet={removeStudySet}
              />

              {/* Desktop Layout */}
              <div className="hidden lg:block space-y-6">
                <FolderForm
                  formData={formData}
                  handleInputChange={handleInputChange}
                />

                <StudySetSelector
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  viewMode={viewMode}
                  setViewMode={setViewMode}
                  filteredStudySets={filteredStudySets}
                  toggleStudySet={toggleStudySet}
                  formDataStudySets={formData.studySets}
                  quickAddStudySet={quickAddStudySet}
                  selectedStudySets={selectedStudySets}
                />

                {selectedStudySets.length > 0 && (
                  <SelectedStudySets
                    formData={formData}
                    handleInputChange={handleInputChange}
                    selectedStudySets={selectedStudySets}
                    removeStudySet={removeStudySet}
                    draggedIndex={draggedIndex}
                    dragOverIndex={dragOverIndex}
                    handleDragStart={handleDragStart}
                    handleDragOver={handleDragOver}
                    handleDrop={handleDrop}
                    handleDragEnd={handleDragEnd}
                  />
                )}
              </div>
            </div>

            {/* Right Column - Preview & Actions */}
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-20 space-y-6">
                <PreviewPanel
                  formData={formData}
                  selectedStudySets={selectedStudySets}
                />

                <CustomizationPanel
                  showAdvanced={showAdvanced}
                  setShowAdvanced={setShowAdvanced}
                  formData={formData}
                  handleInputChange={handleInputChange}
                />

                {/* Action Buttons */}
                <div className="space-y-4 sticky bottom-0 bg-white">
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <Button
                      onClick={handleSubmit}
                      size="lg"
                      className="w-full h-12 text-base font-semibold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                      disabled={
                        !formData.title ||
                        formData.studySets.length === 0 ||
                        isExporting
                      }
                    >
                      <FolderPlus className="w-5 h-5 mr-2" />
                      {isExporting ? "Đang tạo..." : "Tạo Folder"}
                    </Button>
                  </motion.div>

                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      variant="outline"
                      className="h-11"
                      onClick={() => {
                        if (confirm("Bạn có chắc muốn hủy?")) {
                          window.history.back();
                        }
                      }}
                    >
                      Hủy
                    </Button>
                    <Button
                      variant="outline"
                      className="h-11"
                      onClick={() => {
                        if (confirm("Bạn có chắc muốn đặt lại?")) {
                          setFormData({
                            title: "",
                            description: "",
                            icon: "book",
                            iconGradient:
                              "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                            studySets: [],
                            tags: [],
                            visibility: "private",
                            colorTheme: "blue",
                            sortOrder: "manual",
                          });
                          toast.success("Đã đặt lại");
                        }
                      }}
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Đặt lại
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
