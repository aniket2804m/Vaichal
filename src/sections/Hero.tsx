import { useEffect, useRef } from "react";
import { ArrowDown } from "lucide-react";
import { gsap } from "../lib/gsap-init";
import { motion } from "framer-motion";
import FloatingNavBar from "../sections/FloatingNavBar";

import cad from "../../src/assets/images/Hero/cad.png";
import home1 from "../../src/assets/images/Hero/home1.png";
import home2 from "../../src/assets/images/Hero/home2.png";
import home3 from "../../src/assets/images/Hero/home3.png";
import home4 from "../../src/assets/images/Hero/home4.png";

const HERO_IMAGES = [
  cad,
  home1,
  home2,
  home3,
  home4,
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=3840&q=95", // Royal Suite
];

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const wrap1Ref = useRef<HTMLDivElement>(null);
  const wrap2Ref = useRef<HTMLDivElement>(null);
  const wrap3Ref = useRef<HTMLDivElement>(null);
  const wrap4Ref = useRef<HTMLDivElement>(null);
  const wrap5Ref = useRef<HTMLDivElement>(null);
  const wrap6Ref = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const indicatorsRef = useRef<HTMLDivElement>(null);
  const scrollHelperRef = useRef<HTMLDivElement>(null);
  const vignetteRef = useRef<HTMLDivElement>(null);

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
      const isMobile = window.innerWidth < 768;

      // Set initial responsive positions programmatically
      gsap.set(wrap1Ref.current, {
        width: "100%",
        height: "100%",
        top: "0%",
        left: "0%",
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
      });

      gsap.set(wrap2Ref.current, {
        width: isMobile ? "50%" : "33.33%",
        height: isMobile ? "33.33%" : "50%",
        top: isMobile ? "0%" : "50%",
        left: isMobile ? "100%" : "-100%", // off-screen left/right
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
      });

      gsap.set(wrap3Ref.current, {
        width: isMobile ? "50%" : "33.33%",
        height: isMobile ? "33.33%" : "50%",
        top: isMobile ? "33.33%" : "-100%", // off-screen top/left
        left: isMobile ? "-100%" : "33.33%",
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
      });

      gsap.set(wrap4Ref.current, {
        width: isMobile ? "50%" : "33.33%",
        height: isMobile ? "33.33%" : "50%",
        top: isMobile ? "33.33%" : "100%", // off-screen bottom/right
        left: isMobile ? "100%" : "33.33%",
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
      });

      gsap.set(wrap5Ref.current, {
        width: isMobile ? "50%" : "33.33%",
        height: isMobile ? "33.33%" : "50%",
        top: isMobile ? "66.66%" : "0%",
        left: isMobile ? "-100%" : "100%", // off-screen right/left
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
      });

      gsap.set(wrap6Ref.current, {
        width: isMobile ? "50%" : "33.33%",
        height: isMobile ? "33.33%" : "50%",
        top: isMobile ? "66.66%" : "50%",
        left: isMobile ? "100%" : "100%", // off-screen right
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "+=300%",
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            const activeIndex = progress < 0.16 ? 0
              : progress < 0.33 ? 1
              : progress < 0.50 ? 2
              : progress < 0.66 ? 3
              : progress < 0.83 ? 4
              : 5;
            updateIndicators(activeIndex);
          },
        },
      });

      // 1. Fade out heading & scroll indicator
      tl.to(
        headingRef.current,
        {
          opacity: 0,
          y: -50,
          ease: "power2.inOut",
          duration: 1,
        },
        0
      )
      .to(
        scrollHelperRef.current,
        {
          opacity: 0,
          y: 20,
          ease: "power2.inOut",
          duration: 0.6,
        },
        0
      )
      
      // 2. Grid Resolve Animation
      // Wrap 1 goes from full screen to left column top (33.33% w, 50% h)
      .to(
        wrap1Ref.current,
        {
          width: isMobile ? "50%" : "33.33%",
          height: isMobile ? "33.33%" : "50%",
          ease: "power2.inOut",
          duration: 2.5,
        },
        0.3
      )
      // Wrap 2 slides in to left column bottom (0%, 50%)
      .to(
        wrap2Ref.current,
        {
          left: isMobile ? "50%" : "0%",
          top: isMobile ? "0%" : "50%",
          ease: "power2.inOut",
          duration: 2.5,
        },
        0.3
      )
      // Wrap 3 slides in to middle column top (33.33%, 0%)
      .to(
        wrap3Ref.current,
        {
          left: isMobile ? "0%" : "33.33%",
          top: isMobile ? "33.33%" : "0%",
          ease: "power2.inOut",
          duration: 2.5,
        },
        0.3
      )
      // Wrap 4 slides in to middle column bottom (33.33%, 50%)
      .to(
        wrap4Ref.current,
        {
          left: isMobile ? "50%" : "33.33%",
          top: isMobile ? "33.33%" : "50%",
          ease: "power2.inOut",
          duration: 2.5,
        },
        0.3
      )
      // Wrap 5 slides in to right column top (66.66%, 0%)
      .to(
        wrap5Ref.current,
        {
          left: isMobile ? "0%" : "66.66%",
          top: isMobile ? "66.66%" : "0%",
          ease: "power2.inOut",
          duration: 2.5,
        },
        0.3
      )
      // Wrap 6 slides in to right column bottom (66.66%, 50%)
      .to(
        wrap6Ref.current,
        {
          left: isMobile ? "50%" : "66.66%",
          top: isMobile ? "66.66%" : "50%",
          ease: "power2.inOut",
          duration: 2.5,
        },
        0.3
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
        
        .light-premium-shadow {
          text-shadow: 
            0 0 15px rgba(245, 247, 227, 0.95),
            0 0 30px rgba(245, 247, 227, 0.8),
            0 0 45px rgba(255, 255, 255, 0.7);
        }
      `}</style>

      {/* Pinned Image Wrapper (z-10) */}
      <div
        ref={imageWrapperRef}
        className="absolute w-full h-full overflow-hidden flex items-center justify-center z-10"
      >
        {/* Animated Wrapper 1 */}
        <div 
          ref={wrap1Ref}
          className="absolute overflow-hidden z-20 group/card cursor-pointer border border-[#F5F7E3]/10"
        >
          <img
            src={HERO_IMAGES[0]}
            alt="Estate Floor Plan"
            className="absolute inset-0 w-full h-full object-cover animated-img-wrap-1 will-change-transform transition-transform duration-700 group-hover/card:scale-105"
          />
          <div className="absolute inset-0 bg-black/0 group-hover/card:bg-black/35 transition-colors duration-500 pointer-events-none" />
          <div className="absolute bottom-6 left-6 z-30 opacity-0 translate-y-3 group-hover/card:opacity-100 group-hover/card:translate-y-0 transition-all duration-500 pointer-events-none flex flex-col">
            <span className="font-serif text-[#F5F7E3] text-sm md:text-lg tracking-widest uppercase font-semibold mb-1 drop-shadow-md">
              Floor Layout
            </span>
            <span className="h-[2px] bg-[#C9A35D] w-8 transition-all duration-500 group-hover/card:w-20" />
          </div>
        </div>

        {/* Animated Wrapper 2 */}
        <div 
          ref={wrap2Ref}
          className="absolute overflow-hidden z-10 group/card cursor-pointer border border-[#F5F7E3]/10"
        >
          <img
            src={HERO_IMAGES[1]}
            alt="Mansion Exterior"
            className="absolute inset-0 w-full h-full object-cover animated-img-wrap-2 will-change-transform transition-transform duration-700 group-hover/card:scale-105"
          />
          <div className="absolute inset-0 bg-black/0 group-hover/card:bg-black/35 transition-colors duration-500 pointer-events-none" />
          <div className="absolute bottom-6 left-6 z-30 opacity-0 translate-y-3 group-hover/card:opacity-100 group-hover/card:translate-y-0 transition-all duration-500 pointer-events-none flex flex-col">
            <span className="font-serif text-[#F5F7E3] text-sm md:text-base tracking-widest uppercase font-semibold mb-1 drop-shadow-md">
              Mansion Exterior
            </span>
            <span className="h-[2px] bg-[#C9A35D] w-8 transition-all duration-500 group-hover/card:w-16" />
          </div>
        </div>

        {/* Animated Wrapper 3 */}
        <div 
          ref={wrap3Ref}
          className="absolute overflow-hidden z-10 group/card cursor-pointer border border-[#F5F7E3]/10"
        >
          <img
            src={HERO_IMAGES[2]}
            alt="Infinity Pool"
            className="absolute inset-0 w-full h-full object-cover animated-img-wrap-3 will-change-transform transition-transform duration-700 group-hover/card:scale-105"
          />
          <div className="absolute inset-0 bg-black/0 group-hover/card:bg-black/35 transition-colors duration-500 pointer-events-none" />
          <div className="absolute bottom-6 left-6 z-30 opacity-0 translate-y-3 group-hover/card:opacity-100 group-hover/card:translate-y-0 transition-all duration-500 pointer-events-none flex flex-col">
            <span className="font-serif text-[#F5F7E3] text-sm md:text-base tracking-widest uppercase font-semibold mb-1 drop-shadow-md">
              Infinity Pool
            </span>
            <span className="h-[2px] bg-[#C9A35D] w-8 transition-all duration-500 group-hover/card:w-16" />
          </div>
        </div>

        {/* Animated Wrapper 4 */}
        <div 
          ref={wrap4Ref}
          className="absolute overflow-hidden z-10 group/card cursor-pointer border border-[#F5F7E3]/10"
        >
          <img
            src={HERO_IMAGES[3]}
            alt="Luxe Interior"
            className="absolute inset-0 w-full h-full object-cover animated-img-wrap-4 will-change-transform transition-transform duration-700 group-hover/card:scale-105"
          />
          <div className="absolute inset-0 bg-black/0 group-hover/card:bg-black/35 transition-colors duration-500 pointer-events-none" />
          <div className="absolute bottom-6 left-6 z-30 opacity-0 translate-y-3 group-hover/card:opacity-100 group-hover/card:translate-y-0 transition-all duration-500 pointer-events-none flex flex-col">
            <span className="font-serif text-[#F5F7E3] text-sm md:text-base tracking-widest uppercase font-semibold mb-1 drop-shadow-md">
              Luxe Interior
            </span>
            <span className="h-[2px] bg-[#C9A35D] w-8 transition-all duration-500 group-hover/card:w-16" />
          </div>
        </div>

        {/* Animated Wrapper 5 */}
        <div 
          ref={wrap5Ref}
          className="absolute overflow-hidden z-10 group/card cursor-pointer border border-[#F5F7E3]/10"
        >
          <img
            src={HERO_IMAGES[4]}
            alt="Scenic Lounge"
            className="absolute inset-0 w-full h-full object-cover animated-img-wrap-1 will-change-transform transition-transform duration-700 group-hover/card:scale-105"
          />
          <div className="absolute inset-0 bg-black/0 group-hover/card:bg-black/35 transition-colors duration-500 pointer-events-none" />
          <div className="absolute bottom-6 left-6 z-30 opacity-0 translate-y-3 group-hover/card:opacity-100 group-hover/card:translate-y-0 transition-all duration-500 pointer-events-none flex flex-col">
            <span className="font-serif text-[#F5F7E3] text-sm md:text-base tracking-widest uppercase font-semibold mb-1 drop-shadow-md">
              Scenic Lounge
            </span>
            <span className="h-[2px] bg-[#C9A35D] w-8 transition-all duration-500 group-hover/card:w-16" />
          </div>
        </div>

        {/* Animated Wrapper 6 */}
        <div 
          ref={wrap6Ref}
          className="absolute overflow-hidden z-10 group/card cursor-pointer border border-[#F5F7E3]/10"
        >
          <img
            src={HERO_IMAGES[5]}
            alt="Royal Suite"
            className="absolute inset-0 w-full h-full object-cover animated-img-wrap-2 will-change-transform transition-transform duration-700 group-hover/card:scale-105"
          />
          <div className="absolute inset-0 bg-black/0 group-hover/card:bg-black/35 transition-colors duration-500 pointer-events-none" />
          <div className="absolute bottom-6 left-6 z-30 opacity-0 translate-y-3 group-hover/card:opacity-100 group-hover/card:translate-y-0 transition-all duration-500 pointer-events-none flex flex-col">
            <span className="font-serif text-[#F5F7E3] text-sm md:text-base tracking-widest uppercase font-semibold mb-1 drop-shadow-md">
              Royal Suite
            </span>
            <span className="h-[2px] bg-[#C9A35D] w-8 transition-all duration-500 group-hover/card:w-16" />
          </div>
        </div>

        {/* Multi-layered dark gradient overlays (z-25) */}
        <div 
          ref={vignetteRef}
          className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/25 z-25 pointer-events-none" 
        />
      </div>

      {/* Main heading (z-30 - Fades out during stage 1 scroll) */}
     <div
  ref={headingRef}
  className="absolute inset-0 flex items-center justify-center text-center z-30 px-6"
>
  <div className="relative max-w-4xl px-6 py-8 md:px-12 md:py-10 bg-transparent">

    {/* Top Label */}
    {/* <motion.span
      initial={{ opacity: 0, y: -20, letterSpacing: "0.15em" }}
      animate={{ opacity: 1, y: 0, letterSpacing: "0.25em" }}
      transition={{ duration: 1 }}
      className="inline-block uppercase font-serif text-xs md:text-sm tracking-[0.25em] text-brand-maroon font-semibold mb-6 light-premium-shadow"
    >
      ✦ Introducing The Pinnacle of Living ✦
    </motion.span> */}

    {/* Main Heading */}
    <motion.h1
      initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
      className="font-serif font-bold leading-[1.1] text-brand-black"
    >
      <span className="relative inline-block mt-4 text-2xl md:text-4xl lg:text-5xl xl:text-6xl text-brand-maroon light-premium-shadow">
        Built by the company Tata Housing and Godrej trust with their own projects
      </span>

      <span className="relative inline-block mt-4 text-2xl md:text-4xl lg:text-5xl xl:text-6xl text-brand-olive font-bold light-premium-shadow">
        Now building yours
        <motion.span
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ delay: 0.8, duration: 1.2 }}
          className="absolute -bottom-3 left-0 h-[2px] bg-brand-maroon shadow-[0_0_8px_#F5F7E3]"
        />
      </span>
    </motion.h1>

    {/* Description */}
    <motion.p
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 1 }}
      className="mt-8 max-w-6xl mx-auto text-[#F5F7E3] text-sm md:text-base lg:text-lg font-sans leading-relaxed tracking-wide premium-text-shadow font-medium"
    >
      <span className="text-white font-semibold">
        An elite collection
      </span>{" "}
      of private sanctuaries, custom-built for those who appreciate the{" "}
      <span className="text-brand-olive font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
        poetry of detail.
      </span>
    </motion.p>

    {/* Premium Divider */}
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: "120px" }}
      transition={{ delay: 1, duration: 1 }}
      className="mx-auto mt-8 h-[2px] bg-brand-maroon shadow-[0_0_8px_#F5F7E3]"
    />

  </div>
</div>

      {/* Scroll Indicators (z-30) */}
      <div
        ref={indicatorsRef}
        className="absolute bottom-10 left-10 z-30 flex gap-2.5 pointer-events-none"
      >
        <div className="h-2 w-[28px] rounded-full bg-[#8F2621] transition-all duration-300" />
        <div className="h-2 w-2 rounded-full bg-[#F5F4F0]/25 transition-all duration-300" />
        <div className="h-2 w-2 rounded-full bg-[#F5F4F0]/25 transition-all duration-300" />
        <div className="h-2 w-2 rounded-full bg-[#F5F4F0]/25 transition-all duration-300" />
        <div className="h-2 w-2 rounded-full bg-[#F5F4F0]/25 transition-all duration-300" />
        <div className="h-2 w-2 rounded-full bg-[#F5F4F0]/25 transition-all duration-300" />
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
