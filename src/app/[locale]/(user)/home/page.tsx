"use client";
import { ExploreCommunity } from "@/components/home/ExploreCommunity";
import { HeaderHero } from "@/components/home/HeaderHero";
import { RecentDecks } from "@/components/home/RecentDecks";
import { CTABox } from "@/components/home/Sidebar/CTABox";
import { QuickStats } from "@/components/home/Sidebar/QuickStats";
import { StudyTips } from "@/components/home/Sidebar/StudyTips";
import { WeeklyProgress } from "@/components/home/Sidebar/WeeklyProgress";
import { StickySearch } from "@/components/home/StickySearch";
import { UserStatsGrid } from "@/components/home/UserStatsGrid";
import { BackgroundBeams } from "@/components/ui/background-beams";
import {
  categories,
  exploreDecks,
  quickStats,
  recentDecks,
  studyTips,
  userStats,
} from "@/lib/mock/home";
import { useTranslations } from "next-intl";
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

  const words = `Welcome back, John`;
  const t = useTranslations("Home");
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-50 to-fuchsia-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-fuchsia-950/20">
      {/* <BackgroundBeams /> */}
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <HeaderHero words={words} />
        <UserStatsGrid userStats={userStats} />
        <StickySearch
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          isSearchSticky={isSearchSticky}
        />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <RecentDecks recentDecks={recentDecks} />
            <ExploreCommunity
              exploreDecks={exploreDecks}
              categories={categories}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
            />
          </div>

          <div className="space-y-6">
            <WeeklyProgress
              items={[
                {
                  label: "Study Sessions",
                  percent: 80,
                  meta: "18 sessions",
                  color: "fuchsia",
                },
                {
                  label: "Cards Reviewed",
                  percent: 75,
                  meta: "342 cards",
                  color: "violet",
                },
                {
                  label: "Accuracy",
                  percent: 87,
                  meta: "87% average",
                  color: "emerald",
                  showTrend: true,
                },
              ]}
            />
            <StudyTips tips={studyTips} />
            <QuickStats stats={quickStats} />
            <CTABox
              onStart={() => {
                console.log("Start study session");
              }}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
