import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs } from "../../../../../lib/turtle-ui/components/tabs/Tabs";
import { BLOG_CATEGORIES } from "../constants/blogData";
import { BlogEditorForm } from "../components/BlogEditorForm";
import { BlogCardPreview } from "../components/BlogCardPreview";
import { BlogFullPreview } from "../components/BlogFullPreview";
import { PublishedBlogsGrid } from "../components/PublishedBlogsGrid";
import { PublishSuccessModal } from "../components/PublishSuccessModal";
import { getStoredBlogs, saveStoredBlogs } from "../utils/blogStorage";
import {
  deleteBlogFromFirebase,
  getFirebaseBlogs,
  saveBlogToFirebase,
} from "../utils/firebaseBlogStorage";

const SAMPLE_IMAGES = [
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop",
];

const TABS = [
  { id: "editor", label: "📝 Editor" },
  { id: "preview-card", label: "👁️ Live Card Preview" },
  { id: "preview-article", label: "📖 Full Article" },
];

export const CreateBlogPage = () => {
  const navigate = useNavigate();

  // Authentication check
  useEffect(() => {
    if (!localStorage.getItem("flowbee_admin_auth")) {
      navigate("/admin/login");
    }
  }, [navigate]);

  // Form State
  const [title, setTitle] = useState("How WhatsApp AI Agents Scale Conversion by 300%");
  const [category, setCategory] = useState("ai-agent");
  const [author, setAuthor] = useState("Alex Rivers, Head of AI Growth");
  const [authorImage, setAuthorImage] = useState(
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
  );
  const [readTime, setReadTime] = useState("5 min read");
  const [image, setImage] = useState(SAMPLE_IMAGES[0]);
  const [excerpt, setExcerpt] = useState(
    "Discover how leading enterprises leverage automated WhatsApp AI chatbots to qualify leads, handle customer support, and close sales 24/7 without increasing team headcount."
  );
  const [content, setContent] = useState(
    `<h1>The Future of Conversational Commerce</h1><p>In today's fast-paced digital landscape, customers expect instant responses. When a potential buyer reaches out on WhatsApp, waiting hours for a reply often means losing the sale to a competitor.</p><h2>Why AI Agents Are Game-Changers</h2><p>Unlike traditional static chatbots, modern AI agents powered by large language models understand context, nuance, and customer intent. They can seamlessly:</p><ul><li><strong>Answer complex product queries</strong> instantly using your knowledge base.</li><li><strong>Qualify inbound leads</strong> before routing high-value prospects to human sales reps.</li><li><strong>Process orders and check shipping status</strong> without human intervention.</li></ul><h2>Key Takeaways for Enterprise Leaders</h2><p>By deploying Flowbee's WhatsApp automation suite, businesses routinely experience a <strong>40% reduction in support response times</strong> and a <strong>3x increase in lead conversion rates</strong>. The secret lies in blending automated AI speed with human touch.</p>`
  );

  const [activeTab, setActiveTab] = useState(TABS[0]);
  const [isPublishing, setIsPublishing] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [publishedBlogs, setPublishedBlogs] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // Load Firebase blogs, using IndexedDB as a local cache and migration source.
  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const [firebaseBlogs, indexedBlogs] = await Promise.all([
          getFirebaseBlogs(),
          getStoredBlogs(),
        ]);

        const legacyData = localStorage.getItem("flowbee_custom_blogs");
        const legacyBlogs = legacyData ? JSON.parse(legacyData) : [];
        const combinedBlogs = [...firebaseBlogs, ...indexedBlogs, ...legacyBlogs].filter(
          (blog, index, blogs) =>
            blogs.findIndex((candidate) => String(candidate.id) === String(blog.id)) === index
        );

        setPublishedBlogs(combinedBlogs);
        await saveStoredBlogs(combinedBlogs);
      } catch (error) {
        console.error("Unable to load saved blogs:", error);
        const indexedBlogs = await getStoredBlogs().catch(() => []);
        setPublishedBlogs(indexedBlogs);
      }
    };

    loadBlogs();
  }, []);

  // Get current category label
  const categoryLabel =
    BLOG_CATEGORIES.find((c) => c.id === category)?.label || "AI Agent";

  // Construct live preview object
  const previewPost = {
    id: "preview-live",
    title: title || "Untitled Article",
    category: category,
    categoryLabel: categoryLabel,
    author: author || "Flowbee Author",
    authorImage: authorImage || "",
    readTime: readTime || "3 min read",
    date: new Date().toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
    image: image || SAMPLE_IMAGES[0],
    excerpt: excerpt || "No excerpt provided...",
    content: content,
  };

  const handlePublish = (e) => {
    e.preventDefault();
    if (!title.trim() || !excerpt.trim()) return;

    setIsPublishing(true);

    setTimeout(async () => {
      try {
        let updatedBlogs;

        if (editingId) {
          updatedBlogs = publishedBlogs.map((b) =>
            b.id === editingId ? { ...previewPost, id: editingId } : b
          );
        } else {
          const newBlogPost = {
            ...previewPost,
            id: `custom-${Date.now()}`,
          };
          updatedBlogs = [newBlogPost, ...publishedBlogs];
        }

        const blogToSave = editingId
          ? updatedBlogs.find((blog) => String(blog.id) === String(editingId))
          : updatedBlogs[0];
        const firebaseBlog = await saveBlogToFirebase(blogToSave);
        const persistedBlogs = updatedBlogs.map((blog) =>
          String(blog.id) === String(firebaseBlog.id) ? firebaseBlog : blog
        );

        await saveStoredBlogs(persistedBlogs);
        setPublishedBlogs(persistedBlogs);
        setShowSuccessModal(true);
      } catch (error) {
        console.error("Unable to save blog:", error);
        window.alert(
          "The blog could not be saved to Firebase. Check your Firestore/Storage rules and Firebase configuration."
        );
      } finally {
        setIsPublishing(false);
      }
    }, 500);
  };

  const handleEditBlog = (post) => {
    setTitle(post.title);
    setCategory(post.category);
    setAuthor(post.author);
    setAuthorImage(post.authorImage || "");
    setReadTime(post.readTime);
    setImage(post.image);
    setExcerpt(post.excerpt);
    setContent(post.content);
    setEditingId(post.id);
    setActiveTab(TABS[0]); // back to editor
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteBlog = async (id) => {
    const updated = publishedBlogs.filter((b) => b.id !== id);
    try {
      await deleteBlogFromFirebase(id);
      await saveStoredBlogs(updated);
      setPublishedBlogs(updated);
    } catch (error) {
      console.error("Unable to delete blog:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setTitle("");
    setExcerpt("");
    setContent("");
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    setTitle("");
    setExcerpt("");
    setContent("");
    setEditingId(null);
  };

  return (
    <div className="space-y-10 pb-16  p-4">
      {/* Studio Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#6C141E]/20 via-[#6C141E]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6C141E]/10 text-neutral-900 border border-[#6C141E]/30 text-xs font-bold uppercase tracking-wider mb-2">
            <span>🚀 Content Studio</span>
          </div>
          <h1 className="text-3xl font-extrabold text-neutral-900 tracking-tight">
            {editingId ? "Edit Blog Article" : "Publish New Blog Article"}
          </h1>
          <p className="text-neutral-500 text-sm mt-1">
            Create, format, and immediately broadcast articles to your Flowbee live site.
          </p>
        </div>

        {/* Tab Switcher - Using turtle-ui Tabs component */}
        <div className="self-start md:self-auto">
          <Tabs
            tabs={TABS}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            className="!bg-gray-100 !p-1.5 !rounded-2xl !border !border-gray-200/80"
            tabClassName="!px-4 !py-2 !rounded-xl !text-xs !font-bold !transition-all"
          />
        </div>
      </div>

      {/* Main Workspace Area */}
      {activeTab.id === "editor" ? (
        <BlogEditorForm
          title={title}
          setTitle={setTitle}
          excerpt={excerpt}
          setExcerpt={setExcerpt}
          content={content}
          setContent={setContent}
          category={category}
          setCategory={setCategory}
          readTime={readTime}
          setReadTime={setReadTime}
          author={author}
          setAuthor={setAuthor}
          authorImage={authorImage}
          setAuthorImage={setAuthorImage}
          image={image}
          setImage={setImage}
          editingId={editingId}
          isPublishing={isPublishing}
          handlePublish={handlePublish}
          handleCancel={handleCancelEdit}
          categoryLabel={categoryLabel}
        />
      ) : activeTab.id === "preview-card" ? (
        <BlogCardPreview previewPost={previewPost} setActiveTab={setActiveTab} />
      ) : (
        <BlogFullPreview previewPost={previewPost} setActiveTab={setActiveTab} />
      )}

      {/* Published Blogs Grid */}
      <PublishedBlogsGrid
        publishedBlogs={publishedBlogs}
        handleEditBlog={handleEditBlog}
        handleDeleteBlog={handleDeleteBlog}
      />

      {/* Celebratory Success Modal */}
      {showSuccessModal && (
        <PublishSuccessModal
          editingId={editingId}
          title={title}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};
