import React from "react";
import { Helmet } from "react-helmet-async";
import { PageToolbar } from "../../../components/PageToolbar/PageToolbar";
import { AccountingServicesGrid } from "../components/accounting/AccountingServicesGrid";
import { AccountingBenefits } from "../components/accounting/AccountingBenefits";
import { AccountingProcess } from "../components/accounting/AccountingProcess";
import { Map } from "../../../components/maps/Map";

export const AccountAndBookigPage = () => {
  return (
    <>
      <Helmet>
        <title>Accounting & Bookkeeping Services | GBC Corporate</title>
        <meta
          name="description"
          content="From daily bookkeeping and VAT records to financial reporting and payroll support, our accounting services help keep your business finances accurate, organized and ready for better decision-making."
        />
      </Helmet>

      <main className="w-full bg-white">
        <PageToolbar
          title="Accounting & Bookkeeping Services for UAE Businesses"
          description="From daily bookkeeping and VAT records to financial reporting and payroll support, our accounting services help keep your business finances accurate, organized and ready for better decision-making."
          bgImage="/images/hero.jpeg"
          imagePosition="right"
          primaryButtonText="Get Accounting Support"
          primaryButtonAction={() => (window.location.href = "/contact")}
        />

        {/* Keeping the same components as the PRO Services page as requested. */}
        <AccountingServicesGrid />
        <AccountingBenefits />
        <AccountingProcess />
        <Map />
      </main>
    </>
  );
};
