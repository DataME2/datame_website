import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Services", path: "/services" },
  { label: "Case Studies", path: "/case-studies" },
  { label: "Insights", path: "/insights" },
];

const serviceLinks = [
  { label: "Data Offense", path: "/services#offense" },
  { label: "Data Defense", path: "/services#defense" },
];

export default function Navbar({ onOpenLeadMagnet }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      data-testid="navbar"
      className="fixed top-0 left-0 right-0 z-50 nav-blur bg-white/90 border-b border-slate-100"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" data-testid="nav-logo" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg brand-gradient-bg flex items-center justify-center">
              <span className="text-white font-bold text-sm font-['Outfit']">D</span>
            </div>
            <span className="font-['Outfit'] font-semibold text-lg text-slate-900 tracking-tight">
              Data<span className="text-[#ff6f28]">Me</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) =>
              link.label === "Services" ? (
                <DropdownMenu key={link.label}>
                  <DropdownMenuTrigger
                    data-testid="nav-services-dropdown"
                    className={`flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors outline-none ${
                      isActive("/services")
                        ? "text-[#ff6f28] bg-orange-50"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                    }`}
                  >
                    Services <ChevronDown className="w-3.5 h-3.5" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-48">
                    <DropdownMenuItem asChild>
                      <Link to="/services" data-testid="nav-services-all" className="cursor-pointer">
                        All Services
                      </Link>
                    </DropdownMenuItem>
                    {serviceLinks.map((sl) => (
                      <DropdownMenuItem key={sl.label} asChild>
                        <Link to={sl.path} data-testid={`nav-${sl.label.toLowerCase().replace(' ', '-')}`} className="cursor-pointer">
                          {sl.label}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  key={link.label}
                  to={link.path}
                  data-testid={`nav-${link.label.toLowerCase()}`}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive(link.path)
                      ? "text-[#ff6f28] bg-orange-50"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button
              data-testid="nav-cta-assessment"
              onClick={onOpenLeadMagnet}
              className="bg-[#ff6f28] hover:bg-[#e65a15] text-white rounded-lg px-5 py-2.5 text-sm font-semibold shadow-lg shadow-orange-500/20 transition-all hover:-translate-y-0.5 hover:shadow-orange-500/30"
            >
              Free Assessment
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            data-testid="nav-mobile-toggle"
            className="md:hidden p-2 rounded-lg hover:bg-slate-100"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div data-testid="nav-mobile-menu" className="md:hidden pb-6 pt-2 border-t border-slate-100 animate-fade-in">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.path}
                  data-testid={`nav-mobile-${link.label.toLowerCase()}`}
                  className={`px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    isActive(link.path)
                      ? "text-[#ff6f28] bg-orange-50"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <button
                data-testid="nav-mobile-cta"
                onClick={() => {
                  setMobileOpen(false);
                  onOpenLeadMagnet();
                }}
                className="mt-2 bg-[#ff6f28] text-white rounded-lg px-5 py-3 text-sm font-semibold"
              >
                Free Assessment
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
