import React, { useState } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LeadMagnetDialog from "@/components/LeadMagnetDialog";
import HomePage from "@/pages/HomePage";
import ServicesPage from "@/pages/ServicesPage";
import InsightsPage from "@/pages/InsightsPage";
import CaseStudiesPage from "@/pages/CaseStudiesPage";
import CaseStudyDetailPage from "@/pages/CaseStudyDetailPage";
import WikiPage from "@/pages/WikiPage";
import WikiArticlePage from "@/pages/WikiArticlePage";
import AdminWikiPage from "@/pages/AdminWikiPage";

function App() {
  const [leadMagnetOpen, setLeadMagnetOpen] = useState(false);

  const openLeadMagnet = () => setLeadMagnetOpen(true);

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-white">
        <Navbar onOpenLeadMagnet={openLeadMagnet} />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage onOpenLeadMagnet={openLeadMagnet} />} />
            <Route path="/services" element={<ServicesPage onOpenLeadMagnet={openLeadMagnet} />} />
            <Route path="/insights" element={<InsightsPage />} />
            <Route path="/case-studies" element={<CaseStudiesPage />} />
            <Route path="/case-studies/:slug" element={<CaseStudyDetailPage />} />
            <Route path="/wiki" element={<WikiPage />} />
            <Route path="/wiki/:id" element={<WikiArticlePage />} />
            <Route path="/admin/wiki" element={<AdminWikiPage />} />
          </Routes>
        </main>
        <Footer />
        <LeadMagnetDialog open={leadMagnetOpen} onOpenChange={setLeadMagnetOpen} />
        <Toaster position="top-right" />
      </div>
    </BrowserRouter>
  );
}

export default App;
