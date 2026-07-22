import { useState, useEffect } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { Quote, Star, MapPin } from "lucide-react";

/**
 * ClientTestimonials.tsx
 * ---------------------------------------------------------------
 * Real-estate "Client Testimonials" section.
 *
 * Layout:
 *   1. A large "spotlight" testimonial that crossfades between
 *      reviews, switched via dot controls.
 *   2. An infinite auto-scrolling marquee of every testimonial as
 *      compact cards — pauses on hover, each card lifts/tilts on
 *      hover.
 *
 * Dependencies (install if not already present):
 *   npm install framer-motion lucide-react
 *
 * Replace `avatar` with real client photos and edit the copy.
 * ---------------------------------------------------------------
 */

interface Testimonial {
  id: string;
  name: string;
  location: string;
  quote: string;
  rating: number; // 1-5
  avatar: string;
  project: string;
}

const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Rohan Deshmukh",
    location: "Pune, Maharashtra",
    project: "2BHK, Skyline Residency",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop",
    quote:
      "From the site visit to the final handover, the team made everything feel effortless. The finish quality matched exactly what was promised.",
  },
  {
    id: "t2",
    name: "Sneha Patil",
    location: "Mumbai, Maharashtra",
    project: "3BHK, Ocean Crest",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop",
    quote:
      "We compared five projects before deciding. The transparency around pricing and construction timelines is what won us over.",
  },
  {
    id: "t3",
    name: "Arjun Mehta",
    location: "Nagpur, Maharashtra",
    project: "Villa, Green Meadows",
    rating: 4,
    avatar:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=300&auto=format&fit=crop",
    quote:
      "The virtual tour saved us three site visits. When we finally walked in, the space felt exactly like it looked online.",
  },
  {
    id: "t4",
    name: "Priya Kulkarni",
    location: "Nashik, Maharashtra",
    project: "1BHK, Willow Park",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=300&auto=format&fit=crop",
    quote:
      "Every question was answered within the day. Buying our first home never felt this well-guided.",
  },
  {
    id: "t5",
    name: "Kunal Shah",
    location: "Thane, Maharashtra",
    project: "2BHK, Skyline Residency",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=300&auto=format&fit=crop",
    quote:
      "The amenities are genuinely used, not just brochure promises. The clubhouse and gardens are the reason we chose this over other options.",
  },
  {
    id: "t6",
    name: "Ananya Joshi",
    location: "Pune, Maharashtra",
    project: "Villa, Green Meadows",
    rating: 4,
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=300&auto=format&fit=crop",
    quote:
      "Paperwork and possession happened exactly on the dates we were given. No surprises, no delays.",
  },
];

const headingVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};



function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: i * 0.06 }}
        >
          <Star
            size={16}
            className={i < rating ? "fill-[#7A9636] text-[#7A9636]" : "text-[#999991]/30"}
          />
        </motion.span>
      ))}
    </div>
  );
}

export default function ClientTestimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = testimonials[activeIndex];
  const marqueeItems = [...testimonials, ...testimonials]; // duplicated for seamless loop

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) =>
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
    }, 2000);

    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <section className="relative overflow-hidden bg-[#F5F7E3] py-10 border-b border-[#999991]/25">
      <div className="pointer-events-none absolute -top-32 right-[-8%] h-[460px] w-[460px] rounded-full bg-[#7A9636]/5 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-[-15%] left-[-10%] h-[420px] w-[420px] rounded-full bg-[#8F2621]/3 blur-[110px]" />

      <div className="relative mx-auto max-w-6xl px-6 sm:px-10 lg:px-16">
        {/* ---------- Heading ---------- */}
        <motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.6 }}
  variants={headingVariants}
  className="mb-14 max-w-2xl mx-auto text-center"
>
  <span className="mb-4 block font-medium tracking-[0.25em] text-[#7A9636] text-lg uppercase">
    What Homeowners Say
  </span>

  <h2 className="font-serif text-4xl sm:text-5xl leading-tight text-[#8F2621] font-bold">
    Trusted by families
    <br />
    <span className="text-[#7A9636]">across Maharashtra</span>
  </h2>

  <motion.div
    initial={{ scaleX: 0 }}
    whileInView={{ scaleX: 1 }}
    viewport={{ once: true, amount: 0.6 }}
    transition={{
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
      delay: 0.2,
    }}
    style={{ transformOrigin: "left" }}
    className="mt-6 h-[2px] w-24 bg-[#8F2621] mx-auto"
  />
</motion.div>

        {/* ---------- Spotlight testimonial ---------- */}
        <motion.div
  onMouseEnter={() => setIsHovered(true)}
  onMouseLeave={() => setIsHovered(false)}
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.2 }}
  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
  className="relative overflow-hidden rounded-3xl border border-[#999991]/30 bg-white px-8 py-10 sm:px-14 sm:py-14 shadow-sm"
>
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -8 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6 text-[#8F2621]/70"
          >
            <Quote size={40} strokeWidth={1.5} />
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="font-serif text-xl sm:text-2xl leading-relaxed text-[#1B1B1B]">
                "{active.quote}"
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <img
                    src={active.avatar}
                    alt={active.name}
                    className="h-14 w-14 rounded-full object-cover ring-2 ring-[#7A9636]/40"
                  />
                  <div>
                    <p className="text-[#1B1B1B] font-bold">{active.name}</p>
                    <p className="flex items-center gap-1 text-xs text-[#999991]">
                      <MapPin size={12} /> {active.location} · {active.project}
                    </p>
                  </div>
                </div>
                <StarRow rating={active.rating} />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* dot controls */}
          <div className="mt-10 flex gap-2">
            {testimonials.map((t, i) => (
              <button
                key={t.id}
                onClick={() => setActiveIndex(i)}
                aria-label={`Show testimonial from ${t.name}`}
                className="group relative h-2 rounded-full bg-[#999991]/30 transition-all duration-300"
                style={{ width: i === activeIndex ? 28 : 8 }}
              >
                {i === activeIndex && (
                  <motion.span
                    layoutId="activeDot"
                    className="absolute inset-0 rounded-full bg-[#8F2621]"
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  />
                )}
              </button>
            ))}
          </div>
        </motion.div>

        {/* ---------- Marquee of all testimonials ---------- */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="group/marquee relative mt-14 overflow-hidden"
        >
          {/* edge fade masks */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#F5F7E3] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#F5F7E3] to-transparent" />

          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
            className="flex w-max gap-5 group-hover/marquee:[animation-play-state:paused] [&:hover]:pause"
            style={{ willChange: "transform" }}
            whileHover={{ transition: { duration: 0 } }}
          >
            {marqueeItems.map((t, i) => (
              <motion.div
                key={`${t.id}-${i}`}
                whileHover={{ y: -8, scale: 1.02, rotate: -0.5 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => setActiveIndex(i % testimonials.length)}
                className="w-72 shrink-0 cursor-pointer rounded-2xl border border-[#999991]/30 bg-white p-6 transition-colors duration-300 hover:border-[#8F2621]/45 hover:shadow-md"
              >
                <div className="mb-4 flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-bold text-[#1B1B1B]">{t.name}</p>
                    <p className="text-xs text-[#999991]">{t.location}</p>
                  </div>
                </div>
                <p className="line-clamp-4 text-sm leading-relaxed text-[#999991] font-light">
                  {t.quote}
                </p>
                <div className="mt-4">
                  <StarRow rating={t.rating} />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}