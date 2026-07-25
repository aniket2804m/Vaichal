import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ShieldCheck, Award, Clock, Compass } from "lucide-react";
import AnimatedText from "../../components/ui/AnimatedText";
import { useNavigate } from "react-router-dom";

import myImage from "../../assets/images/Vaichal vastu.png";
import { ScrollReveal } from "../../components/layout/ScrollProgress";
import founderImage from "../../assets/images/Vaichal vastu.png";
import ParticleBackground from "../../components/layout/ParticleBackground";

import { services, missionPoints, differentiators, teamMembers } from "../../data/about";

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

export default function About() {
  const navigate = useNavigate();

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroTextY = useTransform(heroProgress, [0, 1], [0, 160]);
  const heroTextOpacity = useTransform(heroProgress, [0, 0.8], [1, 0]);

  const visionRef = useRef<HTMLDivElement>(null);

  const missionRef = useRef<HTMLDivElement>(null);

  return (
    <section id="about" className="bg-[#F5F7E3] text-[#1B1B1B] overflow-hidden">
      {/* ============ HERO — centered (original layout) ============ */}
      <div
        ref={heroRef}
        className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-5 relative overflow-hidden"
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
          <motion.div
  className="inline-flex items-center mb-10 gap-3 px-5 py-2 rounded-full border border-[#7A9636]/30 bg-white/60 backdrop-blur-md shadow-sm"
  animate={{ y: [0, -4, 0] }}
  transition={{ duration: 3, repeat: Infinity }}
>
  <span className="w-2 h-2 rounded-full bg-[#7A9636]" />
  <span className="font-cinzel uppercase tracking-[0.35em] text-[#7A9636] text-xs sm:text-sm font-semibold">
    About Vaichal
  </span>
</motion.div>

          <div className="mt-5 text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-serif font-bold leading-tight text-[#1B1B1B]">
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
            <motion.div
  className="max-w-4xl mx-auto mt-10"
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  viewport={{ once: true }}
>
  <div className="relative overflow-hidden rounded-2xl border border-[#7A9636]/20 bg-white/70 backdrop-blur-md px-6 py-6 shadow-lg">
    {/* Left Accent */}
    <div className="absolute left-0 top-0 h-full w-1 bg-[#7A9636]" />

    <motion.p
      className="pl-4 text-[#55554F] text-base sm:text-lg md:text-xl leading-9 tracking-wide font-light"
      animate={{ opacity: [0.9, 1, 0.9] }}
      transition={{ duration: 3, repeat: Infinity }}
    >
      At{" "}
      <span className="font-semibold text-[#7A9636]">
        Vaichal Group
      </span>
      , we believe in{" "}
      <span className="font-semibold text-[#8F2621]">
        creating lasting value
      </span>{" "}
      for our customers by helping them build{" "}
      <span className="font-semibold text-[#7A9636]">
        long-term assets
      </span>
      . From the very beginning of every vision, we partner with businesses,
      entrepreneurs, and families to transform ambitious ideas into{" "}
      <span className="font-semibold text-[#8F2621]">
        timeless landmarks
      </span>{" "}
      through trust, innovation, and uncompromising quality.
    </motion.p>
  </div>
</motion.div>
          </ScrollReveal>

          {/* Scroll cue */}
         <motion.div
  className="mt-14 flex justify-center"
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
>
  <motion.button
  type="button"
  onClick={() => navigate("/features")}
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.96 }}
  className="group mt-5 relative inline-flex items-center justify-center min-h-[44px] overflow-hidden px-6 py-3 border border-[#8F2621] text-[#8F2621] hover:text-white transition duration-500 text-base font-semibold uppercase tracking-widest bg-transparent rounded-[10px] cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
>
  <span className="absolute inset-0 w-full h-full bg-[#8F2621] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-[0.16,1,0.3,1] -z-10" />
  <span>Explore Projects</span>

  <motion.span
    animate={{ x: [0, 6, 0] }}
    transition={{ duration: 1.5, repeat: Infinity }}
    className="text-lg"
  >
    →
  </motion.span>
</motion.button>
</motion.div>
        </motion.div>
      </div>

      {/* ============ OUR STORY SECTION ============ */}
{/* About us */}
      <div
        ref={visionRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-10 border-t border-[#999991]/25 grid lg:grid-cols-2 gap-10 lg:gap-20"
      >
        <div className="lg:sticky lg:top-24 h-fit">
          <motion.h2
             initial={{ opacity: 0.15, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
           transition={{
  duration: 0.6,
  ease: [0.42, 0, 1, 1], // easeIn
}}
            className="text-[#8F2621] text-5xl sm:text-6xl md:text-8xl font-serif font-bold leading-none"
          >
            About us
          </motion.h2>
        </div>

        <div className="space-y-8">
 

  {[
    "At Vaichal Group, we believe in creating value for our customers, helping them build long-term assets. We are at the beginning of the journey when our customers envision the future of their companies, businesses, and industries. We help them realize those visions by becoming trusted partners throughout the entire process.",

    "Our developments are designed with a perfect balance of innovation, quality craftsmanship, and sustainable planning, ensuring every project delivers exceptional value and an elevated lifestyle.",

    "With an unwavering commitment to excellence, transparency, and customer satisfaction, every Vaichal Group project is built to become a lasting legacy for generations to come.",
  ].map((para, i) => (
    <motion.div
      key={i}
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.6,
        delay: i * 0.15,
        ease: "easeOut",
      }}
      viewport={{ once: false, amount: 0.6 }}
      className="relative pl-6"
    >
      {/* Left Accent */}
      <span className="absolute left-0 top-1 h-[85%] w-1 rounded-full bg-[#7A9636]" />

      <p className="text-[#66665F] text-lg md:text-xl leading-9 font-light tracking-wide transition-all duration-300 hover:text-[#333333]">
        {para}
      </p>
    </motion.div>
  ))}

  {/* Bottom Highlight */}
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
    className="border-l-4 border-[#7A9636] bg-[#F8F9EE] px-6 py-5 rounded-r-xl shadow-sm"
  >
    <p className="text-[#7A9636] uppercase tracking-[0.2em] text-sm md:text-base font-semibold">
      Building Trust • Creating Value • Shaping the Future
    </p>
  </motion.div>
</div>

      </div>

{/* History */}
      <div
        ref={missionRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-10 border-t border-[#999991]/25 grid lg:grid-cols-2 gap-10 lg:gap-20"
      >
        <div className="lg:sticky lg:top-24 h-fit lg:order-last">
          <motion.h2
           
             initial={{ opacity: 0.15, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
           transition={{
  duration: 0.6,
  ease: [0.42, 0, 1, 1], // easeIn
}}
            
            className="text-[#7A9636] text-5xl sm:text-6xl md:text-8xl font-serif font-bold leading-none text-right lg:text-right"
          >
           History
          </motion.h2>
        </div>

        <div className="space-y-8">

  {/* Highlight Quote */}
  <motion.div
    initial={{ opacity: 0, x: -30 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    viewport={{ once: false, amount: 0.6 }}
    className="border-l-4 border-[#7A9636] bg-[#F8F9EE] px-6 py-5 rounded-r-xl shadow-sm"
  >
    <p className="font-serif italic text-xl md:text-2xl leading-relaxed text-[#2F2F2F]">
      "The Vaichal Group story begins back in 1990, with a humble beginning
      executing small scale jobs under MCES, Sopur Industrial Area. Vaichal
      Constructions Pvt. Ltd. was incorporated in 2000 with the same passion
      and vision—and today, with 20+ years in the industry, we're poised to
      expand across the country."
    </p>
  </motion.div>

  {/* Timeline Points */}
  {missionPoints.map((point, i) => (
    <motion.div
      key={i}
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.6,
        delay: i * 0.15,
        ease: "easeOut",
      }}
      viewport={{ once: false, amount: 0.6 }}
      className="relative flex items-start gap-5 pl-6"
    >
      {/* Left Accent */}
      <span className="absolute left-0 top-2 h-[75%] w-1 rounded-full bg-[#7A9636]" />

      {/* Number */}
      <span className="text-[#8F2621] font-serif font-bold text-xl min-w-[45px]">
        0{i + 1}.
      </span>

      {/* Text */}
      <p className="text-[#66665F] text-lg leading-8 font-light tracking-wide transition-colors duration-300 hover:text-[#333333]">
        {point}
      </p>
    </motion.div>
  ))}
</div>
      </div>


      {/* ============ OUR VISION — pinned image, scrolling text ============ */}
      <div
        ref={visionRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-10 border-t border-[#999991]/25 grid lg:grid-cols-2 gap-10 lg:gap-20"
      >
        <div className="lg:sticky lg:top-24 h-fit">
          <motion.h2
             initial={{ opacity: 0.15, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
           transition={{
  duration: 0.6,
  ease: [0.42, 0, 1, 1], // easeIn
}}
            className="text-[#8F2621] text-5xl sm:text-6xl md:text-8xl font-serif font-bold leading-none"
          >
            OUR VISION
          </motion.h2>
        </div>

        <div className="space-y-8">
  {[
    "To be recognized as a premier real estate development company, delivering world-class residential and commercial spaces that transcend luxury and establish new benchmarks in architectural excellence.",
    "We envision creating timeless properties that become iconic landmarks, revered not just for their structural magnificence but for the quality of life they provide.",
    "Every project is a testament to our commitment to craftsmanship, innovation, and customer satisfaction.",
  ].map((para, i) => (
    <motion.div
      key={i}
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
      viewport={{ once: false, amount: 0.6 }}
      className="relative pl-6"
    >
      {/* Left Accent */}
      <span className="absolute left-0 top-1 h-[85%] w-1 rounded-full bg-[#7A9636]" />

      <p className="text-[#66665F] text-lg md:text-xl leading-9 font-light tracking-wide transition-all duration-300 hover:text-[#3D3D3D]">
        {para}
      </p>
    </motion.div>
  ))}

  <motion.div
    initial={{ opacity: 0, x: 30 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    viewport={{ once: true, amount: 0.6 }}
    className="mt-10 rounded-r-xl border-l-4 border-[#7A9636] bg-[#F8F9EE] px-6 py-5 shadow-md"
  >
    <p className="text-[#7A9636] font-semibold uppercase tracking-[0.2em] text-sm md:text-base leading-relaxed">
      Excellence in every stone, integrity in every deal, legacy in every
      project.
    </p>
  </motion.div>
</div>
      </div>

      {/* ============ OUR MISSION — styled to match Vision's layout ============ */}
      <div
        ref={missionRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-10 border-t border-[#999991]/25 grid lg:grid-cols-2 gap-10 lg:gap-20"
      >
        <div className="lg:sticky lg:top-24 h-fit lg:order-last">
          <motion.h2
             initial={{ opacity: 0.15, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
           transition={{
  duration: 0.6,
  ease: [0.42, 0, 1, 1], // easeIn
}}
            className="text-[#7A9636] text-5xl sm:text-6xl md:text-8xl font-serif font-bold leading-none text-right lg:text-right"
          >
            OUR MISSION
          </motion.h2>
        </div>

        <div className="space-y-8">

  {/* Highlight Quote */}
  <motion.div
    initial={{ opacity: 0, x: -30 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    viewport={{ once: false, amount: 0.6 }}
    className="border-l-4 border-[#7A9636] bg-[#F8F9EE] px-6 py-5 rounded-r-xl shadow-sm"
  >
    <p className="font-serif italic text-xl md:text-2xl leading-relaxed text-[#2F2F2F]">
      "Our mission is to build more than just properties—we build legacies
      that endure for generations, creating spaces where ambitions flourish
      and memories are made."
    </p>
  </motion.div>

  {/* Mission Points */}
  {missionPoints.map((point, i) => (
    <motion.div
      key={i}
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.6,
        delay: i * 0.15,
        ease: "easeOut",
      }}
      viewport={{ once: false, amount: 0.6 }}
      className="relative flex items-start gap-5 pl-6"
    >
      {/* Left Accent */}
      <span className="absolute left-0 top-2 h-[75%] w-1 rounded-full bg-[#7A9636]" />

      {/* Number */}
      <span className="text-[#8F2621] font-serif font-bold text-xl min-w-[45px]">
        0{i + 1}.
      </span>

      {/* Point */}
      <p className="text-[#66665F] text-lg leading-8 font-light tracking-wide transition-colors duration-300 hover:text-[#333333]">
        {point}
      </p>
    </motion.div>
  ))}
</div>
      </div>

      

      {/* ============ WHY CHOOSE VAICHAL ============ */}
      <section id="why-choose-us" className="py-10 md:py-10 bg-[#F5F7E3] border-t border-[#999991]/25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <ScrollReveal variant="fade-up" delay={0.1}>
            <div className="text-center mb-16">
              <span className="font-cinzel uppercase tracking-[0.3em] text-[#7A9636] text-xs font-semibold">
                Why Vaichal
              </span>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-[#8F2621] mt-3">
                Why Choose Us
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {differentiators.map((diff, i) => {
              const icons = [ShieldCheck, Award, Clock, Compass];
              const IconComponent = icons[i % icons.length];
              return (
                <ScrollReveal key={diff.id} variant="scale-up" delay={0.06 * i}>
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02, borderColor: "#8F2621" }}
                    className="h-full border border-[#999991]/30 p-6 rounded-[16px] bg-white flex flex-col justify-between shadow-sm transition-all duration-300"
                  >
                    <div>
                      <div className="w-12 h-12 rounded-[12px] bg-[#F5F7E3] flex items-center justify-center mb-5">
                        <IconComponent className="text-[#8F2621] w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-serif font-bold text-[#1B1B1B]">
                        {diff.title}
                      </h3>
                      <p className="text-sm text-[#999991] mt-3 font-light leading-relaxed">
                        {diff.desc}
                      </p>
                    </div>
                  </motion.div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ OUR SERVICES ============ */}
      <section id="services" className="py-10 md:py-10 bg-[#F5F7E3] border-t border-[#999991]/25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <ScrollReveal variant="fade-up" delay={0.1}>
            <div className="text-center mb-16">
              <span className="font-cinzel uppercase tracking-[0.3em] text-[#7A9636] text-xs font-semibold">
                Our Offerings
              </span>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-[#8F2621] mt-3">
                Our Services
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((service, idx) => (
              <ScrollReveal
                key={service.number}
                variant="fade-up"
                delay={0.05 * idx}
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
            ))}
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
      </section>

      {/* ============ OUR TEAM ============ */}
      <section id="team" className="relative py-10 md:py-10 bg-[#F5F7E3] border-t border-[#999991]/25">
        <motion.div
          className="absolute top-0 left-0 w-96 h-96 bg-[#7A9636]/5 blur-[150px] pointer-events-none"
          animate={{ x: [0, 50, 0], y: [0, -50, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <ScrollReveal variant="fade-up" delay={0.1}>
            <div className="text-center mb-16">
              <span className="font-cinzel uppercase tracking-[0.3em] text-[#7A9636] text-xs font-semibold">
                Our Leadership & Experts
              </span>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-[#8F2621] mt-3">
                Our Team
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {teamMembers.map((member, i) => (
              <ScrollReveal key={member.name} variant={i % 2 === 0 ? "fade-right" : "fade-left"} delay={0.1 * i}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="border border-[#999991]/30 p-5 rounded-[16px] bg-white shadow-sm grid sm:grid-cols-5 gap-6 items-center h-full transition-all duration-300 hover:shadow-md"
                >
                  {/* Image wrapper: spans 2 cols */}
                  <div className="sm:col-span-2 relative">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="relative border border-[#999991]/20 p-2 rounded-[12px] bg-[#F5F7E3] overflow-hidden"
                    >
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full aspect-[4/5] object-cover rounded-[8px]"
                        onError={(e) => {
                          e.currentTarget.src = founderImage;
                        }}
                      />
                    </motion.div>
                  </div>

                  {/* Bio details: spans 3 cols */}
                  <div className="sm:col-span-3 flex flex-col justify-center">
                    <span className="font-sans uppercase tracking-[0.15em] text-[#7A9636] text-[11px] font-bold">
                      {member.role}
                    </span>
                    <h3 className="text-2xl font-serif font-bold text-[#1B1B1B] mt-2 leading-tight">
                      {member.name}
                    </h3>

                    <motion.div
                      className="w-12 h-[2px] bg-[#8F2621] my-4"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                      style={{ transformOrigin: "left" }}
                    />

                    <p className="text-[#999991] font-sans font-light text-sm leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ MEMBERSHIP — infinite marquee ============ */}
      <div className="py-10 md:py-10 border-t border-[#999991]/25 overflow-hidden">
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

      {/* ============ MARQUEE STATEMENT ============ */}
      <div className="py-10 md:py-10 border-t border-[#999991]/25 bg-[#F5F7E3] overflow-hidden">
        <motion.div
          className="flex whitespace-nowrap w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        >
          {[...Array(2)].map((_, i) => (
           <span
  key={i}
  className="font-serif text-2xl sm:text-xl md:text-2xl font-bold text-[#8F2621] px-8"
>
  CRAFTED FOR GENERATIONS
  <span className="text-[#7A9636] px-6">✦</span>

  ROOTED IN TRUST
  <span className="text-[#7A9636] px-6">✦</span>

  VĀSTU INSPIRED LIVING
  <span className="text-[#7A9636] px-6">✦</span>

  THOUGHTFULLY DESIGNED SPACES
  <span className="text-[#7A9636] px-6">✦</span>

  WHERE DREAMS FIND HOME
  <span className="text-[#7A9636] px-6">✦</span>

  ELEVATING EVERYDAY LIVING
  <span className="text-[#7A9636] px-6">✦</span>

  TIMELESS ARCHITECTURE
  <span className="text-[#7A9636] px-6">✦</span>

  QUALITY THAT ENDURES
  <span className="text-[#7A9636] px-6">✦</span>

  BUILDING LEGACIES
  <span className="text-[#7A9636] px-6">✦</span>

  WHERE EVERY WISH TAKES ROOT
</span>
          ))}
        </motion.div>
      </div>

      {/* ============ CTA ============ */}
    {/* ============ CTA ============ */}
<section className="border-t border-[#999991]/20 bg-[#F5F7E3]">
  <div className="max-w-5xl mx-auto px-8 lg:px-10 py-10 text-center flex flex-col items-center">

    {/* Small Label */}
    <span className="uppercase tracking-[0.35em] text-[#7A9636] text-base font-medium">
      Build Your Legacy
    </span>

    {/* Heading */}
    <h2 className="pt-5 font-serif text-4xl sm:text-5xl lg:text-7xl leading-tight text-[#8F2621]">
      Homes Crafted <br />
      For Generations.
    </h2>

    {/* Description */}
    <p className="pt-5 max-w-2xl text-[#999991] text-lg leading-8">
      More than residences, we create thoughtfully planned spaces rooted in
      Vāstu principles, timeless architecture, and uncompromising quality.
      Experience a lifestyle where every detail is designed to inspire comfort,
      prosperity, and lasting memories.
    </p>

    {/* Buttons */}
    <div className="flex flex-col sm:flex-row gap-5 mt-12">
      <button className="group relative inline-flex items-center justify-center min-h-[44px] overflow-hidden px-6 py-3 border border-[#8F2621] text-[#8F2621] hover:text-white transition duration-500 text-base font-semibold uppercase tracking-widest bg-transparent rounded-[10px] cursor-pointer hover:scale-[1.02] active:scale-[0.98]">
        <span className="absolute inset-0 w-full h-full bg-[#8F2621] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-[0.16,1,0.3,1] -z-10" />
        Schedule Visit
      </button>

      <button className="group relative inline-flex items-center justify-center min-h-[44px] overflow-hidden px-6 py-3 border border-[#8F2621] text-[#8F2621] hover:text-white transition duration-500 text-xs font-semibold uppercase tracking-widest bg-transparent rounded-[10px] cursor-pointer hover:scale-[1.02] active:scale-[0.98]">
        <span className="absolute inset-0 w-full h-full bg-[#8F2621] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-[0.16,1,0.3,1] -z-10" />
        View Projects
      </button>
    </div>

  </div>
</section>
    </section>
  );
}