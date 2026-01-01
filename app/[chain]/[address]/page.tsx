import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ExternalLink, Copy, TrendingUp, TrendingDown, Activity, Droplets, Clock } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { TokenChart } from "@/components/token-chart"
import { TokenStats } from "@/components/token-stats"
import { TokenTransactions } from "@/components/token-transactions"
import { TokenHolders } from "@/components/token-holders"
import { type Chain, mockTokens, chainConfig, formatNumber, formatPrice, formatPercent } from "@/lib/token-data"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ chain: string; address: string }>
}) {
  const { chain, address } = await params
  const token = mockTokens.find((t) => t.chain === chain && t.address === address)

  if (!token) {
    return { title: "Token Not Found - Top Coins" }
  }

  return {
    title: `${token.name} (${token.symbol}) Price - Top Coins`,
    description: `Track ${token.name} price, market cap, volume, and trading data on ${chainConfig[token.chain].name}`,
  }
}

export default async function TokenPage({
  params,
}: {
  params: Promise<{ chain: string; address: string }>
}) {
  const { chain, address } = await params
  const token = mockTokens.find((t) => t.chain === chain && t.address === address)

  if (!token) {
    notFound()
  }

  const chainInfo = chainConfig[chain as Chain]

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-6">
          {/* Breadcrumb */}
          <div className="mb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to all tokens
            </Link>
          </div>

          {/* Token Header */}
          <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex items-start gap-4">
              <div className="relative h-16 w-16 overflow-hidden rounded-full md:h-20 md:w-20">
                <Image src={token.logo || "/placeholder.svg"} alt={token.name} fill className="object-cover" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl font-bold text-foreground md:text-3xl">{token.name}</h1>
                  <span className="rounded-lg bg-secondary px-2 py-1 text-sm font-medium text-muted-foreground">
                    {token.symbol}
                  </span>
                  <span
                    className="rounded px-2 py-1 text-xs font-medium"
                    style={{ backgroundColor: `${chainInfo.color}30`, color: chainInfo.color }}
                  >
                    {chainInfo.name}
                  </span>
                </div>
                <div className="mt-2 flex items-center gap-3">
                  <span className="font-mono text-xl font-bold text-foreground md:text-2xl">
                    {formatPrice(token.price)}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 rounded-lg px-2 py-1 text-sm font-medium ${
                      (token.change24h ?? 0) >= 0 ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"
                    }`}
                  >
                    {(token.change24h ?? 0) >= 0 ? (
                      <TrendingUp className="h-4 w-4" />
                    ) : (
                      <TrendingDown className="h-4 w-4" />
                    )}
                    {formatPercent(token.change24h)}
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <code className="rounded bg-secondary px-2 py-1 font-mono text-xs text-muted-foreground">
                    {token.address.slice(0, 8)}...{token.address.slice(-6)}
                  </code>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Copy className="h-4 w-4" />
                  </Button>
                  <a
                    href={`https://etherscan.io/token/${token.address}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                  >
                    View on Explorer
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <a
                href={`https://app.uniswap.org/swap?outputCurrency=${token.address}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="gap-2">Buy on DEX</Button>
              </a>
              <a
                href={`https://dexscreener.com/${token.chain}/${token.address}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" className="gap-2 bg-transparent">
                  <ExternalLink className="h-4 w-4" />
                  DexScreener
                </Button>
              </a>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Activity className="h-4 w-4" />
                <span className="text-sm">Market Cap</span>
              </div>
              <p className="mt-1 font-mono text-lg font-semibold text-foreground">{formatNumber(token.marketCap)}</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <TrendingUp className="h-4 w-4" />
                <span className="text-sm">24h Volume</span>
              </div>
              <p className="mt-1 font-mono text-lg font-semibold text-foreground">{formatNumber(token.volume)}</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Droplets className="h-4 w-4" />
                <span className="text-sm">Liquidity</span>
              </div>
              <p className="mt-1 font-mono text-lg font-semibold text-foreground">{formatNumber(token.liquidity)}</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span className="text-sm">Age</span>
              </div>
              <p className="mt-1 text-lg font-semibold text-foreground">{token.age}</p>
            </div>
          </div>

          {/* Chart Section */}
          <div className="mb-8">
            <TokenChart token={token} />
          </div>

          {/* Two Column Layout */}
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Left Column - Stats & Transactions */}
            <div className="space-y-8 lg:col-span-2">
              <TokenStats token={token} />
              <TokenTransactions token={token} />
            </div>

            {/* Right Column - Holders */}
            <div>
              <TokenHolders token={token} />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
