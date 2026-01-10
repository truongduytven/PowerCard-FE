"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { FormData } from "@/types/create-folder";
import { availableStudySets } from "@/lib/mock/create-folder";
import { FolderPlus, RotateCcw, Save } from "lucide-react";
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
  const defaultFormData: FormData = {
    title: "",
    description: "",
    icon: "book",
    iconGradient: "linear-gradient(135deg, #8e2de2 0%, #4a00e0 100%)",
    studySets: [],
    tags: [],
    visibility: "private",
    colorTheme: "blue",
    sortOrder: "manual",
  };

  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [autoSave, setAutoSave] = useState<boolean>(true);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const [showExitConfirm, setShowExitConfirm] = useState<boolean>(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState<boolean>(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showDraftDialog, setShowDraftDialog] = useState(false);
  const [isSavingDraft, setIsSavingDraft] = useState(false);
  const [pendingDraft, setPendingDraft] = useState<any | null>(null);
  const router = useRouter();
  const [pendingNavigation, setPendingNavigation] = useState<string | null>(
    null
  );

  // Hàm kiểm tra thay đổi
  const checkForChanges = () => {
    const currentData = JSON.stringify(formData);
    const defaultData = JSON.stringify(defaultFormData);

    // Chỉ kiểm tra thay đổi so với dữ liệu mặc định
    // KHÔNG so sánh với draft vì đã có autoSave
    return currentData !== defaultData;
  };

  // Hàm reset form
  const resetForm = () => {
    setFormData(defaultFormData);
    setSearchQuery("");
    setDraggedIndex(null);
    setDragOverIndex(null);
    setSelectedCategory("all");
    setViewMode("grid");
    setShowAdvanced(false);
  };

  // Auto-save effect - CHỈ hoạt động khi autoSave là true
  useEffect(() => {
    if (!autoSave) return;

    if (formData.title) {
      let indicatorTimer: number | undefined;
      const timer = window.setTimeout(() => {
        setIsSavingDraft(true);
        try {
          localStorage.setItem("folderDraft", JSON.stringify(formData));
        } catch (e) {}
        // toast.success("Đã tự động lưu");

        // turn off saving indicator after short delay
        indicatorTimer = window.setTimeout(() => {
          setIsSavingDraft(false);
        }, 800);
      }, 1000);

      return () => {
        clearTimeout(timer);
        if (indicatorTimer) clearTimeout(indicatorTimer);
      };
    }
  }, [formData, autoSave]);

  // Xóa bản nháp khi tắt autoSave
  useEffect(() => {
    if (!autoSave) {
      localStorage.removeItem("folderDraft");

      // Kiểm tra xem form có thay đổi không
      const hasChanges = checkForChanges();
      setHasUnsavedChanges(hasChanges);

      if (hasChanges) {
        toast.info("Đã tắt tự động lưu - bạn có thay đổi chưa lưu");
      } else {
        toast.info("Đã tắt tự động lưu");
      }
    }
  }, [autoSave]);

  useEffect(() => {
    const savedAutoSave = localStorage.getItem("folderAutoSave");
    const shouldAutoSave = savedAutoSave ? JSON.parse(savedAutoSave) : true;

    setAutoSave(shouldAutoSave);

    if (!shouldAutoSave) return;

    const savedDraft = localStorage.getItem("folderDraft");
    if (!savedDraft) return;

    try {
      const parsedData = JSON.parse(savedDraft);
      const hasTitle =
        typeof parsedData.title === "string" &&
        parsedData.title.trim().length > 0;

      const hasDescription =
        typeof parsedData.description === "string" &&
        parsedData.description.trim().length > 0;

      const hasStudySets =
        Array.isArray(parsedData.studySets) && parsedData.studySets.length > 0;

      // ❌ draft trống → không hiện dialog
      if (!hasTitle && !hasDescription && !hasStudySets) return;
      // 👉 lưu tạm, CHƯA setFormData
      setPendingDraft(parsedData);
      setShowDraftDialog(true);
    } catch (error) {
      console.error("Error loading draft:", error);
    }
  }, []);
  const handleUseDraft = () => {
    if (!pendingDraft) return;

    setFormData({
      title: pendingDraft.title || "",
      description: pendingDraft.description || "",
      icon: pendingDraft.icon || "book",
      iconGradient:
        pendingDraft.iconGradient ||
        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      studySets: pendingDraft.studySets || [],
      tags: pendingDraft.tags || [],
      visibility: ["private", "public", "shared"].includes(
        pendingDraft.visibility
      )
        ? pendingDraft.visibility
        : "private",
      colorTheme: ["blue", "green", "purple", "red", "orange"].includes(
        pendingDraft.colorTheme
      )
        ? pendingDraft.colorTheme
        : "blue",
      sortOrder: ["manual", "alphabetical", "date"].includes(
        pendingDraft.sortOrder
      )
        ? pendingDraft.sortOrder
        : "manual",
    });

    toast("Đã khôi phục bản nháp chưa lưu", {
      icon: "📝",
      duration: 3000,
    });

    setShowDraftDialog(false);
    setPendingDraft(null);
  };
  const handleCreateNew = () => {
    localStorage.removeItem("folderDraft");

    setFormData(defaultFormData);
    setHasUnsavedChanges(false);

    toast.success("Đã tạo bản mới");

    setShowDraftDialog(false);
    setPendingDraft(null);
  };

  // Lưu trạng thái autoSave vào localStorage
  useEffect(() => {
    localStorage.setItem("folderAutoSave", JSON.stringify(autoSave));
  }, [autoSave]);

  // Xử lý sự kiện beforeunload (khi đóng tab/trình duyệt)
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges && !autoSave) {
        // Chỉ kiểm tra khi tắt autoSave
        e.preventDefault();
        e.returnValue = "Bạn có thay đổi chưa lưu. Bạn có chắc muốn rời đi?";
        return e.returnValue;
      }
    };

    const handlePopState = (e: PopStateEvent) => {
      if (hasUnsavedChanges && !autoSave) {
        // Chỉ hiện hộp thoại khi tắt autoSave
        e.preventDefault();
        setShowExitConfirm(true);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("popstate", handlePopState);

    // Listen for explicit pending navigation events from other components (e.g., Navbar)
    const handlePendingNav = (ev: Event) => {
      const custom = ev as CustomEvent<{ href: string }>;
      const href = custom?.detail?.href;
      if (!href) return;

      if (hasUnsavedChanges && !autoSave) {
        // Prevent immediate navigation and show dialog
        setPendingNavigation(href);
        setShowExitConfirm(true);
      } else {
        // No unsaved changes -> navigate immediately
        router.push(href);
      }
    };

    window.addEventListener(
      "powercard:pendingNavigation",
      handlePendingNav as EventListener
    );

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener(
        "powercard:pendingNavigation",
        handlePendingNav as EventListener
      );
    };
  }, [hasUnsavedChanges, autoSave]); // Thêm autoSave vào dependency

  // Persist hasUnsavedChanges so other components (Navbar) can check it synchronously
  useEffect(() => {
    try {
      localStorage.setItem(
        "powercard:hasUnsavedChanges",
        hasUnsavedChanges ? "1" : "0"
      );
    } catch (e) {
      // ignore
    }
  }, [hasUnsavedChanges]);

  // Intercept client-side link clicks (Next.js Link/router) to show confirm dialog
  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const anchor = target.closest("a") as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      // Ignore external links, anchors, and protocols
      if (
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        (href.startsWith("http") && !href.startsWith(window.location.origin))
      ) {
        return;
      }

      if (hasUnsavedChanges && !autoSave) {
        e.preventDefault();
        setPendingNavigation(href);
        setShowExitConfirm(true);
      }
    };

    // Use capture phase so our handler runs before Next.js internal handlers
    document.addEventListener("click", handleLinkClick, true);
    return () => document.removeEventListener("click", handleLinkClick, true);
  }, [hasUnsavedChanges, autoSave]);

  const handleInputChange = (
    field: keyof FormData,
    value: string | string[]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Chỉ set hasUnsavedChanges khi tắt autoSave
    if (!autoSave) {
      setHasUnsavedChanges(true);
    }
  };
  const toggleStudySet = (setId: string) => {
    setFormData((prev) => ({
      ...prev,
      studySets: prev.studySets.includes(setId)
        ? prev.studySets.filter((id) => id !== setId)
        : [...prev.studySets, setId],
    }));

    // Chỉ set hasUnsavedChanges khi tắt autoSave
    if (!autoSave) {
      setHasUnsavedChanges(true);
    }

    // toast.success("Đã cập nhật study set");
  };

  const removeStudySet = (setId: string) => {
    setFormData((prev) => ({
      ...prev,
      studySets: prev.studySets.filter((id) => id !== setId),
    }));

    // Chỉ set hasUnsavedChanges khi tắt autoSave
    if (!autoSave) {
      setHasUnsavedChanges(true);
    }

    // toast.error("Đã xóa study set");
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

    // Chỉ set hasUnsavedChanges khi tắt autoSave
    if (!autoSave) {
      setHasUnsavedChanges(true);
    }

    // toast.success("Đã sắp xếp lại thứ tự");
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

    console.log("Form Data đã gửi:", formData);

    localStorage.removeItem("folderDraft");
    localStorage.removeItem("folderAutoSave");
    setHasUnsavedChanges(false);

    setIsExporting(false);
    setShowSuccess(true);
    toast.dismiss();
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

  const handleResetForm = () => {
    if (
      formData.title ||
      formData.description ||
      formData.studySets.length !== 0
    ) {
      setShowResetConfirm(true);
    }
  };
  const confirmResetForm = () => {
    resetForm();

    if (!autoSave) {
      setHasUnsavedChanges(false);
    }

    if (autoSave) {
      localStorage.setItem("folderDraft", JSON.stringify(defaultFormData));
    }

    toast.success("Đã đặt lại form");
    setShowResetConfirm(false);
  };

  // Hàm xử lý thoát
  const handleExit = (saveDraft: boolean) => {
    if (saveDraft) {
      setIsSavingDraft(true);
      try {
        localStorage.setItem("folderDraft", JSON.stringify(formData));
      } catch (e) {}
      toast.success("Đã lưu bản nháp");

      setShowExitConfirm(false);
      setHasUnsavedChanges(false);

      const href = pendingNavigation;
      setPendingNavigation(null);

      // show saving indicator briefly before navigation
      setTimeout(() => {
        setIsSavingDraft(false);
        if (href) router.push(href);
        else window.history.back();
      }, 600);
    } else {
      try {
        localStorage.removeItem("folderDraft");
      } catch (e) {}

      setShowExitConfirm(false);
      setHasUnsavedChanges(false);

      const href = pendingNavigation;
      setPendingNavigation(null);

      if (href) router.push(href);
      else window.history.back();
    }
  };

  // Hàm hiển thị modal xác nhận khi nhấn nút hủy
  const handleCancelClick = () => {
    // Chỉ hiện hộp thoại khi có thay đổi và TẮT autoSave
    if (hasUnsavedChanges && !autoSave) {
      setShowExitConfirm(true);
    } else {
      window.history.back();
    }
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-50 to-fuchsia-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-fuchsia-950/20 p-3 md:p-6">
        <div className="max-w-7xl mx-auto">
          <ProgressHeader
            formData={formData}
            autoSave={autoSave}
            isSavingDraft={isSavingDraft}
            setAutoSave={setAutoSave}
          />

          <AnimatePresence>
            {showSuccess && (
              <SuccessMessage
                onClose={() => {
                  setShowSuccess(false);
                  resetForm();
                }}
              />
            )}
          </AnimatePresence>

          {/* Modal xác nhận thoát */}
          <AlertDialog open={showExitConfirm} onOpenChange={setShowExitConfirm}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Bạn có thay đổi chưa lưu</AlertDialogTitle>
                <AlertDialogDescription>
                  Dữ liệu của bạn sẽ bị mất nếu bạn rời đi ngay bây giờ. Bạn có
                  muốn lưu bản nháp trước khi thoát không?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="flex flex-col sm:flex-row gap-2">
                <AlertDialogCancel
                  onClick={() => {
                    setShowExitConfirm(false);
                    setPendingNavigation(null);
                  }}
                >
                  Hủy
                </AlertDialogCancel>
                <div className="rounded-md bg-gradient-to-br from-purple-400 to-pink-500 p-[1.5px]">
                  <AlertDialogAction
                    onClick={() => handleExit(false)}
                    className="w-full bg-background text-purple-600  hover:bg-purple-50 border-0"
                  >
                    Thoát và không lưu
                  </AlertDialogAction>
                </div>

                <AlertDialogAction
                  onClick={() => handleExit(true)}
                  className="bg-gradient-to-br from-purple-500 to-pink-600  text-white  hover:from-purple-600 hover:to-pink-700 shadow-lg"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Thoát và lưu bản nháp
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <AlertDialog
            open={showResetConfirm}
            onOpenChange={setShowResetConfirm}
          >
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Bạn có chắc muốn đặt lại form?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Tất cả dữ liệu bạn đã nhập sẽ bị mất và không thể khôi phục.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter className="flex flex-col sm:flex-row gap-2">
                <AlertDialogCancel>Hủy</AlertDialogCancel>

                <AlertDialogAction
                  onClick={confirmResetForm}
                  className="bg-gradient-to-br from-purple-500 to-pink-600 text-white hover:from-purple-600 hover:to-pink-700"
                >
                  Đặt lại form
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <AlertDialog open={showDraftDialog} onOpenChange={setShowDraftDialog}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Phát hiện bản nháp</AlertDialogTitle>
                <AlertDialogDescription>
                  Bạn có một bản nháp chưa lưu từ lần trước.
                  <br />
                  Bạn muốn tiếp tục chỉnh sửa hay tạo một folder mới?
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter className="flex flex-col sm:flex-row gap-2">
                <AlertDialogCancel onClick={handleCreateNew}>
                  Tạo mới
                </AlertDialogCancel>

                <AlertDialogAction
                  onClick={handleUseDraft}
                  className="bg-gradient-to-br from-purple-500 to-pink-600 text-white hover:from-purple-600 hover:to-pink-700"
                >
                  Tiếp tục bản nháp
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
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
              <div className="lg:sticky lg:top-16 space-y-6">
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
                <div className="space-y-4 sticky bottom-0 bg-white dark:bg-gray-900/30 border-t border-gray-200 dark:border-gray-800">
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <Button
                      onClick={handleSubmit}
                      size="lg"
                      className="w-full h-12 cursor-pointer text-base font-semibold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 dark:from-purple-700 dark:to-pink-700 dark:hover:from-purple-800 dark:hover:to-pink-800 text-white shadow-lg shadow-purple-500/20 dark:shadow-purple-500/30"
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
                      className="h-11 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                      onClick={handleCancelClick}
                    >
                      Hủy
                    </Button>
                    <Button
                      variant="outline"
                      className="h-11 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                      onClick={handleResetForm}
                      disabled={
                        isExporting ||
                        (!formData.title &&
                          !formData.description &&
                          formData.studySets.length === 0)
                      }
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
