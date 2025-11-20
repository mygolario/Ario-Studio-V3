'use client'

/**
 * Google Analytics 4 integration
 * 
 * This module provides utilities for initializing and tracking events
 * with Google Analytics 4. It safely handles cases where GA is not configured.
 */

declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string | Date,
      config?: Record<string, any>
    ) => void
    dataLayer?: any[]
  }
}

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

/**
 * Initialize Google Analytics
 * Should be called once on the client side
 */
export function initGA() {
  if (!GA_MEASUREMENT_ID || typeof window === 'undefined') {
    return
  }

  // Initialize dataLayer
  if (!window.dataLayer) {
    window.dataLayer = []
  }
  window.gtag = function() {
    if (window.dataLayer) {
      window.dataLayer.push(arguments)
    }
  }
  window.gtag('js', new Date())
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: window.location.pathname,
  })
}

/**
 * Track a pageview
 * 
 * @param url - The URL of the page (optional, defaults to current pathname)
 */
export function trackPageView(url?: string) {
  if (!GA_MEASUREMENT_ID || typeof window === 'undefined' || !window.gtag) {
    return
  }

  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: url || window.location.pathname,
  })
}

/**
 * Track a custom event
 * 
 * @param eventName - Name of the event
 * @param eventParams - Additional parameters for the event
 */
export function trackEvent(
  eventName: string,
  eventParams?: Record<string, any>
) {
  if (!GA_MEASUREMENT_ID || typeof window === 'undefined' || !window.gtag) {
    return
  }

  window.gtag('event', eventName, eventParams)
}

