import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import { FaTrophy, FaMedal, FaAward, FaCertificate, FaCrown, FaStar, FaGlobe, FaChartLine } from 'react-icons/fa';
import Antigravity from '../../../../components/ui/Antigravity';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

const awards = [
  { id: 1, icon: FaTrophy, label: "Top Agency", color: "bg-[#ff6700]", top: "20%", left: "20%", transform: "perspective(800px) rotateY(15deg) rotateZ(-10deg) rotateX(10deg)", size: "w-48 h-32" },
  { id: 2, icon: FaCertificate, label: "100%", color: "bg-gray-100", textDark: true, top: "28%", left: "35%", transform: "perspective(800px) rotateY(10deg) rotateZ(-5deg) scale(0.7)", size: "w-24 h-28" },
  { id: 3, icon: FaCrown, label: "Premium", color: "bg-yellow-500", top: "15%", left: "48%", transform: "perspective(800px) rotateX(15deg) rotateY(-5deg)", size: "w-32 h-40" },
  { id: 4, icon: FaChartLine, label: "Growth", color: "bg-[#1a1a1a]", top: "20%", left: "80%", transform: "perspective(800px) rotateY(-20deg) rotateZ(10deg) rotateX(10deg)", size: "w-64 h-40" },
  
  { id: 5, icon: FaMedal, label: "Leader", color: "bg-[#333]", top: "50%", left: "12%", transform: "perspective(800px) rotateY(5deg) rotateX(5deg)", size: "w-32 h-32" },
  { id: 6, icon: FaAward, label: "Support", color: "bg-[#1ee3b5]", textDark: true, top: "50%", left: "88%", transform: "perspective(800px) rotateY(-15deg)", size: "w-32 h-44" },

  { id: 7, icon: FaStar, label: "5-Star", color: "bg-[#f3e3c3]", textDark: true, top: "80%", left: "20%", transform: "perspective(800px) rotateY(20deg) rotateZ(-12deg) rotateX(-5deg)", size: "w-48 h-40" },
  { id: 8, icon: FaTrophy, label: "Trust", color: "bg-gray-200", textDark: true, top: "85%", left: "50%", transform: "perspective(800px) rotateX(-10deg)", size: "w-36 h-40" },
  { id: 9, icon: FaCertificate, label: "", color: "bg-orange-700", top: "75%", left: "65%", transform: "perspective(800px) rotateY(-15deg) scale(0.6)", size: "w-20 h-20" },
  { id: 10, icon: FaGlobe, label: "Reach", color: "bg-[#ff7b00]", top: "82%", left: "80%", transform: "perspective(800px) rotateY(-25deg) rotateZ(8deg) rotateX(-5deg)", size: "w-40 h-48" },
];

export const AwardShowcase = () => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      // Float animation for all inner cards (desktop only)
      gsap.to('.award-card', {
        y: 'random(-10, 10)',
        x: 'random(-5, 5)',
        rotationZ: 'random(-1, 1)',
        duration: 'random(4, 6)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: 0.1
      });

      // Entrance animation on scroll for cards
      gsap.fromTo('.award-card, .mobile-card', 
        { opacity: 0, scale: 0 }, 
        { 
          opacity: 1, 
          scale: 1, 
          duration: 1.2, 
          stagger: 0.1, 
          ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 70%'
          }
        }
      );

      // Typing animation for the headline
      gsap.to('.typewriter-text', {
        text: "award-winning services.",
        duration: 2,
        ease: "none",
        delay: 0.5,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%'
        }
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="relative w-full min-h-[600px] md:h-[900px] bg-white overflow-hidden flex flex-col items-center justify-center font-sans border-y border-gray-100 py-16 md:py-0">
      
      {/* Background Interactive Antigravity Animation */}
      <div className="absolute inset-0 w-full h-full z-0 opacity-40">
        <Antigravity
          count={250}
          magnetRadius={8}
          ringRadius={12}
          waveSpeed={0.5}
          waveAmplitude={1.5}
          particleSize={1.5}
          lerpSpeed={0.05}
          color={'rainbow'} // Enable animated rainbow mode
          autoAnimate={true}
          particleVariance={1}
        />
      </div>

      {/* Central Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-xl mx-auto pointer-events-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-extrabold text-gray-900 tracking-tight leading-[1.1] mb-4 md:mb-6 min-h-[120px]">
          Get exclusive access to our <span className="typewriter-text text-bordeaux border-r-4 border-bordeaux pr-1 animate-pulse"></span>
        </h2>
        <p className="text-gray-500 text-sm md:text-lg max-w-sm mx-auto leading-relaxed">
          Unlimited tools to transform your business and change your life. Join the industry leaders.
        </p>
      </div>

      {/* Mobile Layout: Responsive Grid */}
      <div className="md:hidden grid grid-cols-2 gap-4 mt-10 px-4 w-full max-w-sm mx-auto relative z-20 pointer-events-auto">
        {awards.map((award) => (
          <div 
            key={`mobile-${award.id}`} 
            className={`mobile-card rounded-[14px] ${award.color} shadow-lg flex flex-col items-center justify-center p-5`}
          >
            <div className="relative z-10 flex flex-col items-center">
              <award.icon className={`w-8 h-8 mb-2 ${award.textDark ? 'text-gray-800' : 'text-white'}`} />
              <span className={`font-bold text-center text-xs tracking-wide ${award.textDark ? 'text-gray-900' : 'text-white'}`}>
                {award.label}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Layout: Scattered 3D Cards */}
      <div className="hidden md:block absolute inset-0 pointer-events-none z-0">
        {awards.map((award) => (
          <div
            key={`desktop-${award.id}`}
            className="absolute transform pt-4"
            style={{
              top: award.top,
              left: award.left,
              transform: `translate(-50%, -50%) ${award.transform}`,
              transformStyle: "preserve-3d"
            }}
          >
            <div className={`award-card ${award.size} rounded-[16px] ${award.color} shadow-[0_20px_40px_rgba(0,0,0,0.15)] flex flex-col items-center justify-center p-6 transition-all`}>
              <award.icon className={`w-10 h-10 mb-3 ${award.textDark ? 'text-gray-800' : 'text-white/95'}`} />
              {award.label && (
                <span className={`font-bold text-center text-sm tracking-wide ${award.textDark ? 'text-gray-900' : 'text-white'}`}>
                  {award.label}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
