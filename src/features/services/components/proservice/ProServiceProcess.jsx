import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ClipboardList, FileCheck, Building, Rocket } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const processSteps = [
  {
    title: "Request Initiation",
    desc: "Submit your request via our dedicated client portal or directly to your account manager. We outline required documents instantly.",
    icon: ClipboardList,
  },
  {
    title: "Document Collection",
    desc: "Our team collects the necessary documents (physically or digitally) and verifies them for accuracy before submission.",
    icon: FileCheck,
  },
  {
    title: "Government Processing",
    desc: "We liaise directly with the relevant UAE authorities (DED, MOHRE, Immigration) utilizing our fast-track access.",
    icon: Building,
  },
  {
    title: "Completion & Delivery",
    desc: "Approvals, licenses, or visas are issued and delivered directly to your office, fully compliant and ready for use.",
    icon: Rocket,
  }
];

export const ProServiceProcess = () => {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".pro-process-step",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );
      
      // Animate the connecting line
      gsap.fromTo(
        ".pro-process-line",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.5,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="py-24 sm:py-32 bg-white text-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        <div className="text-center max-w-3xl mx-auto mb-24">
          <h2 className="text-4xl sm:text-5xl font-medium tracking-tight text-gray-900 mb-6">
            Streamlined PRO Workflow
          </h2>
          <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto leading-relaxed">
            Our established process minimizes delays and eliminates administrative bottlenecks.
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line for Desktop */}
          <div className="hidden lg:block absolute top-[44px] left-[10%] right-[10%] h-[2px] bg-gray-200 origin-left">
            <div className="pro-process-line w-full h-full bg-[#6C141E] origin-left" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-8 relative z-10">
            {processSteps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={i} className="pro-process-step flex flex-col items-center text-center">
                  <div className="w-[88px] h-[88px] rounded-full bg-white border-4 border-gray-50 shadow-xl flex items-center justify-center text-[#6C141E] mb-8 relative z-10">
                    <Icon className="w-10 h-10" />
                    {/* Number badge */}
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[#6C141E] text-white flex items-center justify-center font-bold text-sm border-4 border-white shadow-sm">
                      {i + 1}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600 font-light leading-relaxed px-4">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
