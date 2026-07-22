import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Wifi, HeadphonesIcon, Coffee, FileCheck, ArrowRight, Palette, Layers, HelpCircle, Laptop } from "lucide-react";
import { Card, DataList } from "../../../../../lib/turtle-ui/components.js";

gsap.registerPlugin(ScrollTrigger);

export const BusinessCenterAmenities = () => {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".bc-amenity-card",
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
          }
        }
      );
    },
    { scope: sectionRef }
  );

  const amenitiesData = [
    {
      id: "wi-fi",
      title: "Enterprise Wi-Fi",
      desc: "Ultra-fast, secure, and dedicated internet lines for uninterrupted business."
    },
    {
      id: "reception",
      title: "Reception & IT",
      desc: "Professional front-desk greeting and on-site IT support for your team."
    },
    {
      id: "lounges",
      title: "Luxury Lounges",
      desc: "Access to premium common areas with complimentary artisan coffee."
    },
    {
      id: "ejari",
      title: "Ejari Compliant",
      desc: "Valid tenancy contracts for issuing or renewing your DED Trade License."
    }
  ];

  return (
    <section ref={sectionRef} className="py-24 sm:py-32 bg-[#0A0A0A] text-white border-t border-white/5 relative overflow-hidden font-sans">
      
      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-white">
            Premium Amenities Included
          </h2>
          <p className="text-lg text-white/60 font-light max-w-2xl mx-auto">
            Everything you need to run your business smoothly is included in one transparent monthly package.
          </p>
        </div>

        {/* Custom Grid using turtle-ui DataList & Card Components */}
        <DataList
          data={amenitiesData}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 w-full"
          render={(item, idx) => (
            <Card
              key={idx}
              className="bc-amenity-card group rounded-[32px] p-6 flex flex-col justify-between min-h-[460px] shadow-none hover:shadow-none transition-all duration-500 cursor-pointer overflow-hidden border border-none relative"
              style={{ backgroundColor: idx === 0 ? '#3F3B38' : idx === 1 ? '#000000' : '#EBE5DE' }}
            >
              {/* Card 3 Desk background overlay if Lounges */}
              {idx === 2 && (
                <div className="absolute inset-0 z-0 pointer-events-none">
                  <img 
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000&auto=format&fit=crop" 
                    alt="Premium Lounge Desk" 
                    className="w-full h-full object-cover opacity-35"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/40 to-stone-900/60" />
                </div>
              )}

              {/* Card 4 Leaf background overlay if Ejari */}
              {idx === 3 && (
                <div className="absolute inset-0 z-0 pointer-events-none">
                  <img 
                    src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=1000&auto=format&fit=crop" 
                    alt="Green Leaf Background" 
                    className="w-full h-full object-cover opacity-25"
                  />
                  <div className="absolute inset-0 bg-[#0B132B]" style={{ mixBlendMode: 'multiply' }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B]/90 via-[#0B132B]/40 to-[#0B132B]/60" />
                </div>
              )}

              {/* Top Text info */}
              <div className="space-y-3 relative z-10">
                <h3 className={`text-2xl font-bold tracking-tight ${idx === 2 || idx === 3 ? 'text-white' : idx === 0 || idx === 1 ? 'text-white' : 'text-gray-900'}`}>
                  {item.title}
                </h3>
                <p className={`text-sm leading-relaxed font-light ${idx === 2 || idx === 3 ? 'text-white/80' : idx === 0 || idx === 1 ? 'text-white/70' : 'text-gray-500'}`}>
                  {item.desc}
                </p>
              </div>

              {/* Center Graphic matching the images */}
              <div className="relative w-full h-48 flex items-center justify-center my-4 overflow-hidden rounded-2xl">
                
                {/* Graphic 1: Enterprise Wi-Fi */}
                {idx === 0 && (
                  <div className="w-full h-full flex items-center justify-center relative">
                    <div className="absolute w-28 h-28 bg-blue-500/10 rounded-full blur-xl" />
                    {/* Browser UI Mockup */}
                    <div className="w-40 h-24 bg-[#2F2A28] border border-slate-700/50 rounded-2xl p-2.5 shadow-lg relative z-10 flex flex-col justify-between">
                      <div className="w-full h-12 rounded-lg overflow-hidden bg-slate-900 flex items-center justify-center">
                        <Wifi className="w-6 h-6 text-blue-400" />
                      </div>
                      <div className="w-12 h-2 bg-slate-700 rounded-full" />
                    </div>
                    {/* Color palette Aa selector box */}
                    <div className="absolute right-4 top-4 bg-white border border-slate-200/80 px-2 py-1.5 rounded-lg shadow-md flex items-center gap-1.5 z-20">
                      <Palette className="w-3.5 h-3.5 text-slate-800" />
                      <span className="text-[8px] font-bold text-slate-800">Aa</span>
                    </div>
                  </div>
                )}

                {/* Graphic 2: Reception & IT Support */}
                {idx === 1 && (
                  <div className="w-full h-full flex items-center justify-center relative">
                    <div className="absolute w-24 h-24 bg-[#6C141E]/10 rounded-full blur-xl" />
                    {/* Floating tilted items */}
                    <div className="absolute left-6 top-10 bg-zinc-900 border border-zinc-800 px-2.5 py-1.5 rounded-xl shadow-md text-[9px] text-zinc-400 -rotate-12 select-none flex items-center gap-1.5 z-10">
                      <HeadphonesIcon className="w-3 h-3 text-[#6C141E]" />
                      Front Desk
                    </div>
                    {/* Glowing circular orb */}
                    <div className="absolute right-12 top-6 w-8 h-8 rounded-full bg-gradient-to-tr from-rose-500 to-indigo-600 blur-[2px] z-0" />
                    <div className="absolute right-4 bottom-12 bg-white text-zinc-800 px-2.5 py-1.5 rounded-xl shadow-md text-[9px] font-semibold rotate-12 select-none flex items-center gap-1.5 z-10">
                      <Layers className="w-3 h-3 text-indigo-500" />
                      IT Support
                    </div>
                  </div>
                )}

                {/* Graphic 3: Premium Lounges */}
                {idx === 2 && (
                  <div className="w-full h-full flex items-center justify-center relative z-10">
                    {/* Central white circular emblem with Gmail-style mug color gradient */}
                    <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-2xl border border-slate-100/50">
                      <Coffee className="w-10 h-10 text-[#6C141E] fill-[#6C141E]/10" />
                    </div>
                  </div>
                )}

                {/* Graphic 4: Ejari & Government Liaison */}
                {idx === 3 && (
                  <div className="w-full h-full flex items-center justify-center relative z-10">
                    {/* Input search bar */}
                    <div className="w-44 h-9 bg-slate-50 border border-slate-200/80 rounded-full px-3 shadow-md flex items-center justify-between text-[9px] text-slate-500">
                      <div className="flex items-center gap-1">
                        <HelpCircle className="w-3 h-3 text-slate-400" />
                        <span>ejari-contract | .com</span>
                      </div>
                    </div>
                    {/* Floating tags */}
                    <div className="absolute left-6 top-6 bg-[#000000]/60 border border-slate-700/50 px-2 py-0.5 rounded-md text-[7px] text-white">.ded</div>
                    <div className="absolute right-8 top-8 bg-[#000000]/60 border border-slate-700/50 px-2 py-0.5 rounded-md text-[7px] text-white">.gov</div>
                    <div className="absolute right-12 bottom-6 bg-[#000000]/60 border border-slate-700/50 px-2 py-0.5 rounded-md text-[7px] text-white">.renew</div>
                  </div>
                )}

              </div>

              {/* Bottom footer button / tags */}
              <div className="flex items-center justify-between mt-auto pt-6 relative z-10">
                {idx === 0 ? (
                  <span className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-semibold text-white/90">
                    High Speed
                  </span>
                ) : (
                  <div className="h-6" />
                )}
                
                <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${idx === 2 || idx === 3 ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </Card>
          )}
        />

      </div>
    </section>
  );
};
