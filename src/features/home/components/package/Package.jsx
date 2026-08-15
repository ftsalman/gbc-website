import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, ArrowUpRight, Sparkles } from "lucide-react";
import { Card } from "../../../../../lib/turtle-ui/components/card/Card";
import { DataList } from "../../../../../lib/turtle-ui/components/list/DataList";
import { Button } from "../../../../../lib/turtle-ui/components/button/Button";
import { Tag } from "../../../../../lib/turtle-ui/components/tag/Tag";

gsap.registerPlugin(ScrollTrigger);

const packagesData = [
  {
    id: "pkg-starter",
    title: "Starter Mainland Setup",
    badge: "Fast Track",
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
    price: "14,000",
    currency: "AED",
    period: "/ year",
    description: "Ideal for ambitious solo entrepreneurs and startups looking to establish an immediate presence in UAE mainland.",
    features: [
      "Instant 3-Day Trade License Issuance",
      "1 Investor / Partner Visa Eligibility",
      "Dedicated UAE Bank Account Assistance",
      "Standard Flexi-Desk & Co-Working Access",
      "100% Foreign Ownership & Zero Tax Setup",
      "Basic Corporate Compliance & Document Clearing"
    ],
    popular: false,
    ctaText: "Select Starter Package"
  },
  {
    id: "pkg-premium",
    title: "Premium Freezone VIP",
    badge: "Most Popular",
    badgeColor: "bg-bordeaux text-white border-bordeaux",
    price: "27,500",
    currency: "AED",
    period: "/ year",
    description: "Our comprehensive turnkey solution for scaling companies requiring multi-visa support and VIP bank onboarding.",
    features: [
      "Instant Freezone Registration & Golden Visa Support",
      "Up to 3 Executive Visas + Family Sponsorship",
      "VIP Multi-Currency Bank Priority Channel",
      "Dedicated PRO Services & Corporate Secretary (1 Yr)",
      "Custom Tax Optimization & Corporate Accounting",
      "Guaranteed 24/7 SLA Response Time"
    ],
    popular: true,
    ctaText: "Get Started VIP"
  },
  {
    id: "pkg-enterprise",
    title: "Enterprise Holding Structure",
    badge: "Bespoke VIP",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    price: "Custom",
    currency: "",
    period: "Enterprise SLA",
    description: "Tailored for multinational corporations, family offices, and complex multi-jurisdictional asset holding requirements.",
    features: [
      "Multi-Jurisdictional Offshore & Foundation Setup",
      "Unlimited Visa Allocations & Executive Suite Access",
      "Dedicated Legal Counsel & Audit Management",
      "Cross-Border M&A & Structuring Advisory",
      "Private Wealth & Escrow Consultation",
      "Dedicated Account Director On-Call"
    ],
    popular: false,
    ctaText: "Schedule Advisory Call"
  }
];

const scoringStatsData = [
  { id: "stat-01", label: "Trade Licenses Issued", score: "10,000+" },
  { id: "stat-02", label: "Client Satisfaction Rate", score: "99.8%" },
  { id: "stat-03", label: "Freezones & Mainland Jurisdictions", score: "19+" },
  { id: "stat-04", label: "Average Setup Turnaround", score: "3 Days" },
];

const setupProcessData = [
  {
    id: "proc-01",
    step: "01",
    title: "Strategic Advisory & Jurisdiction Selection",
    description: "We analyze your commercial goals, shareholder structure, and target markets to recommend the optimal UAE Freezone or Mainland jurisdiction with 100% ownership advantages.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "proc-02",
    step: "02",
    title: "Document Preparation & Security Approval",
    description: "Our dedicated PRO and legal specialists prepare all memorandum articles, passport clearance, and initial trade name approvals with priority government fast-tracking.",
    image: "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "proc-03",
    step: "03",
    title: "Instant License Issuance & Establishment Card",
    description: "Your official commercial trade license and corporate establishment card are issued immediately upon approval, allowing instant lease agreements and business operation.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "proc-04",
    step: "04",
    title: "Golden Visa & VIP Corporate Banking",
    description: "We facilitate expedited investor residency visas, Emirates ID biometric processing, and priority multi-currency corporate bank account opening with top UAE financial institutions.",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop"
  }
];

export const Package = () => {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      // Animate header elements
      gsap.fromTo(
        ".package-header-elem",
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
          },
        }
      );

      // Animate package cards
      gsap.fromTo(
        ".package-card-item",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );

      // Animate scoring stats section
      gsap.fromTo(
        ".scoring-stat-row",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".scoring-section-trigger",
            start: "top 85%",
          },
        }
      );

      // Animate process cards
      gsap.fromTo(
        ".process-step-card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".process-section-trigger",
            start: "top 80%",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative bg-gradient-to-b from-white via-[#faf9f6] to-white py-24 sm:py-32 overflow-hidden font-sans border-t border-gray-100"
    >
      {/* Background Decorative Blobs */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-bordeaux/5 rounded-full blur-[140px] pointer-events-none -z-0" />
      <div className="absolute bottom-1/3 left-10 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        {/* 2-Column Exact UI Setting from Reference Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column (Fixed/Sticky Info & Client Rating Block) */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 package-header-elem">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight leading-[1.1] mb-6">
              Pricing Plan
            </h2>
            <p className="text-gray-700 text-lg sm:text-xl font-normal leading-relaxed">
              Transparent pricing for any stage of your business. No hidden fees. No long-term contracts.
            </p>

            {/* Divider Line exactly like the image */}
            <div className="border-b border-gray-200 my-8 sm:my-10" />

            {/* Client Avatars & Rating exactly like the image */}
            <div className="flex flex-col items-start">
              <div className="flex items-center">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
                  alt="Client 1"
                  className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-sm"
                />
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
                  alt="Client 2"
                  className="w-10 h-10 rounded-full border-2 border-white object-cover -ml-3 shadow-sm"
                />
                <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop"
                  alt="Client 3"
                  className="w-10 h-10 rounded-full border-2 border-white object-cover -ml-3 shadow-sm"
                />
                <img
                  src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=200&auto=format&fit=crop"
                  alt="Client 4"
                  className="w-10 h-10 rounded-full border-2 border-white object-cover -ml-3 shadow-sm"
                />
                <div className="bg-blue-600 text-white text-xs font-bold w-10 h-10 rounded-full flex items-center justify-center -ml-3 border-2 border-white shadow-sm z-10">
                  You?
                </div>
              </div>

              <div className="mt-4">
                <div className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
                  4.9/5
                </div>
                <div className="text-gray-600 text-sm sm:text-base font-normal mt-1">
                  Average rating from our clients
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (Plan Cards in exact UI setting) */}
          <div className="lg:col-span-7 flex flex-col gap-8 package-grid-trigger">
            <DataList
              data={packagesData}
              className="!flex !flex-col !gap-8 !w-full"
              render={(pkg) => (
                <Card
                  key={pkg.id}
                  className={`package-card-item relative !p-8 sm:!p-10 lg:!p-12 !rounded-[28px] !flex !flex-col !justify-between transition-all duration-500 hover:-translate-y-1 ${
                    pkg.popular
                      ? "!bg-gray-950 !text-white !border-2 !border-bordeaux !shadow-[0_25px_60px_rgba(108,20,30,0.22)]"
                      : "!bg-white !text-gray-900 !border !border-gray-200/80 !shadow-sm hover:!border-gray-300 hover:!shadow-lg"
                  }`}
                >
                  {/* Top Title & Description Header */}
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
                        {pkg.title}
                      </h3>
                      {pkg.popular && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono tracking-wider font-semibold uppercase bg-bordeaux text-white">
                          <Sparkles className="w-3.5 h-3.5" /> Most Popular
                        </span>
                      )}
                    </div>

                    <p
                      className={`text-sm sm:text-base font-normal leading-relaxed mb-6 sm:mb-8 ${
                        pkg.popular ? "text-gray-300" : "text-gray-500"
                      }`}
                    >
                      {pkg.description}
                    </p>

                    {/* Price Banner exactly like $ 5.000 /month layout */}
                    <div
                      className={`flex items-baseline gap-2 mb-8 pb-8 border-b ${
                        pkg.popular ? "border-gray-800" : "border-gray-100"
                      }`}
                    >
                      <span className="text-5xl sm:text-6xl font-normal tracking-tight font-sans">
                        {pkg.currency ? `${pkg.currency} ` : ""}{pkg.price}
                      </span>
                      <span
                        className={`text-base sm:text-lg font-normal ${
                          pkg.popular ? "text-gray-400" : "text-gray-400"
                        }`}
                      >
                        {pkg.period}
                      </span>
                    </div>

                    {/* What's included Section heading */}
                    <div
                      className={`text-sm sm:text-base font-bold mb-6 ${
                        pkg.popular ? "text-white" : "text-gray-900"
                      }`}
                    >
                      What&apos;s included
                    </div>

                    {/* Features List with exact outline circle check icon */}
                    <ul className="space-y-4 mb-10">
                      {pkg.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3.5">
                          <div
                            className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                              pkg.popular
                                ? "border-bordeaux bg-bordeaux/20 text-[#ffc830]"
                                : "border-gray-300 bg-white text-gray-500"
                            }`}
                          >
                            <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                          </div>
                          <span
                            className={`text-sm sm:text-base font-normal leading-relaxed ${
                              pkg.popular ? "text-gray-200" : "text-gray-600"
                            }`}
                          >
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Bottom CTA Button */}
                  <div className="pt-4 mt-auto">
                    <Button
                      variant="corner"
                      onClick={() => (window.location.href = '/contact')}
                      className={`!w-full !py-4 sm:!py-5 !rounded-2xl font-bold text-base tracking-wide transition-all duration-300 shadow-sm ${
                        pkg.popular
                          ? "!bg-bordeaux !text-white !border-bordeaux hover:!bg-bordeaux/90"
                          : "!bg-white !text-gray-900 !border !border-gray-300 sm:!border-2 hover:!bg-gray-900 hover:!text-white hover:!border-gray-900"
                      }`}
                    >
                      <span>{pkg.ctaText}</span>
                      <ArrowUpRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </Card>
              )}
            />
          </div>
        </div>

        {/* Syncox-Style Scoring & Stats Section */}
        <div className="scoring-section-trigger mt-24">
          <div className="bg-gray-950 text-white rounded-[32px] p-8 sm:p-12 md:p-16 border border-gray-800 shadow-[0_30px_70px_rgba(0,0,0,0.3)] relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-bordeaux/20 rounded-full blur-[100px] pointer-events-none" />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
              <div className="lg:col-span-5">
                <Tag variant="gray" size="sm" className="!bg-gray-900 !text-gray-300 !border-gray-800 mb-6">
                  <span className="text-[#ffc830] font-mono mr-2">//</span> Scoring Metrics
                </Tag>
                <h3 className="text-3xl sm:text-4xl font-semibold tracking-tight leading-snug mb-6">
                  Guaranteed compliance &amp; measurable advantage across the UAE.
                </h3>
                <p className="text-gray-400 text-base sm:text-lg font-light leading-relaxed">
                  We create setup frameworks that not only ensure 100% legal alignment but also generate lasting operational transparency and rapid business expansion.
                </p>
              </div>

              <div className="lg:col-span-7">
                <DataList
                  data={scoringStatsData}
                  className="!flex !flex-col !gap-0"
                  render={(stat) => (
                    <div
                      key={stat.id}
                      className="scoring-stat-row flex items-end justify-between py-6 sm:py-8 border-b border-gray-800/80 last:border-b-0 gap-4"
                    >
                      <span className="text-gray-400 text-base sm:text-xl font-light">
                        {stat.label}
                      </span>
                      <span className="text-4xl sm:text-5xl md:text-6xl font-bold font-mono text-[#ffc830] tracking-tight shrink-0">
                        {stat.score}
                      </span>
                    </div>
                  )}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Syncox-Style Process Section */}
        <div className="process-section-trigger mt-28 pt-20 border-t border-gray-200/80">
          <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-16 items-start">
            {/* Left Column (Sticky Header) */}
            <div className="lg:w-5/12 lg:sticky lg:top-32 max-w-md">
              <div className="mb-4">
                <span className="text-sm font-mono tracking-wider font-semibold uppercase text-bordeaux">
                  // Setup Process
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-gray-900 tracking-tight leading-tight mb-6">
                Our Setup Process
              </h2>
              <p className="text-gray-600 text-lg font-light leading-relaxed">
                From initial strategic consultation to instant trade license issuance and VIP corporate banking, our transparent 4-step framework eliminates delays and ensures total compliance.
              </p>
            </div>

            {/* Right Column (Numbered Process Cards) */}
            <div className="lg:w-7/12 w-full flex flex-col gap-6">
              <DataList
                data={setupProcessData}
                className="!flex !flex-col !gap-6 !w-full"
                render={(item) => (
                  <Card
                    key={item.id}
                    className="process-step-card group relative !bg-white !border !border-gray-200/80 !rounded-[28px] !p-6 sm:!p-8 sm:!pb-10 hover:!border-bordeaux/60 hover:!shadow-2xl transition-all duration-500"
                  >
                    {/* Step Number Badge */}
                    <div className="text-sm font-mono font-bold tracking-wider text-bordeaux/80 mb-4">
                      {item.step}
                    </div>

                    {/* Step Image */}
                    <div className="rounded-2xl overflow-hidden h-48 sm:h-64 mb-6 bg-gray-100">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>

                    {/* Step Bottom Info */}
                    <div className="flex flex-col sm:flex-row justify-between sm:items-baseline gap-4 pt-4 border-t border-gray-100">
                      <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 max-w-sm">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 text-sm sm:text-base font-light leading-relaxed sm:max-w-md">
                        {item.description}
                      </p>
                    </div>
                  </Card>
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
