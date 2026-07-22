import React from "react";
import { Helmet } from "react-helmet-async";
import { MainlandHero } from "../components/mainland/MainlandHero";
import { MainlandBenefits } from "../components/mainland/MainlandBenefits";
import { MainlandProcess } from "../components/mainland/MainlandProcess";
import { MainlandFAQ } from "../components/mainland/MainlandFAQ";
import { Map } from "../../../components/maps/Map";

export const MainLandPage = () => {
  return (
    <>
      <Helmet>
        <title>Dubai Mainland Business Setup | GBC Corporate</title>
        <meta
          name="description"
          content="Set up your Dubai Mainland business with 100% ownership. Trade anywhere in the UAE and bid on government contracts with GBC Corporate."
        />
      </Helmet>

      <main className="w-full bg-black">
        <MainlandHero />
        <MainlandBenefits />
        <MainlandProcess />
        <MainlandFAQ />
        <Map />
      </main>
    </>
  );
};
