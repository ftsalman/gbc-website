import React from "react";
import { Button } from "../../../../../lib/turtle-ui/components/button/Button";

export const BlogFullPreview = ({ previewPost, setActiveTab }) => {
  return (
    <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-200 shadow-sm max-w-4xl mx-auto space-y-8">
      <div className="border-b border-gray-200 pb-8 text-center max-w-2xl mx-auto space-y-4">
        <span className="inline-block px-3 py-1 rounded-full bg-[#6C141E]/10 text-neutral-800 border border-[#6C141E]/30 text-xs font-bold uppercase tracking-wider">
          {previewPost.categoryLabel}
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-neutral-900 tracking-tight leading-tight">
          {previewPost.title || "Untitled Article"}
        </h1>
        <div className="flex items-center justify-center gap-3 text-sm text-neutral-500 font-medium">
          <span>
            By <strong className="text-neutral-800">{previewPost.author}</strong>
          </span>
          <span>•</span>
          <span>{previewPost.date}</span>
          <span>•</span>
          <span>{previewPost.readTime}</span>
        </div>
      </div>

      <div className="rounded-2xl overflow-hidden max-h-[420px] shadow-lg border border-gray-200">
        <img
          src={previewPost.image}
          alt="Cover"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="prose max-w-none text-neutral-800 space-y-4 text-base leading-relaxed font-normal">
        <div dangerouslySetInnerHTML={{ __html: previewPost.content }} />
      </div>

      <div className="pt-8 border-t border-gray-200 text-center">
        <Button
          onClick={() => setActiveTab({ id: "editor", label: "📝 Editor" })}
          className="!bg-[#6C141E] !text-white !font-extrabold !rounded-xl !px-8 !py-3 shadow-[3px_3px_0px_0px_#4A0D14]"
        >
          ← Return to Editor
        </Button>
      </div>
    </div>
  );
};
