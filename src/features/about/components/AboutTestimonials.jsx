import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    id: "01",
    quote: "“Working with Syncox was a game-changer for our brand. Their designs were creative, innovative, and perfectly aligned with our vision.”",
    name: "Alexandra Linn",
    role: "CEO of AT&T",
    image: "https://cdn.prod.website-files.com/6995fabf57848ea09e9db42c/69f76b0ad6a6658084004655_Testimonial%203.webp",
  },
  {
    id: "02",
    quote: "“Partnering with GBC took the stress out of navigating UAE regulations. Their corporate tax advisory has been invaluable for our mainland operations.”",
    name: "Jason Miller",
    role: "Managing Director, Nexus Group",
    image: "https://cdn.prod.website-files.com/6995fabf57848ea09e9db42c/69f76b0aed8ea128e67fe557_Testimonial%202.webp",
  },
  {
    id: "03",
    quote: "“GBC Corporate provided us with top-tier PRO and licensing services. Their experts were always available, insightful, and incredibly efficient.”",
    name: "Olivia Turner",
    role: "Founder, Luxe Hospitality",
    image: "https://cdn.prod.website-files.com/6995fabf57848ea09e9db42c/69f76f7920899d6e4ee9fdfb_Woman%20Using%20Laptop.webp",
  },
];

export const AboutTestimonials = () => {
  const sectionRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const slideRef = useRef(null);

  const goTo = (idx) => {
    const next = (idx + testimonials.length) % testimonials.length;
    gsap.fromTo(
      slideRef.current,
      { opacity: 0, x: idx > activeIdx ? 30 : -30 },
      { opacity: 1, x: 0, duration: 0.6, ease: "power3.out" }
    );
    setActiveIdx(next);
  };

  useGSAP(
    () => {
      gsap.fromTo(
        ".testi-anim",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  const t = testimonials[activeIdx];

  return (
    <section ref={sectionRef} className="py-[120px] bg-white font-sans border-t border-gray-100">
      <div className="w-full max-w-[1280px] mx-auto px-5 sm:px-10 lg:px-16 testi-anim">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2.5fr] lg:grid-cols-[1fr_2fr] gap-x-12 gap-y-12">
          
          {/* Left Column */}
          <div className="flex flex-col justify-between">
            <div className="flex items-center gap-1 mb-8 md:mb-0">
              <span className="text-[#6C141E] font-bold text-sm">//</span>
              <span className="text-sm font-semibold tracking-wide text-gray-600">Testimonials</span>
            </div>
            
            <div className="hidden md:block">
              {/* Quote icon matching screenshot */}
              <div className="text-[120px] font-sans font-bold leading-none text-[#1a1a1a] tracking-[-0.1em] h-[80px]">
                “
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-10 md:gap-16">
            <h2 className="text-[clamp(2.5rem,4vw,4rem)] font-medium leading-[1.1] text-[#1a1a1a] tracking-tight max-w-2xl">
              Hear From Our Happy Clients Today
            </h2>

            {/* Slider Content */}
            <div ref={slideRef} className="flex flex-col gap-10">
              <p className="text-[clamp(1.25rem,2vw,1.75rem)] font-normal leading-[1.5] text-[#333333] max-w-3xl">
                {t.quote}
              </p>
              
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
                
                {/* Author Info */}
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl overflow-hidden shrink-0">
                    <img src={t.image} alt={t.name} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-lg font-medium text-[#1a1a1a]">{t.name}</span>
                    <span className="text-sm text-gray-500">{t.role}</span>
                  </div>
                </div>

                {/* Navigation Arrows */}
                <div className="flex items-center gap-2 shrink-0">
                  <button 
                    onClick={() => goTo(activeIdx - 1)}
                    className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 border border-gray-200 bg-white hover:bg-gray-50 transition-colors"
                    aria-label="Previous testimonial"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                      <path d="M19 12H5M12 19l-7-7 7-7"/>
                    </svg>
                  </button>
                  <button 
                    onClick={() => goTo(activeIdx + 1)}
                    className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 border border-gray-200 bg-white hover:bg-gray-50 transition-colors"
                    aria-label="Next testimonial"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </button>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
