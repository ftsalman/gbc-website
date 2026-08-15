import React, { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "../../../lib/turtle-ui/components";

export const Footer = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
    }
  };

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Packages", href: "/packages" },
    { name: "Business Setup", href: "/business-setup" },
    { name: "Blog", href: "/blogs" },
  ];

  const utilityLinks = [
    { name: "Mainland Setup", href: "/services/mainland" },
    { name: "Freezone Company", href: "/business-setup" },
    { name: "PRO Services", href: "/services/pro-services" },
    { name: "Golden Visa", href: "/services/visa" },
    { name: "Corporate Banking", href: "/services/accounting" },
    { name: "Legal Advisory", href: "/services/compliance-legal" },
  ];

  const contactLinks = [
    { name: "+971 58 527 7775", href: "tel:+971585277775" },
    { name: "typing@connectgbc.com", href: "mailto:typing@connectgbc.com" },
    { name: "Business Bay, Dubai", href: "/contact" },
  ];

  const socialLinks = [
    { name: "Instagram", href: "https://www.instagram.com/globalbusinessconnect/" },
    { name: "YouTube", href: "https://www.youtube.com/@globalbusinessconnect" },
    { name: "Facebook", href: "https://facebook.com" },
    { name: "Linkedin", href: "https://linkedin.com" },
  ];

  return (
    <footer className="relative bg-black text-white pt-16 pb-12 border-t border-white/15 font-sans overflow-hidden">
      {/* Subtle bottom glow blending from Connect CTA */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute -top-48 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-bordeaux/30 blur-[140px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        {/* Top Block matching Syncox .footer-top-block */}
        <div className="footer-top-block flex flex-col lg:flex-row justify-between gap-12 lg:gap-20 pb-16 border-b border-white/15">
          {/* Left: Newsletter Block (.footer-newsletter-block -> max-w-[438px]) */}
          <div className="footer-newsletter-block w-full lg:max-w-[438px] flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <h4 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
                Stay Connected
              </h4>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                Join our newsletter for Dubai corporate updates, regulatory
                tips, and setup guides — only the good stuff.
              </p>
            </div>

            {/* Newsletter Form */}
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 w-full"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email Address"
                required
                className="px-5 py-3.5 rounded-xl bg-white/[0.06] border border-white/15 text-white placeholder-gray-400 text-sm focus:outline-none focus:border-bordeaux flex-1 transition-colors"
              />
              <Button type="submit" variant="corner" size="md">
                Submit
              </Button>
            </form>
            {submitted && (
              <div className="text-sm text-green-400 font-medium">
                Thank you! Your submission has been received.
              </div>
            )}
          </div>

          {/* Right: Links Grid (.footer-links-block -> grid-cols-2 sm:grid-cols-3 gap-8) */}
          <div className="footer-links-block flex-1 grid grid-cols-2 sm:grid-cols-3 gap-8 lg:max-w-[650px] ml-auto">
            {/* Quick Links Column */}
            <div className="flex flex-col gap-6 font-medium">
              <div className="text-base sm:text-lg text-white font-semibold tracking-tight">
                Quick links
              </div>
              <div className="flex flex-col gap-3.5">
                {quickLinks.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.href}
                    className="group flex flex-col items-start text-gray-400 hover:text-white transition-colors text-sm sm:text-base font-normal"
                  >
                    <span>{link.name}</span>
                    <div className="w-full h-px bg-white/15 mt-1 group-hover:bg-white transition-colors" />
                  </a>
                ))}
              </div>
            </div>

            {/* Utility / Services Column */}
            <div className="flex flex-col gap-6 font-medium">
              <div className="text-base sm:text-lg text-white font-semibold tracking-tight">
                Services
              </div>
              <div className="flex flex-col gap-3.5">
                {utilityLinks.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.href}
                    className="group flex flex-col items-start text-gray-400 hover:text-white transition-colors text-sm sm:text-base font-normal"
                  >
                    <span>{link.name}</span>
                    <div className="w-full h-px bg-white/15 mt-1 group-hover:bg-white transition-colors" />
                  </a>
                ))}
              </div>
            </div>

            {/* Get in touch Column */}
            <div className="flex flex-col gap-6 font-medium col-span-2 sm:col-span-1">
              <div className="text-base sm:text-lg text-white font-semibold tracking-tight">
                Get in touch
              </div>
              <div className="flex flex-col gap-3.5">
                {contactLinks.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.href}
                    className="group flex flex-col items-start text-gray-400 hover:text-white transition-colors text-sm sm:text-base font-normal"
                  >
                    <span>{link.name}</span>
                    <div className="w-full h-px bg-white/15 mt-1 group-hover:bg-white transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Block matching Syncox .footer-bottom-block */}
        <div className="footer-bottom-block flex flex-col-reverse lg:flex-row items-center justify-between gap-12 pt-16">
          {/* Left: Social Links (.footer-social-links-block -> max-w-[280px]) */}
          <div className="footer-social-links-block w-full lg:max-w-[280px] flex flex-col">
            {socialLinks.map((social, idx) => (
              <a
                key={idx}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between py-3.5 border-b border-white/15 text-gray-300 hover:text-white transition-colors group"
              >
                <span className="text-base font-medium">{social.name}</span>
                <ArrowUpRight className="w-4 h-4 stroke-[1.5] text-gray-400 group-hover:text-white transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>
            ))}
          </div>

          {/* Right: Big Brand Watermark Logo (.footer-big-logo -> text-6xl sm:text-8xl lg:text-9xl) */}
          <div className="footer-big-logo ml-auto text-right select-none">
            <span className="text-5xl sm:text-7xl md:text-8xl lg:text-7xl font-black tracking-tighter uppercase text-white/90 leading-none block max-w-7xl whitespace-nowrap">
             <span className="text-bordeaux">GBC </span> BUSINESS CONNECT<span className="text-bordeaux">.</span>
            </span>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="pt-8 mt-12 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs sm:text-sm text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} GBC Business Connect. All rights
            reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Changelog
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
