import React from "react";
import { SEO } from "../../../components/seo/SEO.jsx";
import { PageToolbar } from "../../../components/PageToolbar/PageToolbar.jsx";
import { Service } from "../../home/components/service/Service.jsx";
import { Connect } from "../../home/components/connect/Connect.jsx";
import { TemplateCarousel } from "../components/TemplateCarousel.jsx";
import { InteractiveTour } from "../components/InteractiveTour.jsx";
import { VisaServices } from "../components/VisaServices.jsx";
import { FeatureGrid } from "../components/FeatureGrid.jsx";
import { TestimonialSlider } from "../components/TestimonialSlider.jsx";
import { BlueprintHighlight } from "../components/BlueprintHighlight.jsx";
import { BlogSection } from "../components/BlogSection.jsx";
import { FAQAccordion } from "../components/FAQAccordion.jsx";
import { BottomBanner } from "../components/BottomBanner.jsx";

export const ServicesPage = () => {
  return (
    <div className="services-page bg-black text-white font-sans overflow-hidden">
      <SEO
        title="Services"
        description="Comprehensive business setup, legal, tax, and advisory services tailored for the UAE market."
      />
      {/* Exact Syncox Services Header with Image on Left & Text on Right */}
      <PageToolbar
        title={"Complete Business & Corporate Services in the UAE"}
        description={
          "From business setup and PRO services to visa processing, accounting, VAT, business centres and government approvals, GBC provides the essential services businesses need to start, operate and grow across the UAE."
        }
        bgImage="https://i.pinimg.com/1200x/54/26/b6/5426b61b009d754b200b2e86652b1832.jpg"
        imagePosition="rightt"
        primaryButtonText="Get Free Consultation  "
        secondaryButtonText="View All Services"
      />

      {/* 2. Template Carousel */}
      <TemplateCarousel />

      {/* 3. Interactive Tour */}
      <InteractiveTour />

      {/* 4. Visa Services Section */}
      <VisaServices />

      {/* 5. Testimonial Slider */}
      <TestimonialSlider />

      {/* 6. Blueprint Highlight */}
      <BlueprintHighlight />

      {/* 7. Blog Section */}
      {/* <BlogSection /> */}

      {/* 8. FAQ Accordion */}
      <FAQAccordion />

      {/* 9. Bottom Banner */}
      <BottomBanner />

      {/* Connect & CTA */}
      <Connect />
    </div>
  );
};
