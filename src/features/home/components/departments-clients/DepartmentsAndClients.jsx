import React, { useState, useEffect } from "react";
import { ShieldCheck, Award, Building2, Globe, CheckCircle2, ArrowUpRight, Cpu, Activity, Zap, BarChart3, RefreshCw, Layers } from "lucide-react";
import { Button } from "../../../../../lib/turtle-ui/components";

// Official Government Departments & Licensing Authorities in UAE with exact Module Scoring Data
const departments = [
  {
    code: "DET / DED",
    name: "Dubai Economy & Tourism",
    type: "Mainland Authority",
    badge: "Direct Channel Partner",
    moduleIndex: "MOD-01",
    clearanceScore: 100,
    slaScore: "99.98%",
    latency: "0.14s",
    status: "ACTIVE GATEWAY",
    icon: (
      <svg className="w-8 h-8 text-bordeaux group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z" />
        <path d="M12 8v8m-4-4h8" />
      </svg>
    ),
  },
  {
    code: "DMCC",
    name: "Dubai Multi Commodities Centre",
    type: "No. 1 Global Free Zone",
    badge: "Tier-1 Agent",
    moduleIndex: "MOD-02",
    clearanceScore: 100,
    slaScore: "100%",
    latency: "0.09s",
    status: "ACTIVE GATEWAY",
    icon: (
      <svg className="w-8 h-8 text-bordeaux group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    code: "DIFC",
    name: "Dubai Int. Financial Centre",
    type: "Financial Jurisdiction",
    badge: "Accredited Advisor",
    moduleIndex: "MOD-03",
    clearanceScore: 99.8,
    slaScore: "99.95%",
    latency: "0.18s",
    status: "ACTIVE GATEWAY",
    icon: (
      <svg className="w-8 h-8 text-bordeaux group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-8h6v8" />
      </svg>
    ),
  },
  {
    code: "ADGM",
    name: "Abu Dhabi Global Market",
    type: "English Common Law Zone",
    badge: "Registered Corporate Service",
    moduleIndex: "MOD-04",
    clearanceScore: 100,
    slaScore: "100%",
    latency: "0.11s",
    status: "ACTIVE GATEWAY",
    icon: (
      <svg className="w-8 h-8 text-bordeaux group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v12M8 10h8M8 14h8" />
      </svg>
    ),
  },
  {
    code: "IFZA",
    name: "Int. Free Zone Authority",
    type: "Dubai Silicon Oasis",
    badge: "VIP Platinum Partner",
    moduleIndex: "MOD-05",
    clearanceScore: 100,
    slaScore: "99.99%",
    latency: "0.08s",
    status: "ACTIVE GATEWAY",
    icon: (
      <svg className="w-8 h-8 text-bordeaux group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M7 7h10M7 12h10M7 17h6" />
      </svg>
    ),
  },
  {
    code: "RAKEZ",
    name: "Ras Al Khaimah Econ. Zone",
    type: "Industrial & Commercial",
    badge: "Authorized Gateway",
    moduleIndex: "MOD-06",
    clearanceScore: 99.7,
    slaScore: "99.92%",
    latency: "0.16s",
    status: "ACTIVE GATEWAY",
    icon: (
      <svg className="w-8 h-8 text-bordeaux group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M2 20h20M4 20V10l8-6 8 6v10M12 4v16" />
      </svg>
    ),
  },
  {
    code: "MOHRE",
    name: "Ministry of Human Resources",
    type: "Federal Labor & Emiratisation",
    badge: "Tasheel Direct Link",
    moduleIndex: "MOD-07",
    clearanceScore: 100,
    slaScore: "99.97%",
    latency: "0.12s",
    status: "ACTIVE GATEWAY",
    icon: (
      <svg className="w-8 h-8 text-bordeaux group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    code: "FTA / ICP",
    name: "Federal Tax & Federal Customs",
    type: "Tax & Identity Authority",
    badge: "Certified Tax Agent Network",
    moduleIndex: "MOD-08",
    clearanceScore: 100,
    slaScore: "100%",
    latency: "0.07s",
    status: "ACTIVE GATEWAY",
    icon: (
      <svg className="w-8 h-8 text-bordeaux group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <path d="M16 13H8M16 17H8M10 9H8" />
      </svg>
    ),
  },
];

// Global Enterprise & Family Office Client Logos
const clients = [
  {
    name: "PALM CAPITAL",
    sector: "Private Equity",
    location: "London & Dubai",
    logoText: "PALM CAPITAL",
    symbol: "▲",
  },
  {
    name: "EMIRATES VENTURES",
    sector: "Venture Fund",
    location: "Abu Dhabi",
    logoText: "EMIRATES VENTURES",
    symbol: "❖",
  },
  {
    name: "GULF HOLDINGS",
    sector: "Conglomerate",
    location: "Riyadh & Dubai",
    logoText: "GULF HOLDINGS",
    symbol: "■",
  },
  {
    name: "ALTUS GLOBAL",
    sector: "Fintech & AI",
    location: "Singapore & DIFC",
    logoText: "ALTUS GLOBAL",
    symbol: "◆",
  },
  {
    name: "ZENITH ENERGY",
    sector: "Renewable Infrastructure",
    location: "Geneva & DMCC",
    logoText: "ZENITH ENERGY",
    symbol: "✦",
  },
  {
    name: "ORION LOGISTICS",
    sector: "Supply Chain",
    location: "Rotterdam & JAFZA",
    logoText: "ORION LOGISTICS",
    symbol: "●",
  },
  {
    name: "MENA TECH",
    sector: "SaaS & E-Commerce",
    location: "Cairo & Dubai Silicon",
    logoText: "MENA TECH",
    symbol: "★",
  },
  {
    name: "SOVEREIGN ASSETS",
    sector: "Family Office",
    location: "Zurich & ADGM",
    logoText: "SOVEREIGN ASSETS",
    symbol: "▼",
  },
];

export const DepartmentsAndClients = () => {
  const [activeTab, setActiveTab] = useState("all"); // 'all' | 'departments' | 'clients'
  const [simulatingModule, setSimulatingModule] = useState(null);
  const [liveScoringCounter, setLiveScoringCounter] = useState(99.98);

  // Subtle real-time score micro-fluctuation simulating active telemetry
  useEffect(() => {
    const interval = setInterval(() => {
      const delta = (Math.random() - 0.48) * 0.02;
      setLiveScoringCounter((prev) => {
        const next = Math.min(100, Math.max(99.92, prev + delta));
        return Number(next.toFixed(2));
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSimulateClearance = (index) => {
    setSimulatingModule(index);
    setTimeout(() => {
      setSimulatingModule(null);
    }, 1200);
  };

  // Duplicate arrays for smooth infinite marquee animation
  const duplicatedDepartments = [...departments, ...departments];
  const duplicatedClients = [...clients, ...clients];

  return (
    <section className="relative bg-black text-white py-24 border-b border-white/15 overflow-hidden font-sans">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-bordeaux/15 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        {/* Section Header matching exact Syncox & Quantara horizontal layout */}
        <div className="section-heading-horizontal-block flex flex-col lg:flex-row justify-between items-start gap-8 pb-16 border-b border-white/15">
          <div className="section-preheading-wrap">
            <p className="text-xs sm:text-sm font-mono uppercase tracking-widest text-bordeaux font-semibold flex items-center gap-2">
              <span>//</span> Accreditation & Clients
            </p>
          </div>
          <div className="section-title-wrap max-w-2xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-white tracking-tight leading-tight">
              Accredited by government departments. Trusted by global enterprise leaders.
            </h2>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed mt-4">
              We operate with direct VIP gateway status across major UAE mainland ministries and free zones, providing rapid clearances for our international corporate portfolio.
            </p>
          </div>
        </div>

        {/* Quantara Exact Badge & Scoring System Dashboard: INTEGRATION - - - ACTIVE MODULES */}
        <div className="mt-12 mb-10 border border-white/15 bg-white/[0.02] p-6 sm:p-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-bordeaux/10 to-transparent pointer-events-none" />
          <div className="absolute -top-[1px] -left-[1px] w-2 h-2 border-t border-l border-bordeaux" />
          <div className="absolute -top-[1px] -right-[1px] w-2 h-2 border-t border-r border-bordeaux" />
          <div className="absolute -bottom-[1px] -left-[1px] w-2 h-2 border-b border-l border-bordeaux" />
          <div className="absolute -bottom-[1px] -right-[1px] w-2 h-2 border-b border-r border-bordeaux" />

          {/* Top Badge Banner: [ INTEGRATION ] - - - [ ACTIVE MODULES ] */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div className="inline-flex items-center gap-3 px-3.5 py-1.5 bg-white/[0.05] border border-white/15 font-mono text-xs uppercase tracking-widest">
              <span className="text-gray-300 font-bold">INTEGRATION</span>
              <div className="flex items-center gap-1.5 text-bordeaux font-black tracking-tighter">
                <span className="animate-pulse">-</span>
                <span className="animate-pulse delay-150">-</span>
                <span className="animate-pulse delay-300">-</span>
              </div>
              <span className="text-white font-bold flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-ping" />
                ACTIVE MODULES
              </span>
            </div>

            <div className="flex items-center gap-6 font-mono text-xs text-gray-400 uppercase tracking-wider">
              <div className="flex items-center gap-2">
                <span className="text-gray-500">SYSTEM INDEX:</span>
                <span className="text-green-400 font-bold tracking-normal">{liveScoringCounter}% SCORE</span>
              </div>
              <div className="hidden md:flex items-center gap-2 border-l border-white/10 pl-6">
                <span className="text-gray-500">MODULES ONLINE:</span>
                <span className="text-white font-bold">08 / 08 [100%]</span>
              </div>
            </div>
          </div>

          {/* Live System Scoring Metrics Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
            <div className="border-r border-white/10 pr-4 last:border-r-0">
              <div className="text-[11px] font-mono text-gray-400 uppercase tracking-widest flex items-center justify-between mb-1">
                <span>Direct Gateway Links</span>
                <span className="text-green-400 font-bold">[SUCCESS]</span>
              </div>
              <div className="text-2xl sm:text-3xl font-light text-white font-mono tracking-tight flex items-baseline gap-2">
                100<span className="text-sm font-normal text-gray-400">%</span>
                <span className="text-xs font-mono text-gray-500 ml-auto">08 AUTHORITIES</span>
              </div>
            </div>

            <div className="border-r border-white/10 pr-4 last:border-r-0">
              <div className="text-[11px] font-mono text-gray-400 uppercase tracking-widest flex items-center justify-between mb-1">
                <span>Avg Clearance Latency</span>
                <span className="text-green-400 font-bold">[INSTANT]</span>
              </div>
              <div className="text-2xl sm:text-3xl font-light text-white font-mono tracking-tight flex items-baseline gap-2">
                0.11<span className="text-sm font-normal text-gray-400">s</span>
                <span className="text-xs font-mono text-gray-500 ml-auto">REAL-TIME API</span>
              </div>
            </div>

            <div className="border-r border-white/10 pr-4 last:border-r-0">
              <div className="text-[11px] font-mono text-gray-400 uppercase tracking-widest flex items-center justify-between mb-1">
                <span>SLA Accreditation Score</span>
                <span className="text-green-400 font-bold">[TIER-1]</span>
              </div>
              <div className="text-2xl sm:text-3xl font-light text-white font-mono tracking-tight flex items-baseline gap-2">
                99.98<span className="text-sm font-normal text-gray-400">%</span>
                <span className="text-xs font-mono text-gray-500 ml-auto">VERIFIED</span>
              </div>
            </div>

            <div>
              <div className="text-[11px] font-mono text-gray-400 uppercase tracking-widest flex items-center justify-between mb-1">
                <span>Active Client Protocols</span>
                <span className="text-green-400 font-bold">[ONLINE]</span>
              </div>
              <div className="text-2xl sm:text-3xl font-light text-white font-mono tracking-tight flex items-baseline gap-2">
                100<span className="text-sm font-normal text-gray-400">%</span>
                <span className="text-xs font-mono text-gray-500 ml-auto">GLOBAL PORTFOLIO</span>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Filter / Tabs Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 pb-10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-5 py-2.5 text-xs sm:text-sm font-mono uppercase tracking-wider transition-all duration-300 border ${
                activeTab === "all"
                  ? "bg-bordeaux border-bordeaux text-white shadow-lg"
                  : "bg-white/[0.04] border-white/15 text-gray-400 hover:text-white hover:border-white/30"
              }`}
            >
              All Partners ([02])
            </button>
            <button
              onClick={() => setActiveTab("departments")}
              className={`px-5 py-2.5 text-xs sm:text-sm font-mono uppercase tracking-wider transition-all duration-300 border flex items-center gap-2 ${
                activeTab === "departments"
                  ? "bg-bordeaux border-bordeaux text-white shadow-lg"
                  : "bg-white/[0.04] border-white/15 text-gray-400 hover:text-white hover:border-white/30"
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-bordeaux group-hover:text-white" />
              Government Departments ([08])
            </button>
            <button
              onClick={() => setActiveTab("clients")}
              className={`px-5 py-2.5 text-xs sm:text-sm font-mono uppercase tracking-wider transition-all duration-300 border flex items-center gap-2 ${
                activeTab === "clients"
                  ? "bg-bordeaux border-bordeaux text-white shadow-lg"
                  : "bg-white/[0.04] border-white/15 text-gray-400 hover:text-white hover:border-white/30"
              }`}
            >
              <Globe className="w-4 h-4 text-bordeaux group-hover:text-white" />
              Client Logos ([08])
            </button>
          </div>

          <div className="text-xs font-mono text-gray-500 uppercase tracking-widest hidden sm:block">
            // Direct Gateway Channels
          </div>
        </div>

        {/* TRACK 1: Government Departments & Licensing Authorities with Active Module Scoring */}
        {(activeTab === "all" || activeTab === "departments") && (
          <div className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3 text-sm font-mono uppercase text-white tracking-widest">
                <span className="w-2 h-2 bg-bordeaux inline-block" />
                <span>Government Departments & Economic Zones</span>
              </div>
              <span className="text-xs font-mono text-gray-500 uppercase">
                [01] Accredited Authorities • Scoring System Online
              </span>
            </div>

            {/* Departments Grid/Cards with Active Scoring System */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {departments.map((dept, idx) => (
                <div
                  key={idx}
                  onClick={() => handleSimulateClearance(idx)}
                  className="group relative bg-white/[0.03] border border-white/15 hover:border-bordeaux/80 p-6 flex flex-col justify-between transition-all duration-500 hover:bg-white/[0.06] hover:-translate-y-1 cursor-pointer"
                >
                  {/* Decorative corner indicators */}
                  <span className="absolute -top-[1px] -left-[1px] w-2 h-2 border-t border-l border-white/40 group-hover:border-bordeaux transition-colors" />
                  <span className="absolute -top-[1px] -right-[1px] w-2 h-2 border-t border-r border-white/40 group-hover:border-bordeaux transition-colors" />
                  <span className="absolute -bottom-[1px] -left-[1px] w-2 h-2 border-b border-l border-white/40 group-hover:border-bordeaux transition-colors" />
                  <span className="absolute -bottom-[1px] -right-[1px] w-2 h-2 border-b border-r border-white/40 group-hover:border-bordeaux transition-colors" />

                  <div className="flex items-start justify-between mb-6">
                    <div className="p-3 bg-white/[0.05] border border-white/10 group-hover:bg-bordeaux group-hover:border-bordeaux transition-colors">
                      {dept.icon}
                    </div>
                    <div className="flex flex-col items-end gap-1.5">
                      <span className="text-xs font-mono px-2.5 py-1 bg-white/[0.06] border border-white/10 text-gray-300 group-hover:text-white group-hover:border-bordeaux/40 transition-colors">
                        {dept.code}
                      </span>
                      <span className="text-[10px] font-mono text-bordeaux tracking-wider uppercase">
                        {dept.moduleIndex}
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className="text-xs font-mono text-bordeaux uppercase tracking-wider mb-1">
                      {dept.type}
                    </div>
                    <h4 className="text-lg font-semibold text-white tracking-tight leading-snug group-hover:text-bordeaux transition-colors">
                      {dept.name}
                    </h4>

                    {/* Module Scoring Bar inside each card */}
                    <div className="mt-5 pt-4 border-t border-white/10 bg-black/40 -mx-6 -mb-6 p-6">
                      <div className="flex items-center justify-between text-xs font-mono mb-2">
                        <span className="text-gray-400 flex items-center gap-1.5">
                          <Activity className="w-3.5 h-3.5 text-green-400" />
                          {simulatingModule === idx ? "INTEGRATING..." : dept.status}
                        </span>
                        <span className="text-white font-bold">
                          {simulatingModule === idx ? (
                            <span className="animate-pulse text-bordeaux">CHECKING...</span>
                          ) : (
                            `${dept.clearanceScore}% SCORE`
                          )}
                        </span>
                      </div>

                      {/* Progress Score Track */}
                      <div className="w-full h-1.5 bg-white/10 overflow-hidden relative mb-3">
                        <div
                          className={`h-full transition-all duration-700 ${
                            simulatingModule === idx ? "bg-bordeaux animate-pulse w-full" : "bg-green-400"
                          }`}
                          style={{ width: `${dept.clearanceScore}%` }}
                        />
                      </div>

                      <div className="flex items-center justify-between text-[11px] font-mono text-gray-400">
                        <span>SLA: <strong className="text-gray-300">{dept.slaScore}</strong></span>
                        <span>LATENCY: <strong className="text-gray-300">{dept.latency}</strong></span>
                        <span className="text-green-400 font-medium flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          VERIFIED
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TRACK 2: Global Client Logos & Enterprise Portfolio */}
        {(activeTab === "all" || activeTab === "clients") && (
          <div className="pt-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3 text-sm font-mono uppercase text-white tracking-widest">
                <span className="w-2 h-2 bg-bordeaux inline-block" />
                <span>Enterprise Clients & Global Partners</span>
              </div>
              <span className="text-xs font-mono text-gray-500 uppercase">
                [02] Global Portfolio • Tier-1 Verified Index
              </span>
            </div>

            {/* Seamless Infinite Marquee Track of Client Logos */}
            <div className="relative w-full overflow-hidden border border-white/15 bg-white/[0.02] py-8 px-6 group">
              {/* Fade masks */}
              <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

              <div className="flex animate-marquee whitespace-nowrap items-center space-x-16 group-hover:[animation-play-state:paused]">
                {duplicatedClients.map((client, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-4 px-6 py-4 bg-white/[0.04] border border-white/10 hover:border-white/30 transition-all duration-300 hover:scale-105 cursor-pointer min-w-[240px]"
                  >
                    <span className="text-2xl text-bordeaux font-black">
                      {client.symbol}
                    </span>
                    <div>
                      <div className="text-base font-black tracking-widest text-white uppercase font-sans">
                        {client.logoText}
                      </div>
                      <div className="text-[11px] font-mono text-gray-400 uppercase tracking-wider flex items-center gap-2 mt-0.5">
                        <span>{client.sector}</span>
                        <span>•</span>
                        <span className="text-gray-500">{client.location}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Clean 4-col static grid overview of clients with active accreditation badge */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
              {clients.map((client, idx) => (
                <div
                  key={idx}
                  className="p-5 border border-white/10 bg-white/[0.01] hover:bg-white/[0.05] flex flex-col justify-between transition-colors group cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-lg text-bordeaux font-bold group-hover:scale-110 transition-transform">
                      {client.symbol}
                    </span>
                    <span className="text-[10px] font-mono text-gray-500 uppercase">
                      {client.location}
                    </span>
                  </div>
                  <div className="mt-4">
                    <div className="font-black text-sm tracking-widest text-gray-300 group-hover:text-white transition-colors">
                      {client.name}
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
                      <span>{client.sector}</span>
                      <span className="text-green-400 font-mono text-[10px] font-medium flex items-center gap-1">
                        <CheckCircle2 className="w-2.5 h-2.5" />
                        ACTIVE
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom CTA bar */}
        <div className="mt-16 pt-10 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-sm text-gray-400">
            Seeking official government clearances or looking to join our corporate ecosystem?
          </div>
          <div className="flex items-center gap-4">
            <Button variant="corner" size="md" onClick={() => window.location.href = "/contact-us"}>
              Request Authority Clearance
            </Button>
          </div>
        </div>
      </div>

      {/* Marquee Animation Keyframes */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 35s linear infinite;
        }
      `,
        }}
      />
    </section>
  );
};
