import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Badge } from "../components/ui/badge";
import { ArrowRight, ChevronRight } from "lucide-react";

const categories = ["All", "Lakehouse", "Cloud Migration", "Optimization", "Governance"];

const caseStudies = [
  {
    slug: "databricks-unity-catalog-poc",
    category: "Lakehouse",
    badge: "Lakehouse",
    title: "Databricks Unity Catalog POC",
    metric: "70% Performance Improvement",
    client: "Fortune 500 Financial Services",
    desc: "Enterprise-scale proof of concept delivering unified governance across multi-cloud Databricks workspaces. Established the migration blueprint for the organization's entire data estate.",
    tags: ["Databricks", "Unity Catalog", "Delta Lake", "Multi-cloud"],
    featured: true,
  },
  {
    slug: "oci-18-instance-migration",
    category: "Cloud Migration",
    badge: "Cloud Migration",
    title: "18-Instance OCI Migration",
    metric: "3M+ Users Supported",
    client: "Enterprise Healthcare Platform",
    desc: "Complex multi-environment migration from legacy infrastructure to Oracle Cloud Infrastructure. Maintained zero-downtime throughout the migration while supporting 3M+ active users.",
    tags: ["OCI", "High Availability", "Oracle DB", "Migration"],
    featured: true,
  },
  {
    slug: "aws-well-architected-review",
    category: "Optimization",
    badge: "Optimization",
    title: "AWS Well-Architected Review & Remediation",
    metric: "40% Cost Reduction",
    client: "SaaS Analytics Company",
    desc: "Comprehensive AWS Well-Architected review that identified critical improvements across security, reliability, and cost. Implemented remediation plan delivering 40% cost reduction.",
    tags: ["AWS", "Well-Architected", "Cost Optimization", "Security"],
    featured: false,
  },
  {
    slug: "legacy-oracle-modernization",
    category: "Lakehouse",
    badge: "Lakehouse",
    title: "Legacy Oracle to Lakehouse Transformation",
    metric: "60% Faster Queries",
    client: "Retail Enterprise",
    desc: "Multi-phase modernization from Oracle RDBMS to Databricks Lakehouse. Converted 200+ stored procedures and maintained data quality throughout the transition.",
    tags: ["Oracle", "Databricks", "ETL Modernization", "Delta Lake"],
    featured: false,
  },
  {
    slug: "data-governance-framework",
    category: "Governance",
    badge: "Governance",
    title: "Enterprise Data Governance Framework",
    metric: "100% Compliance Achieved",
    client: "Banking Institution",
    desc: "Designed and implemented a comprehensive data governance framework using Unity Catalog. Achieved full regulatory compliance while improving data team velocity by 35%.",
    tags: ["Governance", "Unity Catalog", "Compliance", "Banking"],
    featured: false,
  },
  {
    slug: "multi-cloud-data-platform",
    category: "Cloud Migration",
    badge: "Cloud Migration",
    title: "Multi-Cloud Data Platform Build",
    metric: "99.99% Uptime",
    client: "Global Manufacturing",
    desc: "Designed and built a multi-cloud data platform spanning AWS and OCI with seamless data replication and failover. Achieved 99.99% uptime SLA.",
    tags: ["AWS", "OCI", "Multi-cloud", "High Availability"],
    featured: false,
  },
];

export default function CaseStudiesPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? caseStudies
      : caseStudies.filter((cs) => cs.category === activeCategory);

  const featuredStudies = filtered.filter((cs) => cs.featured);
  const regularStudies = filtered.filter((cs) => !cs.featured);

  return (
    <div data-testid="case-studies-page" className="pt-24 md:pt-32">
      {/* Header */}
      <section className="pb-12 md:pb-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-2xl">
            <Badge className="bg-slate-100 text-slate-700 border-0 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
              Case Studies
            </Badge>
            <h1 className="font-['Outfit'] text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 mb-5">
              Proven results at <span className="gradient-text">enterprise scale</span>
            </h1>
            <p className="text-lg md:text-xl leading-relaxed text-slate-600">
              Real projects, real metrics. Each case study details the challenge, approach, and measurable business impact.
            </p>
          </div>
        </div>
      </section>

      {/* Filter */}
      <section className="pb-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div data-testid="case-study-filters" className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                data-testid={`filter-${cat.toLowerCase().replace(/\s/g, '-')}`}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-[#ff6f28] text-white shadow-md shadow-orange-500/20"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="pb-24 md:pb-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Featured (large cards) */}
          {featuredStudies.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-8">
              {featuredStudies.map((cs) => (
                <Link
                  to={`/case-studies/${cs.slug}`}
                  key={cs.slug}
                  data-testid={`case-study-card-${cs.slug}`}
                  className="bg-white border border-slate-100 rounded-xl overflow-hidden shadow-[0_2px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 group card-hover-beam"
                >
                  <div className="p-8 md:p-10">
                    <div className="flex items-center gap-3 mb-5">
                      <Badge className="bg-slate-100 text-slate-700 border-0 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                        {cs.badge}
                      </Badge>
                      <span className="text-xs text-slate-400">{cs.client}</span>
                    </div>
                    <h3 className="font-['Outfit'] text-2xl md:text-3xl font-semibold text-slate-900 tracking-tight mb-3 group-hover:text-[#ff6f28] transition-colors">
                      {cs.title}
                    </h3>
                    <p className="stat-number text-3xl md:text-4xl gradient-text mb-4">{cs.metric}</p>
                    <p className="text-slate-500 leading-relaxed mb-6">{cs.desc}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {cs.tags.map((tag) => (
                        <span key={tag} className="bg-slate-50 text-slate-500 px-3 py-1 rounded-full text-xs font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-1 text-[#ff6f28] font-semibold group-hover:gap-2 transition-all">
                      Read Full Case Study <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Regular cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {regularStudies.map((cs) => (
              <Link
                to={`/case-studies/${cs.slug}`}
                key={cs.slug}
                data-testid={`case-study-card-${cs.slug}`}
                className="bg-white border border-slate-100 rounded-xl overflow-hidden shadow-[0_2px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 group card-hover-beam"
              >
                <div className="p-6 md:p-8">
                  <Badge className="bg-slate-100 text-slate-700 border-0 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                    {cs.badge}
                  </Badge>
                  <h3 className="font-['Outfit'] text-lg md:text-xl font-semibold text-slate-900 tracking-tight mb-2 group-hover:text-[#ff6f28] transition-colors">
                    {cs.title}
                  </h3>
                  <p className="stat-number text-2xl gradient-text mb-3">{cs.metric}</p>
                  <p className="text-sm text-slate-500 leading-relaxed mb-4">{cs.desc}</p>
                  <div className="flex items-center gap-1 text-[#ff6f28] text-sm font-semibold group-hover:gap-2 transition-all">
                    View Details <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-slate-400 py-16">No case studies in this category yet.</p>
          )}
        </div>
      </section>
    </div>
  );
}
