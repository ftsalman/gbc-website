import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const teamMembers = [
  {
    id: "01",
    name: "Alexander Vance",
    role: "Managing Director & Founder",
    image: "/images/blogs/small1.png",
  },
  {
    id: "02",
    name: "Fatima Al-Zahra",
    role: "Head of Legal & Compliance",
    image: "/images/blogs/small1.png",
  },
  {
    id: "03",
    name: "Marcus Sterling",
    role: "Senior Business Advisory Lead",
    image: "/images/blogs/small1.png",
  },
  {
    id: "04",
    name: "Sophia Khennouf",
    role: "Corporate Tax & Strategy Lead",
    image: "/images/blogs/small1.png",
  },
  {
    id: "05",
    name: "Tariq Mansoor",
    role: "Government Relations Director",
    image: "/images/blogs/small1.png",
  },
  {
    id: "06",
    name: "Elena Rostova",
    role: "VIP Client Concierge",
    image: "/images/blogs/small1.png",
  },
  {
    id: "07",
    name: "Rania Khalil",
    role: "PRO & Licensing Specialist",
    image: "/images/blogs/small1.png",
  },
  {
    id: "08",
    name: "David Osei",
    role: "Investment Advisory Lead",
    image: "/images/blogs/small1.png",
  },
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
          stagger: 0.1,
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
    <section ref={sectionRef} className="py-[120px] bg-[#000000] text-white">
      <div className="w-full max-w-[1280px] mx-auto px-5 sm:px-10 lg:px-16">
        
        {/* Header Block */}
        <div className="flex flex-col gap-4 mb-[60px] md:mb-[100px] text-center items-center">
          <div className="flex items-center gap-2">
            <span className="text-[#6C141E]">//</span>
            <p className="text-sm font-semibold tracking-wide text-white uppercase font-mono mt-0.5">Team</p>
          </div>
          <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-normal leading-[1.1]">
            Meet Our Business Experts
          </h2>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 gap-y-12">
          {teamMembers.map((m) => (
            <div key={m.id} className="team-02-card flex flex-col gap-6 group">
              <div className="w-full aspect-[4/5] overflow-hidden bg-white/[0.02]">
                <img
                  src={m.image}
                  alt="Team Headshot"
                  className="w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-col gap-1 text-center">
                <p className="text-2xl font-semibold text-white">{m.name}</p>
                <p className="text-[#a1a1aa] text-base">{m.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
