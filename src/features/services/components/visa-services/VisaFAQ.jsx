import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    id: "01",
    question: "How long does it take to process a UAE residency visa?",
    answer: "Typically, standard employment and investor visas take about 2 to 3 weeks from the time of entry permit issuance to the final Emirates ID delivery. Golden Visa processing can be slightly faster once the initial nomination is approved.",
  },
  {
    id: "02",
    question: "Do I have to exit the UAE to change my visa status?",
    answer: "No, in most cases you can process an 'In-Country Change of Status'. This avoids the need to fly out and re-enter, saving you time and travel expenses.",
  },
  {
    id: "03",
    question: "Can I sponsor my family members?",
    answer: "Yes, residents with a valid UAE visa and a minimum salary bracket (typically AED 4,000, or AED 3,000 plus accommodation) can sponsor their spouse and children. Investors and Golden Visa holders have even more flexible family sponsorship options.",
  },
  {
    id: "04",
    question: "What happens if my visa expires?",
    answer: "The UAE government generally grants a 30-day grace period after visa cancellation or expiration. It is crucial to either renew your visa or exit the country within this period to avoid overstay fines.",
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
      gsap.fromTo(
        answerWrapRef.current,
        { height: 0 },
        { height: answerContentRef.current.scrollHeight, duration: 0.5, ease: "power3.out" }
      );
      gsap.to(verticalLineRef.current, { scaleY: 0, duration: 0.3, ease: "power2.out" });
    } else {
      gsap.to(answerWrapRef.current, {
        height: 0,
        duration: 0.4,
        ease: "power3.out",
      });
      gsap.to(verticalLineRef.current, { scaleY: 1, duration: 0.3, ease: "power2.out" });
    }
    setIsOpen(!isOpen);
  };

  return (
    <div className="border-t border-gray-200 visa-faq-item">
      <div
        onClick={toggle}
        className="flex items-center justify-between py-6 sm:py-8 cursor-pointer group"
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

export const VisaFAQ = () => {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".visa-faq-anim",
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
        ".visa-faq-item",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".visa-faq-block",
            start: "top 80%",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative py-24 sm:py-[120px] bg-white font-sans text-gray-900 overflow-hidden">
      <div className="w-full max-w-[1280px] mx-auto px-5 sm:px-10 lg:px-16 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-24">
          
          <div className="md:col-span-5 flex flex-col gap-6 visa-faq-anim">
            <div className="flex items-center gap-1.5">
              <span className="text-[#6C141E] font-bold text-sm">//</span>
              <p className="text-sm font-bold tracking-[0.1em] text-[#1a202c] uppercase">Get Clarity</p>
            </div>
            <h2 className="text-[clamp(2.5rem,4vw,3.5rem)] font-medium text-[#1a202c] leading-[1.15] tracking-tight">
              Visa & Immigration<br />FAQs
            </h2>
          </div>

          <div className="md:col-span-7 visa-faq-block">
            <div className="border-b border-gray-200">
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
