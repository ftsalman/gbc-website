import React from "react";
import { Link } from "react-router-dom";

export const BlogGrid = () => {
  const blogs = [
    {
      id: 1,
      title: "Why Dubai is the Ultimate Hub for Tech Startups",
      category: "Market Trends",
      date: "Oct 12, 2026",
      image: "/images/blog-tech.jpg",
      colSpan: "col-span-1 md:col-span-2 lg:col-span-2",
      aspectRatio: "aspect-[16/9]"
    },
    {
      id: 2,
      title: "Understanding Corporate Tax Updates in 2026",
      category: "Corporate Tax",
      date: "Oct 10, 2026",
      image: "/images/blog-tax.jpg",
      colSpan: "col-span-1",
      aspectRatio: "aspect-square"
    },
    {
      id: 3,
      title: "Step-by-Step Guide to the Golden Visa",
      category: "Visas & Residency",
      date: "Oct 05, 2026",
      image: "/images/blog-visa.jpg",
      colSpan: "col-span-1",
      aspectRatio: "aspect-square"
    },
    {
      id: 4,
      title: "How to Open a Corporate Bank Account in 48 Hours",
      category: "Banking",
      date: "Sep 28, 2026",
      image: "/images/blog-bank.jpg",
      colSpan: "col-span-1 md:col-span-2 lg:col-span-2",
      aspectRatio: "aspect-[16/9]"
    },
    {
      id: 5,
      title: "Free Zone vs Mainland: What to Choose?",
      category: "Business Setup",
      date: "Sep 20, 2026",
      image: "/images/blog-freezone.jpg",
      colSpan: "col-span-1",
      aspectRatio: "aspect-[3/4]"
    },
    {
      id: 6,
      title: "Success Story: Expanding a UK Brand to the UAE",
      category: "Success Stories",
      date: "Sep 15, 2026",
      image: "/images/blog-success.jpg",
      colSpan: "col-span-1",
      aspectRatio: "aspect-[3/4]"
    },
    {
      id: 7,
      title: "Intellectual Property: Protecting Your Trademark",
      category: "Business Setup",
      date: "Sep 10, 2026",
      image: "/images/blog-ip.jpg",
      colSpan: "col-span-1",
      aspectRatio: "aspect-[3/4]"
    }
  ];

  return (
    <section className="w-full px-6 md:px-12 lg:px-24 py-16 bg-white text-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          
          {blogs.map((blog) => (
            <Link 
              key={blog.id} 
              to={`/blogs/${blog.id}`}
              className={`group flex flex-col items-start ${blog.colSpan}`}
            >
              <div className={`w-full ${blog.aspectRatio} overflow-hidden rounded-xl mb-6 relative bg-gray-100`}>
                <div className="absolute inset-0 bg-gradient-to-tr from-gray-200 to-gray-300"></div>
                <img 
                  src={blog.image} 
                  alt={blog.title} 
                  className="absolute inset-0 w-full h-full object-cover z-10 transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => e.target.style.display = 'none'}
                />
                
                {/* Premium Hover Overlay */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex items-center justify-center">
                   <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-xl">
                      <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                   </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4 mb-3 text-sm font-medium">
                <span className="text-gray-500 uppercase tracking-wider">{blog.category}</span>
                <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                <span className="text-gray-400">{blog.date}</span>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-serif leading-tight group-hover:text-gray-600 transition-colors">
                {blog.title}
              </h3>
            </Link>
          ))}

        </div>
        
        {/* Load More Button */}
        <div className="mt-20 flex justify-center">
          <button className="px-10 py-4 rounded-full border border-black text-black font-medium text-lg hover:bg-black hover:text-white transition-colors duration-300">
            Load More Articles
          </button>
        </div>

      </div>
    </section>
  );
};
