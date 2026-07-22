import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    id: "activity-trade-name-approval",
    num: "01",
    title: "Activity & Trade Name Approval",
    img: "https://i.pinimg.com/736x/c2/09/08/c209085321637c55c49a17776ca95156.jpg",
    desc: "We help you select the precise business activities permitted by the Department of Economic Development (DED) and secure your initial trade name approval within 24 hours.",
  },
  {
    id: "drafting-moa-lsa-agreement",
    num: "02",
    title: "Drafting MoA & LSA Agreement",
    img: "https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=1000&auto=format&fit=crop",
    desc: "Our legal team drafts a robust Memorandum of Association (MoA) or a Local Service Agent (LSA) agreement depending on your license type, ensuring your rights are fully protected.",
  },
  {
    id: "office-space-ejari",
    num: "03",
    title: "Office Space & Ejari",
    img: "https://i.pinimg.com/736x/08/1a/a2/081aa2caebb3fc988999e826e6c947d5.jpg",
    desc: "Mainland businesses require a physical address. We assist in finding the perfect office or retail space, signing the lease, and registering it through the Ejari system.",
  },
  {
    id: "final-license-issuance-visas",
    num: "04",
    title: "Final License Issuance & Visas",
    img: "https://i.pinimg.com/736x/85/0e/7e/850e7ea08eca0d71666ddc3d37e7156c.jpg",
    desc: "After submitting all documents to the DED, your trade license is issued. We then proceed with establishing your establishment card, investor visas, and corporate bank accounts.",
  },
];

export const MainlandProcess = () => {
  const sectionRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray(".mainland-process-card");

      gsap.fromTo(
        ".mainland-process-header",
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
          <div className="mainland-process-header mb-4 flex items-center justify-center gap-2">
            <span className="text-[#6C141E] font-mono font-medium text-lg">
              //
            </span>
            <span className="font-mono text-sm tracking-widest uppercase font-semibold text-black">
              Step-by-Step
            </span>
          </div>
          <h2 className="mainland-process-header text-4xl sm:text-5xl md:text-[70px] font-medium tracking-tight text-black leading-tight max-w-3xl">
            The Mainland Setup Process
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
                id={`mainland-process-card-${i}`}
                className="mainland-process-card flex flex-col"
              >
                <div className="lg:hidden text-6xl font-medium tracking-tighter text-black mb-6 text-center">
                  {s.num}
                </div>

                <Link to={`/services/mainland/${s.id}`} className="block relative overflow-hidden aspect-[16/10] mb-8 rounded-[20px] group">
                  <img
                    src={s.img}
                    alt={s.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/10 mix-blend-overlay"></div>
                </Link>

                <div className="max-w-xl space-y-4">
                  <Link to={`/services/mainland/${s.id}`} className="block hover:text-red-800 transition-colors">
                    <h3 className="text-2xl sm:text-3xl font-medium text-[#6C141E]">
                      {s.title}
                    </h3>
                  </Link>
                  <p className="text-gray-600 text-lg sm:text-xl font-light leading-relaxed">
                    {s.desc}
                  </p>
                  <div className="w-12 h-[1px] bg-[#6C141E] pt-2" />
                  <Link 
                    to={`/services/mainland/${s.id}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#6C141E] hover:text-red-800 transition-colors group/link pt-2"
                  >
                    Explore Step Details
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
