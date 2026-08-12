import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: "01",
    subtitle: "Tell Us What You Need",
    title: "Free Consultation & Requirement Assessment",
    img: "https://i.pinimg.com/736x/c2/09/08/c209085321637c55c49a17776ca95156.jpg",
    desc: "Tell us about your business, service requirements and goals. Our consultants review your needs and recommend the right solution, whether you need business setup, PRO services, visa processing, licensing, accounting or corporate support.",
    cta: "Get Free Consultation",
    href: "/contact",
  },
  {
    num: "02",
    subtitle: "Get the Right Solution",
    title: "Choose the Right Business & Service Option",
    img: "https://i.pinimg.com/736x/fa/7e/cf/fa7ecfd0d2b272989842b1142f8a7fc3.jpg",
    desc: "Based on your requirements, we explain the available options, required documents, government procedures, estimated timelines and applicable fees. For business setup, we help you understand the differences between Mainland, Free Zone and Offshore structures.",
    cta: "Explore Business Setup",
    href: "/services",
  },
  {
    num: "03",
    subtitle: "We Handle the Process",
    title: "Application, Documentation & Government Processing",
    img: "https://i.pinimg.com/736x/1b/21/64/1b2164703102ef91cfb7a182d0538d6d.jpg",
    desc: "Once you approve the solution, we handle all the paperwork, submit applications to the relevant authorities, and manage the entire government processing workflow on your behalf.",
    cta: "View Corporate Services",
    href: "/services",
  },
  {
    num: "04",
    subtitle: "Final Handover & Support",
    title: "Completion & Ongoing Compliance",
    img: "https://i.pinimg.com/736x/0b/21/58/0b2158ac4dbf4b08d75601a302fe3868.jpg",
    desc: "We deliver your finalized documents, licenses, or visas. Our support continues with ongoing assistance for your corporate compliance, renewals, and business needs.",
    cta: "Contact Our Team",
    href: "/contact",
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
            <span className="text-[#6C141E] font-mono font-medium text-lg">
              //
            </span>
            <span className="font-mono text-sm tracking-widest uppercase font-semibold text-black">
              HOW IT WORKS
            </span>
          </div>
          <h2 className="process-header-item text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-medium tracking-tight text-black leading-tight max-w-4xl">
            Our Simple 4-Step Process
          </h2>

          <p className="toolbar-desc mt-6 max-w-sm sm:max-w-xl text-[14px] sm:text-base text-gray-500 font-light leading-relaxed">
            From your first consultation to completed applications and ongoing
            support, our experienced team manages the process while keeping you
            informed at every stage.
          </p>
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
                  <div
                    key={s.num}
                    className="h-[160px] flex items-center justify-center pb-4"
                  >
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
                  <div className="mb-4">
                    <span className="text-gray-500 font-mono text-sm uppercase tracking-wider block mb-2">
                      {s.subtitle}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-medium text-[#6C141E]">
                      {s.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 text-lg sm:text-xl font-light leading-relaxed mb-8">
                    {s.desc}
                  </p>
                  {s.cta && (
                    <a
                      href={s.href}
                      className="inline-flex items-center gap-2 bg-[#6C141E] text-white px-6 py-3 rounded-full hover:bg-black transition-colors duration-300 font-medium text-sm"
                    >
                      {s.cta}
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 7H13M13 7L7 1M13 7L7 13"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
