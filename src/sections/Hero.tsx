import { useEffect, useRef } from "react";
import { ArrowDown } from "lucide-react";
import { gsap } from "../lib/gsap-init";
import FloatingNavBar from "../sections/FloatingNavBar";

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=80", // Ext mansion
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80", // Interior pool
  "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=2000&q=80", // Luxury Lounge
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=80",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80",  // Pool deck living (matches HeroMorph.tsx)
];

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const img1Ref = useRef<HTMLImageElement>(null);
  const img2Ref = useRef<HTMLImageElement>(null);
  const img3Ref = useRef<HTMLImageElement>(null);
  const img4Ref = useRef<HTMLImageElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const indicatorsRef = useRef<HTMLDivElement>(null);
  const scrollHelperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    // Direct DOM indicator update helper
    const updateIndicators = (index: number) => {
      if (!indicatorsRef.current) return;
      const dots = indicatorsRef.current.children;
      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i] as HTMLElement;
        if (i === index) {
          dot.style.backgroundColor = "#8F2621";
          dot.style.width = "28px";
        } else {
          dot.style.backgroundColor = "rgba(245, 244, 240, 0.25)";
          dot.style.width = "8px";
        }
      }
    };

    const ctx = gsap.context(() => {
      // Set initial 3D positions for the images (scale: 1.2 to allow breathing scale inside wrappers)
      gsap.set([img2Ref.current, img3Ref.current, img4Ref.current], {
        opacity: 0,
        scale: 1.25,
        rotateY: 10,
        rotateX: -5,
        z: -200,
        filter: "blur(8px)",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "+=350%",
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            const activeIndex = progress < 0.28 ? 0
              : progress < 0.56 ? 1
              : progress < 0.82 ? 2
              : 3;
            updateIndicators(activeIndex);
          },
        },
      });

      // 1. Stage 1 -> 2: Fade & Blur img1, Reveal img2
      tl.to(
        img1Ref.current,
        {
          opacity: 0,
          scale: 0.85,
          rotateY: -10,
          rotateX: 5,
          z: -200,
          filter: "blur(8px)",
          ease: "power2.inOut",
          duration: 1,
        },
        0
      )
      .to(
        img2Ref.current,
        {
          opacity: 1,
          scale: 1,
          rotateY: 0,
          rotateX: 0,
          z: 0,
          filter: "blur(0px)",
          ease: "power2.inOut",
          duration: 1,
        },
        0
      )
      // Fade out main heading during first scroll stage
      .to(
        headingRef.current,
        {
          opacity: 0,
          y: -50,
          ease: "power2.inOut",
          duration: 0.6,
        },
        0
      )
      // Fade out scroll helper indicator early
      .to(
        scrollHelperRef.current,
        {
          opacity: 0,
          y: 20,
          ease: "power2.inOut",
          duration: 0.4,
        },
        0
      )

      // 2. Stage 2 -> 3: Fade & Blur img2, Reveal img3
      .to(
        img2Ref.current,
        {
          opacity: 0,
          scale: 0.85,
          rotateY: 10,
          rotateX: -5,
          z: -200,
          filter: "blur(8px)",
          ease: "power2.inOut",
          duration: 1,
        },
        1
      )
      .to(
        img3Ref.current,
        {
          opacity: 1,
          scale: 1,
          rotateY: 0,
          rotateX: 0,
          z: 0,
          filter: "blur(0px)",
          ease: "power2.inOut",
          duration: 1,
        },
        1
      )

      // 3. Stage 3 -> 4: Fade & Blur img3, Reveal img4
      .to(
        img3Ref.current,
        {
          opacity: 0,
          scale: 0.85,
          rotateY: -10,
          rotateX: 5,
          z: -200,
          filter: "blur(8px)",
          ease: "power2.inOut",
          duration: 1,
        },
        2
      )
      .to(
        img4Ref.current,
        {
          opacity: 1,
          scale: 1,
          rotateY: 0,
          rotateX: 0,
          z: 0,
          filter: "blur(0px)",
          ease: "power2.inOut",
          duration: 1,
        },
        2
      )

      // 4. Stage 4 -> Handoff: Begin imageWrapper shrink to match HeroMorph initial layout
      .to(
        imageWrapperRef.current,
        {
          width: "90vw",
          height: "90vh",
          borderRadius: "20px",
          ease: "power2.inOut",
          duration: 0.8,
        },
        3
      );
    }, heroRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative w-full h-screen overflow-hidden bg-brand-black select-none"
    >
      {/* Floating Navigation Bar */}
      <FloatingNavBar />
      {/* CSS Animation for breathing Ken Burns-style image motion wrappers */}
      <style>{`
        @keyframes slowBreathing {
          0% { transform: scale(1.01) translate(0px, 0px); }
          50% { transform: scale(1.06) translate(6px, -4px); }
          100% { transform: scale(1.01) translate(0px, 0px); }
        }
        .animated-img-wrap-1 { animation: slowBreathing 26s infinite ease-in-out; }
        .animated-img-wrap-2 { animation: slowBreathing 30s infinite ease-in-out; animation-delay: -6s; }
        .animated-img-wrap-3 { animation: slowBreathing 28s infinite ease-in-out; animation-delay: -12s; }
        .animated-img-wrap-4 { animation: slowBreathing 32s infinite ease-in-out; animation-delay: -18s; }
        
        .premium-text-shadow {
          text-shadow: 0 4px 20px rgba(0, 0, 0, 0.65), 0 2px 4px rgba(0, 0, 0, 0.4);
        }
      `}</style>

      {/* Pinned Image Wrapper */}
      <div
        ref={imageWrapperRef}
        className="absolute w-full h-full overflow-hidden flex items-center justify-center z-10"
        style={{ transformStyle: "preserve-3d", perspective: "1500px" }}
      >
        {/* Animated Wrapper 1 */}
        <div className="absolute inset-0 w-full h-full animated-img-wrap-1 overflow-hidden">
          <img
            ref={img1Ref}
            src={HERO_IMAGES[0]}
            alt="Estate Façade"
            className="absolute inset-0 w-full h-full object-cover will-change-transform"
          />
        </div>

        {/* Animated Wrapper 2 */}
        <div className="absolute inset-0 w-full h-full animated-img-wrap-2 overflow-hidden">
          <img
            ref={img2Ref}
            src={HERO_IMAGES[1]}
            alt="Estate Valleys"
            className="absolute inset-0 w-full h-full object-cover will-change-transform"
          />
        </div>

        {/* Animated Wrapper 3 */}
        <div className="absolute inset-0 w-full h-full animated-img-wrap-3 overflow-hidden">
          <img
            ref={img3Ref}
            src={HERO_IMAGES[2]}
            alt="Estate Lounge"
            className="absolute inset-0 w-full h-full object-cover will-change-transform"
          />
        </div>

        {/* Animated Wrapper 4 */}
        <div className="absolute inset-0 w-full h-full animated-img-wrap-4 overflow-hidden">
          <img
            ref={img4Ref}
            src={HERO_IMAGES[3]}
            alt="Estate Pool Side"
            className="absolute inset-0 w-full h-full object-cover will-change-transform"
          />
        </div>

        {/* High-contrast vertical gradient overlay to make top navigation and center text pop */}
        <div className="absolute inset-0 from-black/60 via-black/25 to-black/60 z-20 pointer-events-none" />
      </div>

      {/* Main heading (Fades out during stage 1 scroll) */}
      <div
        ref={headingRef}
        className="absolute inset-0 flex flex-col items-center justify-center text-center z-20 pointer-events-none px-6"
      >
        <span className="text-brand-gold font-sans font-semibold tracking-[0.25em] text-xs md:text-sm uppercase mb-4 block premium-text-shadow">
          Introducing The Pinnacle of Living
        </span>
        <h1 className="max-w-5xl text-5xl md:text-7xl lg:text-8xl font-serif text-brand-white font-semibold leading-tight tracking-tight premium-text-shadow">
          Crafting Legends
          <span className="block text-3xl md:text-5xl lg:text-6xl font-serif italic text-brand-gold font-light mt-2">
            In Pune's Skyline
          </span>
        </h1>
        <p className="mt-6 max-w-lg text-sm md:text-base text-brand-white/70 font-sans font-light leading-relaxed premium-text-shadow">
          An elite collection of private sanctuaries, custom-built for those who appreciate the poetry of detail.
        </p>
      </div>

      {/* Stage Progress Dots at Bottom Left */}
      {/* <div
        ref={indicatorsRef}
        className="absolute bottom-10 left-10 z-30 flex items-center gap-2 bg-brand-black/45 backdrop-blur-md px-4 py-2 border border-brand-gold/10 rounded-xl"
      >
        <div className="h-1 w-7 rounded-full bg-brand-gold transition-all duration-300" />
        <div className="h-1 w-2 rounded-full bg-brand-white/25 transition-all duration-300" />
        <div className="h-1 w-2 rounded-full bg-brand-white/25 transition-all duration-300" />
        <div className="h-1 w-2 rounded-full bg-brand-white/25 transition-all duration-300" />
      </div> */}

      {/* Scrolling mouse/chevron helper (Fades out during stage 1 scroll) */}
      <div
        ref={scrollHelperRef}
        className="absolute bottom-10 right-10 z-20 flex items-center gap-3 pointer-events-none"
      >
        
        <div className="animate-bounce rounded-full p-3 bg-[#121212]">
          <ArrowDown className="w-4 h-4 text-brand-gold" />
        </div>
      </div>
    </section>
  );
}
