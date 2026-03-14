import React from "react";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";
import {
  Briefcase,
  GraduationCap,
  Award,
  MapPin,
  Linkedin,
  Mail,
  Cloud,
  Database,
  Shield,
  BarChart3,
  Users,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const experience = [
  {
    company: "Queensland University of Technology",
    role: "Application and Database Administrator",
    dates: "Dec 2023 — Present",
    location: "Brisbane, Australia",
    highlights: [
      "Spearheaded enterprise data architecture design, leveraging SQL Server and Oracle to drive scalable solutions.",
      "Defined and implemented data governance frameworks and privacy strategies, ensuring 100% compliance with university standards.",
      "Architected and executed cloud migration strategies to Oracle OCI, designing OCI Storage integrations for high-throughput data pipelines.",
      "Designed a hybrid data ingestion architecture for the 'StudyFinder' application, synchronizing curriculum data from Databricks (Lakehouse) to PostgreSQL (OLTP).",
    ],
    tags: ["Oracle OCI", "SQL Server", "Databricks", "PostgreSQL", "Data Governance"],
    current: true,
  },
  {
    company: "Fronde",
    role: "Senior Database Engineer",
    dates: "Apr 2022 — Nov 2023",
    location: "New Zealand",
    highlights: [
      "Established architectural governance for enterprise database solutions, delivering a 70% performance improvement through strategic optimization and capacity planning.",
      "Designed and deployed self-service BI architectures on AWS and Azure, enabling data-driven decision-making for business leaders.",
      "Led technical consultancy workshops on risk management, compliance, and reference architecture design, aligning deliverables with regulatory requirements.",
    ],
    tags: ["AWS", "Azure", "Performance Tuning", "BI Architecture", "Compliance"],
    current: false,
  },
  {
    company: "Otago University",
    role: "Data Management Engineer",
    dates: "Aug 2014 — Apr 2022",
    location: "New Zealand",
    highlights: [
      "Co-developed the University's 3-year Enterprise Data Strategy, establishing best practices for data infrastructure, governance, and BI process maturity.",
      "Engineered a scalable data modelling architecture for the Dentistry Faculty, integrating Power BI to visualize patient satisfaction metrics.",
      "Orchestrated high-availability solutions across complex Oracle environments (12c/18c/19c, RAC, Data Guard), ensuring business continuity.",
    ],
    tags: ["Oracle RAC", "Data Strategy", "Power BI", "Data Guard", "High Availability"],
    current: false,
  },
  {
    company: "DirecTV LATAM",
    role: "Database Architect",
    dates: "2012 — 2014",
    location: "Latin America",
    highlights: [
      "Developed data models and ETL processes for a new e-commerce platform supporting 3M+ users.",
      "Introduced Oracle Exadata X3-2 for disaster recovery, improving response times by 30%.",
      "Delivered cost-effective solutions across the LATAM region.",
    ],
    tags: ["Oracle Exadata", "ETL", "E-commerce", "Disaster Recovery"],
    current: false,
  },
  {
    company: "Asesoftware",
    role: "Oracle Database Consultant",
    dates: "2011 — 2012",
    location: "Colombia",
    highlights: [
      "Optimised performance in large-scale database environments, reducing query execution times by 30%.",
      "Provided consulting on architecture, design, and enterprise performance improvements.",
    ],
    tags: ["Oracle", "Performance Optimization"],
    current: false,
  },
  {
    company: "Indra Spain",
    role: "Oracle Database Specialist",
    dates: "2009 — 2010",
    location: "Spain",
    highlights: [],
    tags: ["Oracle"],
    current: false,
  },
  {
    company: "IBM Colombia",
    role: "Oracle Database Specialist",
    dates: "2007 — 2009",
    location: "Colombia",
    highlights: [],
    tags: ["Oracle", "IBM"],
    current: false,
  },
];

const skills = [
  {
    category: "Cloud Platforms",
    icon: Cloud,
    color: "#2274df",
    bg: "bg-blue-50",
    items: ["AWS (Solutions Architect, Well-Architected)", "Microsoft Azure", "Oracle Cloud (OCI)"],
  },
  {
    category: "Data Architecture",
    icon: Database,
    color: "#ff6f28",
    bg: "bg-orange-50",
    items: ["Data Strategy & Governance", "Warehousing / Lakehouse", "ETL Pipelines", "AI/ML Data Pipelines"],
  },
  {
    category: "Databases",
    icon: BarChart3,
    color: "#2274df",
    bg: "bg-blue-50",
    items: ["Oracle (12c/18c/19c, RAC, ASM, Data Guard)", "SQL Server", "PostgreSQL", "MySQL", "Databricks / Delta Lake"],
  },
  {
    category: "Leadership",
    icon: Users,
    color: "#ff6f28",
    bg: "bg-orange-50",
    items: ["Solution Architecture", "Technical Leadership", "Compliance & Risk", "Stakeholder Engagement"],
  },
];

const certifications = [
  { name: "Databricks Fundamentals", org: "Databricks Academy", year: "" },
  { name: "AWS Solutions Architect — Associate", org: "Amazon Web Services", year: "2024" },
  { name: "AWS Well-Architected Proficient", org: "Amazon Web Services", year: "2024" },
  { name: "AWS Cloud Practitioner", org: "Amazon Web Services", year: "2023" },
  { name: "Azure Data Fundamentals", org: "Microsoft", year: "2022" },
  { name: "Oracle Autonomous & Cloud Infrastructure Specialist", org: "Oracle", year: "2023" },
  { name: "BI Certificate — Data for Decision Making", org: "Future Skills Academy", year: "2024" },
  { name: "Team Leadership in Business, Level 3", org: "Te Wananga o Aotearoa", year: "2023" },
  { name: "Oracle Certified Professional", org: "Oracle", year: "2011" },
  { name: "Oracle Certified Associate", org: "Oracle", year: "2007" },
];

export default function AboutPage({ onOpenLeadMagnet }) {
  return (
    <div data-testid="about-page" className="pt-24 md:pt-32">
      {/* Hero */}
      <section className="pb-16 md:pb-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7">
              <Badge className="bg-slate-100 text-slate-700 border-0 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
                About
              </Badge>
              <h1 className="font-['Outfit'] text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 mb-5">
                J. Alberto <span className="gradient-text">Suarez C.</span>
              </h1>
              <p className="text-xl md:text-2xl font-['Outfit'] font-medium text-slate-700 mb-6">
                Solutions Architect & Data Specialist
              </p>
              <p className="text-lg leading-relaxed text-slate-600 mb-6">
                Solution Architect and Data Specialist with 15+ years' experience delivering enterprise data 
                strategies across cloud, big data, and AI/ML platforms. Microsoft Azure certified, with 
                expertise in secure data integration, encryption, and governance.
              </p>
              <p className="text-base leading-relaxed text-slate-500 mb-8">
                Proven record of designing and optimising large-scale databases and warehouses to improve 
                performance and scalability. Skilled communicator and team leader with a strong client focus 
                and success in driving system integration and cloud transformation.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://www.linkedin.com/in/jairo-alberto-suarez-carrillo/"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="about-linkedin-link"
                  className="bg-white border border-slate-200 text-slate-700 hover:text-[#2274df] hover:border-[#2274df]/30 rounded-lg px-5 py-2.5 text-sm font-medium transition-all flex items-center gap-2"
                >
                  <Linkedin className="w-4 h-4" /> LinkedIn
                </a>
                <a
                  href="mailto:Jairo.suarez@gmail.com"
                  data-testid="about-email-link"
                  className="bg-white border border-slate-200 text-slate-700 hover:text-[#ff6f28] hover:border-[#ff6f28]/30 rounded-lg px-5 py-2.5 text-sm font-medium transition-all flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" /> Contact
                </a>
                <button
                  data-testid="about-cta-assessment"
                  onClick={onOpenLeadMagnet}
                  className="bg-[#ff6f28] hover:bg-[#e65a15] text-white rounded-lg px-5 py-2.5 text-sm font-semibold shadow-lg shadow-orange-500/20 transition-all hover:-translate-y-0.5"
                >
                  Get Strategy Assessment
                </button>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-[0_2px_20px_rgba(0,0,0,0.04)] space-y-5">
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <span className="text-sm text-slate-600">Brisbane, Australia</span>
                </div>
                <Separator />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">Key Metrics</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="stat-number text-2xl text-slate-900">15+</p>
                      <p className="text-xs text-slate-500">Years Experience</p>
                    </div>
                    <div>
                      <p className="stat-number text-2xl text-slate-900">70%</p>
                      <p className="text-xs text-slate-500">Performance Gains</p>
                    </div>
                    <div>
                      <p className="stat-number text-2xl text-slate-900">3M+</p>
                      <p className="text-xs text-slate-500">Users Supported</p>
                    </div>
                    <div>
                      <p className="stat-number text-2xl text-slate-900">4</p>
                      <p className="text-xs text-slate-500">Cloud Platforms</p>
                    </div>
                  </div>
                </div>
                <Separator />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">Education</p>
                  <div className="flex items-start gap-3">
                    <GraduationCap className="w-4 h-4 text-[#2274df] mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-slate-900">System Engineer</p>
                      <p className="text-xs text-slate-500">University of Santander (UDES), Colombia, 2004</p>
                      <p className="text-xs text-slate-400 mt-0.5">Assessed by Australian Computer Society as equivalent to a Bachelor's Degree</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Skills */}
      <section data-testid="skills-section" className="py-24 md:py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-2xl mb-16">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#ff6f28] mb-3">Expertise</p>
            <h2 className="font-['Outfit'] text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 mb-4">
              Technical skills
            </h2>
            <p className="text-lg leading-relaxed text-slate-600">
              Deep specialization across cloud platforms, data architecture, and enterprise databases.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {skills.map((skill) => (
              <div
                key={skill.category}
                data-testid={`skill-card-${skill.category.toLowerCase().replace(/\s/g, '-')}`}
                className="bg-white border border-slate-100 rounded-xl p-6 md:p-8 shadow-[0_2px_20px_rgba(0,0,0,0.04)] card-hover-beam"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className={`w-10 h-10 rounded-xl ${skill.bg} flex items-center justify-center`}>
                    <skill.icon className="w-5 h-5" style={{ color: skill.color }} />
                  </div>
                  <h3 className="font-['Outfit'] text-lg font-semibold text-slate-900">{skill.category}</h3>
                </div>
                <div className="space-y-2">
                  {skill.items.map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: skill.color }}></div>
                      <span className="text-sm text-slate-600">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section data-testid="experience-section" className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-2xl mb-16">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#2274df] mb-3">Career</p>
            <h2 className="font-['Outfit'] text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 mb-4">
              Professional experience
            </h2>
            <p className="text-lg leading-relaxed text-slate-600">
              A track record of delivering enterprise data solutions across four continents.
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-[19px] top-2 bottom-2 w-px bg-slate-200 hidden md:block"></div>

            <div className="space-y-6">
              {experience.map((exp, i) => (
                <div
                  key={`${exp.company}-${exp.dates}`}
                  data-testid={`experience-card-${i}`}
                  className="relative md:pl-14"
                >
                  {/* Timeline dot */}
                  <div className={`absolute left-2.5 top-6 w-4 h-4 rounded-full border-2 hidden md:block ${
                    exp.current
                      ? "bg-[#ff6f28] border-[#ff6f28] shadow-md shadow-orange-500/30"
                      : "bg-white border-slate-300"
                  }`}></div>

                  <div className="bg-white border border-slate-100 rounded-xl p-6 md:p-8 shadow-[0_2px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-shadow">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                      <div>
                        <h3 className="font-['Outfit'] text-lg font-semibold text-slate-900">{exp.role}</h3>
                        <p className="text-sm text-[#2274df] font-medium">{exp.company}</p>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-slate-400 flex-shrink-0">
                        {exp.current && (
                          <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
                            Current
                          </span>
                        )}
                        <span>{exp.dates}</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> {exp.location}
                        </span>
                      </div>
                    </div>

                    {exp.highlights.length > 0 && (
                      <ul className="space-y-2 mb-4">
                        {exp.highlights.map((h, j) => (
                          <li key={j} className="flex items-start gap-2.5">
                            <ChevronRight className="w-3.5 h-3.5 text-[#ff6f28] mt-1 flex-shrink-0" />
                            <span className="text-sm text-slate-600 leading-relaxed">{h}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {exp.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {exp.tags.map((tag) => (
                          <span key={tag} className="bg-slate-50 text-slate-500 px-2.5 py-0.5 rounded-full text-xs font-medium">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section data-testid="certifications-section" className="py-24 md:py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-2xl mb-16">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#ff6f28] mb-3">Credentials</p>
            <h2 className="font-['Outfit'] text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 mb-4">
              Certifications
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {certifications.map((cert, i) => (
              <div
                key={i}
                data-testid={`cert-card-${i}`}
                className="bg-white border border-slate-100 rounded-xl p-5 shadow-[0_2px_20px_rgba(0,0,0,0.04)] flex items-start gap-3 card-hover-beam"
              >
                <div className="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center flex-shrink-0">
                  <Award className="w-4 h-4 text-[#ff6f28]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900 leading-snug">{cert.name}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{cert.org}{cert.year ? ` — ${cert.year}` : ""}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <h2 className="font-['Outfit'] text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 mb-4">
            Let's work together
          </h2>
          <p className="text-lg text-slate-600 max-w-xl mx-auto mb-8">
            Whether it's a Lakehouse migration, cloud optimization, or governance strategy — 
            I bring 15+ years of hands-on enterprise experience to every engagement.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              data-testid="about-bottom-cta"
              onClick={onOpenLeadMagnet}
              className="bg-[#ff6f28] hover:bg-[#e65a15] text-white rounded-lg px-8 py-4 font-semibold shadow-lg shadow-orange-500/20 transition-all hover:-translate-y-1 hover:shadow-orange-500/30 inline-flex items-center gap-2"
            >
              Start with Free Assessment <ChevronRight className="w-4 h-4" />
            </button>
            <Link
              to="/case-studies"
              data-testid="about-cases-link"
              className="bg-white border border-slate-200 text-slate-900 hover:bg-slate-50 hover:text-[#2274df] hover:border-[#2274df]/30 rounded-lg px-8 py-4 font-medium transition-all"
            >
              View Case Studies
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
