import { Briefcase, Building2, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function FloatingNavBar() {
  const navigate = useNavigate();

  return (
    <>
      {/* Premium glassmorphism and luxury effects */}
      <style>{`
        @keyframes navGlow {
          0%, 100% {
            box-shadow: 
              0 20px 60px rgba(0, 0, 0, 0.4),
              inset 0 1px 0 rgba(255, 255, 255, 0.1),
              0 0 40px rgba(122, 150, 54, 0.05),
              inset 0 0 60px rgba(122, 150, 54, 0.02);
          }
          50% {
            box-shadow: 
              0 20px 60px rgba(0, 0, 0, 0.4),
              inset 0 1px 0 rgba(255, 255, 255, 0.12),
              0 0 50px rgba(122, 150, 54, 0.15),
              inset 0 0 60px rgba(122, 150, 54, 0.04);
          }
        }

        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }

        .nav-glass {
          background: 
            linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(122, 150, 54, 0.02) 100%),
            rgba(20, 20, 20, 0.6);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          box-shadow: 
            0 20px 60px rgba(0, 0, 0, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.1),
            0 0 40px rgba(122, 150, 54, 0.08),
            inset 0 0 60px rgba(122, 150, 54, 0.03),
            inset -1px -1px 20px rgba(0, 0, 0, 0.3),
            inset 1px 1px 20px rgba(255, 255, 255, 0.05);
          animation: navGlow 4s ease-in-out infinite;
        }

        .nav-glass::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 30% 20%, rgba(255, 255, 255, 0.08) 0%, transparent 50%);
          pointer-events: none;
          border-radius: inherit;
        }
        
        .nav-item {
          position: relative;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1.25rem;
          color: rgba(255, 255, 255, 0.95);
          font-family: 'Poppins', sans-serif;
          font-size: 0.875rem;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-decoration: none;
          transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
          cursor: pointer;
          white-space: nowrap;
          z-index: 10;
        }
        
        .nav-item::before {
          content: '';
          position: absolute;
          bottom: 0.4rem;
          left: 1.25rem;
          right: 1.25rem;
          height: 1.5px;
          background: linear-gradient(90deg, transparent 0%, #8F2621 15%, #8F2621 85%, transparent 100%);
          opacity: 0;
          transform: scaleX(0);
          transform-origin: center;
          transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .nav-item::after {
          content: '';
          position: absolute;
          inset: -4px;
          background: radial-gradient(circle, rgba(122, 150, 54, 0.2) 0%, transparent 70%);
          opacity: 0;
          transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
          border-radius: 8px;
        }
        
        .nav-item:hover::before {
          opacity: 1;
          transform: scaleX(1);
        }

        .nav-item:hover::after {
          opacity: 1;
        }
        
        .nav-item:hover {
          color: #7A9636; /* Hover color is Olive */
          transform: translateY(-2px);
        }
        
        .nav-item svg {
          transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
          filter: drop-shadow(0 0 0px rgba(122, 150, 54, 0));
        }
        
        .nav-item:hover svg {
          filter: drop-shadow(0 0 12px rgba(122, 150, 54, 0.7));
          transform: scale(1.15) rotate(5deg);
        }
        
        .nav-divider {
          width: 1px;
          height: 28px;
          background: linear-gradient(to bottom, transparent 0%, rgba(143, 38, 33, 0.3) 20%, rgba(143, 38, 33, 0.3) 80%, transparent 100%);
          opacity: 0.6;
          margin: 0 0.25rem;
        }
        
        .nav-section {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .nav-container {
          position: relative;
        }
        
        @media (max-width: 768px) {
          .nav-item {
            padding: 0.6rem 0.875rem;
            font-size: 0.7rem;
          }
          
          .nav-item::before {
            left: 0.875rem;
            right: 0.875rem;
          }

          .nav-divider {
            display: none;
          }
        }

        @media (max-width: 640px) {
          .nav-glass {
            gap: 0.25rem;
          }

          .nav-item {
            padding: 0.5rem 0.65rem;
          }
        }
      `}</style>

      {/* Floating Navigation Bar */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 w-11/12 max-w-6xl">
        {/* Main nav container with glass effect */}
        <div className="nav-glass rounded-full h-14 px-2 md:px-4 flex items-center justify-between">
          {/* Left Section - Search */}
          <div className="nav-section">
            <button 
              className="nav-item group"
              aria-label="Search properties"
              onClick={() => navigate("/services")}
            >
              <Briefcase className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0" />
              <span className="hidden md:inline">EXPLORE SERVICES</span>
              <span className="inline md:hidden">SERVICES</span>
            </button>
          </div>

          {/* Center Divider */}
          <div className="nav-divider hidden md:block" />

          {/* Center Section - Watch Movie */}
          <div className="nav-section">
            <button 
              className="nav-item group"
              aria-label="Watch full movie"
              onClick={() => navigate("/features")}
            >
             <Building2 className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0" />
              <span className="hidden md:inline">VIEW PROJECTS</span>
              <span className="inline md:hidden">PROJECTS</span>
            </button>
          </div>

          {/* Right Divider */}
          <div className="nav-divider hidden md:block" />

          {/* Right Section - Phone */}
          <div className="nav-section">
            <a 
              href="tel:+919763000000"
              className="nav-item group"
              aria-label="Call us"
            >
              <Phone className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0" />
              <span className="hidden md:inline">(+91) 9763-00-0000</span>
              <span className="inline md:hidden">CALL</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
