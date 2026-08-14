import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FileText, Plane, RefreshCcw, HeartPulse, IdCard, Stamp, Users, Landmark } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const GlassStack = () => (
  <div className="relative w-full h-[220px] flex flex-col items-center justify-center -space-y-6 mt-4">
    {[1, 2, 3].map((i) => (
      <div key={i} className="relative w-28 h-28 bg-white/40 border border-white/60 backdrop-blur-md rounded-2xl shadow-xl flex items-center justify-center transition-transform group-hover:scale-105 duration-500" style={{ transform: "rotateX(55deg) rotateZ(-45deg)", zIndex: 40 - i * 10 }}>
        {i === 1 ? (
          <div className="transform rotateX(-55deg) rotateZ(45deg) bg-white p-3 rounded-xl shadow-lg border border-gray-100">
             <FileText className="w-8 h-8 text-blue-500" strokeWidth={1.5} />
          </div>
        ) : i === 2 ? (
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-red-500 shadow-[0_0_20px_rgba(239,68,68,0.5)] transform rotateX(-55deg) rotateZ(45deg)" />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-50 to-gray-200 shadow-inner transform rotateX(-55deg) rotateZ(45deg)" />
        )}
      </div>
    ))}
  </div>
);

const DataPills = () => (
  <div className="relative w-full h-[160px] flex items-center justify-center lg:pl-10">
    <div className="relative flex items-center group-hover:scale-105 transition-transform duration-500">
      <div className="w-24 h-24 bg-gradient-to-br from-white to-gray-100 rounded-l-full border border-white shadow-[10px_10px_20px_rgba(0,0,0,0.05)] relative z-10 flex items-center justify-center overflow-hidden">
        <Plane className="w-10 h-10 text-emerald-500 ml-2" strokeWidth={1.5} />
      </div>
      <div className="w-16 h-24 relative flex items-center justify-center z-20">
        <div className="absolute top-6 left-2 w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
        <div className="absolute top-10 left-6 w-2 h-2 rounded-full bg-red-400 animate-pulse" style={{animationDelay: '0.2s'}} />
        <div className="absolute bottom-8 left-4 w-1.5 h-1.5 rounded-full bg-blue-300 animate-pulse" style={{animationDelay: '0.4s'}} />
        <div className="absolute bottom-6 right-2 w-2 h-2 rounded-full bg-gray-400 animate-pulse" style={{animationDelay: '0.6s'}} />
      </div>
      <div className="w-24 h-24 bg-gradient-to-tl from-white to-gray-50 rounded-r-full border border-white shadow-[10px_10px_20px_rgba(0,0,0,0.05)] transform rotate-12 -translate-y-2 -translate-x-2 relative z-0 flex items-center justify-start pl-4">
         <Plane className="w-8 h-8 text-emerald-300 opacity-50" strokeWidth={1.5} />
      </div>
    </div>
  </div>
);

const GlobeSphere = () => (
  <div className="relative w-full h-[220px] flex items-center justify-center mt-4">
    <div className="relative flex flex-col items-center group-hover:-translate-y-2 transition-transform duration-500">
      <div className="w-40 h-40 rounded-full bg-white/40 border border-white/60 backdrop-blur-md shadow-[inset_-10px_-10px_20px_rgba(0,0,0,0.03),0_20px_40px_rgba(0,0,0,0.08)] relative overflow-hidden z-10 flex items-center justify-center">
        <div className="absolute top-4 left-4 w-20 h-20 bg-blue-300/30 rounded-full blur-2xl" />
        <div className="absolute bottom-4 right-4 w-20 h-20 bg-pink-300/30 rounded-full blur-2xl" />
        <RefreshCcw className="w-16 h-16 text-indigo-500 relative z-20 drop-shadow-md" strokeWidth={1.5} />
      </div>
      <div className="w-24 h-6 bg-gradient-to-b from-gray-100 to-gray-200 rounded-t-full -mt-3 z-0 border border-white" />
      <div className="w-28 h-12 bg-gradient-to-b from-gray-100 to-gray-200 rounded-b-2xl border border-white shadow-sm" />
    </div>
  </div>
);

const MagicBox = () => (
  <div className="relative w-full h-[120px] flex items-center justify-center mt-4 mb-4">
    <div className="relative w-28 h-28 group-hover:scale-105 transition-transform duration-500">
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg transform -skew-y-12 border border-white shadow-lg flex items-center justify-center">
        <div className="absolute -top-12 w-16 h-16 bg-gradient-to-t from-red-500/30 to-transparent blur-md opacity-80" />
      </div>
      <div className="absolute top-0 left-2 w-full h-16 bg-white/90 border border-white backdrop-blur-md rounded-lg transform rotate-[25deg] -skew-y-12 origin-bottom-left shadow-sm group-hover:rotate-[35deg] transition-transform duration-500 z-10" />
      <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20 bg-white p-2 rounded-full shadow-lg border border-red-100 group-hover:-translate-y-2 transition-transform duration-500">
        <HeartPulse className="w-8 h-8 text-red-500" strokeWidth={1.5} />
      </div>
    </div>
  </div>
);

const IdCardToggle = () => (
  <div className="relative w-full h-[140px] flex flex-col items-center justify-center mt-4">
    <div className="w-24 h-16 bg-gradient-to-br from-white to-gray-100 rounded-xl shadow-lg border border-white mb-6 transform -rotate-6 flex items-center justify-center relative z-10 group-hover:-rotate-2 transition-transform duration-500">
       <IdCard className="w-10 h-10 text-gray-700" strokeWidth={1.5} />
       <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-400 rounded-full border-2 border-white flex items-center justify-center shadow-md">
         <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
       </div>
    </div>
    
    <div className="w-14 h-8 bg-gray-200 rounded-full p-1 shadow-inner relative flex items-center cursor-pointer">
       <div className="w-6 h-6 bg-white rounded-full shadow-sm transform translate-x-6 group-hover:translate-x-0 transition-transform duration-500" />
    </div>
  </div>
);

const VisaStamp = () => (
  <div className="relative w-full h-[160px] flex items-center justify-center lg:pr-10">
    <div className="relative w-32 h-32 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
      <div className="absolute w-24 h-28 bg-white rounded-xl shadow-md border border-gray-100 transform -rotate-12 -translate-x-4 flex flex-col p-3 gap-2">
         <div className="w-1/2 h-2 bg-gray-100 rounded-full" />
         <div className="w-full h-2 bg-gray-100 rounded-full" />
         <div className="w-3/4 h-2 bg-gray-100 rounded-full" />
      </div>
      <div className="absolute w-24 h-28 bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-xl border border-white transform rotate-6 translate-x-4 flex flex-col p-3 gap-2 z-10">
         <div className="w-1/2 h-2 bg-gray-200 rounded-full" />
         <div className="w-full h-2 bg-gray-100 rounded-full" />
         <div className="w-full h-2 bg-gray-100 rounded-full" />
         <div className="absolute bottom-2 right-2 w-12 h-12 rounded-full border-4 border-red-500/30 flex items-center justify-center transform -rotate-12 bg-white/50 backdrop-blur-sm shadow-sm">
            <Stamp className="w-6 h-6 text-red-500" strokeWidth={1.5} />
         </div>
      </div>
    </div>
  </div>
);

const FamilyRings = () => (
  <div className="relative w-full h-[120px] flex items-center justify-center mt-4 mb-4">
    <div className="relative w-32 h-24 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
       <div className="absolute left-0 w-16 h-16 rounded-full border-[4px] border-blue-400/80 shadow-[0_0_15px_rgba(96,165,250,0.4)] backdrop-blur-sm z-10 bg-white/40 flex items-center justify-center">
         <Users className="w-6 h-6 text-blue-600" strokeWidth={2} />
       </div>
       <div className="absolute right-0 w-16 h-16 rounded-full border-[4px] border-pink-400/80 shadow-[0_0_15px_rgba(244,114,182,0.4)] backdrop-blur-sm z-20 bg-white/40 flex items-center justify-center">
         <Users className="w-6 h-6 text-pink-600" strokeWidth={2} />
       </div>
       <div className="absolute top-0 w-12 h-12 rounded-full border-[4px] border-orange-400/80 shadow-[0_0_15px_rgba(251,146,60,0.4)] backdrop-blur-sm z-30 bg-white/40 flex items-center justify-center">
         <Users className="w-5 h-5 text-orange-600" strokeWidth={2} />
       </div>
    </div>
  </div>
);

const FloatingSpheres = () => (
  <div className="relative w-full h-[90px] flex items-center justify-center mt-4 mb-4">
    <div className="relative w-32 h-24 group-hover:scale-105 transition-transform duration-500 flex items-center justify-center">
       <div className="absolute top-0 left-0 w-12 h-12 rounded-full bg-gradient-to-br from-indigo-300 to-purple-400 shadow-lg animate-[bounce_3s_infinite]" />
       <div className="absolute bottom-0 right-4 w-16 h-16 rounded-full bg-gradient-to-br from-teal-200 to-emerald-400 shadow-lg animate-[bounce_4s_infinite]" style={{animationDelay: '1s'}} />
       <div className="w-16 h-16 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl z-20 flex items-center justify-center border border-white">
         <Landmark className="w-8 h-8 text-indigo-600" strokeWidth={1.5} />
       </div>
    </div>
  </div>
);

const BentoCard = ({ className, title, description, cta, children, layout = "vertical" }) => {
  const isHorizontal = layout === "horizontal";
  const isReverse = layout === "horizontal-reverse";
  const ctaAlign = layout === "vertical" ? "self-center" : (layout === "horizontal-reverse" ? "self-start md:self-end" : "self-start");

  return (
    <div className={`visa-service-card bg-[#FAFAFA] rounded-[32px] p-5 sm:p-6 flex flex-col ${isHorizontal ? 'md:flex-row' : isReverse ? 'md:flex-row-reverse' : ''} border border-gray-200/60 shadow-sm hover:shadow-[0_10px_40px_rgb(0,0,0,0.06)] transition-all duration-300 relative overflow-hidden group ${className}`}>
      
      <div className={`${isHorizontal || isReverse ? 'w-full md:w-1/2 flex items-center justify-center mb-4 md:mb-0' : 'w-full flex justify-center mb-4'} relative`}>
        {children}
      </div>

      <div className={`relative z-10 flex flex-col ${isHorizontal ? 'md:w-1/2 md:pr-4 justify-center' : isReverse ? 'md:w-1/2 md:pl-4 justify-center md:items-end md:text-right' : 'w-full mt-auto items-center text-center'}`}>
        <h3 className={`text-xl ${isHorizontal || isReverse ? 'md:text-2xl' : ''} font-bold text-gray-900 mb-2`}>{title}</h3>
        <p className="text-sm text-gray-500 leading-relaxed mb-5 flex-grow">{description}</p>
        {cta && (
          <button className={`px-5 py-2.5 bg-gray-200/50 text-gray-800 text-sm font-semibold rounded-full hover:bg-gray-200 transition-colors ${ctaAlign}`}>
            {cta}
          </button>
        )}
      </div>
    </div>
  );
};

export const UaeVisaProServices = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      ".visa-service-card",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      }
    );
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="py-24 sm:py-32 bg-[#F2F4F7] relative overflow-hidden font-sans border-t border-gray-100">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-white border border-gray-200 text-xs font-semibold text-gray-700 mb-6 uppercase tracking-widest shadow-sm">
            Service 
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            UAE Visa & Government PRO Services
          </h2>
          <p className="text-lg text-gray-500 leading-relaxed">
            From employment visas and entry permits to Emirates ID, medical fitness, visa stamping and family visa applications, GBC provides professional PRO support to simplify your UAE government procedures.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 md:auto-rows-[380px] gap-6">
          
          {/* 01 - Offer Letter */}
          <BentoCard
            className="md:col-span-1 md:row-span-2"
            title="UAE Offer Letter Services"
            description="Get professional assistance with preparing and processing employment offer letters for your UAE workforce."
            cta="Learn More"
            layout="vertical"
          >
            <GlassStack />
          </BentoCard>

          {/* 02 - Entry Permit */}
          <BentoCard
            className="md:col-span-2 md:row-span-1"
            title="UAE Entry Permit Services"
            description="Professional support for employment, investor, partner and other UAE entry permit applications."
            cta="Learn More"
            layout="horizontal"
          >
            <DataPills />
          </BentoCard>

          {/* 03 - Change Status */}
          <BentoCard
            className="md:col-span-1 md:row-span-2"
            title="UAE Visa Change Status"
            description="Get reliable assistance with changing your UAE visa status and completing the required government procedures."
            cta="Learn More"
            layout="vertical"
          >
            <GlobeSphere />
          </BentoCard>

          {/* 04 - Medical Fitness */}
          <BentoCard
            className="md:col-span-1 md:row-span-1"
            title="Medical Fitness Application"
            description="We assist with UAE medical fitness applications required for visa processing and residency procedures."
            cta="Start Application"
            layout="vertical"
          >
            <MagicBox />
          </BentoCard>

          {/* 05 - Emirates ID */}
          <BentoCard
            className="md:col-span-1 md:row-span-1"
            title="Emirates ID Application"
            description="Professional assistance with Emirates ID applications and related government procedures for UAE residents."
            cta="Learn More"
            layout="vertical"
          >
            <IdCardToggle />
          </BentoCard>

          {/* 06 - Visa Stamping */}
          <BentoCard
            className="md:col-span-2 md:row-span-1"
            title="UAE Visa Stamping Services"
            description="Get professional support with visa stamping and the required documentation for completing your UAE residency process."
            cta="Get Visa Support"
            layout="horizontal-reverse"
          >
            <VisaStamp />
          </BentoCard>

          {/* 07 - Family Visa */}
          <BentoCard
            className="md:col-span-1 md:row-span-1"
            title="UAE Family Visa Services"
            description="Simplify the process of sponsoring your family in the UAE with professional application and documentation support."
            cta="Apply for Family Visa"
            layout="vertical"
          >
            <FamilyRings />
          </BentoCard>

          {/* 08 - Other Government Services */}
          <BentoCard
            className="md:col-span-1 md:row-span-1"
            title="Other UAE Government Services"
            description="Need help with another government procedure? Our PRO team can assist with a wide range of UAE government applications and transactions."
            cta="Talk to Our PRO Team"
            layout="vertical"
          >
            <FloatingSpheres />
          </BentoCard>

        </div>
      </div>
    </section>
  );
};
