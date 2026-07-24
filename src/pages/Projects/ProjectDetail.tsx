import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { 
  Building, ShieldCheck, Paintbrush, Hammer, Wrench, Warehouse, 
  MapPin, CalendarDays, Ruler, Layers, PhoneCall, Sparkles, 
  CheckCircle2, X, Zap, Cpu, Building2
} from "lucide-react";

interface ProjectSpecification {
  icon: string;
  title: string;
  value: string;
}

interface Project {
  id: string;
  title: string;
  location: string;
  category: "Commercial" | "Industrial" | "Residential";
  year: string;
  area: string;
  scope: string;
  description: string;
  image: string;
  status: "Ongoing" | "Completed" | "Upcoming";
  beds?: number;
  baths?: number;
  gallery?: string[];
  specifications?: ProjectSpecification[];
}

// Icon mapper helper
const iconMap: Record<string, React.ComponentType<{ className?: string; size?: number }>> = {
  Building: Building,
  ShieldCheck: ShieldCheck,
  Paintbrush: Paintbrush,
  Hammer: Hammer,
  Wrench: Wrench,
  Warehouse: Warehouse,
  MapPin: MapPin,
  CalendarDays: CalendarDays,
  Ruler: Ruler,
  Layers: Layers,
  Sparkles: Sparkles,
  CheckCircle2: CheckCircle2,
  X: X,
  Zap: Zap,
  Cpu: Cpu,
  Building2: Building2
};

const fadeInUp = {
  initial: { opacity: 0, y: 35 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }
};

const staggerChildren = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.08
    }
  },
  viewport: { once: true, margin: "-60px" }
};

// Cinematic Text Reveal Component: animates text word-by-word with blur, fade, and vertical slide
function CinematicText({ 
  text, 
  className = "", 
  variant = "body" 
}: { 
  text: string; 
  className?: string; 
  variant?: "heading" | "body" | "quote" 
}) {
  const words = text.split(" ");
  
  const containerVariants = {
    initial: {},
    whileInView: {
      transition: {
        staggerChildren: variant === "heading" ? 0.06 : 0.02,
      }
    }
  };
  
  const wordVariants = {
    initial: {
      opacity: 0,
      y: variant === "heading" ? 40 : 25,
      filter: "blur(12px)",
    },
    whileInView: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1] as const,
      }
    }
  };

  return (
    <motion.span
      variants={containerVariants}
      initial="initial"
      whileInView="whileInView"
      viewport={{ once: false, margin: "-40px" }}
      className={`inline-flex flex-wrap ${className}`}
    >
      {words.map((word, idx) => (
        <motion.span
          key={idx}
          variants={wordVariants}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}

export default function ProjectDetail({
  project,
  onBack,
}: {
  project: Project;
  onBack: () => void;
}) {
  const [activeHeroIndex, setActiveHeroIndex] = useState(0);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable background page scrolling
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";
    
    return () => {
      // Re-enable background page scrolling on unmount
      document.body.style.overflow = originalStyle;
    };
  }, []);

  // Generate deterministic stats for the STATS ROW based on project properties
  const seed = project.id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const floors = (seed % 15) + 5;
  const units = floors * ((seed % 8) + 6);
  const parkingSlots = Math.round(units * 1.2);
  const completionPercent = project.status === "Completed" ? "100%" : project.status === "Upcoming" ? "0%" : `${(seed % 40) + 45}%`;

  const stats = [
    { value: `${floors}`, label: "Floors" },
    { value: `${units}`, label: "Units" },
    { value: `${parkingSlots}`, label: "Parking Slots" },
    { value: completionPercent, label: "Completion %" },
  ];

  // Specifications matching the requested list & existing ones
  const specifications = project.specifications || [
    { icon: "ShieldCheck", title: "Structural Safety", value: "Seismic Zone III Compliant" },
    { icon: "Paintbrush", title: "Premium Finishes", value: "Bespoke Architectural Stonework" },
    { icon: "Zap", title: "Energy Efficient", value: "Integrated Solar Panels & HVAC" },
    { icon: "Cpu", title: "Smart Automation", value: "Advanced IoT Building Management" },
    { icon: "Building2", title: "Space Optimization", value: "Column-free Layout" },
    { icon: "CheckCircle2", title: "Quality Assurance", value: "Grade-A Materials" }
  ];

  // Gallery images list containing exactly 5 items
  const galleryImages = [
    project.image,
    ...(project.gallery || []),
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80"
  ].slice(0, 5);

  // Auto-scroll Hero Banner images
  useEffect(() => {
    if (galleryImages.length <= 1) return;
    const interval = setInterval(() => {
      setActiveHeroIndex((prev) => (prev + 1) % galleryImages.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [galleryImages.length]);

  // Auto-scroll Horizontal Gallery images
  useEffect(() => {
    const el = galleryRef.current;
    if (!el) return;

    let isHovered = false;
    const handleMouseEnter = () => { isHovered = true; };
    const handleMouseLeave = () => { isHovered = false; };

    el.addEventListener("mouseenter", handleMouseEnter);
    el.addEventListener("mouseleave", handleMouseLeave);

    const interval = setInterval(() => {
      if (isHovered) return;
      
      const itemWidth = 256 + 16; // w-64 (256px) + gap-4 (16px)
      const maxScroll = el.scrollWidth - el.clientWidth;
      
      let nextScroll = el.scrollLeft + itemWidth;
      if (nextScroll >= maxScroll + 5) {
        nextScroll = 0;
      }
      
      el.scrollTo({
        left: nextScroll,
        behavior: "smooth"
      });
    }, 3000);

    return () => {
      clearInterval(interval);
      el.removeEventListener("mouseenter", handleMouseEnter);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [galleryImages]);

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-2 sm:p-6 md:p-10 select-none">
      {styleTag}
      
      {/* Backdrop overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onBack}
        className="absolute inset-0 bg-[#1B1B1B]/80 backdrop-blur-md cursor-pointer"
      />

      {/* Modal Container */}
      <motion.div
        layoutId={`card-${project.id}`}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
        className="relative w-full max-w-4xl bg-[#F5F7E3] text-[#1B1B1B] border border-[#999991]/30 rounded-[16px] shadow-2xl flex flex-col overflow-hidden max-h-[90vh] outline-none z-10"
      >
        {/* Close Button */}
        <button
          onClick={onBack}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-50 flex items-center justify-center w-11 h-11 min-w-[44px] min-h-[44px] rounded-full bg-white/90 backdrop-blur-sm border border-[#999991]/35 text-[#1B1B1B] hover:text-[#8F2621] hover:border-[#8F2621]/30 transition-colors focus:outline-none focus:ring-1 focus:ring-[#8F2621] cursor-pointer"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* Scrollable Content Container */}
        <div 
          data-lenis-prevent
          className="overflow-y-auto w-full h-full scrollbar-thin scrollbar-thumb-[#999991]/20 scrollbar-track-transparent"
        >
          
          {/* 1. HERO BANNER */}
          <div className="relative h-64 sm:h-96 w-full overflow-hidden bg-[#F5F7E3]">
            {/* Transition Morph Helper */}
            <motion.img
              layoutId={`img-${project.id}`}
              src={project.image}
              alt=""
              className="absolute inset-0 h-full w-full object-cover z-0"
              style={{ opacity: activeHeroIndex === 0 ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            />

            {/* Slider Images */}
            {activeHeroIndex !== 0 && (
              <motion.img
                key={activeHeroIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                src={galleryImages[activeHeroIndex]}
                alt={project.title}
                className="absolute inset-0 h-full w-full object-cover z-10"
              />
            )}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/25 z-20" />

            {/* Hero Content (Centered bottom-up) */}
            <div className="absolute inset-x-0 bottom-0 z-30 px-6 pb-6 md:pb-8 max-w-4xl mx-auto flex flex-col items-start gap-3">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-2 rounded-[4px] bg-[#8F2621] px-2.5 py-0.5 text-[9px] font-sans tracking-widest uppercase font-bold text-white"
              >
                <CinematicText text={project.category} variant="body" />
              </motion.div>

              <h1 className="text-2xl sm:text-4xl font-bold font-serif text-white leading-tight tracking-tight max-w-3xl">
                <CinematicText text={project.title} variant="heading" />
              </h1>

              <div className="flex items-center gap-1.5 font-sans text-[10px] sm:text-xs uppercase tracking-[0.16em] text-[#7A9636]">
                <MapPin size={12} className="text-[#8F2621]" />
                <CinematicText text={project.location} variant="body" />
              </div>
            </div>

            {/* Blueprint corner ticks for hero section */}
            <span className="pointer-events-none absolute left-4 top-4 h-4 w-4 border-l border-t border-white/20" />
            <span className="pointer-events-none absolute right-16 top-4 h-4 w-4 border-r border-t border-white/20" />
          </div>

          <div className="max-w-4xl mx-auto px-6 py-10 flex flex-col gap-14 relative z-20">
            
            {/* 2. STATS ROW */}
            <motion.div 
              variants={staggerChildren}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, margin: "-20px" }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-y border-[#999991]/20"
            >
              {stats.map((stat, i) => (
                <motion.div 
                  key={i} 
                  variants={fadeInUp}
                  className={`flex flex-col items-center text-center group ${i < 3 ? 'border-r border-[#999991]/15' : ''}`}
                >
                  <span className="font-sans text-2xl sm:text-3xl font-semibold text-[#8F2621] tracking-tight transition-transform duration-300 group-hover:scale-105">
                    {stat.value}
                  </span>
                  <span className="mt-1 font-sans text-[9px] tracking-[0.15em] text-[#4A4A45] font-semibold uppercase">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* 3. OVERVIEW SECTION */}
            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, margin: "-20px" }}
              className="flex flex-col items-start text-left w-full"
            >
              <span className="font-sans text-[9px] tracking-[0.2em] text-[#7A9636] font-semibold uppercase mb-2 block">
                <CinematicText text="Project Overview" variant="body" />
              </span>
              <h2 className="text-xl sm:text-2xl font-serif text-[#1B1B1B] font-bold mb-4">
                <CinematicText text="Architectural Vision & Scope" variant="heading" />
              </h2>
              <div className="h-[1px] w-12 bg-[#8F2621]/40 mb-6" />
              <p className="text-[#1B1B1B] text-xs sm:text-sm leading-relaxed tracking-wide font-normal">
                <CinematicText text={project.description} variant="body" />
              </p>
            </motion.div>

            {/* 4. SPECIFICATIONS GRID */}
            <motion.div
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, margin: "-20px" }}
              className="flex flex-col gap-6"
            >
              <motion.div variants={fadeInUp} className="flex flex-col items-start">
                <span className="font-sans text-[9px] tracking-[0.2em] text-[#7A9636] font-semibold uppercase mb-2 block">
                  <CinematicText text="Technical Details" variant="body" />
                </span>
                <h2 className="text-xl sm:text-2xl font-serif text-[#1B1B1B] font-bold">
                  <CinematicText text="Specifications" variant="heading" />
                </h2>
              </motion.div>

              <motion.div 
                variants={staggerChildren}
                className="grid grid-cols-2 md:grid-cols-3 gap-4"
              >
                {specifications.map((spec, i) => {
                  const IconComponent = iconMap[spec.icon] || Layers;
                  return (
                    <motion.div
                      key={i}
                      variants={fadeInUp}
                      className="group relative bg-white p-4 rounded-[12px] border border-[#999991]/30 shadow-sm flex flex-col justify-between h-32 transition-all duration-300 hover:border-[#8F2621]"
                    >
                      {/* Corner ticks on Hover */}
                      <span className="pointer-events-none absolute left-1.5 top-1.5 h-2 w-2 border-l border-t border-[#999991]/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      <span className="pointer-events-none absolute right-1.5 top-1.5 h-2 w-2 border-r border-t border-[#999991]/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      <span className="pointer-events-none absolute bottom-1.5 left-1.5 h-2 w-2 border-b border-l border-[#999991]/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      <span className="pointer-events-none absolute bottom-1.5 right-1.5 h-2 w-2 border-b border-r border-[#999991]/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                      <div className="text-[#8F2621]">
                        <IconComponent size={20} className="stroke-[1.5]" />
                      </div>
                      <div>
                        <h3 className="font-sans text-[8px] tracking-[0.14em] text-[#4A4A45] font-semibold uppercase mb-0.5">{spec.title}</h3>
                        <p className="text-xs font-bold text-[#1B1B1B] leading-tight">{spec.value}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>

            {/* 5. GALLERY SECTION */}
            <motion.div
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, margin: "-20px" }}
              className="flex flex-col gap-6"
            >
              <motion.div variants={fadeInUp} className="flex flex-col items-start">
                <span className="font-sans text-[9px] tracking-[0.2em] text-[#7A9636] font-semibold uppercase mb-2 block">
                  <CinematicText text="Immersive Tour" variant="body" />
                </span>
                <h2 className="text-xl sm:text-2xl font-serif text-[#1B1B1B] font-bold">
                  <CinematicText text="Visual Gallery" variant="heading" />
                </h2>
              </motion.div>

              {/* Horizontal Scrollable Gallery */}
              <motion.div 
                ref={galleryRef}
                variants={staggerChildren}
                className="flex gap-4 overflow-x-auto pb-3 w-full scrollbar-thin scrollbar-thumb-[#999991]/20 scrollbar-track-transparent snap-x"
              >
                {galleryImages.map((img, i) => (
                  <motion.div
                    key={i}
                    variants={fadeInUp}
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0 w-64 h-40 overflow-hidden rounded-[12px] bg-[#F5F7E3] border border-[#999991]/30 shadow-sm relative group snap-start cursor-pointer"
                  >
                    <img
                      src={img}
                      alt={`Project documentation ${i + 1}`}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3" />
                    
                    {/* corner ticks */}
                    <span className="pointer-events-none absolute left-2 top-2 h-2 w-2 border-l border-t border-white/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <span className="pointer-events-none absolute right-2 top-2 h-2 w-2 border-r border-t border-white/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    
                    <span className="absolute bottom-2 left-3 rounded-[4px] bg-[#8F2621] px-1.5 py-0.5 font-sans text-[8px] font-semibold tracking-[0.15em] text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      PLATE {String(i + 1).padStart(2, "0")}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* 6. CTA / CONTACT SECTION */}
            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, margin: "-20px" }}
              className="group relative w-full bg-white p-6 rounded-[16px] border border-[#999991]/30 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4"
            >
              {/* Corner ticks */}
              <span className="pointer-events-none absolute left-2 top-2 h-2 w-2 border-l border-t border-[#999991]/20" />
              <span className="pointer-events-none absolute right-2 top-2 h-2 w-2 border-r border-t border-[#999991]/20" />
              <span className="pointer-events-none absolute bottom-2 left-2 h-2 w-2 border-b border-l border-[#999991]/20" />
              <span className="pointer-events-none absolute bottom-2 right-2 h-2 w-2 border-b border-r border-[#999991]/20" />

              <div className="flex flex-col items-start text-left gap-1">
                <span className="font-sans text-[8px] tracking-[0.2em] text-[#7A9636] uppercase font-bold block">
                  <CinematicText text="Connect With Us" variant="body" />
                </span>
                <h3 className="text-base font-serif font-bold text-[#1B1B1B] leading-snug">
                  <CinematicText text="Interested in this project?" variant="heading" />
                </h3>
                <p className="text-[10px] text-[#4A4A45] max-w-md tracking-wide">
                  <CinematicText text="Our engineering team and construction consultants are available to provide comprehensive technical data sheets and site access schedules." variant="body" />
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-1.5 px-6 h-10 rounded-[4px] bg-[#8F2621] text-white font-sans text-[10px] font-bold tracking-[0.15em] uppercase hover:bg-[#7A9636] transition-colors focus:outline-none focus:ring-2 focus:ring-[#8F2621]/50 cursor-pointer select-none"
              >
                <PhoneCall size={12} />
                <span>Request Details</span>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// Inline styles for CSS tweaks
const styleTag = (
  <style>{`
    .font-serif {
      font-family: Garamond, Baskerville, "Baskerville Old Face", "Hoefler Text", "Times New Roman", serif;
    }
  `}</style>
);
