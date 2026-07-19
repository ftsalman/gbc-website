import React from "react";
import { PackagesHero } from "../components/PackagesHero.jsx";
import { PackageShowcase } from "../components/PackageShowcase.jsx";
import { PackageInclusions } from "../components/PackageInclusions.jsx";
import { PackagesAdvantage } from "../components/PackagesAdvantage.jsx";
import { Connect } from "../../home/components/connect/Connect.jsx";

export const PackagesPage = () => {
  return (
    <div className="packages-page bg-white font-sans overflow-hidden min-h-screen">
      
      {/* 1. Minimalist Editorial Hero */}
      <PackagesHero />

      {/* 2. Horizontal Scrolling Packages */}
      <PackageShowcase />

      {/* 3. Detailed Features Accordion */}
      <PackageInclusions />

      {/* 4. Split-screen Value Proposition */}
      <PackagesAdvantage />

      {/* 5. Footer CTA (reusing Connect block) */}
      <Connect />
      
    </div>
  );
};
