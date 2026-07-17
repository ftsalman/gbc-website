import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "../../../../../lib/turtle-ui/components";

gsap.registerPlugin(ScrollTrigger);

export const Connect = () => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".cta-content-item",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative bg-black text-white pt-28 pb-20 sm:pt-36 sm:pb-28 overflow-hidden font-sans border-t border-white/15"
    >
      {/* Background Image: public/images/hero.jpeg exact match to Syncox footer background texture */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <img
          src="/images/hero.jpeg"
          alt="Footer CTA Background"
          className="w-full h-full object-cover object-center pointer-events-none scale-105"
        />
        {/* Dark contrast gradient overlays ensuring exact legibility while retaining the bordeaux bloom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/10 pointer-events-none" />
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />
      </div>

      {/* Main Container matching exact Syncox .cta-layout */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        <div className="max-w-2xl flex flex-col items-start">
          {/* Top Tag: // Connect With Us */}
          <div className="cta-content-item mb-6">
            <span className="font-mono text-sm sm:text-base font-semibold tracking-tight uppercase">
              <span className="text-bordeaux mr-1">//</span>
              <span className="text-gray-400">Connect With Us</span>
            </span>
          </div>

          {/* Headline matching Syncox Let's Discuss Your Next Project */}
          <h2 className="cta-content-item text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-white tracking-tight leading-[1.1] mb-6">
            Let&apos;s Discuss Your Next Business
          </h2>

          {/* Description */}
          <p className="cta-content-item text-gray-300 text-lg sm:text-xl font-light leading-relaxed mb-10">
            Answer 6 questions and we&apos;ll tell you exactly what your
            corporate structure in the UAE needs to succeed.
          </p>

          {/* Corner Bracket CTA Button */}
          <div className="cta-content-item">
            <Button variant="corner" size="lg">
             Get Started
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
