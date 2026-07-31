import React from "react";
import { Button } from "../../../../../lib/turtle-ui/components/button/Button";
import { BlogCard } from "../../../blog/components/BlogCard";

export const BlogCardPreview = ({ previewPost, setActiveTab }) => {
  return (
    <div className="bg-white rounded-3xl p-10 border border-gray-200 shadow-sm max-w-xl mx-auto space-y-6 text-center">
      <div>
        <span className="text-xs font-bold text-[#6C141E] uppercase tracking-wider block mb-1">
          Exact Grid Representation
        </span>
        <h3 className="text-2xl font-extrabold text-neutral-900">
          How your article will appear on the blog grid
        </h3>
      </div>
      <div className="text-left">
        <BlogCard post={previewPost} />
      </div>
      <Button
        onClick={() => setActiveTab({ id: "editor", label: "📝 Editor" })}
        className="!bg-black text-white !font-bold !rounded-xl !px-6 !py-2.5"
      >
        ← Back to Editor
      </Button>
    </div>
  );
};
