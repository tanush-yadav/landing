import Navigation from '@/components/navigation'
import { WaveBackground } from '@/components/ui/wave-background'
import { WaveDivider } from '@/components/ui/wave-divider'
import { Button } from '@/components/ui/button'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'TikTok fulfillment on autopilot | Cintra',
  description:
    'Install on TikTok Shop, connect your shipper, batch labels, and auto-push tracking. Never miss the 48-hour dispatch window.',
  alternates: { canonical: 'https://cintra.run/fulfillment' },
  openGraph: {
    title: 'TikTok fulfillment on autopilot',
    description:
      'Batch labels in minutes. We push tracking and mark shipped automatically. Clear dispatch timers on every order.',
    url: 'https://cintra.run/fulfillment',
    type: 'website',
    siteName: 'Cintra',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TikTok fulfillment on autopilot',
    description:
      'Install on TikTok Shop, connect your shipper, batch labels, and auto-push tracking.',
  },
}

export default function FulfillmentPage() {
  return (
    <main id="main">
      <Navigation />

      {/* Top bar banner */}
      <div className="pt-20" />
      <section aria-label="Announcement" className="px-4">
        <div className="mx-auto w-full max-w-5xl">
          <div className="relative isolate rounded-2xl border border-slate-200/60 bg-white/90 px-4 py-2.5 shadow-sm backdrop-blur-sm">
            <div className="flex flex-col items-start gap-2 text-sm sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2 text-slate-800">
                <span className="inline-flex h-1.5 w-1.5 items-center justify-center">
                  <span className="absolute inline-flex h-1.5 w-1.5 animate-ping rounded-full bg-emerald-400/70" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </span>
                <span className="font-semibold">New:</span>
                <span className="text-slate-700">Auto mark-shipped + tracking push for TikTok Shop. Install in minutes.</span>
              </div>
              <div className="flex items-center gap-2">
                <Button asChild size="sm">
                  <a href="#install" className="no-underline">Install now</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hero */}
      <WaveBackground variant="hero" overlayColor="gradient" mask="fadeBottom">
        <section className="relative flex items-center justify-center overflow-hidden px-4 pt-24 pb-20 sm:pt-28 sm:pb-24 lg:pt-32 lg:pb-28">
          <div className="relative z-10 mx-auto w-full max-w-5xl text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-gray-900 mb-4 leading-[1.05] sm:leading-[1.08]">
              TikTok fulfillment on autopilot.
            </h1>
            <p className="mx-auto mb-4 max-w-3xl text-sm sm:text-base md:text-lg text-gray-700">
              Install on TikTok Shop, connect your shipper, batch labels, and auto-push tracking. Never miss the 48-hour dispatch window.
            </p>
            <p className="mx-auto mb-6 max-w-xl text-xs text-slate-500">
              Teams cut label time from 3 hours to 20 minutes.
            </p>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <Button asChild size="lg">
                <a href="#install">Install now</a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="#demo">Watch 2-min demo</a>
              </Button>
            </div>

            {/* Trust row */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4 text-sm text-slate-600">
              <span>Works with TikTok Shop</span>
              <span className="text-slate-300">•</span>
              <span>Shiprocket</span>
              <span className="text-slate-300">•</span>
              <span>Shippo/ShipStation</span>
              <span className="text-slate-300">•</span>
              <span>Shopify (optional)</span>
            </div>
          </div>
        </section>
      </WaveBackground>

      <WaveDivider variant="accent" position="bottom" />

      {/* Demo placeholder */}
      <section id="demo" className="px-4 py-12 sm:py-16">
        <div className="mx-auto w-full max-w-5xl">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="aspect-video w-full rounded-xl bg-slate-100 grid place-items-center text-slate-500">
              2-min demo video
            </div>
          </div>
        </div>
      </section>

      {/* Pain -> Outcome */}
      <section className="px-4 py-12 sm:py-16">
        <div className="mx-auto w-full max-w-5xl">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-slate-900">When orders spike, clicks kill you.</h3>
              <ul className="list-disc pl-5 text-slate-700 space-y-1 text-sm">
                <li>Labels one by one</li>
                <li>Timers ticking, scans missing</li>
                <li>Tracking not pushed → “Where’s my order?”</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-slate-900">What changes</h3>
              <p className="text-slate-700 text-sm">
                Batch labels in minutes. We push tracking and mark shipped automatically. Clear dispatch timers on every order.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-4 py-12 sm:py-16 bg-gradient-to-b from-white via-purple-50/20 to-white">
        <div className="mx-auto w-full max-w-5xl">
          <h2 className="mb-6 text-2xl font-display font-bold tracking-tight text-slate-900 sm:text-3xl">How it works</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-2 text-xs font-semibold text-slate-500">Step 1</div>
              <div className="font-semibold">Connect TikTok Shop + your shipper</div>
              <div className="mt-1 text-sm text-slate-600">Shiprocket, Shippo, or ShipStation.</div>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-2 text-xs font-semibold text-slate-500">Step 2</div>
              <div className="font-semibold">Select orders due today → Make labels</div>
              <div className="mt-1 text-sm text-slate-600">Download labels.zip and picklist.csv.</div>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-2 text-xs font-semibold text-slate-500">Step 3</div>
              <div className="font-semibold">We push tracking and mark shipped</div>
              <div className="mt-1 text-sm text-slate-600">You pack the boxes.</div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature cards */}
      <section className="px-4 py-12 sm:py-16">
        <div className="mx-auto w-full max-w-5xl">
          <h2 className="mb-6 text-2xl font-display font-bold tracking-tight text-slate-900 sm:text-3xl">What you get</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              'Order board: Due Today / Tomorrow / Later with hour-left badges',
              'Batch labels: One click, artifact pack generated',
              'Artifacts: labels.zip, pick-slips.pdf, picklist.csv, manifest.csv',
              'Dispatch timers: Real deadlines surfaced',
              'Inventory checks: Warn before oversells',
              'Audit trail: Who batched what, when',
            ].map((text) => (
              <div key={text} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="text-sm text-slate-800">{text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="px-4 py-12 sm:py-16 bg-gradient-to-b from-white via-blue-50/20 to-white">
        <div className="mx-auto w-full max-w-5xl text-center">
          <h2 className="mb-3 text-2xl font-display font-bold tracking-tight text-slate-900 sm:text-3xl">Integrations</h2>
          <p className="mb-6 text-sm text-slate-600">TikTok Shop • Shiprocket (IN) • Shippo/ShipStation (US/UK) • Shopify (optional)</p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-slate-700">
            <span>TikTok Shop</span>
            <span>Shiprocket</span>
            <span>Shippo</span>
            <span>ShipStation</span>
            <span>Shopify</span>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="px-4 py-12 sm:py-16">
        <div className="mx-auto w-full max-w-5xl">
          <h2 className="mb-6 text-2xl font-display font-bold tracking-tight text-slate-900 sm:text-3xl">Pricing</h2>
          <p className="mb-6 text-sm text-slate-600">Cancel anytime. No trial.</p>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="text-xs font-semibold text-slate-500">Starter</div>
              <div className="my-2 text-3xl font-bold text-slate-900">$59<span className="text-base font-medium text-slate-500">/mo</span></div>
              <div className="text-xs text-slate-600">up to 200 labels</div>
              <ul className="mt-3 list-disc pl-5 text-sm text-slate-700 space-y-1">
                <li>1 warehouse, 1 shipper</li>
                <li>artifact pack</li>
                <li>auto tracking push</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="text-xs font-semibold text-slate-500">Growth</div>
              <div className="my-2 text-3xl font-bold text-slate-900">$149<span className="text-base font-medium text-slate-500">/mo</span></div>
              <div className="text-xs text-slate-600">up to 1,000 labels</div>
              <ul className="mt-3 list-disc pl-5 text-sm text-slate-700 space-y-1">
                <li>batch rules</li>
                <li>multiple shippers</li>
                <li>SLA alerts, support</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="text-xs font-semibold text-slate-500">Scale</div>
              <div className="my-2 text-3xl font-bold text-slate-900">$299<span className="text-base font-medium text-slate-500">/mo</span></div>
              <div className="text-xs text-slate-600">up to 5,000 labels</div>
              <ul className="mt-3 list-disc pl-5 text-sm text-slate-700 space-y-1">
                <li>all features</li>
                <li>2 warehouses</li>
                <li>API access, priority support</li>
              </ul>
            </div>
          </div>
          <p className="mt-3 text-xs text-slate-600">Overage: $0.03–$0.05 per label</p>
        </div>
      </section>

      {/* Social proof */}
      <section className="px-4 py-12 sm:py-16">
        <div className="mx-auto w-full max-w-3xl text-center">
          <blockquote className="text-base text-slate-800 italic">“We cut label time from 3 hours to 20 minutes. Zero late dispatches last week.” — T. Yadav</blockquote>
        </div>
      </section>

      {/* Final CTA */}
      <section id="install" className="px-4 py-12 sm:py-16 bg-gradient-to-b from-white via-purple-50/20 to-white">
        <div className="mx-auto w-full max-w-5xl text-center">
          <h2 className="mb-3 text-2xl font-display font-bold tracking-tight text-slate-900 sm:text-3xl">Ready to ship on time?</h2>
          <p className="mx-auto mb-5 max-w-2xl text-sm text-slate-600">Never miss your dispatch deadline. Install → batch → ship.</p>
          <Button size="lg">Install now</Button>
        </div>
      </section>
    </main>
  )
}


