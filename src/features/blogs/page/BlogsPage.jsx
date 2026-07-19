import React from "react";
import { FeaturedArticle } from "../components/FeaturedArticle.jsx";
import { BlogFilters } from "../components/BlogFilters.jsx";
import { BlogGrid } from "../components/BlogGrid.jsx";
import { NewsletterSignup } from "../components/NewsletterSignup.jsx";
import { Connect } from "../../home/components/connect/Connect.jsx";

export const BlogsPage = () => {
  return (
    <div className="blogs-page bg-white font-sans overflow-hidden min-h-screen">
      
      {/* 1. Cinematic Hero Featured Article */}
      <FeaturedArticle />

      {/* 2. Sticky Category Filters */}
      <BlogFilters />

      {/* 3. Masonry / Staggered Grid of Articles */}
      <BlogGrid />

      {/* 4. Newsletter Signup */}
      <NewsletterSignup />

      {/* 5. Connect Footer (Retained from previous layout) */}
      <Connect />
      
    </div>
  );
};

