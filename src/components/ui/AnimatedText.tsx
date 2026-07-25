import type React from "react";
import { motion, type Variants } from "framer-motion";

const wordContainer: Variants = {
  hidden: {},
  visible: (delayChildren: number = 0) => ({
    transition: { staggerChildren: 0.045, delayChildren },
  }),
};

const wordItem: Variants = {
  hidden: { opacity: 0, y: "0.6em", rotateX: -60, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: "0em",
    rotateX: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

interface AnimatedTextProps {
  text: string;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  delay?: number;
  once?: boolean;
}

export function AnimatedText({
  text,
  as: Tag = "span",
  className = "",
  delay = 0,
  once = true,
}: AnimatedTextProps) {
  const words = text.split(" ");
  const MotionTag = (motion[Tag as keyof typeof motion] || motion.span) as React.ElementType;

  return (
    <MotionTag
      className={className}
      style={{ perspective: "600px" }}
      variants={wordContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.4 }}
      custom={delay}
    >
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          variants={wordItem}
          style={{
            display: "inline-block",
            willChange: "transform, opacity, filter",
            transformOrigin: "50% 100%",
          }}
        >
          {word}
          {i !== words.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </MotionTag>
  );
}

export default AnimatedText;
