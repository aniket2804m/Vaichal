import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { ChevronDown, Trophy, Award as AwardIcon, ShieldCheck, Star } from "lucide-react";

import img from "../../assets/images/Award.png";
// Types

interface AwardRow {
  category: string;
  project: string;
  year: number;
}

interface AwardGroup {
  title: string;
  subtitle?: string;
  icon: React.ElementType;
  rows: AwardRow[];
}

// ------------------------------------------------------------------
// Data — lifted straight from the current table, grouped
// ------------------------------------------------------------------
const awardGroups: AwardGroup[] = [
  {
    title: "Architects, Engineers & Surveyors Association (AESA)",
    icon: AwardIcon,
    rows: [
      { category: "Non Residential Category", project: "Bilcare Ltd., Rajgurunagar", year: 2008 },
      { category: "Landscape Works", project: "Tata Consultancy Services, Hinjewadi", year: 2014 },
      { category: "Institutional Building", project: "Avasara Leadership Institute, Lavale", year: 2016 },
      { category: "Landscape Works", project: "Central Chinmay Mission Trust, Kolwan", year: 2018 },
    ],
  },
  {
    title: "Builders Association of India (BAI)",
    subtitle: "Well Built Structure",
    icon: Trophy,
    rows: [
      { category: "Industrial", project: "High Power Engineering", year: 1999 },
      { category: "Institutional", project: "N.S. Dixit Foundation", year: 2001 },
      { category: "Residential", project: "Dr. Koparkar Bungalow", year: 2005 },
      { category: "Industrial", project: "Kaeser Compressors Pvt. Ltd.", year: 2010 },
      { category: "Residential", project: "KalpaVruksha", year: 2018 },
      { category: "Landscape", project: "Fomento Resorts and Hotels Ltd.", year: 2021 },
      { category: "Landscape", project: "Bluegrass Business Park", year: 2024 },
    ],
  },
  {
    title: "PCERF – Safety Award",
    subtitle: "Pune Construction Engineering Research Foundation",
    icon: ShieldCheck,
    rows: [
      { category: "Silver Award", project: "Kumar Princetown", year: 2022 },
      { category: "Golden Award", project: "Birla Temple", year: 2024 },
    ],
  },
  {
    title: "Other Appreciation Awards",
    icon: Star,
    rows: [
      { category: "HSE Appreciation Award", project: "Lavasa Corporation, Lavale, Pune", year: 2010 },
      { category: "HSE Appreciation Award", project: "Tata Consultancy Services, Hinjewadi, Pune", year: 2013 },
      { category: "HSE Appreciation Award", project: "K Raheja Corporation | Gera Commerzone, Pune", year: 2020 },
      { category: "HSE Appreciation Award", project: "Brookfield Properties | Bluegrass Business Park, Pune", year: 2024 },
      { category: "Safety Excellence Award", project: "Godrej KP, Pune", year: 2025 },
      { category: "Award for Quality & Speed", project: "Kirloskar Brothers Ltd.", year: 2013 },
      { category: "Award by Pune Municipal Corporation for Best Garden", project: "Ascendas IT Park Pvt. Ltd., Hinjewadi, Pune", year: 2015 },
    ],
  },
];

const totalAwards = awardGroups.reduce((sum, g) => sum + g.rows.length, 0);

// ------------------------------------------------------------------
// Animation variants
// ------------------------------------------------------------------
const heroVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

const groupVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

const rowVariants: Variants = {
  hidden: { opacity: 0, x: -12 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, delay: i * 0.05, ease: "easeOut" },
  }),
};

// ------------------------------------------------------------------
// Component
// ------------------------------------------------------------------
export default function Awards() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <section className="relative overflow-hidden bg-[#F5F7E3] py-24 px-6 sm:px-10">
      {/* ambient glow blobs */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-[#7A9636]/10 blur-3xl"
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-[#8F2621]/5 blur-3xl"
        animate={{ scale: [1.15, 1, 1.15], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto max-w-6xl">
        {/* ---------- Hero ---------- */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          custom={0}
          variants={heroVariants}
          className="mb-4 flex flex-wrap items-end justify-between gap-6"
        >
          <div>
            <span className="mb-3 inline-block rounded-full border border-[#7A9636]/30 bg-[#7A9636]/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[#7A9636]">
              Recognized for Excellence &amp; Performance
            </span>
            <h2 className="text-4xl font-serif font-bold leading-tight text-[#8F2621] sm:text-5xl">
              Awards &amp;{" "}
              <span className="text-[#7A9636]">
                Recognition
              </span>
            </h2>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            variants={heroVariants}
            className="text-right"
          >
            <div className="text-5xl font-serif font-extrabold text-[#8F2621]">
              <Counter to={totalAwards} />
              <span className="text-[#7A9636]">+</span>
            </div>
            <p className="text-sm text-[#4A4A45] font-medium">Honors across three decades</p>
          </motion.div>
        </motion.div>

        {/* ---------- Trophy showcase image ---------- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative my-14 flex justify-center"
        >
          <motion.div
            className="relative overflow-hidden rounded-3xl border border-[#999991]/30 bg-white p-8 shadow-sm"
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
          >
            {/* Images */}
            <motion.img
              src= {img}
              alt="Vaichal Constructions trophies and award plaques"
              className="max-h-[340px] w-auto select-none"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              draggable={false}
            />
            {/* reflective floor line */}
            <div className="mx-auto mt-4 h-px w-3/4 bg-gradient-to-r from-transparent via-[#8F2621]/40 to-transparent" />
          </motion.div>
        </motion.div>

        {/* ---------- Accordion groups ---------- */}
        <div className="space-y-4">
          {awardGroups.map((group, gi) => {
            const isOpen = openIndex === gi;
            const Icon = group.icon;
            return (
              <motion.div
                key={group.title}
                custom={gi}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={groupVariants}
                className="overflow-hidden rounded-2xl border border-[#999991]/30 bg-white shadow-sm"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : gi)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-[#F5F7E3]/35"
                >
                  <div className="flex items-center gap-4">
                    <motion.span
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#7A9636]/10 text-[#7A9636]"
                      whileHover={{ rotate: 8, scale: 1.05 }}
                    >
                      <Icon size={20} />
                    </motion.span>
                    <div>
                      <h3 className="text-base font-bold text-[#1B1B1B] sm:text-lg">{group.title}</h3>
                      {group.subtitle && (
                        <p className="text-xs text-[#4A4A45] sm:text-sm">{group.subtitle}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="hidden rounded-full bg-[#F5F7E3] border border-[#999991]/20 px-3 py-1 text-xs text-[#4A4A45] font-semibold sm:inline-block">
                      {group.rows.length} awards
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-[#8F2621]"
                    >
                      <ChevronDown size={20} />
                    </motion.span>
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-[#999991]/20 px-6 pb-2 pt-2 bg-white">
                        {group.rows.map((row, ri) => (
                          <motion.div
                            key={`${row.project}-${row.year}`}
                            custom={ri}
                            initial="hidden"
                            animate="visible"
                            variants={rowVariants}
                            className="group flex flex-col gap-1 border-b border-[#999991]/10 py-4 last:border-none sm:flex-row sm:items-center sm:justify-between"
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                              <span className="w-fit rounded-md bg-[#7A9636]/10 px-2.5 py-1 text-xs font-semibold text-[#7A9636] sm:min-w-[190px]">
                                {row.category}
                              </span>
                              <span className="mt-1 text-sm text-[#1B1B1B] transition-colors group-hover:text-[#8F2621] sm:mt-0 font-medium">
                                {row.project}
                              </span>
                            </div>
                            <span className="text-sm font-semibold text-[#4A4A45]">{row.year}</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ------------------------------------------------------------------
// Small animated number counter (no extra deps)
// ------------------------------------------------------------------
function Counter({ to }: { to: number }) {
  const [value, setValue] = useState(0);

  return (
    <motion.span
      onViewportEnter={() => {
        const duration = 1200;
        const start = performance.now();
        const step = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          setValue(Math.floor(progress * to));
          if (progress < 1) requestAnimationFrame(step);
          else setValue(to);
        };
        requestAnimationFrame(step);
      }}
    >
      {value}
    </motion.span>
  );
}