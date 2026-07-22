import React, { useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Briefcase, Building, MonitorPlay, Users2, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const spaces = [
  {
    id: "private-executive-offices",
    title: "Private Executive Offices",
    desc: "Fully furnished, Ejari-compliant private offices tailored for individuals and teams. Enjoy absolute privacy with luxury fittings.",
    icon: Building,
    img: "https://i.pinimg.com/control1/1200x/c5/34/f4/c534f425ffa6a5422b9af5dede912223.jpg",
  },
  {
    id: "co-working-spaces",
    title: "Co-working Spaces",
    desc: "Dynamic and collaborative desk solutions designed for freelancers and startups. Access high-speed internet and premium lounges.",
    icon: Users2,
    img: "https://i.pinimg.com/736x/08/1a/a2/081aa2caebb3fc988999e826e6c947d5.jpg",
  },
  {
    id: "virtual-offices",
    title: "Virtual Offices",
    desc: "A prestigious business address and dedicated call answering services, allowing you to establish a corporate presence without the physical footprint.",
    icon: Briefcase,
    img: "https://i.pinimg.com/1200x/cf/bf/88/cfbf883733bdeb47f7a15614361db074.jpg",
  },
  {
    id: "meeting-boardrooms",
    title: "Meeting & Boardrooms",
    desc: "State-of-the-art AV equipment, luxury catering, and professional environments perfect for impressing clients and hosting workshops.",
    icon: MonitorPlay,
    img: "https://i.pinimg.com/1200x/e5/b8/c9/e5b8c98693743150f89899bff0d24500.jpg",
  },
];

export const BusinessCenterSpaces = () => {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const items = gsap.utils.toArray(".bc-space-item");

      items.forEach((item, i) => {
        gsap.fromTo(
          item,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 80%",
            },
          },
        );
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      id="spaces"
      ref={sectionRef}
      className="py-24 sm:py-36 bg-white text-black overflow-hidden relative"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#6C141E]" />
            <span className="text-xs font-mono tracking-widest uppercase text-white/70">
              Our Spaces
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-medium tracking-tight text-black mb-6">
            Designed for Excellence
          </h2>
          <p className="text-lg text-gray-500 font-light max-w-2xl mx-auto leading-relaxed">
            Choose a workspace that aligns with your ambitions. From private
            suites to flexible desks, every detail is engineered for
            productivity.
          </p>
        </div>

        <div className="flex flex-col gap-16 lg:gap-32">
          {spaces.map((space, i) => {
            const isEven = i % 2 === 0;
            const Icon = space.icon;

            return (
              <div
                key={i}
                className={`bc-space-item flex flex-col lg:flex-row items-center gap-12 lg:gap-20 ${!isEven ? "lg:flex-row-reverse" : ""}`}
              >
                {/* Image Side */}
                <Link to={`/services/business-center/${space.id}`} className="w-full lg:w-1/2 block">
                  <div className="relative aspect-[4/3] rounded-[24px] overflow-hidden group">
                    <img
                      src={space.img}
                      alt={space.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
                  </div>
                </Link>

                {/* Content Side */}
                <div className="w-full lg:w-1/2 flex flex-col">
                  <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-6 border border-white/10">
                    <Icon className="w-6 h-6  text-[#6C141E]" />
                  </div>
                  <Link to={`/services/business-center/${space.id}`} className="hover:text-[#6C141E] transition-colors">
                    <h3 className="text-3xl sm:text-4xl font-medium tracking-tight mb-4">
                      {space.title}
                    </h3>
                  </Link>
                  <p className="text-lg text-black/60 font-light leading-relaxed mb-8">
                    {space.desc}
                  </p>
                  <div className="w-12 h-[1px] bg-[#6C141E] mb-6" />
                  <Link 
                    to={`/services/business-center/${space.id}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#6C141E] hover:text-red-800 transition-colors group/link"
                  >
                    Explore Space Details
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
