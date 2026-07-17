import React, { useRef, useEffect } from 'react';

export const InteractiveHoverGrid = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    
    let width = 0;
    let height = 0;
    
    let particles = [];
    const spacing = 20; // Distance between dots
    const radius = 1; // Dot size
    const hoverRadius = 150; // Radius of the repulsion effect
    
    let mouse = { x: -1000, y: -1000 };
    
    const init = () => {
      // Use parent container dimensions
      const rect = canvas.parentElement.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      
      particles = [];
      const cols = Math.floor(width / spacing);
      const rows = Math.floor(height / spacing);
      
      // Center the grid
      const offsetX = (width - cols * spacing) / 2;
      const offsetY = (height - rows * spacing) / 2;

      for (let i = 0; i <= cols; i++) {
        for (let j = 0; j <= rows; j++) {
          const x = offsetX + i * spacing;
          const y = offsetY + j * spacing;
          particles.push({
            ox: x,
            oy: y,
            x: x,
            y: y,
            vx: 0,
            vy: 0
          });
        }
      }
    };

    init();

    const handleResize = () => {
      init();
    };
    
    window.addEventListener('resize', handleResize);
    
    // Attach to window so it tracks over children elements
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      
      // If mouse is far outside the canvas, treat as left
      if (mouse.x < -hoverRadius || mouse.x > width + hoverRadius || mouse.y < -hoverRadius || mouse.y > height + hoverRadius) {
        mouse.x = -1000;
        mouse.y = -1000;
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    let animationFrameId;
    
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      ctx.fillStyle = '#9ca3af'; // gray-400 (matches typical subtle dot grids)
      
      for (let i = 0; i < particles.length; i++) {
        let p = particles[i];
        
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        // Repulsion logic
        if (dist < hoverRadius) {
          const forceDirectionX = dx / dist;
          const forceDirectionY = dy / dist;
          const force = (hoverRadius - dist) / hoverRadius;
          // Negative multiplier to push away
          const directionX = forceDirectionX * force * -7;
          const directionY = forceDirectionY * force * -7;
          
          p.vx += directionX;
          p.vy += directionY;
        }
        
        // Spring back to original position
        p.vx += (p.ox - p.x) * 0.08; // Spring stiffness
        p.vy += (p.oy - p.y) * 0.08;
        
        // Damping/Friction
        p.vx *= 0.75;
        p.vy *= 0.75;
        
        p.x += p.vx;
        p.y += p.vy;
        
        // Render dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 z-0 w-full h-full pointer-events-none opacity-60"
      style={{ display: 'block' }}
    />
  );
};
