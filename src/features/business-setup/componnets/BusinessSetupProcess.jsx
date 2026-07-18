import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const steps = [
  { id: "01", title: "Consultation" },
  { id: "02", title: "Choose Business Activity" },
  { id: "03", title: "Trade Name Reservation" },
  { id: "04", title: "License Approval" },
  { id: "05", title: "Visa Processing" },
  { id: "06", title: "Emirates ID" },
  { id: "07", title: "Corporate Bank Account" },
  { id: "08", title: "Business Launch" },
];

export const BusinessSetupProcess = () => {
  const containerRef = useRef(null);
  
  // Track scroll progress within this section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 60%", "end 80%"], // Animates as it passes through the center of viewport
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section ref={containerRef} className="py-24 bg-white relative overflow-hidden border-b border-gray-200">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Heading */}
        <div className="text-center mb-24 max-w-2xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-medium text-gray-900 leading-tight tracking-tight"
          >
            From Idea to <br className="hidden md:block"/>
            <span className="text-[#D4AF37] font-bold">Business in Dubai</span>
          </motion.h2>
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-7xl mx-auto flex flex-col md:flex-row justify-between h-[800px] md:h-auto">
          
          {/* Background Line (Gray) */}
          <div className="absolute left-[22px] md:left-0 md:top-1/2 md:-translate-y-1/2 w-1 md:w-full h-full md:h-1 bg-gray-200 rounded-full" />
          
          {/* Animated Gold Line (Desktop - Horizontal) */}
          <motion.div 
            className="absolute hidden md:block left-0 top-1/2 -translate-y-1/2 h-1 bg-[#D4AF37] rounded-full origin-left z-0"
            style={{ scaleX: smoothProgress, width: "100%" }}
          />
          
          {/* Animated Gold Line (Mobile - Vertical) */}
          <motion.div 
            className="absolute md:hidden left-[22px] top-0 w-1 bg-[#D4AF37] rounded-full origin-top z-0"
            style={{ scaleY: smoothProgress, height: "100%" }}
          />

          {/* Steps */}
          <div className="relative z-10 flex flex-col md:flex-row justify-between w-full h-full md:h-auto gap-8 md:gap-0">
            {steps.map((step, index) => {
              // Calculate activation point for each step
              const stepTarget = index / (steps.length - 1);
              
              return (
                <ProcessStep 
                  key={step.id} 
                  step={step} 
                  progress={scrollYProgress} 
                  target={stepTarget} 
                />
              );
            })}
          </div>
          
        </div>
      </div>
    </section>
  );
};

const ProcessStep = ({ step, progress, target }) => {
  // Map the scroll progress to color changes
  const borderColor = useTransform(
    progress, 
    [target - 0.1, target], 
    ["#e5e7eb", "#D4AF37"] // gray-200 to gold
  );
  
  const numberColor = useTransform(
    progress, 
    [target - 0.1, target], 
    ["#9ca3af", "#D4AF37"] // gray-400 to gold
  );
  
  const titleColor = useTransform(
    progress, 
    [target - 0.1, target], 
    ["#6b7280", "#111827"] // gray-500 to gray-900
  );
  
  return (
    <div className="flex flex-col md:items-center relative w-full md:w-32 pl-16 md:pl-0 md:-mt-[1.6rem]">
      
      {/* Circular Step Indicator */}
      <motion.div 
        className="w-12 h-12 rounded-full border-4 flex items-center justify-center bg-white absolute left-0 md:static md:mb-4 z-10"
        style={{ borderColor, color: numberColor }}
      >
        <span className="font-bold text-sm">{step.id}</span>
      </motion.div>
      
      {/* Title */}
      <motion.div 
        className="md:text-center w-full pt-3 md:pt-2"
        style={{ color: titleColor }}
      >
        <h4 className="font-medium text-lg md:text-sm leading-tight">{step.title}</h4>
      </motion.div>
      
    </div>
  );
};
