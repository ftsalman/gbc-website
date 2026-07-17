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
    quote: "“Partnering with Syncox elevated our brand presence instantly. Their design thinking was sharp, modern, and perfectly organised”",
    name: "Jason Miller",
    role: "Lead Designer",
    image: "https://cdn.prod.website-files.com/6995fabf57848ea09e9db42c/69f76b0aed8ea128e67fe557_Testimonial%202.webp",
  },
  {
    id: "03",
    quote: "“Syncox helped us refine our brand with precision and insight. Their concepts were fresh, engaging, and aligned with our long-term strategy.”",
    name: "Olivia Turner",
    role: "Creative Lead",
    image: "https://cdn.prod.website-files.com/6995fabf57848ea09e9db42c/69f76f7920899d6e4ee9fdfb_Woman%20Using%20Laptop.webp",
  },
];

const CornerImg = ({ className }) => (
  <img 
    src="https://cdn.prod.website-files.com/6995fabf57848ea09e9db42c/69f5d5b6c556bc530030d0f4_Button%20Corner.png" 
    loading="lazy" 
    alt="" 
    className={`absolute w-[5px] h-[5px] ${className}`} 
  />
);

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
          stagger: 0.1,
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
    <section ref={sectionRef} className="py-[120px] bg-[#000000] text-white border-b border-white/10">
      <div className="w-full max-w-[1280px] mx-auto px-5 sm:px-10 lg:px-16">
        
        {/* Header Block */}
        <div className="flex flex-col gap-4 mb-[60px] md:mb-[80px] testi-anim">
          <div className="flex items-center gap-2">
            <span className="text-[#6C141E]">//</span>
            <p className="text-sm font-semibold tracking-wide text-white uppercase font-mono mt-0.5">Testimonials</p>
          </div>
          <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-normal leading-[1.1] max-w-[600px]">
            Hear From Our Happy Clients Today
          </h2>
        </div>

        {/* Testimonial Block */}
        <div className="relative border-t border-white/10 pt-16 testi-anim">
          
          <img 
            src="https://cdn.prod.website-files.com/6995fabf57848ea09e9db42c/69f768a7deef48ba7fb745f4_quote.png" 
            alt="Quote icon" 
            className="absolute top-0 left-0 -translate-y-1/2 w-16 md:w-20 bg-black px-4" 
          />
          
          <div className="flex flex-col md:flex-row justify-between items-end gap-12">
            
            {/* Slider Content */}
            <div ref={slideRef} className="flex-1 max-w-[800px]">
              <p className="text-[clamp(1.5rem,3vw,2.5rem)] font-normal leading-[1.3] text-white mb-12">
                {t.quote}
              </p>
              <div className="flex items-center gap-4">
                <div className="w-[60px] h-[60px] md:w-[80px] md:h-[80px] rounded-full overflow-hidden shrink-0">
                  <img src={t.image} alt={t.name} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl md:text-2xl font-normal text-white">{t.name}</span>
                  <span className="text-sm md:text-base text-[#a1a1aa]">{t.role}</span>
                </div>
              </div>
            </div>

            {/* Arrows */}
            <div className="flex items-center gap-4 shrink-0">
              <button 
                onClick={() => goTo(activeIdx - 1)}
                className="relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 border border-white/20 group hover:border-[#6C141E] hover:bg-[#6C141E]/10 transition-colors"
                aria-label="Previous testimonial"
              >
                <img src="https://cdn.prod.website-files.com/6995fabf57848ea09e9db42c/69f76caafe45bcb51614e7e0_Arrow.svg" alt="" className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <CornerImg className="top-0 left-0 -translate-x-[1px] -translate-y-[1px] rotate-0" />
                <CornerImg className="top-0 right-0 translate-x-[1px] -translate-y-[1px] rotate-90" />
                <CornerImg className="bottom-0 left-0 -translate-x-[1px] translate-y-[1px] -rotate-90" />
                <CornerImg className="bottom-0 right-0 translate-x-[1px] translate-y-[1px] rotate-180" />
              </button>
              <button 
                onClick={() => goTo(activeIdx + 1)}
                className="relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 border border-white/20 group hover:border-[#6C141E] hover:bg-[#6C141E]/10 transition-colors"
                aria-label="Next testimonial"
              >
                <img src="https://cdn.prod.website-files.com/6995fabf57848ea09e9db42c/69f76caafe45bcb51614e7e0_Arrow.svg" alt="" className="w-5 h-5 rotate-180 group-hover:scale-110 transition-transform" />
                <CornerImg className="top-0 left-0 -translate-x-[1px] -translate-y-[1px] rotate-0" />
                <CornerImg className="top-0 right-0 translate-x-[1px] -translate-y-[1px] rotate-90" />
                <CornerImg className="bottom-0 left-0 -translate-x-[1px] translate-y-[1px] -rotate-90" />
                <CornerImg className="bottom-0 right-0 translate-x-[1px] translate-y-[1px] rotate-180" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
