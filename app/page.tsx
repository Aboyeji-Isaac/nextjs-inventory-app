// app/page.tsx
import Link from "next/link"
import { Button } from "./components/ui/Button"
import { ArrowRight, Box, BarChart3, ShieldCheck } from "lucide-react"

export default function Page() {
  return (
    <section className="relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24 lg:pt-40 lg:pb-32">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-20 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/20 blur-[120px] rounded-full" />
      </div>

      <div className="container px-4 mx-auto">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted border border-border text-xs font-medium text-muted-foreground mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            New: Smart Inventory v2.0
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance mb-6 animate-in fade-in slide-in-from-bottom-6 duration-700">
            Inventory Management
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl text-pretty mb-10 animate-in fade-in slide-in-from-bottom-8 duration-900">
            Streamline your inventory tracking with our powerful, easy-to-use management system. Track products, monitor
            stock levels, and gain valuable insights.
          </p>

          {/* Actions */}
          <div className="flex flex-row items-center gap-4 animate-in fade-in slide-in-from-bottom-10 duration-1000">
            <Button
              asChild
              size="lg"
              variant="primary"
              className="h-12 px-8 rounded-full text-base font-semibold transition-all hover:scale-105"
            >
              <Link href="/signin">Sign in</Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-12 px-8 rounded-full text-base font-semibold group transition-all hover:bg-muted bg-transparent"
            >
              <Link href="" className="flex items-center gap-2">
                Learn More
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>


          {/* Feature Grid */}
          <div className="mt-20 grid grid-cols-3 gap-8 w-full max-w-3xl border-t border-border pt-12 animate-in fade-in duration-1000">
            <div className="flex flex-col items-center gap-3">
              <div className="p-3 rounded-xl bg-muted border border-border">
                <Box className="w-6 h-6 text-primary" />
              </div>
              <div className="text-sm font-medium">Real-time Tracking</div>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="p-3 rounded-xl bg-muted border border-border">
                <BarChart3 className="w-6 h-6 text-primary" />
              </div>
              <div className="text-sm font-medium">Advanced Analytics</div>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="p-3 rounded-xl bg-muted border border-border">
                <ShieldCheck className="w-6 h-6 text-primary" />
              </div>
              <div className="text-sm font-medium">Secure Operations</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
