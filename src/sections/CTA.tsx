import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap-init";
import { useNavigate } from "react-router-dom";

export default function CTA() {
  const ctaRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 78%",
            toggleActions: "play none none none",
          },
        }
      );
    }, ctaRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={ctaRef}
      id="contact"
      className="w-full bg-[#F5F7E3] py-10 px-6 border-b border-[#999991]/25 relative overflow-hidden"
    >
      {/* Decorative ambient gold glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#7A9636]/5 blur-[140px] pointer-events-none rounded-full" />

      <div
        ref={contentRef}
        className="max-w-4xl mx-auto text-center border border-[#999991]/30 bg-white p-12 md:p-20 relative rounded-[16px] shadow-sm"
      >
        <span className="text-[#7A9636] font-sans font-semibold tracking-[0.25em] text-xs uppercase mb-4 block">
          Exclusive Invitation
        </span>
        
        <h2 className="text-4xl md:text-6xl font-serif text-[#8F2621] font-bold leading-tight tracking-tight mb-6">
          Begin Your Private Journey
        </h2>
        
        <p className="max-w-xl mx-auto text-[#999991] font-sans font-light text-sm md:text-base leading-relaxed mb-10">
          Private tours of Pune’s finest residential landmarks are available by appointment only. Enter your details to schedule a bespoke consultation with our client relation curators.
        </p>

        <div>
          <button
            onClick={() => navigate("/contact")}
            className="group relative inline-flex items-center justify-center overflow-hidden px-10 py-4 bg-[#8F2621] text-white transition duration-300 text-xs font-semibold uppercase tracking-widest rounded-[10px] hover:bg-[#7A9636] border-none cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
          >
            Request Private Viewing
          </button>
        </div>
      </div>
    </section>
  );
}
