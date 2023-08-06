import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components/macro";

const AnimatedPageContainer = styled(motion.main)`
  display: flex;
  flex-direction: column;
  min-height: 100%;
`;

type Props = {
  children: React.ReactNode;
};

const variants = {
  hidden: { opacity: 0, x: -200, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: -100 },
};

// TODO: pass in a direction value so can transition in from left or right
function AnimatedPage({ children }: Props) {
  return (
    <AnimatedPageContainer
      variants={variants}
      initial="hidden"
      animate="enter"
      exit="exit"
      transition={{ type: "linear" }}
    >
      {children}
    </AnimatedPageContainer>
  );
}

export default AnimatedPage;
