import type { Metadata } from "next";
import { Vazirmatn, Space_Grotesk } from "next/font/google";
import "../globals.css";
import { i18n, type Locale } from "@/config/i18n";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  variable: "--font-vazirmatn",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ario Studio",
  description: "Premium Creative Studio",
};

export const dynamicParams = false;

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const validLocale = locale as Locale;
  const dir = validLocale === "fa" ? "rtl" : "ltr";
  const fontClass = validLocale === "fa" ? vazirmatn.className : spaceGrotesk.className;

  return (
    <html lang={validLocale} dir={dir} className={fontClass}>
      <body className="antialiased bg-background text-foreground">
        <main className="min-h-screen flex flex-col relative overflow-hidden">
            <SiteHeader locale={validLocale} />
            {children}
            <SiteFooter locale={validLocale} />
        </main>
      </body>
    </html>
  );
}
