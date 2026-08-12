import React, { useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { CheckCircle2, ArrowLeft, ArrowUpRight, Phone, Mail, FileText, Send, User, ChevronDown } from 'lucide-react';
import { PageToolbar } from '../../../components/PageToolbar/PageToolbar';
import { VISA_TYPES } from '../constants/constants.js';

// Default approach if visa ID doesn't match above keys
const DEFAULT_APPROACH = [
  { step: "01", title: "Initial Eligibility Consulting", desc: "Our legal consultants assess your profile and map the required documents for your specific residency pathway." },
  { step: "02", title: "Document Clearing & Clearances", desc: "We handle attestation, translations, and secure pre-approvals from local government authorities." },
  { step: "03", title: "Medical Screening & Visa Stamping", desc: "We guide you through the medical fitness exam, Emirates ID biometrics, and final residency stamping." }
];

const DEFAULT_FAQS = [
  { q: "What documents are generally required for UAE visas?", a: "Most visas require a copy of your passport (valid for 6+ months), recent photos, medical fitness tests, and proof of your sponsoring criteria (e.g. trade license, employment contract, or title deed)." },
  { q: "Can I apply for a visa change of status from within the UAE?", a: "Yes, you can do an 'In-Country Change of Status' which avoids the need to leave the country and fly back in." },
  { q: "How does GBC make the process faster?", a: "As registered government clearing agents, we have direct API linkages and dedicated PRO personnel inside government entities to fast-track approvals." }
];

// UAE jurisdictions we serve
const JURISDICTIONS = [
  { name: "Dubai (DED)", icon: "🌆" },
  { name: "Abu Dhabi", icon: "🏛️" },
  { name: "DMCC Freezone", icon: "💎" },
  { name: "IFZA Dubai", icon: "🌐" },
  { name: "DAFZA Freezone", icon: "✈️" },
  { name: "Sharjah Media City (Shams)", icon: "🎨" }
];

export const VisaDetailsPage = () => {
  const { id } = useParams();
  
  // Find the specific visa by ID
  const visa = VISA_TYPES.find((v) => v.id === id);

  // Form states
  const [formState, setFormState] = useState({ name: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Accordion state
  const [activeFaq, setActiveFaq] = useState(null);

  // Case Studies active state
  const [activeCs, setActiveCs] = useState(0);

  // If the URL ID is invalid, redirect to the main visa services page
  if (!visa) {
    return <Navigate to="/services/visa" replace />;
  }

  // Get dynamic timelines and FAQs from constants.js
  const approachSteps = visa.approach || DEFAULT_APPROACH;
  const faqsList = visa.faqs || DEFAULT_FAQS;

  // Filter other specialized visas
  const otherVisas = VISA_TYPES.filter((v) => v.id !== visa.id).slice(0, 3);

  // Handle form change
  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formState.name) newErrors.name = 'Full name is required';
    if (!formState.email) newErrors.email = 'Email is required';
    if (!formState.phone) newErrors.phone = 'Phone number is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    // Mock API submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormState({ name: '', email: '', phone: '', message: '' });
    }, 1200);
  };

  return (
    <>
      <Helmet>
        <title>{visa.title} Details & Requirements | GBC Corporate Services</title>
        <meta name="description" content={`${visa.overview.substring(0, 150)}... Learn more about requirements, process steps, and advantages.`} />
      </Helmet>
      
      <main className="w-full bg-white text-gray-900 font-sans pb-24">
        <PageToolbar
          title={visa.title}
          description={visa.overview}
          bgImage={visa.img}
          imagePosition="right"
          primaryButtonText="Apply for this Visa"
          primaryButtonAction={() => document.getElementById("visa-contact-form")?.scrollIntoView({ behavior: "smooth" })}
          backUrl="/services/visa"
          backText="Back to Visa Services"
        />

        {/* Dynamic Detail Section */}
        <section className="py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-6 sm:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
              
              {/* Left 2 Columns: Main Details - Plain Text/Rich Text Style */}
              <div className="lg:col-span-2 space-y-16">
                
                {/* Header Section */}
                <div className="space-y-8">
                  <div className="w-full h-[320px] sm:h-[480px] overflow-hidden rounded-[24px]">
                    <img 
                      src={visa.img} 
                      alt={visa.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-4">
                    <h1 className="text-3xl sm:text-5xl font-semibold text-gray-950 tracking-tight">
                      {visa.title}
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-600 font-light leading-relaxed">
                      {visa.overview}
                    </p>
                  </div>
                </div>

                {/* Requirements & Benefits Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-4">
                  {/* Requirements Section */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold tracking-tight text-gray-950 border-b border-gray-100 pb-3">
                      Eligibility & Requirements
                    </h3>
                    <ul className="space-y-3">
                      {visa.requirements.map((req, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <span className="text-[#6C141E] font-bold shrink-0 mt-0.5">•</span>
                          <span className="text-gray-600 text-[15px] leading-relaxed">
                            {req}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Benefits Section */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold tracking-tight text-gray-950 border-b border-gray-100 pb-3">
                      Key Advantages
                    </h3>
                    <ul className="space-y-3">
                      {visa.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-rose-50 flex items-center justify-center shrink-0 mt-0.5 border border-rose-100">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#6C141E]" />
                          </div>
                          <span className="text-gray-700 text-[15px] leading-relaxed font-light">
                            {benefit}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Proven Approach Timeline */}
                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-bold tracking-tight text-gray-950">
                      Our Proven Approach to {visa.title} Success
                    </h3>
                    <p className="text-gray-500 font-light mt-1 text-sm">
                      We streamline your application path in 3 clear steps for maximum compliance and speed.
                    </p>
                  </div>
                  
                  <div className="relative border-l border-gray-150 pl-8 ml-4 space-y-8">
                    {approachSteps.map((step, idx) => (
                      <div key={idx} className="relative">
                        <div className="absolute -left-[45px] top-0.5 w-6.5 h-6.5 rounded-full bg-[#6C141E] text-white flex items-center justify-center text-xs font-bold ring-4 ring-white">
                          {step.step}
                        </div>
                        <div>
                          <h4 className="text-base font-semibold text-gray-900 mb-1">
                            {step.title}
                          </h4>
                          <p className="text-gray-600 font-light leading-relaxed text-sm">
                            {step.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Jurisdictions / Free Zones We Serve */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold tracking-tight text-gray-950">
                    Emirates & Free Zones We Support
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {JURISDICTIONS.map((jur, idx) => (
                      <div 
                        key={idx} 
                        className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:border-[#6C141E]/30 transition-all duration-300 group"
                      >
                        <span className="text-2xl">{jur.icon}</span>
                        <span className="text-sm font-medium text-gray-700 group-hover:text-[#6C141E] transition-colors">
                          {jur.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Why Choose Us Split Card */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 items-center">
                  <div className="w-full h-[240px] sm:h-[300px] overflow-hidden rounded-[24px]">
                    <img 
                      src="https://i.pinimg.com/1200x/66/bc/8e/66bc8ea46268f6d436f41e33796c7a44.jpg" 
                      alt="GBC Quality Support" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-6">
                    <h4 className="text-xl font-bold tracking-tight text-gray-950">
                      Why choose us for your visa journey?
                    </h4>
                    <ul className="space-y-4">
                      {["Direct government API integration", "Over 99.4% approval success rate", "Comprehensive end-to-end guidance", "Dedicated personal PRO representative", "No hidden fee policy"].map((benefit, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-sm text-gray-600">
                          <CheckCircle2 className="w-4.5 h-4.5 text-[#6C141E] shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

              </div>

              {/* Right 1 Column: Sticky Sidebar Form & Contact */}
              <div className="space-y-8">
                
                {/* Form Card (Sticky sidebar keeps white card/container design for structure) */}
                <div className="bg-white rounded-[24px] p-8 border border-gray-150 shadow-sm sticky top-28 space-y-6">
                  <div>
                    <h3 className="text-xl font-bold tracking-tight text-gray-900">Get in touch with us</h3>
                    <p className="text-xs text-gray-400 font-light mt-1">Submit your request and get a response within 2 hours.</p>
                  </div>
                  
                  {isSubmitted ? (
                    <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 text-center space-y-3">
                      <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto">
                        <Send className="w-5 h-5 text-emerald-600" />
                      </div>
                      <h4 className="text-base font-bold text-emerald-950">Thank you!</h4>
                      <p className="text-xs text-emerald-800 leading-relaxed font-light">
                        Your inquiry has been received. One of our Senior PRO advisors will reach out to you shortly.
                      </p>
                      <button 
                        onClick={() => setIsSubmitted(false)}
                        className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 underline pt-2 block mx-auto"
                      >
                        Send another message
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-700">Full Name</label>
                        <div className="relative">
                          <input 
                            type="text" 
                            name="name" 
                            value={formState.name}
                            onChange={handleChange}
                            placeholder="John Doe" 
                            className={`w-full text-sm pl-4 pr-10 py-3 bg-gray-50 border ${errors.name ? 'border-rose-400' : 'border-gray-200'} rounded-xl focus:outline-none focus:border-[#6C141E] focus:ring-1 focus:ring-[#6C141E] transition-all`}
                          />
                          <User className="absolute right-3.5 top-3.5 w-4 h-4 text-gray-400" />
                        </div>
                        {errors.name && <p className="text-xs text-rose-500">{errors.name}</p>}
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-700">Email Address</label>
                        <div className="relative">
                          <input 
                            type="email" 
                            name="email" 
                            value={formState.email}
                            onChange={handleChange}
                            placeholder="john@example.com" 
                            className={`w-full text-sm pl-4 pr-10 py-3 bg-gray-50 border ${errors.email ? 'border-rose-400' : 'border-gray-200'} rounded-xl focus:outline-none focus:border-[#6C141E] focus:ring-1 focus:ring-[#6C141E] transition-all`}
                          />
                          <Mail className="absolute right-3.5 top-3.5 w-4 h-4 text-gray-400" />
                        </div>
                        {errors.email && <p className="text-xs text-rose-500">{errors.email}</p>}
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-700">Phone Number</label>
                        <div className="relative">
                          <input 
                            type="tel" 
                            name="phone" 
                            value={formState.phone}
                            onChange={handleChange}
                            placeholder="+971 50 123 4567" 
                            className={`w-full text-sm pl-4 pr-10 py-3 bg-gray-50 border ${errors.phone ? 'border-rose-400' : 'border-gray-200'} rounded-xl focus:outline-none focus:border-[#6C141E] focus:ring-1 focus:ring-[#6C141E] transition-all`}
                          />
                          <Phone className="absolute right-3.5 top-3.5 w-4 h-4 text-gray-400" />
                        </div>
                        {errors.phone && <p className="text-xs text-rose-500">{errors.phone}</p>}
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-700">Message (Optional)</label>
                        <textarea 
                          name="message" 
                          value={formState.message}
                          onChange={handleChange}
                          rows="3"
                          placeholder={`Interested in applying for ${visa.title}...`} 
                          className="w-full text-sm px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#6C141E] focus:ring-1 focus:ring-[#6C141E] transition-all resize-none"
                        />
                      </div>

                      <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full mt-2 py-3.5 bg-[#6C141E] hover:bg-[#5a1119] text-white text-sm font-semibold rounded-xl transition-all shadow-md shadow-rose-900/10 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                      >
                        {isSubmitting ? 'Sending Request...' : 'Send Message'}
                        <Send className="w-4 h-4" />
                      </button>
                    </form>
                  )}

                  {/* Direct Contact Info block */}
                  <div className="pt-6 border-t border-gray-100 flex flex-col gap-4">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Contact info</h4>
                    
                    <a href="tel:+971125879786" className="flex items-center gap-3 text-sm text-gray-700 hover:text-[#6C141E] transition-colors group">
                      <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100 group-hover:bg-[#6C141E]/10 transition-all">
                        <Phone className="w-4 h-4 text-gray-500 group-hover:text-[#6C141E] transition-colors" />
                      </div>
                      <span className="font-medium">+971 125 879 786</span>
                    </a>

                    <a href="mailto:info@gbccorporate.com" className="flex items-center gap-3 text-sm text-gray-700 hover:text-[#6C141E] transition-colors group">
                      <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100 group-hover:bg-[#6C141E]/10 transition-all">
                        <Mail className="w-4 h-4 text-gray-500 group-hover:text-[#6C141E] transition-colors" />
                      </div>
                      <span className="font-medium">info@gbccorporate.com</span>
                    </a>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* Case Studies section */}
        <section className="py-20 sm:py-24 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 sm:px-12 space-y-12">
            
            {/* Header with Title on Left, Read More on Right */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-4">
              <div className="space-y-2">
                <span className="text-gray-400 font-bold text-xs uppercase tracking-widest">Client Success</span>
                <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-gray-900 leading-tight">
                  INSPIRING CLIENTS<br />
                  FOR THE <span className="text-[#6C141E]">SUCCESS STORIES</span>
                </h2>
              </div>
              
              <Link 
                to="/blogs" 
                className="inline-flex items-center gap-3 group text-xs font-bold uppercase tracking-wider text-gray-900 hover:text-[#6C141E] transition-colors"
              >
                <span>Read More</span>
                <div className="w-10 h-10 rounded-full bg-gray-100 group-hover:bg-[#6C141E]/10 flex items-center justify-center transition-all duration-300">
                  <ArrowUpRight className="w-4 h-4 text-gray-800 group-hover:text-[#6C141E] transition-colors" />
                </div>
              </Link>
            </div>

            {/* Dynamic Cards Flex Row matching the reference image layout on hover */}
            <div className="flex flex-col lg:flex-row gap-6 w-full items-stretch">
              {[
                {
                  title: "Emma's study abroad dream",
                  desc: "Successfully navigated financial documentation hurdles and university clearance, securing her residency permit within 5 days.",
                  img: "https://cdn.prod.website-files.com/6777c6ca4cd4fd1a5c59b3bf/6788b4c8ec6b2baa02e562dd_case-01.avif",
                  bgInactive: "#EBE5DE"
                },
                {
                  title: "Sophia's Tech Startup Expansion",
                  desc: "Cleared trade licensing and government nominations, obtaining investor residency and onboarding 12 developers smoothly.",
                  img: "https://cdn.prod.website-files.com/6777c6ca4cd4fd1a5c59b3bf/6788b40e0a99016e6627b505_case-02.avif",
                  bgInactive: "#E2EAD0"
                },
                {
                  title: "The Miller Family Relocation success",
                  desc: "Secured a 10-year Golden Visa for a retired corporate leader and facilitated immediate sponsorship for spouse and parents.",
                  img: "https://cdn.prod.website-files.com/6777c6ca4cd4fd1a5c59b3bf/6788ca451d9d1df1f7dca582_case-03.avif",
                  bgInactive: "#EBE5DE"
                }
              ].map((cs, idx) => {
                const isActive = activeCs === idx;
                return (
                  <div
                    key={idx}
                    onMouseEnter={() => setActiveCs(idx)}
                    className={`rounded-[36px] p-8 sm:p-10 flex flex-col justify-between transition-all duration-500 ease-in-out cursor-pointer overflow-hidden min-h-[350px] relative group ${
                      isActive 
                        ? 'lg:flex-[2.2]' 
                        : `lg:flex-1`
                    }`}
                    style={{ backgroundColor: isActive ? '#E6EAEC' : cs.bgInactive }}
                  >
                    {/* Background circles (always in DOM, change opacity/position for smooth animation) */}
                    <div className={`absolute bottom-6 right-6 w-24 h-24 bg-white/20 rounded-full pointer-events-none transition-all duration-500 ${
                      isActive ? 'opacity-0 translate-y-4 scale-75' : 'opacity-100 translate-y-0 scale-100'
                    }`} />
                    <div className={`absolute bottom-12 right-16 w-16 h-16 bg-white/20 rounded-full pointer-events-none transition-all duration-500 ${
                      isActive ? 'opacity-0 translate-y-4 scale-75' : 'opacity-100 translate-y-0 scale-100'
                    }`} />

                    <div className="flex flex-col md:flex-row gap-6 items-stretch w-full h-full justify-between">
                      {/* Left content block */}
                      <div className="space-y-4 flex flex-col justify-between h-full py-2 flex-grow">
                        <div className="space-y-2">
                          <h3 className="text-2xl font-semibold text-gray-900 leading-snug">
                            {cs.title}
                          </h3>
                          
                          {/* Description with height & opacity transition */}
                          <div className={`transition-all duration-500 ease-in-out overflow-hidden ${
                            isActive ? 'max-h-[120px] opacity-100 mt-2' : 'max-h-0 opacity-0 mt-0'
                          }`}>
                            <p className="text-sm text-gray-500 leading-relaxed font-light">
                              {cs.desc}
                            </p>
                          </div>
                        </div>

                        {/* Footer action button */}
                        <div className="flex items-center justify-between pt-6 w-full relative z-10 mt-auto">
                          <span className="text-xs font-bold text-gray-900">Read More</span>
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm transition-all duration-500 ${
                            isActive ? 'bg-[#6C141E]' : 'bg-white'
                          }`}>
                            <ArrowUpRight className={`w-4 h-4 transition-colors duration-500 ${
                              isActive ? 'text-white' : 'text-gray-700'
                            }`} />
                          </div>
                        </div>
                      </div>

                      {/* Right image block with width & opacity transition */}
                      <div className={`transition-all duration-500 ease-in-out overflow-hidden rounded-[28px] bg-gray-200 shrink-0 ${
                        isActive 
                          ? 'w-full md:w-[45%] opacity-100 scale-100 aspect-[4/3] md:aspect-auto md:h-[220px]' 
                          : 'w-0 h-0 opacity-0 scale-95 pointer-events-none'
                      }`}>
                        <img 
                          src={cs.img} 
                          alt={cs.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Other visas specialization */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 sm:px-12 space-y-10">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
              Other specialized visas we offer
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {otherVisas.map((v, idx) => (
                <Link 
                  to={`/services/visa/${v.id}`}
                  key={idx} 
                  className="group flex flex-col gap-4 cursor-pointer"
                >
                  <div className="w-full aspect-[4/3] rounded-[24px] overflow-hidden bg-gray-100 relative">
                    <img 
                      src={v.img} 
                      alt={v.title}
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                  </div>
                  
                  <div className="flex justify-between items-center px-1">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#6C141E] transition-colors duration-300">
                      {v.title}
                    </h3>
                    <span className="text-gray-400 group-hover:text-[#6C141E] transition-colors duration-300">
                      <ArrowUpRight className="w-5 h-5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ section */}
        <section className="py-16 sm:py-24 bg-gray-50 border-t border-gray-100">
          <div className="max-w-[1280px] mx-auto px-6 sm:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
              
              {/* FAQ Left Column */}
              <div className="lg:col-span-5 flex flex-col gap-4">
                <span className="text-[#6C141E] font-bold text-xs uppercase tracking-widest">// Clarity</span>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-950 leading-tight">
                  Frequently Asked Questions
                </h2>
                <p className="text-gray-500 text-sm leading-relaxed max-w-sm font-light">
                  Got questions about the {visa.title} requirements or processes? Find quick answers here.
                </p>
              </div>

              {/* FAQ Accordions Right Column */}
              <div className="lg:col-span-7 space-y-4">
                {faqsList.map((faq, idx) => {
                  const isOpen = activeFaq === idx;
                  return (
                    <div 
                      key={idx} 
                      className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-300"
                    >
                      <button
                        onClick={() => setActiveFaq(isOpen ? null : idx)}
                        className="w-full flex items-center justify-between p-6 cursor-pointer text-left group"
                      >
                        <span className="font-bold text-gray-900 group-hover:text-[#6C141E] transition-colors text-[15px] sm:text-base pr-4">
                          {faq.q}
                        </span>
                        <ChevronDown className={`w-5 h-5 text-gray-400 group-hover:text-[#6C141E] shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                      </button>
                      
                      <div 
                        className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-[200px] border-t border-gray-50' : 'max-h-0'}`}
                      >
                        <div className="p-6 bg-gray-50/50">
                          <p className="text-gray-600 text-sm sm:text-[15px] leading-relaxed font-light">
                            {faq.a}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>
        </section>

      </main>
    </>
  );
};
