import { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Terms of Service | Ario Studio',
  description: 'Terms of Service for Ario Studio',
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://ario-studio-v3.vercel.app'}/en/terms`,
    languages: {
      'fa-IR': `${process.env.NEXT_PUBLIC_SITE_URL || 'https://ario-studio-v3.vercel.app'}/terms`,
      'en-US': `${process.env.NEXT_PUBLIC_SITE_URL || 'https://ario-studio-v3.vercel.app'}/en/terms`,
    },
  },
}

export default function TermsPageEN() {
  return (
    <main className="relative min-h-screen bg-base">
      <Header />
      <div className="max-w-3xl mx-auto px-4 py-16 sm:py-24">
        <h1 className="text-h1 font-semibold text-text-primary mb-4">Terms of Service</h1>
        <p className="text-body-sm text-text-muted mb-8">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        
        <div className="prose prose-lg max-w-none space-y-6 text-text-secondary">
          <section>
            <h2 className="text-h3 font-semibold text-text-primary mb-3">Agreement to Terms</h2>
            <p>
              By accessing or using Ario Studio&apos;s website and services, you agree to be bound by these Terms of Service. 
              If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-h3 font-semibold text-text-primary mb-3">Services</h2>
            <p>
              Ario Studio provides web design, development, and AI automation services. We reserve the right to modify, 
              suspend, or discontinue any aspect of our services at any time without prior notice.
            </p>
          </section>

          <section>
            <h2 className="text-h3 font-semibold text-text-primary mb-3">Intellectual Property</h2>
            <p>
              All content on this website, including text, graphics, logos, and software, is the property of Ario Studio 
              or its licensors and is protected by copyright and other intellectual property laws.
            </p>
            <p>
              Upon completion and payment for a project, clients receive usage rights as specified in individual project agreements. 
              Ario Studio retains the right to showcase completed work in our portfolio unless otherwise agreed.
            </p>
          </section>

          <section>
            <h2 className="text-h3 font-semibold text-text-primary mb-3">Project Terms</h2>
            <p>For custom projects:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Project scope, timeline, and deliverables will be defined in a separate project agreement</li>
              <li>Payment terms will be specified in the project agreement</li>
              <li>Revisions and change requests may incur additional fees</li>
              <li>Client is responsible for providing accurate information and timely feedback</li>
            </ul>
          </section>

          <section>
            <h2 className="text-h3 font-semibold text-text-primary mb-3">Limitation of Liability</h2>
            <p>
              Ario Studio shall not be liable for any indirect, incidental, special, or consequential damages arising from 
              the use of our services. Our total liability shall not exceed the amount paid by you for the specific service.
            </p>
          </section>

          <section>
            <h2 className="text-h3 font-semibold text-text-primary mb-3">Modifications</h2>
            <p>
              We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon 
              posting to this page. Your continued use of our services constitutes acceptance of the modified terms.
            </p>
          </section>

          <section>
            <h2 className="text-h3 font-semibold text-text-primary mb-3">Contact</h2>
            <p>
              For questions about these Terms of Service, please contact us at:{' '}
              <a href="mailto:info@ariostudio.net" className="text-orange hover:underline">
                info@ariostudio.net
              </a>
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-border-subtle">
          <Link
            href="/en"
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

