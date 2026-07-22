import { useEffect, useRef } from "react";
import { ArrowDown } from "lucide-react";
import { gsap } from "../lib/gsap-init";
import { motion } from "framer-motion";
import FloatingNavBar from "../sections/FloatingNavBar";

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=3840&q=95", // Ext mansion
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=3840&q=95", // Interior pool
  "https://images.unsplash.com/photo-160066753376-12c8ab7fb75b?auto=format&fit=crop&w=3840&q=95", // Luxury Lounge
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=3840&q=95",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=3840&q=95",  // Pool deck living (matches HeroMorph.tsx)
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
      // Set initial 3D positions for the images (scale: 1.25 to allow breathing scale inside wrappers)
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
      {/* Floating Navigation Bar (z-40) */}
      <div className="relative z-40">
        <FloatingNavBar />
      </div>

      {/* CSS Animation for breathing Ken Burns-style image motion wrappers & luxury shadows */}
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
          text-shadow: 
            0 2px 4px rgba(0, 0, 0, 0.6),
            0 8px 16px rgba(0, 0, 0, 0.4),
            0 16px 32px rgba(0, 0, 0, 0.3),
            0 0 60px rgba(0, 0, 0, 0.2);
        }
      `}</style>

      {/* Pinned Image Wrapper (z-10) */}
      <div
        ref={imageWrapperRef}
        className="absolute w-full h-full overflow-hidden flex items-center justify-center z-10"
        style={{ transformStyle: "preserve-3d", perspective: "1500px" }}
      >
        {/* Animated Wrapper 1 (brightness set to 92% to keep sides vibrant and highlight 4K detail) */}
        <div 
          className="absolute inset-0 w-full h-full animated-img-wrap-1 overflow-hidden"
          style={{ filter: "brightness(0.92)" }}
        >
          <img
            ref={img1Ref}
            src={HERO_IMAGES[0]}
            alt="Estate Façade"
            className="absolute inset-0 w-full h-full object-cover will-change-transform"
          />
        </div>

        {/* Animated Wrapper 2 */}
        <div 
          className="absolute inset-0 w-full h-full animated-img-wrap-2 overflow-hidden"
          style={{ filter: "brightness(0.92)" }}
        >
          <img
            ref={img2Ref}
            src={HERO_IMAGES[1]}
            alt="Estate Valleys"
            className="absolute inset-0 w-full h-full object-cover will-change-transform"
          />
        </div>

        {/* Animated Wrapper 3 */}
        <div 
          className="absolute inset-0 w-full h-full animated-img-wrap-3 overflow-hidden"
          style={{ filter: "brightness(0.92)" }}
        >
          <img
            ref={img3Ref}
            src={HERO_IMAGES[2]}
            alt="Estate Lounge"
            className="absolute inset-0 w-full h-full object-cover will-change-transform"
          />
        </div>

        {/* Animated Wrapper 4 */}
        <div 
          className="absolute inset-0 w-full h-full animated-img-wrap-4 overflow-hidden"
          style={{ filter: "brightness(0.92)" }}
        >
          <img
            ref={img4Ref}
            src={HERO_IMAGES[3]}
            alt="Estate Pool Side"
            className="absolute inset-0 w-full h-full object-cover will-change-transform"
          />
        </div>

        {/* Multi-layered dark gradient overlays (z-20) */}
        {/* Subtle top and bottom linear gradient overlay to protect navigation and scroll indicators without darkening the sides */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/35 z-20 pointer-events-none" />
      </div>

      {/* Main heading (z-30 - Fades out during stage 1 scroll) */}
     <div
  ref={headingRef}
  className="absolute inset-0 flex items-center justify-center text-center z-30 px-6"
>
  <div className="relative max-w-6xl px-8 py-10 md:px-16 md:py-14">

    {/* Premium Background Glow */}
    <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.72)_0%,transparent_75%)] blur-3xl scale-125"></div>

    {/* Gold Glow */}
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-[#C9A84C]/10 blur-[180px] rounded-full -z-10"></div>

    {/* Top Label */}
    <motion.span
      initial={{ opacity: 0, y: -20, letterSpacing: "0.1em" }}
      animate={{ opacity: 1, y: 0, letterSpacing: "0.35em" }}
      transition={{ duration: 1 }}
      className="inline-block uppercase font-cinzel text-xs md:text-sm tracking-[0.35em] text-[#C9A84C] mb-6"
    >
      ✦ Introducing The Pinnacle of Living ✦
    </motion.span>

    {/* Main Heading */}
    <motion.h1
      initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
      className="font-cinzel font-bold leading-[0.95]"
    >
      <span className="block text-5xl md:text-7xl lg:text-8xl xl:text-[6.5rem] text-[#F5F0E8] drop-shadow-[0_0_20px_rgba(255,255,255,0.15)]">
        Crafting Legends
      </span>

      <span className="relative inline-block mt-5 text-3xl md:text-5xl lg:text-6xl xl:text-7xl bg-gradient-to-r from-[#FFF4CC] via-[#C9A84C] to-[#A97C20] bg-clip-text text-transparent italic font-cormorant font-medium">

        In Pune's Skyline

        <motion.span
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ delay: 0.8, duration: 1.2 }}
          className="absolute -bottom-4 left-0 h-[2px] bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent"
        />
      </span>
    </motion.h1>

    {/* Description */}
    <motion.p
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 1 }}
      className="mt-10 max-w-2xl mx-auto text-[#F5F0E8]/85 text-base md:text-lg lg:text-xl font-montserrat leading-9 tracking-wide"
    >
      <span className="text-[#C9A84C] font-medium">
        An elite collection
      </span>{" "}
      of private sanctuaries, custom-built for those who appreciate the{" "}
      <span className="text-white font-medium">
        poetry of detail.
      </span>
    </motion.p>

    {/* Premium Divider */}
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: "120px" }}
      transition={{ delay: 1, duration: 1 }}
      className="mx-auto mt-10 h-[2px] bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent"
    />

  </div>
</div>

      {/* Scrolling mouse/chevron helper (z-30 - Fades out during stage 1 scroll) */}
      <div
        ref={scrollHelperRef}
        className="absolute bottom-10 right-10 z-30 flex items-center gap-3 pointer-events-none"
      >
        <div className="animate-bounce rounded-full p-3 bg-[#121212]">
          <ArrowDown className="w-4 h-4 text-brand-gold" />
        </div>
      </div>
    </section>
  );
}
