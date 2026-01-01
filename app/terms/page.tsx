import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Terms of Service - Top Coins",
  description: "Top Coins terms of service and user agreement.",
}

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-4 py-12">
          <h1 className="text-3xl font-bold text-foreground md:text-4xl">Terms of Service</h1>
          <p className="mt-2 text-muted-foreground">Last updated: December 28, 2025</p>

          <div className="mt-8 space-y-8 text-muted-foreground">
            <section>
              <h2 className="mb-3 text-xl font-semibold text-foreground">1. Acceptance of Terms</h2>
              <p>
                By accessing and using Top Coins (topcoins.cc), you accept and agree to be bound by these Terms of
                Service. If you do not agree to these terms, please do not use our service.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-foreground">2. Description of Service</h2>
              <p>
                Top Coins provides cryptocurrency token tracking, analytics, and market data aggregation services. We
                display information about tokens across multiple blockchain networks for informational purposes only.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-foreground">3. No Financial Advice</h2>
              <p>
                The information provided on Top Coins is for informational purposes only and should not be considered
                financial, investment, or trading advice. We do not recommend buying, selling, or holding any
                cryptocurrency. Always conduct your own research and consult with a qualified financial advisor.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-foreground">4. Accuracy of Information</h2>
              <p>
                While we strive to provide accurate and up-to-date information, we cannot guarantee the accuracy,
                completeness, or timeliness of data displayed on our platform. Cryptocurrency markets are highly
                volatile, and prices may change rapidly.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-foreground">5. User Responsibilities</h2>
              <p>Users agree to:</p>
              <ul className="mt-2 list-disc space-y-1 pl-6">
                <li>Use the service in compliance with all applicable laws</li>
                <li>Not attempt to manipulate or abuse the platform</li>
                <li>Not submit fraudulent or misleading token information</li>
                <li>Not use automated systems to scrape data without permission</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-foreground">6. Token Listings</h2>
              <p>
                Listing a token on Top Coins does not constitute an endorsement. We reserve the right to remove any
                token listing at our discretion. Users should verify token contracts independently before interacting
                with them.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-foreground">7. Limitation of Liability</h2>
              <p>
                Top Coins and its operators shall not be liable for any direct, indirect, incidental, special, or
                consequential damages arising from the use or inability to use our service, including but not limited to
                losses resulting from trading decisions based on information provided.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-foreground">8. Changes to Terms</h2>
              <p>
                We reserve the right to modify these terms at any time. Continued use of the service after changes
                constitutes acceptance of the new terms.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-foreground">9. Contact</h2>
              <p>
                For questions about these terms, please contact us at{" "}
                <a href="mailto:legal@topcoins.cc" className="text-primary hover:underline">
                  legal@topcoins.cc
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
