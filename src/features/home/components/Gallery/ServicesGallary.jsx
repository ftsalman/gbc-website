import React, { useRef, useMemo, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Realistic website template images from Unsplash to look like Squarespace examples
const baseImages = [
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop", // coding/laptop
  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop", // coding/laptop
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop", // analytics/website
  "https://images.unsplash.com/photo-1481481600450-84351bf16252?q=80&w=800&auto=format&fit=crop", // desk/clean
  "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=800&auto=format&fit=crop", // minimal desk
  "https://images.unsplash.com/photo-1487014679447-9f8336841d58?q=80&w=800&auto=format&fit=crop", // creative workspace
  "https://images.unsplash.com/photo-1542744094-3a31f272c490?q=80&w=800&auto=format&fit=crop", // dashboard
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop", // data
  "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=800&auto=format&fit=crop", // clean workspace
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=800&auto=format&fit=crop"  // coding
];

const links = [
  "globalbusiness.com", "startup-hub.ae", "techventures.io", 
  "nextgen-holding.com", "innovation-labs.net", "enterprise-uae.com",
  "smart-offices.org", "future-growth.co", "visionary-spaces.ae", "creatives-agency.com"
];

export const ServicesGallary = () => {
  const containerRef = useRef(null);
  const cylinderRef = useRef(null);
  
  // Track rotation and mouse position
  const rotationY = useRef(0);
  const mouseX = useRef(0);
  const targetVelocity = useRef(0);
  const currentVelocity = useRef(0);

  // Generate a dense cylinder of 48 items (4 rows of 12)
  const galleryItems = useMemo(() => {
    let items = [];
    const sizes = [
      { w: 420, h: 280 }, // landscape
      { w: 320, h: 420 }, // portrait
      { w: 480, h: 260 }, // wide
      { w: 360, h: 360 }, // square
      { w: 400, h: 300 }  // standard
    ];
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 12; col++) {
        items.push({
          id: `item-${row}-${col}`,
          img: baseImages[(row * 12 + col) % baseImages.length],
          link: links[(row * 12 + col) % links.length],
          row: row,
          col: col,
          size: sizes[(row * 12 + col) % sizes.length]
        });
      }
    }
    return items;
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Normalize mouse X position from -1 (left) to 1 (right)
      const normalizedX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseX.current = normalizedX;
      
      // Target velocity is proportional to how far the mouse is from the center
      // Max speed is 1.5 degrees per frame
      targetVelocity.current = normalizedX * 1.5;
    };

    const handleMouseLeave = () => {
      // Slow down to stop when mouse leaves
      targetVelocity.current = 0;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  useGSAP(() => {
    // Render loop for smooth mouse-driven rotation
    const ticker = gsap.ticker.add(() => {
      if (!cylinderRef.current) return;
      
      // Lerp velocity for smooth acceleration/deceleration
      currentVelocity.current += (targetVelocity.current - currentVelocity.current) * 0.05;
      
      // Apply velocity to rotation
      rotationY.current += currentVelocity.current;
      
      gsap.set(cylinderRef.current, { rotationY: rotationY.current });
    });

    // Scroll-based tilt and scale for extra 3D effect
    gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1
      }
    })
    .fromTo(cylinderRef.current, 
      { rotationX: -10, scale: 0.8 },
      { rotationX: 10, scale: 1.1, ease: "none" }
    );
    
    return () => gsap.ticker.remove(ticker);
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-[100vh] bg-[#000] overflow-hidden flex items-center justify-center cursor-grab active:cursor-grabbing"
      style={{ perspective: '1200px' }} 
    >
      {/* Central Text */}
      <div className="absolute z-20 text-center pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <h2 className="text-[#f5f5f5] text-[3.5rem] sm:text-6xl md:text-[5.5rem] font-serif tracking-tight leading-[1.05] drop-shadow-2xl">
          Made with <br/> Squarespace
        </h2>
      </div>

      {/* 3D Cylinder Container */}
      <div 
        ref={cylinderRef}
        className="relative w-full h-full"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {galleryItems.map((item) => {
          // 12 items per row = 30 degrees apart
          // Offset the alternate rows by 15 degrees to create a staggered masonry pattern
          const baseAngle = (item.col / 12) * 360;
          const angleOffset = item.row % 2 === 1 ? 15 : 0;
          const angle = baseAngle + angleOffset;
          
          // Radius of the cylinder
          const radius = 1100; 
          
          // Row heights
          const yOffsets = [-420, -140, 140, 420];
          const yOffset = yOffsets[item.row];

          return (
            <div
              key={item.id}
              className="group absolute top-1/2 left-1/2 overflow-hidden cursor-pointer bg-[#000] shadow-2xl transition-all duration-700 ease-out hover:z-50"
              style={{
                width: `${item.size.w}px`,
                height: `${item.size.h}px`,
                marginLeft: `-${item.size.w / 2}px`, 
                marginTop: `-${item.size.h / 2}px`,  
                transform: `rotateY(${angle}deg) translateZ(${radius}px) translateY(${yOffset}px)`,
                backfaceVisibility: 'hidden' 
              }}
            >
              {/* Image */}
              <img 
                src={item.img} 
                alt="Gallery" 
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              
              {/* Hover Pill Button */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                <div className="bg-white text-black text-[13px] font-medium px-5 py-2.5 rounded-full flex items-center gap-1.5 shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 pointer-events-auto hover:bg-gray-200">
                  {item.link}
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Soft radial vignette overlay instead of heavy linear gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_#000_100%)] pointer-events-none w-full h-full" />
    </section>
  );
};


