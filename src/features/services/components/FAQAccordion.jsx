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
      question: "How do I set up a company in Dubai, UAE?",
      answer: "GBC helps you through the complete company setup process, from choosing the right business structure and activity to company registration, trade licensing, documentation and required government procedures. We support Mainland, Free Zone and Offshore company formation."
    },
    {
      question: "What is the difference between Mainland and Free Zone company setup?",
      answer: "Mainland and Free Zone companies have different licensing structures, business activities and operating considerations. The right option depends on your business activity, target market and future plans. Our team can help you choose the most suitable setup."
    },
    {
      question: "What PRO services does GBC provide in Dubai?",
      answer: "Our PRO team handles government-related applications, document processing, renewals, labour and immigration procedures, and other corporate formalities, helping businesses save time and manage their requirements efficiently."
    },
    {
      question: "Can GBC help with UAE visa and immigration services?",
      answer: "Yes. We assist with UAE visa and immigration requirements, including employment, investor, partner and family visas, along with the necessary documentation and government procedures."
    },
    {
      question: "Does GBC provide accounting and bookkeeping services?",
      answer: "Yes. GBC provides accounting and bookkeeping support for businesses in the UAE, including bookkeeping, VAT-related services and financial record management to help businesses maintain accurate records and meet their requirements."
    },
    {
      question: "Where are GBC's Business Centres located in Dubai?",
      answer: "GBC offers Business Centre solutions in key Dubai locations, including Muhaisnah, Sheikh Zayed Road and Ras Al Khor, providing professional workspace options for businesses across Dubai."
    },
    {
      question: "Can GBC help with government and external approvals?",
      answer: "Yes. We assist businesses with government and external approvals, permits, clearances and related documentation required for specific business activities and regulatory requirements."
    },
    {
      question: "How can I get started with GBC?",
      answer: "Simply contact our team and tell us what your business needs. We'll understand your requirements, explain the relevant options and guide you through the next steps."
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
