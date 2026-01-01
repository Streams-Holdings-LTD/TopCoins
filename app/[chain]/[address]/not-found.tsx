import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Home, Search, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function TokenNotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 items-center justify-center px-4">
        <div className="text-center">
          <div className="mb-6 text-6xl font-bold text-warning">Token Not Found</div>
          <h1 className="mb-2 text-2xl font-bold text-foreground">We couldn&apos;t find this token</h1>
          <p className="mb-8 max-w-md text-muted-foreground">
            The token you&apos;re looking for may have been delisted, the contract address could be incorrect, or it
            might not be tracked on our platform yet.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/">
              <Button className="gap-2">
                <Home className="h-4 w-4" />
                Browse Tokens
              </Button>
            </Link>
            <Link href="/submit">
              <Button variant="outline" className="gap-2 bg-transparent">
                <Search className="h-4 w-4" />
                Submit a Token
              </Button>
            </Link>
          </div>
          <Link
            href="/"
            className="mt-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to all tokens
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  )
}
