import { motion } from "framer-motion";
import {
  Building2,
  Landmark,
  Home,
  ArrowRight,
} from "lucide-react";

/**
 * `filterKey` must match Features.tsx's category values exactly:
 * "Commercial" | "Industrial" | "Residential" | "Featured" (= show all)
 *
 * "Plots & Land" has no matching category in Features.tsx yet,
 * so it currently falls back to "Featured" (shows every project).
 * Add "Plots & Land" as a real category in Features.tsx if you
 * want it to filter properly instead.
 */
const categories = [
  {
    title: "Residential",
    subtitle: "Flats & Villas",
    description:
      "Luxury apartments, villas and premium homes carefully selected for modern living.",
    icon: Home,
    href: "/properties/residential",
    filterKey: "Residential" as const,
    gradient: "from-[#7A9636] via-[#94B24B] to-[#5C7523]",
  },
  {
    title: "Commercial",
    subtitle: "Offices & Shops",
    description:
      "Premium office spaces, retail shops and commercial investment opportunities.",
    icon: Building2,
    href: "/properties/commercial",
    filterKey: "Commercial" as const,
    gradient: "from-[#8F2621] via-[#A83D38] to-[#701E1A]",
  },
  {
    title: "Industrial",
    subtitle: "Investment",
    description:
      "Residential plots, agricultural land and investment-ready properties.",
    icon: Landmark,
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

export default function Categories({
  onSelectCategory,
  scrollTargetId = "projects",
}: CategoriesProps) {
  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    filterKey: FilterValue
  ) => {
    // Same-page filter + scroll instead of a real navigation.
    e.preventDefault();
    onSelectCategory?.(filterKey);
    document
      .getElementById(scrollTargetId)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative overflow-hidden bg-[#F5F7E3] py-24 border-b border-[#999991]/25">
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

          <p className="mx-auto mt-6 max-6w-lg text-[#999991] text-lg font-light leading-relaxed">
            Find the perfect property tailored to your lifestyle, business, or investment goals.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.a
                key={index}
                href={item.href}
                onClick={(e) => handleClick(e, item.filterKey)}
                initial={{ opacity: 0, y: 70 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.15,
                  duration: 0.8,
                }}
                whileHover={{
                  rotateY: -8,
                  scale: 1.03,
                }}
                style={{
                  transformStyle: "preserve-3d",
                }}
                className="group relative overflow-hidden rounded-[16px] border border-[#999991]/30 bg-white p-8 transition-all duration-500 shadow-sm hover:shadow-md cursor-pointer"
              >
                {/* Glow */}
                <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100 bg-gradient-to-br from-[#7A9636]/10 via-transparent to-[#8F2621]/15" />

                {/* Icon */}
                <motion.div
                  whileHover={{
                    rotate: 360,
                    scale: 1.15,
                  }}
                  transition={{
                    duration: 0.8,
                  }}
                  className={`relative flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br ${item.gradient} shadow-md`}
                >
                  <Icon className="h-10 w-10 text-white" strokeWidth={2.2} />
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
                  Explore Category
                  <ArrowRight className="h-5 w-5 transition group-hover:translate-x-2" />
                </motion.div>

                {/* Floating Border */}
                <div className="absolute inset-0 rounded-[16px] border border-[#7A9636]/30 opacity-0 group-hover:opacity-100 transition duration-500" />
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}