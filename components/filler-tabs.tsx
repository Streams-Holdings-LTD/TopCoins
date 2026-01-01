"use client"

import Link from "next/link"
import { TrendingUp, Sparkles, Flame, Rocket } from "lucide-react"
import { cn } from "@/lib/utils"

const filters = [
  { id: "trending", label: "Trending", icon: TrendingUp },
  { id: "new", label: "New", icon: Sparkles },
  { id: "hot", label: "Hot", icon: Flame },
  { id: "gainers", label: "Gainers", icon: Rocket },
]

interface FilterTabsProps {
  currentFilter?: string
}

export function FilterTabs({ currentFilter = "trending" }: FilterTabsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {filters.map((filter) => {
        const isActive = filter.id === currentFilter
        return (
          <Link
            key={filter.id}
            href={filter.id === "trending" ? "/" : `/?filter=${filter.id}`}
            className={cn(
              "flex items-center gap-1.5 whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-colors",
              isActive
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground",
            )}
          >
            <filter.icon className="h-4 w-4" />
            {filter.label}
          </Link>
        )
      })}
    </div>
  )
}
