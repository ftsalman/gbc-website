import React from "react";
import { Button } from "../../../../../lib/turtle-ui/components";

const blogPosts = [
  {
    id: "01",
    date: "May 14, 2026",
    title:
      "Explore the latest corporate tax regulations and 9% threshold rules for UAE mainland entities in 2026.",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop",
    href: "#",
  },
  {
    id: "02",
    date: "May 08, 2026",
    title:
      "Discover the strategic advantages of setting up a Dual-License structure across DIFC and Dubai Mainland.",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800&auto=format&fit=crop",
    href: "#",
  },
  {
    id: "03",
    date: "April 29, 2026",
    title:
      "Navigating UAE Golden Visa expansion: New eligibility criteria for real estate investors and executive talent.",
    image:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop",
    href: "#",
  },
  {
    id: "04",
    date: "April 18, 2026",
    title:
      "How family offices and international holding companies optimize wealth protection under ADGM foundations.",
    image:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=800&auto=format&fit=crop",
    href: "#",
  },
];

export const Blogs = () => {
  return (
    <section className="blogs-section relative bg-white text-black py-20 md:py-28 border-b border-black/10 overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        <div className="blogs-layout flex flex-col gap-12 md:gap-16">
          {/* Section Header matching exact Syncox section-heading-horizontal-block is-middle-align */}
          <div className="section-heading-horizontal-block is-middle-align flex flex-col sm:flex-row justify-between sm:items-center gap-6 pb-8 border-b border-black/10">
            <div className="section-preheading-wrap">
              <p className="text-xs sm:text-sm font-mono tracking-wider text-black flex items-center gap-2">
                <span className="text-bordeaux font-bold">//</span> Blog
              </p>
            </div>
            <div className="section-title-wrap">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-black tracking-tight">
                News &amp; Updates
              </h2>
            </div>
          </div>

          {/* Blog Collection List matching exact Syncox w-dyn-list / blog-collection-list */}
          <div className="w-dyn-list">
            <div role="list" className="blog-collection-list grid grid-cols-1 gap-0">
              {blogPosts.map((post) => (
                <div role="listitem" key={post.id} className="w-dyn-item">
                  <div className="blog-list-item py-10 md:py-14 border-b border-black/10 flex flex-col lg:flex-row justify-between gap-8 lg:gap-16 items-start lg:items-center group transition-colors duration-500 hover:bg-black/[0.02]">
                    {/* Thumbnail matching exact Syncox .blog-thumbnail-wrap with rounded-xl (var(--spacing--2x)) */}
                    <div className="blog-thumbnail-wrap w-full lg:max-w-[460px] aspect-[16/10] overflow-hidden rounded-xl shrink-0">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="blog-thumbnail w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]"
                        loading="lazy"
                      />
                    </div>

                    {/* Item Body matching exact Syncox .blog-item-body */}
                    <div className="blog-item-body flex flex-col justify-between items-start flex-1 gap-6">
                      <div className="blog-item-title-wrap flex flex-col gap-3">
                        {/* Date Wrap matching exact Syncox bracket syntax */}
                        <div className="blog-item-date-wrap text-xs sm:text-sm font-mono text-gray-500 flex items-center gap-1">
                          <div>[</div>
                          <div className="px-1">{post.date}</div>
                          <div>]</div>
                        </div>

                        {/* Title matching exact h3.h4.font-weight-400 */}
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-light text-black group-hover:text-bordeaux transition-colors duration-300 leading-snug">
                          {post.title}
                        </h3>
                      </div>

                      {/* Secondary button matching exact Syncox Learn More */}
                      <a
                        href={post.href}
                        onClick={(e) => {
                          e.preventDefault();
                          window.location.href = post.href;
                        }}
                        className="w-inline-block"
                      >
                        <Button
                          variant="secondary"
                          size="sm"
                          className="!text-black !border-black/25 hover:!border-black/60"
                        >
                          Learn More
                        </Button>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
