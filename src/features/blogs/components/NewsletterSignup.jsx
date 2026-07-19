import React from "react";

export const NewsletterSignup = () => {
  return (
    <section className="w-full px-6 md:px-12 lg:px-24 py-24 bg-gray-50 text-gray-900 border-t border-gray-200">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        <h2 className="text-3xl md:text-5xl font-serif mb-6">Stay ahead of the curve.</h2>
        <p className="text-lg text-gray-600 mb-10 max-w-2xl">
          Get the latest insights on UAE business setup, corporate tax, and visa regulations delivered directly to your inbox.
        </p>
        
        <form className="w-full max-w-lg relative" onSubmit={(e) => e.preventDefault()}>
          <input 
            type="email" 
            placeholder="Enter your email address" 
            className="w-full bg-white border border-gray-300 rounded-full px-8 py-5 pr-36 text-lg focus:outline-none focus:border-black transition-colors"
            required
          />
          <button 
            type="submit" 
            className="absolute right-2 top-2 bottom-2 bg-black text-white px-8 rounded-full font-medium hover:bg-gray-800 transition-colors"
          >
            Subscribe
          </button>
        </form>
        <p className="text-sm text-gray-400 mt-6">
          By subscribing, you agree to our Privacy Policy and consent to receive updates.
        </p>
      </div>
    </section>
  );
};
