import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { DataList } from "../../../lib/turtle-ui/components/list/DataList";
import { Button } from "../../../lib/turtle-ui/components/button/Button";
import { navItems, megaMenuData } from "../../constants/navData";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef(null);

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
        className="sticky top-0 z-50 w-full backdrop-blur-md  bg-black border-b border-gray-200/50 transition-all duration-300"
        onMouseLeave={() => setActiveMenu(null)}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 text-xs md:text-sm font-medium tracking-tight relative">
            {/* Logo (Home Link) - Left Aligned */}
            <div className="flex-shrink-0 flex items-center nav-item-animate opacity-0">
              <Link
                to="/"
                className="text-white hover:opacity-80 transition-colors duration-300 opacity-80 hover:opacity-100 flex items-center"
                aria-label="Home"
              >
                <img
                  src="/public/images/LOGO_GBC.png"
                  alt="logo"
                  className=" w-24"
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
                    className="h-full flex items-center cursor-pointer nav-item-animate opacity-0"
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
                      className={`text-white transition-all duration-300 text-sm tracking-wide whitespace-nowrap ${
                        activeMenu === item
                          ? "opacity-100"
                          : "opacity-80 hover:opacity-100"
                      }`}
                    >
                      {item}
                    </Link>
                  </div>
                )}
              />
            </div>

            {/* Connect Agent Button - Right Aligned */}
            <div className="flex items-center space-x-4 flex-shrink-0 justify-end nav-item-animate opacity-0">
              <Button
                size="sm"
                variant="primary"
                className="hidden md:flex px-5"
                onClick={() => (window.location.href = "/contact")}
              >
                Connect Agent
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </Button>
              {/* Mobile Menu Toggle */}
              <Button
                className="!p-0 !bg-transparent md:hidden text-white hover:opacity-80 ml-2 transition-opacity"
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

        {/* Mega Menu Dropdown */}
        <div
          className={`absolute left-0 w-full overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] bg-[#0a0a0a] backdrop-blur-xl border-b border-gray-200/50 shadow-sm ${
            activeMenu
              ? "max-h-[500px] opacity-100 py-10"
              : "max-h-0 opacity-0 py-0 border-transparent"
          }`}
        >
          {activeMenu && megaMenuData[activeMenu] && (
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between gap-8 transform transition-transform duration-500 delay-75 translate-y-0">
              {/* Column 1 */}
              <div className="flex flex-col flex-1">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
                  {megaMenuData[activeMenu].col1.title}
                </h3>
                <ul className="space-y-3">
                  {megaMenuData[activeMenu].col1.items.map((link, idx) => (
                    <li key={idx} className={link.big ? "mb-1" : "mt-4"}>
                      <Link
                        to={link.href || "#"}
                        onClick={() => setActiveMenu(null)}
                        className={`text-white hover:text-gray-600 transition-colors ${
                          link.big
                            ? "text-xl font-semibold tracking-tight block"
                            : "text-xs font-medium"
                        }`}
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 2 */}
              <div className="flex flex-col flex-1">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
                  {megaMenuData[activeMenu].col2.title}
                </h3>
                <ul className="space-y-2">
                  {megaMenuData[activeMenu].col2.items.map((link, idx) => (
                    <li key={idx}>
                      <Link
                        to={link.href || "#"}
                        onClick={() => setActiveMenu(null)}
                        className="text-white hover:text-gray-600 text-xs font-medium transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 3 */}
              <div className="flex flex-col flex-1">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
                  {megaMenuData[activeMenu].col3.title}
                </h3>
                <ul className="space-y-2">
                  {megaMenuData[activeMenu].col3.items.map((link, idx) => (
                    <li key={idx}>
                      <Link
                        to={link.href || "#"}
                        onClick={() => setActiveMenu(null)}
                        className="text-white hover:text-gray-600 text-xs font-medium transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

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
                  className="text-white font-bold text-xl py-2 border-b border-bordeaux/10"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item}
                </Link>
                {megaMenuData[item] && (
                  <div className="pl-4 mt-3 flex flex-col space-y-3 border-l-2 border-bordeaux/20">
                    {megaMenuData[item].col1.items.map((subItem, subIdx) => (
                      <Link
                        key={subIdx}
                        to={subItem.href || "#"}
                        className="text-white/80 text-sm font-medium py-1 hover:text-gray-600"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {subItem.name}
                      </Link>
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
