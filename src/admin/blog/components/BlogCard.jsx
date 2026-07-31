import React from "react";
import { Link } from "react-router-dom";
import { Card } from "../../../../lib/turtle-ui/components/card/Card";
import { Button } from "../../../../lib/turtle-ui/components/button/Button";

export const BlogCard = ({ post }) => {
  return (
    <Link to={`/read/${post.id}`} className="block h-full group/link">
      <Card className="flex flex-col h-full bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group !p-0 cursor-pointer">
        {/* Thumbnail Image */}
        <div className="relative overflow-hidden w-full h-56 bg-gray-100">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          {/* Category Badge */}
          <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-neutral-800 border border-gray-200/50 shadow-sm">
            {post.categoryLabel}
          </span>
        </div>

        {/* Content Body */}
        <div className="p-6 flex flex-col justify-between flex-grow">
          <div>
            {/* Metadata */}
            <div className="flex items-center gap-2 text-xs text-neutral-500 mb-3 font-medium">
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>

            {/* Title */}
            <h3 className="font-bold text-xl text-neutral-900 group-hover:text-[#0f53de] transition-colors line-clamp-2 mb-3 leading-snug">
              {post.title}
            </h3>

            {/* Excerpt */}
            <p className="text-sm text-neutral-600 line-clamp-3 mb-6 font-normal leading-relaxed">
              {post.excerpt}
            </p>
          </div>

          {/* Action / Read More Button */}
          <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-[#FFD400] flex items-center justify-center text-[9px] font-black text-black overflow-hidden flex-shrink-0 border border-gray-200">
                {post.authorImage ? (
                  <img src={post.authorImage} alt={post.author} className="w-full h-full object-cover" />
                ) : (
                  (post.author || "F")[0]
                )}
              </div>
              <span className="text-xs font-semibold text-neutral-600 truncate max-w-[130px]">
                {post.author}
              </span>
            </div>
            <div className="!p-0 !font-bold !text-[#0f53de] group-hover/link:!text-[#0b3c9c] !bg-transparent !shadow-none flex items-center gap-1 text-sm">
              <span>Read more</span>
              <svg
                className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};
