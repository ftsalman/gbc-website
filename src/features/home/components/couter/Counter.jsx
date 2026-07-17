import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { id: 1, label: "Trade Licenses Issued", value: 500, suffix: "+", suffixColor: "text-bordeaux" },
  { id: 2, label: "Happy Clients", value: 2000, suffix: "+", suffixColor: "text-bordeaux" },
  { id: 3, label: "Visas Processed", value: 10, suffix: "K+", suffixColor: "text-bordeaux" },
  { id: 4, label: "Years Experience", value: 15, suffix: "+", suffixColor: "text-bordeaux" },
];

export const Counter = () => {
  const sectionRef = useRef(null);
  const numberRefs = useRef([]);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      // Stagger fade in for stat items
      tl.fromTo(
        ".stat-item",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out" }
      );

      // Animate numbers
      numberRefs.current.forEach((el, index) => {
        if (!el) return;
        const targetValue = stats[index].value;
        const obj = { val: 0 };
        
        gsap.to(obj, {
          val: targetValue,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
          onUpdate: () => {
            if (el) {
              el.innerText = Math.floor(obj.val);
            }
          }
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative py-20 bg-gray-50 border-y border-gray-100 overflow-hidden">
      {/* Graph/Grid Pattern Background */}
      <div className="absolute inset-0 z-0 opacity-[0.04] bg-[linear-gradient(#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] bg-[size:30px_30px]"></div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6 text-center">
          {stats.map((stat, i) => (
            <div key={stat.id} className="stat-item flex flex-col items-center justify-center p-6 rounded-2xl hover:bg-white hover:shadow-[0_10px_30px_rgba(0,0,0,0.03)] transition-all duration-300">
              <div className="flex items-baseline justify-center mb-2">
                <span 
                  ref={el => numberRefs.current[i] = el}
                  className="text-5xl md:text-6xl font-black text-gray-900 tabular-nums tracking-tighter"
                >
                  0
                </span>
                <span className={`text-4xl md:text-5xl font-bold ml-1 ${stat.suffixColor}`}>
                  {stat.suffix}
                </span>
              </div>
              <p className="text-gray-500 font-medium tracking-wider uppercase text-xs mt-3">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
