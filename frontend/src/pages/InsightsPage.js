import React, { useState } from "react";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";
import { Clock, ArrowRight, Database, Cloud, Shield } from "lucide-react";

const pillars = [
  { id: "all", label: "All Insights", icon: null },
  { id: "modernization", label: "Legacy Modernization", icon: Database },
  { id: "cloud", label: "Cloud Optimization", icon: Cloud },
  { id: "governance", label: "Strategic Governance", icon: Shield },
];

const articles = [
  {
    id: 1,
    pillar: "modernization",
    badge: "Legacy Modernization",
    badgeColor: "bg-orange-100 text-orange-700",
    title: "The Low-Risk Path from Oracle to Databricks Lakehouse",
    excerpt: "Enterprise migration doesn't have to be all-or-nothing. Learn the phased approach that reduces risk while delivering early value from your Lakehouse investment.",
    readTime: "8 min read",
    date: "Dec 2025",
  },
  {
    id: 2,
    pillar: "modernization",
    badge: "Legacy Modernization",
    badgeColor: "bg-orange-100 text-orange-700",
    title: "SQL Server to Unity Catalog: A Migration Playbook",
    excerpt: "Step-by-step guide for migrating SQL Server workloads to Databricks Unity Catalog, including common pitfalls and how to avoid them.",
    readTime: "12 min read",
    date: "Nov 2025",
  },
  {
    id: 3,
    pillar: "cloud",
    badge: "Cloud Optimization",
    badgeColor: "bg-blue-100 text-blue-700",
    title: "AWS Well-Architected: Beyond the Checklist",
    excerpt: "How to use the AWS Well-Architected Framework as a living practice, not just a one-time review. Real patterns from enterprise implementations.",
    readTime: "10 min read",
    date: "Dec 2025",
  },
  {
    id: 4,
    pillar: "cloud",
    badge: "Cloud Optimization",
    badgeColor: "bg-blue-100 text-blue-700",
    title: "OCI Cost Engineering: Performance Without the Premium",
    excerpt: "Oracle Cloud Infrastructure offers unique cost advantages when architected correctly. Learn the optimization patterns that delivered 40% savings.",
    readTime: "7 min read",
    date: "Nov 2025",
  },
  {
    id: 5,
    pillar: "governance",
    badge: "Strategic Governance",
    badgeColor: "bg-green-100 text-green-700",
    title: "Making Compliance a Business Enabler",
    excerpt: "The organizations winning with data aren't fighting compliance — they're using it as a competitive moat. Here's the architectural pattern.",
    readTime: "9 min read",
    date: "Dec 2025",
  },
  {
    id: 6,
    pillar: "governance",
    badge: "Strategic Governance",
    badgeColor: "bg-green-100 text-green-700",
    title: "Unity Catalog Governance Patterns for the Enterprise",
    excerpt: "Practical governance patterns using Databricks Unity Catalog that scale from team-level to organization-wide without creating bottlenecks.",
    readTime: "11 min read",
    date: "Oct 2025",
  },
  {
    id: 7,
    pillar: "modernization",
    badge: "Legacy Modernization",
    badgeColor: "bg-orange-100 text-orange-700",
    title: "Delta Lake Performance Tuning: Lessons from 3M+ User Environments",
    excerpt: "Performance optimization techniques learned from migrating and tuning Delta Lake environments at enterprise scale.",
    readTime: "14 min read",
    date: "Oct 2025",
  },
  {
    id: 8,
    pillar: "cloud",
    badge: "Cloud Optimization",
    badgeColor: "bg-blue-100 text-blue-700",
    title: "Multi-Cloud Data Strategy: When and How",
    excerpt: "Not every organization needs multi-cloud, but when you do, the architecture decisions matter. A framework for making the right call.",
    readTime: "6 min read",
    date: "Sep 2025",
  },
];

function ArticleCard({ article }) {
  return (
    <div
      data-testid={`insight-card-${article.id}`}
      className="bg-white border border-slate-100 rounded-xl overflow-hidden shadow-[0_2px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 group card-hover-beam cursor-pointer"
    >
      <div className="p-6 md:p-8">
        <div className="flex items-center gap-3 mb-4">
          <span className={`${article.badgeColor} px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider`}>
            {article.badge}
          </span>
        </div>
        <h3 className="font-['Outfit'] text-lg md:text-xl font-semibold text-slate-900 tracking-tight mb-3 group-hover:text-[#ff6f28] transition-colors leading-snug">
          {article.title}
        </h3>
        <p className="text-sm text-slate-500 leading-relaxed mb-4">
          {article.excerpt}
        </p>
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span>{article.date}</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" /> {article.readTime}
            </span>
          </div>
          <span className="text-[#ff6f28] text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
            Read <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </div>
  );
}

export default function InsightsPage() {
  const [activeTab, setActiveTab] = useState("all");

  const filtered = activeTab === "all" ? articles : articles.filter((a) => a.pillar === activeTab);

  return (
    <div data-testid="insights-page" className="pt-24 md:pt-32">
      {/* Header */}
      <section className="pb-12 md:pb-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-2xl">
            <Badge className="bg-slate-100 text-slate-700 border-0 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
              Insights
            </Badge>
            <h1 className="font-['Outfit'] text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 mb-5">
              Data strategy <span className="gradient-text">thinking</span>
            </h1>
            <p className="text-lg md:text-xl leading-relaxed text-slate-600">
              Practical perspectives on legacy modernization, cloud optimization, and strategic governance 
              from 15+ years of enterprise architecture.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-24 md:pb-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList data-testid="insights-tabs" className="bg-slate-100 p-1 rounded-xl mb-10 flex flex-wrap w-full sm:w-auto">
              {pillars.map((p) => (
                <TabsTrigger
                  key={p.id}
                  value={p.id}
                  data-testid={`insight-tab-${p.id}`}
                  className="rounded-lg px-4 py-2 text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  {p.icon && <p.icon className="w-3.5 h-3.5 mr-1.5" />}
                  {p.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value={activeTab}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {filtered.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
              {filtered.length === 0 && (
                <p className="text-center text-slate-400 py-16">No insights available in this category yet.</p>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
