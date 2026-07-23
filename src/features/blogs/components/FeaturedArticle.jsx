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
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="w-full px-4 md:px-8 lg:px-12 pt-6 pb-8 bg-white">
      <Link 
        to="/blogs/featured"
        className="max-w-7xl mx-auto block relative w-full aspect-[16/10] md:aspect-[21/9] min-h-[480px] md:min-h-[580px] overflow-hidden rounded-[24px] md:rounded-[36px] flex flex-col justify-end p-6 md:p-12 lg:p-16 text-white group cursor-pointer shadow-lg"
      >
        {/* Background Image */}
        <div className="absolute inset-0 bg-gray-900 z-0">
          <img 
            src="/images/blogs/featured.png" 
            alt="Breaking Into Dubai Markets" 
            className="w-full h-full object-cover opacity-90 transition-transform duration-[2000ms] group-hover:scale-105"
          />
        </div>
        
        {/* Cinematic Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 z-10"></div>

        {/* Content Overlay */}
        <div className="relative z-20 w-full flex flex-col md:flex-row md:items-end justify-between gap-8 text-left">
          <div className="max-w-3xl">
            <span className="featured-content block text-white/70 text-xs md:text-sm font-semibold uppercase tracking-wider mb-3">
              Featured
            </span>
            <h1 className="featured-content text-2xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 text-white">
              Breaking Into Dubai Markets: Advice from GBC Founder, Frankie
            </h1>
            <p className="featured-content text-xs md:text-sm lg:text-base text-white/80 leading-relaxed font-light">
              Let's get one thing out of the way: you don't need a massive conglomerate budget to expand into Dubai. We sat down with Frankie Sullivan to talk about licensing, mainland setups, and how any entrepreneur can start in this growing market.
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
