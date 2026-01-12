import { Search } from "lucide-react";
import { Input } from "../ui/input";

interface StickySearchProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  isSearchSticky: boolean;
}

export function StickySearch({
  searchQuery,
  setSearchQuery,
  isSearchSticky,
}: StickySearchProps) {
  return (
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
              <Input
                type="text"
                placeholder="Search decks, topics, or creators..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="relative w-full h-12 pl-12 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/50 dark:focus:ring-fuchsia-600/50 focus:border-transparent transition-all duration-300"
              />
            </div>
          </div>
        </div>
  );
}
