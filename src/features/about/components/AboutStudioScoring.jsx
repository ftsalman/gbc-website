import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ---------------------------------------------------------------------------
// Odometer digit — vertical slot-machine scroll
// ---------------------------------------------------------------------------
const OdometerDigit = ({ digit, direction = "down", delay = 0 }) => {
  const stripRef = useRef(null);

  const sequence =
    direction === "down"
      ? ["9", "8", "7", "6", "5", "4", "3", "2", "1", "0", digit]
      : ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", digit];

  useGSAP(
    () => {
      if (!stripRef.current) return;
      const totalSteps = sequence.length - 1;
      gsap.fromTo(
        stripRef.current,
        { yPercent: direction === "down" ? 0 : -totalSteps * (100 / sequence.length) },
        {
          yPercent: direction === "down" ? -totalSteps * (100 / sequence.length) : 0,
          duration: 1.6,
          delay,
          ease: "expo.out",
          scrollTrigger: { trigger: stripRef.current, start: "top 85%" },
        }
      );
    },
    { scope: stripRef }
  );

  return (
    // Dark text to match white-bg design
    <div className="inline-block h-[1em] overflow-hidden relative leading-none align-bottom font-sans font-normal tracking-tight text-[clamp(3rem,7vw,6rem)] text-gray-900">
      <div ref={stripRef} className="flex flex-col">
        {sequence.map((num, i) => (
          <span key={i} className="h-[1em] flex items-center justify-center leading-none">
            {num}
          </span>
        ))}
      </div>
    </div>
  );
};

// Number + suffix rendered as an odometer
const OdometerStat = ({ numberStr, suffix }) => {
  const digits = numberStr.split("");
  return (
    <div className="flex items-baseline">
      {digits.map((char, index) => (
        <OdometerDigit
          key={index}
          digit={char}
          direction={index % 2 === 0 ? "down" : "up"}
          delay={index * 0.08}
        />
      ))}
      {/* suffix in bordeaux — matches the blue `+` / `%` in the Syncox reference */}
      <span className="text-[clamp(2.5rem,6vw,5.25rem)] font-normal tracking-tight text-bordeaux ml-0.5 leading-none">
        {suffix}
      </span>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Stats data
// ---------------------------------------------------------------------------
const scoringStats = [
  {
    id: "[01]",
    number: "50",
    suffix: "+",
    description: "Happy clients across various industries",
    position: "left",
  },
  {
    id: "[02]",
    number: "100",
    suffix: "+",
    description: "Successfully delivered high-quality projects",
    position: "right",
  },
  {
    id: "[03]",
    number: "98",
    suffix: "%",
    description: "Successfully delivered high-quality projects",
    position: "left",
  },
  {
    id: "[04]",
    number: "30",
    suffix: "%",
    description: "Average client profit growth increase",
    position: "right",
  },
];

// Thin crosshair `+` icon matching the Syncox junction marker
const CrosshairSvg = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <line x1="7" y1="0" x2="7" y2="14" stroke="currentColor" strokeWidth="1.5" />
    <line x1="0" y1="7" x2="14" y2="7" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------
export const AboutStudioScoring = () => {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".scoring-header-item",
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        }
      );

      gsap.fromTo(
        ".scoring-grid-cell",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.0,
          stagger: 0.13,
          ease: "power3.out",
          scrollTrigger: { trigger: ".scoring-grid-wrapper", start: "top 75%" },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="about-studio-scoring bg-white text-gray-900 py-20 sm:py-28 relative overflow-hidden font-sans"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">

        {/* ── Horizontal header (matches Syncox .section-heading-horizontal-block) ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start mb-16 sm:mb-20">
          {/* Left: label */}
          <div className="scoring-header-item md:col-span-5 shrink-0 pt-1">
            <span className="font-mono text-sm font-semibold tracking-tight uppercase flex items-center gap-1.5">
              <span className="text-bordeaux">//</span>
              <span className="text-gray-400">About GBC Business Connect</span>
            </span>
          </div>

          {/* Right: headline */}
          <div className="scoring-header-item md:col-span-7">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal leading-[1.2] tracking-tight text-gray-900 max-w-xl">
              GBC Business Connect isn't just about change — we're setting new
              standards with bold creativity and thinking innovation.
            </h2>
          </div>
        </div>

        {/* ── Checkerboard scoring grid ── */}
        {/*
          Layout (desktop):
          ┌─────────────────────┬─────────────────────┐
          │  [01]  50+  desc    │         (empty)     │
          ├─────────────────────┼──+──────────────────┤  ← crosshair at junction
          │       (empty)       │   100+  [02]  desc  │
          ├─────────────────────┼─────────────────────┤
          │  [03]  98%  desc    │         (empty)     │
          ├─────────────────────┼──+──────────────────┤  ← crosshair at junction
          │       (empty)       │    30%  [04]  desc  │
          └─────────────────────┴─────────────────────┘
        */}
        <div className="scoring-grid-wrapper border border-gray-200 grid grid-cols-1 lg:grid-cols-2 relative">
          {scoringStats.map((stat, idx) => {
            const isRight = stat.position === "right";
            // Rows pair as (0,1) and (2,3). isLastPair = rows 2-3
            const isLastPair = idx >= 2;
            // Show crosshair on the left-content cells (positions 0 and 2)
            const showCrosshair = !isRight;

            return (
              <React.Fragment key={stat.id}>
                {/* ── Blank cell (alternating side) ── */}
                {isRight && (
                  <div
                    className={`hidden lg:block border-r border-gray-200 min-h-[200px] sm:min-h-[240px]${
                      !isLastPair ? " border-b border-gray-200" : ""
                    }`}
                  />
                )}

                {/* ── Active stat cell ── */}
                <div
                  className={`scoring-grid-cell relative min-h-[200px] sm:min-h-[240px] p-8 sm:p-10 md:p-12 flex flex-col
                    ${isRight
                      ? "items-end text-right justify-center"
                      : "items-start text-left justify-center"
                    }
                    ${!isRight ? "border-r border-gray-200" : ""}
                    ${!isLastPair ? "border-b border-gray-200" : ""}
                  `}
                >
                  {/* Content wrapper */}
                  {isRight ? (
                    // Right cell: number + [ID] on same row, desc below right-aligned
                    <>
                      <div className="flex items-baseline gap-3 justify-end">
                        <OdometerStat numberStr={stat.number} suffix={stat.suffix} />
                        <span className="font-mono text-sm text-gray-400 font-normal shrink-0 self-start pt-1">
                          {stat.id}
                        </span>
                      </div>
                      <p className="text-gray-500 text-sm sm:text-base font-light leading-relaxed mt-3 max-w-xs text-right">
                        {stat.description}
                      </p>
                    </>
                  ) : (
                    // Left cell: [ID] label top, number below, desc below
                    <>
                      <span className="font-mono text-sm text-gray-400 font-normal mb-1">
                        {stat.id}
                      </span>
                      <OdometerStat numberStr={stat.number} suffix={stat.suffix} />
                      <p className="text-gray-500 text-sm sm:text-base font-light leading-relaxed mt-3 max-w-xs text-left">
                        {stat.description}
                      </p>
                    </>
                  )}

                  {/* Crosshair junction marker — bottom-right of left cells = center grid junction */}
                  {showCrosshair && !isLastPair && (
                    <span className="hidden lg:flex absolute -bottom-[7px] -right-[7px] w-[14px] h-[14px] items-center justify-center text-bordeaux z-20 pointer-events-none">
                      <CrosshairSvg />
                    </span>
                  )}
                </div>

                {/* ── Blank cell on the right of left-content rows ── */}
                {!isRight && (
                  <div
                    className={`hidden lg:block min-h-[200px] sm:min-h-[240px]${
                      !isLastPair ? " border-b border-gray-200" : ""
                    }`}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
};
