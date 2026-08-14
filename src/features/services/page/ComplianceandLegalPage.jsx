import React from "react";
import { Helmet } from "react-helmet-async";
import { PageToolbar } from "../../../components/PageToolbar/PageToolbar";
import { ComplianceServicesGrid } from "../components/compliance/ComplianceServicesGrid";
import { ProServiceBenefits } from "../components/proservice/ProServiceBenefits";
import { ProServiceProcess } from "../components/proservice/ProServiceProcess";
import { Map } from "../../../components/maps/Map";

export const ComplianceandLegalPage = () => {
  return (
    <>
      <Helmet>
        <title>Business Compliance & Government Services | GBC Corporate</title>
        <meta
          name="description"
          content="Stay organized, compliant and prepared with professional support for your UAE business requirements. GBC assists with government applications, regulatory documentation, renewals and administrative procedures across multiple departments, helping you reduce paperwork, delays and compliance risks."
        />
      </Helmet>

      <main className="w-full bg-white">
        <PageToolbar
          title="Business Compliance & Government Services in the UAE"
          description="Stay organized, compliant and prepared with professional support for your UAE business requirements. GBC assists with government applications, regulatory documentation, renewals and administrative procedures across multiple departments, helping you reduce paperwork, delays and compliance risks."
          bgImage="/images/hero.jpeg"
          imagePosition="right"
          primaryButtonText="Get Compliance Support"
          primaryButtonAction={() => (window.location.href = "/contact")}
        />

        {/* Keeping the same benefits and process components as placeholders until new copy is provided. */}
        <ComplianceServicesGrid />
        <ProServiceBenefits />
        <ProServiceProcess />
        <Map />
      </main>
    </>
  );
};
