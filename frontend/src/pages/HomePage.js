import React from "react";
import { Link } from "react-router-dom";
import { Badge } from "../components/ui/badge";
import {
  ArrowRight,
  Shield,
  Rocket,
  Database,
  Cloud,
  BarChart3,
  Lock,
  Layers,
  Zap,
  ChevronRight,
} from "lucide-react";

const stats = [
  { value: "15+", label: "Years Experience" },
  { value: "70%", label: "Performance Gains" },
  { value: "3M+", label: "Users Supported" },
  { value: "4", label: "Cloud Platforms" },
];

const offenseServices = [
  {
    icon: Database,
    title: "Lakehouse Migration",
    desc: "Low-risk migration paths from Oracle/SQL Server to Databricks Lakehouse with Unity Catalog.",
  },
  {
    icon: Zap,
    title: "AI/ML Pipelines",
    desc: "Production-ready data pipelines that fuel machine learning and advanced analytics.",
  },
  {
    icon: BarChart3,
    title: "Data Monetization",
    desc: "Transform raw data into revenue streams with strategic data product design.",
  },
];

const defenseServices = [
  {
    icon: Shield,
    title: "Data Governance",
    desc: "Enterprise governance frameworks that enable innovation without compromising control.",
  },
  {
    icon: Lock,
    title: "Privacy & Compliance",
    desc: "Turn regulatory requirements into competitive advantages with proactive compliance.",
  },
  {
    icon: Layers,
    title: "Risk Management",
    desc: "Identify and mitigate data risks before they become business-critical incidents.",
  },
];

const caseStudyPreviews = [
  {
    slug: "databricks-unity-catalog-poc",
    badge: "Lakehouse",
    title: "Databricks Unity Catalog POC",
    metric: "70% Performance Improvement",
    desc: "Enterprise-scale proof of concept delivering unified governance across multi-cloud Databricks workspaces.",
  },
  {
    slug: "oci-18-instance-migration",
    badge: "Cloud Migration",
    title: "18-Instance OCI Migration",
    metric: "3M+ Users Supported",
    desc: "Complex multi-environment migration from legacy infrastructure to Oracle Cloud Infrastructure.",
  },
  {
    slug: "aws-well-architected-review",
    badge: "Optimization",
    title: "AWS Well-Architected Review",
    metric: "40% Cost Reduction",
    desc: "Comprehensive architecture review resulting in significant cost and performance improvements.",
  },
];

export default function HomePage({ onOpenLeadMagnet }) {
  return (
    <div data-testid="home-page">
      {/* Hero */}
      <section data-testid="hero-section" className="hero-pattern pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            <div className="lg:col-span-7 opacity-0 animate-fade-in-up">
              <Badge className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border-0 mb-6">
                Solutions Architect &middot; 15+ Years
              </Badge>
              <h1 className="font-['Outfit'] text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-slate-900 mb-6">
                Balance{" "}
                <span className="gradient-text">Data Defense</span>
                {" "}with{" "}
                <span className="gradient-text">Data Offense</span>
              </h1>
              <p className="text-lg md:text-xl leading-relaxed text-slate-600 max-w-xl mb-8">
                I help organizations transform data infrastructure from a cost center into a strategic business asset. 
                From governance to monetization &mdash; architecture that delivers.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  data-testid="hero-cta-assessment"
                  onClick={onOpenLeadMagnet}
                  className="bg-[#ff6f28] hover:bg-[#e65a15] text-white rounded-lg px-8 py-4 font-semibold shadow-lg shadow-orange-500/20 transition-all hover:-translate-y-1 hover:shadow-orange-500/30 flex items-center gap-2"
                >
                  Get Strategy Assessment
                  <ArrowRight className="w-4 h-4" />
                </button>
                <Link
                  to="/case-studies"
                  data-testid="hero-cta-cases"
                  className="bg-white border border-slate-200 text-slate-900 hover:bg-slate-50 hover:text-[#2274df] hover:border-[#2274df]/30 rounded-lg px-8 py-4 font-medium transition-all flex items-center gap-2"
                >
                  View Case Studies
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 opacity-0 animate-fade-in-up stagger-2">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-orange-100 to-blue-50 rounded-2xl blur-xl opacity-60"></div>
                <div className="relative bg-white border border-slate-100 rounded-2xl p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-3 h-3 rounded-full bg-[#ff6f28]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#2274df]"></div>
                    <div className="w-3 h-3 rounded-full bg-slate-300"></div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Rocket className="w-5 h-5 text-[#ff6f28]" />
                      <div className="flex-1">
                        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Offense</div>
                        <div className="h-2 mt-1 bg-gradient-to-r from-[#ff8200] to-[#ff6f28] rounded-full w-4/5"></div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5 text-[#2274df]" />
                      <div className="flex-1">
                        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Defense</div>
                        <div className="h-2 mt-1 bg-gradient-to-r from-[#2274df] to-[#5a9ae6] rounded-full w-3/5"></div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Cloud className="w-5 h-5 text-slate-400" />
                      <div className="flex-1">
                        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Cloud Maturity</div>
                        <div className="h-2 mt-1 bg-gradient-to-r from-slate-300 to-slate-200 rounded-full w-full"></div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <p className="text-xs text-slate-500">Data Strategy Score</p>
                    <p className="stat-number text-3xl text-slate-900 mt-1">87<span className="text-sm font-normal text-slate-400">/100</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section data-testid="stats-section" className="border-y border-slate-100 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 md:py-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center md:text-left">
                <p className="stat-number text-3xl md:text-4xl text-slate-900">{stat.value}</p>
                <p className="text-sm text-slate-500 mt-1 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section data-testid="services-overview" className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-2xl mb-16">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#ff6f28] mb-3">Services</p>
            <h2 className="font-['Outfit'] text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 mb-4">
              Two sides of data strategy
            </h2>
            <p className="text-lg leading-relaxed text-slate-600">
              Every successful data organization balances offensive capabilities with defensive rigor. I architect both.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {/* Offense */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center">
                  <Rocket className="w-5 h-5 text-[#ff6f28]" />
                </div>
                <h3 className="font-['Outfit'] text-xl font-semibold text-slate-900">Data Offense</h3>
              </div>
              <div className="space-y-4">
                {offenseServices.map((svc) => (
                  <div
                    key={svc.title}
                    data-testid={`service-card-${svc.title.toLowerCase().replace(/[\s/]/g, '-')}`}
                    className="bg-white border border-slate-100 rounded-xl p-6 shadow-[0_2px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 card-hover-beam"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center flex-shrink-0">
                        <svc.icon className="w-5 h-5 text-[#ff6f28]" />
                      </div>
                      <div>
                        <h4 className="font-['Outfit'] font-semibold text-slate-900 mb-1">{svc.title}</h4>
                        <p className="text-sm text-slate-500 leading-relaxed">{svc.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Defense */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-[#2274df]" />
                </div>
                <h3 className="font-['Outfit'] text-xl font-semibold text-slate-900">Data Defense</h3>
              </div>
              <div className="space-y-4">
                {defenseServices.map((svc) => (
                  <div
                    key={svc.title}
                    data-testid={`service-card-${svc.title.toLowerCase().replace(/[\s/]/g, '-')}`}
                    className="bg-white border border-slate-100 rounded-xl p-6 shadow-[0_2px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 card-hover-beam"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                        <svc.icon className="w-5 h-5 text-[#2274df]" />
                      </div>
                      <div>
                        <h4 className="font-['Outfit'] font-semibold text-slate-900 mb-1">{svc.title}</h4>
                        <p className="text-sm text-slate-500 leading-relaxed">{svc.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/services"
              data-testid="view-all-services-link"
              className="inline-flex items-center gap-2 text-[#ff6f28] font-semibold hover:gap-3 transition-all"
            >
              Explore All Services <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Lead Magnet CTA */}
      <section data-testid="lead-magnet-section" className="py-24 md:py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="relative rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900"></div>
            <div className="absolute top-0 left-0 right-0 h-1 brand-gradient-bg"></div>
            <div className="relative px-8 py-14 md:px-16 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7">
                <Badge className="bg-white/10 text-orange-300 border-0 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-5">
                  Free Download
                </Badge>
                <h2 className="font-['Outfit'] text-3xl md:text-4xl font-semibold tracking-tight text-white mb-4">
                  Data Strategy Maturity Assessment
                </h2>
                <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-lg">
                  Where does your organization stand on the data maturity curve? Get a professional-grade 
                  assessment framework used by enterprise architects to evaluate offense and defense readiness.
                </p>
              </div>
              <div className="lg:col-span-5 flex justify-center lg:justify-end">
                <button
                  data-testid="lead-magnet-cta-btn"
                  onClick={onOpenLeadMagnet}
                  className="bg-[#ff6f28] hover:bg-[#e65a15] text-white rounded-lg px-8 py-4 font-semibold shadow-lg shadow-orange-500/30 transition-all hover:-translate-y-1 flex items-center gap-2"
                >
                  Download Assessment
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Preview */}
      <section data-testid="case-studies-preview" className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-16">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-[#2274df] mb-3">Proven Results</p>
              <h2 className="font-['Outfit'] text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-slate-900">
                Case studies
              </h2>
            </div>
            <Link
              to="/case-studies"
              data-testid="view-all-cases-link"
              className="inline-flex items-center gap-2 text-[#ff6f28] font-semibold hover:gap-3 transition-all"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {caseStudyPreviews.map((cs, i) => (
              <Link
                to={`/case-studies/${cs.slug}`}
                key={cs.slug}
                data-testid={`case-study-preview-${cs.slug}`}
                className={`bg-white border border-slate-100 rounded-xl overflow-hidden shadow-[0_2px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 group card-hover-beam ${
                  i === 0 ? "md:col-span-2 md:row-span-1" : ""
                }`}
              >
                <div className="p-6 md:p-8">
                  <Badge className="bg-slate-100 text-slate-700 border-0 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                    {cs.badge}
                  </Badge>
                  <h3 className="font-['Outfit'] text-xl md:text-2xl font-semibold text-slate-900 tracking-tight mb-2 group-hover:text-[#ff6f28] transition-colors">
                    {cs.title}
                  </h3>
                  <p className="stat-number text-2xl md:text-3xl gradient-text mb-3">{cs.metric}</p>
                  <p className="text-sm text-slate-500 leading-relaxed">{cs.desc}</p>
                  <div className="flex items-center gap-1 mt-4 text-[#ff6f28] text-sm font-semibold group-hover:gap-2 transition-all">
                    Read Case Study <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section data-testid="contact-cta" className="py-24 md:py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <h2 className="font-['Outfit'] text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 mb-4">
            Ready to transform your data strategy?
          </h2>
          <p className="text-lg text-slate-600 max-w-xl mx-auto mb-8">
            Let&apos;s discuss how to balance offense and defense for your organization&apos;s unique challenges.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              data-testid="contact-cta-assessment"
              onClick={onOpenLeadMagnet}
              className="bg-[#ff6f28] hover:bg-[#e65a15] text-white rounded-lg px-8 py-4 font-semibold shadow-lg shadow-orange-500/20 transition-all hover:-translate-y-1 hover:shadow-orange-500/30 flex items-center gap-2"
            >
              Start with Free Assessment
              <ArrowRight className="w-4 h-4" />
            </button>
            <Link
              to="/services"
              data-testid="contact-cta-services"
              className="bg-white border border-slate-200 text-slate-900 hover:bg-slate-50 hover:text-[#2274df] hover:border-[#2274df]/30 rounded-lg px-8 py-4 font-medium transition-all"
            >
              Browse Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
