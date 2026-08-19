import React from "react";
import { SEO } from "../../../components/seo/SEO.jsx";
import { Connect } from "../../home/components/connect/Connect.jsx";

export const BlogsPage = () => {
  return (
    <div className="blogs-page bg-gray-50 font-sans overflow-hidden min-h-screen flex flex-col">
      <SEO title="Blog" description="Read the latest insights, success stories, and news about business setup in the UAE." />
      
      {/* Empty State Screen */}
      <div className="flex-grow flex items-center justify-center py-32 px-4 mt-10">
        <div className="max-w-md w-full bg-white rounded-[2rem] shadow-xl p-10 flex flex-col items-center text-center border border-gray-100">
          <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-8 shadow-inner">
            <svg className="w-12 h-12 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Coming Soon!
          </h2>
          <p className="text-gray-500 leading-relaxed text-sm md:text-base font-medium">
            We are currently brewing some fresh insights and industry news. Check back later for our latest updates!
          </p>
          <div className="mt-8">
            <button 
              onClick={() => window.location.href = '/'} 
              className="bg-gray-900 text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5 duration-200"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Connect />
      
    </div>
  );
};

