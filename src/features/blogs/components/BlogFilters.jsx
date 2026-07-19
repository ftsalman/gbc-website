import React, { useState } from "react";

export const BlogFilters = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const categories = [
    "All",
    "Business Setup",
    "Visas & Residency",
    "Corporate Tax",
    "Banking",
    "Market Trends",
    "Success Stories"
  ];

  return (
    <section className="w-full px-6 md:px-12 lg:px-24 py-8 bg-white border-b border-gray-100 sticky top-0 z-40 bg-white/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex overflow-x-auto no-scrollbar gap-8 items-center" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
        {categories.map((cat, idx) => (
          <button
            key={idx}
            onClick={() => setActiveFilter(cat)}
            className={`whitespace-nowrap text-lg font-medium transition-colors duration-300 ${
              activeFilter === cat 
                ? "text-black border-b-2 border-black pb-1" 
                : "text-gray-400 hover:text-gray-800 pb-1"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </section>
  );
};
