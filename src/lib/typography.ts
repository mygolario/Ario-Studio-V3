/**
 * Typography system for Ario Studio
 * Consistent typography scale and utilities
 */

export const typography = {
  // Heading sizes
  h1: "text-5xl sm:text-6xl lg:text-7xl font-bold",
  h2: "text-4xl sm:text-5xl font-bold",
  h3: "text-2xl sm:text-3xl font-bold",
  h4: "text-xl sm:text-2xl font-bold",
  
  // Body sizes
  body: "text-base",
  bodyLarge: "text-lg",
  bodySmall: "text-sm",
  
  // Line heights
  leadingTight: "leading-tight",
  leadingNormal: "leading-normal",
  leadingRelaxed: "leading-relaxed",
  
  // Text alignment (RTL-aware)
  textStart: "text-start", // Logical start (right in RTL)
  textEnd: "text-end", // Logical end (left in RTL)
  textCenter: "text-center",
  
  // Spacing between title and paragraph
  titleSpacing: "mb-4",
  sectionSpacing: "mb-16",
} as const;

