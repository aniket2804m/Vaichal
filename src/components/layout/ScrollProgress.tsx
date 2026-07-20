import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 bg-[#C9A84C] origin-left shadow-[0_0_12px_#C9A84C,0_0_6px_#C9A84C]"
      style={{ scaleX }}
    />
  );
};

interface ScrollRevealProps {
  children: React.ReactNode;
  variant?: "fade-up" | "fade-down" | "fade-left" | "fade-right" | "scale-up" | "zoom-out" | "rotate-in" | "flip-up";
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

const variantsMap = {
  "fade-up": {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  },
  "fade-down": {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 }
  },
  "fade-left": {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 }
  },
  "fade-right": {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 }
  },
  "scale-up": {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 }
  },
  "zoom-out": {
    hidden: { opacity: 0, scale: 1.15 },
    visible: { opacity: 1, scale: 1 }
  },
  "rotate-in": {
    hidden: { opacity: 0, rotate: -6, y: 30 },
    visible: { opacity: 1, rotate: 0, y: 0 }
  },
  "flip-up": {
    hidden: { opacity: 0, rotateX: 55 },
    visible: { opacity: 1, rotateX: 0 }
  }
};

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  variant = "fade-up",
  delay = 0,
  duration = 0.65,
  className = "",
  once = true
}) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-80px" }}
      variants={variantsMap[variant]}
      transition={{
        duration,
        delay,
        ease: [0.215, 0.61, 0.355, 1]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollProgress;
