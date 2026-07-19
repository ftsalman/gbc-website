import React from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

export const FeaturedArticle = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.from(".featured-content", {
      y: 30,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: "power3.out",
      delay: 0.2
    });
    
    gsap.fromTo(".featured-image", 
      { scale: 1.05 },
      { scale: 1, duration: 1.5, ease: "power3.out" }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="w-full px-6 md:px-12 lg:px-24 pt-32 pb-12 bg-white text-gray-900">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 items-center">
        
        {/* Left: Text Content */}
        <div className="w-full lg:w-1/2 flex flex-col items-start">
          <div className="featured-content inline-block px-3 py-1 mb-6 rounded-full border border-black/20 text-xs font-semibold uppercase tracking-wider">
            Featured Article
          </div>
          <h1 className="featured-content text-4xl md:text-5xl lg:text-6xl font-serif leading-tight tracking-tight mb-6">
            The Future of Business Setup in the UAE: 2026 Trends.
          </h1>
          <p className="featured-content text-lg md:text-xl text-gray-600 mb-8 max-w-lg">
            Discover the latest regulatory changes, tax benefits, and emerging opportunities that are reshaping the landscape for global entrepreneurs in Dubai.
          </p>
          <Link 
            to="/blogs/future-of-business-setup" 
            className="featured-content group flex items-center gap-3 text-lg font-medium border-b border-black pb-1 hover:text-gray-600 hover:border-gray-600 transition-colors"
          >
            Read Full Story
            <svg 
              className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Right: Massive Image */}
        <div className="w-full lg:w-1/2 aspect-[4/5] md:aspect-square overflow-hidden rounded-2xl relative group cursor-pointer">
          <div className="absolute inset-0 bg-gray-200 z-0">
             {/* Fallback gradient if image is missing */}
             <div className="w-full h-full bg-gradient-to-tr from-gray-100 to-gray-300"></div>
          </div>
          <img 
            src="/images/blog-featured.jpg" 
            alt="Business Setup Trends" 
            className="featured-image absolute inset-0 w-full h-full object-cover z-10 transition-transform duration-700 group-hover:scale-105"
            onError={(e) => e.target.style.display = 'none'} // Hide broken image to show gradient
          />
        </div>

      </div>
    </section>
  );
};
