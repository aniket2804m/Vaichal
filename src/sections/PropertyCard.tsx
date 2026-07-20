import { motion, useMotionValue, useTransform } from "framer-motion";
import { MapPin, Maximize2, BedDouble, Bath } from "lucide-react";

export interface PropertyData {
  id: string;
  title: string;
  location: string;
  price: string;
  type: string;
  beds: number;
  baths: number;
  sqft: string;
  image: string;
}

interface PropertyCardProps {
  property: PropertyData;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-150, 150], [8, -8]);
  const rotateY = useTransform(x, [-150, 150], [-8, 8]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left - width / 2;
    const mouseY = event.clientY - rect.top - height / 2;
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="property-card bg-white border border-[#999991]/30 overflow-hidden group relative flex flex-col h-full rounded-[16px] shadow-sm hover:shadow-md hover:border-[#8F2621] transition-all duration-300 cursor-pointer"
    >
      {/* Property Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <motion.img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          loading="lazy"
        />

        {/* Sliding Premium Tag */}
        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md border border-[#7A9636]/30 px-3 py-1.5 z-10 overflow-hidden rounded-xl">
          <motion.span
            initial={{ y: 25, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="block text-[10px] font-sans font-semibold tracking-wider uppercase text-[#7A9636]"
          >
            {property.type}
          </motion.span>
        </div>

        {/* Cinematic dark vignette on card image bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
        
        {/* Sliding Price Tag in image bottom */}
        <div className="absolute bottom-4 right-4 overflow-hidden rounded-xl shadow-md">
          <div
            className="bg-[#8F2621] text-white px-4 py-2 font-serif font-bold text-sm flex items-center gap-1 border border-[#8F2621]/20 rounded-xl"
          >
            {property.price}
          </div>
        </div>
      </div>

      {/* Property Info Details */}
      <div className="p-6 flex flex-col flex-grow bg-white">
        {/* Location tag */}
        <div className="flex items-center gap-1 text-[#7A9636] text-xs mb-2">
          <MapPin className="w-3.5 h-3.5 shrink-0" />
          <span className="font-sans font-medium tracking-wide uppercase">{property.location}</span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-serif font-bold text-[#1B1B1B] group-hover:text-[#8F2621] transition-colors duration-300 mb-4 leading-tight">
          {property.title}
        </h3>

        {/* Micro Specs Flex Row */}
        <div className="grid grid-cols-3 gap-3 pt-4 mt-auto border-t border-[#999991]/20 text-[#999991] text-xs font-sans">
          <div className="flex items-center gap-1.5">
            <BedDouble className="w-4 h-4 text-[#7A9636]" />
            <span>{property.beds} Bed</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Bath className="w-4 h-4 text-[#7A9636]" />
            <span>{property.baths} Bath</span>
          </div>
          <div className="flex items-center gap-1.5 justify-end">
            <Maximize2 className="w-4 h-4 text-[#7A9636]" />
            <span>{property.sqft} sq.ft.</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
