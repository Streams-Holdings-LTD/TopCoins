"use client"

import { useState, useMemo } from "react"
import { XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts"
import type { Token } from "@/lib/token-data"
import { cn } from "@/lib/utils"

interface TokenChartProps {
  token: Token
}

const timeframes = ["1H", "6H", "24H", "7D", "30D", "ALL"]

// Generate mock chart data - memoized to avoid regeneration
function generateChartData(token: Token, timeframe: string) {
  const points =
    timeframe === "1H"
      ? 60
      : timeframe === "6H"
        ? 72
        : timeframe === "24H"
          ? 96
          : timeframe === "7D"
            ? 168
            : timeframe === "30D"
              ? 30
              : 365

  const data = []
  let price = token.price * (0.8 + Math.random() * 0.4)

  for (let i = 0; i < points; i++) {
    const change = (Math.random() - 0.48) * 0.02
    price = price * (1 + change)
    data.push({
      time: i,
      price: price,
      volume: token.volume * (0.5 + Math.random()) * (1 / points),
    })
  }

  // Make sure the last price matches current price roughly
  data[data.length - 1].price = token.price

  return data
}

export function TokenChart({ token }: TokenChartProps) {
  const [timeframe, setTimeframe] = useState("24H")

  // Memoize chart data to prevent regeneration on every render
  const data = useMemo(() => generateChartData(token, timeframe), [token, timeframe])

  const minPrice = Math.min(...data.map((d) => d.price))
  const maxPrice = Math.max(...data.map((d) => d.price))
  const priceChange = ((data[data.length - 1].price - data[0].price) / data[0].price) * 100
  const isPositive = priceChange >= 0

  const formatPrice = (value: number) => {
    if (value < 0.00001) return value.toFixed(8)
    if (value < 0.001) return value.toFixed(6)
    if (value < 1) return value.toFixed(4)
    return value.toFixed(2)
  }

  return (
    <div className="rounded-xl border border-border bg-card">
      <div className="flex flex-col gap-4 border-b border-border p-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg font-semibold text-foreground">Price Chart</h2>
        <div className="flex gap-1 overflow-x-auto">
          {timeframes.map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={cn(
                "whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
                timeframe === tf
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground",
              )}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4">
        <div className="h-64 md:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={isPositive ? "#22c55e" : "#ef4444"} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={isPositive ? "#22c55e" : "#ef4444"} stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="time" axisLine={false} tickLine={false} tick={false} />
              <YAxis
                domain={[minPrice * 0.95, maxPrice * 1.05]}
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#6b7280", fontSize: 12 }}
                tickFormatter={(value) => `$${formatPrice(value)}`}
                width={80}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  border: "1px solid #374151",
                  borderRadius: "8px",
                  color: "#f9fafb",
                }}
                formatter={(value: number) => [`$${formatPrice(value)}`, "Price"]}
                labelFormatter={() => ""}
              />
              <Area
                type="monotone"
                dataKey="price"
                stroke={isPositive ? "#22c55e" : "#ef4444"}
                strokeWidth={2}
                fill="url(#colorPrice)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
