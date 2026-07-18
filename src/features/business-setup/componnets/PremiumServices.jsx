import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Briefcase, 
  FileCheck, 
  IdCard, 
  Stethoscope, 
  Building, 
  ShieldCheck, 
  Files, 
  Languages, 
  Receipt, 
  Calculator, 
  Landmark 
} from 'lucide-react';

const services = [
  { name: 'Trade License', icon: FileText },
  { name: 'PRO Services', icon: Briefcase },
  { name: 'Visa Processing', icon: FileCheck },
  { name: 'Emirates ID', icon: IdCard },
  { name: 'Medical Test', icon: Stethoscope },
  { name: 'MOHRE', icon: Building },
  { name: 'GDRFA', icon: ShieldCheck },
  { name: 'Document Clearing', icon: Files },
  { name: 'Legal Translation', icon: Languages },
  { name: 'VAT Registration', icon: Receipt },
  { name: 'Corporate Tax', icon: Calculator },
  { name: 'Business Bank Account', icon: Landmark },
];

export const PremiumServices = () => {
  return (
    <section className="py-24 bg-black relative overflow-hidden font-sans border-t border-gray-900">
      {/* Background ambient glows */}
      <div className="absolute top-1/4 -left-1/4 w-[50%] h-[50%] bg-yellow-500/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 -right-1/4 w-[50%] h-[50%] bg-bordeaux/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-5xl font-medium text-white leading-tight tracking-tight">
            Everything Your <br className="hidden md:block" />
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200">
              Business Needs
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <div className="group relative p-6 h-full flex flex-col items-center justify-center text-center rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 hover:border-yellow-400/40 hover:bg-white/10 transition-all duration-300 cursor-pointer overflow-hidden shadow-lg hover:shadow-[0_0_30px_rgba(250,204,21,0.1)] hover:-translate-y-2">
                  <div className="mb-4 text-white/60 group-hover:text-yellow-400 transition-colors duration-300">
                    <Icon className="w-10 h-10 transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500 ease-out" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-sm md:text-base font-medium text-white/80 group-hover:text-white transition-colors duration-300">
                    {service.name}
                  </h3>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
