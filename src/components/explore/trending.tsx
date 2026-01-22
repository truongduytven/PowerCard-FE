import React from 'react'
import {
    BookOpen, Search, Plus, Filter, Grid3x3, List,
    Clock, Target, MoreVertical, Edit2, Trash2,
    FolderOpen, Folder, ChevronRight, Lock, Users,
    Play, Share2, Download, Copy, Star, Zap,
    FolderPlus, BookPlus, ChevronDown, ChevronUp,
    Archive, Grid, LayoutGrid, GripVertical
} from "lucide-react";
import { ContentItem } from '@/app/[locale]/(user)/explore/page';

interface TrendingProps {
  decks: ContentItem[];
}

export default function Trending({decks}: TrendingProps) {
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 auto-rows-max">

                {decks.map((card) => {
                    const isPopular = card.type === "popular";

                    return (
                        <div
                            key={card.id}
                            className="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-5 hover:shadow-2xl hover:shadow-fuchsia-500/10 dark:hover:shadow-fuchsia-500/20 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/5 via-transparent to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative">
                                {/* Header */}
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`text-2xl p-3 rounded-xl bg-gradient-to-br ${card.color} bg-opacity-10 group-hover:scale-110 transition-transform duration-300`}>
                                            {card.icon}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="font-bold text-gray-900 dark:text-white text-base line-clamp-1">
                                                    {card.title}
                                                </h3>
                                                {!card.isPublic && (
                                                    <Lock className="h-3 w-3 text-gray-400" />
                                                )}
                                            </div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                                                {card.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Stats */}
                                <div className="flex items-center gap-3 mb-3 text-sm text-gray-600 dark:text-gray-400">
                                    <div className="flex items-center gap-1">
                                        <BookOpen className="h-3.5 w-3.5" />
                                        {card.cards} cards
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Target className="h-3.5 w-3.5 text-emerald-500" />
                                        {card.mastered} mastered
                                    </div>
                                </div>

                                {/* Meta Info */}
                                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
                                    <div className="flex items-center gap-1">
                                        <Clock className="h-3 w-3" />
                                        {card.lastModified}
                                    </div>
                                    {card.isPublic && (
                                        <div className="flex items-center gap-1">
                                            <Users className="h-3 w-3" />
                                            <span>{card.likes}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-2">
                                    <button className="flex-1 px-3 py-2 text-sm font-semibold bg-gradient-to-r from-fuchsia-600 to-violet-600 hover:from-fuchsia-700 hover:to-violet-700 text-white rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group-hover:scale-105 shadow-lg shadow-fuchsia-500/30">
                                        <Play className="h-3.5 w-3.5" />
                                        Study
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    )
}
