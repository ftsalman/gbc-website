import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const CornerBrackets = ({ size = "w-3 h-3", color = "border-white/30" }) => (
  <>
    <span className={`absolute top-0 left-0 ${size} border-t-2 border-l-2 ${color} group-hover:border-bordeaux transition-all duration-300 pointer-events-none`} />
    <span className={`absolute top-0 right-0 ${size} border-t-2 border-r-2 ${color} group-hover:border-bordeaux transition-all duration-300 pointer-events-none`} />
    <span className={`absolute bottom-0 left-0 ${size} border-b-2 border-l-2 ${color} group-hover:border-bordeaux transition-all duration-300 pointer-events-none`} />
    <span className={`absolute bottom-0 right-0 ${size} border-b-2 border-r-2 ${color} group-hover:border-bordeaux transition-all duration-300 pointer-events-none`} />
  </>
);

const services = [
  {
    id: "01",
    title: "Business Setup",
    description:
      "We structure your UAE company from scratch — mainland, free zone, or offshore — with zero hassle and full regulatory compliance.",
    href: "/services",
  },
  {
    id: "02",
    title: "Legal & Compliance",
    description:
      "Specialist corporate governance, cross-border structuring, and licensing work to keep your business operating safely and legally.",
    href: "/services",
  },
  {
    id: "03",
    title: "Corporate Tax",
    description:
      "Former Big-4 expertise ensuring seamless corporate tax optimization, VAT registration, and long-term financial compliance.",
    href: "/services",
  },
  {
    id: "04",
    title: "Government Relations",
    description:
      "Expedited regulatory clearances, golden visa applications, VIP government liaising, and PRO services handled end-to-end.",
    href: "/services",
  },
  {
    id: "05",
    title: "Banking & Finance",
    description:
      "Assisting clients in opening UAE business and personal bank accounts, plus navigating credit facilities and investment vehicles.",
    href: "/services",
  },
  {
    id: "06",
    title: "Strategic Advisory",
    description:
      "High-level market-entry strategy, investor relations, and growth planning for companies and family offices targeting the UAE.",
    href: "/services",
  },
];

export const AboutServices = () => {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".svc-header-item",
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

      gsap.utils.toArray(".svc-card").forEach((card) => {
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
      className="about-services bg-white text-gray-900 py-24 sm:py-36 border-b border-gray-200 font-sans overflow-hidden relative"
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
          <div className="svc-header-item md:col-span-5 pt-1">
            <span className="font-mono text-sm sm:text-base font-semibold tracking-tight uppercase flex items-center gap-2">
              <span className="text-bordeaux mr-0.5">//</span>
              <span className="text-gray-400">How We Help</span>
            </span>
          </div>
          <div className="svc-header-item md:col-span-7">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-gray-900 leading-[1.18]">
              Comprehensive Corporate Services
            </h2>
          </div>
        </div>

        {/* Services Grid — 2 cols desktop, 1 col mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 border-t border-l border-gray-200 bg-[#f9f9f9]">
          {services.map((svc) => (
            <a
              key={svc.id}
              href={svc.href}
              className="svc-card group relative flex flex-col justify-between p-8 sm:p-12 border-r border-b border-gray-200 min-h-[260px] bg-white transition-all duration-500 hover:bg-gray-50 cursor-pointer"
            >
              <CornerBrackets size="w-3.5 h-3.5" color="border-gray-300" />

              {/* Title + Arrow */}
              <div className="flex items-start justify-between gap-4">
                <p className="text-xl sm:text-2xl font-normal text-gray-900 group-hover:text-bordeaux transition-colors duration-300">
                  {svc.title}
                </p>
                <div className="shrink-0 w-10 h-10 border border-gray-200 flex items-center justify-center group-hover:border-bordeaux group-hover:bg-bordeaux/10 transition-all duration-300 relative">
                  <ArrowUpRight className="w-5 h-5 -rotate-0 group-hover:-rotate-12 group-hover:text-bordeaux transition-all duration-300" />
                  <CornerBrackets size="w-2 h-2" color="border-gray-300" />
                </div>
              </div>

              {/* Description */}
              <p className="mt-8 text-gray-600 font-light leading-relaxed text-base sm:text-lg group-hover:text-gray-900 transition-colors duration-300">
                {svc.description}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

