import { QuickStatItem } from "@/app/components/home/Sidebar/QuickStats";
import { Flame, Target, Timer, Award, Users } from "lucide-react";

export const userStats = [
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

export const recentDecks = [
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

export const exploreDecks = [
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

export const categories = [
  "all",
  "Programming",
  "Language",
  "Science",
  "History",
  "Math",
];

export const studyTips = [
  "Review for 15 minutes daily",
  "Use spaced repetition",
  "Focus on difficult cards",
  "Create your own decks",
];
export const quickStats: QuickStatItem[] = [
  {
    id: "active-days",
    label: "Active Days",
    value: "5/7",
    icon: <Flame className="h-5 w-5 text-fuchsia-600 dark:text-fuchsia-500" />,
    bgGradient:
      "from-fuchsia-50 to-fuchsia-100 dark:from-fuchsia-900/20 dark:to-fuchsia-800/20",
  },
  {
    id: "following",
    label: "Following",
    value: 24,
    icon: <Users className="h-5 w-5 text-violet-600 dark:text-violet-500" />,
    bgGradient:
      "from-violet-50 to-violet-100 dark:from-violet-900/20 dark:to-violet-800/20",
  },
];
