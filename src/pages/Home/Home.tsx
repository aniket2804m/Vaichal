import HeroIntro from "../../sections/Hero";
import HeroMorph from "../../sections/HeroMorph";
import Stats from "../../sections/Stats";
import PropertyGrid from "../../sections/PropertyGrid";
import Parallax from "../../sections/Parallax";
import CTA from "../../sections/CTA";
import Categories from "../../sections/Categories";
import Amenities from "../../sections/Amenities";
import VirtualTour from "../../sections/VirtualTour";
import ClientTestimonials from "../../sections/ClientTestimonials";

import { useState } from "react";
import Features from "../../pages/Projects/Features";

type FilterValue = "Featured" | "Commercial" | "Industrial" | "Residential";

import { useLenis } from "../../hooks/useLenis";

export default function Hero() {
  const [activeCategory, setActiveCategory] = useState<FilterValue>("Featured");
  // Initialize Lenis smooth scroll driven by GSAP ticker
  useLenis();

  return (
    <div className="relative w-full bg-[#F8F7F3] text-[#111111] selection:bg-[#C9A35D] selection:text-white">
      <HeroIntro />
      <HeroMorph />
      <Stats />
      <Categories onSelectCategory={setActiveCategory} />
      <Features activeFilter={activeCategory} onFilterChange={setActiveCategory} />
      <Amenities />
      <VirtualTour />
      <ClientTestimonials />
      <PropertyGrid />
      <Parallax />
      <CTA />
    </div>
  );
}