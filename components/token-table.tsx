"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { ArrowUpDown, TrendingUp, TrendingDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { type Token, type Chain, chainConfig, formatNumber, formatPrice, formatPercent } from "@/lib/token-data"
import { cn } from "@/lib/utils"

interface TokenTableProps {
  tokens: Token[]
  title?: string
  showPromoted?: boolean
}

type SortField = "price" | "change1h" | "change6h" | "change24h" | "volume" | "marketCap" | "liquidity"
type SortDirection = "asc" | "desc"

export function TokenTable({ tokens, title, showPromoted = false }: TokenTableProps) {
  const [sortField, setSortField] = useState<SortField>("marketCap")
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc")

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("desc")
    }
  }

  const sortedTokens = [...tokens].sort((a, b) => {
    const aValue = a[sortField] ?? 0
    const bValue = b[sortField] ?? 0
    return sortDirection === "asc" ? aValue - bValue : bValue - aValue
  })

  const displayTokens = showPromoted
    ? sortedTokens.filter((t) => t.isPromoted)
    : sortedTokens.filter((t) => !t.isPromoted)

  const ChainBadge = ({ chain }: { chain: Chain }) => (
    <span
      className="inline-flex items-center rounded px-1.5 py-0.5 text-xs font-medium"
      style={{ backgroundColor: `${chainConfig[chain].color}20`, color: chainConfig[chain].color }}
    >
      {chainConfig[chain].icon}
    </span>
  )

  const ChangeCell = ({ value }: { value: number | null }) => {
    if (value === null) return <span className="text-muted-foreground">-</span>
    const isPositive = value >= 0
    return (
      <span
        className={cn(
          "inline-flex items-center gap-0.5 font-mono text-sm",
          isPositive ? "text-green-500" : "text-red-500",
        )}
      >
        {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
        {formatPercent(value)}
      </span>
    )
  }

  const SortButton = ({ field, children }: { field: SortField; children: React.ReactNode }) => (
    <Button
      variant="ghost"
      size="sm"
      className="h-auto gap-1 p-0 font-medium text-muted-foreground hover:text-foreground"
      onClick={() => handleSort(field)}
    >
      {children}
      <ArrowUpDown className="h-3 w-3" />
    </Button>
  )

  return (
    <div className="rounded-xl border border-border bg-card">
      {title && (
        <div className="border-b border-border px-4 py-3">
          <h2 className="text-lg font-semibold text-foreground">{title}</h2>
        </div>
      )}

      {/* Desktop Table */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border text-left text-sm text-muted-foreground">
              <th className="whitespace-nowrap px-4 py-3 font-medium">Token</th>
              <th className="whitespace-nowrap px-4 py-3">
                <SortButton field="change1h">1h</SortButton>
              </th>
              <th className="whitespace-nowrap px-4 py-3">
                <SortButton field="change6h">6h</SortButton>
              </th>
              <th className="whitespace-nowrap px-4 py-3">
                <SortButton field="change24h">24h</SortButton>
              </th>
              <th className="whitespace-nowrap px-4 py-3 font-medium">TXN</th>
              <th className="whitespace-nowrap px-4 py-3">
                <SortButton field="volume">Volume</SortButton>
              </th>
              <th className="whitespace-nowrap px-4 py-3">
                <SortButton field="price">Price</SortButton>
              </th>
              <th className="whitespace-nowrap px-4 py-3">
                <SortButton field="marketCap">Market Cap</SortButton>
              </th>
              <th className="whitespace-nowrap px-4 py-3">
                <SortButton field="liquidity">LP</SortButton>
              </th>
              <th className="whitespace-nowrap px-4 py-3 font-medium">Age</th>
            </tr>
          </thead>
          <tbody>
            {displayTokens.map((token) => (
              <tr
                key={token.id}
                className="border-b border-border/50 transition-colors last:border-0 hover:bg-secondary/50"
              >
                <td className="px-4 py-3">
                  <Link href={`/${token.chain}/${token.address}`} className="flex items-center gap-3">
                    <div className="relative h-8 w-8 overflow-hidden rounded-full bg-secondary">
                      <img
                        src={token.logo || "/placeholder.svg?height=32&width=32"}
                        alt={token.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-foreground">{token.name}</span>
                        <ChainBadge chain={token.chain} />
                        {token.badge && (
                          <span className="rounded bg-warning/20 px-1.5 py-0.5 text-xs font-bold text-warning">
                            {token.badge}
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground">{token.symbol}</span>
                    </div>
                  </Link>
                </td>
                <td className="px-4 py-3">
                  <ChangeCell value={token.change1h} />
                </td>
                <td className="px-4 py-3">
                  <ChangeCell value={token.change6h} />
                </td>
                <td className="px-4 py-3">
                  <ChangeCell value={token.change24h} />
                </td>
                <td className="px-4 py-3">
                  <span className="font-mono text-sm text-foreground">{token.txn.toLocaleString()}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="font-mono text-sm text-foreground">{formatNumber(token.volume)}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="font-mono text-sm text-foreground">{formatPrice(token.price)}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="font-mono text-sm text-foreground">{formatNumber(token.marketCap)}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="font-mono text-sm text-foreground">{formatNumber(token.liquidity)}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-muted-foreground">{token.age}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="divide-y divide-border md:hidden">
        {displayTokens.map((token) => (
          <Link
            key={token.id}
            href={`/${token.chain}/${token.address}`}
            className="block p-4 transition-colors hover:bg-secondary/50"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 overflow-hidden rounded-full bg-secondary">
                  <img
                    src={token.logo || "/placeholder.svg?height=40&width=40"}
                    alt={token.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground">{token.name}</span>
                    <ChainBadge chain={token.chain} />
                  </div>
                  <span className="text-sm text-muted-foreground">{token.symbol}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="font-mono text-sm font-medium text-foreground">{formatPrice(token.price)}</p>
                <ChangeCell value={token.change24h} />
              </div>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2 text-sm">
              <div>
                <p className="text-xs text-muted-foreground">Volume</p>
                <p className="font-mono text-foreground">{formatNumber(token.volume)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">MCap</p>
                <p className="font-mono text-foreground">{formatNumber(token.marketCap)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">LP</p>
                <p className="font-mono text-foreground">{formatNumber(token.liquidity)}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
