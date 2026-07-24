import { motion } from "framer-motion";
import { Building2, Home, Landmark, ShieldCheck, ArrowRight, Trees, Leaf, Sparkles, Compass } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const servicesList = [
  {
    number: "01",
    title: "Luxury Residential Development",
    desc: "Crafting bespoke residential sanctuaries in harmony with natural surroundings. Every home is a masterpiece of timeless design, utilizing premium eco-friendly materials and smart automation.",
    icon: Home,
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80"
  },
  {
    number: "02",
    title: "Commercial Workspaces & IT Parks",
    desc: "Architecting state-of-the-art office spaces and technology parks designed to stimulate productivity and wellness, featuring biophilic designs and energy-efficient building systems.",
    icon: Building2,
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80"
  },
  {
    number: "03",
    title: "Strategic Property Investment",
    desc: "Tailored investment consulting to identify high-growth, premium micro-markets. We help you build and manage a real estate portfolio that delivers stable and compounding long-term returns.",
    icon: Landmark,
    image: "https://images.unsplash.com/photo-1448630360428-65472127db6f?auto=format&fit=crop&w=800&q=80"
  },
  {
    number: "04",
    title: "Premium Property Management",
    desc: "End-to-end luxury management solutions ensuring the value of your assets remains pristine. Includes concierge services, landscaping, premium upkeep, and tenant placement.",
    icon: ShieldCheck,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
  },
  {
    number: "05",
    title: "Sustainable Architecture Consulting",
    desc: "Pioneering green-building certifications (LEED / IGBC). Our specialist architects blend luxury finishes with sustainable water harvesting, solar arrays, and high-efficiency ventilation.",
    icon: Compass,
    image: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80"
  }
];

export default function Services() {
  return (
    <div className="relative w-full bg-[#F5F7E3] text-[#1B1B1B] pt-10 pb-20 selection:bg-[#7A9636] selection:text-white font-sans">
      {/* Background nature shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-[#7A9636]/5 blur-3xl" />
        <div className="absolute bottom-[20%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#8F2621]/3 blur-3xl" />
      </div>

      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 relative z-10">
        
        {/* ============ HERO SECTION ============ */}
        <div className="text-center py-16 md:py-24 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-2 text-[#7A9636] font-semibold tracking-[0.25em] text-sm uppercase mb-4"
          >
            <Trees className="w-4 h-4" />
            <span>Our Expertise</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-6xl font-serif text-[#8F2621] font-bold leading-tight"
          >
            Elevating Living Spaces Through Nature & Luxury
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-6 text-[#999991] font-light text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            We blend exquisite luxury architectural concepts with sustainable, nature-friendly technology to build future-proof landmarks across Pune.
          </motion.p>
        </div>

        {/* ============ QUICK HIGHLIGHTS (Nature/Luxury blend) ============ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <motion.div
            whileHover={{ y: -6 }}
            className="luxury-card flex flex-col items-center text-center group"
          >
            <div className="p-4 rounded-full bg-[#7A9636]/10 text-[#7A9636] mb-6 group-hover:scale-110 transition-transform">
              <Leaf className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold font-serif text-[#8F2621] mb-3">Eco-Luxury Integration</h3>
            <p className="text-sm text-[#999991] leading-relaxed">
              We design developments that coexist with native flora, featuring oxygen-rich microclimates, massive tree canopy covers, and zero-waste systems.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -6 }}
            className="luxury-card flex flex-col items-center text-center group"
          >
            <div className="p-4 rounded-full bg-[#8F2621]/10 text-[#8F2621] mb-6 group-hover:scale-110 transition-transform">
              <Sparkles className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold font-serif text-[#8F2621] mb-3">Bespoke Architectural Engineering</h3>
            <p className="text-sm text-[#999991] leading-relaxed">
              Every curve, frame, and finish undergoes rigorous design validation, utilizing local materials, premium stonework, and precise engineering.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -6 }}
            className="luxury-card flex flex-col items-center text-center group"
          >
            <div className="p-4 rounded-full bg-[#7A9636]/10 text-[#7A9636] mb-6 group-hover:scale-110 transition-transform">
              <Compass className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold font-serif text-[#8F2621] mb-3">Timeless Legacy</h3>
            <p className="text-sm text-[#999991] leading-relaxed">
              With 20+ years of high-end execution experience, our structures stand the test of time, increasing in both ecological and financial capital.
            </p>
          </motion.div>
        </div>

        {/* ============ SERVICES DETAIL LIST ============ */}
        <div className="space-y-20 mb-20">
          {servicesList.map((service, index) => {
            const IconComponent = service.icon;
            const isEven = index % 2 === 0;

            return (
              <div 
                key={service.number}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center`}
              >
                {/* Image panel */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8 }}
                  className={`lg:col-span-6 overflow-hidden rounded-[24px] shadow-lg relative aspect-[4/3] group ${isEven ? "" : "lg:order-2"}`}
                >
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                  <div className="absolute top-6 left-6 bg-[#FFFFFF]/90 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2 border border-[#999991]/20">
                    <IconComponent className="w-4 h-4 text-[#8F2621]" />
                    <span className="text-xs font-semibold uppercase tracking-wider">{service.number}</span>
                  </div>
                </motion.div>

                {/* Content panel */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className={`lg:col-span-6 flex flex-col justify-center ${isEven ? "" : "lg:order-1"}`}
                >
                  <span className="text-[#7A9636] font-semibold text-lg font-serif mb-2">
                    Service {service.number}
                  </span>
                  <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#8F2621] leading-tight mb-4">
                    {service.title}
                  </h2>
                  <p className="text-[#999991] font-light leading-relaxed mb-6">
                    {service.desc}
                  </p>
                  
                  <div>
                    <Button 
                      asChild 
                      className="rounded-[10px] bg-[#8F2621] text-white hover:bg-[#7A9636] border-none px-6 py-4 shadow-sm transition-all duration-300"
                    >
                      <Link to="/contact" className="flex items-center gap-2 font-medium">
                        Request Consult
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* ============ BOTTOM CALL TO ACTION ============ */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full bg-white border border-[#999991]/20 rounded-[24px] p-6 sm:p-12 md:p-16 text-center shadow-xl relative overflow-hidden mt-20 sm:mt-32"
        >
          <div className="absolute inset-0 bg-[#7A9636]/5 pointer-events-none" />
          <h2 className="text-3xl md:text-5xl font-serif text-[#8F2621] font-bold mb-4">
            Ready to Build Your Sanctuary?
          </h2>
          <p className="text-[#999991] max-w-xl mx-auto mb-8 font-light text-sm sm:text-base">
            Contact our consulting division to review floor plans, locations, and sustainability frameworks.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild className="rounded-[10px] bg-[#8F2621] hover:bg-[#7A9636] text-white px-6 sm:px-8 py-4 sm:py-5 min-h-[44px] text-sm sm:text-base border-none transition-all cursor-pointer">
              <Link to="/contact">Book Design Session</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-[10px] border-2 border-[#8F2621] text-[#8F2621] hover:bg-[#8F2621] hover:text-white px-6 sm:px-8 py-4 sm:py-5 min-h-[44px] text-sm sm:text-base transition-all bg-transparent cursor-pointer">
              <Link to="/features">Explore Locations</Link>
            </Button>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
