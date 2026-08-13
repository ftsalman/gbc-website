import React, { useState } from "react";
import { useScrollSequence, useReveal } from "../utils/utils";
import { SequenceCanvas } from "./SequenceCanvas";
import { journeyCards } from "../constants/heroData";

/*
  Thresholds tuned for h-[300vh] (scrollable distance = 200vh).
  Cards appear progressively as the walker moves through the hallway.
*/
const CARD_THRESHOLDS = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8];

const JourneyCard = ({ card, visible }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex flex-col overflow-hidden cursor-pointer rounded-xl border border-white/10 p-2 backdrop-blur-md sm:p-4"
      style={{
        background: "rgba(20, 14, 8, 0.72)",
        opacity: visible ? 1 : 0,
        transform: visible
          ? hovered
            ? "translateY(-7px) scale(1.02)"
            : "translateY(0px) scale(1)"
          : "translateY(28px) scale(0.98)",
        filter: visible ? "blur(0px)" : "blur(5px)",
        transition: visible
          ? "opacity 700ms cubic-bezier(0.22,1,0.36,1), filter 700ms cubic-bezier(0.22,1,0.36,1), transform 300ms ease, box-shadow 300ms ease"
          : "opacity 0ms, filter 0ms, transform 0ms",
        boxShadow: hovered
          ? "0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(212,182,120,0.15)"
          : "0 6px 24px rgba(0,0,0,0.4)",
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px transition-opacity duration-300"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(212,182,120,0.6) 40%, rgba(253,230,138,0.6) 60%, transparent 100%)",
          opacity: hovered ? 1 : 0,
        }}
      />

      <p
        className="mb-2 text-[9px] font-medium uppercase tracking-[0.32em] sm:text-[10px]"
        style={{ color: "rgba(212,182,120,0.9)" }}
      >
        {card.label}
      </p>

      <h3 className="text-lg font-light leading-snug text-white sm:text-xl lg:text-[1.35rem]">
        {card.title}
      </h3>

      <p className="mt-3 text-[13px] leading-relaxed text-zinc-300/75 sm:text-sm">
        {card.description}
      </p>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-20 rounded-b-xl transition-opacity duration-300"
        style={{
          background:
            "linear-gradient(to top, rgba(212,182,120,0.05), transparent)",
          opacity: hovered ? 1 : 0,
        }}
      />
    </article>
  );
};

export const JourneySequence = () => {
  const { sectionRef, canvasRef, progress } = useScrollSequence({
    folder: "/hallway_frames",
    frameCount: 192,
  });

  const [headingRef, headingVisible] = useReveal({ threshold: 0.08 });

  return (
    <div id="creative-journey">
      <section ref={sectionRef} className="relative h-[300vh] bg-black">
        <div className="sticky top-0 flex h-[100dvh] flex-col overflow-hidden bg-black">
          <div className="absolute inset-0 z-0">
            <SequenceCanvas canvasRef={canvasRef} overlay="journey" />
          </div>

          <div
            ref={headingRef}
            className="relative z-20 flex-none px-5 pt-20 sm:px-8 sm:pt-24 md:px-12 lg:px-16 lg:pt-28"
          >
            <div className="mx-auto w-full max-w-6xl">
              <div className="max-w-xl">
                <p
                  className="mb-3 text-[12px] font-extrabold uppercase tracking-[0.28em] sm:text-md"
                  style={{
                    color: "white",
                    opacity: headingVisible ? 1 : 0,
                    transform: headingVisible
                      ? "translateY(0)"
                      : "translateY(14px)",
                    transition: "opacity 600ms ease, transform 600ms ease",
                  }}
                >
                  Your Business Journey
                </p>

                <h2
                  className="text-3xl font-bold leading-[0.95] text-white sm:text-4xl lg:text-6xl"
                  style={{
                    opacity: headingVisible ? 1 : 0,
                    transform: headingVisible
                      ? "translateY(0)"
                      : "translateY(28px)",
                    filter: headingVisible ? "blur(0)" : "blur(8px)",
                    transition:
                      "opacity 700ms cubic-bezier(0.22,1,0.36,1) 80ms, transform 700ms cubic-bezier(0.22,1,0.36,1) 80ms, filter 700ms cubic-bezier(0.22,1,0.36,1) 80ms",
                  }}
                >
                 From Business Idea  {" "}
                  <span className="block italic text-white">
                 to Licensed Company.
                  </span>
                </h2>
              </div>
            </div>
          </div>

          <div className="min-h-0 flex-1" />

          <div className="pointer-events-none relative z-20 flex-none px-5 pb-10 sm:px-8 md:px-12 lg:px-16 lg:pb-16 mt-10">
            <div className="mx-auto w-full max-w-6xl">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
                {journeyCards.map((card, index) => (
                  <JourneyCard
                    key={card.label}
                    card={card}
                    visible={progress >= CARD_THRESHOLDS[index]}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
