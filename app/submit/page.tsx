import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SubmitTokenForm } from "@/components/submit-token-form"

export const metadata = {
  title: "Submit Token - Top Coins",
  description: "Submit your cryptocurrency token to get listed on Top Coins and increase your visibility.",
}

export default function SubmitPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-4 py-12">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-foreground md:text-4xl">Submit Your Token</h1>
            <p className="mt-2 text-muted-foreground">
              Get your token listed on Top Coins and reach thousands of crypto investors
            </p>
          </div>
          <SubmitTokenForm />
        </div>
      </main>
      <Footer />
    </div>
  )
}
