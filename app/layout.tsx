import type { Metadata } from 'next'
import { Outfit, Plus_Jakarta_Sans, Fraunces } from 'next/font/google'
import './globals.css'
import '@/styles/blog-mobile.css'
import Script from 'next/script'
import { a11y } from '@/lib/design-system'
import GARouteTracking from './ga-route-tracking'
import PostHogAnalytics from './posthog-analytics'

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-outfit',
})

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-plus-jakarta-sans',
})

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-fraunces',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://cintra.run'),
  title: 'Cintra – AI Employees That Join Your Team',
  description:
    'Cintra builds agentic workflows that actually ship work across engineering, content, sales, and operations.',
  keywords:
    'Cintra, agentic workflows, AI agents, automation, engineering automation, sales automation, content automation, operations automation',
  alternates: {
    canonical: 'https://cintra.run',
  },
  icons: {
    icon: '/images/favicon.ico',
    shortcut: '/images/favicon.ico',
  },
  openGraph: {
    title: 'Cintra – AI Employees That Join Your Team',
    description:
      'Agentic workflows that execute and deliver. Bring AI employees into your team.',
    url: 'https://cintra.run',
    siteName: 'Cintra',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cintra – AI Employees That Join Your Team',
    description:
      'Agentic workflows that execute and deliver. Bring AI employees into your team.',
  },
}

// Allow explicit control via env flag, fallback to production check
const analyticsFlag = process.env.NEXT_PUBLIC_ENABLE_ANALYTICS
const analyticsEnabled = analyticsFlag
  ? analyticsFlag === 'true'
  : process.env.NODE_ENV === 'production'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${plusJakartaSans.variable} ${fraunces.variable}`}
      suppressHydrationWarning
    >
      <body className={`${outfit.className} min-h-screen`}>
        {analyticsEnabled && (
          <>
            <Script
              data-domain={
                process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || 'cintra.run'
              }
              src="https://plausible.io/js/script.file-downloads.hash.outbound-links.pageview-props.revenue.tagged-events.js"
              strategy="afterInteractive"
            />
            <Script id="plausible-init" strategy="afterInteractive">
              {`window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }`}
            </Script>
            <Script
              src="https://www.googletagmanager.com/gtag/js?id=G-PRENL31DQR"
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                // GA4: disable automatic first pageview for SPA routing
                gtag('config', 'G-PRENL31DQR', { send_page_view: false });
              `}
            </Script>
          </>
        )}

        {/* Skip Navigation Link - Accessible but visually hidden until focused */}
        <a
          href="#main"
          className={`${a11y.skipToContent} focus:px-4 focus:py-2 focus:bg-indigo-600 focus:text-white focus:rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:shadow-lg`}
        >
          Skip to main content
        </a>

        {/* Analytics Components */}
        <PostHogAnalytics />
        <GARouteTracking />

        {children}
      </body>
    </html>
  )
}
