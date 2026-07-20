import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export const PackageShowcase = () => {
  const scrollRef = useRef(null);
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const packages = [
    {
      id: "freezone",
      name: "Freezone Premium",
      subtitle: "100% Ownership & Zero Tax",
      description: "The ideal launchpad for digital entrepreneurs and international startups looking to scale globally from the UAE.",
      features: ["Trade License Included", "Up to 3 Visas", "Virtual Office Desk", "Corporate Bank Introduction"],
      image: "/images/blogs/small1.png",
      color: "bg-[#F3EFE9]"
    },
    {
      id: "mainland",
      name: "Mainland Starter",
      subtitle: "Trade Anywhere in the UAE",
      description: "Designed for businesses that need a physical presence and want to trade directly with the local UAE market.",
      features: ["Mainland DED License", "Local Sponsor Arrangement", "Office Lease Assistance", "Unlimited Visas Quota"],
      image: "/images/blogs/small1.png",
      color: "bg-[#EAECEF]"
    },
    {
      id: "golden-visa",
      name: "VIP Golden Visa",
      subtitle: "10-Year Residency",
      description: "A specialized concierge service handling everything required for investors to secure long-term stability.",
      features: ["Property/Investment Audit", "Family Sponsorship", "VIP Medical & Typing", "Dedicated Account Manager"],
      image: "/images/blogs/small1.png",
      color: "bg-[#F5F2F0]"
    }
  ];

  const scrollLeft = () => {
    if (scrollRef.current) {
      const scrollAmount = window.innerWidth > 768 ? window.innerWidth * 0.8 : window.innerWidth * 0.9;
      scrollRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      const scrollAmount = window.innerWidth > 768 ? window.innerWidth * 0.8 : window.innerWidth * 0.9;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const handleScroll = () => {
    if (scrollRef.current && scrollRef.current.children.length > 0) {
      const scrollLeftPos = scrollRef.current.scrollLeft;
      const firstCard = scrollRef.current.children[0];
      const cardWidth = firstCard.clientWidth + 32; // width + gap
      const newIndex = Math.round(scrollLeftPos / cardWidth);
      setActiveIndex(newIndex);
    }
  };

  useGSAP(() => {
    gsap.from(".package-card", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
      },
      x: 100,
      opacity: 0,
      stagger: 0.15,
      duration: 1,
      ease: "power3.out"
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="w-full py-16 bg-[#FAF9F6] text-gray-900 overflow-hidden">
      
      {/* Horizontal Carousel */}
      <div className="relative w-full mb-12">
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto gap-8 px-6 md:px-12 lg:px-24 pb-8 snap-x snap-mandatory no-scrollbar"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {packages.map((pkg, idx) => (
            <div 
              key={idx} 
              className={`package-card w-[90vw] md:w-[75vw] lg:w-[65vw] h-[80vh] min-h-[600px] snap-center flex-shrink-0 rounded-3xl overflow-hidden relative flex flex-col md:flex-row shadow-sm ${pkg.color}`}
            >
              {/* Content Side */}
              <div className="w-full md:w-1/2 h-full flex flex-col justify-between p-10 md:p-16 z-10">
                <div>
                  <h3 className="text-4xl md:text-5xl font-serif mb-2">{pkg.name}</h3>
                  <p className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-8">{pkg.subtitle}</p>
                  <p className="text-lg md:text-xl text-gray-800 leading-relaxed mb-10 max-w-md">
                    {pkg.description}
                  </p>
                  
                  <ul className="space-y-4 mb-10">
                    {pkg.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-center text-gray-700">
                        <svg className="w-5 h-5 mr-3 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="font-medium text-lg">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <button className="self-start px-8 py-4 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors">
                  Customize Package
                </button>
              </div>

              {/* Image Side */}
              <div className="w-full md:w-1/2 h-full relative hidden md:block">
                <div className="absolute inset-0 bg-gray-200"></div>
                <img 
                  src={pkg.image} 
                  alt={pkg.name} 
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => e.target.style.display = 'none'}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {packages.map((_, idx) => (
            <div 
              key={idx} 
              className={`transition-all duration-300 ${
                activeIndex === idx ? "w-8 h-2 bg-black rounded-full" : "w-2 h-2 bg-gray-300 rounded-full"
              }`}
            />
          ))}
        </div>
        
        <div className="flex space-x-4">
          <button 
            onClick={scrollLeft}
            className="w-16 h-16 rounded-full border border-gray-300 flex items-center justify-center hover:border-black transition-colors"
          >
            <span className="text-sm font-medium">Prev</span>
          </button>
          <button 
            onClick={scrollRight}
            className="w-16 h-16 rounded-full border border-gray-300 flex items-center justify-center hover:border-black transition-colors"
          >
            <span className="text-sm font-medium">Next</span>
          </button>
        </div>
      </div>

    </section>
  );
};
