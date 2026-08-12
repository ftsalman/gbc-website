import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Quote } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export const AboutFounderMessage = () => {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".founder-anim",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
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
      className="py-24 sm:py-32 bg-white text-gray-900 border-b border-gray-100 overflow-hidden relative"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image Side */}
          <div className="founder-anim relative aspect-[4/5] w-full max-w-md mx-auto lg:max-w-none group cursor-pointer">
            <div className="absolute inset-0 bg-gray-100 translate-x-4 translate-y-4 transition-transform duration-700 group-hover:translate-x-5 group-hover:translate-y-5"></div>
            
            <div className="relative w-full h-full z-10 overflow-hidden">
              <img
                src="/images/rafeek-about.png" // Using placeholder path based on request
                alt="Rafeek - Founder"
                className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                onError={(e) => {
                  e.target.src = "";
                }}
              />
            </div>
            
            {/* Decorative element */}
            <div className="absolute -bottom-6 -left-6 w-24 h-24 border-l-2 border-b-2 border-bordeaux z-20 pointer-events-none transition-transform duration-700 group-hover:-translate-x-2 group-hover:-translate-y-2"></div>
          </div>

          {/* Text Side */}
          <div className="flex flex-col justify-center">
            <div className="founder-anim flex items-center gap-2 mb-8">
              <span className="text-bordeaux font-bold">//</span>
              <span className="text-sm font-semibold tracking-widest uppercase text-gray-400">
                What The Founder Says
              </span>
            </div>

            <Quote className="founder-anim w-12 h-12 text-gray-200 mb-6" />

            <h2 className="founder-anim text-3xl sm:text-4xl md:text-5xl font-normal leading-tight text-gray-900 mb-8">
              "We believe in empowering entrepreneurs to build their dreams in
              the UAE without the friction of administrative hurdles."
            </h2>

            <p className="founder-anim text-lg text-gray-600 font-light leading-relaxed mb-10">
              We focus on providing expert, transparent and UpToDate services to
              our valuable clints so that they needn’t bother about the hectic
              tasks and they can utilize their valuable time for high value
              activities.
            </p>

            <div className="founder-anim">
              <p className="text-xl font-medium text-gray-900">Rafeek</p>
              <p className="text-gray-500 font-light">Founder & CEO, GBC</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
