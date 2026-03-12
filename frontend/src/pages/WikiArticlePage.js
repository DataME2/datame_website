import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";
import { ArrowLeft, Clock, User, Calendar, Tag } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function WikiArticlePage() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchArticle();
  }, [id]);

  const fetchArticle = async () => {
    try {
      const res = await axios.get(`${API}/wiki/articles/${id}`);
      setArticle(res.data);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="pt-32 pb-24 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#ff6f28] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div data-testid="wiki-article-not-found" className="pt-32 pb-24 text-center">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h1 className="font-['Outfit'] text-3xl font-bold text-slate-900 mb-4">Article Not Found</h1>
          <p className="text-slate-500 mb-6">The article you're looking for doesn't exist or has been removed.</p>
          <Link to="/wiki" className="text-[#ff6f28] font-semibold inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to Wiki
          </Link>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(article.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div data-testid="wiki-article-page" className="pt-24 md:pt-32">
      {/* Back Link */}
      <div className="max-w-4xl mx-auto px-6 md:px-12 mb-8">
        <Link
          to="/wiki"
          data-testid="back-to-wiki"
          className="text-slate-500 hover:text-slate-900 text-sm font-medium inline-flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Wiki
        </Link>
      </div>

      {/* Article Header */}
      <section className="pb-8 md:pb-12">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <Badge className={`border-0 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-5 ${
            article.category === "Legacy Modernization" ? "bg-orange-100 text-orange-700" :
            article.category === "Cloud Optimization" ? "bg-blue-100 text-blue-700" :
            article.category === "Strategic Governance" ? "bg-green-100 text-green-700" :
            "bg-slate-100 text-slate-700"
          }`}>
            {article.category}
          </Badge>
          <h1 className="font-['Outfit'] text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 mb-6">
            {article.title}
          </h1>
          {article.excerpt && (
            <p className="text-lg md:text-xl leading-relaxed text-slate-600 mb-6">
              {article.excerpt}
            </p>
          )}
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4" /> {article.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" /> {formattedDate}
            </span>
            {article.read_time && (
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" /> {article.read_time}
              </span>
            )}
          </div>
          {article.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mt-4">
              <Tag className="w-3.5 h-3.5 text-slate-400" />
              {article.tags.map((tag) => (
                <span key={tag} className="bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full text-xs font-medium">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Featured Image */}
      {article.featured_image_url && (
        <div className="max-w-4xl mx-auto px-6 md:px-12 mb-10">
          <div className="rounded-xl overflow-hidden border border-slate-100">
            <img
              src={article.featured_image_url}
              alt={article.title}
              className="w-full h-auto max-h-96 object-cover"
            />
          </div>
        </div>
      )}

      <Separator className="max-w-4xl mx-auto" />

      {/* Article Content */}
      <section className="py-10 md:py-14">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <div
            data-testid="wiki-article-content"
            className="prose prose-slate prose-lg max-w-none
              prose-headings:font-['Outfit'] prose-headings:tracking-tight
              prose-h2:text-2xl prose-h2:font-semibold prose-h2:mt-10 prose-h2:mb-4
              prose-h3:text-xl prose-h3:font-medium prose-h3:mt-8 prose-h3:mb-3
              prose-p:text-slate-600 prose-p:leading-relaxed
              prose-a:text-[#2274df] prose-a:no-underline hover:prose-a:underline
              prose-strong:text-slate-900
              prose-code:bg-slate-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-normal
              prose-pre:bg-slate-900 prose-pre:text-slate-100 prose-pre:rounded-xl
              prose-blockquote:border-l-[#ff6f28] prose-blockquote:bg-orange-50/50 prose-blockquote:rounded-r-lg prose-blockquote:py-1
              prose-img:rounded-xl prose-img:border prose-img:border-slate-100
              prose-li:text-slate-600
              prose-table:border prose-table:border-slate-200 prose-th:bg-slate-50"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>
      </section>

      {/* Back to Wiki */}
      <section className="pb-24 md:pb-32">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <Separator className="mb-8" />
          <Link
            to="/wiki"
            data-testid="bottom-back-to-wiki"
            className="text-[#ff6f28] font-semibold inline-flex items-center gap-2 hover:gap-3 transition-all"
          >
            <ArrowLeft className="w-4 h-4" /> Back to All Articles
          </Link>
        </div>
      </section>
    </div>
  );
}
