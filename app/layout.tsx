import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ario Studio",
  description: "AI-powered cinematic web experiences.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
