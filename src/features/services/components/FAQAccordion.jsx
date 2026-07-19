import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";

export const FAQAccordion = () => {
  const [openFAQ, setOpenFAQ] = useState(null);
  const [openSupport, setOpenSupport] = useState(null);
  
  // Refs for the answer containers
  const faqRefs = useRef([]);
  const supportRefs = useRef([]);

  const faqs = [
    {
      question: "How long does it take to set up a company in the UAE?",
      answer: "The timeline varies depending on the jurisdiction and license type. Freezone companies can often be set up within 3-5 working days, while mainland companies may take 1-3 weeks due to additional government approvals."
    },
    {
      question: "Do I need a local sponsor to start a business?",
      answer: "Recent legislative changes allow 100% foreign ownership for most commercial and industrial activities in the mainland. However, some strategic sectors still require a local partner. Freezones always offer 100% foreign ownership."
    },
    {
      question: "What is the cost of setting up a business?",
      answer: "Costs depend on the jurisdiction, visa allocations, and license type. We offer tailored packages that cover license fees, registration, and initial visa processing without hidden costs."
    },
    {
      question: "Can I open a corporate bank account easily?",
      answer: "Yes, our team has established relationships with major UAE banks and will guide you through the compliance requirements to ensure a smooth account opening process."
    }
  ];

  const support = [
    {
      question: "Help Center",
      answer: "Get help from our dedicated Customer Care team, available to answer your legal, compliance, and setup questions."
    },
    {
      question: "Consultations",
      answer: "Schedule a free online session with our business setup experts to define your roadmap."
    }
  ];

  const toggleFAQ = (idx) => {
    setOpenFAQ(openFAQ === idx ? null : idx);
  };

  const toggleSupport = (idx) => {
    setOpenSupport(openSupport === idx ? null : idx);
  };

  // Animate FAQ heights
  useEffect(() => {
    faqs.forEach((_, idx) => {
      if (faqRefs.current[idx]) {
        if (openFAQ === idx) {
          gsap.to(faqRefs.current[idx], { height: "auto", opacity: 1, duration: 0.5, ease: "power3.out", marginTop: 16 });
        } else {
          gsap.to(faqRefs.current[idx], { height: 0, opacity: 0, duration: 0.4, ease: "power3.inOut", marginTop: 0 });
        }
      }
    });
  }, [openFAQ, faqs.length]);

  // Animate Support heights
  useEffect(() => {
    support.forEach((_, idx) => {
      if (supportRefs.current[idx]) {
        if (openSupport === idx) {
          gsap.to(supportRefs.current[idx], { height: "auto", opacity: 1, duration: 0.5, ease: "power3.out", marginTop: 16 });
        } else {
          gsap.to(supportRefs.current[idx], { height: 0, opacity: 0, duration: 0.4, ease: "power3.inOut", marginTop: 0 });
        }
      }
    });
  }, [openSupport, support.length]);

  return (
    <section className="relative w-full py-24 bg-white text-gray-900">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        
        {/* Main Header */}
        <h2 className="text-3xl font-bold mb-12 border-b border-gray-200 pb-4">
          Frequently asked questions
        </h2>
        
        {/* FAQ Items */}
        <div className="space-y-4 mb-16">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border-b border-gray-200 pb-4">
              <button 
                onClick={() => toggleFAQ(idx)}
                className="w-full flex justify-between items-center text-left py-2 hover:text-[#6C141E] transition-colors"
              >
                <span className="text-xl md:text-2xl font-medium pr-8">{faq.question}</span>
                <span className={`text-2xl transition-transform duration-300 ${openFAQ === idx ? "rotate-45" : ""}`}>
                  +
                </span>
              </button>
              <div 
                ref={el => faqRefs.current[idx] = el}
                className="overflow-hidden h-0 opacity-0"
              >
                <p className="text-gray-600 text-lg leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Support Header */}
        <h2 className="text-3xl font-bold mb-12 border-b border-gray-200 pb-4">
          Support & Resources
        </h2>
        
        {/* Support Items */}
        <div className="space-y-4">
          {support.map((item, idx) => (
            <div key={idx} className="border-b border-gray-200 pb-4">
              <button 
                onClick={() => toggleSupport(idx)}
                className="w-full flex justify-between items-center text-left py-2 hover:text-[#6C141E] transition-colors"
              >
                <span className="text-xl md:text-2xl font-medium pr-8">{item.question}</span>
                <span className={`text-2xl transition-transform duration-300 ${openSupport === idx ? "rotate-45" : ""}`}>
                  +
                </span>
              </button>
              <div 
                ref={el => supportRefs.current[idx] = el}
                className="overflow-hidden h-0 opacity-0"
              >
                <p className="text-gray-600 text-lg leading-relaxed">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
