import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "../lib/gsap-init";

interface StatItemProps {
  target: number;
  suffix: string;
  prefix?: string;
  label: string;
}

function StatItem({ target, suffix, prefix = "", label }: StatItemProps) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const trigger = elementRef.current;
    if (!trigger) return;

    const counterObj = { value: 0 };
    const st = ScrollTrigger.create({
      trigger: trigger,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(counterObj, {
          value: target,
          duration: 2.5,
          ease: "power2.out",
          onUpdate: () => {
            setCount(Math.floor(counterObj.value));
          },
        });
      },
    });

    return () => {
      st.kill();
    };
  }, [target]);

  return (
    <div
      ref={elementRef}
      className="flex flex-col items-center justify-center p-8 md:p-10 border border-[#999991]/30 bg-white hover:border-[#8F2621] rounded-[16px] shadow-sm hover:shadow-md transition-all duration-500 group relative overflow-hidden"
    >
      <span className="text-5xl md:text-7xl font-serif font-bold text-[#8F2621] tracking-tight">
        {prefix}
        {count}
        {suffix}
      </span>
      <span className="mt-3 text-xs md:text-sm font-sans font-medium uppercase tracking-[0.25em] text-[#999991] group-hover:text-[#1B1B1B] transition-colors duration-300 text-center">
        {label}
      </span>
    </div>
  );
}

export default function Stats() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const items = sectionRef.current?.querySelectorAll(".stat-entry");
    if (!items || items.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        items,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#F5F7E3] text-[#1B1B1B] py-24 px-6 border-b border-[#999991]/25 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(122,150,54,0.05),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section title */}
        <div className="text-center mb-16 stat-entry">
          <span className="text-[#7A9636] font-sans font-semibold tracking-[0.25em] text-lg uppercase mb-3 block">
            Proven Excellence
          </span>
          <h2 className="text-3xl mb-6 md:text-5xl font-serif text-[#8F2621] font-bold">
            By The Numbers
          </h2>
          <p className="mt-4 max-6w-lg mx-auto text-sm text-[#999991] font-sans font-light">
            Providing high-return architectural marvels and unparalleled spaces across premium micro-markets.
          </p>
        </div>

        {/* Counter Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 stat-entry">
          <StatItem target={7500} prefix="₹" suffix="+" label="Sales Portfolio (Cr)" />
          <StatItem target={18} suffix="+" label="Elite Projects" />
          <StatItem target={1200} suffix="+" label="Happy Families" />
          <StatItem target={100} suffix="%" label="On-Time Handover" />
        </div>
      </div>
    </section>
  );
}
