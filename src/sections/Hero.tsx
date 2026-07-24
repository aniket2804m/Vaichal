import { ArrowDown } from "lucide-react";
import FloatingNavBar from "../sections/FloatingNavBar";
import cad from "../../src/assets/images/Hero/cad.png";

export default function Hero() {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-[#F5F7E3] select-none">
      {/* Floating Navigation Bar (z-40) */}
      <div className="absolute -bottom-8 left-0 w-full z-40">
  <FloatingNavBar />
</div>

      {/* CSS style block for premium shadows to enhance text legibility */}
      <style>{`
        .dark-premium-shadow {
          text-shadow: 
            0 2px 4px rgba(0, 0, 0, 0.08),
            0 1px 2px rgba(0, 0, 0, 0.04);
        }
      `}</style>

      {/* Rule 1: Static Image Background with object-cover and centered object-position */}
      <div className="relative w-full h-full overflow-hidden">
  <img
    src={cad}
    alt="Estate Blueprint CAD"
    className="w-full h-full object-cover object-center"
  />
</div>

      {/* Rule 3: Scrolling mouse/chevron helper positioned responsively to avoid overlapping navigation on mobile */}
      <div className="absolute bottom-20 sm:bottom-10 right-4 sm:right-10 z-30 flex items-center gap-3 pointer-events-none">
        <div className="animate-bounce rounded-full p-2.5 sm:p-3 bg-brand-maroon shadow-md">
          <ArrowDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#F5F7E3]" />
        </div>
      </div>
    </section>
  );
}
