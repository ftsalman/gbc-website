import React from "react";
import { SEO } from "../../../components/seo/SEO.jsx";
import { FeaturedArticle } from "../components/FeaturedArticle.jsx";
import { BlogGrid } from "../components/BlogGrid.jsx";
import { Connect } from "../../home/components/connect/Connect.jsx";

export const BlogsPage = () => {
  return (
    <div className="blogs-page bg-white font-sans overflow-hidden min-h-screen">
      <SEO title="Blog" description="Read the latest insights, success stories, and news about business setup in the UAE." />
      
      {/* 1. Hero Featured Article */}
      <FeaturedArticle />

      {/* 2. Grid of Articles */}
      <BlogGrid />

      {/* 3. Connect Footer */}
      <Connect />
      
    </div>
  );
};

