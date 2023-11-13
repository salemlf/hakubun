// TODO: change so not relying on IonIcon
import { IonIcon } from "@ionic/react";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import { AnimatePresence, motion } from "framer-motion";
import CollapseArrowColorIcon from "../../images/collapse-arrow-color.svg";
import ExpandArrowColorIcon from "../../images/expand-arrow-color.svg";
import styled from "styled-components";

type TitleProps = {
  titlefontsize: string;
};

const Title = styled.h3<TitleProps>`
  font-size: ${({ titlefontsize }) => titlefontsize};
  color: var(--contrast-text-color);
  margin: 0;
`;

const CollapseOrExpandIcon = styled(IonIcon)`
  width: 1.5em;
  height: 1.5em;
`;

const TriggerButton = styled(CollapsiblePrimitive.Trigger)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-radius: 8px;
  background-color: var(--contrast-color);

  &:focus-visible {
    outline: 2px solid white;
    outline-offset: 2px;
  }
`;

const IconContainer = styled(motion.div)`
  display: flex;
`;

const Root = styled(CollapsiblePrimitive.Root)`
  width: 100%;
  background-color: var(--secondary-foreground-color);
  border-radius: 10px;
`;

const Content = styled(CollapsiblePrimitive.Content)`
  overflow: hidden;
  background-color: var(--secondary-foreground-color);
  padding: 10px 5px;
  border-radius: 0 0 8px 8px;
`;

const collapsibleContentVariants = {
  open: {
    height: "auto",
    opacity: 1,
    display: "block",
    transition: {
      height: {
        duration: 0.4,
      },
      opacity: {
        duration: 0.25,
        delay: 0.15,
      },
    },
  },
  closed: {
    height: 0,
    opacity: 0,
    transition: {
      height: {
        duration: 0.4,
      },
      opacity: {
        duration: 0.25,
      },
    },
    transitionEnd: {
      display: "none",
    },
  },
};

type Props = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  title: string;
  children: React.ReactNode;
  titleFontSize?: string;
};

function Collapsible({
  isOpen,
  setIsOpen,
  title,
  children,
  titleFontSize = "1.2rem",
}: Props) {
  return (
    <Root open={isOpen} onOpenChange={setIsOpen}>
      <TriggerButton
        aria-label={isOpen ? "Collapse content" : "Expand content"}
      >
        <Title titlefontsize={titleFontSize}>{title}</Title>
        <AnimatePresence initial={false} mode="wait">
          <IconContainer
            key={isOpen ? "minus" : "plus"}
            transition={{
              type: "spring",
              duration: 0.3,
              bounce: 0.5,
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            <CollapseOrExpandIcon
              src={isOpen ? CollapseArrowColorIcon : ExpandArrowColorIcon}
            />
          </IconContainer>
        </AnimatePresence>
      </TriggerButton>

      <Content
        as={motion.div}
        initial={false}
        variants={collapsibleContentVariants}
        animate={isOpen ? "open" : "closed"}
      >
        {children}
      </Content>
    </Root>
  );
}

export default Collapsible;
