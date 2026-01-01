"use client"

import type { ReactNode } from "react"
import { Web3Providers } from "@/components/web3-providers"

console.log("[v0] ClientProviders module loaded")

export function ClientProviders({ children }: { children: ReactNode }) {
  console.log("[v0] ClientProviders rendering")
  return <Web3Providers>{children}</Web3Providers>
}
