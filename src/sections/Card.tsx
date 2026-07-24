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

      // Animate cards as soon as section enters view from HeroMorph
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 90%", // Starts immediately as HeroMorph scrolls into Card
          end: "top 20%",
          scrub: 0.5,
        },
      });

      tl.fromTo(
        cards,
        {
          y: (i) => 25 + i * 5,
          scale: 0.96,
        },
        {
          y: 0,
          scale: 1,
          stagger: 0.04,
          duration: 0.5,
          ease: "power2.out",
        },
        0
      ).fromTo(
        images,
        { scale: 1.08 },
        { scale: 1, duration: 0.5, ease: "power1.out" },
        0
      );

      ScrollTrigger.refresh();
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative bg-[#F5F7E3] w-full min-h-screen h-screen py-6 md:py-10 border-t border-[#999991]/25 text-[#1B1B1B] font-sans selection:bg-[#7A9636] selection:text-white flex flex-col justify-center items-center overflow-hidden"
    >
      {/* Background Ambient Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-[#7A9636]/10 rounded-full blur-[130px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#8F2621]/8 rounded-full blur-[130px]" />
      </div>

      <div className="relative z-10 w-full max-w-7xl px-3 sm:px-6 flex flex-col h-full justify-center items-center py-4">
        {/* 5-Images Visible on 1 Screen Container (Pure Images, Visible immediately from HeroMorph) */}
        <div
          ref={cardsRef}
          className="w-full flex-1 min-h-[420px] max-h-[680px] my-auto flex flex-col lg:flex-row gap-3 sm:gap-4 items-stretch justify-center"
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
                {/* Full Pure Image */}
                <div className="relative w-full h-full overflow-hidden bg-[#111111]">
                  <img
                    src={imgUrl}
                    alt={`Showcase view ${index + 1}`}
                    className={`showcase-full-img absolute inset-0 w-full h-full object-cover object-center will-change-transform transition-all duration-700 ease-out ${
                      isSelected
                        ? "brightness-110 contrast-[1.06] saturate-105 scale-105"
                        : "brightness-75 contrast-90 saturate-90 group-hover:brightness-110 group-hover:contrast-[1.06] group-hover:saturate-105 group-hover:scale-105"
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Minimal Navigation Indicator Dots */}
        <div className="flex justify-center items-center gap-2 pt-4 pb-2">
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
