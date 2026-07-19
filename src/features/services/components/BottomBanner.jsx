import React from "react";
import { Button } from "../../../../lib/turtle-ui/components/button/Button";

export const BottomBanner = () => {
  return (
    <section className="relative w-full py-32 bg-white flex flex-col items-center justify-center text-center border-t border-gray-100">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 mb-8">
          Start your business journey today
        </h2>
        
        <Button
          size="lg"
          variant="primary"
          className="bg-[#0a0a0a] text-white hover:bg-gray-800 transition-colors px-8 py-4 rounded-full font-medium text-lg mb-4"
          onClick={() => (window.location.href = "/contact")}
        >
          Get started
        </Button>
        
        <p className="text-sm text-gray-500 font-medium">
          Free initial consultation. No commitment required.
        </p>
      </div>
    </section>
  );
};
