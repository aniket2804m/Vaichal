import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0A0A0A] text-[#F5F0E8] font-montserrat">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-bold font-cinzel text-[#C9A84C]">404</h1>
        <p className="mb-6 text-xl text-[#F5F0E8]/70">Oops! Page not found</p>
        <a 
          href="/" 
          className="text-[#C9A84C] hover:text-[#F5F0E8] uppercase tracking-widest text-sm border-b border-[#C9A84C] pb-0.5 no-underline transition-all duration-300"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;