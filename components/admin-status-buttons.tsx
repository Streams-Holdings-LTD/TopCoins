"use client"

import { useRouter } from "next/navigation"
import { useTransition } from "react"

const allowedStatuses = ["pending", "approved", "rejected", "deleted"] as const

type Status = (typeof allowedStatuses)[number]

export function AdminStatusButtons({ id, currentStatus }: { id: string; currentStatus: Status }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const update = (status: Status, hardDelete = false) => {
    if (!id || !allowedStatuses.includes(status)) return
    startTransition(async () => {
      await fetch("/api/admin/update-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status, hardDelete }),
      })
      router.refresh()
    })
  }

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => update("approved")}
        className="rounded-md bg-emerald-600 px-3 py-1 text-xs font-medium text-white hover:bg-emerald-700"
        disabled={isPending}
      >
        Approve
      </button>
      <button
        onClick={() => update("rejected")}
        className="rounded-md bg-rose-600 px-3 py-1 text-xs font-medium text-white hover:bg-rose-700"
        disabled={isPending}
      >
        Reject
      </button>
      {currentStatus !== "pending" ? (
        <button
          onClick={() => update("pending")}
          className="rounded-md border border-border px-3 py-1 text-xs font-medium text-foreground hover:bg-muted"
          disabled={isPending}
        >
          Reset
        </button>
      ) : null}
      {currentStatus === "deleted" ? (
        <button
          onClick={() => update("deleted", true)}
          className="rounded-md bg-rose-700 px-3 py-1 text-xs font-medium text-white hover:bg-rose-800"
          disabled={isPending}
        >
          Confirm Delete
        </button>
      ) : (
        <button
          onClick={() => update("deleted")}
          className="rounded-md bg-zinc-800 px-3 py-1 text-xs font-medium text-white hover:bg-zinc-900"
          disabled={isPending}
        >
          Delete
        </button>
      )}
    </div>
  )
}
