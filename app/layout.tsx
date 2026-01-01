import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./global.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Top Coins - Track Top 100 Crypto Tokens",
  description:
    "Track the top 100 cryptocurrency tokens across Ethereum, Solana, Binance Smart Chain, and more. Real-time prices, market cap, volume, and trading data.",
  keywords: "crypto, cryptocurrency, tokens, ethereum, solana, binance, trading, prices",
  openGraph: {
    title: "Top Coins - Track Top 100 Crypto Tokens",
    description: "Track the top 100 cryptocurrency tokens across multiple blockchains",
    url: "https://topcoins.cc",
    siteName: "Top Coins",
    type: "website",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
}

import { ClientProviders } from "@/components/client-providers"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark bg-background">
      <body className={`${inter.className} antialiased`}>
        <ClientProviders>{children}</ClientProviders>
        <Analytics />
      </body>
    </html>
  )
}
