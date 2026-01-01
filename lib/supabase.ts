import { createClient, type SupabaseClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL")
}

if (!supabaseAnonKey) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_ANON_KEY")
}

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey)

export type TokenSubmission = {
  id?: string
  token_name: string
  token_symbol: string
  chain: string
  contract_address: string
  website?: string | null
  twitter?: string | null
  telegram?: string | null
  email: string
  description?: string | null
  listing_tier: "basic" | "promoted" | "premium"
  status?: "pending" | "approved" | "rejected"
  created_at?: string
}
