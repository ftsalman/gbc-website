import React from "react";
import { PageToolbar } from "../../../components/PageToolbar/PageToolbar.jsx";
import { Service } from "../../home/components/service/Service.jsx";
import { Connect } from "../../home/components/connect/Connect.jsx";

export const ServicesPage = () => {
  return (
    <div className="services-page bg-black text-white font-sans overflow-hidden">
      {/* Exact Syncox Services Header with Image on Left & Text on Right */}
      <PageToolbar
        title={"Impactful\nServices"}
        description={
          "Ideas, stories, and strategies from the creative edge covering design development, and the tools that bring bold digital work to life."
        }
        bgImage="/images/TOOLSBAR_BG.png"
        imagePosition="left"
      />

      {/* Services Grid Section */}
      <Service />

      {/* Connect & CTA */}
      <Connect />
    </div>
  );
};
