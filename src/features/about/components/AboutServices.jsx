import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const CornerBrackets = ({ size = "w-3 h-3", color = "border-white/30" }) => (
  <>
    <span
      className={`absolute top-0 left-0 ${size} border-t-2 border-l-2 ${color} group-hover:border-bordeaux transition-all duration-300 pointer-events-none`}
    />
    <span
      className={`absolute top-0 right-0 ${size} border-t-2 border-r-2 ${color} group-hover:border-bordeaux transition-all duration-300 pointer-events-none`}
    />
    <span
      className={`absolute bottom-0 left-0 ${size} border-b-2 border-l-2 ${color} group-hover:border-bordeaux transition-all duration-300 pointer-events-none`}
    />
    <span
      className={`absolute bottom-0 right-0 ${size} border-b-2 border-r-2 ${color} group-hover:border-bordeaux transition-all duration-300 pointer-events-none`}
    />
  </>
);

const services = [
  {
    id: "01",
    title: "Business Setup",
    description:
      "Start your UAE business with the right company structure. We provide Mainland, Free Zone and Offshore company formation support, including licensing, documentation and registration guidance from start to finish.",
    cta: "Explore Business Setup",
    href: "/services",
  },
  {
    id: "02",
    title: "PRO Services",
    description:
      "Simplify your day-to-day government procedures with professional PRO support. From document clearing and government applications to renewals and corporate requirements, our team manages the process efficiently on your behalf.",
    cta: "Explore PRO Services",
    href: "/services",
  },
  {
    id: "03",
    title: "Visa & Immigration Services",
    description:
      "Manage your UAE visa and immigration requirements with expert support. We assist with employment, investor, partner, family and other visa-related processes, including the required documentation and government procedures.",
    cta: "Explore Visa Services",
    href: "/services",
  },
  {
    id: "04",
    title: "Accounting & VAT Services",
    description:
      "Keep your business finances organized and compliant with professional bookkeeping, VAT registration, VAT filing and accounting support tailored to your business requirements in the UAE.",
    cta: "Explore Accounting",
    href: "/services",
  },
  {
    id: "05",
    title: "Business Centre Services",
    description:
      "Find the right business workspace for your company with flexible office and business centre solutions. We support businesses with professional office facilities designed to meet their operational and business setup requirements.",
    cta: "Explore Business Centres",
    href: "/services",
  },
  {
    id: "06",
    title: "Government Approvals & External Services",
    description:
      "Get professional assistance with external government approvals, permits, clearances and regulatory procedures required for your business. Our team coordinates the necessary processes to help you complete requirements accurately and efficiently.",
    cta: "Explore Government Services",
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
        },
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
          },
        );
      });
    },
    { scope: sectionRef },
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

            <p className="toolbar-desc mt-6 max-w-sm sm:max-w-xl text-[20px] sm:text-base text-gray-500 font-light leading-relaxed">
              From setting up your company and managing PRO requirements to
              visas, accounting, business centres and government approvals, GBC
              provides essential business services through one experienced team
              across the UAE.
            </p>
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
              <div className="mt-8 flex flex-col flex-grow justify-between">
                <p className="text-gray-600 font-light leading-relaxed text-base sm:text-lg group-hover:text-gray-900 transition-colors duration-300 mb-8">
                  {svc.description}
                </p>
                <div className="flex items-center gap-2 text-sm sm:text-base font-medium text-gray-900 group-hover:text-bordeaux transition-colors duration-300">
                  <span>{svc.cta}</span>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">&rarr;</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
