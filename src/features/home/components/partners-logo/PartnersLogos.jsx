import React, { useState } from "react";
import { DataList } from "../../../../../lib/turtle-ui/components";

const partners = [
  { name: "DP World", font: "font-sans font-bold text-gray-800 text-xl hidden", img: "/logos/1.png" },
  { name: "Dubai Municipality", font: "font-sans font-bold text-gray-800 text-xl hidden", img: "/logos/2.png" },
  { name: "Dubai Land Department", font: "font-sans font-bold text-gray-800 text-xl hidden", img: "/logos/3.jpg" },
  { name: "Ministry of Interior", font: "font-sans font-bold text-gray-800 text-xl hidden", img: "/logos/4.png" },
  { name: "Emirates Identity Authority", font: "font-sans font-bold text-gray-800 text-xl hidden", img: "/logos/5.png" },
  { name: "Dubai Courts", font: "font-sans font-bold text-gray-800 text-xl hidden", img: "/logos/6.png" },
  { name: "Dubai Chambers", font: "font-sans font-bold text-gray-800 text-xl hidden", img: "/logos/7.png" },
  { name: "RTA", font: "font-sans font-bold text-gray-800 text-xl hidden", img: "/logos/8.png" },
  { name: "Amer", font: "font-sans font-bold text-gray-800 text-xl hidden", img: "/logos/9.png" },
  { name: "Tarakees", font: "font-sans font-bold text-gray-800 text-xl hidden", img: "/logos/10.png" },
  { name: "Dubai Health Authority", font: "font-sans font-bold text-gray-800 text-xl hidden", img: "/logos/11.png" },
  { name: "General Pension & Social Security Authority", font: "font-sans font-bold text-gray-800 text-xl hidden", img: "/logos/12.png" },
  { name: "Tasheel", font: "font-sans font-bold text-gray-800 text-xl hidden", img: "/logos/13.png", tooltip: { subtitle: "MOHRE Services", desc: "Providing comprehensive Ministry of Human Resources and Emiratisation services." } },
  { name: "Tawjeeh", font: "font-sans font-bold text-gray-800 text-xl hidden", img: "/logos/14.png", tooltip: { subtitle: "Guidance Center", desc: "Awareness and guidance center for workers and employers in the UAE." } },
  { name: "DMCC", font: "font-sans font-bold text-gray-800 text-xl hidden", img: "/logos/15.png", tooltip: { subtitle: "Dubai Multi Commodities Centre", desc: "The world's flagship free zone and Government of Dubai Authority on commodities trade and enterprise." } },
  { name: "Shams", font: "font-sans font-bold text-gray-800 text-xl hidden", img: "/logos/16.png", tooltip: { subtitle: "Sharjah Media City", desc: "A world-class media hub for innovative facilities and services." } },
  { name: "Meydan", font: "font-sans font-bold text-gray-800 text-xl hidden", img: "/logos/17.png", tooltip: { subtitle: "Meydan Free Zone", desc: "Offering premium business setups in the heart of Dubai." } },
  { name: "JAFZA", font: "font-sans font-bold text-gray-800 text-xl hidden", img: "/logos/18.png", tooltip: { subtitle: "Jebel Ali Free Zone", desc: "The leading trade and logistics hub in the Middle East." } },
];
export const PartnersLogos = () => {
  const [hoveredClient, setHoveredClient] = useState(null);
  return (
    <div className="bg-white py-24 sm:py-32 relative font-sans">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        {/* Header section */}
        <div className="text-center max-w-4xl mx-auto mb-20 sm:mb-28">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium text-[#1c1d20] mb-6 sm:mb-8 tracking-tight">
            Expertise Across UAE Government Authorities & Free Zones
          </h2>
          <p className="text-gray-600 text-lg sm:text-[19px] leading-relaxed font-light max-w-3xl mx-auto">
             Connect GBC has experience handling applications across the UAE's
            major government authorities and business jurisdictions. They know
            the system, so they can help my company regardless of where I want
            to set up.
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
              <div
                className={`flex items-center justify-center transition-all duration-300 ${hoveredClient !== null && hoveredClient !== idx ? "opacity-20" : "opacity-100"} ${hoveredClient === idx ? "scale-105" : "scale-100"}`}
              >
                {client.img ? (
                  <img src={client.img} alt={client.name} className="max-h-24 w-auto object-contain px-2" />
                ) : (
                  <>
                    {client.icon && (
                      <span className="flex items-center justify-center">
                        {client.icon}
                      </span>
                    )}

                    <span
                      className={`${client.font} flex flex-col items-center justify-center`}
                    >
                      {client.name}
                      {client.subtext && (
                        <span className="block mt-0.5 tracking-[0.2em]">
                          {client.subtext}
                        </span>
                      )}
                    </span>
                  </>
                )}
              </div>

              {/* Special Badge (e.g., SHOW CASE) */}
              {hoveredClient === idx && !client.tooltip && (
                <div className="absolute -inset-8 md:-inset-10 flex items-center justify-center animate-[spin_12s_linear_infinite] pointer-events-none opacity-80 transition-opacity">
                  <svg
                    viewBox="0 0 100 100"
                    className="w-full h-full overflow-visible"
                  >
                    <path
                      id="curve"
                      d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0"
                      fill="transparent"
                    />
                    <text className="text-[9px] font-semibold tracking-[0.35em] uppercase fill-gray-900">
                      <textPath href="#curve" startOffset="0%">
                        Show Case • Show Case •
                      </textPath>
                    </text>
                  </svg>
                </div>
              )}

              {/* Tooltip Card */}
              {client.tooltip && (
                <div
                  className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-6 w-80 bg-white rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] p-6 transition-all duration-300 z-50 pointer-events-none ${
                    hoveredClient === idx
                      ? "opacity-100 translate-y-0 visible"
                      : "opacity-0 translate-y-4 invisible"
                  }`}
                >
                  <h4 className="text-gray-900 font-medium mb-1 text-base">
                    {client.name}
                  </h4>
                  <p className="text-xs text-gray-400 mb-3">
                    {client.tooltip.subtitle}
                  </p>
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
