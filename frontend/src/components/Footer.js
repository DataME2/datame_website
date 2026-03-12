import React from "react";
import { Link } from "react-router-dom";
import { Separator } from "../components/ui/separator";
import { Linkedin, Twitter, Mail, ArrowUpRight } from "lucide-react";

const footerLinks = {
  services: [
    { label: "Lakehouse Migration", path: "/services#offense" },
    { label: "AI/ML Pipelines", path: "/services#offense" },
    { label: "Data Governance", path: "/services#defense" },
    { label: "Cloud Optimization", path: "/services" },
  ],
  resources: [
    { label: "Case Studies", path: "/case-studies" },
    { label: "Insights", path: "/insights" },
    { label: "Maturity Assessment", path: "#" },
  ],
  platforms: [
    "AWS", "Azure", "OCI", "Databricks"
  ],
};

export default function Footer() {
  return (
    <footer data-testid="footer" className="bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-2 mb-5">
              <img
                src="https://customer-assets.emergentagent.com/job_migration-maestro-2/artifacts/l0hdnrlt_DataME_Logo.jpg"
                alt="DataMe Logo"
                className="h-10 w-auto object-contain"
              />
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Turning data infrastructure into a strategic business asset. 
              15+ years of enterprise architecture across AWS, OCI, Azure, and Databricks.
            </p>
            <div className="flex gap-3 mt-6">
              <a href="#" data-testid="footer-linkedin" className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors">
                <Linkedin className="w-4 h-4 text-slate-400" />
              </a>
              <a href="#" data-testid="footer-twitter" className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors">
                <Twitter className="w-4 h-4 text-slate-400" />
              </a>
              <a href="#" data-testid="footer-email" className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors">
                <Mail className="w-4 h-4 text-slate-400" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="md:col-span-3">
            <h4 className="font-['Outfit'] font-semibold text-sm uppercase tracking-widest text-slate-500 mb-5">Strategy</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    data-testid={`footer-${link.label.toLowerCase().replace(/[\s/]/g, '-')}`}
                    className="text-slate-400 hover:text-white text-sm transition-colors flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="md:col-span-2">
            <h4 className="font-['Outfit'] font-semibold text-sm uppercase tracking-widest text-slate-500 mb-5">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    data-testid={`footer-${link.label.toLowerCase().replace(/[\s/]/g, '-')}`}
                    className="text-slate-400 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Platforms */}
          <div className="md:col-span-3">
            <h4 className="font-['Outfit'] font-semibold text-sm uppercase tracking-widest text-slate-500 mb-5">Platforms</h4>
            <div className="flex flex-wrap gap-2">
              {footerLinks.platforms.map((p) => (
                <span
                  key={p}
                  className="bg-slate-800 text-slate-400 px-3 py-1.5 rounded-full text-xs font-medium"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>

        <Separator className="my-10 bg-slate-800" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-xs">
            &copy; {new Date().getFullYear()} DataManagementEngineer. All rights reserved.
          </p>
          <p className="text-slate-600 text-xs">
            Data Strategy as a Business Asset
          </p>
        </div>
      </div>
    </footer>
  );
}
