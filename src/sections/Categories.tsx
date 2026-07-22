import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Landmark, ArrowRight } from "lucide-react";

/**
 * `filterKey` must match Features.tsx's category values exactly:
 * "Commercial" | "Industrial" | "Residential" | "Featured" (= show all)
 *
 * "Plots & Land" has no matching category in Features.tsx yet,
 * so it currently falls back to "Featured" (shows every project).
 * Add "Plots & Land" as a real category in Features.tsx if you
 * want it to filter properly instead.
 */
type AnimationKind = "door" | "lift" | "gate";

const categories = [
  {
    title: "Residential",
    subtitle: "Flats & Villas",
    description:
      "Luxury apartments, villas and premium homes carefully selected for modern living.",
    animation: "door" as AnimationKind,
    href: "/properties/residential",
    filterKey: "Residential" as const,
    gradient: "from-[#7A9636] via-[#94B24B] to-[#5C7523]",
  },
  {
    title: "Commercial",
    subtitle: "Offices & Shops",
    description:
      "Premium office spaces, retail shops and commercial investment opportunities.",
    animation: "lift" as AnimationKind,
    href: "/properties/commercial",
    filterKey: "Commercial" as const,
    gradient: "from-[#8F2621] via-[#A83D38] to-[#701E1A]",
  },
  {
    title: "Industrial",
    subtitle: "Investment",
    description:
      "Residential plots, agricultural land and investment-ready properties.",
    animation: "gate" as AnimationKind,
    href: "/properties/plots",
    filterKey: "Industrial" as const,
    gradient: "from-[#999991] via-[#B8B8B0] to-[#75756E]",
  },
];

type FilterValue = "Featured" | "Commercial" | "Industrial" | "Residential";

interface CategoriesProps {
  /** Called with the category the user clicked; wire this to Features.tsx's onFilterChange. */
  onSelectCategory?: (filter: FilterValue) => void;
  /** id of the section to scroll to after selecting — defaults to Features.tsx's section id. */
  scrollTargetId?: string;
}

/** House with a door that swings open on click (Residential) */
function DoorIcon({ isOpening }: { isOpening: boolean }) {
  return (
    <div style={{ perspective: 600 }} className="relative h-11 w-11">
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
        <path
          d="M10 45 L50 10 L90 45 L90 90 L10 90 Z"
          fill="none"
          stroke="white"
          strokeWidth="5"
        />
        {/* window */}
        <rect x="60" y="52" width="16" height="16" fill="none" stroke="white" strokeWidth="3" />
      </svg>
      <motion.div
        animate={{ rotateY: isOpening ? -110 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        style={{
          position: "absolute",
          left: "26%",
          top: "56%",
          width: "22%",
          height: "34%",
          background: "white",
          borderRadius: 2,
          transformOrigin: "left center",
        }}
      />
    </div>
  );
}

/** Building shaft with a lift cab that rides to the top on click (Commercial) */
function LiftIcon({ isOpening }: { isOpening: boolean }) {
  return (
    <div className="relative h-11 w-11 overflow-hidden rounded-md border-2 border-white/70">
      {/* shaft rails */}
      <div className="absolute left-1/2 top-1 bottom-1 w-px -translate-x-3 bg-white/30" />
      <div className="absolute left-1/2 top-1 bottom-1 w-px translate-x-3 bg-white/30" />
      <motion.div
        className="absolute bottom-1 left-1/2 h-4 w-6 -translate-x-1/2 rounded-sm bg-white"
        animate={{ y: isOpening ? -30 : 0 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
      />
    </div>
  );
}

/** Industrial shutter/gate that rolls up to reveal the property mark (Industrial) */
function GateIcon({ isOpening }: { isOpening: boolean }) {
  return (
    <div className="relative h-11 w-11 overflow-hidden rounded-md border-2 border-white/70">
      <Landmark className="absolute inset-0 m-auto h-6 w-6 text-white" strokeWidth={2.2} />
      <motion.div
        className="absolute inset-x-0 top-0 h-full bg-gradient-to-b from-white/95 to-white/80"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, rgba(0,0,0,0.12) 0px, rgba(0,0,0,0.12) 2px, transparent 2px, transparent 7px)",
        }}
        animate={{ y: isOpening ? "-100%" : "0%" }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      />
    </div>
  );
}

function AnimatedIcon({
  animation,
  isOpening,
}: {
  animation: AnimationKind;
  isOpening: boolean;
}) {
  if (animation === "door") return <DoorIcon isOpening={isOpening} />;
  if (animation === "lift") return <LiftIcon isOpening={isOpening} />;
  return <GateIcon isOpening={isOpening} />;
}

const ResidentialBackgroundSVG = () => (
  <svg viewBox="0 0 400 300" preserveAspectRatio="none" className="w-full h-full stroke-[#7A9636]/50 fill-none" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    {/* House structure */}
    <path d="M 50 250 L 50 150 L 150 70 L 250 150 L 250 250 Z" />
    <path d="M 30 150 L 270 150" />
    <path d="M 250 250 L 370 250 L 370 170 L 250 170" />
    {/* Doors and Windows */}
    <rect x="120" y="190" width="40" height="60" />
    <circle cx="140" cy="220" r="2" fill="currentColor" />
    <rect x="75" y="170" width="30" height="30" />
    <path d="M 75 185 L 105 185 M 90 170 L 90 200" />
    <rect x="180" y="170" width="30" height="30" />
    <path d="M 180 185 L 210 185 M 195 170 L 195 200" />
    <circle cx="150" cy="110" r="15" />
    <path d="M 135 110 L 165 110 M 150 95 L 150 125" />
    {/* Hatching for roof */}
    <path d="M 65 138 L 85 150 M 80 126 L 105 150 M 95 114 L 125 150 M 110 102 L 145 150 M 125 90 L 165 150 M 140 78 L 185 150" opacity="0.55" />
  </svg>
);

const CommercialBackgroundSVG = () => (
  <svg viewBox="0 0 400 300" preserveAspectRatio="none" className="w-full h-full stroke-[#8F2621]/45 fill-none" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    {/* Modern tower silhouettes */}
    <rect x="40" y="60" width="90" height="190" />
    <rect x="130" y="110" width="90" height="140" />
    <rect x="220" y="40" width="100" height="210" />
    {/* Window grid lines on Tower 1 */}
    <path d="M 40 90 L 130 90 M 40 120 L 130 120 M 40 150 L 130 150 M 40 180 L 130 180 M 40 210 L 130 210 M 40 240 L 130 240" opacity="0.65" />
    <path d="M 70 60 L 70 250 M 100 60 L 100 250" opacity="0.65" />
    {/* Grid lines on Tower 3 */}
    <path d="M 220 70 L 320 70 M 220 100 L 320 100 M 220 130 L 320 130 M 220 160 L 320 160 M 220 190 L 320 190 M 220 220 L 320 220" opacity="0.6" />
    <path d="M 245 40 L 245 250 M 270 40 L 270 250 M 295 40 L 295 250" opacity="0.6" />
    {/* Diagonal grid accents */}
    <path d="M 130 130 L 220 130 M 130 160 L 220 160 M 130 190 L 220 190 M 130 220 L 220 220" opacity="0.75" />
  </svg>
);

const IndustrialBackgroundSVG = ({ isOpening }: { isOpening: boolean }) => (
  <svg viewBox="0 0 400 300" preserveAspectRatio="none" className="w-full h-full stroke-[#999991]/75 fill-none" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    {/* Factory/Warehouse silhouette behind the shutter */}
    <motion.path
      d="M 50 250 L 50 160 L 110 130 L 170 160 L 230 130 L 290 160 L 290 250 Z"
      fill="#8F2621"
      initial={{ opacity: 0.05 }}
      animate={{ opacity: isOpening ? 0.35 : 0.05 }}
      transition={{ duration: 0.5 }}
      stroke="#8F2621"
      strokeWidth="1.2"
    />
    {/* Chimney stacks with smoke path */}
    <path d="M 75 147 L 75 100 L 95 100 L 95 137" />
    <path d="M 85 90 Q 80 75 90 65 T 85 45" opacity="0.6" strokeDasharray="3 3" />
    {/* Shutter structure outline */}
    <rect x="110" y="165" width="130" height="85" />
    {/* The actual sliding Shutter gate */}
    <motion.g
      animate={{ y: isOpening ? -85 : 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="pointer-events-none"
    >
      <rect x="112" y="167" width="126" height="81" fill="#FFFFFF" stroke="#999991" strokeWidth="1.5" />
      {/* Horizontal shutter slats */}
      <path d="M 112 177 L 238 177 M 112 187 L 238 187 M 112 197 L 238 197 M 112 207 L 238 207 M 112 217 L 238 217 M 112 227 L 238 227 M 112 237 L 238 237 M 112 247 L 238 247" stroke="#999991" opacity="0.8" />
    </motion.g>
  </svg>
);

function CategoryBackground({
  category,
  isOpening,
}: {
  category: "Residential" | "Commercial" | "Industrial";
  isOpening: boolean;
}) {
  if (category === "Residential") return <ResidentialBackgroundSVG />;
  if (category === "Commercial") return <CommercialBackgroundSVG />;
  return <IndustrialBackgroundSVG isOpening={isOpening} />;
}

function CategoryCard({
  item,
  index,
  isOpening,
  onClick,
}: {
  item: typeof categories[number];
  index: number;
  isOpening: boolean;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Normalize coordinates around center (-0.5 to 0.5)
    const normX = (x / rect.width) - 0.5;
    const normY = (y / rect.height) - 0.5;
    
    setMousePos({ x: normX, y: normY });
    setCursorPos({ x, y });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePos({ x: 0, y: 0 });
    setCursorPos({ x: 0, y: 0 });
  };

  return (
    <motion.a
      ref={cardRef}
      href={item.href}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 70 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        delay: index * 0.15,
        duration: 0.8,
      }}
      whileHover={
        isOpening
          ? undefined
          : {
              rotateY: -8,
              scale: 1.03,
            }
      }
      style={{
        transformStyle: "preserve-3d",
      }}
      className="group relative overflow-hidden rounded-[16px] border border-[#999991]/30 bg-white p-8 transition-all duration-500 shadow-sm hover:shadow-md cursor-pointer"
    >
      {/* Background Color Glow */}
      <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100 bg-gradient-to-br from-[#7A9636]/10 via-transparent to-[#8F2621]/15 z-0" />

      {/* Categories Line-art Architectural Scene (Z-10 - Rendered on top of color washes) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-10 select-none">
        <motion.div
          animate={{
            scale: isOpening ? 1.15 : (isHovered ? 1.08 : 1),
            x: isOpening ? 0 : mousePos.x * -15,
            y: isOpening ? 0 : mousePos.y * -15,
            opacity: isOpening ? 1.0 : (isHovered ? 0.45 : 0.38),
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full"
        >
          <CategoryBackground category={item.filterKey} isOpening={isOpening} />
        </motion.div>
      </div>

      {/* Door Warm Glow Reveal (Residential specific click reveal - z-5 under outlines - Soft Light Green) */}
      {item.filterKey === "Residential" && isOpening && (
        <motion.div
          initial={{ opacity: 0, scale: 0.2 }}
          animate={{ opacity: 0.95, scale: 3.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute pointer-events-none rounded-full bg-[radial-gradient(circle,_rgba(148,178,75,0.45)_0%,_rgba(122,150,54,0.1)_50%,_transparent_100%)] w-[300px] h-[300px] -translate-x-1/2 -translate-y-1/2 z-5"
          style={{ left: "35%", top: "73%" }}
        />
      )}

      {/* Speed Lines Reveal (Commercial specific click reveal - z-5 under outlines) */}
      {item.filterKey === "Commercial" && isOpening && (
        <>
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 0.28 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute inset-0 bg-gradient-to-t from-[#8F2621]/45 to-transparent z-5 pointer-events-none"
          />
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-[2.5px] bg-[#8F2621]/80"
                style={{
                  left: `${10 + i * 12}%`,
                  height: `${60 + Math.random() * 50}px`,
                  top: "100%",
                }}
                animate={{ y: "-280%" }}
                transition={{ duration: 0.5, ease: "easeIn", delay: i * 0.04 }}
              />
            ))}
          </div>
        </>
      )}

      {/* Particle Shimmer Reveal (Industrial specific click reveal - z-5 under outlines) */}
      {item.filterKey === "Industrial" && isOpening && (
        <>
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 0.25 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute inset-0 bg-gradient-to-t from-[#7A9636]/40 to-transparent z-5 pointer-events-none"
          />
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-5">
            {Array.from({ length: 18 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2.5 h-2.5 rounded-full bg-[#7A9636]"
                style={{
                  left: `${15 + Math.random() * 70}%`,
                  top: `${160 + Math.random() * 60}px`,
                }}
                animate={{
                  scale: [0.5, 2.5, 0],
                  y: [0, -90 - Math.random() * 60],
                  x: [0, (Math.random() - 0.5) * 60],
                  opacity: [0, 0.95, 0],
                }}
                transition={{ duration: 0.6, delay: Math.random() * 0.25 }}
              />
            ))}
          </div>
        </>
      )}

      {/* Follow the Cursor Radial White Glow (Light Source following cursor) */}
      <motion.div
        className="absolute pointer-events-none w-[240px] h-[240px] rounded-full mix-blend-screen opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0) 70%)",
          left: 0,
          top: 0,
          x: cursorPos.x - 120,
          y: cursorPos.y - 120,
        }}
      />

      {/* Animated Foreground Content container that fades out slow on click */}
      <motion.div
        animate={{
          opacity: isOpening ? 0 : 1,
          y: isOpening ? -15 : 0,
        }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="relative z-20 flex flex-col h-full w-full"
      >
        {/* Icon */}
        <motion.div
          whileHover={
            isOpening
              ? undefined
              : {
                  scale: 1.1,
                }
          }
          transition={{ duration: 0.4 }}
          className={`relative flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br ${item.gradient} shadow-md`}
        >
          <AnimatedIcon animation={item.animation} isOpening={isOpening} />
        </motion.div>

        {/* Content */}
        <div className="relative mt-8">
          <p className="text-[#7A9636] uppercase tracking-[4px] text-xs font-semibold">
            {item.subtitle}
          </p>

          <h3 className="mt-2 text-3xl font-bold text-[#8F2621] font-serif">
            {item.title}
          </h3>

          <p className="mt-5 leading-8 text-[#999991] font-light">
            {item.description}
          </p>
        </div>

        {/* Button */}
        <motion.div
          whileHover={{ x: 6 }}
          className="relative mt-10 flex items-center gap-3 font-semibold text-[#8F2621]"
        >
          {isOpening ? "Opening..." : "Explore Category"}
          <ArrowRight className="h-5 w-5 transition group-hover:translate-x-2" />
        </motion.div>
      </motion.div>

      {/* Floating Border */}
      <div className="absolute inset-0 rounded-[16px] border border-[#7A9636]/30 opacity-0 group-hover:opacity-100 transition duration-500 z-30" />
    </motion.a>
  );
}

export default function Categories({
  onSelectCategory,
  scrollTargetId = "projects",
}: CategoriesProps) {
  const [openingIndex, setOpeningIndex] = useState<number | null>(null);

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    filterKey: FilterValue,
    index: number
  ) => {
    e.preventDefault();
    if (openingIndex !== null) return;

    setOpeningIndex(index);
    window.setTimeout(() => {
      onSelectCategory?.(filterKey);
      document
        .getElementById(scrollTargetId)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
      setOpeningIndex(null);
    }, 1000);
  };

  return (
    <section className="relative overflow-hidden bg-[#F5F7E3] py-10 border-b border-[#999991]/25">
      {/* Background Glow */}
      <div className="absolute left-20 top-20 h-80 w-80 rounded-full bg-[#7A9636]/5 blur-[140px]" />
      <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-[#8F2621]/3 blur-[180px]" />

      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <p className="uppercase tracking-[6px] text-[#7A9636] text-lg font-semibold">
            Explore Properties
          </p>

          <div className="flex flex-col items-center">
            <h2 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-bold text-[#8F2621] font-serif">Property Categories</h2>
          </div>

          <p className="mx-auto mt-6 max-w-lg text-[#999991] text-lg font-light leading-relaxed">
            Find the perfect property tailored to your lifestyle, business, or investment goals.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((item, index) => {
            const isOpening = openingIndex === index;

            return (
              <CategoryCard
                key={index}
                item={item}
                index={index}
                isOpening={isOpening}
                onClick={(e) => handleClick(e, item.filterKey, index)}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}