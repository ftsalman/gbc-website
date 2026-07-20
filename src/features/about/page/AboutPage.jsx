import React from "react";
import { SEO } from "../../../components/seo/SEO.jsx";

import { AboutStudioScoring } from "../components/AboutStudioScoring.jsx";
import { AboutProcess } from "../components/AboutProcess.jsx";
import { AboutServices } from "../components/AboutServices.jsx";
import { AboutTeam } from "../components/AboutTeam.jsx";
import { AboutTestimonials } from "../components/AboutTestimonials.jsx";
import { AboutFAQ } from "../components/AboutFAQ.jsx";
import { Connect } from "../../home/components/connect/Connect.jsx";
import { PageToolbar } from "../../../components/PageToolbar/PageToolbar.jsx";

export const AboutPage = () => {
  return (
    <div className="about-page bg-white text-gray-900 font-sans">
      <SEO title="About Us" description="Learn about GBC Corporate's journey, our team of experts, and how we help businesses thrive in the UAE." />
      {/* 1. Banner Header — "About Our Studio" */}
      <PageToolbar
        title={"About\nGBC Corporate"}
        description={
          "We are a premier team of business setup consultants, legal advisors, and corporate strategists dedicated to helping entrepreneurs and enterprises launch, scale, and thrive across the UAE."
        }
        bgImage="/images/TOOLSBAR_BG@.png"
        imagePosition="right"
      />
      {/* 2. About Stats — Staggered Checkerboard with Odometer Counters */}
      <AboutStudioScoring />

      {/* 3. Our Process — Research → Implementation → Testing → Deployment */}
      <AboutProcess />

      {/* 4. Services Cards — "Creative Direction, Lasting Value" */}
      <AboutServices />

      {/* 5. Team — "Our Creative Minds" Grid */}
      <AboutTeam />

      {/* 6. Testimonials — Slider with arrow buttons */}
      <AboutTestimonials />

      {/* 7. FAQ — Accordion */}
      <AboutFAQ />

      {/* 8. CTA / Connect */}
      <Connect />
    </div>
  );
};
