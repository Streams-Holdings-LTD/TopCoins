import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { TrendingUp, Shield, Zap, Globe, Users, BarChart3 } from "lucide-react"

export const metadata = {
  title: "About - Top Coins",
  description: "Learn about Top Coins - the leading cryptocurrency token tracking platform.",
}

const features = [
  {
    icon: TrendingUp,
    title: "Real-Time Data",
    description: "Track live prices, volume, and market cap updates across multiple blockchains.",
  },
  {
    icon: Shield,
    title: "Verified Tokens",
    description: "All listed tokens are manually reviewed to protect users from scams.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Optimized performance for instant data loading and seamless browsing.",
  },
  {
    icon: Globe,
    title: "Multi-Chain",
    description: "Supporting Ethereum, Solana, BSC, Base, Avalanche, and more chains.",
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "Built for traders, by traders. Your feedback shapes our roadmap.",
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Deep dive into token metrics, holder distribution, and trading patterns.",
  },
]

const stats = [
  { label: "Tokens Tracked", value: "50,000+" },
  { label: "Daily Users", value: "100K+" },
  { label: "Blockchains", value: "6+" },
  { label: "Data Updates", value: "Real-time" },
]

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="border-b border-border bg-gradient-to-b from-primary/5 to-transparent px-4 py-16 md:py-24">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold text-foreground md:text-5xl">The Home for Crypto Token Discovery</h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Top Coins is your go-to platform for discovering, tracking, and analyzing cryptocurrency tokens across
              multiple blockchains.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="border-b border-border px-4 py-12">
          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-bold text-primary md:text-4xl">{stat.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="px-4 py-16">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-12 text-center text-3xl font-bold text-foreground">Why Choose Top Coins?</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <div key={feature.title} className="rounded-xl border border-border bg-card p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
                  <p className="mt-2 text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="border-t border-border bg-card px-4 py-16">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-foreground">Our Mission</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              We believe in transparency and accessibility in the cryptocurrency space. Our mission is to provide
              traders and investors with reliable, real-time data to make informed decisions. Whether you&apos;re
              tracking meme coins or researching new projects, Top Coins has you covered.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
