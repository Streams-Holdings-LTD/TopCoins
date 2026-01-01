import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Home, Search, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 items-center justify-center px-4">
        <div className="text-center">
          <div className="mb-6 text-8xl font-bold text-primary">404</div>
          <h1 className="mb-2 text-3xl font-bold text-foreground">Page Not Found</h1>
          <p className="mb-8 text-muted-foreground">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/">
              <Button className="gap-2">
                <Home className="h-4 w-4" />
                Go Home
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" className="gap-2 bg-transparent">
                <Search className="h-4 w-4" />
                Search Tokens
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
