import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const ArrowUpRightIcon = ({ className = "w-5 h-5" }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M7 17L17 7M17 7H7M17 7V17"
    />
  </svg>
);

const servicesList = [
  {
    name: "Start a Business",
    number: "01",
    link: "/services/mainland",
    image:
      "https://i.pinimg.com/736x/68/b7/c7/68b7c734d24c35a65af05162d7616dc3.jpg",
  },
  {
    name: "Dedicated PRO Subscription",
    number: "02",
    link: "/services",
    image:
      "https://i.pinimg.com/736x/85/0e/7e/850e7ea08eca0d71666ddc3d37e7156c.jpg",
  },
  {
    name: "Visa & Immigration",
    number: "03",
    link: "/services",
    image:
      "https://i.pinimg.com/1200x/89/cb/73/89cb73854cadc9f8bb45b5f8bf55c71a.jpg",
  },
  {
    name: "Trade License",
    number: "04",
    link: "/services",
    image:
      "https://i.pinimg.com/736x/1b/21/64/1b2164703102ef91cfb7a182d0538d6d.jpg",
  },
];

export const Hero = () => {
  const containerRef = useRef(null);
  const navigate = useNavigate();

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(
        ".hero-anim",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.15 },
      );

      tl.fromTo(
        ".hero-image-anim",
        { scale: 0.95, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2 },
        "-=0.8",
      );

      tl.fromTo(
        ".hero-card-anim",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15 },
        "-=0.6",
      );
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen bg-[#F4F7FB] overflow-hidden flex items-center pt-24 pb-12 font-sans"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col lg:flex-row items-center relative z-10">
        {/* Left Content */}
        <div className="flex-1 w-full lg:w-1/2 pr-0 lg:pr-10 xl:pr-16 relative z-20 mt-10 lg:mt-0">
          <h1 className="hero-anim text-[42px] sm:text-[56px] md:text-[64px] lg:text-[72px] font-bold text-[#111827] leading-[1.1] tracking-tight">
            Business Setup &amp; PRO <br className="hidden sm:block" />
            <span className="text-[#6C141E]">Services in Dubai</span>
          </h1>

          <p className="hero-anim mt-6 text-[#4B5563] text-base sm:text-lg lg:text-xl max-w-lg leading-relaxed">
            From company formation to visas and PRO services, we handle
            everything so you can focus on growing your business.
          </p>

          <div className="hero-anim mt-10 flex flex-wrap items-center gap-4">
            <a
              href="https://wa.me/971585277775"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 bg-[#6C141E] text-white rounded-full font-semibold text-[15px] shadow-lg shadow-[#6C141E]/30 hover:bg-[#8A1A27] transition-all hover:scale-105 active:scale-95"
            >
              Get Free Consultation
            </a>
            <a
              href="https://wa.me/971585277775"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 bg-transparent border-2 border-[#6C141E]/30 text-[#6C141E] rounded-full font-semibold text-[15px] hover:border-[#6C141E] hover:bg-[#6C141E]/5 transition-all hover:scale-105 active:scale-95 flex items-center justify-center"
            >
              Talk to an Expert
            </a>
          </div>

          <div className="hero-anim mt-12 flex items-center gap-5">
            <div className="flex -space-x-3">
              <img
                className="w-12 h-12 rounded-full border-2 border-[#F4F7FB] object-cover shadow-sm"
                src="/images/testimonials/testimonials1.png"
                alt="user"
              />
              <img
                className="w-12 h-12 rounded-full border-2 border-[#F4F7FB] object-cover shadow-sm"
                src="/images/testimonials/testimonials2.jpeg"
                alt="user"
              />
              <img
                className="w-12 h-12 rounded-full border-2 border-[#F4F7FB] object-cover shadow-sm"
                src="/images/testimonials/testimonials3.png"
                alt="user"
              />
            </div>
            <div className="text-sm font-bold text-[#111827]">
              Trusted by 1,000+
              <br />
              <span className="text-[#4B5563] font-medium">
                Businesses in UAE
              </span>
            </div>
          </div>
        </div>

        {/* Right Content - Image and Floating Cards */}
        <div className="flex-1 w-full lg:w-1/2 relative mt-20 lg:mt-0 flex justify-center lg:justify-end">
          <div className="relative w-full max-w-md lg:max-w-lg xl:max-w-xl hero-image-anim">
            <img
              src="/images/hero_business_handshake.png"
              alt="Business Setup"
              className="w-full h-[400px] lg:h-[550px] object-cover rounded-3xl shadow-2xl"
            />

            {/* Floating Card 1 */}
            <div
              onClick={() => navigate(servicesList[0].link)}
              className="hero-card-anim absolute top-6 -left-4 sm:-left-12 bg-white rounded-2xl p-3.5 sm:p-5 shadow-xl flex items-center gap-3 sm:gap-4 border border-gray-100 cursor-pointer hover:scale-105 transition-transform"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#6C141E] rounded-xl flex items-center justify-center text-white">
                <ArrowUpRightIcon className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <div className="text-[10px] sm:text-xs text-gray-500 font-medium uppercase tracking-wider">
                  Service
                </div>
                <div className="text-sm sm:text-base font-bold text-gray-900">
                  {servicesList[0].name}
                </div>
              </div>
            </div>

            {/* Floating Card 2 */}
            <div
              onClick={() => navigate(servicesList[1].link)}
              className="hero-card-anim absolute top-1/2 -right-4 sm:-right-10 -translate-y-1/2 bg-white rounded-2xl p-3.5 sm:p-5 shadow-xl flex items-center gap-3 sm:gap-4 border border-gray-100 cursor-pointer hover:scale-105 transition-transform"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#6C141E] rounded-xl flex items-center justify-center text-white">
                <ArrowUpRightIcon className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <div className="text-[10px] sm:text-xs text-gray-500 font-medium uppercase tracking-wider">
                  Service
                </div>
                <div className="text-sm sm:text-base font-bold text-gray-900">
                  {servicesList[1].name}
                </div>
              </div>
            </div>

            {/* Floating Card 3 */}
            <div
              onClick={() => navigate(servicesList[2].link)}
              className="hero-card-anim absolute bottom-6 -left-2 sm:-left-8 bg-white rounded-2xl p-3.5 sm:p-5 shadow-xl flex items-center gap-3 sm:gap-4 border border-gray-100 cursor-pointer hover:scale-105 transition-transform"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#6C141E] rounded-xl flex items-center justify-center text-white">
                <ArrowUpRightIcon className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <div className="text-[10px] sm:text-xs text-gray-500 font-medium uppercase tracking-wider">
                  Service
                </div>
                <div className="text-sm sm:text-base font-bold text-gray-900">
                  {servicesList[2].name}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
