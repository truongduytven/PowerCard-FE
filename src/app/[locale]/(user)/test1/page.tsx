"use client";

import { useState, useEffect, ReactNode } from 'react';
import { GoArrowRight } from "react-icons/go";
import { FaCirclePlus } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoFilter } from "react-icons/io5";
import { IoTrendingUp } from "react-icons/io5";
import { MdOutlineGroups } from "react-icons/md";
import { MdEmojiEvents } from "react-icons/md";
import { IoStarSharp } from "react-icons/io5";
import { MdStyle } from "react-icons/md";
import { MdVisibility } from "react-icons/md";
import { IoColorPalette } from "react-icons/io5";
import { FaEarthEurope } from "react-icons/fa6";
import { IoCode } from "react-icons/io5";
import { MdBiotech } from "react-icons/md";
import { IoBookmark } from "react-icons/io5";
import { MdOutlinePublic } from "react-icons/md";
import { FaSchool } from "react-icons/fa";
import { MdTranslate } from "react-icons/md";
import { MdOutlineTerminal } from "react-icons/md";
import { IoIosBrush } from "react-icons/io";
import { MdOutlineHealthAndSafety } from "react-icons/md";
import { IoIosMore } from "react-icons/io";
import { BackgroundLines } from '@/components/ui/background-lines';
// Types
interface FlashCard {
    id: string;
    title: string;
    description: string;
    category: string;
    difficulty: string;
    cardCount: number;
    rating: number;
    views: number;
    author: Author;
    tags: string[];
    coverImage?: string;
    icon?: ReactNode;
    iconColor?: string;
    bgColor?: string;
}

interface Author {
    name: string;
    role: string;
    avatar: string;
}

interface Activity {
    id: string;
    type: 'create' | 'complete' | 'review';
    user: {
        name: string;
        avatar: string;
    };
    content: string;
    details?: string;
    timestamp: string;
    color: string;
}

interface StatCard {
    title: string;
    value: string | number;
    trend?: string;
    icon: ReactNode;
    iconColor: string;
    progress?: number;
    bgColor?: string;
    extraContent?: ReactNode;
}

interface Category {
    id: string;
    name: string;
    icon: ReactNode;
    color: string;
}

// Material Icons Component
const MaterialIcon = ({
    icon,
    className = "",
    size = 20
}: {
    icon: string;
    className?: string;
    size?: number;
}) => {
    return (
        <span
            className={`material-symbols-outlined ${className}`}
            style={{ fontSize: size }}
        >
            {icon}
        </span>
    );
};

// Stat Card Component
const StatCard = ({ stat }: { stat: StatCard }) => {
    return (
        <div className="bg-white dark:bg-[#221429] border border-gray-100 dark:border-[#3A2546] shadow-card hover:shadow-card-hover group relative overflow-hidden rounded-2xl p-6 transition-all hover:-translate-y-1">
            <div
                className="absolute right-[-20px] top-[-20px] rounded-full p-8 blur-2xl transition-all group-hover:opacity-80"
                style={{ backgroundColor: `${stat.bgColor || stat.iconColor}10` }}
            ></div>
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm font-medium text-text-secondary">{stat.title}</p>
                    <h3 className="mt-2 text-3xl font-bold text-text-main group-hover:text-primary transition-colors">
                        {stat.value}
                    </h3>
                </div>
                <div
                    className="rounded-lg p-2"
                    style={{
                        backgroundColor: `${stat.iconColor}10`,
                        color: stat.iconColor
                    }}
                >
                    <span className='text-2xl'>{stat.icon}</span>
                </div>
            </div>
            {stat.progress && (
                <div className="mt-4 h-1.5 w-full rounded-full bg-gray-100">
                    <div
                        className="h-full rounded-full shadow-glow-sm transition-all"
                        style={{
                            width: `${stat.progress}%`,
                            background: `linear-gradient(to right, ${stat.iconColor}, ${stat.bgColor || stat.iconColor})`
                        }}
                    ></div>
                </div>
            )}
            {stat.trend && (
                <p className="mt-4 text-xs text-text-secondary flex items-center gap-1">
                    <span className="text-green-600 font-bold">{stat.trend}</span> so với tuần trước
                </p>
            )}
            {stat.extraContent && (
                <div className="mt-4">
                    {stat.extraContent}
                </div>
            )}
        </div>
    );
};

// FlashCard Component
const FlashCardComponent = ({ card, featured = false }: { card: FlashCard; featured?: boolean }) => {
    return (
        <div className={`group relative overflow-hidden rounded-2xl bg-white dark:bg-[#221429] border border-gray-100 dark:border-[#3A2546] shadow-card transition-all hover:scale-[1.01] hover:shadow-card-hover hover:border-primary/20 ${featured ? 'col-span-1 row-span-1 md:row-span-2' : 'flex flex-col'
            }`}>
            {featured && card.coverImage && (
                <div
                    className="h-48 w-full bg-cover bg-center"
                    style={{ backgroundImage: `url('${card.coverImage}')` }}
                >
                    <div className="absolute right-4 top-4 rounded-lg bg-white/90 px-2 py-1 text-xs font-bold text-gray-900 backdrop-blur-md shadow-sm flex items-center gap-1">
                        <IoStarSharp className="inline align-middle text-yellow-500" size={14} /> {card.rating}
                    </div>
                </div>
            )}

            <div className={featured ? "p-6" : "p-4"}>
                {!featured && (
                    <div className="flex items-start justify-between">
                        <div className={`size-12 rounded-xl flex items-center justify-center shadow-md
                            }`}
                            style={{ backgroundColor: `${card.iconColor || '#6b7280'}10`, color: card.iconColor || '#6b7280' }}
                        >
                            <span className="text-2xl">{card.icon}</span>
                        </div>
                        <button className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-primary transition-colors">
                            <IoBookmark size={20} />
                        </button>
                    </div>
                )}

                <div className={featured ? "mb-3 flex gap-2" : "mt-4"}>
                    {featured && (
                        <>
                            <span
                                className="rounded-md px-2 py-1 text-[10px] font-bold uppercase"
                                style={{
                                    backgroundColor: `${'#3b82f6'}10`,
                                    color: '#3b82f6'
                                }}
                            >
                                {card.category}
                            </span>
                            <span
                                className="rounded-md px-2 py-1 text-[10px] font-bold uppercase"
                                style={{
                                    backgroundColor: `${'#8b5cf6'}10`,
                                    color: '#8b5cf6'
                                }}
                            >
                                {card.difficulty}
                            </span>
                        </>
                    )}
                </div>

                <h3 className={`font-bold text-text-main mb-2 group-hover:text-primary transition-colors ${featured ? "text-2xl" : "text-lg"
                    }`}>
                    {card.title}
                </h3>

                <p className={`text-text-secondary line-clamp-2 mb-4 ${featured ? "text-sm" : "text-xs mt-1"}`}>
                    {card.description}
                </p>

                {featured ? (
                    <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                        <div className="flex items-center gap-2">
                            <div
                                className="size-8 rounded-full bg-gray-200 bg-cover shadow-sm"
                                style={{ backgroundImage: `url('${card.author.avatar}')` }}
                            ></div>
                            <div className="flex flex-col">
                                <span className="text-xs font-bold text-text-main">{card.author.name}</span>
                                <span className="text-[10px] text-gray-500">{card.author.role}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 text-gray-400">
                            <div className="flex items-center gap-1 text-xs">
                                <MdStyle size={14} /> {card.cardCount} thẻ
                            </div>
                            <div className="flex items-center gap-1 text-xs">
                                <MdVisibility size={14} /> {card.views.toLocaleString()}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                        <span>{card.cardCount} thẻ</span>
                        <span className="flex items-center gap-1">
                            <IoStarSharp className="text-yellow-500" size={12} /> {card.rating}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

// Activity Component
const ActivityComponent = ({ activity }: { activity: Activity }) => {
    const getActivityIcon = () => {
        switch (activity.type) {
            case 'create': return 'add_circle';
            case 'complete': return 'check_circle';
            case 'review': return 'star';
            default: return 'circle';
        }
    };

    return (
        <div className="flex gap-4 group">
            <div className="relative flex flex-col items-center">
                <div
                    className="size-2 rounded-full mt-2 shadow-sm shrink-0"
                    style={{
                        backgroundColor: activity.color,
                        boxShadow: `0 0 8px ${activity.color}40`
                    }}
                ></div>
                <div className="w-px h-full bg-gray-200 mt-1 group-last:hidden"></div>
            </div>
            <div className="flex-1 pb-2">
                <div className="flex items-center gap-2 mb-1">
                    <div
                        className="size-6 rounded-full bg-cover shadow-sm"
                        style={{ backgroundImage: `url('${activity.user.avatar}')` }}
                    ></div>
                    <span className="text-sm font-bold text-text-main">{activity.user.name}</span>
                    <span className="text-xs text-text-secondary">{activity.content}</span>
                    <span className="text-xs text-gray-400 ml-auto">{activity.timestamp}</span>
                </div>
                {activity.details && (
                    <p className="text-sm text-text-secondary">{activity.details}</p>
                )}
            </div>
        </div>
    );
};

// Category Component
const CategoryComponent = ({ category }: { category: Category }) => {
    const bgColor = category.color;

    return (
        <a
            className="radiant-border group flex flex-col items-center justify-center rounded-xl bg-white dark:bg-[#221429] border border-gray-100 dark:border-[#3A2546] shadow-sm p-6 text-center transition-all hover:shadow-card-hover hover:-translate-y-1"
            href="#"
        >
            <div
                className="mb-3 rounded-full p-3 transition-all duration-300 
                   group-hover:shadow-lg group-hover:scale-110"
                style={{
                    backgroundColor: `${category.color}10`,
                    color: category.color
                }}
            >
                <span className='text-xl'>{category.icon}</span>
            </div>
            <span className="text-sm font-semibold text-text-main transition-colors duration-300 group-hover:font-bold">
                {category.name}
            </span>
        </a>
    );
};

const AvatarStack = ({ users }: { users: string[] }) => {
    return (
        <div className="mt-6 w-full">
            <div className="mt-4 flex -space-x-2 py-1 px-1 overflow-hidden justify-start">
                {users.slice(1).map((avatar, index) => (
                    <div
                        key={index}
                        className="inline-block size-6 rounded-full ring-2 ring-white bg-cover"
                        style={{ backgroundImage: `url('${avatar}')` }}
                    ></div>
                ))}
                <div className="flex size-6 items-center justify-center rounded-full bg-gray-100 text-[10px] font-bold text-gray-600 ring-2 ring-white">
                    +99
                </div>
            </div>
        </div>
    );
};

// Main Component
export default function FlashCardProLight() {
    const [searchQuery, setSearchQuery] = useState('');
    const [users] = useState([
        'https://lh3.googleusercontent.com/aida-public/AB6AXuD2Mo-imlq56ZnMmztX4AAZsy8wibI07nkrm_JCeFd_1VnWumbFrbey4q3gxwhzcS8vhBJREIDtadUQJmzDGSS-KodUWy721L-9QdOXKGz06Q2bF-POxsq_ZQK0dadNwQJVy4A4MBK04FIhaHB0ysJyb3ZSjNKV666eKCZN2xFZXvl6m-VaD4QYuosFQKxuTJt_u-aytdYku1okyezmunwx1yG8w68puXHrmn_a9T3yCgzmhBleT5Nfom4j5jdMrhgmQj6_GinmsKM',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAmlhRO4AjuLbbPV62fmaTZ6-mODAuoG7nqhNj5e8S4Zp1MLjuD8btUpsws5C1W5m_gXknQia1SgYDQv924W9h4nx_YEq8gHEAC6PVdG0tzJGjNIS_4JYuX-nqVYRgU3zg7RbtMFF-eOxoyCUjdoAdCIzEzFi0ng2E4FMa8zoWez8TcEJhxIQHD7j-wlK54X1sGb_RJF0GkzR5z8yPVBzSInF2nMicQ_MNgKdhiQ2YHnPLH0sVrZzCsnelKvDnU5fmZyKcaNzZeFg4',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuA6JaqRs3gp3d_WLDwYQwVXVx4RPlHCErMjUsnYRDJQwtMy0N7AIHnQ-qEgyKMyX6jZn7Ks6n3qASlxnmxpoYW1TKvisr684bn8HHfBvW2xru6hX76lrri02UiDmM9f-8gKCWXkA4K7Y-8BqcXg0JnKHL-KywwDtUlSZ70uBkVgMCXmVpPa2ypUa5lc0mb1M9jQJwvUOZsNIG0AaFDxCE_6NimL8xXlBC0a424gbhbsOXG2qp4ynrIHbWliPZIF7UEDyf9Bk3SZPzk',
    ]);
    const [stats] = useState<StatCard[]>([
        {
            title: 'Bộ thẻ mới tuần này',
            value: '1,248',
            icon: <IoTrendingUp />,
            iconColor: '#10b981',
            progress: 70,
            bgColor: '#3b82f6'
        },
        {
            title: 'Người dùng đang học',
            value: '85.4k',
            icon: <MdOutlineGroups />,
            iconColor: '#3b82f6',
            bgColor: '#3b82f6',
            extraContent: (
                <AvatarStack users={users} />
            )
        },
        {
            title: 'Chủ đề Top 1',
            value: 'English',
            icon: <MdEmojiEvents />,
            iconColor: '#f97316',
            trend: '+12%'
        },
    ]);

    const [featuredCards] = useState<FlashCard[]>([
        {
            id: '1',
            title: 'IELTS Vocabulary Master 8.0+',
            description: 'Tổng hợp 5000 từ vựng nâng cao kèm ví dụ, audio phát âm và hình ảnh minh họa cho kỳ thi IELTS.',
            category: 'Ngôn ngữ',
            difficulty: 'Advanced',
            cardCount: 500,
            rating: 4.9,
            views: 12000,
            author: {
                name: 'Sarah Jenkins',
                role: 'Giáo viên',
                avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAw8I5tjrgrTdl8TjZfqPFdNGmuaG5Mwrz6ZVjng-GkbqRjS8gHXKqKo3713koKJ8IO3yDWBTXjS5qwfzl24_55KCyS0iUk1wkLdInXm6KZq5SlE-9Sx37OxwIKt82vwu3pGqW_AWxQ8EkBgIQM7BdlUwSeWYaf159uN9vHvloGHThZgcLhBUuiE4iI2fuX-m05Yi0inY53gr5v8WdzLpcjNta0lYseqU5RnAAktSWoj7T3ilqMuVoGJMB12HdKKxYhLhJGAVmULQ4'
            },
            tags: ['IELTS', 'Vocabulary', 'Advanced'],
            coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBSTjhGUQsTO4Kyopj49HEYGVpRiBRBZUC8mG2eD34-DhfwQ1QggpcF5uIfWBCr8ZSYjxp0xr_D2jpNkLavgZf1APh_uEnfjUBmQfdhtIZp2X4TOLeHvcivr4cUl670aP-pioxWSnDlGJaSUoDbrj5cttc_Fk8DPYwTn1ga7i_VV_ffTrTnS0ox5hKJQcKpQw4oMQySeMGdnfnnKSHwInAvFdwdfJl7alM8oYmiXOiuOD_xLZnN8zAiT18IG9iCBVFi8vH3rDUJLt4',
            icon: 'school',
            iconColor: '#3b82f6'
        }
    ]);

    const [regularCards] = useState<FlashCard[]>([
        {
            id: '2',
            title: 'JavaScript Algorithms',
            description: 'Cấu trúc dữ liệu & giải thuật JS cơ bản.',
            category: 'Công nghệ',
            difficulty: 'Intermediate',
            cardCount: 120,
            rating: 4.7,
            views: 8500,
            author: {
                name: 'Dev Master',
                role: 'Developer',
                avatar: ''
            },
            tags: ['JavaScript', 'Algorithms'],
            icon: <IoCode />,
            iconColor: '#ec4899'
        },
        {
            id: '3',
            title: 'Sinh học Phân tử',
            description: 'ADN, ARN, và tổng hợp protein.',
            category: 'Khoa học',
            difficulty: 'Advanced',
            cardCount: 85,
            rating: 4.8,
            views: 9200,
            author: {
                name: 'Bio Pro',
                role: 'Giáo viên',
                avatar: ''
            },
            tags: ['Sinh học', 'Phân tử'],
            icon: <MdBiotech />,
            iconColor: '#06b6d4'
        },
        {
            id: '4',
            title: 'Lịch sử Việt Nam',
            description: 'Các triều đại phong kiến VN.',
            category: 'Lịch sử',
            difficulty: 'Beginner',
            cardCount: 210,
            rating: 4.9,
            views: 15600,
            author: {
                name: 'History Lover',
                role: 'Nhà sử học',
                avatar: ''
            },
            tags: ['Lịch sử', 'Việt Nam'],
            icon: <FaEarthEurope />,
            iconColor: '#10b981'
        },
        {
            id: '5',
            title: 'Lý thuyết Màu sắc',
            description: 'Dành cho Designer mới bắt đầu.',
            category: 'Nghệ thuật',
            difficulty: 'Beginner',
            cardCount: 60,
            rating: 4.5,
            views: 4500,
            author: {
                name: 'Design Guru',
                role: 'Designer',
                avatar: ''
            },
            tags: ['Design', 'Màu sắc'],
            icon: <IoColorPalette />,
            iconColor: '#8b5cf6'
        },
    ]);

    const [categories] = useState<Category[]>([
        { id: '1', name: 'Học thuật', icon: <FaSchool />, color: '#3b82f6' },
        { id: '2', name: 'Ngoại ngữ', icon: <MdTranslate />, color: '#10b981' },
        { id: '3', name: 'Công nghệ', icon: <MdOutlineTerminal />, color: '#8b5cf6' },
        { id: '4', name: 'Nghệ thuật', icon: <IoIosBrush />, color: '#f59e0b' },
        { id: '5', name: 'Y học', icon: <MdOutlineHealthAndSafety />, color: '#ef4444' },
        { id: '6', name: 'Khác', icon: <IoIosMore />, color: '#6b7280' },
    ]);

    const [activities] = useState<Activity[]>([
        {
            id: '1',
            type: 'create',
            user: {
                name: 'Minh Anh',
                avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDNtMv029TbdY6ZhXVSfEsNmipQKZt6yoBk6p84txgOefR5PQhYClfN1d6O_S3mf9EHKxrBX2MtrndGB3ef_51PuttkjmBLUVy5i-2tYNe1r3qZOnYaKgyXdSgja_umNH7_hNMIFjGc31I_cXFvJc7-sNTrbOaedQYfVslRPJNt2ooIZfuvUilAZy263fh-N-o35OVRd6Y_eVEPjcVlUC6TxK6KCOBvYnXx14ChO6JNISCNFd_Lcw-iAIVZSV0pIuyd4wutgUSj3rA'
            },
            content: 'vừa tạo bộ thẻ mới',
            details: 'Tâm lý học hành vi - 45 thẻ • Cơ bản',
            timestamp: '2 phút trước',
            color: '#a60df2'
        },
        {
            id: '2',
            type: 'complete',
            user: {
                name: 'John Doe',
                avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCQafg6V9bxPCyJADy0oUiuFDjlOwyntlRVsOFZxX_3P5e8munFVYapfNx1Lg3zUXM5V5uabDqd3i95M_qx1yjxb_d2ly143O8xM-URJ4cQxLUUHWNwJHJYfbos0GHgyhgrAimmY-K6w902Xx-vDRhoEjHfeBkwt9w3TGbaCLVK_-JEYo0cC_YahDr_MQDet31U2OClH9Q8av3E33PbUOv2zm6kPZqaYSOOg9NE9dR39oOLRkFgwdovUy6lAqkNZL9-JE5ZFSWtPRQ'
            },
            content: 'đã hoàn thành thử thách',
            details: 'Đã học xong 100 từ vựng Topic: Business trong 30 phút!',
            timestamp: '15 phút trước',
            color: '#10b981'
        },
        {
            id: '3',
            type: 'review',
            user: {
                name: 'Lan Chi',
                avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDfVIHt556VHPFS6w1KaSGG8GPU08pBOR5ke8cmcYmwy_4b5qUsH8ldbINYsHBgPex338syZcXbub729KGnQG00HfeT2Dlh_-AZcFXwptpoGDCNohYfj9qYYz8JawyqzWrIOlmJGPMyApv_c9IdWLXwKzhSsp9Z_HbCSOSNcMUyAS2-iXUGwlPThJeauHg8BLLiIXTo515PEgt8t7PHgB56batkIc2WNgZoHw0pkvdD8c5t8Pn1icNYfu8DQnKKqJ9YnVOeLhYcxwY'
            },
            content: 'đánh giá 5 sao',
            details: '"Bộ thẻ Kanji N3 rất chi tiết và dễ nhớ. Cảm ơn tác giả!"',
            timestamp: '1 giờ trước',
            color: '#f59e0b'
        },
    ]);



    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleStartLearning = () => {
        console.log('Start learning clicked');
        // Add your start learning logic here
    };

    const handleCreateNewSet = () => {
        console.log('Create new set clicked');
        // Add your create new set logic here
    };

    const handleJoinChallenge = () => {
        console.log('Join challenge clicked');
        // Add your join challenge logic here
    };

    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root">
            <main className="flex-1 flex flex-col items-center w-full">
                {/* Hero Section with Gradient Background */}
                <div className="relative w-full overflow-hidden">
                    {/* Background Gradient Orbs */}
                    <div className="absolute top-[-20%] left-[-10%] h-[500px] w-[500px] rounded-full bg-primary/20 blur-[120px]"></div>
                    <div className="absolute bottom-[-10%] right-[-5%] h-[400px] w-[400px] rounded-full bg-blue-200/40 blur-[90px] mix-blend-multiply"></div>
                    <div className="absolute top-[20%] right-[20%] h-[200px] w-[200px] rounded-full bg-pink-200/30 blur-[60px] mix-blend-multiply"></div>
                    <div className="absolute inset-0 -z-10 pointer-events-none">
                        <BackgroundLines className="opacity-30 dark:opacity-20 h-screen!">
                            <></>
                        </BackgroundLines>
                    </div>
                    <div className="mx-auto flex max-w-7xl flex-col items-center px-6 py-16 md:py-24 relative z-10 text-center">
                        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/60 dark:bg-[#20092D] px-3 py-1 mb-6 backdrop-blur-md shadow-sm">
                            <span className="flex size-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(74,222,128,0.5)]"></span>
                            <span className="text-xs font-bold text-primary uppercase tracking-wider">
                                Power Card
                            </span>
                        </div>

                        <h1 className="mb-6 text-5xl md:text-7xl font-black leading-tight tracking-tight text-text-main">
                            <span className="relative inline-block">
                                <span className="opacity-0 font-black leading-tight tracking-tight select-none">
                                    Khai phá
                                </span>

                                <span
                                    className="absolute inset-0 font-black leading-tight tracking-tight bg-clip-text text-transparent pointer-events-none animate-gradient"
                                    style={{
                                        backgroundImage:
                                            'linear-gradient(90deg, #22d3ee, #a855f7, #ec4899, #a855f7, #22d3ee)',
                                        backgroundSize: '400% 100%',
                                        backgroundRepeat: 'no-repeat'
                                    }}
                                >
                                    Khai phá
                                </span>
                            </span>{" "}
                            Tiềm Năng <br className="hidden md:block" />
                            Tri Thức Vô Tận
                        </h1>

                        <p className="mb-10 max-w-2xl text-lg text-text-secondary md:text-xl font-light">
                            Truy cập kho tàng kiến thức khổng lồ với hơn 1 triệu bộ thẻ được tạo bởi cộng đồng chuyên gia hàng đầu.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                            <button
                                onClick={handleStartLearning}
                                className="group relative flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-8 text-base font-bold text-white shadow-glow transition-all hover:bg-primary-dark hover:scale-105 hover:shadow-glow-lg"
                            >
                                <span>Bắt đầu học ngay</span>
                                <GoArrowRight />
                            </button>

                            <button
                                onClick={handleCreateNewSet}
                                className="flex h-12 items-center justify-center gap-2 rounded-full border border-gray-200 dark:border-[#2E2833] bg-white dark:bg-[#1E1725] px-8 text-base font-medium text-text-main shadow-sm transition-all hover:bg-gray-50 hover:border-gray-300 "
                            >
                                <FaCirclePlus className='text-xl text-primary' />
                                <span>Tạo bộ thẻ mới</span>
                            </button>
                        </div>

                        {/* Advanced Search Bar */}
                        <div className="w-full max-w-5xl mt-12">
                            <div className="relative group">
                                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary via-purple-400 to-pink-400 blur-xl opacity-20 transition duration-1000 group-hover:opacity-40 -z-10"/>

                                <div className="glass-card flex flex-col gap-4 rounded-3xl p-4 shadow-xl md:flex-row md:items-center bg-white/90 dark:bg-[#22162D]">
                                    <div className="flex flex-1 items-center gap-3 rounded-full bg-[#F1F5F9] px-4 py-3 border border-gray-200 dark:border-[#3A2A4D] focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/20 transition-all dark:bg-[#1D1023]">
                                        <IoSearch className="text-gray-400" size={20} />
                                        <input
                                            className="w-full bg-transparent text-text-main placeholder-gray-400 focus:outline-none border-none p-0 text-base"
                                            placeholder="Tìm kiếm chủ đề, tác giả, thẻ tag..."
                                            type="text"
                                            value={searchQuery}
                                            onChange={handleSearch}
                                        />
                                    </div>

                                    <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
                                        <button className="flex shrink-0 items-center gap-2 rounded-lg bg-[#F1F5F9] dark:bg-[#2D1B36] hover:bg-purple-50 hover:text-primary hover:border-primary/20 border border-transparent px-3 py-2 text-sm font-medium text-text-secondary transition-colors">
                                            <span>Chủ đề</span>
                                            <MdKeyboardArrowDown />
                                        </button>
                                        <button className="flex shrink-0 items-center gap-2 rounded-lg bg-[#F1F5F9] dark:bg-[#2D1B36] hover:bg-purple-50 hover:text-primary hover:border-primary/20 border border-transparent px-3 py-2 text-sm font-medium text-text-secondary transition-colors">
                                            <span>Độ khó</span>
                                            <MdKeyboardArrowDown />
                                        </button>
                                        <button className="flex shrink-0 items-center gap-2 rounded-lg bg-[#F1F5F9] dark:bg-[#2D1B36] hover:bg-purple-50 hover:text-primary hover:border-primary/20 border border-transparent px-3 py-2 text-sm font-medium text-text-secondary transition-colors">
                                            <span>Ngôn ngữ</span>
                                            <MdKeyboardArrowDown />
                                        </button>

                                        <div className="w-[1px] h-8 bg-gray-200 mx-1 hidden md:block" />

                                        <button className="shrink-0 rounded-lg bg-primary p-2 text-white shadow-glow-sm hover:bg-primary-dark transition-colors">
                                            <IoFilter size={20} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Stats & Insights Grid */}
                <div className="mx-auto mt-16 grid w-full max-w-7xl grid-cols-1 gap-6 px-6 sm:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat, index) => (
                        <StatCard key={index} stat={stat} />
                    ))}

                    {/* Stat Card 4 (CTA) */}
                    <div
                        onClick={handleJoinChallenge}
                        className="group relative overflow-hidden rounded-2xl p-6 transition-all cursor-pointer bg-gradient-to-br from-primary/10 to-blue-50 dark:from-[var(--primary-dark-start)] dark:via-[var(--primary-dark-mid)] dark:to-[var(--primary-dark-end)] border border-primary/20 hover:border-primary/40 hover:shadow-glow-sm"
                    >
                        <div className="flex h-full flex-col justify-between">
                            <div>
                                <h3 className="text-lg font-bold text-text-main">Thử thách hàng ngày</h3>
                                <p className="text-sm text-text-secondary mt-1">Hoàn thành 50 thẻ mới hôm nay.</p>
                            </div>
                            <button className="mt-4 w-full rounded-lg bg-primary py-2 text-sm font-bold text-white shadow-glow hover:bg-primary-dark transition-colors">
                                Tham gia ngay
                            </button>
                        </div>
                    </div>
                </div>

                {/* Featured Section */}
                <div className="mx-auto mt-20 flex w-full max-w-7xl flex-col px-6">
                    <div className="mb-8 flex items-end justify-between">
                        <div>
                            <h2 className="text-3xl font-bold text-text-main">Nổi Bật & Đề Xuất</h2>
                            <p className="mt-2 text-text-secondary">Các bộ thẻ được cộng đồng đánh giá cao nhất tuần qua</p>
                        </div>
                        <a className="hidden text-sm font-bold text-primary hover:text-primary-dark md:block transition-colors" href="#">
                            Xem tất cả -&gt;
                        </a>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                        {/* Featured Card */}
                        {featuredCards.map(card => (
                            <FlashCardComponent key={card.id} card={card} featured={true} />
                        ))}

                        {/* Regular Cards */}
                        {regularCards.map(card => (
                            <FlashCardComponent key={card.id} card={card} featured={false} />
                        ))}
                    </div>
                </div>

                {/* Categories Grid */}
                <div className="mx-auto mt-20 w-full max-w-7xl px-6">
                    <h2 className="mb-8 text-2xl font-bold text-text-main">Khám phá theo Chủ đề</h2>
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
                        {categories.map(category => (
                            <CategoryComponent key={category.id} category={category} />
                        ))}
                    </div>
                </div>

                {/* Community Activity Feed */}
                <div className="mx-auto mt-20 mb-20 w-full max-w-7xl px-6">
                    <div className="rounded-2xl bg-white dark:bg-[#221429] border border-gray-100 dark:border-[#3A2546] shadow-card p-8">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-text-main flex items-center gap-2">
                                <MdOutlinePublic size={24} className="text-primary" />
                                Hoạt động Cộng đồng
                            </h2>
                            <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
                        </div>

                        <div className="space-y-6">
                            {activities.map(activity => (
                                <ActivityComponent key={activity.id} activity={activity} />
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}