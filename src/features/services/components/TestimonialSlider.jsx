import React, { useState } from "react";

export const TestimonialSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      name: "Laxman Sana",
      company: "Allied Coontracting LLC",
      text: "It’s been more than 13 years since we started working with Global Business Connect, and they’ve been taking care of our typing and PRO requirements ever since. From MOHRE and immigration work to other PRO services, they’ve always handled everything responsibly and professionally. One thing that really stands out is their knowledge—each team member knows their area very well, which gives us a lot of confidence. We’ve always been 100% satisfied with their service, and we’re happy to have them as our trusted service partner.",
      image: "/images/testimonials/testimonials3.png",
      link: "alliedcontractingllc.ae ↗",
    },
    {
      name: "Sindhu",
      company: "Kensington Design LLC",
      text: "We have been working with GBC for more than 10 years, and throughout this journey, they have consistently been fast, efficient and highly professional. Their entire team, from the staff to the management and CEO, is highly knowledgeable and skilled in their respective areas. What we appreciate most is the way they communicate with us—always friendly and approachable, while maintaining complete professionalism and seriousness towards their work. Over the years, they have become more than just a service provider; we genuinely feel that they are part of our business family",
      image: "/images/testimonials/testimonials1.png",
      link: "kensingtondesignllc.ae ↗",
    },
    {
      name: "Rana Nabeel",
      company: "MAQS GROUP",
      text: "From securing our trade license to opening our corporate bank account, GBC has been a true partner. Highly recommend their all-in-one setup packages for any creative professional.",
      image: "/images/testimonials/testimonials2.jpeg",
      link: "maqsgroup.com ↗",
    },
    {
      name: "Naveed Khan Sher Aftab",
      company: "MOIN KHAN AND SHAH ZEB VEHICLES RECOVERY",
      text: "Setting up our vehicle recovery business was completely hassle-free thanks to GBC. Their deep understanding of the transport sector licensing and DET requirements meant we were fully operational much faster than expected.",
      image: "/images/testimonials/testimonials-7.png",
      link: "moinkhanrecovery.ae ↗",
    },
    {
      name: "Gurjeet Singh Harbhajan Singh",
      company: "Best Deal",
      text: "GBC provided exceptional guidance throughout our company formation process. Their team's proactive approach and seamless execution in handling our legal structuring at ADGM has been instrumental to our success.",
      image: "/images/testimonials/testimonials4.png",
      link: "bestdeal.ae ↗",
    },
    {
      name: "Qasim Mushtaq Chaudhry Mushtaq Ahmed",
      company: "PAK FRIENDS CARGO TRANSPORTBY TRUCK LLC",
      text: "Operating a cargo transport company requires strict compliance and complex logistics licenses. GBC managed our entire setup with remarkable efficiency, saving us significant time and allowing us to focus on our fleet operations.",
      image: "/images/testimonials/testimonials-5.png",
      link: "pakfriendscargo.ae ↗",
    },
    {
      name: "Ahmed Raza",
      company: "MUKTSAR TRANSPORT L.L.C",
      text: "We rely heavily on timely renewals and strict regulatory compliance for our transportation fleet. GBC has consistently delivered outstanding corporate PRO services, making them an indispensable partner for our growing business.",
      image: "/images/testimonials/testimonials-6.png",
      link: "muktsartransport.ae ↗",
    },
  ];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActiveIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  return (
    <section className="relative w-full py-24 bg-white text-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 mb-16 text-center">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight max-w-3xl mx-auto mb-12">
          Trusted by Businesses Across the UAE
        </h2>

        <p className="flex items-center justify-center mx-auto mt-6 mb-8 max-w-2xl text-center text-[13px] font-light leading-relaxed text-gray-400 sm:text-sm">
          For 15+ years, GBC has helped entrepreneurs and businesses with
          business setup, PRO services, visas, accounting and other essential
          corporate services.
        </p>

        {/* Stats Row */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-12 md:gap-24 border-b border-gray-200 pb-16">
          <div className="text-center">
            <p className="text-5xl md:text-6xl font-bold mb-2">1,000+</p>
            <p className="text-sm font-semibold tracking-widest text-gray-500 uppercase">
              Businesses Setup
            </p>
          </div>
          <div className="text-center">
            <p className="text-5xl md:text-6xl font-bold mb-2">15+</p>
            <p className="text-sm font-semibold tracking-widest text-gray-500 uppercase">
              Years Experience
            </p>
          </div>

          <div className="text-center">
            <p className="text-5xl md:text-6xl font-bold mb-2"> 70+</p>
            <p className="text-sm font-semibold tracking-widest text-gray-500 uppercase">
              Professionals
            </p>
          </div>
        </div>
      </div>

      {/* Testimonial Cards Carousel (Redesigned Split Layout) */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 ">
        <div className="flex flex-col lg:flex-row items-stretch min-h-[450px]">
          {/* Left Side: Quote and Controls */}
          <div className="w-full lg:w-1/2 flex flex-col justify-between pr-0 lg:pr-20 py-8 lg:py-12">
            <div className="relative min-h-[200px]">
              {testimonials.map((testimonial, idx) => (
                <div
                  key={`text-${idx}`}
                  className={`absolute top-0 left-0 w-full transition-all duration-500 ${
                    activeIndex === idx
                      ? "opacity-100 translate-y-0 z-10"
                      : "opacity-0 translate-y-4 z-0 pointer-events-none"
                  }`}
                >
                  <p className="text-2xl md:text-3xl lg:text-[20px]  mb-2 leading-[1.4] font-light text-black">
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
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  onClick={handleNext}
                  className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:text-black transition-colors"
                  aria-label="Next Testimonial"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>

              <div className="flex items-center space-x-2">
                {testimonials.map((_, idx) => (
                  <button
                    key={`dot-${idx}`}
                    onClick={() => setActiveIndex(idx)}
                    className={`h-0.5 rounded-full transition-all duration-300 ${
                      activeIndex === idx
                        ? "w-8 bg-black"
                        : "w-2 bg-gray-400 hover:bg-gray-600"
                    }`}
                    aria-label={`Go to testimonial ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Side: Image with Overlay */}
          <div className="w-full lg:w-1/2 h-[460px] lg:h-auto relative rounded-xl overflow-hidden mt-5 lg:mt-0 shadow-lg bg-gray-100">
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
                  <a
                    href={`https://${testimonial.link.split(' ')[0]}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium hover:underline opacity-90 flex items-center gap-1"
                  >
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
