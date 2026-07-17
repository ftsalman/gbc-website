import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card } from "../../../../../lib/turtle-ui/components";

gsap.registerPlugin(ScrollTrigger);

// Exact Syncox odometer/slot-machine vertical scrolling number component
const OdometerDigit = ({ digit, direction = "down", delay = 0 }) => {
  const stripRef = useRef(null);

  // We generate a sequence of digits to simulate the mechanical odometer reel
  const sequence =
    direction === "down"
      ? ["9", "8", "7", "6", "5", "4", "3", "2", "1", "0", digit]
      : ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", digit];

  useGSAP(
    () => {
      if (!stripRef.current) return;

      // The final digit sits at the bottom of our strip (index sequence.length - 1)
      // Each number has height 1em (or ~100% of the parent height).
      const totalSteps = sequence.length - 1;

      gsap.fromTo(
        stripRef.current,
        { yPercent: direction === "down" ? 0 : -totalSteps * (100 / sequence.length) },
        {
          yPercent: direction === "down" ? -totalSteps * (100 / sequence.length) : 0,
          duration: 1.6,
          delay: delay,
          ease: "expo.out",
          scrollTrigger: {
            trigger: stripRef.current,
            start: "top 85%",
          },
        }
      );
    },
    { scope: stripRef }
  );

  return (
    <div className="inline-block h-[1em] overflow-hidden relative leading-none align-bottom font-sans font-semibold tracking-tight text-4xl sm:text-5xl md:text-6xl text-white">
      <div ref={stripRef} className="flex flex-col">
        {sequence.map((num, i) => (
          <span key={i} className="h-[1em] flex items-center justify-center">
            {num}
          </span>
        ))}
      </div>
    </div>
  );
};

// Helper to render multiple digits + suffix (e.g. "5", "0", "+")
const OdometerStat = ({ numberStr, suffix }) => {
  const digits = numberStr.split("");
  return (
    <div className="flex items-center">
      {digits.map((char, index) => (
        <OdometerDigit
          key={index}
          digit={char}
          direction={index % 2 === 0 ? "down" : "up"}
          delay={index * 0.1}
        />
      ))}
      <span className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-bordeaux ml-0.5 leading-none">
        {suffix}
      </span>
    </div>
  );
};

const statsData = [
  {
    id: "[01]",
    number: "50",
    suffix: "+",
    description: (
      <>
        Happy clients across various <br />
        industries
      </>
    ),
  },
  {
    id: "[02]",
    number: "100",
    suffix: "+",
    description: (
      <>
        Successfully delivered high- <br />
        quality projects
      </>
    ),
  },
  {
    id: "[03]",
    number: "98",
    suffix: "%",
    description: (
      <>
        Client satisfaction based on <br />
        surveys
      </>
    ),
  },
  {
    id: "[04]",
    number: "30",
    suffix: "%",
    description: (
      <>
        Average client profit growth <br />
        increase
      </>
    ),
  },
];

export const About = () => {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      // Top horizontal header entrance
      gsap.fromTo(
        ".about-header-item",
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

      // Image left reveal
      gsap.fromTo(
        ".about-image-box",
        { x: -40, opacity: 0, scale: 0.96 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-us-block",
            start: "top 75%",
          },
        }
      );

      // Stats 2x2 cards stagger right reveal
      gsap.fromTo(
        ".about-stat-card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-us-block",
            start: "top 75%",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="bg-white text-black py-24 sm:py-36 relative overflow-x-clip font-sans"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        {/* Header exactly matching Syncox horizontal grid layout (.section-heading-horizontal-block) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start mb-16 sm:mb-24">
          {/* Left: // About GBC Business Connect */}
          <div className="about-header-item md:col-span-5 shrink-0 pt-1">
            <span className="font-mono text-sm sm:text-base font-semibold tracking-tight uppercase">
              <span className="text-bordeaux mr-1">//</span>
              <span className="text-gray-400">About GBC Business Connect</span>
            </span>
          </div>

          {/* Right Headline */}
          <div className="about-header-item md:col-span-7">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal leading-[1.2] tracking-tight text-gray-900 max-w-3xl">
              GBC Business Connect isn’t just about change — we’re setting new
              standards with bold creativity and thinking innovation.
            </h2>
          </div>
        </div>

        {/* Body Block matching Syncox (.about-us-block) -> Left Image + Right 2x2 Stats Cards */}
        <div className="about-us-block flex flex-col lg:flex-row justify-between items-stretch lg:items-end gap-10 lg:gap-14">
          {/* Left: Image Wrap matching Syncox (.about-us-image-wrap -> max-width: 438px) */}
          <div className="about-image-box w-full lg:w-[438px] shrink-0 rounded-3xl overflow-hidden h-[280px] sm:h-[280px] lg:h-[280px] relative shadow-2xl border border-white/15 bg-[#121212]">
            <img
              src="/dubai_business_setup.png"
              alt="GBC Business Connect Team & Office"
              className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Right: Stats Grid matching Syncox (.about-us-stats-block) -> 2x2 Grid */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6 lg:max-w-[690px] w-full">
            {statsData.map((stat) => (
              <div key={stat.id} className="about-stat-card h-full">
                <Card className="!p-6 sm:!p-8 !rounded-3xl shadow-none !border !border-white/15 !bg-[#121212] overflow-hidden relative flex flex-col justify-between min-h-[240px] sm:min-h-[270px] h-full transition-all duration-300 hover:!border-white/30 group">
                  {/* Top Row: Odometer Slot-Machine Animated Counter + Card Index */}
                  <div className="flex items-start justify-between w-full">
                    {/* Odometer Animated Number + Suffix */}
                    <div className="about-stat-count-wrap flex items-center">
                      <OdometerStat
                        numberStr={stat.number}
                        suffix={stat.suffix}
                      />
                    </div>

                    {/* Bracketed Index [01]-[04] */}
                    <div className="font-mono text-sm sm:text-base font-medium text-gray-400 group-hover:text-white transition-colors">
                      {stat.id}
                    </div>
                  </div>

                  {/* Bottom Row: Description */}
                  <div className="mt-8 pt-4 border-t border-white/5">
                    <p className="text-gray-300 group-hover:text-white text-base sm:text-lg font-light leading-relaxed transition-colors">
                      {stat.description}
                    </p>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

