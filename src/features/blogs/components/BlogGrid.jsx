import React from "react";
import { Link } from "react-router-dom";
import { blogs } from "../constants/blogsData.jsx";
import { DataList } from "../../../../lib/turtle-ui/components/list/DataList.jsx";
import { Button } from "../../../../lib/turtle-ui/components/button/Button.jsx";

export const BlogGrid = () => {
  return (
    <section className="w-full px-4 md:px-8 lg:px-12 py-12 bg-white text-gray-900">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-8 px-2">
          Recent blog posts
        </h2>

        <DataList 
          data={blogs}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12"
          render={(blog) => (
            <Link 
              key={blog.id} 
              to={`/blogs/${blog.id}`}
              className="group flex flex-col items-start px-2"
            >
              {/* Image Container with 4:3 Aspect Ratio */}
              <div className="w-full aspect-[4/3] overflow-hidden rounded-2xl mb-4 relative bg-gray-50">
                <img 
                  src={blog.image} 
                  alt={blog.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              
              {/* Blog Title */}
              <h3 className="text-lg md:text-xl font-bold text-gray-900 leading-snug mb-2 group-hover:text-gray-600 transition-colors">
                {blog.title}
              </h3>

              {/* Blog Description */}
              <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-2">
                {blog.description}
              </p>

              {/* Author & Date Section */}
              <div className="flex items-center mt-auto gap-2">
                <img 
                  src={blog.avatar} 
                  alt={blog.author} 
                  className="w-6 h-6 rounded-full object-cover border border-gray-100"
                />
                <span className="text-xs font-semibold text-gray-800">
                  {blog.author}
                </span>
                <span className="text-xs text-gray-400 font-medium">
                  • {blog.date}
                </span>
              </div>
            </Link>
          )}
        />
        
        {/* Loading More Button */}
        <div className="mt-16 flex justify-center">
          <Button 
            size="lg" 
            variant="primary" 
            onClick={() => {}}
          >
            Loading more...
          </Button>
        </div>
      </div>
    </section>
  );
};
