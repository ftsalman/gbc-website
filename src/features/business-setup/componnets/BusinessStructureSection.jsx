import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Building2, Globe2, Briefcase, MapPin, ArrowRight } from "lucide-react";
import { Card } from "../../../../lib/turtle-ui/components";

const structures = [
  {
    id: 1,
    slug: "mainland-company",
    title: "Mainland Company",
    description:
      "Ideal for businesses looking to operate across the UAE with greater flexibility for local market activities and commercial growth.",
    icon: MapPin,
    image:
      "https://i.pinimg.com/736x/f1/84/bc/f184bc0ca4d01586a550fb753135d1ce.jpg",
  },
  {
    id: 2,
    slug: "freezone-company",
    title: "Free Zone Company",
    description:
      "A practical choice for startups, entrepreneurs and international businesses seeking a streamlined UAE company setup.",
    icon: Briefcase,
    image:
      "https://i.pinimg.com/736x/5f/c2/01/5fc201812932126c4d885c02446e2cfa.jpg",
  },
  {
    id: 3,
    slug: "offshore-company",
    title: "Offshore Company",
    description:
      "Suitable for businesses seeking an international corporate structure for specific overseas activities and holding purposes.",
    icon: Globe2,
    image:
      "https://i.pinimg.com/736x/80/1c/33/801c3372b516c3b4d268da24503d8e8b.jpg",
  },
  {
    id: 4,
    slug: "branch-office",
    title: "Branch Office",
    description:
      "Designed for established foreign companies looking to extend their existing business operations into the UAE.",
    icon: Building2,
    image:
      "https://i.pinimg.com/1200x/9a/75/b7/9a75b7ad361b56c869451ebac378b883.jpg",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export const BusinessStructureSection = () => {
  return (
    <section className="py-24 bg-white border-b  border-gray-200 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/4 -left-1/4 w-[50%] h-[50%] bg-bordeaux/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 -right-1/4 w-[50%] h-[50%] bg-bordeaux/5 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 max-w-7xl mx-auto gap-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-5xl font-medium text-bordeaux md:w-1/2 leading-tight tracking-tight"
          >
            Which UAE Business Structure <br className="hidden lg:block" />
            <span className="font-bold"> Is Right for You ?</span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:w-1/2 flex md:justify-end"
          >
            <p className="text-sm md:text-base text-gray-600 max-w-md font-light leading-relaxed">
              Every business has different goals. Compare the available UAE
              business structures and choose the option that best fits your
              activities, ownership requirements and growth plans.
            </p>
          </motion.div>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {structures.map((item) => (
            <motion.div
              key={item.id}
              variants={cardVariants}
              className="h-full"
            >
              <Link
                to={`/business-setup/${item.slug}`}
                className="block h-full cursor-pointer"
              >
                <Card className="group flex flex-col h-[400px] sm:h-[450px] p-6 sm:p-8 justify-between relative overflow-hidden border border-gray-200/20 rounded-2xl w-full !bg-clip-padding">
                  {/* Full Card Background Image & Overlay */}
                  <div className="absolute inset-0 z-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    {/* Gradient for text readability at the top, and slight darkening overall */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-black/30 transition-colors duration-500" />
                  </div>

                  {/* Top Content */}
                  <div className="z-10 relative">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-[15px] text-white/90 leading-relaxed max-w-[95%]">
                      {item.description}
                    </p>
                  </div>

                  {/* Bottom Right Arrow */}
                  <div className="relative z-10 flex justify-end w-full mt-auto">
                    <ArrowRight className="w-6 h-6 text-white group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
