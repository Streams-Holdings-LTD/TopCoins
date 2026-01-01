"use client"

import type React from "react"

import { X, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useWallet, type WalletType } from "@/components/wallet-provider"
import { cn } from "@/lib/utils"

const wallets = [
  {
    id: "metamask" as WalletType,
    name: "MetaMask",
    description: "Connect using browser wallet",
    popular: true,
    color: "#E8831D",
  },
  {
    id: "phantom" as WalletType,
    name: "Phantom",
    description: "Connect to Solana network",
    popular: true,
    color: "#AB9FF2",
  },
  {
    id: "walletconnect" as WalletType,
    name: "WalletConnect",
    description: "Scan with mobile wallet",
    color: "#3B99FC",
  },
  {
    id: "coinbase" as WalletType,
    name: "Coinbase Wallet",
    description: "Connect using Coinbase",
    color: "#0052FF",
  },
  {
    id: "trustwallet" as WalletType,
    name: "Trust Wallet",
    description: "Connect using Trust Wallet",
    color: "#3375BB",
  },
]

// SVG Icons for each wallet
function MetaMaskIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M35.75 3.5L22.05 13.65L24.4 7.4L35.75 3.5Z"
        fill="#E17726"
        stroke="#E17726"
        strokeWidth="0.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.25 3.5L17.8 13.75L15.6 7.4L4.25 3.5Z"
        fill="#E27625"
        stroke="#E27625"
        strokeWidth="0.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M30.85 27.05L27.25 32.75L35 34.9L37.25 27.2L30.85 27.05Z"
        fill="#E27625"
        stroke="#E27625"
        strokeWidth="0.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.8 27.2L5 34.9L12.75 32.75L9.15 27.05L2.8 27.2Z"
        fill="#E27625"
        stroke="#E27625"
        strokeWidth="0.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.35 17.75L10.2 21.05L17.9 21.4L17.65 13.1L12.35 17.75Z"
        fill="#E27625"
        stroke="#E27625"
        strokeWidth="0.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M27.65 17.75L22.25 13L22.05 21.4L29.8 21.05L27.65 17.75Z"
        fill="#E27625"
        stroke="#E27625"
        strokeWidth="0.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.75 32.75L17.4 30.5L13.4 27.25L12.75 32.75Z"
        fill="#E27625"
        stroke="#E27625"
        strokeWidth="0.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22.6 30.5L27.25 32.75L26.6 27.25L22.6 30.5Z"
        fill="#E27625"
        stroke="#E27625"
        strokeWidth="0.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M27.25 32.75L22.6 30.5L22.95 33.6L22.9 34.8L27.25 32.75Z"
        fill="#D5BFB2"
        stroke="#D5BFB2"
        strokeWidth="0.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.75 32.75L17.1 34.8L17.05 33.6L17.4 30.5L12.75 32.75Z"
        fill="#D5BFB2"
        stroke="#D5BFB2"
        strokeWidth="0.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.2 25.5L13.3 24.35L16.1 23.1L17.2 25.5Z"
        fill="#233447"
        stroke="#233447"
        strokeWidth="0.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22.8 25.5L23.9 23.1L26.7 24.35L22.8 25.5Z"
        fill="#233447"
        stroke="#233447"
        strokeWidth="0.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.75 32.75L13.45 27.05L9.15 27.2L12.75 32.75Z"
        fill="#CC6228"
        stroke="#CC6228"
        strokeWidth="0.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M26.55 27.05L27.25 32.75L30.85 27.2L26.55 27.05Z"
        fill="#CC6228"
        stroke="#CC6228"
        strokeWidth="0.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M29.8 21.05L22.05 21.4L22.8 25.5L23.9 23.1L26.7 24.35L29.8 21.05Z"
        fill="#CC6228"
        stroke="#CC6228"
        strokeWidth="0.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.3 24.35L16.1 23.1L17.2 25.5L17.9 21.4L10.2 21.05L13.3 24.35Z"
        fill="#CC6228"
        stroke="#CC6228"
        strokeWidth="0.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.2 21.05L13.4 27.25L13.3 24.35L10.2 21.05Z"
        fill="#E27625"
        stroke="#E27625"
        strokeWidth="0.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M26.7 24.35L26.6 27.25L29.8 21.05L26.7 24.35Z"
        fill="#E27625"
        stroke="#E27625"
        strokeWidth="0.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.9 21.4L17.2 25.5L18.1 30.15L18.3 23.85L17.9 21.4Z"
        fill="#E27625"
        stroke="#E27625"
        strokeWidth="0.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22.05 21.4L21.7 23.8L21.9 30.15L22.8 25.5L22.05 21.4Z"
        fill="#E27625"
        stroke="#E27625"
        strokeWidth="0.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22.8 25.5L21.9 30.15L22.6 30.5L26.6 27.25L26.7 24.35L22.8 25.5Z"
        fill="#F5841F"
        stroke="#F5841F"
        strokeWidth="0.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.3 24.35L13.4 27.25L17.4 30.5L18.1 30.15L17.2 25.5L13.3 24.35Z"
        fill="#F5841F"
        stroke="#F5841F"
        strokeWidth="0.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22.9 34.8L22.95 33.6L22.65 33.35H17.35L17.05 33.6L17.1 34.8L12.75 32.75L14.25 33.95L17.3 36H22.7L25.75 33.95L27.25 32.75L22.9 34.8Z"
        fill="#C0AC9D"
        stroke="#C0AC9D"
        strokeWidth="0.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22.6 30.5L21.9 30.15H18.1L17.4 30.5L17.05 33.6L17.35 33.35H22.65L22.95 33.6L22.6 30.5Z"
        fill="#161616"
        stroke="#161616"
        strokeWidth="0.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M36.45 14.35L37.6 9.1L35.75 3.5L22.6 13.15L27.65 17.75L34.8 19.85L36.5 17.85L35.75 17.3L36.95 16.2L36.05 15.5L37.25 14.55L36.45 14.35Z"
        fill="#763E1A"
        stroke="#763E1A"
        strokeWidth="0.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.4 9.1L3.55 14.35L2.7 14.55L3.95 15.5L3.05 16.2L4.25 17.3L3.5 17.85L5.2 19.85L12.35 17.75L17.4 13.15L4.25 3.5L2.4 9.1Z"
        fill="#763E1A"
        stroke="#763E1A"
        strokeWidth="0.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M34.8 19.85L27.65 17.75L29.8 21.05L26.6 27.25L30.85 27.2H37.25L34.8 19.85Z"
        fill="#F5841F"
        stroke="#F5841F"
        strokeWidth="0.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.35 17.75L5.2 19.85L2.8 27.2H9.15L13.4 27.25L10.2 21.05L12.35 17.75Z"
        fill="#F5841F"
        stroke="#F5841F"
        strokeWidth="0.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22.05 21.4L22.6 13.15L24.4 7.4H15.6L17.4 13.15L17.9 21.4L18.1 23.9L18.1 30.15H21.9L21.9 23.9L22.05 21.4Z"
        fill="#F5841F"
        stroke="#F5841F"
        strokeWidth="0.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function PhantomIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="10" fill="url(#phantom-gradient)" />
      <path
        d="M29.8 19.8C29.8 14.3 25.1 9.9 19.3 9.9C13.5 9.9 8.8 14.2 8.2 19.7C7.5 25.5 11.9 30.5 17.7 30.8H18.4C23.3 30.8 27.5 27.7 29.1 23.4C29.6 22.2 29.8 21 29.8 19.8Z"
        fill="url(#phantom-inner)"
      />
      <path
        d="M14.5 20.1C14.5 21.3 13.5 22.3 12.3 22.3C11.1 22.3 10.1 21.3 10.1 20.1C10.1 18.9 11.1 17.9 12.3 17.9C13.5 17.9 14.5 18.9 14.5 20.1Z"
        fill="white"
      />
      <path
        d="M21.1 20.1C21.1 21.3 20.1 22.3 18.9 22.3C17.7 22.3 16.7 21.3 16.7 20.1C16.7 18.9 17.7 17.9 18.9 17.9C20.1 17.9 21.1 18.9 21.1 20.1Z"
        fill="white"
      />
      <defs>
        <linearGradient id="phantom-gradient" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#534BB1" />
          <stop offset="1" stopColor="#551BF9" />
        </linearGradient>
        <linearGradient id="phantom-inner" x1="8" y1="10" x2="30" y2="31" gradientUnits="userSpaceOnUse">
          <stop stopColor="#534BB1" />
          <stop offset="1" stopColor="#551BF9" />
        </linearGradient>
      </defs>
    </svg>
  )
}

function WalletConnectIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="10" fill="#3B99FC" />
      <path
        d="M12.3 15.6C16.5 11.5 23.3 11.5 27.5 15.6L28 16.1C28.2 16.3 28.2 16.6 28 16.8L26.3 18.5C26.2 18.6 26 18.6 25.9 18.5L25.2 17.8C22.3 15 17.5 15 14.6 17.8L13.9 18.5C13.8 18.6 13.6 18.6 13.5 18.5L11.8 16.8C11.6 16.6 11.6 16.3 11.8 16.1L12.3 15.6ZM30.8 18.8L32.3 20.3C32.5 20.5 32.5 20.8 32.3 21L25.3 27.9C25.1 28.1 24.8 28.1 24.6 27.9L19.8 23.2C19.7 23.1 19.6 23.1 19.5 23.2L14.7 27.9C14.5 28.1 14.2 28.1 14 27.9L7 21C6.8 20.8 6.8 20.5 7 20.3L8.5 18.8C8.7 18.6 9 18.6 9.2 18.8L14 23.5C14.1 23.6 14.2 23.6 14.3 23.5L19.1 18.8C19.3 18.6 19.6 18.6 19.8 18.8L24.6 23.5C24.7 23.6 24.8 23.6 24.9 23.5L29.7 18.8C29.9 18.6 30.2 18.6 30.4 18.8H30.8Z"
        fill="white"
      />
    </svg>
  )
}

function CoinbaseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="10" fill="#0052FF" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20 32C26.6274 32 32 26.6274 32 20C32 13.3726 26.6274 8 20 8C13.3726 8 8 13.3726 8 20C8 26.6274 13.3726 32 20 32ZM17 16.5C16.1716 16.5 15.5 17.1716 15.5 18V22C15.5 22.8284 16.1716 23.5 17 23.5H23C23.8284 23.5 24.5 22.8284 24.5 22V18C24.5 17.1716 23.8284 16.5 23 16.5H17Z"
        fill="white"
      />
    </svg>
  )
}

function TrustWalletIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="10" fill="#3375BB" />
      <path
        d="M20 8L9 12.5V19.5C9 26.5 13.5 32.5 20 34C26.5 32.5 31 26.5 31 19.5V12.5L20 8Z"
        stroke="white"
        strokeWidth="2"
        fill="none"
      />
      <path d="M20 11L12 14.5V19.5C12 24.5 15.5 29 20 30.5C24.5 29 28 24.5 28 19.5V14.5L20 11Z" fill="white" />
    </svg>
  )
}

const walletIcons: Record<string, React.FC<{ className?: string }>> = {
  metamask: MetaMaskIcon,
  phantom: PhantomIcon,
  walletconnect: WalletConnectIcon,
  coinbase: CoinbaseIcon,
  trustwallet: TrustWalletIcon,
}

export function WalletModal() {
  const { isModalOpen, closeModal, connect, isConnecting } = useWallet()

  console.log('WalletModal - isModalOpen:', isModalOpen)
  console.log('WalletModal - wallets to render:', wallets.length)

  if (!isModalOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto px-4 py-40">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={closeModal} />

      {/* Modal */}
      <div className="relative z-[101] w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-2xl mb-8 max-h-[80vh] overflow-y-auto">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">Connect Wallet</h2>
          <Button variant="ghost" size="icon" onClick={closeModal} className="h-8 w-8">
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Wallet List */}
        <div className="space-y-3">
          {wallets.map((wallet) => {
            const IconComponent = walletIcons[wallet.id || ""]
            console.log('Rendering wallet:', wallet.name, wallet.id)
            return (
              <button
                key={wallet.id}
                onClick={() => {
                  console.log('Clicked wallet:', wallet.name, wallet.id)
                  connect(wallet.id)
                }}
                disabled={isConnecting}
                className={cn(
                  "flex w-full items-center gap-4 rounded-lg border border-border bg-secondary/50 p-4 text-left transition-all hover:border-primary/50 hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-50",
                  wallet.popular && "border-primary/30",
                )}
              >
                <div className="h-12 w-12 overflow-hidden rounded-xl">
                  {IconComponent && <IconComponent className="h-12 w-12" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground">{wallet.name}</span>
                    {wallet.popular && (
                      <span className="rounded bg-primary/20 px-1.5 py-0.5 text-xs font-medium text-primary">
                        Popular
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{wallet.description}</p>
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
              </button>
            )
          })}
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-muted-foreground">
          By connecting a wallet, you agree to our{" "}
          <a href="/terms" className="text-primary hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/privacy" className="text-primary hover:underline">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  )
}
