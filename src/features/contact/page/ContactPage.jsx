import React from 'react';
import { PageToolbar } from "../../../components/PageToolbar/PageToolbar.jsx";
import { ContactForm } from "../components/ContactForm.jsx";
import { Connect } from "../../home/components/connect/Connect.jsx";

export const ContactPage = () => {
  return (
    <div className="contact-page bg-white font-sans overflow-hidden min-h-screen">
      <PageToolbar
        title="Contact Us"
        description="Get in touch with our dedicated team of business advisors, legal experts, and corporate strategists to establish and scale your company in the UAE."
        bgImage="/images/bordeaux_ribbon.png"
        imagePosition="left"
        textAlign="center"
      />
      
      <ContactForm />

      <Connect />
    </div>
  );
};
