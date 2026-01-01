import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const allowedStatuses = ["pending", "approved", "rejected", "deleted"] as const

type Status = (typeof allowedStatuses)[number]

export async function POST(req: Request) {
  try {
    const { id, status, hardDelete } = (await req.json()) as { id?: string; status?: Status; hardDelete?: boolean }

    if (!id || !status || !allowedStatuses.includes(status)) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 })
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json({ error: "Server misconfigured" }, { status: 500 })
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    if (status === "deleted" && hardDelete) {
      const { error } = await supabase.from("token_submissions").delete().eq("id", id)
      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
      }
      return NextResponse.json({ ok: true })
    }

    const { error } = await supabase.from("token_submissions").update({ status }).eq("id", id)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("Update status error", error)
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }
}
