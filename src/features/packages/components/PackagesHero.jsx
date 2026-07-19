import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export const PackagesHero = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.from(".hero-text", {
      y: 40,
      opacity: 0,
      duration: 1.2,
      stagger: 0.2,
      ease: "power3.out",
      delay: 0.2
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="w-full pt-40 pb-20 px-6 md:px-12 lg:px-24 bg-[#FAF9F6] text-gray-900 flex flex-col items-center justify-center text-center">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <span className="hero-text text-sm font-semibold tracking-widest uppercase mb-6 text-gray-500">
          Tailored Solutions
        </span>
        <h1 className="hero-text text-5xl md:text-7xl font-serif tracking-tight leading-[1.1] mb-8">
          Elevated packages for exceptional businesses.
        </h1>
        <p className="hero-text text-xl text-gray-600 max-w-2xl leading-relaxed">
          We don't do generic pricing tables. We build comprehensive, premium bundles designed to handle the complexity of UAE business setup so you can focus on growth.
        </p>
      </div>
    </section>
  );
};
