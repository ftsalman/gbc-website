import React, { useState, useEffect } from "react";
import "./WhatsAppButton.css";

/* ── Icon Components ───────────────────────────────────────────────── */

const IconWhatsApp = () => (
  <svg
    viewBox="0 0 24 24"
    width="26"
    height="26"
    fill="white"
    aria-hidden="true"
  >
    <path
      d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94
      1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198
      0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077
      4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421
      7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0
      1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893
      6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157
      11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0
      11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"
    />
  </svg>
);

/* ── Config ─────────────────────────────────────────────────────────── */

const PHONE_NUMBER = "971501234567";
// NOTE: Update this to the exact WhatsApp number listed on your Instagram profile
const MESSAGE_TEXT =
  "Hello Global Business Connect team! I found your profile on Instagram " +
  "(https://www.instagram.com/globalbusinessconnect) and would like to inquire " +
  "about business setup in the UAE.";
const WHATSAPP_URL = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(MESSAGE_TEXT)}`;

const AUTO_OPEN_DELAY = 1000;

/* ── Component ───────────────────────────────────────────────────────── */

export const WhatsAppButton = () => {
  const [visible, setVisible] = useState(false);
  const [isLightBg, setIsLightBg] = useState(false);

  // ── Visible entrance after 1 s and dynamic color check ──────────────
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), AUTO_OPEN_DELAY);
    
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Point just roughly where the button is (bottom right)
          const elements = document.elementsFromPoint(window.innerWidth - 60, window.innerHeight - 60);
          let isDark = true; // Default to dark background
          
          for (let i = 0; i < elements.length; i++) {
            const el = elements[i];
            if (el.closest('.wab') || el.classList.contains('wab')) continue;
            
            const style = window.getComputedStyle(el);
            const bg = style.backgroundColor;
            
            if (bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') {
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
    handleScroll(); // Initial check

    return () => {
      clearTimeout(t);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className="wab"
      style={{ opacity: visible ? 1 : 0 }}
      aria-label="Contact options"
    >
      <div className="wab__main">
        {/*
          Circular text ring — SVG centered absolutely on the dark button.
          · A white filled circle creates the visible "halo" behind the text.
          · Text follows a circle path at a slightly smaller radius.
          · The dark button sits on top via z-index in CSS.
        */}
        <svg
          className="wab__ring"
          viewBox="0 0 160 160"
          width="160"
          height="160"
          aria-hidden="true"
          focusable="false"
        >
          <defs>
            {/* Clockwise circle path starting from the top → text reads clockwise */}
            <path
              id="wab-text-path"
              d="M 80,13 A 67,67 0 0,1 80,147 A 67,67 0 0,1 80,13"
            />
          </defs>

          {/* Transparent ring backdrop — no white disc */}
          <circle cx="80" cy="80" r="76" fill="none" />

          {/* Circular inscription text — dynamic color */}
          <text
            fill={isLightBg ? "#6C141E" : "#ffffff"}
            style={{ transition: "fill 0.3s ease" }}
            fontSize="8.5"
            fontFamily="'Inter','Helvetica Neue',Arial,sans-serif"
            fontWeight="700"
            letterSpacing="3"
          >
            <textPath href="#wab-text-path" startOffset="8%">
              TALK TO AN EXPERT · CHAT ON WHATSAPP ·
            </textPath>
          </text>
        </svg>

        {/* Dark navy button — sits on top of the SVG ring (z-index: 1) */}
        <a
          className="wab__btn"
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
        >
          <IconWhatsApp />
        </a>
      </div>
    </div>
  );
};
