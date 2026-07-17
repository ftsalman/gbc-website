import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Card,
  DataList,
  Button,
} from "../../../../../lib/turtle-ui/components";

gsap.registerPlugin(ScrollTrigger);

const worksData = [
  {
    id: "01.",
    title: (
      <>
        Mainland Company Setup <br />
        in 48 Hours - <br />
        100% Foreign Ownership &amp; <br />
        Trade License Approval
      </>
    ),
    year: "2025",
    buttonText: "View Details",
    logoText: "NEXUS GROUP",
    image: "/dubai_business_setup.png",
  },
  {
    id: "02.",
    title: (
      <>
        Offshore Asset Protection &amp; <br />
        Holding Company Formation <br />
        in DIFC &amp; ADGM
      </>
    ),
    year: "2024",
    buttonText: "View Details",
    logoText: "SOVEREIGN WEALTH",
    image:
      "https://i.pinimg.com/1200x/45/8a/8a/458a8a52f13186f67ecfe80fc12971a7.jpg",
  },
  {
    id: "03.",
    title: (
      <>
        Multi-Currency Corporate Banking <br />
        &amp; VIP Golden Visa Processing <br />
        for Executive Team
      </>
    ),
    year: "2024",
    buttonText: "View Details",
    logoText: "AURA CAPITAL",
    image:
      "https://i.pinimg.com/1200x/6d/9a/8f/6d9a8f89b95887bf9ebb27ceefa78b47.jpg",
  },
];

export const Works = () => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      // Top Header Animation
      gsap.fromTo(
        ".works-header-element",
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
        },
      );

      // Staggered card entrance with subtle parallax / overlapped reveal
      gsap.fromTo(
        ".sticky-card-wrapper",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          },
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="bg-black text-white py-24 sm:py-36 relative overflow-x-clip font-sans"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        {/* Top Header exactly matching website horizontal grid type setting */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start mb-16 sm:mb-24">
          {/* Left: // Selected Works */}
          <div className="works-header-element md:col-span-5 shrink-0">
            <span className="font-mono text-sm sm:text-base font-semibold tracking-tight uppercase">
              <span className="text-bordeaux mr-1">//</span>
              <span className="text-gray-400">Selected Works</span>
            </span>
          </div>

          {/* Right: Proven Results, Stunning Designs */}
          <div className="works-header-element md:col-span-7">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-white leading-[1.1]">
              Proven Results, <br />
              Stunning Designs
            </h2>
          </div>
        </div>

        {/* Overlapped Scrolling Cards Container using custom DataList & Card components */}
        <div className="relative pb-16">
          <DataList
            data={worksData}
            className="!flex !flex-col !gap-14 !grid-cols-none w-full"
            render={(work, index) => (
              <div
                key={work.id}
                className="sticky-card-wrapper sticky top-[76px] sm:top-[96px] w-full h-[600px] sm:h-[650px]"
                style={{
                  zIndex: index + 1,
                }}
              >
                <Card className="!p-8 sm:!p-12 md:!p-16 !rounded-3xl !border !border-white/15 !shadow-none !bg-[#121212] overflow-hidden relative flex flex-col justify-between h-full w-full  transition-all duration-500 group cursor-pointer">
                  {/* Background Image with smooth hover scale (Syncox .work-thumbnail) */}
                  <img
                    src={work.image}
                    alt={`Work ${work.id}`}
                    className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out z-0 pointer-events-none"
                  />

                  {/* Dark contrast overlays matching Syncox .bg-overlay.is-darker */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/80 z-10 pointer-events-none transition-opacity duration-500 group-hover:opacity-90" />

                  {/* Top Row: Number, Title, Year */}
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-6 relative z-20 w-full">
                    {/* Left Number & Title Wrapper */}
                    <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-8 md:gap-12 flex-1">
                      <div className="font-mono text-lg sm:text-xl font-medium text-white/90 shrink-0 pt-1">
                        {work.id}
                      </div>
                      <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-[32px] font-medium leading-[1.35] text-white tracking-tight max-w-2xl">
                        {work.title}
                      </h3>
                    </div>

                    {/* Right Year */}
                    <div className="font-mono text-base sm:text-lg font-medium text-white/90 self-start shrink-0">
                      {work.year}
                    </div>
                  </div>

                  {/* Bottom Row: View Details Button & Logo Text */}
                  <div className="flex items-end justify-between relative z-20 w-full mt-auto pt-10">
                    {/* Exact Corner Bracket Button matching tech UI setting */}
                    <Button variant="corner" size="sm">
                      {work.buttonText}
                    </Button>

                    {/* Right Logo/Brand Text */}
                    <div className="font-sans font-black text-2xl sm:text-3xl tracking-tighter uppercase text-white/90">
                      {work.logoText}
                    </div>
                  </div>
                </Card>
              </div>
            )}
          />
        </div>

        {/* Bottom CTA Button matching exact corner bracket setting */}
        <div className="flex justify-center mt-12 sm:mt-16">
          <Button variant="corner" size="lg">
            View All Works
          </Button>
        </div>
      </div>
    </section>
  );
};
