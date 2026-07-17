export const navItems = [
  "About",
  "Packages",
  "Business Setup",
  "Services",
  "Blogs",
  "Contact",
];

export const megaMenuData = {
  "Business Setup": {
    col1: {
      title: "Explore Setup",
      items: [
        { name: "Explore All Setup Options", big: true, href: "/business-setup" },
        { name: "Mainland Company", big: true, href: "/business-setup" },
        { name: "Freezone Company", big: true, href: "/business-setup" },
        { name: "Offshore Company", big: true, href: "/business-setup" },
        { name: "Compare Options", big: false, href: "/business-setup" },
        { name: "Why Setup in UAE", big: false, href: "/about" },
      ],
    },
    col2: {
      title: "Shop Setup",
      items: [
        { name: "View Packages", big: false, href: "/business-setup" },
        { name: "Trade Licenses", big: false, href: "/business-setup" },
        { name: "Visa Services", big: false, href: "/services" },
        { name: "Ways to Buy", big: false, href: "/business-setup" },
        { name: "Personal Setup", big: false, href: "/business-setup" },
      ],
    },
    col3: {
      title: "More from Setup",
      items: [
        { name: "Setup Support", big: false, href: "/contact" },
        { name: "Business Care", big: false, href: "/services" },
        { name: "Laws & Regulations", big: false, href: "/blogs" },
        { name: "Corporate Tax", big: false, href: "/services" },
        { name: "Banking Partners", big: false, href: "/about" },
      ],
    },
  },
  "Services": {
    col1: {
      title: "Explore Services",
      items: [
        { name: "Explore All Services", big: true, href: "/services" },
        { name: "Accounting & Bookkeeping", big: true, href: "/services" },
        { name: "PRO Services", big: true, href: "/services" },
        { name: "Legal Consulting", big: true, href: "/services" },
        { name: "Compare Services", big: false, href: "/services" },
        { name: "Why Choose Us", big: false, href: "/about" },
      ],
    },
    col2: {
      title: "Get Services",
      items: [
        { name: "Book a Consultation", big: false, href: "/contact" },
        { name: "Monthly Packages", big: false, href: "/services" },
        { name: "One-time Services", big: false, href: "/services" },
        { name: "Service Pricing", big: false, href: "/services" },
      ],
    },
    col3: {
      title: "More from Services",
      items: [
        { name: "Client Support", big: false, href: "/contact" },
        { name: "Service SLA", big: false, href: "/services" },
        { name: "Client Portal", big: false, href: "/contact" },
        { name: "Success Stories", big: false, href: "/blogs" },
        { name: "Resources", big: false, href: "/blogs" },
      ],
    },
  },
};
