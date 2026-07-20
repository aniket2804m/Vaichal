import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import {
  ArrowUp,
  Phone,
  Mail,
  MapPin,
  Clock,
  Home,
  ChevronRight,
} from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaTwitter,
} from "react-icons/fa";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Data structure definitions
const QUICK_LINKS = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
  { name: "Our Projects", path: "/features" },
  { name: "Services", path: "/services" },
  { name: "Blogs & News", path: "/blog" },
  { name: "Awards", path: "/award" },
  { name: "Gallery", path: "/gallery" },
  { name: "Contact Specialist", path: "/contact" },
];

const PROPERTY_CATEGORIES = [
  { name: "Residential Apartments", path: "/properties/residential" },
  { name: "Luxury Villas & Estates", path: "/properties/villas" },
  { name: "Commercial Office Spaces", path: "/properties/commercial" },
  { name: "Premium Retail Shops", path: "/properties/retail" },
  { name: "Industrial Solutions", path: "/properties/industrial" },
  { name: "Investment Plots & Land", path: "/properties/plots" },
  { name: "Scenic Farm Houses", path: "/properties/farmhouses" },
  { name: "Strategic High-Yield Projects", path: "/properties/investments" },
];

export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const scrollBtnRef = useRef<HTMLButtonElement>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Scroll visibility handler for back-to-top
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Back to top animation
  useEffect(() => {
    if (!scrollBtnRef.current) return;
    if (showScrollTop) {
      gsap.to(scrollBtnRef.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.4,
        ease: "back.out(1.7)",
      });
    } else {
      gsap.to(scrollBtnRef.current, {
        opacity: 0,
        scale: 0.5,
        y: 20,
        duration: 0.3,
        ease: "power2.in",
      });
    }
  }, [showScrollTop]);

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Draw SVG Landscape Elements
      const drawTl = gsap.timeline({
        scrollTrigger: {
          trigger: svgRef.current,
          start: "top 95%",
          toggleActions: "play none none none",
        },
      });

      drawTl.fromTo(
        ".svg-draw-path",
        { strokeDashoffset: 1000, strokeDasharray: 1000 },
        { strokeDashoffset: 0, duration: 2.5, ease: "power2.out", stagger: 0.1 }
      )
      .fromTo(
        ".svg-fill-element",
        { opacity: 0, scaleY: 0, transformOrigin: "bottom" },
        { opacity: 1, scaleY: 1, duration: 1.5, ease: "power2.out", stagger: 0.05 },
        "-=2"
      );

      // 2. Animate Floating Clouds
      gsap.to(".svg-cloud-1", {
        x: 60,
        duration: 18,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".svg-cloud-2", {
        x: -40,
        duration: 15,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // 3. Animate Birds
      gsap.fromTo(
        ".svg-bird-group",
        { x: -50, y: 10 },
        {
          x: 1050,
          y: -20,
          duration: 35,
          repeat: -1,
          ease: "none",
        }
      );

      // 4. Animate Crane Jib
      gsap.to(".svg-crane-jib", {
        rotation: 10,
        transformOrigin: "5px 10px",
        duration: 20,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // 5. Welding Spark Flickering
      gsap.to(".svg-welding-flash", {
        opacity: 0.1,
        duration: 0.1,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
      gsap.to(".svg-welding-core", {
        scale: 1.4,
        duration: 0.08,
        repeat: -1,
        yoyo: true,
        ease: "none",
      });

      // 6. Dust puff drifting
      gsap.to(".svg-dust-puff-1", {
        y: -6,
        x: 3,
        scale: 1.2,
        opacity: 0,
        duration: 3,
        repeat: -1,
        ease: "power1.out",
      });
      gsap.to(".svg-dust-puff-2", {
        y: -9,
        x: -2,
        scale: 1.3,
        opacity: 0,
        duration: 4,
        repeat: -1,
        ease: "power1.out",
        delay: 1,
      });
      gsap.to(".svg-dust-puff-3", {
        y: -5,
        x: 4,
        scale: 1.1,
        opacity: 0,
        duration: 3.5,
        repeat: -1,
        ease: "power1.out",
        delay: 2,
      });

      // 7. Stagger Footer Columns Reveal
      gsap.fromTo(
        ".footer-animate-col",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div ref={footerRef} className="relative w-full bg-[#1B1B1B] text-[#BDBDBD] select-none overflow-hidden border-t border-[#999991]/20">
      {/* Pure CSS animated particles */}
      <style>{`
        .luxury-particle {
          position: absolute;
          border-radius: 50%;
          background: rgba(122, 150, 54, 0.15);
          pointer-events: none;
          animation: floatParticle 15s infinite linear;
        }
        @keyframes floatParticle {
          0% { transform: translateY(0) scale(1); opacity: 0; }
          50% { opacity: 0.7; }
          100% { transform: translateY(-160px) scale(0.4); opacity: 0; }
        }
      `}</style>

      {/* Decorative Glow elements */}
      <div className="absolute top-1/4 left-10 w-[400px] h-[400px] bg-[#7A9636]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[#8F2621]/3 rounded-full blur-[160px] pointer-events-none" />

      {/* CSS Particles Injection */}
      <div className="absolute inset-0 z-0 opacity-40">
        <div className="luxury-particle w-1.5 h-1.5 top-[80%] left-[10%] animate-[floatParticle_14s_infinite_linear]" />
        <div className="luxury-particle w-2 h-2 top-[70%] left-[30%] animate-[floatParticle_18s_infinite_linear]" style={{ animationDelay: "2s" }} />
        <div className="luxury-particle w-1.5 h-1.5 top-[85%] left-[50%] animate-[floatParticle_12s_infinite_linear]" style={{ animationDelay: "4s" }} />
        <div className="luxury-particle w-2.5 h-2.5 top-[60%] left-[75%] animate-[floatParticle_22s_infinite_linear]" style={{ animationDelay: "1s" }} />
        <div className="luxury-particle w-1.5 h-1.5 top-[90%] left-[90%] animate-[floatParticle_16s_infinite_linear]" style={{ animationDelay: "6s" }} />
      </div>

      {/* Section 1 & 2 Combined Sky Background Container */}
      <div 
        className="relative w-full pt-12 z-10" 
        style={{ background: "linear-gradient(to bottom, #0F1B2E, #2A1F1A)" }}
      >
        <svg
          ref={svgRef}
          className="w-full h-[180px] md:h-[260px] block"
          viewBox="0 0 1000 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Realistic Sky Gradient (deep navy to warm amber horizon) */}
            <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="220" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#0F1B2E" />
              <stop offset="100%" stopColor="#2A1F1A" />
            </linearGradient>

            {/* Mountains Gradients (cool slate-grey/blue-green) */}
            <linearGradient id="mountGrad1" x1="0" y1="50" x2="0" y2="220" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#2C3A3F" />
              <stop offset="100%" stopColor="#1A2225" />
            </linearGradient>
            <linearGradient id="mountGrad2" x1="0" y1="80" x2="0" y2="220" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#3E4E4A" />
              <stop offset="100%" stopColor="#1E2A25" />
            </linearGradient>

            {/* City Skyline Gradients */}
            <linearGradient id="skylineGrad1" x1="0" y1="90" x2="0" y2="220" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#3A3F45" />
              <stop offset="100%" stopColor="#222529" />
            </linearGradient>
            <linearGradient id="skylineGrad2" x1="0" y1="120" x2="0" y2="220" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#2E3236" />
              <stop offset="100%" stopColor="#1B1D1F" />
            </linearGradient>

            {/* Under Construction Tower Gradient (raw concrete) */}
            <linearGradient id="underConstructionGrad" x1="0" y1="80" x2="0" y2="220" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#6E7175" />
              <stop offset="100%" stopColor="#8A8F94" />
            </linearGradient>

            {/* Villa Gradient (Terracotta & Cream) */}
            <linearGradient id="villaGrad" x1="0" y1="130" x2="0" y2="220" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#E8DCC4" />
              <stop offset="100%" stopColor="#C9AF8E" />
            </linearGradient>

            {/* Earthy Ground Line Gradient */}
            <linearGradient id="groundGrad" x1="0" y1="215" x2="0" y2="220" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#3B4A2E" />
              <stop offset="100%" stopColor="#26301E" />
            </linearGradient>
          </defs>

          {/* Mountains in background */}
          <polygon points="20,220 180,70 340,220" fill="url(#mountGrad1)" opacity="0.65" className="svg-fill-element" />
          <polygon points="280,220 480,45 680,220" fill="url(#mountGrad2)" opacity="0.8" className="svg-fill-element" />
          <polygon points="600,220 780,85 960,220" fill="url(#mountGrad1)" opacity="0.75" className="svg-fill-element" />

          {/* Clouds (Soft off-white / light grey) */}
          <path
            className="svg-cloud-1"
            d="M120 45 Q135 30 155 35 Q170 20 190 35 Q205 35 212 45 Z"
            fill="#D8D8D0"
            fillOpacity="0.2"
          />
          <path
            className="svg-cloud-2"
            d="M720 65 Q735 50 755 55 Q770 40 790 55 Q805 55 812 65 Z"
            fill="#D8D8D0"
            fillOpacity="0.15"
          />

          {/* Flying Birds Group (charcoal silhouette) */}
          <g className="svg-bird-group">
            <path d="M 0 30 Q 8 20 16 30 Q 24 20 32 30 Q 16 26 0 30 Z" fill="#1A1A1A" opacity="0.85" />
            <path d="M 40 45 Q 46 37 52 45 Q 58 37 64 45 Q 52 42 40 45 Z" fill="#1A1A1A" opacity="0.75" />
            <path d="M 20 60 Q 25 53 30 60 Q 35 53 40 60 Q 30 57 20 60 Z" fill="#1A1A1A" opacity="0.8" />
          </g>

          {/* City Skyline Silhouette with yellow-white window lights */}
          <rect x="360" y="110" width="35" height="110" fill="url(#skylineGrad2)" className="svg-fill-element" />
          <rect x="405" y="90" width="45" height="130" fill="url(#skylineGrad1)" className="svg-fill-element" />
          <rect x="460" y="120" width="30" height="100" fill="url(#skylineGrad2)" className="svg-fill-element" />
          <rect x="580" y="100" width="40" height="120" fill="url(#skylineGrad1)" className="svg-fill-element" />
          <rect x="630" y="130" width="30" height="90" fill="url(#skylineGrad2)" className="svg-fill-element" />

          {/* Scattered Window Lights */}
          <rect x="415" y="100" width="4" height="4" fill="#F5D98A" opacity="0.8" />
          <rect x="425" y="100" width="4" height="4" fill="#F5D98A" opacity="0.6" />
          <rect x="435" y="100" width="4" height="4" fill="#F5D98A" opacity="0.75" />
          <rect x="415" y="115" width="4" height="4" fill="#F5D98A" opacity="0.9" />
          <rect x="435" y="115" width="4" height="4" fill="#F5D98A" opacity="0.5" />
          <rect x="425" y="130" width="4" height="4" fill="#F5D98A" opacity="0.8" />
          <rect x="415" y="145" width="4" height="4" fill="#F5D98A" opacity="0.7" />
          <rect x="590" y="110" width="4" height="4" fill="#F5D98A" opacity="0.7" />
          <rect x="600" y="110" width="4" height="4" fill="#F5D98A" opacity="0.9" />
          <rect x="590" y="125" width="4" height="4" fill="#F5D98A" opacity="0.8" />
          <rect x="600" y="140" width="4" height="4" fill="#F5D98A" opacity="0.65" />

          {/* Under-Construction Tower */}
          <g transform="translate(500, 80)">
            {/* Tower Base Block (Exposed Concrete) */}
            <rect x="0" y="40" width="60" height="100" fill="url(#underConstructionGrad)" stroke="#555" strokeWidth="0.5" className="svg-fill-element" />
            
            {/* Top Unfinished Floor (Raw Concrete) */}
            <rect x="0" y="20" width="60" height="20" fill="#6E7175" stroke="#444" strokeWidth="0.5" className="svg-fill-element" />
            
            {/* Safety-orange hazard tape border */}
            <rect x="0" y="20" width="60" height="20" stroke="#FF7A1A" strokeWidth="1.5" strokeDasharray="4,3" fill="none" />
            
            {/* Rebar / Steel Columns (steel-grey) */}
            <line x1="8" y1="20" x2="8" y2="5" stroke="#9B9B9B" strokeWidth="1.5" />
            <line x1="20" y1="20" x2="20" y2="5" stroke="#9B9B9B" strokeWidth="1.5" />
            <line x1="40" y1="20" x2="40" y2="5" stroke="#9B9B9B" strokeWidth="1.5" />
            <line x1="52" y1="20" x2="52" y2="5" stroke="#9B9B9B" strokeWidth="1.5" />

            {/* Finished Floor Windows with warm glow */}
            <rect x="8" y="50" width="12" height="15" fill="#FFE9B3" opacity="0.85" />
            <rect x="24" y="50" width="12" height="15" fill="#FFE9B3" opacity="0.65" />
            <rect x="40" y="50" width="12" height="15" fill="#FFE9B3" opacity="0.8" />
            <rect x="8" y="75" width="12" height="15" fill="#FFE9B3" opacity="0.75" />
            <rect x="24" y="75" width="12" height="15" fill="#FFE9B3" opacity="0.9" />
            <rect x="40" y="75" width="12" height="15" fill="#FFE9B3" opacity="0.5" />
            <rect x="8" y="100" width="12" height="15" fill="#FFE9B3" opacity="0.8" />
            <rect x="40" y="100" width="12" height="15" fill="#FFE9B3" opacity="0.85" />
            
            {/* Floor Separators / Concrete Slabs */}
            <line x1="0" y1="40" x2="60" y2="40" stroke="#444" strokeWidth="1.5" />
            <line x1="0" y1="70" x2="60" y2="70" stroke="#444" strokeWidth="1.2" />
            <line x1="0" y1="95" x2="60" y2="95" stroke="#444" strokeWidth="1.2" />
            <line x1="0" y1="120" x2="60" y2="120" stroke="#444" strokeWidth="1.2" />
          </g>

          {/* Scaffolding & Netting */}
          <g transform="translate(480, 110)">
            <line x1="0" y1="110" x2="0" y2="10" stroke="#B8BCC0" strokeWidth="1.2" />
            <line x1="15" y1="110" x2="15" y2="10" stroke="#B8BCC0" strokeWidth="1.2" />
            
            {/* Cross braces */}
            <line x1="0" y1="10" x2="15" y2="30" stroke="#B8BCC0" strokeWidth="0.8" />
            <line x1="15" y1="10" x2="0" y2="30" stroke="#B8BCC0" strokeWidth="0.8" />
            <line x1="0" y1="30" x2="15" y2="50" stroke="#B8BCC0" strokeWidth="0.8" />
            <line x1="15" y1="30" x2="0" y2="50" stroke="#B8BCC0" strokeWidth="0.8" />
            <line x1="0" y1="50" x2="15" y2="70" stroke="#B8BCC0" strokeWidth="0.8" />
            <line x1="15" y1="50" x2="0" y2="70" stroke="#B8BCC0" strokeWidth="0.8" />
            <line x1="0" y1="70" x2="15" y2="90" stroke="#B8BCC0" strokeWidth="0.8" />
            <line x1="15" y1="70" x2="0" y2="90" stroke="#B8BCC0" strokeWidth="0.8" />

            {/* Platforms */}
            <line x1="-3" y1="30" x2="18" y2="30" stroke="#8A8F94" strokeWidth="1.5" />
            <line x1="-3" y1="70" x2="18" y2="70" stroke="#8A8F94" strokeWidth="1.5" />

            {/* Safety netting (Rust-orange) */}
            <rect x="0" y="32" width="15" height="38" fill="#D97B3F" fillOpacity="0.45" stroke="#D97B3F" strokeWidth="0.5" strokeDasharray="2,2" />
          </g>

          {/* Construction Tower Crane (industrial safety-yellow and black) */}
          <g
  transform="translate(565,75)"
  className="svg-crane"
>
            {/* Crane Mast */}
            <line x1="5" y1="145" x2="5" y2="10" stroke="#F2B90C" strokeWidth="2.5" className="svg-draw-path" />
            <line x1="5" y1="145" x2="5" y2="10" stroke="#1A1A1A" strokeWidth="0.8" strokeDasharray="3,6" />
            
            {/* Crane cabin */}
            <rect x="1" y="2" width="9" height="9" fill="#F2B90C" stroke="#1A1A1A" strokeWidth="0.5" />
            <rect x="5" y="4" width="4" height="4" fill="#1A1A1A" />
            
            {/* Crane Jib */}
            <g className="svg-crane-jib">
              <line x1="-30" y1="10" x2="85" y2="10" stroke="#F2B90C" strokeWidth="2" />
              <path d="M-30 10 L-20 6 L-10 10 L0 6 L10 10 L20 6 L30 10 L40 6 L50 10 L60 6 L70 10 L80 6" stroke="#1A1A1A" strokeWidth="0.5" fill="none" />
              <rect x="-24" y="12" width="10" height="7" fill="#1A1A1A" />
              <polygon points="5,10 5,0 12,10" fill="#F2B90C" stroke="#1A1A1A" strokeWidth="0.5" />
              {/* Steel hoisting cable */}
              <line x1="60" y1="10" x2="60" y2="55" stroke="#9B9B9B" strokeWidth="0.8" />
              <path d="M 59 55 Q 60 58 61 55" stroke="#1A1A1A" strokeWidth="1.2" fill="none" />
            </g>
          </g>

          {/* Welding Sparks (Blue-White-Yellow Flash) */}
          <g transform="translate(495, 140)">
            <circle cx="0" cy="0" r="7" fill="#8ECBFF" opacity="0.6" className="svg-welding-flash" />
            <circle cx="0" cy="0" r="3" fill="#FFF4D6" opacity="0.9" className="svg-welding-core" />
            <line x1="0" y1="0" x2="-8" y2="-4" stroke="#FFF4D6" strokeWidth="0.8" className="svg-welding-ray" />
            <line x1="0" y1="0" x2="8" y2="4" stroke="#FFF4D6" strokeWidth="0.8" className="svg-welding-ray" />
            <line x1="0" y1="0" x2="-4" y2="8" stroke="#8ECBFF" strokeWidth="0.8" className="svg-welding-ray" />
            <line x1="0" y1="0" x2="4" y2="-8" stroke="#8ECBFF" strokeWidth="0.8" className="svg-welding-ray" />
          </g>

          {/* Dust Puff (Warm Beige/Tan) */}
          <g transform="translate(530, 210)">
            <circle cx="-10" cy="0" r="10" fill="#C2A582" fillOpacity="0.25" className="svg-dust-puff-1" />
            <circle cx="10" cy="-2" r="8" fill="#C2A582" fillOpacity="0.2" className="svg-dust-puff-2" />
            <circle cx="0" cy="2" r="12" fill="#C2A582" fillOpacity="0.15" className="svg-dust-puff-3" />
          </g>

          {/* Modern Luxury Villas (facade terracotta/cream and wood tones) */}
          <g transform="translate(700, 130)">
            <rect x="0" y="30" width="100" height="60" fill="url(#villaGrad)" stroke="rgba(201,168,76,0.15)" strokeWidth="1" className="svg-fill-element" />
            <rect x="15" y="5" width="70" height="25" fill="#E8DCC4" stroke="rgba(201,168,76,0.15)" strokeWidth="1" className="svg-fill-element" />
            
            {/* Teak Wood trim */}
            <rect x="10" y="30" width="80" height="5" fill="#8B5E3C" />
            <rect x="85" y="35" width="10" height="55" fill="#8B5E3C" />

            {/* Finished warm glass windows */}
            <rect x="25" y="12" width="18" height="12" fill="#FFE9B3" opacity="0.9" />
            <rect x="52" y="12" width="18" height="12" fill="#FFE9B3" opacity="0.7" />
            <rect x="15" y="45" width="22" height="18" fill="#FFE9B3" opacity="0.8" />
            <rect x="47" y="45" width="22" height="18" fill="#FFE9B3" opacity="0.75" />
            
            <line x1="15" y1="30" x2="15" y2="90" stroke="#1A1A1A" strokeWidth="1.5" />
          </g>

          {/* Trees (Geometric conifers in layered greens) */}
          <g transform="translate(320, 160)">
            <polygon points="10,60 25,25 40,60" fill="#1F3D2B" className="svg-fill-element" />
            <polygon points="25,60 37,15 49,60" fill="#2F5C3D" className="svg-fill-element" />
            <polygon points="40,60 50,30 60,60" fill="#4A7C52" className="svg-fill-element" />
          </g>
          <g transform="translate(820, 150)">
            <polygon points="10,70 30,20 50,70" fill="#1F3D2B" className="svg-fill-element" />
            <polygon points="30,70 45,10 60,70" fill="#2F5C3D" className="svg-fill-element" />
            <polygon points="48,70 60,25 72,70" fill="#4A7C52" className="svg-fill-element" />
          </g>

          {/* Road Surface (asphalt grey with faded yellow markings) */}
          <polygon points="450,220 550,220 590,260 410,260" fill="#2B2B2E" opacity="0.9" />
          <line x1="500" y1="220" x2="500" y2="260" stroke="#E8C547" strokeDasharray="4,4" strokeWidth="1.2" opacity="0.7" />

          {/* Earthy Ground baseline */}
          <rect x="0" y="218" width="1000" height="4" fill="url(#groundGrad)" />
        </svg>

        {/* Curved Divider at the bottom of the sky background container */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-20">
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="relative block w-full h-[40px] md:h-[60px]"
          >
            <defs>
              <linearGradient id="dividerGrad" x1="0" y1="0" x2="0" y2="120" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#2A1F1A" />
                <stop offset="100%" stopColor="#1B1B1B" />
              </linearGradient>
            </defs>
            <path d="M0,0 C150,60 350,90 600,90 C850,90 1050,60 1200,0 L1200,120 L0,120 Z" fill="url(#dividerGrad)" />
          </svg>
        </div>
      </div>

      {/* SECTION 3: Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-24 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          
          {/* COLUMN 1: Company Profile */}
          <div className="footer-animate-col flex flex-col space-y-6">
            <div>
              <span className="font-serif text-xl md:text-2xl font-bold tracking-[0.2em] text-[#F5F5F5] block">
                Vaichal
              </span>
              <span className="font-sans text-xs font-semibold tracking-[0.45em] text-[#7A9636] block uppercase mt-1">
                Realty
              </span>
            </div>

            <h4 className="font-serif italic text-base text-[#8F2621] leading-snug">
              Building Luxury.<br />Creating Legacy.
            </h4>

            <p className="font-sans font-light text-sm text-[#BDBDBD] leading-relaxed">
              We develop premium residential, commercial, and investment properties designed for modern living and long-term value.
            </p>

            {/* Social Links (Glass circle, scale & rotate hover) */}
            <div className="flex items-center gap-3 pt-2">
              {[
                { icon: FaFacebookF, label: "Facebook" },
                { icon: FaInstagram, label: "Instagram" },
                { icon: FaLinkedinIn, label: "LinkedIn" },
                { icon: FaYoutube, label: "YouTube" },
                { icon: FaTwitter, label: "Twitter" },
              ].map((social, idx) => {
                const Icon = social.icon;
                return (
                  <a
                    key={idx}
                    href="#"
                    aria-label={social.label}
                    className="w-10 h-10 rounded-full border border-[#999991]/30 bg-white/5 backdrop-blur-md flex items-center justify-center text-[#BDBDBD] hover:text-[#8F2621] hover:border-[#8F2621] hover:scale-110 hover:rotate-6 transition-all duration-300 shadow-sm focus:outline-none focus:ring-1 focus:ring-[#8F2621]"
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* COLUMN 2: Quick Links */}
          <div className="footer-animate-col flex flex-col space-y-6">
            <h3 className="font-serif text-sm font-semibold tracking-[0.25em] text-[#7A9636] uppercase border-b border-[#999991]/20 pb-3">
              Quick Links
            </h3>

            <ul className="grid grid-cols-2 gap-x-4 gap-y-3 font-sans text-sm font-light">
              {QUICK_LINKS.map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.path}
                    className="group flex items-center gap-1.5 text-[#BDBDBD] hover:text-[#8F2621] transition-all duration-300 py-1"
                  >
                    <ChevronRight size={14} className="text-[#7A9636]/50 group-hover:translate-x-1 transition-transform duration-300" />
                    <span className="relative overflow-hidden block">
                      {link.name}
                      <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#8F2621] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 3: Property Categories */}
          <div className="footer-animate-col flex flex-col space-y-6">
            <h3 className="font-serif text-sm font-semibold tracking-[0.25em] text-[#7A9636] uppercase border-b border-[#999991]/20 pb-3">
              Categories
            </h3>

            <ul className="space-y-3.5 font-sans text-sm font-light">
              {PROPERTY_CATEGORIES.map((category, idx) => (
                <li key={idx}>
                  <Link
                    to={category.path}
                    className="group flex items-center gap-3 text-[#BDBDBD] hover:text-[#8F2621] transition-all duration-300"
                  >
                    <Home size={15} className="text-[#7A9636]/60 group-hover:scale-110 transition-transform" />
                    <span className="relative block">
                      {category.name}
                      <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#8F2621] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 4: Contact & Office info */}
          <div className="footer-animate-col flex flex-col space-y-6">
            <h3 className="font-serif text-sm font-semibold tracking-[0.25em] text-[#7A9636] uppercase border-b border-[#999991]/20 pb-3">
              Contact Us
            </h3>

            <div className="space-y-4 font-sans text-sm font-light text-[#BDBDBD]">
              <div className="flex items-start gap-3.5">
                <Phone className="w-4 h-4 text-[#7A9636] shrink-0 mt-1" />
                <div className="flex flex-col">
                  <span className="text-xs text-[#BDBDBD]/60">Call Specialist</span>
                  <a href="tel:+919876543210" className="hover:text-[#8F2621] font-semibold transition-colors mt-0.5">
                    +91 98765 43210
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Mail className="w-4 h-4 text-[#7A9636] shrink-0 mt-1" />
                <div className="flex flex-col">
                  <span className="text-xs text-[#BDBDBD]/60">Email Inquiry</span>
                  <a href="mailto:info@vaichal.com" className="hover:text-[#8F2621] transition-colors mt-0.5">
                    info@vaichal.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <MapPin className="w-4 h-4 text-[#7A9636] shrink-0 mt-1" />
                <div className="flex flex-col">
                  <span className="text-xs text-[#BDBDBD]/60">Corporate Address</span>
                  <span className="leading-relaxed mt-0.5 text-xs">
                    Baner Road, Pune, Maharashtra 411045
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Clock className="w-4 h-4 text-[#7A9636] shrink-0 mt-1" />
                <div className="flex flex-col">
                  <span className="text-xs text-[#BDBDBD]/60">Working Hours</span>
                  <span className="mt-0.5">Mon–Sat: 10AM – 7PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION */}
        <div className="border-t border-[#999991]/20 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-sans font-light">
          <p className="text-[#BDBDBD]/60 text-center md:text-left">
            © {new Date().getFullYear()} Vaichal Realty. All Rights Reserved.
          </p>

          <div className="flex items-center gap-6 text-[#BDBDBD]/60">
            <Link to="/privacy" className="hover:text-[#8F2621] transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-[#8F2621] transition-colors">Terms & Conditions</Link>
            <Link to="/cookie" className="hover:text-[#8F2621] transition-colors">Cookie Policy</Link>
          </div>

        
        </div>
      </div>

      {/* Floating Scroll to Top button */}
      <button
        ref={scrollBtnRef}
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-[#1B1B1B]/95 border border-[#8F2621]/45 text-[#8F2621] shadow-md flex items-center justify-center backdrop-blur-md opacity-0 scale-50 translate-y-6 cursor-pointer focus:outline-none transition-all duration-300 hover:scale-105 group"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 group-hover:scale-110 transition-all duration-300" />
      </button>
    </div>
  );
}