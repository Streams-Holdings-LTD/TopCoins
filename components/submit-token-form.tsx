"use client"

import type React from "react"

import { useEffect, useMemo, useState } from "react"
import { Rocket, CheckCircle2, AlertCircle, Wallet } from "lucide-react"
import { useAccount, useSendTransaction, useSwitchChain, useWriteContract } from "wagmi"
import { base } from "wagmi/chains"
import { parseEther, parseUnits } from "viem"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useWallet } from "@/components/wallet-provider"

const chains = [
  { value: "ethereum", label: "Ethereum" },
  { value: "solana", label: "Solana" },
  { value: "binance", label: "BNB Chain" },
  { value: "base", label: "Base" },
  { value: "avax", label: "Avalanche" },
  { value: "polygon", label: "Polygon" },
]

const listingTiers = [
  {
    id: "basic",
    name: "Basic Listing",
    price: "Free",
    features: ["Listed in main table", "Search visibility", "Basic analytics"],
  },
  {
    id: "promoted",
    name: "Promoted",
    price: "$79",
    features: ["Everything in Basic", "Featured section", "Badge highlight", "Priority support"],
  },
  {
    id: "premium",
    name: "Premium",
    price: "$149",
    features: ["Everything in Promoted", "Top position", "Social media promotion", "Custom badge"],
  },
]

const PAYMENT_RECIPIENT = "0x0E33642B77F1f89d3f8b974Ad027845E81e9088f"
// Native USDC on Base
const USDC_CONTRACT = "0x833589fCD6eDb6E08f4c7C31Dfc0b3AAd87eA6A"

const tierPayments = {
  promoted: { usdcAmount: "79", ethAmount: "0.0265" },
  premium: { usdcAmount: "149", ethAmount: "0.05" },
}

const erc20Abi = [
  {
    type: "function",
    name: "transfer",
    stateMutability: "nonpayable",
    inputs: [
      { name: "recipient", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    outputs: [{ name: "", type: "bool" }],
  },
]

export function SubmitTokenForm() {
  const [mounted, setMounted] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [selectedTier, setSelectedTier] = useState("basic")
  const [selectedChain, setSelectedChain] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [paymentToken, setPaymentToken] = useState<"usdc" | "eth">("usdc")
  const { address } = useWallet()
  const { chain } = useAccount()
  const { switchChainAsync } = useSwitchChain()
  const { sendTransactionAsync } = useSendTransaction()
  const { writeContractAsync } = useWriteContract()

  useEffect(() => {
    setMounted(true)
  }, [])

  const payInfo = useMemo(() => {
    if (selectedTier === "promoted" || selectedTier === "premium") {
      const info = tierPayments[selectedTier]
      return info
    }
    return null
  }, [selectedTier])

  if (!mounted) {
    return null
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = e.currentTarget
    const formData = new FormData(form)
    const payload = {
      tokenName: (formData.get("tokenName") as string | null)?.trim() ?? "",
      tokenSymbol: (formData.get("tokenSymbol") as string | null)?.trim() ?? "",
      chain: selectedChain,
      contractAddress: (formData.get("contractAddress") as string | null)?.trim() ?? "",
      website: (formData.get("website") as string | null)?.trim() || "",
      logoUrl: (formData.get("logoUrl") as string | null)?.trim() || "",
      twitter: (formData.get("twitter") as string | null)?.trim() || null,
      telegram: (formData.get("telegram") as string | null)?.trim() || null,
      email: (formData.get("email") as string | null)?.trim() ?? "",
      description: (formData.get("description") as string | null)?.trim() || "",
      marketCap: (formData.get("marketCap") as string | null)?.trim() || "",
      listingTier: selectedTier,
    }

    const logoIsPng = /\.png(\?|#|$)/i.test(payload.logoUrl.split("#")[0])
    const marketCapNumber = Number(payload.marketCap)
    const missingRequired =
      !payload.tokenName ||
      !payload.tokenSymbol ||
      !payload.chain ||
      !payload.contractAddress ||
      !payload.website ||
      !payload.logoUrl ||
      !payload.email ||
      !payload.description ||
      !payload.marketCap

    if (missingRequired) {
      setError("Please fill out all fields, including Website, Logo URL, and Description.")
      return
    }

    if (!logoIsPng) {
      setError("Logo URL must point to a .png image")
      return
    }

    if (!Number.isFinite(marketCapNumber) || marketCapNumber <= 0) {
      setError("Market cap must be a positive number")
      return
    }

    if (!payload.chain) {
      setError("Please select a blockchain.")
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      let paymentDetails: { paymentToken: string; paymentAmount: string; paymentTxHash: string } | null = null

      if (selectedTier !== "basic") {
        if (!address) {
          throw new Error("Connect your wallet to pay for this tier.")
        }

        if (chain?.id !== base.id && switchChainAsync) {
          await switchChainAsync({ chainId: base.id })
        }

        if (!payInfo) {
          throw new Error("Payment details missing for this tier.")
        }

        if (paymentToken === "eth") {
          const amountEth = payInfo.ethAmount
          const tx = await sendTransactionAsync({ to: PAYMENT_RECIPIENT as `0x${string}`, value: parseEther(amountEth), chainId: base.id })
          paymentDetails = { paymentToken: "ETH", paymentAmount: amountEth, paymentTxHash: tx }
        } else {
          const amountUsdc = payInfo.usdcAmount
          const tx = await writeContractAsync({
            address: USDC_CONTRACT as `0x${string}`,
            abi: erc20Abi,
            functionName: "transfer",
            args: [PAYMENT_RECIPIENT, parseUnits(amountUsdc, 6)],
            chainId: base.id,
          })
          paymentDetails = { paymentToken: "USDC", paymentAmount: amountUsdc, paymentTxHash: tx }
        }
      }

      const response = await fetch("/api/submit-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...payload,
          ...(paymentDetails
            ? {
                paymentToken: paymentDetails.paymentToken,
                paymentAmount: paymentDetails.paymentAmount,
                paymentTxHash: paymentDetails.paymentTxHash,
              }
            : {}),
        }),
      })

      if (!response.ok) {
        const text = await response.text()
        let apiError: string | undefined
        try {
          apiError = (JSON.parse(text) as { error?: string }).error
        } catch {
          apiError = text || undefined
        }
        throw new Error(apiError || `Request failed (${response.status})`)
      }

      form.reset()
      setSelectedChain("")
      setSelectedTier("basic")
      setSubmitted(true)
    } catch (err) {
      console.error("Token submission failed", err)
      const message = err instanceof Error ? err.message : null
      setError(message || "We couldn’t submit your token. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="rounded-xl border border-border bg-card p-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
          <CheckCircle2 className="h-8 w-8 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">Submission Received!</h2>
        <p className="mt-2 text-muted-foreground">
          We&apos;ll review your token and get back to you within 24-48 hours.
        </p>
        <Button onClick={() => setSubmitted(false)} className="mt-6">
          Submit Another Token
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Listing Tiers */}
      <div className="grid gap-4 md:grid-cols-3">
        {listingTiers.map((tier) => (
          <button
            key={tier.id}
            onClick={() => setSelectedTier(tier.id)}
            className={`rounded-xl border p-4 text-left transition-all ${
              selectedTier === tier.id
                ? "border-primary bg-primary/10"
                : "border-border bg-card hover:border-primary/50"
            }`}
          >
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground">{tier.name}</h3>
              <span className="text-lg font-bold text-primary">{tier.price}</span>
            </div>
            <ul className="mt-3 space-y-1">
              {tier.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-3 w-3 text-primary" />
                  {feature}
                </li>
              ))}
            </ul>
          </button>
        ))}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="rounded-xl border border-border bg-card p-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="tokenName">Token Name *</Label>
            <Input id="tokenName" name="tokenName" placeholder="e.g. Pepe" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tokenSymbol">Symbol *</Label>
            <Input id="tokenSymbol" name="tokenSymbol" placeholder="e.g. PEPE" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="chain">Blockchain *</Label>
            <Select required value={selectedChain} onValueChange={setSelectedChain}>
              <SelectTrigger>
                <SelectValue placeholder="Select chain" />
              </SelectTrigger>
              <SelectContent>
                {chains.map((chain) => (
                  <SelectItem key={chain.value} value={chain.value}>
                    {chain.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="contractAddress">Contract Address *</Label>
            <Input id="contractAddress" name="contractAddress" placeholder="0x..." required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="marketCap">Market Cap (USD) *</Label>
            <Input id="marketCap" name="marketCap" type="number" min="1" step="any" placeholder="5000000" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="website">Website</Label>
            <Input id="website" name="website" type="url" placeholder="https://yourtoken.com" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="logoUrl">Logo URL</Label>
            <Input
              id="logoUrl"
              name="logoUrl"
              type="url"
              placeholder="https://.../logo.png"
              title="Logo must be a .png file"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="twitter">Twitter</Label>
            <Input id="twitter" name="twitter" placeholder="@yourtoken" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="telegram">Telegram</Label>
            <Input id="telegram" name="telegram" placeholder="t.me/yourtoken" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Contact Email *</Label>
            <Input id="email" name="email" type="email" placeholder="contact@yourtoken.com" required />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="description">Token Description</Label>
            <Textarea id="description" name="description" placeholder="Tell us about your token..." rows={4} required />
          </div>
        </div>

        <div className="mt-6 flex items-start gap-3 rounded-lg bg-warning/10 p-4">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-warning" />
          <div className="text-sm text-muted-foreground">
            <p className="font-medium text-foreground">Important Notice</p>
            <p>
              All submissions are reviewed manually. Tokens with suspicious activity or scam indicators will be
              rejected.
            </p>
          </div>
        </div>

        {selectedTier !== "basic" && payInfo ? (
          <div className="mt-6 rounded-lg border border-primary/40 bg-primary/5 p-4">
            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Wallet className="h-4 w-4" />
              Payment required for {selectedTier === "promoted" ? "Promoted" : "Premium"} tier
            </div>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              <label className={`flex cursor-pointer items-center justify-between rounded-lg border p-3 transition ${paymentToken === "usdc" ? "border-primary bg-primary/10" : "border-border"}`}>
                <div>
                  <div className="font-semibold">Pay with USDC</div>
                  <div className="text-sm text-muted-foreground">Exact stable amount</div>
                </div>
                <div className="text-lg font-bold">{payInfo.usdcAmount} USDC</div>
                <input
                  type="radio"
                  name="paymentToken"
                  value="usdc"
                  className="sr-only"
                  checked={paymentToken === "usdc"}
                  onChange={() => setPaymentToken("usdc")}
                />
              </label>
              <label className={`flex cursor-pointer items-center justify-between rounded-lg border p-3 transition ${paymentToken === "eth" ? "border-primary bg-primary/10" : "border-border"}`}>
                <div>
                  <div className="font-semibold">Pay with ETH</div>
                  <div className="text-sm text-muted-foreground">Fixed amount on Ethereum</div>
                </div>
                <div className="text-lg font-bold">{payInfo.ethAmount} ETH</div>
                <input
                  type="radio"
                  name="paymentToken"
                  value="eth"
                  className="sr-only"
                  checked={paymentToken === "eth"}
                  onChange={() => setPaymentToken("eth")}
                />
              </label>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">Chain: Base mainnet · Recipient: {PAYMENT_RECIPIENT}</p>
          </div>
        ) : null}

        {error ? <p className="mt-4 text-sm text-destructive">{error}</p> : null}
        <Button type="submit" className="mt-6 w-full gap-2" size="lg" disabled={isSubmitting}>
          <Rocket className="h-5 w-5" />
          {isSubmitting ? "Submitting..." : "Submit Token for Review"}
        </Button>
      </form>
    </div>
  )
}
