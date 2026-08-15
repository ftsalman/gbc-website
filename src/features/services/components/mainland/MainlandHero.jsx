import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Button } from "../../../../../lib/turtle-ui/components/button/Button";

export const MainlandHero = () => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(
        ".hero-anim",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.15 },
      );
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[90vh] bg-black text-white flex items-center justify-center overflow-hidden pt-28 pb-20"
    >
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero.jpeg"
          alt="Dubai Mainland Business Setup"
          className="w-full h-full object-cover object-center opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 w-full text-center lg:text-left flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1">
          <div className="hero-anim mb-6 flex items-center justify-center lg:justify-start gap-2">
            <span className="text-[#6C141E] font-mono font-medium text-lg">
              //
            </span>
            <span className="font-mono text-sm tracking-widest uppercase font-semibold text-white/80">
              MAINLAND BUSINESS SETUP
            </span>
          </div>

          <h1 className="hero-anim text-5xl sm:text-6xl lg:text-[80px] font-medium tracking-tight leading-tight mb-8">
            Mainland Company
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-gray-500">
              Formation in Dubai
            </span>
          </h1>

          <p className="hero-anim text-lg sm:text-xl text-gray-300 font-light leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-10">
            Set up your UAE Mainland company with professional support from
            business activity selection and trade licensing to government
            approvals and related documentation. GBC helps make your company
            formation process simple and organized.
          </p>

          <div className="hero-anim flex flex-wrap items-center justify-center lg:justify-start gap-4">
            <Button
              variant="corner"
              size="lg"
              onClick={() => (window.location.href = "/contact")}
            >
              Get Free Consultation →
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white/20 hover:bg-white/10"
              onClick={() => (window.location.href = "/business-setup")}
            >
              Calculate Setup Cost
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
