import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card } from "../../../../../lib/turtle-ui/components/card/Card";
import { DataList } from "../../../../../lib/turtle-ui/components/list/DataList";

gsap.registerPlugin(ScrollTrigger);

// --- Image Components ---

const MainlandImage = () => (
  <img
    src="https://i.pinimg.com/736x/9e/61/47/9e6147a61e50596327008fd28a0e3586.jpg"
    alt="Mainland Setup"
    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
  />
);

const FreeZoneImage = () => (
  <img
    src="https://i.pinimg.com/1200x/27/e5/d2/27e5d29bfa027b74c55b217ed230e9f8.jpg"
    alt="Free Zone Setup"
    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
  />
);

const OffshoreImage = () => (
  <img
    src="https://i.pinimg.com/1200x/f7/01/2b/f7012bee61b07f384351b561a405d27a.jpg"
    alt="Offshore Setup"
    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
  />
);

// --- Data ---

const bentoData = [
  {
    id: "Mainland",
    title: "Mainland Company Setup",
    description:
      "Ideal for businesses looking to operate across the UAE and access the local market. GBC assists with company formation, trade licensing, documentation and required government procedures.",
    Graphic: MainlandImage,
    buttonLabel: "Explore Mainland Setup →",
    href: "/services/mainland",
  },
  {
    id: "freezone",
    title: "Free Zone Company Setup",
    description:
      "A popular choice for startups, SMEs and international businesses seeking a streamlined UAE company setup. GBC helps with registration, licensing, documentation and the required setup procedures.",
    Graphic: FreeZoneImage,
    buttonLabel: "Explore Free Zone Setup →",
    href: "/business-setup",
  },
  {
    id: "offshore",
    title: "Offshore Company Formation",
    description:
      "Suitable for certain international business, holding and investment structures. GBC provides guidance on the formation process, documentation and requirements based on your intended business structure.",
    Graphic: OffshoreImage,
    buttonLabel: "Explore Offshore Setup →",
    href: "/business-setup",
  },
];

export const BusinessSetup = () => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      // Header Animation
      gsap.fromTo(
        ".bs-header",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ".bs-header-container",
            start: "top 85%",
          },
        },
      );

      // Bento Grid Master Timeline
      const bentoTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".bento-grid",
          start: "top 75%",
        },
      });

      // Reveal cards
      bentoTl.fromTo(
        ".bento-item",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: "expo.out",
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="w-full bg-[#f8f9fa] py-24 sm:py-32 border-t border-gray-100"
    >
      <div className="max-w-[1500px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left Column: Sticky Header & Client Rating Box */}
          <div className="bs-header-container lg:col-span-5 flex flex-col justify-between lg:sticky lg:top-32 self-start gap-12">
            <div>
              <span className="bs-header inline-block text-bordeaux font-mono text-sm font-semibold tracking-wider uppercase mb-3">
                // CHOOSE YOUR BUSINESS SETUP
              </span>
              <h2 className="bs-header text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#111] mb-6 leading-tight">
                Choose the Right Business Setup in the UAE.
              </h2>
              <p className="bs-header text-gray-600 text-base sm:text-lg leading-relaxed mb-10">
                Every business has different requirements. GBC helps you
                understand your Mainland, Free Zone or Offshore options and
                choose a setup that fits your business activity, ownership and
                future plans.
              </p>
            </div>

            {/* Client Rating & Avatars */}
            <div className="bs-header pt-8 border-t border-gray-200/80 flex flex-col gap-3">
              <div className="flex items-center -space-x-2.5 overflow-hidden">
                <img
                  className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
                  alt="Client 1"
                />
                <img
                  className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
                  alt="Client 2"
                />
                <img
                  className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop"
                  alt="Client 3"
                />
                <img
                  className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop"
                  alt="Client 4"
                />
                <div className="inline-flex items-center justify-center h-10 w-10 rounded-full ring-2 ring-white bg-blue-600 text-white text-xs font-bold shrink-0 shadow-sm">
                  You?
                </div>
              </div>
              <div>
                <div className="text-xl font-bold text-[#111]">4.9/5</div>
                <div className="text-sm text-gray-500 font-medium">
                  Average rating from our clients
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Vertical Cards Stack */}
          <div className="lg:col-span-7">
            <DataList
              data={bentoData}
              className="bento-grid flex flex-col gap-6 sm:gap-8 w-full"
              render={(item) => (
                <Card
                  key={item.id}
                  className="bento-item bg-white border border-gray-200/80 rounded-[28px] h-[480px] sm:h-[500px] flex flex-col group relative overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] transition-all duration-300"
                >
                  {/* Top Graphic Area */}
                  <div className="h-[280px] w-full relative bg-[#fafafa] rounded-t-[28px] overflow-hidden border-b border-gray-100">
                    <item.Graphic />
                  </div>

                  {/* Bottom Content Area */}
                  <div className="flex-1 px-8 pt-6 pb-8 flex flex-col justify-start bg-white">
                    <h4 className="text-xl font-bold text-gray-900 mb-2.5 tracking-tight">
                      {item.title}
                    </h4>
                    <p className="text-sm text-gray-500 leading-relaxed font-medium pr-2 mb-auto">
                      {item.description}
                    </p>

                    {item.buttonLabel && (
                      <div className="pt-6 mt-auto">
                        <button 
                          className="text-[#111] font-semibold text-[15px] flex items-center hover:text-gray-500 transition-colors cursor-pointer"
                          onClick={() => window.location.href = item.href || '/business-setup'}
                        >
                          {item.buttonLabel}
                        </button>
                      </div>
                    )}
                  </div>
                </Card>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
