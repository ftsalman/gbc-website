import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Target, Eye, Compass } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const values = [
  { title: "Mutuality", description: "We believe in relationships built on mutual respect, trust and shared value. Every interaction should benefit both our clients and our team." },
  { title: "Integrity", description: "We operate with transparency, deliver what we promise, maintain regulatory compliance and treat our clients, employees and partners fairly." },
  { title: "Innovation", description: "We use technology and better processes to reduce time, minimize resources and make business services more efficient." },
  { title: "Collaboration", description: "We collaborate with trusted service providers and industry partners to connect businesses with the right solutions and bridge service gaps." },
  { title: "Bespoke Consultation", description: "Every business is different. We provide tailored consultation based on each client's requirements, goals and best interests." },
  { title: "Follow-Up & Reminders", description: "We don't simply complete a transaction and move on. We follow up, track and remind clients about their ongoing requirements until the process is properly completed." }
];

export const AboutCoreValues = () => {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".values-anim",
        { y: 30, opacity: 0 },
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
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="py-24 sm:py-32 bg-[#f9f9f9] text-gray-900 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        
        {/* Purpose, Vision, Mission Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <div className="values-anim bg-white p-10 border border-gray-200 hover:border-bordeaux transition-colors duration-300 group flex flex-col h-full">
            <Target className="w-10 h-10 text-gray-300 group-hover:text-bordeaux mb-6 transition-colors duration-300 shrink-0" />
            <h3 className="text-sm font-semibold tracking-widest uppercase text-gray-400 mb-2">Our Purpose</h3>
            <h4 className="text-2xl font-normal text-gray-900 mb-4 group-hover:text-bordeaux transition-colors duration-300">Making Business Easier</h4>
            <p className="text-gray-600 font-light leading-relaxed">
              We make it easier for entrepreneurs to start, run and expand their businesses by handling essential administrative, consulting and support activities.
            </p>
          </div>

          <div className="values-anim bg-white p-10 border border-gray-200 hover:border-bordeaux transition-colors duration-300 group flex flex-col h-full">
            <Eye className="w-10 h-10 text-gray-300 group-hover:text-bordeaux mb-6 transition-colors duration-300 shrink-0" />
            <h3 className="text-sm font-semibold tracking-widest uppercase text-gray-400 mb-2">Our Vision</h3>
            <h4 className="text-2xl font-normal text-gray-900 mb-4 group-hover:text-bordeaux transition-colors duration-300">To Make Business Easier, Everywhere</h4>
            <p className="text-gray-600 font-light leading-relaxed">
              We aim to remove the difficulties involved in starting, running and expanding a business globally. By taking care of non-core administrative, managerial and consulting activities, we help entrepreneurs do business faster, better and more efficiently.
            </p>
          </div>

          <div className="values-anim bg-white p-10 border border-gray-200 hover:border-bordeaux transition-colors duration-300 group flex flex-col h-full">
            <Compass className="w-10 h-10 text-gray-300 group-hover:text-bordeaux mb-6 transition-colors duration-300 shrink-0" />
            <h3 className="text-sm font-semibold tracking-widest uppercase text-gray-400 mb-2">Our Mission</h3>
            <h4 className="text-2xl font-normal text-gray-900 mb-4 group-hover:text-bordeaux transition-colors duration-300">Helping Entrepreneurs Focus on What Matters</h4>
            <p className="text-gray-600 font-light leading-relaxed">
              We work alongside entrepreneurs by providing reliable consulting, financial, administrative and business support services. By taking care of essential non-core activities, we give business owners more time to focus on their core business and growth.
            </p>
          </div>
        </div>

        {/* Our Values Grid */}
        <div className="values-anim flex items-center gap-2 mb-12">
          <span className="text-bordeaux font-bold">//</span>
          <span className="text-3xl sm:text-4xl font-normal tracking-tight text-gray-900">
            Our Values
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((v, i) => (
            <div key={i} className="values-anim bg-white p-8 border border-gray-100 border-l-4 border-l-gray-200 hover:border-l-bordeaux hover:shadow-md transition-all duration-300 flex flex-col h-full">
              <h5 className="text-xl font-medium text-gray-900 mb-4">{v.title}</h5>
              <p className="text-gray-600 font-light leading-relaxed">
                {v.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
