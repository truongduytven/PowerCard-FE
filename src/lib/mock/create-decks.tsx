// import {
//   Award,
//   Book,
//   BookMarked,
//   BookOpen,
//   Brain,
//   Calculator,
//   GraduationCap,
//   Library,
//   Lightbulb,
//   Star,
//   Target,
//   Trophy,
//   User,
// } from "lucide-react";
// export const topics = [
//   { id: "1", name: "Ngôn ngữ", color: "#3B82F6" },
//   { id: "2", name: "Toán học", color: "#8B5CF6" },
//   { id: "3", name: "Khoa học", color: "#10B981" },
//   { id: "4", name: "Lịch sử", color: "#F59E0B" },
//   { id: "5", name: "Công nghệ", color: "#EF4444" },
// ];
// export const folders = [
//   { id: "1", name: "Học kỳ 1", count: 12 },
//   { id: "2", name: "Ôn thi TOEIC", count: 8 },
//   { id: "3", name: "Đại học", count: 15 },
//   { id: "4", name: "Tự học", count: 6 },
// ];
// interface IconOption {
//   value: string;
//   icon: any;
//   label: string;
//   category: string;
// }
// export const iconOptions: IconOption[] = [
//   // Education
//   { value: "book", icon: Book, label: "Sách", category: "Giáo dục" },
//   {
//     value: "book-open",
//     icon: BookOpen,
//     label: "Sách mở",
//     category: "Giáo dục",
//   },
//   {
//     value: "graduation-cap",
//     icon: GraduationCap,
//     label: "Tốt nghiệp",
//     category: "Giáo dục",
//   },
//   { value: "brain", icon: Brain, label: "Não bộ", category: "Giáo dục" },
//   {
//     value: "lightbulb",
//     icon: Lightbulb,
//     label: "Bóng đèn",
//     category: "Giáo dục",
//   },
//   {
//     value: "book-marked",
//     icon: BookMarked,
//     label: "Sách đánh dấu",
//     category: "Giáo dục",
//   },
//   { value: "library", icon: Library, label: "Thư viện", category: "Giáo dục" },

//   // Achievements
//   { value: "trophy", icon: Trophy, label: "Cúp", category: "Thành tích" },
//   { value: "star", icon: Star, label: "Ngôi sao", category: "Thành tích" },
//   { value: "award", icon: Award, label: "Huy chương", category: "Thành tích" },
//   { value: "target", icon: Target, label: "Mục tiêu", category: "Thành tích" },

//   // Science
//   { value: "flask", icon: User, label: "Ống nghiệm", category: "Khoa học" },
//   {
//     value: "microscope",
//     icon: User,
//     label: "Kính hiển vi",
//     category: "Khoa học",
//   },
//   { value: "atom", icon: User, label: "Nguyên tử", category: "Khoa học" },
//   {
//     value: "calculator",
//     icon: Calculator,
//     label: "Máy tính",
//     category: "Khoa học",
//   },
// ];
// export // Gradient color options
// const gradientOptions = [
//   {
//     value: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//     label: "Tím xanh",
//   },
//   {
//     value: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
//     label: "Hồng đỏ",
//   },
//   {
//     value: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
//     label: "Xanh dương",
//   },
//   {
//     value: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
//     label: "Xanh lá",
//   },
//   {
//     value: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
//     label: "Hồng vàng",
//   },
//   {
//     value: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
//     label: "Hồng pastel",
//   },
//   {
//     value: "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
//     label: "Tím pastel",
//   },
//   {
//     value: "linear-gradient(135deg, #fad0c4 0%, #ffd1ff 100%)",
//     label: "Cam hồng",
//   },
//   {
//     value: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
//     label: "Cam nhạt",
//   },
//   {
//     value: "linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)",
//     label: "Xanh lá tươi",
//   },
//   {
//     value: "linear-gradient(135deg, #30cfd0 0%, #330867 100%)",
//     label: "Xanh đậm",
//   },
//   {
//     value: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
//     label: "Vàng cam",
//   },
// ];
// // Types
// export interface Flashcard {
//   id: string;
//   term: string;
//   definition: string;
//   mediaId: File | null;
//   mediaPreview: string | null;
//   position: number;
// }

// export interface FormData {
//   title: string;
//   description: string;
//   icon: string;
//   iconColor: string;
//   topicId: string;
//   folderSetId: string;
//   isPublic: boolean;
//   flashcards: Flashcard[];
// }

import {
  Book,
  BookOpen,
  Globe,
  Music,
  Palette,
  Code,
  Calculator,
  Heart,
  Star,
  Film,
  Gamepad2,
  Camera,
  Coffee,
  Car,
  Plane,
  Train,
  Ship,
  Bike,
  TreePine,
  Sun,
  Moon,
  Cloud,
  Droplets,
  Thermometer,
  Wind,
  CloudRain,
  CloudSnow,
  Zap,
  Users,
  Home,
  Building,
  School,
  Hospital,
  Store,
  Banknote,
  CreditCard,
  ShoppingCart,
  Package,
  Trophy,
  Target,
  Flag,
  Shield,
  Lock,
  Key,
  Bell,
  MessageSquare,
  Phone,
  Mail,
  Calendar,
  Clock,
  MapPin,
  Navigation,
  Compass,
  Music2,
  Headphones,
  Mic,
  Video,
  Monitor,
  Smartphone,
  Tablet,
  Laptop,
  Printer,
  Server,
  Database,
  Wifi,
  Bluetooth,
  Cpu,
  HardDrive,
  MemoryStick,
} from "lucide-react";

export const topics = [
  { id: "1", name: "Toán học" },
  { id: "2", name: "Vật lý" },
  { id: "3", name: "Hóa học" },
  { id: "4", name: "Sinh học" },
  { id: "5", name: "Lịch sử" },
  { id: "6", name: "Địa lý" },
  { id: "7", name: "Văn học" },
  { id: "8", name: "Ngoại ngữ" },
  { id: "9", name: "Lập trình" },
  { id: "10", name: "Kinh tế" },
  { id: "11", name: "Chính trị" },
  { id: "12", name: "Triết học" },
  { id: "13", name: "Tâm lý học" },
  { id: "14", name: "Y học" },
  { id: "15", name: "Nghệ thuật" },
  { id: "16", name: "Âm nhạc" },
  { id: "17", name: "Thể thao" },
  { id: "18", name: "Công nghệ" },
  { id: "19", name: "Môi trường" },
  { id: "20", name: "Khác" },
];

export const folders = [
  { id: "1", name: "Học kỳ 1", count: 12 },
  { id: "2", name: "Học kỳ 2", count: 8 },
  { id: "3", name: "Ôn thi đại học", count: 24 },
  { id: "4", name: "Tiếng Anh", count: 15 },
  { id: "5", name: "Lập trình", count: 9 },
  { id: "6", name: "Sở thích", count: 6 },
  { id: "7", name: "Công việc", count: 11 },
  { id: "8", name: "Du lịch", count: 4 },
  { id: "9", name: "Ẩm thực", count: 7 },
  { id: "10", name: "Thể thao", count: 5 },
];

export const iconOptions = [
  { value: "book", label: "Sách", icon: Book, category: "Giáo dục" },
  {
    value: "book-open",
    label: "Sách mở",
    icon: BookOpen,
    category: "Giáo dục",
  },
  { value: "globe", label: "Địa cầu", icon: Globe, category: "Địa lý" },
  { value: "music", label: "Âm nhạc", icon: Music, category: "Nghệ thuật" },
  {
    value: "palette",
    label: "Nghệ thuật",
    icon: Palette,
    category: "Nghệ thuật",
  },
  { value: "code", label: "Lập trình", icon: Code, category: "Công nghệ" },
  {
    value: "calculator",
    label: "Máy tính",
    icon: Calculator,
    category: "Toán học",
  },
  { value: "heart", label: "Trái tim", icon: Heart, category: "Sức khỏe" },
  { value: "star", label: "Ngôi sao", icon: Star, category: "Khác" },
  { value: "film", label: "Phim ảnh", icon: Film, category: "Giải trí" },
  {
    value: "gamepad-2",
    label: "Trò chơi",
    icon: Gamepad2,
    category: "Giải trí",
  },
  { value: "camera", label: "Máy ảnh", icon: Camera, category: "Nghệ thuật" },
  { value: "coffee", label: "Cà phê", icon: Coffee, category: "Ẩm thực" },
  { value: "car", label: "Ô tô", icon: Car, category: "Giao thông" },
  { value: "plane", label: "Máy bay", icon: Plane, category: "Giao thông" },
  { value: "train", label: "Tàu hỏa", icon: Train, category: "Giao thông" },
  { value: "ship", label: "Tàu thủy", icon: Ship, category: "Giao thông" },
  { value: "bike", label: "Xe đạp", icon: Bike, category: "Giao thông" },
  { value: "tree-pine", label: "Cây", icon: TreePine, category: "Môi trường" },
  { value: "sun", label: "Mặt trời", icon: Sun, category: "Thời tiết" },
  { value: "moon", label: "Mặt trăng", icon: Moon, category: "Thời tiết" },
  { value: "cloud", label: "Mây", icon: Cloud, category: "Thời tiết" },
  {
    value: "droplets",
    label: "Giọt nước",
    icon: Droplets,
    category: "Thời tiết",
  },
  {
    value: "thermometer",
    label: "Nhiệt kế",
    icon: Thermometer,
    category: "Thời tiết",
  },
  { value: "wind", label: "Gió", icon: Wind, category: "Thời tiết" },
  { value: "cloud-rain", label: "Mưa", icon: CloudRain, category: "Thời tiết" },
  {
    value: "cloud-snow",
    label: "Tuyết",
    icon: CloudSnow,
    category: "Thời tiết",
  },
  { value: "zap", label: "Sấm sét", icon: Zap, category: "Thời tiết" },
  { value: "users", label: "Người dùng", icon: Users, category: "Xã hội" },
  { value: "home", label: "Nhà", icon: Home, category: "Đời sống" },
  { value: "building", label: "Tòa nhà", icon: Building, category: "Đô thị" },
  { value: "school", label: "Trường học", icon: School, category: "Giáo dục" },
  { value: "hospital", label: "Bệnh viện", icon: Hospital, category: "Y tế" },
  { value: "store", label: "Cửa hàng", icon: Store, category: "Thương mại" },
  { value: "banknote", label: "Tiền", icon: Banknote, category: "Kinh tế" },
  {
    value: "credit-card",
    label: "Thẻ tín dụng",
    icon: CreditCard,
    category: "Tài chính",
  },
  {
    value: "shopping-cart",
    label: "Giỏ hàng",
    icon: ShoppingCart,
    category: "Thương mại",
  },
  {
    value: "package",
    label: "Gói hàng",
    icon: Package,
    category: "Thương mại",
  },
  { value: "trophy", label: "Cúp", icon: Trophy, category: "Thể thao" },
  { value: "target", label: "Mục tiêu", icon: Target, category: "Kinh doanh" },
  { value: "flag", label: "Cờ", icon: Flag, category: "Chính trị" },
  { value: "shield", label: "Khiên", icon: Shield, category: "Bảo mật" },
  { value: "lock", label: "Khóa", icon: Lock, category: "Bảo mật" },
  { value: "key", label: "Chìa khóa", icon: Key, category: "Bảo mật" },
  { value: "bell", label: "Chuông", icon: Bell, category: "Thông báo" },
  {
    value: "message-square",
    label: "Tin nhắn",
    icon: MessageSquare,
    category: "Giao tiếp",
  },
  { value: "phone", label: "Điện thoại", icon: Phone, category: "Giao tiếp" },
  { value: "mail", label: "Thư", icon: Mail, category: "Giao tiếp" },
  { value: "calendar", label: "Lịch", icon: Calendar, category: "Thời gian" },
  { value: "clock", label: "Đồng hồ", icon: Clock, category: "Thời gian" },
  { value: "map-pin", label: "Địa điểm", icon: MapPin, category: "Địa lý" },
  {
    value: "navigation",
    label: "Định vị",
    icon: Navigation,
    category: "Địa lý",
  },
  { value: "compass", label: "La bàn", icon: Compass, category: "Địa lý" },
  { value: "music-2", label: "Nốt nhạc", icon: Music2, category: "Âm nhạc" },
  {
    value: "headphones",
    label: "Tai nghe",
    icon: Headphones,
    category: "Âm nhạc",
  },
  { value: "mic", label: "Micro", icon: Mic, category: "Âm nhạc" },
  { value: "video", label: "Video", icon: Video, category: "Giải trí" },
  { value: "monitor", label: "Màn hình", icon: Monitor, category: "Công nghệ" },
  {
    value: "smartphone",
    label: "Điện thoại thông minh",
    icon: Smartphone,
    category: "Công nghệ",
  },
  {
    value: "tablet",
    label: "Máy tính bảng",
    icon: Tablet,
    category: "Công nghệ",
  },
  {
    value: "laptop",
    label: "Máy tính xách tay",
    icon: Laptop,
    category: "Công nghệ",
  },
  { value: "printer", label: "Máy in", icon: Printer, category: "Công nghệ" },
  { value: "server", label: "Máy chủ", icon: Server, category: "Công nghệ" },
  {
    value: "database",
    label: "Cơ sở dữ liệu",
    icon: Database,
    category: "Công nghệ",
  },
  { value: "wifi", label: "WiFi", icon: Wifi, category: "Công nghệ" },
  {
    value: "bluetooth",
    label: "Bluetooth",
    icon: Bluetooth,
    category: "Công nghệ",
  },
  { value: "cpu", label: "CPU", icon: Cpu, category: "Công nghệ" },
  {
    value: "hard-drive",
    label: "Ổ cứng",
    icon: HardDrive,
    category: "Công nghệ",
  },
  {
    value: "memory-stick",
    label: "Bộ nhớ",
    icon: MemoryStick,
    category: "Công nghệ",
  },
];

export const gradientOptions = [
  {
    label: "Xanh tím",
    value: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },
  {
    label: "Hồng cam",
    value: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  },
  {
    label: "Xanh lá",
    value: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  },
  {
    label: "Cam đỏ",
    value: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
  },
  {
    label: "Tím xanh",
    value: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
  },
  {
    label: "Vàng cam",
    value: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
  },
  {
    label: "Xanh dương",
    value: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)",
  },
  {
    label: "Hồng tím",
    value: "linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)",
  },
  {
    label: "Xanh ngọc",
    value: "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
  },
  {
    label: "Cam hồng",
    value: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)",
  },
  {
    label: "Tím hồng",
    value: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
  },
  {
    label: "Xanh lá đậm",
    value: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
  },
];
