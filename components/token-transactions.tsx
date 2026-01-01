"use client"

import type { Token } from "@/lib/token-data"
import { formatPrice } from "@/lib/token-data"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"

interface TokenTransactionsProps {
  token: Token
}

// Mock transaction data
function generateTransactions(token: Token) {
  const types = ["buy", "sell"] as const
  const transactions = []

  for (let i = 0; i < 10; i++) {
    const type = types[Math.floor(Math.random() * 2)]
    const amount = Math.random() * 10000 + 100
    const price = token.price * (0.98 + Math.random() * 0.04)

    transactions.push({
      id: i,
      type,
      amount: amount,
      value: amount * price,
      price: price,
      time: `${Math.floor(Math.random() * 59) + 1}m ago`,
      wallet: `0x${Math.random().toString(16).slice(2, 8)}...${Math.random().toString(16).slice(2, 6)}`,
    })
  }

  return transactions
}

export function TokenTransactions({ token }: TokenTransactionsProps) {
  const transactions = generateTransactions(token)

  return (
    <div className="rounded-xl border border-border bg-card">
      <div className="border-b border-border px-4 py-3">
        <h2 className="text-lg font-semibold text-foreground">Recent Transactions</h2>
      </div>

      {/* Desktop Table */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border text-left text-sm text-muted-foreground">
              <th className="px-4 py-3 font-medium">Type</th>
              <th className="px-4 py-3 font-medium">Amount</th>
              <th className="px-4 py-3 font-medium">Value</th>
              <th className="px-4 py-3 font-medium">Price</th>
              <th className="px-4 py-3 font-medium">Wallet</th>
              <th className="px-4 py-3 font-medium">Time</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.id} className="border-b border-border/50 last:border-0">
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center gap-1 rounded px-2 py-1 text-xs font-medium ${
                      tx.type === "buy" ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"
                    }`}
                  >
                    {tx.type === "buy" ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                    {tx.type.toUpperCase()}
                  </span>
                </td>
                <td className="px-4 py-3 font-mono text-sm text-foreground">
                  {tx.amount.toLocaleString(undefined, { maximumFractionDigits: 2 })} {token.symbol}
                </td>
                <td className="px-4 py-3 font-mono text-sm text-foreground">
                  ${tx.value.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </td>
                <td className="px-4 py-3 font-mono text-sm text-foreground">{formatPrice(tx.price)}</td>
                <td className="px-4 py-3 font-mono text-sm text-muted-foreground">{tx.wallet}</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{tx.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile List */}
      <div className="divide-y divide-border md:hidden">
        {transactions.map((tx) => (
          <div key={tx.id} className="p-4">
            <div className="flex items-center justify-between">
              <span
                className={`inline-flex items-center gap-1 rounded px-2 py-1 text-xs font-medium ${
                  tx.type === "buy" ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"
                }`}
              >
                {tx.type === "buy" ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                {tx.type.toUpperCase()}
              </span>
              <span className="text-sm text-muted-foreground">{tx.time}</span>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <span className="font-mono text-sm text-foreground">
                {tx.amount.toLocaleString(undefined, { maximumFractionDigits: 2 })} {token.symbol}
              </span>
              <span className="font-mono text-sm text-foreground">
                ${tx.value.toLocaleString(undefined, { maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
