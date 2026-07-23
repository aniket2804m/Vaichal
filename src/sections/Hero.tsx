import { ArrowDown } from "lucide-react";
import FloatingNavBar from "../sections/FloatingNavBar";
import cad from "../../src/assets/images/Hero/cad.png";

export default function Hero() {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-[#F5F7E3] select-none">
      {/* Floating Navigation Bar (z-40) */}
      <div className="relative z-40">
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

      {/* Static Image Background (z-10) - Original clear image without dark overlays */}
      <div className="absolute inset-0 w-full h-full overflow-hidden flex items-center justify-center z-10">
        <img
          src={cad}
          alt="Estate Blueprint CAD"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Scrolling mouse/chevron helper (z-30) */}
      <div className="absolute bottom-10 right-10 z-30 flex items-center gap-3 pointer-events-none">
        <div className="animate-bounce rounded-full p-3 bg-brand-maroon shadow-md">
          <ArrowDown className="w-4 h-4 text-[#F5F7E3]" />
        </div>
      </div>
    </section>
  );
}
