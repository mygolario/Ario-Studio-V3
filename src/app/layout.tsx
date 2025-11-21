import type { Metadata } from "next";
import "./globals.css";
import LenisProvider from "./LenisProvider";
import NoiseLayer from "./NoiseLayer";

export const metadata: Metadata = {
  title: "آریو استودیو | استودیوی دیجیتال و هوش مصنوعی",
  description: "طراحی و ساخت تجربه‌های دیجیتال هوشمند برای برندهایی که جدی هستند.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className="bg-dark text-slate-100 antialiased">
        <LenisProvider>
          <NoiseLayer />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
