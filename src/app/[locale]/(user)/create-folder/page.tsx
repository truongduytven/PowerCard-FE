// "use client";

// import React, { useState } from "react";
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
// import {
//   BookOpen,
//   Plus,
//   X,
//   Search,
//   Check,
//   Sparkles,
//   Book,
//   GraduationCap,
//   Brain,
//   Lightbulb,
//   Star,
//   BookMarked,
//   Library,
//   Trophy,
//   Target,
//   Zap,
//   Flame,
//   Award,
//   GripVertical,
//   FolderPlus,
//   Palette,
//   LayoutGrid,
//   ArrowLeft,
// } from "lucide-react";

// // Types
// interface StudySet {
//   id: string;
//   title: string;
//   cardCount: number;
//   category: string;
//   lastModified: string;
// }

// interface IconOption {
//   value: string;
//   icon: any;
//   label: string;
// }

// interface FormData {
//   title: string;
//   description: string;
//   icon: string;
//   iconGradient: string;
//   studySets: string[];
// }

// // Mock data với thông tin phong phú hơn
// const availableStudySets: StudySet[] = [
//   {
//     id: "1",
//     title: "Tiếng Anh Giao Tiếp Cơ Bản",
//     cardCount: 120,
//     category: "Ngôn ngữ",
//     lastModified: "2 ngày trước",
//   },
//   {
//     id: "2",
//     title: "Toán Học Lớp 10: Đại Số & Hình Học",
//     cardCount: 85,
//     category: "Toán học",
//     lastModified: "1 tuần trước",
//   },
//   {
//     id: "3",
//     title: "Lịch Sử Việt Nam 1858-1945",
//     cardCount: 75,
//     category: "Lịch sử",
//     lastModified: "3 ngày trước",
//   },
//   {
//     id: "4",
//     title: "Vật Lý Đại Cương: Cơ Học & Nhiệt",
//     cardCount: 95,
//     category: "Khoa học",
//     lastModified: "5 ngày trước",
//   },
//   {
//     id: "5",
//     title: "Hóa Học Hữu Cơ Cơ Bản",
//     cardCount: 65,
//     category: "Khoa học",
//     lastModified: "1 ngày trước",
//   },
//   {
//     id: "6",
//     title: "Sinh Học Tế Bào & Di Truyền",
//     cardCount: 110,
//     category: "Khoa học",
//     lastModified: "4 ngày trước",
//   },
//   {
//     id: "7",
//     title: "Lập trình JavaScript Nâng Cao",
//     cardCount: 150,
//     category: "Công nghệ",
//     lastModified: "Hôm nay",
//   },
//   {
//     id: "8",
//     title: "Kinh Tế Vi Mô Căn Bản",
//     cardCount: 80,
//     category: "Kinh tế",
//     lastModified: "2 tuần trước",
//   },
// ];

// const iconOptions: IconOption[] = [
//   { value: "book", icon: Book, label: "Sách" },
//   { value: "book-open", icon: BookOpen, label: "Sách Mở" },
//   { value: "book-marked", icon: BookMarked, label: "Sách Đánh Dấu" },
//   { value: "library", icon: Library, label: "Thư Viện" },
//   { value: "graduation-cap", icon: GraduationCap, label: "Tốt Nghiệp" },
//   { value: "brain", icon: Brain, label: "Não Bộ" },
//   { value: "lightbulb", icon: Lightbulb, label: "Ý Tưởng" },
//   { value: "star", icon: Star, label: "Ngôi Sao" },
//   { value: "trophy", icon: Trophy, label: "Cúp" },
//   { value: "target", icon: Target, label: "Mục Tiêu" },
//   { value: "zap", icon: Zap, label: "Năng Lượng" },
//   { value: "flame", icon: Flame, label: "Lửa" },
//   { value: "award", icon: Award, label: "Huy Chương" },
// ];

// // Gradient options cho icon
// const iconGradientOptions = [
//   {
//     value: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//     label: "Tím",
//     preview: "from-purple-600 to-pink-500"
//   },
//   {
//     value: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
//     label: "Hồng",
//     preview: "from-pink-400 to-red-500"
//   },
//   {
//     value: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
//     label: "Xanh Dương",
//     preview: "from-blue-400 to-cyan-400"
//   },
//   {
//     value: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
//     label: "Xanh Lá",
//     preview: "from-green-400 to-teal-300"
//   },
//   {
//     value: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
//     label: "Cam Hồng",
//     preview: "from-pink-500 to-yellow-400"
//   },
//   {
//     value: "linear-gradient(135deg, #30cfd0 0%, #330867 100%)",
//     label: "Xanh Đậm",
//     preview: "from-cyan-400 to-indigo-900"
//   },
//   {
//     value: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
//     label: "Pastel",
//     preview: "from-cyan-100 to-pink-100"
//   },
//   {
//     value: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
//     label: "Cam Nhạt",
//     preview: "from-orange-100 to-orange-300"
//   },
//   {
//     value: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)",
//     label: "Đỏ Hồng",
//     preview: "from-red-300 to-orange-200"
//   },
//   {
//     value: "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
//     label: "Tím Nhạt",
//     preview: "from-purple-300 to-pink-200"
//   },
//   {
//     value: "linear-gradient(135deg, #fad0c4 0%, #ffd1ff 100%)",
//     label: "Hồng Cam",
//     preview: "from-orange-100 to-pink-200"
//   },
//   {
//     value: "linear-gradient(135deg, #ffd1ff 0%, #fad0c4 100%)",
//     label: "Hồng Đảo Ngược",
//     preview: "from-pink-200 to-orange-100"
//   },
//   {
//     value: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
//     label: "Đỏ Pastel",
//     preview: "from-red-300 to-pink-300"
//   },
//   {
//     value: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
//     label: "Vàng Cam",
//     preview: "from-yellow-300 to-orange-300"
//   },
//   {
//     value: "linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)",
//     label: "Hồng Xanh",
//     preview: "from-pink-300 to-blue-300"
//   },
// ];

// const backgroundOptions = [
//   {
//     value: "linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)",
//     label: "Xanh Nhạt",
//   },
//   {
//     value: "linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 100%)",
//     label: "Tím Nhạt",
//   },
//   {
//     value: "linear-gradient(135deg, #FCE7F3 0%, #FBCFE8 100%)",
//     label: "Hồng Nhạt",
//   },
//   {
//     value: "linear-gradient(135deg, #FEF2F2 0%, #FECACA 100%)",
//     label: "Đỏ Nhạt",
//   },
//   {
//     value: "linear-gradient(135deg, #FFF7ED 0%, #FED7AA 100%)",
//     label: "Cam Nhạt",
//   },
//   {
//     value: "linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)",
//     label: "Xanh Lá Nhạt",
//   },
//   {
//     value: "linear-gradient(135deg, #F0FDFA 0%, #CCFBF1 100%)",
//     label: "Ngọc Nhạt",
//   },
//   {
//     value: "linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 100%)",
//     label: "Chàm Nhạt",
//   },
//   {
//     value: "linear-gradient(135deg, #FFF1F2 0%, #FFE4E6 100%)",
//     label: "Hồng Phấn",
//   },
//   {
//     value: "linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%)",
//     label: "Xanh Mint",
//   },
// ];

// export default function CreateFolderPage() {
//   const [formData, setFormData] = useState<FormData>({
//     title: "",
//     description: "",
//     icon: "book",
//     iconGradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//     studySets: [],
//   });

//   const [searchQuery, setSearchQuery] = useState<string>("");
//   const [showSuccess, setShowSuccess] = useState<boolean>(false);
//   const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
//   const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

//   const handleInputChange = (field: keyof FormData, value: string) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//   };

//   const toggleStudySet = (setId: string) => {
//     setFormData((prev) => ({
//       ...prev,
//       studySets: prev.studySets.includes(setId)
//         ? prev.studySets.filter((id) => id !== setId)
//         : [...prev.studySets, setId],
//     }));
//   };

//   const removeStudySet = (setId: string) => {
//     setFormData((prev) => ({
//       ...prev,
//       studySets: prev.studySets.filter((id) => id !== setId),
//     }));
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

//     const newStudySets = [...formData.studySets];
//     const draggedItem = newStudySets[draggedIndex];
//     newStudySets.splice(draggedIndex, 1);
//     newStudySets.splice(dropIndex, 0, draggedItem);

//     setFormData((prev) => ({ ...prev, studySets: newStudySets }));
//     setDraggedIndex(null);
//     setDragOverIndex(null);
//   };

//   const handleDragEnd = () => {
//     setDraggedIndex(null);
//     setDragOverIndex(null);
//   };

//   const handleSubmit = () => {
//     if (!formData.title || formData.studySets.length === 0) return;

//     console.log("Form Data:", formData);
//     setShowSuccess(true);
//     setTimeout(() => setShowSuccess(false), 3000);
//   };

//   const filteredStudySets = availableStudySets.filter(
//     (set) =>
//       set.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       set.category.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const selectedStudySets = formData.studySets
//     .map((id) => availableStudySets.find((set) => set.id === id))
//     .filter((set): set is StudySet => set !== undefined);

//   const SelectedIcon =
//     iconOptions.find((opt) => opt.value === formData.icon)?.icon || Book;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 p-4 md:p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header với Breadcrumb */}
//         <div className="mb-8">
//           <Button
//             variant="ghost"
//             className="mb-6 -ml-2 text-gray-600 hover:text-gray-900"
//           >
//             <ArrowLeft className="w-4 h-4 mr-2" />
//             Quay lại
//           </Button>

//           <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//             <div>
//               <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
//                 Tạo Folder Mới
//               </h1>
//               <p className="text-gray-600 max-w-2xl">
//                 Tổ chức các bộ học tập của bạn một cách khoa học. Thêm mô tả,
//                 chọn biểu tượng và tùy chỉnh giao diện.
//               </p>
//             </div>

//             <div className="flex items-center gap-3">
//               <div
//                 className="w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300"
//               >
//                 <div
//                   className="w-12 h-12 rounded-xl flex items-center justify-center"
//                   style={{ background: formData.iconGradient }}
//                 >
//                   <SelectedIcon className="w-6 h-6 text-white" />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Success Message */}
//         {showSuccess && (
//           <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl shadow-lg animate-in fade-in slide-in-from-top-2 duration-300">
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
//                 <Check className="w-5 h-5 text-green-600" />
//               </div>
//               <div>
//                 <p className="font-semibold text-green-900">
//                   Folder đã được tạo thành công!
//                 </p>
//                 <p className="text-sm text-green-700">
//                   Bạn có thể xem folder trong thư viện học tập.
//                 </p>
//               </div>
//             </div>
//           </div>
//         )}

//         <div className="grid lg:grid-cols-3 gap-8">
//           {/* Left Column - Form */}
//           <div className="lg:col-span-2 space-y-8">
//             {/* Basic Info Card */}
//             <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
//               <CardHeader className="pb-3">
//                 <div className="flex items-center gap-3">
//                   <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
//                     <Sparkles className="w-5 h-5 text-blue-600" />
//                   </div>
//                   <div>
//                     <CardTitle className="text-xl">Thông Tin Folder</CardTitle>
//                     <CardDescription>
//                       Đặt tên và mô tả cho folder của bạn
//                     </CardDescription>
//                   </div>
//                 </div>
//               </CardHeader>
//               <CardContent className="space-y-6 pt-4">
//                 <div className="space-y-3">
//                   <div className="flex items-center justify-between">
//                     <Label
//                       htmlFor="title"
//                       className="text-sm font-semibold text-gray-700"
//                     >
//                       Tên Folder
//                     </Label>
//                     <span className="text-xs text-gray-500">
//                       {formData.title.length}/60 ký tự
//                     </span>
//                   </div>
//                   <Input
//                     id="title"
//                     placeholder="Ví dụ: Ôn thi TOEIC 800+"
//                     value={formData.title}
//                     onChange={(e) => handleInputChange("title", e.target.value)}
//                     maxLength={60}
//                     className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
//                   />
//                 </div>

//                 <div className="space-y-3">
//                   <div className="flex items-center justify-between">
//                     <Label
//                       htmlFor="description"
//                       className="text-sm font-semibold text-gray-700"
//                     >
//                       Mô Tả (Tùy chọn)
//                     </Label>
//                     <span className="text-xs text-gray-500">
//                       {formData.description.length}/200 ký tự
//                     </span>
//                   </div>
//                   <Textarea
//                     id="description"
//                     placeholder="Mô tả nội dung, mục tiêu học tập hoặc ghi chú về folder này..."
//                     value={formData.description}
//                     onChange={(e) =>
//                       handleInputChange("description", e.target.value)
//                     }
//                     maxLength={200}
//                     className="min-h-[120px] resize-none border-gray-300 focus:border-blue-500 focus:ring-blue-500"
//                   />
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Study Sets Selection */}
//             <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
//               <CardHeader className="pb-3">
//                 <div className="flex items-center gap-3">
//                   <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
//                     <LayoutGrid className="w-5 h-5 text-purple-600" />
//                   </div>
//                   <div>
//                     <CardTitle className="text-xl">Chọn Study Sets</CardTitle>
//                     <CardDescription>
//                       Tìm và chọn các bộ flashcard để thêm vào folder
//                     </CardDescription>
//                   </div>
//                 </div>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-6">
//                   {/* Search Bar */}
//                   <div className="relative group">
//                     <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-blue-500 transition-colors" />
//                     <Input
//                       placeholder="Tìm kiếm theo tên hoặc thể loại..."
//                       value={searchQuery}
//                       onChange={(e) => setSearchQuery(e.target.value)}
//                       className="pl-11 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
//                     />
//                     {searchQuery && (
//                       <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">
//                         {filteredStudySets.length} kết quả
//                       </span>
//                     )}
//                   </div>

//                   {/* Study Sets Grid */}
//                   <div>
//                     <div className="flex items-center justify-between mb-4">
//                       <h3 className="font-medium text-gray-900">
//                         Study Sets có sẵn
//                       </h3>
//                       <Badge variant="outline" className="text-xs">
//                         {availableStudySets.length} sets
//                       </Badge>
//                     </div>

//                     <div className="grid md:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto pr-3 custom-scrollbar">
//                       {filteredStudySets.length > 0 ? (
//                         filteredStudySets.map((set) => {
//                           const isSelected = formData.studySets.includes(
//                             set.id
//                           );
//                           return (
//                             <button
//                               key={set.id}
//                               type="button"
//                               onClick={() => toggleStudySet(set.id)}
//                               className={`p-4 rounded-xl border text-left transition-all duration-200 ${
//                                 isSelected
//                                   ? "border-blue-500 bg-blue-50 shadow-sm"
//                                   : "border-gray-200 hover:border-blue-300 hover:shadow-sm"
//                               }`}
//                             >
//                               <div className="flex items-start gap-4">
//                                 <div
//                                   className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 transition-all ${
//                                     isSelected
//                                       ? "bg-gradient-to-br from-blue-500 to-purple-600 shadow-md"
//                                       : "bg-gray-100 group-hover:bg-blue-100"
//                                   }`}
//                                 >
//                                   {isSelected ? (
//                                     <Check className="w-6 h-6 text-white" />
//                                   ) : (
//                                     <BookOpen className="w-6 h-6 text-gray-600" />
//                                   )}
//                                 </div>
//                                 <div className="flex-1 min-w-0">
//                                   <p
//                                     className={`font-medium truncate mb-1 ${
//                                       isSelected
//                                         ? "text-blue-900"
//                                         : "text-gray-900"
//                                     }`}
//                                   >
//                                     {set.title}
//                                   </p>
//                                   <div className="flex items-center gap-3 text-sm text-gray-600">
//                                     <span>{set.cardCount} thẻ</span>
//                                     <span>•</span>
//                                     <Badge
//                                       variant="secondary"
//                                       className="text-xs font-normal"
//                                     >
//                                       {set.category}
//                                     </Badge>
//                                     <span>•</span>
//                                     <span className="text-xs">
//                                       {set.lastModified}
//                                     </span>
//                                   </div>
//                                 </div>
//                               </div>
//                             </button>
//                           );
//                         })
//                       ) : (
//                         <div className="col-span-2 py-12 text-center">
//                           <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
//                           <p className="text-gray-500">
//                             Không tìm thấy study sets phù hợp
//                           </p>
//                           <p className="text-sm text-gray-400 mt-1">
//                             Thử tìm kiếm với từ khóa khác
//                           </p>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Selected Study Sets with Drag & Drop */}
//             {selectedStudySets.length > 0 && (
//               <Card className="border border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-sm">
//                 <CardHeader className="pb-3">
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-3">
//                       <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
//                         <GripVertical className="w-5 h-5 text-blue-600" />
//                       </div>
//                       <div>
//                         <CardTitle className="text-xl">
//                           Study Sets Đã Chọn
//                         </CardTitle>
//                         <CardDescription className="text-blue-700">
//                           Kéo thả để sắp xếp thứ tự hiển thị
//                         </CardDescription>
//                       </div>
//                     </div>
//                     <Badge className="bg-blue-600 hover:bg-blue-700">
//                       {selectedStudySets.length} sets
//                     </Badge>
//                   </div>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="space-y-3">
//                     {selectedStudySets.map((set, index) => (
//                       <div
//                         key={set.id}
//                         draggable
//                         onDragStart={() => handleDragStart(index)}
//                         onDragOver={(e) => handleDragOver(e, index)}
//                         onDrop={(e) => handleDrop(e, index)}
//                         onDragEnd={handleDragEnd}
//                         className={`group flex items-center gap-4 p-4 bg-white rounded-xl border border-blue-100 cursor-move transition-all duration-200 ${
//                           draggedIndex === index ? "opacity-40 scale-95" : ""
//                         } ${
//                           dragOverIndex === index
//                             ? "border-blue-500 shadow-lg scale-[1.02]"
//                             : "hover:shadow-md hover:border-blue-300"
//                         }`}
//                       >
//                         <div className="flex items-center gap-2">
//                           <GripVertical className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
//                           <span className="text-sm font-medium text-gray-500 w-6">
//                             {index + 1}
//                           </span>
//                         </div>

//                         <div className="flex-1 min-w-0">
//                           <div className="flex items-center gap-3 mb-1">
//                             <div
//                               className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
//                               style={{ background: formData.iconGradient }}
//                             >
//                               <BookOpen className="w-4 h-4 text-white" />
//                             </div>
//                             <p className="font-medium text-gray-900 truncate">
//                               {set.title}
//                             </p>
//                           </div>
//                           <div className="flex items-center gap-4 text-sm text-gray-500 ml-12">
//                             <span>{set.cardCount} thẻ</span>
//                             <span>•</span>
//                             <span>{set.category}</span>
//                             <span>•</span>
//                             <span>Cập nhật: {set.lastModified}</span>
//                           </div>
//                         </div>

//                         <Button
//                           type="button"
//                           variant="ghost"
//                           size="sm"
//                           onClick={() => removeStudySet(set.id)}
//                           className="opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 hover:text-red-600"
//                         >
//                           <X className="w-4 h-4" />
//                         </Button>
//                       </div>
//                     ))}
//                   </div>
//                 </CardContent>
//               </Card>
//             )}
//           </div>

//           {/* Right Column - Customization & Actions */}
//           <div className="sticky">
//             {/* Preview Card */}
//             <Card className="border border-gray-200 shadow-sm ">
//               <CardHeader className="">
//                 <CardTitle className="text-lg flex items-center">
//                   <FolderPlus className="w-5 h-5 text-blue-600" />
//                   Xem Trước
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="">
//                   <div className="relative overflow-hidden rounded-2xl transition-all duration-300 ">
//                     <div className="flex flex-col items-center justify-center text-center space-y-4">
//                       <div
//                         className="w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-300"
//                       >
//                         <div
//                           className="w-14 h-14 rounded-xl flex items-center justify-center"
//                           style={{ background: formData.iconGradient }}
//                         >
//                           <SelectedIcon className="w-7 h-7 text-white" />
//                         </div>
//                       </div>
//                       <div>
//                         <h3 className="font-bold text-xl text-gray-900 mb-2">
//                           {formData.title || "Tên folder"}
//                         </h3>
//                         <p className="text-gray-600 text-sm line-clamp-2">
//                           {formData.description || "Mô tả folder"}
//                         </p>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <Badge
//                           variant="outline"
//                           className="text-xs bg-white/50 backdrop-blur-sm"
//                         >
//                           {selectedStudySets.length} sets
//                         </Badge>
//                         <Badge
//                           variant="outline"
//                           className="text-xs bg-white/50 backdrop-blur-sm"
//                         >
//                           {selectedStudySets.reduce(
//                             (acc, set) => acc + set.cardCount,
//                             0
//                           )}{" "}
//                           thẻ
//                         </Badge>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Customization Section */}
//             <Card className="border border-gray-200 shadow-sm">
//               <CardHeader className="pb-4">
//                 <div className="flex items-center gap-2">
//                   <Palette className="w-5 h-5 text-purple-600" />
//                   <CardTitle className="text-lg">Tùy Chỉnh Giao Diện</CardTitle>
//                 </div>
//               </CardHeader>
//               <CardContent className="space-y-6">
//                 {/* Icon Selection */}
//                 <div className="space-y-3">
//                   <Label className="text-sm font-medium text-gray-700">
//                     Biểu Tượng
//                   </Label>
//                   <div className="grid grid-cols-4 gap-3">
//                     {iconOptions.map((option) => {
//                       const Icon = option.icon;
//                       const isSelected = formData.icon === option.value;
//                       return (
//                         <button
//                           key={option.value}
//                           type="button"
//                           onClick={() =>
//                             handleInputChange("icon", option.value)
//                           }
//                           className={`relative p-3 rounded-xl border transition-all duration-200 ${
//                             isSelected
//                               ? "border-blue-500 bg-blue-50 shadow-sm"
//                               : "border-gray-200 hover:border-blue-300 hover:shadow-sm"
//                           }`}
//                           title={option.label}
//                         >
//                           <div
//                             className="w-6 h-6 rounded-md flex items-center justify-center mx-auto mb-1"
//                             style={{ background: formData.iconGradient }}
//                           >
//                             <Icon className="w-4 h-4 text-white" />
//                           </div>
//                           {isSelected && (
//                             <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
//                               <Check className="w-3 h-3 text-white" />
//                             </div>
//                           )}
//                         </button>
//                       );
//                     })}
//                   </div>
//                 </div>

//                 {/* Gradient Selection */}
//                 <div className="space-y-3">
//                   <Label className="text-sm font-medium text-gray-700">
//                     Màu Gradient Icon
//                   </Label>
//                   <div className="space-y-3">
//                     <div className="grid grid-cols-5 gap-3">
//                       {iconGradientOptions.map((gradient) => {
//                         const isSelected = formData.iconGradient === gradient.value;
//                         return (
//                           <button
//                             key={gradient.value}
//                             type="button"
//                             onClick={() =>
//                               handleInputChange("iconGradient", gradient.value)
//                             }
//                             className={`relative aspect-square rounded-lg border-2 transition-all duration-200 hover:scale-105 ${
//                               isSelected
//                                 ? "border-gray-900 scale-105 shadow-lg"
//                                 : "border-white hover:border-gray-300"
//                             }`}
//                             style={{ background: gradient.value }}
//                             title={gradient.label}
//                           >
//                             {isSelected && (
//                               <Check className="absolute inset-0 m-auto w-5 h-5 text-white drop-shadow-md" />
//                             )}
//                             <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-[10px] py-1 px-1 rounded-b-lg truncate">
//                               {gradient.label}
//                             </div>
//                           </button>
//                         );
//                       })}
//                     </div>
//                   </div>
//                 </div>

//               </CardContent>
//             </Card>

//             {/* Action Buttons */}
//             <div className="space-y-4">
//               <Button
//                 onClick={handleSubmit}
//                 size="lg"
//                 className="w-full h-14 text-base font-semibold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all duration-300"
//                 disabled={!formData.title || formData.studySets.length === 0}
//               >
//                 <FolderPlus className="w-5 h-5 mr-2" />
//                 Tạo Folder
//               </Button>

//               <div className="flex gap-3">
//                 <Button
//                   type="button"
//                   variant="outline"
//                   className="flex-1 h-11 border-gray-300 hover:border-gray-400"
//                 >
//                   Hủy
//                 </Button>
//                 <Button
//                   type="button"
//                   variant="outline"
//                   className="flex-1 h-11 border-gray-300 hover:border-gray-400"
//                   onClick={() => {
//                     setFormData({
//                       title: "",
//                       description: "",
//                       icon: "book",
//                       iconGradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//                       studySets: [],
//                     });
//                   }}
//                 >
//                   Đặt lại
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <style>{`
//         .custom-scrollbar::-webkit-scrollbar {
//           width: 6px;
//           height: 6px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-track {
//           background: #f8fafc;
//           border-radius: 10px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb {
//           background: #cbd5e1;
//           border-radius: 10px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb:hover {
//           background: #94a3b8;
//         }
//         .line-clamp-2 {
//           display: -webkit-box;
//           -webkit-line-clamp: 2;
//           -webkit-box-orient: vertical;
//           overflow: hidden;
//         }
//       `}</style>
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  ArrowLeft,
  Atom,
  Award,
  BarChart3,
  Book,
  BookMarked,
  BookOpen,
  Brain,
  Calculator,
  Check,
  ChevronDown,
  ChevronUp,
  Cloud,
  Code,
  Cpu,
  Database,
  Download,
  Eye,
  FileText,
  Flame,
  FolderPlus,
  Globe,
  GraduationCap,
  Grid,
  GripVertical,
  Hash,
  HelpCircle,
  Info,
  LayoutGrid,
  Library,
  Lightbulb,
  List,
  Music,
  Paintbrush,
  Palette as PaletteIcon,
  Plus,
  RotateCcw,
  Search,
  Settings,
  Sparkle,
  Sparkles,
  Star,
  Star as StarIcon,
  Target,
  Trophy,
  Type,
  Upload,
  User,
  X,
  Zap,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

// Types
interface StudySet {
  id: string;
  title: string;
  cardCount: number;
  category: string;
  lastModified: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  tags: string[];
  favorite: boolean;
  progress: number;
  author: string;
  views: number;
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
  iconGradient: string;
  studySets: string[];
  tags: string[];
  visibility: "private" | "public" | "shared";
  colorTheme: string;
  sortOrder: "manual" | "alphabetical" | "date" | "progress";
}

// Enhanced mock data
const availableStudySets: StudySet[] = [
  {
    id: "1",
    title: "Tiếng Anh Giao Tiếp Cơ Bản",
    cardCount: 120,
    category: "Ngôn ngữ",
    lastModified: "2 ngày trước",
    difficulty: "beginner",
    tags: ["Tiếng Anh"],
    favorite: true,
    progress: 75,
    author: "Nguyễn Văn A",
    views: 1250,
  },
  {
    id: "2",
    title: "Toán Học Lớp 10: Đại Số & Hình Học",
    cardCount: 85,
    category: "Toán học",
    lastModified: "1 tuần trước",
    difficulty: "intermediate",
    tags: ["Toán 10"],
    favorite: false,
    progress: 40,
    author: "Trần Thị B",
    views: 890,
  },
  {
    id: "3",
    title: "Lịch Sử Việt Nam 1858-1945",
    cardCount: 75,
    category: "Lịch sử",
    lastModified: "3 ngày trước",
    difficulty: "intermediate",
    tags: ["Lịch sử"],
    favorite: true,
    progress: 90,
    author: "Lê Văn C",
    views: 2100,
  },
  {
    id: "4",
    title: "Vật Lý Đại Cương: Cơ Học & Nhiệt",
    cardCount: 95,
    category: "Khoa học",
    lastModified: "5 ngày trước",
    difficulty: "advanced",
    tags: ["Vật lý"],
    favorite: false,
    progress: 25,
    author: "Phạm Thị D",
    views: 670,
  },
  {
    id: "5",
    title: "Hóa Học Hữu Cơ Cơ Bản",
    cardCount: 65,
    category: "Khoa học",
    lastModified: "1 ngày trước",
    difficulty: "intermediate",
    tags: ["Hóa học"],
    favorite: true,
    progress: 60,
    author: "Hoàng Văn E",
    views: 980,
  },
  {
    id: "6",
    title: "Sinh Học Tế Bào & Di Truyền",
    cardCount: 110,
    category: "Khoa học",
    lastModified: "4 ngày trước",
    difficulty: "advanced",
    tags: ["Sinh học"],
    favorite: false,
    progress: 35,
    author: "Vũ Thị F",
    views: 760,
  },
  {
    id: "7",
    title: "Lập trình JavaScript Nâng Cao",
    cardCount: 150,
    category: "Công nghệ",
    lastModified: "Hôm nay",
    difficulty: "advanced",
    tags: ["JavaScript"],
    favorite: true,
    progress: 85,
    author: "Đặng Văn G",
    views: 3400,
  },
  {
    id: "8",
    title: "Kinh Tế Vi Mô Căn Bản",
    cardCount: 80,
    category: "Kinh tế",
    lastModified: "2 tuần trước",
    difficulty: "beginner",
    tags: ["Kinh tế"],
    favorite: false,
    progress: 50,
    author: "Bùi Thị H",
    views: 540,
  },
  {
    id: "9",
    title: "Nghệ thuật Phục Hưng Ý",
    cardCount: 45,
    category: "Nghệ thuật",
    lastModified: "3 ngày trước",
    difficulty: "intermediate",
    tags: ["Nghệ thuật"],
    favorite: true,
    progress: 95,
    author: "Mai Văn I",
    views: 1200,
  },
  {
    id: "10",
    title: "Machine Learning Fundamentals",
    cardCount: 200,
    category: "AI",
    lastModified: "Hôm nay",
    difficulty: "advanced",
    tags: ["AI"],
    favorite: true,
    progress: 30,
    author: "John Doe",
    views: 4500,
  },
];

const iconOptions: IconOption[] = [
  { value: "book", icon: Book, label: "Sách", category: "Học tập" },
  { value: "book-open", icon: BookOpen, label: "Sách Mở", category: "Học tập" },
  {
    value: "book-marked",
    icon: BookMarked,
    label: "Sách Đánh Dấu",
    category: "Học tập",
  },
  { value: "library", icon: Library, label: "Thư Viện", category: "Học tập" },
  {
    value: "graduation-cap",
    icon: GraduationCap,
    label: "Tốt Nghiệp",
    category: "Học tập",
  },
  { value: "brain", icon: Brain, label: "Não Bộ", category: "Học tập" },
  {
    value: "lightbulb",
    icon: Lightbulb,
    label: "Ý Tưởng",
    category: "Sáng tạo",
  },
  { value: "star", icon: Star, label: "Ngôi Sao", category: "Đánh giá" },
  { value: "trophy", icon: Trophy, label: "Cúp", category: "Thành tích" },
  { value: "target", icon: Target, label: "Mục Tiêu", category: "Mục tiêu" },
  { value: "zap", icon: Zap, label: "Năng Lượng", category: "Năng lượng" },
  { value: "flame", icon: Flame, label: "Lửa", category: "Nhiệt huyết" },
  { value: "award", icon: Award, label: "Huy Chương", category: "Thành tích" },
  { value: "music", icon: Music, label: "Âm nhạc", category: "Nghệ thuật" },
  { value: "globe", icon: Globe, label: "Toàn cầu", category: "Địa lý" },
  { value: "code", icon: Code, label: "Code", category: "Công nghệ" },
  { value: "atom", icon: Atom, label: "Nguyên tử", category: "Khoa học" },
  {
    value: "calculator",
    icon: Calculator,
    label: "Máy tính",
    category: "Toán học",
  },
  {
    value: "paintbrush",
    icon: Paintbrush,
    label: "Cọ vẽ",
    category: "Nghệ thuật",
  },
  {
    value: "database",
    icon: Database,
    label: "Database",
    category: "Công nghệ",
  },
  { value: "cpu", icon: Cpu, label: "CPU", category: "Công nghệ" },
  { value: "cloud", icon: Cloud, label: "Cloud", category: "Công nghệ" },
];

const iconGradientOptions = [
  {
    value: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    label: "Tím",
    preview: "from-purple-600 to-pink-500",
    category: "Chính",
  },
  {
    value: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    label: "Hồng",
    preview: "from-pink-400 to-red-500",
    category: "Chính",
  },
  {
    value: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    label: "Xanh Dương",
    preview: "from-blue-400 to-cyan-400",
    category: "Chính",
  },
  {
    value: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    label: "Xanh Lá",
    preview: "from-green-400 to-teal-300",
    category: "Chính",
  },
  {
    value: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    label: "Cam Hồng",
    preview: "from-pink-500 to-yellow-400",
    category: "Chính",
  },
  {
    value: "linear-gradient(135deg, #30cfd0 0%, #330867 100%)",
    label: "Xanh Đậm",
    preview: "from-cyan-400 to-indigo-900",
    category: "Chính",
  },
  {
    value: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    label: "Pastel",
    preview: "from-cyan-100 to-pink-100",
    category: "Pastel",
  },
  {
    value: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
    label: "Cam Nhạt",
    preview: "from-orange-100 to-orange-300",
    category: "Pastel",
  },
];

const categoryColors: Record<string, string> = {
  "Ngôn ngữ": "bg-blue-100 text-blue-800",
  "Toán học": "bg-green-100 text-green-800",
  "Lịch sử": "bg-amber-100 text-amber-800",
  "Khoa học": "bg-purple-100 text-purple-800",
  "Công nghệ": "bg-rose-100 text-rose-800",
  "Kinh tế": "bg-emerald-100 text-emerald-800",
  "Nghệ thuật": "bg-pink-100 text-pink-800",
  AI: "bg-indigo-100 text-indigo-800",
};

const difficultyColors: Record<string, string> = {
  beginner: "bg-green-100 text-green-800",
  intermediate: "bg-yellow-100 text-yellow-800",
  advanced: "bg-red-100 text-red-800",
};

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
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
  const [showTips, setShowTips] = useState<boolean>(true);
  const [autoSave, setAutoSave] = useState<boolean>(true);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [customTag, setCustomTag] = useState<string>("");
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
  // Hàm tính tiến trình
  const calculateProgress = () => {
    let progress = 0;
    const totalSteps = 3; // Title, Description, StudySets

    // Kiểm tra title (không rỗng)
    if (formData.title.trim().length > 0) progress += 1;

    // Kiểm tra description (không rỗng)
    if (formData.description.trim().length > 0) progress += 1;

    // Kiểm tra studySets (có ít nhất 1 item)
    if (formData.studySets.length > 0) progress += 1;

    return Math.round((progress / totalSteps) * 100);
  };

 
  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const addCustomTag = () => {
    if (customTag && !formData.tags.includes(customTag)) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, customTag],
      }));
      setCustomTag("");
      toast.success("Đã thêm tag");
    }
  };

  const removeTag = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
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

    // Simulate API call
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

  const handleExport = () => {
    const dataStr = JSON.stringify(formData, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${formData.title || "folder"}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Đã xuất cấu hình");
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const importedData = JSON.parse(content);
        setFormData(importedData);
        toast.success("Đã nhập cấu hình");
      } catch (error) {
        toast.error("Lỗi khi đọc file");
      }
    };
    reader.readAsText(file);
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
    const matchesDifficulty =
      selectedDifficulty === "all" || set.difficulty === selectedDifficulty;

    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const selectedStudySets = formData.studySets
    .map((id) => availableStudySets.find((set) => set.id === id))
    .filter((set): set is StudySet => set !== undefined);

  const SelectedIcon =
    iconOptions.find((opt) => opt.value === formData.icon)?.icon || Book;

  const categories = [
    "all",
    ...Array.from(new Set(availableStudySets.map((set) => set.category))),
  ];

  // Statistics
  const totalCards = selectedStudySets.reduce(
    (acc, set) => acc + set.cardCount,
    0
  );
  const avgProgress =
    selectedStudySets.length > 0
      ? Math.round(
          selectedStudySets.reduce((acc, set) => acc + set.progress, 0) /
            selectedStudySets.length
        )
      : 0;

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          {/* Enhanced Header */}
          <div className="mb-8">
            <div className="flex items-center justify-end mb-6">
              {/* <Button
                variant="ghost"
                className="text-gray-600 hover:text-gray-900 group"
                onClick={() => window.history.back()}
              >
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Quay lại
              </Button> */}

              <div className="flex items-center gap-3">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleExport}
                      disabled={isExporting}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Xuất
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Xuất cấu hình folder</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Nhập
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Nhập cấu hình từ file</TooltipContent>
                </Tooltip>

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImport}
                  accept=".json"
                  className="hidden"
                />

                <div className="flex items-center gap-2 px-3 py-1 bg-white rounded-full border">
                  <Switch checked={autoSave} onCheckedChange={setAutoSave} />
                  <span className="text-sm text-gray-600">Auto-save</span>
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                  Tạo Folder Mới
                  <motion.span
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Sparkle className="w-8 h-8 text-yellow-500" />
                  </motion.span>
                </h1>
                <p className="text-gray-600 max-w-2xl">
                  Tổ chức các bộ học tập của bạn một cách khoa học. Thêm mô tả,
                  chọn biểu tượng và tùy chỉnh giao diện.
                </p>

                {/* Progress bar */}
                {/* <div className="mt-4 space-y-2 max-w-2xl">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Tiến độ tạo folder</span>
                    <span>
                      {Math.round((formData.studySets.length / 5) * 100)}%
                    </span>
                  </div>
                  <Progress
                    value={(formData.studySets.length / 5) * 100}
                    className="h-2"
                  />
                </div> */}

                <div className="mt-4 space-y-2 max-w-2xl">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Tiến độ tạo folder</span>
                    <span>{calculateProgress()}%</span>
                    {/* Hoặc: <span>{calculateWeightedProgress()}%</span> */}
                  </div>
                  <Progress
                    value={calculateProgress()}
                    // Hoặc: value={calculateWeightedProgress()}
                    className="h-2"
                  />

                  {/* Hiển thị chi tiết tiến trình nếu muốn */}
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
                      <span>Study Sets ({formData.studySets.length}/5)</span>
                    </div>
                  </div>
                </div>
              </div>

              <motion.div
                className="flex items-center gap-3"
                whileHover={{ scale: 1.05 }}
              >
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl"
                  style={{ background: formData.iconGradient }}
                >
                  <SelectedIcon className="w-10 h-10 text-white" />
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Success Message */}
          <AnimatePresence>
            {showSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                className="mb-6"
              >
                <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                        <Check className="w-6 h-6 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-green-900 text-lg">
                          🎉 Folder đã được tạo thành công!
                        </h3>
                        <p className="text-green-700">
                          Bạn có thể xem folder trong thư viện học tập.
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-green-300 text-green-700"
                      >
                        Xem ngay
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Tips Panel */}
          <AnimatePresence>
            {showTips && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6"
              >
                <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-cyan-50">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Info className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-blue-900 mb-1">
                            💡 Mẹo tạo folder hiệu quả
                          </h4>
                          <ul className="text-sm text-blue-700 space-y-1">
                            <li>• Đặt tên folder rõ ràng, dễ nhớ</li>
                            <li>
                              • Chọn 3-5 study sets có liên quan để học hiệu quả
                            </li>
                            <li>• Sử dụng tags để dễ dàng tìm kiếm sau này</li>
                            <li>• Tùy chỉnh icon và màu sắc để dễ phân biệt</li>
                          </ul>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowTips(false)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Form */}
            <div className="lg:col-span-2 space-y-8">
              {/* Basic Info Card */}
              <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">
                          Thông Tin Folder
                        </CardTitle>
                        <CardDescription>
                          Đặt tên và mô tả cho folder của bạn
                        </CardDescription>
                      </div>
                    </div>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <HelpCircle className="w-4 h-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        Tên folder nên ngắn gọn, dễ nhớ và phản ánh nội dung bên
                        trong
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6 pt-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label
                        htmlFor="title"
                        className="text-sm font-semibold text-gray-700 flex items-center gap-2"
                      >
                        Tên Folder
                        <span className="text-red-500">*</span>
                      </Label>
                      <span
                        className={`text-xs ${
                          formData.title.length > 50
                            ? "text-amber-600"
                            : "text-gray-500"
                        }`}
                      >
                        {formData.title.length}/60 ký tự
                      </span>
                    </div>
                    <div className="relative">
                      <Input
                        id="title"
                        placeholder="Ví dụ: Ôn thi TOEIC 800+"
                        value={formData.title}
                        onChange={(e) =>
                          handleInputChange("title", e.target.value)
                        }
                        maxLength={60}
                        className="h-12 pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      />
                      <Type className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    </div>
                    {formData.title.length > 50 && (
                      <p className="text-xs text-amber-600 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        Tên hơi dài, nên giữ dưới 50 ký tự
                      </p>
                    )}
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label
                        htmlFor="description"
                        className="text-sm font-semibold text-gray-700"
                      >
                        Mô Tả (Tùy chọn)
                      </Label>
                      <span className="text-xs text-gray-500">
                        {formData.description.length}/200 ký tự
                      </span>
                    </div>
                    <Textarea
                      id="description"
                      placeholder="Mô tả nội dung, mục tiêu học tập hoặc ghi chú về folder này..."
                      value={formData.description}
                      onChange={(e) =>
                        handleInputChange("description", e.target.value)
                      }
                      maxLength={200}
                      className="min-h-[120px] resize-none border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  {/* Tags Input */}
                  {/* <div className="space-y-3">
                    <Label className="text-sm font-semibold text-gray-700">
                      Tags
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Thêm tag (Enter để thêm)"
                        value={customTag}
                        onChange={(e) => setCustomTag(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && addCustomTag()}
                        className="flex-1"
                      />
                      <Button onClick={addCustomTag} variant="outline">
                        Thêm
                      </Button>
                    </div>
                    {formData.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {formData.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="flex items-center gap-1"
                          >
                            <Hash className="w-3 h-3" />
                            {tag}
                            <button
                              onClick={() => removeTag(tag)}
                              className="ml-1 hover:text-red-500"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div> */}
                </CardContent>
              </Card>

              {/* Study Sets Selection */}
              <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                <CardHeader className="pb-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <LayoutGrid className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg sm:text-xl">
                          Chọn Study Sets
                        </CardTitle>
                        <CardDescription className="text-sm">
                          Tìm và chọn các bộ flashcard để thêm vào folder
                        </CardDescription>
                      </div>
                    </div>

                    {/* Quick Add Buttons */}
                    <div className="flex items-center gap-2 flex-wrap justify-end">
                      <div className="flex items-center gap-2">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => quickAddStudySet(1)}
                              disabled={
                                formData.studySets.length >=
                                availableStudySets.length
                              }
                              className="h-9 px-3"
                            >
                              <Plus className="w-3.5 h-3.5 sm:mr-1" />
                              <span className="hidden sm:inline">+1</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="bottom">
                            Thêm 1 study set ngẫu nhiên
                          </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => quickAddStudySet(3)}
                              disabled={
                                formData.studySets.length >=
                                availableStudySets.length
                              }
                              className="h-9 px-3"
                            >
                              <Plus className="w-3.5 h-3.5 sm:mr-1" />
                              <span className="hidden sm:inline">+3</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="bottom">
                            Thêm 3 study sets ngẫu nhiên
                          </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                setViewMode(
                                  viewMode === "grid" ? "list" : "grid"
                                )
                              }
                              className="h-9 w-9 p-0"
                            >
                              {viewMode === "grid" ? (
                                <List className="w-4 h-4" />
                              ) : (
                                <Grid className="w-4 h-4" />
                              )}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="bottom">
                            {viewMode === "grid" ? "Xem danh sách" : "Xem lưới"}
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Enhanced Search and Filters */}
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                        <div className="md:col-span-4 relative group">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 group-focus-within:text-primary" />
                          <Input
                            placeholder="Tìm kiếm theo tên, thể loại hoặc tags..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 pr-9 h-11"
                          />
                          {searchQuery && (
                            <button
                              onClick={() => setSearchQuery("")}
                              className="absolute right-3 top-1/2 -translate-y-1/2"
                            >
                              <X className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                            </button>
                          )}
                        </div>

                        {/* SELECT */}
                        <div className="md:col-span-1">
                          <Select
                            value={selectedCategory}
                            onValueChange={setSelectedCategory}
                          >
                            <SelectTrigger className="h-11">
                              <SelectValue placeholder="Thể loại" />
                            </SelectTrigger>
                            <SelectContent>
                              {categories.map((cat) => (
                                <SelectItem key={cat} value={cat}>
                                  {cat === "all" ? "Tất cả thể loại" : cat}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {(searchQuery || selectedCategory !== "all") && (
                        <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
                          <p>
                            Tìm thấy{" "}
                            <span className="font-semibold text-gray-900">
                              {filteredStudySets.length}
                            </span>{" "}
                            kết quả
                          </p>
                          {selectedCategory !== "all" && (
                            <Badge variant="secondary" className="font-normal">
                              {selectedCategory}
                            </Badge>
                          )}
                          {searchQuery && (
                            <Badge variant="outline" className="font-normal">
                              "{searchQuery}"
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Study Sets Grid/List */}
                    <div>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                        <h3 className="font-medium text-gray-900 text-base">
                          Study Sets có sẵn
                          <span className="ml-2 text-sm font-normal text-gray-500">
                            ({availableStudySets.length})
                          </span>
                        </h3>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className="text-xs font-medium"
                          >
                            {filteredStudySets.length} đang hiển thị
                          </Badge>
                          {formData.studySets.length > 0 && (
                            <Badge className="text-xs bg-blue-100 text-blue-800 border-blue-200">
                              {formData.studySets.length} đã chọn
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div
                        className={`${
                          viewMode === "grid"
                            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4"
                            : "space-y-3 sm:space-y-4"
                        } max-h-[600px] overflow-y-auto pr-2 custom-scrollbar`}
                      >
                        {filteredStudySets.length > 0 ? (
                          filteredStudySets.map((set) => {
                            const isSelected = formData.studySets.includes(
                              set.id
                            );
                            return (
                              <motion.div
                                key={set.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.2 }}
                                whileHover={{ y: -2 }}
                                className="relative"
                              >
                                <button
                                  type="button"
                                  onClick={() => toggleStudySet(set.id)}
                                  className={`w-full p-3 sm:p-4 rounded-xl border text-left transition-all duration-200 ${
                                    isSelected
                                      ? "border-blue-500 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-sm"
                                      : "border-gray-200 hover:border-blue-300 hover:shadow-sm bg-white"
                                  } ${
                                    viewMode === "list"
                                      ? "flex items-center gap-4"
                                      : "flex flex-col"
                                  }`}
                                >
                                  <div
                                    className={`flex-shrink-0 ${
                                      viewMode === "list"
                                        ? "w-10 h-10"
                                        : "w-12 h-12 mb-3"
                                    } rounded-lg flex items-center justify-center transition-all ${
                                      isSelected
                                        ? "bg-gradient-to-br from-blue-500 to-purple-600 shadow-md"
                                        : "bg-gray-100"
                                    }`}
                                  >
                                    {isSelected ? (
                                      <Check className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                    ) : (
                                      <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
                                    )}
                                  </div>

                                  <div
                                    className={`flex-1 min-w-0 ${
                                      viewMode === "list" ? "" : "w-full"
                                    }`}
                                  >
                                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-2">
                                      <p
                                        className={`font-medium text-sm sm:text-base truncate ${
                                          isSelected
                                            ? "text-blue-900"
                                            : "text-gray-900"
                                        }`}
                                      >
                                        {set.title}
                                      </p>

                                      {viewMode === "list" &&
                                        set.tags &&
                                        set.tags.length > 0 && (
                                          <div className="flex flex-wrap gap-1.5 mt-3">
                                            {set.tags.slice(0, 3).map((tag) => (
                                              <span
                                                key={tag}
                                                className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded-md"
                                              >
                                                {tag}
                                              </span>
                                            ))}
                                            {set.tags.length > 3 && (
                                              <span className="px-2 py-0.5 text-xs text-gray-500">
                                                +{set.tags.length - 3}
                                              </span>
                                            )}
                                          </div>
                                        )}
                                    </div>

                                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600">
                                      <span className="flex items-center gap-1">
                                        <FileText className="w-3.5 h-3.5" />
                                        {set.cardCount} thẻ
                                      </span>
                                      <span className="text-gray-300">•</span>
                                      <span className="text-gray-500">
                                        {set.lastModified}
                                      </span>
                                    </div>
                                    {viewMode === "grid" &&
                                      set.tags &&
                                      set.tags.length > 0 && (
                                        <div className="flex flex-wrap gap-1.5 mt-3">
                                          {set.tags.slice(0, 3).map((tag) => (
                                            <span
                                              key={tag}
                                              className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded-md"
                                            >
                                              {tag}
                                            </span>
                                          ))}
                                          {set.tags.length > 3 && (
                                            <span className="px-2 py-0.5 text-xs text-gray-500">
                                              +{set.tags.length - 3}
                                            </span>
                                          )}
                                        </div>
                                      )}
                                  </div>
                                </button>
                              </motion.div>
                            );
                          })
                        ) : (
                          <div className="col-span-full py-12 sm:py-16 text-center">
                            <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                              <BookOpen className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400" />
                            </div>
                            <p className="text-gray-700 text-base sm:text-lg mb-2 font-medium">
                              Không tìm thấy study sets phù hợp
                            </p>
                            <p className="text-gray-500 text-sm sm:text-base max-w-sm mx-auto">
                              Thử thay đổi từ khóa tìm kiếm hoặc chọn thể loại
                              khác
                            </p>
                            {(searchQuery || selectedCategory !== "all") && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setSearchQuery("");
                                  setSelectedCategory("all");
                                }}
                                className="mt-4"
                              >
                                <RotateCcw className="w-4 h-4 mr-2" />
                                Đặt lại bộ lọc
                              </Button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              {/* Selected Study Sets with Drag & Drop */}
              {selectedStudySets.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Card className="border border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                            <GripVertical className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <CardTitle className="text-xl">
                              Study Sets Đã Chọn
                            </CardTitle>
                            <CardDescription className="text-blue-700">
                              Kéo thả để sắp xếp thứ tự hiển thị
                            </CardDescription>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Settings className="w-4 h-4 mr-2" />
                                Sắp xếp
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-48">
                              <div className="space-y-2">
                                <Label>Sắp xếp theo</Label>
                                <select
                                  value={formData.sortOrder}
                                  onChange={(e) =>
                                    handleInputChange(
                                      "sortOrder",
                                      e.target.value
                                    )
                                  }
                                  className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                                >
                                  <option value="manual">
                                    Thủ công (kéo thả)
                                  </option>
                                  <option value="alphabetical">A → Z</option>
                                  <option value="date">Ngày cập nhật</option>
                                </select>
                              </div>
                            </PopoverContent>
                          </Popover>

                          <Badge className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
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
                            className={`group flex items-center gap-4 p-4 bg-white rounded-xl border border-blue-100 cursor-move transition-all duration-200 shadow-sm hover:shadow-md ${
                              draggedIndex === index
                                ? "opacity-40 scale-95 shadow-lg"
                                : ""
                            } ${
                              dragOverIndex === index
                                ? "border-blue-500 shadow-lg scale-[1.02] bg-blue-50"
                                : "hover:border-blue-300"
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <GripVertical className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
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
                                    <Badge
                                      variant="outline"
                                      className="text-xs"
                                    >
                                      {set.category}
                                    </Badge>
                                    <span>•</span>
                                    <span>{set.cardCount} thẻ</span>
                                    <span>•</span>
                                    <span>Cập nhật: {set.lastModified}</span>
                                  </div>
                                </div>
                              </div>

                              {/* Progress bar for selected items */}
                              {/* <div className="flex items-center gap-3 mt-2 ml-12">
                                <div className="flex-1 max-w-xs">
                                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                                    <span>Tiến độ học</span>
                                    <span>{set.progress}%</span>
                                  </div>
                                  <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                    <div
                                      className="h-full bg-gradient-to-r from-green-400 to-green-500 transition-all duration-500"
                                      style={{ width: `${set.progress}%` }}
                                    />
                                  </div>
                                </div>
                              </div> */}
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
              )}
            </div>

            {/* Right Column - Customization & Actions */}
            <div className="space-y-8">
              {/* Stats Preview */}
              <Card className="border border-gray-200 shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-blue-600" />
                    Thống kê
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <div className="text-2xl font-bold text-blue-700">
                          {selectedStudySets.length}
                        </div>
                        <div className="text-xs text-blue-600">Study Sets</div>
                      </div>
                      <div className="bg-green-50 p-3 rounded-lg">
                        <div className="text-2xl font-bold text-green-700">
                          {totalCards}
                        </div>
                        <div className="text-xs text-green-600">Tổng thẻ</div>
                      </div>
                      <div className="bg-amber-50 p-3 rounded-lg">
                        <div className="text-2xl font-bold text-amber-700">
                          {
                            Array.from(
                              new Set(selectedStudySets.map((s) => s.category))
                            ).length
                          }
                        </div>
                        <div className="text-xs text-amber-600">Thể loại</div>
                      </div>
                    </div>

                    {/* Category distribution */}
                    {selectedStudySets.length > 0 && (
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-700">
                          Phân bổ thể loại
                        </Label>
                        <div className="space-y-2">
                          {Object.entries(
                            selectedStudySets.reduce((acc, set) => {
                              acc[set.category] = (acc[set.category] || 0) + 1;
                              return acc;
                            }, {} as Record<string, number>)
                          ).map(([category, count]) => (
                            <div
                              key={category}
                              className="flex items-center gap-3"
                            >
                              <div className="w-24 text-sm text-gray-600">
                                {category}
                              </div>
                              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-gradient-to-r from-blue-500 to-blue-600"
                                  style={{
                                    width: `${
                                      (count / selectedStudySets.length) * 100
                                    }%`,
                                  }}
                                />
                              </div>
                              <div className="text-sm font-medium text-gray-700">
                                {count}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Preview Card */}
              <Card className="border border-gray-200 shadow-lg">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Eye className="w-5 h-5 text-blue-600" />
                    Xem Trước
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <motion.div
                    className="relative overflow-hidden rounded-2xl transition-all duration-300 p-6"
                    whileHover={{ scale: 1.02 }}
                    style={{
                      background: formData.iconGradient,
                      backgroundSize: "200% 200%",
                      animation: "gradientShift 5s ease infinite",
                    }}
                  >
                    <div className="flex flex-col items-center justify-center text-center space-y-4">
                      <motion.div
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="w-24 h-24 rounded-2xl flex items-center justify-center bg-white/20 backdrop-blur-sm"
                      >
                        <div className="w-16 h-16 rounded-xl flex items-center justify-center bg-white/30">
                          <SelectedIcon className="w-10 h-10 text-white" />
                        </div>
                      </motion.div>
                      <div>
                        <h3 className="font-bold text-2xl text-white mb-3">
                          {formData.title || "Tên folder"}
                        </h3>
                        <p className="text-white/90 text-sm line-clamp-2">
                          {formData.description || "Mô tả folder"}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge
                          variant="outline"
                          className="text-xs bg-white/30 backdrop-blur-sm text-white border-white/50"
                        >
                          {selectedStudySets.length} sets
                        </Badge>
                        <Badge
                          variant="outline"
                          className="text-xs bg-white/30 backdrop-blur-sm text-white border-white/50"
                        >
                          {totalCards} thẻ
                        </Badge>
                      </div>
                    </div>
                  </motion.div>
                </CardContent>
              </Card>

              {/* Customization Section */}
              <Card className="border border-gray-200 shadow-sm">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <PaletteIcon className="w-5 h-5 text-purple-600" />
                      <CardTitle className="text-lg">Tùy Chỉnh</CardTitle>
                    </div>
                    {/* <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowAdvanced(!showAdvanced)}
                    >
                      {showAdvanced ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                      {showAdvanced ? "Thu gọn" : "Nâng cao"}
                    </Button> */}
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Icon Selection */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-gray-700">
                      Biểu Tượng
                    </Label>
                    <Tabs defaultValue="all" className="w-full">
                      <TabsList className="grid grid-cols-4 mb-4">
                        <TabsTrigger value="all">Tất cả</TabsTrigger>
                        <TabsTrigger value="Học tập">Học tập</TabsTrigger>
                        <TabsTrigger value="Công nghệ">Công nghệ</TabsTrigger>
                        <TabsTrigger value="Nghệ thuật">Nghệ thuật</TabsTrigger>
                      </TabsList>
                      <TabsContent value="all" className="mt-0">
                        <div className="grid grid-cols-4 gap-3">
                          {iconOptions.map((option) => {
                            const Icon = option.icon;
                            const isSelected = formData.icon === option.value;
                            return (
                              <Tooltip key={option.value}>
                                <TooltipTrigger asChild>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleInputChange("icon", option.value)
                                    }
                                    className={`relative p-3 rounded-xl border transition-all duration-200 hover:scale-105 ${
                                      isSelected
                                        ? "border-blue-500 bg-blue-50 shadow-md scale-105"
                                        : "border-gray-200 hover:border-blue-300 hover:shadow-sm"
                                    }`}
                                  >
                                    <div
                                      className="w-7 h-7 rounded-md flex items-center justify-center mx-auto mb-1"
                                      style={{
                                        background: formData.iconGradient,
                                      }}
                                    >
                                      <Icon className="w-4 h-4 text-white" />
                                    </div>
                                    {isSelected && (
                                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center shadow-sm">
                                        <Check className="w-3 h-3 text-white" />
                                      </div>
                                    )}
                                  </button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>{option.label}</p>
                                  <p className="text-xs text-gray-500">
                                    {option.category}
                                  </p>
                                </TooltipContent>
                              </Tooltip>
                            );
                          })}
                        </div>
                      </TabsContent>
                      {/* Other tabs content would go here */}
                    </Tabs>
                  </div>

                  {/* Gradient Selection */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-gray-700">
                      Màu Gradient Icon
                    </Label>
                    <div className="grid grid-cols-4 gap-3">
                      {iconGradientOptions.map((gradient) => {
                        const isSelected =
                          formData.iconGradient === gradient.value;
                        return (
                          <Tooltip key={gradient.value}>
                            <TooltipTrigger asChild>
                              <button
                                type="button"
                                onClick={() =>
                                  handleInputChange(
                                    "iconGradient",
                                    gradient.value
                                  )
                                }
                                className={`relative aspect-square rounded-lg border-2 transition-all duration-200 hover:scale-105 ${
                                  isSelected
                                    ? "border-gray-900 scale-105 shadow-lg ring-2 ring-offset-2 ring-blue-500"
                                    : "border-white hover:border-gray-300"
                                }`}
                                style={{ background: gradient.value }}
                              >
                                {isSelected && (
                                  <Check className="absolute inset-0 m-auto w-5 h-5 text-white drop-shadow-lg" />
                                )}
                              </button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{gradient.label}</p>
                              <p className="text-xs text-gray-500">
                                {gradient.category}
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        );
                      })}
                    </div>
                  </div>

                  {/* Advanced Options */}
                  {/* <AnimatePresence>
                    {showAdvanced && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-4 overflow-hidden"
                      >
                        <div className="space-y-3 pt-4 border-t">
                          <Label className="text-sm font-medium text-gray-700">
                            Quyền riêng tư
                          </Label>
                          <div className="space-y-2">
                            {["private", "public", "shared"].map((option) => (
                              <label
                                key={option}
                                className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                              >
                                <input
                                  type="radio"
                                  checked={formData.visibility === option}
                                  onChange={() =>
                                    handleInputChange("visibility", option)
                                  }
                                  className="text-blue-600"
                                />
                                <div className="flex-1">
                                  <p className="font-medium">
                                    {option === "private"
                                      ? "Riêng tư"
                                      : option === "public"
                                      ? "Công khai"
                                      : "Chia sẻ"}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    {option === "private"
                                      ? "Chỉ bạn có thể xem"
                                      : option === "public"
                                      ? "Mọi người có thể xem"
                                      : "Chỉ người được chia sẻ"}
                                  </p>
                                </div>
                              </label>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-3">
                          <Label className="text-sm font-medium text-gray-700">
                            Tự động đề xuất study sets
                          </Label>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">
                              Dựa trên tags và thể loại
                            </span>
                            <Switch />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence> */}
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="space-y-4 sticky bottom-0 bg-gradient-to-t from-white via-white to-transparent pb-4 pt-6">
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <Button
                    onClick={handleSubmit}
                    size="lg"
                    className="w-full h-14 text-base font-semibold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
                    disabled={
                      !formData.title ||
                      formData.studySets.length === 0 ||
                      isExporting
                    }
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      initial={{ x: "-100%" }}
                      animate={{ x: "100%" }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: 0.5,
                      }}
                    />
                    <FolderPlus className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                    {isExporting ? "Đang tạo..." : "Tạo Folder"}
                  </Button>
                </motion.div>

                <div className="grid grid-cols-2 gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="h-11 border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                    onClick={() => {
                      if (
                        confirm(
                          "Bạn có chắc muốn hủy? Thay đổi chưa lưu sẽ bị mất."
                        )
                      ) {
                        window.history.back();
                      }
                    }}
                  >
                    Hủy
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="h-11 border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                    onClick={() => {
                      if (confirm("Bạn có chắc muốn đặt lại tất cả?")) {
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
                        toast.success("Đã đặt lại form");
                      }
                    }}
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Đặt lại
                  </Button>
                </div>

                <div className="text-center">
                  <button
                    onClick={() => setShowTips(!showTips)}
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    {showTips ? "Ẩn mẹo" : "Hiện mẹo"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes gradientShift {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
          
          .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
            height: 8px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #f8fafc;
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #cbd5e1;
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #94a3b8;
          }
          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        `}</style>
      </div>
    </TooltipProvider>
  );
}
