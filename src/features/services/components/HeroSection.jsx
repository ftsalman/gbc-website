import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../../../lib/turtle-ui/components/button/Button";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export const HeroSection = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline();
    
    // Animate eyebrow
    tl.from(".hero-eyebrow", {
      y: 20,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out"
    });

    // Animate headline words (staggered reveal from overflow-hidden mask)
    tl.from(".hero-headline-word", {
      y: "110%",
      duration: 0.8,
      stagger: 0.05,
      ease: "power4.out"
    }, "-=0.3");

    // Animate CTA and subtext
    tl.from(".hero-cta, .hero-subtext", {
      y: 20,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out"
    }, "-=0.4");
  }, { scope: containerRef });

  const headline = "Creative pros run their businesses with Global Business Connect";
  const words = headline.split(" ");

  return (
    <section ref={containerRef} className="relative w-full pt-32 pb-20 px-6 md:px-12 lg:px-24 flex flex-col items-center justify-center text-center bg-[#fffbf0]">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Eyebrow */}
        <p className="hero-eyebrow text-xs md:text-sm font-semibold tracking-widest text-gray-500 uppercase mb-6">
          Creative Services
        </p>

        {/* Headline */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#0a0a0a] leading-[1.1] mb-8 flex flex-wrap justify-center gap-x-4 gap-y-2">
          {words.map((word, idx) => (
            <span key={idx} className="overflow-hidden inline-block pb-1">
              <span className="hero-headline-word inline-block">{word}</span>
            </span>
          ))}
        </h1>

        {/* Call to Action */}
        <Button
          size="lg"
          variant="primary"
          className="hero-cta bg-[#0a0a0a] text-white hover:bg-gray-800 transition-colors px-8 py-4 rounded-full font-medium text-lg mb-4"
          onClick={() => (window.location.href = "/contact")}
        >
          Get started
        </Button>

        {/* Subtext */}
        <p className="hero-subtext text-sm text-gray-500 font-medium">
          Book your free consultation today.
        </p>
      </div>
    </section>
  );
};
