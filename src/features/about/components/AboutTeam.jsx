import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const teamMembers = [
  {
    id: "01",
    name: "Avery K.",
    role: "Chief Operating Officer",
    image: "/images/blogs/small1.png",
  },
  {
    id: "02",
    name: "Tyler P.",
    role: "Founder & CEO",
    image: "/images/blogs/small1.png",
  },
  {
    id: "03",
    name: "Morgan T.",
    role: "Lead Product Designer",
    image: "/images/blogs/small1.png",
  },
  {
    id: "04",
    name: "Marcus W.",
    role: "Head of Marketing",
    image: "/images/blogs/small1.png",
  },
  {
    id: "05",
    name: "Jessica R.",
    role: "Product Manager",
    image: "/images/blogs/small1.png",
  },
  {
    id: "06",
    name: "Daniel K.",
    role: "Lead Developer",
    image: "/images/blogs/small1.png",
  },
  {
    id: "07",
    name: "Jordan S.",
    role: "Head of Marketing",
    image: "/images/blogs/small1.png",
  },
  {
    id: "08",
    name: "Raj P.",
    role: "Software Engineer",
    image: "/images/blogs/small1.png",
  },
  {
    id: "09",
    name: "Tina C.",
    role: "UX Researcher",
    image: "/images/blogs/small1.png",
  }
];

export const AboutTeam = () => {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".team-02-card",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.05,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="py-[120px] bg-[#000000] text-white font-sans">
      <div className="w-full max-w-[1280px] mx-auto px-5 sm:px-10 lg:px-16">
        
        {/* Header Block */}
        <div className="flex flex-col gap-4 mb-16 md:mb-24 text-center items-center">
          <div className="flex items-center gap-2">
            <span className="text-[#6C141E] font-bold text-lg">//</span>
            <p className="text-sm font-semibold tracking-wide text-white font-sans mt-0.5">Team</p>
          </div>
          <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-medium leading-[1.1] tracking-tight">
            Our Creative Minds
          </h2>
        </div>

        {/* Team Grid with 1px gap trick for internal borders */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-white/10 border-t border-b border-white/10 py-[1px]">
          {teamMembers.map((m) => (
            <div key={m.id} className="team-02-card bg-[#000000] p-6 sm:p-8 flex items-center gap-6 group hover:bg-white/[0.02] transition-colors duration-300">
              {/* Image */}
              <div className="w-20 h-20 sm:w-28 sm:h-28 shrink-0 rounded-2xl overflow-hidden bg-white/5 relative">
                <img
                  src={m.image}
                  alt={m.name}
                  className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  loading="lazy"
                />
              </div>
              
              {/* Info */}
              <div className="flex flex-col gap-1.5">
                <p className="text-xl sm:text-2xl font-semibold text-white tracking-tight">{m.name}</p>
                <p className="text-[#a1a1aa] text-sm sm:text-base font-light">{m.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
