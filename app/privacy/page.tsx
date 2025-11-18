import { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Ario Studio',
}

export default function PrivacyPage() {
  return (
    <main className="relative min-h-screen bg-base">
      <Header />
      <div className="max-w-3xl mx-auto px-4 py-16 sm:py-24">
        <h1 className="text-h1 font-semibold text-text-primary mb-4">Privacy Policy</h1>
        <p className="text-body-sm text-text-muted mb-8">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        
        <div className="prose prose-lg max-w-none space-y-6 text-text-secondary">
          <section>
            <h2 className="text-h3 font-semibold text-text-primary mb-3">Introduction</h2>
            <p>
              Ario Studio (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. 
              This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website 
              or use our services.
            </p>
          </section>

          <section>
            <h2 className="text-h3 font-semibold text-text-primary mb-3">Information We Collect</h2>
            <p>We may collect the following types of information:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Contact Information:</strong> Name, email address, company name, and other details you provide when contacting us or submitting a project inquiry.</li>
              <li><strong>Usage Data:</strong> Information about how you interact with our website, including pages visited, time spent, and referring URLs.</li>
              <li><strong>Technical Data:</strong> IP address, browser type, device information, and other technical details collected automatically.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-h3 font-semibold text-text-primary mb-3">How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Respond to your inquiries and provide our services</li>
              <li>Improve our website and user experience</li>
              <li>Send you updates about our services (with your consent)</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-h3 font-semibold text-text-primary mb-3">Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information. 
              However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-h3 font-semibold text-text-primary mb-3">Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access your personal information</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of marketing communications</li>
            </ul>
          </section>

          <section>
            <h2 className="text-h3 font-semibold text-text-primary mb-3">Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy or wish to exercise your rights, please contact us at:{' '}
              <a href="mailto:hello@ariostudio.com" className="text-orange hover:underline">
                hello@ariostudio.com
              </a>
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-border-subtle">
          <Link
            href="/"
            className="inline-flex items-center text-body text-orange hover:underline"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  )
}

