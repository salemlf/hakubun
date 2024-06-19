import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence } from "framer-motion";
import TokenInput from "../pages/TokenInput";
import {
  containerVariants,
  PageContainer,
} from "../styles/BaseStyledComponents";

export const Route = createFileRoute("/authenticate")({
  component: () => <Authenticate />,
});

function Authenticate() {
  return (
    <AnimatePresence>
      <PageContainer
        initial="initial"
        animate="in"
        exit="out"
        variants={containerVariants}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <TokenInput />
      </PageContainer>
    </AnimatePresence>
  );
}
