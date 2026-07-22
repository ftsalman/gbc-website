import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  {
    title: "100% Foreign Ownership",
    desc: "Recent legal reforms allow expats to retain full 100% ownership of their mainland companies for most commercial activities, eliminating the need for a local Emirati sponsor."
  },
  {
    title: "Zero Personal Income Tax",
    desc: "Maximize your earnings in a highly favorable tax environment. Dubai offers 0% personal income tax and competitive corporate tax rates for qualifying free-zone-like setups."
  },
  {
    title: "Trade Anywhere in the UAE",
    desc: "Unlike free zone entities, a mainland license allows you to trade directly with the local UAE market and open physical offices or retail spaces anywhere in Dubai."
  },
  {
    title: "Government Contracts",
    desc: "Only mainland registered companies have the legal capacity to bid on and secure highly lucrative government and semi-government tenders across the Emirates."
  }
];

export const MainlandBenefits = () => {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".benefit-card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          }
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative py-24 sm:py-32 bg-black text-white overflow-hidden">
      {/* Background Image & Ambient Blur layer for the section */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/services/dubai_glassmorphism_bg.png" 
          alt="Dubai Mainland Background" 
          className="w-full h-full object-cover opacity-50 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 mb-6">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span className="text-xs font-mono tracking-widest uppercase text-white/90">The Advantage</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-white mb-6">
            Why Choose Mainland?
          </h2>
          <p className="text-lg text-white/70 font-light max-w-2xl mx-auto leading-relaxed">
            A Dubai Mainland license offers unparalleled freedom and massive scaling potential for ambitious entrepreneurs and established corporations alike.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {benefits.map((b, i) => (
            <div 
              key={i} 
              className="benefit-card bg-black/20 backdrop-blur-[24px] border border-white/10 p-8 sm:p-10 rounded-[32px] shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] transition-all duration-500 hover:bg-white/5 hover:border-white/20 hover:-translate-y-1 group"
            >
              {/* Glassmorphic Icon Wrapper */}
              <div className="w-14 h-14 bg-white/5 rounded-full flex items-center justify-center mb-8 border border-white/10 shadow-inner transition-colors group-hover:bg-white/10">
                <CheckCircle2 className="w-6 h-6 text-white/90" />
              </div>
              <h3 className="text-2xl font-medium text-white mb-4 tracking-tight">{b.title}</h3>
              <p className="text-white/60 leading-relaxed font-light text-base sm:text-lg">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
