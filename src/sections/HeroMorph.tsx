import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap-init";
import { motion } from "framer-motion";

const BASE_PATH = 
  "M 0 280 L 100 280 L 110 285 L 280 285 L 290 280 L 450 280 L 470 290 L 590 290 L 600 280 L 1050 280 L 1070 290 L 1200 290 L 1215 280 L 1400 280 L 1420 285 L 1600 285" +
  " M 30 280 L 30 220 L 80 220 L 80 280" +
  " M 40 220 L 40 280 M 55 220 L 55 280 M 70 220 L 70 280" +
  " M 25 220 L 85 220" +
  " M 120 280 L 120 90 L 190 90 L 190 280" +
  " M 120 120 L 190 120 M 120 150 L 190 150 M 120 180 L 190 180 M 120 210 L 190 210 M 120 240 L 190 240" +
  " M 155 90 L 155 280" +
  " M 115 90 L 195 90 M 115 85 L 195 85" +
  " M 210 285 L 210 210 L 320 210 L 320 280" +
  " M 200 210 L 330 210" +
  " M 240 210 L 240 280" +
  " M 390 280 L 390 110 L 470 170 L 470 280" +
  " M 385 110 L 475 178" +
  " M 480 290 L 480 180 L 570 180 L 570 290" +
  " M 500 200 L 550 200 L 550 240 L 500 240 Z" +
  " M 590 290 L 590 160 L 730 160 L 730 280" +
  " M 600 200 L 720 200 L 720 215 L 600 215 Z" +
  " M 580 160 L 740 160" +
  " M 790 280 C 840 200, 930 200, 980 280" +
  " M 980 280 L 1050 280" +
  " M 975 280 L 975 273 L 985 273 L 985 266 L 995 266 L 995 259 L 1005 259 L 1005 252 L 1015 252 L 1015 245 L 1025 245 L 1025 280" +
  " M 1060 280 L 1060 190 M 1160 280 L 1160 170" +
  " M 1045 195 L 1175 165" +
  " M 1045 190 L 1175 160" +
  " M 1230 280 L 1230 100 L 1350 100 L 1350 280" +
  " M 1225 100 L 1355 100" +
  " M 1260 130 L 1320 130 L 1320 160 L 1260 160 Z" +
  " M 1260 185 L 1320 185 L 1320 215 L 1260 215 Z" +
  " M 1420 285 L 1420 80 L 1520 80 L 1520 285" +
  " M 1415 80 L 1525 80" +
  " M 1450 110 L 1490 110 L 1490 285";

const HATCHING_PATH =
  " M 125 125 L 140 145 M 135 125 L 150 145 M 145 125 L 160 145 M 155 125 L 170 145 M 165 125 L 180 145" +
  " M 125 185 L 140 205 M 135 185 L 150 205 M 145 185 L 160 205 M 155 185 L 170 205 M 165 185 L 180 205" +
  " M 400 120 L 400 280 M 410 128 L 410 280 M 420 135 L 420 280 M 430 142 L 430 280 M 440 150 L 440 280 M 450 158 L 450 280 M 460 165 L 460 280" +
  " M 305 215 L 315 225 M 310 215 L 320 225 M 300 230 L 315 245 M 305 230 L 320 245 M 300 255 L 315 270 M 305 255 L 320 270" +
  " M 595 165 L 605 175 M 605 165 L 615 175 M 615 165 L 625 175 M 625 165 L 635 175 M 635 165 L 645 175 M 645 165 L 655 175 M 655 165 L 665 175 M 665 165 L 675 175 M 675 165 L 685 175 M 685 165 L 695 175 M 695 165 L 705 175 M 705 165 L 715 175 M 715 165 L 725 175" +
  " M 1455 115 L 1470 130 M 1465 115 L 1480 130 M 1475 115 L 1490 130" +
  " M 1455 145 L 1470 160 M 1465 145 L 1480 160 M 1475 145 L 1490 160" +
  " M 1455 175 L 1470 190 M 1465 175 L 1480 190 M 1475 175 L 1490 190";

const FOLIAGE_PATH =
  " M 15 280 C 12 230, 20 180, 25 150" +
  " M 13 280 C 10 230, 17 180, 22 150" +
  " M 25 150 Q 10 140 -5 145" +
  " M 25 150 Q 15 130 5 125" +
  " M 25 150 Q 25 125 20 115" +
  " M 25 150 Q 40 130 50 128" +
  " M 25 150 Q 45 145 55 152" +
  " M 25 150 Q 35 160 40 170" +
  " M 940 280 Q 942 260 940 245" +
  " M 940 245 Q 925 235 918 225" +
  " M 940 245 Q 955 235 962 228" +
  " M 918 225 C 910 220 905 230 912 235 C 908 238 915 245 922 240" +
  " M 962 228 C 970 222 975 232 968 237 C 972 240 965 248 958 243" +
  " M 612 170 Q 615 155 613 145" +
  " M 613 145 Q 595 135 613 130 Q 630 135 613 145" +
  " M 602 138 C 598 135 605 130 610 133 C 613 130 622 132 620 136 C 623 138 615 144 610 141" +
  " M 770 280 C 765 220, 775 170, 780 140" +
  " M 780 140 Q 760 135 750 140 M 780 140 Q 770 125 765 115 M 780 140 Q 795 125 805 122 M 780 140 Q 795 145 808 152";

const DETAILS_PATH =
  " M 60 70 Q 65 65 70 70 Q 75 65 80 70" +
  " M 72 55 Q 75 51 78 55 Q 81 51 84 55" +
  " M 740 85 Q 745 80 750 85 Q 755 80 760 85" +
  " M 270 80 L 285 70 L 300 80 L 285 90 Z" +
  " M 285 70 L 285 90 M 270 80 L 300 80" +
  " M 285 90 Q 280 105 288 120 Q 284 135 292 150" +
  " M 285 85 Q 230 120 170 170" +
  " M 50 220 L 50 210 M 50 207 A 2 2 0 1 1 50 203 A 2 2 0 1 1 50 207 M 47 213 L 53 213 M 48 220 L 50 215 L 52 220" +
  " M 1120 190 L 1120 182 M 1120 180 A 1.5 1.5 0 1 1 1120 177 A 1.5 1.5 0 1 1 1120 180 M 1118 185 L 1122 185 M 1119 190 L 1120 186 L 1121 190" +
  " M 1130 188 L 1130 180 M 1130 178 A 1.5 1.5 0 1 1 1130 175 A 1.5 1.5 0 1 1 1130 178 M 1127 183 L 1133 183 M 1128 188 L 1130 184 L 1132 188";

const FILLS_PATH =
  " M 25 150 C -5 140, 5 115, 20 115 C 50 115, 55 140, 40 170 Z" +
  " M 918 225 C 900 215, 980 215, 962 228 C 975 250, 910 250, 918 225 Z" +
  " M 613 145 Q 590 125 613 125 Q 635 125 613 145 Z" +
  " M 780 140 Q 745 130, 765 110 Q 815 115, 808 152 Z";

const TOWER_FILLS =
  " M 120 280 L 120 240 L 190 240 L 190 280 Z" +
  " M 120 210 L 120 180 L 190 180 L 190 210 Z" +
  " M 120 150 L 120 120 L 190 120 L 190 150 Z" +
  " M 210 285 L 210 210 L 240 210 L 240 285 Z" +
  " M 590 290 L 590 160 L 730 160 L 730 290 Z" +
  " M 1230 280 L 1230 100 L 1350 100 L 1350 280 Z";

const OLIVE_BUILDING_FILLS =
  " M 390 280 L 390 110 L 470 170 L 470 280 Z" +
  " M 1420 285 L 1420 80 L 1520 80 L 1520 285 Z";

const GRAY_BUILDING_FILLS =
  " M 30 280 L 30 220 L 80 220 L 80 280 Z" +
  " M 240 210 L 240 280 L 320 280 L 320 210 Z" +
  " M 480 290 L 480 180 L 570 180 L 570 290 Z" +
  " M 1060 280 L 1060 190 L 1160 170 L 1160 280 Z";

const CREAM_DOME_FILL =
  " M 790 280 C 840 200, 930 200, 980 280 Z";

const SkylineSVG = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 1600 300"
    preserveAspectRatio="xMidYMax slice"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g className="skyline-fills">
      <motion.path
        d={CREAM_DOME_FILL}
        fill="#F5F7E3"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.4, 0.4, 0] }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut",
          times: [0, 0.4, 0.8, 1],
        }}
      />
      <motion.path
        d={TOWER_FILLS}
        fill="#8F2621"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.25, 0.25, 0] }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut",
          times: [0, 0.4, 0.8, 1],
        }}
      />
      <motion.path
        d={OLIVE_BUILDING_FILLS}
        fill="#7A9636"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.25, 0.25, 0] }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut",
          times: [0, 0.4, 0.8, 1],
        }}
      />
      <motion.path
        d={GRAY_BUILDING_FILLS}
        fill="#999991"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.25, 0.25, 0] }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut",
          times: [0, 0.4, 0.8, 1],
        }}
      />
      <motion.path
        d={FILLS_PATH}
        fill="#7A9636"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.35, 0.35, 0] }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut",
          times: [0, 0.4, 0.8, 1],
        }}
      />
    </g>

    <g className="skyline-outlines">
      <motion.path
        d={BASE_PATH}
        stroke="#7A9636"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0.3 }}
        animate={{ pathLength: [0, 1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut",
          times: [0, 0.6, 1],
        }}
      />
      <motion.path
        d={HATCHING_PATH}
        stroke="#999991"
        strokeWidth="0.9"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0.2 }}
        animate={{ pathLength: [0, 1, 1], opacity: [0.2, 0.45, 0.2] }}
        transition={{
          duration: 5.2,
          repeat: Infinity,
          ease: "easeInOut",
          times: [0, 0.6, 1],
          delay: 0.9,
        }}
      />
      <motion.path
        d={FOLIAGE_PATH}
        stroke="#7A9636"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0.25 }}
        animate={{ pathLength: [0, 1, 1], opacity: [0.25, 0.45, 0.25] }}
        transition={{
          duration: 4.8,
          repeat: Infinity,
          ease: "easeInOut",
          times: [0, 0.6, 1],
          delay: 0.3,
        }}
      />
      <motion.path
        d={DETAILS_PATH}
        stroke="#8F2621"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0.25 }}
        animate={{ pathLength: [0, 1, 1], opacity: [0.25, 0.45, 0.25] }}
        transition={{
          duration: 4.2,
          repeat: Infinity,
          ease: "easeInOut",
          times: [0, 0.6, 1],
          delay: 0.6,
        }}
      />
    </g>
  </svg>
);

export default function HeroMorph() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const glassCardRef = useRef<HTMLDivElement>(null);
  const shineSweepRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;
    const container = containerRef.current;
    
    if (!container) return;

    if (prefersReduced) {
      gsap.set(imageWrapperRef.current, {
        width: isMobile ? "92vw" : "75vw",
        height: isMobile ? "55vh" : "65vh",
        borderRadius: "24px"
      });
      gsap.set(imageRef.current, {
        opacity: 0.35,
        scale: 1,
        filter: isMobile ? "none" : "blur(2px)"
      });
      gsap.set(overlayRef.current, {
        opacity: 0.6
      });
      gsap.set(glassCardRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "none"
      });
      return;
    }

    const ctx = gsap.context(() => {
      // Main ScrollTrigger timeline - Smooth clean vertical scroll morph
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => (isMobile ? "+=100%" : "+=200%"),
          scrub: isMobile ? 0.6 : 1.2,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Step 1: Image Wrapper morphs (width & height shrink, corners smooth round)
      tl.fromTo(
        imageWrapperRef.current,
        {
          width: () => (window.innerWidth < 768 ? "94vw" : window.innerWidth < 1024 ? "88vw" : "90vw"),
          height: () => (window.innerWidth < 768 ? "55vh" : window.innerWidth < 1024 ? "75vh" : "90vh"),
          borderRadius: () => (window.innerWidth < 768 ? "16px" : "20px"),
        },
        {
          width: () => (window.innerWidth < 768 ? "90vw" : window.innerWidth < 1024 ? "80vw" : "70vw"),
          height: () => (window.innerWidth < 768 ? "50vh" : window.innerWidth < 1024 ? "60vh" : "60vh"),
          borderRadius: () => (window.innerWidth < 768 ? "24px" : "32px"),
          ease: "none",
        },
        0
      );

      // Background Image zoom & opacity
      tl.fromTo(
        imageRef.current,
        {
          scale: 1.15,
          filter: "blur(0px) brightness(1) contrast(1)",
        },
        {
          scale: 1.0,
          opacity: 0.3,
          filter: isMobile ? "brightness(0.55) contrast(1.05)" : "blur(6px) brightness(0.55) contrast(1.05)",
          ease: "none",
        },
        0
      );

      // Dark overlay fade
      tl.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 0.65, ease: "none" },
        0
      );

      // Smooth clean entrance for Glass Card (Zero Tilt / Rotation)
      tl.fromTo(
        glassCardRef.current,
        {
          opacity: 0,
          y: isMobile ? 80 : 180,
          scale: isMobile ? 0.92 : 0.88,
          filter: isMobile ? "none" : "blur(10px)",
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "none",
          ease: "power2.out",
        },
        0.1
      );

      // Subheading slide & fade
      const subheading = glassCardRef.current?.querySelector(".subheading");
      if (subheading) {
        tl.fromTo(
          subheading,
          { y: 20, opacity: 0, filter: isMobile ? "none" : "blur(6px)" },
          { y: 0, opacity: 1, filter: "none", ease: "power3.out" },
          0.25
        );
      }

      // Light sweep reflection effect
      if (shineSweepRef.current) {
        gsap.fromTo(
          shineSweepRef.current,
          { left: "-150%" },
          {
            left: "250%",
            duration: 2.8,
            repeat: -1,
            repeatDelay: 3.5,
            ease: "power2.inOut",
          }
        );
      }
    }, container);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="discover"
      className="relative w-full h-screen bg-[#F5F7E3] flex items-center justify-center overflow-hidden"
    >
      <style>{`
        @keyframes shine {
          0% { transform: translate3d(-150%, 0, 0) skewX(-20deg); }
          100% { transform: translate3d(250%, 0, 0) skewX(-20deg); }
        }
        
        @keyframes scrollLeftToRight {
          0% { transform: translate3d(-50%, 0, 0); }
          100% { transform: translate3d(0%, 0, 0); }
        }
        
        @keyframes outlineGrow {
          0% { transform: scaleY(0); }
          100% { transform: scaleY(1); }
        }
        
        @keyframes fillsGrowAndFade {
          0% { transform: scaleY(0); opacity: 0; }
          100% { transform: scaleY(1); opacity: 1; }
        }
        
        .scroll-skyline {
          display: flex;
          width: 200%;
          animation: scrollLeftToRight 80s linear infinite;
        }
        
        .skyline-outlines {
          transform-origin: bottom;
          animation: outlineGrow 4.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        
        .skyline-fills {
          transform-origin: bottom;
          opacity: 0;
          animation: fillsGrowAndFade 3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          animation-delay: 1.2s;
        }
      `}</style>

      {/* Ambient background glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute inset-0 bg-[#F5F7E3]" />
        
        {/* Olive radial ambient glow top-left */}
        <div className="ambient-glow absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-[radial-gradient(circle,_rgba(122,150,54,0.08)_0%,_transparent_70%)] opacity-30 pointer-events-none" />
        
        {/* Maroon radial ambient glow bottom-right */}
        <div className="ambient-glow absolute -bottom-[15%] -right-[15%] w-[60%] h-[60%] rounded-full bg-[radial-gradient(circle,_rgba(143,38,33,0.06)_0%,_transparent_70%)] opacity-25 pointer-events-none" />
        
        {/* Center radial depth mask */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] rounded-full bg-[radial-gradient(circle,_rgba(245,247,227,0.7)_0%,_#F5F7E3_80%)] pointer-events-none" />
      </div>

      {/* Ambient Light Rays */}
      <div className="light-rays absolute inset-0 opacity-[0.05] pointer-events-none z-0 mix-blend-screen hidden sm:block">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="ray-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#7A9636" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#7A9636" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#7A9636" stopOpacity="0" />
            </linearGradient>
          </defs>
          <polygon points="10,0 25,0 70,100 50,100" fill="url(#ray-grad)" />
          <polygon points="40,0 60,0 95,100 75,100" fill="url(#ray-grad)" />
          <polygon points="-10,0 5,0 45,100 30,100" fill="url(#ray-grad)" />
        </svg>
      </div>

      {/* Soft Lens Flare */}
      <div className="lens-flare absolute top-[20%] left-[15%] w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] pointer-events-none z-0 mix-blend-screen opacity-[0.07] hidden sm:block">
        <svg className="w-full h-full" viewBox="0 0 200 200">
          <defs>
            <radialGradient id="flare-center" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="15%" stopColor="#F5F7E3" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#7A9636" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#F5F7E3" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="flare-ring" cx="50%" cy="50%" r="50%">
              <stop offset="60%" stopColor="#7A9636" stopOpacity="0" />
              <stop offset="70%" stopColor="#7A9636" stopOpacity="0.1" />
              <stop offset="75%" stopColor="#8F2621" stopOpacity="0.15" />
              <stop offset="80%" stopColor="#7A9636" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#F5F7E3" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="100" cy="100" r="80" fill="url(#flare-center)" />
          <circle cx="100" cy="100" r="95" fill="url(#flare-ring)" />
          <line x1="20" y1="20" x2="180" y2="180" stroke="#7A9636" strokeWidth="0.5" strokeOpacity="0.15" />
          <line x1="180" y1="20" x2="20" y2="180" stroke="#7A9636" strokeWidth="0.5" strokeOpacity="0.15" />
        </svg>
      </div>

      {/* GPU Accelerated Noise Filter Overlay */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.035] mix-blend-overlay z-40">
        <filter id="noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="matrix" values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.08 0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>

      {/* Infinite Scrolling Architectural Skyline Background (z-1) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-1 overflow-hidden">
        <div className="flex w-[200%] h-full scroll-skyline">
          <SkylineSVG className="w-1/2 h-full" />
          <SkylineSVG className="w-1/2 h-full" />
        </div>
      </div>

      {/* Flat Glass Card Container (Zero Tilt/Rotation) */}
      <div
        ref={glassCardRef}
        className="relative z-30 opacity-0 w-[94vw] sm:w-[90vw] md:w-[85vw] lg:w-full max-w-xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl mx-auto px-2 sm:px-4"
      >
        <div className="bg-[#F5F7E3]/60 sm:bg-[#F5F7E3]/45 border border-[#7A9636]/25 shadow-xl backdrop-blur-md rounded-[20px] sm:rounded-[28px] md:rounded-[36px] p-4 sm:p-6 md:p-10 lg:p-14 xl:p-16 text-center flex flex-col items-center relative z-20">
          
          {/* Shine sweep reflection */}
          <div
            ref={shineSweepRef}
            className="absolute top-0 bottom-0 left-[-150%] w-[120%] bg-gradient-to-r from-transparent via-[#7A9636]/10 to-transparent skew-x-[-22deg] pointer-events-none z-10 will-change-[left]"
          />

          <div className="card-content flex flex-col items-center w-full z-20">
            
            {/* Heading & Subheading proportional clamp scaling */}
            <motion.h1
              className="font-bold leading-[1.15] sm:leading-[1.1] tracking-tight text-brand-black w-full"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              <span className="font-extrabold block mt-2 sm:mt-4 text-lg sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl text-brand-maroon drop-shadow-[0_2px_4px_rgba(0,0,0,0.18)] break-words">
                Built by the company Tata Housing and Godrej trust with their own projects
              </span>

              <span style={{ fontFamily: "'Cormorant Garamond', serif" }} className="relative inline-block mt-3 sm:mt-5 text-lg sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl text-brand-olive font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.18)]">
                Now building yours
                <motion.span
                  className="absolute -bottom-2 sm:-bottom-3 left-0 right-0 h-[2px] sm:h-[3px] bg-brand-maroon shadow-[0_0_8px_#F5F7E3]"
                />
              </span>
            </motion.h1>
          </div>
        </div>
      </div>
    </div>
  );
}
