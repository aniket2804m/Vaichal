import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "../lib/gsap-init";

export const useLenis = () => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Check if user prefers reduced motion
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // standard easing
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    // Hook Lenis scroll event into GSAP ScrollTrigger updates
    lenis.on("scroll", ScrollTrigger.update);

    // Sync GSAP ticker to Lenis requestAnimationFrame
    const updatePhysics = (time: number) => {
      // Lenis raf takes time in milliseconds
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updatePhysics);
    gsap.ticker.lagSmoothing(0);

    // Set scroll position restoration
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    return () => {
      // Cleanup
      lenis.destroy();
      gsap.ticker.remove(updatePhysics);
      lenisRef.current = null;
    };
  }, []);

  return lenisRef;
};
