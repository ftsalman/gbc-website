import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const AdminLoginPage = () => {
  const [email, setEmail] = useState('admin@connectgbc.com');
  const [password, setPassword] = useState('password123');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      if (email === 'admin@connectgbc.com' && password === 'password123') {
        localStorage.setItem("flowbee_admin_auth", "true");
        window.location.href = '/admin/blog-create'; 
      } else {
        alert('Invalid email or password. Please try again.');
      }
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mb-10 text-center lg:text-left">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
        <p className="text-gray-500 font-medium">Please enter your admin credentials.</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-6">
        {/* Email Input */}
        <div className="relative group">
          <label className="text-sm font-semibold text-gray-700 mb-1.5 block transition-colors group-focus-within:text-[#6C141E]">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400 group-focus-within:text-[#6C141E] transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
              </svg>
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-white border border-gray-200 text-gray-900 rounded-xl focus:ring-2 focus:ring-[#6C141E]/20 focus:border-[#6C141E] block pl-11 pr-4 py-3.5 transition-all outline-none shadow-sm hover:border-gray-300"
              placeholder="admin@connectgbc.com"
            />
          </div>
        </div>

        {/* Password Input */}
        <div className="relative group">
          <div className="flex justify-between items-center mb-1.5">
            <label className="text-sm font-semibold text-gray-700 transition-colors group-focus-within:text-[#6C141E]">
              Password
            </label>
            <a href="#" className="text-xs font-semibold text-[#6C141E] hover:text-[#520f17] transition-colors">
              Forgot password?
            </a>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400 group-focus-within:text-[#6C141E] transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-white border border-gray-200 text-gray-900 rounded-xl focus:ring-2 focus:ring-[#6C141E]/20 focus:border-[#6C141E] block pl-11 pr-4 py-3.5 transition-all outline-none shadow-sm hover:border-gray-300"
              placeholder="••••••••"
            />
          </div>
        </div>

        {/* Remember me */}
        <div className="flex items-center">
          <input
            id="remember-me"
            type="checkbox"
            className="w-4 h-4 text-[#6C141E] bg-gray-100 border-gray-300 rounded focus:ring-[#6C141E] focus:ring-2 cursor-pointer"
          />
          <label htmlFor="remember-me" className="ml-2 text-sm font-medium text-gray-600 cursor-pointer">
            Remember me for 30 days
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 bg-[#6C141E] hover:bg-[#520f17] text-white font-semibold rounded-xl py-3.5 transition-all active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none shadow-md shadow-[#6C141E]/20"
        >
          {isLoading ? (
            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            'Sign In'
          )}
        </button>
      </form>

      {/* Footer Text */}
      <p className="mt-8 text-center text-sm text-gray-500 font-medium">
        Secured by Connect GBC Enterprise Security
      </p>
    </motion.div>
  );
};
