"use client"

import type { Token } from "@/lib/token-data"
import { TrendingUp, TrendingDown } from "lucide-react"
import { formatNumber, formatPrice, formatPercent } from "@/lib/token-data"

interface TokenStatsProps {
  token: Token
}

export function TokenStats({ token }: TokenStatsProps) {
  const stats = [
    { label: "Price", value: formatPrice(token.price) },
    { label: "Market Cap", value: formatNumber(token.marketCap) },
    { label: "24h Volume", value: formatNumber(token.volume) },
    { label: "Liquidity", value: formatNumber(token.liquidity) },
    { label: "24h Transactions", value: token.txn.toLocaleString() },
    { label: "Token Age", value: token.age },
  ]

  const changes = [
    { label: "1h Change", value: token.change1h },
    { label: "6h Change", value: token.change6h },
    { label: "24h Change", value: token.change24h },
  ]

  return (
    <div className="rounded-xl border border-border bg-card">
      <div className="border-b border-border px-4 py-3">
        <h2 className="text-lg font-semibold text-foreground">Token Statistics</h2>
      </div>

      <div className="divide-y divide-border">
        {/* Basic Stats */}
        <div className="grid grid-cols-2 gap-4 p-4 md:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="font-mono text-lg font-semibold text-foreground">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Price Changes */}
        <div className="p-4">
          <h3 className="mb-3 text-sm font-medium text-muted-foreground">Price Changes</h3>
          <div className="grid grid-cols-3 gap-4">
            {changes.map((change) => {
              const isPositive = (change.value ?? 0) >= 0
              return (
                <div key={change.label} className="rounded-lg bg-secondary p-3">
                  <p className="text-xs text-muted-foreground">{change.label}</p>
                  <div
                    className={`mt-1 flex items-center gap-1 font-mono text-lg font-semibold ${
                      isPositive ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                    {formatPercent(change.value)}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Additional Info */}
        <div className="p-4">
          <h3 className="mb-3 text-sm font-medium text-muted-foreground">Contract Info</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Contract</span>
              <code className="font-mono text-foreground">
                {token.address.slice(0, 12)}...{token.address.slice(-8)}
              </code>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Chain</span>
              <span className="text-foreground capitalize">{token.chain}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
