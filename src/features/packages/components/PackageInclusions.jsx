import React, { useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export const PackageInclusions = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const inclusions = [
    {
      title: "Licensing & Approvals",
      details: "We handle 100% of the red tape. From initial name reservation and activity selection to securing initial approvals from the DED or relevant Freezone Authority, we ensure your trade license is issued swiftly and legally."
    },
    {
      title: "Residency & Golden Visas",
      details: "Complete processing for investor, partner, and employee visas. For qualifying investors, we fast-track the 10-year UAE Golden Visa application including medical fitness and Emirates ID typing."
    },
    {
      title: "Corporate Banking Introduction",
      details: "Leverage our strong relationships with tier-1 UAE banks (Emirates NBD, Mashreq, Wio). We prepare your business plan, arrange introductions, and guide you through the strict KYC compliance requirements."
    },
    {
      title: "Accounting & Tax Registration",
      details: "Immediate registration for Corporate Tax and VAT with the Federal Tax Authority (FTA). You also get initial bookkeeping setup to ensure you remain perfectly compliant from day one."
    }
  ];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="w-full py-24 px-6 md:px-12 lg:px-24 bg-white text-gray-900 border-t border-gray-100">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-16">
        
        <div className="w-full md:w-1/3">
          <h2 className="text-3xl md:text-5xl font-serif mb-6 leading-tight">Every detail, handled.</h2>
          <p className="text-lg text-gray-600">
            Our packages aren't just pieces of paper. They are end-to-end operational blueprints designed to launch your business without friction.
          </p>
        </div>

        <div className="w-full md:w-2/3">
          {inclusions.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="border-b border-gray-200">
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full py-8 flex justify-between items-center text-left focus:outline-none group"
                >
                  <span className={`text-2xl md:text-3xl font-medium transition-colors ${isOpen ? 'text-black' : 'text-gray-400 group-hover:text-gray-600'}`}>
                    {item.title}
                  </span>
                  <span className={`text-2xl transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>
                    +
                  </span>
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-64 opacity-100 mb-8' : 'max-h-0 opacity-0'}`}
                >
                  <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
                    {item.details}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
