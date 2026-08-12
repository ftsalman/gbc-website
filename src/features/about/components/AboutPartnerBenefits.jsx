import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CornerBrackets = ({ size = "w-3 h-3", color = "border-white/30" }) => (
  <>
    <span className={`absolute top-0 left-0 ${size} border-t-2 border-l-2 ${color} group-hover:border-bordeaux transition-all duration-300 pointer-events-none`} />
    <span className={`absolute top-0 right-0 ${size} border-t-2 border-r-2 ${color} group-hover:border-bordeaux transition-all duration-300 pointer-events-none`} />
    <span className={`absolute bottom-0 left-0 ${size} border-b-2 border-l-2 ${color} group-hover:border-bordeaux transition-all duration-300 pointer-events-none`} />
    <span className={`absolute bottom-0 right-0 ${size} border-b-2 border-r-2 ${color} group-hover:border-bordeaux transition-all duration-300 pointer-events-none`} />
  </>
);

const benefits = [
  {
    id: "01",
    title: "Fast & Accurate Processing",
    description:
      "Our experienced team focuses on efficient and accurate handling of business and government-related processes.",
  },
  {
    id: "02",
    title: "Complete Government Compliance Support",
    description:
      "We manage essential government department and corporate compliance requirements, helping businesses stay organized and compliant.",
  },
  {
    id: "03",
    title: "Wide Range of Corporate Services",
    description:
      "From business setup and PRO services to visas and other corporate requirements, access multiple services through one trusted partner.",
  },
  {
    id: "04",
    title: "Experienced & Knowledgeable Team",
    description:
      "Our 70+ professionals bring specialized knowledge across different areas of business and government services.",
  },
];

export const AboutPartnerBenefits = () => {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".benefit-header-item",
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      gsap.utils.toArray(".benefit-card").forEach((card) => {
        gsap.fromTo(
          card,
          { y: 45, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
            },
          }
        );
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="about-partner-benefits bg-white text-gray-900 py-20 sm:py-28 border-t border-gray-200 font-sans overflow-hidden relative"
    >
      {/* Background grid lines */}
      <div className="absolute inset-0 grid grid-cols-6 md:grid-cols-12 pointer-events-none z-0">
        {Array.from({ length: 12 }).map((_, idx) => (
          <div key={idx} className="border-r border-gray-100 h-full" />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start mb-16 sm:mb-24">
          <div className="benefit-header-item md:col-span-5 pt-1">
            <span className="font-mono text-sm sm:text-base font-semibold tracking-tight uppercase flex items-center gap-2">
              <span className="text-bordeaux mr-0.5">//</span>
              <span className="text-gray-400">Everything Your Business Needs</span>
            </span>
          </div>
          <div className="benefit-header-item md:col-span-7">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-gray-900 leading-[1.18]">
              Under One Partner
            </h2>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 border-t border-l border-gray-200 bg-[#f9f9f9]">
          {benefits.map((benefit) => (
            <div
              key={benefit.id}
              className="benefit-card group relative flex flex-col p-8 sm:p-12 border-r border-b border-gray-200 min-h-[260px] bg-white transition-all duration-500 hover:bg-gray-50"
            >
              <CornerBrackets size="w-3.5 h-3.5" color="border-gray-300" />

              <div className="flex items-start justify-between gap-4">
                <p className="text-xl sm:text-2xl font-normal text-gray-900 group-hover:text-bordeaux transition-colors duration-300">
                  {benefit.title}
                </p>
                <div className="shrink-0 font-mono text-sm sm:text-base text-gray-400">
                  [{benefit.id}]
                </div>
              </div>

              <p className="mt-8 text-gray-600 font-light leading-relaxed text-base sm:text-lg group-hover:text-gray-900 transition-colors duration-300">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
