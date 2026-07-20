import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: "01",
    title: "Initial Consultation",
    img: "/images/blogs/small1.png",
    desc: "We analyze your business goals, advise on the best legal structure, and help you select the ideal jurisdiction (Mainland vs Free Zone).",
  },
  {
    num: "02",
    title: "Licensing & Registration",
    img: "/images/blogs/small1.png",
    desc: "Our experts handle all government approvals, document drafting, and trade license issuance seamlessly and efficiently.",
  },
  {
    num: "03",
    title: "Visas & Emirates ID",
    img: "/images/blogs/small1.png",
    desc: "We offer streamlined processing for investor visas, employee visas, medical tests, and biometrics for a hassle-free experience.",
  },
  {
    num: "04",
    title: "Corporate Banking & Support",
    img: "/images/blogs/small1.png",
    desc: "We facilitate priority bank account opening and provide ongoing PRO, accounting, and legal support as your business scales.",
  },
];

export const AboutProcess = () => {
  const sectionRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray(".process-card");

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

      // Card image & text fade-in
      cards.forEach((card, index) => {
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
          start: "top 40%",
          onEnter: () => setActiveStep(index),
          onLeaveBack: () => setActiveStep(Math.max(0, index - 1)),
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="about-process bg-[#f6f6f6] text-black py-24 sm:py-36 font-sans relative"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        {/* Header - Centered */}
        <div className="mb-20 sm:mb-28 flex flex-col items-center text-center">
          <div className="process-header-item mb-4 flex items-center justify-center gap-2">
            <span className="text-[#6C141E] font-mono font-medium text-lg">//</span>
            <span className="font-mono text-sm tracking-widest uppercase font-semibold text-black">
              How We Work
            </span>
          </div>
          <h2 className="process-header-item text-4xl sm:text-5xl md:text-[80px] font-medium tracking-tight text-black leading-tight">
            Our Process
          </h2>
        </div>

        {/* Sticky count column + right-hand scrolling cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start relative">
          
          {/* Left sliding sticky number */}
          <div className="hidden lg:block lg:col-span-5 sticky top-1/3">
            {/* Window height matches the number height to hide the rest */}
            <div className="h-[160px] overflow-hidden relative flex justify-center">
              <div 
                className="flex flex-col transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] text-center"
                style={{ transform: `translateY(-${activeStep * 160}px)` }}
              >
                {steps.map((s) => (
                  <div key={s.num} className="h-[160px] flex items-center justify-center pb-4">
                    <span className="text-[120px] md:text-[150px] font-normal leading-none text-black tracking-tighter">
                      {s.num}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Cards */}
          <div className="lg:col-span-7 flex flex-col gap-24 sm:gap-32">
            {steps.map((s, i) => (
              <div
                key={s.num}
                id={`process-card-${i}`}
                className="process-card flex flex-col"
              >
                {/* Mobile Step Number */}
                <div className="lg:hidden text-6xl font-medium tracking-tighter text-black mb-6 text-center">
                  {s.num}
                </div>

                {/* Image Wrap */}
                <div className="relative overflow-hidden aspect-[16/10] mb-8 rounded-[20px]">
                  <img
                    src={s.img}
                    alt={s.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105"
                  />
                </div>

                {/* Content Body */}
                <div className="max-w-xl">
                  <h3 className="text-2xl sm:text-3xl font-medium text-[#6C141E] mb-4">
                    {s.title}
                  </h3>
                  <p className="text-gray-600 text-lg sm:text-xl font-light leading-relaxed">
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
