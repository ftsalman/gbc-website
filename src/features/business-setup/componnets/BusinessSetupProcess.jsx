import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { 
  MessageSquare, 
  Briefcase, 
  FileCheck, 
  CheckCircle, 
  FileText, 
  CreditCard, 
  Rocket,
  IdCard
} from "lucide-react";

const steps = [
  { id: "01", title: "Consultation", icon: MessageSquare, desc: "Initial meeting to understand your goals." },
  { id: "02", title: "Business Activity", icon: Briefcase, desc: "Select the right activity." },
  { id: "03", title: "Trade Name", icon: FileCheck, desc: "Reserve your company name." },
  { id: "04", title: "License Approval", icon: CheckCircle, desc: "Get initial approvals." },
  { id: "05", title: "Visa Processing", icon: FileText, desc: "Apply for your residency visa." },
  { id: "06", title: "Emirates ID", icon: IdCard, desc: "Medical and Emirates ID." },
  { id: "07", title: "Bank Account", icon: CreditCard, desc: "Open a corporate account." },
  { id: "08", title: "Launch", icon: Rocket, desc: "Start doing business!" },
];

export const BusinessSetupProcess = () => {
  let mouseX = useMotionValue(Infinity);

  return (
    <section className="py-32 bg-white/90 relative overflow-hidden flex flex-col items-center justify-center min-h-[700px] border-b border-gray-200">
      <div className="text-center mb-32 max-w-2xl mx-auto px-4 z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-medium text-black leading-tight tracking-tight mb-4"
        >
          Your Journey to <br className="hidden md:block"/>
          <span className="text-[#7A2B37] font-bold">Success</span>
        </motion.h2>
        <p className="text-gray-600">Interact with the dock below to explore our seamless setup process.</p>
      </div>

      <div 
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="mx-auto flex h-[100px] items-end gap-10 rounded-3xl bg-gray-50/80 border border-gray-200 backdrop-blur-xl px-12 pb-[16px] shadow-[0_8px_32px_rgba(0,0,0,0.08)] z-10"
      >
        {steps.map((step) => (
          <AppIcon mouseX={mouseX} key={step.id} step={step} />
        ))}
      </div>
    </section>
  );
};

function AppIcon({ mouseX, step }) {
  let ref = useRef(null);
  
  let distance = useTransform(mouseX, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // Calculate the width of the icon based on distance from mouse
  let widthSync = useTransform(distance, [-150, 0, 150], [60, 120, 60]);
  let width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  const [hovered, setHovered] = useState(false);
  const Icon = step.icon;

  return (
    <div className="relative flex flex-col items-center group  ">
      <motion.div
        ref={ref}
        style={{ width }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="aspect-square w-[60px] rounded-[1.2rem] bg-white border border-gray-200 shadow-[0_4px_12px_rgba(0,0,0,0.05)] flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors relative z-10"
      >
        <Icon className="w-1/2 h-1/2 text-[#7A2B37]" />
      </motion.div>
      
      {/* Label under icon */}
      <span className="text-[12px] font-medium text-gray-600 absolute -bottom-14 whitespace-nowrap">
        {step.title}
      </span>
      
      {/* Expanded Mockup Tooltip */}
      {hovered && (
        <motion.div 
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="absolute -top-[180px] w-64 bg-white/95 backdrop-blur-xl p-5 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.12)] border border-gray-100 flex flex-col items-center text-center z-50 pointer-events-none"
        >
          <div className="w-12 h-12 bg-[#7A2B37]/10 rounded-full flex items-center justify-center mb-3 text-[#7A2B37]">
            <Icon size={24} />
          </div>
          <span className="text-[10px] uppercase tracking-wider font-bold text-gray-400 mb-1">Step {step.id}</span>
          <h4 className="text-base font-semibold text-black mb-2">{step.title}</h4>
          <p className="text-sm text-gray-500 leading-snug">{step.desc}</p>
        </motion.div>
      )}
    </div>
  );
}

