import React from "react";
import { PageToolbar } from "../../../components/PageToolbar/PageToolbar.jsx";
import { Blogs } from "../../home/components/blogs/Blogs.jsx";
import { Connect } from "../../home/components/connect/Connect.jsx";

export const BlogsPage = () => {
  return (
    <div className="blogs-page bg-black text-white font-sans overflow-hidden">
      {/* Exact Syncox Blogs Header Section */}
      <PageToolbar
        title={"Ideas &\nStories"}
        description={
          "Explore our latest articles, insights, and design strategies from our creative team covering web development, branding, and digital innovation."
        }
        bgImage="/images/TOOLSBAR_BG.png"
        imagePosition="right"
      />

      {/* Blogs Grid Component */}
      <Blogs />

      {/* Connect & CTA */}
      <Connect />
    </div>
  );
};
