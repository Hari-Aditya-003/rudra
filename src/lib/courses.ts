// src/lib/courses.ts
export type Course = {
  slug: string;
  title: string;
  level: "Beginner" | "Advanced" | "Specialization";
  duration: string;     // e.g. "5–8 Days"
  summary: string;      // short blurb (for cards)
  bullets: string[];    // 3–6 bullets
  hero?: string;        // optional image
};

const makeSlug = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const RAW: Omit<Course, "slug">[] = [
  {
    title: "Remote Pilot Training – Small Rotorcraft [DGCA Certified]",
    level: "Beginner",
    duration: "5–8 Days",
    summary:
      "Core flight skills, safety, SOPs and DGCA-aligned ground school for small rotorcraft.",
    bullets: ["Pre-flight & failsafe", "Manual + assisted modes", "Airworthiness & logs", "DGCA rules & airspace"],
    hero: "/placeholders/course-small.jpg",
  },
  {
    title: "Remote Pilot Training – Medium Rotorcraft [DGCA Certified]",
    level: "Advanced",
    duration: "5–8 Days",
    summary:
      "Medium-class platform handling, emergency drills and operations documentation.",
    bullets: ["Emergency procedures", "Advanced checklists", "Ops documentation", "Mission planning"],
    hero: "/placeholders/course-medium.jpg",
  },
  {
    title: "20 Hours of Comprehensive Flight – Small Rotorcraft",
    level: "Advanced",
    duration: "15 Days",
    summary:
      "Intensive flight program to deepen control, accuracy and mission tempo.",
    bullets: ["Pattern work", "Precision maneuvers", "Payload workflows", "Field debriefs"],
    hero: "/placeholders/course-20h-small.jpg",
  },
  {
    title: "20 Hours of Comprehensive Flight – Medium Rotorcraft",
    level: "Advanced",
    duration: "15 Days",
    summary:
      "Medium-class endurance, payload profiles and complex mission stacks.",
    bullets: ["Endurance profiles", "Payload swaps", "Complex missions", "After-action reviews"],
    hero: "/placeholders/course-20h-medium.jpg",
  },
  {
    title: "Agriculture Specific Drone Training",
    level: "Specialization",
    duration: "15 Days",
    summary:
      "Spraying ops, calibration, and crop-specific strategies with safety SOPs.",
    bullets: ["Spray planning", "Calibration", "Agro-SOPs", "Basic crop analytics"],
    hero: "/placeholders/course-agri.jpg",
  },
  {
    title: "Drone Technician Training",
    level: "Specialization",
    duration: "3 Months",
    summary:
      "Build, maintain and troubleshoot airframes, avionics and payloads.",
    bullets: ["Airframes", "Power & ESCs", "Sensors & payloads", "Troubleshooting"],
    hero: "/placeholders/course-tech.jpg",
  },
  {
    title: "FPV Drone Racing",
    level: "Specialization",
    duration: "15 Days",
    summary:
      "High-performance FPV handling, tuning, and race craft fundamentals.",
    bullets: ["Rate tuning", "Line choice", "Failsafe planning", "Maintenance"],
    hero: "/placeholders/course-fpv.jpg",
  },
  {
    title: "Aerial Cinematography",
    level: "Specialization",
    duration: "15 Days",
    summary:
      "Cinematic moves, camera profiles and shot planning for media teams.",
    bullets: ["Shot design", "Camera profiles", "Flight choreography", "Set safety"],
    hero: "/placeholders/course-cine.jpg",
  },
  {
    title: "GIS Survey & Mapping",
    level: "Specialization",
    duration: "15 Days",
    summary:
      "Photogrammetry & mapping pipeline from capture to deliverables.",
    bullets: ["Mission design", "GCPs & QA", "Processing workflow", "GIS outputs"],
    hero: "/placeholders/course-gis.jpg",
  },
  {
    title: "Drone Instructor Course – Small, Rotorcraft [DGCA Certified]",
    level: "Advanced",
    duration: "9 Days",
    summary:
      "Train-the-trainer pedagogy, evaluation and safety leadership.",
    bullets: ["Lesson design", "Evaluation drills", "Safety leadership", "Documentation"],
    hero: "/placeholders/course-instructor.jpg",
  },
  {
    title: "AI/ML for UAVs",
    level: "Specialization",
    duration: "15 Days",
    summary:
      "From dataset building to on-device inference for UAV analytics.",
    bullets: ["Data pipelines", "Model training", "Edge inference", "Evaluation"],
    hero: "/placeholders/course-ml.jpg",
  },
  {
    title: "Mapping, Modeling & Surveying (RPTO)",
    level: "Specialization",
    duration: "15 Days",
    summary:
      "End-to-end RPTO mapping stack including QA and reporting.",
    bullets: ["Standards & CRS", "Accuracy checks", "Reports & hand-offs", "Best practices"],
    hero: "/placeholders/course-rpto.jpg",
  },
];

export const allCourses = (): Course[] =>
  RAW.map((c) => ({ ...c, slug: makeSlug(c.title) }));

export const getCourse = (slug: string): Course | undefined =>
  allCourses().find((c) => c.slug === slug);