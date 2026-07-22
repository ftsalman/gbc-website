import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { User, Award, FileCheck, ArrowRight, Sparkles } from "lucide-react";
import { PRO_SERVICES } from "../../constants/proserviceData.js";
import { Card, DataList } from "../../../../../lib/turtle-ui/components.js";

gsap.registerPlugin(ScrollTrigger);

export const ProServiceOfferings = () => {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".pro-step-card",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="py-24 sm:py-32 bg-[#FAFAFA] text-gray-900 relative overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        
        {/* Header Section matching reference image */}
        <div className="text-center max-w-4xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-white border border-gray-200 text-xs font-semibold text-gray-600 mb-2 uppercase tracking-widest shadow-sm select-none">
            Exclusive Core Services
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-gray-950 leading-tight">
            Experience Premium Corporate Support With Our<br />
            Exclusive <span className="text-[#6C141E]">Government-Linked PRO Services</span>.
          </h2>
        </div>

        {/* Dynamic Connected Cards Grid using Custom DataList & Card Components */}
        <DataList
          data={PRO_SERVICES}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full relative"
          render={(item, idx) => {
            const steps = ["Step One", "Step Two", "Step Three", "Step Four"];
            const labels = ["Easy Peasy!", "Superfast!", "Smahhhrt!", "Secure Delivery!"];
            
            return (
              <Card 
                key={idx}
                onClick={() => window.location.href = `/services/pro-services/${item.id}`}
                className="pro-step-card group bg-white border border-gray-150 rounded-[32px] p-8 flex flex-col justify-between min-h-[380px] shadow-sm hover:shadow-md transition-all duration-500 relative cursor-pointer"
              >
                {/* Top info */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{steps[idx]}</span>
                  <h3 className="text-xl font-bold text-gray-950 leading-snug group-hover:text-[#6C141E] transition-colors duration-300">
                    {item.title.replace(" Processing & Renewals", " Processing").replace(" & Immigration Services", "").replace(" Management", "").replace("Attestation", "Attestation")}
                  </h3>
                </div>

                {/* Middle illustration matching Card UI in image */}
                {idx === 0 && (
                  <div className="relative w-full h-44 bg-white overflow-hidden flex items-center justify-start border-t border-slate-100/50 pt-4">
                    {/* Concentric rings */}
                    <div className="absolute left-[30px] w-36 h-36 rounded-full border border-slate-100 pointer-events-none" />
                    <div className="absolute left-[15px] w-48 h-48 rounded-full border border-slate-100 pointer-events-none" />
                    {/* Radial glow */}
                    <div className="absolute left-[20%] top-[25%] w-24 h-24 bg-blue-400/20 rounded-full blur-2xl pointer-events-none" />
                    
                    {/* ID Card Mockup */}
                    <div className="w-40 h-24 bg-blue-50/30 border border-blue-100/50 rounded-2xl p-3 shadow-sm relative z-10 flex flex-col justify-between ml-4">
                      <div className="flex gap-2 items-center">
                        <div className="w-7 h-7 rounded-full bg-blue-100/50 flex items-center justify-center text-blue-500">
                          <User className="w-3.5 h-3.5" />
                        </div>
                        <div className="flex flex-col gap-1.5 flex-grow">
                          <div className="w-16 h-1.5 bg-blue-100/50 rounded-full" />
                          <div className="w-12 h-1 bg-blue-100/30 rounded-full" />
                        </div>
                      </div>
                      <div className="w-1/2 h-1 bg-blue-100/30 rounded-full" />
                    </div>

                    {/* Vertical frosted glass divider overlay */}
                    <div className="absolute top-0 right-[25%] w-12 h-full bg-white/20 backdrop-blur-[4px] border-l border-white/40 z-20 pointer-events-none" />
                  </div>
                )}

                {idx === 1 && (
                  <div className="relative w-full h-44 bg-white overflow-hidden flex items-center justify-center border-t border-slate-100/50">
                    {/* Radial glow */}
                    <div className="absolute w-32 h-32 bg-indigo-400/10 rounded-full blur-2xl pointer-events-none" />
                    
                    {/* Search Bar / Panel Mockup */}
                    <div className="w-48 h-12 bg-white border border-slate-200/80 rounded-2xl px-3 shadow-md relative z-10 flex gap-2.5 items-center justify-between">
                      <div className="flex gap-2 items-center flex-grow">
                        <div className="w-6 h-6 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400">
                          <User className="w-3.5 h-3.5" />
                        </div>
                        <div className="flex flex-col gap-1 flex-grow">
                          <div className="w-20 h-2 bg-slate-100 rounded-full" />
                          <div className="w-12 h-1 bg-slate-100 rounded-full" />
                        </div>
                      </div>
                      {/* Info icon badge */}
                      <div className="w-4 h-4 rounded-full border border-slate-200 flex items-center justify-center text-[8px] text-slate-400 font-serif font-bold">i</div>
                    </div>
                  </div>
                )}

                {idx === 2 && (
                  <div className="relative w-full h-44 bg-white overflow-hidden flex items-center justify-center border-t border-slate-100/50">
                    {/* Concentric waves */}
                    <div className="absolute w-28 h-28 rounded-full border-4 border-slate-50 pointer-events-none" />
                    <div className="absolute w-40 h-40 rounded-full border-2 border-slate-100/60 pointer-events-none" />
                    <div className="absolute w-52 h-52 rounded-full border border-slate-100/40 pointer-events-none" />
                    {/* Blue Glow */}
                    <div className="absolute w-24 h-24 bg-blue-400/10 rounded-full blur-xl pointer-events-none" />
                    
                    {/* Skewed background card */}
                    <div className="absolute w-18 h-24 bg-white border border-slate-100 rounded-2xl shadow-sm -rotate-12 -translate-x-12 z-0" />
                    
                    {/* Foreground main card */}
                    <div className="w-20 h-20 bg-gradient-to-tr from-blue-50/80 to-indigo-100/80 border border-white rounded-[24px] shadow-lg relative z-10 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-blue-500/20 backdrop-blur-sm border border-white/60 flex items-center justify-center text-blue-600">
                        <Sparkles className="w-4 h-4 text-blue-600 fill-blue-600/30" />
                      </div>
                    </div>
                  </div>
                )}

                {idx === 3 && (
                  <div className="relative w-full h-44 bg-white overflow-hidden flex items-center justify-center border-t border-slate-100/50">
                    {/* Circular nodes grid pattern in background */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-40 pointer-events-none">
                      <div className="grid grid-cols-6 gap-3">
                        {Array.from({ length: 24 }).map((_, idx) => (
                          <div key={idx} className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                        ))}
                      </div>
                    </div>

                    {/* Top Right small badge emblem */}
                    <div className="absolute right-8 top-4 w-7 h-7 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center z-20">
                      <Award className="w-3.5 h-3.5 text-amber-500 fill-amber-500/10" />
                    </div>
                    
                    {/* Floating tilted tags stack */}
                    <div className="relative w-full h-full flex items-center justify-center">
                      {/* Tag 1: Finally */}
                      <div className="absolute left-6 top-8 bg-white border border-slate-200/80 px-2.5 py-1 rounded-xl shadow-sm text-[10px] font-semibold text-slate-500 -rotate-12 z-10 select-none">
                        Finally
                      </div>
                      {/* Tag 2: Secure Attestation */}
                      <div className="absolute bg-[#0B132B] text-white text-[10px] font-bold px-4 py-2 rounded-xl shadow-lg rotate-2 z-30 select-none flex items-center gap-1.5">
                        <FileCheck className="w-3 h-3 text-[#6C141E]" />
                        Secure Attestation
                      </div>
                      {/* Tag 3: And Enjoy That! */}
                      <div className="absolute right-6 bottom-8 bg-white border border-slate-200/80 px-2.5 py-1 rounded-xl shadow-sm text-[10px] font-semibold text-slate-400 -rotate-6 z-10 select-none">
                        And Enjoy That!
                      </div>
                    </div>
                  </div>
                )}

                {/* Bottom info */}
                <div>
                  {idx < 3 ? (
                    <span className="inline-block px-4 py-1.5 bg-[#FAFAFA] border border-gray-150 rounded-full text-xs font-semibold text-gray-600 shadow-sm">
                      {labels[idx]}
                    </span>
                  ) : (
                    <div className="h-8" />
                  )}
                </div>

                {/* Connector Arrow Button */}
                {idx < 3 && (
                  <div className="absolute -right-4.5 top-1/2 -translate-y-1/2 z-30 hidden lg:flex w-9 h-9 rounded-xl bg-gray-100 border border-gray-150 items-center justify-center shadow-sm text-gray-500 group-hover:bg-[#6C141E] group-hover:text-white transition-colors duration-300">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </Card>
            );
          }}
        />

        {/* Bottom Badge & Explanatory Text block matching reference image */}
        <div className="mt-20 flex flex-col items-center space-y-6 max-w-4xl mx-auto text-center">
          <div className="px-5 py-2.5 rounded-full bg-white border border-gray-150 text-xs font-semibold text-gray-700 shadow-sm">
            Powered by GBC Government Liaisons
          </div>
          
          <p className="text-sm text-gray-500 leading-relaxed font-light">
            Launching <strong>GBC Government Liaisons</strong> is a significant step forward. This innovative division provides corporate users with personalized administrative advice, risk assessments, and potential compliance strategies based on their individual free zone and mainland trade licenses. By leveraging our team's ability to navigate vast governmental frameworks and identify regulatory patterns, our advisory board can offer valuable insights and support to corporate investors of all levels.
          </p>
        </div>

      </div>
    </section>
  );
};
