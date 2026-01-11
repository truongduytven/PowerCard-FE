"use client"
import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Trending from '@/components/explore/trending';
import GradientText from '@/components/aceternity/GradientText';
import { BackgroundLines } from '@/components/ui/background-lines';
export interface ContentItem {
    id: number;
    type: ContentType;
    title: string;
    description?: string;
    color: string;
    icon: string;
    lastModified: string;
    itemsCount?: number; // For folders: number of decks inside
    cards?: number; // For decks: number of cards
    mastered?: number; // For decks: cards mastered
    progress?: number; // For decks: progress percentage
    category?: string;
    isPublic?: boolean;
    likes?: number;
    studySessions?: number;
}

type ContentType = "folder" | "deck" | "popular";
type TabKey = "trending" | "newest" | "recommended";

export default function Explore() {
    const [search, setSearch] = useState<string>("");
    const tabUI = `flex h-11 shrink-0 items-center justify-center gap-x-2 rounded-full px-6 transition-all duration-300 hover:-translate-y-0.5 data-[state=active]:bg-primary dark:data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-radiant data-[state=active]:hover:shadow-radiant-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700`;
    const decks: ContentItem[] = [
        {
            id: 5,
            type: "deck",
            title: "JavaScript Fundamentals",
            description: "Core concepts and modern JavaScript features",
            color: "from-violet-500 to-purple-500",
            icon: "⚡",
            lastModified: "2h ago",
            cards: 45,
            mastered: 32,
            progress: 71,
            category: "Programming",
            isPublic: true,
            likes: 24,
            studySessions: 18
        },
        {
            id: 6,
            type: "deck",
            title: "Spanish Vocabulary",
            description: "Essential Spanish words for daily conversation",
            color: "from-fuchsia-500 to-pink-500",
            icon: "🇪🇸",
            lastModified: "Yesterday",
            cards: 120,
            mastered: 85,
            progress: 71,
            category: "Language",
            isPublic: true,
            likes: 56,
            studySessions: 42
        },
        {
            id: 7,
            type: "deck",
            title: "Biology Chapter 5",
            description: "Cell structure and function",
            color: "from-amber-500 to-yellow-500",
            icon: "🧬",
            lastModified: "3 days ago",
            cards: 67,
            mastered: 23,
            progress: 34,
            category: "Science",
            isPublic: false
        },
        {
            id: 8,
            type: "deck",
            title: "React Hooks Advanced",
            description: "Deep dive into custom hooks and optimization",
            color: "from-indigo-500 to-blue-500",
            icon: "⚛️",
            lastModified: "5h ago",
            cards: 34,
            mastered: 28,
            progress: 82,
            category: "Programming",
            isPublic: true,
            likes: 92,
            studySessions: 15
        },
        {
            id: 9,
            type: "deck",
            title: "French Grammar",
            description: "Essential grammar rules and conjugations",
            color: "from-blue-500 to-indigo-500",
            icon: "🇫🇷",
            lastModified: "1 week ago",
            cards: 89,
            mastered: 45,
            progress: 51,
            category: "Language",
            isPublic: true,
            likes: 31,
            studySessions: 25
        },
        {
            id: 10,
            type: "deck",
            title: "Physics Formulas",
            description: "Important formulas for mechanics and thermodynamics",
            color: "from-red-500 to-orange-500",
            icon: "⚛️",
            lastModified: "4 days ago",
            cards: 56,
            mastered: 38,
            progress: 68,
            category: "Science",
            isPublic: false
        },
    ];

    return (
        <div className="relative flex min-h-screen w-full flex-col group/design-root overflow-x-hidden">
            <div className="absolute top-0 left-0 w-full h-[600px] bg-linear-to-br from-purple-100/80 via-white to-white dark:bg-linear-to-br dark:from-[#1C1923] dark:via-[#1C1923] dark:to-[#1C1923] -z-10"></div>
            <div className="absolute top-20 -right-4 w-[300px] h-[300px] bg-primary/5 dark:bg-[#06b6d4]/10 rounded-full blur-3xl -z-10 animate-pulse-slow"></div>
            <div className="absolute top-5 left-[-100px] w-[500px] h-[300px] bg-pink-400/10 dark:bg-[#a855f7]/10 rounded-full blur-3xl -z-10"></div>
            <div className="absolute inset-0 -z-10 pointer-events-none">
                <BackgroundLines className="opacity-30 dark:opacity-20">
                    <></>
                </BackgroundLines>
            </div>
            <div className="layout-container flex h-full grow flex-col">
                <div className="flex flex-1 justify-center py-5">
                    <div className="layout-content-container flex flex-col w-full max-w-7xl flex-1 px-4 sm:px-6 md:px-8">
                        <main className="flex flex-col gap-8 pt-4 pb-12">
                            <div className="flex flex-col items-center gap-8 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                                <div className="flex max-w-3xl flex-col gap-4 text-center">
                                    <h1 className="max-w-lg mx-auto text-slate-900 dark:text-white text-4xl md:text-6xl font-black leading-tight tracking-[-0.033em] drop-shadow-sm">
                                        Khám phá{" "}
                                        <span className="inline-block">
                                            <GradientText
                                                colors={["#22d3ee", "#a855f7", "#ec4899", "#a855f7", "#22d3ee"]}
                                                animationSpeed={3}
                                                showBorder={false}
                                                className="inline font-inherit text-inherit leading-inherit tracking-inherit"
                                            >
                                                Vũ trụ Tri thức
                                            </GradientText>
                                        </span>
                                    </h1>
                                    <p className="text-slate-600 dark:text-slate-400 text-lg font-normal leading-relaxed max-w-2xl mx-auto">
                                        Tìm kiếm, chia sẻ và chinh phục mọi kiến thức với hàng ngàn bộ flashcard từ cộng đồng.
                                    </p>
                                </div>

                                <div className="w-full max-w-2xl px-4 relative z-20">

                                    <div className="absolute inset-0 bg-linear-to-r from-primary via-purple-400 to-pink-400 rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition duration-1000 -z-10"></div>
                                    <label className="relative flex flex-col h-16 w-full group transition-all duration-300 transform hover:scale-[1.01]">
                                        <div className="flex w-full flex-1 items-center rounded-2xl h-full shadow-lg bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 ring-1 ring-transparent focus-within:ring-primary/50 focus-within:border-primary transition-all">
                                            <div className="text-slate-400 pl-6 pr-3">
                                                <span className="material-symbols-outlined text-3xl">
                                                    <img src="/search.gif" alt="" className="w-6 h-6 dark:invert dark:saturate-0" />
                                                </span>
                                            </div>
                                            <input
                                                type='text'
                                                className="flex w-full min-w-0 flex-1 bg-transparent text-slate-800 dark:text-slate-200 focus:outline-none placeholder:text-slate-400 text-lg font-medium h-full rounded-2xl"
                                                placeholder="Tìm kiếm chủ đề, tác giả, bộ thẻ..."
                                                value={search}
                                                onChange={(e) => setSearch(e.target.value)}
                                            />
                                            <button className="mr-2 p-2 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-primary hover:text-white transition-colors text-slate-500">
                                                <span className="material-symbols-outlined">
                                                    <img src="/tuning.png" alt="" className="w-6 h-6" />
                                                </span>
                                            </button>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            <div className="w-full animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                                <div className="flex items-center justify-between px-4 mb-4">
                                    <h3 className="text-slate-900 dark:text-white text-xl font-bold">
                                        <img src="/shape.gif" alt="" className='w-8 h-8 inline-block mr-2' />
                                        Chủ đề nổi bật</h3>
                                    <a className="text-primary text-lg font-semibold hover:underline" href="#">
                                        Xem tất cả
                                        <img src="/arrow-right.gif" alt="" className='w-6 h-6 inline-block dark:invert dark:saturate-0' />
                                    </a>
                                </div>

                                <div className="relative w-full group">
                                    <div className="absolute left-0 top-0 bottom-0 w-8 bg-linear-to-r from-background-light dark:from-background-dark to-transparent z-10 pointer-events-none"></div>
                                    <div className="absolute right-0 top-0 bottom-0 w-8 bg-linear-to-l from-background-light dark:from-background-dark to-transparent z-10 pointer-events-none"></div>

                                    <div className="flex gap-4 overflow-x-auto pb-4 px-4 snap-x no-scrollbar scroll-smooth">
                                        {[
                                            { icon: '/science.gif', label: 'Khoa học', color: 'red' },
                                            { icon: '/history.gif', label: 'Lịch sử', color: 'amber' },
                                            { icon: '/language.gif', label: 'Ngôn ngữ', color: 'blue' },
                                            { icon: '/math.gif', label: 'Toán học', color: 'gray' },
                                            { icon: '/palette.gif', label: 'Nghệ thuật', color: 'green' },
                                            { icon: '/coding.gif', label: 'Công nghệ', color: 'pink' },
                                            { icon: '/psychology.gif', label: 'Tâm lý', color: 'orange' },
                                        ].map((topic, index) => (
                                            <button
                                                key={index}
                                                className="snap-start shrink-0 flex items-center gap-3 pl-2 pr-5 py-2 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-radiant hover:border-primary/40 hover:-translate-y-1 transition-all duration-300 cursor-pointer group/cat"
                                            >
                                                <div className={`flex items-center justify-center w-10 h-10 rounded-full bg-${topic.color}-100 text-${topic.color}-600 group-hover/cat:bg-${topic.color}-600 group-hover/cat:text-white transition-colors`}>
                                                    <img src={topic.icon} alt={topic.label} className="w-8 h-8" />
                                                </div>
                                                <span className="font-semibold text-slate-700 dark:text-slate-200 group-hover/cat:text-primary transition-colors">
                                                    {topic.label}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <Tabs className="flex flex-col gap-6 space-y-8 animate-fade-in-up" defaultValue="trending" style={{ animationDelay: '300ms' }}>
                                <div className="flex justify-center px-4">
                                    <TabsList className="flex gap-3 flex-wrap bg-transparent">
                                        <TabsTrigger value="trending" className={tabUI}>
                                            <img src="/growth.gif" className="w-8 h-8" />
                                            <span className="text-sm font-bold cursor-pointer">Xu hướng</span>
                                        </TabsTrigger>

                                        <TabsTrigger value="newest" className={tabUI}>
                                            <img src="/new.gif" className="w-8 h-8" />
                                            <span className="text-sm font-medium cursor-pointer">Mới nhất</span>
                                        </TabsTrigger>

                                        <TabsTrigger value="recommended" className={tabUI}>
                                            <img src="/recommend.gif" className="w-8 h-8" />
                                            <span className="text-sm font-medium cursor-pointer">Dành cho bạn</span>
                                        </TabsTrigger>
                                    </TabsList>
                                </div>

                                <TabsContent value="trending">
                                    <Trending
                                        decks={decks}
                                    />
                                </TabsContent>

                                <TabsContent value="newest" className="mt-8">
                                    <div>hello</div>
                                </TabsContent>
                            </Tabs>
                        </main>
                    </div>
                </div>
            </div>
        </div>
    );
}
