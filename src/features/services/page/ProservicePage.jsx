import React from "react";
import { Helmet } from "react-helmet-async";
import { PageToolbar } from "../../../components/PageToolbar/PageToolbar";
import { ProServiceOfferings } from "../components/proservice/ProServiceOfferings";
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
          title="Corporate PRO\nServices"
          description="Outsource your administrative burdens. Our dedicated Public Relations Officers handle government liaison, document clearing, and visa processing so you can focus on growing your business."
          bgImage="/images/hero.jpeg"
          imagePosition="right"
          primaryButtonText="Contact Our PRO Team"
          primaryButtonAction={() => (window.location.href = "/contact")}
        />

        <ProServiceOfferings />
        <ProServiceBenefits />
        <ProServiceProcess />
        <Map />
      </main>
    </>
  );
};
