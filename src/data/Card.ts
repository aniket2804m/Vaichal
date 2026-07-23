import home1 from "../assets/images/Hero/home1.png";
import home2 from "../assets/images/Hero/home2.png";
import home3 from "../assets/images/Hero/home3.png";
import home4 from "../assets/images/Hero/home4.png";
import venkys1 from "../assets/images/Projects/Venkys1.png";
import venkys2 from "../assets/images/Projects/Venkys2.png";
import venkys3 from "../assets/images/Projects/Venkys3.png";
import venkys4 from "../assets/images/Projects/Venkys4.png";
import ador from "../assets/images/Projects/ador.png";
import ador1 from "../assets/images/Projects/ador1.png";

export interface ServiceItem {
  title: string;
  short: string;
  description: string;
  images?: string[];
  image?: string;
  icon?: string;
  route: string;
  explore: string;
}

export const services: ServiceItem[] = [
  {
    title: "Luxury Residential Development",
    short: "Bespoke Sanctuaries",
    description: "Crafting bespoke residential sanctuaries in harmony with natural surroundings. Every home is a masterpiece of timeless design, utilizing premium eco-friendly materials and smart automation.",
    images: [home1, home2, home3, home4],
    icon: "🏡",
    route: "/services",
    explore: "Explore Residential"
  },
  {
    title: "Commercial Workspaces & IT Parks",
    short: "Future-Ready Tech Parks",
    description: "Architecting state-of-the-art office spaces and technology parks designed to stimulate productivity and wellness, featuring biophilic designs and energy-efficient building systems.",
    images: [venkys1, venkys2, venkys3, venkys4],
    icon: "🏢",
    route: "/services",
    explore: "Explore Commercial"
  },
  {
    title: "Strategic Property Investment",
    short: "High-Growth Micro-Markets",
    description: "Tailored investment consulting to identify high-growth, premium micro-markets. We help you build and manage a real estate portfolio that delivers stable and compounding long-term returns.",
    images: [ador, ador1, home4],
    icon: "📈",
    route: "/services",
    explore: "Explore Investments"
  },
  {
    title: "Premium Property Management",
    short: "End-to-End Asset Care",
    description: "End-to-end luxury management solutions ensuring the value of your assets remains pristine. Includes concierge services, landscaping, premium upkeep, and tenant placement.",
    images: [home3, venkys2],
    icon: "🛡️",
    route: "/services",
    explore: "Explore Management"
  },
  {
    title: "Sustainable Architecture Consulting",
    short: "LEED & IGBC Certified Design",
    description: "Pioneering green-building certifications (LEED / IGBC). Our specialist architects blend luxury finishes with sustainable water harvesting, solar arrays, and high-efficiency ventilation.",
    images: [home2, venkys3, ador],
    icon: "🍃",
    route: "/services",
    explore: "Explore Sustainability"
  }
];
