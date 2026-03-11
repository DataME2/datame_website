import React, { useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { toast } from "sonner";
import { FileDown, CheckCircle, Loader2 } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function LeadMagnetDialog({ open, onOpenChange }) {
  const [form, setForm] = useState({ name: "", email: "", company: "", role: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      toast.error("Please fill in your name and email.");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API}/leads`, {
        ...form,
        interest: "maturity_assessment",
      });
      setSubmitted(true);
      toast.success("Assessment unlocked! Check below to download.");
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = (val) => {
    onOpenChange(val);
    if (!val) {
      setTimeout(() => {
        setSubmitted(false);
        setForm({ name: "", email: "", company: "", role: "" });
      }, 300);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        data-testid="lead-magnet-dialog"
        className="sm:max-w-lg"
      >
        <DialogHeader>
          <DialogTitle className="font-['Outfit'] text-2xl tracking-tight">
            {submitted ? "Your Assessment is Ready" : "Data Strategy Maturity Assessment"}
          </DialogTitle>
          <DialogDescription className="text-slate-500">
            {submitted
              ? "Download your personalized assessment framework below."
              : "Evaluate where your organization stands on the data maturity curve. Get a professional-grade checklist used by enterprise architects."}
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div data-testid="lead-magnet-success" className="py-6 flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <p className="text-sm text-slate-600 text-center max-w-sm">
              Thank you, {form.name}! Your Data Strategy Maturity Assessment framework is ready.
            </p>
            <button
              data-testid="lead-magnet-download-btn"
              className="bg-[#ff6f28] hover:bg-[#e65a15] text-white rounded-lg px-6 py-3 font-semibold shadow-lg shadow-orange-500/20 transition-all hover:-translate-y-0.5 flex items-center gap-2"
            >
              <FileDown className="w-4 h-4" />
              Download Assessment
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-slate-700 mb-1.5 block">Name *</label>
                <Input
                  data-testid="lead-name-input"
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="h-11 bg-slate-50 border-slate-200 focus:border-[#ff6f28] focus:ring-[#ff6f28]/20"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 mb-1.5 block">Email *</label>
                <Input
                  data-testid="lead-email-input"
                  type="email"
                  placeholder="you@company.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="h-11 bg-slate-50 border-slate-200 focus:border-[#ff6f28] focus:ring-[#ff6f28]/20"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-slate-700 mb-1.5 block">Company</label>
                <Input
                  data-testid="lead-company-input"
                  placeholder="Company name"
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  className="h-11 bg-slate-50 border-slate-200 focus:border-[#ff6f28] focus:ring-[#ff6f28]/20"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 mb-1.5 block">Role</label>
                <Input
                  data-testid="lead-role-input"
                  placeholder="Your title"
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  className="h-11 bg-slate-50 border-slate-200 focus:border-[#ff6f28] focus:ring-[#ff6f28]/20"
                />
              </div>
            </div>
            <div className="pt-2">
              <button
                data-testid="lead-submit-btn"
                type="submit"
                disabled={loading}
                className="w-full bg-[#ff6f28] hover:bg-[#e65a15] text-white rounded-lg px-6 py-3 font-semibold shadow-lg shadow-orange-500/20 transition-all hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Unlock Free Assessment"
                )}
              </button>
            </div>
            <p className="text-xs text-slate-400 text-center">
              No spam. Your data stays private. Unsubscribe anytime.
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
