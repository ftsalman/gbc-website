import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { DataList } from "../../../lib/turtle-ui/components/list/DataList";
import { Button } from "../../../lib/turtle-ui/components/button/Button";
import { ParticleButton } from "../ui/particle-button";
import { navItems, megaMenuData } from "../../constants/navData";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLightBg, setIsLightBg] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (window.scrollY > 10) {
            setIsScrolled(true);
          } else {
            setIsScrolled(false);
          }

          // Dynamically check background color behind navbar
          const elements = document.elementsFromPoint(
            window.innerWidth / 2,
            30,
          );
          let isDark = true; // Default to dark (like hero)

          for (let i = 0; i < elements.length; i++) {
            const el = elements[i];
            if (el.tagName === "NAV" || el.closest("nav")) continue;

            const style = window.getComputedStyle(el);
            const bg = style.backgroundColor;

            if (bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent") {
              const rgbMatch = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
              if (rgbMatch) {
                const r = parseInt(rgbMatch[1]);
                const g = parseInt(rgbMatch[2]);
                const b = parseInt(rgbMatch[3]);
                const brightness = (r * 299 + g * 587 + b * 114) / 1000;
                isDark = brightness < 128;
              }
              break;
            }
          }

          setIsLightBg(!isDark);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useGSAP(
    () => {
      const tl = gsap.timeline();
      tl.fromTo(
        navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power4.out" },
      ).fromTo(
        ".nav-item-animate",
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" },
        "-=0.6",
      );
    },
    { scope: navRef },
  );

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 z-50 w-full  transition-all duration-300 border-b p-4 ${
          isScrolled
            ? " backdrop-blur-sm border-none"
            : "bg-transparent border-transparent"
        }`}
        onMouseLeave={() => setActiveMenu(null)}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 text-xs md:text-sm font-medium tracking-tight relative">
            {/* Logo (Home Link) - Left Aligned */}
            <div className="flex-shrink-0 flex items-center nav-item-animate opacity-0">
              <Link
                to="/"
                className={`hover:opacity-80 transition-colors duration-300 opacity-80 hover:opacity-100 flex items-center ${isLightBg ? "text-black" : "text-white"}`}
                aria-label="Home"
              >
                <img
                  src="/images/LOGO_GBC.png"
                  alt="logo"
                  className={`w-24 transition-all duration-300 ${isLightBg ? "invert" : ""}`}
                />
              </Link>
            </div>

            {/* Nav Links - Centered Absolutely */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center h-full">
              <DataList
                data={navItems}
                className="flex space-x-6 lg:space-x-8 items-center h-full !flex-row"
                render={(item, index) => (
                  <div
                    key={index}
                    className="h-full flex items-center cursor-pointer nav-item-animate opacity-0 relative group"
                    onMouseEnter={() => {
                      if (megaMenuData[item]) {
                        setActiveMenu(item);
                      } else {
                        setActiveMenu(null);
                      }
                    }}
                  >
                    <Link
                      to={`/${item.toLowerCase().replace(/ & /g, "-").replace(/\s+/g, "-")}`}
                      className={`transition-all duration-300 text-[14px] tracking-wide whitespace-nowrap py-2 ${isLightBg ? "text-black" : "text-white"} ${
                        activeMenu === item
                          ? "opacity-100"
                          : "opacity-80 hover:opacity-100"
                      }`}
                    >
                      {item}
                    </Link>

                    {/* Standard Dropdown */}
                    {megaMenuData[item] && (
                      <div
                        className={`absolute top-[90%] left-1/2 -translate-x-1/2 w-48 overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] bg-[#0a0a0a] backdrop-blur-xl border border-gray-800 rounded-b-xl shadow-xl ${
                          activeMenu === item
                            ? "max-h-[500px] opacity-100 py-2 border-t-0"
                            : "max-h-0 opacity-0 py-0 border-transparent"
                        }`}
                      >
                        <ul className="flex flex-col">
                          {megaMenuData[item].map((link, idx) => (
                            <li key={idx}>
                              {link.href?.startsWith('http') ? (
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    window.open(link.href, "_blank");
                                    setActiveMenu(null);
                                  }}
                                  className="block w-full px-4 py-2.5 text-white/80 hover:text-white hover:bg-white/5 transition-colors text-sm font-medium tracking-wide text-left cursor-pointer"
                                >
                                  {link.name}
                                </button>
                              ) : (
                                <Link
                                  to={link.href || "#"}
                                  onClick={() => setActiveMenu(null)}
                                  className="block px-4 py-2.5 text-white/80 hover:text-white hover:bg-white/5 transition-colors text-sm font-medium tracking-wide text-start"
                                >
                                  {link.name}
                                </Link>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              />
            </div>

            {/* Connect Agent Button - Right Aligned */}
            <div className="flex items-center space-x-4 flex-shrink-0 justify-end nav-item-animate opacity-0">
              <ParticleButton
                className="hidden md:flex rounded-xl"
                onClick={() => (window.location.href = "/contact")}
                successDuration={1000}
                variant="default"
              >
                Get Free Consultation
              </ParticleButton>
              {/* Mobile Menu Toggle */}
              <Button
                className={`!p-0 !bg-transparent md:hidden hover:opacity-80 ml-2 transition-opacity ${isLightBg ? "text-black" : "text-white"}`}
                aria-label="Menu"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Desktop dropdowns are now rendered inline with each nav item */}

        {/* Mobile Menu Dropdown */}
        <div
          className={`md:hidden absolute top-full left-0 w-full bg-ivory/95 backdrop-blur-xl border-b border-gray-200/50 shadow-lg overflow-y-auto transition-all duration-300 ease-in-out ${
            isMobileMenuOpen
              ? "max-h-[80vh] py-6 opacity-100"
              : "max-h-0 py-0 opacity-0"
          }`}
        >
          <div className="px-6 flex flex-col space-y-6">
            {navItems.map((item, idx) => (
              <div key={idx} className="flex flex-col">
                <Link
                  to={`/${item.toLowerCase().replace(/ & /g, "-").replace(/\s+/g, "-")}`}
                  className="text-bordeaux font-bold text-xl py-2 border-b border-bordeaux/10"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item}
                </Link>
                {megaMenuData[item] && (
                  <div className="pl-4 mt-3 flex flex-col space-y-3 border-l-2 border-bordeaux/20">
                    {megaMenuData[item].map((subItem, subIdx) => (
                      subItem.href?.startsWith('http') ? (
                        <button
                          key={subIdx}
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            window.open(subItem.href, "_blank");
                            setIsMobileMenuOpen(false);
                          }}
                          className="w-full text-left text-bordeaux/80 text-sm font-medium py-1 hover:text-bordeaux cursor-pointer"
                        >
                          {subItem.name}
                        </button>
                      ) : (
                        <Link
                          key={subIdx}
                          to={subItem.href || "#"}
                          className="text-bordeaux/80 text-sm font-medium py-1 hover:text-bordeaux"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {subItem.name}
                        </Link>
                      )
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Button
              size="lg"
              variant="primary"
              className="mt-8 w-full flex justify-center text-lg shadow-md"
              onClick={() => {
                setIsMobileMenuOpen(false);
                window.location.href = "/contact";
              }}
            >
              Connect Agent
            </Button>
          </div>
        </div>
      </nav>
      {/* Backdrop overlay for outside clicks / losing focus */}
      {activeMenu && (
        <div
          className="fixed inset-0 z-40 bg-black/10 backdrop-blur-sm transition-opacity duration-300"
          onMouseEnter={() => setActiveMenu(null)}
        />
      )}
    </>
  );
};
