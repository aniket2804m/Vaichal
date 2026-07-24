import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { service } from "../data/Card";

gsap.registerPlugin(ScrollTrigger);

const Card = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number>(2); // Default center card focused

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".showcase-card");
      const images = gsap.utils.toArray<HTMLElement>(".showcase-full-img");

      // GSAP ScrollTrigger timeline pinned to viewport
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          start: "top top",
          end: "+=1200",
          scrub: 1,
          anticipatePin: 1,
        },
      });

      // 1. Header entrance animation
      tl.fromTo(
        ".showcase-header",
        { opacity: 0, y: -25, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "power2.out" }
      );

      // 2. 5 Cards Staggered Reveal onto 1 Screen
      tl.fromTo(
        cards,
        {
          y: (i) => (window.innerWidth < 768 ? 50 + i * 10 : 100 + i * 15),
          opacity: 0,
          scale: 0.85,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.1,
          duration: 1.3,
          ease: "power3.out",
        },
        "-=0.2"
      );

      // 3. Full Image Zoom & Parallax during scroll
      tl.fromTo(
        images,
        { scale: 1.2 },
        { scale: 1, stagger: 0.08, duration: 1.3, ease: "power1.out" },
        "<"
      );

      ScrollTrigger.refresh();
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative bg-[#F5F7E3] w-full min-h-screen h-screen py-4 md:py-8 border-t border-[#999991]/25 text-[#1B1B1B] font-sans selection:bg-[#7A9636] selection:text-white flex flex-col justify-between items-center overflow-hidden"
    >
      {/* Background Ambient Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-[#7A9636]/10 rounded-full blur-[130px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#8F2621]/8 rounded-full blur-[130px]" />
      </div>

      <div className="relative z-10 w-full max-w-7xl px-3 sm:px-6 flex flex-col h-full justify-between py-2 md:py-4">
        {/* Header */}
        <div className="showcase-header text-center max-w-3xl mx-auto pt-2 pb-1 sm:pb-3">
          {/* <span className="inline-flex items-center gap-2 px-3 py-0.5 sm:py-1 rounded-full bg-[#8F2621]/10 text-[#8F2621] text-[11px] sm:text-xs font-semibold tracking-wider uppercase border border-[#8F2621]/20 backdrop-blur-sm mb-1 sm:mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8F2621] animate-pulse" />
            Signature Gallery
          </span> */}
          <h2 className="text-xl pt-10 sm:text-3xl md:text-4xl font-serif font-bold text-[#1B1B1B] tracking-tight">
            Architectural Excellence in Motion
          </h2>
          <p className="text-[11px] sm:text-xs md:text-sm text-[#555550] mt-0.5 font-medium">
            5 Showcase images on 1 screen — Hover or tap to reveal full clarity
          </p>
        </div>

        {/* 5-Images Visible on 1 Screen Container */}
        <div
          ref={cardsRef}
          className="w-full flex-1 min-h-[350px] max-h-[600px] my-auto flex flex-col lg:flex-row gap-2.5 sm:gap-3.5 items-stretch justify-center"
        >
          {service.map((item, index) => {
            const isSelected = activeIndex === index;
            const imgUrl = item.images && item.images[0] ? item.images[0] : "";

            return (
              <div
                key={item.id || index}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => setActiveIndex(index)}
                className={`showcase-card group relative rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer border transition-all duration-500 ease-out flex ${
                  isSelected
                    ? "flex-[3.5] lg:flex-[4] border-[#8F2621] shadow-[0_25px_60px_rgba(143,38,33,0.3)] ring-2 ring-[#8F2621]/40"
                    : "flex-[1] lg:flex-[0.85] border-[#999991]/35 shadow-md hover:border-[#8F2621] hover:flex-[1.8] lg:hover:flex-[2.5]"
                }`}
                style={{
                  willChange: "flex, transform",
                }}
              >
                {/* Full Card Image */}
                <div className="relative w-full h-full overflow-hidden bg-[#111111]">
                  {/* Image with High Brightness & Sharp Clarity on Hover */}
                  <img
                    src={imgUrl}
                    alt={`Vaichal showcase ${item.title}`}
                    className={`showcase-full-img absolute inset-0 w-full h-full object-cover object-center will-change-transform transition-all duration-700 ease-out ${
                      isSelected
                        ? "brightness-110 contrast-[1.06] saturate-105 scale-105"
                        : "brightness-75 contrast-90 saturate-90 group-hover:brightness-110 group-hover:contrast-[1.06] group-hover:saturate-105 group-hover:scale-105"
                    }`}
                  />

                  {/* Soft Light Overlay - Reduces opacity on hover for ultra bright & clear view */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none z-10 transition-opacity duration-500 ${
                      isSelected ? "opacity-35" : "opacity-75 group-hover:opacity-35"
                    }`}
                  />

                  {/* Top Badge: Card Number & Category */}
                  {/* <div className="absolute top-2.5 sm:top-3 left-2.5 sm:left-3 right-2.5 sm:right-3 z-20 flex justify-between items-center pointer-events-none">
                    <span className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/30 text-white font-mono text-xs font-bold shadow-md">
                      0{index + 1}
                    </span>
                    <span
                      className={`text-[10px] sm:text-xs px-2.5 py-0.5 rounded-full bg-black/40 backdrop-blur-md text-white font-medium border border-white/20 transition-all duration-300 ${
                        isSelected ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0"
                      }`}
                    >
                      {item.category}
                    </span>
                  </div> */}

                  {/* Bottom Info Details with Clear Text Shadow */}
                  <div className="absolute bottom-0 inset-x-0 p-3 sm:p-5 z-20 flex flex-col justify-end text-white pointer-events-none">
                    {/* <span
                      className={`text-[10px] sm:text-[11px] uppercase tracking-wider text-[#C9A35D] font-bold drop-shadow-md transition-opacity duration-300 ${
                        isSelected ? "opacity-100" : "opacity-80 group-hover:opacity-100"
                      }`}
                    >
                      {item.subtitle}
                    </span> */}
                    {/* <h3 className="text-sm sm:text-lg md:text-xl font-bold font-serif leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                      {item.title}
                    </h3> */}

                    {/* Smooth Expand Detail on Active/Hover */}
                    <div
                      className={`overflow-hidden transition-all duration-500 ease-in-out ${
                        isSelected
                          ? "max-h-16 opacity-100 mt-1 sm:mt-2"
                          : "max-h-0 opacity-0 group-hover:max-h-16 group-hover:opacity-100 group-hover:mt-1 sm:group-hover:mt-2"
                      }`}
                    >
                      {/* <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold text-white pt-0.5 drop-shadow-md">
                        <span>Explore Space</span>
                        <svg
                          className="w-3.5 h-3.5 text-[#C9A35D] transition-transform duration-300 group-hover:translate-x-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation Indicator Dots */}
        <div className="flex justify-center items-center gap-2 pt-1 pb-2">
          {service.map((_, dotIdx) => (
            <button
              key={dotIdx}
              onClick={() => setActiveIndex(dotIdx)}
              aria-label={`View image ${dotIdx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIndex === dotIdx
                  ? "w-8 bg-[#8F2621]"
                  : "w-2 bg-[#999991]/40 hover:bg-[#7A9636]"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Card;
