import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { DataList } from "../../../../lib/turtle-ui/components/list/DataList.jsx";
import { Button } from "../../../../lib/turtle-ui/components/button/Button.jsx";
import { getFirebaseBlogs } from "../../../admin/blog/create-blogs/utils/firebaseBlogStorage";

export const BlogGrid = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const firebaseBlogs = await getFirebaseBlogs();
        if (firebaseBlogs && firebaseBlogs.length > 0) {
          // Map Firebase schema to match the static schema expected by the UI
          const mappedBlogs = firebaseBlogs.map(b => ({
            id: b.id,
            title: b.title,
            description: b.excerpt || b.description,
            date: b.date,
            image: b.image,
            author: b.author,
            avatar: b.authorImage || "/images/blogs/avatar_lana.png"
          }));
          setBlogs(mappedBlogs);
        } else {
          setBlogs([]);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <section className="w-full px-4 md:px-8 lg:px-12 py-12 bg-white text-gray-900">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-8 px-2">
          Recent blog posts
        </h2>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 px-2">
            {[1, 2, 3].map((n) => (
              <div key={n} className="flex flex-col animate-pulse">
                <div className="w-full aspect-[4/3] bg-gray-100/80 rounded-2xl mb-5"></div>
                <div className="h-6 bg-gray-100/80 rounded-md w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-100/80 rounded-md w-full mb-2"></div>
                <div className="h-4 bg-gray-100/80 rounded-md w-5/6 mb-6"></div>
                <div className="flex items-center gap-3 mt-auto pt-2">
                  <div className="w-7 h-7 bg-gray-100/80 rounded-full"></div>
                  <div className="h-3.5 bg-gray-100/80 rounded-md w-24"></div>
                </div>
              </div>
            ))}
          </div>
        ) : blogs.length > 0 ? (
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
        ) : (
          <div className="flex flex-col items-center justify-center py-28 text-center px-4">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6 shadow-sm border border-gray-100">
              <svg className="w-10 h-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 tracking-tight">No Articles Published Yet</h3>
            <p className="text-gray-500 max-w-sm leading-relaxed text-sm md:text-base font-light">
              We're currently brewing some fresh insights. Check back soon for our latest updates and industry news!
            </p>
          </div>
        )}
        
        {/* Loading More Button */}
        {!loading && blogs.length > 0 && (
          <div className="mt-16 flex justify-center">
            <Button 
              size="lg" 
              variant="outline" 
              className="px-8 border-gray-300 text-gray-600 hover:bg-gray-50"
              onClick={() => (window.location.href = '/blogs')}
            >
              Load More Blogs
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};
