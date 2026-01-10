import {
  Award,
  Book,
  BookMarked,
  BookOpen,
  Brain,
  Calculator,
  GraduationCap,
  Library,
  Lightbulb,
  Star,
  Target,
  Trophy,
  User,
} from "lucide-react";
export const topics = [
  { id: "1", name: "Ngôn ngữ", color: "#3B82F6" },
  { id: "2", name: "Toán học", color: "#8B5CF6" },
  { id: "3", name: "Khoa học", color: "#10B981" },
  { id: "4", name: "Lịch sử", color: "#F59E0B" },
  { id: "5", name: "Công nghệ", color: "#EF4444" },
];
export const folders = [
  { id: "1", name: "Học kỳ 1", count: 12 },
  { id: "2", name: "Ôn thi TOEIC", count: 8 },
  { id: "3", name: "Đại học", count: 15 },
  { id: "4", name: "Tự học", count: 6 },
];
interface IconOption {
  value: string;
  icon: any;
  label: string;
  category: string;
}
export const iconOptions: IconOption[] = [
  // Education
  { value: "book", icon: Book, label: "Sách", category: "Giáo dục" },
  {
    value: "book-open",
    icon: BookOpen,
    label: "Sách mở",
    category: "Giáo dục",
  },
  {
    value: "graduation-cap",
    icon: GraduationCap,
    label: "Tốt nghiệp",
    category: "Giáo dục",
  },
  { value: "brain", icon: Brain, label: "Não bộ", category: "Giáo dục" },
  {
    value: "lightbulb",
    icon: Lightbulb,
    label: "Bóng đèn",
    category: "Giáo dục",
  },
  {
    value: "book-marked",
    icon: BookMarked,
    label: "Sách đánh dấu",
    category: "Giáo dục",
  },
  { value: "library", icon: Library, label: "Thư viện", category: "Giáo dục" },

  // Achievements
  { value: "trophy", icon: Trophy, label: "Cúp", category: "Thành tích" },
  { value: "star", icon: Star, label: "Ngôi sao", category: "Thành tích" },
  { value: "award", icon: Award, label: "Huy chương", category: "Thành tích" },
  { value: "target", icon: Target, label: "Mục tiêu", category: "Thành tích" },

  // Science
  { value: "flask", icon: User, label: "Ống nghiệm", category: "Khoa học" },
  {
    value: "microscope",
    icon: User,
    label: "Kính hiển vi",
    category: "Khoa học",
  },
  { value: "atom", icon: User, label: "Nguyên tử", category: "Khoa học" },
  {
    value: "calculator",
    icon: Calculator,
    label: "Máy tính",
    category: "Khoa học",
  },
];
export // Gradient color options
const gradientOptions = [
  {
    value: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    label: "Tím xanh",
  },
  {
    value: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    label: "Hồng đỏ",
  },
  {
    value: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    label: "Xanh dương",
  },
  {
    value: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    label: "Xanh lá",
  },
  {
    value: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    label: "Hồng vàng",
  },
  {
    value: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
    label: "Hồng pastel",
  },
  {
    value: "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
    label: "Tím pastel",
  },
  {
    value: "linear-gradient(135deg, #fad0c4 0%, #ffd1ff 100%)",
    label: "Cam hồng",
  },
  {
    value: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
    label: "Cam nhạt",
  },
  {
    value: "linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)",
    label: "Xanh lá tươi",
  },
  {
    value: "linear-gradient(135deg, #30cfd0 0%, #330867 100%)",
    label: "Xanh đậm",
  },
  {
    value: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
    label: "Vàng cam",
  },
];
// Types
export interface Flashcard {
  id: string;
  term: string;
  definition: string;
  mediaId: File | null;
  mediaPreview: string | null;
  position: number;
}

export interface FormData {
  title: string;
  description: string;
  icon: string;
  iconColor: string;
  topicId: string;
  folderSetId: string;
  isPublic: boolean;
  flashcards: Flashcard[];
}
