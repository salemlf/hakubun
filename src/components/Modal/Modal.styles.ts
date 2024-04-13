import { motion } from "framer-motion";
import styled from "styled-components";

export const Overlay = styled(motion.div)`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.447);
  inset: 0;
  z-index: 1000;
`;

export const Content = styled(motion.div)`
  position: relative;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 2px 1px 10px rgba(0, 0, 0, 0.2);
  color: var(--text-color);
  width: 90vw;
  max-width: 400px;
  max-height: 85vh;
  overflow-y: auto;
  background-color: var(--foreground-color);
  z-index: 5000;
`;
