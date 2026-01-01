import { createClient } from "@supabase/supabase-js"
import { notFound } from "next/navigation"
import { AdminStatusButtons } from "@/components/admin-status-buttons"
import { formatNumber } from "@/lib/token-data"

export const dynamic = "force-dynamic"
export const revalidate = 0

const getSupabase = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !serviceKey) {
    return null
  }

  return createClient(url, serviceKey)
}

export default async function AdminSubmissionsPage() {
  const supabase = getSupabase()

  if (!supabase) {
    return notFound()
  }

  const { data, error } = await supabase
    .from("token_submissions")
    .select("id, token_name, token_symbol, chain, contract_address, website, twitter, telegram, email, description, listing_tier, status, created_at")
    .order("created_at", { ascending: false })

  if (error) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-semibold">Admin · Submissions</h1>
        <p className="mt-4 text-destructive">Failed to load submissions: {error.message}</p>
      </div>
    )
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold">Admin · Submissions</h1>
      <p className="text-sm text-muted-foreground">Newest first</p>

      <div className="mt-6 overflow-x-auto rounded-xl border border-border bg-card">
        <table className="min-w-full text-sm">
          <thead className="bg-muted/50 text-left text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Token</th>
              <th className="px-4 py-3">Chain</th>
              <th className="px-4 py-3">Tier</th>
              <th className="px-4 py-3">MCap</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">Links</th>
              <th className="px-4 py-3">Submitted</th>
            </tr>
          </thead>
          <tbody>
            {(data || []).map((row) => (
              <tr key={row.id} className="border-t border-border/80">
                <td className="px-4 py-3">
                  <div className="font-medium text-foreground">{row.token_name}</div>
                  <div className="text-muted-foreground">{row.token_symbol}</div>
                  <div className="text-muted-foreground text-xs break-words">{row.contract_address}</div>
                </td>
                <td className="px-4 py-3 capitalize text-foreground">{row.chain}</td>
                <td className="px-4 py-3 capitalize">{row.listing_tier}</td>
                <td className="px-4 py-3 text-foreground">{renderMarketCap(row.description)}</td>
                <td className="px-4 py-3 capitalize">{row.status}</td>
                <td className="px-4 py-3">
                  <div className="text-foreground">{row.email}</div>
                </td>
                <td className="px-4 py-3 space-y-1 text-xs">
                  {row.description && row.description.includes("Logo URL:") ? (
                    <div>
                      <a
                        href={row.description
                          .split("\n")
                          .find((line: string) => line.startsWith("Logo URL:"))
                          ?.replace("Logo URL: ", "")}
                        className="text-primary hover:underline"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Logo
                      </a>
                    </div>
                  ) : null}
                  {row.website ? (
                    <div>
                      <a href={row.website} className="text-primary hover:underline" target="_blank" rel="noreferrer">
                        Website
                      </a>
                    </div>
                  ) : null}
                  {row.twitter ? (
                    <div>
                      <a href={row.twitter.startsWith("http") ? row.twitter : `https://twitter.com/${row.twitter.replace(/^@/, "")}`}
                        className="text-primary hover:underline" target="_blank" rel="noreferrer">
                        Twitter
                      </a>
                    </div>
                  ) : null}
                  {row.telegram ? (
                    <div>
                      <a href={row.telegram.startsWith("http") ? row.telegram : `https://t.me/${row.telegram.replace(/^@/, "")}`}
                        className="text-primary hover:underline" target="_blank" rel="noreferrer">
                        Telegram
                      </a>
                    </div>
                  ) : null}
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {row.created_at ? new Date(row.created_at).toLocaleString() : ""}
                </td>
                <td className="px-4 py-3">
                  <AdminStatusButtons id={row.id} currentStatus={row.status} />
                </td>
              </tr>
            ))}
            {!data?.length ? (
              <tr>
                <td colSpan={9} className="px-4 py-6 text-center text-muted-foreground">
                  No submissions yet.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function renderMarketCap(description?: string | null) {
  const value = parseMarketCap(description)
  if (!value) return <span className="text-muted-foreground">—</span>
  return <span className="font-mono">{formatNumber(value)}</span>
}

function parseMarketCap(description?: string | null): number | null {
  if (!description) return null
  const match = description.match(/market cap:\s*([$]?)([\d,.]+)/i)
  if (!match) return null
  const raw = match[2].replace(/,/g, "")
  const value = Number(raw)
  return Number.isFinite(value) ? value : null
}
