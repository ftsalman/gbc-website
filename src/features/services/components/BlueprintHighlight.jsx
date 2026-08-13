import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../../../lib/turtle-ui/components/button/Button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export const BlueprintHighlight = () => {
  const sectionRef = useRef(null);
  const floatingElementsRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useGSAP(
    () => {
      // Stagger reveal for the central text content
      gsap.from(".center-content > *", {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        },
      });

      // Parallax effect for the floating elements when scrolling
      if (floatingElementsRef.current) {
        const elements = floatingElementsRef.current.children;

        Array.from(elements).forEach((el, index) => {
          // Randomize movement slightly for each element
          const yMove = (index % 2 === 0 ? -100 : 100) + Math.random() * 50;

          gsap.to(el, {
            y: yMove,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          });
        });
      }
    },
    { scope: sectionRef },
  );

  // CSS for floating animation that we can pause
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes float-slow {
        0% { transform: translateY(0px) rotate(var(--rot, 0deg)); }
        50% { transform: translateY(-15px) rotate(var(--rot, 0deg)); }
        100% { transform: translateY(0px) rotate(var(--rot, 0deg)); }
      }
      .floating-item {
        animation: float-slow 6s ease-in-out infinite;
        --rot: 0deg;
      }
      .paused .floating-item {
        animation-play-state: paused;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`relative w-full bg-black text-white min-h-[90vh] md:min-h-[900px] overflow-hidden flex items-center justify-center py-32 ${!isPlaying ? "paused" : ""}`}
    >
      {/* Center Content */}
      <div className="center-content relative z-20 flex flex-col items-center text-center max-w-4xl mx-auto px-6 space-y-2">
        {/* Animated Dots Icon */}
        <div className="mb-10 relative flex items-center justify-center">
          <div className="flex space-x-1.5 items-center">
            <div className="w-5 h-5 bg-white rounded-full"></div>
            <div className="w-3 h-3 bg-white rounded-full"></div>
          </div>
          {/* Small absolute dot underneath */}
          <div className="absolute top-[120%] right-3 w-1.5 h-1.5 bg-white rounded-full"></div>
        </div>

        <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.1] font-normal tracking-tight mb-12">
          One Partner for Your UAE Business Needs
          {/* <br className="hidden md:block" /> in
          minutes with GBC Portal */}
        </h2>

        <p className="flex items-center justify-center mx-auto mt-6 mb-8 max-w-2xl text-center text-[13px] font-light leading-relaxed text-gray-400 sm:text-sm">
          From business setup and PRO services to visas, accounting, government
          approvals and business centres, GBC helps you manage the essential
          processes behind your business from one trusted partner.
        </p>

        <Button
          size="lg"
          variant="primary"
          className="bg-white text-black hover:bg-gray-200 transition-colors px-10 py-5 rounded-[0.25rem] font-bold tracking-widest uppercase text-sm"
          onClick={() => (window.location.href = "/contact")}
        >
          Get Free Consultation
        </Button>
      </div>

      {/* Floating Elements Area (Desktop mostly) */}
      <div
        ref={floatingElementsRef}
        className="absolute inset-0 pointer-events-none z-10 hidden md:block"
      >
        {/* Top Left: Dashboard Screen Partial */}
        <div
          className="absolute top-[-5%] left-[2%] w-[400px] h-[300px] bg-gray-900 rounded-xl shadow-2xl overflow-hidden floating-item border border-gray-800"
          style={{
            "--rot": "-10deg",
            animationDelay: "0s",
            animationDuration: "8s",
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600"
            alt="Dashboard"
            className="w-full h-full object-cover opacity-60"
          />
        </div>

        {/* Mid Left: Colorful Orb */}
        <div
          className="absolute top-[35%] left-[10%] w-64 h-64 rounded-full bg-gradient-to-tr from-[#8EAD9B] via-[#E6C687] to-[#D17B55] opacity-90 blur-[1px] floating-item shadow-2xl"
          style={{ animationDelay: "1.5s", animationDuration: "7s" }}
        >
          {/* Small reflection dot on orb */}
          <div className="absolute top-[40%] left-[10%] w-3 h-3 bg-white/40 rounded-full blur-[1px]"></div>
        </div>

        {/* Bottom Left: Glass Panel (Fonts) */}
        <div
          className="absolute bottom-[10%] left-[8%] w-80 h-36 bg-gradient-to-b from-white/10 to-transparent backdrop-blur-md border border-white/20 rounded-xl p-6 shadow-2xl floating-item"
          style={{ "--rot": "-4deg", animationDelay: "0.5s" }}
        >
          <p className="text-[10px] tracking-widest text-gray-400 uppercase mb-3 font-semibold">
            Fonts
          </p>
          <p className="text-4xl font-serif mb-2">Heading</p>
          <p className="text-sm text-gray-300 font-serif italic">
            This is your paragraph font.
          </p>
        </div>

        {/* Top Right: Soft Aesthetic Image Card */}
        <div
          className="absolute top-[5%] right-[10%] w-72 h-36 bg-[#F5F2EB] rounded-xl overflow-hidden shadow-2xl flex floating-item"
          style={{ "--rot": "3deg", animationDelay: "2s" }}
        >
          <div className="w-1/2 p-6 text-black flex flex-col justify-between">
            <p className="text-4xl font-serif tracking-tight">Faun</p>
            <div className="space-y-1">
              <div className="h-0.5 w-full bg-gray-300"></div>
              <div className="h-0.5 w-2/3 bg-gray-300"></div>
            </div>
          </div>
          <div className="w-1/2">
            <img
              src="https://i.pinimg.com/1200x/5a/fa/42/5afa42ff2b0684bf617c51a39fb14d07.jpg"
              alt="Aesthetic"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Center Right: Pill Tags */}
        <div
          className="absolute top-[45%] right-[25%] px-8 py-3 bg-[#111] backdrop-blur-md border border-white/5 rounded-full text-sm text-gray-300 shadow-xl floating-item"
          style={{ "--rot": "-8deg", animationDelay: "1s" }}
        >
          Ethereal
        </div>
        <div
          className="absolute top-[55%] right-[32%] px-5 py-1.5 bg-[#111] backdrop-blur-md border border-white/5 rounded-full text-xs text-gray-400 shadow-xl floating-item"
          style={{
            "--rot": "5deg",
            animationDelay: "3s",
            animationDuration: "5s",
          }}
        >
          Retro
        </div>
        <div
          className="absolute bottom-[28%] right-[35%] px-8 py-2.5 bg-[#111] backdrop-blur-md border border-white/5 rounded-full text-sm text-gray-300 shadow-xl floating-item"
          style={{ "--rot": "12deg", animationDelay: "0s" }}
        >
          Professional
        </div>

        {/* Bottom Right: Color Palette UI */}
        <div
          className="absolute bottom-[18%] right-[22%] w-56 h-20 bg-[#1A1A1A] rounded-xl border border-gray-800 flex items-center px-4 gap-4 shadow-2xl floating-item z-20"
          style={{ "--rot": "-3deg", animationDelay: "2.5s" }}
        >
          <span className="text-2xl font-bold font-sans">Aa</span>
          <div className="flex-1 flex h-10 rounded-md overflow-hidden">
            <div className="w-1/3 bg-white"></div>
            <div className="w-1/3 bg-[#d8b4e2]"></div>
            <div className="w-1/3 bg-[#2a4d46]"></div>
          </div>
        </div>

        {/* Bottom Right: Leather Block Image */}
        <div
          className="absolute bottom-[-10%] right-[5%] w-72 h-80 rounded-2xl overflow-hidden shadow-2xl floating-item border border-white/10"
          style={{ "--rot": "0deg", animationDelay: "1.2s" }}
        >
          <img
            src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=400"
            alt="Texture"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Play/Pause Control (Bottom Right Corner) */}
      <div
        onClick={() => setIsPlaying(!isPlaying)}
        className="absolute bottom-8 right-8 w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center cursor-pointer transition-colors z-30 border border-white/10"
      >
        {isPlaying ? (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
          </svg>
        ) : (
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="white"
            className="ml-1"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </div>
    </section>
  );
};
