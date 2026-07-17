import React, { useState, useEffect } from 'react';
import './WhatsAppButton.css';

/* ── Icon Components ───────────────────────────────────────────────── */

const IconTelegram = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="white" aria-hidden="true">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562
      8.248-1.97 9.289c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053
      5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194
      1.006.131.833.932z" />
  </svg>
);

const IconWhatsApp = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="white" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94
      1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198
      0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077
      4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421
      7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0
      1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893
      6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157
      11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0
      11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
  </svg>
);

const IconCalendar = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="white" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2"  x2="16" y2="6"  />
    <line x1="8"  y1="2"  x2="8"  y2="6"  />
    <line x1="3"  y1="10" x2="21" y2="10" />
    <line x1="12" y1="14" x2="12" y2="18" />
    <line x1="10" y1="16" x2="14" y2="16" />
  </svg>
);

const IconChat = () => (
  <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" fill="white" />
    <circle cx="9"  cy="12" r="1.2" fill="#131929" />
    <circle cx="12" cy="12" r="1.2" fill="#131929" />
    <circle cx="15" cy="12" r="1.2" fill="#131929" />
  </svg>
);

const IconClose = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none"
    stroke="white" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
    <line x1="18" y1="6"  x2="6"  y2="18" />
    <line x1="6"  y1="6"  x2="18" y2="18" />
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

// Sub-button dimensions (px) — used to compute the collapse animation offset
const BTN_SIZE = 56;
const BTN_GAP  = 12;
const SOUND_DELAY = 4000;

// A short, self-contained chime, so no audio file is required.
const playNotificationSound = async () => {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;

  const context = new AudioContext();

  try {
    await context.resume();

    const gain = context.createGain();
    gain.gain.setValueAtTime(0.0001, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.12, context.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.45);
    gain.connect(context.destination);

    [660, 880].forEach((frequency, index) => {
      const oscillator = context.createOscillator();
      const start = context.currentTime + index * 0.12;
      oscillator.type = 'sine';
      oscillator.frequency.value = frequency;
      oscillator.connect(gain);
      oscillator.start(start);
      oscillator.stop(start + 0.3);
    });

    setTimeout(() => context.close(), 600);
  } catch {
    // Browsers may block sound until the visitor interacts with the page.
    context.close();
  }
};

// Actions listed top → bottom above the main button
const ACTIONS = [
  { Icon: IconTelegram, href: "https://t.me/globalbusinessconnect", label: "Message on Telegram"      }, // TODO: update handle
  { Icon: IconWhatsApp, href: WHATSAPP_URL,                          label: "Chat on WhatsApp"          },
  { Icon: IconCalendar, href: "#book-consultation",                   label: "Book a Free Consultation" }, // TODO: replace with Calendly link
];

/* ── Component ───────────────────────────────────────────────────────── */

export const WhatsAppButton = () => {
  const [visible, setVisible] = useState(false);
  const [open,    setOpen]    = useState(false);

  // Delayed entrance — prevents flash on first paint
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Play the notification chime four seconds after the component mounts.
  useEffect(() => {
    const timer = setTimeout(playNotificationSound, SOUND_DELAY);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="wab" style={{ opacity: visible ? 1 : 0 }} aria-label="Contact options">

      {/* ── Sub-action buttons ──────────────────────────────────────── */}
      <div className="wab__actions">
        {ACTIONS.map(({ Icon, href, label }, i) => (
          <a
            key={i}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="wab__action"
            tabIndex={open ? 0 : -1}
            style={{
              // Closed: each button is translated down to the main button position
              transform: open
                ? 'translateY(0) scale(1)'
                : `translateY(${(ACTIONS.length - i) * (BTN_SIZE + BTN_GAP)}px) scale(0.4)`,
              opacity:         open ? 1 : 0,
              // Open cascade: top → bottom | Close cascade: bottom → top
              transitionDelay: open
                ? `${i * 55}ms`
                : `${(ACTIONS.length - 1 - i) * 55}ms`,
              pointerEvents: open ? 'auto' : 'none',
            }}
          >
            <Icon />
          </a>
        ))}
      </div>

      {/* ── Main toggle button ──────────────────────────────────────── */}
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

          {/* Circular inscription text — bordeaux brand colour (#6C141E) */}
          <text
            fill="#6C141E"
            fontSize="8.5"
            fontFamily="'Inter','Helvetica Neue',Arial,sans-serif"
            fontWeight="700"
            letterSpacing="3"
          >
            <textPath href="#wab-text-path" startOffset="8%">
              TALK TO AN EXPERT  ·  FREE CONSULT  ·
            </textPath>
          </text>
        </svg>

        {/* Dark navy button — sits on top of the SVG ring (z-index: 1) */}
        <button
          className="wab__btn"
          onClick={() => setOpen(v => !v)}
          aria-label={open ? 'Close contact options' : 'Open contact options'}
          aria-expanded={open}
        >
          {/* Chat bubble icon — shown when closed */}
          <span className={`wab__icon ${!open ? 'wab__icon--visible' : ''}`}>
            <IconChat />
          </span>

          {/* × icon — shown when open */}
          <span className={`wab__icon ${open ? 'wab__icon--visible' : ''}`}>
            <IconClose />
          </span>
        </button>

      </div>
    </div>
  );
};
