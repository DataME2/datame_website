import React from "react";
import { Link } from "react-router-dom";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";
import {
  Database,
  Zap,
  BarChart3,
  Shield,
  Lock,
  Layers,
  Rocket,
  CheckCircle,
  ArrowRight,
  Cloud,
  Server,
  GitBranch,
} from "lucide-react";

const offenseServices = [
  {
    icon: Database,
    title: "Lakehouse Migration",
    tagline: "From Legacy to Modern in Low-Risk Phases",
    desc: "Navigate the complex journey from Oracle/SQL Server to Databricks Lakehouse architecture. My phased approach minimizes risk while maximizing the speed of value delivery.",
    capabilities: [
      "Oracle to Databricks Lakehouse migration",
      "SQL Server to Unity Catalog transition",
      "Delta Lake optimization and performance tuning",
      "Phased rollout with zero-downtime cutover",
      "Data quality validation frameworks",
    ],
    platforms: ["Databricks", "Delta Lake", "Unity Catalog", "Apache Spark"],
  },
  {
    icon: Zap,
    title: "AI/ML Pipeline Architecture",
    tagline: "Production-Ready Data for Machine Learning",
    desc: "Design and implement data pipelines that reliably fuel AI/ML workloads. From feature stores to real-time inference, build the data backbone your models need.",
    capabilities: [
      "Feature engineering pipelines",
      "Real-time streaming data integration",
      "MLOps infrastructure design",
      "Data versioning and lineage tracking",
      "Automated data quality monitoring",
    ],
    platforms: ["Databricks MLflow", "Apache Kafka", "AWS SageMaker", "Azure ML"],
  },
  {
    icon: BarChart3,
    title: "Data Monetization Strategy",
    tagline: "Transform Data into Revenue Streams",
    desc: "Identify, design, and operationalize data products that generate new revenue streams. Move from data as a byproduct to data as a strategic asset.",
    capabilities: [
      "Data product identification and design",
      "Marketplace and API strategy",
      "Usage-based pricing models",
      "Data sharing agreements and governance",
      "Value measurement frameworks",
    ],
    platforms: ["Databricks Marketplace", "AWS Data Exchange", "Snowflake"],
  },
];

const defenseServices = [
  {
    icon: Shield,
    title: "Enterprise Data Governance",
    tagline: "Governance That Enables, Not Blocks",
    desc: "Build governance frameworks that accelerate innovation while maintaining control. Unity Catalog-native governance that scales with your organization.",
    capabilities: [
      "Unity Catalog implementation and rollout",
      "Data classification and tagging automation",
      "Access control policy design",
      "Data stewardship program creation",
      "Governance metrics and reporting",
    ],
    platforms: ["Unity Catalog", "Apache Atlas", "AWS Lake Formation"],
  },
  {
    icon: Lock,
    title: "Privacy & Compliance Architecture",
    tagline: "Compliance as a Competitive Advantage",
    desc: "Turn GDPR, CCPA, and industry-specific regulations from cost centers into trust builders. Architect privacy-by-design into your data infrastructure.",
    capabilities: [
      "Privacy-by-design architecture",
      "GDPR/CCPA compliance frameworks",
      "Data masking and anonymization",
      "Consent management integration",
      "Audit trail and reporting automation",
    ],
    platforms: ["AWS Macie", "Azure Purview", "OCI Data Safe"],
  },
  {
    icon: Layers,
    title: "Risk & Resilience Management",
    tagline: "Prevent Before You Detect",
    desc: "Build resilient data systems with proactive risk identification. High-availability architecture that keeps your data accessible when it matters most.",
    capabilities: [
      "Data risk assessment and scoring",
      "High-availability architecture design",
      "Disaster recovery planning",
      "Data breach prevention strategies",
      "Continuous risk monitoring",
    ],
    platforms: ["AWS Well-Architected", "OCI", "Azure", "Multi-cloud"],
  },
];

const cloudPlatforms = [
  {
    icon: Cloud,
    name: "AWS",
    desc: "Well-Architected reviews, cost optimization, and high-availability design across all AWS data services.",
    color: "#ff6f28",
    bgColor: "bg-orange-50",
  },
  {
    icon: Server,
    name: "Oracle Cloud (OCI)",
    desc: "Deep OCI expertise including complex multi-instance migrations, Autonomous DB, and cost/performance engineering.",
    color: "#2274df",
    bgColor: "bg-blue-50",
  },
  {
    icon: GitBranch,
    name: "Azure",
    desc: "Azure Synapse, Data Factory, and Purview integration for enterprise data platforms.",
    color: "#2274df",
    bgColor: "bg-blue-50",
  },
  {
    icon: Database,
    name: "Databricks",
    desc: "Multi-cloud Databricks deployment, Unity Catalog governance, and Lakehouse architecture.",
    color: "#ff6f28",
    bgColor: "bg-orange-50",
  },
];

function ServiceDetailCard({ service, accentColor, bgAccent }) {
  return (
    <div
      data-testid={`service-detail-${service.title.toLowerCase().replace(/[\s/&]/g, '-')}`}
      className="bg-white border border-slate-100 rounded-xl overflow-hidden shadow-[0_2px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 card-hover-beam"
    >
      <div className="p-8">
        <div className="flex items-start gap-4 mb-5">
          <div className={`w-12 h-12 rounded-xl ${bgAccent} flex items-center justify-center flex-shrink-0`}>
            <service.icon className="w-6 h-6" style={{ color: accentColor }} />
          </div>
          <div>
            <h3 className="font-['Outfit'] text-xl font-semibold text-slate-900 tracking-tight">{service.title}</h3>
            <p className="text-sm text-slate-500 mt-0.5">{service.tagline}</p>
          </div>
        </div>
        <p className="text-slate-600 leading-relaxed mb-6">{service.desc}</p>
        <div className="space-y-2.5 mb-6">
          {service.capabilities.map((cap) => (
            <div key={cap} className="flex items-start gap-2.5">
              <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: accentColor }} />
              <span className="text-sm text-slate-600">{cap}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100">
          {service.platforms.map((p) => (
            <span key={p} className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-medium">
              {p}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ServicesPage({ onOpenLeadMagnet }) {
  return (
    <div data-testid="services-page" className="pt-24 md:pt-32">
      {/* Header */}
      <section className="pb-16 md:pb-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-2xl">
            <Badge className="bg-slate-100 text-slate-700 border-0 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
              Services
            </Badge>
            <h1 className="font-['Outfit'] text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 mb-5">
              Architecture that serves your{" "}
              <span className="gradient-text">business strategy</span>
            </h1>
            <p className="text-lg md:text-xl leading-relaxed text-slate-600">
              I work at the intersection of data engineering and business strategy. 
              Every engagement is designed to balance offensive growth with defensive rigor.
            </p>
          </div>
        </div>
      </section>

      {/* Services Tabs */}
      <section className="pb-24 md:pb-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <Tabs defaultValue="offense" className="w-full">
            <TabsList data-testid="services-tabs" className="bg-slate-100 p-1 rounded-xl mb-10 w-full sm:w-auto">
              <TabsTrigger
                value="offense"
                data-testid="tab-offense"
                className="rounded-lg px-6 py-2.5 text-sm font-semibold data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-[#ff6f28]"
              >
                <Rocket className="w-4 h-4 mr-2" />
                Data Offense
              </TabsTrigger>
              <TabsTrigger
                value="defense"
                data-testid="tab-defense"
                className="rounded-lg px-6 py-2.5 text-sm font-semibold data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-[#2274df]"
              >
                <Shield className="w-4 h-4 mr-2" />
                Data Defense
              </TabsTrigger>
            </TabsList>

            <TabsContent value="offense" data-testid="tab-content-offense">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                {offenseServices.map((svc) => (
                  <ServiceDetailCard
                    key={svc.title}
                    service={svc}
                    accentColor="#ff6f28"
                    bgAccent="bg-orange-50"
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="defense" data-testid="tab-content-defense">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                {defenseServices.map((svc) => (
                  <ServiceDetailCard
                    key={svc.title}
                    service={svc}
                    accentColor="#2274df"
                    bgAccent="bg-blue-50"
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Cloud Platforms */}
      <section data-testid="platforms-section" className="py-24 md:py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-2xl mb-16">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#2274df] mb-3">Platforms</p>
            <h2 className="font-['Outfit'] text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 mb-4">
              Multi-cloud expertise
            </h2>
            <p className="text-lg leading-relaxed text-slate-600">
              Architecture and optimization across the major cloud platforms, with deep specialization in each.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cloudPlatforms.map((plat) => (
              <div
                key={plat.name}
                data-testid={`platform-${plat.name.toLowerCase().replace(/[\s()]/g, '-')}`}
                className="bg-white border border-slate-100 rounded-xl p-6 shadow-[0_2px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 card-hover-beam"
              >
                <div className={`w-10 h-10 rounded-xl ${plat.bgColor} flex items-center justify-center mb-4`}>
                  <plat.icon className="w-5 h-5" style={{ color: plat.color }} />
                </div>
                <h3 className="font-['Outfit'] font-semibold text-slate-900 mb-2">{plat.name}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{plat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <h2 className="font-['Outfit'] text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 mb-4">
            Not sure which services you need?
          </h2>
          <p className="text-lg text-slate-600 max-w-xl mx-auto mb-8">
            Start with a free Data Strategy Maturity Assessment to understand where your organization stands.
          </p>
          <button
            data-testid="services-cta-assessment"
            onClick={onOpenLeadMagnet}
            className="bg-[#ff6f28] hover:bg-[#e65a15] text-white rounded-lg px-8 py-4 font-semibold shadow-lg shadow-orange-500/20 transition-all hover:-translate-y-1 hover:shadow-orange-500/30 inline-flex items-center gap-2"
          >
            Get Free Assessment
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
}
