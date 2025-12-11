"use client";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { SparklesCore } from "@/components/ui/sparkles";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import {
  Award,
  BarChart3,
  BookOpen,
  CheckCircle,
  ChevronRight,
  Clock,
  Filter,
  Flame,
  Globe,
  Lightbulb,
  Play,
  Search,
  Sparkles,
  Star,
  Target,
  Timer,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [isSearchSticky, setIsSearchSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSearchSticky(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const userStats = [
    {
      label: "Study Streak",
      value: "7 days",
      icon: <Flame className="h-5 w-5 text-orange-500" />,
      gradient: "from-orange-500 to-red-500",
    },
    {
      label: "Cards Mastered",
      value: "156",
      icon: <Target className="h-5 w-5 text-emerald-500" />,
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      label: "Study Time",
      value: "5.2 hrs",
      icon: <Timer className="h-5 w-5 text-blue-500" />,
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      label: "Accuracy",
      value: "92%",
      icon: <Award className="h-5 w-5 text-fuchsia-500" />,
      gradient: "from-fuchsia-500 to-purple-500",
    },
  ];

  const recentDecks = [
    {
      id: 1,
      title: "JavaScript Fundamentals",
      cards: 45,
      mastered: 32,
      lastStudied: "2h ago",
      progress: 71,
      category: "Programming",
    },
    {
      id: 2,
      title: "Spanish Vocabulary",
      cards: 120,
      mastered: 85,
      lastStudied: "Yesterday",
      progress: 71,
      category: "Language",
    },
    {
      id: 3,
      title: "Biology Chapter 5",
      cards: 67,
      mastered: 23,
      lastStudied: "3 days ago",
      progress: 34,
      category: "Science",
    },
    {
      id: 4,
      title: "World History",
      cards: 89,
      mastered: 67,
      lastStudied: "1 week ago",
      progress: 75,
      category: "History",
    },
  ];

  const exploreDecks = [
    {
      id: 1,
      title: "React Hooks Guide",
      author: "Alex Chen",
      cards: 52,
      likes: 124,
      category: "Programming",
      rating: 4.8,
    },
    {
      id: 2,
      title: "French Vocabulary A1",
      author: "Marie Dubois",
      cards: 210,
      likes: 89,
      category: "Language",
      rating: 4.5,
    },
    {
      id: 3,
      title: "Organic Chemistry",
      author: "Dr. James Wilson",
      cards: 78,
      likes: 67,
      category: "Science",
      rating: 4.7,
    },
    {
      id: 4,
      title: "Calculus Basics",
      author: "Math Pro",
      cards: 45,
      likes: 92,
      category: "Math",
      rating: 4.6,
    },
  ];

  const categories = [
    "all",
    "Programming",
    "Language",
    "Science",
    "History",
    "Math",
  ];

  const studyTips = [
    "Review for 15 minutes daily",
    "Use spaced repetition",
    "Focus on difficult cards",
    "Create your own decks",
  ];
  const words = `Welcome back, John`;
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-50 to-fuchsia-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-fuchsia-950/20">
      <BackgroundBeams />
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-600/0 via-fuchsia-600/5 to-fuchsia-600/0 blur-xl" />
          <div className="relative">
            <TextGenerateEffect
              words={words}
              className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-fuchsia-900 to-gray-900 dark:from-white dark:via-fuchsia-200 dark:to-white"
            />
            <div className="mt-3 flex items-center gap-2">
              <div className="relative h-5 w-5 flex items-center justify-center">
                <div className="absolute inset-0 bg-fuchsia-500/10 rounded-full blur-sm animate-pulse" />
                <SparklesCore
                  background="transparent"
                  minSize={0.3}
                  maxSize={0.8}
                  particleDensity={800}
                  className="h-full w-full"
                  particleColor="#E879F9"
                  speed={1}
                />
                <div className="absolute h-1 w-1 bg-fuchsia-400 rounded-full animate-ping" />
              </div>

              <p className="text-gray-700 dark:text-gray-300 font-medium pl-1">
                Ready to continue learning?
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {userStats.map((stat, index) => (
            <CardContainer key={index} className="inter-var w-full !py-0">
              <CardBody
                className="
          bg-gray-50 relative group/card  
          dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] 
          border-black/[0.1] 
          dark:bg-gray-800
          w-full h-auto 
          rounded-xl p-6 border 
        "
              >
                <CardItem
                  translateZ="50"
                  className="text-xl font-bold text-neutral-600 dark:text-white flex items-center gap-2"
                >
                  {stat.icon} {stat.label}
                </CardItem>

                <div className="flex justify-start items-center mt-10">
                  <CardItem
                    translateZ={20}
                    className="text-sm font-medium dark:text-white text-neutral-700"
                  >
                    {stat.value}
                  </CardItem>
                </div>
              </CardBody>
            </CardContainer>
          ))}
        </div>

        {/* Sticky Search with glow effect */}
        <div
          className={`mb-8 transition-all rounded-xl duration-300 ${
            isSearchSticky
              ? "sticky top-16 bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-xl pt-2  border-b border-gray-200/50 dark:border-gray-800/50 z-40 shadow-lg"
              : ""
          }`}
        >
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500 to-violet-500 rounded-xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none" />
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-fuchsia-500 transition-colors duration-300 z-10 pointer-events-none" />
              <input
                type="text"
                placeholder="Search decks, topics, or creators..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="relative w-full h-12 pl-12 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/50 dark:focus:ring-fuchsia-600/50 focus:border-transparent transition-all duration-300"
              />
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Your Decks & Explore */}
          <div className="lg:col-span-2 space-y-8">
            {/* Your Recent Decks */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Your Recent Decks
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Continue where you left off
                  </p>
                </div>
                <button className="text-sm font-medium text-fuchsia-600 dark:text-fuchsia-400 hover:text-fuchsia-700 dark:hover:text-fuchsia-300 flex items-center gap-1 group">
                  View all
                  <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {recentDecks.map((deck) => (
                  <div
                    key={deck.id}
                    className="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-5 hover:shadow-2xl hover:shadow-fuchsia-500/10 dark:hover:shadow-fuchsia-500/20 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                  >
                    {/* Animated gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/5 via-transparent to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                    <div className="relative">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2.5 rounded-xl bg-gradient-to-br from-fuchsia-50 to-fuchsia-100 dark:from-fuchsia-900/20 dark:to-fuchsia-800/20 group-hover:scale-110 transition-transform duration-300">
                            <BookOpen className="h-5 w-5 text-fuchsia-600 dark:text-fuchsia-400" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
                              {deck.title}
                            </h3>
                            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                              <span>{deck.cards} cards</span>
                              <span>•</span>
                              <span>{deck.mastered} mastered</span>
                            </div>
                          </div>
                        </div>
                        <div className="px-2.5 py-1 rounded-full bg-gray-100/80 dark:bg-gray-700/80 backdrop-blur-sm text-gray-700 dark:text-gray-300 text-xs font-medium">
                          {deck.category}
                        </div>
                      </div>

                      {/* Progress Circle */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="relative h-12 w-12">
                            <svg
                              className="w-12 h-12 transform -rotate-90"
                              viewBox="0 0 36 36"
                            >
                              <path
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                                strokeLinecap="round"
                                className="text-gray-200 dark:text-gray-700"
                              />
                              <path
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeDasharray={`${deck.progress}, 100`}
                                className="text-fuchsia-600 dark:text-fuchsia-500 transition-all duration-500"
                              />
                            </svg>
                            <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-gray-900 dark:text-white">
                              {deck.progress}%
                            </span>
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">
                            <div className="flex items-center gap-1">
                              <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
                              {deck.progress}% complete
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                          <Clock className="h-3.5 w-3.5" />
                          {deck.lastStudied}
                        </div>
                        <button className="px-4 py-2 text-xs font-semibold bg-gradient-to-r from-fuchsia-600 to-violet-600 hover:from-fuchsia-700 hover:to-violet-700 text-white rounded-lg transition-all duration-300 flex items-center gap-1.5 group-hover:scale-105 shadow-lg shadow-fuchsia-500/30">
                          <Play className="h-3.5 w-3.5" />
                          Study
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Explore Community */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Explore Community
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Top decks from other learners
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative group">
                    <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-hover:text-fuchsia-500 transition-colors duration-300" />
                    <select
                      value={activeCategory}
                      onChange={(e) => setActiveCategory(e.target.value)}
                      className="pl-9 pr-8 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-fuchsia-500/50 dark:focus:ring-fuchsia-600/50 focus:border-transparent appearance-none bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-gray-900 dark:text-white transition-all duration-300"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat === "all" ? "All Categories" : cat}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {exploreDecks
                  .filter(
                    (deck) =>
                      activeCategory === "all" ||
                      deck.category === activeCategory
                  )
                  .map((deck) => (
                    <div
                      key={deck.id}
                      className="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-5 hover:shadow-2xl hover:shadow-violet-500/10 dark:hover:shadow-violet-500/20 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                    >
                      {/* Animated gradient background */}
                      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      {/* Shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                      <div className="relative">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2.5 rounded-xl bg-gradient-to-br from-violet-50 to-violet-100 dark:from-violet-900/20 dark:to-violet-800/20 group-hover:scale-110 transition-transform duration-300">
                              <BookOpen className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
                                {deck.title}
                              </h3>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                by {deck.author}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-900/20 px-2 py-1 rounded-lg">
                            <Star className="h-3.5 w-3.5 text-amber-500 fill-current" />
                            <span className="text-xs font-semibold text-amber-700 dark:text-amber-400">
                              {deck.rating}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
                          <span className="flex items-center gap-1">
                            <Zap className="h-3.5 w-3.5 text-fuchsia-500" />
                            {deck.cards} cards
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="text-pink-500">♥</span>
                            {deck.likes}
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="px-2.5 py-1 bg-gray-100/80 dark:bg-gray-700/80 backdrop-blur-sm text-gray-700 dark:text-gray-300 text-xs rounded-lg font-medium">
                            {deck.category}
                          </div>
                          <button className="px-3 py-1.5 text-xs font-medium text-violet-600 dark:text-violet-400 hover:text-white hover:bg-gradient-to-r hover:from-violet-600 hover:to-purple-600 rounded-lg transition-all duration-300 border border-violet-200 dark:border-violet-800">
                            Preview
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>

              <div className="mt-6 text-center">
                <button className="group inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-fuchsia-600 dark:text-fuchsia-500 hover:text-white bg-fuchsia-50 dark:bg-fuchsia-900/20 hover:bg-gradient-to-r hover:from-fuchsia-600 hover:to-violet-600 rounded-xl transition-all duration-300 border border-fuchsia-200 dark:border-fuchsia-800 hover:border-transparent shadow-lg hover:shadow-fuchsia-500/30">
                  <Globe className="h-4 w-4 group-hover:rotate-12 transition-transform duration-300" />
                  Explore More Decks
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-6 hover:shadow-xl transition-all duration-300 overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/5 via-transparent to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <h3 className="relative font-bold text-gray-900 dark:text-white mb-5 flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-fuchsia-600 dark:text-fuchsia-500" />
                Weekly Progress
              </h3>

              <div className="relative space-y-6">
                {/* Study Sessions */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      Study Sessions
                    </span>
                    <span className="text-xs text-gray-600 dark:text-gray-400">
                      18 sessions
                    </span>
                  </div>

                  <div className="w-full h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-fuchsia-600 dark:bg-fuchsia-500 rounded-full transition-all duration-700"
                      style={{ width: "80%" }}
                    />
                  </div>

                  <div className="text-right text-xs font-bold text-gray-900 dark:text-white mt-1">
                    80%
                  </div>
                </div>

                {/* Cards Reviewed */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      Cards Reviewed
                    </span>
                    <span className="text-xs text-gray-600 dark:text-gray-400">
                      342 cards
                    </span>
                  </div>

                  <div className="w-full h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-violet-600 dark:bg-violet-500 rounded-full transition-all duration-700"
                      style={{ width: "75%" }}
                    />
                  </div>

                  <div className="text-right text-xs font-bold text-gray-900 dark:text-white mt-1">
                    75%
                  </div>
                </div>

                {/* Accuracy */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      Accuracy
                    </span>
                    <span className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1">
                      <TrendingUp className="h-3 w-3 text-emerald-500" /> 87%
                      average
                    </span>
                  </div>

                  <div className="w-full h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-600 dark:bg-emerald-500 rounded-full transition-all duration-700"
                      style={{ width: "87%" }}
                    />
                  </div>

                  <div className="text-right text-xs font-bold text-gray-900 dark:text-white mt-1">
                    87%
                  </div>
                </div>
              </div>
            </div>

            {/* Study Tips */}
            <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-6 hover:shadow-xl transition-all duration-300 overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <h3 className="relative font-bold text-gray-900 dark:text-white mb-5 flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-amber-500 animate-pulse" />
                Study Tips
              </h3>

              <div className="relative space-y-3">
                {studyTips.map((tip, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 group/item hover:translate-x-1 transition-transform duration-300"
                  >
                    <div className="p-1 rounded-full bg-gradient-to-r from-fuchsia-500 to-violet-500 mt-0.5">
                      <div className="h-2 w-2 bg-white dark:bg-gray-800 rounded-full" />
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {tip}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-6 hover:shadow-xl transition-all duration-300 overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <h3 className="relative font-bold text-gray-900 dark:text-white mb-5">
                Quick Stats
              </h3>

              <div className="relative space-y-4">
                <div className="flex items-center justify-between group/stat hover:scale-105 transition-transform duration-300">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-gradient-to-br from-fuchsia-50 to-fuchsia-100 dark:from-fuchsia-900/20 dark:to-fuchsia-800/20">
                      <Flame className="h-5 w-5 text-fuchsia-600 dark:text-fuchsia-500" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        Active Days
                      </div>
                      <div className="text-lg font-bold text-gray-900 dark:text-white">
                        5/7
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between group/stat hover:scale-105 transition-transform duration-300">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-gradient-to-br from-violet-50 to-violet-100 dark:from-violet-900/20 dark:to-violet-800/20">
                      <Users className="h-5 w-5 text-violet-600 dark:text-violet-500" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        Following
                      </div>
                      <div className="text-lg font-bold text-gray-900 dark:text-white">
                        24
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Card */}
            <div className="relative bg-gradient-to-br from-fuchsia-600 to-violet-600 rounded-2xl p-6 hover:shadow-2xl hover:shadow-fuchsia-500/40 transition-all duration-300 overflow-hidden group">
              {/* Animated shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

              {/* Floating particles effect */}
              <div className="absolute top-0 left-1/4 w-2 h-2 bg-white/30 rounded-full animate-ping" />
              <div
                className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-white/30 rounded-full animate-ping"
                style={{ animationDelay: "0.5s" }}
              />

              <div className="relative">
                <h3 className="font-bold text-white mb-2 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 animate-pulse" />
                  Ready to learn?
                </h3>
                <p className="text-sm text-fuchsia-100 mb-5">
                  Start a focused study session with your current decks
                </p>
                <button className="w-full py-3 bg-white hover:bg-gray-50 text-fuchsia-600 rounded-xl font-bold transition-all duration-300 hover:scale-105 shadow-lg">
                  Start Study Session
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
