import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FAQAccordion from '@/components/FAQAccordion'
import { generateSEOMetadata } from '@/lib/seo'

export const revalidate = 3600

/**
 * FAQ page (EN)
 * 
 * Navigation & i18n:
 * - FA route: /faq
 * - EN route: /en/faq
 */
export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ario-studio-v3.vercel.app'
  return generateSEOMetadata('en', {
    title: 'FAQ',
    description: 'Frequently asked questions about Ario Studio, our services, process, and technologies.',
    url: `${baseUrl}/en/faq`,
  })
}

export default async function FAQPageEN() {
  const faqItems = [
    {
      question: 'Do you use AI to build the websites?',
      answer: 'Yes, but AI is our assistant, not our replacement. Ario Studio uses AI to speed up development, explore design options, and automate repetitive tasks. However, strategy, design decisions, and final quality control are all done by humans. We don\'t use "one-click AI website generators" — we build custom solutions that combine human expertise with AI efficiency.',
    },
    {
      question: 'How long does a typical project take?',
      answer: 'Project timelines vary based on scope and complexity. A simple landing page might take a few weeks, while a full website redesign could take several months. After our initial call, we\'ll provide a clear timeline based on your specific project needs. We don\'t commit to fixed timelines upfront because every project is unique.',
    },
    {
      question: 'Do you work with international clients?',
      answer: 'Yes, Ario Studio works with both Iranian and international clients. As long as remote collaboration is possible and we can communicate effectively (in English or Farsi), we\'re happy to work with businesses from anywhere in the world.',
    },
    {
      question: 'Do you offer support after launch?',
      answer: 'Yes. We provide a short support period after launch to handle any immediate issues or questions. Beyond that, we can discuss ongoing support, maintenance, or future improvements based on your needs. Each project\'s support terms are defined in the project agreement.',
    },
    {
      question: 'What technologies do you use?',
      answer: 'We use a modern, performance-focused stack: Next.js for the framework, Vercel for hosting, TypeScript for type safety, and Tailwind CSS for styling. For animations, we use Framer Motion and GSAP. We also integrate AI tools for workflows, automations, and development acceleration. The exact tech stack depends on your project\'s needs.',
    },
    {
      question: 'Will we own the website and its content?',
      answer: 'Yes. After final payment, you own the website and its content. You can continue working with other teams, make changes yourself (if you have the technical capability), or come back to us for future updates. We may ask permission to showcase your project in our portfolio, but you always have the final say.',
    },
  ]

  return (
    <main className="relative min-h-screen bg-base">
      <Header />
      <div className="container-custom py-32">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-h1 font-semibold text-text-primary mb-4">
              FAQ
            </h1>
            <p className="text-body-lg text-text-secondary max-w-2xl mx-auto">
              Frequently asked questions about Ario Studio
            </p>
          </div>

          <FAQAccordion items={faqItems} lang="en" />
        </div>
      </div>
      <Footer />
    </main>
  )
}
