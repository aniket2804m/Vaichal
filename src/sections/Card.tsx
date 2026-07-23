import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services } from "../data/Card";

gsap.registerPlugin(ScrollTrigger);

const Card = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".stack-card");

      cards.forEach((card, index) => {
        // 1. Outer card sticky scale, y-offset, brightness & opacity stack animation
        gsap.to(card, {
          scrollTrigger: {
            trigger: card,
            start: () => (window.innerWidth < 768 ? "top 70px" : "top 100px"),
            endTrigger: containerRef.current,
            end: "bottom bottom",
            scrub: 1,
          },
          scale: 0.88,
          y: () => (window.innerWidth < 768 ? -60 : -120),
          opacity: 0.5,
          filter: "brightness(0.9)",
          transformOrigin: "top center",
          ease: "power1.out",
        });

        // 2. Scroll-driven image sequence cross-fade & cinematic scale transition
        const imageElements = card.querySelectorAll<HTMLElement>(`.stack-card-img-${index}`);
        if (imageElements.length > 1) {
          const imageTl = gsap.timeline({
            scrollTrigger: {
              trigger: card,
              start: () => (window.innerWidth < 768 ? "top 70px" : "top 100px"),
              endTrigger: containerRef.current,
              end: "bottom bottom",
              scrub: 1,
            },
          });

          for (let i = 0; i < imageElements.length - 1; i++) {
            imageTl
              .to(imageElements[i], { opacity: 0, scale: 1.05, ease: "none" })
              .fromTo(
                imageElements[i + 1],
                { opacity: 0, scale: 1.1 },
                { opacity: 1, scale: 1, ease: "none" },
                "<"
              );
          }
        }
      });

      ScrollTrigger.refresh();
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative bg-[#F5F7E3] py-12 sm:py-20 border-t border-[#999991]/25 min-h-screen text-[#1B1B1B] font-sans selection:bg-[#7A9636] selection:text-white"
    >

      {/* Cards Stack Container */}
      <div className="relative flex flex-col items-center gap-12 md:gap-20 max-w-7xl mx-auto pb-40">
        {services.map((service, index) => {
          const serviceImages =
            service.images && service.images.length > 0
              ? service.images
              : service.image
              ? [service.image]
              : [];

          return (
            <div
              key={index}
              className="stack-card sticky w-[94%] sm:w-[92%] max-w-6xl top-[70px] md:top-[100px]"
              style={{
                zIndex: index + 1,
              }}
            >
              <div className="group relative w-full h-[70vh] min-h-[480px] max-h-[750px] bg-white border border-[#999991]/30 rounded-3xl overflow-hidden shadow-[0_15px_45px_rgba(0,0,0,0.08)] hover:border-[#8F2621] hover:shadow-[0_25px_60px_rgba(143,38,33,0.18)] transition-all duration-500 backdrop-blur-md">
                {/* Full Card Image Stack */}
                <div className="relative w-full h-full overflow-hidden">
                  {serviceImages.map((imgUrl, imgIndex) => (
                    <img
                      key={imgIndex}
                      src={imgUrl}
                      alt={`Vaichal project view ${index + 1} - ${imgIndex + 1}`}
                      className={`stack-card-img-${index} absolute inset-0 w-full h-full object-cover will-change-transform`}
                      style={{
                        opacity: imgIndex === 0 ? 1 : 0,
                        zIndex: serviceImages.length - imgIndex,
                      }}
                    />
                  ))}
                  
                  {/* Premium Brand Gradient Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1B1B1B]/60 via-transparent to-[#1B1B1B]/20 pointer-events-none z-20" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#8F2621]/15 via-transparent to-[#7A9636]/10 pointer-events-none z-20" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Card;
