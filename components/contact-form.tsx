"use client"

import type React from "react"

import { useState } from "react"
import { Send, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { supabaseClient } from "@/lib/supabase-client"

const subjects = [
  { value: "general", label: "General Inquiry" },
  { value: "listing", label: "Token Listing" },
  { value: "partnership", label: "Partnership" },
  { value: "bug", label: "Bug Report" },
  { value: "feature", label: "Feature Request" },
  { value: "other", label: "Other" },
]

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [subject, setSubject] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const payload = {
      name: (formData.get("name") as string | null)?.trim() ?? "",
      email: (formData.get("email") as string | null)?.trim() ?? "",
      subject,
      message: (formData.get("message") as string | null)?.trim() ?? "",
    }

    if (!payload.subject) {
      setError("Please select a subject.")
      return
    }

    setIsSubmitting(true)
    setError(null)

    const { error: insertError } = await supabaseClient.from("contact_messages").insert(payload)

    if (insertError) {
      setError("We couldn’t send your message. Please try again.")
      setIsSubmitting(false)
      return
    }

    e.currentTarget.reset()
    setSubject("")
    setIsSubmitting(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="flex h-full items-center justify-center rounded-xl border border-border bg-card p-8 text-center">
        <div>
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
            <CheckCircle2 className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">Message Sent!</h2>
          <p className="mt-2 text-muted-foreground">We&apos;ll get back to you as soon as possible.</p>
          <Button onClick={() => setSubmitted(false)} className="mt-6">
            Send Another Message
          </Button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-border bg-card p-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Name *</Label>
          <Input id="name" name="name" placeholder="Your name" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input id="email" name="email" type="email" placeholder="you@example.com" required />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="subject">Subject *</Label>
          <Select required value={subject} onValueChange={setSubject}>
            <SelectTrigger>
              <SelectValue placeholder="Select a subject" />
            </SelectTrigger>
            <SelectContent>
              {subjects.map((subject) => (
                <SelectItem key={subject.value} value={subject.value}>
                  {subject.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="message">Message *</Label>
          <Textarea id="message" name="message" placeholder="Your message..." rows={6} required />
        </div>
      </div>
      {error ? <p className="mt-4 text-sm text-destructive">{error}</p> : null}
      <Button type="submit" className="mt-6 w-full gap-2" size="lg" disabled={isSubmitting}>
        <Send className="h-5 w-5" />
        {isSubmitting ? "Sending..." : "Send Message"}
      </Button>
    </form>
  )
}
