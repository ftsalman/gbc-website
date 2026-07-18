import React, { memo, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Image as ThreeImage, OrbitControls } from "@react-three/drei";
import { useNavigate } from "react-router-dom";
import * as THREE from "three";
import "./AwardShowcase.css";

const PROJECT_DATA = [
 
  {
    title: "Business Excellence Award",
    image: "/images/awards/showcase-business.jpg",
    href: "/services",
  },
  {
    title: "Leadership Award",
    image: "/images/awards/showcase-leadership.jpg",
    href: "/services",
  },
  {
    title: "Innovation Award",
    image: "/images/awards/showcase-innovation.jpg",
    href: "/services",
  },
  {
    title: "Customer Service Award",
    image: "/images/awards/showcase-customer-service.jpg",
    href: "/services",
  },
  {
    title: "Growth Achievement Award",
    image: "/images/awards/showcase-growth.jpg",
    href: "/services",
  },
  {
    title: "Entrepreneurship Award",
    image: "/images/awards/showcase-entrepreneurship.jpg",
    href: "/services",
  },
  {
    title: "Community Impact Award",
    image: "/images/awards/showcase-community.jpg",
    href: "/services",
  },
  {
    title: "Sustainability Award",
    image: "/images/awards/showcase-sustainability.jpg",
    href: "/services",
  },
  {
    title: "Digital Transformation Award",
    image: "/images/awards/showcase-digital.jpg",
    href: "/services",
  },
  {
    title: "Emerging Business Award",
    image: "/images/awards/showcase-emerging.jpg",
    href: "/services",
  },
  {
    title: "Industry Excellence Award",
    image: "/images/awards/showcase-industry.jpg",
    href: "/services",
  },
  {
    title: "Lifetime Achievement Award",
    image: "/images/awards/showcase-lifetime.jpg",
    href: "/services",
  },
];

const CARDS_PER_RING = 8;
const RING_RADIUS = 3;
const RING_HEIGHTS = [-4, -2, 0, 2, 4];

const ProjectCard = memo(function ProjectCard({ id, item, position, rotation, mobile, active, setActive, onNavigate }) {
  const imageRef = useRef(null);

  useFrame((_, delta) => {
    if (!imageRef.current) return;
    const scale = active ? 1.2 : 1;
    const opacity = active ? 1 : mobile ? 0.8 : 0.5;
    const scaleEase = 1 - Math.exp(-delta * 10);
    imageRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), scaleEase);
    imageRef.current.material.opacity = THREE.MathUtils.lerp(
      imageRef.current.material.opacity,
      opacity,
      1 - Math.exp(-delta * 6),
    );
  });

  return (
    <ThreeImage
      ref={imageRef}
      url={item.image}
      position={position}
      rotation={rotation}
      transparent
      opacity={mobile ? 0.8 : 0.5}
      onPointerOver={(event) => {
        event.stopPropagation();
        setActive({ id, title: item.title });
      }}
      onPointerOut={() => setActive(null)}
      onClick={(event) => {
        event.stopPropagation();
        onNavigate(item.href);
      }}
    >
      <planeGeometry args={[1.5, 0.9345, 20, 20]} />
    </ThreeImage>
  );
});

function AwardRings({ mobile, activeCard, setActiveCard, onNavigate }) {
  return RING_HEIGHTS.flatMap((height, ringIndex) =>
    Array.from({ length: CARDS_PER_RING }, (_, cardIndex) => {
      const angle = (cardIndex / CARDS_PER_RING) * Math.PI * 2;
      const item = PROJECT_DATA[
        (ringIndex * CARDS_PER_RING + cardIndex) % PROJECT_DATA.length
      ];

      const id = `${ringIndex}-${cardIndex}`;

      return (
        <ProjectCard
          key={id}
          id={id}
          item={item}
          mobile={mobile}
          active={activeCard?.id === id}
          setActive={setActiveCard}
          onNavigate={onNavigate}
          position={[Math.sin(angle) * RING_RADIUS, height, Math.cos(angle) * RING_RADIUS]}
          rotation={[0, Math.PI + angle, 0]}
        />
      );
    }),
  );
}

function CameraRig({ mobile, setDragging }) {
  const hasDragged = useRef(false);

  useFrame(({ camera, pointer }, delta) => {
    if (hasDragged.current) return;
    camera.position.lerp(
      new THREE.Vector3(pointer.x, -pointer.y, -3),
      1 - Math.exp(-delta / 0.3),
    );
  });

  const polarOffset = mobile ? 0 : 0.25;

  return (
    <OrbitControls
      enableZoom={false}
      enablePan={false}
      enableDamping
      dampingFactor={0.05}
      minPolarAngle={Math.PI / 2 - polarOffset}
      maxPolarAngle={Math.PI / 2 + polarOffset}
      onStart={() => {
        hasDragged.current = true;
        setDragging(true);
      }}
      onEnd={() => setDragging(false)}
    />
  );
}

export function AwardShowcase() {
  const navigate = useNavigate();
  const titleRef = useRef(null);
  const [mobile, setMobile] = useState(false);
  const [activeCard, setActiveCard] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const update = () =>
      setMobile(
        window.innerWidth < 1280 ||
          window.matchMedia("(pointer: coarse)").matches,
      );
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const movePointer = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    setHoverPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
    titleRef.current?.style.setProperty("--title-rotate-y", `${px * 60}deg`);
    titleRef.current?.style.setProperty("--title-rotate-x", `${py * -60}deg`);
  };

  return (
    <section
      className={`award-showcase${dragging ? " is-dragging" : ""}${activeCard ? " has-active-card" : ""}`}
      aria-label="Websites made with GBC"
      onPointerMove={movePointer}
      onPointerLeave={() => {
        titleRef.current?.style.setProperty("--title-rotate-y", "0deg");
        titleRef.current?.style.setProperty("--title-rotate-x", "0deg");
      }}
    >
      <div className="award-showcase__scene" aria-hidden="true">
        <div className="award-showcase__gradient award-showcase__gradient--top" />
        <div className="award-showcase__gradient award-showcase__gradient--bottom" />
        <Canvas
          camera={{ position: [0, 0, -3], fov: mobile ? 80 : 65 }}
          dpr={[1, 2]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
            stencil: false,
            depth: false,
          }}
        >
          <AwardRings
            mobile={mobile}
            activeCard={activeCard}
            setActiveCard={setActiveCard}
            onNavigate={navigate}
          />
          <CameraRig mobile={mobile} setDragging={setDragging} />
        </Canvas>
      </div>

      <div ref={titleRef} className="wwwww">
        <h2>
          <em>Made with</em>
          <span className="">GBC BUSINESS CONNECT.</span>
        </h2>
      </div>
      <div
        className={`award-showcase__hover-link${activeCard ? " is-visible" : ""}`}
        style={{
          "--hover-x": `${hoverPosition.x}px`,
          "--hover-y": `${hoverPosition.y}px`,
        }}
        aria-hidden="true"
      >
        {activeCard?.title} <span>↗</span>
      </div>
      <div className="award-showcase__shade" />
    </section>
  );
}
