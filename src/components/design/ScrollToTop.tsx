import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });

    // Wait for the next paint frame to ensure the new page DOM is fully mounted,
    // then force ScrollTrigger to refresh all animations and coordinates.
    requestAnimationFrame(() => {
      ScrollTrigger.refresh(true);
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;