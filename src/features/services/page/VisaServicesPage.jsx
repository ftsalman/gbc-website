import React from 'react';
import { Helmet } from 'react-helmet-async';
import { VisaHero } from '../components/visa-services/VisaHero';
import { VisaTypes } from '../components/visa-services/VisaTypes';
import { VisaProcess } from '../components/visa-services/VisaProcess';
import { VisaLocationMap } from '../components/visa-services/VisaLocationMap';
import { VisaFAQ } from '../components/visa-services/VisaFAQ';
import { Map } from '../../../components/maps/Map';

export const VisaServicesPage = () => {
  return (
    <>
      <Helmet>
        <title>UAE Visa & Immigration Services | GBC Corporate</title>
        <meta name="description" content="Expert UAE Visa and Immigration services. Get your 10-Year Golden Visa, Investor Visa, or Employment Visa with GBC Corporate's hassle-free processing." />
      </Helmet>
      
      <main className="w-full bg-black">
        <VisaHero />
        <VisaTypes />
        <VisaProcess />
        <VisaFAQ />
        <Map
          query="GBC Business Connect International City Dubai"
          title="GBC Business Connect"
          subtitle1="International City, Office 13058"
          subtitle2="527 7775"
        />
      </main>
    </>
  );
};
