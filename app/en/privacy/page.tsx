import { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ario-studio-v3.vercel.app'
  
  return {
    title: 'Privacy Policy | Ario Studio',
    description: 'Privacy Policy for Ario Studio',
    alternates: {
      canonical: `${baseUrl}/en/privacy`,
      languages: {
        'fa-IR': `${baseUrl}/privacy`,
        'en-US': `${baseUrl}/en/privacy`,
      },
    },
  }
}

export default function PrivacyPageEN() {
  return (
    <main className="relative min-h-screen bg-base">
      <Header />
      <div className="container-custom py-32">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-h1 font-semibold text-text-primary mb-4">Privacy Policy</h1>
          <p className="text-body-sm text-text-muted mb-12">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          
          <div className="prose prose-lg max-w-none space-y-8 text-text-secondary">
            <section>
              <h2 className="text-h3 font-semibold text-text-primary mb-4">What we collect</h2>
              <p className="mb-3">
                When you contact us or submit a project request through our forms, we collect:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Your name and email address</li>
                <li>Project information (type, budget, deadline, message)</li>
                <li>Any other details you choose to share</li>
              </ul>
              <p>
                If analytics are enabled, we may also collect basic usage data such as page views, device type, and browser information to understand how visitors use our website.
              </p>
            </section>

            <section>
              <h2 className="text-h3 font-semibold text-text-primary mb-4">How we use it</h2>
              <p className="mb-3">
                We use the information you provide to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Respond to your project requests and communicate about our services</li>
                <li>Improve our website and understand how visitors interact with it</li>
                <li>Send you updates about your project or our services (only with your consent)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-h3 font-semibold text-text-primary mb-4">What we don&apos;t do</h2>
              <p className="mb-3">
                We respect your privacy:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>We don&apos;t sell or trade your data to third parties</li>
                <li>We don&apos;t share your project details publicly without your explicit consent</li>
                <li>We don&apos;t use your information for marketing purposes unless you&apos;ve opted in</li>
              </ul>
            </section>

            <section>
              <h2 className="text-h3 font-semibold text-text-primary mb-4">Data retention</h2>
              <p>
                We keep form submissions and communication records as long as needed for collaboration and basic business records. If you&apos;d like us to delete your information, you can request it at any time.
              </p>
            </section>

            <section>
              <h2 className="text-h3 font-semibold text-text-primary mb-4">Your choices</h2>
              <p>
                You can contact Ario Studio by email to request removal or correction of your data. We&apos;ll respond to your request within a reasonable timeframe.
              </p>
              <p className="mt-4">
                Contact us at:{' '}
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
