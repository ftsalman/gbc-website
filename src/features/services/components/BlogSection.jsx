import React, { useRef } from "react";
import { Link } from "react-router-dom";

export const BlogSection = () => {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -350, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 350, behavior: "smooth" });
    }
  };

  const blogs = [
    {
      title: "7 Reasons to Setup Your Business in Dubai Freezones",
      img: "/images/blogs/small1.png",
      link: "/blog/dubai-freezones"
    },
    {
      title: "How to Navigate UAE Corporate Tax 2024",
      img: "/images/blogs/small1.png",
      link: "/blog/corporate-tax"
    },
    {
      title: "Golden Visa Updates: What Investors Need to Know",
      img: "/images/blogs/small1.png",
      link: "/blog/golden-visa"
    },
    {
      title: "Mainland vs Freezone: Which is right for you?",
      img: "/images/blogs/small1.png",
      link: "/blog/mainland-vs-freezone"
    }
  ];

  return (
    <section className="relative w-full py-24 bg-white text-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 mb-12 flex justify-between items-end">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight max-w-2xl">
          Explore tips, read success stories, and get inspired
        </h2>
        
        <Link to="/blog" className="hidden md:flex items-center text-[#6C141E] font-semibold hover:underline group">
          Explore the blog 
          <span className="ml-2 group-hover:translate-x-1 transition-transform">&rarr;</span>
        </Link>
      </div>

      {/* Blog Cards Carousel */}
      <div className="relative max-w-7xl mx-auto">
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto gap-6 px-6 md:px-12 lg:px-24 pb-12 snap-x snap-mandatory no-scrollbar"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {blogs.map((blog, idx) => (
            <div 
              key={idx} 
              className="min-w-[85vw] md:min-w-[320px] snap-center flex-shrink-0 group cursor-pointer"
            >
              <div className="w-full aspect-[4/3] bg-gray-100 rounded-2xl overflow-hidden relative mb-6">
                <img 
                  src={blog.img} 
                  alt={blog.title} 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
              </div>
              <h3 className="text-xl font-bold leading-tight group-hover:text-[#6C141E] transition-colors">
                {blog.title}
              </h3>
            </div>
          ))}
        </div>

        {/* Navigation Controls */}
        <div className="absolute top-1/2 -translate-y-1/2 right-6 md:right-12 lg:right-24 hidden lg:flex space-x-2 pointer-events-none">
           {/* Not adding visible buttons here as Squarespace typically just lets user scroll or has small controls, but we can add them if needed */}
        </div>
      </div>
      
      <div className="px-6 md:hidden">
         <Link to="/blog" className="flex items-center text-[#6C141E] font-semibold hover:underline">
          Explore the blog &rarr;
        </Link>
      </div>
    </section>
  );
};
