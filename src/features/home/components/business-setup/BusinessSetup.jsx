import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BiWorld } from "react-icons/bi";
import { Card } from "../../../../../lib/turtle-ui/components/card/Card";
import { DataList } from "../../../../../lib/turtle-ui/components/list/DataList";

gsap.registerPlugin(ScrollTrigger);

// --- Graphics Components ---

const ChatBubblesGraphic = () => {
  const replyText = "Based on your requirements, we recommend the JAFZA offshore jurisdiction. The setup takes about 5-7 days.";
  return (
  <div className="relative w-full h-full flex flex-col items-center justify-center px-16 py-8 overflow-hidden bg-[#fafafa]">
    <div className="chat-bubble-right w-[90%] max-w-[280px] self-end mb-6 bg-bordeaux text-white rounded-[20px] rounded-br-sm p-4 text-[13px] leading-relaxed shadow-sm relative z-10 mr-4 origin-bottom-right">
      Hey, I need help setting up an offshore entity for asset protection. What's the process?
      <img src="https://randomuser.me/api/portraits/women/44.jpg" className="absolute -right-10 bottom-2 w-8 h-8 rounded-full shadow-sm border-2 border-white" alt="User" />
    </div>
    <div className="chat-bubble-left w-[90%] max-w-[280px] self-start bg-white border border-gray-100 text-gray-600 rounded-[20px] rounded-bl-sm p-5 text-[13px] leading-relaxed shadow-[0_10px_30px_rgba(0,0,0,0.05)] relative z-10 ml-4 origin-bottom-left">
      <div className="absolute -left-10 bottom-2 w-8 h-8 rounded-full bg-white text-bordeaux flex items-center justify-center shadow-sm border border-bordeaux/20">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
      </div>
      <div className="typing-indicator flex items-center space-x-1.5 py-1">
        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
      </div>
      <div className="actual-reply hidden">
        {replyText.split("").map((char, index) => (
          <span key={index} className="reply-char opacity-0">{char}</span>
        ))}
      </div>
    </div>
    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#fafafa] pointer-events-none z-0"></div>
  </div>
  );
};

const ConcentricCirclesGraphic = () => (
  <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
    
    {/* Orbit Ring 3 (Large) */}
    <div className="circle-border absolute w-[530px] h-[530px] rounded-full border-[1.5px] border-red-200 -bottom-[250px] flex items-center justify-center">
      <div className="orbit-wrapper w-full h-full absolute rounded-full">
        {/* Black R Logo */}
        <div className="orbit-icon absolute top-[17%] left-[12%] w-11 h-11 bg-[#111] rounded-full shadow-lg flex items-center justify-center border-2 border-white -translate-x-1/2 -translate-y-1/2">
          <span className="text-white font-black text-lg">R</span>
        </div>
        {/* Colorful chevron */}
        <div className="orbit-icon absolute top-[8%] right-[15%] w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center border border-gray-100 -translate-x-1/2 -translate-y-1/2">
          <div className="w-5 h-5 flex space-x-0.5 transform -rotate-12">
            <div className="w-1.5 h-full bg-blue-500 rounded-sm"></div>
            <div className="w-1.5 h-full bg-orange-500 rounded-sm"></div>
            <div className="w-1.5 h-full bg-black rounded-sm"></div>
          </div>
        </div>
        {/* Star */}
        <div className="orbit-icon absolute top-[40%] -right-[15px] w-9 h-9 bg-white rounded-full shadow-md flex items-center justify-center border border-gray-50 -translate-y-1/2">
          <svg className="w-5 h-5 text-purple-400" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
          </svg>
        </div>
      </div>
    </div>

    {/* Orbit Ring 2 (Medium) */}
    <div className="circle-border absolute w-[400px] h-[400px] rounded-full border-[1.5px] border-red-100 -bottom-[175px] bg-gradient-to-t from-gray-50/50 to-transparent shadow-sm flex items-center justify-center">
      <div className="orbit-wrapper-reverse w-full h-full absolute rounded-full">
        {/* Figma */}
        <div className="orbit-icon-reverse absolute -top-[15px] left-[40%] w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center border border-gray-100 -translate-x-1/2">
          <img src="https://cdn.worldvectorlogo.com/logos/figma-1.svg" className="w-5 h-5"/>
        </div>
        {/* Sailboat */}
        <div className="orbit-icon-reverse absolute top-[35%] -right-[15px] w-11 h-11 bg-blue-50/80 rounded-full shadow-md flex items-center justify-center border border-white backdrop-blur-sm -translate-y-1/2">
          <svg className="w-6 h-6 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C12 2 12 10 16 14C16 14 14 16 10 12C10 12 8 16 12 20C12 20 18 20 20 18C20 18 16 22 12 22C8 22 4 18 4 18C4 18 8 18 10 16C10 16 6 12 12 2Z"/>
          </svg>
        </div>
      </div>
    </div>

    {/* Orbit Ring 1 (Small) */}
    <div className="circle-border absolute w-[240px] h-[240px] rounded-full border-[1.5px] border-red-50 bg-white -bottom-[90px] shadow-[0_0_40px_rgba(0,0,0,0.03)] flex items-center justify-center">
      <div className="orbit-wrapper w-full h-full absolute rounded-full">
        {/* Grey Circle */}
        <div className="orbit-icon absolute top-[70%] -left-[15px] w-10 h-10 bg-gray-200 rounded-full shadow-inner border border-gray-300 -translate-y-1/2"></div>
        {/* Orange blocks */}
        <div className="orbit-icon absolute top-[10%] left-[5%] w-11 h-11 bg-white rounded-full shadow-md flex items-center justify-center border border-gray-100 -translate-x-1/2 -translate-y-1/2">
          <div className="grid grid-cols-2 gap-[2px]">
            <div className="w-2.5 h-2.5 bg-orange-400 rounded-sm"></div>
            <div className="w-2.5 h-2.5 bg-orange-400 rounded-sm"></div>
            <div className="w-2.5 h-2.5 bg-transparent"></div>
            <div className="w-2.5 h-2.5 bg-orange-400 rounded-sm"></div>
          </div>
        </div>
      </div>
    </div>
    
    {/* Center Logo */}
    <div className="center-logo absolute bottom-[30px] w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30 z-10 border-[3px] border-white">
      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    </div>

  </div>
);

const LineChartGraphic = () => (
  <div className="relative w-full h-full flex items-end overflow-hidden">
    {/* SVG Line & Gradient */}
    <div className="chart-container absolute inset-0 w-full h-full origin-left">
      <svg className="absolute inset-0 w-full h-full pt-16" preserveAspectRatio="none" viewBox="0 0 100 100">
        <path className="chart-fill" d="M0,70 Q20,65 40,75 T70,55 T100,40 L100,100 L0,100 Z" fill="url(#bordeaux-grad)" />
        <path className="chart-line" d="M0,70 Q20,65 40,75 T70,55 T100,40" fill="none" stroke="#6c141e" strokeWidth="1.5" />
        <defs>
          <linearGradient id="bordeaux-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6c141e" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#6c141e" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
    {/* Glowing point */}
    <div className="chart-point absolute left-[70%] top-[60%] -translate-x-1/2 -translate-y-1/2 z-10">
      <div className="w-3.5 h-3.5 bg-white border-[2px] border-bordeaux rounded-full relative z-20"></div>
      <div className="absolute inset-0 bg-bordeaux rounded-full animate-ping opacity-50 z-10 scale-150"></div>
      {/* Tooltip */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#111] text-white text-[11px] font-bold py-1 px-3 rounded-full shadow-lg">
        1,678
      </div>
      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-px h-[200px] bg-gradient-to-b from-bordeaux to-transparent opacity-40 -z-10"></div>
    </div>
  </div>
);

const TimelineGraphic = () => (
  <div className="relative w-full h-full p-8 flex flex-col justify-center overflow-hidden pt-12">
    {/* Header */}
    <div className="flex justify-between text-[11px] font-medium text-gray-400 mb-6 px-4 border-b border-gray-200/70 pb-3">
      <span>Tue</span><span>Wed</span><span className="text-gray-900 font-bold">Thu</span><span>Fri</span><span>Sat</span>
    </div>
    
    <div className="relative h-32">
      {/* Current time line */}
      <div className="timeline-marker absolute top-0 bottom-10 left-1/2 w-px bg-gray-300 z-0 origin-top"></div>
      <div className="timeline-marker-label absolute -top-3 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-md z-10">12:00 AM</div>
      
      {/* Pills */}
      <div className="relative z-10 flex flex-col space-y-3 mt-6">
        <div className="timeline-pill w-[60%] ml-[10%] bg-bordeaux text-white text-[11px] font-semibold py-2 px-4 rounded-full text-center shadow-lg shadow-bordeaux/30 origin-left">
          Visa Application
        </div>
        <div className="timeline-pill w-[45%] ml-[30%] bg-bordeaux/20 text-bordeaux text-[11px] font-semibold py-2 px-4 rounded-full text-center origin-left">
          Medical Fitness
        </div>
        <div className="timeline-pill w-[40%] ml-[45%] bg-bordeaux/10 text-bordeaux text-[11px] font-semibold py-2 px-4 rounded-full text-center origin-left">
          Emirates ID
        </div>
      </div>
    </div>
  </div>
);

// --- Data ---

const bentoData = [
  {
    id: "offshore",
    title: "Offshore Company",
    description: "Best for asset protection, international trading, and property holdings anonymously.",
    Graphic: ChatBubblesGraphic,
  },
  {
    id: "freezone",
    title: "Freezone Setup",
    description: "Perfect for international businesses requiring 100% ownership and tax exemptions.",
    Graphic: ConcentricCirclesGraphic,
  },
  {
    id: "mainland",
    title: "Mainland Company",
    description: "Ideal for businesses wanting to trade anywhere in the UAE and locally without restrictions.",
    Graphic: LineChartGraphic,
  },
  {
    id: "pro",
    title: "PRO Services",
    description: "Experience seamless document clearance, visa processing, and government liaising tailored for your business.",
    Graphic: TimelineGraphic,
  },
];

export const BusinessSetup = () => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      // Header Animation
      gsap.fromTo(
        ".bs-header",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ".bs-header-container",
            start: "top 85%",
          },
        }
      );

      // Bento Grid Master Timeline
      const bentoTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".bento-grid",
          start: "top 75%",
        }
      });

      // Reveal cards
      bentoTl.fromTo(
        ".bento-item",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: "expo.out",
        }
      );

      // Add base label for graphics to start alongside card reveals
      bentoTl.addLabel("startGraphics", 0.6);

      // 1. Chat Bubbles Animation (Card 1)
      bentoTl.fromTo(
        ".chat-bubble-right",
        { scale: 0.5, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.5)" },
        "startGraphics"
      );

      // Make sure typing indicator is visible initially
      gsap.set(".typing-indicator", { display: "flex" });
      gsap.set(".actual-reply", { display: "none", opacity: 0 });

      bentoTl.fromTo(
        ".chat-bubble-left",
        { scale: 0.5, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.5)" },
        "startGraphics+=0.2"
      );

      // Typing animation dots
      let dotsTl;
      bentoTl.add(() => {
        dotsTl = gsap.to(".typing-indicator div", {
          y: -4,
          duration: 0.3,
          stagger: 0.1,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut"
        });
      }, "startGraphics+=0.2");

      // Swap to actual text after 1.5 seconds
      bentoTl.to(".typing-indicator", {
        display: "none",
        duration: 0,
        onComplete: () => { if (dotsTl) dotsTl.kill(); }
      }, "startGraphics+=1.7");
      
      bentoTl.to(".actual-reply", {
        display: "block",
        opacity: 1,
        duration: 0
      }, "startGraphics+=1.7");
      bentoTl.to(".reply-char", {
        opacity: 1,
        duration: 0.01,
        stagger: 0.02,
        ease: "none"
      }, "startGraphics+=1.7");

      // 2. Concentric Circles Entrance (Card 2 staggered by 0.15)
      bentoTl.fromTo(
        ".circle-border",
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.5, stagger: 0.2, ease: "power3.out" },
        "startGraphics+=0.15"
      );
      bentoTl.fromTo(
        ".center-logo",
        { scale: 0, rotation: -90 },
        { scale: 1, rotation: 0, duration: 1, ease: "back.out(1.7)" },
        "startGraphics+=0.4"
      );
      // Orbit Animations (Infinite)
      gsap.to(".orbit-wrapper", {
        rotation: 360,
        duration: 30,
        repeat: -1,
        ease: "linear",
      });
      gsap.to(".orbit-icon", {
        rotation: -360,
        duration: 30,
        repeat: -1,
        ease: "linear",
      });

      gsap.to(".orbit-wrapper-reverse", {
        rotation: -360,
        duration: 40,
        repeat: -1,
        ease: "linear",
      });
      gsap.to(".orbit-icon-reverse", {
        rotation: 360,
        duration: 40,
        repeat: -1,
        ease: "linear",
      });

      // 3. Line Chart Animation (Card 3 staggered by 0.3)
      bentoTl.fromTo(
        ".chart-container",
        { scaleX: 0 },
        { scaleX: 1, duration: 1.5, ease: "power3.out" },
        "startGraphics+=0.3"
      );
      bentoTl.fromTo(
        ".chart-point",
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.7)" },
        "startGraphics+=0.9"
      );

      // 4. Timeline Animation (Card 4 staggered by 0.45)
      bentoTl.fromTo(
        ".timeline-marker",
        { scaleY: 0 },
        { scaleY: 1, duration: 1, ease: "power3.out" },
        "startGraphics+=0.45"
      );
      bentoTl.fromTo(
        ".timeline-marker-label",
        { y: -10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
        "startGraphics+=0.8"
      );
      bentoTl.fromTo(
        ".timeline-pill",
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 1, stagger: 0.15, ease: "expo.out" },
        "startGraphics+=0.8"
      );
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="py-24 sm:py-36 bg-white relative overflow-x-clip font-sans">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-bordeaux/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-bordeaux/5 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        {/* Exact 2-Column Layout matching Syncox Pricing Plan scrolling system */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Sticky Header & Client Rating Box (`position: sticky; top: 32px; height: fit-content;`) */}
          <div className="bs-header-container lg:col-span-5 flex flex-col justify-between lg:sticky lg:top-32 self-start gap-12">
            <div>
              <span className="bs-header inline-block text-bordeaux font-mono text-sm font-semibold tracking-wider uppercase mb-3">
                // Choose Your Jurisdiction
              </span>
              <h2 className="bs-header text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#111] mb-6 leading-tight">
                Business Setup Solutions tailored for your growth.
              </h2>
              <p className="bs-header text-gray-600 text-base sm:text-lg leading-relaxed mb-10">
                Whether you need a prestigious Dubai address or an efficient Freezone license, we navigate the complex UAE regulatory landscape for you.
              </p>
            </div>

            {/* Client Rating & Avatars exactly matching input_file_0.png / Syncox left column */}
            <div className="bs-header pt-8 border-t border-gray-200/80 flex flex-col gap-3">
              <div className="flex items-center -space-x-2.5 overflow-hidden">
                <img className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop" alt="Client 1" />
                <img className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop" alt="Client 2" />
                <img className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop" alt="Client 3" />
                <img className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop" alt="Client 4" />
                <div className="inline-flex items-center justify-center h-10 w-10 rounded-full ring-2 ring-white bg-blue-600 text-white text-xs font-bold shrink-0 shadow-sm">
                  You?
                </div>
              </div>
              <div>
                <div className="text-xl font-bold text-[#111]">4.9/5</div>
                <div className="text-sm text-gray-500 font-medium">Average rating from our clients</div>
              </div>
            </div>
          </div>

          {/* Right Column: Vertical Cards Stack (`.pricing-card-list` flex-flow: column; gap: 24px;) */}
          <div className="lg:col-span-7">
            <DataList
              data={bentoData}
              className="bento-grid flex flex-col gap-6 sm:gap-8 w-full"
              render={(item) => (
                <Card key={item.id} className="bento-item bg-white border border-gray-200/80 rounded-[28px] h-[480px] sm:h-[500px] flex flex-col group relative overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] transition-all duration-300">
                  {/* Top Graphic Area */}
                  <div className="h-[280px] w-full relative bg-[#fafafa] rounded-t-[28px] overflow-hidden border-b border-gray-100">
                    <item.Graphic />
                  </div>
                  
                  {/* Bottom Content Area */}
                  <div className="flex-1 px-8 pt-6 pb-8 flex flex-col justify-start bg-white">
                    <h4 className="text-xl font-bold text-gray-900 mb-2.5 tracking-tight">{item.title}</h4>
                    <p className="text-sm text-gray-500 leading-relaxed font-medium pr-2">{item.description}</p>
                  </div>
                </Card>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
