import { useEffect, useRef } from "react";
import {
  motion,
  Variants,
  HTMLMotionProps,
  useAnimation,
  useInView,
} from "framer-motion";

import styled from "styled-components";

const Text = styled(motion.h1)`
  margin: 0;
  font-size: 2.5rem;
`;

interface Props extends HTMLMotionProps<"div"> {
  text: string;
  delay?: number;
  duration?: number;
  size?: string;
}

function FallingText({
  text,
  size,
  delay = 0,
  duration = 0.1,
  ...props
}: Props) {
  const controls = useAnimation();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const inView = useInView(headingRef);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
    if (!inView) {
      controls.start("hidden");
    }
  }, [controls, inView]);

  const letters = Array.from(text);

  const container: Variants = {
    hidden: {
      opacity: 0,
    },
    visible: (i: number = 1) => ({
      opacity: 1,
      transition: { staggerChildren: duration, delayChildren: i * delay },
    }),
  };

  const letterVariants: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
    hidden: {
      opacity: 0,
      y: -50,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
  };

  return (
    <Text
      style={{ display: "flex", overflow: "hidden" }}
      variants={container}
      initial="hidden"
      ref={headingRef}
      animate={controls}
      {...props}
    >
      {letters.map((letter, index) => (
        <motion.span key={index} variants={letterVariants} aria-hidden="true">
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </Text>
  );
}

export default FallingText;
