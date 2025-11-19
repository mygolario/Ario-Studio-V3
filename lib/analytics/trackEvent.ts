/**
 * Analytics Event Tracking
 * 
 * A simple abstraction layer for tracking user events.
 * Currently logs to console in development mode.
 * 
 * TODO: In the future, connect to:
 * - Google Analytics 4 (GA4)
 * - Plausible Analytics
 * - Vercel Analytics
 * - Or any other analytics provider
 * 
 * Usage:
 *   import { trackEvent } from '@/lib/analytics/trackEvent'
 *   trackEvent('cta_click', { location: 'hero', lang: 'en' })
 */

export type AnalyticsEventName =
  | "cta_click"
  | "service_card_click"
  | "contact_submit_success"
  | "contact_submit_error"
  | "language_switch"
  | "portfolio_card_click"

export interface AnalyticsEventPayload {
  [key: string]: string | number | boolean | null | undefined
}

/**
 * Track an analytics event
 * 
 * @param name - Event name
 * @param payload - Optional event payload (key-value pairs)
 * 
 * @example
 *   trackEvent('cta_click', { location: 'hero', lang: 'en' })
 *   trackEvent('service_card_click', { serviceSlug: 'cinematic-landing-pages', lang: 'fa' })
 */
export function trackEvent(name: AnalyticsEventName, payload?: AnalyticsEventPayload): void {
  // In development, log to console for debugging
  if (process.env.NODE_ENV === "development") {
    console.log("[analytics event]", name, payload ?? {})
  }

  // TODO: In production, send to analytics provider
  // Example implementations:
  // 
  // Google Analytics 4:
  //   if (typeof window !== 'undefined' && window.gtag) {
  //     window.gtag('event', name, payload)
  //   }
  //
  // Plausible:
  //   if (typeof window !== 'undefined' && window.plausible) {
  //     window.plausible(name, { props: payload })
  //   }
  //
  // Vercel Analytics:
  //   import { track } from '@vercel/analytics'
  //   track(name, payload)

  // For now, no-op in production (ready for future integration)
}

