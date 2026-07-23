import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";

export const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef(null);
  const percentRef = useRef(null);
  const logoRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // 1. Counter and progress bar animation
    const counterObj = { value: 0 };
    tl.to(counterObj, {
      value: 100,
      duration: 1.8,
      ease: "power2.out",
      onUpdate: () => {
        setProgress(Math.floor(counterObj.value));
      }
    });

    // 2. Animate the progress bar line scale width
    tl.fromTo(
      lineRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 1.8, ease: "power2.out" },
      "<"
    );

    // 3. Logo entry and pulsing scale
    tl.fromTo(
      logoRef.current,
      { opacity: 0, scale: 0.9, y: 15 },
      { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "power3.out" },
      0.1
    );

    // 4. Transition out (wipe screen up)
    tl.to(containerRef.current, {
      yPercent: -100,
      duration: 0.9,
      ease: "power4.inOut",
      delay: 0.1,
      onComplete: onComplete
    });

    // Clean up
    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="preloader-container fixed inset-0 w-full h-screen bg-[#070708] z-[9999] flex flex-col justify-between p-8 md:p-16 select-none overflow-hidden font-sans"
    >
      {/* Top Section: Tagline/Prefix */}
      <div className="flex justify-between items-center w-full">
        <span className="text-[10px] sm:text-xs font-mono tracking-widest text-white/40 uppercase">
          Company Formation & Consulting
        </span>
        <span className="text-[10px] sm:text-xs font-mono tracking-widest text-white/40 uppercase">
          Dubai, UAE
        </span>
      </div>

      {/* Middle Section: Logo and Pulsing */}
      <div className="flex flex-col items-center justify-center flex-grow">
        <div ref={logoRef} className="mb-4">
          <img 
            src="/images/LOGO_GBC.png" 
            alt="GBC Logo" 
            className="w-32 md:w-44 h-auto object-contain brightness-0 invert opacity-90"
          />
        </div>
      </div>

      {/* Bottom Section: Counter and Progress Bar */}
      <div className="w-full flex flex-col gap-6">
        <div className="flex justify-between items-end w-full">
          <div className="flex flex-col">
            <span className="text-[10px] sm:text-xs font-mono tracking-wider text-white/30 uppercase mb-1">
              Establishing Success
            </span>
            <span className="text-xs sm:text-sm font-medium text-white/70">
              Loading GBC Experience
            </span>
          </div>

          {/* Percentage Counter */}
          <div ref={percentRef} className="text-6xl sm:text-8xl md:text-9xl font-extralight tracking-tighter text-white font-sans leading-none flex items-baseline">
            <span className="tabular-nums">{String(progress).padStart(2, "0")}</span>
            <span className="text-3xl sm:text-4xl md:text-5xl font-light text-white/40 ml-2">%</span>
          </div>
        </div>

        {/* Progress Line */}
        <div className="w-full h-[1px] bg-white/10 relative origin-left">
          <div
            ref={lineRef}
            className="absolute inset-y-0 left-0 w-full h-full bg-white origin-left"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
      </div>
    </div>
  );
};
