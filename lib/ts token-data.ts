export type Chain = "ethereum" | "solana" | "binance" | "base" | "avax" | "polygon"

export interface Token {
  id: string
  name: string
  symbol: string
  chain: Chain
  address: string
  price: number
  change1h: number | null
  change6h: number | null
  change24h: number | null
  txn: number
  volume: number
  marketCap: number
  liquidity: number
  age: string
  logo: string
  isPromoted?: boolean
  badge?: number | string
  createdAt?: string
}

export type TokenSubmissionRow = {
  id?: string
  token_name: string
  token_symbol: string
  chain: string
  contract_address: string
  website?: string | null
  logo_url?: string | null
  description?: string | null
  listing_tier: "basic" | "promoted" | "premium"
  status?: "pending" | "approved" | "rejected"
  created_at?: string | null
}

export const chainConfig: Record<Chain, { name: string; color: string; icon: string }> = {
  ethereum: { name: "Ethereum", color: "#627EEA", icon: "ETH" },
  solana: { name: "Solana", color: "#9945FF", icon: "SOL" },
  binance: { name: "BSC", color: "#F0B90B", icon: "BNB" },
  base: { name: "Base", color: "#0052FF", icon: "BASE" },
  avax: { name: "Avalanche", color: "#E84142", icon: "AVAX" },
  polygon: { name: "Polygon", color: "#8247E5", icon: "MATIC" },
}

// Mock token data
export const mockTokens: Token[] = [
  {
    id: "1",
    name: "Pepe",
    symbol: "PEPE",
    chain: "ethereum",
    address: "0x6982508145454Ce325dDbE47a25d4ec3d2311933",
    price: 0.00001234,
    change1h: 2.5,
    change6h: -5.2,
    change24h: 15.8,
    txn: 12453,
    volume: 45000000,
    marketCap: 5200000000,
    liquidity: 25000000,
    age: "2y",
    logo: "/pepe-meme-coin.png",
  },
  {
    id: "2",
    name: "Dogwifhat",
    symbol: "WIF",
    chain: "solana",
    address: "EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm",
    price: 1.85,
    change1h: -1.2,
    change6h: 8.4,
    change24h: 22.5,
    txn: 8932,
    volume: 120000000,
    marketCap: 1850000000,
    liquidity: 45000000,
    age: "1y",
    logo: "/dog-with-hat-meme-coin.png",
  },
  {
    id: "3",
    name: "Bonk",
    symbol: "BONK",
    chain: "solana",
    address: "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263",
    price: 0.0000234,
    change1h: 5.8,
    change6h: 12.3,
    change24h: -8.2,
    txn: 15678,
    volume: 85000000,
    marketCap: 1420000000,
    liquidity: 32000000,
    age: "2y",
    logo: "/bonk-dog-shiba-coin.jpg",
  },
  {
    id: "4",
    name: "Floki",
    symbol: "FLOKI",
    chain: "binance",
    address: "0xfb5B838b6cfEEdC2873aB27866079AC55363D37E",
    price: 0.00018,
    change1h: -3.4,
    change6h: -7.8,
    change24h: 5.2,
    txn: 6543,
    volume: 32000000,
    marketCap: 1720000000,
    liquidity: 18000000,
    age: "3y",
    logo: "/floki-viking-dog-coin.jpg",
  },
  {
    id: "5",
    name: "Shiba Inu",
    symbol: "SHIB",
    chain: "ethereum",
    address: "0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE",
    price: 0.0000225,
    change1h: 1.2,
    change6h: 3.4,
    change24h: -2.1,
    txn: 25432,
    volume: 250000000,
    marketCap: 13200000000,
    liquidity: 85000000,
    age: "4y",
    logo: "/shiba-inu-dog-coin.jpg",
  },
  {
    id: "6",
    name: "Brett",
    symbol: "BRETT",
    chain: "base",
    address: "0x532f27101965dd16442e59d40670faf5ebb142e4",
    price: 0.145,
    change1h: 8.9,
    change6h: 25.6,
    change24h: 45.2,
    txn: 4521,
    volume: 28000000,
    marketCap: 1420000000,
    liquidity: 12000000,
    age: "8mo",
    logo: "/brett-blue-character-meme.jpg",
  },
  {
    id: "7",
    name: "Mog Coin",
    symbol: "MOG",
    chain: "ethereum",
    address: "0xaaeE1A9723aaDB7afA2810263653A34bA2C21C7a",
    price: 0.0000018,
    change1h: -2.3,
    change6h: 15.8,
    change24h: 32.4,
    txn: 3245,
    volume: 15000000,
    marketCap: 720000000,
    liquidity: 8500000,
    age: "1y",
    logo: "/mog-sunglasses-meme-coin.jpg",
  },
  {
    id: "8",
    name: "Popcat",
    symbol: "POPCAT",
    chain: "solana",
    address: "7GCihgDB8fe6KNjn2MYtkzZcRjQy3t9GHdC8uHYmW2hr",
    price: 0.85,
    change1h: 12.5,
    change6h: 28.9,
    change24h: 65.2,
    txn: 7823,
    volume: 95000000,
    marketCap: 830000000,
    liquidity: 22000000,
    age: "10mo",
    logo: "/popcat-cat-meme-coin.jpg",
  },
  {
    id: "9",
    name: "Coq Inu",
    symbol: "COQ",
    chain: "avax",
    address: "0x420FcA0121DC28039145009570975747295f2329",
    price: 0.0000045,
    change1h: -5.6,
    change6h: -12.3,
    change24h: -18.5,
    txn: 2134,
    volume: 5500000,
    marketCap: 280000000,
    liquidity: 4200000,
    age: "1y",
    logo: "/coq-rooster-chicken-meme-coin.jpg",
  },
  {
    id: "10",
    name: "Book of Meme",
    symbol: "BOME",
    chain: "solana",
    address: "ukHH6c7mMyiWCf1b9pnWe25TSpkDDt3H5pQZgZ74J82",
    price: 0.0089,
    change1h: 3.2,
    change6h: -2.1,
    change24h: 8.7,
    txn: 9876,
    volume: 42000000,
    marketCap: 612000000,
    liquidity: 15000000,
    age: "9mo",
    logo: "/book-meme-coin.jpg",
  },
  {
    id: "11",
    name: "AI Companion",
    symbol: "AIC",
    chain: "ethereum",
    address: "0x1234567890abcdef1234567890abcdef12345678",
    price: 0.0234,
    change1h: 15.2,
    change6h: 42.5,
    change24h: 128.5,
    txn: 5432,
    volume: 18000000,
    marketCap: 234000000,
    liquidity: 8500000,
    age: "2mo",
    logo: "/ai-robot-companion-coin.jpg",
    isPromoted: true,
    badge: 150,
  },
  {
    id: "12",
    name: "Trump Meme",
    symbol: "TRUMP",
    chain: "solana",
    address: "0xabcdef1234567890abcdef1234567890abcdef12",
    price: 12.45,
    change1h: -8.5,
    change6h: 5.2,
    change24h: 35.8,
    txn: 18234,
    volume: 320000000,
    marketCap: 2480000000,
    liquidity: 85000000,
    age: "1mo",
    logo: "/trump-president-meme-coin.jpg",
    isPromoted: true,
  },
  {
    id: "13",
    name: "Grok AI",
    symbol: "GROK",
    chain: "ethereum",
    address: "0x9876543210fedcba9876543210fedcba98765432",
    price: 0.0156,
    change1h: 22.5,
    change6h: 85.2,
    change24h: 245.8,
    txn: 12567,
    volume: 65000000,
    marketCap: 156000000,
    liquidity: 12000000,
    age: "3mo",
    logo: "/grok-ai-robot-coin.jpg",
  },
  {
    id: "14",
    name: "Peanut Squirrel",
    symbol: "PNUT",
    chain: "solana",
    address: "0xfedcba9876543210fedcba9876543210fedcba98",
    price: 0.68,
    change1h: 5.8,
    change6h: 18.9,
    change24h: 52.3,
    txn: 6789,
    volume: 42000000,
    marketCap: 680000000,
    liquidity: 18000000,
    age: "2mo",
    logo: "/peanut-squirrel-meme-coin.jpg",
  },
  {
    id: "15",
    name: "Turbo",
    symbol: "TURBO",
    chain: "ethereum",
    address: "0xA35923162C49cF95e6BF26623385eb431ad920D3",
    price: 0.0085,
    change1h: -1.2,
    change6h: 4.5,
    change24h: 12.8,
    txn: 4523,
    volume: 22000000,
    marketCap: 580000000,
    liquidity: 14000000,
    age: "1y",
    logo: "/turbo-frog-green-meme-coin.jpg",
  },
  {
    id: "16",
    name: "Wojak",
    symbol: "WOJAK",
    chain: "ethereum",
    address: "0x5026F006B85729a8b14553FAE6af249aD16c9aaB",
    price: 0.00042,
    change1h: 8.5,
    change6h: 22.3,
    change24h: 58.9,
    txn: 3456,
    volume: 8500000,
    marketCap: 42000000,
    liquidity: 2800000,
    age: "1y",
    logo: "/wojak-meme-face-coin.jpg",
  },
  {
    id: "17",
    name: "Degen",
    symbol: "DEGEN",
    chain: "base",
    address: "0x4ed4E862860beD51a9570b96d89aF5E1B0Efefed",
    price: 0.0125,
    change1h: -3.2,
    change6h: 8.9,
    change24h: 28.5,
    txn: 8932,
    volume: 35000000,
    marketCap: 480000000,
    liquidity: 12500000,
    age: "8mo",
    logo: "/degen-hat-purple-coin.jpg",
  },
  {
    id: "18",
    name: "Apu Apustaja",
    symbol: "APU",
    chain: "ethereum",
    address: "0x594DaaD7D77592a2b97b725A7AD59D7E188b5bFa",
    price: 0.00085,
    change1h: 12.8,
    change6h: 35.2,
    change24h: 95.6,
    txn: 5678,
    volume: 28000000,
    marketCap: 350000000,
    liquidity: 9500000,
    age: "6mo",
    logo: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "19",
    name: "Cat in Dogs World",
    symbol: "MEW",
    chain: "solana",
    address: "MEW1gQWJ3nEXg2qgERiKu7FAFj79PHvQVREQUzScPP5",
    price: 0.0098,
    change1h: -2.5,
    change6h: 5.8,
    change24h: 18.2,
    txn: 7234,
    volume: 52000000,
    marketCap: 920000000,
    liquidity: 25000000,
    age: "10mo",
    logo: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "20",
    name: "Ponke",
    symbol: "PONKE",
    chain: "solana",
    address: "5z3EqYQo9HiCEs3R84RCDMu2n7anpDMxRhdK8PSWmrRC",
    price: 0.42,
    change1h: 6.5,
    change6h: 15.8,
    change24h: 42.5,
    txn: 4567,
    volume: 32000000,
    marketCap: 420000000,
    liquidity: 11000000,
    age: "9mo",
    logo: "/placeholder.svg?height=32&width=32",
  },
]

// Generate more tokens for pagination
export function generateMoreTokens(page: number, perPage = 25): Token[] {
  const baseTokens = mockTokens
  const result: Token[] = []
  const startIndex = (page - 1) * perPage

  for (let i = 0; i < perPage; i++) {
    const baseToken = baseTokens[i % baseTokens.length]
    const index = startIndex + i
    result.push({
      ...baseToken,
      id: `${index + 1}`,
      price: baseToken.price * (0.5 + Math.random()),
      change1h: (Math.random() - 0.5) * 20,
      change6h: (Math.random() - 0.5) * 40,
      change24h: (Math.random() - 0.5) * 60,
      txn: Math.floor(baseToken.txn * (0.5 + Math.random())),
      volume: baseToken.volume * (0.5 + Math.random()),
      marketCap: baseToken.marketCap * (0.5 + Math.random()),
      liquidity: baseToken.liquidity * (0.5 + Math.random()),
    })
  }

  return result
}

export function formatNumber(num: number): string {
  if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`
  if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`
  if (num >= 1e6) return `$${(num / 1e6).toFixed(1)}M`
  if (num >= 1e3) return `$${(num / 1e3).toFixed(1)}k`
  return `$${num.toFixed(2)}`
}

export function formatPrice(price: number): string {
  if (price < 0.00001) return `$${price.toFixed(8)}`
  if (price < 0.001) return `$${price.toFixed(6)}`
  if (price < 1) return `$${price.toFixed(4)}`
  return `$${price.toFixed(2)}`
}

export function formatPercent(percent: number | null): string {
  if (percent === null) return "-"
  return `${percent >= 0 ? "+" : ""}${percent.toFixed(2)}%`
}

export function mapSubmissionToToken(row: TokenSubmissionRow): Token {
  const allowedChains: Chain[] = ["ethereum", "solana", "binance", "base", "avax", "polygon"]
  const chain: Chain = allowedChains.includes(row.chain as Chain) ? (row.chain as Chain) : "ethereum"
  const logoFromDescription = extractLogoUrl(row.description)
  const logo = row.logo_url || logoFromDescription || "/placeholder.svg?height=32&width=32"
  const marketCap = extractMarketCap(row.description)

  return {
    id: row.id || row.contract_address,
    name: row.token_name,
    symbol: row.token_symbol,
    chain,
    address: row.contract_address,
    price: 0,
    change1h: null,
    change6h: null,
    change24h: null,
    txn: 0,
    volume: 0,
    marketCap: marketCap ?? 0,
    liquidity: 0,
    age: formatSubmissionAge(row.created_at),
    logo,
    isPromoted: row.listing_tier !== "basic",
    badge: row.listing_tier === "premium" ? "Premium" : row.listing_tier === "promoted" ? "Promoted" : undefined,
    createdAt: row.created_at || undefined,
  }
}

function formatSubmissionAge(createdAt?: string | null): string {
  if (!createdAt) return "new"

  const date = new Date(createdAt)
  if (Number.isNaN(date.getTime())) return "new"

  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const dayMs = 24 * 60 * 60 * 1000
  const days = Math.max(0, Math.floor(diffMs / dayMs))

  if (days === 0) return "today"
  if (days < 7) return `${days}d`

  const weeks = Math.floor(days / 7)
  if (weeks < 4) return `${weeks}w`

  const months = Math.floor(days / 30)
  if (months < 12) return `${months}mo`

  const years = Math.floor(days / 365)
  return `${years}y`
}

function extractLogoUrl(description?: string | null): string | null {
  if (!description) return null
  const match = description.match(/https?:[^\s]+\.png[^\s]*/i)
  return match ? match[0] : null
}

function extractMarketCap(description?: string | null): number | null {
  if (!description) return null
  const match = description.match(/market cap:\s*([$]?)([\d,.]+)/i)
  if (!match) return null
  const raw = match[2].replace(/,/g, "")
  const value = Number(raw)
  return Number.isFinite(value) ? value : null
}
