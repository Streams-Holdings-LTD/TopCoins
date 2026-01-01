import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AlertTriangle } from "lucide-react"

export const metadata = {
  title: "Disclaimer - Top Coins",
  description: "Top Coins risk disclaimer and legal notices.",
}

export default function DisclaimerPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-4 py-12">
          <div className="mb-8 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-warning/20">
              <AlertTriangle className="h-6 w-6 text-warning" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground md:text-4xl">Disclaimer</h1>
              <p className="text-muted-foreground">Important legal notices and risk disclosures</p>
            </div>
          </div>

          <div className="space-y-8 text-muted-foreground">
            <div className="rounded-xl border border-warning/50 bg-warning/10 p-6">
              <h2 className="mb-2 text-lg font-semibold text-foreground">Risk Warning</h2>
              <p>
                Cryptocurrency investments carry significant risk. You could lose all of your investment. Never invest
                more than you can afford to lose. Past performance is not indicative of future results.
              </p>
            </div>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-foreground">Not Financial Advice</h2>
              <p>
                Top Coins is a data aggregation platform that provides cryptocurrency market information for educational
                and informational purposes only. Nothing on this website should be construed as financial, investment,
                trading, or any other type of advice.
              </p>
              <p className="mt-3">
                We are not registered financial advisors, brokers, or dealers. We do not recommend any specific
                cryptocurrencies, tokens, or investment strategies. Any decisions you make based on information from
                this platform are your sole responsibility.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-foreground">Data Accuracy</h2>
              <p>
                While we strive to provide accurate and timely data, we cannot guarantee its accuracy, completeness, or
                reliability. Data is sourced from third-party providers and decentralized exchanges, which may contain
                errors or delays. Always verify information from multiple sources before making decisions.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-foreground">Token Listings</h2>
              <p>
                The inclusion of any token on Top Coins does not constitute an endorsement, recommendation, or guarantee
                of the token&apos;s legitimacy, value, or potential. Many tokens listed may be highly speculative,
                illiquid, or potentially fraudulent.
              </p>
              <p className="mt-3">
                Users should independently research any token before interacting with it. This includes:
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-6">
                <li>Verifying the contract address on official blockchain explorers</li>
                <li>Reviewing the project&apos;s whitepaper and documentation</li>
                <li>Checking the team&apos;s background and track record</li>
                <li>Understanding the token&apos;s utility and tokenomics</li>
                <li>Assessing liquidity and trading volume</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-foreground">Third-Party Links</h2>
              <p>
                Our platform may contain links to third-party websites, exchanges, or services. We are not responsible
                for the content, accuracy, or practices of any third-party sites. Use external links at your own risk.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-foreground">Wallet Connections</h2>
              <p>
                When connecting your wallet to our platform, you are solely responsible for the security of your wallet
                and private keys. We never request access to your private keys or seed phrases. Be vigilant against
                phishing attempts and always verify you are on the official Top Coins website.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-foreground">Regulatory Compliance</h2>
              <p>
                Cryptocurrency regulations vary by jurisdiction. It is your responsibility to ensure that your use of
                cryptocurrencies and this platform complies with the laws and regulations applicable in your
                jurisdiction.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-foreground">Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by law, Top Coins and its affiliates shall not be liable for any
                damages, losses, or claims arising from your use of this platform or reliance on information provided
                herein.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
