import React, { useState } from "react";

export const TestimonialSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      name: "Sarah M.",
      company: "Tech Startups LLC",
      text: "Global Business Connect made our freezone company setup incredibly smooth. Their team handled all the complex documentation and visa processes, allowing us to focus entirely on launching our product.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800",
      link: "techstartups.ae ↗"
    },
    {
      name: "Ahmed K.",
      company: "Retail Ventures",
      text: "I was overwhelmed by the mainland setup requirements, but the GBC team provided a clear, step-by-step roadmap. Their PRO services are top-notch and saved us countless hours.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800",
      link: "retailventures.ae ↗"
    },
    {
      name: "Elena R.",
      company: "Creative Studio",
      text: "From securing our trade license to opening our corporate bank account, GBC has been a true partner. Highly recommend their all-in-one setup packages for any creative professional.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=800",
      link: "creativestudio.com ↗"
    }
  ];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="relative w-full py-24 bg-white text-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 mb-16 text-center">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight max-w-3xl mx-auto mb-12">
          Join thousands of entrepreneurs who started their businesses with GBC
        </h2>
        
        {/* Stats Row */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-12 md:gap-24 border-b border-gray-200 pb-16">
          <div className="text-center">
            <p className="text-5xl md:text-6xl font-bold mb-2">5,000+</p>
            <p className="text-sm font-semibold tracking-widest text-gray-500 uppercase">Businesses Setup</p>
          </div>
          <div className="text-center">
            <p className="text-5xl md:text-6xl font-bold mb-2">15+</p>
            <p className="text-sm font-semibold tracking-widest text-gray-500 uppercase">Years Experience</p>
          </div>
        </div>
      </div>

      {/* Testimonial Cards Carousel (Redesigned Split Layout) */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="flex flex-col lg:flex-row items-stretch min-h-[450px]">
          
          {/* Left Side: Quote and Controls */}
          <div className="w-full lg:w-1/2 flex flex-col justify-between pr-0 lg:pr-20 py-8 lg:py-12">
            <div className="relative min-h-[200px]">
              {testimonials.map((testimonial, idx) => (
                <div 
                  key={`text-${idx}`}
                  className={`absolute top-0 left-0 w-full transition-all duration-500 ${
                    activeIndex === idx ? "opacity-100 translate-y-0 z-10" : "opacity-0 translate-y-4 z-0 pointer-events-none"
                  }`}
                >
                  <p className="text-2xl md:text-3xl lg:text-[2rem] leading-[1.4] font-light text-black">
                    “{testimonial.text}”
                  </p>
                </div>
              ))}
            </div>
            
            {/* Controls */}
            <div className="flex items-center justify-between mt-12 lg:mt-32 pt-8 border-t lg:border-t-0 border-gray-100">
              <div className="flex space-x-3">
                <button 
                  onClick={handlePrev}
                  className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:text-black transition-colors"
                  aria-label="Previous Testimonial"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button 
                  onClick={handleNext}
                  className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:text-black transition-colors"
                  aria-label="Next Testimonial"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              
              <div className="flex items-center space-x-2">
                {testimonials.map((_, idx) => (
                  <button 
                    key={`dot-${idx}`}
                    onClick={() => setActiveIndex(idx)}
                    className={`h-0.5 rounded-full transition-all duration-300 ${
                      activeIndex === idx ? "w-8 bg-black" : "w-2 bg-gray-400 hover:bg-gray-600"
                    }`}
                    aria-label={`Go to testimonial ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Side: Image with Overlay */}
          <div className="w-full lg:w-1/2 h-[450px] lg:h-auto relative rounded-xl overflow-hidden mt-8 lg:mt-0 shadow-lg bg-gray-100">
             {testimonials.map((testimonial, idx) => (
               <div 
                 key={`img-${idx}`}
                 className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                   activeIndex === idx ? "opacity-100 z-10" : "opacity-0 z-0"
                 }`}
               >
                 <img 
                   src={testimonial.image} 
                   alt={testimonial.name}
                   className="w-full h-full object-cover"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                 
                 <div className="absolute bottom-8 left-8 text-white">
                    <p className="font-bold text-lg mb-1">{testimonial.name}</p>
                    <a href="#" className="text-sm font-medium hover:underline opacity-90 flex items-center gap-1">
                      {testimonial.link}
                    </a>
                 </div>
               </div>
             ))}
          </div>

        </div>
      </div>
    </section>
  );
};

