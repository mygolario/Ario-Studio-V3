import type { Metadata } from "next";
import { spaceGrotesk, vazirmatn } from "../fonts";
import "../globals.css";
import { i18n } from "@/i18n-config";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Ariostudio",
  description: "Digital design & brand strategy studio",
};

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: string };
}>) {
  const lang = params.lang as 'en' | 'fa';
  const dir = lang === "fa" ? "rtl" : "ltr";

  return (
    <html lang={lang} dir={dir}>
      <body
        className={`${spaceGrotesk.variable} ${vazirmatn.variable} antialiased bg-background text-foreground`}
      >
        <Header lang={lang} />
        <main className="min-h-screen pt-20">
          {children}
        </main>
        <Footer lang={lang} />
      </body>
    </html>
  );
}
