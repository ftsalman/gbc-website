import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaRegHandshake, FaPassport, FaBuilding, FaCity, FaUsers } from "react-icons/fa";
import { MdOutlineFactCheck, MdAssignmentInd } from "react-icons/md";
import { TbLicense } from "react-icons/tb";
import { DataList } from "../../../../../lib/turtle-ui/components/list/DataList";

gsap.registerPlugin(ScrollTrigger);

const floatingCards = [
  { id: 1, top: "15%", left: "28%", icon: TbLicense, color: "text-blue-600", bgClass: "bg-blue-50", badge: "500+", badgeType: "number", label: "TRADE\nLICENSE" },
  { id: 2, top: "16%", left: "55%", icon: MdAssignmentInd, color: "text-green-600", bgClass: "bg-green-50", badge: "10K+", badgeType: "number", label: "VISA" },
  { id: 3, top: "20%", left: "80%", icon: FaUsers, color: "text-purple-600", bgClass: "bg-purple-50", badge: "Clients", badgeType: "text", label: "" },
  { id: 4, top: "35%", left: "10%", icon: FaBuilding, color: "text-indigo-600", bgClass: "bg-indigo-50", badge: "", badgeType: "dot", label: "" }, 
  { id: 5, top: "50%", left: "90%", icon: FaCity, color: "text-rose-600", bgClass: "bg-rose-50", badge: "", badgeType: "dot", label: "" }, 
  { id: 6, top: "75%", left: "28%", icon: FaRegHandshake, color: "text-amber-600", bgClass: "bg-amber-50", badge: "Support", badgeType: "text", label: "" },
  { id: 7, top: "72%", left: "55%", icon: MdOutlineFactCheck, color: "text-teal-600", bgClass: "bg-teal-50", badge: "2K+", badgeType: "number", label: "" },
  { id: 8, top: "82%", left: "80%", icon: FaPassport, color: "text-sky-600", bgClass: "bg-sky-50", badge: "APPROVED", badgeType: "stamp", label: "PASSPORT" },
];

export const WhyChoose = ({ 
  bgColor = "", 
  textColor = "text-white",
  lineColor = "#ffffff",
  gradient1 = "bg-red-900/30",
  gradient2 = "bg-red-800/20",
  gradient3 = "bg-red-950/20"
}) => {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });

      // Title & Text animation
      tl.fromTo(
        ".wc-text",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out" }
      );

      // SVG Lines animation
      tl.fromTo(
        ".wc-path",
        { strokeDasharray: 100, strokeDashoffset: 100 },
        { strokeDashoffset: 0, duration: 1.5, ease: "power2.out", stagger: 0.1 },
        "-=0.5"
      );

      // Floating cards pop-in
      tl.fromTo(
        ".wc-card",
        { scale: 0, opacity: 0, rotation: -10 },
        { scale: 1, opacity: 1, rotation: 0, duration: 0.8, stagger: 0.1, ease: "back.out(1.5)" },
        "-=1.2"
      );

      // Continuous floating animation
      gsap.to(".wc-card", {
        y: "random(-15, 15)",
        x: "random(-10, 10)",
        rotation: "random(-5, 5)",
        duration: "random(3, 5)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.1
      });
    },
    { scope: sectionRef }
  );

  return (
    <div ref={sectionRef} className={`relative w-full h-[700px] overflow-hidden font-sans ${bgColor || 'bg-[#0a0a0a]'}`}>
      
      {/* Glowing Aurora Background Effects */}
      <div className={`absolute top-[-20%] left-[-10%] w-[70%] h-[70%] ${gradient1} rounded-full blur-[120px] pointer-events-none z-0`}></div>
      <div className={`absolute bottom-[-10%] right-[-20%] w-[60%] h-[80%] ${gradient2} rounded-full blur-[140px] pointer-events-none z-0`}></div>
      <div className={`absolute top-[30%] left-[20%] w-[50%] h-[50%] ${gradient3} rounded-full blur-[100px] pointer-events-none z-0`}></div>

      {/* Curved connecting lines (SVG) */}
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full pointer-events-none z-0">
        {/* Line from Burj Al Arab (Card 4) to Trade License (Card 1) */}
        <path className="wc-path" d="M 10 35 Q 25 33 28 15" fill="none" stroke={lineColor} strokeWidth="0.4" vectorEffect="non-scaling-stroke" />
        
        {/* Line from Burj Khalifa (Card 5) to Clients (Card 3) */}
        <path className="wc-path" d="M 90 50 Q 82 40 80 20" fill="none" stroke={lineColor} strokeWidth="0.4" vectorEffect="non-scaling-stroke" />
        
        {/* Line from Doc Check (Card 7) to Passport (Card 8) */}
        <path className="wc-path" d="M 55 72 Q 68 68 80 82" fill="none" stroke={lineColor} strokeWidth="0.4" vectorEffect="non-scaling-stroke" />
      </svg>

      {/* Floating Cards */}
      <DataList
        data={floatingCards}
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
        render={(card) => (
          <div
            key={card.id}
            className="wc-card pointer-events-auto absolute flex flex-col items-center justify-center bg-white/5 backdrop-blur-md rounded-3xl shadow-[0_15px_35px_rgba(0,0,0,0.5)] border border-white/10 p-4"
            style={{ top: card.top, left: card.left, transform: 'translate(-50%, -50%)', width: '90px', height: '90px' }}
          >
            {/* Badge */}
            {card.badgeType === "number" && (
              <div className="absolute -top-2 right-[-10px] bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm z-20">
                {card.badge}
              </div>
            )}
            {card.badgeType === "text" && (
              <div className="absolute -bottom-3 bg-red-600 text-white text-[9px] font-bold px-3 py-1 rounded-full shadow-sm z-20">
                {card.badge}
              </div>
            )}
            {card.badgeType === "dot" && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-600 rounded-full border-2 border-[#1a1a1a] shadow-sm z-20"></div>
            )}
            {card.badgeType === "stamp" && (
              <div className="absolute -bottom-2 right-[-15px] border-2 border-red-500 text-red-500 text-[8px] font-black px-1 py-0.5 rounded shadow-sm z-20 -rotate-12 bg-gray-900/90 backdrop-blur-sm">
                {card.badge}
              </div>
            )}

            {/* Icon / Content */}
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-1 ${card.bgClass} shadow-inner`}>
              <card.icon className={`w-5 h-5 ${card.color}`} />
            </div>
            {card.label && (
              <div className={`text-[8px] font-bold ${textColor} opacity-90 text-center leading-tight whitespace-pre-line uppercase`}>
                {card.label}
              </div>
            )}
            {/* Add a tiny green check mark for card 7 */}
            {card.id === 7 && (
              <div className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-white flex items-center justify-center z-20">
                <svg className="w-2 h-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </div>
        )}
      />
      {/* Central Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-0 px-4 mt-[-50px]">
        <h2 className={`wc-text text-5xl md:text-6xl font-medium ${textColor} text-center leading-[1.1] tracking-tight mb-20 max-w-2xl font-sans drop-shadow-lg`}>
          Why Choose GBC?<br />Here's Why.
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center max-w-4xl mx-auto">
          <div className="wc-text flex flex-col items-center">
            <p className={`${textColor} opacity-80 font-mono text-sm leading-relaxed max-w-[200px]`}>
              Expert in Dubai business setup and licensing.
            </p>
          </div>
          <div className="wc-text flex flex-col items-center">
            <p className={`${textColor} opacity-80 font-mono text-sm leading-relaxed max-w-[200px]`}>
              Fast, transparent &<br />hassle-free process.
            </p>
          </div>
          <div className="wc-text flex flex-col items-center">
            <p className={`${textColor} opacity-80 font-mono text-sm leading-relaxed max-w-[200px]`}>
              100% compliant with UAE laws and regulations.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
