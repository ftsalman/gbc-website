import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: "01",
    title: "Research",
    img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=900&auto=format&fit=crop",
    desc: "We listen to your business needs to understand pain points and goals, then give a clear estimate on cost and time-frame.",
  },
  {
    num: "02",
    title: "Implementation",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=900&auto=format&fit=crop",
    desc: "Implementation is the process of turning plans and strategies into action to achieve your goals efficiently and effectively.",
  },
  {
    num: "03",
    title: "Testing",
    img: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=900&auto=format&fit=crop",
    desc: "Testing ensures everything works correctly — identifying issues, verifying functionality, and guaranteeing a smooth experience.",
  },
  {
    num: "04",
    title: "Deployment",
    img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=900&auto=format&fit=crop",
    desc: "We deploy the final solution, monitor performance and ensure a seamless handover so your business can hit the ground running.",
  },
];

export const AboutProcess = () => {
  const sectionRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);

  useGSAP(
    () => {
      // Header slide-in
      gsap.fromTo(
        ".process-header-item",
        { y: 35, opacity: 0 },
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

      // Each card fades in and updates active sticky number on scroll
      gsap.utils.toArray(".process-card").forEach((card, index) => {
        gsap.fromTo(
          card,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
            },
          },
        );

        ScrollTrigger.create({
          trigger: card,
          start: "top 55%",
          end: "bottom 55%",
          onToggle: (self) => {
            if (self.isActive) {
              setActiveStep(index);
            }
          },
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="about-process bg-[#0a0a0a] text-white py-24 sm:py-36 border-b border-white/10 font-sans relative"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        {/* Header */}
        <div className="mb-16 sm:mb-24">
          <div className="process-header-item mb-4">
            <span className="font-mono text-sm font-semibold tracking-tight uppercase">
              <span className="text-bordeaux mr-1">//</span>
              <span className="text-gray-400">How We Work</span>
            </span>
          </div>
          <h2 className="process-header-item text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-white leading-[1.1]">
            Our Process
          </h2>
        </div>

        {/* Sticky count column + right-hand scrolling cards */}
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Left sticky number strip – exact Syncox behavior on lg+ */}
          <div className="hidden lg:flex lg:col-span-4 sticky top-36 flex-col gap-6 select-none">
            {steps.map((s, i) => {
              const isActive = activeStep === i;
              return (
                <div
                  key={s.num}
                  className={`flex items-center gap-6 transition-all duration-500 cursor-pointer ${
                    isActive
                      ? "text-white scale-105 translate-x-3"
                      : "text-white/20 hover:text-white/40"
                  }`}
                  onClick={() => {
                    const el = document.getElementById(`process-card-${i}`);
                    el?.scrollIntoView({ behavior: "smooth", block: "center" });
                  }}
                >
                  <span
                    className={`text-[64px] xl:text-[80px] font-light leading-none font-mono ${isActive ? "text-bordeaux font-normal" : ""}`}
                  >
                    {s.num}
                  </span>
                  {isActive && (
                    <span className="text-sm font-mono tracking-widest uppercase text-gray-400 animate-fadeIn">
                      {s.title}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Cards */}
          <div className="lg:col-span-8 flex flex-col gap-16 sm:gap-24">
            {steps.map((s, i) => (
              <div
                key={s.num}
                id={`process-card-${i}`}
                className="process-card group border-t border-white/10 pt-10 sm:pt-14 first:border-t-0 first:pt-0"
              >
                {/* Mobile Step Header */}
                <div className="flex items-center justify-between mb-6 lg:hidden">
                  <span className="font-mono text-3xl font-bold text-bordeaux">
                    {s.num}
                  </span>
                  <span className="font-mono text-sm text-gray-400 uppercase tracking-widest">
                    Step {s.num}
                  </span>
                </div>

                {/* Image Wrap */}
                <div className="relative overflow-hidden bg-white/[0.03] border border-white/10 aspect-[16/10] sm:aspect-[16/9] mb-8 rounded-2xl">
                  <img
                    src={s.img}
                    alt={s.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Content Body */}
                <div className="max-w-2xl">
                  <h3 className="text-2xl sm:text-3xl font-normal text-white group-hover:text-bordeaux transition-colors duration-300 mb-4">
                    {s.title}
                  </h3>
                  <p className="text-gray-400 group-hover:text-gray-200 text-lg sm:text-xl font-light leading-relaxed transition-colors duration-300">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
