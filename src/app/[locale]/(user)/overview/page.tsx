"use client";
import {
  Activity,
  ArrowUp,
  BookOpen,
  BrainCircuit,
  CheckCircle,
  ChevronRight,
  Clock,
  Clock as ClockIcon,
  Download,
  Eye,
  EyeOff,
  Filter,
  Play,
  Settings,
  Share2,
  Target,
  Target as TargetIcon,
  TrendingUp,
  Zap,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import cup from "../../../../../public/cup.gif";
import cupIcon from "../../../../../public/cup.webp";
import bird from "../../../../../public/early-bird.gif";
import fast from "../../../../../public/fast-study.gif";
import night from "../../../../../public/night-time.gif";
import streak from "../../../../../public/streak.gif";
import target from "../../../../../public/target.gif";
import streakIcon from "../../../../../public/streak-icon.png";
import timeIcon from "../../../../../public/time-icon.webp";
import accuracyIcon from "../../../../../public/accuracy-icon.webp";
import goalIcon from "../../../../../public/icon-goal.webp";

export default function Overview() {
  const [timeRange, setTimeRange] = useState<"day" | "week" | "month" | "year">(
    "week"
  );
  const [activeDeck, setActiveDeck] = useState<string>("all");
  const [isHeatmapVisible, setIsHeatmapVisible] = useState(true);
  const [animateStats, setAnimateStats] = useState(false);

  useEffect(() => {
    setAnimateStats(true);
  }, []);

  // Sample data
  const learningStats = {
    totalStudyTime: 1245, // minutes
    totalSessions: 42,
    averageSessionTime: 29,
    totalCardsStudied: 892,
    cardsMastered: 567,
    currentStreak: 14,
    longestStreak: 28,
    accuracyRate: 87,
    dailyGoal: 30, // minutes per day
    dailyGoalProgress: 85, // percentage
    decksCompleted: 3,
    totalDecks: 8,
  };

  const weeklyProgress = [
    { day: "Mon", time: 45, cards: 78, accuracy: 92 },
    { day: "Tue", time: 32, cards: 65, accuracy: 88 },
    { day: "Wed", time: 58, cards: 94, accuracy: 85 },
    { day: "Thu", time: 41, cards: 72, accuracy: 90 },
    { day: "Fri", time: 67, cards: 112, accuracy: 94 },
    { day: "Sat", time: 28, cards: 48, accuracy: 82 },
    { day: "Sun", time: 38, cards: 68, accuracy: 89 },
  ];

  const decksProgress = [
    {
      name: "JavaScript Fundamentals",
      progress: 85,
      cardsStudied: 145,
      totalCards: 171,
      mastery: 92,
      color: "from-blue-500 to-cyan-500",
      lastStudied: "2 hours ago",
    },
    {
      name: "Spanish Vocabulary",
      progress: 71,
      cardsStudied: 320,
      totalCards: 450,
      mastery: 88,
      color: "from-orange-500 to-red-500",
      lastStudied: "1 day ago",
    },
    {
      name: "Biology Chapter 5",
      progress: 34,
      cardsStudied: 67,
      totalCards: 197,
      mastery: 76,
      color: "from-emerald-500 to-teal-500",
      lastStudied: "3 hours ago",
    },
    {
      name: "React Hooks Advanced",
      progress: 82,
      cardsStudied: 34,
      totalCards: 41,
      mastery: 95,
      color: "from-violet-500 to-purple-500",
      lastStudied: "5 hours ago",
    },
    {
      name: "French Grammar",
      progress: 51,
      cardsStudied: 89,
      totalCards: 174,
      mastery: 81,
      color: "from-indigo-500 to-blue-500",
      lastStudied: "2 days ago",
    },
    {
      name: "Physics Formulas",
      progress: 68,
      cardsStudied: 56,
      totalCards: 82,
      mastery: 87,
      color: "from-red-500 to-orange-500",
      lastStudied: "1 day ago",
    },
  ];

  const achievements = [
    {
      title: "Streak Master",
      description: "7 consecutive study days",
      icon: streak,
      achieved: true,
      progress: 100,
      size: 30,
      date: "2 days ago",
    },
    {
      title: "Fast Learner",
      description: "Complete 100 cards in one day",
      icon: fast,
      achieved: true,
      progress: 100,
      size: 20,
      date: "1 week ago",
    },
    {
      title: "Perfect Recall",
      description: "95%+ accuracy for 5 sessions",
      icon: target,
      achieved: false,
      progress: 60,
      size: 30,
      date: null,
    },
    {
      title: "Night Owl",
      description: "Study after 10 PM",
      icon: night,
      achieved: true,
      progress: 100,
      size: 24,
      date: "3 days ago",
    },
    {
      title: "Weekend Warrior",
      description: "Study both weekend days",
      icon: cup,
      achieved: false,
      progress: 75,
      size: 24,
      date: null,
    },
    {
      title: "Early Bird",
      description: "Study before 7 AM",
      icon: bird,
      achieved: false,
      progress: 25,
      size: 20,
      date: null,
    },
  ];

  const heatmapData = Array.from({ length: 365 }, (_, i) => ({
    date: new Date(Date.now() - (364 - i) * 24 * 60 * 60 * 1000),
    intensity: Math.floor(Math.random() * 5), // 0-4
  }));

  const learningInsights = [
    {
      title: "Peak Study Time",
      value: "7:00 PM - 9:00 PM",
      icon: "🕖",
      description: "Highest concentration in evening",
      trend: "+12%",
    },
    {
      title: "Most Productive Day",
      value: "Friday",
      icon: "📈",
      description: "Best weekly performance",
      trend: "+18%",
    },
    {
      title: "Mastered Topic",
      value: "Programming",
      icon: "💻",
      description: "Average 94% accuracy",
      trend: "+5%",
    },
    {
      title: "Needs Improvement",
      value: "Vocabulary",
      icon: "📚",
      description: "Study speed can increase 30%",
      trend: "-8%",
    },
  ];

  const recentActivity = [
    {
      deck: "JavaScript Fundamentals",
      action: "Studied 23 cards",
      time: "2 hours ago",
      accuracy: 92,
    },
    {
      deck: "Biology Chapter 5",
      action: "Completed review session",
      time: "3 hours ago",
      accuracy: 85,
    },
    {
      deck: "React Hooks Advanced",
      action: "Mastered 8 new cards",
      time: "5 hours ago",
      accuracy: 95,
    },
  ];

  const getStreakColor = (streak: number) => {
    if (streak >= 21) return "from-purple-500 to-pink-500";
    if (streak >= 14) return "from-red-500 to-orange-500";
    if (streak >= 7) return "from-amber-500 to-yellow-500";
    return "from-green-500 to-emerald-500";
  };

  const getIntensityColor = (intensity: number) => {
    const colors = [
      "bg-gray-200 dark:bg-gray-700",
      "bg-green-200 dark:bg-green-900",
      "bg-green-400 dark:bg-green-700",
      "bg-green-600 dark:bg-green-600",
      "bg-green-800 dark:bg-green-500",
    ];
    return colors[intensity];
  };

  const getMasteryLevel = (mastery: number) => {
    if (mastery >= 90)
      return {
        label: "Expert",
        color: "text-green-600 dark:text-green-400",
        bg: "bg-green-100 dark:bg-green-900/30",
      };
    if (mastery >= 80)
      return {
        label: "Proficient",
        color: "text-blue-600 dark:text-blue-400",
        bg: "bg-blue-100 dark:bg-blue-900/30",
      };
    if (mastery >= 70)
      return {
        label: "Intermediate",
        color: "text-amber-600 dark:text-amber-400",
        bg: "bg-amber-100 dark:bg-amber-900/30",
      };
    return {
      label: "Learning",
      color: "text-orange-600 dark:text-orange-400",
      bg: "bg-orange-100 dark:bg-orange-900/30",
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950">
      {/* Sophisticated animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 dark:from-blue-500/10 dark:to-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute top-1/2 -left-40 w-[30rem] h-[30rem] bg-gradient-to-br from-indigo-400/20 to-purple-400/20 dark:from-indigo-500/10 dark:to-purple-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute -bottom-40 right-1/3 w-96 h-96 bg-gradient-to-br from-violet-400/20 to-pink-400/20 dark:from-violet-500/10 dark:to-pink-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Premium Header */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-5xl font-extrabold leading-[1.1] pb-1 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 dark:from-white dark:via-blue-200 dark:to-indigo-200 mb-3">
                Learning Progress
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                Track and analyze your learning journey with detailed insights
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button className="p-3 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-500 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl">
                <Download className="h-5 w-5" />
              </button>
              <button className="p-3 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-500 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl">
                <Share2 className="h-5 w-5" />
              </button>
              <button className="p-3 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-500 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl">
                <Settings className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-xl p-1.5 shadow-lg">
              {(["day", "week", "month", "year"] as const).map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold capitalize transition-all duration-300 ${
                    timeRange === range
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700/50"
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>

            <button
              onClick={() => setIsHeatmapVisible(!isHeatmapVisible)}
              className="px-4 py-2 border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-500 rounded-xl transition-all duration-300 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm shadow-lg hover:shadow-xl font-medium flex items-center gap-2"
            >
              {isHeatmapVisible ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
              <span className="hidden sm:inline">
                {isHeatmapVisible ? "Hide" : "Show"} Heatmap
              </span>
            </button>
          </div>
        </div>

        {/* Premium Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Streak Card */}
          <div className="relative group bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-700/50 p-6 hover:shadow-2xl hover:shadow-orange-500/20 dark:hover:shadow-orange-500/30 hover:scale-[1.02] transition-all duration-300 overflow-hidden">
            <div
              className={`absolute inset-0 bg-gradient-to-br ${getStreakColor(
                learningStats.currentStreak
              )} opacity-10`}
            />
            <div className="relative">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    {/* <Flame className="h-7 w-7 text-orange-600 dark:text-orange-400" /> */}
                    <div className="relative h-7 w-7">
                      <Image
                        src={streakIcon}
                        alt="Streak achievement icon"
                        fill
                        sizes="32px"
                        className="object-contain"
                        priority
                      />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
                      Current Streaks
                    </p>
                    <p
                      className={`text-3xl font-bold text-slate-900 dark:text-white transition-all duration-1000 ${
                        animateStats ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      {learningStats.currentStreak} days
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    Record
                  </div>
                  <div className="text-xl font-bold text-slate-900 dark:text-white">
                    {learningStats.longestStreak}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 p-3 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg">
                <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400 flex-shrink-0" />
                <span className="text-sm text-slate-700 dark:text-slate-300">
                  Keep going to beat your record!
                </span>
              </div>
            </div>
          </div>

          {/* Study Time Card */}
          <div className="relative group bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-700/50 p-6 hover:shadow-2xl hover:shadow-blue-500/20 dark:hover:shadow-blue-500/30 hover:scale-[1.02] transition-all duration-300 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <div className="relative h-7 w-7">
                    <Image
                      src={timeIcon}
                      alt="Time achievement icon"
                      fill
                      sizes="32px"
                      className="object-contain"
                      priority
                    />
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
                    Total Study Time
                  </p>
                  <p
                    className={`text-3xl font-bold text-slate-900 dark:text-white transition-all duration-1000 ${
                      animateStats ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    {Math.floor(learningStats.totalStudyTime / 60)}h{" "}
                    {learningStats.totalStudyTime % 60}m
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    Avg. per session
                  </span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {learningStats.averageSessionTime} min
                  </span>
                </div>
                <div className="flex items-center justify-between p-2 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    Total sessions
                  </span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {learningStats.totalSessions}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Mastery Card */}
          <div className="relative group bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-700/50 p-6 hover:shadow-2xl hover:shadow-emerald-500/20 dark:hover:shadow-emerald-500/30 hover:scale-[1.02] transition-all duration-300 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <div className="relative h-7 w-7">
                    <Image
                      src={accuracyIcon}
                      alt="Accuracy achievement icon"
                      fill
                      sizes="32px"
                      className="object-contain"
                      priority
                    />
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
                    Accuracy Rate
                  </p>
                  <p
                    className={`text-3xl font-bold text-slate-900 dark:text-white transition-all duration-1000 ${
                      animateStats ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    {learningStats.accuracyRate}%
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    Cards studied
                  </span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {learningStats.totalCardsStudied}
                  </span>
                </div>
                <div className="flex items-center justify-between p-2 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    Cards mastered
                  </span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {learningStats.cardsMastered}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Daily Goal Card */}
          <div className="relative group bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-700/50 p-6 hover:shadow-2xl hover:shadow-violet-500/20 dark:hover:shadow-violet-500/30 hover:scale-[1.02] transition-all duration-300 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-purple-500/10" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-gradient-to-br from-violet-500/20 to-purple-500/20 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <div className="relative h-7 w-7">
                    <Image
                      src={goalIcon}
                      alt="Goal achievement icon"
                      fill
                      sizes="40px"
                      className="object-contain"
                      priority
                    />
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
                    Daily Goal
                  </p>
                  <p
                    className={`text-3xl font-bold text-slate-900 dark:text-white transition-all duration-1000 ${
                      animateStats ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    {learningStats.dailyGoalProgress}%
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-400">
                    Progress
                  </span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {Math.round(
                      (learningStats.dailyGoal *
                        learningStats.dailyGoalProgress) /
                        100
                    )}
                    /{learningStats.dailyGoal} min
                  </span>
                </div>
                <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-violet-500 to-purple-500 transition-all duration-1000 rounded-full relative overflow-hidden"
                    style={{ width: `${learningStats.dailyGoalProgress}%` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 animate-pulse" />
                  </div>
                </div>
                <div className="text-sm text-center p-2 bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 rounded-lg">
                  {learningStats.dailyGoalProgress >= 100 ? (
                    <span className="text-green-600 dark:text-green-400 font-semibold">
                      🎉 Goal achieved!
                    </span>
                  ) : (
                    <span className="text-slate-700 dark:text-slate-300 font-medium">
                      {100 - learningStats.dailyGoalProgress}% to go
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Progress and Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 relative group bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-700/50 p-6 hover:shadow-2xl hover:shadow-indigo-500/20 dark:hover:shadow-indigo-500/30 transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                  Weekly Progress
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Your activity over the last 7 days
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-700/50 rounded-lg">
                  <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" />
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                    Time
                  </span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-700/50 rounded-lg">
                  <div className="w-3 h-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full" />
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                    Accuracy
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-5">
              {weeklyProgress.map((day, index) => (
                <div
                  key={day.day}
                  className="group/item hover:bg-slate-50 dark:hover:bg-slate-900/50 p-3 rounded-xl transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 text-sm font-bold text-slate-900 dark:text-white">
                      {day.day}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex-1 bg-slate-200 dark:bg-slate-700 rounded-full h-5 overflow-hidden relative">
                          <div
                            className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-1000 relative overflow-hidden"
                            style={{ width: `${(day.time / 70) * 100}%` }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 animate-pulse" />
                          </div>
                        </div>
                        <span className="text-sm font-bold text-slate-900 dark:text-white w-12">
                          {day.time}m
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 bg-slate-200 dark:bg-slate-700 rounded-full h-4 overflow-hidden relative">
                          <div
                            className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-1000 relative overflow-hidden"
                            style={{ width: `${day.accuracy}%` }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 animate-pulse" />
                          </div>
                        </div>
                        <span className="text-xs font-bold text-slate-900 dark:text-white w-12">
                          {day.accuracy}%
                        </span>
                      </div>
                    </div>
                    <div className="text-right min-w-[70px]">
                      <div className="text-base font-bold text-slate-900 dark:text-white">
                        {day.cards}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        cards
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="relative group bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-700/50 p-6 hover:shadow-2xl hover:shadow-purple-500/20 dark:hover:shadow-purple-500/30 transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                  Recent Activity
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Your latest study sessions
                </p>
              </div>
              <Activity className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>

            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900/50 dark:to-slate-800/50 rounded-xl border border-slate-200/50 dark:border-slate-700/50 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900 dark:text-white text-sm mb-1">
                        {activity.deck}
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-400">
                        {activity.action}
                      </p>
                    </div>
                    <div
                      className={`px-2 py-1 rounded-lg text-xs font-bold ${
                        activity.accuracy >= 90
                          ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                          : "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                      }`}
                    >
                      {activity.accuracy}%
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <ClockIcon className="h-3 w-3" />
                    <span>{activity.time}</span>
                  </div>
                </div>
              ))}

              <button className="w-full mt-2 px-4 py-3 text-sm font-semibold text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/30 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 border border-purple-200 dark:border-purple-800">
                View All Activity
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Heatmap and Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Heatmap */}
          {isHeatmapVisible && (
            <div className="relative group bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-700/50 p-6 hover:shadow-2xl hover:shadow-green-500/20 dark:hover:shadow-green-500/30 transition-all duration-300">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                    Activity Heatmap
                  </h2>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Your study activity over the past year
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-600 dark:text-slate-400 mr-2">
                    Less
                  </span>
                  {[0, 1, 2, 3, 4].map((intensity) => (
                    <div
                      key={intensity}
                      className={`w-4 h-4 rounded ${getIntensityColor(
                        intensity
                      )} border border-slate-300 dark:border-slate-600`}
                      title={`Level ${intensity}`}
                    />
                  ))}
                  <span className="text-xs text-slate-600 dark:text-slate-400 ml-2">
                    More
                  </span>
                </div>
              </div>

              <div className="overflow-x-auto pb-2">
                <div className="inline-block min-w-full">
                  <div className="grid grid-cols-53 gap-1">
                    {heatmapData.map((day, index) => (
                      <div
                        key={index}
                        className={`w-3 h-3 rounded-sm ${getIntensityColor(
                          day.intensity
                        )} transition-all duration-300 hover:scale-125 hover:z-10 hover:shadow-lg cursor-pointer border border-slate-300/20 dark:border-slate-600/20`}
                        title={`${day.date.toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })} - ${
                          day.intensity > 0
                            ? `${day.intensity * 15} min`
                            : "No activity"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-2">
                <span>Jan</span>
                <span>Today</span>
              </div>

              <div className="mt-4 p-3 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg border border-green-200/50 dark:border-green-700/50">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                  <span className="text-slate-700 dark:text-slate-300">
                    <strong className="text-slate-900 dark:text-white">
                      245 days
                    </strong>{" "}
                    of active learning this year
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Learning Insights */}
          <div className="relative group bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-700/50 p-6 hover:shadow-2xl hover:shadow-amber-500/20 dark:hover:shadow-amber-500/30 transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                  Learning Insights
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Personalized analysis of your study habits
                </p>
              </div>
              <BrainCircuit className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              {learningInsights.map((insight) => (
                <div
                  key={insight.title}
                  className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900/50 dark:to-slate-800/50 rounded-xl p-4 border border-slate-200/50 dark:border-slate-700/50 hover:shadow-lg transition-all duration-300 group/insight"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-3xl group-hover/insight:scale-110 transition-transform duration-300">
                      {insight.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                        {insight.title}
                      </h3>
                      <p className="text-base font-bold text-slate-900 dark:text-white">
                        {insight.value}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                    {insight.description}
                  </p>
                  <div className="flex items-center gap-1">
                    <ArrowUp
                      className={`h-3 w-3 ${
                        insight.trend.startsWith("+")
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-600 dark:text-red-400 rotate-180"
                      }`}
                    />
                    <span
                      className={`text-xs font-semibold ${
                        insight.trend.startsWith("+")
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      {insight.trend}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl border border-blue-200/50 dark:border-blue-700/50">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg flex-shrink-0">
                  <Zap className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
                    Pro Tip
                  </h3>
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    Try the Pomodoro technique (25 min study, 5 min break)
                    during your peak hours to maximize retention and focus.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decks Progress Details */}
        <div className="relative group bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-700/50 p-6 hover:shadow-2xl hover:shadow-violet-500/20 dark:hover:shadow-violet-500/30 transition-all duration-300 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                Deck Performance
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Detailed progress for each study deck
              </p>
            </div>

            <div className="flex items-center gap-3">
              <select
                value={activeDeck}
                onChange={(e) => setActiveDeck(e.target.value)}
                className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:focus:ring-blue-600/50 focus:border-transparent bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm text-slate-900 dark:text-white transition-all duration-300 hover:border-blue-500 dark:hover:border-blue-500 cursor-pointer"
              >
                <option value="all">All Decks</option>
                {decksProgress.map((deck) => (
                  <option key={deck.name} value={deck.name}>
                    {deck.name}
                  </option>
                ))}
              </select>
              <button className="px-4 py-2 border border-slate-300 dark:border-slate-600 hover:border-blue-500 dark:hover:border-blue-500 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-500 rounded-xl transition-all duration-300 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm font-medium flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <span className="hidden sm:inline">Filter</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-slate-200 dark:border-slate-700">
                  <th className="text-left py-4 px-4 text-sm font-bold text-slate-900 dark:text-white">
                    Deck Name
                  </th>
                  <th className="text-left py-4 px-4 text-sm font-bold text-slate-900 dark:text-white">
                    Progress
                  </th>
                  <th className="text-center py-4 px-4 text-sm font-bold text-slate-900 dark:text-white">
                    Cards
                  </th>
                  <th className="text-center py-4 px-4 text-sm font-bold text-slate-900 dark:text-white">
                    Mastery
                  </th>
                  <th className="text-center py-4 px-4 text-sm font-bold text-slate-900 dark:text-white">
                    Level
                  </th>
                  <th className="text-left py-4 px-4 text-sm font-bold text-slate-900 dark:text-white">
                    Last Studied
                  </th>
                  <th className="text-right py-4 px-4 text-sm font-bold text-slate-900 dark:text-white">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {decksProgress.map((deck, index) => {
                  const masteryLevel = getMasteryLevel(deck.mastery);
                  return (
                    <tr
                      key={deck.name}
                      className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50/50 dark:hover:bg-slate-900/50 transition-all duration-300 group/row"
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${deck.color} flex items-center justify-center shadow-lg group-hover/row:scale-110 transition-transform duration-300`}
                          >
                            <BookOpen className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <div className="font-semibold text-slate-900 dark:text-white">
                              {deck.name}
                            </div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">
                              {deck.cardsStudied}/{deck.totalCards} cards
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="space-y-2 min-w-[180px]">
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-semibold text-slate-900 dark:text-white">
                              {deck.progress}%
                            </span>
                          </div>
                          <div className="h-2.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                            <div
                              className={`h-full bg-gradient-to-r ${deck.color} transition-all duration-1000 rounded-full relative overflow-hidden`}
                              style={{ width: `${deck.progress}%` }}
                            >
                              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 animate-pulse" />
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-center">
                          <div className="text-lg font-bold text-slate-900 dark:text-white">
                            {deck.cardsStudied}
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">
                            studied
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-center">
                          <div className="text-lg font-bold text-slate-900 dark:text-white">
                            {Math.round(
                              (deck.cardsStudied * deck.mastery) / 100
                            )}
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">
                            mastered
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex justify-center">
                          <div
                            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-bold ${masteryLevel.bg} ${masteryLevel.color}`}
                          >
                            <div
                              className={`w-2 h-2 rounded-full ${masteryLevel.color.replace(
                                "text",
                                "bg"
                              )}`}
                            />
                            {masteryLevel.label}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                          <ClockIcon className="h-4 w-4" />
                          <span>{deck.lastStudied}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <button className="px-4 py-2 text-sm font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:scale-105 flex items-center gap-2 ml-auto">
                          <Play className="h-4 w-4" />
                          Continue
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Achievements */}
        <div className="relative group bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-700/50 p-6 hover:shadow-2xl hover:shadow-yellow-500/20 dark:hover:shadow-yellow-500/30 transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                Achievements
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Milestones and badges you've earned
              </p>
            </div>
            <div className="relative h-12 w-12">
              <Image
                src={cupIcon}
                alt="cupIcon"
                fill
                className="object-contain"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.title}
                className={`rounded-xl flex justify-center items-center/p-5 border transition-all duration-300 hover:scale-105 cursor-pointer ${
                  achievement.achieved
                    ? "bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 border-yellow-300 dark:border-yellow-700 shadow-lg"
                    : "bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700 opacity-60 hover:opacity-100"
                }`}
              >
                <div className="text-center flex flex-col justify-between items-center h-4/5 ">
                  <div
                    className={`relative mx-auto mb-3 h-${achievement.size} w-${
                      achievement.size
                    }  ${
                      achievement.achieved
                        ? "animate-bounce drop-shadow-[0_0_12px_rgba(234,179,8,0.6)]"
                        : "grayscale"
                    }`}
                  >
                    <Image
                      src={achievement.icon}
                      alt={achievement.title}
                      fill
                      className="object-contain"
                      priority={achievement.achieved}
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-1">
                      {achievement.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">
                      {achievement.description}
                    </p>
                    {!achievement.achieved && (
                      <div className="space-y-2">
                        <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full transition-all duration-1000"
                            style={{ width: `${achievement.progress}%` }}
                          />
                        </div>
                        <div className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                          {achievement.progress}% complete
                        </div>
                      </div>
                    )}
                    {achievement.achieved && (
                      <div className="inline-flex items-center gap-1 text-xs font-bold text-yellow-700 dark:text-yellow-300 bg-yellow-100 dark:bg-yellow-900/50 px-2 py-1 rounded-lg">
                        <CheckCircle className="h-3 w-3" />
                        Earned {achievement.date}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
