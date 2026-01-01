"use client"

import { useState } from "react"
import { type Chain, chainConfig } from "@/lib/token-data"
import { cn } from "@/lib/utils"

interface ChainFilterProps {
  onFilterChange?: (chains: Chain[]) => void
}

export function ChainFilter({ onFilterChange }: ChainFilterProps) {
  const [selectedChains, setSelectedChains] = useState<Chain[]>([])

  const toggleChain = (chain: Chain) => {
    const newSelection = selectedChains.includes(chain)
      ? selectedChains.filter((c) => c !== chain)
      : [...selectedChains, chain]
    setSelectedChains(newSelection)
    onFilterChange?.(newSelection)
  }

  const chains = Object.entries(chainConfig) as [Chain, (typeof chainConfig)[Chain]][]

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => {
          setSelectedChains([])
          onFilterChange?.([])
        }}
        className={cn(
          "rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
          selectedChains.length === 0
            ? "bg-primary text-primary-foreground"
            : "bg-secondary text-muted-foreground hover:text-foreground",
        )}
      >
        All Chains
      </button>
      {chains.map(([chain, config]) => (
        <button
          key={chain}
          onClick={() => toggleChain(chain)}
          className={cn(
            "rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
            selectedChains.includes(chain)
              ? "text-foreground"
              : "bg-secondary text-muted-foreground hover:text-foreground",
          )}
          style={{
            backgroundColor: selectedChains.includes(chain) ? `${config.color}30` : undefined,
            borderColor: selectedChains.includes(chain) ? config.color : undefined,
          }}
        >
          {config.name}
        </button>
      ))}
    </div>
  )
}
