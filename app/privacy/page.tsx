import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Privacy Policy - Top Coins",
  description: "Top Coins privacy policy and data handling practices.",
}

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-4 py-12">
          <h1 className="text-3xl font-bold text-foreground md:text-4xl">Privacy Policy</h1>
          <p className="mt-2 text-muted-foreground">Last updated: December 28, 2025</p>

          <div className="mt-8 space-y-8 text-muted-foreground">
            <section>
              <h2 className="mb-3 text-xl font-semibold text-foreground">1. Information We Collect</h2>
              <p className="mb-3">We collect information in the following ways:</p>
              <ul className="list-disc space-y-1 pl-6">
                <li>
                  <strong className="text-foreground">Usage Data:</strong> Pages visited, time spent, click patterns
                </li>
                <li>
                  <strong className="text-foreground">Device Information:</strong> Browser type, operating system, IP
                  address
                </li>
                <li>
                  <strong className="text-foreground">Wallet Addresses:</strong> Only when you connect your wallet (we
                  do not store private keys)
                </li>
                <li>
                  <strong className="text-foreground">Submission Data:</strong> Information provided when submitting
                  tokens or contacting us
                </li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-foreground">2. How We Use Information</h2>
              <p>We use collected information to:</p>
              <ul className="mt-2 list-disc space-y-1 pl-6">
                <li>Provide and improve our services</li>
                <li>Analyze usage patterns and optimize user experience</li>
                <li>Communicate with users about their submissions or inquiries</li>
                <li>Detect and prevent fraud or abuse</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-foreground">3. Cookies and Tracking</h2>
              <p>
                We use cookies and similar technologies to enhance your experience, analyze traffic, and for advertising
                purposes. You can control cookie preferences through your browser settings.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-foreground">4. Data Sharing</h2>
              <p>We do not sell your personal information. We may share data with:</p>
              <ul className="mt-2 list-disc space-y-1 pl-6">
                <li>Service providers who assist in operating our platform</li>
                <li>Analytics partners to understand usage patterns</li>
                <li>Legal authorities when required by law</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-foreground">5. Blockchain Data</h2>
              <p>
                Please note that blockchain transactions are public by nature. When you connect your wallet or interact
                with blockchain protocols through our platform, that activity is recorded on public blockchains and is
                not controlled by us.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-foreground">6. Data Security</h2>
              <p>
                We implement industry-standard security measures to protect your data. However, no method of
                transmission over the internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-foreground">7. Your Rights</h2>
              <p>You have the right to:</p>
              <ul className="mt-2 list-disc space-y-1 pl-6">
                <li>Access the personal data we hold about you</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Opt out of marketing communications</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-foreground">8. Contact</h2>
              <p>
                For privacy-related inquiries, contact us at{" "}
                <a href="mailto:privacy@topcoins.cc" className="text-primary hover:underline">
                  privacy@topcoins.cc
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
