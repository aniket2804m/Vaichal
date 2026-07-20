import { useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import {
  Play,
  X,
  RotateCw,
  Maximize2,
  Home,
  BedDouble,
  ChefHat,
  Bath,
  Sofa,
  TreePine,
} from "lucide-react";

/**
 * VirtualTour.tsx
 * ---------------------------------------------------------------
 * Real-estate "Virtual Tour" section — room-by-room switcher with
 * crossfade transitions, an animated 360° badge, a scroll-reveal
 * heading, and a video modal for the walkthrough.
 *
 * Dependencies (install if not already present):
 *   npm install framer-motion lucide-react
 *
 * Replace the `image` (and optional `videoUrl`) fields below with
 * your real photos / walkthrough video links.
 * ---------------------------------------------------------------
 */

interface Room {
  key: string;
  label: string;
  icon: typeof Home;
  image: string;
  videoUrl?: string;
  caption: string;
}

const rooms: Room[] = [
  {
    key: "living",
    label: "Living Room",
    icon: Sofa,
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1600&auto=format&fit=crop",
    caption: "Sunlit living space with an open, airy layout.",
  },
  {
    key: "bedroom",
    label: "Master Bedroom",
    icon: BedDouble,
    image:
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=1600&auto=format&fit=crop",
    caption: "A quiet retreat with warm natural light.",
  },
  {
    key: "kitchen",
    label: "Kitchen",
    icon: ChefHat,
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop",
    caption: "Modular kitchen designed for everyday ease.",
  },
  {
    key: "bathroom",
    label: "Bathroom",
    icon: Bath,
    image:
      "https://images.unsplash.com/photo-1620626011761-996317b8d101?q=80&w=1600&auto=format&fit=crop",
    caption: "Clean, minimal fittings with premium finish.",
  },
  {
    key: "balcony",
    label: "Balcony View",
    icon: TreePine,
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1600&auto=format&fit=crop",
    caption: "Step outside to open skyline views.",
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

const tabListVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.2 } },
};

const tabItemVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function VirtualTour() {
  const [activeKey, setActiveKey] = useState(rooms[0].key);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const activeRoom = rooms.find((r) => r.key === activeKey) ?? rooms[0];

  return (
    <section className="relative overflow-hidden bg-[#F5F7E3] py-24 px-6 sm:px-10 lg:px-16 border-b border-[#999991]/25">
      {/* ambient glow, consistent with the rest of the site */}
      <div className="pointer-events-none absolute -top-32 left-[-10%] h-[480px] w-[480px] rounded-full bg-[#7A9636]/5 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-[-20%] right-[-8%] h-[420px] w-[420px] rounded-full bg-[#8F2621]/3 blur-[110px]" />

      <div className="relative mx-auto max-w-6xl">
        {/* ---------- Heading ---------- */}
        <motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.6 }}
  variants={headingVariants}
  className="mb-14 max-w-2xl mx-auto text-center"
>
  <span className="mb-4 block font-medium tracking-[0.25em] text-[#7A9636] text-lg uppercase">
    Explore From Anywhere
  </span>

  <h2 className="font-serif text-4xl sm:text-5xl leading-tight text-[#8F2621] font-bold">
    Take a virtual
    <br />
    <span className="text-[#7A9636]">walk through home</span>
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

  <motion.p
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.6 }}
    transition={{ duration: 0.6, delay: 0.35 }}
    className="mt-6 text-[#999991] text-base sm:text-lg font-light leading-relaxed"
  >
    Move between rooms just like you would on-site. Every view is
    captured exactly as it feels in person.
  </motion.p>
</motion.div>

        {/* ---------- Viewer ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-3xl border border-[#999991]/30 bg-white"
        >
          <div className="relative aspect-[16/9] w-full overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeRoom.key}
                src={activeRoom.image}
                alt={activeRoom.label}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </AnimatePresence>

            {/* dark gradient for text legibility inside image */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

            {/* rotating 360 badge */}
            <div className="absolute right-5 top-5 flex items-center gap-2 rounded-full bg-[#1B1B1B]/75 px-3 py-1.5 backdrop-blur-sm">
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="text-[#7A9636]"
              >
                <RotateCw size={14} />
              </motion.span>
              <span className="text-xs tracking-wide text-white">
                360° View
              </span>
            </div>

            {/* play button with pulsing ring */}
            <button
              onClick={() => setIsModalOpen(true)}
              aria-label="Play virtual tour video"
              className="group absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full"
            >
              <motion.span
                animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                className="absolute inset-0 rounded-full bg-[#8F2621]/40"
              />
              <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-[#8F2621] text-white transition-transform duration-300 group-hover:bg-[#7A9636]">
                <Play size={22} fill="currentColor" className="ml-1" />
              </span>
            </button>

            {/* expand icon */}
            <button
              onClick={() => setIsModalOpen(true)}
              aria-label="View fullscreen"
              className="absolute bottom-5 right-5 flex h-9 w-9 items-center justify-center rounded-full bg-[#1B1B1B]/60 text-white backdrop-blur-sm transition-colors hover:bg-[#8F2621] hover:text-white"
            >
              <Maximize2 size={15} />
            </button>

            {/* caption */}
            <div className="absolute bottom-5 left-5">
              <AnimatePresence mode="wait">
                <motion.p
                  key={activeRoom.key}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35 }}
                  className="max-w-xs text-sm text-white/90"
                >
                  {activeRoom.caption}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          {/* ---------- Room tabs ---------- */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={tabListVariants}
            className="flex flex-wrap gap-3 border-t border-[#999991]/20 p-5 bg-white"
          >
            {rooms.map((room) => {
              const Icon = room.icon;
              const isActive = room.key === activeKey;
              return (
                <motion.button
                  key={room.key}
                  variants={tabItemVariants}
                  onClick={() => setActiveKey(room.key)}
                  className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors duration-300 ${
                    isActive
                      ? "border-[#8F2621] bg-[#8F2621] text-white"
                      : "border-[#999991]/35 bg-transparent text-[#999991] hover:border-[#8F2621]/50 hover:text-[#8F2621]"
                  }`}
                >
                  <Icon size={15} strokeWidth={1.75} />
                  {room.label}
                </motion.button>
              );
            })}
          </motion.div>
        </motion.div>
      </div>

      {/* ---------- Fullscreen video modal ---------- */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-6 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-[#999991]/20 bg-white"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                aria-label="Close video"
                className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-[#1B1B1B]/70 text-white hover:bg-[#8F2621] hover:text-white"
              >
                <X size={16} />
              </button>

              <div className="aspect-video w-full">
                {activeRoom.videoUrl ? (
                  <video
                    src={activeRoom.videoUrl}
                    controls
                    autoPlay
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <img
                    src={activeRoom.image}
                    alt={activeRoom.label}
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}