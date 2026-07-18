import React from "react";
import { Hero } from "../components/hero/Hero";
import { PromoPopup } from "../components/promo-popup/PromoPopup";
import { DepartmentsAndClients } from "../components/departments-clients/DepartmentsAndClients";
import { CustomerCarousel } from "../components/customers/CustomerCarousel";
import { BusinessSetup } from "../components/business-setup/BusinessSetup";
import { Package } from "../components/package/Package";
import { Service } from "../components/service/Service";
import { Works } from "../components/work/Works";
import { About } from "../components/about/About";
import { WhyChoose } from "../components/why-choose/WhyChoose";
import { AwardShowcase } from "../components/award-showcase/AwardShowcase";
import { Counter } from "../components/couter/Counter";
import { Testimonial } from "../components/testimonial/Testimonial";
import { Blogs } from "../components/blogs/Blogs";
import { Connect } from "../components/connect/Connect";
import { Teams } from "../components/teams/Teams";

export const HomePage = () => {
  return (
    <div className="">
      <PromoPopup />
      <Hero />
      <DepartmentsAndClients />
      <About />
      <Works />
      <Service />
      <BusinessSetup />
      <Teams />
      <Counter />
      <WhyChoose />
      <Testimonial />
      <AwardShowcase />
      {/* <Package /> */}
      <Blogs />
      <Connect />
    </div>
  );
};
