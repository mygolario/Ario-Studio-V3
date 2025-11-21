"use client";

import { useLenisScroll } from "@/hooks/useLenisScroll";

export default function LenisProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useLenisScroll();
  return <>{children}</>;
}

