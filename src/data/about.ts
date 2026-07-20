import {
  Building2,
  Home,
  KeyRound,
  Landmark,
} from "lucide-react";

export const services = [
  {
    number: "01",
    title: "Luxury Property Sales",
    desc: "Discover and own exclusive luxury residences in prime locations.",
  },
  {
    number: "02",
    title: "Premium Property Rentals",
    desc: "Find elegant homes and apartments tailored to your lifestyle.",
  },
  {
    number: "03",
    title: "Property Investment",
    desc: "Expert guidance to maximize returns through smart real estate investments.",
  },
  {
    number: "04",
    title: "Commercial Real Estate",
    desc: "Premium office spaces, retail locations, and commercial properties.",
  },
  {
    number: "05",
    title: "Property Management",
    desc: "Complete management solutions to protect and enhance your property's value.",
  },
];

export const stats = [
  {
    icon: Home,
    value: "500+",
    label: "Luxury Properties",
  },
  {
    icon: Building2,
    value: "1,200+",
    label: "Happy Clients",
  },
  {
    icon: KeyRound,
    value: "98%",
    label: "Successful Deals",
  },
  {
    icon: Landmark,
    value: "25+",
    label: "Prime Locations",
  },
];

// mission points (used in Our Mission section)
export const missionPoints = [
  "Deliver unparalleled craftsmanship in every project.",
  "Operate with absolute integrity and transparent processes.",
  "Continuously innovate in design, materials, and construction techniques.",
  "Foster long-term relationships by prioritizing client satisfaction.",
];

// differentiators for 'Why Choose Vaichal' — reuse stats / bento style in the UI
export const differentiators = [
  {
    id: "quality",
    title: "Quality",
    desc: "Meticulous attention to detail, premium materials, and rigorous QA at every stage.",
  },
  {
    id: "integrity",
    title: "Integrity",
    desc: "Transparent pricing, fair contracts, and ethical business practices.",
  },
  {
    id: "experience",
    title: "Experience",
    desc: "Decades of combined expertise delivering projects on time and within budget.",
  },
  {
    id: "craftsmanship",
    title: "Craftsmanship",
    desc: "Skilled artisans and trade partners who bring designs to life with precision.",
  },
];

// team members (used in Our Team section). Image paths are relative to the project public/src usage in About.tsx
export const teamMembers = [
  {
    name: "Rajesh Vaichal",
    role: "Founder & Managing Director",
    bio: "A visionary leader with over 25 years in real estate development and construction management.",
    image: "/src/assets/images/Vaichal vastu.png",
  },
  {
    name: "Anjali Patil",
    role: "Head of Design",
    bio: "Leads architectural design and ensures every space blends aesthetics with function.",
    image: "/src/assets/images/team-anjali.png",
  },
  {
    name: "Suresh Kulkarni",
    role: "Chief Engineer",
    bio: "Oversees technical execution, quality assurance and on-site delivery for flagship projects.",
    image: "/src/assets/images/team-suresh.png",
  },
  {
    name: "Meera Rao",
    role: "Client Relations",
    bio: "Curates exceptional client experiences from pre-sales through handover and beyond.",
    image: "/src/assets/images/team-meera.png",
  },
];