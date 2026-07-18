import { useState, useEffect, useRef } from "react";

export const imageCache = new Map();

export const framePath = (folder, index, prefix = "sharaco-frame-") =>
  `${folder}/${prefix}${String(index + 1).padStart(3, "0")}.jpg`;

export const useReveal = (options = {}) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    let animationFrame = 0;
    let observer;

    const revealIfVisible = () => {
      const rect = node.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      if (rect.top < viewportHeight * 0.92 && rect.bottom > viewportHeight * 0.08) {
        setVisible(true);
        observer?.disconnect();
        window.removeEventListener("scroll", revealIfVisible);
        window.removeEventListener("resize", revealIfVisible);
        window.cancelAnimationFrame(animationFrame);
      }
    };

    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
          window.removeEventListener("scroll", revealIfVisible);
          window.removeEventListener("resize", revealIfVisible);
          window.cancelAnimationFrame(animationFrame);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px", ...options },
    );

    observer.observe(node);
    animationFrame = window.requestAnimationFrame(revealIfVisible);
    window.addEventListener("scroll", revealIfVisible, { passive: true });
    window.addEventListener("resize", revealIfVisible);
    revealIfVisible();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", revealIfVisible);
      window.removeEventListener("resize", revealIfVisible);
      window.cancelAnimationFrame(animationFrame);
    };
  }, [options]);

  return [ref, visible];
};

export const useScrollSequence = ({ folder, frameCount, smoothness = 1, prefix = "sharaco-frame-" }) => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const targetProgressRef = useRef(0);
  const smoothProgressRef = useRef(0);
  const currentFrameRef = useRef(-1);
  const rafRef = useRef(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return undefined;

    const context = canvas.getContext("2d", { alpha: false });
    if (!context) return undefined;

    const renderImage = (image) => {
      const { width, height } = canvas.getBoundingClientRect();
      const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
      const drawWidth = image.naturalWidth * scale;
      const drawHeight = image.naturalHeight * scale;

      context.clearRect(0, 0, width, height);
      context.drawImage(
        image,
        (width - drawWidth) / 2,
        (height - drawHeight) / 2,
        drawWidth,
        drawHeight,
      );
    };

    const loadAndDrawFrame = (index, drawImmediately = false) => {
      if (index < 0 || index >= frameCount) return;
      const src = framePath(folder, index, prefix);
      
      let image = imageCache.get(src);
      
      if (!image) {
        image = new Image();
        image.decoding = "async";
        image.src = src;
        
        image.onload = () => {
          if (currentFrameRef.current === index) {
            renderImage(image);
          }
        };
        
        imageCache.set(src, image);
        if (imageCache.size > 150) {
          const firstKey = imageCache.keys().next().value;
          const oldImage = imageCache.get(firstKey);
          if (oldImage) {
             oldImage.src = "";
          }
          imageCache.delete(firstKey);
        }
      } else if (drawImmediately && image.complete && image.naturalWidth > 0) {
        renderImage(image);
      }
    };

    const preloadAround = (index) => {
      for (let i = 1; i <= 10; i++) loadAndDrawFrame(index + i, false);
      for (let i = 1; i <= 5; i++) loadAndDrawFrame(index - i, false);
    };

    const drawFrame = (index) => {
      loadAndDrawFrame(index, true);
      preloadAround(index);
    };

    let lastWidth = 0;
    const resizeCanvas = () => {
      const width = window.innerWidth;
      
      // On mobile, ignore vertical-only resizes (caused by URL bar hiding/showing) to prevent jitter
      if (width === lastWidth && /Mobi|Android/i.test(navigator.userAgent)) {
        return;
      }
      lastWidth = width;

      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      const height = window.innerHeight;

      canvas.width = Math.floor(width * pixelRatio);
      canvas.height = Math.floor(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      drawFrame(currentFrameRef.current >= 0 ? currentFrameRef.current : 0);
    };

    const updateTarget = () => {
      const rect = section.getBoundingClientRect();
      const scrollable = section.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;

      targetProgressRef.current = Math.min(
        Math.max(-rect.top / scrollable, 0),
        1,
      );
    };

    const animate = () => {
      smoothProgressRef.current +=
        (targetProgressRef.current - smoothProgressRef.current) * smoothness;

      const nextProgress = Math.min(Math.max(smoothProgressRef.current, 0), 1);
      const nextFrame = Math.floor((frameCount - 1) * nextProgress);

      if (nextFrame !== currentFrameRef.current) {
        currentFrameRef.current = nextFrame;
        drawFrame(nextFrame);
      }

      setProgress((previous) =>
        Math.abs(previous - nextProgress) > 0.006 ? nextProgress : previous,
      );

      rafRef.current = window.requestAnimationFrame(animate);
    };

    drawFrame(0);
    resizeCanvas();
    updateTarget();
    animate();

    window.addEventListener("scroll", updateTarget, { passive: true });
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("scroll", updateTarget);
      window.removeEventListener("resize", resizeCanvas);
      window.cancelAnimationFrame(rafRef.current);
    };
  }, [folder, frameCount, smoothness]);

  return { sectionRef, canvasRef, progress };
};
