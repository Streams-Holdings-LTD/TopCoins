import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ContactForm } from "@/components/contact-form"
import { Mail, MessageCircle, Twitter } from "lucide-react"

export const metadata = {
  title: "Contact - Top Coins",
  description: "Get in touch with the Top Coins team for support, partnerships, or inquiries.",
}

const contactMethods = [
  {
    icon: Mail,
    title: "Email",
    description: "For general inquiries and support",
    value: "support@topcoins.cc",
    href: "mailto:support@topcoins.cc",
  },
  {
    icon: MessageCircle,
    title: "Telegram",
    description: "Join our community chat",
    value: "@TopCoinsOfficial",
    href: "https://t.me/TopCoinsOfficial",
  },
  {
    icon: Twitter,
    title: "Twitter",
    description: "Follow us for updates",
    value: "@TopCoins",
    href: "https://twitter.com/TopCoins",
  },
]

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-5xl px-4 py-12">
          <div className="mb-12 text-center">
            <h1 className="text-3xl font-bold text-foreground md:text-4xl">Contact Us</h1>
            <p className="mt-2 text-muted-foreground">Have questions? We&apos;d love to hear from you.</p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Contact Methods */}
            <div className="space-y-4 lg:col-span-1">
              {contactMethods.map((method) => (
                <a
                  key={method.title}
                  href={method.href}
                  target={method.href.startsWith("http") ? "_blank" : undefined}
                  rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="block rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/50"
                >
                  <method.icon className="mb-2 h-6 w-6 text-primary" />
                  <h3 className="font-semibold text-foreground">{method.title}</h3>
                  <p className="text-sm text-muted-foreground">{method.description}</p>
                  <p className="mt-2 text-sm font-medium text-primary">{method.value}</p>
                </a>
              ))}
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <ContactForm />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
