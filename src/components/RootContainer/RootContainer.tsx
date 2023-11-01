import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useLocation, useOutlet } from "react-router";
import styled from "styled-components";
import { usePrevious } from "../../hooks/usePrevious";

export const containerVariants = {
  initial: ({ direction }: { direction: "forward" | "backward" }) => ({
    x: direction === "backward" ? "-100%" : "100%",
    transition: {
      type: "spring",
      duration: 1,
      delay: 0.1,
    },
  }),
  in: {
    x: 0,
    transition: {
      type: "spring",
      duration: 1,
      delay: 0.1,
    },
  },
  out: ({ direction }: { direction: "forward" | "backward" }) => ({
    x: direction === "backward" ? "100%" : "-100%",
    transition: {
      type: "spring",
      duration: 1,
      delay: 0.1,
    },
  }),
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
  const previousLocation = usePrevious(location.pathname);
  console.log(
    "🚀 ~ file: RootContainer.tsx:52 ~ RootContainer ~ previousLocation:",
    previousLocation
  );
  // TODO: somehow pass in direction using previousLocation and current location

  console.log(
    "🚀 ~ file: App.tsx:269 ~ RootContainer ~ normie location:",
    location
  );

  return (
    <AnimatePresence mode="popLayout">
      <PageContainer
        key={routerLocation.pathname}
        custom={{ direction: "forward" }}
        initial="initial"
        animate="in"
        exit="out"
        variants={containerVariants}
      >
        <AnimatedOutlet />
      </PageContainer>
    </AnimatePresence>
  );
}

export default RootContainer;
