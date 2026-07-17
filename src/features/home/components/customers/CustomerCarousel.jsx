import React from "react";

const logos = [
  { name: "KIVRA", style: "font-black tracking-tighter text-2xl" },
  {
    name: "LEMONWAY",
    style: "font-semibold tracking-wide text-xl flex items-center gap-1",
  },
  {
    name: "AMERICAN EXPRESS",
    style: "font-bold text-sm leading-tight text-center w-24",
  },
  { name: "Lydia", style: "font-semibold text-2xl flex items-center gap-1" },
  {
    name: "PayPal",
    style: "font-bold italic text-2xl flex items-center gap-1",
  },
  { name: "tribe", style: "font-light tracking-widest text-3xl lowercase" },
];

const WaveLines = () => (
  <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40 mix-blend-overlay" viewBox="0 0 1000 300" preserveAspectRatio="none">
    {Array.from({ length: 25 }).map((_, i) => (
      <path
        key={i}
        d={`M -100 ${100 + i * 8} Q 400 ${250 - i * 15} 700 ${150 + i * 5} T 1100 ${100 + i * 10}`}
        fill="none"
        stroke="white"
        strokeWidth="1"
        opacity={Math.max(0.1, 1 - (i * 0.03))}
      />
    ))}
  </svg>
);

export const CustomerCarousel = () => {
  // Duplicate the array 3 times to ensure a smooth, seamless infinite scroll
  const duplicatedLogos = [...logos, ...logos, ...logos];

  return (
    <section className="w-full rounded-t-full py-5   overflow-hidden relative">
      
      {/* Abstract Background Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-bordeaux rounded-[100%] blur-[120px] opacity-10 pointer-events-none z-0"></div>
      <WaveLines />

      <div className="max-w-7xl mx-auto px-4 mb-10 text-center relative z-20">
        <h3 className="text-xl font-extrabold text-bordeaux tracking-wider uppercase">
          Our Customer
        </h3>
      </div>

      {/* Left and Right Fade Overlays for seamless entry/exit */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-ivory to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-ivory to-transparent z-10 pointer-events-none"></div>

      <div className="relative w-full flex overflow-hidden group z-20">
        <div className="flex animate-marquee whitespace-nowrap items-center space-x-24 px-12 group-hover:[animation-play-state:paused]">
          {duplicatedLogos.map((logo, idx) => (
            <div
              key={idx}
              className="flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 cursor-pointer min-w-[150px]"
            >
              {logo.name === "LEMONWAY" && (
                <div className="w-6 h-6 rounded-full bg-gray-700 mr-2" />
              )}
              {logo.name === "Lydia" && (
                <div className="w-6 h-6 rounded-full bg-gray-900 text-white flex items-center justify-center text-xs font-bold mr-1">
                  Λ
                </div>
              )}
              {logo.name === "PayPal" && (
                <span className="text-gray-700 font-black mr-1 text-xl">P</span>
              )}
              <span className={`text-gray-800 ${logo.style}`}>{logo.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Custom CSS for Marquee animation */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-33.3333%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `,
        }}
      />
    </section>
  );
};
