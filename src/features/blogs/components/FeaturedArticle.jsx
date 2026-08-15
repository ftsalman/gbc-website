import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { getFirebaseBlogs } from "../../../admin/blog/create-blogs/utils/firebaseBlogStorage";
import { blogs as staticBlogs } from "../constants/blogsData.jsx";

export const FeaturedArticle = () => {
  const containerRef = useRef(null);
  const [latestBlog, setLatestBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const firebaseBlogs = await getFirebaseBlogs();
        let combined = staticBlogs;
        if (firebaseBlogs && firebaseBlogs.length > 0) {
          const mappedBlogs = firebaseBlogs.map(b => ({
            id: b.id,
            title: b.title,
            description: b.excerpt || b.description,
            date: b.date,
            image: b.image,
            author: b.author,
            avatar: b.authorImage || "/images/blogs/avatar_lana.png"
          }));
          
          combined = [...mappedBlogs, ...staticBlogs].filter(
            (blog, index, self) => index === self.findIndex(t => t.id === blog.id)
          );
        }
        setLatestBlog(combined[0]);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setLatestBlog(staticBlogs[0]);
      } finally {
        setLoading(false);
      }
    };
    fetchLatest();
  }, []);

  useGSAP(() => {
    if (loading || !latestBlog) return;
    gsap.from(".featured-content", {
      y: 30,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: "power3.out",
      delay: 0.2
    });
  }, { scope: containerRef, dependencies: [loading, latestBlog] });

  if (loading) {
    return (
      <section className="w-full px-4 md:px-8 lg:px-12 pt-6 pb-8 bg-white">
        <div className="max-w-7xl mx-auto block relative w-full aspect-[16/10] md:aspect-[21/9] min-h-[480px] md:min-h-[580px] bg-gray-100 animate-pulse rounded-[24px] md:rounded-[36px]" />
      </section>
    );
  }

  if (!latestBlog) return null;

  return (
    <section ref={containerRef} className="w-full px-4 md:px-8 lg:px-12 pt-6 pb-8 bg-white">
      <Link 
        to={`/blogs/${latestBlog.id}`}
        className="max-w-7xl mx-auto block relative w-full aspect-[16/10] md:aspect-[21/9] min-h-[480px] md:min-h-[580px] overflow-hidden rounded-[24px] md:rounded-[36px] flex flex-col justify-end p-6 md:p-12 lg:p-16 text-white group cursor-pointer shadow-lg"
      >
        {/* Background Image */}
        <div className="absolute inset-0 bg-gray-900 z-0">
          <img 
            src={latestBlog.image || "/images/blogs/featured.png"} 
            alt={latestBlog.title} 
            className="w-full h-full object-cover opacity-90 transition-transform duration-[2000ms] group-hover:scale-105"
          />
        </div>
        
        {/* Cinematic Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 z-10"></div>

        {/* Content Overlay */}
        <div className="relative z-20 w-full flex flex-col md:flex-row md:items-end justify-between gap-8 text-left">
          <div className="max-w-3xl">
            <span className="featured-content block text-white/70 text-xs md:text-sm font-semibold uppercase tracking-wider mb-3">
              Latest
            </span>
            <h1 className="featured-content text-2xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 text-white">
              {latestBlog.title}
            </h1>
            <p className="featured-content text-xs md:text-sm lg:text-base text-white/80 leading-relaxed font-light line-clamp-3">
              {latestBlog.description}
            </p>
          </div>

          {/* Right Arrow Icon */}
          <div className="featured-content flex-shrink-0 self-end md:self-auto mb-2">
            <svg 
              className="w-12 h-12 md:w-16 md:h-16 text-white/95 stroke-[1.25] transform group-hover:translate-x-2 transition-transform duration-300"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
            </svg>
          </div>
        </div>
      </Link>
    </section>
  );
};
