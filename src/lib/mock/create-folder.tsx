import {
  Atom,
  Award,
  Book,
  BookMarked,
  BookOpen,
  Brain,
  Calculator,
  Cloud,
  Code,
  Cpu,
  Database,
  Flame,
  Globe,
  GraduationCap,
  Library,
  Lightbulb,
  Music,
  Paintbrush,
  Star,
  Target,
  Trophy,
  Zap,
} from "lucide-react";

export interface StudySet {
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
export const availableStudySets: StudySet[] = [
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

interface IconOption {
  value: string;
  icon: any;
  label: string;
  category: string;
}
export const iconOptions: IconOption[] = [
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
export const iconGradientOptions = [
  // ===== CHÍNH (ĐẬM – AN TOÀN) =====
  {
    value: "linear-gradient(135deg, #8e2de2 0%, #4a00e0 100%)",
    label: "Tím Neon",
    preview: "from-violet-600 to-indigo-800",
    category: "Đậm",
  },
  {
    value: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    label: "Hồng",
    preview: "from-pink-500 to-rose-600",
    category: "Chính",
  },
  {
    value: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    label: "Xanh Dương",
    preview: "from-blue-500 to-cyan-500",
    category: "Chính",
  },
  {
    value: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    label: "Xanh Lá",
    preview: "from-green-500 to-teal-500",
    category: "Chính",
  },
  {
    value: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    label: "Cam Hồng",
    preview: "from-rose-500 to-yellow-500",
    category: "Chính",
  },
  {
    value: "linear-gradient(135deg, #30cfd0 0%, #330867 100%)",
    label: "Xanh Đậm",
    preview: "from-cyan-500 to-indigo-800",
    category: "Chính",
  },

  // ===== ĐẬM / NỔI (Saturated) =====
  {
    value: "linear-gradient(135deg, #ff512f 0%, #dd2476 100%)",
    label: "Đỏ Hồng Đậm",
    preview: "from-red-600 to-pink-600",
    category: "Đậm",
  },
  {
    value: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
    label: "Xanh Ngọc",
    preview: "from-emerald-600 to-green-500",
    category: "Đậm",
  },
  {
    value: "linear-gradient(135deg, #396afc 0%, #2948ff 100%)",
    label: "Xanh Hoàng Gia",
    preview: "from-blue-700 to-indigo-700",
    category: "Đậm",
  },
  {
    value: "linear-gradient(135deg, #fc4a1a 0%, #f7b733 100%)",
    label: "Cam Năng Lượng",
    preview: "from-orange-600 to-yellow-500",
    category: "Đậm",
  },

  // ===== SIÊU ĐẬM / HIGH CONTRAST =====
  {
    value: "linear-gradient(135deg, #ee0979 0%, #ff6a00 100%)",
    label: "Hồng Cam Đậm",
    preview: "from-fuchsia-600 to-orange-600",
    category: "Đậm",
  },
  {
    value: "linear-gradient(135deg, #41295a 0%, #2f0743 100%)",
    label: "Tím Than",
    preview: "from-purple-800 to-violet-900",
    category: "Đậm",
  },
  {
    value: "linear-gradient(135deg, #141e30 0%, #243b55 100%)",
    label: "Xanh Đêm",
    preview: "from-slate-800 to-blue-900",
    category: "Đậm",
  },
  {
    value: "linear-gradient(135deg, #000000 0%, #434343 100%)",
    label: "Đen Đậm",
    preview: "from-black to-gray-700",
    category: "Đậm",
  },

  // ===== PHÁ CÁCH / MODERN =====
  {
    value: "linear-gradient(135deg, #f12711 0%, #f5af19 100%)",
    label: "Đỏ Cam",
    preview: "from-red-600 to-amber-500",
    category: "Đậm",
  },
  {
    value: "linear-gradient(135deg, #00b09b 0%, #96c93d 100%)",
    label: "Xanh Neon",
    preview: "from-teal-600 to-lime-500",
    category: "Đậm",
  },
  {
    value: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    label: "Tím",
    preview: "from-purple-600 to-indigo-600",
    category: "Chính",
  },
  {
    value: "linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%)",
    label: "Hồng Đỏ",
    preview: "from-pink-600 to-red-600",
    category: "Đậm",
  },
];
