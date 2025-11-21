'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { AlertCircle, Home } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error:', error)
    }
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-base px-4">
      <div className="text-center max-w-md">
        <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange/10 border border-orange/20">
          <AlertCircle className="w-8 h-8 text-orange" />
        </div>
        <h1 className="text-h2 font-semibold text-text-primary mb-3">
          Something went wrong
        </h1>
        <p className="text-body text-text-secondary mb-8">
          We encountered an unexpected error. Please try again or return to the homepage.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-orange text-pure-white font-medium rounded-lg hover:bg-orange/90 transition-colors"
          >
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-surface border border-border-subtle text-text-primary font-medium rounded-lg hover:bg-surface-alt transition-colors"
          >
            <Home size={18} />
            Go back home
          </Link>
        </div>
        {error.digest && (
          <p className="mt-6 text-body-sm text-text-muted">
            Error ID: {error.digest}
          </p>
        )}
      </div>
    </div>
  )
}

