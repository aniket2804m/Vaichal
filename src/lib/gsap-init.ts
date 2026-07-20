import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Accessibility helper
export const prefersReducedMotion = () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

// Global ease standards
export const EASES = {
  reveal: "power3.out",
  scrub: "power2.inOut",
  morph: "expo.out",
};

export { gsap, ScrollTrigger };
