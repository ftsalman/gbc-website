import React from "react";
import { PageToolbar } from "../../../components/PageToolbar/PageToolbar";
import { BusinessSetup } from "../../home/components/business-setup/BusinessSetup";
import { Package } from "../../home/components/package/Package";
import { Connect } from "../../home/components/connect/Connect";

export const BusinessSetupPage = () => {
  return (
    <div className="business-setup-page bg-black text-white font-sans overflow-hidden">
      <PageToolbar
        title={"Business Setup\n& Packages"}
        description={
          "Tailored corporate structuring, instant freezone and mainland trade licenses, golden visas, and turnkey advisory for companies scaling across the UAE."
        }
        bgImage="/images/TOOLSBAR_BG.png"
        imagePosition="right"
      />

      <BusinessSetup />
    
      <Connect />
    </div>
  );
};
