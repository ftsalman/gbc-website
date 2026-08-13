import React from "react";
import { Button } from "../../../../lib/turtle-ui/components/button/Button";
import { ArrowBigLeft } from "lucide-react";

export const BottomBanner = () => {
  return (
    <section className="relative w-full border-t border-gray-100 bg-white py-24 md:py-32">
      <div className="mx-auto flex max-w-4xl flex-col items-center justify-center px-6 text-center">
        <h2 className="mb-6 max-w-3xl text-4xl font-bold leading-tight tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
          Ready to Make Your UAE Business Easier
        </h2>

        <p className="mx-auto mb-8 max-w-2xl text-center text-[14px] font-light leading-relaxed text-gray-400 sm:text-md">
          Get expert guidance for business setup, PRO services, visas,
          accounting, business centres and government approvals  all from one
          trusted partner.
        </p>

        <Button
          size="lg"
          variant="primary"
          className="mb-4 inline-flex items-center justify-center rounded-full bg-[#0a0a0a] px-8 py-4 text-lg font-medium text-white transition-colors hover:bg-gray-800"
          onClick={() => (window.location.href = "/contact")}
        >
          <span>Get Free Consultation</span>
          <span className="ml-2">→</span>
        </Button>

        <p className="text-center text-sm font-medium text-gray-500">
          Free initial consultation. No commitment required.
        </p>
      </div>
    </section>
  );
};
