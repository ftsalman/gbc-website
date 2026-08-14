import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  "VAT Registration: Get professional assistance with UAE VAT registration and the required documentation.",
  "VAT Return Filing: Accurate preparation and timely filing of your VAT returns.",
  "VAT Records & Documentation: Keep your VAT-related records organized and ready for compliance requirements.",
  "VAT Compliance Support: Get ongoing assistance with VAT-related requirements and business transactions.",
  "VAT Review & Advisory: Understand your VAT obligations and get practical support for your business.",
  "Ongoing VAT Assistance: A reliable team to support your business with recurring VAT requirements.",
];

export const AccountingBenefits = () => {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".accounting-benefit-anim",
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
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="py-24 sm:py-32 bg-[#F6F6F6] text-gray-900 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="accounting-benefit-anim relative">
            <div className="relative aspect-[4/5] rounded-[32px] overflow-hidden shadow-2xl">
              <img
                src="https://i.pinimg.com/736x/27/35/75/273575e8c4417252929c40b592e22b8b.jpg"
                alt="Professional Business Meeting"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <p className="text-white text-2xl font-medium leading-relaxed">
                  “Stay compliant with VAT, while you stay focused on your business.”
                </p>
              </div>
            </div>

            {/* Decorative element */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#6C141E] rounded-full blur-3xl opacity-20 -z-10" />
          </div>

          <div className="flex flex-col">
            <div className="accounting-benefit-anim mb-4 flex items-center gap-2">
              <span className="text-[#6C141E] font-mono font-medium text-lg">
                //
              </span>
              <span className="font-mono text-sm tracking-widest uppercase font-semibold text-gray-600">
                VAT SERVICES
              </span>
            </div>

            <h2 className="accounting-benefit-anim text-4xl sm:text-5xl font-medium tracking-tight text-gray-900 mb-8 leading-tight">
              Simplify Your UAE VAT Compliance
            </h2>

            <p className="accounting-benefit-anim text-lg text-gray-600 font-light leading-relaxed mb-10">
              Managing UAE VAT requirements and maintaining accurate financial records can be complex and time-consuming. GBC provides professional accounting support to handle your VAT compliance efficiently, helping your business stay organized and fully compliant.
            </p>

            <ul className="flex flex-col gap-5">
              {benefits.map((b, i) => (
                <li key={i} className="accounting-benefit-anim flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-[#6C141E]/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Check
                      className="w-3.5 h-3.5 text-[#6C141E]"
                      strokeWidth={3}
                    />
                  </div>
                  <span className="text-gray-700 text-lg font-medium leading-relaxed">
                    {b.split(":")[0]}:{" "}
                    <span className="font-light">{b.split(":")[1]}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
