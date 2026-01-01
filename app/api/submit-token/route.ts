import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const allowedChains = ["ethereum", "solana", "binance", "base", "avax", "polygon"]

const isEmail = (value: string) => /.+@.+\..+/.test(value)
const isUrl = (value: string) => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:" || url.protocol === "ipfs:"
  } catch {
    return false
  }
}

const isPngUrl = (value: string) => {
  try {
    const url = new URL(value)
    return url.pathname.toLowerCase().endsWith(".png")
  } catch {
    return /\.png(\?|#|$)/i.test(value)
  }
}

export async function POST(request: Request) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json(
        { error: "Supabase credentials are missing on the server. Check env vars." },
        { status: 500 },
      )
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    const body = await request.json()

    const payload = {
      token_name: (body.tokenName as string | null)?.trim() ?? "",
      token_symbol: (body.tokenSymbol as string | null)?.trim() ?? "",
      chain: (body.chain as string | null)?.trim() ?? "",
      contract_address: (body.contractAddress as string | null)?.trim() ?? "",
      website: (body.website as string | null)?.trim() || null,
      // logo captured separately to validate/append; keep payload clean for schemas without column
      logo_url: (body.logoUrl as string | null)?.trim() || null,
      twitter: (body.twitter as string | null)?.trim() || null,
      telegram: (body.telegram as string | null)?.trim() || null,
      email: (body.email as string | null)?.trim() ?? "",
      description: (body.description as string | null)?.trim() || null,
      market_cap: (body.marketCap as string | null)?.trim() || null,
      listing_tier: (body.listingTier as string | null)?.trim() || "basic",
      status: "pending" as const,
    }

    const paymentToken = (body.paymentToken as string | null)?.trim() || null
    const paymentAmount = (body.paymentAmount as string | null)?.trim() || null
    const paymentTxHash = (body.paymentTxHash as string | null)?.trim() || null
    const marketCapNumber = payload.market_cap ? Number(payload.market_cap) : null

    const logoUrl = (body.logoUrl as string | null)?.trim() || null

    if (
      !payload.token_name ||
      !payload.token_symbol ||
      !payload.chain ||
      !payload.contract_address ||
      !payload.email ||
      !payload.website ||
      !payload.description ||
      !logoUrl ||
      !payload.market_cap
    ) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    if (!allowedChains.includes(payload.chain)) {
      return NextResponse.json({ error: "Invalid chain" }, { status: 400 })
    }

    if (!isEmail(payload.email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 })
    }

    if (payload.website && !isUrl(payload.website)) {
      return NextResponse.json({ error: "Website must be a valid URL" }, { status: 400 })
    }

    if (logoUrl && (!isUrl(logoUrl) || !isPngUrl(logoUrl))) {
      return NextResponse.json({ error: "Logo URL must be a valid .png URL" }, { status: 400 })
    }

    if (marketCapNumber === null || !Number.isFinite(marketCapNumber) || marketCapNumber <= 0) {
      return NextResponse.json({ error: "Market cap must be a positive number" }, { status: 400 })
    }

    const descriptionParts: Array<string | null> = [payload.description]
    if (logoUrl) {
      descriptionParts.push(`Logo URL: ${logoUrl}`)
    }
    if (marketCapNumber) {
      descriptionParts.push(`Market Cap: ${marketCapNumber}`)
    }
    if (payload.listing_tier !== "basic") {
      if (!paymentToken || !paymentAmount || !paymentTxHash) {
        return NextResponse.json({ error: "Payment details missing for paid tier" }, { status: 400 })
      }
      descriptionParts.push(`Payment: ${paymentAmount} ${paymentToken} | tx: ${paymentTxHash}`)
    }
    payload.description = descriptionParts.filter(Boolean).join("\n\n") || null

    // Remove explicit logo_url / market_cap fields to stay compatible with schemas lacking those columns; description holds the data
    delete (payload as Record<string, unknown>).logo_url
    delete (payload as Record<string, unknown>).market_cap

    const { data, error } = await supabase.from("token_submissions").insert(payload).select().single()

    if (error) {
      console.error("Supabase insert error", error)
      return NextResponse.json({ error: error.message || "Failed to submit token" }, { status: 500 })
    }

    const webhookUrl = process.env.SUBMISSION_WEBHOOK_URL
    if (webhookUrl) {
      const message = {
        content: `New token submission: ${payload.token_name} (${payload.token_symbol}) on ${payload.chain}\nTier: ${payload.listing_tier}\nEmail: ${payload.email}${payload.website ? `\nWebsite: ${payload.website}` : ""}`,
      }

      fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(message),
      }).catch((err) => {
        console.error("Webhook notification failed", err)
      })
    }

    return NextResponse.json({ success: true, data }, { status: 201 })
  } catch (error) {
    console.error("Submit token error", error)
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }
}
