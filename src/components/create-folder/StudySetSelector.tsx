// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";
// import { motion } from "framer-motion";
// import {
//   Search,
//   X,
//   Grid,
//   List,
//   Plus,
//   LayoutGrid,
//   FileText,
//   BookOpen,
//   Check,
//   RotateCcw,
//   ChevronDown,
// } from "lucide-react";
// import { StudySet } from "@/types/create-folder";

// interface StudySetSelectorProps {
//   searchQuery: string;
//   setSearchQuery: (query: string) => void;
//   selectedCategory: string;
//   setSelectedCategory: (category: string) => void;
//   viewMode: "grid" | "list";
//   setViewMode: (mode: "grid" | "list") => void;
//   filteredStudySets: StudySet[];
//   toggleStudySet: (setId: string) => void;
//   formDataStudySets: string[];
//   selectedStudySets: StudySet[];
// }

// export default function StudySetSelector({
//   searchQuery,
//   setSearchQuery,
//   selectedCategory,
//   setSelectedCategory,
//   viewMode,
//   setViewMode,
//   filteredStudySets,
//   toggleStudySet,
//   formDataStudySets,
//   selectedStudySets,
// }: StudySetSelectorProps) {
//   const categories = [
//     "all",
//     ...Array.from(new Set(filteredStudySets.map((set) => set.category))),
//   ];

//   return (
//     <Card className="bg-white/70 dark:bg-gray-900/60 border border-gray-200/60 dark:border-gray-800/60  shadow-sm hover:shadow-md transition-shadow duration-300">
//       <CardHeader className="pb-3">
//         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center flex-shrink-0">
//               <LayoutGrid className="w-5 h-5 text-white" />
//             </div>
//             <div className="flex-1 min-w-0">
//               <CardTitle className="text-lg sm:text-xl">
//                 Chọn Study Sets
//               </CardTitle>
//               <CardDescription className="text-sm truncate">
//                 Tìm và chọn các bộ flashcard để thêm vào folder
//               </CardDescription>
//             </div>
//           </div>

//           <div className="flex items-center gap-2 flex-wrap justify-end">
//             <div className="flex items-center gap-1 sm:gap-2">
//               <Tooltip>
//                 <TooltipTrigger asChild>
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     onClick={() =>
//                       setViewMode(viewMode === "grid" ? "list" : "grid")
//                     }
//                     className="h-9 w-9 p-0 flex-shrink-0 cursor-pointer"
//                   >
//                     {viewMode === "grid" ? (
//                       <List className="w-4 h-4" />
//                     ) : (
//                       <Grid className="w-4 h-4" />
//                     )}
//                   </Button>
//                 </TooltipTrigger>
//                 <TooltipContent side="bottom">
//                   {viewMode === "grid" ? "Xem danh sách" : "Xem lưới"}
//                 </TooltipContent>
//               </Tooltip>
//             </div>
//           </div>
//         </div>
//       </CardHeader>
//       <CardContent>
//         <div className="space-y-6">
//           {/* Enhanced Search and Filters */}
//           <div className="space-y-4">
//             <div className="flex flex-col sm:flex-row gap-3">
//               <div className="relative flex-1 group">
//                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 group-focus-within:text-primary transition-all duration-200" />
//                 <Input
//                   placeholder="Tìm kiếm theo tên, thể loại hoặc tags..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="pl-10 pr-9  text-sm sm:text-base rounded-lg border-gray-300 focus-visible:ring-primary/30 transition-all duration-200 group-hover:border-primary/50 bg-white shadow-sm"
//                 />
//                 {searchQuery && (
//                   <motion.button
//                     initial={{ opacity: 0, scale: 0.8 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     exit={{ opacity: 0, scale: 0.8 }}
//                     onClick={() => setSearchQuery("")}
//                     className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
//                     aria-label="Xóa tìm kiếm"
//                   >
//                     <X className="w-3.5 h-3.5 text-gray-500 hover:text-gray-700" />
//                   </motion.button>
//                 )}
//                 {/* Hiệu ứng focus ring */}
//                 <div className="absolute inset-0 rounded-lg ring-1 ring-transparent group-focus-within:ring-primary/20 transition-all duration-300 pointer-events-none" />
//               </div>

//               {/* Category Selector - với gradient border */}
//               <div className="relative w-full sm:w-48">
//                 <div className="absolute inset-0 pointer-events-none cursor-pointers bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
//                 <Select
//                   value={selectedCategory}
//                   onValueChange={setSelectedCategory}
//                 >
//                   <SelectTrigger className="h-11 w-full cursor-pointer">
//                     <SelectValue placeholder="Tất cả thể loại" />
//                   </SelectTrigger>
//                   <SelectContent className="bg-white dark:bg-gray-900 border border-gray-200/60 dark:border-gray-800/60 shadow-sm">
//                     {categories.map((cat) => (
//                       <SelectItem key={cat} value={cat} className="text-sm">
//                         {cat === "all" ? "Tất cả thể loại" : cat}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>
//               {(searchQuery || selectedCategory !== "all") && (
//                 <Tooltip>
//                   <TooltipTrigger asChild>
//                     <Button
//                       variant="ghost"
//                       size="sm"
//                       onClick={() => {
//                         setSearchQuery("");
//                         setSelectedCategory("all");
//                       }}
//                       className="h-9 w-9 p-0"
//                     >
//                       <RotateCcw className="w-4 h-4" />
//                     </Button>
//                   </TooltipTrigger>
//                   <TooltipContent>Đặt lại bộ lọc</TooltipContent>
//                 </Tooltip>
//               )}
//             </div>

//             {/* Filter Controls - Xếp hàng ngang trên desktop */}
//             <div className="flex flex-col sm:flex-row gap-3">
//               {/* <div className="flex-1">
//                 <Select
//                   value={selectedCategory}
//                   onValueChange={setSelectedCategory}
//                 >
//                   <SelectTrigger className="h-11 w-full">
//                     <SelectValue placeholder="Tất cả thể loại" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {categories.map((cat) => (
//                       <SelectItem key={cat} value={cat} className="text-sm">
//                         {cat === "all" ? "Tất cả thể loại" : cat}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div> */}

//               {/* Stats and Reset Button */}
//               <div className="flex items-center gap-2">
//                 {/* <div className="flex items-center gap-2 text-sm">
//                   <Badge variant="outline" className="font-normal">
//                     {filteredStudySets.length} đang hiển thị
//                   </Badge>
//                   {selectedStudySets.length > 0 && (
//                     <Badge className="bg-blue-100 text-blue-800 border-blue-200">
//                       {selectedStudySets.length} đã chọn
//                     </Badge>
//                   )}
//                 </div> */}
//               </div>
//             </div>

//             {/* Search Results Summary */}
//             {(searchQuery || selectedCategory !== "all") && (
//               <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
//                 <p>
//                   Tìm thấy{" "}
//                   <span className="font-semibold text-gray-900">
//                     {filteredStudySets.length}
//                   </span>{" "}
//                   kết quả
//                 </p>
//                 {selectedCategory !== "all" && (
//                   <Badge variant="secondary" className="font-normal">
//                     {selectedCategory}
//                   </Badge>
//                 )}
//                 {searchQuery && (
//                   <Badge variant="outline" className="font-normal">
//                     "{searchQuery}"
//                   </Badge>
//                 )}
//               </div>
//             )}
//           </div>

//           {/* Study Sets Grid/List */}
//           <div>
//             {/* Section Header */}
//             <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
//               <div>
//                 <h3 className="font-medium text-gray-900 dark:text-white text-base sm:text-lg">
//                   Study Sets có sẵn
//                 </h3>
//               </div>
//               <div className="flex items-center gap-2 text-sm">
//                 <Badge variant="outline" className="font-normal">
//                   {filteredStudySets.length} đang hiển thị
//                 </Badge>
//                 {selectedStudySets.length > 0 && (
//                   <Badge className="bg-gradient-to-br from-purple-100 to-pink-100 text-purple-800 border border-purple-200">
//                     {selectedStudySets.length} đã chọn
//                   </Badge>
//                 )}
//               </div>
//             </div>

//             {/* Study Sets Display */}
//             <div
//               className={`${
//                 viewMode === "grid"
//                   ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4"
//                   : "space-y-3 sm:space-y-4"
//               } max-h-[600px] overflow-y-auto pr-2 pt-2 custom-scrollbar`}
//             >
//               {filteredStudySets.length > 0 ? (
//                 filteredStudySets.map((set) => {
//                   const isSelected = formDataStudySets.includes(set.id);
//                   return (
//                     <motion.div
//                       key={set.id}
//                       initial={{ opacity: 0, y: 10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ duration: 0.2 }}
//                       whileHover={{ y: -2 }}
//                       className="relative"
//                     >
//                       <button
//                         type="button"
//                         onClick={() => toggleStudySet(set.id)}
//                         className={`w-full cursor-pointer p-3 sm:p-4 rounded-xl border text-left transition-all duration-200
//                           ${
//                             isSelected
//                               ? `
//                                 border-pink-500
//                                 bg-gradient-to-r from-pink-50 to-indigo-50
//                                 dark:from-pink-950/40 dark:to-indigo-950/40
//                                 shadow-sm
//                               `
//                               : `
//                                 border-gray-200
//                                 bg-white
//                                 hover:border-pink-300 hover:shadow-sm
//                                 dark:border-gray-800
//                                 dark:bg-gray-900
//                                 dark:hover:border-pink-700
//                                 dark:hover:bg-gray-900/80
//                               `
//                           }
//                           ${
//                             viewMode === "list"
//                               ? "flex items-center gap-4"
//                               : "flex flex-col"
//                           }
//                         `}
//                       >
//                         <div
//                           className={`flex-shrink-0 ${
//                             viewMode === "list" ? "w-10 h-10" : "w-12 h-12 mb-3"
//                           } rounded-lg flex items-center justify-center transition-all ${
//                             isSelected
//                               ? "bg-gradient-to-br from-pink-500 to-purple-600 shadow-md"
//                               : "bg-gray-100"
//                           }`}
//                         >
//                           {isSelected ? (
//                             <Check className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
//                           ) : (
//                             <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
//                           )}
//                         </div>

//                         <div
//                           className={`flex-1 min-w-0 ${
//                             viewMode === "list" ? "" : "w-full"
//                           }`}
//                         >
//                           <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-2">
//                             <p
//                               className={`font-medium text-sm sm:text-base truncate ${
//                                 isSelected ? "text-pink-900" : "text-gray-900"
//                               }`}
//                             >
//                               {set.title}
//                             </p>
//                           </div>

//                           <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600">
//                             <span className="flex items-center gap-1">
//                               <FileText className="w-3.5 h-3.5" />
//                               {set.cardCount} thẻ
//                             </span>
//                             <span className="text-gray-300">•</span>
//                             <span className="text-gray-500">
//                               {set.category}
//                             </span>
//                           </div>

//                           {viewMode === "grid" &&
//                             set.tags &&
//                             set.tags.length > 0 && (
//                               <div className="flex flex-wrap gap-1.5 mt-3">
//                                 {set.tags.slice(0, 3).map((tag) => (
//                                   <span
//                                     key={tag}
//                                     className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded-md"
//                                   >
//                                     {tag}
//                                   </span>
//                                 ))}
//                                 {set.tags.length > 3 && (
//                                   <span className="px-2 py-0.5 text-xs text-gray-500">
//                                     +{set.tags.length - 3}
//                                   </span>
//                                 )}
//                               </div>
//                             )}
//                         </div>

//                         {viewMode === "list" &&
//                           set.tags &&
//                           set.tags.length > 0 && (
//                             <div className="hidden sm:flex flex-wrap gap-1.5">
//                               {set.tags.slice(0, 2).map((tag) => (
//                                 <span
//                                   key={tag}
//                                   className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded-md"
//                                 >
//                                   {tag}
//                                 </span>
//                               ))}
//                               {set.tags.length > 2 && (
//                                 <span className="px-2 py-0.5 text-xs text-gray-500">
//                                   +{set.tags.length - 2}
//                                 </span>
//                               )}
//                             </div>
//                           )}
//                       </button>
//                     </motion.div>
//                   );
//                 })
//               ) : (
//                 <div className="col-span-full py-12 sm:py-16 text-center">
//                   <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
//                     <BookOpen className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400" />
//                   </div>
//                   <p className="text-gray-700 text-base sm:text-lg mb-2 font-medium">
//                     Không tìm thấy study sets phù hợp
//                   </p>
//                   <p className="text-gray-500 text-sm sm:text-base max-w-sm mx-auto">
//                     Thử thay đổi từ khóa tìm kiếm hoặc chọn thể loại khác
//                   </p>
//                   {(searchQuery || selectedCategory !== "all") && (
//                     <Button
//                       variant="outline"
//                       size="sm"
//                       onClick={() => {
//                         setSearchQuery("");
//                         setSelectedCategory("all");
//                       }}
//                       className="mt-4"
//                     >
//                       <RotateCcw className="w-4 h-4 mr-2" />
//                       Đặt lại bộ lọc
//                     </Button>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion } from "framer-motion";
import {
  Search,
  X,
  Grid,
  List,
  Plus,
  LayoutGrid,
  FileText,
  BookOpen,
  Check,
  RotateCcw,
  ChevronDown,
} from "lucide-react";
import { StudySet } from "@/types/create-folder";

interface StudySetSelectorProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  filteredStudySets: StudySet[];
  toggleStudySet: (setId: string) => void;
  formDataStudySets: string[];
  selectedStudySets: StudySet[];
}

export default function StudySetSelector({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  viewMode,
  setViewMode,
  filteredStudySets,
  toggleStudySet,
  formDataStudySets,
  selectedStudySets,
}: StudySetSelectorProps) {
  const categories = [
    "all",
    ...Array.from(new Set(filteredStudySets.map((set) => set.category))),
  ];

  return (
    <Card className="bg-white/70 dark:bg-gray-900/70 border border-gray-200/60 dark:border-gray-700/60 shadow-sm hover:shadow-md transition-shadow duration-300">
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <LayoutGrid className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <CardTitle className="text-lg sm:text-xl text-gray-900 dark:text-white">
                Chọn Study Sets
              </CardTitle>
              <CardDescription className="text-sm truncate text-gray-600 dark:text-gray-400">
                Tìm và chọn các bộ flashcard để thêm vào folder
              </CardDescription>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap justify-end">
            <div className="flex items-center gap-1 sm:gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setViewMode(viewMode === "grid" ? "list" : "grid")
                    }
                    className="h-9 w-9 p-0 flex-shrink-0 cursor-pointer border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                  >
                    {viewMode === "grid" ? (
                      <List className="w-4 h-4" />
                    ) : (
                      <Grid className="w-4 h-4" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  className="bg-gray-900 dark:bg-gray-800 text-white dark:text-gray-200 border-gray-700"
                >
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
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1 group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4 group-focus-within:text-purple-600 dark:group-focus-within:text-purple-400 transition-all duration-200" />
                <Input
                  placeholder="Tìm kiếm theo tên, thể loại hoặc tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-9 text-sm sm:text-base rounded-lg border-gray-300 dark:border-gray-700 focus-visible:ring-purple-500/30 dark:focus-visible:ring-purple-400/30 transition-all duration-200 group-hover:border-purple-400/50 dark:group-hover:border-purple-500/50 bg-white dark:bg-gray-800 shadow-sm dark:shadow-gray-900/50 text-gray-900 dark:text-white"
                />
                {searchQuery && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    aria-label="Xóa tìm kiếm"
                  >
                    <X className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" />
                  </motion.button>
                )}
                {/* Hiệu ứng focus ring */}
                <div className="absolute inset-0 rounded-lg ring-1 ring-transparent group-focus-within:ring-purple-500/20 dark:group-focus-within:ring-purple-400/20 transition-all duration-300 pointer-events-none" />
              </div>

              {/* Category Selector - với gradient border */}
              <div className="relative w-full sm:w-48">
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger className="h-11 w-full cursor-pointer border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750 text-gray-900 dark:text-white focus:ring-purple-500 dark:focus:ring-purple-400">
                    <SelectValue placeholder="Tất cả thể loại" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg">
                    {categories.map((cat) => (
                      <SelectItem
                        key={cat}
                        value={cat}
                        className="text-sm text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:bg-gray-100 dark:focus:bg-gray-700"
                      >
                        {cat === "all" ? "Tất cả thể loại" : cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {(searchQuery || selectedCategory !== "all") && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSearchQuery("");
                        setSelectedCategory("all");
                      }}
                      className="h-9 w-9 p-0 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-gray-900 dark:bg-gray-800 text-white dark:text-gray-200 border-gray-700">
                    Đặt lại bộ lọc
                  </TooltipContent>
                </Tooltip>
              )}
            </div>

            {/* Search Results Summary */}
            {(searchQuery || selectedCategory !== "all") && (
              <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <p>
                  Tìm thấy{" "}
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {filteredStudySets.length}
                  </span>{" "}
                  kết quả
                </p>
                {selectedCategory !== "all" && (
                  <Badge
                    variant="secondary"
                    className="font-normal bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600"
                  >
                    {selectedCategory}
                  </Badge>
                )}
                {searchQuery && (
                  <Badge
                    variant="outline"
                    className="font-normal border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
                  >
                    "{searchQuery}"
                  </Badge>
                )}
              </div>
            )}
          </div>

          {/* Study Sets Grid/List */}
          <div>
            {/* Section Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white text-base sm:text-lg">
                  Study Sets có sẵn
                </h3>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Badge
                  variant="outline"
                  className="font-normal border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
                >
                  {filteredStudySets.length} đang hiển thị
                </Badge>
                {selectedStudySets.length > 0 && (
                  <Badge className="bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-700">
                    {selectedStudySets.length} đã chọn
                  </Badge>
                )}
              </div>
            </div>

            {/* Study Sets Display */}
            <div
              className={`${
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4"
                  : "space-y-3 sm:space-y-4"
              } max-h-[600px] overflow-y-auto pr-2 pt-2 custom-scrollbar`}
            >
              {filteredStudySets.length > 0 ? (
                filteredStudySets.map((set) => {
                  const isSelected = formDataStudySets.includes(set.id);
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
                        className={`w-full cursor-pointer p-3 sm:p-4 rounded-xl border text-left transition-all duration-200
                          ${
                            isSelected
                              ? `
                                border-pink-500 dark:border-pink-600
                                bg-gradient-to-r from-pink-50 to-indigo-50
                                dark:from-pink-950/30 dark:to-indigo-950/30
                                shadow-sm
                                dark:shadow-gray-900/50
                              `
                              : `
                                border-gray-200 dark:border-gray-800
                                bg-white dark:bg-gray-800
                                hover:border-pink-300 dark:hover:border-pink-700
                                hover:shadow-sm dark:hover:shadow-gray-900/50
                                dark:hover:bg-gray-800/80
                              `
                          }
                          ${
                            viewMode === "list"
                              ? "flex items-center gap-4"
                              : "flex flex-col"
                          }
                        `}
                      >
                        <div
                          className={`flex-shrink-0 ${
                            viewMode === "list" ? "w-10 h-10" : "w-12 h-12 mb-3"
                          } rounded-lg flex items-center justify-center transition-all ${
                            isSelected
                              ? "bg-gradient-to-br from-pink-500 to-purple-600 shadow-md"
                              : "bg-gray-100 dark:bg-gray-700"
                          }`}
                        >
                          {isSelected ? (
                            <Check className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                          ) : (
                            <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 dark:text-gray-400" />
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
                                  ? "text-pink-900 dark:text-pink-300"
                                  : "text-gray-900 dark:text-white"
                              }`}
                            >
                              {set.title}
                            </p>
                          </div>

                          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                            <span className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                              <FileText className="w-3.5 h-3.5" />
                              {set.cardCount} thẻ
                            </span>
                            <span className="text-gray-300 dark:text-gray-600">
                              •
                            </span>
                            <span className="text-gray-500 dark:text-gray-400">
                              {set.category}
                            </span>
                          </div>

                          {viewMode === "grid" &&
                            set.tags &&
                            set.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1.5 mt-3">
                                {set.tags.slice(0, 3).map((tag) => (
                                  <span
                                    key={tag}
                                    className="px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-md"
                                  >
                                    {tag}
                                  </span>
                                ))}
                                {set.tags.length > 3 && (
                                  <span className="px-2 py-0.5 text-xs text-gray-500 dark:text-gray-500">
                                    +{set.tags.length - 3}
                                  </span>
                                )}
                              </div>
                            )}
                        </div>

                        {viewMode === "list" &&
                          set.tags &&
                          set.tags.length > 0 && (
                            <div className="hidden sm:flex flex-wrap gap-1.5">
                              {set.tags.slice(0, 2).map((tag) => (
                                <span
                                  key={tag}
                                  className="px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-md"
                                >
                                  {tag}
                                </span>
                              ))}
                              {set.tags.length > 2 && (
                                <span className="px-2 py-0.5 text-xs text-gray-500 dark:text-gray-500">
                                  +{set.tags.length - 2}
                                </span>
                              )}
                            </div>
                          )}
                      </button>
                    </motion.div>
                  );
                })
              ) : (
                <div className="col-span-full py-12 sm:py-16 text-center">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                    <BookOpen className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 dark:text-gray-500" />
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg mb-2 font-medium">
                    Không tìm thấy study sets phù hợp
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base max-w-sm mx-auto">
                    Thử thay đổi từ khóa tìm kiếm hoặc chọn thể loại khác
                  </p>
                  {(searchQuery || selectedCategory !== "all") && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSearchQuery("");
                        setSelectedCategory("all");
                      }}
                      className="mt-4 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
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
  );
}
