import React, { useState, useEffect } from "react";
import { SEO } from "../../../components/seo/SEO.jsx";
import { FeaturedArticle } from "../components/FeaturedArticle.jsx";
import { BlogFilters } from "../components/BlogFilters.jsx";
import { BlogGrid } from "../components/BlogGrid.jsx";
import { NewsletterSignup } from "../components/NewsletterSignup.jsx";
import { Connect } from "../../home/components/connect/Connect.jsx";
import { getFirebaseBlogs } from "../../../admin/blog/create-blogs/utils/firebaseBlogStorage";

const SkeletonCard = ({ className }) => (
  <div className={`bg-white border-[1.5px] border-gray-100 rounded-[14px] shadow-sm p-4 flex flex-col gap-4 ${className}`}>
    {/* Top row */}
    <div className="flex items-center gap-2.5 w-full">
      <div className="w-7 h-3 bg-gray-100 rounded-sm"></div>
      <div className="w-24 h-3 bg-gray-100 rounded-sm"></div>
      <div className="ml-auto w-10 h-3 bg-gray-100 rounded-sm"></div>
    </div>
    {/* Bottom row */}
    <div className="flex gap-3.5 w-full">
      <div className="w-[72px] h-[60px] bg-gray-100 rounded-md flex-shrink-0"></div>
      <div className="flex flex-col gap-2.5 flex-grow justify-center">
        <div className="w-full h-3 bg-gray-100 rounded-sm"></div>
        <div className="w-4/5 h-3 bg-gray-100 rounded-sm"></div>
      </div>
    </div>
  </div>
);

export const BlogsPage = () => {
  const [hasBlogs, setHasBlogs] = useState(true); // Default true to prevent flash of empty state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkBlogs = async () => {
      try {
        const blogs = await getFirebaseBlogs();
        setHasBlogs(blogs && blogs.length > 0);
      } catch (error) {
        console.error("Error checking blogs:", error);
        setHasBlogs(false);
      } finally {
        setLoading(false);
      }
    };
    checkBlogs();
  }, []);

  return (
    <div className="blogs-page bg-white font-sans overflow-hidden min-h-screen flex flex-col">
      <SEO title="Blog" description="Read the latest insights, success stories, and news about business setup in the UAE." />
      
      {!loading && !hasBlogs ? (
        <div className="flex-grow flex flex-col items-center justify-center py-20 px-4 bg-[#fffbf0]/30">
          {/* Floating Skeleton Cards */}
          <div className="relative w-full max-w-[420px] h-[260px] flex items-center justify-center mb-8">
            {/* Back Left Card */}
            <SkeletonCard className="absolute w-[280px] -rotate-[10deg] -translate-x-12 -translate-y-8 opacity-70 z-0" />
            
            {/* Back Right Card */}
            <SkeletonCard className="absolute w-[280px] rotate-[8deg] translate-x-14 translate-y-2 opacity-70 z-0" />
            
            {/* Front Center Card */}
            <SkeletonCard className="absolute w-[300px] -rotate-[1deg] shadow-[0_8px_30px_rgb(0,0,0,0.04)] z-10" />
          </div>

          <p className="text-gray-500 text-[15px] mb-6 font-medium tracking-wide">
            How about checking out our other resources right now?
          </p>

          <button 
            onClick={() => window.location.href = '/'} 
            className="bg-[#6C141E] text-white px-7 py-3 rounded-full text-sm font-semibold hover:bg-[#8A1A27] transition-all duration-300 flex items-center gap-2 shadow-lg shadow-[#6C141E]/25 hover:shadow-[#6C141E]/40 hover:-translate-y-0.5"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
            Back to Home
          </button>
        </div>
      ) : (
        <div className="flex-grow flex flex-col">
          {/* 1. Cinematic Hero Featured Article */}
          <FeaturedArticle />

          {/* 2. Sticky Category Filters */}
          <BlogFilters />

          {/* 3. Masonry / Staggered Grid of Articles */}
          <BlogGrid />

          {/* 4. Newsletter Signup */}
          <NewsletterSignup />
        </div>
      )}

      {/* 5. Connect Footer (Always visible) */}
      <Connect />
      
    </div>
  );
};

