/**
 * Animation configuration for Ario Studio
 * Centralized animation settings for consistency
 */

export const animations = {
  // Durations
  duration: {
    fast: 0.3,
    normal: 0.6,
    slow: 1,
    slower: 1.5,
  },
  
  // Easings (GSAP)
  easing: {
    smooth: "power3.out",
    bounce: "power2.out",
    sharp: "power4.out",
  },
  
  // Stagger delays
  stagger: {
    fast: 0.05,
    normal: 0.1,
    slow: 0.2,
  },
  
  // ScrollTrigger defaults
  scrollTrigger: {
    start: "top 80%",
    end: "top 20%",
  },
} as const;

