import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";

import { useNavigate } from "react-router-dom";

import myImage from "../../assets/images/Vaichal vastu.png";
import { ScrollReveal } from "../../components/layout/ScrollProgress";
import founderImage from "../../assets/images/Vaichal vastu.png";
import ParticleBackground from "../../components/layout/ParticleBackground";

import { services, stats } from "../../data/about";

const memberships = [
  { id: 1, name: "Builder's Association of India", logo: "🏗️" },
  {
    id: 2,
    name: "Architects, Engineers & Surveyors' Association, Pune",
    logo: "🏛️",
  },
  {
    id: 3,
    name: "Pure Construction Engineering Research Foundation",
    logo: "🔧",
  },
  { id: 4, name: "Indian Plumbing Association", logo: "💧" },
];

// story panels for the sticky "our story" scroll section
const storyPanels = [
  {
    tag: "01 — Foundation",
    title: "About Us",
    body: "At Vaichal Group, we believe in creating value for our customers helping them build their long term assets. We are at the beginning of the journey when our customers envision the future of their companies, businesses and industries. We help them realize their visions by being their partners in this process.",
  },
  {
    tag: "02 — Since 1990",
    title: "History",
    body: "The Vaichal Group story begins back in 1990, with a humble beginning executing small scale jobs under MCES, Sopur industrial area. Vaichal Constructions Pvt. Ltd. was incorporated in 2000 with the same passion and vision — and today, with 20+ years in the industry, we're poised to expand across the country.",
  },
  {
    tag: "03 — What Drives Us",
    title: "Core Ideology",
    body: "We hold a strong commitment to quality, integrity, teamwork and customer satisfaction as our core ideals. We do business with the highest standards of fairness and professional ethics, and believe in proactive learning, innovation and change. We care.",
  },
];

// ---- word-by-word scroll reveal ----
const wordContainer: Variants = {
  hidden: {},
  visible: (delayChildren: number = 0) => ({
    transition: { staggerChildren: 0.045, delayChildren },
  }),
};

const wordItem: Variants = {
  hidden: { opacity: 0, y: "0.6em", rotateX: -60, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: "0em",
    rotateX: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

function AnimatedText({
  text,
  as: Tag = "span",
  className = "",
  delay = 0,
  once = true,
}: {
  text: string;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  delay?: number;
  once?: boolean;
}) {
  const words = text.split(" ");
  const MotionTag = motion(Tag as any);
  return (
    <MotionTag
      className={className}
      style={{ perspective: "600px" }}
      variants={wordContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.4 }}
      custom={delay}
    >
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          variants={wordItem}
          style={{
            display: "inline-block",
            willChange: "transform, opacity, filter",
            transformOrigin: "50% 100%",
          }}
        >
          {word}
          {i !== words.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </MotionTag>
  );
}

export default function About() {
  const navigate = useNavigate();
  const [activePanel, setActivePanel] = useState(0);

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroTextY = useTransform(heroProgress, [0, 1], [0, 160]);
  const heroTextOpacity = useTransform(heroProgress, [0, 0.8], [1, 0]);

  const storyRef = useRef<HTMLDivElement>(null);

  const visionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: visionProgress } = useScroll({
    target: visionRef,
    offset: ["start end", "end start"],
  });
  const visionImgRotate = useTransform(visionProgress, [0, 1], [-6, 6]);

  return (
    <section id="about" className="bg-[#F5F7E3] text-[#1B1B1B] overflow-hidden">
      {/* ============ HERO — centered (original layout) ============ */}
      <div
        ref={heroRef}
        className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-20 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[#F5F7E3]" />
        <ParticleBackground color="#7A9636" />

        {/* 3D animated background glows */}
        <motion.div className="absolute inset-0 pointer-events-none" style={{ perspective: "1000px" }}>
          <motion.div
            className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-[#7A9636]/15 to-transparent rounded-full blur-3xl opacity-20"
            animate={{ y: [0, 30, 0], x: [0, 20, 0], rotateZ: [0, 5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-tl from-[#8F2621]/10 to-transparent rounded-full blur-3xl opacity-20"
            animate={{ y: [0, -30, 0], x: [0, -20, 0], rotateZ: [0, -5, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
        </motion.div>

        <motion.div
          className="relative z-10 text-center max-w-5xl mt-5"
          style={{ y: heroTextY, opacity: heroTextOpacity }}
        >
          <ScrollReveal variant="fade-down" delay={0.1}>
            <motion.span
              className="font-cinzel font-semibold uppercase tracking-[0.3em] text-[#7A9636] text-xl inline-block"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              About Vaichal
            </motion.span>
          </ScrollReveal>

          <div className="mt-5 text-4xl sm:text-4xl md:text-8xl font-serif font-bold leading-tight text-[#1B1B1B]">
            <AnimatedText as="h1" text="Crafting Legends" className="block" />
            <AnimatedText as="h1" text="Building Luxury" className="block" delay={0.15} />
            <AnimatedText
              as="h1"
              text="Creating Legacy."
              className="block italic text-[#8F2621] font-normal"
              delay={0.3}
            />
          </div>

          <ScrollReveal variant="fade-up" delay={0.35}>
            <motion.p
              className="max-w-3xl mx-auto mt-8 text-[#999991] leading-relaxed font-sans font-light text-base md:text-lg"
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              At Vaichal Group, we believe in creating value for our
              customers helping them build their long term assets. We are
              at the beginning of the journey when our customers envision
              the future of their companies, businesses and industries.
            </motion.p>
          </ScrollReveal>

          {/* Scroll cue */}
          <motion.div
            className="mt-14 flex flex-col items-center gap-2 text-[#7A9636]/70"
            animate={{ y: [0, 10, 0], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-[10px] tracking-[0.4em] uppercase font-sans">
              Scroll
            </span>
            <div className="w-[1px] h-10 bg-gradient-to-b from-[#7A9636] to-transparent" />
          </motion.div>
        </motion.div>
      </div>

      {/* ============ STICKY STORY SECTION (signature element) ============ */}
      <div
        ref={storyRef}
        className="relative border-t border-[#999991]/25"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-[0.9fr_1.6fr] gap-10">
          {/* sticky left nav */}
          <div className="lg:sticky lg:top-0 h-fit lg:h-screen flex flex-col justify-center py-16 lg:py-0">
            <span className="font-cinzel uppercase tracking-[0.3em] text-[#7A9636] text-xs mb-6">
              Our Story
            </span>
            <div className="space-y-4">
              {storyPanels.map((panel, i) => (
                <button
                  key={panel.title}
                  onClick={() => {
                    document
                      .getElementById(`story-panel-${i}`)
                      ?.scrollIntoView({ behavior: "smooth", block: "center" });
                  }}
                  className="block text-left w-full group"
                >
                  <motion.h3
                    animate={{
                      opacity: activePanel === i ? 1 : 0.35,
                      x: activePanel === i ? 8 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#1B1B1B] group-hover:opacity-80"
                  >
                    {panel.title}
                  </motion.h3>
                </button>
              ))}
            </div>
          </div>

          {/* scrolling right panels */}
          <div className="py-16 lg:py-32 space-y-24 lg:space-y-48">
            {storyPanels.map((panel, i) => (
              <motion.div
                id={`story-panel-${i}`}
                key={panel.title}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.6 }}
                onViewportEnter={() => setActivePanel(i)}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="border border-[#999991]/30 rounded-[16px] p-8 sm:p-12 bg-white shadow-sm"
              >
                <span className="text-[#7A9636] font-cinzel text-sm tracking-widest uppercase font-semibold">
                  {panel.tag}
                </span>
                <AnimatedText
                  as="p"
                  text={panel.body}
                  className="block mt-6 text-[#999991] leading-relaxed font-sans font-light text-base md:text-lg"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ============ MEMBERSHIP — infinite marquee ============ */}
      <div className="py-16 md:py-24 border-t border-[#999991]/25 overflow-hidden">
        <ScrollReveal variant="fade-up" delay={0.1}>
          <h2 className="text-center text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-[#8F2621] mb-14 px-4">
            Membership
          </h2>
        </ScrollReveal>

        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#F5F7E3] to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#F5F7E3] to-transparent z-10" />

          <motion.div
            className="flex gap-6 w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          >
            {[...memberships, ...memberships].map((membership, idx) => (
              <motion.div
                key={`${membership.id}-${idx}`}
                whileHover={{ y: -10, scale: 1.05, borderColor: "#8F2621" }}
                className="shrink-0 w-64 sm:w-72 border border-[#999991]/30 rounded-[16px] p-6 sm:p-8 bg-white shadow-sm flex flex-col items-center text-center gap-3"
              >
                <span className="text-5xl">{membership.logo}</span>
                <h3 className="text-[#1B1B1B] font-sans font-semibold text-sm leading-tight">
                  {membership.name}
                </h3>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ============ VISION — pinned image, scrolling text ============ */}
      <div
        ref={visionRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-32 border-t border-[#999991]/25 grid lg:grid-cols-2 gap-10 lg:gap-20"
      >
        <div className="lg:sticky lg:top-24 h-fit">
          <motion.h2
            style={{ rotate: visionImgRotate }}
            className="text-[#8F2621] text-5xl sm:text-6xl md:text-8xl font-serif font-bold leading-none"
          >
            OUR
            <br />
            VISION
          </motion.h2>
        </div>

        <div className="space-y-8 text-[#999991] text-lg leading-relaxed font-sans font-light">
          {[
            "To be recognized as a premier real estate development company, delivering world-class residential and commercial spaces that transcend luxury and establish new benchmarks in architectural excellence.",
            "We envision creating timeless properties that become iconic landmarks, revered not just for their structural magnificence but for the quality of life they provide.",
            "Every project is a testament to our commitment to craftsmanship, innovation, and customer satisfaction.",
            "Our mission is to build more than just properties—we build legacies that endure for generations, creating spaces where ambitions flourish and memories are made.",
          ].map((para, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0.15, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: false, amount: 0.6 }}
            >
              {para}
            </motion.p>
          ))}
          <motion.p
            className="text-[#7A9636] font-sans font-semibold tracking-wider uppercase text-base"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.6 }}
          >
            Excellence in every stone, integrity in every deal, legacy in
            every project.
          </motion.p>
        </div>
      </div>

      {/* ============ FOUNDER — asymmetric bento ============ */}
      <section className="relative py-20 md:py-32 bg-[#F5F7E3] border-t border-[#999991]/25">
        <motion.div
          className="absolute top-0 left-0 w-96 h-96 bg-[#7A9636]/5 blur-[150px] pointer-events-none"
          animate={{ x: [0, 50, 0], y: [0, -50, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-5 gap-6 lg:gap-8 items-start">
          {/* image: spans 2 cols, tall */}
          <ScrollReveal variant="fade-right" delay={0.1} className="lg:col-span-2">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative border border-[#999991]/30 p-3 rounded-[16px] bg-white shadow-sm"
            >
              <img
                src={founderImage}
                alt="Founder"
                className="w-full aspect-[4/5] h-auto object-cover rounded-[12px]"
              />
              {/* overlapping quote card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="absolute -bottom-6 right-4 sm:-right-8 max-w-[240px] border border-[#8F2621]/30 bg-white rounded-[12px] p-5 shadow-sm"
              >
                <p className="font-serif italic text-base sm:text-lg text-[#1B1B1B] leading-snug">
                  "Vision, precision, and unwavering commitment."
                </p>
              </motion.div>
            </motion.div>
          </ScrollReveal>

          {/* text: spans 3 cols */}
          <ScrollReveal variant="fade-left" delay={0.2} className="lg:col-span-3">
            <div className="pt-8 lg:pt-0">
              <span className="font-sans uppercase tracking-[0.3em] text-[#7A9636] text-xs font-semibold">
                Founder & Visionary
              </span>

              <div className="mt-5">
                <AnimatedText
                  as="h2"
                  text="Leading With Excellence"
                  className="block text-4xl sm:text-5xl md:text-6xl font-serif font-bold leading-tight text-[#8F2621]"
                />
              </div>

              <motion.div
                className="w-20 h-[2px] bg-[#8F2621] my-8"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                style={{ transformOrigin: "left" }}
              />

              <div className="space-y-6 text-[#999991] leading-relaxed font-sans font-light text-base sm:text-lg">
                <p>
                  At Vaichal Group, our leadership stands as a beacon of
                  integrity and visionary excellence. With decades of
                  experience in the real estate and construction sectors,
                  our founders have cultivated a culture of quality and
                  innovation.
                </p>
                <p>
                  Driven by a passion for creating timeless properties and
                  a commitment to customer satisfaction, our leadership
                  team has positioned Vaichal as a trusted name in premium
                  real estate development.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ============ BENTO: STATS + SERVICES ============ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 text-center border-t border-[#999991]/25 font-sans">
        <ScrollReveal variant="fade-up" delay={0.1}>
          <div className="mb-10">
          <h2 className="text-4xl mb-10 sm:text-5xl text-center md:text-6xl font-serif font-bold text-[#8F2621] mb-14">
            What We Deliver
          </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[minmax(140px,auto)] gap-4 md:gap-5">
          {/* remaining stats as compact tiles */}
          {stats.slice(2).map((stat, i) => (
            <ScrollReveal key={`stat-${i}`} variant="scale-up" delay={0.06 * i}>
              <motion.div
                whileHover={{ y: -6, scale: 1.02, borderColor: "#8F2621" }}
                className="h-full border border-[#999991]/30 p-5 sm:p-6 rounded-[16px] bg-white flex flex-col justify-center shadow-sm"
              >
                <stat.icon className="text-[#8F2621] mb-3 w-6 h-6" />
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#8F2621]">
                  {stat.value}
                </h3>
                <p className="text-xs text-[#999991] mt-1 font-semibold">
                  {stat.label}
                </p>
              </motion.div>
            </ScrollReveal>
          ))}

          {/* services as varied-size bento tiles */}
          {services.map((service, idx) => {
            const big = idx % 5 === 0;
            return (
              <ScrollReveal
                key={service.number}
                variant="fade-up"
                delay={0.05 * idx}
                className={big ? "col-span-2 row-span-1" : ""}
              >
                <motion.div
                  whileHover={{
                    y: -8,
                    borderColor: "#8F2621",
                    boxShadow: "0 10px 20px rgba(0,0,0,0.05)",
                  }}
                  transition={{ type: "spring", stiffness: 220, damping: 18 }}
                  className="h-full border border-[#999991]/30 p-6 sm:p-7 bg-white rounded-[16px] flex flex-col justify-between shadow-sm"
                >
                  <span className="text-[#7A9636] text-xl font-serif font-bold">
                    {service.number}
                  </span>
                  <div>
                    <h3 className="mt-4 font-serif font-bold text-base text-[#1B1B1B]">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-sm text-[#999991] font-light leading-relaxed">
                      {service.desc}
                    </p>
                  </div>
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* main feature image tile */}
        <ScrollReveal variant="fade-up" delay={0.2}>
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="mt-10 rounded-[16px] border border-[#999991]/30 bg-white p-8 sm:p-12 flex flex-col sm:flex-row items-center gap-8 shadow-sm"
          >
            <div className="w-40 h-40 sm:w-52 sm:h-52 shrink-0 rounded-full p-2 border border-[#999991]/30 bg-[#F5F7E3]">
              <img
                src={myImage}
                alt="Vaichal Properties"
                loading="lazy"
                className="w-full h-full rounded-full object-contain"
              />
            </div>
            <p className="text-[#999991] leading-relaxed font-light text-base md:text-lg text-center sm:text-left">
              Every property we create is a masterpiece of design, comfort,
              and elegance — from the selection of premium materials to the
              precision of every detail.
            </p>
          </motion.div>
        </ScrollReveal>
      </div>

      {/* ============ MARQUEE STATEMENT ============ */}
      <div className="py-16 md:py-24 border-t border-[#999991]/25 bg-[#F5F7E3] overflow-hidden">
        <motion.div
          className="flex whitespace-nowrap w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        >
          {[...Array(2)].map((_, i) => (
            <span
              key={i}
              className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold text-[#8F2621] px-8"
            >
              QUALITY WITHOUT COMPROMISE
              <span className="text-[#7A9636] italic px-6">·</span>
              INTEGRITY WITHOUT EXCEPTION
              <span className="text-[#7A9636] italic px-6">·</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* ============ CTA — split screen ============ */}
      <div className="grid lg:grid-cols-2 border-t border-[#999991]/25">
        <div className="relative flex flex-col justify-center px-6 sm:px-10 lg:px-16 py-24 lg:py-0 overflow-hidden bg-[#F5F7E3]">
          <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30%_50%,rgba(122,150,54,0.1),transparent_70%)] pointer-events-none" />

          <AnimatedText
            as="h2"
            text="Transcend the ordinary. Embrace the extraordinary."
            className="block relative z-10 font-serif text-3xl sm:text-5xl md:text-6xl font-bold italic text-[#8F2621] leading-tight"
          />

          <ScrollReveal variant="fade-up" delay={0.3}>
            <p className="relative z-10 mt-8 text-[#999991] font-light text-base md:text-lg max-w-md">
              Your dream property awaits. Let's build something legendary
              together.
            </p>

            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/contact")}
              className="relative z-10 mt-10 overflow-hidden bg-[#8F2621] text-white px-8 py-4 font-sans font-semibold tracking-widest uppercase rounded-[10px] shadow-sm text-sm sm:text-base border-none cursor-pointer w-fit hover:bg-[#7A9636] transition-colors"
            >
              <span className="relative z-10">Schedule Your Private Viewing</span>
            </motion.button>
          </ScrollReveal>
        </div>

        <motion.div
          className="relative min-h-[320px] lg:min-h-0 bg-[#F5F7E3] flex items-center justify-center overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <motion.img
            src={founderImage}
            alt="Vaichal signature project"
            className="w-full h-full object-cover opacity-80"
            initial={{ scale: 1.15 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#F5F7E3] via-transparent to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}