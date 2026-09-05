import React, { useState } from "react";
import { MessageSquare } from "lucide-react";
import { DataList } from "../../../../../lib/turtle-ui/components";

const clients = [
  { name: "BSP", img: "/client-logo/BSP_LOGO.png" },
  { name: "Transport", img: "/client-logo/Trasport_Logo.png" },
  { name: "Allied", img: "/client-logo/allied-logo.png" },
  { name: "Best Deal", img: "/client-logo/best_deal_logo.png" },
  { name: "DD", img: "/client-logo/dd_logo.png" },
  { name: "MAQS", img: "/client-logo/maqs-logo.png" },
  { name: "MS", img: "/client-logo/MS_LOGO_SECONDARY.png" },
  { name: "PF", img: "/client-logo/PF_LOGO.png" },
];

export const DepartmentsAndClients = () => {
  const [hoveredClient, setHoveredClient] = useState(null);

  return (
    <div className="bg-white py-24 sm:py-32 relative overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        {/* Header section */}
        <div className="about-header-item md:col-span-5 shrink-0 pt-1">
          <span className="font-mono text-sm sm:text-base font-semibold tracking-tight uppercase">
            <span className="text-bordeaux mr-1">//</span>
            <span className="text-gray-400"> Our Clients</span>
          </span>
        </div>

        <div className="text-center max-w-4xl mx-auto mb-20 sm:mb-28">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium text-[#1c1d20] mb-6 sm:mb-8 tracking-tight">
            Trusted by 5,000+ Businesses Across the UAE
          </h2>
          <p className="text-gray-600 text-lg sm:text-[19px] leading-relaxed font-light max-w-3xl mx-auto">
            From startups to established enterprises, businesses across the UAE
            trust Connect GBC for business setup, PRO, visa, accounting, and
            corporate support.
          </p>
        </div>

        {/* Logos Grid using DataList component */}
        {/* Logos Marquee */}
        <div className="relative w-full overflow-hidden flex [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] pt-48 pb-20 -mt-44 -mb-16">
          <div className="animate-marquee flex gap-16 md:gap-10 items-center w-max">
            {[...clients, ...clients, ...clients].map((client, idx) => (
              <div
                key={idx}
                className="relative group flex justify-center cursor-pointer min-w-[150px] md:min-w-[180px]"
                onMouseEnter={() => setHoveredClient(idx % clients.length)}
                onMouseLeave={() => setHoveredClient(null)}
              >
                {/* Client Logo visual simulation */}
                <div
                  className={`flex items-center justify-center transition-all duration-300 ${hoveredClient !== null && hoveredClient !== idx % clients.length ? "opacity-20" : "opacity-100"} ${hoveredClient === idx % clients.length ? "scale-105" : "scale-100"}`}
                >
                  {client.img ? (
                    <img
                      src={client.img}
                      alt={client.name}
                      className="max-h-24 max-w-[140px] object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                    />
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
                {hoveredClient === idx % clients.length &&
                  !client.tooltip &&
                  !client.img && (
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
                      hoveredClient === idx % clients.length
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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
