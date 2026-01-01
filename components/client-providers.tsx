"use client"

import type { ReactNode } from "react"
import dynamic from "next/dynamic"

// Defer web3 provider hydration to the client to avoid server-side browser globals (e.g., indexedDB)
const Web3Providers = dynamic(
  () => import("@/components/web3-providers").then((m) => m.Web3Providers),
  { ssr: false },
)

console.log("[v0] ClientProviders module loaded")

export function ClientProviders({ children }: { children: ReactNode }) {
  console.log("[v0] ClientProviders rendering")
  return <Web3Providers>{children}</Web3Providers>
}
