import React from "react";
import { SEO } from "../../../components/seo/SEO.jsx";

import { AboutStudioScoring } from "../components/AboutStudioScoring.jsx";
import { AboutPartnerBenefits } from "../components/AboutPartnerBenefits.jsx";
import { AboutProcess } from "../components/AboutProcess.jsx";
import { AboutServices } from "../components/AboutServices.jsx";
import { AboutTeam } from "../components/AboutTeam.jsx";
import { AboutTestimonials } from "../components/AboutTestimonials.jsx";
import { AboutFAQ } from "../components/AboutFAQ.jsx";
import { Connect } from "../../home/components/connect/Connect.jsx";
import { PageToolbar } from "../../../components/PageToolbar/PageToolbar.jsx";
import { AboutFounderMessage } from "../components/AboutFounderMessage.jsx";
import { AboutCoreValues } from "../components/AboutCoreValues.jsx";

export const AboutPage = () => {
  return (
    <div className="about-page bg-white text-gray-900 font-sans">
      <SEO
        title="About Us"
        description="
 Your Trusted Partner for Business Setup & Corporate Services in the UAE
"
      />
      {/* 1. Banner Header — "About Our Studio" */}
      <PageToolbar
        title={
          " Your Trusted Partner for Business Setup & Corporate Services in the UAE"
        }
        description={
          "With 15+ years of experience, GBC Corporate Services helps entrepreneurs, startups, SMEs and established businesses set up, manage and grow their businesses across the UAE. From company formation and trade licensing to PRO services, visa processing, accounting, legal support and ongoing compliance, our experienced team manages the essential processes behind your business."
        }
        bgImage="/images/TOOLSBAR_BG@.png"
        imagePosition="right"
      />

      {/* 2. About Stats — Staggered Checkerboard with Odometer Counters */}
      <AboutStudioScoring />

      {/* Everything Your Business Needs, Under One Partner */}
      <AboutPartnerBenefits />

      {/* 3. Our Process — Research → Implementation → Testing → Deployment */}
      <AboutProcess />

      {/* 4. Services Cards — "Creative Direction, Lasting Value" */}
      <AboutServices />

      {/* 1.5. Founder Message */}
      <AboutFounderMessage />

      {/* 1.6. Core Values */}
      <AboutCoreValues />

      {/* 5. Team — "Our Creative Minds" Grid */}
      {/* <AboutTeam /> */}

      {/* 6. Testimonials — Slider with arrow buttons */}
      <AboutTestimonials />

      {/* 7. FAQ — Accordion */}
      <AboutFAQ />

      {/* 8. CTA / Connect */}
      <Connect />
    </div>
  );
};
