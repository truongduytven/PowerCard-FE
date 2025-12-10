
"use client";
import React, { useState } from "react";
import { 
  BookOpen, Search, Plus, Filter, Grid3x3, List,
  Clock, Target, MoreVertical, Edit2, Trash2, 
  FolderOpen, Folder, ChevronRight, Lock, Users,
  Play, Share2, Download, Copy, Star, Zap,
  FolderPlus, BookPlus, ChevronDown, ChevronUp,
  Archive, Grid, LayoutGrid, GripVertical
} from "lucide-react";

type ContentType = "deck" | "folder";
type ViewMode = "grid" | "list";

interface ContentItem {
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

export default function MyDecksPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [createMenuOpen, setCreateMenuOpen] = useState(false);
  const [foldersExpanded, setFoldersExpanded] = useState(true);
  const [decksExpanded, setDecksExpanded] = useState(true);
  
  const categories = ["all", "Programming", "Language", "Science", "History", "Math"];
  
  // Sample data
  const folders: ContentItem[] = [
    {
      id: 1,
      type: "folder",
      title: "Programming",
      description: "All programming related decks",
      color: "from-blue-500 to-cyan-500",
      icon: "💻",
      lastModified: "2 days ago",
      itemsCount: 3
    },
    {
      id: 2,
      type: "folder",
      title: "Language Learning",
      description: "Spanish, French, and Japanese",
      color: "from-orange-500 to-red-500",
      icon: "🗣️",
      lastModified: "1 week ago",
      itemsCount: 2
    },
    {
      id: 3,
      type: "folder",
      title: "Science",
      description: "Biology, Chemistry, Physics",
      color: "from-emerald-500 to-teal-500",
      icon: "🔬",
      lastModified: "3 days ago",
      itemsCount: 1
    },
    {
      id: 4,
      type: "folder",
      title: "Exam Preparation",
      description: "Study materials for upcoming exams",
      color: "from-purple-500 to-pink-500",
      icon: "📚",
      lastModified: "5 days ago",
      itemsCount: 4
    },
  ];
  
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

  // Filter logic
  const filteredFolders = folders.filter(folder =>
    folder.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    folder.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredDecks = decks.filter(deck => {
    const matchesSearch = deck.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         deck.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || deck.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCreate = (type: ContentType) => {
    setCreateMenuOpen(false);
    console.log(`Create new ${type}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-50 to-fuchsia-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-fuchsia-950/20">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-fuchsia-300/20 dark:bg-fuchsia-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-violet-300/20 dark:bg-violet-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-fuchsia-900 to-gray-900 dark:from-white dark:via-fuchsia-200 dark:to-white">
                My Content
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Organize and study your flashcard collections
              </p>
            </div>
            
            {/* Create Button with Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setCreateMenuOpen(!createMenuOpen)}
                className="group flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-fuchsia-600 to-violet-600 hover:from-fuchsia-700 hover:to-violet-700 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-fuchsia-500/30 hover:shadow-xl hover:shadow-fuchsia-500/40 hover:scale-105"
              >
                <Plus className="h-5 w-5 group-hover:rotate-90 transition-transform duration-300" />
                Create New
              </button>
              
              {/* Dropdown Menu */}
              {createMenuOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40"
                    onClick={() => setCreateMenuOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-64 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-xl shadow-2xl shadow-fuchsia-500/20 z-50 overflow-hidden">
                    <div className="p-3 border-b border-gray-200/50 dark:border-gray-700/50">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">Create New</p>
                    </div>
                    <div className="p-2">
                      <button
                        onClick={() => handleCreate("deck")}
                        className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-gray-100/80 dark:hover:bg-gray-700/80 transition-colors duration-200 group"
                      >
                        <div className="p-2 bg-gradient-to-br from-fuchsia-500/10 to-violet-500/10 rounded-lg group-hover:scale-110 transition-transform duration-300">
                          <BookPlus className="h-5 w-5 text-fuchsia-600 dark:text-fuchsia-400" />
                        </div>
                        <div className="text-left">
                          <p className="font-semibold text-gray-900 dark:text-white">New Deck</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">Create a flashcard deck</p>
                        </div>
                      </button>
                      
                      <button
                        onClick={() => handleCreate("folder")}
                        className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-gray-100/80 dark:hover:bg-gray-700/80 transition-colors duration-200 group"
                      >
                        <div className="p-2 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-lg group-hover:scale-110 transition-transform duration-300">
                          <FolderPlus className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="text-left">
                          <p className="font-semibold text-gray-900 dark:text-white">New Folder</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">Organize your decks</p>
                        </div>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500 to-violet-500 rounded-xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none" />
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-fuchsia-500 transition-colors duration-300 z-10" />
                <input
                  type="text"
                  placeholder="Search folders and decks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-12 pl-12 pr-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/50 dark:focus:ring-fuchsia-600/50 focus:border-transparent transition-all duration-300"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="relative min-w-[200px]">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none z-10" />
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-9 pr-8 py-2.5 h-12 border border-gray-300 dark:border-gray-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-fuchsia-500/50 dark:focus:ring-fuchsia-600/50 focus:border-transparent appearance-none bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-gray-900 dark:text-white transition-all duration-300"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === "all" ? "All Categories" : cat}
                  </option>
                ))}
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-300 dark:border-gray-600 rounded-xl p-1 h-12">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  viewMode === "grid"
                    ? "bg-gradient-to-r from-fuchsia-600 to-violet-600 text-white shadow-lg"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                <Grid3x3 className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  viewMode === "list"
                    ? "bg-gradient-to-r from-fuchsia-600 to-violet-600 text-white shadow-lg"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                <List className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Folders Section */}
        <div className="mb-12">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-xl">
                <Folder className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Folders</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {filteredFolders.length} folder{filteredFolders.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setFoldersExpanded(!foldersExpanded)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                {foldersExpanded ? (
                  <ChevronUp className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                )}
              </button>
            </div>
          </div>

          {/* Folders Grid/List */}
          {foldersExpanded && (
            <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" : "space-y-3"}>
              {filteredFolders.length > 0 ? (
                filteredFolders.map((folder) => (
                  viewMode === "grid" ? (
                    // Grid View for Folders
                    <div
                      key={folder.id}
                      className="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-5 hover:shadow-2xl hover:shadow-blue-500/10 dark:hover:shadow-blue-500/20 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      <div className="relative">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className={`text-2xl p-3 rounded-xl bg-gradient-to-br ${folder.color} bg-opacity-10 group-hover:scale-110 transition-transform duration-300`}>
                              {folder.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-bold text-gray-900 dark:text-white text-base mb-1 line-clamp-1">
                                {folder.title}
                              </h3>
                              <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                                {folder.description}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Stats */}
                        <div className="mb-4">
                          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <FolderOpen className="h-4 w-4" />
                            <span>{folder.itemsCount} deck{folder.itemsCount !== 1 ? 's' : ''}</span>
                          </div>
                        </div>

                        {/* Meta Info */}
                        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {folder.lastModified}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                          <button className="flex-1 px-3 py-2 text-sm font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group-hover:scale-105 shadow-lg shadow-blue-500/30">
                            <ChevronRight className="h-3.5 w-3.5" />
                            Open Folder
                          </button>
                          <button className="p-2 border border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-500 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 rounded-lg transition-all duration-300">
                            <Edit2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    // List View for Folders
                    <div
                      key={folder.id}
                      className="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-4 hover:shadow-2xl hover:shadow-blue-500/10 dark:hover:shadow-blue-500/20 transition-all duration-300"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`text-2xl p-3 rounded-xl bg-gradient-to-br ${folder.color} bg-opacity-10`}>
                          {folder.icon}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-gray-900 dark:text-white text-base mb-1">
                            {folder.title}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1 mb-2">
                            {folder.description}
                          </p>
                          
                          <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {folder.lastModified}
                            </div>
                            <div className="flex items-center gap-1">
                              <FolderOpen className="h-3 w-3" />
                              {folder.itemsCount} decks
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <button className="px-4 py-2 text-sm font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-lg transition-all duration-300 flex items-center gap-2 shadow-lg shadow-blue-500/30">
                            <ChevronRight className="h-3.5 w-3.5" />
                            Open
                          </button>
                          <button className="p-2 border border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-500 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 rounded-lg transition-all duration-300">
                            <Edit2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                ))
              ) : (
                <div className="col-span-full py-12 text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/20 dark:to-cyan-900/20 mb-4">
                    <Folder className="h-10 w-10 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    No folders found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {searchQuery 
                      ? `No folders match "${searchQuery}"`
                      : "Create your first folder to organize your decks"}
                  </p>
                  <button
                    onClick={() => handleCreate("folder")}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-lg font-medium transition-all duration-300 shadow-lg shadow-blue-500/30"
                  >
                    <FolderPlus className="h-4 w-4" />
                    New Folder
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Decks Section */}
        <div>
          {/* Section Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-fuchsia-500/10 to-violet-500/10 rounded-xl">
                <BookOpen className="h-6 w-6 text-fuchsia-600 dark:text-fuchsia-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Decks</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {filteredDecks.length} deck{filteredDecks.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setDecksExpanded(!decksExpanded)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                {decksExpanded ? (
                  <ChevronUp className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                )}
              </button>
            </div>
          </div>

          {/* Decks Grid/List */}
          {decksExpanded && (
            <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" : "space-y-3"}>
              {filteredDecks.length > 0 ? (
                filteredDecks.map((deck) => (
                  viewMode === "grid" ? (
                    // Grid View for Decks
                    <div
                      key={deck.id}
                      className="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-5 hover:shadow-2xl hover:shadow-fuchsia-500/10 dark:hover:shadow-fuchsia-500/20 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/5 via-transparent to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      <div className="relative">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className={`text-2xl p-3 rounded-xl bg-gradient-to-br ${deck.color} bg-opacity-10 group-hover:scale-110 transition-transform duration-300`}>
                              {deck.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-bold text-gray-900 dark:text-white text-base line-clamp-1">
                                  {deck.title}
                                </h3>
                                {!deck.isPublic && (
                                  <Lock className="h-3 w-3 text-gray-400" />
                                )}
                              </div>
                              <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                                {deck.description}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Stats */}
                        <div className="flex items-center gap-3 mb-3 text-sm text-gray-600 dark:text-gray-400">
                          <div className="flex items-center gap-1">
                            <BookOpen className="h-3.5 w-3.5" />
                            {deck.cards} cards
                          </div>
                          <div className="flex items-center gap-1">
                            <Target className="h-3.5 w-3.5 text-emerald-500" />
                            {deck.mastered} mastered
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="mb-4">
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="text-gray-600 dark:text-gray-400">Progress</span>
                            <span className="font-semibold text-gray-900 dark:text-white">{deck.progress}%</span>
                          </div>
                          <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div 
                              className={`h-full bg-gradient-to-r ${deck.color} transition-all duration-500 rounded-full`}
                              style={{ width: `${deck.progress}%` }}
                            />
                          </div>
                        </div>

                        {/* Meta Info */}
                        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {deck.lastModified}
                          </div>
                          {deck.isPublic && (
                            <div className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              <span>{deck.likes}</span>
                            </div>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                          <button className="flex-1 px-3 py-2 text-sm font-semibold bg-gradient-to-r from-fuchsia-600 to-violet-600 hover:from-fuchsia-700 hover:to-violet-700 text-white rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group-hover:scale-105 shadow-lg shadow-fuchsia-500/30">
                            <Play className="h-3.5 w-3.5" />
                            Study
                          </button>
                          <button className="p-2 border border-gray-300 dark:border-gray-600 hover:border-fuchsia-500 dark:hover:border-fuchsia-500 text-gray-600 dark:text-gray-400 hover:text-fuchsia-600 dark:hover:text-fuchsia-500 rounded-lg transition-all duration-300">
                            <Edit2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    // List View for Decks
                    <div
                      key={deck.id}
                      className="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-4 hover:shadow-2xl hover:shadow-fuchsia-500/10 dark:hover:shadow-fuchsia-500/20 transition-all duration-300"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`text-2xl p-3 rounded-xl bg-gradient-to-br ${deck.color} bg-opacity-10`}>
                          {deck.icon}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-bold text-gray-900 dark:text-white text-base">
                              {deck.title}
                            </h3>
                            {!deck.isPublic && (
                              <span className="px-2 py-0.5 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full">
                                Private
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1 mb-2">
                            {deck.description}
                          </p>
                          
                          <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {deck.lastModified}
                            </div>
                            <div className="flex items-center gap-1">
                              <BookOpen className="h-3 w-3" />
                              {deck.cards} cards
                            </div>
                            <div className="flex items-center gap-1">
                              <Target className="h-3 w-3" />
                              {deck.progress}% complete
                            </div>
                            {deck.isPublic && (
                              <div className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                {deck.likes} likes
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <button className="px-4 py-2 text-sm font-semibold bg-gradient-to-r from-fuchsia-600 to-violet-600 hover:from-fuchsia-700 hover:to-violet-700 text-white rounded-lg transition-all duration-300 flex items-center gap-2 shadow-lg shadow-fuchsia-500/30">
                            <Play className="h-3.5 w-3.5" />
                            Study
                          </button>
                          <button className="p-2 border border-gray-300 dark:border-gray-600 hover:border-fuchsia-500 dark:hover:border-fuchsia-500 text-gray-600 dark:text-gray-400 hover:text-fuchsia-600 dark:hover:text-fuchsia-500 rounded-lg transition-all duration-300">
                            <Edit2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                ))
              ) : (
                <div className="col-span-full py-12 text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-fuchsia-100 to-violet-100 dark:from-fuchsia-900/20 dark:to-violet-900/20 mb-4">
                    <BookOpen className="h-10 w-10 text-fuchsia-600 dark:text-fuchsia-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    No decks found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {searchQuery 
                      ? `No decks match "${searchQuery}"`
                      : "Create your first deck to start learning"}
                  </p>
                  <button
                    onClick={() => handleCreate("deck")}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-fuchsia-600 to-violet-600 hover:from-fuchsia-700 hover:to-violet-700 text-white rounded-lg font-medium transition-all duration-300 shadow-lg shadow-fuchsia-500/30"
                  >
                    <BookPlus className="h-4 w-4" />
                    New Deck
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
