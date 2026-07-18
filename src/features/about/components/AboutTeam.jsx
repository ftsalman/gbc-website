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
    image: "https://i.pinimg.com/736x/60/b0/07/60b0074625b5e334945b83ccb34fdaed.jpg",
  },
  {
    id: "02",
    name: "Fatima Al-Zahra",
    role: "Head of Legal & Compliance",
    image: "https://i.pinimg.com/736x/65/37/31/653731305f342118664309530fce2871.jpg",
  },
  {
    id: "03",
    name: "Marcus Sterling",
    role: "Senior Business Advisory Lead",
    image: "https://i.pinimg.com/736x/26/40/fd/2640fdbc23f8b47e0a070cad1ad6f849.jpg",
  },
  {
    id: "04",
    name: "Sophia Khennouf",
    role: "Corporate Tax & Strategy Lead",
    image: "https://i.pinimg.com/736x/b6/28/46/b628467f0c4c5caac3f4fb7267e68c58.jpg",
  },
  {
    id: "05",
    name: "Tariq Mansoor",
    role: "Government Relations Director",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "06",
    name: "Elena Rostova",
    role: "VIP Client Concierge",
    image: "https://i.pinimg.com/736x/92/40/55/924055b550306b67352c9a6d588848ab.jpg",
  },
  {
    id: "07",
    name: "Rania Khalil",
    role: "PRO & Licensing Specialist",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "08",
    name: "David Osei",
    role: "Investment Advisory Lead",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
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
