import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export const metadata = {
  title: "FAQ - Top Coins",
  description: "Frequently asked questions about Top Coins cryptocurrency tracking platform.",
}

const faqs = [
  {
    question: "How do I list my token on Top Coins?",
    answer:
      "You can submit your token through our Submit Token page. Fill out the required information including contract address, blockchain, and basic token details. Our team reviews all submissions within 24-48 hours.",
  },
  {
    question: "Is listing on Top Coins free?",
    answer:
      "Yes, basic listings are completely free. We also offer promoted listings that include additional features like featured placement and badge highlights for enhanced visibility.",
  },
  {
    question: "Where does the price data come from?",
    answer:
      "We aggregate price data from multiple decentralized exchanges (DEXs) and liquidity pools across supported blockchains. This ensures accurate and real-time pricing information.",
  },
  {
    question: "Which blockchains do you support?",
    answer:
      "Currently, we support Ethereum, Solana, BNB Chain, Base, Avalanche, and Polygon. We're continuously adding support for more chains based on community demand.",
  },
  {
    question: "How do I connect my wallet?",
    answer:
      "Click the 'Connect' button in the header. We support MetaMask, Phantom, WalletConnect, Coinbase Wallet, and Trust Wallet. Simply select your preferred wallet and approve the connection.",
  },
  {
    question: "What does the badge number mean?",
    answer:
      "The badge number indicates a promoted position. Tokens with badges have paid for enhanced visibility and appear in the promoted section at the top of the listings.",
  },
  {
    question: "How is market cap calculated?",
    answer:
      "Market cap is calculated by multiplying the current token price by the circulating supply. For tokens without verified supply data, we use the total supply from the contract.",
  },
  {
    question: "Can I remove my token from the listing?",
    answer:
      "Yes, token creators or verified team members can request removal by contacting us through the Contact page. Provide proof of ownership and your reason for removal.",
  },
  {
    question: "How often is the data updated?",
    answer:
      "Price, volume, and transaction data are updated in real-time. Market cap and liquidity data refresh every few seconds to ensure you always have the latest information.",
  },
  {
    question: "Do you offer an API?",
    answer:
      "Yes, we offer a public API for accessing token data. Check our API Documentation page for endpoints, rate limits, and integration guides.",
  },
]

export default function FAQPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-4 py-12">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-foreground md:text-4xl">Frequently Asked Questions</h1>
            <p className="mt-2 text-muted-foreground">Find answers to common questions about Top Coins</p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="rounded-lg border border-border bg-card px-4"
              >
                <AccordionTrigger className="text-left text-foreground hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-12 rounded-xl border border-border bg-card p-6 text-center">
            <h2 className="text-xl font-semibold text-foreground">Still have questions?</h2>
            <p className="mt-2 text-muted-foreground">
              Can&apos;t find what you&apos;re looking for? Reach out to our support team.
            </p>
            <a
              href="/contact"
              className="mt-4 inline-flex items-center justify-center rounded-lg bg-primary px-6 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Contact Support
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
