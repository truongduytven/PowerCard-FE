

// // "use client";

// // import React, { useState, useRef, useCallback } from "react";
// // import {
// //   Card,
// //   CardContent,
// //   CardDescription,
// //   CardHeader,
// //   CardTitle,
// // } from "@/components/ui/card";
// // import { Input } from "@/components/ui/input";
// // import { Label } from "@/components/ui/label";
// // import { Textarea } from "@/components/ui/textarea";
// // import { Button } from "@/components/ui/button";
// // import { Badge } from "@/components/ui/badge";
// // import { Switch } from "@/components/ui/switch";
// // import {
// //   Plus,
// //   X,
// //   GripVertical,
// //   ArrowLeft,
// //   Save,
// //   Image as ImageIcon,
// //   Trash2,
// //   Sparkles,
// //   FolderOpen,
// //   Tag,
// //   Globe,
// //   Lock,
// //   Check,
// //   FileText,
// //   Eye,
// //   BookOpen,
// //   AlertCircle,
// //   ChevronDown,
// //   Upload,
// //   Zap,
// //   Import,
// //   ExternalLink,
// //   AlertTriangle,
// //   CheckCircle,
// //   Loader2,
// // } from "lucide-react";
// // import { toast } from "sonner";
// // import {
// //   Dialog,
// //   DialogContent,
// //   DialogDescription,
// //   DialogFooter,
// //   DialogHeader,
// //   DialogTitle,
// //   DialogTrigger,
// // } from "@/components/ui/dialog";
// // import { Checkbox } from "@/components/ui/checkbox";

// // // Types
// // interface Flashcard {
// //   id: string;
// //   term: string;
// //   definition: string;
// //   mediaId: File | null;
// //   mediaPreview: string | null;
// //   position: number;
// // }

// // interface FormData {
// //   title: string;
// //   description: string;
// //   icon: string;
// //   topicId: string;
// //   folderSetId: string;
// //   isPublic: boolean;
// //   flashcards: Flashcard[];
// // }

// // // Mock data
// // const topics = [
// //   { id: "1", name: "Ngôn ngữ", color: "#3B82F6" },
// //   { id: "2", name: "Toán học", color: "#8B5CF6" },
// //   { id: "3", name: "Khoa học", color: "#10B981" },
// //   { id: "4", name: "Lịch sử", color: "#F59E0B" },
// //   { id: "5", name: "Công nghệ", color: "#EF4444" },
// // ];

// // const folders = [
// //   { id: "1", name: "Học kỳ 1", count: 12 },
// //   { id: "2", name: "Ôn thi TOEIC", count: 8 },
// //   { id: "3", name: "Đại học", count: 15 },
// //   { id: "4", name: "Tự học", count: 6 },
// // ];

// // // Import Modal Component
// // const ImportQuizletModal: React.FC<{
// //   open: boolean;
// //   onOpenChange: (open: boolean) => void;
// //   onImport: (flashcards: Omit<Flashcard, "id" | "position">[]) => void;
// // }> = ({ open, onOpenChange, onImport }) => {
// //   const [importUrl, setImportUrl] = useState("");
// //   const [acceptTerms, setAcceptTerms] = useState(false);
// //   const [isImporting, setIsImporting] = useState(false);

// //   const validateQuizletUrl = useCallback((url: string) => {
// //     return (
// //       url.includes("quizlet.com") && (url.includes("/") || url.includes("?"))
// //     );
// //   }, []);

// //   const handleImport = async () => {
// //     if (!importUrl.trim()) {
// //       toast.error("Vui lòng nhập đường link Quizlet");
// //       return;
// //     }

// //     if (!validateQuizletUrl(importUrl)) {
// //       toast.error("Link Quizlet không hợp lệ. Vui lòng kiểm tra lại.");
// //       return;
// //     }

// //     if (!acceptTerms) {
// //       toast.error("Vui lòng chấp nhận điều khoản sử dụng");
// //       return;
// //     }

// //     setIsImporting(true);

// //     try {
// //       // Mock API call
// //       await new Promise((resolve) => setTimeout(resolve, 1500));
      
// //       // Mock data
// //       const mockFlashcards = [
// //         { term: "Hello", definition: "Xin chào" },
// //         { term: "Goodbye", definition: "Tạm biệt" },
// //         { term: "Thank you", definition: "Cảm ơn" },
// //         { term: "Please", definition: "Làm ơn" },
// //         { term: "Sorry", definition: "Xin lỗi" },
// //       ];

// //       const importedFlashcards = mockFlashcards.map((item, index) => ({
// //         term: item.term || "",
// //         definition: item.definition || "",
// //         mediaId: null,
// //         mediaPreview: null,
// //       }));

// //       onImport(importedFlashcards);
// //       toast.success(`Đã import thành công ${importedFlashcards.length} thẻ`);
      
// //       // Reset form
// //       setImportUrl("");
// //       setAcceptTerms(false);
// //       onOpenChange(false);
// //     } catch (error) {
// //       console.error("Import error:", error);
// //       toast.error("Import thất bại. Vui lòng thử lại.");
// //     } finally {
// //       setIsImporting(false);
// //     }
// //   };

// //   return (
// //     <Dialog open={open} onOpenChange={onOpenChange}>
// //       <DialogContent className="sm:max-w-md">
// //         <DialogHeader>
// //           <div className="flex items-center gap-3 mb-2">
// //             <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
// //               <Import className="w-5 h-5 text-white" />
// //             </div>
// //             <div>
// //               <DialogTitle className="text-xl">Import từ Quizlet</DialogTitle>
// //               <DialogDescription>
// //                 Import bộ flashcard từ Quizlet bằng đường link
// //               </DialogDescription>
// //             </div>
// //           </div>
// //         </DialogHeader>

// //         <div className="space-y-6 py-4">
// //           {/* URL Input */}
// //           <div className="space-y-3">
// //             <Label htmlFor="quizlet-url" className="text-sm font-medium">
// //               Đường link Quizlet
// //               <span className="text-red-500 ml-1">*</span>
// //             </Label>
// //             <div className="relative">
// //               <ExternalLink className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
// //               <Input
// //                 id="quizlet-url"
// //                 placeholder="https://quizlet.com/..."
// //                 value={importUrl}
// //                 onChange={(e) => setImportUrl(e.target.value)}
// //                 className="pl-10 h-12"
// //               />
// //             </div>
// //             {importUrl && !validateQuizletUrl(importUrl) && (
// //               <p className="text-xs text-amber-600 flex items-center gap-1">
// //                 <AlertTriangle className="w-3 h-3" />
// //                 Link Quizlet không hợp lệ. Vui lòng kiểm tra lại.
// //               </p>
// //             )}
// //             <p className="text-xs text-gray-500">
// //               Ví dụ: https://quizlet.com/12345678/title
// //             </p>
// //           </div>

// //           {/* Terms and Conditions */}
// //           <div className="space-y-3 border border-gray-200 rounded-lg p-4 bg-gray-50">
// //             <div className="flex items-start gap-3">
// //               <Checkbox
// //                 id="terms"
// //                 checked={acceptTerms}
// //                 onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
// //                 className="mt-0.5"
// //               />
// //               <div className="space-y-2">
// //                 <Label
// //                   htmlFor="terms"
// //                   className="text-sm font-medium cursor-pointer"
// //                 >
// //                   Tôi đồng ý với các điều khoản sau:
// //                 </Label>
// //                 <ul className="space-y-2 text-xs text-gray-600">
// //                   <li className="flex items-start gap-2">
// //                     <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-1" />
// //                     <span>
// //                       Việc import chỉ phục vụ mục đích học tập cá nhân
// //                     </span>
// //                   </li>
// //                   <li className="flex items-start gap-2">
// //                     <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-1" />
// //                     <span>
// //                       Không sử dụng cho mục đích thương mại hoặc phân phối lại
// //                     </span>
// //                   </li>
// //                   <li className="flex items-start gap-2">
// //                     <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-1" />
// //                     <span>
// //                       Người dùng tự chịu trách nhiệm về bản quyền và tuân thủ
// //                       các quy định của Quizlet
// //                     </span>
// //                   </li>
// //                   <li className="flex items-start gap-2">
// //                     <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-1" />
// //                     <span>
// //                       Chúng tôi không chịu trách nhiệm pháp lí về nội dung
// //                       được import
// //                     </span>
// //                   </li>
// //                 </ul>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Preview (optional) */}
// //           {validateQuizletUrl(importUrl) && acceptTerms && (
// //             <div className="border border-green-200 rounded-lg p-4 bg-green-50">
// //               <div className="flex items-center gap-2 mb-2">
// //                 <CheckCircle className="w-4 h-4 text-green-600" />
// //                 <span className="text-sm font-medium text-green-800">
// //                   Đã sẵn sàng import
// //                 </span>
// //               </div>
// //               <p className="text-xs text-green-700">
// //                 Link hợp lệ. Bấm Import để thêm flashcard vào bộ học của bạn.
// //               </p>
// //             </div>
// //           )}
// //         </div>

// //         <DialogFooter className="flex-col sm:flex-row gap-2">
// //           <Button
// //             variant="outline"
// //             onClick={() => {
// //               onOpenChange(false);
// //               setImportUrl("");
// //               setAcceptTerms(false);
// //             }}
// //             className="w-full sm:w-auto"
// //           >
// //             Hủy
// //           </Button>
// //           <Button
// //             onClick={handleImport}
// //             disabled={
// //               !validateQuizletUrl(importUrl) || !acceptTerms || isImporting
// //             }
// //             className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
// //           >
// //             {isImporting ? (
// //               <>
// //                 <Loader2 className="w-4 h-4 mr-2 animate-spin" />
// //                 Đang import...
// //               </>
// //             ) : (
// //               <>
// //                 <Import className="w-4 h-4 mr-2" />
// //                 Import
// //               </>
// //             )}
// //           </Button>
// //         </DialogFooter>
// //       </DialogContent>
// //     </Dialog>
// //   );
// // };

// // export default function CreateFlashcardPage() {
// //   const [formData, setFormData] = useState<FormData>({
// //     title: "",
// //     description: "",
// //     icon: "📚",
// //     topicId: "",
// //     folderSetId: "",
// //     isPublic: false,
// //     flashcards: [
// //       {
// //         id: "1",
// //         term: "",
// //         definition: "",
// //         mediaId: null,
// //         mediaPreview: null,
// //         position: 0,
// //       },
// //       {
// //         id: "2",
// //         term: "",
// //         definition: "",
// //         mediaId: null,
// //         mediaPreview: null,
// //         position: 1,
// //       },
// //     ],
// //   });

// //   const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
// //   const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
// //   const [showSuccess, setShowSuccess] = useState(false);
// //   const [expandedCards, setExpandedCards] = useState<Set<string>>(
// //     new Set(["1", "2"])
// //   );
// //   const [showImportModal, setShowImportModal] = useState(false);
// //   const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

// //   const handleInputChange = (field: keyof FormData, value: any) => {
// //     setFormData((prev) => ({ ...prev, [field]: value }));
// //   };

// //   const handleFlashcardChange = (
// //     index: number,
// //     field: keyof Flashcard,
// //     value: any
// //   ) => {
// //     const updatedCards = [...formData.flashcards];
// //     updatedCards[index] = { ...updatedCards[index], [field]: value };
// //     setFormData((prev) => ({ ...prev, flashcards: updatedCards }));
// //   };

// //   const handleImageUpload = (index: number, file: File) => {
// //     if (!file.type.startsWith("image/")) {
// //       alert("Vui lòng chọn file hình ảnh");
// //       return;
// //     }

// //     if (file.size > 5 * 1024 * 1024) {
// //       alert("File không được vượt quá 5MB");
// //       return;
// //     }

// //     const reader = new FileReader();
// //     reader.onloadend = () => {
// //       handleFlashcardChange(index, "mediaId", file);
// //       handleFlashcardChange(index, "mediaPreview", reader.result as string);
// //     };
// //     reader.readAsDataURL(file);
// //   };

// //   const addFlashcard = () => {
// //     const newId = Date.now().toString();
// //     const newCard: Flashcard = {
// //       id: newId,
// //       term: "",
// //       definition: "",
// //       mediaId: null,
// //       mediaPreview: null,
// //       position: formData.flashcards.length,
// //     };
// //     setFormData((prev) => ({
// //       ...prev,
// //       flashcards: [...prev.flashcards, newCard],
// //     }));
// //     setExpandedCards((prev) => new Set([...prev, newId]));
// //   };

// //   const handleImportFromQuizlet = (importedFlashcards: Omit<Flashcard, "id" | "position">[]) => {
// //     const newFlashcards = importedFlashcards.map((item, index) => ({
// //       id: Date.now().toString() + index,
// //       ...item,
// //       position: formData.flashcards.length + index,
// //     }));

// //     setFormData((prev) => ({
// //       ...prev,
// //       flashcards: [...prev.flashcards, ...newFlashcards],
// //     }));

// //     // Expand all imported cards
// //     const newCardIds = newFlashcards.map(card => card.id);
// //     setExpandedCards((prev) => new Set([...prev, ...newCardIds]));
// //   };

// //   const removeFlashcard = (index: number) => {
// //     if (formData.flashcards.length <= 2) {
// //       alert("Bộ flashcard cần ít nhất 2 thẻ");
// //       return;
// //     }
// //     const cardId = formData.flashcards[index].id;
// //     const updatedCards = formData.flashcards.filter((_, i) => i !== index);
// //     updatedCards.forEach((card, i) => (card.position = i));
// //     setFormData((prev) => ({ ...prev, flashcards: updatedCards }));
// //     setExpandedCards((prev) => {
// //       const newSet = new Set(prev);
// //       newSet.delete(cardId);
// //       return newSet;
// //     });
// //   };

// //   const toggleCardExpand = (cardId: string) => {
// //     setExpandedCards((prev) => {
// //       const newSet = new Set(prev);
// //       if (newSet.has(cardId)) {
// //         newSet.delete(cardId);
// //       } else {
// //         newSet.add(cardId);
// //       }
// //       return newSet;
// //     });
// //   };

// //   const handleDragStart = (index: number) => {
// //     setDraggedIndex(index);
// //   };

// //   const handleDragOver = (e: React.DragEvent, index: number) => {
// //     e.preventDefault();
// //     setDragOverIndex(index);
// //   };

// //   const handleDrop = (e: React.DragEvent, dropIndex: number) => {
// //     e.preventDefault();
// //     if (draggedIndex === null) return;

// //     const updatedCards = [...formData.flashcards];
// //     const draggedCard = updatedCards[draggedIndex];
// //     updatedCards.splice(draggedIndex, 1);
// //     updatedCards.splice(dropIndex, 0, draggedCard);
// //     updatedCards.forEach((card, i) => (card.position = i));

// //     setFormData((prev) => ({ ...prev, flashcards: updatedCards }));
// //     setDraggedIndex(null);
// //     setDragOverIndex(null);
// //   };

// //   const handleDragEnd = () => {
// //     setDraggedIndex(null);
// //     setDragOverIndex(null);
// //   };

// //   const handleSubmit = () => {
// //     const emptyCards = formData.flashcards.filter(
// //       (card) => !card.term.trim() || !card.definition.trim()
// //     );
// //     if (!formData.title.trim()) {
// //       alert("Vui lòng nhập tiêu đề cho bộ flashcard");
// //       return;
// //     }

// //     if (emptyCards.length > 0) {
// //       alert(
// //         `Còn ${emptyCards.length} thẻ chưa hoàn thành. Vui lòng kiểm tra lại.`
// //       );
// //       return;
// //     }

// //     const submitData = {
// //       title: formData.title.trim(),
// //       description: formData.description.trim(),
// //       icon: formData.icon,
// //       topicId: formData.topicId,
// //       folderSetId: formData.folderSetId,
// //       isPublic: formData.isPublic,
// //       flashcards: formData.flashcards.map((card) => ({
// //         mediaId: card.mediaId,
// //         position: card.position,
// //         term: card.term.trim(),
// //         definition: card.definition.trim(),
// //       })),
// //     };

// //     console.log("Submit Data:", submitData);
// //     setShowSuccess(true);
// //     setTimeout(() => setShowSuccess(false), 3000);
// //   };

// //   const completedCards = formData.flashcards.filter(
// //     (c) => c.term.trim() && c.definition.trim()
// //   ).length;
// //   const totalCards = formData.flashcards.length;
// //   const incompleteCards = totalCards - completedCards;
// //   const progress = totalCards > 0 ? (completedCards / totalCards) * 100 : 0;

// //   const selectedTopic = topics.find((t) => t.id === formData.topicId);
// //   const selectedFolder = folders.find((f) => f.id === formData.folderSetId);

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
// //       {/* Header Section */}
// //       <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
// //           <div className="flex items-center justify-between">
// //             <div className="flex items-center gap-4">
// //               <Button
// //                 variant="ghost"
// //                 size="sm"
// //                 className="hover:bg-gray-100 text-gray-600"
// //               >
// //                 <ArrowLeft className="w-4 h-4 mr-2" />
// //                 Quay lại
// //               </Button>
// //               <div className="hidden sm:flex items-center gap-2">
// //                 <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
// //                   <BookOpen className="w-4 h-4 text-white" />
// //                 </div>
// //                 <span className="text-sm font-medium text-gray-600">
// //                   Flashcards / Tạo mới
// //                 </span>
// //               </div>
// //             </div>

// //             <div className="flex items-center gap-3">
// //               <div className="text-right hidden sm:block">
// //                 <p className="text-sm font-medium text-gray-900">
// //                   {completedCards}/{totalCards} thẻ hoàn thành
// //                 </p>
// //                 <div className="w-32 h-1.5 bg-gray-200 rounded-full overflow-hidden mt-1">
// //                   <div
// //                     className="h-full bg-gradient-to-r from-green-500 to-emerald-600 transition-all duration-500"
// //                     style={{ width: `${progress}%` }}
// //                   />
// //                 </div>
// //               </div>
// //               <Badge
// //                 variant="secondary"
// //                 className="font-semibold bg-blue-50 text-blue-700"
// //               >
// //                 Bản nháp
// //               </Badge>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
// //         {/* Success Message */}
// //         {showSuccess && (
// //           <div className="mb-6 animate-in fade-in slide-in-from-top-2 duration-300">
// //             <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 shadow-lg">
// //               <div className="flex items-center gap-4">
// //                 <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-md">
// //                   <Check className="w-5 h-5 text-white" />
// //                 </div>
// //                 <div className="flex-1">
// //                   <h3 className="font-semibold text-green-900">
// //                     Tạo thành công!
// //                   </h3>
// //                   <p className="text-sm text-green-700 mt-1">
// //                     Bộ flashcard "
// //                     <span className="font-medium">{formData.title}</span>" đã
// //                     được tạo và sẵn sàng để sử dụng.
// //                   </p>
// //                 </div>
// //                 <Button
// //                   size="sm"
// //                   variant="outline"
// //                   className="border-green-300 text-green-700 hover:bg-green-50"
// //                   onClick={() => setShowSuccess(false)}
// //                 >
// //                   Đóng
// //                 </Button>
// //               </div>
// //             </div>
// //           </div>
// //         )}

// //         {/* Import Modal */}
// //         <ImportQuizletModal
// //           open={showImportModal}
// //           onOpenChange={setShowImportModal}
// //           onImport={handleImportFromQuizlet}
// //         />

// //         <div className="grid lg:grid-cols-3 gap-6">
// //           {/* Main Content */}
// //           <div className="lg:col-span-2 space-y-6">
// //             {/* Basic Info Card */}
// //             <Card className="border-0 shadow-lg bg-white">
// //               <CardHeader className="pb-4 border-b border-gray-100">
// //                 <div className="flex items-center justify-between">
// //                   <div className="flex items-center gap-3">
// //                     <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-md">
// //                       <FileText className="w-5 h-5 text-white" />
// //                     </div>
// //                     <div>
// //                       <CardTitle className="text-xl font-semibold text-gray-900">
// //                         Thông tin cơ bản
// //                       </CardTitle>
// //                       <CardDescription className="text-gray-600">
// //                         Thông tin chung về bộ flashcard
// //                       </CardDescription>
// //                     </div>
// //                   </div>
// //                   <Badge className="bg-blue-50 text-blue-700 border border-blue-200">
// //                     Bắt buộc
// //                   </Badge>
// //                 </div>
// //               </CardHeader>
// //               <CardContent className="pt-6 space-y-6">
// //                 <div className="space-y-4">
// //                   <div className="space-y-2">
// //                     <div className="flex items-center justify-between">
// //                       <Label className="text-sm font-medium text-gray-700">
// //                         Tiêu đề bộ flashcard
// //                       </Label>
// //                       <span
// //                         className={`text-xs ${
// //                           formData.title.length > 90
// //                             ? "text-amber-600"
// //                             : "text-gray-500"
// //                         }`}
// //                       >
// //                         {formData.title.length}/100
// //                       </span>
// //                     </div>
// //                     <Input
// //                       placeholder="Nhập tiêu đề bộ flashcard..."
// //                       value={formData.title}
// //                       onChange={(e) =>
// //                         handleInputChange("title", e.target.value)
// //                       }
// //                       maxLength={100}
// //                       className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20"
// //                     />
// //                     {formData.title.length > 90 && (
// //                       <p className="text-xs text-amber-600 flex items-center gap-1">
// //                         <AlertCircle className="w-3 h-3" />
// //                         Tiêu đề sắp đạt giới hạn
// //                       </p>
// //                     )}
// //                   </div>

// //                   <div className="space-y-2">
// //                     <Label className="text-sm font-medium text-gray-700">
// //                       Mô tả (Tùy chọn)
// //                     </Label>
// //                     <Textarea
// //                       placeholder="Mô tả nội dung, mục tiêu học tập..."
// //                       value={formData.description}
// //                       onChange={(e) =>
// //                         handleInputChange("description", e.target.value)
// //                       }
// //                       className="min-h-[100px] resize-none border-gray-300 focus:border-blue-500 focus:ring-blue-500/20"
// //                     />
// //                   </div>

// //                   <div className="grid md:grid-cols-2 gap-4">
// //                     <div className="space-y-2">
// //                       <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
// //                         <Tag className="w-4 h-4" />
// //                         Chủ đề
// //                       </Label>
// //                       <div className="relative">
// //                         <select
// //                           value={formData.topicId}
// //                           onChange={(e) =>
// //                             handleInputChange("topicId", e.target.value)
// //                           }
// //                           className="w-full h-12 px-4 pr-10 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 appearance-none bg-white text-gray-900"
// //                         >
// //                           <option value="">Chọn chủ đề</option>
// //                           {topics.map((topic) => (
// //                             <option key={topic.id} value={topic.id}>
// //                               {topic.name}
// //                             </option>
// //                           ))}
// //                         </select>
// //                         <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
// //                       </div>
// //                       {selectedTopic && (
// //                         <div className="flex items-center gap-2 mt-2">
// //                           <div
// //                             className="w-3 h-3 rounded-full"
// //                             style={{ backgroundColor: selectedTopic.color }}
// //                           />
// //                           <span className="text-sm text-gray-600">
// //                             {selectedTopic.name}
// //                           </span>
// //                         </div>
// //                       )}
// //                     </div>

// //                     <div className="space-y-2">
// //                       <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
// //                         <FolderOpen className="w-4 h-4" />
// //                         Thư mục
// //                       </Label>
// //                       <div className="relative">
// //                         <select
// //                           value={formData.folderSetId}
// //                           onChange={(e) =>
// //                             handleInputChange("folderSetId", e.target.value)
// //                           }
// //                           className="w-full h-12 px-4 pr-10 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 appearance-none bg-white text-gray-900"
// //                         >
// //                           <option value="">Chọn thư mục</option>
// //                           {folders.map((folder) => (
// //                             <option key={folder.id} value={folder.id}>
// //                               {folder.name} ({folder.count} sets)
// //                             </option>
// //                           ))}
// //                         </select>
// //                         <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
// //                       </div>
// //                     </div>
// //                   </div>

// //                   <div className="pt-4 border-t border-gray-100">
// //                     <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
// //                       <div className="space-y-1">
// //                         <div className="flex items-center gap-2">
// //                           <Label className="text-sm font-medium text-gray-900">
// //                             Quyền riêng tư
// //                           </Label>
// //                           {formData.isPublic ? (
// //                             <Badge className="bg-blue-100 text-blue-700 border-blue-200">
// //                               <Globe className="w-3 h-3 mr-1" />
// //                               Công khai
// //                             </Badge>
// //                           ) : (
// //                             <Badge className="bg-gray-100 text-gray-700 border-gray-300">
// //                               <Lock className="w-3 h-3 mr-1" />
// //                               Riêng tư
// //                             </Badge>
// //                           )}
// //                         </div>
// //                         <p className="text-sm text-gray-600">
// //                           {formData.isPublic
// //                             ? "Mọi người có thể xem và học bộ flashcard này. Các hình ảnh trong bộ cũng được chia sẻ công khai và có thể được người khác sử dụng."
// //                             : "Chỉ bạn mới có thể xem và học bộ flashcard này."}
// //                         </p>
// //                       </div>
// //                       <Switch
// //                         checked={formData.isPublic}
// //                         onCheckedChange={(checked) =>
// //                           handleInputChange("isPublic", checked)
// //                         }
// //                         className="data-[state=checked]:bg-blue-600"
// //                       />
// //                     </div>
// //                   </div>
// //                 </div>
// //               </CardContent>
// //             </Card>

// //             {/* Flashcards Section */}
// //             <div className="space-y-6">
// //               <div className="flex items-center justify-between">
// //                 <div>
// //                   <h2 className="text-xl font-semibold text-gray-900">
// //                     Danh sách flashcard
// //                   </h2>
// //                   <p className="text-sm text-gray-600 mt-1">
// //                     Thêm và chỉnh sửa các thẻ học tập
// //                   </p>
// //                 </div>

// //                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
// //                   <Button
// //                     onClick={addFlashcard}
// //                     size="sm"
// //                     className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-sm"
// //                   >
// //                     <Plus className="w-4 h-4 mr-2" />
// //                     Thêm thẻ
// //                   </Button>

// //                   <Button
// //                     variant="outline"
// //                     size="sm"
// //                     onClick={() => setShowImportModal(true)}
// //                     className="border-purple-300 hover:border-purple-400 hover:bg-purple-50 text-purple-700"
// //                   >
// //                     <Import className="w-4 h-4 mr-2" />
// //                     Import từ Quizlet
// //                   </Button>
// //                 </div>
// //               </div>

// //               {/* Progress Indicator */}
// //               <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
// //                 <div className="flex items-center justify-between mb-3">
// //                   <span className="text-sm font-medium text-gray-700">
// //                     Tiến độ hoàn thành
// //                   </span>
// //                   <span className="text-sm font-semibold text-blue-600">
// //                     {completedCards}/{totalCards}
// //                   </span>
// //                 </div>
// //                 <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
// //                   <div
// //                     className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500"
// //                     style={{ width: `${progress}%` }}
// //                   />
// //                 </div>
// //                 {incompleteCards > 0 && (
// //                   <p className="text-xs text-gray-500 mt-2">
// //                     Còn {incompleteCards} thẻ chưa hoàn thành
// //                   </p>
// //                 )}
// //               </div>

// //               {/* Flashcards List */}
// //               <div className="space-y-4">
// //                 {formData.flashcards.map((card, index) => (
// //                   <div
// //                     key={card.id}
// //                     draggable
// //                     onDragStart={() => handleDragStart(index)}
// //                     onDragOver={(e) => handleDragOver(e, index)}
// //                     onDrop={(e) => handleDrop(e, index)}
// //                     onDragEnd={handleDragEnd}
// //                     className={`relative transition-all duration-200 ${
// //                       draggedIndex === index ? "opacity-50 scale-[0.98]" : ""
// //                     } ${dragOverIndex === index ? "scale-[1.02]" : ""}`}
// //                   >
// //                     <Card
// //                       className={`border overflow-hidden cursor-move hover:shadow-md transition-shadow ${
// //                         dragOverIndex === index
// //                           ? "border-blue-500 shadow-lg"
// //                           : "border-gray-200"
// //                       }`}
// //                     >
// //                       {/* Card Header */}
// //                       <div
// //                         className="px-5 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200 cursor-pointer"
// //                         onClick={() => toggleCardExpand(card.id)}
// //                       >
// //                         <div className="flex items-center justify-between">
// //                           <div className="flex items-center gap-3">
// //                             <GripVertical className="w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors" />
// //                             <Badge
// //                               variant="outline"
// //                               className={`font-medium ${
// //                                 card.term && card.definition
// //                                   ? "border-green-200 bg-green-50 text-green-700"
// //                                   : "border-gray-300 bg-gray-100 text-gray-700"
// //                               }`}
// //                             >
// //                               Thẻ #{index + 1}
// //                             </Badge>
// //                             {card.term && (
// //                               <span className="text-sm font-medium text-gray-900 truncate max-w-[200px]">
// //                                 {card.term}
// //                               </span>
// //                             )}
// //                           </div>
// //                           <div className="flex items-center gap-2">
// //                             {card.term && card.definition && (
// //                               <Badge className="bg-green-500 text-white px-2 py-0.5 text-xs">
// //                                 <Check className="w-3 h-3 mr-1" />
// //                                 Hoàn thành
// //                               </Badge>
// //                             )}
// //                             <ChevronDown
// //                               className={`w-5 h-5 text-gray-400 transition-transform ${
// //                                 expandedCards.has(card.id) ? "rotate-180" : ""
// //                               }`}
// //                             />
// //                           </div>
// //                         </div>
// //                       </div>

// //                       {/* Expandable Content */}
// //                       {expandedCards.has(card.id) && (
// //                         <CardContent className="p-5 space-y-5">
// //                           <div className="grid md:grid-cols-2 gap-5">
// //                             <div className="space-y-3">
// //                               <Label className="text-sm font-medium text-gray-700">
// //                                 Thuật ngữ (Term)
// //                                 <span className="text-red-500 ml-1">*</span>
// //                               </Label>
// //                               <Textarea
// //                                 placeholder="Nhập thuật ngữ..."
// //                                 value={card.term}
// //                                 onChange={(e) =>
// //                                   handleFlashcardChange(
// //                                     index,
// //                                     "term",
// //                                     e.target.value
// //                                   )
// //                                 }
// //                                 className="min-h-[120px] resize-none border-gray-300 focus:border-blue-500 focus:ring-blue-500/20"
// //                                 rows={3}
// //                               />
// //                               {!card.term.trim() && (
// //                                 <p className="text-xs text-red-500 flex items-center gap-1">
// //                                   <AlertCircle className="w-3 h-3" />
// //                                   Vui lòng nhập thuật ngữ
// //                                 </p>
// //                               )}
// //                             </div>

// //                             <div className="space-y-3">
// //                               <Label className="text-sm font-medium text-gray-700">
// //                                 Định nghĩa (Definition)
// //                                 <span className="text-red-500 ml-1">*</span>
// //                               </Label>
// //                               <Textarea
// //                                 placeholder="Nhập định nghĩa..."
// //                                 value={card.definition}
// //                                 onChange={(e) =>
// //                                   handleFlashcardChange(
// //                                     index,
// //                                     "definition",
// //                                     e.target.value
// //                                   )
// //                                 }
// //                                 className="min-h-[120px] resize-none border-gray-300 focus:border-blue-500 focus:ring-blue-500/20"
// //                                 rows={3}
// //                               />
// //                               {!card.definition.trim() && (
// //                                 <p className="text-xs text-red-500 flex items-center gap-1">
// //                                   <AlertCircle className="w-3 h-3" />
// //                                   Vui lòng nhập định nghĩa
// //                                 </p>
// //                               )}
// //                             </div>
// //                           </div>

// //                           {/* Media Upload */}
// //                           <div className="space-y-3">
// //                             <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
// //                               <ImageIcon className="w-4 h-4" />
// //                               Hình ảnh minh họa (Tùy chọn)
// //                             </Label>
// //                             {card.mediaPreview ? (
// //                               <div className="relative group">
// //                                 <div className="border border-gray-200 rounded-lg overflow-hidden">
// //                                   <img
// //                                     src={card.mediaPreview}
// //                                     alt="Preview"
// //                                     className="w-full h-48 object-cover"
// //                                   />
// //                                 </div>
// //                                 <div className="absolute top-3 right-3 flex gap-2">
// //                                   <Button
// //                                     variant="outline"
// //                                     size="sm"
// //                                     className="bg-white/90 backdrop-blur-sm hover:bg-white"
// //                                     onClick={() => {
// //                                       handleFlashcardChange(
// //                                         index,
// //                                         "mediaId",
// //                                         null
// //                                       );
// //                                       handleFlashcardChange(
// //                                         index,
// //                                         "mediaPreview",
// //                                         null
// //                                       );
// //                                     }}
// //                                   >
// //                                     <Trash2 className="w-4 h-4" />
// //                                   </Button>
// //                                   <Button
// //                                     variant="outline"
// //                                     size="sm"
// //                                     className="bg-white/90 backdrop-blur-sm hover:bg-white"
// //                                     onClick={() =>
// //                                       fileInputRefs.current[card.id]?.click()
// //                                     }
// //                                   >
// //                                     <ImageIcon className="w-4 h-4" />
// //                                   </Button>
// //                                 </div>
// //                               </div>
// //                             ) : (
// //                               <div
// //                                 className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-400 transition-colors cursor-pointer bg-gray-50 hover:bg-blue-50/50"
// //                                 onClick={() =>
// //                                   fileInputRefs.current[card.id]?.click()
// //                                 }
// //                               >
// //                                 <div className="flex flex-col items-center justify-center gap-3">
// //                                   <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
// //                                     <Upload className="w-6 h-6 text-blue-600" />
// //                                   </div>
// //                                   <div className="text-center">
// //                                     <p className="text-sm font-medium text-gray-700">
// //                                       Tải ảnh lên
// //                                     </p>
// //                                     <p className="text-xs text-gray-500 mt-1">
// //                                       Kéo thả hoặc click để chọn file
// //                                     </p>
// //                                     <p className="text-xs text-gray-400 mt-1">
// //                                       PNG, JPG, GIF • Tối đa 5MB
// //                                     </p>
// //                                   </div>
// //                                 </div>
// //                               </div>
// //                             )}
// //                             <input
// //                               ref={(el: HTMLInputElement | null) => {
// //                                 fileInputRefs.current[card.id] = el;
// //                               }}
// //                               type="file"
// //                               accept="image/*"
// //                               className="hidden"
// //                               onChange={(e) => {
// //                                 const file = e.target.files?.[0];
// //                                 if (file) handleImageUpload(index, file);
// //                               }}
// //                             />
// //                           </div>

// //                           {/* Action Buttons */}
// //                           <div className="flex items-center justify-between pt-4 border-t border-gray-100">
// //                             <div className="text-sm text-gray-500">
// //                               Thẻ #{index + 1} •{" "}
// //                               {card.mediaPreview ? "Có ảnh" : "Không có ảnh"}
// //                             </div>
// //                             <div className="flex items-center gap-2">
// //                               <Button
// //                                 variant="ghost"
// //                                 size="sm"
// //                                 onClick={() => removeFlashcard(index)}
// //                                 disabled={formData.flashcards.length <= 2}
// //                                 className="text-gray-500 hover:text-red-600 hover:bg-red-50"
// //                               >
// //                                 <Trash2 className="w-4 h-4 mr-2" />
// //                                 Xóa
// //                               </Button>
// //                             </div>
// //                           </div>
// //                         </CardContent>
// //                       )}
// //                     </Card>
// //                   </div>
// //                 ))}
// //               </div>

// //               {/* Add Card Button */}
// //               <Button
// //                 onClick={addFlashcard}
// //                 variant="outline"
// //                 className="w-full h-14 border-2 border-dashed border-gray-300 hover:border-blue-400 hover:bg-blue-50/50 text-gray-700 hover:text-blue-700 transition-all"
// //               >
// //                 <Plus className="w-5 h-5 mr-2" />
// //                 Thêm thẻ mới
// //               </Button>
// //             </div>
// //           </div>

// //           {/* Sidebar */}
// //           <div className="lg:col-span-1 space-y-6">
// //             {/* Summary Card */}
// //             <Card className="border-0 shadow-lg bg-white sticky top-20">
// //               <CardHeader className="pb-4 border-b border-gray-100">
// //                 <CardTitle className="text-lg font-semibold flex items-center gap-2">
// //                   <Eye className="w-5 h-5 text-blue-600" />
// //                   Tổng quan
// //                 </CardTitle>
// //               </CardHeader>
// //               <CardContent className="pt-6 space-y-5">
// //                 {/* Stats */}
// //                 <div className="space-y-3">
// //                   <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
// //                     <div className="flex items-center gap-3">
// //                       <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
// //                         <FileText className="w-4 h-4 text-blue-600" />
// //                       </div>
// //                       <span className="text-sm font-medium text-gray-700">
// //                         Tổng số thẻ
// //                       </span>
// //                     </div>
// //                     <Badge className="bg-blue-600 text-white px-3 py-1 text-sm">
// //                       {totalCards}
// //                     </Badge>
// //                   </div>

// //                   <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
// //                     <div className="flex items-center gap-3">
// //                       <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
// //                         <Check className="w-4 h-4 text-green-600" />
// //                       </div>
// //                       <span className="text-sm font-medium text-gray-700">
// //                         Đã hoàn thành
// //                       </span>
// //                     </div>
// //                     <Badge className="bg-green-600 text-white px-3 py-1 text-sm">
// //                       {completedCards}
// //                     </Badge>
// //                   </div>

// //                   <div className="flex items-center justify-between p-3 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg">
// //                     <div className="flex items-center gap-3">
// //                       <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
// //                         <AlertCircle className="w-4 h-4 text-amber-600" />
// //                       </div>
// //                       <span className="text-sm font-medium text-gray-700">
// //                         Chưa hoàn thành
// //                       </span>
// //                     </div>
// //                     <Badge className="bg-amber-600 text-white px-3 py-1 text-sm">
// //                       {incompleteCards}
// //                     </Badge>
// //                   </div>
// //                 </div>

// //                 {/* Selected Info */}
// //                 {(selectedTopic || selectedFolder) && (
// //                   <div className="pt-4 border-t border-gray-100 space-y-3">
// //                     <h4 className="text-sm font-medium text-gray-700">
// //                       Thông tin đã chọn
// //                     </h4>
// //                     <div className="space-y-2">
// //                       {selectedTopic && (
// //                         <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
// //                           <span className="text-sm text-gray-600">Chủ đề</span>
// //                           <Badge className="bg-gray-100 text-gray-700">
// //                             {selectedTopic.name}
// //                           </Badge>
// //                         </div>
// //                       )}
// //                       {selectedFolder && (
// //                         <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
// //                           <span className="text-sm text-gray-600">Thư mục</span>
// //                           <Badge className="bg-gray-100 text-gray-700">
// //                             {selectedFolder.name}
// //                           </Badge>
// //                         </div>
// //                       )}
// //                     </div>
// //                   </div>
// //                 )}

// //                 {/* Action Buttons */}
// //                 <div className="pt-4 border-t border-gray-100 space-y-3">
// //                   <Button
// //                     onClick={handleSubmit}
// //                     disabled={!formData.title.trim() || incompleteCards > 0}
// //                     size="lg"
// //                     className="w-full h-14 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all"
// //                   >
// //                     <Save className="w-5 h-5 mr-2" />
// //                     Tạo bộ flashcard
// //                   </Button>

// //                   <Button
// //                     variant="outline"
// //                     size="lg"
// //                     className="w-full h-12 border-gray-300 hover:bg-gray-50"
// //                   >
// //                     Lưu bản nháp
// //                   </Button>

// //                   <Button
// //                     variant="ghost"
// //                     size="lg"
// //                     className="w-full h-12 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
// //                   >
// //                     Hủy
// //                   </Button>
// //                 </div>

// //                 {/* Validation Message */}
// //                 {incompleteCards > 0 && (
// //                   <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
// //                     <div className="flex items-start gap-2">
// //                       <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5" />
// //                       <div>
// //                         <p className="text-sm font-medium text-amber-800">
// //                           Chưa sẵn sàng để tạo
// //                         </p>
// //                         <p className="text-xs text-amber-700 mt-1">
// //                           Cần hoàn thành tất cả {incompleteCards} thẻ còn thiếu
// //                         </p>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 )}
// //               </CardContent>
// //             </Card>

// //             {/* Tips Card */}
// //             <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100">
// //               <CardContent className="p-5">
// //                 <div className="flex items-start gap-3">
// //                   <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
// //                     <Zap className="w-5 h-5 text-blue-600" />
// //                   </div>
// //                   <div>
// //                     <h4 className="font-medium text-gray-900 mb-2">
// //                       Mẹo tạo flashcard hiệu quả
// //                     </h4>
// //                     <ul className="space-y-2 text-sm text-gray-600">
// //                       <li className="flex items-start gap-2">
// //                         <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5" />
// //                         <span>Sử dụng thuật ngữ ngắn gọn, dễ hiểu</span>
// //                       </li>
// //                       <li className="flex items-start gap-2">
// //                         <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5" />
// //                         <span>Thêm hình ảnh để tăng khả năng ghi nhớ</span>
// //                       </li>
// //                       <li className="flex items-start gap-2">
// //                         <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5" />
// //                         <span>Kiểm tra chính tả và nội dung trước khi lưu</span>
// //                       </li>
// //                     </ul>
// //                   </div>
// //                 </div>
// //               </CardContent>
// //             </Card>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }
// "use client";

// import React, { useState, useRef, useCallback } from "react";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Switch } from "@/components/ui/switch";
// import {
//   Plus,
//   X,
//   GripVertical,
//   ArrowLeft,
//   Save,
//   Image as ImageIcon,
//   Trash2,
//   Sparkles,
//   FolderOpen,
//   Tag,
//   Globe,
//   Lock,
//   Check,
//   FileText,
//   Eye,
//   BookOpen,
//   AlertCircle,
//   ChevronDown,
//   Upload,
//   Zap,
//   Import,
//   ExternalLink,
//   AlertTriangle,
//   CheckCircle,
//   Loader2,
//   Palette,
//   Book,
//   GraduationCap,
//   Brain,
//   Lightbulb,
//   Star,
//   BookMarked,
//   Library,
//   Trophy,
//   Target,
//   Award,
//   LayoutGrid,
//   Home,
//   ChevronRight,
//   GripHorizontal,
//   Grid3x3,
// } from "lucide-react";
// import { toast } from "sonner";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Checkbox } from "@/components/ui/checkbox";

// // Types
// interface Flashcard {
//   id: string;
//   term: string;
//   definition: string;
//   mediaId: File | null;
//   mediaPreview: string | null;
//   position: number;
// }

// interface IconOption {
//   value: string;
//   icon: any;
//   label: string;
//   category: string;
// }

// interface FormData {
//   title: string;
//   description: string;
//   icon: string;
//   iconColor: string;
//   topicId: string;
//   folderSetId: string;
//   isPublic: boolean;
//   flashcards: Flashcard[];
// }

// // Mock data
// const topics = [
//   { id: "1", name: "Ngôn ngữ", color: "#3B82F6" },
//   { id: "2", name: "Toán học", color: "#8B5CF6" },
//   { id: "3", name: "Khoa học", color: "#10B981" },
//   { id: "4", name: "Lịch sử", color: "#F59E0B" },
//   { id: "5", name: "Công nghệ", color: "#EF4444" },
// ];

// const folders = [
//   { id: "1", name: "Học kỳ 1", count: 12 },
//   { id: "2", name: "Ôn thi TOEIC", count: 8 },
//   { id: "3", name: "Đại học", count: 15 },
//   { id: "4", name: "Tự học", count: 6 },
// ];

// // Icon options with categories
// const iconOptions: IconOption[] = [
//   // Education
//   { value: "book", icon: Book, label: "Sách", category: "Giáo dục" },
//   { value: "book-open", icon: BookOpen, label: "Sách mở", category: "Giáo dục" },
//   { value: "graduation-cap", icon: GraduationCap, label: "Tốt nghiệp", category: "Giáo dục" },
//   { value: "brain", icon: Brain, label: "Não bộ", category: "Giáo dục" },
//   { value: "lightbulb", icon: Lightbulb, label: "Bóng đèn", category: "Giáo dục" },
//   { value: "book-marked", icon: BookMarked, label: "Sách đánh dấu", category: "Giáo dục" },
//   { value: "library", icon: Library, label: "Thư viện", category: "Giáo dục" },
  
//   // Achievements
//   { value: "trophy", icon: Trophy, label: "Cúp", category: "Thành tích" },
//   { value: "star", icon: Star, label: "Ngôi sao", category: "Thành tích" },
//   { value: "award", icon: Award, label: "Huy chương", category: "Thành tích" },
//   { value: "target", icon: Target, label: "Mục tiêu", category: "Thành tích" },
// ];

// // Gradient color options
// const gradientOptions = [
//   { value: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", label: "Tím xanh" },
//   { value: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)", label: "Hồng đỏ" },
//   { value: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)", label: "Xanh dương" },
//   { value: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)", label: "Xanh lá" },
//   { value: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)", label: "Hồng vàng" },
//   { value: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)", label: "Hồng pastel" },
//   { value: "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)", label: "Tím pastel" },
//   { value: "linear-gradient(135deg, #fad0c4 0%, #ffd1ff 100%)", label: "Cam hồng" },
//   { value: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)", label: "Cam nhạt" },
//   { value: "linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)", label: "Xanh lá tươi" },
//   { value: "linear-gradient(135deg, #30cfd0 0%, #330867 100%)", label: "Xanh đậm" },
//   { value: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)", label: "Vàng cam" },
// ];

// // Import Modal Component
// const ImportQuizletModal: React.FC<{
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
//   onImport: (flashcards: Omit<Flashcard, "id" | "position">[]) => void;
// }> = ({ open, onOpenChange, onImport }) => {
//   const [importUrl, setImportUrl] = useState("");
//   const [acceptTerms, setAcceptTerms] = useState(false);
//   const [isImporting, setIsImporting] = useState(false);

//   const validateQuizletUrl = useCallback((url: string) => {
//     return (
//       url.includes("quizlet.com") && (url.includes("/") || url.includes("?"))
//     );
//   }, []);

//   const handleImport = async () => {
//     if (!importUrl.trim()) {
//       toast.error("Vui lòng nhập đường link Quizlet");
//       return;
//     }

//     if (!validateQuizletUrl(importUrl)) {
//       toast.error("Link Quizlet không hợp lệ. Vui lòng kiểm tra lại.");
//       return;
//     }

//     if (!acceptTerms) {
//       toast.error("Vui lòng chấp nhận điều khoản sử dụng");
//       return;
//     }

//     setIsImporting(true);

//     try {
//       // Mock API call
//       await new Promise((resolve) => setTimeout(resolve, 1500));
      
//       // Mock data
//       const mockFlashcards = [
//         { term: "Hello", definition: "Xin chào" },
//         { term: "Goodbye", definition: "Tạm biệt" },
//         { term: "Thank you", definition: "Cảm ơn" },
//         { term: "Please", definition: "Làm ơn" },
//         { term: "Sorry", definition: "Xin lỗi" },
//       ];

//       const importedFlashcards = mockFlashcards.map((item, index) => ({
//         term: item.term || "",
//         definition: item.definition || "",
//         mediaId: null,
//         mediaPreview: null,
//       }));

//       onImport(importedFlashcards);
//       toast.success(`Đã import thành công ${importedFlashcards.length} thẻ`);
      
//       // Reset form
//       setImportUrl("");
//       setAcceptTerms(false);
//       onOpenChange(false);
//     } catch (error) {
//       console.error("Import error:", error);
//       toast.error("Import thất bại. Vui lòng thử lại.");
//     } finally {
//       setIsImporting(false);
//     }
//   };

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="sm:max-w-md">
//         <DialogHeader>
//           <div className="flex items-center gap-3 mb-2">
//             <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
//               <Import className="w-5 h-5 text-white" />
//             </div>
//             <div>
//               <DialogTitle className="text-xl">Import từ Quizlet</DialogTitle>
//               <DialogDescription>
//                 Import bộ flashcard từ Quizlet bằng đường link
//               </DialogDescription>
//             </div>
//           </div>
//         </DialogHeader>

//         <div className="space-y-6 py-4">
//           {/* URL Input */}
//           <div className="space-y-3">
//             <Label htmlFor="quizlet-url" className="text-sm font-medium">
//               Đường link Quizlet
//               <span className="text-red-500 ml-1">*</span>
//             </Label>
//             <div className="relative">
//               <ExternalLink className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
//               <Input
//                 id="quizlet-url"
//                 placeholder="https://quizlet.com/..."
//                 value={importUrl}
//                 onChange={(e) => setImportUrl(e.target.value)}
//                 className="pl-10 h-12"
//               />
//             </div>
//             {importUrl && !validateQuizletUrl(importUrl) && (
//               <p className="text-xs text-amber-600 flex items-center gap-1">
//                 <AlertTriangle className="w-3 h-3" />
//                 Link Quizlet không hợp lệ. Vui lòng kiểm tra lại.
//               </p>
//             )}
//             <p className="text-xs text-gray-500">
//               Ví dụ: https://quizlet.com/12345678/title
//             </p>
//           </div>

//           {/* Terms and Conditions */}
//           <div className="space-y-3 border border-gray-200 rounded-lg p-4 bg-gray-50">
//             <div className="flex items-start gap-3">
//               <Checkbox
//                 id="terms"
//                 checked={acceptTerms}
//                 onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
//                 className="mt-0.5"
//               />
//               <div className="space-y-2">
//                 <Label
//                   htmlFor="terms"
//                   className="text-sm font-medium cursor-pointer"
//                 >
//                   Tôi đồng ý với các điều khoản sau:
//                 </Label>
//                 <ul className="space-y-2 text-xs text-gray-600">
//                   <li className="flex items-start gap-2">
//                     <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-1" />
//                     <span>
//                       Việc import chỉ phục vụ mục đích học tập cá nhân
//                     </span>
//                   </li>
//                   <li className="flex items-start gap-2">
//                     <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-1" />
//                     <span>
//                       Không sử dụng cho mục đích thương mại hoặc phân phối lại
//                     </span>
//                   </li>
//                   <li className="flex items-start gap-2">
//                     <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-1" />
//                     <span>
//                       Người dùng tự chịu trách nhiệm về bản quyền và tuân thủ
//                       các quy định của Quizlet
//                     </span>
//                   </li>
//                   <li className="flex items-start gap-2">
//                     <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-1" />
//                     <span>
//                       Chúng tôi không chịu trách nhiệm pháp lí về nội dung
//                       được import
//                     </span>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           </div>

//           {/* Preview (optional) */}
//           {validateQuizletUrl(importUrl) && acceptTerms && (
//             <div className="border border-green-200 rounded-lg p-4 bg-green-50">
//               <div className="flex items-center gap-2 mb-2">
//                 <CheckCircle className="w-4 h-4 text-green-600" />
//                 <span className="text-sm font-medium text-green-800">
//                   Đã sẵn sàng import
//                 </span>
//               </div>
//               <p className="text-xs text-green-700">
//                 Link hợp lệ. Bấm Import để thêm flashcard vào bộ học của bạn.
//               </p>
//             </div>
//           )}
//         </div>

//         <DialogFooter className="flex-col sm:flex-row gap-2">
//           <Button
//             variant="outline"
//             onClick={() => {
//               onOpenChange(false);
//               setImportUrl("");
//               setAcceptTerms(false);
//             }}
//             className="w-full sm:w-auto"
//           >
//             Hủy
//           </Button>
//           <Button
//             onClick={handleImport}
//             disabled={
//               !validateQuizletUrl(importUrl) || !acceptTerms || isImporting
//             }
//             className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
//           >
//             {isImporting ? (
//               <>
//                 <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//                 Đang import...
//               </>
//             ) : (
//               <>
//                 <Import className="w-4 h-4 mr-2" />
//                 Import
//               </>
//             )}
//           </Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default function CreateFlashcardPage() {
//   const [formData, setFormData] = useState<FormData>({
//     title: "",
//     description: "",
//     icon: "book",
//     iconColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//     topicId: "",
//     folderSetId: "",
//     isPublic: false,
//     flashcards: [
//       {
//         id: "1",
//         term: "",
//         definition: "",
//         mediaId: null,
//         mediaPreview: null,
//         position: 0,
//       },
//       {
//         id: "2",
//         term: "",
//         definition: "",
//         mediaId: null,
//         mediaPreview: null,
//         position: 1,
//       },
//     ],
//   });

//   const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
//   const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
//   const [showSuccess, setShowSuccess] = useState(false);
//   const [expandedCards, setExpandedCards] = useState<Set<string>>(
//     new Set(["1", "2"])
//   );
//   const [showImportModal, setShowImportModal] = useState(false);
//   const [selectedIconCategory, setSelectedIconCategory] = useState<string>("Giáo dục");
//   const [showIconPicker, setShowIconPicker] = useState(false);
//   const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

//   const handleInputChange = (field: keyof FormData, value: any) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleFlashcardChange = (
//     index: number,
//     field: keyof Flashcard,
//     value: any
//   ) => {
//     const updatedCards = [...formData.flashcards];
//     updatedCards[index] = { ...updatedCards[index], [field]: value };
//     setFormData((prev) => ({ ...prev, flashcards: updatedCards }));
//   };

//   const handleImageUpload = (index: number, file: File) => {
//     if (!file.type.startsWith("image/")) {
//       toast.error("Vui lòng chọn file hình ảnh");
//       return;
//     }

//     if (file.size > 5 * 1024 * 1024) {
//       toast.error("File không được vượt quá 5MB");
//       return;
//     }

//     const reader = new FileReader();
//     reader.onloadend = () => {
//       handleFlashcardChange(index, "mediaId", file);
//       handleFlashcardChange(index, "mediaPreview", reader.result as string);
//       toast.success("Đã tải ảnh lên thành công");
//     };
//     reader.readAsDataURL(file);
//   };

//   const addFlashcard = () => {
//     const newId = Date.now().toString();
//     const newCard: Flashcard = {
//       id: newId,
//       term: "",
//       definition: "",
//       mediaId: null,
//       mediaPreview: null,
//       position: formData.flashcards.length,
//     };
//     setFormData((prev) => ({
//       ...prev,
//       flashcards: [...prev.flashcards, newCard],
//     }));
//     setExpandedCards((prev) => new Set([...prev, newId]));
//     toast.success("Đã thêm thẻ mới");
//   };

//   const handleImportFromQuizlet = (importedFlashcards: Omit<Flashcard, "id" | "position">[]) => {
//     const newFlashcards = importedFlashcards.map((item, index) => ({
//       id: Date.now().toString() + index,
//       ...item,
//       position: formData.flashcards.length + index,
//     }));

//     setFormData((prev) => ({
//       ...prev,
//       flashcards: [...prev.flashcards, ...newFlashcards],
//     }));

//     // Expand all imported cards
//     const newCardIds = newFlashcards.map(card => card.id);
//     setExpandedCards((prev) => new Set([...prev, ...newCardIds]));
//   };

//   const removeFlashcard = (index: number) => {
//     if (formData.flashcards.length <= 2) {
//       toast.error("Bộ flashcard cần ít nhất 2 thẻ");
//       return;
//     }
//     const cardId = formData.flashcards[index].id;
//     const updatedCards = formData.flashcards.filter((_, i) => i !== index);
//     updatedCards.forEach((card, i) => (card.position = i));
//     setFormData((prev) => ({ ...prev, flashcards: updatedCards }));
//     setExpandedCards((prev) => {
//       const newSet = new Set(prev);
//       newSet.delete(cardId);
//       return newSet;
//     });
//     toast.success("Đã xóa thẻ");
//   };

//   const toggleCardExpand = (cardId: string) => {
//     setExpandedCards((prev) => {
//       const newSet = new Set(prev);
//       if (newSet.has(cardId)) {
//         newSet.delete(cardId);
//       } else {
//         newSet.add(cardId);
//       }
//       return newSet;
//     });
//   };

//   const handleDragStart = (index: number) => {
//     setDraggedIndex(index);
//   };

//   const handleDragOver = (e: React.DragEvent, index: number) => {
//     e.preventDefault();
//     setDragOverIndex(index);
//   };

//   const handleDrop = (e: React.DragEvent, dropIndex: number) => {
//     e.preventDefault();
//     if (draggedIndex === null) return;

//     const updatedCards = [...formData.flashcards];
//     const draggedCard = updatedCards[draggedIndex];
//     updatedCards.splice(draggedIndex, 1);
//     updatedCards.splice(dropIndex, 0, draggedCard);
//     updatedCards.forEach((card, i) => (card.position = i));

//     setFormData((prev) => ({ ...prev, flashcards: updatedCards }));
//     setDraggedIndex(null);
//     setDragOverIndex(null);
//     toast.success("Đã sắp xếp lại thứ tự thẻ");
//   };

//   const handleDragEnd = () => {
//     setDraggedIndex(null);
//     setDragOverIndex(null);
//   };

//   const handleSubmit = () => {
//     const emptyCards = formData.flashcards.filter(
//       (card) => !card.term.trim() || !card.definition.trim()
//     );
//     if (!formData.title.trim()) {
//       toast.error("Vui lòng nhập tiêu đề cho bộ flashcard");
//       return;
//     }

//     if (emptyCards.length > 0) {
//       toast.error(
//         `Còn ${emptyCards.length} thẻ chưa hoàn thành. Vui lòng kiểm tra lại.`
//       );
//       return;
//     }

//     const submitData = {
//       title: formData.title.trim(),
//       description: formData.description.trim(),
//       icon: formData.icon,
//       iconColor: formData.iconColor,
//       topicId: formData.topicId,
//       folderSetId: formData.folderSetId,
//       isPublic: formData.isPublic,
//       flashcards: formData.flashcards.map((card) => ({
//         mediaId: card.mediaId,
//         position: card.position,
//         term: card.term.trim(),
//         definition: card.definition.trim(),
//       })),
//     };

//     console.log("Submit Data:", submitData);
//     setShowSuccess(true);
//     setTimeout(() => setShowSuccess(false), 3000);
//   };

//   const completedCards = formData.flashcards.filter(
//     (c) => c.term.trim() && c.definition.trim()
//   ).length;
//   const totalCards = formData.flashcards.length;
//   const incompleteCards = totalCards - completedCards;
//   const progress = totalCards > 0 ? (completedCards / totalCards) * 100 : 0;

//   const selectedTopic = topics.find((t) => t.id === formData.topicId);
//   const selectedFolder = folders.find((f) => f.id === formData.folderSetId);
  
//   const SelectedIcon = iconOptions.find(opt => opt.value === formData.icon)?.icon || Book;
  
//   // Get unique categories from icon options
//   const iconCategories = Array.from(new Set(iconOptions.map(icon => icon.category)));
  
//   // Filter icons by selected category
//   const filteredIcons = iconOptions.filter(icon => icon.category === selectedIconCategory);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
//       {/* Header Section */}
//       <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-lg">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-4">
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 className="hover:bg-gray-100 text-gray-600 hover:text-gray-900"
//               >
//                 <ArrowLeft className="w-4 h-4 mr-2" />
//                 Quay lại
//               </Button>
//               <div className="hidden sm:flex items-center gap-3">
//                 <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md" style={{ background: formData.iconColor }}>
//                   <SelectedIcon className="w-5 h-5 text-white" />
//                 </div>
//                 <div>
//                   <div className="flex items-center gap-1 text-sm text-gray-600">
//                     <Home className="w-4 h-4" />
//                     <ChevronRight className="w-3 h-3" />
//                     <span>Flashcards</span>
//                     <ChevronRight className="w-3 h-3" />
//                     <span className="font-medium text-gray-900">Tạo mới</span>
//                   </div>
//                   <p className="text-lg font-semibold text-gray-900 mt-0.5">
//                     Tạo bộ flashcard mới
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div className="flex items-center gap-4">
//               <div className="hidden sm:block">
//                 <div className="flex items-center gap-3">
//                   <div className="text-right">
//                     <p className="text-sm font-medium text-gray-900">
//                       {completedCards}/{totalCards} thẻ hoàn thành
//                     </p>
//                     <div className="w-40 h-1.5 bg-gray-200 rounded-full overflow-hidden mt-1">
//                       <div
//                         className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500 rounded-full"
//                         style={{ width: `${progress}%` }}
//                       />
//                     </div>
//                   </div>
//                   <Badge
//                     variant="secondary"
//                     className="font-semibold bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border border-blue-200"
//                   >
//                     <BookOpen className="w-3 h-3 mr-1" />
//                     Bản nháp
//                   </Badge>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Success Message */}
//         {showSuccess && (
//           <div className="mb-6 animate-in fade-in slide-in-from-top-2 duration-300">
//             <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 shadow-lg">
//               <div className="flex items-center gap-4">
//                 <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-md">
//                   <Check className="w-5 h-5 text-white" />
//                 </div>
//                 <div className="flex-1">
//                   <h3 className="font-semibold text-green-900">
//                     Tạo thành công!
//                   </h3>
//                   <p className="text-sm text-green-700 mt-1">
//                     Bộ flashcard "
//                     <span className="font-medium">{formData.title}</span>" đã
//                     được tạo và sẵn sàng để sử dụng.
//                   </p>
//                 </div>
//                 <Button
//                   size="sm"
//                   variant="outline"
//                   className="border-green-300 text-green-700 hover:bg-green-50"
//                   onClick={() => setShowSuccess(false)}
//                 >
//                   Đóng
//                 </Button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Import Modal */}
//         <ImportQuizletModal
//           open={showImportModal}
//           onOpenChange={setShowImportModal}
//           onImport={handleImportFromQuizlet}
//         />

//         <div className="grid lg:grid-cols-3 gap-6">
//           {/* Main Content */}
//           <div className="lg:col-span-2 space-y-6">
//             {/* Basic Info Card with Icon Picker */}
//             <Card className="border-0 shadow-xl bg-white rounded-2xl overflow-hidden">
//               <CardHeader className="pb-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-3">
//                     <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
//                       <Sparkles className="w-5 h-5 text-white" />
//                     </div>
//                     <div>
//                       <CardTitle className="text-xl font-bold text-gray-900">
//                         Thông tin cơ bản
//                       </CardTitle>
//                       <CardDescription className="text-gray-600">
//                         Thiết lập thông tin và giao diện cho bộ flashcard
//                       </CardDescription>
//                     </div>
//                   </div>
//                   <Badge className="bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 border border-blue-200 shadow-sm">
//                     <Check className="w-3 h-3 mr-1" />
//                     Bắt buộc
//                   </Badge>
//                 </div>
//               </CardHeader>
//               <CardContent className="pt-6 space-y-8">
//                 {/* Icon and Color Selection Section */}
//                 <div className="space-y-4">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <Label className="text-base font-semibold text-gray-900 flex items-center gap-2">
//                         <Palette className="w-5 h-5 text-blue-600" />
//                         Biểu tượng và màu sắc
//                       </Label>
//                       <p className="text-sm text-gray-600 mt-1">
//                         Tùy chỉnh icon và màu sắc cho bộ flashcard của bạn
//                       </p>
//                     </div>
//                     <Button
//                       variant="ghost"
//                       size="sm"
//                       onClick={() => setShowIconPicker(!showIconPicker)}
//                       className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
//                     >
//                       {showIconPicker ? (
//                         <>
//                           <ChevronDown className="w-4 h-4 mr-2 rotate-180" />
//                           Thu gọn
//                         </>
//                       ) : (
//                         <>
//                           <LayoutGrid className="w-4 h-4 mr-2" />
//                           Chọn biểu tượng
//                         </>
//                       )}
//                     </Button>
//                   </div>

//                   {/* Current Selection Preview */}
//                   <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 rounded-xl border border-blue-100">
//                     <div className="flex items-center gap-4">
//                       <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg" style={{ background: formData.iconColor }}>
//                         <SelectedIcon className="w-8 h-8 text-white" />
//                       </div>
//                       <div>
//                         <p className="font-semibold text-gray-900">Biểu tượng đã chọn</p>
//                         <p className="text-sm text-gray-600">
//                           Icon sẽ xuất hiện trên thẻ và trong thư viện
//                         </p>
//                       </div>
//                     </div>
//                     <Badge className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-3 py-1">
//                       {iconOptions.find(opt => opt.value === formData.icon)?.label}
//                     </Badge>
//                   </div>

//                   {/* Icon Picker */}
//                   {showIconPicker && (
//                     <div className="space-y-4 animate-in fade-in duration-300">
//                       {/* Icon Categories */}
//                       <div className="space-y-3">
//                         <Label className="text-sm font-medium text-gray-700">
//                           Danh mục biểu tượng
//                         </Label>
//                         <div className="flex flex-wrap gap-2">
//                           {iconCategories.map(category => (
//                             <button
//                               key={category}
//                               type="button"
//                               onClick={() => setSelectedIconCategory(category)}
//                               className={`px-4 py-2 rounded-lg transition-all duration-200 ${
//                                 selectedIconCategory === category
//                                   ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md'
//                                   : 'bg-gray-100 text-gray-700 hover:bg-gray-200 shadow-sm'
//                               }`}
//                             >
//                               <span className="text-sm font-medium">{category}</span>
//                             </button>
//                           ))}
//                         </div>
//                       </div>

//                       {/* Icon Grid */}
//                       <div className="space-y-3">
//                         <Label className="text-sm font-medium text-gray-700">
//                           Chọn biểu tượng
//                         </Label>
//                         <div className="grid grid-cols-5 sm:grid-cols-6 gap-3 p-3 bg-gray-50 rounded-xl">
//                           {filteredIcons.map((option) => {
//                             const Icon = option.icon;
//                             const isSelected = formData.icon === option.value;
//                             return (
//                               <button
//                                 key={option.value}
//                                 type="button"
//                                 onClick={() => handleInputChange("icon", option.value)}
//                                 className={`relative p-3 rounded-xl border transition-all duration-200 group ${
//                                   isSelected
//                                     ? "border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100 shadow-md scale-105"
//                                     : "border-gray-200 bg-white hover:border-blue-300 hover:shadow-sm"
//                                 }`}
//                                 title={option.label}
//                               >
//                                 <div 
//                                   className="w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-2 transition-all group-hover:scale-110" 
//                                   style={{ background: formData.iconColor }}
//                                 >
//                                   <Icon className="w-5 h-5 text-white" />
//                                 </div>
//                                 <span className="text-xs text-gray-600 truncate block text-center">
//                                   {option.label}
//                                 </span>
//                                 {isSelected && (
//                                   <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
//                                     <Check className="w-3 h-3 text-white" />
//                                   </div>
//                                 )}
//                               </button>
//                             );
//                           })}
//                         </div>
//                       </div>

//                       {/* Gradient Color Selection */}
//                       <div className="space-y-3">
//                         <Label className="text-sm font-medium text-gray-700">
//                           Màu gradient cho icon
//                         </Label>
//                         <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
//                           {gradientOptions.map((gradient) => {
//                             const isSelected = formData.iconColor === gradient.value;
//                             return (
//                               <button
//                                 key={gradient.value}
//                                 type="button"
//                                 onClick={() => handleInputChange("iconColor", gradient.value)}
//                                 className={`relative aspect-square rounded-xl border-2 transition-all duration-200 hover:scale-105 group ${
//                                   isSelected
//                                     ? "border-gray-900 shadow-xl scale-105"
//                                     : "border-white hover:border-gray-300 shadow-sm hover:shadow-md"
//                                 }`}
//                                 style={{ background: gradient.value }}
//                                 title={gradient.label}
//                               >
//                                 {isSelected && (
//                                   <div className="absolute inset-0 bg-black/10 rounded-xl" />
//                                 )}
//                                 {isSelected && (
//                                   <Check className="absolute inset-0 m-auto w-5 h-5 text-white drop-shadow-lg" />
//                                 )}
//                                 <div className={`absolute bottom-0 left-0 right-0 text-[10px] py-1 px-1 rounded-b-xl truncate transition-all ${
//                                   isSelected 
//                                     ? 'bg-black/80 text-white' 
//                                     : 'bg-white/90 backdrop-blur-sm text-gray-800 opacity-0 group-hover:opacity-100'
//                                 }`}>
//                                   {gradient.label}
//                                 </div>
//                               </button>
//                             );
//                           })}
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 {/* Title and Description */}
//                 <div className="space-y-6">
//                   {/* Title */}
//                   <div className="space-y-3">
//                     <div className="flex items-center justify-between">
//                       <Label className="text-sm font-semibold text-gray-900 flex items-center gap-2">
//                         <FileText className="w-4 h-4 text-blue-600" />
//                         Tiêu đề bộ flashcard
//                         <span className="text-red-500">*</span>
//                       </Label>
//                       <span
//                         className={`text-xs px-2 py-1 rounded-full ${
//                           formData.title.length > 90
//                             ? "bg-amber-100 text-amber-800"
//                             : "bg-gray-100 text-gray-600"
//                         }`}
//                       >
//                         {formData.title.length}/100
//                       </span>
//                     </div>
//                     <Input
//                       placeholder="Ví dụ: Từ vựng TOEIC cơ bản, Hóa học lớp 12, ..."
//                       value={formData.title}
//                       onChange={(e) =>
//                         handleInputChange("title", e.target.value)
//                       }
//                       maxLength={100}
//                       className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 text-lg placeholder:text-gray-400"
//                     />
//                     {formData.title.length > 90 && (
//                       <p className="text-xs text-amber-600 flex items-center gap-1 animate-pulse">
//                         <AlertCircle className="w-3 h-3" />
//                         Tiêu đề sắp đạt giới hạn
//                       </p>
//                     )}
//                   </div>

//                   {/* Description */}
//                   <div className="space-y-3">
//                     <Label className="text-sm font-semibold text-gray-900 flex items-center gap-2">
//                       <FileText className="w-4 h-4 text-blue-600" />
//                       Mô tả (Tùy chọn)
//                     </Label>
//                     <Textarea
//                       placeholder="Mô tả nội dung, mục tiêu học tập hoặc lưu ý đặc biệt về bộ flashcard này..."
//                       value={formData.description}
//                       onChange={(e) =>
//                         handleInputChange("description", e.target.value)
//                       }
//                       className="min-h-[120px] resize-none border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 placeholder:text-gray-400"
//                     />
//                     <p className="text-xs text-gray-500">
//                       Mô tả chi tiết giúp người học hiểu rõ hơn về nội dung bộ flashcard
//                     </p>
//                   </div>
//                 </div>

//                 {/* Topic and Folder Selection */}
//                 <div className="grid md:grid-cols-2 gap-6">
//                   <div className="space-y-3">
//                     <Label className="text-sm font-semibold text-gray-900 flex items-center gap-2">
//                       <Tag className="w-4 h-4 text-blue-600" />
//                       Chủ đề
//                     </Label>
//                     <div className="relative">
//                       <select
//                         value={formData.topicId}
//                         onChange={(e) =>
//                           handleInputChange("topicId", e.target.value)
//                         }
//                         className="w-full h-12 px-4 pr-10 border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 appearance-none bg-white text-gray-900 hover:border-gray-400 transition-colors"
//                       >
//                         <option value="">Chọn chủ đề phù hợp</option>
//                         {topics.map((topic) => (
//                           <option key={topic.id} value={topic.id}>
//                             {topic.name}
//                           </option>
//                         ))}
//                       </select>
//                       <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
//                     </div>
//                     {selectedTopic && (
//                       <div className="flex items-center gap-2 mt-2 p-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
//                         <div
//                           className="w-4 h-4 rounded-full shadow-sm"
//                           style={{ backgroundColor: selectedTopic.color }}
//                         />
//                         <span className="text-sm font-medium text-gray-900">
//                           {selectedTopic.name}
//                         </span>
//                       </div>
//                     )}
//                   </div>

//                   <div className="space-y-3">
//                     <Label className="text-sm font-semibold text-gray-900 flex items-center gap-2">
//                       <FolderOpen className="w-4 h-4 text-blue-600" />
//                       Thư mục
//                     </Label>
//                     <div className="relative">
//                       <select
//                         value={formData.folderSetId}
//                         onChange={(e) =>
//                           handleInputChange("folderSetId", e.target.value)
//                         }
//                         className="w-full h-12 px-4 pr-10 border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 appearance-none bg-white text-gray-900 hover:border-gray-400 transition-colors"
//                       >
//                         <option value="">Chọn thư mục lưu trữ</option>
//                         {folders.map((folder) => (
//                           <option key={folder.id} value={folder.id}>
//                             {folder.name} ({folder.count} sets)
//                           </option>
//                         ))}
//                       </select>
//                       <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
//                     </div>
//                     {selectedFolder && (
//                       <div className="flex items-center gap-2 mt-2 p-2 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200">
//                         <FolderOpen className="w-4 h-4 text-gray-600" />
//                         <span className="text-sm font-medium text-gray-900">
//                           {selectedFolder.name}
//                         </span>
//                         <Badge variant="outline" className="ml-auto">
//                           {selectedFolder.count} sets
//                         </Badge>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* Privacy Settings */}
//                 <div className="pt-6 border-t border-gray-100">
//                   <div className="flex items-center justify-between p-5 bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-xl border border-gray-200">
//                     <div className="space-y-2">
//                       <div className="flex items-center gap-3">
//                         <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center">
//                           {formData.isPublic ? (
//                             <Globe className="w-5 h-5 text-blue-600" />
//                           ) : (
//                             <Lock className="w-5 h-5 text-gray-600" />
//                           )}
//                         </div>
//                         <div>
//                           <Label className="text-base font-semibold text-gray-900">
//                             Quyền riêng tư
//                           </Label>
//                           <div className="flex items-center gap-2 mt-1">
//                             {formData.isPublic ? (
//                               <Badge className="bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 border border-blue-200">
//                                 <Globe className="w-3 h-3 mr-1" />
//                                 Công khai
//                               </Badge>
//                             ) : (
//                               <Badge className="bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 border border-gray-300">
//                                 <Lock className="w-3 h-3 mr-1" />
//                                 Riêng tư
//                               </Badge>
//                             )}
//                             <span className="text-xs text-gray-500">
//                               {formData.isPublic
//                                 ? "Ai cũng có thể xem và học"
//                                 : "Chỉ bạn mới có thể xem"}
//                             </span>
//                           </div>
//                         </div>
//                       </div>
//                       <p className="text-sm text-gray-600 max-w-lg">
//                         {formData.isPublic
//                           ? "Mọi người có thể tìm thấy, xem và học bộ flashcard này. Các hình ảnh trong bộ cũng được chia sẻ công khai và có thể được người khác sử dụng. Bạn có thể kiếm được điểm kinh nghiệm khi chia sẻ kiến thức!"
//                           : "Chỉ bạn mới có thể xem và học bộ flashcard này. Hoàn toàn riêng tư và an toàn."}
//                       </p>
//                     </div>
//                     <Switch
//                       checked={formData.isPublic}
//                       onCheckedChange={(checked) =>
//                         handleInputChange("isPublic", checked)
//                       }
//                       className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-600 data-[state=checked]:to-blue-700 h-6 w-12"
//                     />
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Flashcards Section */}
//             <div className="space-y-6">
//               {/* Section Header */}
//               <div className="flex items-center justify-between">
//                 <div>
//                   <h2 className="text-2xl font-bold text-gray-900">
//                     Danh sách flashcard
//                   </h2>
//                   <p className="text-gray-600 mt-1">
//                     Thêm và chỉnh sửa các thẻ học tập. Kéo thả để sắp xếp thứ tự.
//                   </p>
//                 </div>

//                 <div className="flex flex-col sm:flex-row gap-3">
//                   <Button
//                     onClick={() => setShowImportModal(true)}
//                     variant="outline"
//                     size="lg"
//                     className="border-purple-300 hover:border-purple-400 hover:bg-purple-50 text-purple-700 shadow-sm"
//                   >
//                     <Import className="w-5 h-5 mr-2" />
//                     Import Quizlet
//                   </Button>
//                   <Button
//                     onClick={addFlashcard}
//                     size="lg"
//                     className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg"
//                   >
//                     <Plus className="w-5 h-5 mr-2" />
//                     Thêm thẻ mới
//                   </Button>
//                 </div>
//               </div>

//               {/* Progress Indicator */}
//               <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
//                 <div className="flex items-center justify-between mb-4">
//                   <div className="flex items-center gap-3">
//                     <div className="w-10 h-10 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl flex items-center justify-center">
//                       <Zap className="w-5 h-5 text-blue-600" />
//                     </div>
//                     <div>
//                       <h3 className="font-semibold text-gray-900">Tiến độ hoàn thành</h3>
//                       <p className="text-sm text-gray-600">Theo dõi quá trình tạo flashcard</p>
//                     </div>
//                   </div>
//                   <div className="text-right">
//                     <span className="text-2xl font-bold text-blue-600">
//                       {completedCards}/{totalCards}
//                     </span>
//                     <p className="text-xs text-gray-500 mt-1">thẻ hoàn thành</p>
//                   </div>
//                 </div>
//                 <div className="space-y-2">
//                   <div className="flex justify-between text-sm text-gray-600">
//                     <span>Tiến độ</span>
//                     <span className="font-semibold">{Math.round(progress)}%</span>
//                   </div>
//                   <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
//                     <div
//                       className="h-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 transition-all duration-700 rounded-full"
//                       style={{ width: `${progress}%` }}
//                     />
//                   </div>
//                   {incompleteCards > 0 && (
//                     <div className="flex items-center gap-2 mt-3 p-3 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-200">
//                       <AlertCircle className="w-4 h-4 text-amber-600" />
//                       <p className="text-sm text-amber-800">
//                         <span className="font-semibold">{incompleteCards} thẻ</span> chưa hoàn thành. 
//                         Vui lòng điền đầy đủ thông tin trước khi lưu.
//                       </p>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Flashcards List */}
//               <div className="space-y-4">
//                 {formData.flashcards.map((card, index) => (
//                   <div
//                     key={card.id}
//                     draggable
//                     onDragStart={() => handleDragStart(index)}
//                     onDragOver={(e) => handleDragOver(e, index)}
//                     onDrop={(e) => handleDrop(e, index)}
//                     onDragEnd={handleDragEnd}
//                     className={`relative transition-all duration-300 ${
//                       draggedIndex === index ? "opacity-40 scale-[0.98] blur-sm" : ""
//                     } ${dragOverIndex === index ? "scale-[1.02] ring-2 ring-blue-500 ring-offset-2" : ""}`}
//                   >
//                     <Card
//                       className={`border-2 overflow-hidden cursor-move hover:shadow-xl transition-all duration-300 ${
//                         dragOverIndex === index
//                           ? "border-blue-500 shadow-2xl"
//                           : card.term && card.definition
//                           ? "border-green-200 shadow-lg"
//                           : "border-gray-200 hover:border-gray-300 shadow-md"
//                       }`}
//                     >
//                       {/* Card Header */}
//                       <div
//                         className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200 cursor-pointer hover:from-gray-100 hover:to-gray-200 transition-all"
//                         onClick={() => toggleCardExpand(card.id)}
//                       >
//                         <div className="flex items-center justify-between">
//                           <div className="flex items-center gap-3">
//                             <GripVertical className="w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors cursor-move" />
//                             <Badge
//                               variant="outline"
//                               className={`font-semibold text-sm px-3 py-1.5 ${
//                                 card.term && card.definition
//                                   ? "border-green-300 bg-gradient-to-r from-green-50 to-emerald-50 text-green-700"
//                                   : "border-gray-300 bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700"
//                               }`}
//                             >
//                               <div className="w-2 h-2 rounded-full bg-current mr-2 opacity-60" />
//                               Thẻ #{index + 1}
//                             </Badge>
//                             {card.term && (
//                               <span className="text-sm font-medium text-gray-900 truncate max-w-xs">
//                                 {card.term}
//                               </span>
//                             )}
//                           </div>
//                           <div className="flex items-center gap-3">
//                             {card.mediaPreview && (
//                               <Badge className="bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 border border-blue-200 text-xs">
//                                 <ImageIcon className="w-3 h-3 mr-1" />
//                                 Có ảnh
//                               </Badge>
//                             )}
//                             {card.term && card.definition && (
//                               <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1 text-xs shadow-sm">
//                                 <Check className="w-3 h-3 mr-1" />
//                                 Hoàn thành
//                               </Badge>
//                             )}
//                             <ChevronDown
//                               className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
//                                 expandedCards.has(card.id) ? "rotate-180" : ""
//                               }`}
//                             />
//                           </div>
//                         </div>
//                       </div>

//                       {/* Expandable Content */}
//                       {expandedCards.has(card.id) && (
//                         <CardContent className="p-6 space-y-6 animate-in fade-in duration-300">
//                           {/* Term and Definition */}
//                           <div className="grid md:grid-cols-2 gap-6">
//                             <div className="space-y-3">
//                               <Label className="text-sm font-semibold text-gray-900 flex items-center gap-2">
//                                 <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
//                                 Thuật ngữ (Term)
//                                 <span className="text-red-500">*</span>
//                               </Label>
//                               <Textarea
//                                 placeholder="Nhập thuật ngữ, từ khóa hoặc câu hỏi..."
//                                 value={card.term}
//                                 onChange={(e) =>
//                                   handleFlashcardChange(
//                                     index,
//                                     "term",
//                                     e.target.value
//                                   )
//                                 }
//                                 className="min-h-[140px] resize-none border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 text-lg placeholder:text-gray-400"
//                                 rows={3}
//                               />
//                               {!card.term.trim() && (
//                                 <div className="flex items-center gap-2 p-3 bg-gradient-to-r from-red-50 to-red-100 rounded-lg border border-red-200">
//                                   <AlertCircle className="w-4 h-4 text-red-600" />
//                                   <p className="text-sm text-red-700">
//                                     Vui lòng nhập thuật ngữ cho thẻ này
//                                   </p>
//                                 </div>
//                               )}
//                             </div>

//                             <div className="space-y-3">
//                               <Label className="text-sm font-semibold text-gray-900 flex items-center gap-2">
//                                 <span className="w-2 h-2 bg-green-500 rounded-full"></span>
//                                 Định nghĩa (Definition)
//                                 <span className="text-red-500">*</span>
//                               </Label>
//                               <Textarea
//                                 placeholder="Nhập định nghĩa, giải thích hoặc câu trả lời..."
//                                 value={card.definition}
//                                 onChange={(e) =>
//                                   handleFlashcardChange(
//                                     index,
//                                     "definition",
//                                     e.target.value
//                                   )
//                                 }
//                                 className="min-h-[140px] resize-none border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 text-lg placeholder:text-gray-400"
//                                 rows={3}
//                               />
//                               {!card.definition.trim() && (
//                                 <div className="flex items-center gap-2 p-3 bg-gradient-to-r from-red-50 to-red-100 rounded-lg border border-red-200">
//                                   <AlertCircle className="w-4 h-4 text-red-600" />
//                                   <p className="text-sm text-red-700">
//                                     Vui lòng nhập định nghĩa cho thẻ này
//                                   </p>
//                                 </div>
//                               )}
//                             </div>
//                           </div>

//                           {/* Media Upload */}
//                           <div className="space-y-3">
//                             <Label className="text-sm font-semibold text-gray-900 flex items-center gap-2">
//                               <ImageIcon className="w-4 h-4 text-purple-600" />
//                               Hình ảnh minh họa
//                               <Badge variant="outline" className="text-xs text-gray-500 font-normal ml-2">
//                                 Tùy chọn
//                               </Badge>
//                             </Label>
//                             {card.mediaPreview ? (
//                               <div className="relative group">
//                                 <div className="border-2 border-gray-200 rounded-xl overflow-hidden shadow-lg transition-all duration-300 group-hover:shadow-2xl">
//                                   <img
//                                     src={card.mediaPreview}
//                                     alt="Preview"
//                                     className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
//                                   />
//                                 </div>
//                                 <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                                   <Button
//                                     variant="outline"
//                                     size="sm"
//                                     className="bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg"
//                                     onClick={() =>
//                                       fileInputRefs.current[card.id]?.click()
//                                     }
//                                   >
//                                     <ImageIcon className="w-4 h-4 mr-2" />
//                                     Thay ảnh
//                                   </Button>
//                                   <Button
//                                     variant="outline"
//                                     size="sm"
//                                     className="bg-white/90 backdrop-blur-sm hover:bg-red-50 hover:text-red-600 shadow-lg"
//                                     onClick={() => {
//                                       handleFlashcardChange(
//                                         index,
//                                         "mediaId",
//                                         null
//                                       );
//                                       handleFlashcardChange(
//                                         index,
//                                         "mediaPreview",
//                                         null
//                                       );
//                                     }}
//                                   >
//                                     <Trash2 className="w-4 h-4 mr-2" />
//                                     Xóa
//                                   </Button>
//                                 </div>
//                               </div>
//                             ) : (
//                               <div
//                                 className="border-3 border-dashed border-gray-300 rounded-2xl p-8 hover:border-blue-400 hover:bg-blue-50/50 transition-all duration-300 cursor-pointer group"
//                                 onClick={() =>
//                                   fileInputRefs.current[card.id]?.click()
//                                 }
//                               >
//                                 <div className="flex flex-col items-center justify-center gap-4">
//                                   <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
//                                     <Upload className="w-8 h-8 text-blue-600" />
//                                   </div>
//                                   <div className="text-center">
//                                     <p className="text-lg font-semibold text-gray-900 mb-1">
//                                       Tải ảnh lên
//                                     </p>
//                                     <p className="text-sm text-gray-600">
//                                       Kéo thả hoặc click để chọn file ảnh
//                                     </p>
//                                     <p className="text-xs text-gray-400 mt-2">
//                                       Hỗ trợ: PNG, JPG, GIF • Tối đa 5MB
//                                     </p>
//                                   </div>
//                                   <Button
//                                     variant="outline"
//                                     size="sm"
//                                     className="mt-2 border-blue-300 text-blue-600 hover:bg-blue-50"
//                                   >
//                                     <ImageIcon className="w-4 h-4 mr-2" />
//                                     Chọn từ thư viện
//                                   </Button>
//                                 </div>
//                               </div>
//                             )}
//                             <input
//                               ref={(el: HTMLInputElement | null) => {
//                                 fileInputRefs.current[card.id] = el;
//                               }}
//                               type="file"
//                               accept="image/*"
//                               className="hidden"
//                               onChange={(e) => {
//                                 const file = e.target.files?.[0];
//                                 if (file) handleImageUpload(index, file);
//                               }}
//                             />
//                           </div>

//                           {/* Action Buttons */}
//                           <div className="flex items-center justify-between pt-6 border-t border-gray-200">
//                             <div className="text-sm text-gray-500 flex items-center gap-2">
//                               <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
//                                 <span className="font-semibold text-gray-700">#{index + 1}</span>
//                               </div>
//                               <div>
//                                 <span className="font-medium text-gray-700">Thẻ {index + 1}</span>
//                                 <span className="mx-2">•</span>
//                                 <span>{card.mediaPreview ? "Có ảnh minh họa" : "Không có ảnh"}</span>
//                               </div>
//                             </div>
//                             <div className="flex items-center gap-2">
//                               <Button
//                                 variant="ghost"
//                                 size="sm"
//                                 onClick={() => removeFlashcard(index)}
//                                 disabled={formData.flashcards.length <= 2}
//                                 className="text-gray-500 hover:text-red-600 hover:bg-red-50 px-4"
//                               >
//                                 <Trash2 className="w-4 h-4 mr-2" />
//                                 Xóa thẻ
//                               </Button>
//                             </div>
//                           </div>
//                         </CardContent>
//                       )}
//                     </Card>
//                   </div>
//                 ))}
//               </div>

//               {/* Add Card Button */}
//               <Button
//                 onClick={addFlashcard}
//                 variant="outline"
//                 className="w-full h-16 border-3 border-dashed border-gray-300 hover:border-blue-400 hover:bg-blue-50/50 text-gray-700 hover:text-blue-700 transition-all duration-300 rounded-2xl group"
//               >
//                 <div className="flex flex-col items-center justify-center gap-2">
//                   <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
//                     <Plus className="w-5 h-5 text-blue-600" />
//                   </div>
//                   <div>
//                     <p className="font-semibold">Thêm thẻ mới</p>
//                     <p className="text-xs text-gray-500 mt-1">Bấm để thêm thẻ học tập mới</p>
//                   </div>
//                 </div>
//               </Button>
//             </div>
//           </div>

//           {/* Sidebar */}
//           <div className="lg:col-span-1 space-y-6">
//             {/* Summary Card */}
//             <Card className="border-0 shadow-2xl bg-white rounded-2xl sticky top-24">
//               <CardHeader className="pb-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
//                 <CardTitle className="text-lg font-bold flex items-center gap-3">
//                   <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
//                     <Eye className="w-5 h-5 text-white" />
//                   </div>
//                   <span className="text-gray-900">Tổng quan & Hành động</span>
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="pt-6 space-y-6">
//                 {/* Stats */}
//                 <div className="space-y-4">
//                   <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50/80 to-indigo-50/80 rounded-xl border border-blue-100">
//                     <div className="flex items-center gap-3">
//                       <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center shadow-sm">
//                         <FileText className="w-5 h-5 text-blue-600" />
//                       </div>
//                       <div>
//                         <p className="text-sm font-medium text-gray-700">Tổng số thẻ</p>
//                         <p className="text-xs text-gray-500">Đang có trong bộ</p>
//                       </div>
//                     </div>
//                     <Badge className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-3 py-1.5 text-sm shadow-lg">
//                       {totalCards} thẻ
//                     </Badge>
//                   </div>

//                   <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50/80 to-emerald-50/80 rounded-xl border border-green-100">
//                     <div className="flex items-center gap-3">
//                       <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center shadow-sm">
//                         <Check className="w-5 h-5 text-green-600" />
//                       </div>
//                       <div>
//                         <p className="text-sm font-medium text-gray-700">Đã hoàn thành</p>
//                         <p className="text-xs text-gray-500">Thẻ đã điền đủ</p>
//                       </div>
//                     </div>
//                     <Badge className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-3 py-1.5 text-sm shadow-lg">
//                       {completedCards} thẻ
//                     </Badge>
//                   </div>

//                   <div className="flex items-center justify-between p-4 bg-gradient-to-r from-amber-50/80 to-orange-50/80 rounded-xl border border-amber-100">
//                     <div className="flex items-center gap-3">
//                       <div className="w-10 h-10 bg-gradient-to-br from-amber-100 to-amber-200 rounded-lg flex items-center justify-center shadow-sm">
//                         <AlertCircle className="w-5 h-5 text-amber-600" />
//                       </div>
//                       <div>
//                         <p className="text-sm font-medium text-gray-700">Chưa hoàn thành</p>
//                         <p className="text-xs text-gray-500">Cần bổ sung</p>
//                       </div>
//                     </div>
//                     <Badge className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-3 py-1.5 text-sm shadow-lg">
//                       {incompleteCards} thẻ
//                     </Badge>
//                   </div>
//                 </div>

//                 {/* Selected Info */}
//                 {(selectedTopic || selectedFolder) && (
//                   <div className="pt-4 border-t border-gray-100 space-y-4">
//                     <h4 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
//                       <CheckCircle className="w-4 h-4 text-green-600" />
//                       Thông tin đã chọn
//                     </h4>
//                     <div className="space-y-3">
//                       {selectedTopic && (
//                         <div className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200">
//                           <div className="flex items-center gap-3">
//                             <div
//                               className="w-4 h-4 rounded-full shadow-sm"
//                               style={{ backgroundColor: selectedTopic.color }}
//                             />
//                             <span className="text-sm font-medium text-gray-700">Chủ đề</span>
//                           </div>
//                           <Badge className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700">
//                             {selectedTopic.name}
//                           </Badge>
//                         </div>
//                       )}
//                       {selectedFolder && (
//                         <div className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200">
//                           <div className="flex items-center gap-3">
//                             <FolderOpen className="w-4 h-4 text-gray-600" />
//                             <span className="text-sm font-medium text-gray-700">Thư mục</span>
//                           </div>
//                           <Badge className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700">
//                             {selectedFolder.name}
//                           </Badge>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 )}

//                 {/* Action Buttons */}
//                 <div className="pt-4 border-t border-gray-100 space-y-4">
//                   <Button
//                     onClick={handleSubmit}
//                     disabled={!formData.title.trim() || incompleteCards > 0}
//                     size="lg"
//                     className="w-full h-16 bg-gradient-to-r from-blue-600 via-blue-600 to-blue-700 hover:from-blue-700 hover:via-blue-700 hover:to-blue-800 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-xl group"
//                   >
//                     <div className="flex items-center justify-center gap-3">
//                       <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
//                         <Save className="w-4 h-4 text-white" />
//                       </div>
//                       <div className="text-left">
//                         <p className="font-bold text-white">Tạo bộ flashcard</p>
//                         <p className="text-xs text-white/80">Lưu và công bố bộ học</p>
//                       </div>
//                     </div>
//                   </Button>

//                   <div className="grid grid-cols-2 gap-3">
//                     <Button
//                       variant="outline"
//                       size="lg"
//                       className="h-12 border-gray-300 hover:bg-gray-50 hover:border-gray-400 rounded-lg"
//                     >
//                       <Save className="w-4 h-4 mr-2" />
//                       Lưu nháp
//                     </Button>
//                     <Button
//                       variant="ghost"
//                       size="lg"
//                       className="h-12 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
//                     >
//                       Hủy bỏ
//                     </Button>
//                   </div>
//                 </div>

//                 {/* Validation Message */}
//                 {incompleteCards > 0 && (
//                   <div className="p-4 bg-gradient-to-r from-amber-50/90 to-orange-50/90 border border-amber-200 rounded-xl shadow-sm">
//                     <div className="flex items-start gap-3">
//                       <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
//                       <div>
//                         <p className="text-sm font-semibold text-amber-900 mb-1">
//                           Chưa sẵn sàng để tạo
//                         </p>
//                         <p className="text-xs text-amber-800">
//                           Bạn cần hoàn thành tất cả <span className="font-bold">{incompleteCards} thẻ</span> còn thiếu.
//                           Hãy kiểm tra lại các thẻ đang mở.
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </CardContent>
//             </Card>

//             {/* Tips Card */}
//             <Card className="border-0 shadow-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl">
//               <CardContent className="p-6">
//                 <div className="flex items-start gap-4">
//                   <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
//                     <Zap className="w-6 h-6 text-white" />
//                   </div>
//                   <div>
//                     <h4 className="font-bold text-gray-900 mb-3 text-lg">
//                       Mẹo tạo flashcard hiệu quả
//                     </h4>
//                     <ul className="space-y-3 text-sm text-gray-700">
//                       <li className="flex items-start gap-3">
//                         <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
//                         <div>
//                           <span className="font-semibold">Thuật ngữ ngắn gọn:</span>
//                           <span className="text-gray-600 ml-1">Sử dụng từ khóa rõ ràng, dễ nhớ</span>
//                         </div>
//                       </li>
//                       <li className="flex items-start gap-3">
//                         <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
//                         <div>
//                           <span className="font-semibold">Hình ảnh minh họa:</span>
//                           <span className="text-gray-600 ml-1">Tăng 70% khả năng ghi nhớ với ảnh</span>
//                         </div>
//                       </li>
//                       <li className="flex items-start gap-3">
//                         <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
//                         <div>
//                           <span className="font-semibold">Kiểm tra chính tả:</span>
//                           <span className="text-gray-600 ml-1">Đảm bảo nội dung chính xác trước khi lưu</span>
//                         </div>
//                       </li>
//                     </ul>
//                     <div className="mt-4 pt-4 border-t border-blue-200">
//                       <p className="text-xs text-gray-600">
//                         <span className="font-semibold">Lưu ý:</span> Mỗi bộ flashcard có thể có tối đa 200 thẻ và tối đa 10MB cho mỗi ảnh.
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Preview Card */}
//             <Card className="border-0 shadow-2xl bg-white rounded-2xl">
//               <CardHeader className="pb-4 border-b border-gray-100">
//                 <CardTitle className="text-lg font-bold flex items-center gap-2">
//                   <Eye className="w-5 h-5 text-blue-600" />
//                   Xem trước
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="pt-6">
//                 <div className="flex flex-col items-center justify-center text-center space-y-4 p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">
//                   <div className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-xl" style={{ background: formData.iconColor }}>
//                     <SelectedIcon className="w-10 h-10 text-white" />
//                   </div>
//                   <div className="space-y-2">
//                     <h3 className="font-bold text-xl text-gray-900">
//                       {formData.title || "Tên bộ flashcard"}
//                     </h3>
//                     <p className="text-gray-600 text-sm line-clamp-2">
//                       {formData.description || "Mô tả bộ flashcard sẽ hiển thị tại đây..."}
//                     </p>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <Badge
//                       variant="outline"
//                       className="bg-white/80 backdrop-blur-sm text-xs px-3 py-1"
//                     >
//                       <BookOpen className="w-3 h-3 mr-1" />
//                       {totalCards} thẻ
//                     </Badge>
//                     {selectedTopic && (
//                       <Badge
//                         variant="outline"
//                         className="bg-white/80 backdrop-blur-sm text-xs px-3 py-1"
//                       >
//                         <div
//                           className="w-2 h-2 rounded-full mr-1"
//                           style={{ backgroundColor: selectedTopic.color }}
//                         />
//                         {selectedTopic.name}
//                       </Badge>
//                     )}
//                   </div>
//                   <div className="text-xs text-gray-500 pt-2 border-t border-gray-200 w-full">
//                     <p>Icon và màu sắc đã được áp dụng</p>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertCircle,
  AlertTriangle,
  ArrowLeft,
  Award,
  Book,
  BookMarked,
  BookOpen,
  Brain,
  Calculator,
  Check,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  Clock,
  Columns,
  Copy,
  Download,
  ExternalLink,
  Eye,
  FileSpreadsheet,
  FileText,
  FolderOpen,
  Globe,
  GraduationCap,
  Grid3x3,
  GripVertical,
  History,
  Home,
  Image as ImageIcon,
  Import,
  Keyboard,
  LayoutGrid,
  Library,
  Lightbulb,
  Loader2,
  Lock,
  Palette,
  Plus,
  Redo,
  Save,
  Shield,
  Sparkles,
  Star,
  Tag,
  Target,
  Trash2,
  Trophy,
  Undo,
  Upload,
  UploadCloud,
  User,
  Zap
} from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

// Types
interface Flashcard {
  id: string;
  term: string;
  definition: string;
  mediaId: File | null;
  mediaPreview: string | null;
  position: number;
}

interface IconOption {
  value: string;
  icon: any;
  label: string;
  category: string;
}

interface FormData {
  title: string;
  description: string;
  icon: string;
  iconColor: string;
  topicId: string;
  folderSetId: string;
  isPublic: boolean;
  flashcards: Flashcard[];
}

// Mock data
const topics = [
  { id: "1", name: "Ngôn ngữ", color: "#3B82F6" },
  { id: "2", name: "Toán học", color: "#8B5CF6" },
  { id: "3", name: "Khoa học", color: "#10B981" },
  { id: "4", name: "Lịch sử", color: "#F59E0B" },
  { id: "5", name: "Công nghệ", color: "#EF4444" },
];

const folders = [
  { id: "1", name: "Học kỳ 1", count: 12 },
  { id: "2", name: "Ôn thi TOEIC", count: 8 },
  { id: "3", name: "Đại học", count: 15 },
  { id: "4", name: "Tự học", count: 6 },
];

// Icon options with categories
const iconOptions: IconOption[] = [
  // Education
  { value: "book", icon: Book, label: "Sách", category: "Giáo dục" },
  { value: "book-open", icon: BookOpen, label: "Sách mở", category: "Giáo dục" },
  { value: "graduation-cap", icon: GraduationCap, label: "Tốt nghiệp", category: "Giáo dục" },
  { value: "brain", icon: Brain, label: "Não bộ", category: "Giáo dục" },
  { value: "lightbulb", icon: Lightbulb, label: "Bóng đèn", category: "Giáo dục" },
  { value: "book-marked", icon: BookMarked, label: "Sách đánh dấu", category: "Giáo dục" },
  { value: "library", icon: Library, label: "Thư viện", category: "Giáo dục" },
  
  // Achievements
  { value: "trophy", icon: Trophy, label: "Cúp", category: "Thành tích" },
  { value: "star", icon: Star, label: "Ngôi sao", category: "Thành tích" },
  { value: "award", icon: Award, label: "Huy chương", category: "Thành tích" },
  { value: "target", icon: Target, label: "Mục tiêu", category: "Thành tích" },

  // Science
  { value: "flask", icon: User, label: "Ống nghiệm", category: "Khoa học" },
  { value: "microscope", icon: User, label: "Kính hiển vi", category: "Khoa học" },
  { value: "atom", icon: User, label: "Nguyên tử", category: "Khoa học" },
  { value: "calculator", icon: Calculator, label: "Máy tính", category: "Khoa học" },
];

// Gradient color options
const gradientOptions = [
  { value: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", label: "Tím xanh" },
  { value: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)", label: "Hồng đỏ" },
  { value: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)", label: "Xanh dương" },
  { value: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)", label: "Xanh lá" },
  { value: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)", label: "Hồng vàng" },
  { value: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)", label: "Hồng pastel" },
  { value: "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)", label: "Tím pastel" },
  { value: "linear-gradient(135deg, #fad0c4 0%, #ffd1ff 100%)", label: "Cam hồng" },
  { value: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)", label: "Cam nhạt" },
  { value: "linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)", label: "Xanh lá tươi" },
  { value: "linear-gradient(135deg, #30cfd0 0%, #330867 100%)", label: "Xanh đậm" },
  { value: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)", label: "Vàng cam" },
];

// Custom icons (thêm các icons chưa có)
const Flask = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.5 2v6h5.5l-2.5 8c-.5 1.5-2 2.5-3.5 2.5h-4c-1.5 0-3-1-3.5-2.5l-2.5-8h5.5V2"/></svg>;
const Microscope = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 18h8"/><path d="M3 22h18"/><path d="M14 22a7 7 0 0 0 0-14h-1"/><path d="M9 14h2"/><path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z"/><path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3"/></svg>;
const Atom = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"/><path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z"/><path d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z"/></svg>;

// 1. Auto-save Hook
const useAutoSave = (formData: FormData, delay: number = 5000) => {
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveCount, setSaveCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (formData.title || formData.flashcards.some(card => card.term || card.definition)) {
        setIsSaving(true);
        
        // Save to localStorage
        const draft = {
          data: formData,
          timestamp: new Date().toISOString(),
          saveCount: saveCount + 1
        };
        
        localStorage.setItem('flashcardDraft', JSON.stringify(draft));
        
        setTimeout(() => {
          setIsSaving(false);
          setLastSaved(new Date());
          setSaveCount(prev => prev + 1);
          
          // Show subtle toast on every 3rd save
          if ((saveCount + 1) % 3 === 0) {
            toast.info('Đang tự động lưu nháp...', {
              duration: 2000,
              position: 'bottom-right'
            });
          }
        }, 500);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [formData, delay, saveCount]);

  const recoverDraft = useCallback(() => {
    const draft = localStorage.getItem('flashcardDraft');
    if (draft) {
      try {
        const parsed = JSON.parse(draft);
        const timeDiff = new Date().getTime() - new Date(parsed.timestamp).getTime();
        const hoursDiff = timeDiff / (1000 * 60 * 60);
        
        if (hoursDiff < 24) { // Only recover drafts less than 24 hours old
          return parsed.data;
        } else {
          localStorage.removeItem('flashcardDraft');
        }
      } catch (error) {
        console.error('Error recovering draft:', error);
      }
    }
    return null;
  }, []);

  const clearDraft = useCallback(() => {
    localStorage.removeItem('flashcardDraft');
    setLastSaved(null);
    setSaveCount(0);
    toast.success('Đã xóa bản nháp');
  }, []);

  return { lastSaved, isSaving, recoverDraft, clearDraft, saveCount };
};

// 2. History Hook (Undo/Redo)
const useHistory = (initialState: FormData) => {
  const [history, setHistory] = useState<FormData[]>([initialState]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const maxHistory = 50;

  const push = useCallback((state: FormData) => {
    setHistory(prev => {
      const newHistory = [...prev.slice(0, currentIndex + 1), state];
      if (newHistory.length > maxHistory) {
        return newHistory.slice(-maxHistory);
      }
      return newHistory;
    });
    setCurrentIndex(prev => Math.min(prev + 1, maxHistory - 1));
  }, [currentIndex]);

  const undo = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      return history[currentIndex - 1];
    }
    return null;
  }, [currentIndex, history]);

  const redo = useCallback(() => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex(prev => prev + 1);
      return history[currentIndex + 1];
    }
    return null;
  }, [currentIndex, history]);

  const clearHistory = useCallback(() => {
    setHistory([initialState]);
    setCurrentIndex(0);
  }, [initialState]);

  return {
    currentState: history[currentIndex],
    push,
    undo,
    redo,
    clearHistory,
    canUndo: currentIndex > 0,
    canRedo: currentIndex < history.length - 1,
    historySize: history.length,
    currentPosition: currentIndex + 1
  };
};

// 3. Keyboard Shortcuts Hook
const useKeyboardShortcuts = ({
  onSave,
  onAddCard,
  onCloseModal,
  onUndo,
  onRedo,
  onImport
}: {
  onSave: () => void;
  onAddCard: () => void;
  onCloseModal: () => void;
  onUndo: () => void;
  onRedo: () => void;
  onImport: () => void;
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + S: Lưu
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        onSave();
      }
      
      // Ctrl/Cmd + Enter: Thêm thẻ mới
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        onAddCard();
      }
      
      // Ctrl/Cmd + Z: Undo
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        onUndo();
      }
      
      // Ctrl/Cmd + Shift + Z: Redo
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && e.shiftKey) {
        e.preventDefault();
        onRedo();
      }
      
      // Ctrl/Cmd + I: Import
      if ((e.ctrlKey || e.metaKey) && e.key === 'i') {
        e.preventDefault();
        onImport();
      }
      
      // Esc: Đóng modal
      if (e.key === 'Escape') {
        onCloseModal();
      }
      
      // Alt + Arrow: Navigate between cards
      if (e.altKey && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
        e.preventDefault();
        // Navigation logic can be added here
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onSave, onAddCard, onCloseModal, onUndo, onRedo, onImport]);
};

// 4. Smart Validation Component
const SmartValidation: React.FC<{
  flashcards: Flashcard[];
  onAutoFix: (index: number, field: 'term' | 'definition', action: string) => void;
}> = ({ flashcards, onAutoFix }) => {
  const [suggestions, setSuggestions] = useState<Array<{
    index: number;
    field: 'term' | 'definition';
    type: 'empty' | 'tooLong' | 'duplicate' | 'similar' | 'format';
    message: string;
    fix: string;
    severity: 'low' | 'medium' | 'high';
  }>>([]);

  useEffect(() => {
    const newSuggestions: Array<any> = [];
    
    flashcards.forEach((card, index) => {
      // Kiểm tra trống
      if (!card.term.trim()) {
        newSuggestions.push({
          index,
          field: 'term',
          type: 'empty',
          message: 'Thuật ngữ đang trống',
          fix: 'Tự động điền "Thuật ngữ #" + (index + 1)',
          severity: 'high'
        });
      }
      
      if (!card.definition.trim()) {
        newSuggestions.push({
          index,
          field: 'definition',
          type: 'empty',
          message: 'Định nghĩa đang trống',
          fix: 'Tự động điền "Định nghĩa #" + (index + 1)',
          severity: 'high'
        });
      }
      
      // Kiểm tra quá dài
      if (card.term.length > 200) {
        newSuggestions.push({
          index,
          field: 'term',
          type: 'tooLong',
          message: `Thuật ngữ quá dài (${card.term.length}/200 ký tự)`,
          fix: 'Tự động cắt ngắn',
          severity: 'medium'
        });
      }
      
      if (card.definition.length > 500) {
        newSuggestions.push({
          index,
          field: 'definition',
          type: 'tooLong',
          message: `Định nghĩa quá dài (${card.definition.length}/500 ký tự)`,
          fix: 'Tự động cắt ngắn',
          severity: 'medium'
        });
      }
      
      // Kiểm tra trùng lặp
      const duplicateIndex = flashcards.findIndex((c, i) => 
        i !== index && c.term.toLowerCase() === card.term.toLowerCase() && c.term.trim()
      );
      if (duplicateIndex !== -1) {
        newSuggestions.push({
          index,
          field: 'term',
          type: 'duplicate',
          message: `Thuật ngữ trùng với thẻ #${duplicateIndex + 1}`,
          fix: 'Thêm số thứ tự',
          severity: 'medium'
        });
      }
      
      // Kiểm tra định dạng
      if (card.term.includes('  ')) {
        newSuggestions.push({
          index,
          field: 'term',
          type: 'format',
          message: 'Có nhiều khoảng trắng liên tiếp',
          fix: 'Tự động xóa khoảng trắng thừa',
          severity: 'low'
        });
      }
      
      // Kiểm tra tương tự
      flashcards.forEach((otherCard, otherIndex) => {
        if (otherIndex !== index && card.term && otherCard.term) {
          const similarity = calculateSimilarity(card.term, otherCard.term);
          if (similarity > 0.8 && similarity < 1) {
            newSuggestions.push({
              index,
              field: 'term',
              type: 'similar',
              message: `Thuật ngữ tương tự với thẻ #${otherIndex + 1} (${Math.round(similarity * 100)}%)`,
              fix: 'Xem lại để tránh nhầm lẫn',
              severity: 'low'
            });
          }
        }
      });
    });
    
    setSuggestions(newSuggestions);
  }, [flashcards]);

  const calculateSimilarity = (str1: string, str2: string): number => {
    const set1 = new Set(str1.toLowerCase().split(' '));
    const set2 = new Set(str2.toLowerCase().split(' '));
    const intersection = new Set([...set1].filter(x => set2.has(x)));
    const union = new Set([...set1, ...set2]);
    return intersection.size / union.size;
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'from-red-50 to-red-100 border-red-200 text-red-800';
      case 'medium': return 'from-amber-50 to-orange-50 border-amber-200 text-amber-800';
      case 'low': return 'from-blue-50 to-blue-100 border-blue-200 text-blue-800';
      default: return 'from-gray-50 to-gray-100 border-gray-200 text-gray-800';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high': return <AlertCircle className="w-4 h-4 text-red-600" />;
      case 'medium': return <AlertTriangle className="w-4 h-4 text-amber-600" />;
      case 'low': return <Info />;
      default: return <AlertCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-3">
      {suggestions.length > 0 && (
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
            <Shield className="w-4 h-4 text-blue-600" />
            Gợi ý sửa lỗi ({suggestions.length})
          </h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              // Auto-fix all high priority issues
              suggestions
                .filter(s => s.severity === 'high' && s.type === 'empty')
                .forEach(s => onAutoFix(s.index, s.field, s.type));
              toast.success(`Đã sửa ${suggestions.filter(s => s.severity === 'high').length} lỗi quan trọng`);
            }}
            className="text-xs"
          >
            Sửa tất cả lỗi quan trọng
          </Button>
        </div>
      )}
      
      <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
        {suggestions.map((suggestion, idx) => (
          <div
            key={idx}
            className={`flex items-center justify-between p-3 bg-gradient-to-r ${getSeverityColor(suggestion.severity)} rounded-lg border animate-in fade-in slide-in-from-right-2`}
            style={{ animationDelay: `${idx * 50}ms` }}
          >
            <div className="flex items-center gap-3">
              {getSeverityIcon(suggestion.severity)}
              <div>
                <p className="text-sm font-medium">
                  Thẻ #{suggestion.index + 1}: {suggestion.message}
                </p>
                <p className="text-xs opacity-80 mt-1">{suggestion.fix}</p>
              </div>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onAutoFix(suggestion.index, suggestion.field, suggestion.type)}
              className={`text-xs ${
                suggestion.severity === 'high' 
                  ? 'border-red-300 text-red-700 hover:bg-red-50'
                  : suggestion.severity === 'medium'
                  ? 'border-amber-300 text-amber-700 hover:bg-amber-50'
                  : 'border-blue-300 text-blue-700 hover:bg-blue-50'
              }`}
            >
              Sửa ngay
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

// Info icon component
const Info = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>;

// 5. Bulk Actions Component
const BulkActions: React.FC<{
  onImportCSV: (cards: Omit<Flashcard, 'id' | 'position'>[]) => void;
  onDuplicateCards: (indices: number[]) => void;
  onDeleteCards: (indices: number[]) => void;
  onSelectAll: () => void;
  onClearSelection: () => void;
  selectedCards: number[];
  totalCards: number;
}> = ({ 
  onImportCSV, 
  onDuplicateCards, 
  onDeleteCards, 
  onSelectAll,
  onClearSelection,
  selectedCards,
  totalCards 
}) => {
  const [showBulkMenu, setShowBulkMenu] = useState(false);
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [importMode, setImportMode] = useState<'csv' | 'text' | 'excel'>('csv');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleCSVImport = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const csvData = e.target?.result as string;
      const rows = csvData.split('\n').filter(row => row.trim());
      const importedCards = rows.slice(1).map((row, index) => {
        const [term, definition] = row.split(',').map(cell => cell.trim());
        return {
          term: term || '',
          definition: definition || '',
          mediaId: null,
          mediaPreview: null,
        };
      }).filter(card => card.term || card.definition);
      
      if (importedCards.length > 0) {
        onImportCSV(importedCards);
        toast.success(`Đã import ${importedCards.length} thẻ từ CSV`);
        setShowImportDialog(false);
      } else {
        toast.error('Không tìm thấy dữ liệu hợp lệ trong file');
      }
    };
    reader.readAsText(file);
  };

  const handleTextImport = () => {
    const text = textAreaRef.current?.value;
    if (!text) {
      toast.error('Vui lòng nhập dữ liệu');
      return;
    }

    const lines = text.split('\n').filter(line => line.trim());
    const importedCards = lines.map((line, index) => {
      const [term, definition] = line.split(':').map(part => part.trim());
      return {
        term: term || `Thuật ngữ ${index + 1}`,
        definition: definition || `Định nghĩa ${index + 1}`,
        mediaId: null,
        mediaPreview: null,
      };
    });

    if (importedCards.length > 0) {
      onImportCSV(importedCards);
      toast.success(`Đã import ${importedCards.length} thẻ từ văn bản`);
      setShowImportDialog(false);
    }
  };

  const handleExampleLoad = () => {
    if (textAreaRef.current) {
      textAreaRef.current.value = `Hello: Xin chào\nGoodbye: Tạm biệt\nThank you: Cảm ơn\nPlease: Làm ơn\nSorry: Xin lỗi`;
      toast.info('Đã tải ví dụ mẫu');
    }
  };

  return (
    <>
      <div className="relative">
        <Button
          variant="outline"
          onClick={() => setShowBulkMenu(!showBulkMenu)}
          className="gap-2 relative"
          disabled={totalCards === 0}
        >
          <Grid3x3 className="w-4 h-4" />
          Hành động hàng loạt
          {selectedCards.length > 0 && (
            <Badge className="absolute -top-2 -right-2 bg-blue-600 text-white">
              {selectedCards.length}
            </Badge>
          )}
          <ChevronDown className={`w-4 h-4 transition-transform ${showBulkMenu ? 'rotate-180' : ''}`} />
        </Button>
        
        {showBulkMenu && (
          <div className="absolute top-full mt-2 w-72 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 animate-in fade-in slide-in-from-top-2">
            <div className="p-2 space-y-1">
              {/* Selection Controls */}
              <div className="px-3 py-2 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    Đã chọn: {selectedCards.length}/{totalCards}
                  </span>
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={onSelectAll}
                      className="h-7 px-2 text-xs"
                    >
                      Chọn tất cả
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={onClearSelection}
                      className="h-7 px-2 text-xs"
                    >
                      Bỏ chọn
                    </Button>
                  </div>
                </div>
              </div>

              {/* Import Options */}
              <button
                className="w-full flex items-center gap-3 p-3 hover:bg-blue-50 rounded-lg transition-colors group"
                onClick={() => {
                  setShowImportDialog(true);
                  setShowBulkMenu(false);
                }}
              >
                <UploadCloud className="w-4 h-4 text-blue-600 group-hover:scale-110 transition-transform" />
                <div className="text-left flex-1">
                  <p className="font-medium text-gray-900">Import nhiều thẻ</p>
                  <p className="text-xs text-gray-500">CSV, Excel, hoặc văn bản</p>
                </div>
                <Badge variant="outline" className="text-xs">Mới</Badge>
              </button>
              
              {/* Duplicate */}
              <button
                className="w-full flex items-center gap-3 p-3 hover:bg-green-50 rounded-lg transition-colors group disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => {
                  onDuplicateCards(selectedCards);
                  setShowBulkMenu(false);
                }}
                disabled={selectedCards.length === 0}
              >
                <Copy className="w-4 h-4 text-green-600 group-hover:scale-110 transition-transform" />
                <div className="text-left flex-1">
                  <p className="font-medium text-gray-900">Sao chép thẻ đã chọn</p>
                  <p className="text-xs text-gray-500">Tạo bản sao của {selectedCards.length} thẻ</p>
                </div>
              </button>
              
              {/* Export */}
              <button
                className="w-full flex items-center gap-3 p-3 hover:bg-purple-50 rounded-lg transition-colors"
                onClick={() => {
                  // Export logic here
                  toast.info('Tính năng export đang được phát triển');
                  setShowBulkMenu(false);
                }}
              >
                <Download className="w-4 h-4 text-purple-600" />
                <div className="text-left flex-1">
                  <p className="font-medium text-gray-900">Export thẻ đã chọn</p>
                  <p className="text-xs text-gray-500">Xuất ra CSV hoặc PDF</p>
                </div>
              </button>
              
              {/* Delete */}
              <button
                className="w-full flex items-center gap-3 p-3 hover:bg-red-50 rounded-lg transition-colors text-red-600 group disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => {
                  if (selectedCards.length > 0) {
                    onDeleteCards(selectedCards);
                    setShowBulkMenu(false);
                  }
                }}
                disabled={selectedCards.length === 0}
              >
                <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <div className="text-left flex-1">
                  <p className="font-medium">Xóa thẻ đã chọn</p>
                  <p className="text-xs opacity-80">{selectedCards.length} thẻ sẽ bị xóa</p>
                </div>
              </button>
            </div>
            
            <div className="p-2 border-t border-gray-100">
              <div className="text-xs text-gray-500 px-2">
                <p>Tip: Giữ Ctrl/Cmd để chọn nhiều thẻ</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Import Dialog */}
      <Dialog open={showImportDialog} onOpenChange={setShowImportDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <UploadCloud className="w-5 h-5 text-blue-600" />
              Import nhiều thẻ
            </DialogTitle>
            <DialogDescription>
              Import hàng loạt thẻ flashcard từ file hoặc văn bản
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Import Mode Selection */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'csv', label: 'CSV File', icon: FileSpreadsheet, desc: 'File .csv với cột term,definition' },
                { id: 'text', label: 'Văn bản', icon: FileText, desc: 'Mỗi dòng: term: definition' },
                { id: 'excel', label: 'Excel', icon: Columns, desc: 'File .xlsx hoặc .xls' }
              ].map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => setImportMode(mode.id as any)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    importMode === mode.id
                      ? 'border-blue-500 bg-blue-50 scale-105'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <mode.icon className={`w-6 h-6 ${
                      importMode === mode.id ? 'text-blue-600' : 'text-gray-600'
                    }`} />
                    <span className="font-medium text-sm">{mode.label}</span>
                    <span className="text-xs text-gray-500 text-center">{mode.desc}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Import Content */}
            {importMode === 'csv' && (
              <div className="space-y-4">
                <div className="border-3 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <UploadCloud className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="font-medium text-gray-900 mb-2">Kéo thả file CSV vào đây</p>
                  <p className="text-sm text-gray-600 mb-4">hoặc click để chọn file</p>
                  <Button variant="outline">
                    Chọn file CSV
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".csv,.txt"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleCSVImport(file);
                    }}
                  />
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm font-medium text-gray-900 mb-2">Định dạng CSV:</p>
                  <pre className="text-xs bg-white p-3 rounded border border-gray-200 overflow-x-auto">
                    term,definition{'\n'}Hello,Xin chào{'\n'}Goodbye,Tạm biệt
                  </pre>
                </div>
              </div>
            )}

            {importMode === 'text' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Nhập hoặc dán dữ liệu:</Label>
                  <Textarea
                    ref={textAreaRef}
                    placeholder="Hello: Xin chào
Goodbye: Tạm biệt
Thank you: Cảm ơn"
                    className="min-h-[200px] font-mono text-sm"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleExampleLoad}
                  >
                    Tải ví dụ mẫu
                  </Button>
                  <Button onClick={handleTextImport}>
                    Import dữ liệu
                  </Button>
                </div>
              </div>
            )}

            {importMode === 'excel' && (
              <div className="text-center py-8">
                <FileSpreadsheet className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">
                  Tính năng import Excel đang được phát triển
                </p>
                <p className="text-sm text-gray-500">
                  Vui lòng sử dụng định dạng CSV tạm thời
                </p>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowImportDialog(false)}>
              Đóng
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

// 6. Import Modal Component
const ImportQuizletModal: React.FC<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImport: (flashcards: Omit<Flashcard, "id" | "position">[]) => void;
}> = ({ open, onOpenChange, onImport }) => {
  const [importUrl, setImportUrl] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isImporting, setIsImporting] = useState(false);

  const validateQuizletUrl = useCallback((url: string) => {
    return (
      url.includes("quizlet.com") && (url.includes("/") || url.includes("?"))
    );
  }, []);

  const handleImport = async () => {
    if (!importUrl.trim()) {
      toast.error("Vui lòng nhập đường link Quizlet");
      return;
    }

    if (!validateQuizletUrl(importUrl)) {
      toast.error("Link Quizlet không hợp lệ. Vui lòng kiểm tra lại.");
      return;
    }

    if (!acceptTerms) {
      toast.error("Vui lòng chấp nhận điều khoản sử dụng");
      return;
    }

    setIsImporting(true);

    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Mock data
      const mockFlashcards = [
        { term: "Hello", definition: "Xin chào" },
        { term: "Goodbye", definition: "Tạm biệt" },
        { term: "Thank you", definition: "Cảm ơn" },
        { term: "Please", definition: "Làm ơn" },
        { term: "Sorry", definition: "Xin lỗi" },
      ];

      const importedFlashcards = mockFlashcards.map((item, index) => ({
        term: item.term || "",
        definition: item.definition || "",
        mediaId: null,
        mediaPreview: null,
      }));

      onImport(importedFlashcards);
      toast.success(`Đã import thành công ${importedFlashcards.length} thẻ`);
      
      // Reset form
      setImportUrl("");
      setAcceptTerms(false);
      onOpenChange(false);
    } catch (error) {
      console.error("Import error:", error);
      toast.error("Import thất bại. Vui lòng thử lại.");
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
              <Import className="w-5 h-5 text-white" />
            </div>
            <div>
              <DialogTitle className="text-xl">Import từ Quizlet</DialogTitle>
              <DialogDescription>
                Import bộ flashcard từ Quizlet bằng đường link
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* URL Input */}
          <div className="space-y-3">
            <Label htmlFor="quizlet-url" className="text-sm font-medium">
              Đường link Quizlet
              <span className="text-red-500 ml-1">*</span>
            </Label>
            <div className="relative">
              <ExternalLink className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                id="quizlet-url"
                placeholder="https://quizlet.com/..."
                value={importUrl}
                onChange={(e) => setImportUrl(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
            {importUrl && !validateQuizletUrl(importUrl) && (
              <p className="text-xs text-amber-600 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" />
                Link Quizlet không hợp lệ. Vui lòng kiểm tra lại.
              </p>
            )}
            <p className="text-xs text-gray-500">
              Ví dụ: https://quizlet.com/12345678/title
            </p>
          </div>

          {/* Terms and Conditions */}
          <div className="space-y-3 border border-gray-200 rounded-lg p-4 bg-gray-50">
            <div className="flex items-start gap-3">
              <Checkbox
                id="terms"
                checked={acceptTerms}
                onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                className="mt-0.5"
              />
              <div className="space-y-2">
                <Label
                  htmlFor="terms"
                  className="text-sm font-medium cursor-pointer"
                >
                  Tôi đồng ý với các điều khoản sau:
                </Label>
                <ul className="space-y-2 text-xs text-gray-600">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-1" />
                    <span>
                      Việc import chỉ phục vụ mục đích học tập cá nhân
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-1" />
                    <span>
                      Không sử dụng cho mục đích thương mại hoặc phân phối lại
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-1" />
                    <span>
                      Người dùng tự chịu trách nhiệm về bản quyền và tuân thủ
                      các quy định của Quizlet
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-1" />
                    <span>
                      Chúng tôi không chịu trách nhiệm pháp lí về nội dung
                      được import
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Preview (optional) */}
          {validateQuizletUrl(importUrl) && acceptTerms && (
            <div className="border border-green-200 rounded-lg p-4 bg-green-50">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-800">
                  Đã sẵn sàng import
                </span>
              </div>
              <p className="text-xs text-green-700">
                Link hợp lệ. Bấm Import để thêm flashcard vào bộ học của bạn.
              </p>
            </div>
          )}
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={() => {
              onOpenChange(false);
              setImportUrl("");
              setAcceptTerms(false);
            }}
            className="w-full sm:w-auto"
          >
            Hủy
          </Button>
          <Button
            onClick={handleImport}
            disabled={
              !validateQuizletUrl(importUrl) || !acceptTerms || isImporting
            }
            className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            {isImporting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Đang import...
              </>
            ) : (
              <>
                <Import className="w-4 h-4 mr-2" />
                Import
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// 7. Main Component với tất cả tính năng
export default function CreateFlashcardPage() {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    icon: "book",
    iconColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    topicId: "",
    folderSetId: "",
    isPublic: false,
    flashcards: [
      {
        id: "1",
        term: "",
        definition: "",
        mediaId: null,
        mediaPreview: null,
        position: 0,
      },
      {
        id: "2",
        term: "",
        definition: "",
        mediaId: null,
        mediaPreview: null,
        position: 1,
      },
    ],
  });

  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [expandedCards, setExpandedCards] = useState<Set<string>>(
    new Set(["1", "2"])
  );
  const [showImportModal, setShowImportModal] = useState(false);
  const [selectedIconCategory, setSelectedIconCategory] = useState<string>("Giáo dục");
  const [showIconPicker, setShowIconPicker] = useState(false);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  // Initialize hooks
  const { lastSaved, isSaving, recoverDraft, clearDraft, saveCount } = useAutoSave(formData, 3000);
  const history = useHistory(formData);
  
  // Recover draft on mount
  useEffect(() => {
    const draft = recoverDraft();
    if (draft) {
      setFormData(draft);
      toast.custom((t) => (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4 shadow-lg max-w-md animate-in slide-in-from-right">
          <div className="flex items-start gap-3">
            <History className="w-5 h-5 text-blue-600 mt-0.5" />
            <div className="flex-1">
              <p className="font-medium text-gray-900">Tìm thấy bản nháp chưa lưu</p>
              <p className="text-sm text-gray-600 mt-1">
                Bạn có muốn khôi phục bản nháp trước đó?
              </p>
              <div className="flex gap-2 mt-3">
                <Button
                  size="sm"
                  onClick={() => {
                    setFormData(draft);
                    toast.dismiss(t);
                    toast.success('Đã khôi phục bản nháp');
                  }}
                >
                  Khôi phục
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    clearDraft();
                    toast.dismiss(t);
                  }}
                >
                  Bỏ qua
                </Button>
              </div>
            </div>
          </div>
        </div>
      ), {
        duration: 10000,
        position: 'bottom-right'
      });
    }
  }, [recoverDraft, clearDraft]);
  // Update form data with history tracking
  const updateFormData = useCallback((newData: FormData) => {
    setFormData(newData);
    history.push(newData);
  }, [history]);

  const handleInputChange = (field: keyof FormData, value: any) => {
    const newData = { ...formData, [field]: value };
    updateFormData(newData);
  };

  const handleFlashcardChange = (
    index: number,
    field: keyof Flashcard,
    value: any
  ) => {
    const updatedCards = [...formData.flashcards];
    updatedCards[index] = { ...updatedCards[index], [field]: value };
    const newData = { ...formData, flashcards: updatedCards };
    updateFormData(newData);
  };

  // Undo/Redo handlers
  const handleUndo = () => {
    const previousState = history.undo();
    if (previousState) {
      setFormData(previousState);
      showUndoToast('Đã hoàn tác', () => handleRedo());
    }
  };

  const handleRedo = () => {
    const nextState = history.redo();
    if (nextState) {
      setFormData(nextState);
      toast('Đã làm lại', {
        duration: 3000,
        position: 'bottom-right'
      });
    }
  };

  // Smart validation auto-fix
  const handleAutoFix = (index: number, field: 'term' | 'definition', action: string) => {
    const card = formData.flashcards[index];
    let newValue = '';
    
    switch (action) {
      case 'empty':
        newValue = field === 'term' 
          ? `Thuật ngữ #${index + 1}`
          : `Định nghĩa #${index + 1}`;
        break;
      case 'tooLong':
        newValue = field === 'term'
          ? card.term.substring(0, 200)
          : card.definition.substring(0, 500);
        break;
      case 'duplicate':
        newValue = `${card.term} (${index + 1})`;
        break;
      case 'format':
        newValue = card.term.replace(/\s+/g, ' ').trim();
        break;
      default:
        return;
    }
    
    handleFlashcardChange(index, field, newValue);
    toast.success(`Đã sửa thẻ #${index + 1}`);
  };

  // Bulk actions handlers
  const handleSelectAll = () => {
    setSelectedCards(Array.from({ length: formData.flashcards.length }, (_, i) => i));
  };

  const handleClearSelection = () => {
    setSelectedCards([]);
  };

  const handleBulkImport = (importedCards: Omit<Flashcard, 'id' | 'position'>[]) => {
    const newFlashcards = importedCards.map((item, index) => ({
      id: `imported-${Date.now()}-${index}`,
      ...item,
      position: formData.flashcards.length + index,
    }));

    const updatedCards = [...formData.flashcards, ...newFlashcards];
    updateFormData({ ...formData, flashcards: updatedCards });

    // Expand all imported cards
    const newCardIds = newFlashcards.map(card => card.id);
    setExpandedCards(prev => new Set([...prev, ...newCardIds]));
    
    // Select imported cards
    setSelectedCards(Array.from(
      { length: newFlashcards.length }, 
      (_, i) => formData.flashcards.length + i
    ));
  };

  const handleBulkDuplicate = (indices: number[]) => {
    const cardsToDuplicate = indices.map(i => formData.flashcards[i]);
    const duplicatedCards = cardsToDuplicate.map((card, idx) => ({
      ...card,
      id: `duplicate-${Date.now()}-${idx}`,
      term: `${card.term} (Bản sao)`,
      position: formData.flashcards.length + idx,
    }));

    const updatedCards = [...formData.flashcards, ...duplicatedCards];
    updateFormData({ ...formData, flashcards: updatedCards });
    
    toast.success(`Đã sao chép ${indices.length} thẻ`);
  };

  const handleBulkDelete = (indices: number[]) => {
    if (formData.flashcards.length - indices.length < 2) {
      toast.error("Bộ flashcard cần ít nhất 2 thẻ");
      return;
    }

    showUndoToast(`Đã xóa ${indices.length} thẻ`, () => {
      // Undo delete logic would go here
    });

    const updatedCards = formData.flashcards.filter((_, i) => !indices.includes(i));
    updatedCards.forEach((card, i) => (card.position = i));
    updateFormData({ ...formData, flashcards: updatedCards });
    setSelectedCards([]);
  };

  // Existing functions (updated)
  const handleImageUpload = (index: number, file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Vui lòng chọn file hình ảnh");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File không được vượt quá 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      handleFlashcardChange(index, "mediaId", file);
      handleFlashcardChange(index, "mediaPreview", reader.result as string);
      toast.success("Đã tải ảnh lên thành công");
    };
    reader.readAsDataURL(file);
  };

  const addFlashcard = () => {
    const newId = `card-${Date.now()}-${formData.flashcards.length}`;
    const newCard: Flashcard = {
      id: newId,
      term: "",
      definition: "",
      mediaId: null,
      mediaPreview: null,
      position: formData.flashcards.length,
    };
    const updatedCards = [...formData.flashcards, newCard];
    updateFormData({ ...formData, flashcards: updatedCards });
    setExpandedCards((prev) => new Set([...prev, newId]));
    setSelectedCards([...selectedCards, formData.flashcards.length]);
    toast.success("Đã thêm thẻ mới");
  };

  const handleImportFromQuizlet = (importedFlashcards: Omit<Flashcard, "id" | "position">[]) => {
    const newFlashcards = importedFlashcards.map((item, index) => ({
      id: `quizlet-${Date.now()}-${index}`,
      ...item,
      position: formData.flashcards.length + index,
    }));

    const updatedCards = [...formData.flashcards, ...newFlashcards];
    updateFormData({ ...formData, flashcards: updatedCards });

    // Expand all imported cards
    const newCardIds = newFlashcards.map(card => card.id);
    setExpandedCards((prev) => new Set([...prev, ...newCardIds]));
  };

  const removeFlashcard = (index: number) => {
    if (formData.flashcards.length <= 2) {
      toast.error("Bộ flashcard cần ít nhất 2 thẻ");
      return;
    }
    const cardId = formData.flashcards[index].id;
    
    showUndoToast("Đã xóa thẻ", () => {
      const restoredCards = [...formData.flashcards];
      restoredCards.splice(index, 0, { ...formData.flashcards[index], id: cardId });
      restoredCards.forEach((card, i) => (card.position = i));
      updateFormData({ ...formData, flashcards: restoredCards });
      setExpandedCards(prev => new Set([...prev, cardId]));
    });

    const updatedCards = formData.flashcards.filter((_, i) => i !== index);
    updatedCards.forEach((card, i) => (card.position = i));
    updateFormData({ ...formData, flashcards: updatedCards });
    setExpandedCards((prev) => {
      const newSet = new Set(prev);
      newSet.delete(cardId);
      return newSet;
    });
    setSelectedCards(selectedCards.filter(i => i !== index).map(i => i > index ? i - 1 : i));
  };

  const toggleCardExpand = (cardId: string) => {
    setExpandedCards((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(cardId)) {
        newSet.delete(cardId);
      } else {
        newSet.add(cardId);
      }
      return newSet;
    });
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

    const updatedCards = [...formData.flashcards];
    const draggedCard = updatedCards[draggedIndex];
    updatedCards.splice(draggedIndex, 1);
    updatedCards.splice(dropIndex, 0, draggedCard);
    updatedCards.forEach((card, i) => (card.position = i));

    updateFormData({ ...formData, flashcards: updatedCards });
    setDraggedIndex(null);
    setDragOverIndex(null);
    
    // Update selected cards indices
    setSelectedCards(selectedCards.map(oldIndex => {
      if (oldIndex === draggedIndex) return dropIndex;
      if (draggedIndex < dropIndex) {
        if (oldIndex > draggedIndex && oldIndex <= dropIndex) return oldIndex - 1;
      } else {
        if (oldIndex >= dropIndex && oldIndex < draggedIndex) return oldIndex + 1;
      }
      return oldIndex;
    }));
    
    toast.success("Đã sắp xếp lại thứ tự thẻ");
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleSaveDraft = () => {
    const draft = {
      data: formData,
      timestamp: new Date().toISOString(),
      saveCount: saveCount + 1
    };
    
    localStorage.setItem('flashcardDraft', JSON.stringify(draft));
    toast.success('Đã lưu nháp thành công');
  };

  const handleSubmit = () => {
    const emptyCards = formData.flashcards.filter(
      (card) => !card.term.trim() || !card.definition.trim()
    );
    if (!formData.title.trim()) {
      toast.error("Vui lòng nhập tiêu đề cho bộ flashcard");
      return;
    }

    if (emptyCards.length > 0) {
      toast.error(
        `Còn ${emptyCards.length} thẻ chưa hoàn thành. Vui lòng kiểm tra lại.`
      );
      return;
    }

    const submitData = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      icon: formData.icon,
      iconColor: formData.iconColor,
      topicId: formData.topicId,
      folderSetId: formData.folderSetId,
      isPublic: formData.isPublic,
      flashcards: formData.flashcards.map((card) => ({
        mediaId: card.mediaId,
        position: card.position,
        term: card.term.trim(),
        definition: card.definition.trim(),
      })),
    };

    console.log("Submit Data:", submitData);
    
    // Clear draft on successful submit
    clearDraft();
    history.clearHistory();
    
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  // Helper functions
  const showUndoToast = (message: string, undoAction: () => void) => {
    toast.custom((t) => (
      <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-xl animate-in slide-in-from-right">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <div>
              <p className="font-medium text-gray-900">{message}</p>
              <p className="text-xs text-gray-500">Hành động có thể hoàn tác</p>
            </div>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              undoAction();
              toast.dismiss(t);
            }}
          >
            Hoàn tác
          </Button>
        </div>
      </div>
    ), {
      duration: 8000,
      position: 'bottom-right'
    });
  };

  // Keyboard shortcuts
  useKeyboardShortcuts({
    onSave: handleSaveDraft,
    onAddCard: addFlashcard,
    onCloseModal: () => {
      setShowImportModal(false);
      setShowIconPicker(false);
    },
    onUndo: handleUndo,
    onRedo: handleRedo,
    onImport: () => setShowImportModal(true)
  });


  // Calculate stats
  const completedCards = formData.flashcards.filter(
    (c) => c.term.trim() && c.definition.trim()
  ).length;
  const totalCards = formData.flashcards.length;
  const incompleteCards = totalCards - completedCards;
  const progress = totalCards > 0 ? (completedCards / totalCards) * 100 : 0;

  const selectedTopic = topics.find((t) => t.id === formData.topicId);
  const selectedFolder = folders.find((f) => f.id === formData.folderSetId);
  
  const SelectedIcon = iconOptions.find(opt => opt.value === formData.icon)?.icon || Book;
  
  // Get unique categories from icon options
  const iconCategories = Array.from(new Set(iconOptions.map(icon => icon.category)));
  
  // Filter icons by selected category
  const filteredIcons = iconOptions.filter(icon => icon.category === selectedIconCategory);

  // Render auto-save status
  const renderAutoSaveStatus = () => (
    <div className="flex items-center gap-2 text-sm">
      {isSaving ? (
        <div className="flex items-center gap-2 text-amber-600 animate-pulse">
          <Loader2 className="w-3 h-3 animate-spin" />
          <span>Đang lưu...</span>
        </div>
      ) : lastSaved ? (
        <div className="flex items-center gap-2 text-green-600">
          <Check className="w-3 h-3" />
          <span>
            Đã lưu
             {/* {formatDistanceToNow(lastSaved, { addSuffix: true, locale: vi })} */}
          </span>
          <Badge variant="outline" className="text-xs">
            {saveCount} lần
          </Badge>
        </div>
      ) : (
        <div className="flex items-center gap-2 text-gray-500">
          <Clock className="w-3 h-3" />
          <span>Chưa lưu</span>
        </div>
      )}
    </div>
  );

  // Render history controls
  const renderHistoryControls = () => (
    <div className="flex items-center gap-1 border border-gray-200 rounded-lg p-1 bg-white">
      <Button
        variant="ghost"
        size="sm"
        onClick={handleUndo}
        disabled={!history.canUndo}
        className="h-8 px-2 hover:bg-gray-100"
        title="Hoàn tác (Ctrl+Z)"
      >
        <Undo className="w-4 h-4" />
      </Button>
      <div className="w-px h-4 bg-gray-200" />
      <Button
        variant="ghost"
        size="sm"
        onClick={handleRedo}
        disabled={!history.canRedo}
        className="h-8 px-2 hover:bg-gray-100"
        title="Làm lại (Ctrl+Shift+Z)"
      >
        <Redo className="w-4 h-4" />
      </Button>
    </div>
  );

  // Handle card selection
  const handleCardSelect = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (e.ctrlKey || e.metaKey) {
      // Ctrl/Cmd click: toggle selection
      setSelectedCards(prev => 
        prev.includes(index) 
          ? prev.filter(i => i !== index)
          : [...prev, index]
      );
    } else if (e.shiftKey) {
      // Shift click: select range
      if (selectedCards.length > 0) {
        const lastSelected = Math.max(...selectedCards);
        const start = Math.min(lastSelected, index);
        const end = Math.max(lastSelected, index);
        const range = Array.from({ length: end - start + 1 }, (_, i) => start + i);
        setSelectedCards(Array.from(new Set([...selectedCards, ...range])));
      } else {
        setSelectedCards([index]);
      }
    } else {
      // Regular click: select single
      setSelectedCards([index]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header Section */}
      <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                className="hover:bg-gray-100 text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Quay lại
              </Button>
              <div className="hidden sm:flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md" style={{ background: formData.iconColor }}>
                  <SelectedIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Home className="w-4 h-4" />
                    <ChevronRight className="w-3 h-3" />
                    <span>Flashcards</span>
                    <ChevronRight className="w-3 h-3" />
                    <span className="font-medium text-gray-900">Tạo mới</span>
                  </div>
                  <p className="text-lg font-semibold text-gray-900 mt-0.5">
                    {formData.title || "Tạo bộ flashcard mới"}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-4">
                {/* Auto-save status */}
                {renderAutoSaveStatus()}
                
                {/* Undo/Redo controls */}
                {renderHistoryControls()}
                
                {/* Progress indicator */}
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {completedCards}/{totalCards} thẻ hoàn thành
                    </p>
                    <div className="w-40 h-1.5 bg-gray-200 rounded-full overflow-hidden mt-1">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500 rounded-full"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                  <Badge
                    variant="secondary"
                    className="font-semibold bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border border-blue-200"
                  >
                    <BookOpen className="w-3 h-3 mr-1" />
                    Bản nháp
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Message */}
        {showSuccess && (
          <div className="mb-6 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 shadow-lg">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-md">
                  <Check className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-green-900">
                    Tạo thành công!
                  </h3>
                  <p className="text-sm text-green-700 mt-1">
                    Bộ flashcard "
                    <span className="font-medium">{formData.title}</span>" đã
                    được tạo và sẵn sàng để sử dụng.
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-green-300 text-green-700 hover:bg-green-50"
                  onClick={() => setShowSuccess(false)}
                >
                  Đóng
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Import Modal */}
        <ImportQuizletModal
          open={showImportModal}
          onOpenChange={setShowImportModal}
          onImport={handleImportFromQuizlet}
        />

        {/* Smart Validation Section */}
        <div className="mb-6">
          <SmartValidation
            flashcards={formData.flashcards}
            onAutoFix={handleAutoFix}
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info Card with Icon Picker */}
            <Card className="border-0 shadow-xl bg-white rounded-2xl overflow-hidden">
              <CardHeader className="pb-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-bold text-gray-900">
                        Thông tin cơ bản
                      </CardTitle>
                      <CardDescription className="text-gray-600">
                        Thiết lập thông tin và giao diện cho bộ flashcard
                      </CardDescription>
                    </div>
                  </div>
                  <Badge className="bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 border border-blue-200 shadow-sm">
                    <Check className="w-3 h-3 mr-1" />
                    Bắt buộc
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-8">
                {/* Icon and Color Selection Section */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-semibold text-gray-900 flex items-center gap-2">
                        <Palette className="w-5 h-5 text-blue-600" />
                        Biểu tượng và màu sắc
                      </Label>
                      <p className="text-sm text-gray-600 mt-1">
                        Tùy chỉnh icon và màu sắc cho bộ flashcard của bạn
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowIconPicker(!showIconPicker)}
                      className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                    >
                      {showIconPicker ? (
                        <>
                          <ChevronDown className="w-4 h-4 mr-2 rotate-180" />
                          Thu gọn
                        </>
                      ) : (
                        <>
                          <LayoutGrid className="w-4 h-4 mr-2" />
                          Chọn biểu tượng
                        </>
                      )}
                    </Button>
                  </div>

                  {/* Current Selection Preview */}
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 rounded-xl border border-blue-100">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg" style={{ background: formData.iconColor }}>
                        <SelectedIcon className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Biểu tượng đã chọn</p>
                        <p className="text-sm text-gray-600">
                          Icon sẽ xuất hiện trên thẻ và trong thư viện
                        </p>
                      </div>
                    </div>
                    <Badge className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-3 py-1">
                      {iconOptions.find(opt => opt.value === formData.icon)?.label}
                    </Badge>
                  </div>

                  {/* Icon Picker */}
                  {showIconPicker && (
                    <div className="space-y-4 animate-in fade-in duration-300">
                      {/* Icon Categories */}
                      <div className="space-y-3">
                        <Label className="text-sm font-medium text-gray-700">
                          Danh mục biểu tượng
                        </Label>
                        <div className="flex flex-wrap gap-2">
                          {iconCategories.map(category => (
                            <button
                              key={category}
                              type="button"
                              onClick={() => setSelectedIconCategory(category)}
                              className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                                selectedIconCategory === category
                                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md'
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 shadow-sm'
                              }`}
                            >
                              <span className="text-sm font-medium">{category}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Icon Grid */}
                      <div className="space-y-3">
                        <Label className="text-sm font-medium text-gray-700">
                          Chọn biểu tượng
                        </Label>
                        <div className="grid grid-cols-5 sm:grid-cols-6 gap-3 p-3 bg-gray-50 rounded-xl">
                          {filteredIcons.map((option) => {
                            const Icon = option.icon;
                            const isSelected = formData.icon === option.value;
                            return (
                              <button
                                key={option.value}
                                type="button"
                                onClick={() => handleInputChange("icon", option.value)}
                                className={`relative p-3 rounded-xl border transition-all duration-200 group ${
                                  isSelected
                                    ? "border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100 shadow-md scale-105"
                                    : "border-gray-200 bg-white hover:border-blue-300 hover:shadow-sm"
                                }`}
                                title={option.label}
                              >
                                <div 
                                  className="w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-2 transition-all group-hover:scale-110" 
                                  style={{ background: formData.iconColor }}
                                >
                                  <Icon className="w-5 h-5 text-white" />
                                </div>
                                <span className="text-xs text-gray-600 truncate block text-center">
                                  {option.label}
                                </span>
                                {isSelected && (
                                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                                    <Check className="w-3 h-3 text-white" />
                                  </div>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Gradient Color Selection */}
                      <div className="space-y-3">
                        <Label className="text-sm font-medium text-gray-700">
                          Màu gradient cho icon
                        </Label>
                        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
                          {gradientOptions.map((gradient) => {
                            const isSelected = formData.iconColor === gradient.value;
                            return (
                              <button
                                key={gradient.value}
                                type="button"
                                onClick={() => handleInputChange("iconColor", gradient.value)}
                                className={`relative aspect-square rounded-xl border-2 transition-all duration-200 hover:scale-105 group ${
                                  isSelected
                                    ? "border-gray-900 shadow-xl scale-105"
                                    : "border-white hover:border-gray-300 shadow-sm hover:shadow-md"
                                }`}
                                style={{ background: gradient.value }}
                                title={gradient.label}
                              >
                                {isSelected && (
                                  <div className="absolute inset-0 bg-black/10 rounded-xl" />
                                )}
                                {isSelected && (
                                  <Check className="absolute inset-0 m-auto w-5 h-5 text-white drop-shadow-lg" />
                                )}
                                <div className={`absolute bottom-0 left-0 right-0 text-[10px] py-1 px-1 rounded-b-xl truncate transition-all ${
                                  isSelected 
                                    ? 'bg-black/80 text-white' 
                                    : 'bg-white/90 backdrop-blur-sm text-gray-800 opacity-0 group-hover:opacity-100'
                                }`}>
                                  {gradient.label}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Title and Description */}
                <div className="space-y-6">
                  {/* Title */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                        <FileText className="w-4 h-4 text-blue-600" />
                        Tiêu đề bộ flashcard
                        <span className="text-red-500">*</span>
                      </Label>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          formData.title.length > 90
                            ? "bg-amber-100 text-amber-800"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {formData.title.length}/100
                      </span>
                    </div>
                    <Input
                      placeholder="Ví dụ: Từ vựng TOEIC cơ bản, Hóa học lớp 12, ..."
                      value={formData.title}
                      onChange={(e) =>
                        handleInputChange("title", e.target.value)
                      }
                      maxLength={100}
                      className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 text-lg placeholder:text-gray-400"
                    />
                    {formData.title.length > 90 && (
                      <p className="text-xs text-amber-600 flex items-center gap-1 animate-pulse">
                        <AlertCircle className="w-3 h-3" />
                        Tiêu đề sắp đạt giới hạn
                      </p>
                    )}
                  </div>

                  {/* Description */}
                  <div className="space-y-3">
                    <Label className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-blue-600" />
                      Mô tả (Tùy chọn)
                    </Label>
                    <Textarea
                      placeholder="Mô tả nội dung, mục tiêu học tập hoặc lưu ý đặc biệt về bộ flashcard này..."
                      value={formData.description}
                      onChange={(e) =>
                        handleInputChange("description", e.target.value)
                      }
                      className="min-h-[120px] resize-none border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 placeholder:text-gray-400"
                    />
                    <p className="text-xs text-gray-500">
                      Mô tả chi tiết giúp người học hiểu rõ hơn về nội dung bộ flashcard
                    </p>
                  </div>
                </div>

                {/* Topic and Folder Selection */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                      <Tag className="w-4 h-4 text-blue-600" />
                      Chủ đề
                    </Label>
                    <div className="relative">
                      <select
                        value={formData.topicId}
                        onChange={(e) =>
                          handleInputChange("topicId", e.target.value)
                        }
                        className="w-full h-12 px-4 pr-10 border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 appearance-none bg-white text-gray-900 hover:border-gray-400 transition-colors"
                      >
                        <option value="">Chọn chủ đề phù hợp</option>
                        {topics.map((topic) => (
                          <option key={topic.id} value={topic.id}>
                            {topic.name}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    </div>
                    {selectedTopic && (
                      <div className="flex items-center gap-2 mt-2 p-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
                        <div
                          className="w-4 h-4 rounded-full shadow-sm"
                          style={{ backgroundColor: selectedTopic.color }}
                        />
                        <span className="text-sm font-medium text-gray-900">
                          {selectedTopic.name}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    <Label className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                      <FolderOpen className="w-4 h-4 text-blue-600" />
                      Thư mục
                    </Label>
                    <div className="relative">
                      <select
                        value={formData.folderSetId}
                        onChange={(e) =>
                          handleInputChange("folderSetId", e.target.value)
                        }
                        className="w-full h-12 px-4 pr-10 border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 appearance-none bg-white text-gray-900 hover:border-gray-400 transition-colors"
                      >
                        <option value="">Chọn thư mục lưu trữ</option>
                        {folders.map((folder) => (
                          <option key={folder.id} value={folder.id}>
                            {folder.name} ({folder.count} sets)
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    </div>
                    {selectedFolder && (
                      <div className="flex items-center gap-2 mt-2 p-2 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200">
                        <FolderOpen className="w-4 h-4 text-gray-600" />
                        <span className="text-sm font-medium text-gray-900">
                          {selectedFolder.name}
                        </span>
                        <Badge variant="outline" className="ml-auto">
                          {selectedFolder.count} sets
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>

                {/* Privacy Settings */}
                <div className="pt-6 border-t border-gray-100">
                  <div className="flex items-center justify-between p-5 bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-xl border border-gray-200">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center">
                          {formData.isPublic ? (
                            <Globe className="w-5 h-5 text-blue-600" />
                          ) : (
                            <Lock className="w-5 h-5 text-gray-600" />
                          )}
                        </div>
                        <div>
                          <Label className="text-base font-semibold text-gray-900">
                            Quyền riêng tư
                          </Label>
                          <div className="flex items-center gap-2 mt-1">
                            {formData.isPublic ? (
                              <Badge className="bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 border border-blue-200">
                                <Globe className="w-3 h-3 mr-1" />
                                Công khai
                              </Badge>
                            ) : (
                              <Badge className="bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 border border-gray-300">
                                <Lock className="w-3 h-3 mr-1" />
                                Riêng tư
                              </Badge>
                            )}
                            <span className="text-xs text-gray-500">
                              {formData.isPublic
                                ? "Ai cũng có thể xem và học"
                                : "Chỉ bạn mới có thể xem"}
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 max-w-lg">
                        {formData.isPublic
                          ? "Mọi người có thể tìm thấy, xem và học bộ flashcard này. Các hình ảnh trong bộ cũng được chia sẻ công khai và có thể được người khác sử dụng. Bạn có thể kiếm được điểm kinh nghiệm khi chia sẻ kiến thức!"
                          : "Chỉ bạn mới có thể xem và học bộ flashcard này. Hoàn toàn riêng tư và an toàn."}
                      </p>
                    </div>
                    <Switch
                      checked={formData.isPublic}
                      onCheckedChange={(checked) =>
                        handleInputChange("isPublic", checked)
                      }
                      className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-600 data-[state=checked]:to-blue-700 h-6 w-12"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Flashcards Section */}
            <div className="space-y-6">
              {/* Section Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Danh sách flashcard ({totalCards})
                  </h2>
                  <p className="text-gray-600 mt-1">
                    Thêm và chỉnh sửa các thẻ học tập. Kéo thả để sắp xếp thứ tự.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <BulkActions
                    onImportCSV={handleBulkImport}
                    onDuplicateCards={handleBulkDuplicate}
                    onDeleteCards={handleBulkDelete}
                    onSelectAll={handleSelectAll}
                    onClearSelection={handleClearSelection}
                    selectedCards={selectedCards}
                    totalCards={totalCards}
                  />
                  <Button
                    onClick={() => setShowImportModal(true)}
                    variant="outline"
                    size="lg"
                    className="border-purple-300 hover:border-purple-400 hover:bg-purple-50 text-purple-700 shadow-sm"
                  >
                    <Import className="w-5 h-5 mr-2" />
                    Import Quizlet
                  </Button>
                  <Button
                    onClick={addFlashcard}
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Thêm thẻ mới
                  </Button>
                </div>
              </div>

              {/* Progress Indicator */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl flex items-center justify-center">
                      <Zap className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Tiến độ hoàn thành</h3>
                      <p className="text-sm text-gray-600">Theo dõi quá trình tạo flashcard</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-blue-600">
                      {completedCards}/{totalCards}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">thẻ hoàn thành</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Tiến độ</span>
                    <span className="font-semibold">{Math.round(progress)}%</span>
                  </div>
                  <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 transition-all duration-700 rounded-full"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  {incompleteCards > 0 && (
                    <div className="flex items-center gap-2 mt-3 p-3 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-200">
                      <AlertCircle className="w-4 h-4 text-amber-600" />
                      <p className="text-sm text-amber-800">
                        <span className="font-semibold">{incompleteCards} thẻ</span> chưa hoàn thành. 
                        Vui lòng điền đầy đủ thông tin trước khi lưu.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Flashcards List */}
              <div className="space-y-4">
                {formData.flashcards.map((card, index) => (
                  <div
                    key={card.id}
                    draggable
                    onDragStart={() => handleDragStart(index)}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDrop={(e) => handleDrop(e, index)}
                    onDragEnd={handleDragEnd}
                    className={`relative transition-all duration-300 ${
                      draggedIndex === index ? "opacity-40 scale-[0.98] blur-sm" : ""
                    } ${dragOverIndex === index ? "scale-[1.02] ring-2 ring-blue-500 ring-offset-2" : ""}`}
                  >
                    <Card
                      className={`border-2 overflow-hidden cursor-move hover:shadow-xl transition-all duration-300 ${
                        dragOverIndex === index
                          ? "border-blue-500 shadow-2xl"
                          : card.term && card.definition
                          ? "border-green-200 shadow-lg"
                          : "border-gray-200 hover:border-gray-300 shadow-md"
                      } ${selectedCards.includes(index) ? 'ring-2 ring-blue-400 ring-offset-1' : ''}`}
                    >
                      {/* Card Header */}
                      <div
                        className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200 cursor-pointer hover:from-gray-100 hover:to-gray-200 transition-all"
                        onClick={(e) => handleCardSelect(index, e)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={selectedCards.includes(index)}
                                onChange={(e) => {
                                  e.stopPropagation();
                                  handleCardSelect(index, e as any);
                                }}
                                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                              />
                              <GripVertical className="w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors cursor-move" />
                            </div>
                            <Badge
                              variant="outline"
                              className={`font-semibold text-sm px-3 py-1.5 ${
                                card.term && card.definition
                                  ? "border-green-300 bg-gradient-to-r from-green-50 to-emerald-50 text-green-700"
                                  : "border-gray-300 bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700"
                              }`}
                            >
                              <div className="w-2 h-2 rounded-full bg-current mr-2 opacity-60" />
                              Thẻ #{index + 1}
                            </Badge>
                            {card.term && (
                              <span className="text-sm font-medium text-gray-900 truncate max-w-xs">
                                {card.term}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-3">
                            {card.mediaPreview && (
                              <Badge className="bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 border border-blue-200 text-xs">
                                <ImageIcon className="w-3 h-3 mr-1" />
                                Có ảnh
                              </Badge>
                            )}
                            {card.term && card.definition && (
                              <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1 text-xs shadow-sm">
                                <Check className="w-3 h-3 mr-1" />
                                Hoàn thành
                              </Badge>
                            )}
                            <ChevronDown
                              className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                                expandedCards.has(card.id) ? "rotate-180" : ""
                              }`}
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleCardExpand(card.id);
                              }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Expandable Content */}
                      {expandedCards.has(card.id) && (
                        <CardContent className="p-6 space-y-6 animate-in fade-in duration-300">
                          {/* Term and Definition */}
                          <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-3">
                              <Label className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                Thuật ngữ (Term)
                                <span className="text-red-500">*</span>
                              </Label>
                              <Textarea
                                placeholder="Nhập thuật ngữ, từ khóa hoặc câu hỏi..."
                                value={card.term}
                                onChange={(e) =>
                                  handleFlashcardChange(
                                    index,
                                    "term",
                                    e.target.value
                                  )
                                }
                                className="min-h-[140px] resize-none border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 text-lg placeholder:text-gray-400"
                                rows={3}
                              />
                              {!card.term.trim() && (
                                <div className="flex items-center gap-2 p-3 bg-gradient-to-r from-red-50 to-red-100 rounded-lg border border-red-200">
                                  <AlertCircle className="w-4 h-4 text-red-600" />
                                  <p className="text-sm text-red-700">
                                    Vui lòng nhập thuật ngữ cho thẻ này
                                  </p>
                                </div>
                              )}
                            </div>

                            <div className="space-y-3">
                              <Label className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                Định nghĩa (Definition)
                                <span className="text-red-500">*</span>
                              </Label>
                              <Textarea
                                placeholder="Nhập định nghĩa, giải thích hoặc câu trả lời..."
                                value={card.definition}
                                onChange={(e) =>
                                  handleFlashcardChange(
                                    index,
                                    "definition",
                                    e.target.value
                                  )
                                }
                                className="min-h-[140px] resize-none border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 text-lg placeholder:text-gray-400"
                                rows={3}
                              />
                              {!card.definition.trim() && (
                                <div className="flex items-center gap-2 p-3 bg-gradient-to-r from-red-50 to-red-100 rounded-lg border border-red-200">
                                  <AlertCircle className="w-4 h-4 text-red-600" />
                                  <p className="text-sm text-red-700">
                                    Vui lòng nhập định nghĩa cho thẻ này
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Media Upload */}
                          <div className="space-y-3">
                            <Label className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                              <ImageIcon className="w-4 h-4 text-purple-600" />
                              Hình ảnh minh họa
                              <Badge variant="outline" className="text-xs text-gray-500 font-normal ml-2">
                                Tùy chọn
                              </Badge>
                            </Label>
                            {card.mediaPreview ? (
                              <div className="relative group">
                                <div className="border-2 border-gray-200 rounded-xl overflow-hidden shadow-lg transition-all duration-300 group-hover:shadow-2xl">
                                  <img
                                    src={card.mediaPreview}
                                    alt="Preview"
                                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                                  />
                                </div>
                                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg"
                                    onClick={() =>
                                      fileInputRefs.current[card.id]?.click()
                                    }
                                  >
                                    <ImageIcon className="w-4 h-4 mr-2" />
                                    Thay ảnh
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="bg-white/90 backdrop-blur-sm hover:bg-red-50 hover:text-red-600 shadow-lg"
                                    onClick={() => {
                                      handleFlashcardChange(
                                        index,
                                        "mediaId",
                                        null
                                      );
                                      handleFlashcardChange(
                                        index,
                                        "mediaPreview",
                                        null
                                      );
                                    }}
                                  >
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Xóa
                                  </Button>
                                </div>
                              </div>
                            ) : (
                              <div
                                className="border-3 border-dashed border-gray-300 rounded-2xl p-8 hover:border-blue-400 hover:bg-blue-50/50 transition-all duration-300 cursor-pointer group"
                                onClick={() =>
                                  fileInputRefs.current[card.id]?.click()
                                }
                              >
                                <div className="flex flex-col items-center justify-center gap-4">
                                  <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                    <Upload className="w-8 h-8 text-blue-600" />
                                  </div>
                                  <div className="text-center">
                                    <p className="text-lg font-semibold text-gray-900 mb-1">
                                      Tải ảnh lên
                                    </p>
                                    <p className="text-sm text-gray-600">
                                      Kéo thả hoặc click để chọn file ảnh
                                    </p>
                                    <p className="text-xs text-gray-400 mt-2">
                                      Hỗ trợ: PNG, JPG, GIF • Tối đa 5MB
                                    </p>
                                  </div>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="mt-2 border-blue-300 text-blue-600 hover:bg-blue-50"
                                  >
                                    <ImageIcon className="w-4 h-4 mr-2" />
                                    Chọn từ thư viện
                                  </Button>
                                </div>
                              </div>
                            )}
                            <input
                              ref={(el: HTMLInputElement | null) => {
                                fileInputRefs.current[card.id] = el;
                              }}
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleImageUpload(index, file);
                              }}
                            />
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                            <div className="text-sm text-gray-500 flex items-center gap-2">
                              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                                <span className="font-semibold text-gray-700">#{index + 1}</span>
                              </div>
                              <div>
                                <span className="font-medium text-gray-700">Thẻ {index + 1}</span>
                                <span className="mx-2">•</span>
                                <span>{card.mediaPreview ? "Có ảnh minh họa" : "Không có ảnh"}</span>
                                <span className="mx-2">•</span>
                                <span>{card.term.length} ký tự</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  // Duplicate this card
                                  const newId = `duplicate-${Date.now()}`;
                                  const newCard: Flashcard = {
                                    ...card,
                                    id: newId,
                                    term: `${card.term} (Bản sao)`,
                                    position: formData.flashcards.length,
                                  };
                                  const updatedCards = [...formData.flashcards, newCard];
                                  updateFormData({ ...formData, flashcards: updatedCards });
                                  toast.success('Đã sao chép thẻ');
                                }}
                                className="text-gray-500 hover:text-blue-600 hover:bg-blue-50 px-4"
                              >
                                <Copy className="w-4 h-4 mr-2" />
                                Sao chép
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeFlashcard(index)}
                                disabled={formData.flashcards.length <= 2}
                                className="text-gray-500 hover:text-red-600 hover:bg-red-50 px-4"
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Xóa thẻ
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      )}
                    </Card>
                  </div>
                ))}
              </div>

              {/* Add Card Button */}
              <Button
                onClick={addFlashcard}
                variant="outline"
                className="w-full h-16 border-3 border-dashed border-gray-300 hover:border-blue-400 hover:bg-blue-50/50 text-gray-700 hover:text-blue-700 transition-all duration-300 rounded-2xl group"
              >
                <div className="flex flex-col items-center justify-center gap-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Plus className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold">Thêm thẻ mới (Ctrl+Enter)</p>
                    <p className="text-xs text-gray-500 mt-1">Bấm để thêm thẻ học tập mới</p>
                  </div>
                </div>
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Summary Card */}
            <Card className="border-0 shadow-2xl bg-white rounded-2xl sticky top-24">
              <CardHeader className="pb-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                <CardTitle className="text-lg font-bold flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
                    <Eye className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-gray-900">Tổng quan & Hành động</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                {/* Stats */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50/80 to-indigo-50/80 rounded-xl border border-blue-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center shadow-sm">
                        <FileText className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Tổng số thẻ</p>
                        <p className="text-xs text-gray-500">Đang có trong bộ</p>
                      </div>
                    </div>
                    <Badge className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-3 py-1.5 text-sm shadow-lg">
                      {totalCards} thẻ
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50/80 to-emerald-50/80 rounded-xl border border-green-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center shadow-sm">
                        <Check className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Đã hoàn thành</p>
                        <p className="text-xs text-gray-500">Thẻ đã điền đủ</p>
                      </div>
                    </div>
                    <Badge className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-3 py-1.5 text-sm shadow-lg">
                      {completedCards} thẻ
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-amber-50/80 to-orange-50/80 rounded-xl border border-amber-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-amber-100 to-amber-200 rounded-lg flex items-center justify-center shadow-sm">
                        <AlertCircle className="w-5 h-5 text-amber-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Chưa hoàn thành</p>
                        <p className="text-xs text-gray-500">Cần bổ sung</p>
                      </div>
                    </div>
                    <Badge className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-3 py-1.5 text-sm shadow-lg">
                      {incompleteCards} thẻ
                    </Badge>
                  </div>
                </div>

                {/* History Stats */}
                <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-gray-700">Lịch sử chỉnh sửa</span>
                    <Badge variant="outline" className="text-xs">
                      {history.currentPosition}/{history.historySize}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleUndo}
                      disabled={!history.canUndo}
                      className="flex-1"
                    >
                      <Undo className="w-4 h-4 mr-2" />
                      Hoàn tác
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleRedo}
                      disabled={!history.canRedo}
                      className="flex-1"
                    >
                      <Redo className="w-4 h-4 mr-2" />
                      Làm lại
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    Ctrl+Z / Ctrl+Shift+Z
                  </p>
                </div>

                {/* Selected Info */}
                {(selectedTopic || selectedFolder) && (
                  <div className="pt-4 border-t border-gray-100 space-y-4">
                    <h4 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      Thông tin đã chọn
                    </h4>
                    <div className="space-y-3">
                      {selectedTopic && (
                        <div className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200">
                          <div className="flex items-center gap-3">
                            <div
                              className="w-4 h-4 rounded-full shadow-sm"
                              style={{ backgroundColor: selectedTopic.color }}
                            />
                            <span className="text-sm font-medium text-gray-700">Chủ đề</span>
                          </div>
                          <Badge className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700">
                            {selectedTopic.name}
                          </Badge>
                        </div>
                      )}
                      {selectedFolder && (
                        <div className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200">
                          <div className="flex items-center gap-3">
                            <FolderOpen className="w-4 h-4 text-gray-600" />
                            <span className="text-sm font-medium text-gray-700">Thư mục</span>
                          </div>
                          <Badge className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700">
                            {selectedFolder.name}
                          </Badge>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="pt-4 border-t border-gray-100 space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Button
                      onClick={handleSaveDraft}
                      variant="outline"
                      size="sm"
                      className="flex-1"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Lưu nháp (Ctrl+S)
                    </Button>
                    <Button
                      onClick={clearDraft}
                      variant="ghost"
                      size="sm"
                      title="Xóa bản nháp"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  <Button
                    onClick={handleSubmit}
                    disabled={!formData.title.trim() || incompleteCards > 0}
                    size="lg"
                    className="w-full h-16 bg-gradient-to-r from-blue-600 via-blue-600 to-blue-700 hover:from-blue-700 hover:via-blue-700 hover:to-blue-800 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-xl group"
                  >
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                        <Save className="w-4 h-4 text-white" />
                      </div>
                      <div className="text-left">
                        <p className="font-bold text-white">Tạo bộ flashcard</p>
                        <p className="text-xs text-white/80">Lưu và công bố bộ học</p>
                      </div>
                    </div>
                  </Button>

                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      variant="outline"
                      size="lg"
                      className="h-12 border-gray-300 hover:bg-gray-50 hover:border-gray-400 rounded-lg"
                      onClick={() => {
                        // Export function
                        toast.info('Tính năng export đang được phát triển');
                      }}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                    <Button
                      variant="ghost"
                      size="lg"
                      className="h-12 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
                    >
                      Hủy bỏ
                    </Button>
                  </div>
                </div>

                {/* Validation Message */}
                {incompleteCards > 0 && (
                  <div className="p-4 bg-gradient-to-r from-amber-50/90 to-orange-50/90 border border-amber-200 rounded-xl shadow-sm">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-amber-900 mb-1">
                          Chưa sẵn sàng để tạo
                        </p>
                        <p className="text-xs text-amber-800">
                          Bạn cần hoàn thành tất cả <span className="font-bold">{incompleteCards} thẻ</span> còn thiếu.
                          Hãy kiểm tra lại các thẻ đang mở.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Tips Card */}
            <Card className="border-0 shadow-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-3 text-lg">
                      Mẹo tạo flashcard hiệu quả
                    </h4>
                    <ul className="space-y-3 text-sm text-gray-700">
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                        <div>
                          <span className="font-semibold">Thuật ngữ ngắn gọn:</span>
                          <span className="text-gray-600 ml-1">Sử dụng từ khóa rõ ràng, dễ nhớ</span>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                        <div>
                          <span className="font-semibold">Hình ảnh minh họa:</span>
                          <span className="text-gray-600 ml-1">Tăng 70% khả năng ghi nhớ với ảnh</span>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                        <div>
                          <span className="font-semibold">Phím tắt hữu ích:</span>
                          <span className="text-gray-600 ml-1">Ctrl+S: Lưu, Ctrl+Enter: Thêm thẻ</span>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                        <div>
                          <span className="font-semibold">Chọn nhiều thẻ:</span>
                          <span className="text-gray-600 ml-1">Giữ Ctrl/Cmd để chọn nhiều thẻ cùng lúc</span>
                        </div>
                      </li>
                    </ul>
                    <div className="mt-4 pt-4 border-t border-blue-200">
                      <p className="text-xs text-gray-600">
                        <span className="font-semibold">Lưu ý:</span> Mỗi bộ flashcard có thể có tối đa 200 thẻ và tối đa 10MB cho mỗi ảnh.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Preview Card */}
            <Card className="border-0 shadow-2xl bg-white rounded-2xl">
              <CardHeader className="pb-4 border-b border-gray-100">
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <Eye className="w-5 h-5 text-blue-600" />
                  Xem trước
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center justify-center text-center space-y-4 p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">
                  <div className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-xl" style={{ background: formData.iconColor }}>
                    <SelectedIcon className="w-10 h-10 text-white" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-bold text-xl text-gray-900">
                      {formData.title || "Tên bộ flashcard"}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {formData.description || "Mô tả bộ flashcard sẽ hiển thị tại đây..."}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge
                      variant="outline"
                      className="bg-white/80 backdrop-blur-sm text-xs px-3 py-1"
                    >
                      <BookOpen className="w-3 h-3 mr-1" />
                      {totalCards} thẻ
                    </Badge>
                    {selectedTopic && (
                      <Badge
                        variant="outline"
                        className="bg-white/80 backdrop-blur-sm text-xs px-3 py-1"
                      >
                        <div
                          className="w-2 h-2 rounded-full mr-1"
                          style={{ backgroundColor: selectedTopic.color }}
                        />
                        {selectedTopic.name}
                      </Badge>
                    )}
                  </div>
                  <div className="text-xs text-gray-500 pt-2 border-t border-gray-200 w-full">
                    <p>Icon và màu sắc đã được áp dụng</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Keyboard Shortcuts Helper */}
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          variant="outline"
          size="sm"
          className="bg-white/90 backdrop-blur-sm shadow-lg border-gray-300 hover:bg-white"
          onClick={() => {
            toast.info('Phím tắt: Ctrl+S (Lưu), Ctrl+Enter (Thêm thẻ), Ctrl+Z (Hoàn tác)', {
              duration: 5000,
              position: 'bottom-right'
            });
          }}
          title="Xem phím tắt"
        >
          <Keyboard className="w-4 h-4 mr-2" />
          Phím tắt
        </Button>
      </div>
    </div>
  );
}