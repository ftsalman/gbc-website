import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export const FeatureGrid = () => {
  const scrollRef = useRef(null);
  const sectionRef = useRef(null);
  const cursorRef = useRef(null);
  
  const [activeIndex, setActiveIndex] = useState(0);
  const [cursorText, setCursorText] = useState("");
  const [isHoveringSection, setIsHoveringSection] = useState(false);

  const features = [
    {
      title: "Residency Visas",
      description: "Seamless visa processing for investors, employees, and dependents.",
      img: "/images/feature-visas.jpg", // Placeholder images
      link: "/services"
    },
    {
      title: "Tax Registration",
      description: "Stay compliant with corporate tax and VAT registration in the UAE.",
      img: "/images/feature-tax.jpg",
      link: "/services"
    },
    {
      title: "Virtual Office",
      description: "Establish your corporate presence with premium business addresses.",
      img: "/images/feature-office.jpg",
      link: "/services"
    },
    {
      title: "Trademark Registration",
      description: "Protect your brand identity and intellectual property in the Middle East.",
      img: "/images/feature-trademark.jpg",
      link: "/services"
    },
    {
      title: "Accounting & Bookkeeping",
      description: "Professional financial management to keep your business on track.",
      img: "/images/feature-accounting.jpg",
      link: "/services"
    }
  ];

  useGSAP(() => {
    gsap.from(sectionRef.current, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
      },
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    });
  }, { scope: sectionRef });

  // Custom Cursor Logic
  const handleMouseMove = (e) => {
    if (!cursorRef.current) return;
    const { clientX, clientY } = e;
    
    // Animate the custom cursor to the mouse position
    gsap.to(cursorRef.current, {
      x: clientX,
      y: clientY,
      duration: 0.15,
      ease: "power2.out"
    });

    // Update text based on horizontal position
    if (clientX < window.innerWidth / 2) {
      setCursorText("Prev");
    } else {
      setCursorText("Next");
    }
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      const scrollAmount = window.innerWidth > 768 ? 600 : 320;
      scrollRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      const scrollAmount = window.innerWidth > 768 ? 600 : 320;
      // If we are at the end, scroll back to start
      if (scrollRef.current.scrollLeft + scrollRef.current.clientWidth >= scrollRef.current.scrollWidth - 10) {
        scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  const handleScroll = () => {
    if (scrollRef.current && scrollRef.current.children.length > 0) {
      const scrollLeftPos = scrollRef.current.scrollLeft;
      // Dynamically get the width of the first card + gap (24px for gap-6)
      const firstCard = scrollRef.current.children[0];
      const cardWidth = firstCard.clientWidth + 24; 
      
      const newIndex = Math.round(scrollLeftPos / cardWidth);
      setActiveIndex(newIndex);
    }
  };

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full py-24 bg-white text-gray-900 overflow-hidden"
    >
      
      {/* Feature Cards Carousel */}
      <div className="relative w-full mb-12">
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto gap-6 px-6 md:px-12 lg:px-24 pb-4 snap-x snap-mandatory no-scrollbar"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {features.map((feature, idx) => (
            <div 
              key={idx} 
              className="w-[85vw] md:w-[500px] lg:w-[600px] aspect-[4/3] snap-center flex-shrink-0 rounded-2xl overflow-hidden relative group border border-gray-200"
            >
              {/* Image / Background */}
              <div className="absolute inset-0 bg-gray-100 transition-transform duration-700 group-hover:scale-105">
                 <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-200 flex flex-col items-center justify-center p-12 text-center">
                    <h3 className="text-3xl font-serif text-gray-900 mb-4">{feature.title}</h3>
                    <p className="text-gray-500 font-medium">{feature.description}</p>
                 </div>
              </div>

              {/* Hover Buttons on specific cards only */}
              {idx < activeIndex && (
                <div 
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer pointer-events-auto" 
                  onClick={(e) => { e.preventDefault(); scrollLeft(); }}
                >
                  <button className="px-6 py-3 rounded-full bg-white shadow-xl flex items-center justify-center hover:scale-105 transition-transform text-black pointer-events-none">
                    <span className="text-base font-medium">Previous</span>
                  </button>
                </div>
              )}

              {idx > activeIndex && (
                <div 
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer pointer-events-auto" 
                  onClick={(e) => { e.preventDefault(); scrollRight(); }}
                >
                  <button className="px-6 py-3 rounded-full bg-white shadow-xl flex items-center justify-center hover:scale-105 transition-transform text-black pointer-events-none">
                    <span className="text-base font-medium">Next</span>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 flex items-center justify-between pointer-events-auto">
        
        {/* Left: Text & Dots */}
        <div className="flex flex-col items-start space-y-4">
          <h2 className="text-xl md:text-3xl font-medium tracking-tight">
            Solutions for highly creative businesses.
          </h2>
          <div className="flex items-center space-x-2">
            {features.map((_, idx) => (
              <div 
                key={idx} 
                className={`transition-all duration-300 ${
                  activeIndex === idx ? "w-6 h-2 bg-black rounded-full" : "w-2 h-2 bg-gray-300 rounded-full"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Right: Next Circular Button (Native click alternative) */}
        <div className="flex space-x-2">
          <button 
            onClick={(e) => { e.stopPropagation(); scrollLeft(); }}
            className="hidden md:flex w-12 h-12 md:w-16 md:h-16 rounded-full border border-gray-300 items-center justify-center hover:border-black transition-colors"
            aria-label="Previous Slide"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); scrollRight(); }}
            className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-gray-300 flex items-center justify-center hover:border-black transition-colors"
            aria-label="Next Slide"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

    </section>
  );
};
