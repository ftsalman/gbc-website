import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card, DataList } from "../../../../../lib/turtle-ui/components";

gsap.registerPlugin(ScrollTrigger);

const teamMembers = [
  {
    id: "01",
    name: "Muhammed Shereef & Rafeeq",
    role: "CEO",
    bio: "Leading the company's strategic vision and driving growth across the global business landscape.",
    image: "/images/team/shereef-rafeeq.png",
    avatar: "/images/team/shereef-rafeeq.jpeg",
    handle: "gbc_ceo",
    time: "2m ago",
  },
  {
    id: "02",
    name: "Sajjad Ali",
    role: "Administration Manager",
    bio: "Ensuring smooth operational workflows and managing day-to-day administrative functions.",
    image: "/images/team/sajjad-ali.png",
    avatar: "/images/team/sajjad-ali.png",
    handle: "sajjad_admin",
    time: "15m ago",
  },
  {
    id: "03",
    name: "Unais P",
    role: "HR",
    bio: "Fostering a culture of excellence and managing our growing talent pool.",
    image: "/images/team/unais.png",
    avatar: "/images/team/unais.png",
    handle: "unais_hr",
    time: "1h ago",
  },
  {
    id: "04",
    name: "Muhammed  Nisab",
    role: "Operations Manager",
    bio: "Optimizing operational efficiency and driving seamless execution of client projects.",
    image: "/images/team/Muhammed-nisab.png",
    avatar: "/images/team/Muhammed-nisab.png",
    handle: "nisab_ops",
    time: "3h ago",
  },
];

export const Teams = () => {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      // Header entrance
      gsap.fromTo(
        ".team-header-el",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        },
      );

      // Staggered card entrance with subtle parallax / overlapped reveal
      const cards = gsap.utils.toArray(".team-card-item");
      gsap.fromTo(
        cards,
        { y: 50, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.85,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        },
      );
    },
    { scope: sectionRef },
  );

  const firstMember = teamMembers[0];
  const gridMembers = teamMembers.slice(1);

  return (
    <section
      ref={sectionRef}
      className="bg-[#0a0a0a] text-white py-24 sm:py-36 relative overflow-x-clip font-sans"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        {/* Header exactly matching Syncox .section-heading-horizontal-block layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start mb-16 sm:mb-24">
          {/* Left: // Meet the Crew */}
          <div className="team-header-el md:col-span-5 shrink-0">
            <span className="font-mono text-sm sm:text-base text-white font-semibold tracking-tight uppercase">
              <span className="text-bordeaux mr-1">//</span>
              <span className="text-gray-400">Meet the Crew</span>
            </span>
          </div>

          {/* Right: The Team */}
          <div className="team-header-el md:col-span-7">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-white leading-[1.1]">
              The Team
            </h2>
          </div>
        </div>

        {/* Exact Layout matching Syncox .team-block: Featured Left Card (.founder-card) + Right Grid (.team-grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Featured Large Founder Card (Left Column - Syncox .founder-card) */}
          {firstMember && (
            <div className="team-card-item lg:col-span-4 w-full flex flex-col">
              <Card className="!p-0 !rounded-2xl sm:!rounded-3xl !border !border-white/10 !bg-[#121212] overflow-hidden relative group h-[480px] sm:h-[540px] lg:h-[540px] max-w-full shadow-none flex-1 cursor-pointer">
                <img
                  src={firstMember.image}
                  alt={firstMember.name}
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {/* Frosted Dark Glass overlay matching Syncox .founder-info-wrap */}
                <div className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-black/95 via-black/70 to-transparent backdrop-blur-[4px] pointer-events-none transition-opacity duration-500" />

                {/* Member Details */}
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 flex flex-col justify-end z-10">
                  <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-tight">
                    {firstMember.name}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-300 font-medium mt-1">
                    {firstMember.role}
                  </p>
                </div>
              </Card>
            </div>
          )}

          {/* Right Grid of Cards (Syncox .team-grid - 3 Columns on lg) */}
          <div className="lg:col-span-8 w-full flex flex-col justify-between">
            <DataList
              data={gridMembers}
              className="!flex !flex-col sm:!grid sm:!grid-cols-2 lg:!grid-cols-3 !gap-6 !w-full !grid-cols-none"
              render={(member) => (
                <div key={member.id} className="team-card-item w-full h-full">
                  <Card className="!p-0 !rounded-xl sm:!rounded-2xl !border !border-white/10 !bg-[#121212] overflow-hidden relative group h-[260px] sm:h-[360px] shadow-none cursor-pointer flex flex-col">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    {/* Frosted Dark Glass overlay matching Syncox .team-member-info-wrap */}
                    <div className="absolute inset-x-0 bottom-0 h-[29%] bg-gradient-to-t from-black/95 via-black/60 to-transparent backdrop-blur-[4px] pointer-events-none transition-opacity duration-500" />

                    {/* Member Details */}
                    <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 flex flex-col justify-end z-10">
                      <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight leading-snug">
                        {member.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-300 font-medium mt-1 line-clamp-1">
                        {member.role}
                      </p>
                    </div>
                  </Card>
                </div>
              )}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
