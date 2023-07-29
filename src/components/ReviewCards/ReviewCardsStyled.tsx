import styled from "styled-components/macro";
import { motion } from "framer-motion";
import { getSubjectColor } from "../../services/SubjectAndAssignmentService";
import { SubjectType } from "../../types/Subject";

export const TestReviewCardContainer = styled(motion.div)`
  border-radius: 10px;
  margin: 10px;
  display: flex;
  max-width: 1400px;
  will-change: "transform";
  touch-action: none;
`;

type ReviewItemProps = {
  subjtype: SubjectType;
};

export const ReviewCard = styled(motion.div)<ReviewItemProps>`
  position: relative;
  padding: 50px 0 100px 0;
  border-radius: 10px;
  width: 100%;
  background-color: ${({ subjtype }) => {
    return getSubjectColor(subjtype);
  }};
  will-change: "transform";
  cursor: grab;
  touch-action: none;
`;

export const SwipeOverlay = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  border-radius: 10px;
  pointer-events: none;
  flex-grow: 1;
  touch-action: none;
  opacity: 0;
`;

export const SwipeIcon = styled(motion.div)`
  position: absolute;
  padding: 20px;
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 200px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  ion-icon {
    width: 85px;
    height: 85px;
  }
`;

export const NextCardOverlay = styled(SwipeOverlay)`
  background-color: var(--ion-color-tertiary);

  div {
    color: black;
    border: 2px solid black;
  }
`;

export const RetryCardOverlay = styled(SwipeOverlay)`
  background-color: var(--ion-color-secondary);
  div {
    color: white;
    border: 2px solid white;
  }
`;
