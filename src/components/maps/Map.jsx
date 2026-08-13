import React from 'react';
import PropTypes from 'prop-types';

export const Map = ({
  query = "GBC Business Connect Al Asmawi Building 19 Al Manama St Ras Al Khor Industrial Area 2 Dubai",
  title = "GBC Business Connect",
  subtitle1 = "Al Asmawi Building – 19 Al Manama St",
  subtitle2 = "Ras Al Khor Industrial Area 2, Dubai, United Arab Emirates",
  zoom = 17,
  height = "480px"
}) => {
  const embedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(query)}&t=k&z=${zoom}&ie=UTF8&iwloc=&output=embed`;

  return (
    <section className="py-20 bg-white text-gray-900 font-sans">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 flex flex-col items-center">
        
        {/* Centered Header Section matching the reference image */}
        <div className="text-center mb-10 space-y-2">
          <h2 className="text-3xl sm:text-4xl font-semibold text-[#1e293b] tracking-tight">
            {title}
          </h2>
          <p className="text-lg sm:text-xl text-[#475569] font-medium">
            {subtitle1}
          </p>
          <p className="text-sm sm:text-base text-[#64748b] tracking-wide">
            {subtitle2}
          </p>
        </div>

        {/* Full-width Map Container */}
        <div 
          className="w-full max-w-5xl rounded-[24px] overflow-hidden border border-gray-200 shadow-lg bg-gray-50 relative"
          style={{ height }}
        >
          <iframe
            src={embedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`${title} Location Map`}
            className="absolute inset-0 w-full h-full"
          />
        </div>
        
      </div>
    </section>
  );
};

Map.propTypes = {
  query: PropTypes.string,
  title: PropTypes.string,
  subtitle1: PropTypes.string,
  subtitle2: PropTypes.string,
  zoom: PropTypes.number,
  height: PropTypes.string
};
