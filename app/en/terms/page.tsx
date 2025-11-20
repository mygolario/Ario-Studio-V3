import { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ario-studio-v3.vercel.app'
  
  return {
    title: 'Terms of Service | Ario Studio',
    description: 'Terms of Service for Ario Studio',
    alternates: {
      canonical: `${baseUrl}/en/terms`,
      languages: {
        'fa-IR': `${baseUrl}/terms`,
        'en-US': `${baseUrl}/en/terms`,
      },
    },
  }
}

export default function TermsPageEN() {
  return (
    <main className="relative min-h-screen bg-base">
      <Header />
      <div className="container-custom py-32">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-h1 font-semibold text-text-primary mb-4">Terms of Service</h1>
          <p className="text-body-sm text-text-muted mb-12">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          
          <div className="prose prose-lg max-w-none space-y-8 text-text-secondary">
            <section>
              <h2 className="text-h3 font-semibold text-text-primary mb-4">Using this website</h2>
              <p>
                By using this website and submitting a project request form, you agree that:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>We can contact you using the contact details you provide</li>
                <li>You understand that website content (design, text, visuals) is owned by Ario Studio unless stated otherwise</li>
                <li>Project-specific contracts, pricing, and deliverables will be defined in separate proposals or agreements</li>
              </ul>
            </section>

            <section>
              <h2 className="text-h3 font-semibold text-text-primary mb-4">Website content</h2>
              <p>
                All content on this website, including design, text, graphics, and visuals, is the property of Ario Studio. You may not copy, reproduce, or use any content without our written permission.
              </p>
            </section>

            <section>
              <h2 className="text-h3 font-semibold text-text-primary mb-4">Project agreements</h2>
              <p>
                Each project has its own scope, timeline, pricing, and deliverables. These details will be clearly defined in a separate project proposal or agreement before work begins. The terms in that agreement take precedence over these general terms.
              </p>
            </section>

            <section>
              <h2 className="text-h3 font-semibold text-text-primary mb-4">Updates to these terms</h2>
              <p>
                We may update this website and these terms from time to time. Changes will be posted on this page. Your continued use of the website after changes are posted means you accept the updated terms.
              </p>
            </section>

            <section>
              <h2 className="text-h3 font-semibold text-text-primary mb-4">Contact</h2>
              <p>
                If you have questions about these Terms of Service, please contact us at:{' '}
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
      </div>
      <Footer />
    </main>
  )
}
