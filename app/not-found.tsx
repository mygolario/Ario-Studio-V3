import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-pure-white">
      <div className="text-center px-4">
        <h1 className="text-h1 font-display font-bold text-text-primary mb-4">
          404
        </h1>
        <p className="text-body-lg text-text-secondary mb-8">
          Page not found. The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-ai-amber to-ai-gold text-pure-white font-medium rounded-medium hover:shadow-warm transition-all duration-300"
        >
          <ArrowLeft size={20} />
          Back to Home
        </Link>
      </div>
    </div>
  )
}

