import { getSupabaseClient, TABLES } from '../config/supabase';

// Data from portfolio/src/lib/data.ts
const profile = {
  name: "Muhammad Arif Faishal Haq",
  title: "Full-Stack Developer & Cell Lead",
  email: "ariffaishac.dev@gmail.com",
  linkedin: "https://www.linkedin.com/in/ariffaishac/",
  location: "Yogyakarta, Indonesia",
  summary: "Full-stack Developer with over 2 years of experience specializing in the javascript ecosystem (React Native, Next.js). As a Cell Lead, I guide my team on large-scale projects like platform migrations and mentor new developers.",
};

const experiences = [
  {
    role: "Full-Stack Developer (Cell Lead)",
    company: "Berijalan Technocenter",
    period: "2024 - Present",
    description: [
      "Led a 4-person frontend team on Moxa Mitra (React Native, 50K+ downloads), remediating critical security vulnerabilities.",
      "Led technical execution of ACCOne platform migration (OutSystems to Next.js + Express.js).",
      "Designed PostgreSQL database schema and built ingestion APIs for huge data migration.",
      "Architected real-time global search functionality with Elasticsearch and Kafka.",
      "Designed and instructed a 13-person internal full-stack bootcamp."
    ],
    sort_order: 1
  },
  {
    role: "Front-End Developer",
    company: "Berijalan Technocenter",
    period: "2022 - 2024",
    description: [
      "Developed Otoransi insurance mobile app (React Native, 500+ downloads).",
      "Optimized map performance for 500+ workshop markers.",
      "Integrated Espay client-side SDK for seamless payments.",
      "Promoted to Cell Lead in 2024 due to strong performance."
    ],
    sort_order: 2
  },
  {
    role: "Front-End Developer",
    company: "Freelance",
    period: "2024 - 2025",
    description: [
      "Built a CMS dashboard for Forest Fire Hotspot monitoring (Next.js, Leaflet, Zustand).",
      "Integrated spatial tools for real-time monitoring.",
      "Achieved 100 Best Practices score with CI/CD implementation on GCP."
    ],
    sort_order: 3
  }
];

const projects = [
  {
    title: "ACCOne Platform Migration",
    description: "Migration of a customer-facing financial platform from legacy OutSystems to modern Next.js 16 + Express.js architecture.",
    tags: ["Next.js", "Express.js", "PostgreSQL", "Kafka", "Elasticsearch"],
    sort_order: 1
  },
  {
    title: "Moxa Mitra App",
    description: "Partner mobile application with 50K+ downloads. Focused on security improvements and feature stability.",
    tags: ["React Native", "Mobile Security", "Team Leadership"],
    sort_order: 2
  },
  {
    title: "Forest Fire Hotspot Dashboard",
    description: "Real-time environmental monitoring dashboard with interactive maps and spatial analysis tools.",
    tags: ["Next.js", "Leaflet", "Zustand", "GCP", "Tailwind/MUI"],
    sort_order: 3
  },
  {
    title: "Otoransi Mobile App",
    description: "Insurance mobile application with map integration and payment gateway.",
    tags: ["React Native", "Google Maps API", "Payment Gateway"],
    sort_order: 4
  }
];

const skills = [
  {
    category: "Languages & Frameworks",
    items: ["Javascript", "TypeScript", "React.js", "Next.js", "React Native", "Express.js"],
    sort_order: 1
  },
  {
    category: "Tools & Infrastructure",
    items: ["Git", "GitHub", "GitLab", "Elasticsearch", "Kafka", "Google Cloud Platform"],
    sort_order: 2
  },
  {
    category: "Methodologies",
    items: ["Scrum/Agile", "Team Leadership", "Mentoring", "Technical Architecture"],
    sort_order: 3
  }
];

const seed = async () => {
  const supabase = getSupabaseClient();
  console.log('🌱 Starting seed process...');

  try {
    // 1. Clear existing data
    console.log('🧹 Clearing existing data...');
    await supabase.from(TABLES.SKILLS).delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from(TABLES.PROJECTS).delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from(TABLES.EXPERIENCES).delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from(TABLES.PROFILES).delete().neq('id', '00000000-0000-0000-0000-000000000000');

    // 2. Insert Profile
    console.log('👤 Inserting profile...');
    const { error: profileError } = await supabase.from(TABLES.PROFILES).insert(profile);
    if (profileError) throw profileError;

    // 3. Insert Experiences
    console.log('💼 Inserting experiences...');
    const { error: expError } = await supabase.from(TABLES.EXPERIENCES).insert(experiences);
    if (expError) throw expError;

    // 4. Insert Projects
    console.log('🚀 Inserting projects...');
    const { error: projError } = await supabase.from(TABLES.PROJECTS).insert(projects);
    if (projError) throw projError;

    // 5. Insert Skills
    console.log('🛠️ Inserting skills...');
    const { error: skillError } = await supabase.from(TABLES.SKILLS).insert(skills);
    if (skillError) throw skillError;

    console.log('✅ Seed completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  }
};

seed();
