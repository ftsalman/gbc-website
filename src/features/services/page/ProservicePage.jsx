import React from "react";
import { Helmet } from "react-helmet-async";
import { PageToolbar } from "../../../components/PageToolbar/PageToolbar";
import { ProServiceOfferings } from "../components/proservice/ProServiceOfferings";
import { UaeVisaProServices } from "../components/proservice/UaeVisaProServices";
import { ProServiceBenefits } from "../components/proservice/ProServiceBenefits";
import { ProServiceProcess } from "../components/proservice/ProServiceProcess";
import { Map } from "../../../components/maps/Map";

export const ProservicePage = () => {
  return (
    <>
      <Helmet>
        <title>Corporate PRO Services | GBC Corporate</title>
        <meta
          name="description"
          content="Outsource your administrative burdens. Our dedicated Public Relations Officers handle government liaison, document clearing, and visa processing."
        />
      </Helmet>

      <main className="w-full bg-white">
        <PageToolbar
          title="Professional PRO Services in Dubai"
          description="From visa processing and MOHRE services to immigration, Emirates ID, trade license and government transactions, GBC provides reliable PRO services in Dubai to simplify your business paperwork and keep your operations moving."
          bgImage="/images/hero.jpeg"
          imagePosition="right"
          primaryButtonText="Get PRO Support"
          primaryButtonAction={() => (window.location.href = "/contact")}
        />

        {/* <ProServiceOfferings /> */}
        <UaeVisaProServices />
        <ProServiceBenefits />

        <ProServiceProcess />
        <Map />
      </main>
    </>
  );
};
