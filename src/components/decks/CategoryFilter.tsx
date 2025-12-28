"use client";

import { Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface CategoryFilterProps {
  value: string;
  onChange: (value: string) => void;
  categories: string[];
}

export default function CategoryFilter({
  value,
  onChange,
  categories,
}: CategoryFilterProps) {
  return (
    <div className="relative min-w-[200px]">
      <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none z-10" />
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <SelectValue placeholder="Select category" />
          </div>
        </SelectTrigger>
        <SelectContent className="rounded-xl border-border bg-background/95 backdrop-blur-sm">
          {categories.map((cat) => (
            <SelectItem
              key={cat}
              value={cat}
              className="focus:bg-accent focus:text-accent-foreground"
            >
              {cat === "all" ? "All Categories" : cat}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
