"use client";

/**
 * Blog.tsx — Vaichal Constructions
 * ------------------------------------------------------------------
 * Design concept: "Site Log"
 * Companion piece to Gallery.tsx's "Drawing Set" — where the gallery reads
 * like a set of drawing sheets, the blog reads like a site engineer's
 * logbook: dated entries, a log number, and red-pen margin annotations
 * for the key takeaways so a reader can scan a post in five seconds.
 *
 *   - Animated word-by-word headline reveal (on load + on scroll)
 *   - Scroll-triggered staggered card reveals
 *   - Mouse-tracked tilt + glow hover (same signature as Gallery.tsx)
 *   - "Redline" takeaway bullets styled like margin review marks
 *   - Category filter, featured post, responsive grid
 *
 * Dependencies: npm i framer-motion lucide-react
 * Replace all copy, dates, images and hrefs below with real CMS content
 * before shipping — this is placeholder text to demonstrate structure.
 * ------------------------------------------------------------------
 */

import { useMemo, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, type Variants } from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";

type Category = "Site Safety" | "Industrial Insights" | "Sustainability" | "Client Stories";

interface Post {
  id: string;
  log: string; // e.g. "LOG-014"
  title: string;
  excerpt: string;
  takeaways: [string, string] | [string, string, string];
  category: Category;
  date: string;
  readMins: number;
  image: string;
  href: string;
  featured?: boolean;
}

// Placeholder content — swap in real posts, dates and CMS-driven hrefs.
const POSTS: Post[] = [
  {
    id: "on-time-delivery",
    log: "LOG-014",
    title: "Building for the Long Term: Why On-Time Delivery Still Wins Industrial Contracts",
    excerpt:
      "Self-owned infrastructure removes the biggest variable in industrial builds — the subcontractor's schedule. Here's how that changes what a delivery date actually means.",
    takeaways: [
      "Owning plant & equipment cuts hand-off delays between trades",
      "A fixed schedule lets clients plan commissioning around a real date, not an estimate",
      "Repeat clients cite predictability over price as the deciding factor",
    ],
    category: "Industrial Insights",
    date: "2026-07-02",
    readMins: 6,
    image: "https://vaichal.com/wp-content/uploads/2025/04/GEAP02.jpg",
    href: "#",
    featured: true,
  },
  {
    id: "blueprint-to-handover",
    log: "LOG-013",
    title: "From Blueprint to Handover: Inside a Logistics Park Build",
    excerpt:
      "A walk through the phases of a large-format warehouse build — site grading, tilt-up panels, and the punch-list week nobody talks about.",
    takeaways: [
      "Grading and drainage decisions made in week one shape the whole build",
      "The punch-list week is where most delivery-date slippage actually happens",
    ],
    category: "Client Stories",
    date: "2026-06-18",
    readMins: 5,
    image: "https://vaichal.com/wp-content/uploads/2025/04/Indospace-05.jpg",
    href: "#",
  },
  {
    id: "monsoon-curing",
    log: "LOG-012",
    title: "Concrete Curing in Monsoon: Field Notes from a Pune Site",
    excerpt:
      "Pune's monsoon window forces a different curing discipline. Notes from the site log on covering, timing pours, and reading humidity right.",
    takeaways: [
      "Pours are timed against the radar, not the calendar, from June to September",
      "Wet-cure covers stay on 40% longer than the dry-season default",
    ],
    category: "Site Safety",
    date: "2026-06-05",
    readMins: 4,
    image: "https://vaichal.com/wp-content/uploads/2025/04/Fiat-01.jpg",
    href: "#",
  },
  {
    id: "choosing-a-contractor",
    log: "LOG-011",
    title: "Choosing a Contractor for Industrial Projects: 5 Questions to Ask",
    excerpt:
      "Before signing, most clients ask about price and timeline. The questions that actually predict a smooth build are different.",
    takeaways: [
      "Ask who owns the equipment on site, not just who's listed as contractor",
      "Ask to see a project that ran into a real problem, not just a finished one",
    ],
    category: "Client Stories",
    date: "2026-05-22",
    readMins: 7,
    image: "https://vaichal.com/wp-content/uploads/2025/04/Ador-Welding-01.jpg",
    href: "#",
  },
  {
    id: "sustainable-practices",
    log: "LOG-010",
    title: "Sustainable Construction Practices We're Adopting Across Sites",
    excerpt:
      "Fly-ash blends, water recycling on curing, and site-waste segregation — small changes across every project add up.",
    takeaways: [
      "Fly-ash blended concrete is now default across industrial pours",
      "Site water recycling has cut fresh-water curing demand measurably",
    ],
    category: "Sustainability",
    date: "2026-05-09",
    readMins: 5,
    image: "https://vaichal.com/wp-content/uploads/2025/04/Star-02.jpg",
    href: "#",
  },
  {
    id: "site-safety-culture",
    log: "LOG-009",
    title: "Safety Isn't a Checklist — It's a Site Culture",
    excerpt:
      "PPE compliance is the easy part. The harder, higher-leverage work is building a site where workers flag risk before an inspector has to.",
    takeaways: [
      "Near-miss reporting, not incident counts, is the metric worth tracking",
      "Toolbox talks work better run by crew leads than by safety officers",
    ],
    category: "Site Safety",
    date: "2026-04-27",
    readMins: 6,
    image: "https://vaichal.com/wp-content/uploads/2025/04/Venky-03.jpg",
    href: "#",
  },
];

const FILTERS: Array<"All" | Category> = [
  "All",
  "Industrial Insights",
  "Client Stories",
  "Site Safety",
  "Sustainability",
];

export default function Blog() {
  const [active, setActive] = useState<"All" | Category>("All");

  const featured = POSTS.find((p) => p.featured);
  const rest = useMemo(() => {
    const list = POSTS.filter((p) => !p.featured);
    return active === "All" ? list : list.filter((p) => p.category === active);
  }, [active]);

  return (
    <section className="blg" aria-label="Vaichal site log">
      <style>{BLG_STYLES}</style>

      <header className="blg-head">
        <p className="blg-eyebrow">Site Log — dispatches from the field</p>
        <AnimatedHeading text="Notes From the Build" />
        <p className="blg-sub">
          Field observations, project walkthroughs and the occasional hard-won lesson —
          written the way our site engineers actually log them.
        </p>
      </header>

      {featured && <FeaturedPost post={featured} />}

      <div className="blg-filters" role="tablist" aria-label="Filter posts by category">
        {FILTERS.map((f) => (
          <button
            key={f}
            role="tab"
            aria-selected={active === f}
            className={`blg-filter${active === f ? " is-active" : ""}`}
            onClick={() => setActive(f)}
          >
            {f}
            {active === f && (
              <motion.span layoutId="blg-filter-underline" className="blg-filter-underline" />
            )}
          </button>
        ))}
      </div>

      <div className="blg-grid">
        {rest.map((p, i) => (
          <PostCard key={p.id} post={p} index={i} />
        ))}
      </div>

      {rest.length === 0 && (
        <p className="blg-empty">No entries logged under “{active}” yet.</p>
      )}
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Animated word-by-word heading                                       */
/* ------------------------------------------------------------------ */

function AnimatedHeading({ text }: { text: string }) {
  const words = text.split(" ");
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
  };
  const word: Variants = {
    hidden: { opacity: 0, y: 18, rotateX: 40 },
    show: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
  };
  return (
    <motion.h1
      className="blg-title"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      style={{ perspective: 600 }}
    >
      {words.map((w, i) => (
        <motion.span key={i} variants={word} className="blg-title-word">
          {w}&nbsp;
        </motion.span>
      ))}
    </motion.h1>
  );
}

/* Reveals a block of text line-by-line as it scrolls into view */
function AnimatedParagraph({ text, className }: { text: string; className?: string }) {
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.03 } },
  };
  const char: Variants = {
    hidden: { opacity: 0.25 },
    show: { opacity: 1, transition: { duration: 0.3 } },
  };
  const words = text.split(" ");
  return (
    <motion.p
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
    >
      {words.map((w, i) => (
        <motion.span key={i} variants={char}>
          {w}{" "}
        </motion.span>
      ))}
    </motion.p>
  );
}

/* ------------------------------------------------------------------ */
/* Featured post                                                       */
/* ------------------------------------------------------------------ */

function FeaturedPost({ post: p }: { post: Post }) {
  return (
    <motion.a
      href={p.href}
      className="blg-featured"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="blg-featured-media">
        <img src={p.image} alt={p.title} loading="lazy" />
        <span className="blg-scan" />
        <span className="blg-featured-tag">Featured entry</span>
      </div>
      <div className="blg-featured-body">
        <div className="blg-meta">
          <span className="blg-log">{p.log}</span>
          <span className="blg-cat">{p.category}</span>
          <span className="blg-date">
            <Clock size={12} /> {p.readMins} min read
          </span>
        </div>
        <h2>{p.title}</h2>
        <AnimatedParagraph text={p.excerpt} className="blg-excerpt" />

        <ul className="blg-takeaways">
          {p.takeaways.map((t, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 + i * 0.1, duration: 0.4 }}
            >
              <span className="blg-redline" />
              {t}
            </motion.li>
          ))}
        </ul>

        <span className="blg-cta">
          Read full entry <ArrowUpRight size={16} />
        </span>
      </div>
    </motion.a>
  );
}

/* ------------------------------------------------------------------ */
/* Post card with tilt hover                                           */
/* ------------------------------------------------------------------ */

function PostCard({ post: p, index: i }: { post: Post; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [6, -6]), { stiffness: 260, damping: 22 });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-6, 6]), { stiffness: 260, damping: 22 });
  const glowX = useTransform(mx, (v) => `${v * 100}%`);
  const glowY = useTransform(my, (v) => `${v * 100}%`);
  const glowBg = useTransform(
    [glowX, glowY],
    ([x, y]) => `radial-gradient(200px circle at ${x} ${y}, rgba(143,38,33,0.16), transparent 70%)`
  );

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia("(max-width: 1024px)").matches) return;
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
    <motion.a
      href={p.href}
      className="blg-card"
      style={{ perspective: 800 }}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        ref={ref}
        className="blg-card-frame"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        whileHover={{ y: -6 }}
      >
        <motion.span className="blg-glow" style={{ background: glowBg }} />

        <div className="blg-img-wrap">
          <img src={p.image} alt={p.title} loading="lazy" />
          <span className="blg-scan" />
          <span className="blg-log-badge">{p.log}</span>
        </div>

        <div className="blg-card-body">
          <div className="blg-meta">
            <span className="blg-cat">{p.category}</span>
            <span className="blg-date">
              <Clock size={11} /> {p.readMins} min
            </span>
          </div>

          <h3>{p.title}</h3>
          <p className="blg-card-excerpt">{p.excerpt}</p>

          <ul className="blg-takeaways blg-takeaways-sm">
            {p.takeaways.slice(0, 2).map((t, ti) => (
              <li key={ti}>
                <span className="blg-redline" />
                {t}
              </li>
            ))}
          </ul>

          <motion.span className="blg-cta blg-cta-sm" whileHover={{ x: 4 }}>
            Continue reading <ArrowUpRight size={14} />
          </motion.span>
        </div>
      </motion.div>
    </motion.a>
  );
}

const BLG_STYLES = `
.blg{
  --bg:#F5F7E3;
  --surface:#FFFFFF;
  --grid-line:rgba(153,153,145,0.22);
  --paper:#1B1B1B;
  --ink-muted:#4A4A45;
  --amber:#8F2621;
  --steel:#7A9636;
  --redline:#8F2621;
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
.blg-head{max-width:760px;margin:0 auto 3rem}
.blg-eyebrow{
  font-family:'Poppins', ui-monospace, monospace;
  font-size:.72rem;letter-spacing:.14em;text-transform:uppercase;
  color:var(--steel);margin:0 0 .9rem;
  font-weight:600;
}
.blg-title{
  font-family:'Lora', ui-sans-serif, sans-serif;
  font-weight:700;letter-spacing:.02em;
  font-size:clamp(2.1rem,5vw,3.4rem);line-height:1.02;margin:0 0 .9rem;
  display:flex;flex-wrap:wrap;
  color:var(--amber);
}
.blg-title-word{display:inline-block}
.blg-sub{color:var(--ink-muted);font-size:1rem;line-height:1.6;max-width:52ch;margin:0;font-weight:300}

.blg-featured{
  display:block;max-width:1200px;margin:0 auto 3rem;
  text-decoration:none;color:inherit;
  background:var(--surface);border:1px solid var(--grid-line);
  display:grid;grid-template-columns:1.1fr 1fr;overflow:hidden;
  transition:border-color .3s ease;
  border-radius:16px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}
.blg-featured:hover{border-color:var(--amber);box-shadow: 0 4px 6px rgba(0,0,0,0.05)}
.blg-featured-media{position:relative;aspect-ratio:4/3;overflow:hidden;background:#F5F7E3}
.blg-featured-media img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .7s cubic-bezier(.22,1,.36,1);filter:saturate(.95) contrast(1.01)}
.blg-featured:hover .blg-featured-media img{transform:scale(1.06)}
.blg-featured-tag{
  position:absolute;top:12px;left:12px;z-index:2;
  font-family:'Poppins',monospace;font-size:.68rem;letter-spacing:.06em;text-transform:uppercase;
  background:var(--amber);color:#FFFFFF;padding:.3rem .55rem;border-radius:4px;
  font-weight:600;
}
.blg-featured-body{padding:2rem 2.2rem;display:flex;flex-direction:column;justify-content:center}
.blg-featured-body h2{
  font-family:'Lora',sans-serif;font-weight:700;
  font-size:1.5rem;line-height:1.15;margin:.7rem 0 .8rem;color:var(--paper);
}

.blg-meta{display:flex;flex-wrap:wrap;align-items:center;gap:.9rem;margin-bottom:.2rem}
.blg-log{
  font-family:'Poppins',monospace;font-size:.7rem;color:var(--steel);
  border:1px solid var(--grid-line);padding:.15rem .4rem;border-radius:4px;
  font-weight:600;
}
.blg-cat{
  font-family:'Poppins',monospace;font-size:.68rem;text-transform:uppercase;letter-spacing:.05em;
  color:var(--steel);
  font-weight:600;
}
.blg-date{
  font-family:'Poppins',monospace;font-size:.68rem;color:var(--ink-muted);
  display:inline-flex;align-items:center;gap:.3rem;
}

.blg-excerpt{color:var(--ink-muted);font-size:.98rem;line-height:1.65;margin:0 0 1.1rem;font-weight:300}

.blg-takeaways{list-style:none;margin:0 0 1.3rem;padding:0;display:flex;flex-direction:column;gap:.5rem}
.blg-takeaways li{
  position:relative;padding-left:1.1rem;font-size:.88rem;color:var(--paper);line-height:1.5;
}
.blg-redline{
  position:absolute;left:0;top:.45em;width:8px;height:8px;
  border:2px solid var(--redline);border-radius:50%;background:transparent;
}
.blg-takeaways-sm li{font-size:.82rem;color:var(--ink-muted);font-weight:300}

.blg-cta{
  display:inline-flex;align-items:center;gap:.4rem;
  font-family:'Poppins',monospace;font-size:.78rem;text-transform:uppercase;letter-spacing:.05em;
  color:var(--amber);width:fit-content;
  font-weight:600;
}
.blg-cta-sm{font-size:.72rem}

.blg-filters{
  max-width:1200px;margin:0 auto 2.5rem;
  display:flex;gap:1.6rem;flex-wrap:wrap;
  border-top:1px solid var(--grid-line);border-bottom:1px solid var(--grid-line);
  padding:1rem 0;
}
.blg-filter{
  position:relative;background:none;border:none;cursor:pointer;
  font-family:'Poppins', ui-monospace, monospace;
  font-size:.8rem;letter-spacing:.06em;text-transform:uppercase;
  color:var(--ink-muted);padding:.35rem 0;transition:color .2s ease;
  font-weight:500;
}
.blg-filter:hover{color:var(--paper)}
.blg-filter.is-active{color:var(--amber)}
.blg-filter-underline{position:absolute;left:0;right:0;bottom:-1rem;height:2px;background:var(--amber)}

.blg-grid{
  max-width:1200px;margin:0 auto;
  display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));
  gap:1.75rem;
}
.blg-card{display:block;text-decoration:none;color:inherit;cursor:pointer}
.blg-card-frame{
  position:relative;background:var(--surface);border:1px solid var(--grid-line);
  overflow:hidden;transition:border-color .3s ease;will-change:transform;
  border-radius:16px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}
.blg-card-frame:hover{border-color:var(--amber);box-shadow: 0 4px 6px rgba(0,0,0,0.05)}
.blg-glow{position:absolute;inset:0;pointer-events:none;z-index:1;opacity:0;transition:opacity .3s ease}
.blg-card-frame:hover .blg-glow{opacity:1}

.blg-img-wrap{position:relative;aspect-ratio:16/10;overflow:hidden;background:#F5F7E3}
.blg-img-wrap img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .6s cubic-bezier(.22,1,.36,1);filter:saturate(.95) contrast(1.01)}
.blg-card-frame:hover .blg-img-wrap img{transform:scale(1.08)}
.blg-log-badge{
  position:absolute;bottom:8px;left:8px;z-index:2;
  font-family:'Poppins',monospace;font-size:.65rem;letter-spacing:.05em;
  color:var(--paper);background:rgba(255,255,255,.8);border:1px solid var(--grid-line);
  padding:.15rem .4rem;border-radius:4px;
}
.blg-scan{
  position:absolute;left:0;right:0;height:2px;top:-10%;
  background:linear-gradient(90deg,transparent,var(--amber),transparent);opacity:0;
}
.blg-card-frame:hover .blg-scan{animation:blg-scan-move 1.1s ease-in-out;opacity:1}
@keyframes blg-scan-move{0%{top:0;opacity:0}10%{opacity:1}100%{top:100%;opacity:0}}

.blg-card-body{position:relative;z-index:2;padding:1.25rem 1.2rem 1.3rem;background:var(--surface)}
.blg-card-body h3{
  font-family:'Lora',sans-serif;font-weight:700;
  font-size:1.02rem;line-height:1.25;margin:.6rem 0 .5rem;color:var(--paper);
}
.blg-card-excerpt{color:var(--ink-muted);font-size:.85rem;line-height:1.55;margin:0 0 .9rem;font-weight:300}

.blg-empty{text-align:center;color:var(--ink-muted);padding:3rem 0;font-family:'Poppins',sans-serif}

@media (max-width: 860px){
  .blg-featured{grid-template-columns:1fr}
}
@media (max-width: 640px){
  .blg{padding:5rem 1rem 4rem}
  .blg-featured-body{padding:1.2rem 1rem}
  .blg-title{font-size:2.2rem}
}
@media (prefers-reduced-motion: reduce){
  .blg-card-frame, .blg-img-wrap img, .blg-scan, .blg-featured-media img{transition:none;animation:none}
}
`;