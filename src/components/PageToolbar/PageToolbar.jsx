import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../../../lib/turtle-ui/components.js';

export const PageToolbar = ({
  title = "About\nOur Studio",
  description = "We're a small team of designers and developers who build clean, functional websites for businesses of all sizes. No buzzwords, no fluff — just thoughtful design, solid code.",
  bgImage = "/images/TOOLSBAR_BG.png",
  imagePosition = "right",
  textAlign, // optional: "left", "right", "center"
  buttons, // Optional custom buttons node
  primaryButtonText,
  primaryButtonAction,
  secondaryButtonText,
  secondaryButtonAction,
  backUrl,
  backText,
}) => {
  const headerRef = useRef(null);

  const titleLines =
    typeof title === "string"
      ? title.split("\n")
      : Array.isArray(title)
        ? title
        : [title];

  useGSAP(() => {
    // Staggered title line reveal
    gsap.fromTo(
      ".toolbar-title-line",
      { y: 60, opacity: 0, skewY: 3 },
      {
        y: 0,
        opacity: 1,
        skewY: 0,
        duration: 1.0,
        stagger: 0.12,
        ease: "power3.out",
        delay: 0.1,
      }
    );
    // Description fade
    gsap.fromTo(
      ".toolbar-desc",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay: 0.55 }
    );
    // Buttons fade
    gsap.fromTo(
      ".toolbar-buttons",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay: 0.7 }
    );
    // Image slide in
    gsap.fromTo(
      ".toolbar-image",
      { x: imagePosition === "left" ? -80 : 80, opacity: 0 },
      { x: 0, opacity: 1, duration: 1.1, ease: "power3.out", delay: 0.0 }
    );
  }, { scope: headerRef, dependencies: [imagePosition] });

  // Determine text alignment and positioning classes
  let alignmentClasses = "";
  if (textAlign === "center") {
    alignmentClasses = "items-center text-center mx-auto max-w-3xl";
  } else if (textAlign === "left" || (!textAlign && imagePosition === "right")) {
    alignmentClasses = "items-start text-left max-w-[58%] sm:max-w-[55%]";
  } else if (textAlign === "right" || (!textAlign && imagePosition === "left")) {
    alignmentClasses = "items-end text-right ml-auto max-w-[58%] sm:max-w-[55%]";
  }

  return (
    <header
      ref={headerRef}
      className="page-toolbar relative min-h-[440px] md:min-h-[520px] lg:min-h-[560px] flex items-center bg-black overflow-hidden border-b border-white/10 font-sans"
    >
      {/* Subtle vertical grid lines */}
      <div className="absolute inset-0 grid grid-cols-6 md:grid-cols-12 pointer-events-none z-0">
        {Array.from({ length: 12 }).map((_, idx) => (
          <div
            key={idx}
            className={`border-r border-white/10 h-full ${idx >= 6 ? "hidden md:block" : ""}`}
          />
        ))}
      </div>

      {/* ── Decorative image — absolutely flush to the chosen edge ── */}
      {bgImage && (
        <div
          className={`toolbar-image absolute inset-y-0 ${
            imagePosition === "left" ? "left-0" : "right-0"
          } w-[52%] sm:w-[46%] md:w-[42%] lg:w-[46%] pointer-events-none z-0`}
        >
          <img
            src={bgImage}
            alt=""
            className={`w-full h-full object-cover ${
              imagePosition === "left" ? "object-left" : "object-right"
            }`}
          />
          {/* Left-side/Right-side gradient fade so image doesn't hard-cut into the text */}
          <div
            className={`absolute inset-0 ${
              imagePosition === "left"
                ? "bg-gradient-to-r from-transparent via-transparent to-black"
                : "bg-gradient-to-l from-transparent via-transparent to-black"
            }`}
          />
        </div>
      )}

      {/* ── Text content ── */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full relative z-10 pt-24 md:pt-32 pb-12">
        <div className={`flex flex-col justify-center ${alignmentClasses}`}>
          
          {/* Optional Back Button */}
          {backUrl && (
            <Link
              to={backUrl}
              className="inline-flex items-center gap-2 text-sm font-medium text-white/60 hover:text-white transition-colors group mb-6 toolbar-desc"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              {backText || "Back"}
            </Link>
          )}

          {/* Title — large Syncox-style, font-weight 400 */}
          <h1 className="text-[clamp(3rem,8vw,4rem)] font-normal text-white tracking-tight leading-[1.0] overflow-hidden">
            {titleLines.map((line, idx) => (
              <span key={idx} className="toolbar-title-line block overflow-hidden">
                {line}
              </span>
            ))}
          </h1>

          {/* Description — small, capped width */}
          {description && (
            <p className={`toolbar-desc mt-6 max-w-sm sm:max-w-md text-[13px] sm:text-sm text-gray-400 font-light leading-relaxed ${textAlign === "center" ? "mx-auto" : ""}`}>
              {description}
            </p>
          )}

          {/* Buttons */}
          {(buttons || primaryButtonText || secondaryButtonText) && (
            <div className="toolbar-buttons mt-8 flex flex-wrap gap-4">
              {buttons ? (
                buttons
              ) : (
                <>
                  {primaryButtonText && (
                    <Button variant="primary" onClick={primaryButtonAction}>
                      {primaryButtonText}
                    </Button>
                  )}
                  {secondaryButtonText && (
                    <Button variant="secondary" onClick={secondaryButtonAction}>
                      {secondaryButtonText}
                    </Button>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

PageToolbar.propTypes = {
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  description: PropTypes.string,
  bgImage: PropTypes.string,
  imagePosition: PropTypes.oneOf(["right", "left"]),
  textAlign: PropTypes.oneOf(["left", "right", "center"]),
  buttons: PropTypes.node,
  primaryButtonText: PropTypes.string,
  primaryButtonAction: PropTypes.func,
  secondaryButtonText: PropTypes.string,
  secondaryButtonAction: PropTypes.func,
};
