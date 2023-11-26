import { Transition, motion } from "framer-motion";
import CircleIcon from "../../images/circle.svg";
import styled from "styled-components";
import { LoadingDotSize } from "../../types/MiscTypes";

type DotContainerProps = {
  containerwidth: string;
};

const DotContainer = styled(motion.div)<DotContainerProps>`
  width: ${({ containerwidth }) => containerwidth};
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

type DotProps = {
  dotsize: string;
};

const Dot = styled(motion.img)<DotProps>`
  width: ${({ dotsize }) => dotsize};
  height: ${({ dotsize }) => dotsize};
`;

const LoadingContainerVariants = {
  initial: {
    transition: {
      staggerChildren: 0.2,
    },
  },
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const DotVariants = {
  initial: {
    y: "0%",
  },
  animate: {
    y: "100%",
  },
};

const DotTransition: Transition = {
  duration: 0.7,
  repeat: Infinity,
  ease: "easeInOut",
  repeatType: "reverse",
};

type DotSizeStyles = {
  containerSize: string;
  dotSize: string;
};

const btnSizeInfo: { [index: string]: DotSizeStyles } = {
  sm: {
    containerSize: "66px",
    dotSize: "16px",
  },
  md: {
    containerSize: "133px",
    dotSize: "32px",
  },
  lg: {
    containerSize: "200px",
    dotSize: "48px",
  },
};

const getLoadingDotSize = (size: LoadingDotSize) => {
  return btnSizeInfo[size as keyof object];
};

type Props = {
  size?: LoadingDotSize;
};

function LoadingDots({ size = "lg" }: Props) {
  let { containerSize, dotSize } = getLoadingDotSize(size);

  return (
    <DotContainer
      containerwidth={containerSize}
      variants={LoadingContainerVariants}
      initial="initial"
      animate="animate"
    >
      <Dot
        src={CircleIcon}
        variants={DotVariants}
        transition={DotTransition}
        dotsize={dotSize}
      />
      <Dot
        src={CircleIcon}
        variants={DotVariants}
        transition={DotTransition}
        dotsize={dotSize}
      />
      <Dot
        src={CircleIcon}
        variants={DotVariants}
        transition={DotTransition}
        dotsize={dotSize}
      />
    </DotContainer>
  );
}

export default LoadingDots;
