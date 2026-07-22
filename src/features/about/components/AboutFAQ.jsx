import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    id: "01",
    question: "What is the difference between Mainland and Free Zone?",
    answer: "Mainland companies can trade directly within the local UAE market and take on government contracts. Free Zone companies offer 100% foreign ownership and specific tax benefits, but are generally restricted to trading internationally or within the Free Zone.",
  },
  {
    id: "02",
    question: "How long does it take to get a trade license in Dubai?",
    answer: "Most mainland and free zone company setups are completed within 5–10 working days once all documents are submitted. We manage the entire process end-to-end to ensure there are no delays.",
  },
  {
    id: "03",
    question: "Do I need a local sponsor to set up my business?",
    answer: "Recent changes in UAE law allow 100% foreign ownership for most commercial and industrial activities in the Mainland. You only need a Local Service Agent (LSA) for specific professional licenses. Free Zones always offer 100% foreign ownership.",
  },
  {
    id: "04",
    question: "Can GBC help me open a corporate bank account?",
    answer: "Yes! We have strong relationships with top-tier UAE banks. We will prepare your corporate profile, guide you through compliance requirements, and facilitate priority account opening.",
  },
];

const FaqItem = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);
  const answerWrapRef = useRef(null);
  const answerContentRef = useRef(null);
  const verticalLineRef = useRef(null);

  const toggle = () => {
    if (!answerWrapRef.current) return;
    
    if (!isOpen) {
      // Open animation
      gsap.fromTo(
        answerWrapRef.current,
        { height: 0 },
        { height: answerContentRef.current.scrollHeight, duration: 0.5, ease: "power3.out" }
      );
      // Hide vertical line of the plus to make it a minus
      gsap.to(verticalLineRef.current, { scaleY: 0, duration: 0.3, ease: "power2.out" });
    } else {
      // Close animation
      gsap.to(answerWrapRef.current, {
        height: 0,
        duration: 0.4,
        ease: "power3.out",
      });
      // Show vertical line again
      gsap.to(verticalLineRef.current, { scaleY: 1, duration: 0.3, ease: "power2.out" });
    }
    setIsOpen(!isOpen);
  };

  return (
    <div className="border-t border-gray-200 faq-accordion-item">
      <div
        onClick={toggle}
        className="flex items-center justify-between py-6 sm:py-8 cursor-pointer group"
        aria-expanded={isOpen}
      >
        <p className="text-xl sm:text-2xl font-semibold text-gray-900 group-hover:text-[#6C141E] transition-colors pr-8">
          {item.question}
        </p>
        <div className="relative w-5 h-5 flex items-center justify-center shrink-0">
          <div className="absolute w-full h-[2px] bg-gray-900 group-hover:bg-[#6C141E] transition-colors" />
          <div ref={verticalLineRef} className="absolute h-full w-[2px] bg-gray-900 group-hover:bg-[#6C141E] transition-colors" />
        </div>
      </div>

      <div
        ref={answerWrapRef}
        className="overflow-hidden"
        style={{ height: 0 }}
      >
        <div ref={answerContentRef} className="pb-8">
          <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-[800px]">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
};

export const AboutFAQ = () => {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".faq-anim",
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
      gsap.fromTo(
        ".faq-accordion-item",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".faq-block",
            start: "top 80%",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative py-[120px] bg-[#f9f9f9] font-sans text-gray-900 overflow-hidden">
      <div className="w-full max-w-[1280px] mx-auto px-5 sm:px-10 lg:px-16 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-24">
          
          {/* Header Block */}
          <div className="md:col-span-5 flex flex-col gap-6 faq-anim">
            <div className="flex items-center gap-1.5">
              <span className="text-[#6C141E] font-bold text-sm">//</span>
              <p className="text-sm font-bold tracking-[0.1em] text-[#1a202c] uppercase">Frequently Asked</p>
            </div>
            <h2 className="text-[clamp(2.5rem,4vw,3.5rem)] font-medium text-[#1a202c] leading-[1.15] tracking-tight">
              Frequently Asked<br />Question
            </h2>
          </div>

          {/* FAQ Block */}
          <div className="md:col-span-7 faq-block">
            <div className="border-b border-gray-200">
              {faqs.map((f) => (
                <FaqItem key={f.id} item={f} />
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Decorative Circular Badge (Bottom Right) */}
      <div className="absolute -bottom-10 -right-10 w-48 h-48 md:w-56 md:h-56 z-0 pointer-events-none opacity-80">
        <img 
          src="https://cdn.prod.website-files.com/6995fabf57848ea09e9db42c/69f5d5b6c556bc530030d0f4_Button%20Corner.png" 
          alt="" 
          className="w-full h-full object-cover hidden" 
        />
        
      </div>
    </section>
  );
};
