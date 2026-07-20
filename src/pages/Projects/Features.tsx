import { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import { MapPin, Building2, Search, RotateCcw, ChevronDown, ArrowUpRight } from "lucide-react";
import ProjectDetail from "./ProjectDetail";

/**
 * ─────────────────────────────────────────────────────────────
 *  DATA — replace `image` with real project photos.
 *  (Recommended: /public/projects/<slug>.jpg or a Cloudinary URL)
 * ─────────────────────────────────────────────────────────────
 */
type Category = "Commercial" | "Industrial" | "Residential";

interface ProjectSpecification {
  icon: string;
  title: string;
  value: string;
}

interface Project {
  id: string;
  title: string;
  location: string;
  category: Category;
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

const PROJECTS: Project[] = [
  {
    id: "venkys-drugs",
    title: "Venkys Drugs Manufacturing Plant and Allied Development (Phase I, II)",
    location: "Village Kesurdi, Shirwal",
    category: "Industrial",
    year: "2023",
    area: "1,20,000 sq.ft",
    scope: "Civil, Structural & Site Development",
    description:
      "A two-phase pharmaceutical manufacturing facility built to strict GMP compliance standards, including allied infrastructure, utility yards and internal road networks.",
    image: "/projects/venkys-drugs.jpg",
    status: "Ongoing",
    gallery: [
      "/projects/venkys-drugs.jpg",
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80"
    ],
    specifications: [
      { icon: "Building", title: "Structure Type", value: "GMP Pharmaceutical Plant" },
      { icon: "ShieldCheck", title: "Compliance", value: "FDA Cleanroom Compliant" },
      { icon: "Ruler", title: "Clear Height", value: "14 Meters Heavy Slab" },
      { icon: "Layers", title: "Foundation", value: "Heavy Industrial RCC Piles" }
    ]
  },
  {
    id: "ador-factory",
    title: "Ador Factory Building and Site Development Works (Phase I & II)",
    location: "Shivase",
    category: "Industrial",
    year: "2022",
    area: "95,000 sq.ft",
    scope: "Factory Shed, RCC Frame & Site Grading",
    description:
      "A phased industrial rollout combining a high-bay manufacturing shed with landscaped site development and stormwater management.",
    image: "/projects/ador-factory.jpg",
    status: "Completed",
    gallery: [
      "/projects/ador-factory.jpg",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80"
    ],
    specifications: [
      { icon: "Warehouse", title: "Facility Type", value: "Manufacturing Shed" },
      { icon: "ShieldCheck", title: "Safety", value: "OSHA & Fire Compliant" },
      { icon: "Ruler", title: "Span Width", value: "32 Meters Clear Span" },
      { icon: "Layers", title: "Roofing", value: "Galvalume Standing Seam Sheets" }
    ]
  },
  {
    id: "master-fluid",
    title: "Master Fluid Solutions Factory Building & Allied Site Development",
    location: "Chakan, Pune",
    category: "Industrial",
    year: "2022",
    area: "60,000 sq.ft",
    scope: "Design-Build, Structural Steel",
    description:
      "A precision-engineering plant building executed with a structural steel frame and insulated cladding for controlled internal environments.",
    image: "/projects/master-fluid.jpg",
    status: "Completed",
  },
  {
    id: "as-cargo",
    title: "AS Cargo Warehouse Buildings",
    location: "Chakan, Pune",
    category: "Industrial",
    year: "2021",
    area: "1,80,000 sq.ft",
    scope: "Pre-Engineered Building & Yard Works",
    description:
      "Large-span logistics warehousing built for high-throughput cargo handling, with reinforced dock aprons and heavy-vehicle circulation.",
    image: "/projects/as-cargo.jpg",
    status: "Completed",
  },
  {
    id: "garware-bestretch",
    title: "Garware Bestretch Factory Building & Allied Development",
    location: "Wai, Satara",
    category: "Industrial",
    year: "2021",
    area: "75,000 sq.ft",
    scope: "Civil & Structural Works",
    description:
      "A textile manufacturing facility with allied utility blocks, effluent treatment infrastructure and internal access roads.",
    image: "/projects/garware-bestretch.jpg",
    status: "Completed",
  },
  {
    id: "star-engineers",
    title: "Star Engineers Commercial and Industrial Building",
    location: "Chakan, Pune",
    category: "Commercial",
    year: "2023",
    area: "48,000 sq.ft",
    scope: "Mixed-Use Commercial & Industrial",
    description:
      "A dual-purpose building combining street-facing commercial frontage with rear industrial floor plates and a distinctive glazed corner facade.",
    image: "/projects/star-engineers.jpg",
    status: "Ongoing",
    gallery: [
      "/projects/star-engineers.jpg",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80"
    ],
    specifications: [
      { icon: "Building", title: "Structure", value: "Mixed-Use Glazed Frame" },
      { icon: "Sparkles", title: "Façade", value: "Structural Glazed Curtain Wall" },
      { icon: "Layers", title: "Flooring", value: "Laser-Screened Vacuum Dewatered Floor" },
      { icon: "ShieldCheck", title: "Energy", value: "LEED Gold Pre-Certified" }
    ]
  },
  {
    id: "punvick-warehouse",
    title: "Punvick Warehouse & Site Development Works",
    location: "Sanaswadi, Pune",
    category: "Industrial",
    year: "2020",
    area: "1,05,000 sq.ft",
    scope: "Warehouse Shell & Site Works",
    description:
      "A single-span storage warehouse with allied compound wall, drainage and paved yard development.",
    image: "/projects/punvick-warehouse.jpg",
    status: "Completed",
  },
  {
    id: "fiat-trimline",
    title: "Fiat India Trimline Shed & Allied Development Works",
    location: "Ranjangaon, Pune",
    category: "Industrial",
    year: "2020",
    area: "88,000 sq.ft",
    scope: "Automotive Shed Construction",
    description:
      "A trim-line production shed built to automotive-grade tolerances, with allied MEP-ready infrastructure.",
    image: "/projects/fiat-trimline.jpg",
    status: "Completed",
  },
  {
    id: "phoenix-mecano",
    title: "Phoenix Mecano Factory Shed Extension",
    location: "Bhare, Pirangut, Pune",
    category: "Industrial",
    year: "2022",
    area: "32,000 sq.ft",
    scope: "Brownfield Shed Extension",
    description:
      "A seamless extension to an operating manufacturing shed, executed with minimal disruption to ongoing plant operations.",
    image: "/projects/phoenix-mecano.jpg",
    status: "Completed",
  },
  {
    id: "tci-express",
    title: "TCI Express Warehouse Building",
    location: "Chakan, Pune",
    category: "Industrial",
    year: "2023",
    area: "70,000 sq.ft",
    scope: "Logistics Warehouse",
    description:
      "A logistics hub built for TCI Express with clear-span storage bays and dedicated loading-dock infrastructure.",
    image: "/projects/tci-express.jpg",
    status: "Upcoming",
  },
  {
    id: "kaeser-compressors",
    title: "Kaeser Compressors Industrial Complex & Site Development",
    location: "Pirangut, Pune",
    category: "Industrial",
    year: "2023",
    area: "55,000 sq.ft",
    scope: "Industrial Complex & External Works",
    description:
      "A full industrial complex for Kaeser Compressors including manufacturing floor, ancillary blocks and complete site development.",
    image: "/projects/kaeser-compressors.jpg",
    status: "Ongoing",
  },
  {
    id: "inhouse-residential",
    title: "Inhouse Residential Project (3 Buildings + Club House + Site Development)",
    location: "Pune",
    category: "Residential",
    year: "2021",
    area: "2,10,000 sq.ft",
    scope: "Residential Towers & Amenities",
    description:
      "A self-developed residential enclave of three towers with a dedicated clubhouse, landscaped podium and complete site infrastructure.",
    image: "/projects/inhouse-residential.jpg",
    status: "Ongoing",
    beds: 3,
    baths: 3,
    gallery: [
      "/projects/inhouse-residential.jpg",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80"
    ],
    specifications: [
      { icon: "Building", title: "Configuration", value: "3 Towers — 14 Floors" },
      { icon: "Sparkles", title: "Clubhouse", value: "Fully Equipped Gym & Spa" },
      { icon: "Layers", title: "Flooring", value: "Italian Vitrified Tiles" },
      { icon: "ShieldCheck", title: "Security", value: "3-Tier Video Intercom" }
    ]
  },
  {
    id: "kumar-princetown",
    title: 'RCC Works of Residential Building at Project "Kumar Princetown" — Parking + 22 Floors (Aluminium Formwork)',
    location: "Undri, Pune",
    category: "Residential",
    year: "2023",
    area: "3,00,000 sq.ft",
    scope: "RCC Structure — Aluminium Formwork System",
    description:
      "A high-rise residential RCC package executed with an aluminium formwork system to accelerate floor-cycle times across 22 habitable levels.",
    image: "/projects/kumar-princetown.jpg",
    status: "Completed",
    beds: 2,
    baths: 2,
    gallery: [
      "/projects/kumar-princetown.jpg",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80"
    ],
    specifications: [
      { icon: "Building", title: "Structure", value: "Mivan Aluminium Formwork" },
      { icon: "Ruler", title: "Habitable Floors", value: "22 Levels + Parking" },
      { icon: "ShieldCheck", title: "Wind Safety", value: "High-Rise Tunnel Tested" },
      { icon: "Layers", title: "Plastering", value: "Gypsum Finish Walls" }
    ]
  },
  {
    id: "gera-planet-of-joy",
    title: "Gera Planet of Joy — 78 Row Houses (Shell and Core)",
    location: "Kharadi, Pune",
    category: "Residential",
    year: "2022",
    area: "1,95,000 sq.ft",
    scope: "Shell & Core — Row Housing",
    description:
      "Shell-and-core delivery of 78 individual row houses within the Gera Planet of Joy township, sequenced for parallel handover.",
    image: "/projects/gera-planet-of-joy.jpg",
    status: "Completed",
    beds: 4,
    baths: 4,
    gallery: [
      "/projects/gera-planet-of-joy.jpg",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80"
    ],
    specifications: [
      { icon: "Building", title: "Layout Type", value: "78 Premium Row Houses" },
      { icon: "Layers", title: "Shell Finish", value: "Exposed RCC & Texture Finishes" },
      { icon: "Ruler", title: "Average Villa Area", value: "2,500 sq.ft" },
      { icon: "ShieldCheck", title: "Safety", value: "Fully Gated & Secured Access" }
    ]
  },
  {
    id: "bits-pilani-hostel",
    title: "Construction of Hostel Buildings (533 Rooms) at BITS Pilani, Goa Campus",
    location: "Zuarinagar, Goa",
    category: "Residential",
    year: "2021",
    area: "2,40,000 sq.ft",
    scope: "Institutional Hostel Blocks",
    description:
      "A campus hostel complex delivering 533 student rooms across multiple blocks, built to institutional durability standards.",
    image: "/projects/bits-pilani-hostel.jpg",
    status: "Completed",
    beds: 1,
    baths: 1,
  },
  {
    id: "taj-sats-mopa",
    title: "Taj Sats Flight Kitchen Building at Mopa Airport",
    location: "MOPA Airport, Goa",
    category: "Commercial",
    year: "2023",
    area: "40,000 sq.ft",
    scope: "Aviation Catering Facility",
    description:
      "A flight-kitchen facility built to airside catering standards for Taj Sats at the new Manohar International Airport, Mopa.",
    image: "/projects/taj-sats-mopa.jpg",
    status: "Completed",
    gallery: [
      "/projects/taj-sats-mopa.jpg",
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80"
    ],
    specifications: [
      { icon: "Building", title: "Structure", value: "Industrial RCC Grid Frame" },
      { icon: "ShieldCheck", title: "Compliance", value: "Taj Aviation Quality Standards" },
      { icon: "Ruler", title: "Zone Type", value: "High-Care Food Processing Zones" },
      { icon: "Layers", title: "Flooring", value: "Anti-Microbial Epoxy Flooring" }
    ]
  },

  {
    id: "dy-patil-som",
    title: "DY Patil School of Business — Shell and Core",
    location: "Nerul, Mumbai",
    category: "Commercial",
    year: "2022",
    area: "1,10,000 sq.ft",
    scope: "Institutional Shell & Core",
    description:
      "Shell-and-core construction for an academic business-school building, with a column-free lecture-hall wing and glazed atrium.",
    image: "/projects/dy-patil-som.jpg",
    status: "Completed",
  },
  {
    id: "birla-mandir-goa",
    title: "Birla Mandir at Goa — Shell and Core",
    location: "Zuarinagar, Goa",
    category: "Commercial",
    year: "2022",
    area: "25,000 sq.ft",
    scope: "Shell & Core — Religious Structure",
    description:
      "Shell-and-core structural works for a temple complex, executed with close attention to traditional form and finish tolerances.",
    image: "/projects/birla-mandir-goa.jpg",
    status: "Completed",
  },
  
];

const FILTERS: ("Featured" | Category)[] = [
  "Featured",
  "Commercial",
  "Industrial",
  "Residential",
];

/** ───────────────────────────────────────────────
 *  Signature element: a site-signage "plate" number
 *  in the corner of every card + blueprint corner ticks
 *  ─────────────────────────────────────────────── */
function CornerTicks() {
  return (
    <>
      <span className="pointer-events-none absolute left-3 top-3 h-4 w-4 border-l-2 border-t-2 border-white/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <span className="pointer-events-none absolute right-3 top-3 h-4 w-4 border-r-2 border-t-2 border-white/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <span className="pointer-events-none absolute bottom-3 left-3 h-4 w-4 border-b-2 border-l-2 border-white/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <span className="pointer-events-none absolute bottom-3 right-3 h-4 w-4 border-b-2 border-r-2 border-white/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </>
  );
}

function CustomDropdown({
  label,
  value,
  options,
  onChange,
  disabled = false,
}: {
  label: string;
  value: string;
  options: { label: string; value: string }[];
  onChange: (val: string) => void;
  disabled?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div ref={dropdownRef} className="relative flex flex-col gap-1.5 w-full">
      <span className="font-sans text-[10px] font-semibold tracking-[0.15em] text-[#4A4A45] uppercase select-none">
        {label}
      </span>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between h-11 w-full rounded-[4px] bg-white border border-[#999991]/30 px-3 text-sm text-[#1B1B1B] transition-all duration-300 select-none ${
          disabled
            ? "opacity-30 cursor-not-allowed"
            : "hover:bg-[#F5F7E3]/35 hover:border-[#999991]/50 focus:outline-none focus:border-[#8F2621]/50 focus:ring-1 focus:ring-[#8F2621] cursor-pointer"
        }`}
      >
        <span className="truncate">{selectedOption ? selectedOption.label : "All"}</span>
        <ChevronDown size={14} className={`text-[#4A4A45] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {isOpen && !disabled && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -8 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute top-[calc(100%+4px)] left-0 z-50 w-full rounded-[4px] bg-white border border-[#999991]/30 shadow-md py-1 max-h-60 overflow-y-auto"
          >
            {options.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3 py-2 text-xs transition-colors hover:bg-[#F5F7E3]/30 cursor-pointer ${
                  value === opt.value ? "text-[#8F2621] font-semibold bg-[#7A9636]/10" : "text-[#1B1B1B]"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: (p: Project) => void;
}) {
  return (
    <motion.button
      layoutId={`card-${project.id}`}
      onClick={() => onOpen(project)}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col overflow-hidden rounded-[16px] bg-white text-left shadow-sm border border-[#999991]/30 transition-all duration-300 hover:-translate-y-1 hover:border-[#8F2621] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8F2621]"
    >
      <div className="relative h-56 w-full overflow-hidden bg-[#F5F7E3]">
        <motion.img
          layoutId={`img-${project.id}`}
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="h-full w-full scale-105 object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />
        <CornerTicks />

        {/* site-plate number */}
        <span className="absolute left-3 bottom-3 rounded-[4px] bg-[#8F2621] px-2 py-1 font-sans text-[10px] font-semibold tracking-[0.15em] text-white">
          {String(index + 1).padStart(2, "0")}
        </span>

        <span className="absolute right-3 bottom-3 flex items-center gap-1 rounded-[4px] bg-[#7A9636] px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
          {project.category}
        </span>

        <motion.span
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#8F2621] text-white opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100 pointer-events-none"
        >
          <ArrowUpRight size={16} strokeWidth={2.5} />
        </motion.span>
      </div>

      <div className="flex flex-1 flex-col gap-2 px-4 py-4 bg-white">
        <p className="flex items-center gap-1.5 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-[#7A9636]">
          <MapPin size={12} className="text-[#8F2621]" />
          {project.location}
        </p>
        <h3 className="line-clamp-2 font-serif font-bold leading-snug text-[#1B1B1B]">
          {project.title}
        </h3>
      </div>
    </motion.button>
  );
}

type FilterValue = (typeof FILTERS)[number];

interface FeaturesProps {
  /** Pass this + onFilterChange to drive the filter from outside (e.g. a Categories section). */
  activeFilter?: FilterValue;
  onFilterChange?: (filter: FilterValue) => void;
  defaultFilter?: FilterValue;
}

export default function Features({
  activeFilter: controlledFilter,
  onFilterChange,
  defaultFilter = "Featured",
}: FeaturesProps = {}) {
  const [internalFilter, setInternalFilter] = useState<FilterValue>(defaultFilter);
  const activeFilter = controlledFilter ?? internalFilter;

  const setActiveFilter = (filter: FilterValue) => {
    onFilterChange ? onFilterChange(filter) : setInternalFilter(filter);
  };

  // React Router Search Params Integration
  const [searchParams, setSearchParams] = useSearchParams();
  const activeProjectId = searchParams.get("project");

  // Find corresponding project data
  const selectedProject = useMemo(() => {
    if (!activeProjectId) return null;
    return PROJECTS.find((p) => p.id === activeProjectId) || null;
  }, [activeProjectId]);

  const handleOpenProject = (project: Project) => {
    setSearchParams({ project: project.id });
  };

  const handleCloseProject = () => {
    setSearchParams({});
  };

  // Search/Filter Bar Local States
  const [tempKeyword, setTempKeyword] = useState("");
  const [tempStatus, setTempStatus] = useState("");
  const [tempType, setTempType] = useState("");
  const [tempBeds, setTempBeds] = useState("");
  const [tempBaths, setTempBaths] = useState("");

  // Search/Filter Bar Committed States for filtering
  const [committedKeyword, setCommittedKeyword] = useState("");
  const [committedStatus, setCommittedStatus] = useState("");
  const [committedBeds, setCommittedBeds] = useState("");
  const [committedBaths, setCommittedBaths] = useState("");

  // Synchronize category button/dropdown states & clear beds/baths when type shifts
  useEffect(() => {
    const typeVal = activeFilter === "Featured" ? "" : activeFilter;
    setTempType(typeVal);

    if (activeFilter !== "Residential") {
      setTempBeds("");
      setTempBaths("");
      setCommittedBeds("");
      setCommittedBaths("");
    }
  }, [activeFilter]);

  const handleCategoryButtonClick = (filter: FilterValue) => {
    setActiveFilter(filter);
    const typeVal = filter === "Featured" ? "" : filter;
    setTempType(typeVal);

    if (filter !== "Residential") {
      setTempBeds("");
      setTempBaths("");
      setCommittedBeds("");
      setCommittedBaths("");
    }
  };

  const handleSearch = () => {
    setCommittedKeyword(tempKeyword);
    setCommittedStatus(tempStatus);
    setCommittedBeds(tempBeds);
    setCommittedBaths(tempBaths);

    // Synchronize current category button to match Type dropdown
    const newCategory = tempType === "" ? "Featured" : (tempType as FilterValue);
    setActiveFilter(newCategory);
  };

  const handleReset = () => {
    setTempKeyword("");
    setTempStatus("");
    setTempType("");
    setTempBeds("");
    setTempBaths("");

    setCommittedKeyword("");
    setCommittedStatus("");
    setCommittedBeds("");
    setCommittedBaths("");

    setActiveFilter("Featured");
  };

  // Comprehensive multi-criteria filtering
  const visibleProjects = useMemo(() => {
    return PROJECTS.filter((p) => {
      // 1. Sync Category filter (buttons)
      if (activeFilter !== "Featured" && p.category !== activeFilter) {
        return false;
      }

      // 2. Keyword Filter (title, location, description)
      if (committedKeyword.trim()) {
        const query = committedKeyword.toLowerCase();
        const matchTitle = p.title.toLowerCase().includes(query);
        const matchLoc = p.location.toLowerCase().includes(query);
        const matchDesc = p.description.toLowerCase().includes(query);
        if (!matchTitle && !matchLoc && !matchDesc) {
          return false;
        }
      }

      // 3. Status Filter
      if (committedStatus && p.status !== committedStatus) {
        return false;
      }

      // 4. Beds Filter (only relevant if Residential)
      if (activeFilter === "Residential" && committedBeds) {
        if (p.beds !== Number(committedBeds)) {
          return false;
        }
      }

      // 5. Baths Filter (only relevant if Residential)
      if (activeFilter === "Residential" && committedBaths) {
        if (p.baths !== Number(committedBaths)) {
          return false;
        }
      }

      return true;
    });
  }, [activeFilter, committedKeyword, committedStatus, committedBeds, committedBaths]);

  // Dropdown list options
  const statusOptions = [
    { label: "All Statuses", value: "" },
    { label: "Ongoing", value: "Ongoing" },
    { label: "Completed", value: "Completed" },
    { label: "Upcoming", value: "Upcoming" },
  ];

  const typeOptions = [
    { label: "All Types", value: "" },
    { label: "Commercial", value: "Commercial" },
    { label: "Industrial", value: "Industrial" },
    { label: "Residential", value: "Residential" },
  ];

  const bedsOptions = [
    { label: "All Beds", value: "" },
    { label: "1 Bed", value: "1" },
    { label: "2 Beds", value: "2" },
    { label: "3 Beds", value: "3" },
    { label: "4 Beds", value: "4" },
  ];

  const bathsOptions = [
    { label: "All Baths", value: "" },
    { label: "1 Bath", value: "1" },
    { label: "2 Baths", value: "2" },
    { label: "3 Baths", value: "3" },
    { label: "4 Baths", value: "4" },
  ];

  const isResidentialSelected = tempType === "Residential";

  return (
    <section id="projects" className="relative scroll-mt-24 bg-[#F5F7E3] px-5 py-10 sm:px-10 lg:px-16">
      {/* header */}
      <div className="mx-auto mb-12 max-w-6xl">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-sans text-center text-2xl font-bold uppercase tracking-[0.2em] text-[#7A9636]"
        >
          Our Portfolio
        </motion.p>

        <div className="mb-10 mt-10">
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          className="mt-10 mb-12 text-6xl text-center font-bold font-serif text-[#8F2621] sm:text-4xl"
        >
          Projects, Built to Last
        </motion.h2>
        </div>

        {/* Premium Architectural Search & Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="group/search relative w-full bg-white rounded-[16px] border border-[#999991]/30 p-5 md:p-6 mb-8 shadow-sm transition-all duration-300 hover:border-[#8F2621]/50"
        >
          {/* Corner Ticks aesthetic */}
          <span className="pointer-events-none absolute left-3 top-3 h-3.5 w-3.5 border-l border-t border-[#999991]/30 transition-colors duration-300 group-hover/search:border-[#8F2621]/50" />
          <span className="pointer-events-none absolute right-3 top-3 h-3.5 w-3.5 border-r border-t border-[#999991]/30 transition-colors duration-300 group-hover/search:border-[#8F2621]/50" />
          <span className="pointer-events-none absolute bottom-3 left-3 h-3.5 w-3.5 border-b border-l border-[#999991]/30 transition-colors duration-300 group-hover/search:border-[#8F2621]/50" />
          <span className="pointer-events-none absolute bottom-3 right-3 h-3.5 w-3.5 border-b border-r border-[#999991]/30 transition-colors duration-300 group-hover/search:border-[#8F2621]/50" />         

          <div className="flex flex-col lg:flex-row items-end gap-4 w-full relative z-10">
            {/* Keyword Input */}
            <div className="flex flex-col gap-1.5 w-full lg:flex-1">
              <span className="font-sans text-[10px] font-semibold tracking-[0.15em] text-[#4A4A45] uppercase select-none">
                Keyword
              </span>
              <div className="relative w-full">
                <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-[#4A4A45]">
                  <Search size={15} />
                </span>
                <input
                  type="text"
                  placeholder="Search project title, location, desc..."
                  value={tempKeyword}
                  onChange={(e) => setTempKeyword(e.target.value)}
                  className="pl-9 pr-3 h-11 w-full rounded-[4px] bg-[#F5F7E3]/35 border border-[#999991]/30 text-sm text-[#1B1B1B] placeholder-[#999991]/50 transition-all duration-300 hover:bg-[#F5F7E3]/70 hover:border-[#999991]/50 focus:outline-none focus:border-[#8F2621]/50 focus:ring-1 focus:ring-[#8F2621]"
                />
              </div>
            </div>

            {/* Status Dropdown */}
            <div className="w-full lg:w-44">
              <CustomDropdown
                label="Status"
                value={tempStatus}
                options={statusOptions}
                onChange={setTempStatus}
              />
            </div>

            {/* Type Dropdown */}
            <div className="w-full lg:w-44">
              <CustomDropdown
                label="Type"
                value={tempType}
                options={typeOptions}
                onChange={(val) => {
                  setTempType(val);
                  // Auto-clear beds/baths if shifting away from residential
                  if (val !== "Residential") {
                    setTempBeds("");
                    setTempBaths("");
                  }
                }}
              />
            </div>

            {/* Beds Dropdown (Residential Only) */}
            <AnimatePresence>
              {isResidentialSelected && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="w-full lg:w-28"
                >
                  <CustomDropdown
                    label="Beds"
                    value={tempBeds}
                    options={bedsOptions}
                    onChange={setTempBeds}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Baths Dropdown (Residential Only) */}
            <AnimatePresence>
              {isResidentialSelected && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="w-full lg:w-28"
                >
                  <CustomDropdown
                    label="Baths"
                    value={tempBaths}
                    options={bathsOptions}
                    onChange={setTempBaths}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Search + Reset Action Buttons */}
            <div className="flex items-center gap-3 w-full lg:w-auto mt-2 lg:mt-0">
              {/* Circular Reset Button */}
              <motion.button
                whileHover={{ scale: 1.05, rotate: -180 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleReset}
                type="button"
                aria-label="Reset all filters"
                className="flex items-center justify-center w-11 h-11 rounded-full bg-white border border-[#999991]/30 text-[#4A4A45] hover:bg-[#F5F7E3]/50 hover:border-[#8F2621]/50 hover:text-[#8F2621] transition-colors focus:outline-none focus:ring-2 focus:ring-[#8F2621]/50 cursor-pointer"
              >
                <RotateCcw size={16} />
              </motion.button>

              {/* Main SEARCH CTA */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleSearch}
                className="flex-1 lg:flex-initial h-11 px-8 rounded-[4px] bg-[#8F2621] text-white font-sans text-xs font-bold tracking-[0.15em] uppercase hover:bg-[#7A9636] transition-colors focus:outline-none focus:ring-2 focus:ring-[#8F2621]/50 cursor-pointer select-none"
              >
                Search
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Existing Category Filter Buttons */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
  {FILTERS.map((filter) => (
    <button
      key={filter}
      onClick={() => handleCategoryButtonClick(filter)}
      className={`relative rounded-[4px] px-5 py-2 text-[11px] font-sans uppercase tracking-[0.12em] transition-colors duration-300 cursor-pointer select-none border border-[#999991]/30 ${
        activeFilter === filter
          ? "bg-[#8F2621] text-white font-bold"
          : "bg-white text-[#4A4A45] hover:bg-[#F5F7E3]/60"
      }`}
    >
      {filter}
    </button>
  ))}
</div>
      </div>

      {/* grid with Animated Empty State Fallback */}
      {visibleProjects.length > 0 ? (
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} onOpen={handleOpenProject} />
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="mx-auto max-w-6xl flex flex-col items-center justify-center border border-dashed border-[#999991]/30 rounded-[16px] p-16 text-center bg-white shadow-sm"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.05, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              repeat: Infinity,
              duration: 4.5,
              ease: "easeInOut"
            }}
            className="p-4 rounded-full bg-[#F5F7E3] text-[#7A9636] mb-4"
          >
            <Building2 size={36} strokeWidth={1.5} />
          </motion.div>
          <h3 className="font-sans text-sm font-semibold uppercase tracking-[0.15em] text-[#1B1B1B] mb-2">
            No Projects Found
          </h3>
          <p className="text-xs text-[#4A4A45] max-w-xs mb-6 tracking-wide leading-relaxed">
            We couldn't find any projects matching your filter criteria. Try resetting the panel.
          </p>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleReset}
            className="h-10 px-6 rounded-[4px] bg-[#8F2621] text-white font-sans text-xs font-bold tracking-[0.15em] uppercase hover:bg-[#7A9636] transition-colors focus:outline-none focus:ring-2 focus:ring-[#8F2621]/50 cursor-pointer"
          >
            Clear All Filters
          </motion.button>
        </motion.div>
      )}

      {/* Full Detail Page overlay (replaces standard modal popup) */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetail
            key={selectedProject.id}
            project={selectedProject}
            onBack={handleCloseProject}
          />
        )}
      </AnimatePresence>
    </section>
  );
}