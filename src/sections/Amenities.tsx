import { useRef } from "react";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import {
  Dumbbell,
  Trees,
  ShieldCheck,
  Zap,
  Gamepad2,
  Baby,
  Users,
  Sun,
  Car,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

/**
 * Amenities.tsx
 * ---------------------------------------------------------------
 * Real-estate "Amenities" section with scroll-triggered reveal
 * animations for the heading, the divider, and every amenity card.
 *
 * Dependencies (install if not already present):
 *   npm install framer-motion lucide-react
 *
 * Tailwind CSS is assumed to be configured in the project.
 * ---------------------------------------------------------------
 */

interface Amenity {
  icon: LucideIcon;
  title: string;
  description: string;
}

const amenities: Amenity[] = [
  
  {
    icon: Dumbbell,
    title: "Modern Gymnasium",
    description: "Fully equipped fitness center with trainers on call.",
  },
  {
    icon: Trees,
    title: "Gardens",
    description: "Green open spaces designed for walks and relaxation.",
  },
  {
    icon: ShieldCheck,
    title: "24x7 Security",
    description: "CCTV surveillance and trained guards at every gate.",
  },
  {
    icon: Zap,
    title: "Power Backup",
    description: "Uninterrupted backup for common areas and lifts.",
  },
  {
    icon: Gamepad2,
    title: "Indoor Games Room",
    description: "An inviting indoor leisure space designed for recreation, relaxation, and community engagement.",
  },
  {
    icon: Baby,
    title: "Children's Play Area",
    description: "Safe, cushioned play zone for the little ones.",
  },
  {
    icon: Users,
    title: "Clubhouse",
    description: "A dedicated space for community events and gatherings.",
  },
  {
    icon: Sun,
    title: "Yoga & Meditation Deck",
    description: "A calm, open-air deck to start the day mindfully.",
  },
  {
    icon: Car,
    title: "Ample Parking",
    description: "Covered parking with included.",
  },
  {
    icon: Sparkles,
    title: "Amphitheater",
    description: "An open-air venue for festivals and celebrations.",
  },
];

// ---------- Animation variants ----------

const headingVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const gridVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.15,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 36, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Amenities() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const glowY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#F5F7E3] py-10 px-6 sm:px-10 lg:px-16 border-b border-[#999991]/25"
    >
      {/* ambient background glow that drifts on scroll */}
      <motion.div
        style={{ y: glowY }}
        className="pointer-events-none absolute -top-40 right-[-10%] h-[520px] w-[520px] rounded-full bg-[#7A9636]/5 blur-[120px]"
      />
      <motion.div
        style={{ y: glowY }}
        className="pointer-events-none absolute bottom-[-15%] left-[-10%] h-[420px] w-[420px] rounded-full bg-[#8F2621]/3 blur-[110px]"
      />

      {/* faint architectural grid lines, this section's signature texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#999991 1px, transparent 1px), linear-gradient(90deg, #999991 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        {/* ---------- Heading ---------- */}
       <motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.6 }}
  variants={headingVariants}
  className="mb-16 max-w-2xl mx-auto text-center"
>
  <span className="mb-4 block font-medium tracking-[0.25em] text-[#7A9636] text-lg uppercase">
    Life Here
  </span>

  <h2 className="font-serif text-4xl sm:text-5xl leading-tight text-[#8F2621] font-bold flex flex-col">
  <span>Amenities built around</span>
  <span className="mt-4 text-[#7A9636]">
    everyday living
  </span>
</h2>

  {/* maroon divider */}
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

  <motion.p
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.6 }}
    transition={{ duration: 0.6, delay: 0.35 }}
    className="mt-6 text-[#999991] text-base sm:text-lg font-light leading-relaxed"
  >
    Every space in this community is designed with intention — from
    the way light falls in the garden to the quiet hour on the yoga
    deck. Here is everything that comes with home.
  </motion.p>
</motion.div>

        {/* ---------- Amenities grid ---------- */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={gridVariants}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {amenities.map(({ icon: Icon, title, description }) => (
            <motion.div
              key={title}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="group relative rounded-2xl border border-[#999991]/30 bg-white p-6 transition-colors duration-300 hover:border-[#8F2621]/40 shadow-sm hover:shadow-md"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#7A9636]/10 text-[#7A9636] transition-colors duration-300 group-hover:bg-[#7A9636] group-hover:text-white">
                <Icon size={22} strokeWidth={1.75} />
              </div>
              <h3 className="mb-2 font-serif text-lg text-[#1B1B1B] font-bold">
                {title}
              </h3>
              <p className="text-sm leading-relaxed text-[#999991] font-light">
                {description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}