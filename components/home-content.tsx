"use client"

import { useState } from "react"
import { Chain, Token, chainConfig } from "@/lib/token-data"
import { ChainFilter } from "@/components/chain-filter"
import { TokenTable } from "@/components/token-table"
import { Pagination } from "@/components/pagination"

interface HomeContentProps {
  filter: string
  promotedTokens: Token[]
  newListingTokens: Token[]
  mainTokens: Token[]
  currentPage: number
  baseUrl: string
}

export function HomeContent({ filter, promotedTokens, newListingTokens, mainTokens, currentPage, baseUrl }: HomeContentProps) {
  const [selectedChains, setSelectedChains] = useState<Chain[]>([])

  const applyChainFilter = (tokens: Token[]) => {
    if (!selectedChains.length) return tokens
    return tokens.filter((t) => selectedChains.includes(t.chain))
  }

  const filteredPromoted = applyChainFilter(promotedTokens)
  const filteredNew = applyChainFilter(newListingTokens)
  const filteredMain = applyChainFilter(mainTokens)

  return (
    <div className="grid gap-6 md:grid-cols-[260px,1fr]">
      <aside className="space-y-4">
        <div className="rounded-xl border border-border bg-card p-4">
          <h3 className="mb-3 text-sm font-semibold text-foreground">Chains</h3>
          <ChainFilter onFilterChange={setSelectedChains} />
          {selectedChains.length ? (
            <p className="mt-2 text-xs text-muted-foreground">
              Showing: {selectedChains.map((c) => chainConfig[c].name).join(", ")}
            </p>
          ) : null}
        </div>
      </aside>

      <div className="space-y-6">
        {filteredPromoted.length > 0 && (
          <div>
            <TokenTable tokens={filteredPromoted} title="Promoted Tokens" showPromoted />
          </div>
        )}

        {filteredNew.length > 0 && (
          <div>
            <TokenTable tokens={filteredNew} title="New Listings" />
          </div>
        )}

        <div>
          <TokenTable tokens={filteredMain} />
        </div>

        <div>
          <p className="mb-4 text-center text-sm text-muted-foreground">
            Showing tokens {(currentPage - 1) * 25 + 1}-{currentPage * 25}
          </p>
          <Pagination currentPage={currentPage} totalPages={4} baseUrl={filter !== "trending" ? `/?filter=${filter}` : baseUrl} />
        </div>
      </div>
    </div>
  )
}
