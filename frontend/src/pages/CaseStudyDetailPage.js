import React from "react";
import { useParams, Link } from "react-router-dom";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";
import {
  ArrowLeft,
  CheckCircle,
  Target,
  Lightbulb,
  BarChart3,
  ChevronRight,
} from "lucide-react";

const caseStudyData = {
  "databricks-unity-catalog-poc": {
    badge: "Lakehouse",
    title: "Databricks Unity Catalog POC",
    client: "Fortune 500 Financial Services",
    metric: "70% Performance Improvement",
    duration: "12 Weeks",
    platforms: ["Databricks", "Unity Catalog", "Delta Lake", "AWS", "Azure"],
    challenge:
      "The client operated multiple Databricks workspaces across AWS and Azure with no unified governance. Data teams were duplicating efforts, access controls were inconsistent, and compliance audits consumed weeks of engineering time. They needed a proof of concept to validate Unity Catalog as their enterprise governance layer before committing to a full migration.",
    approach: [
      "Conducted a comprehensive audit of existing Databricks workspaces, data assets, and access patterns across both cloud environments.",
      "Designed a Unity Catalog architecture that unified metadata management while respecting each business unit's autonomy.",
      "Implemented a phased POC starting with the highest-value, lowest-risk data domain to build confidence.",
      "Created automated data classification and tagging workflows to reduce manual governance overhead.",
      "Built performance benchmarks against the existing architecture to quantify improvements.",
    ],
    results: [
      { metric: "70%", label: "Performance improvement in cross-workspace queries" },
      { metric: "85%", label: "Reduction in compliance audit time" },
      { metric: "3x", label: "Faster data discovery for analyst teams" },
      { metric: "Zero", label: "Downtime during POC deployment" },
    ],
    techStack: ["Databricks Unity Catalog", "Delta Lake", "Apache Spark", "AWS S3", "Azure ADLS", "Terraform"],
    testimonial:
      "The POC exceeded our expectations. We went from weeks of manual governance work to automated compliance, and the performance gains made the business case for full migration undeniable.",
    keyTakeaways: [
      "Starting with a focused POC on a single data domain builds organizational confidence for larger migration.",
      "Automated data classification reduces governance overhead by 85% compared to manual approaches.",
      "Unity Catalog's cross-cloud capabilities eliminate the need for separate governance tools per cloud.",
    ],
  },
  "oci-18-instance-migration": {
    badge: "Cloud Migration",
    title: "18-Instance OCI Migration",
    client: "Enterprise Healthcare Platform",
    metric: "3M+ Users Supported",
    duration: "24 Weeks",
    platforms: ["OCI", "Oracle Database", "High Availability", "Terraform"],
    challenge:
      "The healthcare platform served 3M+ users across 18 distinct application instances running on aging on-premises infrastructure. Frequent outages were impacting patient care coordination. The migration to OCI needed to happen with zero downtime and full HIPAA compliance maintained throughout.",
    approach: [
      "Mapped all 18 instances, their interdependencies, and data flows to create a comprehensive migration blueprint.",
      "Designed a wave-based migration strategy, grouping instances by dependency clusters to minimize risk.",
      "Implemented OCI Data Guard for real-time replication during the transition period.",
      "Created automated rollback procedures for each migration wave to ensure safety.",
      "Established comprehensive monitoring and alerting throughout the migration process.",
    ],
    results: [
      { metric: "3M+", label: "Users supported without interruption" },
      { metric: "18", label: "Instances migrated successfully" },
      { metric: "Zero", label: "Downtime during migration" },
      { metric: "99.99%", label: "Uptime SLA achieved post-migration" },
    ],
    techStack: ["OCI", "Oracle Database 19c", "Data Guard", "Terraform", "OCI Load Balancer", "OCI WAF"],
    testimonial:
      "We were told a zero-downtime migration of this complexity was impossible. The phased approach and meticulous planning proved otherwise. Our users never noticed the transition.",
    keyTakeaways: [
      "Wave-based migration with dependency mapping is critical for complex multi-instance environments.",
      "Automated rollback procedures provide the safety net needed for healthcare-grade reliability.",
      "Real-time replication during transition eliminates the traditional cutover window risk.",
    ],
  },
  "aws-well-architected-review": {
    badge: "Optimization",
    title: "AWS Well-Architected Review & Remediation",
    client: "SaaS Analytics Company",
    metric: "40% Cost Reduction",
    duration: "8 Weeks",
    platforms: ["AWS", "Well-Architected Framework", "Cost Explorer"],
    challenge:
      "The SaaS company had grown rapidly, and their AWS infrastructure had scaled reactively rather than strategically. Monthly cloud spend was increasing 15% quarter-over-quarter without proportional user growth. Security posture had gaps, and disaster recovery was untested.",
    approach: [
      "Conducted a full AWS Well-Architected review across all five pillars with the engineering leadership team.",
      "Identified 47 improvement areas ranked by business impact and implementation complexity.",
      "Created a prioritized 8-week remediation plan focusing on quick wins and critical security gaps.",
      "Implemented Reserved Instance and Savings Plans optimization based on usage patterns.",
      "Established ongoing governance processes to prevent infrastructure drift.",
    ],
    results: [
      { metric: "40%", label: "Reduction in monthly AWS spend" },
      { metric: "47", label: "Improvement areas identified and addressed" },
      { metric: "98%", label: "Security score improvement" },
      { metric: "< 1hr", label: "Disaster recovery time objective achieved" },
    ],
    techStack: ["AWS", "Well-Architected Tool", "Cost Explorer", "CloudWatch", "GuardDuty", "Terraform"],
    testimonial:
      "The review paid for itself within the first month through cost savings alone. The security improvements and DR capabilities gave our board the confidence to accelerate our growth plans.",
    keyTakeaways: [
      "Reactive infrastructure scaling creates compounding cost and security debt.",
      "Reserved Instance optimization alone often delivers 25-30% cost reduction for stable workloads.",
      "Well-Architected reviews should be recurring, not one-time events.",
    ],
  },
  "legacy-oracle-modernization": {
    badge: "Lakehouse",
    title: "Legacy Oracle to Lakehouse Transformation",
    client: "Retail Enterprise",
    metric: "60% Faster Queries",
    duration: "16 Weeks",
    platforms: ["Oracle", "Databricks", "Delta Lake", "AWS"],
    challenge:
      "The retail enterprise had 200+ stored procedures in Oracle that formed the backbone of their reporting and analytics. Query performance was degrading as data volumes grew, and licensing costs were increasing annually. They needed to modernize to a Lakehouse architecture without disrupting business operations.",
    approach: [
      "Cataloged and analyzed all 200+ stored procedures to understand dependencies and business logic.",
      "Categorized procedures by complexity and developed conversion strategies for each category.",
      "Built automated testing frameworks to validate output parity between Oracle and Databricks.",
      "Executed a phased migration with parallel running to ensure data consistency.",
      "Optimized Delta Lake table layouts based on actual query patterns.",
    ],
    results: [
      { metric: "60%", label: "Faster average query performance" },
      { metric: "200+", label: "Stored procedures successfully converted" },
      { metric: "100%", label: "Data quality validation passed" },
      { metric: "50%", label: "Reduction in annual licensing costs" },
    ],
    techStack: ["Oracle 19c", "Databricks", "Delta Lake", "Apache Spark", "AWS S3", "dbt"],
    testimonial:
      "The phased approach with parallel running gave us confidence at every step. Query performance improvements exceeded our expectations, and the licensing savings were a welcome bonus.",
    keyTakeaways: [
      "Automated testing frameworks are essential for validating stored procedure conversions at scale.",
      "Delta Lake table optimization based on actual query patterns delivers better performance than default configurations.",
      "Parallel running periods build stakeholder confidence and catch edge cases before cutover.",
    ],
  },
  "data-governance-framework": {
    badge: "Governance",
    title: "Enterprise Data Governance Framework",
    client: "Banking Institution",
    metric: "100% Compliance Achieved",
    duration: "20 Weeks",
    platforms: ["Unity Catalog", "Databricks", "Azure"],
    challenge:
      "The banking institution faced increasing regulatory scrutiny and needed a comprehensive data governance framework. Existing governance was manual, inconsistent, and created bottlenecks that slowed data team productivity. They needed governance that enabled innovation while ensuring compliance.",
    approach: [
      "Assessed current governance maturity across all business units using a structured framework.",
      "Designed a Unity Catalog-based governance architecture with automated policy enforcement.",
      "Implemented role-based access control aligned with organizational structure and regulatory requirements.",
      "Created a data stewardship program with clear responsibilities and escalation paths.",
      "Built automated compliance reporting dashboards for regulatory submissions.",
    ],
    results: [
      { metric: "100%", label: "Regulatory compliance achieved" },
      { metric: "35%", label: "Improvement in data team velocity" },
      { metric: "90%", label: "Reduction in access request processing time" },
      { metric: "Zero", label: "Compliance findings in next audit" },
    ],
    techStack: ["Databricks Unity Catalog", "Azure Purview", "Terraform", "Power BI", "Azure AD"],
    testimonial:
      "For the first time, our governance framework actually accelerates our data teams instead of slowing them down. The automated compliance reporting alone saved us hundreds of hours per quarter.",
    keyTakeaways: [
      "Governance frameworks must be designed to enable, not restrict, to gain organizational adoption.",
      "Automated policy enforcement eliminates the consistency gaps inherent in manual governance.",
      "Role-based access control aligned with org structure reduces access request overhead by 90%.",
    ],
  },
  "multi-cloud-data-platform": {
    badge: "Cloud Migration",
    title: "Multi-Cloud Data Platform Build",
    client: "Global Manufacturing",
    metric: "99.99% Uptime",
    duration: "28 Weeks",
    platforms: ["AWS", "OCI", "Multi-cloud", "Terraform"],
    challenge:
      "The global manufacturer needed a data platform spanning AWS and OCI to support operations across different regions with varying regulatory requirements. Single-cloud solutions couldn't meet their data residency and redundancy requirements.",
    approach: [
      "Designed a multi-cloud architecture with clear data residency boundaries per region.",
      "Implemented cross-cloud data replication with eventual consistency guarantees.",
      "Built unified monitoring and alerting across both cloud providers.",
      "Created automated failover mechanisms for business-critical data services.",
      "Established cloud-agnostic CI/CD pipelines using Terraform and GitHub Actions.",
    ],
    results: [
      { metric: "99.99%", label: "Uptime SLA achieved and maintained" },
      { metric: "2", label: "Cloud providers unified under single platform" },
      { metric: "< 30s", label: "Cross-cloud failover time" },
      { metric: "100%", label: "Data residency compliance across all regions" },
    ],
    techStack: ["AWS", "OCI", "Terraform", "Kafka", "GitHub Actions", "Datadog"],
    testimonial:
      "The multi-cloud platform gave us the flexibility to meet regional regulatory requirements without compromising on reliability. The unified monitoring makes it feel like a single platform.",
    keyTakeaways: [
      "Multi-cloud architectures require clear data residency boundaries defined at the design phase.",
      "Cloud-agnostic tooling (Terraform, Kafka) reduces operational complexity across providers.",
      "Unified monitoring across clouds is essential — separate dashboards per cloud create blind spots.",
    ],
  },
};

export default function CaseStudyDetailPage() {
  const { slug } = useParams();
  const study = caseStudyData[slug];

  if (!study) {
    return (
      <div data-testid="case-study-not-found" className="pt-32 pb-24 text-center">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h1 className="font-['Outfit'] text-3xl font-bold text-slate-900 mb-4">Case Study Not Found</h1>
          <p className="text-slate-500 mb-6">The case study you're looking for doesn't exist.</p>
          <Link
            to="/case-studies"
            className="text-[#ff6f28] font-semibold inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Case Studies
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div data-testid="case-study-detail-page" className="pt-24 md:pt-32">
      {/* Back Link */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-8">
        <Link
          to="/case-studies"
          data-testid="back-to-case-studies"
          className="text-slate-500 hover:text-slate-900 text-sm font-medium inline-flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Case Studies
        </Link>
      </div>

      {/* Header */}
      <section className="pb-12 md:pb-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-5">
              <Badge className="bg-slate-100 text-slate-700 border-0 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                {study.badge}
              </Badge>
              <span className="text-sm text-slate-400">{study.client}</span>
            </div>
            <h1 className="font-['Outfit'] text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 mb-5">
              {study.title}
            </h1>
            <p className="stat-number text-4xl md:text-5xl gradient-text mb-6">{study.metric}</p>
            <div className="flex flex-wrap gap-4 text-sm text-slate-500">
              <span>Duration: <strong className="text-slate-700">{study.duration}</strong></span>
              <span className="text-slate-300">|</span>
              <div className="flex flex-wrap gap-2">
                {study.platforms.map((p) => (
                  <span key={p} className="bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full text-xs font-medium">
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Separator className="max-w-7xl mx-auto" />

      {/* Content */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Main Content */}
            <div className="lg:col-span-8">
              {/* Challenge */}
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                    <Target className="w-5 h-5 text-red-500" />
                  </div>
                  <h2 className="font-['Outfit'] text-2xl font-semibold text-slate-900 tracking-tight">The Challenge</h2>
                </div>
                <p className="text-slate-600 leading-relaxed">{study.challenge}</p>
              </div>

              {/* Approach */}
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                    <Lightbulb className="w-5 h-5 text-[#2274df]" />
                  </div>
                  <h2 className="font-['Outfit'] text-2xl font-semibold text-slate-900 tracking-tight">The Approach</h2>
                </div>
                <div className="space-y-3">
                  {study.approach.map((step, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500 flex-shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <p className="text-slate-600 leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Results */}
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-[#ff6f28]" />
                  </div>
                  <h2 className="font-['Outfit'] text-2xl font-semibold text-slate-900 tracking-tight">The Results</h2>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {study.results.map((r, i) => (
                    <div
                      key={i}
                      className="bg-slate-50 rounded-xl p-5 border border-slate-100"
                    >
                      <p className="stat-number text-2xl md:text-3xl gradient-text mb-1">{r.metric}</p>
                      <p className="text-sm text-slate-500">{r.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Testimonial */}
              {study.testimonial && (
                <div className="mb-12">
                  <div className="relative bg-slate-50 rounded-xl p-8 border border-slate-100">
                    <div className="absolute top-4 left-6 text-5xl text-slate-200 font-serif leading-none">&ldquo;</div>
                    <blockquote className="relative z-10 text-slate-700 leading-relaxed italic pl-4">
                      {study.testimonial}
                    </blockquote>
                    <p className="mt-4 pl-4 text-sm font-semibold text-slate-500">&mdash; {study.client}</p>
                  </div>
                </div>
              )}

              {/* Key Takeaways */}
              <div>
                <h2 className="font-['Outfit'] text-2xl font-semibold text-slate-900 tracking-tight mb-4">Key Takeaways</h2>
                <div className="space-y-3">
                  {study.keyTakeaways.map((takeaway, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <p className="text-slate-600 leading-relaxed">{takeaway}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4">
              <div className="sticky top-28 space-y-6">
                {/* Tech Stack */}
                <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-[0_2px_20px_rgba(0,0,0,0.04)]">
                  <h3 className="font-['Outfit'] font-semibold text-slate-900 mb-4">Technology Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {study.techStack.map((tech) => (
                      <span key={tech} className="bg-slate-100 text-slate-600 px-3 py-1.5 rounded-full text-xs font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-[0_2px_20px_rgba(0,0,0,0.04)]">
                  <h3 className="font-['Outfit'] font-semibold text-slate-900 mb-2">Have a similar challenge?</h3>
                  <p className="text-sm text-slate-500 mb-4">Let's discuss how this approach can be adapted for your organization.</p>
                  <Link
                    to="/services"
                    data-testid="case-study-services-cta"
                    className="bg-[#ff6f28] hover:bg-[#e65a15] text-white rounded-lg px-5 py-2.5 text-sm font-semibold shadow-lg shadow-orange-500/20 transition-all hover:-translate-y-0.5 inline-flex items-center gap-2"
                  >
                    Explore Strategy <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>

                {/* More Case Studies */}
                <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-[0_2px_20px_rgba(0,0,0,0.04)]">
                  <h3 className="font-['Outfit'] font-semibold text-slate-900 mb-4">More Case Studies</h3>
                  <div className="space-y-3">
                    {Object.entries(caseStudyData)
                      .filter(([s]) => s !== slug)
                      .slice(0, 3)
                      .map(([s, data]) => (
                        <Link
                          key={s}
                          to={`/case-studies/${s}`}
                          data-testid={`related-case-${s}`}
                          className="block text-sm text-slate-600 hover:text-[#ff6f28] transition-colors"
                        >
                          {data.title}
                        </Link>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
