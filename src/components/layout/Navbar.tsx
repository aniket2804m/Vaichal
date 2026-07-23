import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ArrowRight,
  Info,
  Users,
  PhoneCall,
  FolderOpen,
  Briefcase,
  Compass,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import logo from "../../assets/images/Vaichal vastu.png";

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/features" },
  { label: "Awards", href: "/award" },
  { label: "Gallery", href: "/gallery" },
  { label: "Blogs", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const Navbar = () => {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.15 } },
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 w-full pointer-events-none font-sans">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`w-full pointer-events-auto transition-all duration-300 ease-in-out border-b ${
  scrolled
    ? "py-3 bg-[#7A9636]/80 backdrop-blur-lg border-[#999991]/20 shadow-sm"
    : "py-5 bg-[#7A9636]/80 backdrop-blur-md border-[#999991]/10"
}`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
          {/* Logo Brand */}
          <Link
            to="/"
            className="group flex items-center gap-3 relative transition-transform hover:scale-105 active:scale-95"
            onClick={() => setMobileOpen(false)}
          >
            <img
              src={logo}
              alt="Viachal Logo"
              className="w-[140px] h-12 object-contain transition-all duration-300 group-hover:scale-105 px-3 py-1.5 rounded-[20px] bg-transparent"
            />
            <div className="absolute -inset-2 bg-[#8F2621]/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity rounded-xl -z-10" />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center uppercase gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;

              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`relative px-4 py-2 text-base font-semibold transition-colors duration-300 rounded-xl flex items-center ${
                    isActive ? "text-[#8F2621]" : "text-[#1B1B1B]/75 hover:text-[#8F2621]"
                  }`}
                  onMouseEnter={() => setHoveredPath(link.href)}
                  onMouseLeave={() => setHoveredPath(null)}
                >
                  {hoveredPath === link.href && (
                    <motion.span
                      layoutId="hovered-pill"
                      className="absolute inset-0 bg-[#7A9636]/10 rounded-xl -z-10"
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    />
                  )}

                  <span>{link.label}</span>
                  
                  {isActive && (
                    <motion.span
                      layoutId="active-dot"
                      className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#8F2621] shadow-[0_0_8px_rgba(143,38,33,0.6)]"
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

{/* Enquiry button */}
          {/* Desktop Call to Action & Language Selector */}
          <div className="hidden lg:flex items-center gap-4">
            
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button
                asChild
                className="rounded-[10px] bg-[#8F2621] text-white hover:bg-[#7A9636] font-sans font-semibold px-6 py-3 border-none transition-all duration-300"
              >
                <Link to="/contact" className="flex items-center gap-2">
                  {t("nav.enquireNow")}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </motion.div>
          </div>

{/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-[10px] hover:bg-[#999991]/10 transition-all duration-300 relative flex items-center justify-center w-10 h-10 border border-[#999991]/30 bg-white/75 backdrop-blur-md shadow-sm text-[#1B1B1B]"
            aria-label={t("nav.toggleMenu")}
          >
            <svg width="18" height="18" viewBox="0 0 23 23" className="text-[#1B1B1B]">
              <motion.path
                fill="transparent"
                strokeWidth="2.5"
                stroke="currentColor"
                strokeLinecap="round"
                variants={{
                  closed: { d: "M 2 2.5 L 20 2.5" },
                  open: { d: "M 3 16.5 L 17 2.5" }
                }}
                animate={mobileOpen ? "open" : "closed"}
                transition={{ duration: 0.3 }}
              />
              <motion.path
                fill="transparent"
                strokeWidth="2.5"
                stroke="currentColor"
                strokeLinecap="round"
                d="M 2 9.423 L 20 9.423"
                variants={{
                  closed: { opacity: 1 },
                  open: { opacity: 0 }
                }}
                animate={mobileOpen ? "open" : "closed"}
                transition={{ duration: 0.2 }}
              />
              <motion.path
                fill="transparent"
                strokeWidth="2.5"
                stroke="currentColor"
                strokeLinecap="round"
                variants={{
                  closed: { d: "M 2 16.346 L 20 16.346" },
                  open: { d: "M 3 2.5 L 17 16.5" }
                }}
                animate={mobileOpen ? "open" : "closed"}
                transition={{ duration: 0.3 }}
              />
            </svg>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute top-[calc(100%+8px)] left-4 right-4 bg-white/95 border border-[#999991]/20 backdrop-blur-2xl p-5 rounded-[16px] shadow-lg lg:hidden flex flex-col gap-4 pointer-events-auto text-[#1B1B1B]"
          >
            <div className="flex flex-col gap-1.5">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.href;

                const Icon =
                  link.label === "About" ? Info :
                  link.label === "Services" ? Compass :
                  link.label === "Projects" ? Briefcase :
                  link.label === "Client" ? FolderOpen :
                  link.label === "Awards" ? Users :
                  PhoneCall;

                return (
                  <motion.div key={link.href} variants={itemVariants}>
                    <Link
                      to={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 ${
                        isActive
                          ? "bg-[#8F2621]/10 text-[#8F2621] border border-[#8F2621]/20 font-semibold"
                          : "text-[#999991] hover:text-[#8F2621] hover:bg-[#7A9636]/10 border border-transparent"
                      }`}
                    >
                      <Icon className="w-5 h-5 text-[#7A9636]" />
                     <span className="font-semibold text-base">
    {link.label}
  </span>
                      {isActive && (
                        <span className="ml-auto w-2 h-2 rounded-full bg-[#8F2621] shadow-[0_0_8px_rgba(143,38,33,0.6)]" />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            <motion.div variants={itemVariants} className="pt-3 border-t border-[#999991]/20 flex flex-col gap-3">
              
              <Button
                asChild
                className="w-full rounded-[10px] bg-[#8F2621] text-white font-sans font-semibold py-4 hover:bg-[#7A9636] transition-all duration-300 border-none"
              >
                <Link to="/contact" onClick={() => setMobileOpen(false)} className="flex items-center justify-center gap-2">
                  {t("nav.enquireNow")}
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
