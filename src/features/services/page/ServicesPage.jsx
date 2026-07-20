import React from "react";
import { SEO } from "../../../components/seo/SEO.jsx";
import { PageToolbar } from "../../../components/PageToolbar/PageToolbar.jsx";
import { Service } from "../../home/components/service/Service.jsx";
import { Connect } from "../../home/components/connect/Connect.jsx";
import { TemplateCarousel } from "../components/TemplateCarousel.jsx";
import { InteractiveTour } from "../components/InteractiveTour.jsx";
import { FeatureGrid } from "../components/FeatureGrid.jsx";
import { TestimonialSlider } from "../components/TestimonialSlider.jsx";
import { BlueprintHighlight } from "../components/BlueprintHighlight.jsx";
import { BlogSection } from "../components/BlogSection.jsx";
import { FAQAccordion } from "../components/FAQAccordion.jsx";
import { BottomBanner } from "../components/BottomBanner.jsx";

export const ServicesPage = () => {
  return (
    <div className="services-page bg-black text-white font-sans overflow-hidden">
      <SEO title="Services" description="Comprehensive business setup, legal, tax, and advisory services tailored for the UAE market." />
      {/* Exact Syncox Services Header with Image on Left & Text on Right */}
      <PageToolbar
        title={"Creative pros run their businesses with Global Business Connect"}
        description={
          "Ideas, stories, and strategies from the creative edge covering design development, and the tools that bring bold digital work to life."
        }
        bgImage="/images/TOOLSBAR_BG.png"
        imagePosition="rightt"
        primaryButtonText="Start Business  "
        secondaryButtonText="Learn More"
      />

      {/* 2. Template Carousel */}
      <TemplateCarousel />

      {/* 3. Interactive Tour */}
      <InteractiveTour />

      {/* 4. Feature Grid */}
      {/* <FeatureGrid /> */}

      {/* 5. Testimonial Slider */}
      <TestimonialSlider />

      {/* 6. Blueprint Highlight */}
      <BlueprintHighlight />

      {/* 7. Blog Section */}
      <BlogSection />

      {/* 8. FAQ Accordion */}
      <FAQAccordion />

      {/* 9. Bottom Banner */}
      <BottomBanner />

      {/* Connect & CTA */}
      <Connect />
    </div>
  );
};
