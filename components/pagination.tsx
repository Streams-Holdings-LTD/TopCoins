"use client"

import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface PaginationProps {
  currentPage: number
  totalPages: number
  baseUrl?: string
}

export function Pagination({ currentPage, totalPages, baseUrl = "/" }: PaginationProps) {
  const getPageUrl = (page: number) => {
    if (page === 1) return baseUrl
    return `${baseUrl}${baseUrl.includes("?") ? "&" : "?"}page=${page}`
  }

  const pages = []
  const showEllipsisStart = currentPage > 3
  const showEllipsisEnd = currentPage < totalPages - 2

  if (showEllipsisStart) {
    pages.push(1)
    if (currentPage > 4) pages.push("...")
  }

  for (let i = Math.max(1, currentPage - 1); i <= Math.min(totalPages, currentPage + 1); i++) {
    if (!pages.includes(i)) pages.push(i)
  }

  if (showEllipsisEnd) {
    if (currentPage < totalPages - 3) pages.push("...")
    if (!pages.includes(totalPages)) pages.push(totalPages)
  }

  return (
    <div className="flex items-center justify-center gap-2">
      <Link href={getPageUrl(Math.max(1, currentPage - 1))}>
        <Button variant="outline" size="icon" disabled={currentPage === 1} className="h-10 w-10 bg-transparent">
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </Link>

      <div className="flex items-center gap-1">
        {pages.map((page, index) =>
          page === "..." ? (
            <span key={`ellipsis-${index}`} className="px-2 text-muted-foreground">
              ...
            </span>
          ) : (
            <Link key={page} href={getPageUrl(page as number)}>
              <Button
                variant={currentPage === page ? "default" : "outline"}
                size="icon"
                className={cn("h-10 w-10", currentPage === page && "pointer-events-none")}
              >
                {page}
              </Button>
            </Link>
          ),
        )}
      </div>

      <Link href={getPageUrl(Math.min(totalPages, currentPage + 1))}>
        <Button
          variant="outline"
          size="icon"
          disabled={currentPage === totalPages}
          className="h-10 w-10 bg-transparent"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </Link>
    </div>
  )
}
