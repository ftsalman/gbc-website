import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const featuresData = [
  {
    id: 1,
    title: "15+ Years Experience",
    desc: "Trusted UAE business setup experts with 15+ years' experience.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm4.2 14.2L11 11.8V6h1.5v5.2l4.5 4.5-.8.7z" />
      </svg>
    ),
  },
  {
    id: 2,
    title: "5,000+ Businesses Served",
    desc: "Successfully helping 5,000+ businesses establish and grow in the UAE.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
      </svg>
    ),
  },
  {
    id: 3,
    title: "100,000+ Applications Processed",
    desc: "100,000+ visas, licenses, and government applications successfully processed.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
      </svg>
    ),
  },
  {
    id: 4,
    title: "98% Client Satisfaction",
    desc: "Committed to exceptional customer service.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
      </svg>
    ),
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

const FeatureCard = ({ data }) => (
  <div className="about-card-animate flex-1 bg-[#f4f3ee] rounded-3xl p-8 flex flex-col justify-between min-h-[240px] transition-transform duration-300 hover:-translate-y-1">
    <div className="w-12 h-12 rounded-xl bg-[#141b34] text-white flex items-center justify-center mb-12 shadow-sm">
      {data.icon}
    </div>
    <div className="text-gray-600 text-sm sm:text-[15px] leading-relaxed">
      <strong className="text-gray-900 font-semibold mr-1">{data.title}</strong>
      {data.desc}
    </div>
  </div>
);
