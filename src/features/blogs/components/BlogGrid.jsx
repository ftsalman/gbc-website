import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { blogs as staticBlogs } from "../constants/blogsData.jsx";
import { DataList } from "../../../../lib/turtle-ui/components/list/DataList.jsx";
import { Button } from "../../../../lib/turtle-ui/components/button/Button.jsx";
import { getFirebaseBlogs } from "../../../admin/blog/create-blogs/utils/firebaseBlogStorage";

export const BlogGrid = () => {
  const [blogs, setBlogs] = useState(staticBlogs);
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
          
          // Combine dynamic and static blogs, ensuring no duplicates by ID
          const combined = [...mappedBlogs, ...staticBlogs].filter(
            (blog, index, self) => index === self.findIndex(t => t.id === blog.id)
          );
          setBlogs(combined);
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
          <div className="flex justify-center py-20">
            <span className="w-8 h-8 border-4 border-gray-200 border-t-[#6C141E] rounded-full animate-spin"></span>
          </div>
        ) : (
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
        )}
        
        {/* Loading More Button */}
        {!loading && (
          <div className="mt-16 flex justify-center">
            <Button 
              size="lg" 
              variant="primary" 
              onClick={() => {}}
            >
              Loading more...
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};
