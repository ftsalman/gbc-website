import React from 'react';
import { Outlet } from 'react-router-dom';

export const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen w-full flex bg-white font-sans">
      {/* Left Side - Visual/Brand Panel */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-[#6C141E] to-gray-900 overflow-hidden items-center justify-center p-16">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2000&auto=format&fit=crop')" }}
        >
          {/* Overlay to keep text readable */}
          <div className="absolute inset-0 bg-[#6C141E]/60 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        {/* Subtle animated glassmorphism blobs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-[spin_10s_linear_infinite]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-black/20 rounded-full blur-3xl animate-[pulse_6s_ease-in-out_infinite]"></div>

        <div className="relative z-10 text-white max-w-lg">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8 shadow-xl border border-white/20">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-5xl font-black mb-6 tracking-tight leading-tight">
            Connect GBC<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-200 to-white">Admin Portal</span>
          </h1>
          <p className="text-xl font-light text-gray-300 leading-relaxed">
            Manage your partners, configure global settings, and oversee all business setup operations seamlessly from one unified secure dashboard.
          </p>
        </div>
      </div>
      
      {/* Right Side - Form Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 relative bg-gray-50/50">
        <div className="w-full max-w-md relative z-10">
          {children}
          <Outlet />
        </div>
      </div>
    </div>
  );
};
