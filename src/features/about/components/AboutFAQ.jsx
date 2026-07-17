import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    id: "01",
    question: "How long does a typical project take?",
    answer: "Most mainland and free zone company setups are completed within 5–10 working days once all documents are submitted. We manage the entire process end-to-end, including license issuance, bank account opening, and visa applications.",
  },
  {
    id: "02",
    question: "What is your pricing structure?",
    answer: "Mainland companies can trade directly with the UAE local market and government contracts, while free zone companies offer 100% foreign ownership, tax benefits, and simplified corporate structures ideal for international businesses.",
  },
  {
    id: "03",
    question: "Do you offer post-launch support?",
    answer: "Absolutely. We believe in full collaboration and keep you updated at every milestone. Our team uses dedicated project channels so you can review, approve, and provide feedback in real time.",
  },
  {
    id: "04",
    question: "What do you need from us to get started?",
    answer: "Typically: a valid passport copy, proof of address, and a business activity description. Depending on the structure and free zone, additional documents may be required — we'll guide you through every step.",
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
    <div className="border-t border-white/10 faq-accordion-item">
      <div
        onClick={toggle}
        className="flex items-center justify-between py-6 sm:py-8 cursor-pointer group"
        aria-expanded={isOpen}
      >
        <p className="text-xl sm:text-2xl font-semibold text-white group-hover:text-[#6C141E] transition-colors pr-8">
          {item.question}
        </p>
        <div className="relative w-5 h-5 flex items-center justify-center shrink-0">
          <div className="absolute w-full h-[2px] bg-white group-hover:bg-[#6C141E] transition-colors" />
          <div ref={verticalLineRef} className="absolute h-full w-[2px] bg-white group-hover:bg-[#6C141E] transition-colors" />
        </div>
      </div>

      <div
        ref={answerWrapRef}
        className="overflow-hidden"
        style={{ height: 0 }}
      >
        <div ref={answerContentRef} className="pb-8">
          <p className="text-[#a1a1aa] text-base md:text-lg leading-relaxed max-w-[800px]">
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
    <section ref={sectionRef} className="py-[120px] bg-[#000000] text-white">
      <div className="w-full max-w-[1280px] mx-auto px-5 sm:px-10 lg:px-16">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-24">
          
          {/* Header Block */}
          <div className="md:col-span-5 flex flex-col gap-4 faq-anim">
            <div className="flex items-center gap-2">
              <span className="text-[#6C141E]">//</span>
              <p className="text-sm font-semibold tracking-wide text-white uppercase font-mono mt-0.5">Frequently Asked</p>
            </div>
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-normal leading-[1.2]">
              Frequently Asked Question
            </h2>
          </div>

          {/* FAQ Block */}
          <div className="md:col-span-7 faq-block">
            <div className="border-b border-white/10">
              {faqs.map((f) => (
                <FaqItem key={f.id} item={f} />
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
