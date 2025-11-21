import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "آریو استودیو | استودیوی دیجیتال و هوش مصنوعی",
  description: "طراحی و ساخت تجربه‌های دیجیتال هوشمند برای برندهایی که جدی هستند",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className="bg-dark text-slate-100 antialiased">
        <div className="noise-layer" />
        {children}
      </body>
    </html>
  );
}
