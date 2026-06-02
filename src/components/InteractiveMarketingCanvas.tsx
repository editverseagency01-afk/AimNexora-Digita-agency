import React, { useEffect, useRef } from "react";

export default function InteractiveMarketingCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    // Track mouse coordinates for interactive magnetic nodes
    const mouse = {
      x: null as number | null,
      y: null as number | null,
      radius: 160, // area of attraction influence
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const parent = canvas.parentElement;
    if (parent) {
      parent.addEventListener("mousemove", handleMouseMove);
      parent.addEventListener("mouseleave", handleMouseLeave);
    }

    // Resize handler
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        width = canvas.width = entry.contentRect.width || canvas.offsetWidth;
        height = canvas.height = entry.contentRect.height || canvas.offsetHeight;
      }
    });
    if (parent) {
      resizeObserver.observe(parent);
    }

    // Colors aligned with the Cyber Luxury template
    const nodeColors = ["rgba(217, 70, 239, 0.75)", "rgba(168, 85, 247, 0.65)", "rgba(99, 102, 241, 0.6)"];
    
    // Create random interactive nodes representing attribution paths
    const particleCount = Math.min(60, Math.floor((width * height) / 22000));
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      glowIntensity: number;
      pulseDirection: number;
    }

    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        radius: Math.random() * 2.5 + 1.5,
        color: nodeColors[Math.floor(Math.random() * nodeColors.length)],
        glowIntensity: Math.random() * 0.5 + 0.5,
        pulseDirection: Math.random() > 0.5 ? 0.02 : -0.02,
      });
    }

    // Main animation loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Pulse glows over time
      particles.forEach((p) => {
        p.glowIntensity += p.pulseDirection;
        if (p.glowIntensity > 1.2 || p.glowIntensity < 0.3) {
          p.pulseDirection = -p.pulseDirection;
        }

        // Apply mouse attraction/repulsion kinetics
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < mouse.radius) {
            // Pull nodes gently toward the mouse coordinates
            const force = (mouse.radius - distance) / mouse.radius;
            const angle = Math.atan2(dy, dx);
            p.vx += Math.cos(angle) * force * 0.12;
            p.vy += Math.sin(angle) * force * 0.12;
          }
        }

        // Dampen velocity to prevent wild acceleration
        p.vx *= 0.96;
        p.vy *= 0.96;

        // Default soft movement drift
        p.x += p.vx + (Math.sin(p.y * 0.01) * 0.08);
        p.y += p.vy;

        // Bounce details off container boundaries
        if (p.x < 0) {
          p.x = 0;
          p.vx *= -1;
        } else if (p.x > width) {
          p.x = width;
          p.vx *= -1;
        }

        if (p.y < 0) {
          p.y = 0;
          p.vy *= -1;
        } else if (p.y > height) {
          p.y = height;
          p.vy *= -1;
        }

        // Draw connecting link lines if particles are within range
        particles.forEach((other) => {
          if (p === other) return;
          const dx = p.x - other.x;
          const dy = p.y - other.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            const alpha = (1 - dist / 130) * 0.22;
            ctx.strokeStyle = `rgba(168, 85, 247, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        });

        // Draw particle node
        ctx.shadowBlur = p.radius * 3 * p.glowIntensity;
        ctx.shadowColor = p.color;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (parent) {
        parent.removeEventListener("mousemove", handleMouseMove);
        parent.removeEventListener("mouseleave", handleMouseLeave);
      }
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-80"
      id="aim_interactive_marketing_canvas"
    />
  );
}
