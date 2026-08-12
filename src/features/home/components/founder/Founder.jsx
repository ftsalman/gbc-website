import React from "react";
import { motion } from "framer-motion";

export const Founder = () => {
  return (
    <section className="relative w-full max-w-full mx-auto px-6 lg:px-12 py-24 min-h-[700px] flex items-end bg-white/50 overflow-hidden">
      {/* header  */}
      <div className="absolute top-12 md:top-24 left-6 lg:left-12 z-20">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col"
        >
          <span className="text-[#6C141E] font-semibold tracking-[0.3em] uppercase text-xs md:text-sm mb-2 md:mb-4">
            Vision & Leadership
          </span>
          <h1 className="text-5xl md:text-7xl font-serif text-gray-900 leading-none tracking-tight">
            Founder <span className="italic font-light text-gray-500">Says</span>
          </h1>
        </motion.div>
      </div>

      {/* Graph/Grid Pattern Background */}
      <div className="absolute inset-0 z-0 opacity-[0.06] bg-[linear-gradient(#6C141E_1px,transparent_1px),linear-gradient(90deg,#6C141E_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none"></div>
      
     
      {/* Background Image Container */}
      <div className="absolute inset-0 flex justify-center items-end pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="relative w-full max-w-3xl h-full flex justify-center items-end"
        >
          <img
            src="/images/FOUNDER-GBC.png"
            alt="Founder"
            className="object-cover object-top h-[95%] w-auto max-w-full"
          />
          {/* Glass blur fade effect */}
          <div className="absolute -bottom-2 left-0 w-full h-[45%] bg-white/10 backdrop-blur-[0.55px] [mask-image:linear-gradient(to_top,black_20%,transparent_100%)]"></div>
          {/* Secondary gradient to ensure a completely solid white base at the very bottom */}
          <div className="absolute -bottom-2 left-0 w-full h-[25%] bg-gradient-to-t from-white via-white/80 to-transparent"></div>
        </motion.div>
      </div>

      {/* Content overlay */}
      <div className="relative z-10 w-full flex flex-col md:flex-row justify-between items-end gap-12 pb-12">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="max-w-lg"
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            <span className="text-sm text-gray-600 tracking-wide font-medium">
              @rafeekgbc &nbsp;•&nbsp; @almarahuae
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-gray-900 leading-tight">
         Founder  Rafeeq
          </h2>
        </motion.div>

        {/* Right Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="max-w-sm flex flex-col items-start md:pb-2"
        >
          <p className="text-gray-600 text-sm md:text-md leading-relaxed mb-6 text-justify">
            "We focus on providing expert, transparent and UpToDate services to
            our valuable clints so that they needn’t bother about the hectic
            tasks and they can utilize their valuable time for high value
            activities."
          </p>
          <a
            href="contact"
            className="px-6 py-3 bg-[#6C141E] text-white rounded-full text-sm font-medium hover:bg-red-900 transition-colors shadow-lg"
          >
            Contact Us
          </a>
        </motion.div>
      </div>
    </section>
  );
};
