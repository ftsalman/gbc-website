import React from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { CheckCircle2, ArrowLeft, ArrowRight, ClipboardList, Info, HelpCircle } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { PageToolbar } from "../../../components/PageToolbar/PageToolbar";
import { BUSINESS_CENTER_SPACES } from "../constants/constants";
import { Map } from "../../../components/maps/Map";

export const BusinessCenterDetailsPage = () => {
  const { id } = useParams();

  // Find the matching space
  const space = BUSINESS_CENTER_SPACES.find((item) => item.id === id);

  // Fallback if not found
  if (!space) {
    return <Navigate to="/services/business-center" replace />;
  }

  return (
    <>
      <Helmet>
        <title>{space.title} | Premium Workspaces | GBC Corporate</title>
        <meta name="description" content={space.overview} />
      </Helmet>

      <main className="w-full bg-[#fafafa] text-gray-900 font-sans pb-20">
        {/* Navigation Breadcrumb / Back button */}
        <div className="max-w-7xl mx-auto px-6 sm:px-12 pt-8">
          <Link
            to="/services/business-center"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-[#6C141E] transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Business Center
          </Link>
        </div>

        <PageToolbar
          title={space.title}
          description={space.overview}
          bgImage={space.img}
          imagePosition="right"
          primaryButtonText="Book Workspace"
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
                    Workspace Overview
                  </h2>
                  <p className="text-lg text-gray-600 font-light leading-relaxed">
                    {space.overview}
                  </p>
                </div>

                {/* Key Benefits */}
                <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-100 shadow-sm">
                  <h3 className="text-2xl font-bold tracking-tight mb-6 text-gray-900">
                    Included Services & Privileges
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {space.benefits.map((benefit, idx) => (
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

                {/* Setup Process Timeline */}
                <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-100 shadow-sm">
                  <h3 className="text-2xl font-bold tracking-tight mb-8 text-gray-900">
                    Onboarding & Booking Steps
                  </h3>
                  <div className="relative border-l border-gray-150 pl-6 ml-4 space-y-8">
                    {space.approach.map((stepData, idx) => (
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

                {/* FAQs */}
                <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-100 shadow-sm">
                  <h3 className="text-2xl font-bold tracking-tight mb-8 text-gray-900">
                    Frequently Asked Questions
                  </h3>
                  <div className="space-y-6">
                    {space.faqs.map((faq, idx) => (
                      <div key={idx} className="space-y-2 pb-6 border-b border-gray-100 last:border-0 last:pb-0">
                        <h4 className="text-base font-semibold text-gray-950 flex gap-2.5 items-center">
                          <HelpCircle className="w-4.5 h-4.5 text-[#6C141E] shrink-0" />
                          {faq.q}
                        </h4>
                        <p className="text-gray-600 font-light leading-relaxed text-sm pl-7">
                          {faq.a}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Sticky Contact / Requirements Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-28 space-y-6">
                  
                  {/* Requirements Panel */}
                  <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-6">
                    <div className="flex gap-3 items-center pb-4 border-b border-gray-100">
                      <ClipboardList className="w-6 h-6 text-[#6C141E]" />
                      <h4 className="text-lg font-bold text-gray-900">Required Documents</h4>
                    </div>
                    
                    <ul className="space-y-4">
                      {space.requirements.map((req, idx) => (
                        <li key={idx} className="flex gap-3 items-start text-sm text-gray-600 font-light">
                          <Info className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Consultation CTA Widget */}
                  <div className="bg-gradient-to-br from-[#1a202c] to-[#0A0A0A] text-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-md relative overflow-hidden">
                    <div className="absolute -right-12 -bottom-12 w-32 h-32 bg-[#6C141E]/10 rounded-full blur-2xl pointer-events-none" />
                    
                    <div className="space-y-2">
                      <h4 className="text-xl font-bold tracking-tight">Need a custom layout?</h4>
                      <p className="text-sm text-gray-300 font-light leading-relaxed">
                        We offer customized executive suite layouts and dedicated project spaces. Let our space planners draft a layout for you.
                      </p>
                    </div>

                    <button
                      onClick={() => (window.location.href = "/contact")}
                      className="w-full bg-[#6C141E] hover:bg-[#8B1E2B] text-white font-medium text-sm py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group shadow-lg"
                    >
                      Request Consultation
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Location Map Section */}
        <Map
          query="GBC Business Connect International City Dubai"
          title="GBC Business Connect"
          subtitle1="International City, Office 13058"
          subtitle2="Dubai, UAE"
        />

      </main>
    </>
  );
};
