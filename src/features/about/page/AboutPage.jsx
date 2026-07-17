import React from "react";

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
    <div className="about-page bg-black text-white font-sans overflow-hidden">
      {/* 1. Banner Header — "About Our Studio" */}
      <PageToolbar
        title={"About\nOur Studio"}
        description={
          "We're a dedicated team of business consultants, legal advisors, and creative strategists committed to helping companies launch, grow, and thrive across the UAE and beyond."
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
