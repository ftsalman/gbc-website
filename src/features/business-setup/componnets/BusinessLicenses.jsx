import React from "react";
import { motion } from "framer-motion";
import { 
  Building2, 
  UserCheck, 
  Factory, 
  Plane, 
  ShoppingCart, 
  Laptop, 
  Video, 
  MessageSquare 
} from "lucide-react";
import { Globe } from "../../../components/ui/cobe-globe";
import "./BusinessLicenses.css";

const markers = [
  { id: "london", location: [51.5074, -0.1278], label: "London" },
  { id: "nyc", location: [40.7128, -74.006], label: "New York" },
  { id: "dubai", location: [25.2048, 55.2708], label: "Dubai" },
  { id: "singapore", location: [1.3521, 103.8198], label: "Singapore" },
  { id: "hongkong", location: [22.3193, 114.1694], label: "Hong Kong" },
];

const arcs = [
  { id: "london-dubai", from: [51.5074, -0.1278], to: [25.2048, 55.2708], label: "London → Dubai" },
  { id: "nyc-dubai", from: [40.7128, -74.006], to: [25.2048, 55.2708], label: "NYC → Dubai" },
  { id: "sing-dubai", from: [1.3521, 103.8198], to: [25.2048, 55.2708], label: "Singapore → Dubai" },
];

const licenses = [
  { id: 1, title: "Commercial", subtitle: "Trading & commercial businesses", icon: Building2 },
  { id: 2, title: "Professional", subtitle: "Consultants & service providers", icon: UserCheck },
  { id: 3, title: "Industrial", subtitle: "Manufacturing & production", icon: Factory },
  { id: 4, title: "Tourism", subtitle: "Travel & tourism businesses", icon: Plane },
];

export const BusinessLicenses = () => {
  return (
    <section className="py-24 bg-black border-t border-gray-900 text-white relative overflow-hidden font-sans border-b min-h-screen flex items-center">
      {/* Background Globe and Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[1000px] max-h-[1000px] z-0 opacity-40 pointer-events-auto">
        <Globe
          markers={markers}
          arcs={arcs}
          markerColor={[0.5, 0, 0.12]} // Bordeaux
          baseColor={[1, 1, 1]} 
          arcColor={[1, 0.8, 0]} // Gold
          glowColor={[0.1, 0.1, 0.1]}
          dark={1}
          mapBrightness={6}
          markerSize={0.03}
          markerElevation={0.01}
        />
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] max-w-[800px] max-h-[800px] bg-bordeaux/5 blur-[120px] rounded-full pointer-events-none z-0" />

      <div className="container mx-auto px-4 md:px-8 relative z-10 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-5xl font-medium text-white leading-tight tracking-tight">
            What type of  <br className="hidden md:block" />
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-200 to-red-600">Business are you starting ?</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 relative z-10">
          {licenses.map((license, index) => {
            const Icon = license.icon;
            return (
              <motion.div
                key={license.id}
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <div className="relative p-6 flex flex-col justify-between aspect-square rounded-[32px] bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgb(0,0,0,0.2)] hover:bg-white/10 hover:shadow-[0_15px_40px_rgb(0,0,0,0.4)] hover:-translate-y-1 transition-all duration-300 group cursor-pointer">
                  {/* Top Left Text */}
                  <div className="flex justify-between items-start">
                    <div className="text-[8px] uppercase tracking-widest text-white/50 font-semibold leading-tight">
                      GBC DUBAI<br />{license.subtitle}
                    </div>
                  </div>
                  
                  {/* Center Icon (Logos & Marks in image) */}
                  <div className="flex-grow flex items-center justify-center">
                    <Icon className="w-14 h-14 text-white group-hover:scale-110 transition-all duration-500 ease-out" strokeWidth={1.5} />
                  </div>

                  {/* Bottom Elements */}
                  <div className="flex justify-between items-end">
                    <div className="text-[10px] text-white/50 font-bold">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <div className="text-[9px] uppercase font-bold text-white text-right max-w-[60%] leading-tight tracking-wider">
                      {license.title}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
