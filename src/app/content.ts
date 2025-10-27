


// src/app/content.ts

export const BANNERS = [
  { src: "/images/banner1.jpg", alt: "Pilot training in action" },
  { src: "/images/banner2.jpg", alt: "Drone surveying in field" },
  { src: "/images/banner3.jpg", alt: "Fleet operations from control center" },
];

export const SERVICES = [
  {
    id: "training-aviation",
    title: "Aviation Training",
    blurb: "Commercial pilot training with simulators & theory sessions.",
    href: "/services/aviation-training",
    icon: "🛫",
  },
  {
    id: "training-drone",
    title: "Drone Training",
    blurb: "DGCA-certified drone operator programs for all levels.",
    href: "/services/drone-training",
    icon: "🚁",
  },
  {
    id: "supplier-drone",
    title: "Drone Supplier",
    blurb: "Enterprise drones & parts for industries and government.",
    href: "/services/drone-supplier",
    icon: "📦",
  },
  {
    id: "drone-services",
    title: "Drone Services",
    blurb: "Aerial survey, security, agriculture & inspection services.",
    href: "/services/drone-services",
    icon: "🔧",
  },
];

export const OUTCOMES = [
  {
    title: "High-Precision Rail Mapping",
    industry: "Transport",
    headline: "RTK drone mapping for 45 km corridor",
    blurb: "Delivered orthomosaic, DTM & alignment overlay in 10 days.",
    kpis: ["3 cm RMSE", "GCP-aided QA", "CAD overlay ready"],
    href: "/outcomes/rail-mapping",
    thumb: "/images/outcome1.jpg",
  },
  {
    title: "Highway Expansion Survey",
    industry: "Infrastructure",
    headline: "150 km corridor surveyed in 2 weeks",
    blurb: "Fast deployment using fixed-wings & multi-rotors.",
    kpis: ["15,000+ images", "5 cm contours", "GIS-ready"],
    href: "/outcomes/highway-survey",
    thumb: "/images/outcome2.jpg",
  },
  {
    title: "Agriculture NDVI Mapping",
    industry: "AgTech",
    headline: "Crop health assessed for 2,000 hectares",
    blurb: "NDVI + prescription maps enabled variable spraying.",
    kpis: ["4 bands", "GeoTIFFs", "Weekly updates"],
    href: "/outcomes/ndvi-mapping",
    thumb: "/images/outcome3.jpg",
  },
  {
    title: "Solar Farm Inspection",
    industry: "Energy",
    headline: "Thermal & RGB inspection of 20 MW plant",
    blurb: "Identified panel faults using AI-assisted analytics.",
    kpis: ["98% panel coverage", "Thermal alerts", "PDF reports"],
    href: "/outcomes/solar-inspection",
    thumb: "/images/outcome4.jpg",
  },
];

export const TESTIMONIALS = [
  {
    quote: "RUDRA’s team delivered accurate data faster than expected. Their compliance and QA process was top-notch.",
    name: "S. Mehta",
    title: "Project Lead, Rail Infra",
  },
  {
    quote: "Their NDVI maps helped us detect early-stage crop issues and cut input costs significantly.",
    name: "R. Singh",
    title: "Agronomist, AgriGrow",
  },
  {
    quote: "Seamless drone inspections and automated reports gave us a 10x speed-up in defect detection.",
    name: "A. Fernandes",
    title: "QA Head, SolarTech",
  },
];

export const FAQS = [
  {
    q: "Are your drone operations DGCA-compliant?",
    a: "Yes. All our flights follow DGCA RPTO norms and No Permission No Takeoff (NPNT) protocols.",
  },
  {
    q: "Can we get Revit/CAD-ready outputs?",
    a: "Absolutely. We deliver BIM/GIS/CAD-aligned layers like DSM, contours, vector plans, and more.",
  },
  {
    q: "Do you offer drone training for beginners?",
    a: "Yes. Our RPTO-certified programs include basic, advanced and industry-specific training.",
  },
  {
    q: "What turnaround time can we expect?",
    a: "Most mapping missions are processed within 5–10 business days, depending on area & deliverables.",
  },
];
