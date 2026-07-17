import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card, DataList, Button, Tag } from "../../../../../lib/turtle-ui/components";

gsap.registerPlugin(ScrollTrigger);

const servicesData = [
  {
    id: "01",
    title: "Business Setup",
    description: "Complete mainland, freezone, and offshore company formation across Dubai and the UAE with 100% foreign ownership.",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "02",
    title: "PRO Services",
    description: "Dedicated government relations, document clearance, legal approvals, and corporate compliance managed with precision.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "03",
    title: "Visa & Immigration",
    description: "Expedited investor visas, golden visas, employment visas, and family residency processing with VIP assistance.",
    image: "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "04",
    title: "Trade Licensing",
    description: "Hassle-free trade license issuance, renewals, commercial activity amendments, and corporate bank account assistance.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
  },
];

export const Service = () => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      // Entrance animation for header
      gsap.fromTo(
        ".service-header-element",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );

      // Entrance animation for service rows
      gsap.fromTo(
        ".service-row-item",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="bg-[#fff] text-[#111] py-24 sm:py-36 relative overflow-x-clip font-sans"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        {/* Header exactly matching Syncox .section-heading-horizontal-block.is-services layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start mb-16 sm:mb-24">
          {/* Left: // Services */}
          <div className="service-header-element md:col-span-5 shrink-0">
            <span className="font-mono text-sm sm:text-base font-semibold tracking-tight uppercase">
              <span className="text-bordeaux mr-1">//</span>
              <span className="text-gray-500">Services</span>
            </span>
          </div>

          {/* Right: Our Services */}
          <div className="service-header-element md:col-span-7">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-[#18181B] leading-[1.1]">
              Our Services
            </h2>
          </div>
        </div>

        {/* Horizontal Services Strips exactly matching Syncox .services-collection-list */}
        <div className="border-t border-gray-200/80">
          <DataList
            data={servicesData}
            className="!flex !flex-col !gap-0 !grid-cols-none w-full"
            render={(service) => (
              <div key={service.id} className="service-row-item w-full">
                <Card
                  className="!p-0 !rounded-none !border-0 !border-b !border-gray-200/80 !shadow-none !bg-transparent transition-all duration-500 relative overflow-hidden group cursor-pointer block"
                >
                  {/* Full-width Thumbnail & Overlay revealed on hover (Syncox .services-list-item-thumbnail) */}
                  <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover object-center transition-all duration-700 ease-out opacity-0 scale-105 group-hover:opacity-100 group-hover:scale-100"
                    />
                    {/* Darker overlay so white text pops clearly on hover */}
                    <div className="absolute inset-0 bg-black/75 transition-opacity duration-700 opacity-0 group-hover:opacity-100" />
                  </div>

                  {/* Strip Content Area */}
                  <div className="relative z-10 py-8 sm:py-10 px-6 sm:px-12 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-colors duration-500">
                    {/* Left: Serial Number & Title + Summary */}
                    <div className="flex items-start md:items-center gap-6 sm:gap-10 md:gap-14 flex-1">
                      <span className="font-mono text-base sm:text-lg w-8 sm:w-12 pt-1 md:pt-0 shrink-0 text-gray-400 group-hover:text-white/70 transition-colors duration-500">
                        {service.id}
                      </span>
                      <div className="flex flex-col justify-center">
                        <h3 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-[#111] group-hover:text-white transition-colors duration-500">
                          {service.title}
                        </h3>
                        {/* Summary always visible underneath title (Syncox .service-summary-wrap) */}
                        <p className="text-sm sm:text-base leading-relaxed text-gray-500 group-hover:text-white/80 transition-colors duration-500 mt-2 max-w-xl font-medium">
                          {service.description}
                        </p>
                      </div>
                    </div>

                    {/* Right: Exact Corner Bracket Box matching Syncox / input_file_0.png */}
                    <div className="flex items-center justify-end shrink-0">
                      <div className="relative w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center transition-all duration-500 text-[#111] group-hover:text-white shrink-0">
                        {/* Inner border line */}
                        <div className="absolute inset-0 border border-gray-200 group-hover:border-white/20 transition-colors duration-500" />

                        {/* Top-Left Corner Bracket */}
                        <span className="absolute -top-[1px] -left-[1px] w-2.5 h-2.5 border-t-2 border-l-2 border-[#111] group-hover:border-white transition-colors duration-500" />

                        {/* Top-Right Corner Bracket */}
                        <span className="absolute -top-[1px] -right-[1px] w-2.5 h-2.5 border-t-2 border-r-2 border-[#111] group-hover:border-white transition-colors duration-500" />

                        {/* Bottom-Left Corner Bracket */}
                        <span className="absolute -bottom-[1px] -left-[1px] w-2.5 h-2.5 border-b-2 border-l-2 border-[#111] group-hover:border-white transition-colors duration-500" />

                        {/* Bottom-Right Corner Bracket */}
                        <span className="absolute -bottom-[1px] -right-[1px] w-2.5 h-2.5 border-b-2 border-r-2 border-[#111] group-hover:border-white transition-colors duration-500" />

                        {/* Diagonal Up-Right Arrow Icon */}
                        <svg
                          className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 17L17 7M17 7H7M17 7V17"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            )}
          />
        </div>
      </div>
    </section>
  );
};
