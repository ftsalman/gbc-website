import React from "react";
import { Helmet } from "react-helmet-async";
import { BusinessCenterHero } from "../components/business-center/BusinessCenterHero";
import { BusinessCenterSpaces } from "../components/business-center/BusinessCenterSpaces";
import { BusinessCenterAmenities } from "../components/business-center/BusinessCenterAmenities";
import { Map } from "../../../components/maps/Map";

export const BusinessCenterPage = () => {
  return (
    <>
      <Helmet>
        <title>Premium Business Centers & Workspaces | GBC Corporate</title>
        <meta
          name="description"
          content="Elevate your corporate presence with our fully-serviced luxury offices, co-working spaces, and meeting rooms in Dubai's prestigious districts."
        />
      </Helmet>

      <div className="w-full bg-black">
        <BusinessCenterHero />
        <BusinessCenterSpaces />
        <BusinessCenterAmenities />
        <Map />
      </div>
    </>
  );
};

export default BusinessCenterPage;
