import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../components/navbar/Navbar";
import { Footer } from "../components/footer/Footer";
import { ScrollToTop } from "../components/scroll-to-top/ScrollToTop";
import { WhatsAppButton } from "../components/whatsapp-button/WhatsAppButton";
import Lanyard from "../components/ui/Lanyard";

export const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen relative h-full w-full">
      <Navbar />
      <div className="flex-grow flex flex-col z-10 relative">
        <Outlet />
      </div>
      <Footer />
      
      {/* Global Scroll to Top Button & Route Restorer */}
      <ScrollToTop />
      
      {/* Global WhatsApp Floating Button */}
      <WhatsAppButton />

      {/* Global Interactive Lanyard Badge */}
      <div className="fixed top-0 right-0 lg:right-[5%] w-full max-w-[400px] h-screen z-50 pointer-events-none flex items-start justify-center hidden md:flex">
        {/* We enable pointer events just on this inner wrapper so it doesn't block the whole screen */}
        {/* <div className="w-full h-full" style={{ pointerEvents: 'auto' }}>
          <Lanyard 
            position={[0, 0, 24]} 
            gravity={[0, -40, 0]} 
            frontImage="/images/GBC_LOG.png"
            lanyardImage="/badge-lanyard.svg"
            lanyardWidth={1.5}
            imageFit="contain"
          />
        </div> */}
      </div>
    </div>
  );
};
