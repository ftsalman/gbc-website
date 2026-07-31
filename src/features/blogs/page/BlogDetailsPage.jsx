import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { SEO } from "../../../components/seo/SEO.jsx";
import { blogsData } from "../constants/blogsData.jsx";
import { Button } from "../../../../lib/turtle-ui/components/button/Button.jsx";
import { getFirebaseBlogs } from "../../../admin/blog/create-blogs/utils/firebaseBlogStorage";

export const BlogDetailsPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const fetchBlog = async () => {
      // First check static data
      if (blogsData[id]) {
        setBlog(blogsData[id]);
        setLoading(false);
        return;
      }
      
      // If not in static data, check Firebase
      try {
        const firebaseBlogs = await getFirebaseBlogs();
        const found = firebaseBlogs.find(b => String(b.id) === String(id));
        if (found) {
          // Map to the expected UI schema
          setBlog({
            ...found,
            category: found.categoryLabel || "Blog",
            avatar: found.authorImage || "/images/blogs/avatar_lana.png",
          });
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center font-sans">
        <span className="w-8 h-8 border-4 border-gray-200 border-t-[#6C141E] rounded-full animate-spin mb-4"></span>
        <p className="text-gray-500">Loading article...</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center font-sans">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Article Not Found</h1>
        <p className="text-gray-600 mb-8">The blog post you are looking for does not exist or has been moved.</p>
        <Link to="/blogs">
          <Button variant="primary" size="lg">
            Back to Blogs
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="blog-details bg-white font-sans overflow-hidden min-h-screen text-gray-900">
      <SEO title={blog.title} description={blog.title} />

      {/* Header Container */}
      <section className="w-full px-4 md:px-8 lg:px-12 pt-24 md:pt-32 bg-white">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link 
            to="/blogs" 
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-900 mb-8 transition-colors group"
          >
            <svg 
              className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blogs
          </Link>

          {/* Category & Date */}
          <div className="flex items-center gap-2 mb-4 text-xs md:text-sm font-semibold uppercase tracking-wider text-gray-500">
            <span>{blog.category}</span>
            <span>•</span>
            <span>{blog.date}</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-8 text-gray-900">
            {blog.title}
          </h1>

          {/* Author info */}
          <div className="flex items-center gap-3 mb-10 pb-8 border-b border-gray-100">
            <img 
              src={blog.avatar} 
              alt={blog.author} 
              className="w-10 h-10 rounded-full object-cover border border-gray-150"
            />
            <div>
              <p className="text-sm font-bold text-gray-900 leading-none mb-1">
                {blog.author}
              </p>
              <p className="text-xs text-gray-500">
                Author & Business Setup Advisor
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Image Section */}
      <section className="w-full px-4 md:px-8 lg:px-12 bg-white mb-12">
        <div className="max-w-4xl mx-auto aspect-[16/9] overflow-hidden rounded-[24px] md:rounded-[32px] shadow-sm">
          <img 
            src={blog.image} 
            alt={blog.title} 
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Rich Body Content */}
      <section className="w-full px-4 md:px-8 lg:px-12 bg-white pb-20">
        <div className="max-w-3xl mx-auto">
          <div className="blog-content-body prose prose-lg prose-slate max-w-none">
            {typeof blog.content === "string" ? (
              <div dangerouslySetInnerHTML={{ __html: blog.content }} />
            ) : (
              blog.content
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
