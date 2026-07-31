import React, { useState, useEffect } from "react";
import {
  Modal,
  Button,
  InputBox,
} from "../../../../../lib/turtle-ui/components";

export const PromoPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show the popup after a short delay (e.g. 2.5 seconds)
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      className="max-w-[840px] w-[95%] p-0 overflow-hidden bg-white shadow-2xl !rounded-xl"
    >
      <div className="flex flex-col md:flex-row relative">
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 z-20 w-8 h-8 cursor-pointer flex items-center justify-center rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-black transition-all duration-300 group"
          aria-label="Close popup"
        >
          <span className="text-xs font-bold font-sans group-hover:rotate-90 transition-transform duration-300">
            ✕
          </span>
        </button>

        {/* Left Image Section */}
        <div className="w-full md:w-5/12 relative bg-gray-900 min-h-[250px] md:min-h-[500px] overflow-hidden">
          <img
            // Reliable Dubai Image (or replace with your local GIF path like '/assets/dubai-metro.gif')
            src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=100"
            alt="Dubai Metro"
            className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-[10s] hover:scale-110"
          />
          {/* Elegant gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 to-transparent"></div>

          <div className="absolute bottom-8 left-8 right-8 text-white">
            <p className="text-sm tracking-[0.2em] uppercase font-semibold mb-2 opacity-80">
              GBC Corporate
            </p>
            <div className="h-[1px] w-12 bg-white mb-2"></div>
            <p className="text-lg font-serif">
              Your gateway to global success.
            </p>
          </div>
        </div>

        {/* Right Content Section (Contact Form) */}
        <div className="w-full md:w-7/12 p-8 md:p-12 flex flex-col justify-center items-start bg-white">
          <div className="w-full flex flex-col items-start transition-all duration-700 translate-y-0 opacity-100">
            <span className="text-[#0963D8] font-bold text-[11px] mb-3 tracking-[0.2em] uppercase font-sans border border-[#0963D8]/20 px-3 py-1 rounded-full bg-blue-50/50">
              Get In Touch
            </span>
            <h2 className="text-[32px] md:text-[38px] font-black leading-[1.1] text-[#111] mb-3 tracking-tight font-sans">
              Contact Our Experts
            </h2>
            <p className="text-gray-500 mb-6 text-[15px] leading-relaxed font-serif pr-4">
              Leave your details below and one of our business setup consultants
              will get back to you shortly.
            </p>

            <form
              className="w-full flex flex-col gap-4 mb-4"
              onSubmit={(e) => {
                e.preventDefault();
                setIsOpen(false);
              }}
            >
              <InputBox
                type="text"
                placeholder="Full Name"
                className="w-full bg-gray-50 border-gray-200"
                required
              />
              <InputBox
                type="email"
                placeholder="Email Address"
                className="w-full bg-gray-50 border-gray-200"
                required
              />
              <InputBox
                type="tel"
                placeholder="Phone Number"
                className="w-full bg-gray-50 border-gray-200"
                required
              />

              <Button
                variant="primary"
                corners={true}
                className="w-full mt-2"
                type="submit"
              >
                Request Callback
              </Button>
            </form>
            <p className="text-[11px] text-gray-400 font-sans mt-2">
              Your information is secure and will never be shared with third
              parties.
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
};
