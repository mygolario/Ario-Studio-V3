import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { BackgroundGlow } from "@/components/ui/BackgroundGlow";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
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

export const metadata: Metadata = {
  metadataBase: new URL("https://ariostudio.net"),
  title: {
    default: "Ario Studio | Premium Digital Experiences",
    template: "%s | Ario Studio",
  },
  description:
    "Ario Studio is a hybrid digital agency crafting cinematic, future-ready digital experiences for forward-thinking brands.",
  keywords: [
    "Digital Agency",
    "Web Design",
    "Next.js",
    "React",
    "Cinematic Websites",
    "Ario Studio",
  ],
  authors: [{ name: "Ario Studio", url: "https://ariostudio.net" }],
  creator: "Ario Studio",
  publisher: "Ario Studio",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ariostudio.net",
    siteName: "Ario Studio",
    title: "Ario Studio | Premium Digital Experiences",
    description:
      "Ario Studio is a hybrid digital agency crafting cinematic, future-ready digital experiences for forward-thinking brands.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Ario Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ario Studio | Premium Digital Experiences",
    description:
      "Ario Studio is a hybrid digital agency crafting cinematic, future-ready digital experiences for forward-thinking brands.",
    images: ["/opengraph-image"],
    creator: "@ariostudio",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "Ario Studio",
      url: "https://ariostudio.net",
      logo: "https://ariostudio.net/logo.png",
      sameAs: [
        "https://twitter.com/ariostudio",
        "https://instagram.com/ariostudio",
        "https://linkedin.com/company/ariostudio",
      ],
    },
    {
      "@type": "WebSite",
      name: "Ario Studio",
      url: "https://ariostudio.net",
      potentialAction: {
        "@type": "SearchAction",
        target: "https://ariostudio.net/search?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={cn(
          spaceGrotesk.variable,
          inter.variable,
          "bg-background text-foreground antialiased selection:bg-accent-purple/30 selection:text-white"
        )}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <BackgroundGlow />
          <Header />
          <main className="min-h-screen pt-20">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
