import type { Viewport } from "next";
import { Vazirmatn, Inter } from "next/font/google";
import "../globals.css";
import { cn } from "@/lib/utils";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { CriticalCSSPreload } from "@/components/layout/CriticalCSSPreload";
import dynamic from 'next/dynamic';

const BackgroundGlow = dynamic(() => import("@/components/ui/BackgroundGlow").then(mod => mod.BackgroundGlow), {
  ssr: false,
  loading: () => null,
});
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';

const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin"],
  variable: "--font-vazirmatn",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const isFa = locale === 'fa';
  
  return {
    metadataBase: new URL("https://www.ariostudio.net"),
    title: {
      default: isFa ? "آریو استودیو | تجربه‌های دیجیتال خاص" : "Ario Studio | Premium Digital Experiences",
      template: isFa ? "%s | آریو استودیو" : "%s | Ario Studio",
    },
    description: isFa 
      ? "آریو استودیو یک آژانس دیجیتال هیبریدی است که تجربه‌های سینمایی و آینده‌نگرانه برای برندهای پیشرو خلق می‌کند."
      : "Ario Studio is a hybrid digital agency crafting cinematic, future-ready digital experiences for forward-thinking brands.",
    openGraph: {
      type: "website",
      locale: isFa ? "fa_IR" : "en_US",
      url: `https://www.ariostudio.net/${locale}`,
      siteName: isFa ? "آریو استودیو" : "Ario Studio",
      title: isFa ? "آریو استودیو | تجربه‌های دیجیتال خاص" : "Ario Studio | Premium Digital Experiences",
      description: isFa 
        ? "آریو استودیو یک آژانس دیجیتال هیبریدی است که تجربه‌های سینمایی و آینده‌نگرانه برای برندهای پیشرو خلق می‌کند."
        : "Ario Studio is a hybrid digital agency crafting cinematic, future-ready digital experiences for forward-thinking brands.",
      images: [
        {
          url: "/opengraph-image", // This might need to be localized path if opengraph-image.tsx generates it
          width: 1200,
          height: 630,
          alt: "Ario Studio",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: isFa ? "آریو استودیو | تجربه‌های دیجیتال خاص" : "Ario Studio | Premium Digital Experiences",
      description: isFa 
        ? "آریو استودیو یک آژانس دیجیتال هیبریدی است که تجربه‌های سینمایی و آینده‌نگرانه برای برندهای پیشرو خلق می‌کند."
        : "Ario Studio is a hybrid digital agency crafting cinematic, future-ready digital experiences for forward-thinking brands.",
      images: ["/opengraph-image"],
      creator: "@ariostudio",
    },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/icon.png", type: "image/png", sizes: "48x48" },
        { url: "/icon.png", type: "image/png", sizes: "192x192" },
        { url: "/icon.png", type: "image/png", sizes: "512x512" },
      ],
      apple: [
        { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      ],
      shortcut: "/favicon.ico",
    },
    manifest: "/manifest.json",
    alternates: {
        canonical: `https://www.ariostudio.net/${locale}`,
        languages: {
            'fa': 'https://www.ariostudio.net/fa',
            'en': 'https://www.ariostudio.net/en',
            'x-default': 'https://www.ariostudio.net/fa',
        },
    }
  };
}

export default async function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!['en', 'fa'].includes(locale)) {
    notFound();
  }

  const messages = await getMessages();
  const isRtl = locale === 'fa';
  
  // JSON-LD Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.ariostudio.net/#organization",
        name: isRtl ? "آریو استودیو" : "Ario Studio",
        url: "https://www.ariostudio.net",
        logo: {
          "@type": "ImageObject",
          url: "https://www.ariostudio.net/brand/ario-studio-logo.png",
          width: 512,
          height: 512,
        },
        description: isRtl
          ? "آریو استودیو یک آژانس دیجیتال هیبریدی است که تجربه‌های سینمایی و آینده‌نگرانه برای برندهای پیشرو خلق می‌کند."
          : "Ario Studio is a hybrid digital agency crafting cinematic, future-ready digital experiences for forward-thinking brands.",
        sameAs: [
          "https://twitter.com/ariostudio",
          "https://instagram.com/ariostudio",
          "https://linkedin.com/company/ariostudio",
        ],
        contactPoint: {
          "@type": "ContactPoint",
          email: "info@ariostudio.net",
          contactType: "Customer Service",
        },
      },
      {
        "@type": "WebSite",
        "@id": "https://www.ariostudio.net/#website",
        name: isRtl ? "آریو استودیو" : "Ario Studio",
        url: "https://www.ariostudio.net",
        publisher: {
          "@id": "https://www.ariostudio.net/#organization",
        },
        inLanguage: [locale === 'fa' ? 'fa-IR' : 'en-US'],
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: "https://www.ariostudio.net/search?q={search_term_string}",
          },
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  return (
    <html lang={locale} dir={isRtl ? 'rtl' : 'ltr'} className="scroll-smooth" suppressHydrationWarning>
      <body
        className={cn(
          isRtl ? vazirmatn.className : inter.className,
          "bg-background text-foreground antialiased selection:bg-accent-purple/30 selection:text-white"
        )}
      >
        {/* Preconnect to essential origins for faster resource loading (max 4) - Critical path optimization */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // Preconnect to Google Fonts (essential for LCP)
                const preconnects = [
                  { rel: 'preconnect', href: 'https://fonts.googleapis.com', crossorigin: 'anonymous' },
                  { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' },
                  { rel: 'dns-prefetch', href: 'https://fonts.googleapis.com' },
                  { rel: 'dns-prefetch', href: 'https://fonts.gstatic.com' }
                ];
                
                preconnects.forEach(function(link) {
                  if (!document.querySelector('link[rel="' + link.rel + '"][href="' + link.href + '"]')) {
                    const el = document.createElement('link');
                    el.rel = link.rel;
                    el.href = link.href;
                    if (link.crossorigin) el.crossOrigin = link.crossorigin;
                    document.head.appendChild(el);
                  }
                });
              })();
            `,
          }}
        />
        {/* Enable animations after first paint to prevent forced reflow */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // Wait for first paint before enabling animations
                if (document.readyState === 'loading') {
                  document.addEventListener('DOMContentLoaded', function() {
                    requestAnimationFrame(function() {
                      requestAnimationFrame(function() {
                        document.documentElement.classList.add('animations-ready');
                      });
                    });
                  });
                } else {
                  requestAnimationFrame(function() {
                    requestAnimationFrame(function() {
                      document.documentElement.classList.add('animations-ready');
                    });
                  });
                }
              })();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <CriticalCSSPreload />
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <BackgroundGlow />
            <Header />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
