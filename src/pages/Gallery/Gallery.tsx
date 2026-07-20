"use client";

/**
 * Gallery.tsx — Vaichal Constructions
 * ------------------------------------------------------------------
 * Design concept: "Drawing Set"
 * Each project is presented as a numbered drawing sheet on a blueprint
 * backdrop. v2 adds:
 *   - a mouse-tracked 3D tilt + glow on card hover
 *   - clicking a card opens a rotating carousel of that project's 4 photos
 *     (auto-advances, 3D rotateY transition, dots + arrows, keyboard nav)
 *
 * Dependencies: npm i framer-motion lucide-react
 * ------------------------------------------------------------------
 */

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from "lucide-react";

type Sector = "Industrial" | "Commercial" | "Residential";

interface Project {
  id: string;
  sheet: string; // drawing-sheet number, e.g. "DWG-04"
  title: string;
  client: string;
  sector: Sector;
  location: string;
  year: string;
  images: [string, string, string, string]; // exactly 4 photos per project
}

// Replace / extend with the real project index. Each project now needs
// 4 photos — swap the repeated placeholder URLs below for real additional
// angles/phases of each site before shipping.
const PROJECTS: Project[] = [
  {
    id: "birla-mandir",
    sheet: "DWG-01",
    title: "Birla Mandir",
    client: "Birla Estate",
    sector: "Commercial",
    location: "Pune, MH",
    year: "2023",
    images: [
      "https://vaichal.com/wp-content/uploads/2025/04/Birla-Mandir-01.jpg",
      "https://vaichal.com/wp-content/uploads/2025/04/BITS-01.jpg",
      "https://vaichal.com/wp-content/uploads/2025/04/BITS-03.jpg",
      "https://vaichal.com/wp-content/uploads/2025/04/Taj-Sats-01.jpg",
    ],
  },
  {
    id: "taj-sats",
    sheet: "DWG-02",
    title: "Taj SATS Facility",
    client: "Taj SATS",
    sector: "Commercial",
    location: "Pune, MH",
    year: "2022",
    images: [
      "https://vaichal.com/wp-content/uploads/2025/04/Taj-Sats-01.jpg",
      "https://vaichal.com/wp-content/uploads/2025/04/Birla-Mandir-01.jpg",
      "https://vaichal.com/wp-content/uploads/2025/04/BITS-01.jpg",
      "https://vaichal.com/wp-content/uploads/2025/04/BITS-03.jpg",
    ],
  },
  {
    id: "kaeser-1",
    sheet: "DWG-03",
    title: "Kaeser Compressors Plant",
    client: "Kaeser",
    sector: "Industrial",
    location: "Chakan, MH",
    year: "2022",
    images: [
      "https://vaichal.com/wp-content/uploads/2025/04/kaiser-05.jpg",
      "https://vaichal.com/wp-content/uploads/2025/04/kaiser-06.jpg",
      "https://vaichal.com/wp-content/uploads/2025/04/Fiat-01.jpg",
      "https://vaichal.com/wp-content/uploads/2025/04/GEAP02.jpg",
    ],
  },
  {
    id: "fiat",
    sheet: "DWG-04",
    title: "Fiat Manufacturing Unit",
    client: "Fiat",
    sector: "Industrial",
    location: "Ranjangaon, MH",
    year: "2021",
    images: [
      "https://vaichal.com/wp-content/uploads/2025/04/Fiat-01.jpg",
      "https://vaichal.com/wp-content/uploads/2025/04/kaiser-05.jpg",
      "https://vaichal.com/wp-content/uploads/2025/04/GEAP02.jpg",
      "https://vaichal.com/wp-content/uploads/2025/04/Venky-03.jpg",
    ],
  },
  {
    id: "geap",
    sheet: "DWG-05",
    title: "GEAP Industrial Complex",
    client: "GEAP",
    sector: "Industrial",
    location: "Pune, MH",
    year: "2021",
    images: [
      "https://vaichal.com/wp-content/uploads/2025/04/GEAP02.jpg",
      "https://vaichal.com/wp-content/uploads/2025/04/Fiat-01.jpg",
      "https://vaichal.com/wp-content/uploads/2025/04/kaiser-06.jpg",
      "https://vaichal.com/wp-content/uploads/2025/04/Ador-Welding-01.jpg",
    ],
  },
  {
    id: "venky",
    sheet: "DWG-06",
    title: "Venky's Processing Unit",
    client: "Venky's",
    sector: "Industrial",
    location: "Pune, MH",
    year: "2020",
    images: [
      "https://vaichal.com/wp-content/uploads/2025/04/Venky-03.jpg",
      "https://vaichal.com/wp-content/uploads/2025/04/Punvick-2.jpg",
      "https://vaichal.com/wp-content/uploads/2025/04/Star-02.jpg",
      "https://vaichal.com/wp-content/uploads/2025/04/Indospace-05.jpg",
    ],
  },
  {
    id: "ador-welding",
    sheet: "DWG-07",
    title: "Ador Welding Facility",
    client: "Ador Welding",
    sector: "Industrial",
    location: "Chinchwad, MH",
    year: "2020",
    images: [
      "https://vaichal.com/wp-content/uploads/2025/04/Ador-Welding-01.jpg",
      "https://vaichal.com/wp-content/uploads/2025/04/GEAP02.jpg",
      "https://vaichal.com/wp-content/uploads/2025/04/kaiser-05.jpg",
      "https://vaichal.com/wp-content/uploads/2025/04/Fiat-01.jpg",
    ],
  },
  {
    id: "punvick",
    sheet: "DWG-08",
    title: "Punvick Facility",
    client: "Punvick",
    sector: "Industrial",
    location: "Pune, MH",
    year: "2019",
    images: [
      "https://vaichal.com/wp-content/uploads/2025/04/Punvick-2.jpg",
      "https://vaichal.com/wp-content/uploads/2025/04/Star-02.jpg",
      "https://vaichal.com/wp-content/uploads/2025/04/Venky-03.jpg",
      "https://vaichal.com/wp-content/uploads/2025/04/Indospace-05.jpg",
    ],
  },
  {
    id: "star",
    sheet: "DWG-09",
    title: "Star Industrial Park",
    client: "Star",
    sector: "Industrial",
    location: "Pune, MH",
    year: "2019",
    images: [
      "https://vaichal.com/wp-content/uploads/2025/04/Star-02.jpg",
      "https://vaichal.com/wp-content/uploads/2025/04/Punvick-2.jpg",
      "https://vaichal.com/wp-content/uploads/2025/04/Indospace-05.jpg",
      "https://vaichal.com/wp-content/uploads/2025/04/Venky-03.jpg",
    ],
  },
  {
    id: "indospace",
    sheet: "DWG-10",
    title: "Indospace Logistics Park",
    client: "Indospace",
    sector: "Industrial",
    location: "Talegaon, MH",
    year: "2018",
    images: [
      "https://vaichal.com/wp-content/uploads/2025/04/Indospace-05.jpg",
      "https://vaichal.com/wp-content/uploads/2025/04/Star-02.jpg",
      "https://vaichal.com/wp-content/uploads/2025/04/Punvick-2.jpg",
      "https://vaichal.com/wp-content/uploads/2025/04/kaiser-06.jpg",
    ],
  },
  {
    id: "bits",
    sheet: "DWG-11",
    title: "BITS Campus Block",
    client: "BITS Pilani",
    sector: "Commercial",
    location: "Pune, MH",
    year: "2023",
    images: [
      "https://vaichal.com/wp-content/uploads/2025/04/BITS-01.jpg",
      "https://vaichal.com/wp-content/uploads/2025/04/BITS-03.jpg",
      "https://vaichal.com/wp-content/uploads/2025/04/Birla-Mandir-01.jpg",
      "https://vaichal.com/wp-content/uploads/2025/04/Taj-Sats-01.jpg",
    ],
  },
];

const FILTERS: Array<"All" | Sector> = ["All", "Industrial", "Commercial", "Residential"];
const AUTO_ROTATE_MS = 3000;

export default function Gallery() {
  const [active, setActive] = useState<"All" | Sector>("All");
  const [selected, setSelected] = useState<Project | null>(null);

  const filtered = useMemo(
    () => (active === "All" ? PROJECTS : PROJECTS.filter((p) => p.sector === active)),
    [active]
  );

  return (
    <section className="vch-gallery" aria-label="Vaichal project gallery">
      <style>{VCH_STYLES}</style>

      <header className="vch-head">
        <p className="vch-eyebrow">Drawing set — issued 1990 to present</p>
        <h2 className="vch-title">Site Index</h2>
        <p className="vch-sub">
          A working record of the plants, campuses and structures Vaichal has delivered
          across industrial, commercial and residential sectors.
        </p>

        <div className="vch-filters" role="tablist" aria-label="Filter projects by sector">
          {FILTERS.map((f) => (
            <button
              key={f}
              role="tab"
              aria-selected={active === f}
              className={`vch-filter${active === f ? " is-active" : ""}`}
              onClick={() => setActive(f)}
            >
              {f}
              {active === f && (
                <motion.span layoutId="vch-filter-underline" className="vch-filter-underline" />
              )}
            </button>
          ))}
        </div>
      </header>

      <motion.div layout className="vch-grid">
        <AnimatePresence mode="popLayout">
          {filtered.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} onOpen={() => setSelected(p)} />
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <p className="vch-empty">No sheets filed under “{active}” yet.</p>
      )}

      <AnimatePresence>
        {selected && <Lightbox project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Card with mouse-tracked 3D tilt                                     */
/* ------------------------------------------------------------------ */

function ProjectCard({
  project: p,
  index: i,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [8, -8]), { stiffness: 250, damping: 20 });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-8, 8]), { stiffness: 250, damping: 20 });
  const glowX = useTransform(mx, (v) => `${v * 100}%`);
  const glowY = useTransform(my, (v) => `${v * 100}%`);
  const glowBg = useTransform([glowX, glowY], ([x, y]) => `radial-gradient(220px circle at ${x} ${y}, rgba(143,38,33,0.18), transparent 70%)`);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };
  const handleLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12, scale: 0.98 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="vch-card"
      style={{ perspective: 900 }}
      onClick={onOpen}
    >
      <motion.div
        ref={ref}
        className="vch-card-frame"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        whileHover={{ y: -6 }}
      >
        <motion.span className="vch-glow" style={{ background: glowBg }} />
        <span className="vch-crop vch-crop-tl" />
        <span className="vch-crop vch-crop-tr" />
        <span className="vch-crop vch-crop-bl" />
        <span className="vch-crop vch-crop-br" />

        <div className="vch-img-wrap">
          <img src={p.images[0]} alt={`${p.title} — ${p.client}`} loading="lazy" />
          <span className="vch-scan" />
          <span className="vch-count">1 / {p.images.length}</span>
        </div>

        <div className="vch-titleblock">
          <motion.span
            className="vch-sheet"
            initial={{ opacity: 0, x: -6 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 + (i % 3) * 0.08 }}
          >
            {p.sheet}
          </motion.span>
          <motion.div
            className="vch-tb-text"
            initial={{ opacity: 0, x: -6 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.16 + (i % 3) * 0.08 }}
          >
            <h3>{p.title}</h3>
            <p>
              {p.client} · {p.location}
            </p>
          </motion.div>
          <span className="vch-sector">{p.sector}</span>
        </div>

        <motion.div
          className="vch-hover-cta"
          initial={{ opacity: 0, y: -6, scale: 0.85 }}
          whileHover={{ opacity: 1, y: 0, scale: 1 }}
        >
          <ArrowUpRight size={16} strokeWidth={2.25} />
        </motion.div>
      </motion.div>
    </motion.article>
  );
}

/* ------------------------------------------------------------------ */
/* Lightbox with auto-rotating 3D carousel (4 images per project)      */
/* ------------------------------------------------------------------ */

function Lightbox({ project, onClose }: { project: Project; onClose: () => void }) {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1); // 1 = forward, -1 = backward
  const [paused, setPaused] = useState(false);
  const images = project.images;

  const go = (next: number) => {
    setDir(next > index || (index === images.length - 1 && next === 0) ? 1 : -1);
    setIndex((next + images.length) % images.length);
  };

  // autoplay
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      setDir(1);
      setIndex((prev) => (prev + 1) % images.length);
    }, AUTO_ROTATE_MS);
    return () => clearInterval(t);
  }, [paused, images.length]);

  // keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") {
        setPaused(true);
        go(index + 1);
      }
      if (e.key === "ArrowLeft") {
        setPaused(true);
        go(index - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  return (
    <motion.div
      className="vch-lightbox"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="vch-lightbox-panel"
        initial={{ opacity: 0, scale: 0.94, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 8 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <button className="vch-close" onClick={onClose} aria-label="Close">
          <X size={18} />
        </button>

        <div className="vch-carousel" style={{ perspective: 1200 }}>
          <AnimatePresence initial={false} custom={dir} mode="popLayout">
            <motion.img
              key={index}
              src={images[index]}
              alt={`${project.title} — photo ${index + 1}`}
              custom={dir}
              initial={{ opacity: 0, rotateY: dir > 0 ? 70 : -70 }}
              animate={{ opacity: 1, rotateY: 0 }}
              exit={{ opacity: 0, rotateY: dir > 0 ? -70 : 70 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformStyle: "preserve-3d" }}
            />
          </AnimatePresence>

          <button
            className="vch-nav vch-nav-prev"
            aria-label="Previous photo"
            onClick={() => {
              setPaused(true);
              go(index - 1);
            }}
          >
            <ChevronLeft size={20} />
          </button>
          <button
            className="vch-nav vch-nav-next"
            aria-label="Next photo"
            onClick={() => {
              setPaused(true);
              go(index + 1);
            }}
          >
            <ChevronRight size={20} />
          </button>

          <div className="vch-dots">
            {images.map((_, d) => (
              <button
                key={d}
                aria-label={`Go to photo ${d + 1}`}
                className={`vch-dot${d === index ? " is-active" : ""}`}
                onClick={() => {
                  setPaused(true);
                  go(d);
                }}
              />
            ))}
          </div>
        </div>

        <div className="vch-lightbox-info">
          <span className="vch-sheet">{project.sheet}</span>
          <h3>{project.title}</h3>
          <p>
            {project.client} · {project.location} · {project.year}
          </p>
          <span className="vch-sector">{project.sector}</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

const VCH_STYLES = `
.vch-gallery{
  --bg:#F5F7E3;
  --surface:#FFFFFF;
  --grid-line:rgba(153,153,145,0.22);
  --paper:#1B1B1B;
  --ink-muted:#4A4A45;
  --amber:#8F2621;
  --steel:#7A9636;
  position:relative;
  background:var(--bg);
  color:var(--paper);
  padding:8rem 1.5rem 6rem;
  background-image:
    radial-gradient(circle at 50% 0%, rgba(122,150,54,0.08), transparent 70%),
    linear-gradient(90deg, var(--grid-line) 1px, transparent 1px);
  background-size:100% 100%, 160px 100%;
  font-family:'Poppins', ui-sans-serif, system-ui, sans-serif;
}
.vch-head{max-width:760px;margin:0 auto 3rem;text-align:left}
.vch-eyebrow{
  font-family:'Poppins', ui-monospace, monospace;
  font-size:.72rem;letter-spacing:.14em;text-transform:uppercase;
  color:var(--steel);margin:0 0 .9rem;
  font-weight:600;
}
.vch-title{
  font-family:'Lora', ui-sans-serif, sans-serif;
  font-weight:700;letter-spacing:.02em;
  font-size:clamp(2.1rem,5vw,3.4rem);line-height:1.02;margin:0 0 .9rem;
  color:var(--amber);
}
.vch-sub{color:var(--ink-muted);font-size:1rem;line-height:1.6;max-width:52ch;margin:0 0 2.2rem;font-weight:300}
.vch-filters{display:flex;gap:1.6rem;flex-wrap:wrap;border-top:1px solid var(--grid-line);padding-top:1.1rem}
.vch-filter{
  position:relative;background:none;border:none;cursor:pointer;
  font-family:'Poppins', ui-monospace, monospace;
  font-size:.8rem;letter-spacing:.06em;text-transform:uppercase;
  color:var(--ink-muted);padding:.35rem 0;transition:color .2s ease;
  font-weight:500;
}
.vch-filter:hover{color:var(--paper)}
.vch-filter.is-active{color:var(--amber)}
.vch-filter-underline{position:absolute;left:0;right:0;bottom:0;height:2px;background:var(--amber)}

.vch-grid{
  max-width:1200px;margin:0 auto;
  display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));
  gap:1.75rem;
}
.vch-card{cursor:pointer;list-style:none}
.vch-card-frame{
  position:relative;background:var(--surface);
  border:1px solid var(--grid-line);
  transition:border-color .3s ease;
  overflow:hidden;
  will-change:transform;
  border-radius:16px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}
.vch-card-frame:hover{border-color:var(--amber);box-shadow: 0 4px 6px rgba(0,0,0,0.05)}
.vch-glow{position:absolute;inset:0;pointer-events:none;z-index:1;opacity:0;transition:opacity .3s ease}
.vch-card-frame:hover .vch-glow{opacity:1}

.vch-crop{position:absolute;width:14px;height:14px;pointer-events:none;z-index:3;opacity:0;transition:opacity .3s ease}
.vch-card-frame:hover .vch-crop{opacity:1}
.vch-crop-tl{top:8px;left:8px;border-top:2px solid var(--amber);border-left:2px solid var(--amber)}
.vch-crop-tr{top:8px;right:8px;border-top:2px solid var(--amber);border-right:2px solid var(--amber)}
.vch-crop-bl{bottom:8px;left:8px;border-bottom:2px solid var(--amber);border-left:2px solid var(--amber)}
.vch-crop-br{bottom:8px;right:8px;border-bottom:2px solid var(--amber);border-right:2px solid var(--amber)}

.vch-img-wrap{position:relative;aspect-ratio:4/3;overflow:hidden;background:#F5F7E3}
.vch-img-wrap img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .6s cubic-bezier(.22,1,.36,1);filter:saturate(.95) contrast(1.01)}
.vch-card-frame:hover .vch-img-wrap img{transform:scale(1.08)}
.vch-count{
  position:absolute;bottom:8px;left:8px;z-index:3;
  font-family:'Poppins',monospace;font-size:.65rem;letter-spacing:.05em;
  color:var(--paper);background:rgba(255,255,255,.8);border:1px solid var(--grid-line);
  padding:.15rem .4rem;border-radius:4px;
}
.vch-scan{
  position:absolute;left:0;right:0;height:2px;top:-10%;
  background:linear-gradient(90deg,transparent,var(--amber),transparent);
  opacity:0;
}
.vch-card-frame:hover .vch-scan{animation:vch-scan-move 1.1s ease-in-out;opacity:1}
@keyframes vch-scan-move{
  0%{top:0;opacity:0}
  10%{opacity:1}
  100%{top:100%;opacity:0}
}

.vch-titleblock{
  position:relative;z-index:2;
  display:flex;align-items:flex-start;gap:.75rem;
  padding:1.25rem 1rem;border-top:1px solid var(--grid-line);
  background:var(--surface);
}
.vch-sheet{
  font-family:'Poppins', ui-monospace, monospace;
  font-size:.7rem;color:var(--steel);letter-spacing:.05em;
  border:1px solid var(--grid-line);padding:.15rem .4rem;border-radius:4px;flex-shrink:0;
  font-weight:600;
}
.vch-tb-text{flex:1;min-width:0}
.vch-tb-text h3{
  font-family:'Lora', sans-serif;font-weight:700;
  font-size:.95rem;letter-spacing:.01em;margin:0 0 .2rem;color:var(--paper);
  white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
}
.vch-tb-text p{margin:0;font-size:.78rem;color:var(--ink-muted);font-weight:300}
.vch-sector{
  font-family:'Poppins', ui-monospace, monospace;
  font-size:.65rem;color:var(--steel);text-transform:uppercase;letter-spacing:.06em;
  flex-shrink:0;align-self:center;
  font-weight:600;
}
.vch-hover-cta{
  position:absolute;top:10px;right:10px;z-index:3;
  width:30px;height:30px;border-radius:50%;
  background:var(--amber);color:#FFFFFF;
  display:flex;align-items:center;justify-content:center;
}

.vch-empty{text-align:center;color:var(--ink-muted);padding:3rem 0;font-family:'Poppins',sans-serif}

.vch-lightbox{
  position:fixed;inset:0;z-index:60;background:rgba(27,27,27,.9);
  display:flex;align-items:center;justify-content:center;padding:2rem;backdrop-filter:blur(4px);
}
.vch-lightbox-panel{
  position:relative;max-width:920px;width:100%;background:var(--surface);
  border:1px solid var(--grid-line);max-height:90vh;overflow:auto;
  border-radius:16px;
}
.vch-carousel{position:relative;aspect-ratio:16/9;background:#F5F7E3;overflow:hidden}
.vch-carousel img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block}
.vch-nav{
  position:absolute;top:50%;translate:0 -50%;z-index:4;
  width:38px;height:38px;border-radius:50%;border:1px solid var(--grid-line);
  background:rgba(27,27,27,.65);color:#FFFFFF;
  display:flex;align-items:center;justify-content:center;cursor:pointer;
  transition:border-color .2s ease, color .2s ease, background .2s ease;
}
.vch-nav:hover{border-color:var(--amber);color:var(--amber);background:rgba(27,27,27,.9)}
.vch-nav-prev{left:12px}
.vch-nav-next{right:12px}
.vch-dots{position:absolute;bottom:12px;left:50%;translate:-50% 0;z-index:4;display:flex;gap:.4rem}
.vch-dot{
  width:8px;height:8px;border-radius:50%;border:1px solid var(--grid-line);
  background:rgba(255,255,255,.25);cursor:pointer;padding:0;transition:background .2s ease, transform .2s ease;
}
.vch-dot.is-active{background:var(--amber);transform:scale(1.2)}
.vch-lightbox-info{padding:1.4rem 1.6rem;display:flex;flex-wrap:wrap;align-items:center;gap:.9rem}
.vch-lightbox-info h3{
  font-family:'Lora',sans-serif;font-weight:700;
  font-size:1.2rem;margin:0;width:100%;color:var(--paper);
}
.vch-lightbox-info p{margin:0;color:var(--ink-muted);font-size:.85rem}
.vch-close{
  position:absolute;top:12px;right:12px;z-index:5;
  width:34px;height:34px;border-radius:50%;border:1px solid var(--grid-line);
  background:rgba(27,27,27,.7);color:#FFFFFF;display:flex;align-items:center;justify-content:center;
  cursor:pointer;transition:border-color .2s ease, color .2s ease;
}
.vch-close:hover{border-color:var(--amber);color:var(--amber)}

@media (prefers-reduced-motion: reduce){
  .vch-card-frame, .vch-img-wrap img, .vch-crop, .vch-hover-cta, .vch-scan, .vch-carousel img{transition:none;animation:none}
}
`;