import React, { useState, useEffect } from 'react';

export const WhatsAppButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  // NOTE: Update this to the exact WhatsApp number listed on your Instagram profile
  const phoneNumber = "971501234567"; 
  
  // The automatic pre-filled message when someone clicks the WhatsApp button
  const messageText = "Hello Global Business Connect team! I found your profile on Instagram (https://www.instagram.com/globalbusinessconnect) and would like to inquire about business setup in the UAE.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(messageText)}`;

  // Delay the appearance slightly for a nice intro effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed bottom-24 right-8 z-50 transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-90'
      }`}
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center justify-center w-14 h-14 bg-bordeaux text-white rounded-full shadow-lg shadow-black/20 hover:bg-bordeaux/90 hover:scale-110 hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-bordeaux/30 border-2 border-white/10 relative"
        aria-label="Chat with us on WhatsApp"
      >
        {/* Tooltip */}
        <span className="absolute right-[calc(100%+1rem)] px-3 py-1.5 bg-black text-white text-xs font-medium whitespace-nowrap rounded-sm opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 pointer-events-none border border-white/10">
          Chat with us
        </span>

        {/* Custom WhatsApp SVG Icon */}
        <svg
          viewBox="0 0 24 24"
          width="28"
          height="28"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-transform group-hover:-rotate-12 duration-300"
        >
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
        
        {/* Pulse effect rings */}
        <span className="absolute w-full h-full rounded-full border-2 border-bordeaux animate-ping opacity-20" />
      </a>
    </div>
  );
};
