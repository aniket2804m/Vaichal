import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap-init";

export default function HeroMorph() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const glassCardRef = useRef<HTMLDivElement>(null);
  const shineSweepRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // 1. Canvas Particles System
    const canvas = canvasRef.current;
    let animationFrameId: number;
    let cleanupParticles: (() => void) | undefined;

    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        let width = (canvas.width = canvas.offsetWidth);
        let height = (canvas.height = canvas.offsetHeight);

        const handleResize = () => {
          if (!canvas) return;
          width = canvas.width = canvas.offsetWidth;
          height = canvas.height = canvas.offsetHeight;
        };
        window.addEventListener("resize", handleResize);

        const particleCount = window.innerWidth < 768 ? 35 : 70;
        const particles: Array<{
          x: number;
          y: number;
          size: number;
          speedX: number;
          speedY: number;
          opacity: number;
          pulseSpeed: number;
          pulseDir: number;
        }> = [];

        for (let i = 0; i < particleCount; i++) {
          particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            size: Math.random() * 2 + 0.6,
            speedX: (Math.random() - 0.5) * 0.35,
            speedY: -(Math.random() * 0.4 + 0.15),
            opacity: Math.random() * 0.5 + 0.25,
            pulseSpeed: Math.random() * 0.015 + 0.003,
            pulseDir: Math.random() > 0.5 ? 1 : -1,
          });
        }

        let mouseX = width / 2;
        let mouseY = height / 2;
        const mouseTarget = { x: mouseX, y: mouseY };

        const handleMouseMoveParticles = (e: MouseEvent) => {
          const rect = canvas.getBoundingClientRect();
          mouseTarget.x = e.clientX - rect.left;
          mouseTarget.y = e.clientY - rect.top;
        };
        window.addEventListener("mousemove", handleMouseMoveParticles);

        const render = () => {
          ctx.clearRect(0, 0, width, height);

          // Eased mouse interpolation
          mouseX += (mouseTarget.x - mouseX) * 0.06;
          mouseY += (mouseTarget.y - mouseY) * 0.06;

          particles.forEach((p) => {
            p.y += p.speedY;
            p.x += p.speedX;

            if (p.y < -10) {
              p.y = height + 10;
              p.x = Math.random() * width;
            }
            if (p.x < -10) p.x = width + 10;
            if (p.x > width + 10) p.x = -10;

            // Repulsive force from cursor
            const dx = p.x - mouseX;
            const dy = p.y - mouseY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 150) {
              const force = (150 - dist) / 150;
              p.x += (dx / dist) * force * 1.8;
              p.y += (dy / dist) * force * 1.8;
            }

            p.opacity += p.pulseSpeed * p.pulseDir;
            if (p.opacity > 0.75) p.pulseDir = -1;
            if (p.opacity < 0.2) p.pulseDir = 1;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(122, 150, 54, ${p.opacity})`; // Olive tone matching nature-friendly theme
            ctx.shadowBlur = 3;
            ctx.shadowColor = "rgba(122, 150, 54, 0.3)";
            ctx.fill();
          });

          animationFrameId = requestAnimationFrame(render);
        };

        render();

        cleanupParticles = () => {
          cancelAnimationFrame(animationFrameId);
          window.removeEventListener("resize", handleResize);
          window.removeEventListener("mousemove", handleMouseMoveParticles);
        };
      }
    }

    // 2. GSAP Animations & Interactive Parallax
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const container = containerRef.current;
    
    if (!container) return;

    if (prefersReduced) {
      // Reduced motion layout static fallback
      gsap.set(imageWrapperRef.current, {
        width: "75vw",
        height: "65vh",
        borderRadius: "24px"
      });
      gsap.set(imageRef.current, {
        opacity: 0.35,
        scale: 1,
        filter: "blur(2px)"
      });
      gsap.set(overlayRef.current, {
        opacity: 0.6
      });
      gsap.set(glassCardRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        rotation: 0,
        filter: "blur(0px)"
      });
      const chars = glassCardRef.current?.querySelectorAll(".char");
      if (chars) gsap.set(chars, { opacity: 1, y: 0 });
      const subheading = glassCardRef.current?.querySelector(".subheading");
      if (subheading) gsap.set(subheading, { opacity: 1, y: 0, filter: "none" });
      const descLines = glassCardRef.current?.querySelectorAll(".desc-line");
      if (descLines) gsap.set(descLines, { opacity: 1, y: 0 });
      const button = glassCardRef.current?.querySelector(".luxury-button");
      if (button) gsap.set(button, { opacity: 1, scale: 1 });
      return;
    }

    const ctx = gsap.context((self) => {
      // Main ScrollTrigger timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=200%",
          scrub: 1.5,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Step 2: Image Wrapper morphs (width & height shrink, corners smooth round)
      tl.fromTo(
        imageWrapperRef.current,
        {
          width: "90vw",
          height: "90vh",
          borderRadius: "20px",
        },
        {
          width: () => window.innerWidth < 768 ? "92vw" : "70vw",
          height: () => window.innerWidth < 768 ? "70vh" : "60vh",
          borderRadius: "32px",
          ease: "none",
        },
        0
      );

      // Step 2 & 3: Background Image zoom-out, opacity drop, blur, color adjustments
      tl.fromTo(
        imageRef.current,
        {
          scale: 1.15,
          filter: "blur(0px) brightness(1) contrast(1)",
        },
        {
          scale: 1.0,
          opacity: 0.3,
          filter: "blur(6px) brightness(0.55) contrast(1.05)",
          ease: "none",
        },
        0
      );

      // Step 4: Dark overlay fades in
      tl.fromTo(
        overlayRef.current,
        {
          opacity: 0,
        },
        {
          opacity: 0.65,
          ease: "none",
        },
        0
      );

      // Step 5 & 6: Premium Glass Card container transition (y, opacity, scale, rotation, blur)
      tl.fromTo(
        glassCardRef.current,
        {
          opacity: 0,
          y: 280,
          scale: 0.8,
          rotationX: 8,
          rotation: 2,
          filter: "blur(15px)",
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationX: 0,
          rotation: 0,
          filter: "blur(0px)",
          ease: "power2.out",
        },
        0.15
      );

      // Step 7: Subheading slide up, fade, blur reveal
      const subheading = glassCardRef.current?.querySelector(".subheading");
      if (subheading) {
        tl.fromTo(
          subheading,
          {
            y: 20,
            opacity: 0,
            filter: "blur(6px)",
          },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            ease: "power3.out",
          },
          0.3
        );
      }

      // Step 7: Heading letter-by-letter stagger split reveal
      const chars = glassCardRef.current?.querySelectorAll(".char");
      if (chars && chars.length > 0) {
        tl.fromTo(
          chars,
          {
            y: 35,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            stagger: 0.02,
            ease: "power3.out",
          },
          0.4
        );
      }

      // Step 7: Description lines staggered reveal
      const descLines = glassCardRef.current?.querySelectorAll(".desc-line");
      if (descLines && descLines.length > 0) {
        tl.fromTo(
          descLines,
          {
            y: 20,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            stagger: 0.08,
            ease: "power3.out",
          },
          0.55
        );
      }

      // Step 7: Button Reveal (scale and opacity)
      const button = glassCardRef.current?.querySelector(".luxury-button");
      if (button) {
        tl.fromTo(
          button,
          {
            scale: 0.8,
            opacity: 0,
          },
          {
            scale: 1,
            opacity: 1,
            ease: "back.out(1.5)",
          },
          0.7
        );
      }

      // Extra loops: Infinitely running light sweep on glass card
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

      // Ambient pulsing background elements
      const ambientGlows = container.querySelectorAll(".ambient-glow");
      if (ambientGlows.length > 0) {
        gsap.to(ambientGlows, {
          opacity: 0.45,
          scale: 1.08,
          duration: 5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          stagger: 0.5
        });
      }

      // Background light rays slow float movement
      const lightRays = container.querySelector(".light-rays");
      if (lightRays) {
        gsap.to(lightRays, {
          x: 25,
          y: -15,
          rotation: 4,
          duration: 10,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      }

      // Lens flare slow float movement
      const lensFlare = container.querySelector(".lens-flare");
      if (lensFlare) {
        gsap.to(lensFlare, {
          x: -30,
          y: 30,
          scale: 1.08,
          duration: 12,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      }

      // Mouse interactive tilt and coordinates tracker
      const glassCard = glassCardRef.current;
      const mouseGlow = glowRef.current;

      const onMouseMove = (e: MouseEvent) => {
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (mouseGlow) {
          gsap.to(mouseGlow, {
            x: x - 150,
            y: y - 150,
            duration: 0.35,
            ease: "power2.out"
          });
        }

        if (glassCard) {
          const cardRect = glassCard.getBoundingClientRect();
          const cardCenterX = cardRect.left + cardRect.width / 2;
          const cardCenterY = cardRect.top + cardRect.height / 2;
          const mouseXFromCard = e.clientX - cardCenterX;
          const mouseYFromCard = e.clientY - cardCenterY;

          // Compute max 8-degree rotations
          const tiltX = (mouseYFromCard / (window.innerHeight / 2)) * -8;
          const tiltY = (mouseXFromCard / (window.innerWidth / 2)) * 8;

          gsap.to(glassCard, {
            rotationX: tiltX,
            rotationY: tiltY,
            transformPerspective: 1200,
            ease: "power2.out",
            duration: 0.45
          });

          const content = glassCard.querySelector(".card-content");
          if (content) {
            gsap.to(content, {
              x: tiltY * 0.6,
              y: -tiltX * 0.6,
              ease: "power2.out",
              duration: 0.45
            });
          }

          // Compute float shadow shift opposite to rotation
          gsap.to(glassCard, {
            boxShadow: `${-tiltY * 1.5}px ${tiltX * 1.5}px 50px -15px rgba(122, 150, 54, 0.15), 0 25px 50px -12px rgba(0, 0, 0, 0.05)`,
            duration: 0.45
          });
        }
      };

      const onMouseLeave = () => {
        if (glassCard) {
          gsap.to(glassCard, {
            rotationX: 0,
            rotationY: 0,
            ease: "power3.out",
            duration: 0.65
          });
          const content = glassCard.querySelector(".card-content");
          if (content) {
            gsap.to(content, {
              x: 0,
              y: 0,
              ease: "power3.out",
              duration: 0.65
            });
          }
          gsap.to(glassCard, {
            boxShadow: "0 25px 60px -15px rgba(122, 150, 54, 0.08), 0 20px 40px -12px rgba(0, 0, 0, 0.05)",
            duration: 0.65
          });
        }
        if (mouseGlow) {
          gsap.to(mouseGlow, {
            opacity: 0,
            duration: 0.4
          });
        }
      };

      const onMouseEnter = () => {
        if (mouseGlow) {
          gsap.to(mouseGlow, {
            opacity: 0.15,
            duration: 0.25
          });
        }
      };

      container.addEventListener("mousemove", onMouseMove);
      container.addEventListener("mouseleave", onMouseLeave);
      container.addEventListener("mouseenter", onMouseEnter);

      // Register unmount cleanup for mouse events
      self.add(() => {
        container.removeEventListener("mousemove", onMouseMove);
        container.removeEventListener("mouseleave", onMouseLeave);
        container.removeEventListener("mouseenter", onMouseEnter);
      });
    }, container);

    return () => {
      ctx.revert();
      if (cleanupParticles) cleanupParticles();
    };
  }, []);

  const handleButtonMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Pull button toward cursor (magnetic hover)
    gsap.to(btn, {
      x: x * 0.35,
      y: y * 0.35,
      scale: 1.04,
      duration: 0.3,
      ease: "power2.out",
    });

    const glow = btn.querySelector(".btn-inner-glow") as HTMLSpanElement;
    if (glow) {
      gsap.to(glow, {
        x: e.clientX - rect.left - 48,
        y: e.clientY - rect.top - 48,
        opacity: 0.6,
        duration: 0.15,
      });
    }
  };

  const handleButtonMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;
    gsap.to(btn, {
      x: 0,
      y: 0,
      scale: 1,
      duration: 0.5,
      ease: "elastic.out(1.1, 0.4)",
    });

    const glow = btn.querySelector(".btn-inner-glow") as HTMLSpanElement;
    if (glow) {
      gsap.to(glow, {
        opacity: 0,
        duration: 0.4,
      });
    }
  };

  const titleText = "THE MONARCH";
  const titleWords = titleText.split(" ");

  const descLines = [
    "A limited collection of ultra-luxury estate residences",
    "soaring above Pune's elite green sanctuary. Engineered",
    "for those who command the horizon."
  ];

  return (
    <div
      ref={containerRef}
      id="discover"
      className="relative w-full h-screen bg-[#F5F7E3] flex items-center justify-center overflow-hidden [perspective:1200px]"
    >
      <style>{`
        @keyframes shine {
          0% { transform: translate3d(-150%, 0, 0) skewX(-20deg); }
          100% { transform: translate3d(250%, 0, 0) skewX(-20deg); }
        }
      `}</style>

      {/* Ambient background glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute inset-0 bg-[#F5F7E3]" />
        
        {/* Olive radial ambient glow top-left */}
        <div className="ambient-glow absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-[radial-gradient(circle,_rgba(122,150,54,0.08)_0%,_transparent_70%)] opacity-30 pointer-events-none will-change-transform" />
        
        {/* Maroon radial ambient glow bottom-right */}
        <div className="ambient-glow absolute -bottom-[15%] -right-[15%] w-[60%] h-[60%] rounded-full bg-[radial-gradient(circle,_rgba(143,38,33,0.06)_0%,_transparent_70%)] opacity-25 pointer-events-none will-change-transform" />
        
        {/* Center radial depth mask */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] rounded-full bg-[radial-gradient(circle,_rgba(245,247,227,0.7)_0%,_#F5F7E3_80%)] pointer-events-none" />
      </div>

      {/* Ambient Light Rays */}
      <div className="light-rays absolute inset-0 opacity-[0.05] pointer-events-none z-0 mix-blend-screen will-change-transform">
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
      <div className="lens-flare absolute top-[20%] left-[15%] w-[350px] h-[350px] pointer-events-none z-0 mix-blend-screen opacity-[0.07] will-change-transform">
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

      {/* Interactive Canvas Particles */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-10" />

      {/* Interactive Mouse Glow */}
      <div
        ref={glowRef}
        className="absolute w-[300px] h-[300px] rounded-full bg-[radial-gradient(circle,_rgba(122,150,54,0.18)_0%,_transparent_70%)] pointer-events-none opacity-0 mix-blend-screen z-10 will-change-transform"
      />

      {/* Pinned Morphing Image Card */}
      <div
        ref={imageWrapperRef}
        className="absolute overflow-hidden flex items-center justify-center z-20 select-none will-change-[width,height,border-radius] shadow-2xl"
        style={{ width: "90vw", height: "90vh", borderRadius: "20px" }}
      >
        <img
          ref={imageRef}
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=3840&q=95"
          alt="Luxury Architecture Pune"
          className="w-full h-full object-cover scale-[1.15] will-change-[transform,filter,opacity]"
        />
        {/* Dark overlay inside image wrapper */}
        <div ref={overlayRef} className="absolute inset-0 bg-[#1B1B1B] opacity-0 mix-blend-multiply z-10 will-change-[opacity]" />
        
        {/* Golden vignette shadow */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1B1B1B]/50 via-transparent to-[#1B1B1B]/20 z-15 pointer-events-none" />
      </div>

      {/* Premium Glass Card Container */}
      <div
        ref={glassCardRef}
        className="relative z-30 p-[1.5px] rounded-[36px] overflow-hidden bg-gradient-to-b from-[#7A9636]/30 via-white/5 to-[#8F2621]/15 shadow-[0_25px_60px_-15px_rgba(122,150,54,0.08)] opacity-0 select-none will-change-[transform,opacity,filter] max-w-[90vw] md:max-w-4xl [transform-style:preserve-3d]"
      >
        {/* Card Background glass layout */}
        <div className="bg-[#FFFFFF]/90 backdrop-blur-3xl rounded-[34.5px] p-6 sm:p-8 md:p-12 lg:p-16 text-center flex flex-col items-center relative z-20 [transform-style:preserve-3d]">
          
          {/* Shine sweep reflection */}
          <div
            ref={shineSweepRef}
            className="absolute top-0 bottom-0 left-[-150%] w-[120%] bg-gradient-to-r from-transparent via-[#7A9636]/10 to-transparent skew-x-[-22deg] pointer-events-none z-10 will-change-[left]"
          />

          <div className="card-content flex flex-col items-center w-full z-20 [transform-style:preserve-3d] will-change-transform">
            
            {/* Tagline / Subheading */}
            <span className="subheading block text-[#7A9636] font-cinzel font-bold tracking-[0.3em] text-[10px] md:text-xs uppercase mb-4 opacity-0 will-change-[transform,opacity,filter]">
              The Crown Jewel of Pune's Skyline
            </span>

            {/* Split Heading with overflow masked slide up */}
            <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-[#1B1B1B] font-bold leading-none tracking-tight mb-6 flex flex-wrap justify-center gap-x-[0.25em] gap-y-[0.1em] pointer-events-none">
              {titleWords.map((word, wordIndex) => (
                <span key={wordIndex} className="inline-block whitespace-nowrap overflow-hidden py-1.5">
                  {word.split("").map((char, charIndex) => (
                    <span key={charIndex} className="char inline-block translate-y-[100%] opacity-0 will-change-[transform,opacity]">
                      {char}
                    </span>
                  ))}
                </span>
              ))}
            </h2>

            {/* Paragraph lines revealed */}
            <div className="max-w-xl text-[#999991] font-sans font-light text-xs sm:text-sm md:text-base leading-relaxed mb-8 flex flex-col gap-y-1.5">
              {descLines.map((line, index) => (
                <span key={index} className="block overflow-hidden py-0.5">
                  <span className="desc-line inline-block translate-y-[100%] opacity-0 will-change-[transform,opacity]">
                    {line}
                  </span>
                </span>
              ))}
            </div>

            {/* Luxury Gold Button */}
            <button
              ref={buttonRef}
              onMouseMove={handleButtonMouseMove}
              onMouseLeave={handleButtonMouseLeave}
              className="luxury-button group relative px-7 py-3.5 bg-gradient-to-r from-[#8F2621] via-[#7A9636] to-[#8F2621] text-white font-sans font-bold tracking-[0.22em] text-[10px] md:text-xs uppercase rounded-full shadow-[0_0_25px_rgba(143,38,33,0.22)] hover:shadow-[0_0_45px_rgba(143,38,33,0.5)] transition-shadow duration-500 overflow-hidden outline-none cursor-pointer flex items-center justify-center select-none opacity-0"
              aria-label="Request Private Preview"
            >
              {/* Inner magnetic mouse-glow */}
              <span className="btn-inner-glow absolute w-24 h-24 rounded-full bg-white/20 blur-md pointer-events-none opacity-0" />
              
              {/* Button light reflection sweep */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/35 to-transparent skew-x-[-20deg] translate-x-[-150%] group-hover:animate-[shine_1.5s_infinite] pointer-events-none" />

              <span className="relative z-10 flex items-center">
                Request Private Preview
                <span className="relative w-4 h-4 ml-2.5 overflow-hidden flex items-center justify-center">
                  <span className="absolute transition-transform duration-300 transform translate-x-0 group-hover:translate-x-4">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                  <span className="absolute transition-transform duration-300 transform -translate-x-4 group-hover:translate-x-0">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
