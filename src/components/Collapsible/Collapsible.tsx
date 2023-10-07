// TODO: change so not relying on IonIcon
import { IonIcon } from "@ionic/react";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import CollapseArrowColorIcon from "../../images/collapse-arrow-color.svg";
import ExpandArrowColorIcon from "../../images/expand-arrow-color.svg";
import styled from "styled-components";
import { motion } from "framer-motion";

const TriggerWithTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

type TitleProps = {
  titlefontsize: string;
};

const Title = styled.h3<TitleProps>`
  font-size: ${({ titlefontsize }) => titlefontsize};
  font-size: 1.25rem;
  color: white;
`;

const CollapseOrExpandIcon = styled(IonIcon)`
  width: 1.5em;
  height: 1.5em;
`;

const TriggerButton = styled.button`
  display: flex;
  padding: 5px;
  border-radius: 8px;
  background-color: var(--offwhite-color);

  &:focus-visible {
    outline: 2px solid white;
    outline-offset: 2px;
  }
`;

const Content = styled(CollapsiblePrimitive.Content)`
  overflow: hidden;
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
  titleFontSize = "1.25rem",
}: Props) {
  return (
    <CollapsiblePrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
      <TriggerWithTitle>
        <Title titlefontsize={titleFontSize}>{title}</Title>
        <CollapsiblePrimitive.Trigger asChild>
          <TriggerButton
            aria-label={isOpen ? "Collapse content" : "Expand content"}
          >
            <CollapseOrExpandIcon
              src={isOpen ? CollapseArrowColorIcon : ExpandArrowColorIcon}
            />
          </TriggerButton>
        </CollapsiblePrimitive.Trigger>
      </TriggerWithTitle>

      <Content
        as={motion.div}
        initial={false}
        variants={collapsibleContentVariants}
        animate={isOpen ? "open" : "closed"}
      >
        {children}
      </Content>
    </CollapsiblePrimitive.Root>
  );
}

export default Collapsible;
