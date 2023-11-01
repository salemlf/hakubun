import { useState } from "react";
import { useLocation, useOutlet } from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";

export const containerVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

const PageContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  min-height: 100%;
  position: relative;
  background-size: cover;
`;

const AnimatedOutlet: React.FC = () => {
  const o = useOutlet();
  const [outlet] = useState(o);

  return <>{outlet}</>;
};

function RootContainer() {
  const routerLocation = useLocation();

  return (
    <AnimatePresence mode="popLayout">
      <PageContainer
        key={routerLocation.key}
        initial="initial"
        animate="in"
        exit="out"
        variants={containerVariants}
        transition={{ duration: 0.5 }}
      >
        <AnimatedOutlet />
      </PageContainer>
    </AnimatePresence>
  );
}

export default RootContainer;
