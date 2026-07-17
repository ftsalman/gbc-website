import React, { useRef } from "react";
import { Button } from "../../../../../lib/turtle-ui/components/button/Button";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";

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
  { name: "Business Setup", number: "01" },
  { name: "PRO Services", number: "02" },
  { name: "Visa & Immigration", number: "03" },
  { name: "Trade License", number: "04" },
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
      src="/images/hero.jpeg"
      alt="Hero Left Section Background"
      className="absolute inset-0 w-full h-full object-cover object-left md:object-center pointer-events-none"
    />
    <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/60 pointer-events-none" />
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
      <div className="relative z-10 flex-1 flex flex-col justify-between px-6 sm:px-12 md:px-16 lg:px-20 pt-28 pb-16 min-h-screen overflow-hidden">
        {/* Hero Left Section Background using /images/hero.jpeg + Three.js Particles */}
        <HeroImageBackground />

        {/* Top Trust Badges Bar enhanced with Framer Motion */}
        <div className="hero-text flex items-center justify-start lg:justify-center gap-6 flex-wrap relative z-10 mb-auto opacity-0">
          <motion.div
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
          </motion.div>
          <div className="flex items-center gap-2 text-xs font-mono text-white/60">
            <span className="!text-white !text-[15px] !font-semibold">🇦🇪</span>
            <span className="!text-white !text-[15px] !font-semibold">
              Trusted by 5000+ Businesses in Dubai &amp; UAE
            </span>
          </div>
        </div>

        {/* Huge Stacked Headline & Subtitle aligned across the middle/right of the bloom matching exact Syncox Hero layout */}
        <div className="relative z-10 my-auto py-10 lg:pl-[20%] xl:pl-[26%] max-w-5xl">
          <h1 className="hero-text text-[52px] sm:text-[72px] md:text-[88px] lg:text-[100px] xl:text-[110px] font-medium tracking-tight leading-[0.92] text-white opacity-0">
            Business <br />
            Setup &amp; PRO <br />
            <span className="relative inline-block">
              Services
              <sup className="text-2xl sm:text-4xl lg:text-5xl font-light absolute -top-2 -right-5 sm:-top-4 sm:-right-8 text-white/90">
                ®
              </sup>
            </span>{" "}
            <br />
            <span className="text-white font-serif italic font-normal">
              in Dubai
            </span>
          </h1>

          <p className="hero-text text-white/80 text-sm sm:text-base md:text-lg max-w-md font-light leading-relaxed mt-8 lg:mt-10 opacity-0">
            From company formation to visas and PRO services, we handle
            everything so you can focus on growing your business.
          </p>

          {/* Call to Action Buttons enhanced with Framer Motion spring */}
          <div className="hero-buttons flex flex-wrap items-center gap-4 mt-8 opacity-0">
            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button variant="corner" size="md">
                Get Started Free
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button variant="corner" size="md">
                Talk to Our Expert
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Far Right Service Column exactly matching Syncox .hero-service-list */}
      <div className="hidden lg:flex flex-col w-64 xl:w-72 border-l border-white/10 bg-black/80 backdrop-blur-md z-10 shrink-0 min-h-screen">
        {servicesList.map((item) => (
          <motion.div
            key={item.number}
            whileHover={{ x: -6 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="hero-card flex-1 border-b border-white/10 relative flex flex-col justify-between p-6 xl:p-8 hover:bg-[#262626] transition-colors duration-300 group cursor-pointer opacity-0 overflow-hidden"
          >
            {/* Top Right Diagonal Arrow Icon matching Syncox .hero-service-list-item-icon */}
            <div className="w-full flex justify-end">
              <span className="text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 -translate-x-1 group-hover:translate-y-0 group-hover:translate-x-0">
                <ArrowUpRightIcon className="w-5 h-5 stroke-[1.5]" />
              </span>
            </div>

            {/* Bottom Bar: Service Name and Number matching Syncox .hero-service-list-item */}
            <div className="w-full flex items-end justify-between mt-auto">
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
