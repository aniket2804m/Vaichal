import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap-init";

interface ParallaxBlockProps {
  image: string;
  title: string;
  subtitle: string;
  description: string;
  reversed?: boolean;
}

function ParallaxBlock({ image, title, subtitle, description, reversed = false }: ParallaxBlockProps) {
  const blockRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Parallax effect on image
      gsap.to(imageRef.current, {
        yPercent: -15,
        ease: "none",
        scrollTrigger: {
          trigger: blockRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Slide-in effect for the content side
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: blockRef.current,
            start: "top 70%",
          },
        }
      );
    }, blockRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={blockRef}
      className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-20 py-20 px-6 max-w-7xl mx-auto overflow-hidden ${
        reversed ? "lg:flex-row-reverse" : ""
      }`}
    >
      {/* Image container with fixed aspect ratio, overflow hidden, and rounded corners */}
      <div className="w-full lg:w-1/2 aspect-[4/3] md:aspect-[16/10] overflow-hidden border border-[#999991]/20 rounded-[16px] shadow-sm relative">
        <img
          ref={imageRef}
          src={image}
          alt={title}
          className="w-full h-[120%] object-cover absolute top-0 left-0"
        />
        <div className="absolute inset-0 bg-black/30 pointer-events-none" />
      </div>

      {/* Text Container */}
      <div ref={textRef} className="w-full lg:w-1/2 flex flex-col justify-center">
        <span className="text-[#7A9636] font-sans font-semibold tracking-[0.25em] text-xs uppercase mb-3 block">
          {subtitle}
        </span>
        <h3 className="text-3xl md:text-5xl font-serif text-[#8F2621] font-bold leading-tight tracking-tight mb-6">
          {title}
        </h3>
        <p className="text-[#999991] font-sans font-light text-sm md:text-base leading-relaxed mb-8">
          {description}
        </p>
        <div>
          <button className="group relative inline-flex items-center justify-center overflow-hidden px-6 py-3 border border-[#8F2621] text-[#8F2621] hover:text-white transition duration-500 text-xs font-semibold uppercase tracking-widest bg-transparent rounded-[10px] cursor-pointer hover:scale-[1.02] active:scale-[0.98]">
            <span className="absolute inset-0 w-full h-full bg-[#8F2621] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-[0.16,1,0.3,1] -z-10" />
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Parallax() {
  return (
    <section className="w-full bg-[#F5F7E3] text-[#1B1B1B] py-20 border-b border-[#999991]/25 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(122, 150, 54, 0.05),transparent_65%)] pointer-events-none" />

      {/* Block 1 */}
      <ParallaxBlock
        image="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2000&q=80"
        subtitle="Unrivaled Locations"
        title="Commanding Views of Pune's Valleys"
        description="Nestled atop private heights in Baner and Koregaon Park, our residences offer unobstructed, breathtaking vistas of the pristine river valley and skyline. Seamlessly combining city conveniences with the tranquility of isolated hillsides."
      />

      {/* Block 2 */}
      <ParallaxBlock
        image="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2000&q=80"
        subtitle="Artisan Craftsmanship"
        title="Individually Tailored To Perfection"
        description="Every home is designed as a singular art piece. From handpicked Italian marble block-matching to solid teak wood panelling and smart integration systems, we curate finishes that stand the test of generations."
        reversed={true}
      />
    </section>
  );
}
