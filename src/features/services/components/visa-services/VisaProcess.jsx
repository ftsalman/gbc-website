import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: "01",
    title: "Document Collection & Assessment",
    img: "https://i.pinimg.com/736x/0a/0c/90/0a0c90728eed43b1422b1ec7a12ad039.jpg",
    desc: "Our experts review your profile, passport copies, education certificates, and passport photos to ensure all prerequisites for your specific visa type are met before applying.",
  },
  {
    num: "02",
    title: "Entry Permit / Change of Status",
    img: "https://i.pinimg.com/736x/32/a4/60/32a4609b5a5095032bbc1cc73a9e128a.jpg",
    desc: "We apply for your e-Visa (Entry Permit). If you are already inside the UAE, we simultaneously process your 'Change of Status' without you needing to exit the country.",
  },
  {
    num: "03",
    title: "Medical Fitness & Biometrics",
    img: "https://i.pinimg.com/1200x/89/92/81/8992818586ab95b7de26af9ffc2f9f0c.jpg",
    desc: "We schedule and guide you through the mandatory UAE medical fitness test and Emirates ID biometrics scanning at approved government centers.",
  },
  {
    num: "04",
    title: "Emirates ID & Visa Stamping",
    img: "https://i.pinimg.com/1200x/c7/13/a8/c713a8d47aa1ef7d0869da38533dc349.jpg",
    desc: "Once medically cleared, your final residency visa is issued (now primarily digital) and your physical Emirates ID card is printed and delivered directly to you.",
  },
];

export const VisaProcess = () => {
  const sectionRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray(".visa-process-card");

      gsap.fromTo(
        ".visa-process-header",
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
      className="bg-[#f6f6f6] text-black py-24 sm:py-36 font-sans relative"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        <div className="mb-20 sm:mb-28 flex flex-col items-center text-center">
          <div className="visa-process-header mb-4 flex items-center justify-center gap-2">
            <span className="text-[#6C141E] font-mono font-medium text-lg">
              //
            </span>
            <span className="font-mono text-sm tracking-widest uppercase font-semibold text-black">
              Step-by-Step
            </span>
          </div>
          <h2 className="visa-process-header text-4xl sm:text-5xl md:text-[70px] font-medium tracking-tight text-black leading-tight max-w-3xl">
            The Visa Application Process
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start relative">
          <div className="hidden lg:block lg:col-span-5 sticky top-1/3">
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

          <div className="lg:col-span-7 flex flex-col gap-24 sm:gap-32">
            {steps.map((s, i) => (
              <div
                key={s.num}
                id={`visa-process-card-${i}`}
                className="visa-process-card flex flex-col"
              >
                <div className="lg:hidden text-6xl font-medium tracking-tighter text-black mb-6 text-center">
                  {s.num}
                </div>

                <div className="relative overflow-hidden aspect-[16/10] mb-8 rounded-[20px]">
                  <img
                    src={s.img}
                    alt={s.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/10 mix-blend-overlay"></div>
                </div>

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
