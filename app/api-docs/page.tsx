import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Code2, Key, Clock, AlertTriangle } from "lucide-react"

export const metadata = {
  title: "API Documentation - Top Coins",
  description: "Top Coins API documentation for developers to access cryptocurrency token data.",
}

const endpoints = [
  {
    method: "GET",
    path: "/api/v1/tokens",
    description: "Get list of all tokens with pagination",
    params: ["page", "limit", "chain", "sort"],
  },
  {
    method: "GET",
    path: "/api/v1/tokens/:address",
    description: "Get detailed information for a specific token",
    params: ["address (required)"],
  },
  {
    method: "GET",
    path: "/api/v1/tokens/trending",
    description: "Get trending tokens based on volume and transactions",
    params: ["timeframe", "limit"],
  },
  {
    method: "GET",
    path: "/api/v1/tokens/gainers",
    description: "Get top gaining tokens by price change",
    params: ["timeframe", "limit"],
  },
  {
    method: "GET",
    path: "/api/v1/search",
    description: "Search tokens by name, symbol, or address",
    params: ["q (required)", "chain"],
  },
]

export default function APIDocsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-4 py-12">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground md:text-4xl">API Documentation</h1>
            <p className="mt-2 text-muted-foreground">Access Top Coins data programmatically for your applications</p>
          </div>

          {/* Overview */}
          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold text-foreground">Overview</h2>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-lg border border-border bg-card p-4">
                <Key className="mb-2 h-6 w-6 text-primary" />
                <h3 className="font-medium text-foreground">Base URL</h3>
                <code className="mt-1 block text-sm text-muted-foreground">https://api.topcoins.cc/v1</code>
              </div>
              <div className="rounded-lg border border-border bg-card p-4">
                <Clock className="mb-2 h-6 w-6 text-primary" />
                <h3 className="font-medium text-foreground">Rate Limit</h3>
                <p className="mt-1 text-sm text-muted-foreground">100 requests/minute</p>
              </div>
              <div className="rounded-lg border border-border bg-card p-4">
                <Code2 className="mb-2 h-6 w-6 text-primary" />
                <h3 className="font-medium text-foreground">Format</h3>
                <p className="mt-1 text-sm text-muted-foreground">JSON responses</p>
              </div>
            </div>
          </section>

          {/* Authentication */}
          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold text-foreground">Authentication</h2>
            <div className="rounded-lg border border-border bg-card p-4">
              <p className="text-muted-foreground">
                The public API does not require authentication for basic endpoints. For higher rate limits and premium
                features, include your API key in the header:
              </p>
              <pre className="mt-4 overflow-x-auto rounded-lg bg-secondary p-4 text-sm">
                <code className="text-foreground">{`curl -H "Authorization: Bearer YOUR_API_KEY" \\
  https://api.topcoins.cc/v1/tokens`}</code>
              </pre>
            </div>
          </section>

          {/* Endpoints */}
          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold text-foreground">Endpoints</h2>
            <div className="space-y-4">
              {endpoints.map((endpoint, index) => (
                <div key={index} className="rounded-lg border border-border bg-card p-4">
                  <div className="flex items-center gap-3">
                    <span className="rounded bg-primary/20 px-2 py-1 text-xs font-bold text-primary">
                      {endpoint.method}
                    </span>
                    <code className="font-mono text-sm text-foreground">{endpoint.path}</code>
                  </div>
                  <p className="mt-2 text-muted-foreground">{endpoint.description}</p>
                  <div className="mt-3">
                    <span className="text-xs font-medium text-muted-foreground">Parameters:</span>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {endpoint.params.map((param) => (
                        <code key={param} className="rounded bg-secondary px-2 py-0.5 text-xs text-foreground">
                          {param}
                        </code>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Example */}
          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold text-foreground">Example Response</h2>
            <pre className="overflow-x-auto rounded-lg border border-border bg-card p-4 text-sm">
              <code className="text-foreground">{`{
  "success": true,
  "data": {
    "tokens": [
      {
        "address": "0x6982508...",
        "name": "Pepe",
        "symbol": "PEPE",
        "chain": "ethereum",
        "price": 0.00001234,
        "change24h": 15.8,
        "volume": 45000000,
        "marketCap": 5200000000,
        "liquidity": 25000000
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 25,
      "total": 1250
    }
  }
}`}</code>
            </pre>
          </section>

          {/* Rate Limits */}
          <div className="flex items-start gap-3 rounded-lg border border-warning/50 bg-warning/10 p-4">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-warning" />
            <div>
              <h3 className="font-medium text-foreground">Rate Limiting</h3>
              <p className="text-sm text-muted-foreground">
                Exceeding rate limits will result in 429 errors. Contact us for enterprise plans with higher limits.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
