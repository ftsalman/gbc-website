import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  "Cost Efficiency: Eliminate the overhead of hiring an in-house PRO team.",
  "Dedicated Manager: A single point of contact for all your corporate requests.",
  "100% Compliance: Stay updated with constantly evolving UAE labor laws.",
  "Fast-Track Processing: Leverage our strong government relationships.",
  "Transparent Tracking: Real-time updates on all your submitted applications.",
  "Focus on Growth: Free your team to focus on core business activities.",
];

export const ProServiceBenefits = () => {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".pro-benefit-anim",
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
          <div className="pro-benefit-anim relative">
            <div className="relative aspect-[4/5] rounded-[32px] overflow-hidden shadow-2xl">
              <img
                src="https://i.pinimg.com/736x/27/35/75/273575e8c4417252929c40b592e22b8b.jpg"
                alt="Professional Business Meeting"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <p className="text-white text-xl font-medium leading-relaxed">
                  "Outsourcing our PRO services to GBC was the best decision for
                  our HR department. Complete peace of mind."
                </p>
              </div>
            </div>

            {/* Decorative element */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#6C141E] rounded-full blur-3xl opacity-20 -z-10" />
          </div>

          <div className="flex flex-col">
            <div className="pro-benefit-anim mb-4 flex items-center gap-2">
              <span className="text-[#6C141E] font-mono font-medium text-lg">
                //
              </span>
              <span className="font-mono text-sm tracking-widest uppercase font-semibold text-gray-600">
                Why Choose Us
              </span>
            </div>

            <h2 className="pro-benefit-anim text-4xl sm:text-5xl font-medium tracking-tight text-gray-900 mb-8 leading-tight">
              The Strategic Advantage of Outsourced PRO
            </h2>

            <p className="pro-benefit-anim text-lg text-gray-600 font-light leading-relaxed mb-10">
              Managing UAE government portals and administrative tasks is
              time-consuming. Partnering with GBC Corporate gives you the
              infrastructure of a massive HR department for a fraction of the
              cost.
            </p>

            <ul className="flex flex-col gap-5">
              {benefits.map((b, i) => (
                <li key={i} className="pro-benefit-anim flex items-start gap-4">
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
