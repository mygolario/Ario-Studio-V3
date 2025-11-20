'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Script from 'next/script'
import { initGA, trackPageView } from '@/lib/analytics'

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

/**
 * Google Analytics component
 * 
 * Initializes GA4 and tracks pageviews on route changes.
 * Safely handles cases where GA is not configured.
 */
export default function GoogleAnalytics() {
  const pathname = usePathname()

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) {
      return
    }

    // Initialize GA on mount
    initGA()

    // Track initial pageview
    trackPageView()
  }, [])

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) {
      return
    }

    // Track pageview on route change
    trackPageView(pathname)
  }, [pathname])

  if (!GA_MEASUREMENT_ID) {
    return null
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
    </>
  )
}

