import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    id: "01",
    question: "What services does GBC provide in the UAE?",
    answer: "GBC provides a wide range of business and corporate services under one roof. Our services include UAE business setup, Mainland and Free Zone company formation, PRO services, visa and immigration support, accounting and VAT services, business centre solutions, trade licensing, and government approvals.",
  },
  {
    id: "02",
    question: "Should I choose a Mainland or Free Zone company in the UAE?",
    answer: "It depends on your business activity, target market and long-term plans. Mainland and Free Zone companies have different requirements, benefits and operating structures. Our consultants can understand your business requirements and help you choose the option that best fits your goals.",
    cta: "Compare Business Setup Options →",
    ctaLink: "/business-setup",
  },
  {
    id: "03",
    question: "Can GBC help me set up a company in Dubai?",
    answer: "Yes. GBC assists entrepreneurs and businesses with company formation and business setup in Dubai and across the UAE. We can guide you through the required documentation, licensing, registration and related government procedures from the initial consultation through completion.",
  },
  {
    id: "04",
    question: "What are PRO services and why does my business need them?",
    answer: "PRO services help businesses manage essential government and administrative procedures, including document processing, government applications, renewals and other corporate requirements. GBC's PRO team handles these processes on your behalf, helping you save time and focus on your core business.",
  },
  {
    id: "05",
    question: "Can GBC handle my company's visa and immigration requirements?",
    answer: "Yes. We provide support for UAE visa and immigration services, including employment, investor, partner and family-related visa requirements. Our team helps with the required documentation and coordinates the relevant procedures based on your specific requirements.",
  },
  {
    id: "06",
    question: "Does GBC provide accounting and VAT services?",
    answer: "Yes. GBC provides accounting and VAT support for UAE businesses, including bookkeeping, VAT-related services and ongoing financial administration. Our team helps businesses keep their financial records organized and meet their applicable compliance requirements.",
  },
  {
    id: "07",
    question: "Can GBC help with trade licence applications and renewals?",
    answer: "Yes. We assist businesses with trade licence applications, renewals, amendments and related government procedures. Our team can help you understand the requirements, prepare the necessary documentation and coordinate the process.",
  },
  {
    id: "08",
    question: "Can I get PRO, visa, accounting and other services from one company?",
    answer: "Yes. One of GBC's key advantages is that businesses can access multiple corporate and administrative services through one trusted partner. Instead of coordinating with different providers, you can work with one team for your business setup, PRO, visa, accounting and other ongoing requirements.",
  },
  {
    id: "09",
    question: "Can GBC help with government approvals and external permits?",
    answer: "Yes. GBC assists businesses with government approvals, external permits, clearances and related regulatory procedures, depending on the business activity and authority involved. Our team helps identify the applicable requirements and coordinates the necessary processes.",
  },
  {
    id: "10",
    question: "How does the GBC business setup process work?",
    answer: "It starts with understanding your business requirements. We then recommend the appropriate setup or service, explain the required documents and applicable costs, and coordinate the necessary applications and government procedures. Once the process is completed, we can continue supporting your business with ongoing corporate requirements.",
  },
  {
    id: "11",
    question: "How much does it cost to set up a business in the UAE?",
    answer: "The cost depends on several factors, including the business activity, jurisdiction, licence type, visa requirements, office requirements and government fees. Rather than giving every business the same price, our team can assess your requirements and provide a solution based on your specific needs.",
    cta: "Get a Free Consultation →",
    ctaLink: "/contact",
  },
  {
    id: "12",
    question: "Why should I choose GBC for my UAE business services?",
    answer: "GBC has 14+/15+ years of experience in business and corporate services, supported by a team of 70+ professionals and experience serving 1,000+ companies. We bring multiple business services together under one partner, with a focus on responsible processing, compliance, follow-up and ongoing client support.",
  }
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
          {item.cta && (
            <div className="mt-4">
              <a href={item.ctaLink || "#"} className="inline-flex items-center text-sm sm:text-base font-medium text-[#6C141E] hover:text-gray-900 transition-colors duration-300">
                {item.cta}
              </a>
            </div>
          )}
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
