import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export const InteractiveTour = () => {
  const [activeTab, setActiveTab] = useState(0);
  const containerRef = useRef(null);
  const rightColumnRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const tabs = [
    {
      id: "company-formation",
      title: "Fast Company Formation",
      description: "Set up your business in the UAE quickly and legally with our streamlined processes and expert guidance tailored to your needs.",
      cta: "EXPLORE FORMATION",
      link: "/business-setup",
      image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1200"
    },
    {
      id: "legal-compliance",
      title: "Legal & Compliance",
      description: "Ensure your business operations meet all local and federal regulations. We handle documentation, visas, and legal structuring.",
      cta: "EXPLORE LEGAL",
      link: "/services",
      image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=1200"
    },
    {
      id: "pro-services",
      title: "Dedicated PRO Services",
      description: "Skip the queues and let our dedicated Public Relations Officers handle your government approvals, labor contracts, and document clearing.",
      cta: "EXPLORE PRO SERVICES",
      link: "/services",
      image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=1200"
    },
    {
      id: "financial-setup",
      title: "Bank Account Opening",
      description: "Navigate the complex banking landscape with our established partnerships to secure your corporate bank accounts seamlessly.",
      cta: "EXPLORE FINANCIAL",
      link: "/services",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=1200"
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setActiveTab((prev) => (prev + 1) % tabs.length);
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, tabs.length]);

  return (
    <section ref={containerRef} className="relative w-full bg-white text-gray-900 py-24 px-6 md:px-12 lg:px-24 min-h-screen flex items-center overflow-hidden">
      <div className="max-w-[1400px] w-full mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 items-center lg:items-stretch relative z-10">
        
        {/* Left Column: Titles & Content */}
        <div className="w-full lg:w-[45%] flex flex-col justify-between py-4 lg:py-10">
          
          {/* Titles List */}
          <div className="space-y-3 md:space-y-5 mb-12 lg:mb-20">
            {tabs.map((tab, idx) => (
              <div 
                key={tab.id}
                onClick={() => {
                  setActiveTab(idx);
                  setIsPlaying(false);
                }}
                className="cursor-pointer group"
              >
                <h3 className={`text-4xl md:text-5xl lg:text-[3.4rem] leading-[1.2] font-light tracking-tight transition-all duration-500 ${
                  activeTab === idx 
                    ? "text-black" 
                    : "text-gray-400 hover:text-gray-600"
                }`}>
                  {tab.title}
                </h3>
              </div>
            ))}
          </div>

          {/* Dynamic Content (Description + CTA + Controls) */}
          <div className="mt-auto relative min-h-[160px]">
             {tabs.map((tab, idx) => (
               <div 
                 key={`content-${tab.id}`}
                 className={`absolute top-0 left-0 w-full max-w-md transition-all duration-700 ${
                   activeTab === idx ? "opacity-100 translate-y-0 pointer-events-auto z-10" : "opacity-0 translate-y-4 pointer-events-none z-0"
                 }`}
               >
                  <p className="text-gray-600 text-lg leading-relaxed mb-8">
                    {tab.description}
                  </p>
                  <Link to={tab.link} className="inline-flex items-center text-black font-bold text-sm tracking-widest uppercase hover:text-gray-600 transition-colors">
                    {tab.cta}
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
               </div>
             ))}
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-8 pt-8 border-t border-gray-100 max-w-md">
            <div className="flex items-center gap-2">
              {tabs.map((_, idx) => (
                <button 
                  key={`dot-${idx}`}
                  onClick={() => {
                    setActiveTab(idx);
                    setIsPlaying(false);
                  }}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    activeTab === idx ? "w-8 bg-black" : "w-2 bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:text-black transition-colors"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                </svg>
              ) : (
                <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Dynamic Image & Floating Elements */}
        <div ref={rightColumnRef} className="w-full lg:w-[55%] h-[500px] lg:h-[700px] relative rounded-3xl overflow-hidden shadow-xl bg-gray-100">
           {tabs.map((tab, idx) => (
             <div 
               key={`img-${tab.id}`}
               className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
                 activeTab === idx ? "opacity-100 z-10" : "opacity-0 z-0"
               }`}
             >
               <img 
                 src={tab.image} 
                 alt={tab.title}
                 className="w-full h-full object-cover"
               />
               
               {/* Overlay gradients for better text readability on cards if needed */}
               <div className="absolute inset-0 bg-black/10"></div>
               
               {/* Floating Data Cards (Matches the image aesthetic) */}
               {activeTab === idx && (
                 <div className="absolute right-[5%] md:right-[10%] top-[15%] flex flex-col gap-4">
                    <div className="bg-white rounded-xl shadow-lg p-4 w-32 flex flex-col items-center justify-center transform transition-transform duration-700 translate-y-0 opacity-100 animate-in slide-in-from-bottom-4 fade-in" style={{animationDelay: '200ms', animationFillMode: 'both'}}>
                       <p className="text-[10px] text-gray-400 font-semibold tracking-wider uppercase mb-1">Speed</p>
                       <p className="text-2xl text-black font-light">100%</p>
                    </div>
                    <div className="bg-white rounded-xl shadow-lg p-4 w-32 flex flex-col items-center justify-center transform transition-transform duration-700 translate-y-0 opacity-100 animate-in slide-in-from-bottom-4 fade-in" style={{animationDelay: '400ms', animationFillMode: 'both'}}>
                       <p className="text-[10px] text-gray-400 font-semibold tracking-wider uppercase mb-1">Compliance</p>
                       <p className="text-2xl text-black font-light">A+</p>
                    </div>
                    <div className="bg-white rounded-xl shadow-lg p-4 w-32 flex flex-col items-center justify-center transform transition-transform duration-700 translate-y-0 opacity-100 animate-in slide-in-from-bottom-4 fade-in" style={{animationDelay: '600ms', animationFillMode: 'both'}}>
                       <p className="text-[10px] text-gray-400 font-semibold tracking-wider uppercase mb-1">Support</p>
                       <p className="text-2xl text-black font-light">24/7</p>
                    </div>
                 </div>
               )}
             </div>
           ))}
        </div>

      </div>
    </section>
  );
};

