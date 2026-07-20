import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  z: number;
  baseSize: number;
  type: "dust" | "sparkle";
  twinkleSpeed: number;
  twinklePhase: number;
  rotation: number;
  rotationSpeed: number;
  baseOpacity: number;
}

const ParticleBackground = ({ color = "#C9A84C" }: { color?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, isHovered: false });
  const activeCenterRef = useRef({ x: 0, y: 0 });

  // Safe color parsing helper to convert hex or other CSS colors to canvas RGB numbers
  const rgbColor = (() => {
    if (color.startsWith("#")) {
      const hex = color.replace("#", "");
      if (hex.length === 3) {
        const r = parseInt(hex[0] + hex[0], 16);
        const g = parseInt(hex[1] + hex[1], 16);
        const b = parseInt(hex[2] + hex[2], 16);
        return `${r}, ${g}, ${b}`;
      } else if (hex.length === 6) {
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        return `${r}, ${g}, ${b}`;
      }
    }
    const match = color.match(/\d+\s*,\s*\d+\s*,\s*\d+/);
    if (match) return match[0];
    return "201, 168, 76"; // Default gold #C9A84C
  })();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let stars: Star[] = [];
    const maxDepth = 1000;
    const fov = 250;

    // Detect mobile for optimization and responsiveness
    const isMobile = window.innerWidth < 768;
    const starCount = isMobile ? 60 : 160;

    // Handle canvas sizing relative to container
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      } else {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
      activeCenterRef.current = { x: canvas.width / 2, y: canvas.height / 2 };
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initialize starfield coordinates and styles
    const initStars = () => {
      stars = [];
      for (let i = 0; i < starCount; i++) {
        // Distribute stars in 3D box coordinates relative to center
        const x = (Math.random() - 0.5) * canvas.width * 2.5;
        const y = (Math.random() - 0.5) * canvas.height * 2.5;
        const z = Math.random() * maxDepth;

        // 15% luxury sparkles, 85% normal star dust particles
        const type = Math.random() < 0.15 ? "sparkle" : "dust";
        
        // Base sizes
        const baseSize = type === "sparkle" 
          ? Math.random() * 4 + 4       // 4px to 8px size
          : Math.random() * 1.5 + 0.8;  // 0.8px to 2.3px size

        // Max opacities - normally bright as requested by the user
        const baseOpacity = type === "sparkle"
          ? Math.random() * 0.2 + 0.4   // 0.40 to 0.60 base opacity (brighter)
          : Math.random() * 0.15 + 0.3; // 0.30 to 0.45 base opacity (brighter)

        stars.push({
          x,
          y,
          z,
          baseSize,
          type,
          twinkleSpeed: Math.random() * 0.02 + 0.012,
          twinklePhase: Math.random() * Math.PI * 2,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.008,
          baseOpacity
        });
      }
    };

    initStars();

    // Mouse interactivity event handlers
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        isHovered: true,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.isHovered = false;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    canvas.addEventListener("mouseenter", () => { mouseRef.current.isHovered = true; });

    let time = 0;

    // Main Canvas animation render loop
    const animate = () => {
      time++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const targetCenterX = canvas.width / 2;
      const targetCenterY = canvas.height / 2;

      // Mouse interactive parallax offset
      let currentTargetX = targetCenterX;
      let currentTargetY = targetCenterY;

      if (mouseRef.current.isHovered) {
        // Shift center slightly based on mouse position (subtle, non-distracting drift)
        const dx = (mouseRef.current.x - targetCenterX) * 0.06;
        const dy = (mouseRef.current.y - targetCenterY) * 0.06;
        currentTargetX = targetCenterX + dx;
        currentTargetY = targetCenterY + dy;
      }

      // Smoothly lerp center position to prevent jumpy movement
      activeCenterRef.current.x += (currentTargetX - activeCenterRef.current.x) * 0.05;
      activeCenterRef.current.y += (currentTargetY - activeCenterRef.current.y) * 0.05;

      const centerX = activeCenterRef.current.x;
      const centerY = activeCenterRef.current.y;

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        // Move stars slowly forward in depth (creates a "going in the background" visual)
        star.z -= 0.6; 

        // Gentle orbital sway animation in space for an attractive flow
        const swayX = Math.sin(time * 0.0006 + star.twinklePhase) * 0.06;
        const swayY = Math.cos(time * 0.0006 + star.twinklePhase) * 0.06;
        star.x += swayX;
        star.y += swayY;

        // Reset star if it passes the screen plane or gets too close
        let resetNeeded = false;
        if (star.z <= 0) {
          resetNeeded = true;
        } else {
          // Project to 2D
          const px = (star.x / star.z) * fov + centerX;
          const py = (star.y / star.z) * fov + centerY;
          
          // Reset if far offscreen
          const margin = 120;
          if (px < -margin || px > canvas.width + margin || py < -margin || py > canvas.height + margin) {
            resetNeeded = true;
          }
        }

        if (resetNeeded) {
          star.z = maxDepth;
          // Spawn around the screen boundaries far away
          star.x = (Math.random() - 0.5) * canvas.width * 2.5;
          star.y = (Math.random() - 0.5) * canvas.height * 2.5;
          continue;
        }

        // Project coordinate to 2D screen coordinate
        const px = (star.x / star.z) * fov + centerX;
        const py = (star.y / star.z) * fov + centerY;

        // Calculate size based on 3D depth
        const size = ((maxDepth - star.z) / maxDepth) * star.baseSize + 0.4;

        // Twinkle opacity breathing cycle
        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinklePhase) * 0.45 + 0.55; // 0.1 to 1.0 multiplier
        
        // Proximity factor: stars start normally bright in deep space and get even brighter as they get closer (larger)
        const proximityFactor = 0.35 + 0.65 * ((maxDepth - star.z) / maxDepth); // 0.35 to 1.0

        // Depth-based fade curve (soft fade in from far background, soft dissolve when very close)
        let depthFade = 1;
        if (star.z > maxDepth * 0.9) {
          depthFade = (maxDepth - star.z) / (maxDepth * 0.1);
        } else if (star.z < maxDepth * 0.08) {
          depthFade = star.z / (maxDepth * 0.08);
        }

        // Combined opacity: scales up with proximity to make them brighter as they grow larger
        const opacity = star.baseOpacity * twinkle * proximityFactor * depthFade;

        if (opacity <= 0.005) continue;

        // Rotation updates for luxury sparkles
        if (star.type === "sparkle") {
          star.rotation += star.rotationSpeed;
        }

        ctx.save();
        ctx.translate(px, py);

        if (star.type === "sparkle") {
          ctx.rotate(star.rotation);

          // 1. Draw glowing background halo (large, soft glow)
          ctx.beginPath();
          ctx.fillStyle = `rgba(${rgbColor}, ${opacity * 0.24})`;
          ctx.arc(0, 0, size * 2.8, 0, Math.PI * 2);
          ctx.fill();

          // 2. Draw outer blur sparkle shape
          ctx.beginPath();
          ctx.fillStyle = `rgba(${rgbColor}, ${opacity * 0.45})`;
          ctx.moveTo(0, -size * 1.4);
          ctx.quadraticCurveTo(0, 0, size * 1.4, 0);
          ctx.quadraticCurveTo(0, 0, 0, size * 1.4);
          ctx.quadraticCurveTo(0, 0, -size * 1.4, 0);
          ctx.quadraticCurveTo(0, 0, 0, -size * 1.4);
          ctx.closePath();
          ctx.fill();

          // 3. Draw core sharp sparkle shape (bright warm gold core)
          ctx.beginPath();
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.95})`;
          ctx.moveTo(0, -size * 0.95);
          ctx.quadraticCurveTo(0, 0, size * 0.95, 0);
          ctx.quadraticCurveTo(0, 0, 0, size * 0.95);
          ctx.quadraticCurveTo(0, 0, -size * 0.95, 0);
          ctx.quadraticCurveTo(0, 0, 0, -size * 0.95);
          ctx.closePath();
          ctx.fill();

        } else {
          // Normal star dust particle

          // 1. Outer halo glow
          ctx.beginPath();
          ctx.fillStyle = `rgba(${rgbColor}, ${opacity * 0.22})`;
          ctx.arc(0, 0, size * 2.3, 0, Math.PI * 2);
          ctx.fill();

          // 2. Core dot
          ctx.beginPath();
          ctx.fillStyle = `rgba(${rgbColor}, ${opacity * 0.85})`;
          ctx.arc(0, 0, size, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [rgbColor]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0">
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{ opacity: 0.9 }}
      />
    </div>
  );
};

export default ParticleBackground;
