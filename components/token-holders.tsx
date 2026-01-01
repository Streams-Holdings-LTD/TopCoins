"use client"

import type { Token } from "@/lib/token-data"
import { Crown, Users } from "lucide-react"

interface TokenHoldersProps {
  token: Token
}

// Mock holder data
function generateHolders(token: Token) {
  const holders = []

  for (let i = 0; i < 10; i++) {
    const percentage = i === 0 ? 15 + Math.random() * 10 : Math.max(0.5, (25 - i * 2.5) * (0.8 + Math.random() * 0.4))
    holders.push({
      rank: i + 1,
      address: `0x${Math.random().toString(16).slice(2, 8)}...${Math.random().toString(16).slice(2, 6)}`,
      percentage: percentage,
      value: (percentage / 100) * token.marketCap,
    })
  }

  return holders
}

export function TokenHolders({ token }: TokenHoldersProps) {
  const holders = generateHolders(token)

  return (
    <div className="rounded-xl border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <h2 className="text-lg font-semibold text-foreground">Top Holders</h2>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Users className="h-4 w-4" />
          <span>10.2K holders</span>
        </div>
      </div>

      <div className="divide-y divide-border">
        {holders.map((holder) => (
          <div key={holder.rank} className="flex items-center gap-3 p-3">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                holder.rank === 1
                  ? "bg-yellow-500/20 text-yellow-500"
                  : holder.rank === 2
                    ? "bg-gray-300/20 text-gray-400"
                    : holder.rank === 3
                      ? "bg-orange-500/20 text-orange-500"
                      : "bg-secondary text-muted-foreground"
              }`}
            >
              {holder.rank === 1 ? <Crown className="h-4 w-4" /> : holder.rank}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="truncate font-mono text-sm text-foreground">{holder.address}</p>
              <p className="text-xs text-muted-foreground">
                $
                {holder.value.toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                })}
              </p>
            </div>
            <div className="text-right">
              <p className="font-mono text-sm font-medium text-foreground">{holder.percentage.toFixed(2)}%</p>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-border p-4">
        <button className="w-full text-center text-sm font-medium text-primary hover:underline">
          View all holders
        </button>
      </div>
    </div>
  )
}
