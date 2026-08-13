export const SHOWCASE_DATA = [
  {
    tab: "Mainland",
    title: "Mainland Setup",
    description:
      "Trade anywhere in the UAE and internationally without restrictions.",
    uiType: "mainland",
    image:
      "https://i.pinimg.com/1200x/66/bc/8e/66bc8ea46268f6d436f41e33796c7a44.jpg",
  },
  {
    tab: "Freezone",
    title: "Freezone Setup",
    description: "100% foreign ownership and zero tax for your global startup.",
    uiType: "freezone",
    image:
      "https://i.pinimg.com/1200x/76/ef/41/76ef416ee33a1b27a7ed9de4881aaa24.jpg",
  },
  {
    tab: "Offshore",
    title: "Offshore Setup",
    description: "Protect your assets and enjoy international tax benefits.",
    uiType: "offshore",
    image:
      "https://i.pinimg.com/1200x/be/23/8b/be238bbf37247de8675dc7610168b19f.jpg",
  },

];

export const VISA_TYPES = [
  {
    id: "business-visa",
    title: "Business visa",
    img: "https://i.pinimg.com/1200x/7e/73/e2/7e73e236cb87e4b74cf2b60e49fc5052.jpg",
    overview:
      "The UAE Business Visa is designed for professionals and entrepreneurs looking to establish business ties, attend meetings, or explore corporate opportunities within the Emirates.",
    requirements: [
      "Valid passport with at least 6 months validity",
      "Invitation letter from a UAE registered company (if applicable)",
      "Proof of business ownership or employment letter",
      "Recent passport-sized photographs",
    ],
    benefits: [
      "Multiple entry options available",
      "Seamless business exploration",
      "Fast-track processing times",
    ],
    approach: [
      { step: "01", title: "Business Profile Review", desc: "We evaluate your professional credentials, business plans, or trade license structure to choose the best business entry pathway." },
      { step: "02", title: "Documentation & Local Clearances", desc: "We draft and legalize corporate resolutions, board decisions, and local sponsor or partnership agreements." },
      { step: "03", title: "Entry Permit & Corporate Onboarding", desc: "We secure your residency permit and guide you through local business registration and banking setups." }
    ],
    faqs: [
      { q: "Can I open a corporate bank account with a business visa?", a: "Yes, once you secure your residency under the business visa pathway, GBC will assist you in opening corporate bank accounts with leading local banks." },
      { q: "What is the typical processing time?", a: "The processing time is approximately 10 to 15 business days depending on government approvals and security clearances." }
    ]
  },
  {
    id: "student-visa",
    title: "Student visa",
    img: "https://i.pinimg.com/736x/2d/bb/e7/2dbbe7e798da52e3e44b055c88fec1ee.jpg",
    overview:
      "Designed for international students accepted into UAE educational institutions, providing legal residency for the duration of their academic programs.",
    requirements: [
      "Official admission letter from a UAE university",
      "Medical fitness certificate",
      "Proof of tuition fee payment",
      "Passport and passport-sized photographs",
    ],
    benefits: [
      "Sponsorship by the university",
      "Opportunities for part-time internships",
      "Valid for 1 year, renewable annually",
    ],
    approach: [
      { step: "01", title: "School Admission & Verification", desc: "We review your university acceptance letter and ensure your course program aligns with UAE ICP residency regulations." },
      { step: "02", title: "Document Legalization & Attestation", desc: "Our team handles fast-track attestation of your high school or university transcripts and medical fitness screening." },
      { step: "03", title: "Visa Issuance & Emirates ID", desc: "We submit the residency application, coordinate the entry permit, and deliver your new student visa and Emirates ID." }
    ],
    faqs: [
      { q: "How long is the UAE Student Visa valid?", a: "A student visa is typically issued for 1 year and is renewable annually based on official academic confirmation and registration status." },
      { q: "Can international students work part-time in the UAE?", a: "Yes, students can take on internships or part-time employment provided they obtain a No Objection Certificate (NOC) from their university and a work permit from MOHRE." },
      { q: "Do I need to undergo medical screening?", a: "Yes, all applicants over the age of 18 must pass a medical fitness test (blood test and chest X-ray) to qualify for residency." }
    ]
  },
  {
    id: "tourist-visa",
    title: "Tourist visa",
    img: "https://i.pinimg.com/736x/ab/8f/d7/ab8fd76740ce542e853b1edaf5b5697f.jpg",
    overview:
      "Experience the luxury and culture of the UAE. The tourist visa allows individuals to visit the country for leisure, tourism, and visiting family.",
    requirements: [
      "Valid passport with at least 6 months validity",
      "Confirmed return flight ticket",
      "Proof of accommodation (hotel booking)",
      "Recent passport-sized photograph",
    ],
    benefits: [
      "Single and multiple entry options (30 to 60 days)",
      "Quick processing within 48-72 hours",
      "Extendable from within the country",
    ],
    approach: [
      { step: "01", title: "Travel Profile Assessment", desc: "We verify your nationality's entry requirements and flight routes to choose the ideal visa duration (30 or 60 days)." },
      { step: "02", title: "Submission & Pre-Approval", desc: "We submit the tourist entry applications directly to the ICP system for rapid pre-approval." },
      { step: "03", title: "Visa Delivery & Entry Guide", desc: "We deliver your tourist e-visa via email along with standard entry guides and options for extensions." }
    ],
    faqs: [
      { q: "Can I extend my UAE tourist visa from inside the country?", a: "Yes, tourist visas can be extended inside the UAE for additional periods without exiting, subject to local immigration approval fees." },
      { q: "How fast is the tourist visa processed?", a: "Standard applications take 24 to 72 hours, while express pathways can issue entry approvals in under 12 hours." }
    ]
  },
  {
    id: "golden-visa",
    title: "Golden visa",
    img: "https://i.pinimg.com/1200x/fc/44/da/fc44da85b396a3441f6e8071c577ca96.jpg",
    overview:
      "A long-term residency program aimed at retaining exceptional talent, investors, entrepreneurs, and outstanding students without the need for a local sponsor.",
    requirements: [
      "Proof of investment (AED 2 Million+) OR",
      "Approval from relevant ministry for specialized talents",
      "Outstanding academic records for students",
      "Comprehensive health insurance",
    ],
    benefits: [
      "10-year renewable residency",
      "No national sponsor required",
      "Ability to sponsor family members and domestic staff",
    ],
    approach: [
      { step: "01", title: "Nomination & Eligibility Review", desc: "We evaluate your category (investor, exceptional talent, scientist, etc.) and submit for government nomination." },
      { step: "02", title: "Investment setup or validation", desc: "We coordinate with land departments, creative councils, or relevant ministries to validate your Golden Visa criteria." },
      { step: "03", title: "Long-term Residency Issuance", desc: "Upon approval, we complete the medical fitness test, cancel your old visa status, and issue the 10-year residency visa." }
    ],
    faqs: [
      { q: "Do I need a local sponsor for the Golden Visa?", a: "No, the UAE Golden Visa offers 100% self-sponsored residency, meaning you do not require a local employer or sponsor." },
      { q: "Can I sponsor my family members and domestic staff?", a: "Yes, Golden Visa holders can sponsor their spouses, children of any age, and domestic helpers with no cap on the number of staff." },
      { q: "Can I stay outside the UAE for more than 6 months?", a: "Yes, unlike normal residency visas, Golden Visa holders can remain outside the UAE for any period without losing their residency status." }
    ]
  },
  {
    id: "investor-visa",
    title: "Investor visa",
    img: "https://i.pinimg.com/736x/82/e0/5b/82e05b5800020581e961d7704d28ce13.jpg",
    overview:
      "Ideal for foreign nationals establishing or investing in a UAE mainland or free zone business, granting residency and the ability to operate the company.",
    requirements: [
      "Trade license copy",
      "Memorandum of Association (MOA)",
      "Immigration establishment card",
      "Medical fitness test and Emirates ID application",
    ],
    benefits: [
      "Valid for up to 3 years",
      "Pathway to Golden Visa eligibility",
      "Ability to open corporate bank accounts",
    ],
    approach: [
      { step: "01", title: "Corporate License Alignment", desc: "We align your trade license, MOA, and establishment card details with investor visa guidelines." },
      { step: "02", title: "Entry Permit & Security Clearance", desc: "We apply for your investor entry permit and clear local security verification processes." },
      { step: "03", title: "Emirates ID & Visa Stamping", desc: "We schedule your VIP medical test and biometrics to finalize your 3-year investor residency." }
    ],
    faqs: [
      { q: "Is the investor visa renewable?", a: "Yes, the visa is renewable every 2 to 3 years as long as the underlying trade license and business registrations remain active." },
      { q: "Does the investor visa allow family sponsorship?", a: "Yes, you can sponsor your immediate family (spouse, daughters, and sons) under your investor residency code." }
    ]
  },
  {
    id: "employment-visa",
    title: "Employment visa",
    img: "https://i.pinimg.com/736x/c1/9e/8c/c19e8c264bdb02463f66c04e3bf97204.jpg",
    overview:
      "The standard work visa for foreign nationals employed by a UAE-registered company. Sponsored directly by the employer.",
    requirements: [
      "MOHRE employment contract",
      "Educational certificates (attested)",
      "Medical fitness certificate",
      "Valid passport",
    ],
    benefits: [
      "Valid for 1 to 2 years",
      "Full labor rights under UAE law",
      "Ability to sponsor spouse and children",
    ],
    approach: [
      { step: "01", title: "Offer Letter Submission", desc: "We submit the ministry-approved MOHRE offer letter to initiate the labor quota check." },
      { step: "02", title: "Quota & Work Permit Issuance", desc: "We secure approval for the quota, issue the work entry permit, and handle in-country status adjustments." },
      { step: "03", title: "Labor Card & Residence Stamping", desc: "We finalize the corporate labor contract, complete medical tests, and secure the residence visa." }
    ],
    faqs: [
      { q: "Who pays for the employment visa costs?", a: "Under UAE labor law, the employing company is legally responsible for all visa recruitment and processing expenses." },
      { q: "What is the age limit for sponsorship?", a: "Standard employment permits can be issued for individuals up to 60 years old (subject to special approvals for older employees)." }
    ]
  },
  {
    id: "family-visa",
    title: "Family visa",
    img: "https://i.pinimg.com/736x/83/df/24/83df247728877fdf84b2a3545bb4a55d.jpg",
    overview:
      "Allows UAE residents to sponsor their immediate family members (spouse, children, and parents) to live with them in the UAE.",
    requirements: [
      "Minimum salary requirement of AED 4,000",
      "Attested marriage and birth certificates",
      "Registered Ejari (tenancy contract)",
      "Sponsor's valid Emirates ID and passport",
    ],
    benefits: [
      "Keeps families together in the UAE",
      "Linked to the sponsor's visa validity",
      "Straightforward renewal process",
    ],
    approach: [
      { step: "01", title: "Sponsor Document Verification", desc: "We verify the sponsor's salary certificate, Ejari tenancy contract, and utility bills for compliance." },
      { step: "02", title: "Certificate Legalization", desc: "We coordinate local Ministry of Foreign Affairs (MOFA) attestation for marriage and birth certificates." },
      { step: "03", title: "Family Visa Issuance", desc: "We apply for the family entry permits, coordinate the medical tests for dependents over 18, and stamp the visas." }
    ],
    faqs: [
      { q: "Can a mother sponsor her children in the UAE?", a: "Yes, a mother can sponsor her children under specific conditions, including holding a valid profession and meeting salary requirements." },
      { q: "How long can dependents stay outside the UAE?", a: "Dependents must not remain outside the UAE for more than 6 consecutive months, or their visas will be cancelled automatically." }
    ]
  },
  {
    id: "freelance-visa",
    title: "Freelance visa",
    img: "https://i.pinimg.com/1200x/06/51/78/065178b2b64a94b46bc4e0157c1afd13.jpg",
    overview:
      "A flexible permit allowing independent professionals in media, education, and tech to work legally as freelancers in the UAE.",
    requirements: [
      "Portfolio of previous work",
      "Relevant educational degree",
      "Freelance permit from a relevant Free Zone authority",
      "Medical fitness and Emirates ID",
    ],
    benefits: [
      "Work independently without an employer",
      "Valid for 1 to 3 years",
      "Access to premium co-working spaces",
    ],
    approach: [
      { step: "01", title: "Freelance Permit Acquisition", desc: "We register your credentials with chosen Free Zone authorities (such as Gofreelance or AXS) to obtain the permit." },
      { step: "02", title: "Establishment Card Creation", desc: "We create your personal establishment card, allowing you to sponsor your own residency permit." },
      { step: "03", title: "Residency Stamping & ID Delivery", desc: "We coordinate your medical test, process the biometrics, and deliver your freelance Emirates ID." }
    ],
    faqs: [
      { q: "Do I need a physical office space for a freelance visa?", a: "No, freelance visas do not require physical offices. You can access hot-desks and shared co-working spaces included in the permit package." },
      { q: "Can I open a personal bank account as a freelancer?", a: "Yes, with your freelance residency visa and permit, you can open personal and business accounts at local UAE banks." }
    ]
  },
  {
    id: "remote-work-visa",
    title: "Remote work visa",
    img: "https://i.pinimg.com/736x/85/2a/92/852a9265934e3b3a15580373019a6155.jpg",
    overview:
      "A 1-year virtual working program allowing remote workers and digital nomads to live in the UAE while working for their overseas employer.",
    requirements: [
      "Proof of employment outside the UAE",
      "Minimum monthly income of $3,500",
      "Valid health insurance covering the UAE",
      "Passport valid for at least 6 months",
    ],
    benefits: [
      "Live in Dubai tax-free",
      "Access to standard resident services (banking, housing)",
      "No local sponsorship required",
    ],
    approach: [
      { step: "01", title: "Nomad Income Verification", desc: "We verify your salary receipts, overseas employment contracts, or company bank statements for the monthly threshold." },
      { step: "02", title: "ICP Portal Entry Submission", desc: "We process the application directly on the virtual working portal of the Federal Authority for Identity & Citizenship (ICP)." },
      { step: "03", title: "Nomad ID Issuance", desc: "We complete the fast-track medical fitness test, register biometrics, and deliver your remote residency Emirates ID." }
    ],
    faqs: [
      { q: "Is the remote work visa extendable?", a: "Yes, you can apply to renew the virtual work visa annually by submitting fresh proof of remote income and employment." },
      { q: "Do I pay personal income tax in the UAE on my remote salary?", a: "No, the UAE does not levy personal income tax on salaries earned from remote work." }
    ]
  },
];

export const BUSINESS_CENTER_SPACES = [
  {
    id: "private-executive-offices",
    title: "Private Executive Offices",
    img: "https://i.pinimg.com/control1/1200x/c5/34/f4/c534f425ffa6a5422b9af5dede912223.jpg",
    overview: "Fully furnished, Ejari-compliant private offices tailored for individuals and teams. Enjoy absolute privacy with luxury fittings in Dubai's prestigious districts.",
    requirements: [
      "Trade license copy",
      "Emirates ID of manager",
      "Passport copy of company owner"
    ],
    benefits: [
      "24/7 access to office suite",
      "Complimentary boardroom hours",
      "Dedicated high-speed Wi-Fi and phone line",
      "Professional reception services"
    ],
    approach: [
      { step: "01", title: "Requirements Alignment", desc: "We determine your team size, spatial requirements, and choice of location in Dubai." },
      { step: "02", title: "Viewing & Agreement", desc: "We schedule a physical or virtual viewing, finalize the lease terms, and draft the contract." },
      { step: "03", title: "Ejari Registration & Handover", desc: "We issue your tenancy contract, register it on the Dubai REST app for Ejari, and hand over the keys." }
    ],
    faqs: [
      { q: "Are utility bills included in the monthly lease?", a: "Yes, high-speed internet, electricity, AC, and water utility bills are fully included in the transparent rental pricing." },
      { q: "Can GBC assist with Ejari registration?", a: "Yes, we handle the entire Ejari registration process so you can easily obtain or renew your DED trade license." }
    ]
  },
  {
    id: "co-working-spaces",
    title: "Co-working Spaces",
    img: "https://i.pinimg.com/736x/08/1a/a2/081aa2caebb3fc988999e826e6c947d5.jpg",
    overview: "Flexible hot desking and dedicated desk solutions designed to foster networking, collaboration, and high productivity.",
    requirements: [
      "Emirates ID or Passport copy",
      "Company registration (if applicable)"
    ],
    benefits: [
      "High-speed shared Wi-Fi connection",
      "Access to modern shared printing hubs",
      "Free gourmet coffee and tea in lounges",
      "Access to business center networking events"
    ],
    approach: [
      { step: "01", title: "Choose Plan", desc: "Select from flexible daily passes, hot-desking memberships, or permanent dedicated desks." },
      { step: "02", title: "Onboarding & Access Card", desc: "We register your details, set up your Wi-Fi credentials, and hand over your lounge access card." },
      { step: "03", title: "Start Working", desc: "Check-in at any time, plug in your laptop, and enjoy our premium co-working ecosystem." }
    ],
    faqs: [
      { q: "Do co-working spaces include meeting room access?", a: "Yes, members receive dedicated complimentary hours each month for booking meeting rooms and private call booths." },
      { q: "Can I use the business address on my license?", a: "No, standard co-working hot desking does not include license address privileges. For license registration, we recommend our Private Office or Virtual Office packages." }
    ]
  },
  {
    id: "virtual-offices",
    title: "Virtual Offices",
    img: "https://i.pinimg.com/1200x/cf/bf/88/cfbf883733bdeb47f7a15614361db074.jpg",
    overview: "Establish a prestigious corporate presence in Dubai without the cost of leasing a physical office. Includes business address, mail handling, and phone routing.",
    requirements: [
      "Trade license copy (new/renewal draft)",
      "Passport & Emirates ID of company shareholders"
    ],
    benefits: [
      "Ejari-compliant tenancy contract available",
      "Premium business address in Dubai's key commercial zones",
      "Professional telephone answering and call forwarding",
      "Mail collection, scanning, and secure forwarding"
    ],
    approach: [
      { step: "01", title: "Address & Contract Selection", desc: "We select the most prestigious corporate address suitable for your DED licensing requirements." },
      { step: "02", title: "Contract Drafting & Payment", desc: "We compile the virtual tenancy agreement and complete the initial setup fee transactions." },
      { step: "03", title: "Ejari Issuance & Mail Settings", desc: "We register your Ejari and activate your dedicated phone number and email routing portal." }
    ],
    faqs: [
      { q: "Can I open a bank account with a virtual office?", a: "Yes, GBC's virtual office addresses are highly recognized and accepted by UAE corporate banks, and we provide supporting tenancy documents." },
      { q: "Can I upgrade to a physical private office later?", a: "Yes, you can upgrade your package at any time, and GBC will assist you in modifying your license registry with DED." }
    ]
  },
  {
    id: "meeting-boardrooms",
    title: "Meeting & Boardrooms",
    img: "https://i.pinimg.com/1200x/e5/b8/c9/e5b8c98693743150f89899bff0d24500.jpg",
    overview: "Fully equipped boardroom spaces with smart projection systems, high-speed Wi-Fi, and luxury seating. Perfect for pitches, interviews, and corporate workshops.",
    requirements: [
      "Meeting date & time preference",
      "Audio-visual hardware requirements",
      "Catering requirements (if any)"
    ],
    benefits: [
      "Interactive smartboards and ultra-HD projection displays",
      "Premium video conferencing equipment (polycom/zoom rooms)",
      "High-speed secure guest internet access",
      "On-site technical support during your session"
    ],
    approach: [
      { step: "01", title: "Room Booking", desc: "Submit your booking inquiry indicating the attendee headcount and your technical equipment needs." },
      { step: "02", title: "Technical Pre-Configuration", desc: "Our team prepares the audio-visual hardware, whiteboards, and custom seating layout." },
      { step: "03", title: "Host & Execute", desc: "Welcome your clients at the reception, start your presentation, and enjoy our premium meeting services." }
    ],
    faqs: [
      { q: "Can non-members book meeting rooms?", a: "Yes, non-members can book boardrooms on an hourly or daily rate, subject to availability." },
      { q: "Is support staff available during meetings?", a: "Yes, our dedicated reception and IT teams are on-site to assist with client check-ins and video conferencing setups." }
    ]
  }
];

export const MAINLAND_PROCESS_STEPS = [
  {
    id: "activity-trade-name-approval",
    title: "Activity & Trade Name Approval",
    img: "https://i.pinimg.com/736x/c2/09/08/c209085321637c55c49a17776ca95156.jpg",
    overview: "Select the precise business activities permitted by the Department of Economic Development (DED) and secure your initial trade name approval within 24 hours.",
    requirements: [
      "Preferred trade name options (at least 3)",
      "List of desired business activities",
      "Passport copies of all shareholders"
    ],
    benefits: [
      "Trade name reservation valid for 6 months",
      "Initial approval certificate issued in 24 hours",
      "Legally recognized activity categorization"
    ],
    approach: [
      { step: "01", title: "Activity Mapping", desc: "We cross-reference your business plans with the official DED activity registry to select compatible licenses." },
      { step: "02", title: "Name Feasibility Check", desc: "We check your preferred trade names against the DED database for availability and guidelines compliance." },
      { step: "03", title: "Portal Submission", desc: "We submit the trade name registration and initial approval requests through the DED investor portal." }
    ],
    faqs: [
      { q: "Are there restrictions on choosing a trade name?", a: "Yes, names cannot contain offensive language, reference Allah, or use pre-registered corporate brands without permission." },
      { q: "How many business activities can I add to one license?", a: "Typically, you can add up to 10 compatible activities under a single license group without extra charges." }
    ]
  },
  {
    id: "drafting-moa-lsa-agreement",
    title: "Drafting MoA & LSA Agreement",
    img: "https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=1000&auto=format&fit=crop",
    overview: "Draft a robust Memorandum of Association (MoA) or a Local Service Agent (LSA) agreement depending on your license type, ensuring your rights are fully protected.",
    requirements: [
      "Initial DED approval certificate",
      "Details of profit-sharing ratios",
      "Shareholder passport and Emirates ID details"
    ],
    benefits: [
      "Legally certified MoA/LSA agreement",
      "Attestation from Dubai courts notary public",
      "Fully protected corporate liability clauses"
    ],
    approach: [
      { step: "01", title: "Agreement Drafting", desc: "Our legal counselors draft custom terms regarding shareholding structure and operational rights." },
      { step: "02", title: "Notary Coordination", desc: "We schedule and accompany you to the Dubai Courts notary public for electronic signing." },
      { step: "03", title: "Legalization & Upload", desc: "We upload the notarized MoA or LSA agreement into the DED registration database for final license processing." }
    ],
    faqs: [
      { q: "What is the difference between MoA and LSA?", a: "A Memorandum of Association (MoA) is required for Limited Liability Companies (LLCs), while a Local Service Agent (LSA) agreement is used for professional sole proprietorships." },
      { q: "Can the MoA be notarized digitally?", a: "Yes, GBC coordinates digital notary signings through the Dubai Court system for remote investors." }
    ]
  },
  {
    id: "office-space-ejari",
    title: "Office Space & Ejari",
    img: "https://i.pinimg.com/736x/08/1a/a2/081aa2caebb3fc988999e826e6c947d5.jpg",
    overview: "Mainland businesses require a physical address. We assist in finding the perfect office or retail space, signing the lease, and registering it through the Ejari system.",
    requirements: [
      "Tenancy contract signed by landlord and tenant",
      "Landlord's title deed copy",
      "Company trade license or initial approval"
    ],
    benefits: [
      "Ejari certificate issued in 24 hours",
      "DED compliant office space verification",
      "Eligible for staff visa quotas based on office size"
    ],
    approach: [
      { step: "01", title: "Workspace Sourcing", desc: "We match you with DED-approved business centers or standalone commercial offices." },
      { step: "02", title: "Lease Review & Execution", desc: "We review lease terms regarding maintenance, utility coverage, and Ejari privileges." },
      { step: "03", title: "Ejari Registration", desc: "We submit tenancy documents to the Land Department portal to receive the official Ejari certificate." }
    ],
    faqs: [
      { q: "Is a physical office mandatory for a mainland license?", a: "Yes, mainland licenses require a physical address, but GBC can arrange virtual office or desk-sharing alternatives for startup stages." },
      { q: "How does office size affect visa quotas?", a: "Generally, every 9 square meters of physical office space allows the company to sponsor 1 employee visa." }
    ]
  },
  {
    id: "final-license-issuance-visas",
    title: "Final License Issuance & Visas",
    img: "https://i.pinimg.com/736x/85/0e/7e/850e7ea08eca0d71666ddc3d37e7156c.jpg",
    overview: "After submitting all documents to the DED, your trade license is issued. We then proceed with establishing your establishment card, investor visas, and corporate bank accounts.",
    requirements: [
      "Ejari certificate and notarized MoA",
      "DED payment voucher clearing proof",
      "Passport and medical fitness certificates of applicants"
    ],
    benefits: [
      "Official DED Corporate Trade License",
      "Establishment card allowing employee visa sponsorship",
      "Corporate bank account opening assistance"
    ],
    approach: [
      { step: "01", title: "License Issuance", desc: "We submit all final dossiers to DED, clear the government payment vouchers, and retrieve the license." },
      { step: "02", title: "Establishment Card & Portal Activation", desc: "We register your company with Immigration (GDRFA) and the Ministry of Human Resources (MOHRE)." },
      { step: "03", title: "Visa Stamping & Banking Setup", desc: "We process partner/investor residency visas and coordinate introductions to corporate bankers." }
    ],
    faqs: [
      { q: "How long is the mainland trade license valid?", a: "Mainland trade licenses are valid for 1 year and must be renewed annually." },
      { q: "Can GBC manage the annual renewal process?", a: "Yes, GBC Corporate offers complete corporate maintenance packages to handle your annual license renewals and visa updates." }
    ]
  }
];


