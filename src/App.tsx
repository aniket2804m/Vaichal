import { useState, useEffect } from "react";
import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import NotFound from "../src/pages/NotFound/NotFound";

const Navbar = lazy(() => import("../src/components/layout/Navbar"));
const Home = lazy(() => import("../src/pages/Home/Home"));
const About = lazy(() => import("../src/pages/About/About"));
const Contact = lazy(() => import("../src/pages/Contact/Contact"));
const Footer = lazy(() => import("../src/components/layout/Footer"));
import LoadingScreen from "./components/design/LoadingScreen";
const ScrollProgress = lazy(() => import("../src/components/layout/ScrollProgress"));
const CursorGlow = lazy(() => import("../src/components/design/CursorGlow"));
const ScrollToTop = lazy(() => import("../src/components/design/ScrollToTop"));
const Awards = lazy(() => import("../src/pages/Awards/Awards"));
const Features = lazy(() => import("../src/pages/Projects/Features"));
const Gallery = lazy(() => import("../src/pages/Gallery/Gallery"));
const Blog = lazy(() => import("../src/pages/Blog/Blog"));
const Services = lazy(() => import("../src/pages/Services/Services"));

const StrategyPopup = lazy(() => import("../src/components/design/StrategyPopup"));

// const Privacy = lazy(() => import("@/pages/Privacy"));
// const Terms = lazy(() => import("@/pages/Terms"));
// const CookiePolicy = lazy(() => import("@/pages/CookiePolicy"));

const queryClient = new QueryClient();


const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [warning, setWarning] = useState<string | null>(null);

  // const triggerWarning = (msg: string) => {
  //   setWarning(null);
  //   setTimeout(() => {
  //     setWarning(msg);
  //   }, 10);
  // };

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (warning) {
      const timer = setTimeout(() => setWarning(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [warning]);

  // useEffect(() => {
  //   const handleCopy = (e: ClipboardEvent) => {
  //     e.preventDefault();
  //     triggerWarning("Please don't copy content.");
  //   };

  //   const handleKeyDown = (e: KeyboardEvent) => {
  //     if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "c") {
  //       e.preventDefault();
  //       triggerWarning("Please don't copy content.");
  //     }
  //   };

  //   document.addEventListener("copy", handleCopy);
  //   document.addEventListener("keydown", handleKeyDown);

  //   return () => {
  //     document.removeEventListener("copy", handleCopy);
  //     document.removeEventListener("keydown", handleKeyDown);
  //   };
  // }, []);
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        <BrowserRouter>
          <LoadingScreen isLoading={isLoading} />
          <ScrollToTop />
          <CursorGlow />
          <ScrollProgress />

          <AnimatePresence>
            {warning && (
              <motion.div
                initial={{ opacity: 0, y: -50, scale: 0.9, x: "-50%" }}
                animate={{ opacity: 1, y: 0, scale: 1, x: "-50%" }}
                exit={{ opacity: 0, y: -50, scale: 0.9, x: "-50%" }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                className="fixed top-6 left-1/2 bg-[#0A0A0A] border border-[#C9A84C] px-6 py-4 shadow-[0_15px_40px_rgba(201,168,76,0.25)] rounded-none flex items-center gap-3 font-montserrat select-none"
              >
                <span className="text-[#C9A84C] font-semibold text-base">⚠️</span>
                <span className="text-[#F5F0E8] font-cinzel text-xs tracking-wider uppercase font-semibold">{warning}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <Suspense fallback={null}>
            <Navbar />
          </Suspense>

           <Suspense fallback={null}>
    <StrategyPopup />
  </Suspense>

          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/award" element={<Awards />} />
              <Route path="/features" element={<Features />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/services" element={<Services />} />

              {/* <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/cookie" element={<CookiePolicy />} /> */}

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          <Suspense fallback={null}>
            <Footer />
          </Suspense>
         
          {/* <BackToTop /> */}
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;