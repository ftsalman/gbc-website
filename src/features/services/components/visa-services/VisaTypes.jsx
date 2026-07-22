import React, { useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { VISA_TYPES } from "../../constants/constants.js";

gsap.registerPlugin(ScrollTrigger);

export const VisaTypes = () => {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".visa-image-card",
        { y: 40, opacity: 0 },
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
    <section ref={sectionRef} className="py-24 sm:py-32 bg-white text-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {VISA_TYPES.map((v, i) => (
            <Link 
              to={`/services/visa/${v.id}`}
              key={i} 
              className="visa-image-card group cursor-pointer flex flex-col gap-4"
            >
              <div className="w-full aspect-[4/4.5] rounded-[24px] overflow-hidden bg-gray-100">
                <img 
                  src={v.img} 
                  alt={v.title}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
              </div>
              
              <div className="flex justify-between items-center px-1">
                <h3 className="text-xl sm:text-2xl font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                  {v.title}
                </h3>
                <span className="text-gray-500 group-hover:text-blue-600 transition-colors duration-300">
                  <ArrowRight className="w-6 h-6 group-hover:hidden" strokeWidth={1.5} />
                  <ArrowUpRight className="w-6 h-6 hidden group-hover:block" strokeWidth={1.5} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
