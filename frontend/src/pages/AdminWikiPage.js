import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";
import { toast } from "sonner";
import {
  Plus,
  Pencil,
  Trash2,
  Save,
  X,
  Eye,
  EyeOff,
  ArrowLeft,
  Loader2,
  FileText,
  Lock,
  LogOut,
} from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const defaultCategories = [
  "Legacy Modernization",
  "Cloud Optimization",
  "Strategic Governance",
  "General",
];

const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["blockquote", "code-block"],
    ["link", "image"],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    ["clean"],
  ],
};

const quillFormats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "list",
  "blockquote",
  "code-block",
  "link",
  "image",
  "color",
  "background",
  "align",
];

const emptyForm = {
  title: "",
  content: "",
  excerpt: "",
  category: "General",
  tags: "",
  author: "DataMe",
  read_time: "",
  featured_image_url: "",
  published: true,
};

export default function AdminWikiPage() {
  const [authenticated, setAuthenticated] = useState(() => sessionStorage.getItem("admin_auth") === "true");
  const [password, setPassword] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState("list"); // list | create | edit
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ ...emptyForm });
  const [saving, setSaving] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!password.trim()) return;
    setAuthLoading(true);
    try {
      await axios.post(`${API}/admin/verify`, { password });
      sessionStorage.setItem("admin_auth", "true");
      setAuthenticated(true);
      toast.success("Access granted.");
    } catch (err) {
      toast.error("Invalid password.");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_auth");
    setAuthenticated(false);
    setPassword("");
  };

  const fetchArticles = useCallback(async () => {
    try {
      const res = await axios.get(`${API}/wiki/articles/all`);
      setArticles(res.data);
    } catch (err) {
      toast.error("Failed to load articles");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (authenticated) fetchArticles();
  }, [fetchArticles, authenticated]);

  const handleCreate = () => {
    setForm({ ...emptyForm });
    setEditingId(null);
    setMode("create");
  };

  const handleEdit = (article) => {
    setForm({
      title: article.title,
      content: article.content,
      excerpt: article.excerpt || "",
      category: article.category,
      tags: article.tags.join(", "),
      author: article.author,
      read_time: article.read_time || "",
      featured_image_url: article.featured_image_url || "",
      published: article.published,
    });
    setEditingId(article.id);
    setMode("edit");
  };

  const handleCancel = () => {
    setMode("list");
    setEditingId(null);
    setForm({ ...emptyForm });
  };

  const handleSave = async () => {
    if (!form.title.trim() || !form.content.trim()) {
      toast.error("Title and content are required.");
      return;
    }
    setSaving(true);
    const payload = {
      ...form,
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };

    try {
      if (mode === "create") {
        await axios.post(`${API}/wiki/articles`, payload);
        toast.success("Article created successfully!");
      } else {
        await axios.put(`${API}/wiki/articles/${editingId}`, payload);
        toast.success("Article updated successfully!");
      }
      setMode("list");
      setEditingId(null);
      setForm({ ...emptyForm });
      fetchArticles();
    } catch (err) {
      toast.error("Failed to save article. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this article?")) return;
    try {
      await axios.delete(`${API}/wiki/articles/${id}`);
      toast.success("Article deleted.");
      fetchArticles();
    } catch (err) {
      toast.error("Failed to delete article.");
    }
  };

  const handleTogglePublish = async (article) => {
    try {
      await axios.put(`${API}/wiki/articles/${article.id}`, {
        published: !article.published,
      });
      toast.success(article.published ? "Article unpublished." : "Article published!");
      fetchArticles();
    } catch (err) {
      toast.error("Failed to update article.");
    }
  };

  if (!authenticated) {
    return (
      <div data-testid="admin-login-gate" className="pt-32 pb-24 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-sm mx-auto px-6">
          <div className="bg-white border border-slate-100 rounded-xl p-8 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
            <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center mx-auto mb-5">
              <Lock className="w-6 h-6 text-[#ff6f28]" />
            </div>
            <h2 className="font-['Outfit'] text-xl font-semibold text-slate-900 text-center tracking-tight mb-1">Admin Access</h2>
            <p className="text-sm text-slate-500 text-center mb-6">Enter the admin password to continue.</p>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                data-testid="admin-password-input"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11 bg-slate-50 border-slate-200 focus:border-[#ff6f28] focus:ring-[#ff6f28]/20"
                autoFocus
              />
              <button
                data-testid="admin-login-btn"
                type="submit"
                disabled={authLoading}
                className="w-full bg-[#ff6f28] hover:bg-[#e65a15] text-white rounded-lg px-5 py-2.5 text-sm font-semibold shadow-lg shadow-orange-500/20 transition-all hover:-translate-y-0.5 disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {authLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                {authLoading ? "Verifying..." : "Unlock"}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  if (mode === "create" || mode === "edit") {
    return (
      <div data-testid="admin-wiki-editor" className="pt-24 md:pt-32 pb-24">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          {/* Editor Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <button
                data-testid="editor-back-btn"
                onClick={handleCancel}
                className="w-10 h-10 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
              >
                <ArrowLeft className="w-4 h-4 text-slate-600" />
              </button>
              <h1 className="font-['Outfit'] text-2xl font-semibold text-slate-900 tracking-tight">
                {mode === "create" ? "New Article" : "Edit Article"}
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <button
                data-testid="editor-cancel-btn"
                onClick={handleCancel}
                className="px-4 py-2.5 rounded-lg border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition-colors flex items-center gap-2"
              >
                <X className="w-4 h-4" /> Cancel
              </button>
              <button
                data-testid="editor-save-btn"
                onClick={handleSave}
                disabled={saving}
                className="bg-[#ff6f28] hover:bg-[#e65a15] text-white rounded-lg px-5 py-2.5 text-sm font-semibold shadow-lg shadow-orange-500/20 transition-all hover:-translate-y-0.5 disabled:opacity-60 flex items-center gap-2"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                {saving ? "Saving..." : "Save Article"}
              </button>
            </div>
          </div>

          {/* Form */}
          <div className="space-y-6">
            {/* Title */}
            <div>
              <label className="text-sm font-medium text-slate-700 mb-1.5 block">Title *</label>
              <Input
                data-testid="editor-title"
                placeholder="Article title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="h-12 text-lg bg-slate-50 border-slate-200 focus:border-[#ff6f28] focus:ring-[#ff6f28]/20 font-['Outfit'] font-medium"
              />
            </div>

            {/* Excerpt */}
            <div>
              <label className="text-sm font-medium text-slate-700 mb-1.5 block">Excerpt</label>
              <textarea
                data-testid="editor-excerpt"
                placeholder="Brief summary of the article (shown in card previews)"
                value={form.excerpt}
                onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                rows={2}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm focus:border-[#ff6f28] focus:ring-1 focus:ring-[#ff6f28]/20 focus:outline-none resize-none"
              />
            </div>

            {/* Row: Category, Author, Read Time */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-slate-700 mb-1.5 block">Category</label>
                <select
                  data-testid="editor-category"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full h-11 rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm focus:border-[#ff6f28] focus:ring-1 focus:ring-[#ff6f28]/20 focus:outline-none"
                >
                  {defaultCategories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 mb-1.5 block">Author</label>
                <Input
                  data-testid="editor-author"
                  placeholder="Author name"
                  value={form.author}
                  onChange={(e) => setForm({ ...form, author: e.target.value })}
                  className="h-11 bg-slate-50 border-slate-200 focus:border-[#ff6f28] focus:ring-[#ff6f28]/20"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 mb-1.5 block">Read Time</label>
                <Input
                  data-testid="editor-read-time"
                  placeholder="e.g., 8 min read"
                  value={form.read_time}
                  onChange={(e) => setForm({ ...form, read_time: e.target.value })}
                  className="h-11 bg-slate-50 border-slate-200 focus:border-[#ff6f28] focus:ring-[#ff6f28]/20"
                />
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="text-sm font-medium text-slate-700 mb-1.5 block">Tags (comma-separated)</label>
              <Input
                data-testid="editor-tags"
                placeholder="e.g., Databricks, Migration, AWS"
                value={form.tags}
                onChange={(e) => setForm({ ...form, tags: e.target.value })}
                className="h-11 bg-slate-50 border-slate-200 focus:border-[#ff6f28] focus:ring-[#ff6f28]/20"
              />
            </div>

            {/* Featured Image URL */}
            <div>
              <label className="text-sm font-medium text-slate-700 mb-1.5 block">Featured Image URL</label>
              <Input
                data-testid="editor-image-url"
                placeholder="https://images.unsplash.com/..."
                value={form.featured_image_url}
                onChange={(e) => setForm({ ...form, featured_image_url: e.target.value })}
                className="h-11 bg-slate-50 border-slate-200 focus:border-[#ff6f28] focus:ring-[#ff6f28]/20"
              />
              {form.featured_image_url && (
                <div className="mt-2 rounded-lg overflow-hidden border border-slate-100 h-32">
                  <img src={form.featured_image_url} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>

            {/* Published Toggle */}
            <div className="flex items-center gap-3">
              <button
                data-testid="editor-publish-toggle"
                onClick={() => setForm({ ...form, published: !form.published })}
                className={`relative w-11 h-6 rounded-full transition-colors ${
                  form.published ? "bg-[#ff6f28]" : "bg-slate-300"
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${
                    form.published ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
              <span className="text-sm font-medium text-slate-700">
                {form.published ? "Published" : "Draft"}
              </span>
            </div>

            {/* WYSIWYG Editor */}
            <div>
              <label className="text-sm font-medium text-slate-700 mb-1.5 block">Content *</label>
              <div className="border border-slate-200 rounded-xl overflow-hidden bg-white wiki-editor">
                <ReactQuill
                  data-testid="editor-content"
                  theme="snow"
                  value={form.content}
                  onChange={(val) => setForm({ ...form, content: val })}
                  modules={quillModules}
                  formats={quillFormats}
                  placeholder="Start writing your article..."
                  style={{ minHeight: "400px" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div data-testid="admin-wiki-page" className="pt-24 md:pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div>
            <Badge className="bg-slate-100 text-slate-700 border-0 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
              Admin
            </Badge>
            <h1 className="font-['Outfit'] text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
              Wiki Management
            </h1>
          </div>
          <div className="flex items-center gap-3 self-start sm:self-auto">
            <button
              data-testid="admin-create-btn"
              onClick={handleCreate}
              className="bg-[#ff6f28] hover:bg-[#e65a15] text-white rounded-lg px-5 py-2.5 text-sm font-semibold shadow-lg shadow-orange-500/20 transition-all hover:-translate-y-0.5 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> New Article
            </button>
            <button
              data-testid="admin-logout-btn"
              onClick={handleLogout}
              className="w-10 h-10 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4 text-slate-500" />
            </button>
          </div>
        </div>

        <Separator className="mb-8" />

        {/* Articles List */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-[#ff6f28] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : articles.length === 0 ? (
          <div data-testid="admin-empty-state" className="text-center py-20">
            <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="font-['Outfit'] text-xl font-semibold text-slate-900 mb-2">No articles yet</h3>
            <p className="text-slate-500 mb-6">Create your first wiki article to get started.</p>
            <button
              data-testid="admin-empty-create-btn"
              onClick={handleCreate}
              className="bg-[#ff6f28] hover:bg-[#e65a15] text-white rounded-lg px-5 py-2.5 text-sm font-semibold inline-flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Create Article
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {articles.map((article) => (
              <div
                key={article.id}
                data-testid={`admin-article-row-${article.id}`}
                className="bg-white border border-slate-100 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-[0_2px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-shadow"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <h3 className="font-['Outfit'] font-semibold text-slate-900 truncate">{article.title}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      article.published ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                    }`}>
                      {article.published ? "Published" : "Draft"}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span>{article.category}</span>
                    <span>{article.author}</span>
                    <span>{new Date(article.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    data-testid={`admin-toggle-publish-${article.id}`}
                    onClick={() => handleTogglePublish(article)}
                    className="w-9 h-9 rounded-lg bg-slate-50 hover:bg-slate-100 flex items-center justify-center transition-colors"
                    title={article.published ? "Unpublish" : "Publish"}
                  >
                    {article.published ? (
                      <EyeOff className="w-4 h-4 text-slate-500" />
                    ) : (
                      <Eye className="w-4 h-4 text-slate-500" />
                    )}
                  </button>
                  <button
                    data-testid={`admin-edit-${article.id}`}
                    onClick={() => handleEdit(article)}
                    className="w-9 h-9 rounded-lg bg-slate-50 hover:bg-blue-50 flex items-center justify-center transition-colors"
                    title="Edit"
                  >
                    <Pencil className="w-4 h-4 text-[#2274df]" />
                  </button>
                  <button
                    data-testid={`admin-delete-${article.id}`}
                    onClick={() => handleDelete(article.id)}
                    className="w-9 h-9 rounded-lg bg-slate-50 hover:bg-red-50 flex items-center justify-center transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
