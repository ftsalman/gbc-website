import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";
import { SHOWCASE_DATA } from "../constants/constants.js";

gsap.registerPlugin(ScrollTrigger);

export const TemplateCarousel = () => {
   const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const lenisRef = useRef(null);
  const [activeTab, setActiveTab] = useState("Invoicing");
  const [activeCard, setActiveCard] = useState(16);
  const [isPlaying, setIsPlaying] = useState(true); // Auto-play enabled by default

  const extendedTabs = [
    ...SHOWCASE_DATA,
    ...SHOWCASE_DATA,
    ...SHOWCASE_DATA,
    ...SHOWCASE_DATA,
    ...SHOWCASE_DATA,
  ]; // 40 cards to simulate infinite scroll

  // Sync activeTab with activeCard
  useEffect(() => {
    setActiveTab(SHOWCASE_DATA[activeCard % 8].tab);
  }, [activeCard]);

  useEffect(() => {
    // Only initialize Lenis if it's not already running in the app.
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    lenisRef.current = lenis;

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let lastActiveIndex = -1;
    const cards = track.querySelectorAll(".showcase-card");

    const handleScroll = () => {
      let minDistance = Infinity;
      let activeIndex = 0;

      const trackCenter = track.scrollLeft + track.offsetWidth / 2;

      cards.forEach((card, index) => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const distance = Math.abs(trackCenter - cardCenter);
        if (distance < minDistance) {
          minDistance = distance;
          activeIndex = index;
        }
      });

      if (activeIndex !== lastActiveIndex) {
        lastActiveIndex = activeIndex;
        setActiveCard(activeIndex);
      }
    };

    track.addEventListener("scroll", handleScroll, { passive: true });
    setTimeout(handleScroll, 100);

    return () => track.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        const nextCard =
          activeCard < extendedTabs.length - 1 ? activeCard + 1 : 16;
        scrollToCard(nextCard);
      }, 4000); // Auto-scroll every 4 seconds
    }
    return () => clearInterval(interval);
  }, [isPlaying, activeCard, SHOWCASE_DATA.length]);

  useEffect(() => {
    // Jump to the middle block immediately on mount
    const timer = setTimeout(() => scrollToCard(16, "auto"), 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollToCard = (index, behavior = "smooth") => {
    const track = trackRef.current;
    if (!track) return;
    const cards = track.querySelectorAll(".showcase-card");
    if (cards[index]) {
      const card = cards[index];
      const scrollPos =
        card.offsetLeft - track.offsetWidth / 2 + card.offsetWidth / 2;
      track.scrollTo({ left: scrollPos, behavior });
    }
  };

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        // Fade reveal for header and tabs
        gsap.from(".reveal-text", {
          y: 60,
          opacity: 0,
          duration: 1.4,
          stagger: 0.1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        });

        // Parallax effect on main image bound to horizontal scroll
        gsap.utils.toArray(".card-parallax").forEach((image) => {
          gsap.to(image, {
            x: "5%", // Reduced from 10% for better performance
            ease: "none",
            force3D: true, // Forces GPU hardware acceleration to take load off CPU
            scrollTrigger: {
              scroller: trackRef.current,
              horizontal: true,
              trigger: image.parentElement,
              start: "left right",
              end: "right left",
              scrub: 0.5, // Added slight smoothing to scrub
            },
          });
        });
      }, sectionRef);

      return () => ctx.revert();
    },
    { scope: sectionRef },
  );

  return (
   <section
      ref={sectionRef}
      className="w-full min-h-screen bg-[#F5F5F2] text-[#000000] overflow-hidden relative flex flex-col pt-24 pb-12"
    >
      <style>{`
        @keyframes dot-progress {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        /* Hide scrollbar for Chrome, Safari and Opera */
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        /* Hide scrollbar for IE, Edge and Firefox */
        .hide-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}</style>
      {/* Header Area */}
      <div className="w-full max-w-6xl mx-auto px-6 text-center flex flex-col items-center z-20">
        <h2 className="reveal-text text-4xl md:text-5xl lg:text-[4rem] font-medium tracking-tight mb-6 mt-8 text-[#111111]">
          Grow your business
        </h2>
        <p className="reveal-text text-base md:text-lg text-[#333333] font-light max-w-2xl mb-10">
          You deserve a website that can do it all.
        </p>

        {/* Tabs */}
        <div className="reveal-text flex flex-wrap justify-center gap-1 md:gap-2 lg:gap-4 max-w-5xl">
          {SHOWCASE_DATA.map(({ tab }, index) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                scrollToCard(16 + index);
                setIsPlaying(false); // Pause auto-play on manual interaction
              }}
              className={`px-4 py-2 md:px-5 rounded-4xl cursor-pointer md:py-2.5 text-sm md:text-[15px] font-normal transition-all duration-300 ${
                activeTab === tab
                  ? "bg-[#E6E6E6] text-black"
                  : "bg-transparent text-[#444444] hover:text-black hover:bg-[#E6E6E6]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Horizontal Scroll Area */}
      <div className="w-full mt-8 md:mt-16 mb-6 h-[72vh] md:h-[82vh] z-20">
        <div
          ref={trackRef}
          className="w-full h-full flex items-center overflow-x-auto scroll-smooth snap-x snap-mandatory hide-scrollbar px-[7.5vw] md:px-[12.5vw] lg:px-[17.5vw] gap-6 md:gap-10 lg:gap-5 will-change-scroll overscroll-x-contain"
          style={{
            transform: "translateZ(0)",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {extendedTabs.map((item, index) => {
            const isInvoiceUI = item.uiType === "invoice";
            const isMembershipUI = item.uiType === "membership";
            const isBlogUI = item.uiType === "blog";

            return (
              <div
                key={index}
                className="showcase-card relative w-[82vw] md:w-[72vw] lg:w-[63vw] h-full shrink-0 snap-center group cursor-pointer"
                onClick={() => {
                  if (index !== activeCard) {
                    scrollToCard(index);
                    setIsPlaying(false);
                  }
                }}
              >
                <div className="relative w-full h-full rounded-[0.6rem] md:rounded-[0.5rem] lg:rounded-[0.5rem] overflow-hidden shadow-xl flex items-center justify-center transform-gpu will-change-transform">
                  <div className="absolute top-0 h-full w-[120%] -left-[10%] bg-[#0A0A0A] card-parallax">
                    <img
                      src={item.image}
                      alt={item.tab}
                      className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)]"
                    />
                  </div>

                  {/* <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/10 to-black/40"></div> */}

                  <div className="absolute top-8 left-8 md:top-12 md:left-12 text-white z-10">
                    <h3 className="text-3xl md:text-[2.5rem] font-serif tracking-tight mb-2 md:mb-4">
                      {item.title}
                    </h3>
                    <p className="text-[11px] md:text-base text-white/75 max-w-[16rem] md:max-w-sm font-light leading-relaxed">
                      {item.description ||
                        "Everything you need to grow your business online."}
                    </p>
                  </div>

                  <div className="absolute bottom-5 right-5 md:bottom-8 md:right-8 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>

                {/* Hover Navigation Pills */}
                {index < activeCard && (
                  <div className="absolute right-[8%] translate-x-1/2 top-1/2 -translate-y-1/2 z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none hidden md:block">
                    <div className="bg-white text-black px-6 py-3 rounded-full text-sm font-medium shadow-[0_10px_40px_rgba(0,0,0,0.3)]">
                      Previous
                    </div>
                  </div>
                )}

                {index > activeCard && (
                  <div className="absolute left-[8%] -translate-x-1/2 top-1/2 -translate-y-1/2 z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none hidden md:block">
                    <div className="bg-white text-black px-6 py-3 rounded-full text-sm font-medium shadow-[0_10px_40px_rgba(0,0,0,0.3)]">
                      Next
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="w-full px-[5vw] flex items-center relative pb-8 md:pb-12 z-20 mt-auto">
        {/* Centered Dots */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center gap-2 md:gap-3 w-32">
          {[-2, -1, 0, 1, 2].map((offset) => {
            const isCenter = offset === 0;
            const isMedium = Math.abs(offset) === 1;

            return (
              <button
                key={offset}
                onClick={() => {
                  scrollToCard(activeCard + offset);
                  setIsPlaying(false);
                }}
                className={`rounded-full transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] shrink-0 relative overflow-hidden ${
                  isCenter
                    ? "w-8 h-2 md:h-2 bg-[#CFCFCF]"
                    : isMedium
                      ? "w-2 h-2 md:w-2.5 md:h-2.5 bg-[#9E9E9E] hover:bg-[#737373]"
                      : "w-1.5 h-1.5 md:w-1.5 md:h-1.5 opacity-50 bg-[#9E9E9E] hover:bg-[#737373]"
                }`}
                aria-label={`Go to slide offset ${offset}`}
              >
                {isCenter && (
                  <span
                    key={`progress-${activeCard}`}
                    className="absolute inset-0 rounded-full origin-left"
                    style={{
                      background: "#222222",
                      animation: "dot-progress 4s linear forwards",
                      animationPlayState: isPlaying ? "running" : "paused",
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Mobile ← → nav arrows (always visible on mobile, hidden on md+) */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => {
              scrollToCard(activeCard - 1);
              setIsPlaying(false);
            }}
            className="w-9 h-9 rounded-full border border-black/12 bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm active:scale-95 transition-transform"
            aria-label="Previous slide"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => {
              scrollToCard(activeCard + 1);
              setIsPlaying(false);
            }}
            className="w-9 h-9 rounded-full border border-black/12 bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm active:scale-95 transition-transform"
            aria-label="Next slide"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Right Play/Pause button */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-9 h-9 md:w-12 md:h-12 rounded-full border cursor-pointer border-black/10 flex items-center justify-center hover:bg-black/5 transition-colors ml-auto flex-shrink-0"
          aria-label={isPlaying ? "Pause auto-play" : "Start auto-play"}
        >
          {isPlaying ? (
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-black"
            >
              <rect x="6" y="4" width="4" height="16" />
              <rect x="14" y="4" width="4" height="16" />
            </svg>
          ) : (
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-black ml-0.5"
            >
              <path d="M5 3l14 9-14 9V3z" />
            </svg>
          )}
        </button>
      </div>
    </section>
  );
};
