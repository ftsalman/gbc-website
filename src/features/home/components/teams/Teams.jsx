import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card, DataList } from "../../../../../lib/turtle-ui/components";

gsap.registerPlugin(ScrollTrigger);

const teamMembers = [
  {
    id: "01",
    name: "Alexander Vance",
    role: "Managing Director & Founder",
    bio: "20+ years of structuring Fortune 500 expansions across the UAE mainland and free zones.",
    image:
      "https://i.pinimg.com/736x/60/b0/07/60b0074625b5e334945b83ccb34fdaed.jpg",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    handle: "alexvance",
    time: "12m ago",
  },
  {
    id: "02",
    name: "Fatima Al-Zahra",
    role: "Head of Legal & Compliance",
    bio: "Specialist in UAE corporate governance, cross-border restructuring, and regulatory frameworks.",
    image:
      "https://i.pinimg.com/736x/65/37/31/653731305f342118664309530fce2871.jpg",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop",
    handle: "fatima_legal",
    time: "8m ago",
  },
  {
    id: "03",
    name: "Marcus Sterling",
    role: "Senior Business Advisory Lead",
    bio: "Advising high-net-worth investors and family offices on strategic UAE market entry.",
    image:
      "https://i.pinimg.com/736x/26/40/fd/2640fdbc23f8b47e0a070cad1ad6f849.jpg",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
    handle: "marcus_uae",
    time: "15m ago",
  },
  {
    id: "04",
    name: "Sophia Khennouf",
    role: "Corporate Tax & Strategy Lead",
    bio: "Former Big-4 consultant ensuring seamless corporate tax optimization and VAT compliance.",
    image:
      "https://i.pinimg.com/736x/b6/28/46/b628467f0c4c5caac3f4fb7267e68c58.jpg",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop",
    handle: "sophiak_tax",
    time: "24m ago",
  },
  {
    id: "05",
    name: "Tariq Mansoor",
    role: "Government Relations & PRO Director",
    bio: "Executing expedited regulatory clearances, licensing, and VIP government liaising.",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop",
    avatar:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&auto=format&fit=crop",
    handle: "tariq_pro",
    time: "5m ago",
  },
  {
    id: "06",
    name: "Elena Rostova",
    role: "VIP Client Concierge & Success",
    bio: "Dedicated advisor orchestrating seamless onboarding and banking relations for global elites.",
    image:
      "https://i.pinimg.com/736x/92/40/55/924055b550306b67352c9a6d588848ab.jpg",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    handle: "elena_vip",
    time: "18m ago",
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
              <Card className="!p-0 !rounded-2xl sm:!rounded-3xl !border !border-white/10 !bg-[#121212] overflow-hidden relative group h-[480px] sm:h-[540px] lg:h-[560px] max-w-full shadow-none flex-1 cursor-pointer">
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
                  <Card className="!p-0 !rounded-xl sm:!rounded-2xl !border !border-white/10 !bg-[#121212] overflow-hidden relative group h-[260px] sm:h-[270px] shadow-none cursor-pointer flex flex-col">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    {/* Frosted Dark Glass overlay matching Syncox .team-member-info-wrap */}
                    <div className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-black/95 via-black/60 to-transparent backdrop-blur-[4px] pointer-events-none transition-opacity duration-500" />

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
