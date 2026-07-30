import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const featuresData = [
  {
    id: 1,
    targetNumber: 15,
    stringSuffix: "",
    blueSuffix: "+",
    label: "[01]",
    desc: "Years of experience helping businesses succeed in the UAE.",
  },
  {
    id: 2,
    targetNumber: 5000,
    stringSuffix: "",
    blueSuffix: "+",
    label: "[02]",
    desc: "Businesses successfully established and growing.",
  },
  {
    id: 3,
    targetNumber: 100,
    stringSuffix: "k",
    blueSuffix: "+",
    label: "[03]",
    desc: "Visas, licenses, and government applications processed.",
  },
  {
    id: 4,
    targetNumber: 98,
    stringSuffix: "",
    blueSuffix: "%",
    label: "[04]",
    desc: "Client satisfaction committed to exceptional service.",
  },
];

export const About = () => {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      // Header entrance
      gsap.fromTo(
        ".about-header-animate",
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

      // Cards & Image reveal
      gsap.fromTo(
        ".about-card-animate",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-grid-block",
            start: "top 75%",
          },
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="bg-white text-black py-24 sm:py-32 relative overflow-hidden font-sans"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        {/* Header Section */}
        <div className="text-center max-w-4xl mx-auto mb-16 sm:mb-20 flex flex-col items-center">
          <div className="about-header-animate about-header-item shrink-0 mb-6">
            <span className="font-mono text-sm sm:text-base font-semibold tracking-tight uppercase">
              <span className="text-bordeaux mr-1">//</span>
              <span className="text-gray-400">About GBC Business Connect</span>
            </span>
          </div>

          <h2 className="about-header-animate text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal leading-[1.2] tracking-tight text-gray-900 mb-6">
            15+ Years of Helping Businesses Succeed in the UAE, Your Trusted
            Partner for Every Stage of Your UAE Business Journey
          </h2>

          <p className="text-gray-600 text-lg sm:text-[15px] leading-relaxed font-light max-w-9xl mx-auto">
            For over 15 years, Global Business Connect has been a trusted leader
            in UAE business setup and corporate services. We help entrepreneurs,
            startups, SMEs, and investors with company formation, trade
            licenses, visa processing, PRO services, accounting, corporate tax,
            legal compliance, and ongoing business support. With thousands of
            successful businesses served, our experienced team delivers
            reliable, transparent, and end-to-end solutions, making your UAE
            business journey simple, compliant, and built for long-term success.
          </p>
        </div>

        {/* 3-Column Features Grid */}
        <div className="about-grid-block grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {/* Left Column: Cards 1 & 2 */}
          <div className="flex flex-col gap-6">
            <FeatureCard data={featuresData[0]} />
            <FeatureCard data={featuresData[1]} />
          </div>

          {/* Center Column: Large Image */}
          <div className="about-card-animate h-full w-full rounded-3xl overflow-hidden relative min-h-[400px] lg:min-h-[500px]">
            <img
              src="/dubai_business_setup.png"
              alt="Professional Business"
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Right Column: Cards 3 & 4 */}
          <div className="flex flex-col gap-6">
            <FeatureCard data={featuresData[2]} />
            <FeatureCard data={featuresData[3]} />
          </div>
        </div>
      </div>
    </section>
  );
};

const RollingNumber = ({ value, stringSuffix, blueSuffix }) => {
  const [play, setPlay] = useState(false);
  const containerRef = useRef(null);

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 85%",
      onEnter: () => setPlay(true),
    });
  }, { scope: containerRef });

  const formattedValue = typeof value === 'number' && value >= 1000 
    ? value.toLocaleString('en-US') 
    : value.toString();
  const chars = formattedValue.split('');
  const column = [0,1,2,3,4,5,6,7,8,9, 0,1,2,3,4,5,6,7,8,9];

  return (
    <div ref={containerRef} className="flex overflow-hidden leading-none items-center h-[1em]">
      {chars.map((char, i) => {
        if (!/[0-9]/.test(char)) {
          return <span key={i} className="inline-block h-[1em]">{char}</span>;
        }
        const digit = parseInt(char, 10);
        const targetIndex = play ? 10 + digit : 0;
        
        return (
          <div key={i} className="h-[1em] overflow-hidden inline-block relative">
             <div 
               className="flex flex-col transition-transform duration-[2000ms]" 
               style={{ 
                 transform: `translateY(-${targetIndex * 5}%)`,
                 transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                 transitionDelay: `${i * 100}ms`
               }}
             >
               {column.map((n, idx) => (
                 <span key={idx} className="h-[1em] flex items-center justify-center leading-none">{n}</span>
               ))}
             </div>
          </div>
        );
      })}
      {stringSuffix && <span className="inline-block h-[1em]">{stringSuffix}</span>}
      {blueSuffix && <span className="text-bordeaux inline-block h-[1em]">{blueSuffix}</span>}
    </div>
  );
};

const FeatureCard = ({ data }) => {
  return (
    <div className="about-card-animate flex-1 bg-[#f8f9fc] rounded-2xl p-8 flex flex-col justify-between min-h-[280px] transition-transform duration-300 hover:-translate-y-1">
      <div className="flex justify-between items-start">
        <div className="text-6xl sm:text-7xl font-normal tracking-tighter text-[#1a1a1a]">
          <RollingNumber 
            value={data.targetNumber} 
            stringSuffix={data.stringSuffix} 
            blueSuffix={data.blueSuffix} 
          />
        </div>
        <div className="text-[#9ea4b0] font-mono text-sm mt-2 font-medium">
          {data.label}
        </div>
      </div>
      <div className="text-[#333] text-[16px] leading-relaxed max-w-[85%] mt-12">
        {data.desc}
      </div>
    </div>
  );
};
