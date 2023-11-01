import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

type AnimatedPageContainerProps = {
  backgroundimg: any | undefined;
};

const AnimatedPageContainer = styled(motion.div)<AnimatedPageContainerProps>`
  display: flex;
  flex-direction: column;
  min-height: 100%;
  position: relative;
  background-image: ${({ backgroundimg }) =>
    backgroundimg ? `url(${backgroundimg})` : "none"};
  background-size: cover;
`;

type Props = {
  children: React.ReactNode;
  bgImage?: any;
};

const variants = {
  hidden: { opacity: 0, x: -200, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: -100 },
};

// TODO: pass in a direction value so can transition in from left or right
function AnimatedPage({ children, bgImage }: Props) {
  return (
    // <AnimatedPageContainer
    //   variants={variants}
    //   initial="hidden"
    //   animate="enter"
    //   exit="exit"
    //   transition={{ type: "linear" }}
    //   backgroundimg={bgImage}
    // >
    <>{children}</>
    // </AnimatedPageContainer>
  );
}

export default AnimatedPage;
