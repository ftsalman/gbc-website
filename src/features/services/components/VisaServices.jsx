import React, { useRef, useState, useEffect, useCallback } from "react";
import { VISA_TYPES } from "../constants/constants.js";
import { motion, AnimatePresence } from "framer-motion";

const ArrowIcon = ({ className, direction = "right" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={className}
    style={{ transform: direction === "left" ? "rotate(180deg)" : "none", transition: "transform 0.2s ease" }}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
  </svg>
);

const PlayIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M8 5v14l11-7z" />
  </svg>
);

const PauseIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
  </svg>
);

export const VisaServices = () => {
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const sliderContainerRef = useRef(null);
  const innerCarouselRef = useRef(null);
  const headerRef = useRef(null);
  
  const isDragging = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  
  const [maxScroll, setMaxScroll] = useState(0);
  const [maxIndex, setMaxIndex] = useState(VISA_TYPES.length - 1);
  const [carouselPaddingLeft, setCarouselPaddingLeft] = useState(24);

  // Custom cursor state
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [cursorDirection, setCursorDirection] = useState("right");
  const [isDesktop, setIsDesktop] = useState(true);

  // Measure card width for accurate sliding
  const [cardWidth, setCardWidth] = useState(0);

  useEffect(() => {
    setIsDesktop(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, []);

  const updateLayout = useCallback(() => {
    if (headerRef.current) {
      const rect = headerRef.current.getBoundingClientRect();
      setCarouselPaddingLeft(rect.left);
    }

    if (cardRef.current && sliderContainerRef.current && innerCarouselRef.current) {
      const style = window.getComputedStyle(cardRef.current);
      const margin = parseFloat(style.marginRight) || 0;
      const cWidth = cardRef.current.offsetWidth + margin;
      setCardWidth(cWidth);

      // Calculate max scroll to prevent empty space at the end
      const maxS = Math.max(0, innerCarouselRef.current.scrollWidth - margin - sliderContainerRef.current.clientWidth);
      setMaxScroll(maxS);
      
      const maxIdx = maxS > 0 ? Math.ceil(maxS / cWidth) : 0;
      setMaxIndex(maxIdx);
      
      setActiveIndex(prev => Math.min(prev, maxIdx));
    }
  }, []);

  useEffect(() => {
    updateLayout();
    // Wait for a tiny bit to let fonts/images affect layout before calculating again
    setTimeout(updateLayout, 100);
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, [updateLayout]);

  const scrollToNext = useCallback(() => {
    setActiveIndex((prev) => Math.min(prev + 1, maxIndex));
  }, [maxIndex]);

  const scrollToPrev = useCallback(() => {
    setActiveIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  // Auto-scroll
  useEffect(() => {
    let interval;
    if (isPlaying && !isHovering) {
      interval = setInterval(() => {
        setActiveIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, isHovering, maxIndex]);

  // Mouse move for custom cursor
  const handleMouseMove = (e) => {
    if (!isDesktop || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setMousePos({ x, y });
    setCursorDirection(x < rect.width / 2 ? "left" : "right");
  };

  const handleCarouselClick = (e) => {
    if (isDragging.current || !isDesktop || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    if (x < rect.width / 2) {
      scrollToPrev();
    } else {
      scrollToNext();
    }
  };

  // Drag handler
  const handleDragEnd = (e, { offset }) => {
    const swipeThreshold = 50;
    if (offset.x < -swipeThreshold) {
      scrollToNext();
    } else if (offset.x > swipeThreshold) {
      scrollToPrev();
    }
  };

  return (
    <section className="bg-black text-white py-24 md:py-32 font-sans border-t border-white/10 overflow-hidden">
      <div className="w-full">
        
        {/* Header Section */}
        <div className="max-w-[1500px] mx-auto px-6 lg:px-12 w-full">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mb-16 lg:mb-20">
            <h2 ref={headerRef} className="text-[40px] md:text-[56px] lg:text-[64px] font-medium tracking-tight leading-[1.1] max-w-2xl text-white">
              Designed for how you work
            </h2>
            <p className="text-white text-[15px] md:text-[17px] max-w-md leading-relaxed lg:mt-4">
              From golden visas to investor and family residencies, GBC supports
              every step of your journey to living and working in the UAE.
            </p>
          </div>
        </div>

        {/* Carousel Container */}
        <div 
          ref={containerRef}
          className={`relative group w-full ${isDesktop ? 'cursor-none' : ''}`}
          onMouseEnter={() => isDesktop && setIsHovering(true)}
          onMouseLeave={() => isDesktop && setIsHovering(false)}
          onMouseMove={handleMouseMove}
          onClick={handleCarouselClick}
        >
          {/* Custom Cursor Pill */}
          <AnimatePresence>
            {isHovering && isDesktop && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="pointer-events-none absolute z-50 flex items-center justify-center bg-white text-black text-[15px] font-medium tracking-tight px-6 py-[14px] rounded-[40px] shadow-xl transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: mousePos.x,
                  top: mousePos.y,
                }}
              >
                {cursorDirection === "left" ? "Previous" : "Next"}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Draggable Carousel */}
          <div ref={sliderContainerRef} className="overflow-hidden pb-8 w-full" style={{ paddingLeft: carouselPaddingLeft }}>
            <motion.div
              ref={innerCarouselRef}
              drag="x"
              dragConstraints={{ left: -maxScroll, right: 0 }}
              dragElastic={0.2}
              onDragStart={() => (isDragging.current = true)}
              onDragEnd={(e, info) => {
                setTimeout(() => { isDragging.current = false; }, 50);
                handleDragEnd(e, info);
              }}
              animate={{ x: -Math.min(activeIndex * cardWidth, maxScroll) }}
              transition={{ ease: [0.25, 1, 0.5, 1], duration: 0.8 }}
              className="flex flex-nowrap w-max"
            >
              {VISA_TYPES.map((visa, index) => (
                <div
                  key={visa.id || index}
                  ref={index === 0 ? cardRef : null}
                  className="visa-card relative shrink-0 w-[300px] sm:w-[380px] md:w-[480px] h-[340px] rounded-[16px] overflow-hidden bg-[#111] select-none mr-4 md:mr-6 group/card cursor-grab active:cursor-grabbing"
                >
                  {/* Background Image Container */}
                  <div className="absolute inset-0 overflow-hidden rounded-[16px]">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.5s] ease-out group-hover/card:scale-105 pointer-events-none"
                      style={{ backgroundImage: `url(${visa.img})` }}
                    />
                  </div>
                  
                  {/* Subtle Gradient Overlay at bottom */}
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent pointer-events-none rounded-b-[16px]" />

                  {/* Card Content */}
                  <div className="absolute bottom-0 left-0 w-full p-6 flex justify-between items-end pointer-events-none z-10">
                    <h3 className="text-xl md:text-[22px] font-medium text-white tracking-tight leading-tight max-w-[80%] drop-shadow-md">
                      {visa.title}
                    </h3>
                    <ArrowIcon className="w-[18px] h-[18px] text-white mb-[2px] drop-shadow-md" direction="right" />
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Pagination and Play/Pause Button */}
        <div className="max-w-[1500px] mx-auto px-6 lg:px-12 w-full mt-6">
          <div className="relative flex justify-center items-center h-12">
            {/* Dots */}
            <div className="flex items-center gap-[10px]">
              {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`transition-all duration-500 rounded-full ${
                    activeIndex === idx
                      ? "w-8 h-[2px] bg-white"
                      : "w-1.5 h-1.5 bg-white/40 hover:bg-white/80"
                  }`}
                />
              ))}
            </div>

            {/* Play/Pause Button */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="absolute right-0 w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 hover:border-white/40 transition-all duration-300 z-10 group"
              aria-label="Toggle Auto-Play"
            >
              {isPlaying ? (
                <PauseIcon className="w-2.5 h-2.5 text-white group-hover:text-white transition-colors" />
              ) : (
                <PlayIcon className="w-2.5 h-2.5 text-white group-hover:text-white transition-colors ml-[2px]" />
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};



