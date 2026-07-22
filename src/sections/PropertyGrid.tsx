import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap-init";
import PropertyCard from "./PropertyCard";
import type { PropertyData } from "./PropertyCard";

const LUXURY_PROPERTIES: PropertyData[] = [
  {
    id: "prop-1",
    title: "Aurelia Private Manor",
    location: "Koregaon Park, Pune",
    price: "₹18.5 Cr",
    type: "Garden Villa",
    beds: 5,
    baths: 6,
    sqft: "7,800",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "prop-2",
    title: "The Sovereign Penthouse",
    location: "Baner Hill, Pune",
    price: "₹12.4 Cr",
    type: "Sky Mansion",
    beds: 4,
    baths: 5,
    sqft: "6,200",
    image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "prop-3",
    title: "Verona Valleys Estate",
    location: "Kalyani Nagar, Pune",
    price: "₹24.0 Cr",
    type: "Presidential Estate",
    beds: 6,
    baths: 7,
    sqft: "11,500",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "prop-4",
    title: "Midas Crest Skyline",
    location: "Senapati Bapat Road, Pune",
    price: "₹15.2 Cr",
    type: "Duplex Penthouse",
    beds: 4,
    baths: 5,
    sqft: "6,800",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "prop-5",
    title: "The Imperial Sanctuary",
    location: "NIBM Road, Pune",
    price: "₹9.8 Cr",
    type: "Luxury Bungalow",
    beds: 4,
    baths: 4,
    sqft: "5,400",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "prop-6",
    title: "Caspian Waterfront Villa",
    location: "Mulshi Lake, Pune",
    price: "₹22.5 Cr",
    type: "Lakefront Villa",
    beds: 5,
    baths: 6,
    sqft: "9,200",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
  },
];

export default function PropertyGrid() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const cards = gsap.utils.toArray<HTMLElement>(".property-card");
    if (cards.length === 0) return;

    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      cards.forEach((card, i) => {
        if (isMobile) {
          // On mobile, animate directly on mount to avoid ScrollTrigger layout shift bugs
          gsap.from(card, {
            opacity: 0,
            y: 30,
            duration: 0.6,
            delay: i * 0.1,
            ease: "power2.out",
          });
        } else {
          // On desktop, trigger on scroll with column staggers
          gsap.from(card, {
            opacity: 0,
            y: 60,
            scale: 0.95,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none none",
            },
            delay: (i % 3) * 0.12,
          });
        }
      });
    }, gridRef);

    // Refresh GSAP ScrollTrigger after images load to prevent offset triggers
    const timer = setTimeout(() => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        ScrollTrigger.refresh();
      });
    }, 1200);

    return () => {
      ctx.revert();
      clearTimeout(timer);
    };
  }, []);

  return (
    <section ref={gridRef} className="w-full bg-[#F5F7E3] text-[#1B1B1B] py-24 px-6 relative border-b border-[#999991]/25">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
       <div className="mb-16">
  <div className="max-w-xl mx-auto text-center">
    <span className="block mb-3 text-lg font-sans font-semibold tracking-[0.25em] uppercase text-[#7A9636]">
      Curated Masterpieces
    </span>

    <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#8F2621]">
      The Private Registry
    </h2>

    <p className="mt-4 text-[#999991] font-sans font-light text-sm">
      Discover a handpicked collection of iconic estates, designed to
      transcend traditional luxury and provide standard-setting living
      spaces.
    </p>
  </div>
</div>

        {/* 3-Column Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {LUXURY_PROPERTIES.map((prop) => (
            <PropertyCard key={prop.id} property={prop} />
          ))}
        </div>
      </div>
    </section>
  );
}
