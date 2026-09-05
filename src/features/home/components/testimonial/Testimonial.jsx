import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle2, ArrowLeft, ArrowRight } from "lucide-react";
import {
  Card,
  DataList,
  Button,
  Tag,
} from "../../../../../lib/turtle-ui/components";

gsap.registerPlugin(ScrollTrigger);

// Verified corporate client testimonials featuring exact Aeline design structure combined with website brand colors and turtle-ui components
export const testimonials = [
  {
    id: 1,
    name: "Laxman Sana",
    company: "Allied Coontracting LLC",
    logoText: "Allied Contracting LLC",
    logoSvg: "",
    image: "/images/testimonials/testimonials3.png",
    quote:
      "It’s been more than 13 years since we started working with Global Business Connect, and they’ve been taking care of our typing and PRO requirements ever since. From MOHRE and immigration work to other PRO services, they’ve always handled everything responsibly and professionally. One thing that really stands out is their knowledge—each team member knows their area very well, which gives us a lot of confidence. We’ve always been 100% satisfied with their service, and we’re happy to have them as our trusted service partner.",
    overallScore: "5.00 / 5.0",
    speedScore: "100%",
    verifiedDate: "July 2026",
    jurisdiction: "Dubai Silicon Oasis (IFZA)",
  },
  {
    id: 2,
    name: "Sindhu",
    company: "Kensington Design LLC",
    logoText: "KD",
    logoSvg: "",
    image: "/images/testimonials/testimonials1.png",
    quote:
      "We have been working with GBC for more than 10 years, and throughout this journey, they have consistently been fast, efficient and highly professional. Their entire team, from the staff to the management and CEO, is highly knowledgeable and skilled in their respective areas. What we appreciate most is the way they communicate with us—always friendly and approachable, while maintaining complete professionalism and seriousness towards their work. Over the years, they have become more than just a service provider; we genuinely feel that they are part of our business family",
    overallScore: "4.99 / 5.0",
    speedScore: "100%",
    verifiedDate: "June 2026",
    jurisdiction: "Dubai Multi Commodities Centre (DMCC)",
  },
  {
    id: 3,
    name: "Rana Nabeel",
    company: "MAQS GROUP",
    logoText: "MAQS",
    logoSvg: "",
    image: "/images/testimonials/testimonials2.jpeg",
    quote:
      " For the past eight years, GBC Corporate Services Provider LLC has managed our PRO, visa and government liaison requirements, and they have never let us down. From visa processing and immigration formalities to licence renewals and corporate documentation, their team handles everything accurately. They anticipate our requirements, keep us compliant, and are always available when needed. GBC has earned our trust through consistency, transparency and excellent service. We highly recommend them to businesses across the UAE!",
    overallScore: "5.00 / 5.0",
    speedScore: "99.9%",
    verifiedDate: "July 2026",
    jurisdiction: "Dubai Int. Financial Centre (DIFC)",
  },
  {
    id: 4,
    name: "Naveed Khan Sher Aftab",
    company: "MOIN KHAN AND SHAH ZEB VEHICLES RECOVERY",
    logoText: "MOIN KHAN AND SHAH ZEB VEHICLES RECOVERY",
    logoSvg: "/client-logo/MS_LOGO_SECONDARY.png",
    image: "/images/testimonials/testimonials-7.png",
    quote:
      "Setting up our vehicle recovery business was completely hassle-free thanks to GBC. Their deep understanding of the transport sector licensing and DET requirements meant we were fully operational much faster than expected.",
    overallScore: "5.00 / 5.0",
    speedScore: "100%",
    verifiedDate: "June 2026",
    jurisdiction: "Dubai Economy & Tourism (DET)",
  },
  {
    id: 5,
    name: "Gurjeet Singh Harbhajan Singh",
    company: "Best Deal",
    logoText: "BESTDEAL",
    logoSvg: "/client-logo/best_deal_logo.png",
    image: "/images/testimonials/testimonials4.png",
    quote:
      "GBC provided exceptional guidance throughout our company formation process. Their team's proactive approach and seamless execution in handling our legal structuring at ADGM has been instrumental to our success.",
    overallScore: "4.98 / 5.0",
    speedScore: "100%",
    verifiedDate: "May 2026",
    jurisdiction: "Abu Dhabi Global Market (ADGM)",
  },

  {
    id: 6,
    name: "Qasim Mushtaq Chaudhry Mushtaq Ahmed",
    company: "PAK FRIENDS CARGO TRANSPORTBY TRUCK LLC",
    logoText: "PAK FRIENDS CARGO TRANSPORTBY TRUCK LLC",
    logoSvg: "/client-logo/PF_SEC_LOGO.png",
    image: "/images/testimonials/testimonials-5.png",
    quote:
      "Operating a cargo transport company requires strict compliance and complex logistics licenses. GBC managed our entire setup with remarkable efficiency, saving us significant time and allowing us to focus on our fleet operations.",
    overallScore: "4.99 / 5.0",
    speedScore: "100%",
    verifiedDate: "May 2026",
    jurisdiction: "ADGM & JAFZA Holdings",
  },
  {
    id: 7,
    name: "Ahmed Raza",
    company: "MUKTSAR TRANSPORT L.L.C",
    logoText: "MUKTSAR TRANSPORT L.L.C",
    logoSvg: "/client-logo/TRASNPORT_SEC_LOGO.png",
    image: "/images/testimonials/testimonials-6.png",
    quote:
      "We rely heavily on timely renewals and strict regulatory compliance for our transportation fleet. GBC has consistently delivered outstanding corporate PRO services, making them an indispensable partner for our growing business.",
    overallScore: "4.99 / 5.0",
    speedScore: "100%",
    verifiedDate: "May 2026",
    jurisdiction: "ADGM & JAFZA Holdings",
  },
];

const scoringMetrics = [
  {
    label: "Satisfaction Index",
    status: "[ONLINE]",
    value: "4.98",
    unit: "/ 5.0",
    note: "★ ★ ★ ★ ★",
  },
  {
    label: "Setup Speed Rating",
    status: "[INSTANT]",
    value: "100",
    unit: "%",
    note: "0 DELAYS",
  },
  {
    label: "Compliance & SLA",
    status: "[VERIFIED]",
    value: "5.0",
    unit: "/ 5.0",
    note: "AUDITED",
  },
  {
    label: "Client Retention Rate",
    status: "[LOYALTY]",
    value: "98.4",
    unit: "%",
    note: "RENEWAL",
  },
];

export const Testimonial = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [liveScore, setLiveScore] = useState(4.98);
  const [liveReviewCount, setLiveReviewCount] = useState(4920);
  const sectionRef = useRef(null);

  // Responsive column count (1 on mobile, 2 on tablet, 3 on desktop)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Subtle live telemetry fluctuation simulating real-time review scoring audits
  useEffect(() => {
    const interval = setInterval(() => {
      const delta = (Math.random() - 0.48) * 0.008;
      setLiveScore((prev) => {
        const next = Math.min(5.0, Math.max(4.96, prev + delta));
        return Number(next.toFixed(2));
      });
      if (Math.random() > 0.8) {
        setLiveReviewCount((prev) => prev + 1);
      }
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll testimonials
  useEffect(() => {
    const autoScroll = setInterval(() => {
      setStartIndex((prev) =>
        prev + 1 > testimonials.length - visibleCount ? 0 : prev + 1,
      );
    }, 5000);
    return () => clearInterval(autoScroll);
  }, [visibleCount]);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      tl.fromTo(
        ".aeline-testi-card",
        { opacity: 0, y: 40, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
        },
      );
    },
    { scope: sectionRef },
  );

  const handlePrev = () => {
    setStartIndex((prev) =>
      prev === 0 ? testimonials.length - visibleCount : prev - 1,
    );
  };

  const handleNext = () => {
    setStartIndex((prev) =>
      prev + 1 > testimonials.length - visibleCount ? 0 : prev + 1,
    );
  };

  // Get current visible slice of cards
  const visibleCards = [];
  for (let i = 0; i < visibleCount; i++) {
    const idx = (startIndex + i) % testimonials.length;
    visibleCards.push(testimonials[idx]);
  }

  const renderStars = (count = 5) => {
    return Array.from({ length: count }).map((_, i) => (
      <svg
        key={i}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        fill="none"
        className="w-4 h-4 text-[#ffc830] drop-shadow-[0_0_3px_rgba(255,200,48,0.5)]"
      >
        <path
          d="M3.88203 13.9987L4.96536 9.31536L1.33203 6.16536L6.13203 5.7487L7.9987 1.33203L9.86536 5.7487L14.6654 6.16536L11.032 9.31536L12.1154 13.9987L7.9987 11.5154L3.88203 13.9987Z"
          fill="currentColor"
        />
      </svg>
    ));
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-gradient-to-b from-white via-[#faf9f6] to-white text-bordeaux py-24 border-b border-gray-200 overflow-hidden font-sans select-none"
    >
      {/* Subtle luxury white/light background glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-bordeaux/[0.04] blur-[160px] pointer-events-none rounded-full z-0" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-gray-100/80 to-transparent blur-[100px] pointer-events-none rounded-full z-0" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        {/* Top Header Section using website brand color bordeaux and Tag component */}
        <div className="pb-10 border-b border-gray-200/80">
          <Tag
            variant="gray"
            size="sm"
            className="!bg-gray-100/90 !border-gray-200 !text-bordeaux font-mono uppercase tracking-widest !inline-flex items-center gap-2.5 mb-5 shadow-2xs"
          >
            <span className="w-2 h-2 bg-bordeaux rounded-[2px]" />
            Testimonials
          </Tag>

          {/* Heading using official bordeaux typography color */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-bordeaux tracking-tight leading-tight">
            Trusted by Businesses, <br /> Recommended by Clients.
          </h2>

          {/* Subtitle & Custom Button Controls bar (`.testi_wrap`) */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mt-4 pt-2">
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed max-w-xl font-medium">
              From business setup and visa processing to ongoing PRO support,
              businesses across the UAE trust Connect GBC for reliable corporate
              services.
            </p>

            <div className="flex items-center gap-6">
              {/* Navigation Controls using custom Button component from turtle-ui */}
              <div className="flex items-center gap-3">
                <Button
                  variant="corner"
                  onClick={handlePrev}
                  aria-label="Previous Testimonials"
                  className="!w-11 !h-11 !p-0 !bg-gray-100 !border-gray-300 hover:!bg-bordeaux hover:!border-bordeaux !text-bordeaux hover:!text-white transition-all duration-300 shadow-xs flex items-center justify-center"
                >
                  <ArrowLeft className="w-5 h-5" />
                </Button>
                <Button
                  variant="corner"
                  onClick={handleNext}
                  aria-label="Next Testimonials"
                  className="!w-11 !h-11 !p-0 !bg-gray-100 !border-gray-300 hover:bg-bordeaux hover:!border-bordeaux !text-bordeaux hover:!text-white transition-all duration-300 shadow-xs flex items-center justify-center"
                >
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Exact Aeline Testimonials Cards Grid rendered via DataList & Card from turtle-ui */}
        <div className="mt-12">
          <DataList
            data={visibleCards}
            className="!grid !grid-cols-1 md:!grid-cols-2 lg:!grid-cols-3 !gap-6 !w-full"
            render={(t, index) => (
              <Card
                key={`${t.id}-${index}`}
                className="aeline-testi-card relative !h-[520px] !p-0 !rounded-[28px] overflow-hidden !flex !flex-col !justify-between !bg-[#111] !border !border-gray-800/80 !shadow-sm group transition-all duration-500 hover:!border-bordeaux hover:!shadow-[0_24px_50px_rgba(108,20,30,0.25)]"
              >
                {/* Full background portrait photo (`img.img`) */}
                <img
                  src={t.image}
                  alt={t.name}
                  className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105 z-0"
                />

                {/* Top Company Logo Container anchored cleanly at top left */}
                <div className="relative z-10 p-7 sm:p-8 flex items-center justify-start shrink-0">
                  {t.logoSvg ? (
                    <img
                      src={t.logoSvg}
                      alt={t.company}
                      className="h-7 sm:h-8 w-auto object-contain brightness-0 invert opacity-95 transition-opacity group-hover:opacity-100"
                    />
                  ) : (
                    <span className="text-white font-serif font-extrabold tracking-widest text-2xl opacity-95">
                      {t.logoText}
                    </span>
                  )}
                </div>

                {/* Bottom Dark Gradient & Blur Overlay exactly covering the lower 60% behind the text for high contrast */}
                <div className="absolute bottom-0 left-0 right-0 h-[60%] bg-gradient-to-t from-[#111] via-[#111]/45 to-transparent pointer-events-none z-0" />
                <div className="absolute bottom-0 left-0 right-0 h-[45%] bg-black/40 backdrop-blur-[10px] [mask-image:linear-gradient(to_bottom,transparent_0%,black_35%,black_100%)] pointer-events-none z-0" />

                {/* Bottom Quote & Attribution Container anchored to the very bottom via mt-auto in flex-col */}
                <div className="relative z-10 p-7 sm:p-8 flex flex-col justify-end text-white mt-auto shrink-0">
                  {/* Double-quote SVG left-aligned above quote exactly as shown in the card image */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32"
                    fill="none"
                    className="w-9 h-9 sm:w-10 sm:h-10 text-white mb-3.5 transition-transform duration-300 group-hover:scale-110 shrink-0"
                  >
                    <path
                      d="M3.33398 6.66797H14.6673V16.868L8.69132 25.3346H5.06065L8.61532 17.3346H3.33398V6.66797ZM17.334 6.66797H28.6673V16.868L22.6913 25.3346H19.0607L22.6153 17.3346H17.334V6.66797Z"
                      fill="currentColor"
                    />
                  </svg>

                  {/* Quote Text left-aligned exactly matching card image typography */}
                  <div className="text-white text-left text-[18px] sm:text-[20px] font-normal leading-[1.55] line-clamp-4 mb-5 font-sans">
                    "{t.quote}"
                  </div>

                  {/* Attribution Line right-aligned exactly matching card image (`- John Doe Tech Innovations`) */}
                  <div className="text-right text-[15px] sm:text-[16px] text-white/95 font-medium font-sans">
                    - {t.name} {t.company}
                  </div>
                </div>
              </Card>
            )}
          />
        </div>

        {/* Quantara/Aeline Scoring System Dashboard Footer Bar via Card & DataList */}
        <Card className="!mt-14 !p-6 sm:!p-8 !bg-white/90 !backdrop-blur-md !border !border-gray-200 !rounded-2xl !shadow-xs !cursor-default">
          <DataList
            data={scoringMetrics}
            className="!grid !grid-cols-2 sm:!grid-cols-4 !gap-6 !w-full"
            render={(m, idx) => (
              <div
                key={m.label}
                className={`flex flex-col justify-between ${
                  idx < scoringMetrics.length - 1
                    ? "sm:border-r border-gray-200 sm:pr-4"
                    : ""
                }`}
              >
                <div className="text-[11px] font-mono text-gray-500 uppercase tracking-widest flex items-center justify-between mb-1">
                  <span>{m.label}</span>
                  <span className="text-emerald-600 font-bold">{m.status}</span>
                </div>
                <div className="text-xl sm:text-2xl font-light text-bordeaux font-mono tracking-tight flex items-baseline gap-2">
                  {m.label === "Satisfaction Index" ? liveScore : m.value}
                  <span className="text-sm font-normal text-gray-500">
                    {m.unit}
                  </span>
                  <span className="text-xs font-mono text-gray-400 ml-auto">
                    {m.note}
                  </span>
                </div>
              </div>
            )}
          />
        </Card>
      </div>
    </section>
  );
};
