import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#1B1B1B] text-[#F5F7E3] px-6 py-12 font-sans">
      <div className="text-center max-w-md">
        <h1 className="mb-4 text-5xl sm:text-7xl font-bold font-serif text-[#8F2621]">404</h1>
        <p className="mb-6 text-lg sm:text-xl text-[#999991]">Oops! Page not found</p>
        <a 
          href="/" 
          className="inline-flex items-center justify-center px-6 py-3 min-h-[44px] bg-[#8F2621] text-white rounded-xl uppercase tracking-widest text-xs font-semibold hover:bg-[#7A9636] transition-all duration-300 no-underline"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;