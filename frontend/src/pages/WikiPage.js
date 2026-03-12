import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Badge } from "../components/ui/badge";
import { Clock, ArrowRight, Search, BookOpen } from "lucide-react";
import { Input } from "../components/ui/input";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const categoryColors = {
  "Legacy Modernization": "bg-orange-100 text-orange-700",
  "Cloud Optimization": "bg-blue-100 text-blue-700",
  "Strategic Governance": "bg-green-100 text-green-700",
  "General": "bg-slate-100 text-slate-700",
};

function getCategoryColor(category) {
  return categoryColors[category] || "bg-slate-100 text-slate-700";
}

export default function WikiPage() {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles();
    fetchCategories();
  }, [activeCategory]);

  const fetchArticles = async () => {
    try {
      const params = {};
      if (activeCategory !== "All") params.category = activeCategory;
      const res = await axios.get(`${API}/wiki/articles`, { params });
      setArticles(res.data);
    } catch (err) {
      console.error("Failed to fetch articles:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${API}/wiki/categories`);
      setCategories(res.data);
    } catch (err) {
      console.error("Failed to fetch categories:", err);
    }
  };

  const filtered = searchQuery
    ? articles.filter(
        (a) =>
          a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : articles;

  return (
    <div data-testid="wiki-page" className="pt-24 md:pt-32">
      {/* Header */}
      <section className="pb-10 md:pb-14">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <Badge className="bg-slate-100 text-slate-700 border-0 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
                Knowledge Base
              </Badge>
              <h1 className="font-['Outfit'] text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 mb-5">
                Wiki &amp; <span className="gradient-text">Documentation</span>
              </h1>
              <p className="text-lg md:text-xl leading-relaxed text-slate-600">
                A living knowledge base of data strategy articles, technical guides, and architecture 
                patterns from the field.
              </p>
            </div>
            <div className="relative w-full lg:w-80 flex-shrink-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                data-testid="wiki-search"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-11 bg-slate-50 border-slate-200 focus:border-[#ff6f28] focus:ring-[#ff6f28]/20"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="pb-8">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div data-testid="wiki-category-filters" className="flex flex-wrap gap-2">
            <button
              data-testid="wiki-filter-all"
              onClick={() => setActiveCategory("All")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeCategory === "All"
                  ? "bg-[#ff6f28] text-white shadow-md shadow-orange-500/20"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                data-testid={`wiki-filter-${cat.toLowerCase().replace(/\s/g, '-')}`}
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

      {/* Articles Grid */}
      <section className="pb-24 md:pb-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-2 border-[#ff6f28] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : filtered.length === 0 ? (
            <div data-testid="wiki-empty-state" className="text-center py-20">
              <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <h3 className="font-['Outfit'] text-xl font-semibold text-slate-900 mb-2">
                {searchQuery ? "No articles found" : "No articles yet"}
              </h3>
              <p className="text-slate-500 max-w-md mx-auto">
                {searchQuery
                  ? "Try a different search term or browse all categories."
                  : "Articles will appear here as they are published. Check back soon!"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filtered.map((article) => (
                <Link
                  to={`/wiki/${article.id}`}
                  key={article.id}
                  data-testid={`wiki-article-card-${article.id}`}
                  className="bg-white border border-slate-100 rounded-xl overflow-hidden shadow-[0_2px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 group card-hover-beam"
                >
                  {article.featured_image_url && (
                    <div className="h-44 overflow-hidden">
                      <img
                        src={article.featured_image_url}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <span className={`${getCategoryColor(article.category)} px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider`}>
                        {article.category}
                      </span>
                    </div>
                    <h3 className="font-['Outfit'] text-lg md:text-xl font-semibold text-slate-900 tracking-tight mb-3 group-hover:text-[#ff6f28] transition-colors leading-snug">
                      {article.title}
                    </h3>
                    {article.excerpt && (
                      <p className="text-sm text-slate-500 leading-relaxed mb-4 line-clamp-3">
                        {article.excerpt}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {article.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="bg-slate-50 text-slate-500 px-2.5 py-0.5 rounded-full text-xs font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <div className="flex items-center gap-3 text-xs text-slate-400">
                        <span>{article.author}</span>
                        {article.read_time && (
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {article.read_time}
                          </span>
                        )}
                      </div>
                      <span className="text-[#ff6f28] text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                        Read <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
