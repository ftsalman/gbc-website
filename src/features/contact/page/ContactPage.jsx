import React from 'react';
import { SEO } from "../../../components/seo/SEO.jsx";
import { PageToolbar } from "../../../components/PageToolbar/PageToolbar.jsx";
import { ContactForm } from "../components/ContactForm.jsx";
import { Connect } from "../../home/components/connect/Connect.jsx";

export const ContactPage = () => {
  return (
    <div className="contact-page bg-white font-sans overflow-hidden min-h-screen">
      <SEO title="Contact Us" description="Get in touch with our dedicated team of business advisors, legal experts, and corporate strategists to establish and scale your company in the UAE." />
      <PageToolbar
        title="Let’s Talk About Your Business"
        description="Whether you need PRO services, business setup, accounting, VAT support or government assistance, our team is ready to help. Get in touch with GBC and find the right solution for your business in the UAE."
        bgImage="/images/bordeaux_ribbon.png"
        imagePosition="left"
        textAlign="center"
      />
      
      <ContactForm />

      <Connect />
    </div>
  );
};
