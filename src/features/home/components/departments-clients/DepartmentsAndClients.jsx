import React, { useState } from "react";
import { MessageSquare } from "lucide-react";
import { DataList } from "../../../../../lib/turtle-ui/components";

// Updated with actual GBC Corporate Services partners (Free Zones & Government Authorities)
const partners = [
  { name: "IFZA", font: "font-black tracking-widest text-2xl text-blue-900", img: null },
  { name: "DMCC", font: "font-black tracking-tighter text-2xl text-yellow-500", img: null },
  { name: "Meydan", font: "font-serif text-gray-800 text-3xl", img: null },
  { name: "Shams", font: "font-sans font-bold text-orange-500 text-xl flex items-center gap-2", icon: <span className="w-5 h-5 bg-orange-400 rounded-full inline-block"></span> },
  { name: "JAFZA", font: "font-black text-blue-800 text-2xl", img: null },
  { name: "RAKEZ", font: "font-sans font-bold text-gray-800 flex items-center gap-2 text-xl", icon: <span className="text-red-500 font-black">R</span> },
  { name: "Dubai Economy", font: "font-sans font-medium text-lg text-gray-700 tracking-wide", img: null },
  { name: "DDA", font: "font-black text-indigo-500 text-2xl tracking-tighter", img: null },
  { name: "DWC", font: "font-black italic border-2 border-black px-1 transform -skew-x-12 text-xl", img: null },
  { name: "SPC Free Zone", font: "font-bold text-blue-900 flex items-center gap-2 text-lg", icon: <span className="text-blue-500 text-xl">◆</span> },
  { name: "Masdar", font: "font-black text-green-600 text-2xl", img: null },
  { name: "KIZAD", font: "font-medium text-gray-800 tracking-[0.2em] text-sm flex items-center gap-2", icon: <span className="text-red-600 font-bold">K</span> },
  { 
    name: "TwoFour54", 
    font: "font-sans font-bold text-gray-800 flex flex-col justify-center text-sm text-center leading-none", 
    icon: <span className="font-black text-purple-600 text-2xl mr-2 leading-none">24</span>,
    tooltip: {
      subtitle: "Abu Dhabi Media Zone",
      desc: "Providing world-class infrastructure for media, entertainment, and gaming businesses in Abu Dhabi."
    }
  },
  { 
    name: "AFZA", 
    font: "font-sans font-black text-xl text-blue-700", 
    img: null,
    tooltip: {
      subtitle: "Ajman Free Zone",
      desc: "Offering highly cost-effective setup options for startups and SMEs globally."
    }
  },
  { 
    name: "SAIF Zone", 
    font: "font-serif text-black text-xs text-center leading-tight flex flex-col items-center uppercase font-bold", 
    subtext: "SHARJAH AIRPORT", 
    icon: <div className="w-5 h-5 border-[3px] border-black rounded-sm mb-1"></div>,
    tooltip: {
      subtitle: "Sharjah Airport International Free Zone",
      desc: "The premier business destination offering fast-track setup and premium logistics."
    }
  },
  { 
    name: "Creative City", 
    font: "font-black text-pink-500 text-xl tracking-tight", 
    img: null,
    tooltip: {
      subtitle: "Fujairah Creative City",
      desc: "Dedicated to media, consulting, and education professionals seeking flexible setups."
    }
  },
  { 
    name: "UAQ FTZ", 
    font: "font-serif text-blue-900 leading-tight text-center text-[16px] font-bold", 
    img: null,
    tooltip: {
      subtitle: "Umm Al Quwain Free Trade Zone",
      desc: "A business-friendly environment tailored for micro-businesses and freelancers."
    }
  },
  { 
    name: "Dubai Silicon Oasis", 
    font: "font-black text-blue-600 text-[15px] tracking-tight", 
    img: null,
    tooltip: {
      subtitle: "DSO Authority",
      desc: "An integrated technology park providing unmatched IT infrastructure and tech incubators."
    }
  },
];

export const DepartmentsAndClients = () => {
  const [hoveredClient, setHoveredClient] = useState(null);

  return (
    <div className="bg-white py-24 sm:py-32 relative overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        {/* Header section */}
        <div className="text-center max-w-4xl mx-auto mb-20 sm:mb-28">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium text-[#1c1d20] mb-6 sm:mb-8 tracking-tight">
            Trusted by leading authorities
          </h2>
          <p className="text-gray-600 text-lg sm:text-[19px] leading-relaxed font-light max-w-3xl mx-auto">
            We partner with the top free zones and government entities across the UAE to provide you with seamless business setup services and unparalleled support.
          </p>
        </div>

        {/* Logos Grid using DataList component */}
        <DataList 
          data={partners}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-8 gap-y-16 items-center justify-items-center"
          render={(client, idx) => (
            <div 
              key={idx} 
              className="relative group w-full flex justify-center cursor-pointer"
              onMouseEnter={() => setHoveredClient(idx)}
              onMouseLeave={() => setHoveredClient(null)}
            >
              {/* Client Logo visual simulation */}
              <div className={`flex items-center justify-center transition-all duration-300 ${hoveredClient !== null && hoveredClient !== idx ? 'opacity-20' : 'opacity-100'} ${hoveredClient === idx ? 'scale-105' : 'scale-100'}`}>
                {client.icon && <span className="flex items-center justify-center">{client.icon}</span>}
                
                <span className={`${client.font} flex flex-col items-center justify-center`}>
                  {client.name}
                  {client.subtext && <span className="block mt-0.5 tracking-[0.2em]">{client.subtext}</span>}
                </span>
              </div>

              {/* Special Badge (e.g., SHOW CASE) */}
              {hoveredClient === idx && !client.tooltip && (
                <div className="absolute -inset-8 md:-inset-10 flex items-center justify-center animate-[spin_12s_linear_infinite] pointer-events-none opacity-80 transition-opacity">
                  <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
                    <path id="curve" d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" fill="transparent" />
                    <text className="text-[9px] font-semibold tracking-[0.35em] uppercase fill-gray-900">
                      <textPath href="#curve" startOffset="0%">Show Case • Show Case •</textPath>
                    </text>
                  </svg>
                </div>
              )}

              {/* Tooltip Card */}
              {client.tooltip && (
                <div 
                  className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-6 w-80 bg-white rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] p-6 transition-all duration-300 z-50 pointer-events-none ${
                    hoveredClient === idx ? 'opacity-100 translate-y-0 visible' : 'opacity-0 translate-y-4 invisible'
                  }`}
                >
                  <h4 className="text-gray-900 font-medium mb-1 text-base">{client.name}</h4>
                  <p className="text-xs text-gray-400 mb-3">{client.tooltip.subtitle}</p>
                  <p className="text-[13px] text-gray-600 leading-relaxed font-light">
                    {client.tooltip.desc}
                  </p>
                  
                  {/* Tooltip triangle tail */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-[8px] border-transparent border-t-white"></div>
                </div>
              )}
            </div>
          )}
        />
      </div>
    </div>
  );
};
