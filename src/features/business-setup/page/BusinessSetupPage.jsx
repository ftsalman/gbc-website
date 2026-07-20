import React from "react";
import { SEO } from "../../../components/seo/SEO";
import { PageToolbar } from "../../../components/PageToolbar/PageToolbar";
import { BusinessSetup } from "../../home/components/business-setup/BusinessSetup";
import { Connect } from "../../home/components/connect/Connect";
import { JourneySequence } from "../componnets/JourneySequence";
import { BusinessStructureSection } from "../componnets/BusinessStructureSection";
import { BusinessSetupProcess } from "../componnets/BusinessSetupProcess";
import { WhyChoose } from "../../home/components/why-choose/WhyChoose";
import { BusinessLicenses } from "../componnets/BusinessLicenses";
import { PremiumServices } from "../componnets/PremiumServices";
import { Testimonial } from "../../home/components/testimonial/Testimonial";

export const BusinessSetupPage = () => {
  return (
    <div className="business-setup-page bg-black text-white font-sans">
      <SEO title="Business Setup" description="End-to-end company formation services in the UAE, mainland, free zones, and offshore jurisdictions." />
      <PageToolbar
        title={"Launch Your Business in Dubai with Confidence"}
        description={
          "Start your UAE company with complete support for licensing, visas, banking, and government approvals. GBC Business Connect makes business setup fast, transparent, and stress-free."
        }
        bgImage="/images/TOOLSBAR_BG.png"
        imagePosition="right"
      />
      <BusinessSetup />
      <BusinessStructureSection />
      <JourneySequence />
      <WhyChoose 
        bgColor="bg-white" 
        textColor="text-black"
        lineColor="#e5e7eb"
        gradient1="bg-red-50/50"
        gradient2="bg-rose-50/50"
        gradient3="bg-red-100/50"
      />
      <BusinessLicenses />
      <BusinessSetupProcess />
      {/* <PremiumServices /> */}
      <Testimonial/>

      <Connect />
    </div>
  );
};
