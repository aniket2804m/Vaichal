import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  scale: number;
}

const CursorGlow = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Only run on desktop/devices with hover
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number | null = null;
    const stars: Star[] = [];
    const mouse = { x: 0, y: 0, lastX: 0, lastY: 0 };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw stars
      for (let i = stars.length - 1; i >= 0; i--) {
        const star = stars[i];

        ctx.save();
        ctx.globalAlpha = star.alpha;
        ctx.fillStyle = "#C9A84C";
        
        // Match original box shadow / glow effect
        ctx.shadowColor = "#C9A84C";
        ctx.shadowBlur = 10 * star.scale;

        const size = 5 * star.scale;
        ctx.fillRect(star.x - size / 2, star.y - size / 2, size, size);
        ctx.restore();

        // Original animation was:
        // duration: 0.8s, ease: easeOut
        // y + 120, x + 40, opacity 0, scale 0.2
        // Assuming ~60fps, 0.8s is ~48 frames.
        // Change per frame:
        // vx = 40 / 48 = 0.83px
        // vy = 120 / 48 = 2.5px
        // alpha -= 1 / 48 = 0.02
        // scale -= 0.8 / 48 = 0.016
        star.x += star.vx;
        star.y += star.vy;
        star.alpha -= 0.02;
        star.scale -= 0.016;

        // Remove dead stars
        if (star.alpha <= 0 || star.scale <= 0) {
          stars.splice(i, 1);
        }
      }

      // If there are still stars to animate, keep the loop going
      if (stars.length > 0) {
        animationFrameId = requestAnimationFrame(draw);
      } else {
        animationFrameId = null;
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      // Only spawn a star if mouse moved at least 2px to avoid spawning duplicates when standing still
      const dist = Math.hypot(mouse.x - mouse.lastX, mouse.y - mouse.lastY);
      if (dist >= 2) {
        stars.push({
          x: mouse.x,
          y: mouse.y,
          vx: 0.83 + (Math.random() - 0.5) * 0.3,
          vy: 2.5 + (Math.random() - 0.5) * 0.5,
          alpha: 1.0,
          scale: 1.0,
        });
        mouse.lastX = mouse.x;
        mouse.lastY = mouse.y;

        // Start animation loop if not already running
        if (animationFrameId === null) {
          animationFrameId = requestAnimationFrame(draw);
        }
      }
    };

    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", onMouseMove);
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 hidden md:block"
    />
  );
};

export default CursorGlow;