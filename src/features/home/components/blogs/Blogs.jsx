import React, { useState, useEffect } from "react";
import { Button } from "../../../../../lib/turtle-ui/components";
import { getFirebaseBlogs } from "../../../../admin/blog/create-blogs/utils/firebaseBlogStorage";

export const Blogs = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const firebaseBlogs = await getFirebaseBlogs();
        if (firebaseBlogs && firebaseBlogs.length > 0) {
          const mappedBlogs = firebaseBlogs.map((b) => ({
            id: b.id,
            date: b.date,
            title: b.title,
            image: b.image,
            href: `/blogs/${b.id}`, // Route to dynamic blog page
          }));
          
          // Only show top 4 on home page
          setBlogPosts(mappedBlogs.slice(0, 4));
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  // Optionally, you can return a placeholder/skeleton while loading here
  if (isLoading) {
    return null;
  }

  return (
    <section className="blogs-section relative bg-white text-black py-20 md:py-28 border-b border-black/10 overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        <div className="blogs-layout flex flex-col gap-12 md:gap-16">
          {/* Section Header */}
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

          {blogPosts.length > 0 ? (
            <>
              {/* Blog Collection List */}
              <div className="w-dyn-list">
                <div role="list" className="blog-collection-list grid grid-cols-1 gap-0">
                  {blogPosts.map((post) => (
                    <div role="listitem" key={post.id} className="w-dyn-item">
                      <div className="blog-list-item py-10 md:py-14 border-b border-black/10 flex flex-col lg:flex-row justify-between gap-8 lg:gap-16 items-start lg:items-center group transition-colors duration-500 hover:bg-black/[0.02]">
                        {/* Thumbnail */}
                        <div className="blog-thumbnail-wrap w-full lg:max-w-[460px] aspect-[16/10] overflow-hidden rounded-xl shrink-0">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="blog-thumbnail w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]"
                            loading="lazy"
                          />
                        </div>

                        {/* Item Body */}
                        <div className="blog-item-body flex flex-col justify-between items-start flex-1 gap-6">
                          <div className="blog-item-title-wrap flex flex-col gap-3">
                            {/* Date Wrap */}
                            <div className="blog-item-date-wrap text-xs sm:text-sm font-mono text-gray-500 flex items-center gap-1">
                              <div>[</div>
                              <div className="px-1">{post.date}</div>
                              <div>]</div>
                            </div>

                            {/* Title */}
                            <h3 className="text-xl sm:text-2xl md:text-3xl font-light text-black group-hover:text-bordeaux transition-colors duration-300 leading-snug">
                              {post.title}
                            </h3>
                          </div>

                          {/* Secondary button */}
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
              
              {/* View All Blogs Button */}
              <div className="flex justify-center mt-4">
                <a
                  href="/blogs"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = "/blogs";
                  }}
                  className="w-inline-block"
                >
                  <Button
                    variant="primary"
                    size="lg"
                    className="px-8 py-4 text-base tracking-wide"
                  >
                    View all blogs
                  </Button>
                </a>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 px-4 text-center border border-dashed border-gray-200 rounded-2xl bg-gray-50/50">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm border border-gray-100">
                <svg className="w-7 h-7 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15" />
                </svg>
              </div>
              <h3 className="text-2xl font-light text-black mb-3">Coming Soon</h3>
              <p className="text-gray-500 max-w-md mx-auto text-[15px] font-light leading-relaxed">
                We are currently working on some exciting new content. Check back soon for the latest news and updates!
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
