import { Suspense } from "react"
import { createClient } from "@supabase/supabase-js"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PromotedBanner } from "@/components/promted-banner"
import { HomeContent } from "@/components/home-content"
import { mockTokens, generateMoreTokens, mapSubmissionToToken, type Token, type TokenSubmissionRow } from "@/lib/token-data"

export const revalidate = 0
export const dynamic = "force-dynamic"

async function fetchApprovedTokens(): Promise<Token[]> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    return []
  }

  const supabase = createClient(supabaseUrl, supabaseKey)
  const { data, error } = await supabase
    .from("token_submissions")
    .select("id, token_name, token_symbol, chain, contract_address, website, description, listing_tier, status, created_at")
    .eq("status", "approved")
    .order("created_at", { ascending: false })
    .limit(50)

  if (error || !data) {
    if (error) {
      console.error("Failed to load approved tokens", error.message || error)
    }
    return []
  }

  return (data as TokenSubmissionRow[]).map(mapSubmissionToToken)
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; filter?: string }>
}) {
  const params = await searchParams
  const currentPage = Number(params?.page) || 1
  const filter = params?.filter || "trending"
  const approvedTokens = await fetchApprovedTokens()
  const now = Date.now()
  const cutoffMs = 168 * 60 * 60 * 1000 // 168 hours

  const promotedTokensFresh: typeof approvedTokens = []
  const newListingTokens: typeof approvedTokens = []
  const mainApprovedTokens: typeof approvedTokens = []

  approvedTokens.forEach((token) => {
    const createdAt = token.createdAt ? new Date(token.createdAt).getTime() : NaN
    const ageMs = Number.isFinite(createdAt) ? now - createdAt : Number.POSITIVE_INFINITY

    if (ageMs < cutoffMs) {
      if (token.isPromoted) {
        promotedTokensFresh.push(token)
      } else {
        newListingTokens.push(token)
      }
      return
    }

    if (ageMs < cutoffMs * 2) {
      // Promoted/premium fall into New Listings after 168h
      const demoted = { ...token, isPromoted: false, badge: undefined }
      newListingTokens.push(demoted)
      return
    }

    // After 336h, all approved tokens roll into the main table
    const rolled = { ...token, isPromoted: false, badge: undefined }
    mainApprovedTokens.push(rolled)
  })

  // Generate tokens for current page
  const baseTokens = currentPage === 1 ? mockTokens : generateMoreTokens(currentPage)
  const tokens = currentPage === 1 ? [...mainApprovedTokens, ...baseTokens] : baseTokens
  const promotedTokens = [...mockTokens.filter((t) => t.isPromoted), ...promotedTokensFresh]

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-6">
          {/* Hero Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground md:text-4xl">Track Top Crypto Tokens</h1>
            <p className="mt-2 text-muted-foreground">
              Real-time prices, market cap, volume, and trading data across multiple blockchains
            </p>
          </div>

          {/* Promoted Banner */}
          <div className="mb-6">
            <PromotedBanner />
          </div>

          <Suspense fallback={<div className="h-[600px] animate-pulse rounded-xl bg-card" />}>
            <HomeContent
              filter={filter}
              promotedTokens={promotedTokens}
              newListingTokens={newListingTokens}
              mainTokens={tokens}
              currentPage={currentPage}
              baseUrl={"/"}
            />
          </Suspense>
        </div>
      </main>

      <Footer />
    </div>
  )
}
