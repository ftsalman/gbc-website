import React from "react";

export const VisaLocationMap = () => {
  return (
    <section className="py-20 bg-white text-gray-900 font-sans">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 flex flex-col items-center">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-semibold text-[#1e293b] tracking-tight">
            GBC Business Connect 
          </h2>
          <p className="text-lg sm:text-xl text-[#475569] font-medium mt-2">
           International City, Office 13058 527 7775
          </p>
          <p className="text-sm sm:text-base text-[#64748b] tracking-wide mt-1 uppercase">
            
          </p>
        </div>

        {/* Map Container */}
        <div className="w-full max-w-5xl aspect-[21/9] min-h-[350px] sm:min-h-[450px] rounded-2xl overflow-hidden border border-gray-200 shadow-lg bg-gray-50 relative">
          <iframe
            src="https://maps.google.com/maps?q=Amer%20Center%20Al%20Tawar%20Building%208E%20Al%20Quds%20St%20Dubai&t=k&z=17&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Amer Center DAFZA Al Twar Location Map"
            className="absolute inset-0 w-full h-full"
          />
        </div>
      </div>
    </section>
  );
};
