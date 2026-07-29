import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../../../../lib/turtle-ui/components/button/Button";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";

// Custom interactive expanding button matching the provided design
const InteractiveButton = ({ children, href, target, rel }) => {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className="group relative inline-flex items-center h-[52px] pl-[6px] pr-8 rounded-full cursor-pointer"
    >
      {/* Expanding Background */}
      <span className="absolute left-0 top-0 h-full w-[52px] bg-[#6C141E] rounded-full transition-all duration-500 ease-[cubic-bezier(0.5,1,0.89,1)] group-hover:w-full"></span>
      
      {/* Icon Container */}
      <span className="relative z-10 w-10 h-10 flex items-center justify-center bg-transparent rounded-full">
        {/* Short Chevron */}
        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 transition-all duration-500 absolute group-hover:opacity-0 group-hover:-translate-x-4 group-hover:scale-50">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
        {/* Long Arrow */}
        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 transition-all duration-500 absolute opacity-0 translate-x-4 scale-50 group-hover:opacity-100 group-hover:translate-x-0 group-hover:scale-100">
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </span>

      {/* Text */}
      <span className="relative z-10 ml-4 text-white font-semibold text-[13px] uppercase tracking-[0.1em] transition-colors duration-500">
        {children}
      </span>
    </a>
  );
};

// Helper components for icons to keep code clean
const GoogleIcon = () => (
  <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
);

const TrustpilotIcon = () => (
  <svg
    className="w-4 h-4 mr-1 text-[#00B67A]"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

const ArrowUpRightIcon = ({ className = "w-5 h-5" }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.75"
      d="M7 17L17 7M17 7H7M17 7V17"
    />
  </svg>
);

const servicesList = [
  {
    name: "Start a Business",
    number: "01",
    link: "/services/mainland",
    image:
      "https://i.pinimg.com/736x/68/b7/c7/68b7c734d24c35a65af05162d7616dc3.jpg",
  },
  {
    name: "Dedicated PRO Subscription",
    number: "02",
    link: "/services",
    image:
      "https://i.pinimg.com/736x/85/0e/7e/850e7ea08eca0d71666ddc3d37e7156c.jpg",
  },
  {
    name: "Visa & Immigration",
    number: "03",
    link: "/services",
    image:
      "https://i.pinimg.com/1200x/89/cb/73/89cb73854cadc9f8bb45b5f8bf55c71a.jpg",
  },
  {
    name: "Trade License",
    number: "04",
    link: "/services",
    image:
      "https://i.pinimg.com/736x/1b/21/64/1b2164703102ef91cfb7a182d0538d6d.jpg",
  },
];

// Interactive Three.js Floating Particles & Parallax Field overlaying the Hero Image
const HeroFloatingParticles = () => {
  const pointsRef = useRef();
  const groupRef = useRef();

  const spherePositions = React.useMemo(() => {
    const positions = new Float32Array(350 * 3);
    for (let i = 0; i < 350; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return positions;
  }, []);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.05;
      pointsRef.current.rotation.x += delta * 0.02;
    }
    if (groupRef.current) {
      // Smooth mouse parallax response
      const { x, y } = state.pointer;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        x * 0.15,
        0.05,
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -y * 0.15,
        0.05,
      );
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.6}>
        <Points
          ref={pointsRef}
          positions={spherePositions}
          stride={3}
          frustumCulled={false}
        >
          <PointMaterial
            transparent
            color="#6C141E"
            size={0.06}
            sizeAttenuation={true}
            depthWrite={false}
            opacity={0.65}
          />
        </Points>
      </Float>
      <ambientLight intensity={1.2} />
      <pointLight position={[5, 5, 5]} intensity={3} color="#A32332" />
    </group>
  );
};

const HeroImageBackground = () => (
  <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
    <img
      src="/images/hero_business_handshake.png"
      alt="Hero Left Section Background"
      className="absolute inset-0 w-full h-full object-cover object-left md:object-center pointer-events-none"
    />
    <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent pointer-events-none" />
    {/* Three.js Interactive Floating Particles Layer */}
    <div className="absolute inset-0 z-10 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 6], fov: 60 }}>
        <HeroFloatingParticles />
      </Canvas>
    </div>
  </div>
);

export const Hero = () => {
  const containerRef = useRef(null);
  const navigate = useNavigate();

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // Stagger text and elements in exactly like reference layout
      tl.fromTo(
        ".hero-text",
        { y: 35, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.15 },
      );

      tl.fromTo(
        ".hero-buttons",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.7",
      );

      tl.fromTo(
        ".hero-card",
        { x: 30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.9, stagger: 0.12 },
        "-=0.8",
      );
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen bg-black text-white overflow-x-clip flex flex-col lg:flex-row border-t border-b border-white/10 font-sans"
    >
      {/* Light Borders: Vertical Grid Lines across screen sitting above hero bg (z-20) */}
      <div className="absolute inset-0 pointer-events-none z-20 flex w-full h-full">
        <div className="flex-1 border-r border-white/10 h-full" />
        <div className="flex-1 border-r border-white/10 h-full" />
        <div className="flex-1 border-r border-white/10 h-full" />
        <div className="flex-1 border-r border-white/10 h-full hidden md:block" />
        <div className="w-64 xl:w-72 border-l border-white/10 h-full hidden lg:block shrink-0 ml-auto" />
      </div>

      {/* Main Left / Center Area (With Hero Background Image & Three.js Overlay matching Syncox .hero-title-block) */}
      <div className="relative z-10 flex-1 flex flex-col justify-between px-6 sm:px-12 md:px-16 lg:px-20 pt-28 pb-10 min-h-screen overflow-hidden">
        {/* Hero Left Section Background using /images/hero.jpeg + Three.js Particles */}
        <HeroImageBackground />

        {/* Top Trust Badges Bar enhanced with Framer Motion */}
        <div className="hero-text flex items-center justify-start gap-6 flex-wrap relative z-10 mb-auto opacity-0">
          {/* <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="flex items-center text-sm font-medium text-white/80 bg-white/[0.06] border border-white/10 px-4 py-1.5 rounded-full backdrop-blur-md cursor-pointer"
          >
            <GoogleIcon /> 4.6 Google
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="flex items-center text-sm font-medium text-white/80 bg-white/[0.06] border border-white/10 px-4 py-1.5 rounded-full backdrop-blur-md cursor-pointer"
          >
            <TrustpilotIcon /> 4.9 Trustpilot
          </motion.div> */}
          <div className="flex items-center gap-2.5 text-xs font-mono text-white/60">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 600" className="w-5 h-auto rounded-[1px] shadow-sm">
              <rect width="1200" height="600" fill="#00732f"/>
              <rect width="1200" height="200" y="200" fill="#fff"/>
              <rect width="1200" height="200" y="400" fill="#000"/>
              <rect width="300" height="600" fill="#ff0000"/>
            </svg>
            <span className="!text-white !text-[15px] !font-semibold">
              Trusted by 1,000+ Businesses Across the &amp; UAE Since 2010
            </span>
          </div>
        </div>

        {/* Huge Stacked Headline & Subtitle aligned across the middle/right of the bloom matching exact Syncox Hero layout */}
        <div className="relative z-10 my-auto py-10 max-w-5xl">
          <h1 className="hero-text text-[52px] sm:text-[72px] md:text-[88px] lg:text-[100px] xl:text-[100px] font-semibold tracking-tight leading-[1.05] text-white opacity-0 max-w-4xl">
            Business Setup &amp; PRO <span className="relative inline-block">Services</span> <br />
            <span className="text-white font-serif italic font-normal">
              in Dubai
            </span>
          </h1>

          <p className="hero-text text-white/80 text-sm sm:text-base md:text-3xl max-w-xl font-light leading-relaxed mt-8 lg:mt-10 opacity-0">
            From company formation to visas and PRO services, we handle
            everything so you can focus on growing your business.
          </p>

          {/* Call to Action Buttons enhanced with custom interactive design */}
          <div className="hero-buttons flex flex-wrap items-center gap-6 mt-10 opacity-0 relative z-50">
            <InteractiveButton href="https://wa.me/971585277775" target="_blank" rel="noopener noreferrer">
              Get Free Consultation
            </InteractiveButton>
            
            <InteractiveButton href="https://wa.me/971585277775" target="_blank" rel="noopener noreferrer">
              Talk to an Expert
            </InteractiveButton>
          </div>
        </div>
      </div>

      {/* Far Right Service Column exactly matching Syncox .hero-service-list */}
      <div className="hidden lg:flex flex-col w-64 xl:w-72 border-l border-white/10 bg-black/80 backdrop-blur-md z-10 shrink-0 min-h-screen">
        {servicesList.map((item) => (
          <motion.div
            key={item.number}
            onClick={() => navigate(item.link)}
            whileHover={{ x: -6 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="hero-card flex-1 border-b border-white/10 relative flex flex-col justify-between p-6 xl:p-8 bg-black transition-colors duration-300 group cursor-pointer opacity-0 overflow-hidden"
          >
            {/* Background Image Layer (permanent) - increased base opacity so images are brighter */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50 group-hover:opacity-90 transition-all duration-700 z-0 group-hover:scale-110"
              style={{ backgroundImage: `url(${item.image})` }}
            />

            {/* Soft gradient overlay just at the bottom to ensure the white text always pops */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-0 pointer-events-none" />

            {/* Top Right Diagonal Arrow Icon matching Syncox .hero-service-list-item-icon */}
            <div className="w-full flex justify-end relative z-10">
              <span className="text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 -translate-x-1 group-hover:translate-y-0 group-hover:translate-x-0">
                <ArrowUpRightIcon className="w-5 h-5 stroke-[1.5]" />
              </span>
            </div>

            {/* Bottom Bar: Service Name and Number matching Syncox .hero-service-list-item */}
            <div className="w-full flex items-end justify-between mt-auto relative z-10">
              <span className="text-white/90 group-hover:text-white font-medium text-lg xl:text-xl transition-colors">
                {item.name}
              </span>
              <span className="text-white/80 group-hover:text-white font-mono text-base xl:text-lg transition-colors">
                {item.number}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
