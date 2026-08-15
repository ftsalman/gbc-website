import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, MapPin, Phone } from "lucide-react";
import { Button } from "../../../../lib/turtle-ui/components";

gsap.registerPlugin(ScrollTrigger);

export const ContactForm = () => {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      // Left side text animation
      gsap.fromTo(
        ".contact-left-item",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );

      // Right side form animation
      gsap.fromTo(
        ".contact-form-card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="contact-form-section bg-white text-black py-24 sm:py-32 font-sans relative overflow-hidden border-b border-black/10"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-start">
          
          {/* Left Column: Contact Info */}
          <div className="lg:col-span-5 flex flex-col justify-start pt-4">
            <div className="contact-left-item mb-6">
              <span className="font-mono text-sm font-semibold tracking-tight uppercase">
                <span className="text-bordeaux mr-1">//</span>
                <span className="text-gray-500">Let's Connect</span>
              </span>
            </div>

            <h2 className="contact-left-item text-4xl sm:text-5xl md:text-[56px] font-normal tracking-tight text-gray-900 leading-[1.05] mb-6 max-w-md">
              Let’s Talk About Your Business
            </h2>

            <p className="contact-left-item text-sm text-gray-500 leading-relaxed mb-10 max-w-md">
              Whether you need business setup, PRO services, accounting, VAT support or government assistance, our team is ready to help.
            </p>

            <div className="flex flex-col">
              {/* Email */}
              <div className="contact-left-item py-6 border-b border-black/10 flex items-start gap-6 group">
                <div className="mt-1 text-gray-400 group-hover:text-bordeaux transition-colors duration-300">
                  <Mail className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="text-xl font-normal text-gray-900 mb-2">Email</h4>
                  <a href="mailto:typing@connectgbc.com" className="text-sm text-gray-500 hover:text-bordeaux transition-colors font-light">
                    typing@connectgbc.com
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="contact-left-item py-6 border-b border-black/10 flex items-start gap-6 group">
                <div className="mt-1 text-gray-400 group-hover:text-bordeaux transition-colors duration-300">
                  <MapPin className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="text-xl font-normal text-gray-900 mb-2">Address</h4>
                  <p className="text-sm text-gray-500 font-light leading-relaxed max-w-[260px]">
                    Dubai Silicon Oasis, DDP, Building A1, Dubai, United Arab Emirates
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="contact-left-item py-6 border-b border-black/10 flex items-start gap-6 group">
                <div className="mt-1 text-gray-400 group-hover:text-bordeaux transition-colors duration-300">
                  <Phone className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="text-xl font-normal text-gray-900 mb-2">Phone</h4>
                  <a href="tel:+971585277775" className="text-sm text-gray-500 hover:text-bordeaux transition-colors font-light">
                    +971 58 527 7775
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Form Card */}
          <div className="lg:col-span-7 contact-form-card relative">
            <div className="bg-[#050505] rounded-sm p-8 sm:p-12 relative overflow-hidden">
              
              {/* Decorative Bordeaux Ribbon Image in the corner matching Syncox blue bloom */}
              <div className="absolute bottom-0 right-0 w-[85%] h-[75%] sm:w-[65%] sm:h-[65%] pointer-events-none z-0">
                <img 
                  src="/images/bordeaux_ribbon.png" 
                  alt="" 
                  className="w-full h-full object-cover object-center brightness-125 contrast-110" 
                  style={{
                    maskImage: "radial-gradient(circle at 100% 100%, black 40%, transparent 95%)",
                    WebkitMaskImage: "radial-gradient(circle at 100% 100%, black 40%, transparent 95%)"
                  }}
                />
              </div>

              <div className="relative z-10 flex flex-col">
                <h3 className="text-3xl sm:text-4xl font-normal text-white tracking-tight mb-3">
                  Stay Connected
                </h3>
                <p className="text-sm sm:text-base text-gray-400 font-light mb-10">
                  Reach out for business setup, visa inquiries, or corporate tax consulting—we're here to help.
                </p>

                <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
                  {/* Name */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-sm text-white font-medium">Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      placeholder="First Name" 
                      className="bg-[#151515] border border-white/10 text-white text-sm px-5 py-4 w-full focus:outline-none focus:border-bordeaux/50 focus:ring-1 focus:ring-bordeaux/50 transition-all rounded-sm placeholder-gray-600"
                    />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-sm text-white font-medium">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      placeholder="Enter Email Address" 
                      className="bg-[#151515] border border-white/10 text-white text-sm px-5 py-4 w-full focus:outline-none focus:border-bordeaux/50 focus:ring-1 focus:ring-bordeaux/50 transition-all rounded-sm placeholder-gray-600"
                    />
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="message" className="text-sm text-white font-medium">Message</label>
                    <textarea 
                      id="message" 
                      rows="4"
                      placeholder="Enter Your Message" 
                      className="bg-[#151515] border border-white/10 text-white text-sm px-5 py-4 w-full focus:outline-none focus:border-bordeaux/50 focus:ring-1 focus:ring-bordeaux/50 transition-all rounded-sm resize-none placeholder-gray-600"
                    ></textarea>
                  </div>

                  <div className="mt-4">
                    <button 
                      type="submit" 
                      className="bg-bordeaux text-white font-semibold text-sm px-10 py-4 hover:bg-bordeaux/90 transition-colors shadow-lg"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
