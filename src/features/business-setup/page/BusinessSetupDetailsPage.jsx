import React from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { CheckCircle2, ArrowLeft, ArrowRight, Building, Award, HelpCircle } from "lucide-react";
import { SEO } from "../../../components/seo/SEO";
import { PageToolbar } from "../../../components/PageToolbar/PageToolbar";
import { BUSINESS_STRUCTURES } from "../constants/businessData";

export const BusinessSetupDetailsPage = () => {
  const { id } = useParams();

  // Find the matching setup structure
  const setup = BUSINESS_STRUCTURES.find((item) => item.id === id);

  // Fallback if not found
  if (!setup) {
    return <Navigate to="/business-setup" replace />;
  }

  return (
    <>
      <SEO title={setup.title} description={setup.tagline} />

      <main className="w-full bg-[#fafafa] text-gray-900 font-sans pb-20">
        {/* Navigation Breadcrumb / Back button */}
        <div className="max-w-7xl mx-auto px-6 sm:px-12 pt-8">
          <Link
            to="/business-setup"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-bordeaux transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Business Setup
          </Link>
        </div>

        <PageToolbar
          title={setup.title}
          description={setup.tagline}
          bgImage={setup.img}
          imagePosition="right"
          primaryButtonText="Get Free Consultation"
          primaryButtonAction={() => (window.location.href = "/contact")}
        />

        <section className="py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-6 sm:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
              
              {/* Left & Middle Column (2/3 width on large screens) */}
              <div className="lg:col-span-2 space-y-12">
                
                {/* Overview */}
                <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-100 shadow-sm">
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6 text-gray-900">
                    Overview
                  </h2>
                  <p className="text-lg text-gray-600 font-light leading-relaxed">
                    {setup.overview}
                  </p>
                </div>

                {/* Key Benefits */}
                <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-100 shadow-sm">
                  <h3 className="text-2xl font-bold tracking-tight mb-6 text-gray-900">
                    Key Advantages & Benefits
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {setup.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-4">
                        <div className="w-6 h-6 rounded-full bg-rose-50 flex items-center justify-center shrink-0 mt-0.5 border border-rose-100">
                          <CheckCircle2 className="w-4.5 h-4.5 text-[#6C141E]" />
                        </div>
                        <span className="text-gray-700 text-base leading-relaxed font-light">
                          {benefit}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Setup Process Flow */}
                <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-100 shadow-sm">
                  <h3 className="text-2xl font-bold tracking-tight mb-8 text-gray-900">
                    Step-by-Step Setup Process
                  </h3>
                  <div className="relative border-l border-gray-150 pl-6 ml-4 space-y-8">
                    {setup.process.map((stepData, idx) => (
                      <div key={idx} className="relative">
                        {/* Step bubble indicator */}
                        <div className="absolute -left-[37px] top-0.5 w-6 h-6 rounded-full bg-[#6C141E] text-white flex items-center justify-center text-xs font-bold ring-4 ring-white shadow-sm">
                          {stepData.step}
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-1">
                            {stepData.title}
                          </h4>
                          <p className="text-gray-600 font-light leading-relaxed text-sm">
                            {stepData.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Who is it Ideal For */}
                {setup.idealFor && (
                  <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-100 shadow-sm">
                    <h3 className="text-2xl font-bold tracking-tight mb-6 text-gray-900">
                      Who is this suitable for?
                    </h3>
                    <ul className="space-y-4">
                      {setup.idealFor.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-4">
                          <div className="w-2 h-2 rounded-full bg-[#6C141E] mt-2.5 shrink-0" />
                          <span className="text-gray-700 text-base font-light leading-relaxed">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              </div>

              {/* Right Column: Requirements & Quick Consultation Card (1/3 width) */}
              <div className="space-y-8">
                
                {/* Requirements Card */}
                <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm sticky top-28">
                  <h3 className="text-xl font-bold tracking-tight mb-6 text-gray-900 border-b border-gray-50 pb-4">
                    Required Documents
                  </h3>
                  <ul className="space-y-4">
                    {setup.requirements.map((req, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="text-[#6C141E] font-medium shrink-0 mt-0.5">•</span>
                        <span className="text-gray-600 text-[15px] leading-relaxed">
                          {req}
                        </span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-8 pt-6 border-t border-gray-100">
                    <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100/50 mb-6">
                      <p className="text-xs text-gray-500 italic leading-relaxed">
                        * Note: Requirements can vary slightly depending on your business activity and legal form. Contact us to get the precise checklist.
                      </p>
                    </div>

                    <button
                      onClick={() => (window.location.href = "/contact")}
                      className="w-full py-4 bg-[#6C141E] hover:bg-[#5a1119] text-white rounded-2xl font-medium transition-all hover:shadow-lg hover:shadow-rose-950/15 flex items-center justify-center gap-2 group"
                    >
                      Setup Company Now
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </section>
      </main>
    </>
  );
};
