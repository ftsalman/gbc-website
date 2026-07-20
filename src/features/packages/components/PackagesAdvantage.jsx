import React from "react";

export const PackagesAdvantage = () => {
  return (
    <section className="w-full bg-[#1A1A1A] text-white overflow-hidden">
      <div className="flex flex-col lg:flex-row w-full">
        
        {/* Left: Sticky Image */}
        <div className="w-full lg:w-1/2 relative h-[50vh] lg:h-screen lg:sticky top-0">
          <img 
            src="/images/blogs/featured.png" 
            alt="The GBC Advantage" 
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentElement.innerHTML = '<div class="w-full h-full bg-gradient-to-br from-gray-800 to-black flex items-center justify-center p-12"><h3 class="text-4xl font-serif text-white/50">GBC Approach</h3></div>';
            }}
          />
        </div>

        {/* Right: Scrolling Text content */}
        <div className="w-full lg:w-1/2 px-8 md:px-16 lg:px-24 py-24 lg:py-48">
          <span className="text-sm font-semibold tracking-widest uppercase mb-6 text-gray-400 block">
            The GBC Advantage
          </span>
          <h2 className="text-4xl md:text-5xl font-serif mb-16 leading-tight">
            Why partner with Global Business Connect?
          </h2>

          <div className="space-y-16">
            <div>
              <h3 className="text-2xl font-medium mb-4">No Hidden Fees</h3>
              <p className="text-gray-400 text-lg leading-relaxed">
                What you see is what you pay. We pride ourselves on 100% transparent pricing with no surprise government charges or hidden consultancy fees halfway through the process.
              </p>
            </div>
            
            <div>
              <h3 className="text-2xl font-medium mb-4">Dedicated Account Manager</h3>
              <p className="text-gray-400 text-lg leading-relaxed">
                You won't be passed around between departments. You get a single, dedicated business setup expert available on WhatsApp and email who knows your file inside and out.
              </p>
            </div>
            
            <div>
              <h3 className="text-2xl font-medium mb-4">Unmatched Speed</h3>
              <p className="text-gray-400 text-lg leading-relaxed">
                Time is money. With our deep government connections and streamlined digital portal, we secure trade licenses in as little as 24 hours, and complete visas in 3 days.
              </p>
            </div>
            
            <div className="pt-8 border-t border-white/20">
              <button className="px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-colors inline-flex items-center gap-3">
                Book a Free Consultation
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
