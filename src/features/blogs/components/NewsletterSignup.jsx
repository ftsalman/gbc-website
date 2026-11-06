import React, { useState } from "react";
import { sendMail } from "../../../lib/sendMail.js";
import { useToast } from "../../../components/toast/Toast.jsx";

export const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || sending) return;
    setSending(true);
    try {
      await sendMail("newsletter", { email: email.trim(), source: "Blog newsletter" });
      setEmail("");
      toast({ type: "success", title: "Subscribed", message: "Thank you! You're on our newsletter list." });
    } catch (error) {
      toast({ type: "error", title: "Subscription failed", message: error.message });
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="w-full px-6 md:px-12 lg:px-24 py-24 bg-gray-50 text-gray-900 border-t border-gray-200">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        <h2 className="text-3xl md:text-5xl font-serif mb-6">Stay ahead of the curve.</h2>
        <p className="text-lg text-gray-600 mb-10 max-w-2xl">
          Get the latest insights on UAE business setup, corporate tax, and visa regulations delivered directly to your inbox.
        </p>

        <form className="w-full max-w-lg relative" onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="w-full bg-white border border-gray-300 rounded-full px-8 py-5 pr-36 text-lg focus:outline-none focus:border-black transition-colors"
            required
            maxLength={254}
            disabled={sending}
          />
          <button
            type="submit"
            disabled={sending}
            className="absolute right-2 top-2 bottom-2 bg-black text-white px-8 rounded-full font-medium hover:bg-gray-800 transition-colors disabled:opacity-60"
          >
            {sending ? "Sending…" : "Subscribe"}
          </button>
        </form>
        <p className="text-sm text-gray-400 mt-6">
          By subscribing, you agree to our Privacy Policy and consent to receive updates.
        </p>
      </div>
    </section>
  );
};
